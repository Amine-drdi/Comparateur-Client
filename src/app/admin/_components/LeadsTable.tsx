'use client';

import { useState, useMemo } from 'react';

type Lead = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  wants_contact: boolean;
  birth_date: string;
  postal_code: string;
  start_date: string;
  regime: string;
  product_type: string;
  coverage_level: string;
  has_spouse: boolean;
  spouse_birth_date: string | null;
  spouse_regime: string | null;
  children: Array<{ birthDate: string; regime: string }> | null;
  source: string;
  email_sent: boolean;
};

type Props = {
  leads: Lead[];
};

const REGIME_LABELS: Record<string, string> = {
  SS: 'Salarié',
  TNS: 'TNS',
  FONCTIONNAIRE: 'Fonctionnaire',
  RETRAITE: 'Retraité',
  ETUDIANT: 'Étudiant',
};

const COVERAGE_LABELS: Record<string, { label: string; className: string }> = {
  minimum: { label: 'Minimum', className: 'bg-emerald-100 text-emerald-700' },
  moyen: { label: 'Moyen', className: 'bg-blue-100 text-blue-700' },
  fort: { label: 'Fort', className: 'bg-purple-100 text-purple-700' },
  maximum: { label: 'Maximum', className: 'bg-red-100 text-red-700' },
};

const PAGE_SIZE = 25;

export default function LeadsTable({ leads }: Props) {
  const [search, setSearch] = useState('');
  const [coverageFilter, setCoverageFilter] = useState<string>('');
  const [contactFilter, setContactFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof Lead>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...leads];

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (l) =>
          `${l.first_name} ${l.last_name}`.toLowerCase().includes(s) ||
          l.email.toLowerCase().includes(s) ||
          l.phone.includes(s) ||
          l.postal_code.includes(s)
      );
    }

    if (coverageFilter) result = result.filter((l) => l.coverage_level === coverageFilter);
    if (contactFilter === 'yes') result = result.filter((l) => l.wants_contact);
    if (contactFilter === 'no') result = result.filter((l) => !l.wants_contact);

    result.sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [leads, search, coverageFilter, contactFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: keyof Lead) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const exportCSV = () => {
    const headers = [
      'Date', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Contact',
      'Naissance', 'Code postal', "Date d'effet", 'Régime', 'Couverture',
      'Conjoint', 'Naissance conjoint', 'Régime conjoint', 'Enfants',
      'Source', 'Email envoyé',
    ];

    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleString('fr-FR'),
      l.first_name, l.last_name, l.email, l.phone,
      l.wants_contact ? 'Oui' : 'Non',
      l.birth_date, l.postal_code, l.start_date,
      REGIME_LABELS[l.regime] ?? l.regime,
      l.coverage_level,
      l.has_spouse ? 'Oui' : 'Non',
      l.spouse_birth_date ?? '',
      l.spouse_regime ? REGIME_LABELS[l.spouse_regime] ?? l.spouse_regime : '',
      (l.children ?? []).map((c) => `${c.birthDate} (${c.regime})`).join(' | '),
      l.source,
      l.email_sent ? 'Oui' : 'Non',
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Rechercher par nom, email, téléphone, code postal..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            />
          </div>

          <select value={coverageFilter} onChange={(e) => { setCoverageFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">Toutes couvertures</option>
            <option value="minimum">Minimum</option>
            <option value="moyen">Moyen</option>
            <option value="fort">Fort</option>
            <option value="maximum">Maximum</option>
          </select>

          <select value={contactFilter} onChange={(e) => { setContactFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">Tous</option>
            <option value="yes">Veut être contacté</option>
            <option value="no">Ne veut pas</option>
          </select>

          <button onClick={exportCSV} disabled={filtered.length === 0}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
          {filtered.length !== leads.length && ` (sur ${leads.length})`}
        </p>
      </div>

      {paginated.length === 0 ? (
        <div className="p-16 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Aucun résultat</p>
          <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos filtres</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-gray-700 select-none"
                  onClick={() => toggleSort('created_at')}>
                  <div className="flex items-center gap-1">
                    Date {sortKey === 'created_at' && <span className="text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-gray-700 select-none"
                  onClick={() => toggleSort('last_name')}>
                  <div className="flex items-center gap-1">
                    Nom {sortKey === 'last_name' && <span className="text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Simulation</th>
                <th className="px-4 py-3 font-semibold">Couverture</th>
                <th className="px-4 py-3 font-semibold">Famille</th>
                <th className="px-4 py-3 font-semibold text-center">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((lead) => (
                <FragmentRow key={lead.id} lead={lead} expandedId={expandedId} setExpandedId={setExpandedId} formatDate={formatDate} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {page} sur {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
              ← Précédent
            </button>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
              Suivant →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Sous-composant pour éviter le fragment <>
function FragmentRow({ lead, expandedId, setExpandedId, formatDate }: any) {
  const isOpen = expandedId === lead.id;
  return (
    <>
      <tr className="hover:bg-blue-50/30 transition-colors">
        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{formatDate(lead.created_at)}</td>
        <td className="px-4 py-3">
          <div className="font-medium text-gray-800">{lead.first_name} {lead.last_name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{lead.postal_code} · {formatDate(lead.birth_date)}</div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm text-gray-700">{lead.email}</div>
          <div className="text-xs text-gray-500 mt-0.5">{lead.phone}</div>
        </td>
        <td className="px-4 py-3">
          <div className="text-xs text-gray-600">
            <div>Effet : {formatDate(lead.start_date)}</div>
            <div className="mt-0.5">{REGIME_LABELS[lead.regime] ?? lead.regime}</div>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${COVERAGE_LABELS[lead.coverage_level]?.className ?? 'bg-gray-100 text-gray-700'}`}>
            {COVERAGE_LABELS[lead.coverage_level]?.label ?? lead.coverage_level}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2 text-xs">
            {lead.has_spouse && <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md font-medium">💑 Conjoint</span>}
            {lead.children && lead.children.length > 0 && <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md font-medium">👶 {lead.children.length}</span>}
            {!lead.has_spouse && (!lead.children || lead.children.length === 0) && <span className="text-gray-400">—</span>}
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <button onClick={() => setExpandedId(isOpen ? null : lead.id)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </td>
      </tr>

      {isOpen && (
        <tr className="bg-gray-50/50">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Contact</p>
                <div className="space-y-1 text-gray-700">
                  <p>✉️ {lead.email}</p>
                  <p>📞 {lead.phone}</p>
                  <p>{lead.wants_contact ? <span className="text-emerald-600 font-medium">✅ Veut être contacté</span> : <span className="text-red-600 font-medium">❌ Ne veut pas être contacté</span>}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Famille</p>
                <div className="space-y-1 text-gray-700">
                  {lead.has_spouse ? (
                    <p>💑 Conjoint : {formatDate(lead.spouse_birth_date)}{lead.spouse_regime && ` (${REGIME_LABELS[lead.spouse_regime] ?? lead.spouse_regime})`}</p>
                  ) : <p className="text-gray-400">Pas de conjoint</p>}
                  {lead.children && lead.children.length > 0 ? (
                    <div>
                      <p className="mt-1">👶 Enfants :</p>
                      <ul className="ml-4 mt-1 space-y-0.5 text-xs">
                        {lead.children.map((c: any, i: number) => (
                          <li key={i}>Enfant {i + 1} : {formatDate(c.birthDate)} ({REGIME_LABELS[c.regime] ?? c.regime})</li>
                        ))}
                      </ul>
                    </div>
                  ) : <p className="text-gray-400">Pas d'enfants</p>}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Métadonnées</p>
                <div className="space-y-1 text-gray-700 text-xs">
                  <p><span className="text-gray-500">ID :</span> <span className="font-mono">{lead.id}</span></p>
                  <p><span className="text-gray-500">Source :</span> {lead.source}</p>
                  <p><span className="text-gray-500">Email envoyé :</span> {lead.email_sent ? '✅ Oui' : '❌ Non'}</p>
                  <p><span className="text-gray-500">Produit :</span> {lead.product_type}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}