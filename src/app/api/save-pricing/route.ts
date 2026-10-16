import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { confirmationEmailHtml, adminNotificationHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

// ⚠️ Email expéditeur (domaine vérifié dans Resend)
const FROM_EMAIL = 'noreply@fidesconseil-patrimoine.fr';

// 📬 Email admin qui reçoit la notification de chaque lead
const ADMIN_EMAIL = 'contact@fidesconseil-patrimoine.fr';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ─── 1. Validation minimale côté serveur ────────────────
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'birthDate',
      'postalCode',
      'startDate',
      'regime',
      'coverageLevel',
    ];

    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, message: `Champs manquants: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // ─── 2. Préparer les données pour Supabase ──────────────
    const row = {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      wants_contact: body.wantsContact ?? true,
      birth_date: body.birthDate,
      postal_code: body.postalCode,
      start_date: body.startDate,
      regime: body.regime,
      product_type: body.productType ?? 'sante',
      coverage_level: body.coverageLevel,
      has_spouse: body.hasSpouse ?? false,
      spouse_birth_date: body.spouseBirthDate ?? null,
      spouse_regime: body.spouseRegime ?? null,
      children: body.children ?? [],
      source: 'web',
      email_sent: false,
    };

    // ─── 3. Insertion dans Supabase ─────────────────────────
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('pricing_leads')
      .insert(row)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Supabase insert error:', insertError);
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de l'enregistrement",
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    console.log('✅ Lead enregistré:', inserted.id);

    // ─── 4. Envoi des emails ────────────────────────────────
    let emailSent = false;
    let emailError: string | null = null;
    let adminEmailSent = false;
    let adminEmailError: string | null = null;

    // 4a. Email de confirmation au CLIENT
    try {
      const emailResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: body.email,
        subject: '✅ Votre simulation de mutuelle est prête',
       html: confirmationEmailHtml({
  firstName: body.firstName,
}),
      });

      if (emailResult.error) {
        emailError = emailResult.error.message;
        console.error('❌ Resend client error:', emailResult.error);
      } else {
        emailSent = true;
        console.log('✅ Email client envoyé:', emailResult.data?.id);
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : 'Erreur email inconnue';
      console.error('❌ Email client exception:', err);
    }

    // 4b. Email de notification à l'ADMIN (contact@fidesconseil-patrimoine.fr)
    try {
      const adminEmailResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: body.email, // Répondre directement au client
        subject: `🎉 Nouveau lead — ${body.firstName} ${body.lastName}`,
        html: adminNotificationHtml({
          leadId: inserted.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
          birthDate: body.birthDate,
          postalCode: body.postalCode,
          startDate: body.startDate,
          regime: body.regime,
          coverageLevel: body.coverageLevel,
          hasSpouse: body.hasSpouse ?? false,
          spouseBirthDate: body.spouseBirthDate ?? null,
          spouseRegime: body.spouseRegime ?? null,
          children: body.children ?? [],
          wantsContact: body.wantsContact ?? true,
          createdAt: new Date(inserted.created_at).toLocaleString('fr-FR'),
        }),
      });

      if (adminEmailResult.error) {
        adminEmailError = adminEmailResult.error.message;
        console.error('❌ Resend admin error:', adminEmailResult.error);
      } else {
        adminEmailSent = true;
        console.log('✅ Email admin envoyé:', adminEmailResult.data?.id);
      }
    } catch (err) {
      adminEmailError = err instanceof Error ? err.message : 'Erreur email admin';
      console.error('❌ Email admin exception:', err);
    }

    // Mettre à jour le flag email_sent dans Supabase
    if (emailSent || adminEmailSent) {
      await supabaseAdmin
        .from('pricing_leads')
        .update({ email_sent: emailSent })
        .eq('id', inserted.id);
    }

    // ─── 5. Réponse finale ──────────────────────────────────
    return NextResponse.json({
      success: true,
      leadId: inserted.id,
      emailSent,
      emailError,
      adminEmailSent,
      adminEmailError,
    });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}