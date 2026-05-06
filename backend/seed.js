const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const salaries = [
  { company: 'Google', role: 'Software Engineer', level: 'L3', location: 'Bangalore', experience_years: 1, base_salary: 1800000, bonus: 200000, stock: 500000 },
  { company: 'Google', role: 'Software Engineer', level: 'L4', location: 'Bangalore', experience_years: 3, base_salary: 2500000, bonus: 500000, stock: 1000000 },
  { company: 'Google', role: 'Software Engineer', level: 'L5', location: 'Bangalore', experience_years: 6, base_salary: 3500000, bonus: 800000, stock: 2000000 },
  { company: 'Google', role: 'Software Engineer', level: 'L6', location: 'Hyderabad', experience_years: 9, base_salary: 5000000, bonus: 1200000, stock: 4000000 },
  { company: 'Google', role: 'Data Scientist', level: 'L4', location: 'Bangalore', experience_years: 3, base_salary: 2800000, bonus: 600000, stock: 1200000 },
  { company: 'Microsoft', role: 'Software Engineer', level: 'SDE1', location: 'Hyderabad', experience_years: 1, base_salary: 1600000, bonus: 150000, stock: 400000 },
  { company: 'Microsoft', role: 'Software Engineer', level: 'SDE2', location: 'Hyderabad', experience_years: 4, base_salary: 2400000, bonus: 400000, stock: 900000 },
  { company: 'Microsoft', role: 'Software Engineer', level: 'SDE3', location: 'Hyderabad', experience_years: 7, base_salary: 3800000, bonus: 700000, stock: 2500000 },
  { company: 'Microsoft', role: 'Product Manager', level: 'PM', location: 'Hyderabad', experience_years: 5, base_salary: 3200000, bonus: 600000, stock: 1500000 },
  { company: 'Microsoft', role: 'Data Scientist', level: 'SDE2', location: 'Bangalore', experience_years: 3, base_salary: 2600000, bonus: 450000, stock: 1000000 },
  { company: 'Amazon', role: 'Software Engineer', level: 'SDE1', location: 'Bangalore', experience_years: 1, base_salary: 1500000, bonus: 300000, stock: 600000 },
  { company: 'Amazon', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', experience_years: 4, base_salary: 2300000, bonus: 500000, stock: 1200000 },
  { company: 'Amazon', role: 'Software Engineer', level: 'SDE3', location: 'Hyderabad', experience_years: 8, base_salary: 3500000, bonus: 800000, stock: 3000000 },
  { company: 'Amazon', role: 'Data Engineer', level: 'SDE2', location: 'Bangalore', experience_years: 4, base_salary: 2200000, bonus: 400000, stock: 1000000 },
  { company: 'Amazon', role: 'Product Manager', level: 'PM', location: 'Hyderabad', experience_years: 6, base_salary: 3000000, bonus: 700000, stock: 2000000 },
  { company: 'Meta', role: 'Software Engineer', level: 'E4', location: 'Bangalore', experience_years: 2, base_salary: 2800000, bonus: 600000, stock: 1500000 },
  { company: 'Meta', role: 'Software Engineer', level: 'E5', location: 'Bangalore', experience_years: 5, base_salary: 4000000, bonus: 1000000, stock: 3000000 },
  { company: 'Meta', role: 'Data Scientist', level: 'E5', location: 'Bangalore', experience_years: 5, base_salary: 4200000, bonus: 1100000, stock: 3200000 },
  { company: 'Apple', role: 'Software Engineer', level: 'ICT3', location: 'Hyderabad', experience_years: 2, base_salary: 2200000, bonus: 400000, stock: 800000 },
  { company: 'Apple', role: 'Software Engineer', level: 'ICT4', location: 'Hyderabad', experience_years: 5, base_salary: 3200000, bonus: 700000, stock: 2000000 },
  { company: 'Flipkart', role: 'Software Engineer', level: 'SDE1', location: 'Bangalore', experience_years: 1, base_salary: 1400000, bonus: 150000, stock: 300000 },
  { company: 'Flipkart', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', experience_years: 4, base_salary: 2100000, bonus: 300000, stock: 700000 },
  { company: 'Flipkart', role: 'Software Engineer', level: 'SDE3', location: 'Bangalore', experience_years: 7, base_salary: 3000000, bonus: 500000, stock: 1500000 },
  { company: 'Flipkart', role: 'Product Manager', level: 'PM2', location: 'Bangalore', experience_years: 5, base_salary: 2800000, bonus: 500000, stock: 1200000 },
  { company: 'Swiggy', role: 'Software Engineer', level: 'SDE1', location: 'Bangalore', experience_years: 1, base_salary: 1300000, bonus: 100000, stock: 200000 },
  { company: 'Swiggy', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', experience_years: 3, base_salary: 1900000, bonus: 250000, stock: 600000 },
  { company: 'Swiggy', role: 'Data Scientist', level: 'SDE2', location: 'Bangalore', experience_years: 3, base_salary: 2000000, bonus: 300000, stock: 700000 },
  { company: 'Zomato', role: 'Software Engineer', level: 'SDE1', location: 'Gurgaon', experience_years: 1, base_salary: 1200000, bonus: 100000, stock: 200000 },
  { company: 'Zomato', role: 'Software Engineer', level: 'SDE2', location: 'Gurgaon', experience_years: 3, base_salary: 1800000, bonus: 200000, stock: 500000 },
  { company: 'Zomato', role: 'Product Manager', level: 'PM1', location: 'Gurgaon', experience_years: 4, base_salary: 2200000, bonus: 350000, stock: 800000 },
  { company: 'Razorpay', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', experience_years: 3, base_salary: 2000000, bonus: 300000, stock: 600000 },
  { company: 'Razorpay', role: 'Software Engineer', level: 'SDE3', location: 'Bangalore', experience_years: 6, base_salary: 2800000, bonus: 500000, stock: 1200000 },
  { company: 'Paytm', role: 'Software Engineer', level: 'SDE1', location: 'Noida', experience_years: 1, base_salary: 1100000, bonus: 80000, stock: 150000 },
  { company: 'Paytm', role: 'Software Engineer', level: 'SDE2', location: 'Noida', experience_years: 3, base_salary: 1700000, bonus: 180000, stock: 400000 },
  { company: 'Infosys', role: 'Software Engineer', level: 'SE', location: 'Pune', experience_years: 2, base_salary: 800000, bonus: 50000, stock: 0 },
  { company: 'Infosys', role: 'Software Engineer', level: 'SSE', location: 'Pune', experience_years: 5, base_salary: 1200000, bonus: 80000, stock: 0 },
  { company: 'Infosys', role: 'Software Engineer', level: 'Tech Lead', location: 'Bangalore', experience_years: 8, base_salary: 1800000, bonus: 150000, stock: 0 },
  { company: 'TCS', role: 'Software Engineer', level: 'ASE', location: 'Mumbai', experience_years: 1, base_salary: 700000, bonus: 40000, stock: 0 },
  { company: 'TCS', role: 'Software Engineer', level: 'SE', location: 'Mumbai', experience_years: 4, base_salary: 1000000, bonus: 60000, stock: 0 },
  { company: 'Wipro', role: 'Software Engineer', level: 'SE', location: 'Chennai', experience_years: 2, base_salary: 750000, bonus: 45000, stock: 0 },
  { company: 'Wipro', role: 'Software Engineer', level: 'SSE', location: 'Chennai', experience_years: 5, base_salary: 1100000, bonus: 75000, stock: 0 },
  { company: 'Atlassian', role: 'Software Engineer', level: 'L4', location: 'Bangalore', experience_years: 4, base_salary: 3000000, bonus: 600000, stock: 1500000 },
  { company: 'Atlassian', role: 'Software Engineer', level: 'L5', location: 'Bangalore', experience_years: 7, base_salary: 4200000, bonus: 900000, stock: 2500000 },
  { company: 'Uber', role: 'Software Engineer', level: 'L4', location: 'Bangalore', experience_years: 3, base_salary: 2600000, bonus: 500000, stock: 1200000 },
  { company: 'Uber', role: 'Software Engineer', level: 'L5', location: 'Bangalore', experience_years: 6, base_salary: 3800000, bonus: 800000, stock: 2500000 },
  { company: 'Uber', role: 'Data Scientist', level: 'L4', location: 'Bangalore', experience_years: 4, base_salary: 2900000, bonus: 600000, stock: 1400000 },
  { company: 'LinkedIn', role: 'Software Engineer', level: 'SE', location: 'Bangalore', experience_years: 3, base_salary: 2700000, bonus: 550000, stock: 1300000 },
  { company: 'LinkedIn', role: 'Software Engineer', level: 'SSE', location: 'Bangalore', experience_years: 6, base_salary: 3900000, bonus: 850000, stock: 2800000 },
  { company: 'Adobe', role: 'Software Engineer', level: 'MTS1', location: 'Bangalore', experience_years: 2, base_salary: 2000000, bonus: 300000, stock: 700000 },
  { company: 'Adobe', role: 'Software Engineer', level: 'MTS2', location: 'Bangalore', experience_years: 5, base_salary: 3000000, bonus: 600000, stock: 1600000 },
];

async function seed() {
  console.log('Seeding database...');
  for (const s of salaries) {
    const company = s.company.trim().toLowerCase();
    const bonus = s.bonus || 0;
    const stock = s.stock || 0;
    const total = s.base_salary + bonus + stock;
    await pool.query(
      `INSERT INTO salaries (company, role, level, location, experience_years, base_salary, bonus, stock, total_compensation)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [company, s.role, s.level, s.location, s.experience_years, s.base_salary, bonus, stock, total]
    );
  }
  console.log('Done! 50 records inserted.');
  process.exit(0);
}

seed();