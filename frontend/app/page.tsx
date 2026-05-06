'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{minHeight:'100vh',background:'#0f172a',color:'white',fontFamily:'sans-serif'}}>
      
      <nav style={{background:'#1e293b',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #334155'}}>
        <span style={{fontSize:'22px',fontWeight:'bold',color:'#38bdf8'}}>💰 CompIntel</span>
        <div style={{display:'flex',gap:'24px'}}>
          <Link href="/salaries" style={{color:'#94a3b8',textDecoration:'none'}}>Salaries</Link>
          <Link href="/compare" style={{color:'#94a3b8',textDecoration:'none'}}>Compare</Link>
        </div>
      </nav>

      <div style={{textAlign:'center',padding:'80px 20px 40px'}}>
        <h1 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'16px'}}>
          Know Your <span style={{color:'#38bdf8'}}>Real Worth</span>
        </h1>
        <p style={{fontSize:'18px',color:'#94a3b8',marginBottom:'40px'}}>
          Level-based compensation data for Indian tech companies.<br/>
          L3 ≠ L4 ≠ L5 — because titles lie, levels don't.
        </p>
        <Link href="/salaries">
          <button style={{background:'#38bdf8',color:'#0f172a',padding:'14px 32px',borderRadius:'8px',border:'none',fontSize:'16px',fontWeight:'bold',cursor:'pointer'}}>
            Browse Salaries →
          </button>
        </Link>
      </div>

      <div style={{display:'flex',justifyContent:'center',gap:'40px',padding:'40px 20px',flexWrap:'wrap'}}>
        {[['50+','Salary Records'],['15+','Companies'],['4','Cities'],['L3–L7','All Levels']].map(([num,label])=>(
          <div key={label} style={{textAlign:'center',background:'#1e293b',padding:'24px 32px',borderRadius:'12px',border:'1px solid #334155'}}>
            <div style={{fontSize:'32px',fontWeight:'bold',color:'#38bdf8'}}>{num}</div>
            <div style={{color:'#94a3b8',marginTop:'4px'}}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',justifyContent:'center',gap:'24px',padding:'20px',flexWrap:'wrap'}}>
        {[
          {title:'📊 Salary Table',desc:'Filter by company, role, level, location. Sorted by total comp.',href:'/salaries'},
          {title:'⚖️ Compare',desc:'Pick any 2 salaries and see a side-by-side breakdown.',href:'/compare'},
          {title:'🏢 Company Page',desc:'See median pay and level distribution per company.',href:'/company/google'},
        ].map(card=>(
          <Link key={card.href} href={card.href} style={{textDecoration:'none'}}>
            <div style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'24px',width:'240px',cursor:'pointer'}}>
              <div style={{fontSize:'20px',marginBottom:'8px'}}>{card.title}</div>
              <div style={{color:'#94a3b8',fontSize:'14px'}}>{card.desc}</div>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}