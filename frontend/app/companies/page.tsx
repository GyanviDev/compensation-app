'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Companies() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://compensation-app.onrender.com/salaries')
      .then(r => r.json())
      .then(data => {
        const unique = [...new Set(data.map((s: any) => s.company))] as string[];
        setCompanies(unique.sort());
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#1e293b', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#38bdf8', textDecoration: 'none' }}>💰 CompIntel</Link>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/salaries" style={{ color: '#94a3b8', textDecoration: 'none' }}>Salaries</Link>
          <Link href="/compare" style={{ color: '#94a3b8', textDecoration: 'none' }}>Compare</Link>
        </div>
      </nav>

      <div style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🏢 Companies</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Click any company to see salary breakdown and level distribution</p>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading companies...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {companies.map(company => (
              <Link key={company} href={`/company/${company}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏢</div>
                  <div style={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#38bdf8' }}>{company}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}