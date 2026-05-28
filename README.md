# CompIntel

A salary intelligence platform for Indian tech companies. Built this because most salary sites compare by title — which is useless. Google L3 and Google L5 are both "Software Engineer" but one pays 2.5x the other.

Live: https://compensation-app.vercel.app

# What it does

- Salary table with filters (company, role, level, location)
- Company pages showing median pay and level breakdown
- Compare any two salaries side by side
- 51 records across 15+ companies, all stored in PostgreSQL

# Stack

Next.js frontend on Vercel, Node.js/Express backend on Render, PostgreSQL on Supabase.

# Running locally

```bash
cd backend
npm install
node index.js

cd ../frontend
npm install
npm run dev

# A few things I handled

Company names get normalized on ingest so "Google", "GOOGLE" and "google" all map to the same records. Total comp is always calculated server side. Missing bonus/stock default to zero.
