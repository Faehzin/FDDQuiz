import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function initSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('[supabase] Falha ao inicializar o client — verifique VITE_SUPABASE_URL em .env.local:', error.message);
    return null;
  }
}

export const supabase = initSupabase();

/**
 *
 * @param {'deuses' | 'organizacoes'} tipoQuiz
 * @param {string} resultadoId
 * @param {Record<string, number>} vetorUsuario
 */
export async function saveQuizResult(tipoQuiz, resultadoId, vetorUsuario) {
  if (!supabase) {
    console.warn('[supabase] Client não inicializado — verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local');
    return;
  }

  const { error } = await supabase.from('quiz_results').insert({
    tipo_quiz: tipoQuiz,
    resultado_id: resultadoId,
    vetor_usuario: vetorUsuario,
  });

  if (error) {
    console.warn('[supabase] Falha ao salvar resultado (a tabela quiz_results existe no seu projeto?):', error.message);
  }
}

/*
 * Tabela `profecias` (criar manualmente no Supabase):
 *
 * create table profecias (
 *   id uuid primary key default gen_random_uuid(),
 *   username text not null unique,
 *   nome_exibicao text not null,
 *   parente_divino text not null,
 *   organizacao text not null,
 *   texto_profecia text not null,
 *   created_at timestamptz not null default now()
 * );
 *
 * alter table profecias enable row level security;
 *
 * create policy "Leitura publica de profecias"
 *   on profecias for select using (true);
 *
 * create policy "Escrita publica de profecias"
 *   on profecias for insert with check (true);
 *
 * `username` como `unique` já garante índice único (B-tree) no Postgres —
 * a busca por igualdade em fetchProphecyByUsername é O(log n) por conta
 * desse índice, sem precisar de nada manual.
 */

/**
 * Não pede a linha de volta (sem `.select()`) — quem chama já tem o texto
 * gerado localmente antes de inserir, então a única coisa que importa da
 * resposta é se deu erro (ex: username duplicado). Isso evita o round-trip
 * extra de "insert + select" e deixa a chamada mais leve.
 *
 * @param {{ username: string, nomeExibicao: string, parenteDivino: string, organizacao: string, textoProfecia: string }} params
 */
export async function insertProphecy({ username, nomeExibicao, parenteDivino, organizacao, textoProfecia }) {
  if (!supabase) {
    return { error: { message: 'Client não inicializado — verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local' } };
  }

  const { error } = await supabase.from('profecias').insert({
    username,
    nome_exibicao: nomeExibicao,
    parente_divino: parenteDivino,
    organizacao,
    texto_profecia: textoProfecia,
  });

  return { error };
}

/**
 * @param {string} username
 */
export async function fetchProphecyByUsername(username) {
  if (!supabase) {
    return { data: null, error: { message: 'Client não inicializado — verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local' } };
  }

  const { data, error } = await supabase
    .from('profecias')
    .select('nome_exibicao, texto_profecia')
    .eq('username', username)
    .maybeSingle();

  return { data, error };
}
