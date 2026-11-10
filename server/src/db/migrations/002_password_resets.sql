-- FR-13 Password recovery. Only the SHA-256 hash of the one-time token is stored.
CREATE TABLE IF NOT EXISTS password_resets (
  reset_id    INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT       NOT NULL,
  token_hash  CHAR(64)  NOT NULL,
  expires_at  DATETIME  NOT NULL,
  used_at     DATETIME  NULL,
  created_at  DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uk_password_resets_hash UNIQUE (token_hash),
  CONSTRAINT fk_password_resets_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_password_resets_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
