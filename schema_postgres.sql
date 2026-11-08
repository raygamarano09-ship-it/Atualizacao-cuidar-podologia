-- Banco PostgreSQL (Supabase) gerado pelo Tutor Front

CREATE TABLE IF NOT EXISTS avaliacoes (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    nota INTEGER NOT NULL,
    comentario TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Segurança: o Supabase também expõe as tabelas por uma API pública (Data API).
-- Com RLS ligado e SEM políticas, essa API pública não enxerga nada.
-- O seu Flask acessa pela conexão direta do banco (usuário postgres), que continua funcionando.
ALTER TABLE avaliacoes ENABLE ROW LEVEL SECURITY;
