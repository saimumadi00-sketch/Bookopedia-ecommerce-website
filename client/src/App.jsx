import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import Bunting from './components/Bunting.jsx';
import Stalls from './components/Stalls.jsx';
import { genres, books } from './data/catalogue.js';

const ORDER_STAGES = [
  { name: 'Pending', bn: 'অপেক্ষমাণ', cloth: '#F2B233', ink: '#1A1412', text: 'Your order is placed, stock is reserved and your PDF invoice is ready.' },
  { name: 'Processing', bn: 'প্রস্তুত হচ্ছে', cloth: '#2C3E8C', ink: '#FFFFFF', text: 'The store is packing your books.' },
  { name: 'Shipped', bn: 'পাঠানো হয়েছে', cloth: '#C8332B', ink: '#FFFFFF', text: 'Your parcel is on its way to your saved address.' },
  { name: 'Delivered', bn: 'পৌঁছেছে', cloth: '#1F5A3A', ink: '#FFFFFF', text: 'The books are with you. Now you can rate and review them.' },
];

const PROMISES = [
  {
    title: 'The edition is always on the page',
    text: 'Every book shows its ISBN, publisher year and description, so you know exactly which copy you are ordering.',
  },
  {
    title: 'Stock you see is stock we have',
    text: 'Availability is live. Two people can never buy the last copy — checkout reserves it the moment you pay.',
  },
  {
    title: 'A receipt for every order',
    text: 'No more orders by chat message. You get an order ID, an email confirmation and a downloadable PDF invoice.',
  },
  {
    title: 'Reviews from people who bought it',
    text: 'Only customers who purchased a book can rate it, one review each, from 1 to 5 stars.',
  },
];

// The order route hangs its flags in sequence: Pending first, Delivered last.
const flagString = { hung: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } } };
const flagStage = {
  folded: { opacity: 0, y: -28, rotate: -8 },
  hung: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 210, damping: 13 } },
};

function OrderFlags() {
  const reduce = useReducedMotion();
  return (
    <motion.ol
      className="flags"
      variants={flagString}
      initial={reduce ? false : 'folded'}
      whileInView="hung"
      viewport={{ once: true, amount: 0.25 }}
    >
      {ORDER_STAGES.map((s) => (
        <motion.li
          className="flags__stage"
          key={s.name}
          style={{ '--cloth': s.cloth, '--cloth-ink': s.ink, transformOrigin: '50% 0' }}
          variants={flagStage}
        >
          <span className="flags__flag">
            <span lang="bn" className="flags__bn">{s.bn}</span>
            <span className="flags__name">{s.name}</span>
          </span>
          <p className="flags__text">{s.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

const QUICK_ASKS = ['Pather Panchali', 'Asimov', '9780441172719'];

function Wordmark({ as: Tag = 'a', className = '' }) {
  const props = Tag === 'a' ? { href: '/', 'aria-label': 'Bookopedia home' } : {};
  return (
    <Tag className={`wordmark ${className}`} {...props}>
      <svg viewBox="0 0 30 22" aria-hidden="true" className="wordmark__mark">
        <path d="M1 2 Q15 6 29 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="3,3 11,4.6 7,19" fill="#C8332B" />
        <polygon points="11.5,4.7 18.5,4.7 15,20" fill="#F2B233" />
        <polygon points="19,4.6 27,3 23,19" fill="#1F5A3A" />
      </svg>
      Bookopedia
    </Tag>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <Bunting className="site-header__bunting" />
        <div className="container">
          <div className="signboard site-header__inner">
            <Wordmark />
            <nav aria-label="Main" className="site-nav">
              <a href="/books">Browse books</a>
              <a href="#stalls">Genres</a>
              <a href="#ordering">How ordering works</a>
            </nav>
            <div className="site-header__auth">
              <a href="/login" className="link-paint">Sign in</a>
              <a href="/register" className="btn btn--red btn--sm">Create account</a>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero cloth" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__copy">
              <h1 id="hero-title" className="hero__title">
                Find the book. Know the edition. Track it to your door.
              </h1>
              <p className="hero__lede">
                An online bookstore for readers in Bangladesh. Novels, science fiction, history, textbooks and more,
                with live stock, cash on delivery and a receipt with every order.
              </p>
            </div>

            <div className="desk">
              <span className="pole pole--left" aria-hidden="true" />
              <span className="pole pole--right" aria-hidden="true" />
              <div className="desk__board">
                <p className="desk__sign">
                  <span lang="bn">তথ্যকেন্দ্র</span>
                  <span>Information desk</span>
                </p>
                <form className="search" action="/books" method="get" role="search">
                  <label htmlFor="q" className="search__label">Search by title, author or ISBN</label>
                  <div className="search__row">
                    <input
                      id="q"
                      name="q"
                      type="search"
                      className="search__input"
                      placeholder="e.g. Pather Panchali"
                      autoComplete="off"
                    />
                    <button className="btn btn--marigold" type="submit">Search</button>
                  </div>
                </form>
                <p className="desk__asks">
                  <span>Try</span>
                  {QUICK_ASKS.map((q) => (
                    <a key={q} href={`/books?q=${encodeURIComponent(q)}`} className={/^\d+$/.test(q) ? 'num' : undefined}>{q}</a>
                  ))}
                </p>
                <p className="desk__facts">
                  {books.length} titles across {genres.length} stalls · Cash on delivery or card
                </p>
              </div>
            </div>
          </div>
          <span className="cloth__hem" aria-hidden="true" />
        </section>

        <section id="stalls" className="lane" aria-labelledby="stalls-title">
          <div className="container">
            <div className="lane__head">
              <h2 id="stalls-title" className="section-title">Walk the stalls</h2>
              <p className="lane__lede">Pick a genre to see what is on its counter, edition and stock included.</p>
            </div>
            <Stalls />
          </div>
        </section>

        <section className="notice-field" aria-labelledby="promises-title">
          <div className="container">
            <div className="notice">
              <span className="notice__screw notice__screw--tl" aria-hidden="true" />
              <span className="notice__screw notice__screw--tr" aria-hidden="true" />
              <span className="notice__screw notice__screw--bl" aria-hidden="true" />
              <span className="notice__screw notice__screw--br" aria-hidden="true" />
              <h2 id="promises-title" className="notice__title">
                Buying books online should feel as safe as buying them at the counter.
              </h2>
              <ul className="notice__rules">
                {PROMISES.map((p) => (
                  <li key={p.title}>
                    <h3 className="notice__rule-title">{p.title}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="ordering" className="route" aria-labelledby="ordering-title">
          <div className="container">
            <div className="route__head">
              <h2 id="ordering-title" className="section-title">Follow your order from stall to doorstep</h2>
              <p className="route__lede">
                Pay cash on delivery or by card. After checkout, your order history shows exactly where your books are,
                and we email you every time the status changes.
              </p>
            </div>
            <OrderFlags />
          </div>
        </section>

        <section className="cta cloth" aria-labelledby="cta-title">
          <span className="cloth__hem cloth__hem--top" aria-hidden="true" />
          <div className="container cta__inner">
            <div>
              <h2 id="cta-title" className="cta__title">Keep a cart, save your address, check out in a few steps.</h2>
              <p className="cta__text">You can browse and read book details without an account. Create one when you are ready to order.</p>
            </div>
            <div className="cta__actions">
              <a href="/register" className="btn btn--marigold">Create account</a>
              <a href="/books" className="btn btn--line">Browse books</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <Wordmark as="p" className="wordmark--footer" />
          <p>
            CSE327 Software Engineering project, North South University, Fall 2026.
            Prices are in BDT. Card payments are simulated — no real card details are collected.
            Until the store goes live, the books and stock shown here are sample data.
          </p>
        </div>
      </footer>
    </MotionConfig>
  );
}
