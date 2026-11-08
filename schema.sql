-- Banco SQLite gerado pelo Tutor Front
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    nota INTEGER NOT NULL,
    comentario TEXT NOT NULL,
    created_at TEXT NOT NULL
);
