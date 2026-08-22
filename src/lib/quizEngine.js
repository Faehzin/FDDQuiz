import { emptyTraitVector } from '../data/traits';

/**
 * @param {Array<{effect?: Record<string, number>}>} answers
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
 * @returns {Array<{entity: object, score: number}>}
 */
export function rankResults(userVector, entities, traits) {
  return entities
    .map((entity) => ({ entity, score: cosineSim(userVector, entity.traits, traits) }))
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
