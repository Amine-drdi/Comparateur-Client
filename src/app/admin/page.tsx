import { supabaseAdmin } from '@/lib/supabase-admin';
import Link from 'next/link';
import LeadsAreaChart from './_components/LeadsAreaChart';
import CoveragePieChart from './_components/CoveragePieChart';

// ─── Helpers ──────────────────────────────────────────────
function formatDateFR(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ─── Requêtes Supabase ────────────────────────────────────
async function getStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Total
  const { count: total } = await supabaseAdmin
    .from('pricing_leads')
    .select('*', { count: 'exact', head: true });

  // Aujourd'hui
  const { count: today } = await supabaseAdmin
    .from('pricing_leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayStart);

  // Cette semaine
  const { count: week } = await supabaseAdmin
    .from('pricing_leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekStart);

  // 30 derniers jours
  const { count: month } = await supabaseAdmin
    .from('pricing_leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', monthStart);

  // Derniers leads (5)
  const { data: recentLeads } = await supabaseAdmin
    .from('pricing_leads')
    .select('id, first_name, last_name, email, postal_code, coverage_level, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  // Tous les leads des 30 derniers jours (pour les graphiques)
  const { data: monthLeads } = await supabaseAdmin
    .from('pricing_leads')
    .select('created_at, coverage_level, has_spouse')
    .gte('created_at', monthStart);

  return { total, today, week, month, recentLeads, monthLeads };
}

// ─── Préparer les données pour les graphiques ─────────────
function buildDailyData(leads: any[]) {
  const days: Record<string, number> = {};
  // Initialiser les 30 derniers jours à 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days[key] = 0;
  }
  // Compter
  leads?.forEach((lead) => {
    const key = new Date(lead.created_at).toISOString().split('T')[0];
    if (key in days) days[key]++;
  });
  return Object.entries(days).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    count,
  }));
}

function buildCoverageData(leads: any[]) {
  const counts: Record<string, number> = { minimum: 0, moyen: 0, fort: 0, maximum: 0 };
  leads?.forEach((lead) => {
    if (lead.coverage_level in counts) counts[lead.coverage_level]++;
  });
  return [
    { name: 'Minimum', value: counts.minimum, color: '#10b981' },
    { name: 'Moyen', value: counts.moyen, color: '#3b82f6' },
    { name: 'Fort', value: counts.fort, color: '#a855f7' },
    { name: 'Maximum', value: counts.maximum, color: '#ef4444' },
  ].filter((d) => d.value > 0);
}

// ─── Page ─────────────────────────────────────────────────
export default async function AdminDashboardPage() {
  const { total, today, week, month, recentLeads, monthLeads } = await getStats();

  const dailyData = buildDailyData(monthLeads ?? []);
  const coverageData = buildCoverageData(monthLeads ?? []);

  const kpis = [
    { label: 'Total leads', value: total ?? 0, icon: '📊', color: 'from-blue-500 to-blue-600' },
    { label: "Aujourd'hui", value: today ?? 0, icon: '⚡', color: 'from-emerald-500 to-emerald-600' },
    { label: '7 derniers jours', value: week ?? 0, icon: '📅', color: 'from-orange-500 to-orange-600' },
    { label: '30 derniers jours', value: month ?? 0, icon: '📈', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">Vue d'ensemble des leads du comparateur</p>
            </div>
            <Link
              href="/admin/leads"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:shadow-lg transition-all"
            >
              Voir tous les leads →
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-2xl shadow-md`}
                >
                  {kpi.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">{kpi.value}</div>
              <div className="text-sm text-gray-500 mt-1">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphiques */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Évolution des leads (2/3) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Évolution des leads</h2>
            <p className="text-sm text-gray-500 mb-6">30 derniers jours</p>
            {dailyData.every((d) => d.count === 0) ? (
              <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                Aucune donnée sur cette période
              </div>
            ) : (
              <LeadsAreaChart data={dailyData} />
            )}
          </div>

          {/* Répartition par couverture (1/3) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Niveau de couverture</h2>
            <p className="text-sm text-gray-500 mb-6">30 derniers jours</p>
            {coverageData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                Aucune donnée
              </div>
            ) : (
              <CoveragePieChart data={coverageData} />
            )}
          </div>
        </div>
      </div>

      {/* Derniers leads */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Derniers leads</h2>
            <Link href="/admin/leads" className="text-sm text-blue-600 hover:underline">
              Tout voir
            </Link>
          </div>
          {recentLeads && recentLeads.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs uppercase text-gray-500">
                  <th className="px-6 py-3 font-semibold">Nom</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">CP</th>
                  <th className="px-6 py-3 font-semibold">Couverture</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {lead.first_name} {lead.last_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.postal_code}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                        {lead.coverage_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDateFR(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-400 text-sm">
              Aucun lead pour l'instant
            </div>
          )}
        </div>
      </div>
    </div>
  );
}