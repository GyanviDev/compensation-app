'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CompanyPage() {
  const { company } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/company/${company}`)
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setData(d); setLoading(false); })
      .catch(() => { setError('Failed to load'); setLoading(false); });
  }, [company]);

  const fmt = (n: number) => '₹' + (n / 100000).toFixed(1) + 'L';

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#1e293b', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', textDecoration: 'none' }}>💰 CompIntel</Link>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/salaries" style={{ color: '#94a3b8', textDecoration: 'none' }}>Salaries</Link>
          <Link href="/compare" style={{ color: '#94a3b8', textDecoration: 'none' }}>Compare</Link>
        </div>
      </nav>

      <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        {loading && <div style={{ color: '#94a3b8', textAlign: 'center', padding: '60px' }}>Loading...</div>}
        {error && <div style={{ color: '#f87171', textAlign: 'center', padding: '60px' }}>⚠️ {error}</div>}

        {data && <>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'capitalize', marginBottom: '8px' }}>🏢 {data.company}</h1>
          <p style={{ color: '#94a3b8', marginBottom: '32px' }}>{data.salaries.length} salary records</p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{ background: '#1e293b', padding: '24px 32px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#38bdf8' }}>{fmt(data.median_compensation)}</div>
              <div style={{ color: '#94a3b8', marginTop: '4px' }}>Median Total TC</div>
            </div>
            <div style={{ background: '#1e293b', padding: '24px 32px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4ade80' }}>{data.salaries.length}</div>
              <div style={{ color: '#94a3b8', marginTop: '4px' }}>Records</div>
            </div>
          </div>

          {/* Level Distribution */}
          <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Level Distribution</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.entries(data.level_distribution).map(([level, count]: any) => (
                <div key={level} style={{ background: '#1d4ed8', padding: '8px 16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>{level}</div>
                  <div style={{ fontSize: '12px', color: '#bfdbfe' }}>{count} records</div>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Table */}
          <div style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '20px 24px', borderBottom: '1px solid #334155', margin: 0 }}>All Salaries</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ color: '#94a3b8' }}>
                  {['Role', 'Level', 'Location', 'Exp', 'Base', 'Bonus', 'Stock', 'Total TC'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #334155' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.salaries.map((s: any, i: number) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #334155', background: i % 2 === 0 ? 'transparent' : '#0f172a' }}>
                    <td style={{ padding: '12px 16px' }}>{s.role}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ background: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{s.level}</span></td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{s.location}</td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{s.experience_years}y</td>
                    <td style={{ padding: '12px 16px' }}>{fmt(s.base_salary)}</td>
                    <td style={{ padding: '12px 16px', color: '#4ade80' }}>{fmt(s.bonus)}</td>
                    <td style={{ padding: '12px 16px', color: '#fb923c' }}>{fmt(s.stock)}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#38bdf8' }}>{fmt(s.total_compensation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}
      </div>
    </main>
  );
}
