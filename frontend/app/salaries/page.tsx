'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Salaries() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ company: '', role: '', level: '', location: '' });

  const fetchSalaries = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.company) params.append('company', filters.company);
    if (filters.role) params.append('role', filters.role);
    if (filters.level) params.append('level', filters.level);
    if (filters.location) params.append('location', filters.location);
    const res = await fetch(`http://localhost:4000/salaries?${params}`);
    const data = await res.json();
    setSalaries(data);
    setLoading(false);
  };

  useEffect(() => { fetchSalaries(); }, []);

  const fmt = (n: number) => '₹' + (n / 100000).toFixed(1) + 'L';

  const inputStyle = {
    background: '#1e293b', border: '1px solid #334155', color: 'white',
    padding: '8px 12px', borderRadius: '6px', fontSize: '14px', width: '160px'
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#1e293b', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', textDecoration: 'none' }}>💰 CompIntel</Link>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/salaries" style={{ color: '#38bdf8', textDecoration: 'none' }}>Salaries</Link>
          <Link href="/compare" style={{ color: '#94a3b8', textDecoration: 'none' }}>Compare</Link>
        </div>
      </nav>

      <div style={{ padding: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>📊 Salary Table</h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={inputStyle} placeholder="Company (e.g. google)" value={filters.company} onChange={e => setFilters({ ...filters, company: e.target.value })} />
          <input style={inputStyle} placeholder="Role" value={filters.role} onChange={e => setFilters({ ...filters, role: e.target.value })} />
          <input style={inputStyle} placeholder="Level (e.g. L4)" value={filters.level} onChange={e => setFilters({ ...filters, level: e.target.value })} />
          <input style={inputStyle} placeholder="Location" value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} />
          <button onClick={fetchSalaries} style={{ background: '#38bdf8', color: '#0f172a', padding: '8px 20px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Filter</button>
          <button onClick={() => { setFilters({ company: '', role: '', level: '', location: '' }); setTimeout(fetchSalaries, 100); }} style={{ background: '#334155', color: 'white', padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Clear</button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ color: '#94a3b8', textAlign: 'center', padding: '60px' }}>Loading salaries...</div>
        ) : salaries.length === 0 ? (
          <div style={{ color: '#94a3b8', textAlign: 'center', padding: '60px' }}>No salaries found for these filters.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
                  {['Company', 'Role', 'Level', 'Location', 'Exp (yrs)', 'Base', 'Bonus', 'Stock', 'Total TC'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #334155' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salaries.map((s: any, i: number) => (
                  <tr key={s.id} style={{ background: i % 2 === 0 ? '#0f172a' : '#1e293b', borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <Link href={`/company/${s.company}`} style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', textTransform: 'capitalize' }}>{s.company}</Link>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{s.role}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ background: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{s.level}</span></td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{s.location}</td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8', textAlign: 'center' }}>{s.experience_years}</td>
                    <td style={{ padding: '12px 16px' }}>{fmt(s.base_salary)}</td>
                    <td style={{ padding: '12px 16px', color: '#4ade80' }}>{fmt(s.bonus)}</td>
                    <td style={{ padding: '12px 16px', color: '#fb923c' }}>{fmt(s.stock)}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#38bdf8' }}>{fmt(s.total_compensation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}