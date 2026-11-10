// Mirrors server/src/db/seed.js so the landing page has real content before the
// catalogue API exists. Replace with GET /api/books once that route is built.

export const genres = [
  { slug: 'novel', name: 'Novel', blurb: 'Literary and popular fiction' },
  { slug: 'science-fiction', name: 'Science Fiction', blurb: 'Futures, space and speculative worlds' },
  { slug: 'documentary', name: 'Documentary', blurb: 'True stories and reportage' },
  { slug: 'history', name: 'History', blurb: 'World, regional and Bangladeshi history' },
  { slug: 'academic', name: 'Academic', blurb: 'Textbooks and reference for students' },
  { slug: 'biography', name: 'Biography', blurb: 'Lives of remarkable people' },
];

export const LOW_STOCK_THRESHOLD = 5;

export const books = [
  { title: 'Pather Panchali', author: 'Bibhutibhushan Bandyopadhyay', isbn: '9780253201157', price: 450, stock: 14, genre: 'novel', year: 1929, description: 'The childhood of Apu in rural Bengal.' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', price: 380, stock: 20, genre: 'novel', year: 1813, description: 'Elizabeth Bennet and Mr Darcy.' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', price: 520, stock: 3, genre: 'novel', year: 1960, description: 'Justice and childhood in the American South.' },
  { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', price: 690, stock: 12, genre: 'science-fiction', year: 1965, description: 'Politics, ecology and prophecy on Arrakis.' },
  { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', price: 540, stock: 8, genre: 'science-fiction', year: 1951, description: 'Psychohistory and the fall of an empire.' },
  { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', price: 560, stock: 2, genre: 'science-fiction', year: 1969, description: 'An envoy on the ice world of Gethen.' },
  { title: 'In Cold Blood', author: 'Truman Capote', isbn: '9780679745587', price: 610, stock: 6, genre: 'documentary', year: 1966, description: 'A landmark of non-fiction reporting.' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', price: 850, stock: 18, genre: 'history', year: 2011, description: 'A brief history of humankind.' },
  { title: 'A History of Bangladesh', author: 'Willem van Schendel', isbn: '9781107670983', price: 990, stock: 4, genre: 'history', year: 2009, description: 'From the Bengal delta to the modern state.' },
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262046305', price: 2950, stock: 7, genre: 'academic', year: 2022, description: 'The standard reference on algorithms (4th ed.).' },
  { title: 'Software Engineering', author: 'Ian Sommerville', isbn: '9780133943030', price: 2400, stock: 5, genre: 'academic', year: 2015, description: 'Processes, modelling and testing (10th ed.).' },
  { title: 'The Unfinished Memoirs', author: 'Sheikh Mujibur Rahman', isbn: '9780670086962', price: 750, stock: 10, genre: 'biography', year: 2012, description: 'Autobiography written in prison, 1967–69.' },
  { title: 'Steve Jobs', author: 'Walter Isaacson', isbn: '9781451648539', price: 980, stock: 9, genre: 'biography', year: 2011, description: 'The authorised biography.' },
];

export const genreName = (slug) => genres.find((g) => g.slug === slug)?.name ?? slug;

export const formatBDT = (amount) => `৳${amount.toLocaleString('en-IN')}`;

export const formatISBN = (isbn) =>
  isbn.length === 13 ? `${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(4, 9)}-${isbn.slice(9, 12)}-${isbn.slice(12)}` : isbn;
