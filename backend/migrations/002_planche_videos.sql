CREATE TABLE IF NOT EXISTS colle_planche_videos (
  id           SERIAL PRIMARY KEY,
  planche_id   INTEGER NOT NULL REFERENCES colle_planches(id) ON DELETE CASCADE,
  title        VARCHAR(255),
  url          TEXT NOT NULL,
  order_index  INTEGER DEFAULT 0
);
