import Shelf from './components/Shelf.jsx';
import { genres, books } from './data/catalogue.js';

const ORDER_STAGES = [
  { name: 'Pending', text: 'Your order is placed, stock is reserved and your PDF invoice is ready.' },
  { name: 'Processing', text: 'The store is packing your books.' },
  { name: 'Shipped', text: 'Your parcel is on its way to your saved address.' },
  { name: 'Delivered', text: 'The books are with you. Now you can rate and review them.' },
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

const countIn = (slug) => books.filter((b) => b.genre === slug).length;

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="container site-header__inner">
          <a className="wordmark" href="/" aria-label="Bookopedia home">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="wordmark__mark">
              <rect x="5" y="7" width="6" height="19" fill="currentColor" />
              <rect x="12.5" y="4" width="6" height="22" fill="currentColor" opacity=".55" />
              <rect x="20" y="9" width="6.5" height="17" transform="rotate(-9 23 17)" fill="#E0B43A" />
            </svg>
            Bookopedia
          </a>
          <nav aria-label="Main" className="site-nav">
            <a href="/books">Browse books</a>
            <a href="#genres">Genres</a>
            <a href="#ordering">How ordering works</a>
          </nav>
          <div className="site-header__auth">
            <a href="/login" className="link-quiet">Sign in</a>
            <a href="/register" className="btn btn--gold btn--sm">Create account</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <div className="hero__intro">
              <h1 id="hero-title" className="hero__title">
                Find the book.<br />Know the edition.<br />Track it to your door.
              </h1>
              <div className="hero__side">
                <p className="hero__lede">
                  An online bookstore for readers in Bangladesh, with novels, science fiction, history,
                  textbooks and more. Live stock, cash on delivery and a receipt with every order.
                </p>
                <form className="search" action="/books" method="get" role="search">
                  <label htmlFor="q" className="search__label">Search by title, author or ISBN</label>
                  <div className="search__row">
                    <input
                      id="q"
                      name="q"
                      type="search"
                      className="search__input"
                      placeholder="e.g. Pather Panchali, Asimov, 9780441172719"
                      autoComplete="off"
                    />
                    <button className="btn btn--gold" type="submit">Search</button>
                  </div>
                </form>
              </div>
            </div>

            <Shelf />
          </div>
        </section>

        <section id="genres" className="section genres" aria-labelledby="genres-title">
          <div className="container">
            <div className="section__head">
              <h2 id="genres-title" className="section__title">Browse by genre</h2>
              <a href="/books" className="link-quiet">See the whole catalogue</a>
            </div>
            <ul className="genre-list">
              {genres.map((g) => (
                <li key={g.slug}>
                  <a className="genre" href={`/books?genre=${g.slug}`}>
                    <span className="genre__name">{g.name}</span>
                    <span className="genre__blurb">{g.blurb}</span>
                    <span className="genre__count">{countIn(g.slug)} {countIn(g.slug) === 1 ? 'title' : 'titles'}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section promises" aria-labelledby="promises-title">
          <div className="container promises__grid">
            <h2 id="promises-title" className="section__title promises__title">
              Buying books online should feel as safe as buying them at the counter.
            </h2>
            <div className="promise-list">
              {PROMISES.map((p) => (
                <div className="promise" key={p.title}>
                  <h3 className="promise__title">{p.title}</h3>
                  <p className="promise__text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ordering" className="section ordering" aria-labelledby="ordering-title">
          <div className="container">
            <div className="ordering__head">
              <h2 id="ordering-title" className="section__title">Follow your order from shelf to doorstep</h2>
              <p className="ordering__lede">
                Pay cash on delivery or by card. After checkout, your order history shows exactly where your books are,
                and we email you every time the status changes.
              </p>
            </div>
            <ol className="tracker">
              {ORDER_STAGES.map((s, i) => (
                <li className="tracker__step" key={s.name}>
                  <span className="tracker__dot" aria-hidden="true">{i + 1}</span>
                  <h3 className="tracker__name">{s.name}</h3>
                  <p className="tracker__text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="cta" aria-labelledby="cta-title">
          <div className="container cta__inner">
            <div>
              <h2 id="cta-title" className="cta__title">Keep a cart, save your address, check out in a few steps.</h2>
              <p className="cta__text">You can browse and read book details without an account. Create one when you are ready to order.</p>
            </div>
            <div className="cta__actions">
              <a href="/register" className="btn btn--gold">Create account</a>
              <a href="/books" className="btn btn--outline">Browse books</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="wordmark wordmark--footer">Bookopedia</p>
          <p>
            CSE327 Software Engineering project, North South University, Fall 2026.
            Prices are in BDT. Card payments are simulated — no real card details are collected.
          </p>
        </div>
      </footer>
    </>
  );
}
