import { emptyTraitVector } from '../data/traits';

/**
 * Soma o `effect` de todas as respostas escolhidas em um vetor de traços.
 * @param {Array<{effect?: Record<string, number>}>} answers - respostas selecionadas (uma por pergunta)
 * @param {string[]} traits
 * @returns {Record<string, number>}
 */
export function scoreUser(answers, traits) {
  const vector = emptyTraitVector();
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

/**
 * Similaridade de cosseno entre dois vetores de traços.
 * Retorna 0 quando algum vetor é nulo (evita divisão por zero).
 */
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
 * Ordena entidades (deuses ou organizações) por similaridade decrescente
 * com o vetor do usuário.
 * @returns {Array<{entity: object, score: number}>}
 */
export function rankResults(userVector, entities, traits) {
  return entities
    .map((entity) => ({ entity, score: cosineSim(userVector, entity.traits, traits) }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Sorteia uma entidade entre as `topN` mais próximas, com peso proporcional
 * ao score. Mantém variabilidade entre re-tentativas sem ser aleatório puro.
 * Scores negativos ou nulos recebem um peso mínimo para não ficarem
 * impossíveis de sortear quando toda a lista tem similaridade baixa.
 */
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
