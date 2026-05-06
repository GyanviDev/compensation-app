'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Compare() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://compensation-app.onrender.com/salaries')
      .then(r => r.json())
      .then(setSalaries);
  }, []);

  const compare = async () => {
    if (!id1 || !id2) { setError('Please select both salaries'); return; }
    if (id1 === id2) { setError('Please select two different salaries'); return; }
    setError('');
    setLoading(true);
    const res = await fetch(`http://localhost:4000/compare?id1=${id1}&id2=${id2}`);
    const data = await res.json();
    if (data.error) setError(data.error);
    else setResult(data);
    setLoading(false);
  };

  const fmt = (n: number) => '₹' + (n / 100000).toFixed(1) + 'L';
  const diff = (n: number) => n > 0 ? <span style={{color:'#4ade80'}}>+{fmt(n)}</span> : n < 0 ? <span style={{color:'#f87171'}}>{fmt(n)}</span> : <span style={{color:'#94a3b8'}}>—</span>;

  const selectStyle = {
    background: '#1e293b', border: '1px solid #334155', color: 'white',
    padding: '10px 14px', borderRadius: '8px', fontSize: '14px', width: '100%'
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#1e293b', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', textDecoration: 'none' }}>💰 CompIntel</Link>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/salaries" style={{ color: '#94a3b8', textDecoration: 'none' }}>Salaries</Link>
          <Link href="/compare" style={{ color: '#38bdf8', textDecoration: 'none' }}>Compare</Link>
        </div>
      </nav>

      <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>⚖️ Compare Salaries</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Select any two salary records to see a side-by-side breakdown</p>

        {/* Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {[{ label: 'Salary A', val: id1, set: setId1 }, { label: 'Salary B', val: id2, set: setId2 }].map(({ label, val, set }) => (
            <div key={label}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>{label}</label>
              <select style={selectStyle} value={val} onChange={e => set(e.target.value)}>
                <option value="">-- Select a salary --</option>
                {salaries.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.company.charAt(0).toUpperCase() + s.company.slice(1)} · {s.role} · {s.level} · {fmt(s.total_compensation)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {error && <div style={{ color: '#f87171', marginBottom: '16px' }}>⚠️ {error}</div>}

        <button onClick={compare} disabled={loading} style={{ background: '#38bdf8', color: '#0f172a', padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginBottom: '32px' }}>
          {loading ? 'Comparing...' : 'Compare →'}
        </button>

        {/* Result */}
        {result && (
          <div style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' }}>
            {/* Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #334155' }}>
              <div style={{ padding: '20px', color: '#94a3b8', fontSize: '14px' }}>Component</div>
              {[result.salary_1, result.salary_2].map((s: any, i: number) => (
                <div key={i} style={{ padding: '20px', borderLeft: '1px solid #334155' }}>
                  <div style={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#38bdf8' }}>{s.company}</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>{s.role} · <span style={{ background: '#1d4ed8', padding: '1px 6px', borderRadius: '4px' }}>{s.level}</span></div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.location} · {s.experience_years}y exp</div>
                </div>
              ))}
            </div>

            {/* Rows */}
            {[
              { label: '💰 Base Salary', key: 'base_salary', diffKey: 'base' },
              { label: '🎁 Bonus', key: 'bonus', diffKey: 'bonus' },
              { label: '📈 Stock', key: 'stock', diffKey: 'stock' },
              { label: '🏆 Total TC', key: 'total_compensation', diffKey: 'total' },
            ].map(({ label, key, diffKey }, idx) => (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #1e293b', background: idx % 2 === 0 ? '#0f172a' : 'transparent' }}>
                <div style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '14px' }}>{label}</div>
                <div style={{ padding: '16px 20px', borderLeft: '1px solid #334155', fontWeight: key === 'total_compensation' ? 'bold' : 'normal', color: key === 'total_compensation' ? '#38bdf8' : 'white' }}>
                  {fmt(result.salary_1[key])}
                </div>
                <div style={{ padding: '16px 20px', borderLeft: '1px solid #334155', fontWeight: key === 'total_compensation' ? 'bold' : 'normal', color: key === 'total_compensation' ? '#38bdf8' : 'white' }}>
                  {fmt(result.salary_2[key])}
                </div>
              </div>
            ))}

            {/* Difference row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#1e293b', borderTop: '2px solid #334155' }}>
              <div style={{ padding: '16px 20px', fontWeight: 'bold' }}>Difference (A vs B)</div>
              <div style={{ padding: '16px 20px', borderLeft: '1px solid #334155', fontWeight: 'bold' }}>
                {diff(result.difference.total)}
              </div>
              <div style={{ padding: '16px 20px', borderLeft: '1px solid #334155', color: '#94a3b8', fontSize: '13px' }}>
                {result.difference.level_difference}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}