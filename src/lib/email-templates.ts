// ───────────────────────────────────────────────────────────
// TEMPLATE 1 — Email de confirmation au CLIENT
// ───────────────────────────────────────────────────────────
type ConfirmationEmailParams = {
  firstName: string;
};

export function confirmationEmailHtml({
  firstName,
}: ConfirmationEmailParams): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre simulation est prête</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f6fb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);padding:40px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
                ✅ Votre simulation est prête
              </h1>
              <p style="margin:12px 0 0;color:#e0e7ff;font-size:15px;">
                Merci ${firstName} !
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#1f2937;font-size:16px;line-height:1.6;">
                Nous avons bien reçu votre demande de comparaison de mutuelle santé.
              </p>

              <p style="margin:0 0 16px;color:#1f2937;font-size:16px;line-height:1.6;">
                Un conseiller vous contactera prochainement au numéro que vous avez indiqué pour vous présenter les meilleures offres adaptées à votre profil.
              </p>

              <p style="margin:24px 0 0;color:#1f2937;font-size:16px;line-height:1.6;">
                À très bientôt,<br>
                <strong>L'équipe Comparateur Mutuelle Santé</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:13px;">
                📞 01 23 45 67 89 — du lundi au vendredi, 9h-18h
              </p>
              <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">
                Cet email vous a été envoyé suite à votre simulation sur notre site.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ───────────────────────────────────────────────────────────
// TEMPLATE 2 — Notification interne (admin)
// ───────────────────────────────────────────────────────────
type AdminNotificationParams = {
  leadId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  postalCode: string;
  startDate: string;
  regime: string;
  coverageLevel: string;
  hasSpouse: boolean;
  spouseBirthDate?: string | null;
  spouseRegime?: string | null;
  children: Array<{ birthDate: string; regime: string }>;
  wantsContact: boolean;
  createdAt: string;
};

const REGIME_LABELS: Record<string, string> = {
  SS: 'Salarié',
  TNS: 'Travailleur Non Salarié (TNS)',
  FONCTIONNAIRE: 'Fonctionnaire',
  RETRAITE: 'Retraité',
  ETUDIANT: 'Étudiant',
};

const LEVEL_LABELS: Record<string, string> = {
  minimum: '🟢 Minimum',
  moyen: '🔵 Moyen',
  fort: '🟣 Fort',
  maximum: '🔥 Maximum',
};

export function adminNotificationHtml(params: AdminNotificationParams): string {
  const {
    leadId,
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    postalCode,
    startDate,
    regime,
    coverageLevel,
    hasSpouse,
    spouseBirthDate,
    spouseRegime,
    children,
    wantsContact,
    createdAt,
  } = params;

  const regimeLabel = REGIME_LABELS[regime] ?? regime;
  const levelLabel = LEVEL_LABELS[coverageLevel] ?? coverageLevel;

  const childrenRows =
    children.length > 0
      ? children
          .map(
            (c, i) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px;">
            Enfant ${i + 1}
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">
            ${c.birthDate} — ${REGIME_LABELS[c.regime] ?? c.regime}
          </td>
        </tr>`
          )
          .join('')
      : `<tr><td colspan="2" style="padding:8px 12px;color:#6b7280;font-size:14px;font-style:italic;">Aucun enfant</td></tr>`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouveau lead — Comparateur Mutuelle</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f6fb;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#059669 0%,#10b981 100%);padding:28px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">
                🎉 Nouveau lead reçu
              </h1>
              <p style="margin:8px 0 0;color:#d1fae5;font-size:14px;">
                Comparateur Mutuelle Santé — ${createdAt}
              </p>
            </td>
          </tr>

          <!-- Lead ID -->
          <tr>
            <td style="padding:20px 32px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">
                Identifiant du lead
              </p>
              <p style="margin:4px 0 0;color:#111827;font-size:14px;font-family:monospace;">
                ${leadId}
              </p>
            </td>
          </tr>

          <!-- Coordonnées -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <h2 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700;">
                👤 Coordonnées
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:180px;">Nom complet</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Email</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Téléphone</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;"><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;color:#6b7280;font-size:13px;">Accepte d'être contacté</td>
                  <td style="padding:8px 12px;color:${wantsContact ? '#059669' : '#dc2626'};font-size:14px;font-weight:600;">
                    ${wantsContact ? '✅ Oui' : '❌ Non'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Simulation -->
          <tr>
            <td style="padding:16px 32px 8px;">
              <h2 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700;">
                📋 Détails de la simulation
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:180px;">Date de naissance</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${birthDate}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Code postal</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${postalCode}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Date d'effet souhaitée</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${startDate}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">Régime</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${regimeLabel}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#f9fafb;color:#6b7280;font-size:13px;">Niveau de couverture</td>
                  <td style="padding:8px 12px;color:#111827;font-size:14px;">${levelLabel}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Conjoint -->
          <tr>
            <td style="padding:16px 32px 8px;">
              <h2 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700;">
                💑 Conjoint
              </h2>
              ${
                hasSpouse
                  ? `
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:180px;">Date de naissance</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${spouseBirthDate ?? '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px;background:#f9fafb;color:#6b7280;font-size:13px;">Régime</td>
                    <td style="padding:8px 12px;color:#111827;font-size:14px;">${spouseRegime ? (REGIME_LABELS[spouseRegime] ?? spouseRegime) : '—'}</td>
                  </tr>
                </table>`
                  : `<p style="margin:0;padding:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;color:#6b7280;font-size:14px;font-style:italic;">Pas de conjoint</p>`
              }
            </td>
          </tr>

          <!-- Enfants -->
          <tr>
            <td style="padding:16px 32px 24px;">
              <h2 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700;">
                👨‍👩‍👧‍👦 Enfants (${children.length})
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                ${childrenRows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:12px;">
                Email automatique envoyé par le comparateur — ${new Date().toLocaleString('fr-FR')}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}