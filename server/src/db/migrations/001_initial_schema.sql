-- Bookopedia initial schema (3NF) — matches Figure 2 / Table 9 of the proposal report.
-- Target: MySQL 8 (InnoDB). Also runs on MariaDB 10.6+ for local development.

CREATE TABLE IF NOT EXISTS users (
  user_id        INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  role           ENUM('Customer','Admin') NOT NULL DEFAULT 'Customer',
  phone          VARCHAR(20)  NULL,
  address        VARCHAR(255) NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uk_users_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  category_id    INT AUTO_INCREMENT PRIMARY KEY,
  category_name  VARCHAR(80)  NOT NULL,
  description    TEXT         NULL,
  slug           VARCHAR(100) NOT NULL,
  CONSTRAINT uk_categories_name UNIQUE (category_name),
  CONSTRAINT uk_categories_slug UNIQUE (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS books (
  book_id              INT AUTO_INCREMENT PRIMARY KEY,
  category_id          INT           NOT NULL,
  title                VARCHAR(200)  NOT NULL,
  author               VARCHAR(150)  NOT NULL,
  isbn                 VARCHAR(20)   NOT NULL,
  price                DECIMAL(10,2) NOT NULL,
  stock_qty            INT           NOT NULL DEFAULT 0,
  low_stock_threshold  INT           NOT NULL DEFAULT 5,
  image_url            VARCHAR(255)  NULL,
  published_year       SMALLINT      NULL,
  description          TEXT          NULL,
  CONSTRAINT uk_books_isbn UNIQUE (isbn),
  CONSTRAINT fk_books_category FOREIGN KEY (category_id)
    REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_books_price CHECK (price >= 0),
  CONSTRAINT chk_books_stock CHECK (stock_qty >= 0),
  CONSTRAINT chk_books_threshold CHECK (low_stock_threshold >= 0),
  INDEX idx_books_category (category_id),
  FULLTEXT INDEX ft_books_title_author (title, author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS carts (
  cart_id     INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT      NOT NULL,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uk_carts_user UNIQUE (user_id),
  CONSTRAINT fk_carts_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cart_items (
  cart_item_id  INT AUTO_INCREMENT PRIMARY KEY,
  cart_id       INT NOT NULL,
  book_id       INT NOT NULL,
  quantity      INT NOT NULL,
  CONSTRAINT uk_cart_items_pair UNIQUE (cart_id, book_id),
  CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id)
    REFERENCES carts(cart_id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_items_book FOREIGN KEY (book_id)
    REFERENCES books(book_id) ON DELETE CASCADE,
  CONSTRAINT chk_cart_items_qty CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS promo_codes (
  promo_id          INT AUTO_INCREMENT PRIMARY KEY,
  code              VARCHAR(30)  NOT NULL,
  discount_percent  DECIMAL(5,2) NOT NULL,
  expiry_date       DATE         NULL,
  usage_limit       INT          NULL,
  times_used        INT          NOT NULL DEFAULT 0,
  is_active         BOOLEAN      NOT NULL DEFAULT TRUE,
  CONSTRAINT uk_promo_code UNIQUE (code),
  CONSTRAINT chk_promo_percent CHECK (discount_percent > 0 AND discount_percent <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orders (
  order_id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id           INT           NOT NULL,
  promo_id          INT           NULL,
  order_date        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  order_status      ENUM('Pending','Processing','Shipped','Delivered') NOT NULL DEFAULT 'Pending',
  payment_method    ENUM('COD','Card') NOT NULL,
  transaction_ref   VARCHAR(50)   NULL,
  shipping_address  VARCHAR(255)  NOT NULL,
  subtotal          DECIMAL(10,2) NOT NULL,
  discount_amount   DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount        DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount      DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE RESTRICT,
  CONSTRAINT fk_orders_promo FOREIGN KEY (promo_id)
    REFERENCES promo_codes(promo_id) ON DELETE SET NULL,
  INDEX idx_orders_user_date (user_id, order_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS order_items (
  order_item_id  INT AUTO_INCREMENT PRIMARY KEY,
  order_id       INT           NOT NULL,
  book_id        INT           NOT NULL,
  quantity       INT           NOT NULL,
  unit_price     DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
    REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_book FOREIGN KEY (book_id)
    REFERENCES books(book_id) ON DELETE RESTRICT,
  CONSTRAINT chk_order_items_qty CHECK (quantity > 0),
  CONSTRAINT chk_order_items_price CHECK (unit_price >= 0),
  INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS reviews (
  review_id   INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT      NOT NULL,
  book_id     INT      NOT NULL,
  rating      TINYINT  NOT NULL,
  comment     TEXT     NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uk_reviews_user_book UNIQUE (user_id, book_id),
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_book FOREIGN KEY (book_id)
    REFERENCES books(book_id) ON DELETE CASCADE,
  CONSTRAINT chk_reviews_rating CHECK (rating BETWEEN 1 AND 5),
  INDEX idx_reviews_book (book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
