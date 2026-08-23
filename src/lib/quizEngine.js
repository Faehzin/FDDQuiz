

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


export const TRAIT_CALIBRATION_GODS = {
  coragem:   { mean: 3.255, std: 2.224 },
  sabedoria: { mean: 2.857, std: 2.683 },
  ordem:     { mean: 3.294, std: 2.653 },
  astucia:   { mean: 2.365, std: 2.914 },
  compaixao: { mean: 0.771, std: 3.405 },
  ambicao:   { mean: 2.814, std: 2.582 },
  preguica:  { mean: 2.963, std: 2.629 },
  confianca: { mean: 1.106, std: 2.735 },
};