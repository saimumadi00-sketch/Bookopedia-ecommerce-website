import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import { books, genres, formatBDT, formatISBN, LOW_STOCK_THRESHOLD } from '../data/catalogue.js';

// Each genre is a stall. Banner cloth colour and Bangla signboard name per stall.
const STALL = {
  novel: { cloth: '#C8332B', ink: '#FFFFFF', bn: 'উপন্যাস' },
  'science-fiction': { cloth: '#2C3E8C', ink: '#FFFFFF', bn: 'বিজ্ঞান কল্পকাহিনি' },
  documentary: { cloth: '#157780', ink: '#FFFFFF', bn: 'প্রামাণ্য' },
  history: { cloth: '#F2B233', ink: '#1A1412', bn: 'ইতিহাস' },
  academic: { cloth: '#7A4A22', ink: '#FFFFFF', bn: 'একাডেমিক' },
  biography: { cloth: '#C2306C', ink: '#FFFFFF', bn: 'জীবনী' },
};

// Banner is 152px tall (9.5rem). Rolled up, only a 28px band of cloth shows.
const BANNER = {
  rolled: 'inset(0px 0px 124px 0px)',
  peek: 'inset(0px 0px 108px 0px)',
  lowered: 'inset(0px 0px 0px 0px)',
};
const EASE_OUT = [0.16, 1, 0.3, 1];

// Books are laid on the counter one after another, as a stallholder sets them out.
const counterList = {
  out: { opacity: 0, y: 10, transition: { duration: 0.15, ease: 'easeIn' } },
  in: { opacity: 1, y: 0, transition: { delayChildren: 0.22, staggerChildren: 0.08 } },
};
const counterItem = {
  out: { opacity: 0, y: -18, rotate: -1.5 },
  in: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

const booksIn = (slug) => books.filter((b) => b.genre === slug);

function StockNote({ stock }) {
  if (stock === 0) return <span className="stock stock--out">Out of stock</span>;
  if (stock < LOW_STOCK_THRESHOLD) return <span className="stock stock--low">Only {stock} left</span>;
  return <span className="stock">{stock} in stock</span>;
}

export default function Stalls() {
  const [active, setActive] = useState(genres[0].slug);
  const tabs = useRef([]);
  const banners = useRef({});
  const swungFor = useRef(genres[0].slug);
  const reduce = useReducedMotion();

  // The unrolled cloth swings once on its pole and settles. Run imperatively so it
  // plays however the stall was chosen (click while hovered, tap, or keyboard).
  useEffect(() => {
    if (swungFor.current === active) return undefined;
    swungFor.current = active;
    const el = banners.current[active];
    if (reduce || !el) return undefined;
    const swing = animate(el, { skewX: [0, 3, -1.5, 0] }, { duration: 0.6, delay: 0.2, ease: 'easeOut' });
    return () => swing.stop();
  }, [active, reduce]);

  const onKeyDown = (e, i) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next = null;
    if (step) next = (i + step + genres.length) % genres.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = genres.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(genres[next].slug);
    tabs.current[next]?.focus();
  };

  const stall = STALL[active];
  const genre = genres.find((g) => g.slug === active);
  const shelf = booksIn(active);

  return (
    <div className="stalls">
      <div className="stall-row" role="tablist" aria-label="Genre stalls">
        {genres.map((g, i) => {
          const s = STALL[g.slug];
          const n = booksIn(g.slug).length;
          const selected = g.slug === active;
          const banner = {
            rolled: { clipPath: BANNER.rolled, transition: { clipPath: { duration: 0.3, ease: EASE_OUT } } },
            peek: { clipPath: BANNER.peek, transition: { duration: 0.2, ease: EASE_OUT } },
            lowered: { clipPath: BANNER.lowered, transition: { clipPath: { duration: 0.5, ease: EASE_OUT } } },
          };
          return (
            <motion.button
              key={g.slug}
              ref={(el) => (tabs.current[i] = el)}
              id={`stall-${g.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="stall-counter"
              tabIndex={selected ? 0 : -1}
              className="stall"
              style={{ '--cloth': s.cloth, '--cloth-ink': s.ink }}
              onClick={() => setActive(g.slug)}
              onKeyDown={(e) => onKeyDown(e, i)}
              initial={false}
              animate={selected ? 'lowered' : 'rolled'}
              whileHover={selected ? undefined : 'peek'}
            >
              <span className="stall__board">
                <span className="stall__bn" lang="bn">{s.bn}</span>
                <span className="stall__name">{g.name}</span>
              </span>
              <motion.span className="stall__banner" variants={banner} ref={(el) => (banners.current[g.slug] = el)}>
                <span className="stall__blurb">{g.blurb}</span>
                <span className="stall__count">{n} {n === 1 ? 'title' : 'titles'}</span>
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div
        id="stall-counter"
        className="counter"
        role="tabpanel"
        aria-labelledby={`stall-${active}`}
        style={{ '--cloth': stall.cloth, '--cloth-ink': stall.ink }}
      >
        <div className="counter__head">
          <h3 className="counter__title">On the {genre.name.toLowerCase()} counter</h3>
          <a className="link-paint" href={`/books?genre=${active}`}>All {genre.name.toLowerCase()} books</a>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            className="counter__list"
            key={active}
            variants={reduce ? undefined : counterList}
            initial="out"
            animate="in"
            exit="out"
          >
            {shelf.map((b) => (
              <motion.li className="item" key={b.isbn} variants={reduce ? undefined : counterItem}>
                <a className="item__cover" href={`/books/${b.isbn}`} aria-hidden="true" tabIndex={-1}>
                  <span className="item__cover-title">{b.title}</span>
                  <span className="item__cover-author">{b.author.split(' ').at(-1)}</span>
                </a>
                <div className="item__label">
                  <h4 className="item__title"><a href={`/books/${b.isbn}`}>{b.title}</a></h4>
                  <p className="item__author">{b.author}</p>
                  <p className="item__desc">{b.description}</p>
                  <dl className="item__facts">
                    <div><dt>ISBN</dt><dd className="num">{formatISBN(b.isbn)}</dd></div>
                    <div><dt>Published</dt><dd className="num">{b.year}</dd></div>
                    <div><dt>Price</dt><dd className="num item__price">{formatBDT(b.price)}</dd></div>
                    <div><dt>Availability</dt><dd><StockNote stock={b.stock} /></dd></div>
                  </dl>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
