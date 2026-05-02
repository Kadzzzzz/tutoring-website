CREATE TABLE IF NOT EXISTS app_settings (
  key         VARCHAR(100) PRIMARY KEY,
  value       JSONB        NOT NULL,
  updated_at  TIMESTAMP    DEFAULT NOW()
);

INSERT INTO app_settings (key, value) VALUES
  ('filieres', '["MPSI", "PCSI", "MP", "PC"]'),
  ('level_options', '[
    {"value":"terminale","label":"Terminale"},
    {"value":"mpsi","label":"MPSI"},
    {"value":"pcsi","label":"PCSI"},
    {"value":"mp","label":"MP"},
    {"value":"pc","label":"PC"}
  ]'),
  ('concours_banks', '["CentraleSupélec","Mines-Ponts","ENS","X-ESPCI","CCINP","e3a-Polytech"]')
ON CONFLICT (key) DO NOTHING;
