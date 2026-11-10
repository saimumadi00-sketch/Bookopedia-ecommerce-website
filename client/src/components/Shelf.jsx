import { useState } from 'react';
import { books, genreName, formatBDT, formatISBN, LOW_STOCK_THRESHOLD } from '../data/catalogue.js';

// Cloth-binding colours, assigned per genre so the shelf reads as sorted.
const BINDINGS = {
  novel: ['#B5523B', '#8E3B2E', '#C9704F'],
  'science-fiction': ['#2F5E78', '#244A61', '#3D7391'],
  documentary: ['#4A4A3F'],
  history: ['#8A6A2B', '#6F5420'],
  academic: ['#2E5E4E', '#3F7462'],
  biography: ['#5D3F5F', '#734E75'],
};

// Deterministic "random" so heights don't change between renders.
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

function spineStyle(book, i) {
  const palette = BINDINGS[book.genre];
  const h = hash(book.isbn);
  return {
    '--binding': palette[i % palette.length],
    '--h': `${78 + (h % 22)}%`,
    '--w': `${Math.min(64, 38 + book.title.length * 0.9)}px`,
  };
}

function StockNote({ stock }) {
  if (stock === 0) return <span className="stock stock--out">Out of stock</span>;
  if (stock < LOW_STOCK_THRESHOLD) return <span className="stock stock--low">Only {stock} left</span>;
  return <span className="stock">{stock} in stock</span>;
}

export default function Shelf() {
  const [selected, setSelected] = useState(books[0].isbn);
  const book = books.find((b) => b.isbn === selected);

  return (
    <div className="shelf-wrap">
      <div className="shelf" role="group" aria-label="Books on the shelf. Choose one to see its details.">
        {books.map((b, i) => (
          <button
            key={b.isbn}
            type="button"
            className="spine"
            style={spineStyle(b, i)}
            aria-pressed={b.isbn === selected}
            onClick={() => setSelected(b.isbn)}
          >
            <span className="spine__title">{b.title}</span>
            <span className="spine__author">{b.author.split(' ').at(-1)}</span>
          </button>
        ))}
      </div>
      <div className="shelf-board" aria-hidden="true" />

      <article className="pulled" aria-live="polite" key={book.isbn}>
        <div className="pulled__main">
          <p className="pulled__genre">{genreName(book.genre)}</p>
          <h2 className="pulled__title">{book.title}</h2>
          <p className="pulled__author">{book.author}</p>
          <p className="pulled__desc">{book.description}</p>
        </div>
        <dl className="pulled__facts">
          <div>
            <dt>ISBN</dt>
            <dd>{formatISBN(book.isbn)}</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{book.year}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd className="pulled__price">{formatBDT(book.price)}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd><StockNote stock={book.stock} /></dd>
          </div>
        </dl>
        <a className="btn btn--ink" href={`/books/${book.isbn}`}>View book</a>
      </article>
    </div>
  );
}
