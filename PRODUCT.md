# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Readers in Bangladesh, in two equally weighted groups:
- **Leisure readers** buying novels, science fiction, history, documentary and biography, who today often order books through chat messages with no receipt and no tracking.
- **University students** buying textbooks and reference books (for example Cormen, Sommerville), along with some leisure reading.

Admins (store staff) also use the product to manage the catalogue, stock and order status. The landing page is not for them.

## Product Purpose
Bookopedia is an online bookstore. Visitors search by title, author or ISBN, see the exact edition and live stock, pay cash on delivery or by card, and track each order through Pending → Processing → Shipped → Delivered. Success means a visitor trusts the store enough to create an account and place an order.

## Positioning
The trust gaps of buying books over chat and Facebook pages are closed by mechanism, not by promises:
- the exact edition (ISBN, publisher year) is always shown;
- the stock shown is live, and checkout reserves the copy;
- every order gets an order ID, an email confirmation and a PDF invoice;
- reviews come only from verified buyers, one per buyer, rated 1–5.

## Operating Context
Prices are in BDT (৳, en-IN grouping). Delivery goes to a saved address. Cash on delivery is the default payment habit. Visitors can browse without an account and register only to order. There is a cart, promo codes and order history with email notifications on status changes.

## Capabilities and Constraints
- Stack: React 19 + Vite (client), Node/Express + MySQL (server). Roles: Customer, Admin.
- The catalogue API is not built yet; the landing page reads `client/src/data/catalogue.js`, which mirrors `server/src/db/seed.js`.
- Card payments are **simulated**: no real card details are collected. This must stay disclosed.
- Genres: Novel, Science Fiction, Documentary, History, Academic, Biography.
- Low-stock threshold: fewer than 5 copies.

## Brand Commitments
Name: Bookopedia. Course project: CSE327 Software Engineering, North South University, Fall 2026 (keep the footer disclosure). Voice: plain, concrete, factual, with no hype.

## Evidence on Hand
13 real seed books with ISBN, price, stock, year and description (`client/src/data/catalogue.js`). There are **no** testimonials, customer counts, ratings, press mentions or delivery-time guarantees, and none may be invented.

## Product Principles
1. Show the facts (edition, stock, price) rather than claim trustworthiness.
2. Never let browsing require an account.
3. Serve the student buying a ৳2,950 textbook as well as the leisure reader.
4. Every order is traceable from checkout to doorstep.

## Accessibility & Inclusion
WCAG 2.2 AA. Many visitors are on mid-range Android phones over mobile data, so performance and small-screen layout are first-class concerns.
