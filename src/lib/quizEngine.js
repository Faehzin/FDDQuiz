/**
 * MOTOR DE PONTUAÇÃO DO QUIZ — como funciona
 *
 * 1. Cada resposta escolhida soma pequenos valores a um "vetor de traços" do
 *    usuário (scoreUser) — ex: escolher uma opção corajosa soma +2 em `coragem`.
 *
 * 2. Comparamos esse vetor com o vetor de cada deus/organização usando
 *    similaridade de cosseno (cosineSim), que mede o quão parecidas são as
 *    DIREÇÕES de dois vetores (não a magnitude) — ou seja, o que importa é o
 *    "formato da personalidade", não quantos pontos foram somados ao todo.
 *
 * 3. Só o cosseno puro tem um viés: ele favorece estruturalmente qualquer
 *    entidade cujo vetor aponte perto da "direção média" de qualquer
 *    combinação possível de respostas — mesmo que essa entidade não seja a
 *    mais parecida de verdade com o usuário. Na prática, isso fazia um deus
 *    "genérico" dominar o quiz (saindo pra ~1 em cada 6 pessoas) enquanto
 *    outros praticamente nunca apareciam.
 *
 * 4. A correção (zNormalize + rankResults): antes de comparar, "recentramos"
 *    cada traço do vetor do usuário subtraindo a média e dividindo pelo
 *    desvio-padrão desse traço — números calculados a partir de milhares de
 *    simulações de respostas aleatórias nas perguntas atuais (ver
 *    TRAIT_CALIBRATION). Isso remove o viés e deixa a comparação realmente
 *    medir "o que te diferencia da média", que é o que um quiz de
 *    personalidade deveria medir.
 *
 * 5. rankResults ordena todas as entidades por essa similaridade corrigida.
 *    weightedPick sorteia o resultado final entre as `topN` mais próximas,
 *    com peso proporcional ao score — assim o quiz não é 100% determinístico
 *    (rodar de novo pode dar um resultado diferente, mas sempre plausível),
 *    mas também não é aleatório puro.
 *
 * ⚠️ SE VOCÊ EDITAR AS PERGUNTAS (effect de qualquer opção), a calibração de
 * TRAIT_CALIBRATION fica desatualizada. Pequenos ajustes de texto não
 * importam; se você mudar bastante os valores de effect, ela precisa ser
 * recalculada (é um script simples de simulação, não precisa fazer na mão).
 */

export function emptyTraitVector(traits) {
  return Object.fromEntries(traits.map((t) => [t, 0]));
}

/**
 * @param {Array<{effect?: Record<string, number>}>} answers
 * @param {string[]} traits
 * @returns {Record<string, number>}
 */
export function scoreUser(answers, traits) {
  const vector = emptyTraitVector(traits);
  for (const answer of answers) {
    if (!answer?.effect) continue;
    for (const trait of traits) {
      if (trait in answer.effect) {
        vector[trait] += answer.effect[trait];
      }
    }
  }
  return vector;
}

export function cosineSim(vectorA, vectorB, traits) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const trait of traits) {
    const a = vectorA[trait] ?? 0;
    const b = vectorB[trait] ?? 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  }

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Normaliza um vetor pelo z-score de cada traço, usando a calibração
 * informada. Usada tanto pro vetor do usuário (já em "pontos acumulados")
 * quanto pro vetor de uma entidade, desde que ela já tenha sido projetada
 * pra escala de pontos via `projectEntityVector`.
 */
function zNormalize(vector, traits, calibration) {
  const result = {};
  for (const trait of traits) {
    const cal = calibration[trait];
    const value = vector[trait] ?? 0;
    result[trait] = cal ? (value - cal.mean) / cal.std : value;
  }
  return result;
}

/**
 * Projeta o vetor -1..1 de uma entidade (deus/org) pra uma escala
 * aproximadamente comparável à dos pontos acumulados pelo usuário, antes de
 * normalizar. O fator não precisa ser exato — só precisa ser o mesmo pra
 * todas as entidades, já que o que importa é a direção resultante.
 */
const ENTITY_SCALE_FACTOR = 3;

function projectEntityVector(entityTraits, traits) {
  const result = {};
  for (const trait of traits) {
    result[trait] = (entityTraits[trait] ?? 0) * ENTITY_SCALE_FACTOR;
  }
  return result;
}

/**
 * @param {Record<string, number>} userVector - retorno de scoreUser()
 * @param {Array<{id: string, traits: Record<string, number>}>} entities - deuses ou orgs
 * @param {string[]} traits
 * @param {Record<string, {mean: number, std: number}>} [calibration] - opcional; sem ela, cai no cosseno puro (sem correção)
 * @returns {Array<{entity: object, score: number}>}
 */
export function rankResults(userVector, entities, traits, calibration = null) {
  const userComparable = calibration ? zNormalize(userVector, traits, calibration) : userVector;

  return entities
    .map((entity) => {
      const entityComparable = calibration
        ? zNormalize(projectEntityVector(entity.traits, traits), traits, calibration)
        : entity.traits;
      return { entity, score: cosineSim(userComparable, entityComparable, traits) };
    })
    .sort((a, b) => b.score - a.score);
}

export function weightedPick(rankedResults, topN = 3) {
  if (!rankedResults.length) return null;

  const pool = rankedResults.slice(0, topN);
  const minWeight = 0.001;
  const weights = pool.map((r) => Math.max(r.score, minWeight));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  let roll = Math.random() * totalWeight;
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return pool[i].entity;
  }
  return pool[pool.length - 1].entity;
}

/**
 * Calibração pro quiz de deuses — média e desvio-padrão de cada traço,
 * calculados a partir de 100.000 simulações de respostas aleatórias nas
 * 15 perguntas atuais de QUESTIONS_GODS.
 */
export const TRAIT_CALIBRATION_GODS = {
  coragem:   { mean: 3.500, std: 2.272 },
  sabedoria: { mean: 3.115, std: 2.726 },
  ordem:     { mean: 3.304, std: 2.644 },
  astucia:   { mean: 2.606, std: 2.949 },
  compaixao: { mean: 0.779, std: 3.478 },
  ambicao:   { mean: 3.079, std: 2.606 },
  preguica:  { mean: 3.707, std: 2.927 },
  confianca: { mean: 1.612, std: 2.875 },
};