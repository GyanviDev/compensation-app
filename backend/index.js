const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Helper: normalize company name
const normalize = (str) => str.trim().toLowerCase();

// POST /ingest-salary
app.post('/ingest-salary', async (req, res) => {
  try {
    let { company, role, level, location, experience_years, base_salary, bonus, stock, confidence_score } = req.body;

    if (!company || !role || !level || !location || !experience_years || !base_salary) {
      return res.status(400).json({ error: 'Missing required fields: company, role, level, location, experience_years, base_salary' });
    }

    company = normalize(company);
    bonus = bonus || 0;
    stock = stock || 0;
    confidence_score = confidence_score || 0.8;
    const total_compensation = parseInt(base_salary) + parseInt(bonus) + parseInt(stock);

    const result = await pool.query(
      `INSERT INTO salaries (company, role, level, location, experience_years, base_salary, bonus, stock, total_compensation, confidence_score)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [company, role, level, location, experience_years, base_salary, bonus, stock, total_compensation, confidence_score]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /salaries
app.get('/salaries', async (req, res) => {
  try {
    const { company, role, level, location, sort } = req.query;
    let query = 'SELECT * FROM salaries WHERE 1=1';
    const params = [];

    if (company) { params.push(normalize(company)); query += ` AND company = $${params.length}`; }
    if (role) { params.push(role); query += ` AND role ILIKE $${params.length}`; }
    if (level) { params.push(level); query += ` AND level = $${params.length}`; }
    if (location) { params.push(location); query += ` AND location ILIKE $${params.length}`; }

    query += ` ORDER BY total_compensation ${sort === 'asc' ? 'ASC' : 'DESC'}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /company/:company
app.get('/company/:company', async (req, res) => {
  try {
    const company = normalize(req.params.company);
    const salaries = await pool.query('SELECT * FROM salaries WHERE company = $1 ORDER BY total_compensation DESC', [company]);

    if (salaries.rows.length === 0) return res.status(404).json({ error: 'Company not found' });

    const totals = salaries.rows.map(r => r.total_compensation);
    const median = totals.sort((a,b)=>a-b)[Math.floor(totals.length/2)];

    const levelDist = {};
    salaries.rows.forEach(r => { levelDist[r.level] = (levelDist[r.level] || 0) + 1; });

    res.json({ company, salaries: salaries.rows, median_compensation: median, level_distribution: levelDist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /compare
app.get('/compare', async (req, res) => {
  try {
    const { id1, id2 } = req.query;
    if (!id1 || !id2) return res.status(400).json({ error: 'Provide id1 and id2' });

    const result = await pool.query('SELECT * FROM salaries WHERE id = $1 OR id = $2', [id1, id2]);
    if (result.rows.length < 2) return res.status(404).json({ error: 'One or both salaries not found' });

    const [a, b] = result.rows;
    res.json({
      salary_1: a,
      salary_2: b,
      difference: {
        base: a.base_salary - b.base_salary,
        bonus: a.bonus - b.bonus,
        stock: a.stock - b.stock,
        total: a.total_compensation - b.total_compensation,
        level_difference: `${a.level} vs ${b.level}`
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.json({ status: 'API running' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));