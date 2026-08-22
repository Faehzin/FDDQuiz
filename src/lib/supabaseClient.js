import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function initSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    // createClient lança de forma síncrona se VITE_SUPABASE_URL não for uma
    // URL válida — isso derrubaria o app inteiro na primeira renderização
    // se não for capturado aqui. Verifique os valores em .env.local.
    console.warn('[supabase] Falha ao inicializar o client — verifique VITE_SUPABASE_URL em .env.local:', error.message);
    return null;
  }
}

export const supabase = initSupabase();

/**
 * Salva o resultado de um quiz na tabela `quiz_results`.
 *
 * IMPORTANTE (setup manual necessário): esta tabela ainda precisa ser criada
 * no painel do Supabase. Estrutura sugerida:
 *
 *   create table quiz_results (
 *     id uuid primary key default gen_random_uuid(),
 *     tipo_quiz text not null,        -- 'deuses' | 'organizacoes'
 *     resultado_id text not null,     -- slug do deus/organização sorteado
 *     vetor_usuario jsonb not null,
 *     created_at timestamptz not null default now()
 *   );
 *
 * Sem a tabela criada, o insert abaixo falhará silenciosamente (o erro é
 * apenas logado no console) — o restante do quiz continua funcionando
 * normalmente.
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
