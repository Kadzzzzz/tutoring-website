CREATE TABLE IF NOT EXISTS content_videos (
  id          SERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id   INTEGER NOT NULL,
  title       VARCHAR(255),
  url         TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_content_videos ON content_videos(entity_type, entity_id);
