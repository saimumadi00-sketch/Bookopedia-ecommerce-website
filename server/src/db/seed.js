/* Seeds genres, a starter catalogue and one admin account. Safe to re-run. */
const bcrypt = require('bcrypt');
const env = require('../config/env');
const pool = require('./pool');

const categories = [
  ['Novel', 'Literary and popular fiction', 'novel'],
  ['Science Fiction', 'Futures, space and speculative worlds', 'science-fiction'],
  ['Documentary', 'True stories and reportage', 'documentary'],
  ['History', 'World, regional and Bangladeshi history', 'history'],
  ['Academic', 'Textbooks and reference for students', 'academic'],
  ['Biography', 'Lives of remarkable people', 'biography'],
];

// [title, author, isbn, price (BDT), stock, categorySlug, year, description]
const books = [
  ['Pather Panchali', 'Bibhutibhushan Bandyopadhyay', '9780253201157', 450, 14, 'novel', 1929, 'The childhood of Apu in rural Bengal.'],
  ['Pride and Prejudice', 'Jane Austen', '9780141439518', 380, 20, 'novel', 1813, 'Elizabeth Bennet and Mr Darcy.'],
  ['To Kill a Mockingbird', 'Harper Lee', '9780061120084', 520, 3, 'novel', 1960, 'Justice and childhood in the American South.'],
  ['Dune', 'Frank Herbert', '9780441172719', 690, 12, 'science-fiction', 1965, 'Politics, ecology and prophecy on Arrakis.'],
  ['Foundation', 'Isaac Asimov', '9780553293357', 540, 8, 'science-fiction', 1951, 'Psychohistory and the fall of an empire.'],
  ['The Left Hand of Darkness', 'Ursula K. Le Guin', '9780441478125', 560, 2, 'science-fiction', 1969, 'An envoy on the ice world of Gethen.'],
  ['In Cold Blood', 'Truman Capote', '9780679745587', 610, 6, 'documentary', 1966, 'A landmark of non-fiction reporting.'],
  ['Sapiens', 'Yuval Noah Harari', '9780062316097', 850, 18, 'history', 2011, 'A brief history of humankind.'],
  ['A History of Bangladesh', 'Willem van Schendel', '9781107670983', 990, 4, 'history', 2009, 'From the Bengal delta to the modern state.'],
  ['Introduction to Algorithms', 'Thomas H. Cormen', '9780262046305', 2950, 7, 'academic', 2022, 'The standard reference on algorithms (4th ed.).'],
  ['Software Engineering', 'Ian Sommerville', '9780133943030', 2400, 5, 'academic', 2015, 'Processes, modelling and testing (10th ed.).'],
  ['The Unfinished Memoirs', 'Sheikh Mujibur Rahman', '9780670086962', 750, 10, 'biography', 2012, 'Autobiography written in prison, 1967-69.'],
  ['Steve Jobs', 'Walter Isaacson', '9781451648539', 980, 9, 'biography', 2011, 'The authorised biography.'],
];

async function seed({ silent = false } = {}) {
  const log = silent ? () => {} : console.log;

  for (const [name, description, slug] of categories) {
    await pool.execute(
      `INSERT INTO categories (category_name, description, slug) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE description = VALUES(description)`,
      [name, description, slug]
    );
  }
  const [cats] = await pool.query('SELECT category_id, slug FROM categories');
  const idBySlug = Object.fromEntries(cats.map((c) => [c.slug, c.category_id]));

  for (const [title, author, isbn, price, stock, slug, year, description] of books) {
    await pool.execute(
      `INSERT INTO books (category_id, title, author, isbn, price, stock_qty, published_year, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title)`,
      [idBySlug[slug], title, author, isbn, price, stock, year, description]
    );
  }

  const adminEmail = (process.env.SEED_ADMIN_EMAIL || 'admin@bookopedia.local').toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';
  const hash = await bcrypt.hash(adminPassword, env.bcryptRounds);
  await pool.execute(
    `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'Admin')
     ON DUPLICATE KEY UPDATE role = 'Admin'`,
    ['Store Administrator', adminEmail, hash]
  );

  log(`Seeded ${categories.length} categories, ${books.length} books, admin ${adminEmail}`);
}

if (require.main === module) {
  seed()
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = seed;
