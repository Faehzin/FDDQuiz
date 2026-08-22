// Traços vão de -1 (oposto do traço) a 1 (forte presença do traço).
export const ORGANIZATIONS = [
  {
    id: 'guarda-de-maratona',
    nome: 'Guarda de Maratona',
    foco: 'Proteção e disciplina militar',
    descricao:
      'Uma ordem de guerreiros disciplinados dedicada a proteger mortais e descendentes do que se esconde nas sombras da cidade. Hierarquia clara, treinamento constante e a crença de que a força só tem valor quando serve a algo maior que si mesma.',
    traits: { coragem: 0.8, sabedoria: 0.3, ordem: 0.8, astucia: 0.1, compaixao: 0.4, ambicao: 0.2, preguica: -0.6, confianca: 0.7 },
    imagem: 'src/assets/imagens/orgs/guarda-de-maratona.png',
  },
  {
    id: 'consorcio-delfos',
    nome: 'Consórcio Delfos',
    foco: 'Informação e influência',
    descricao:
      'Uma rede discreta de oráculos, analistas e corretores de segredos que enxerga padrões antes de todo mundo. O Consórcio não luta em primeira linha — prefere posicionar as peças e observar o tabuleiro se mover.',
    traits: { coragem: 0.1, sabedoria: 0.8, ordem: 0.3, astucia: 0.9, compaixao: -0.1, ambicao: 0.6, preguica: -0.1, confianca: 0.4 },
    imagem: 'src/assets/imagens/orgs/consorcio-delfos.png',
  },
  {
    id: 'refugio-de-demeter',
    nome: 'Refúgio de Deméter',
    foco: 'Acolhimento e cura',
    descricao:
      'Um santuário para descendentes recém-despertos e mortais afetados pelo sobrenatural. Sem exigir lealdade nem cobrar favores, o Refúgio existe para que ninguém precise enfrentar o despertar sozinho.',
    traits: { coragem: 0.2, sabedoria: 0.4, ordem: 0.3, astucia: -0.1, compaixao: 0.9, ambicao: -0.3, preguica: 0.2, confianca: 0.2 },
    imagem: 'src/assets/imagens/orgs/refugio-de-demeter.png',
  },
  {
    id: 'bolsa-de-hermes',
    nome: 'Bolsa de Hermes',
    foco: 'Comércio e contrabando',
    descricao:
      'Uma guilda pragmática que move mercadorias, favores e informação entre o mundo mortal e o divino. Sem lealdade a panteões ou causas — só ao próprio código e ao lucro que mantém as portas abertas.',
    traits: { coragem: 0.4, sabedoria: 0.2, ordem: -0.6, astucia: 0.8, compaixao: 0, ambicao: 0.7, preguica: 0.1, confianca: 0.6 },
    imagem: 'src/assets/imagens/orgs/bolsa-de-hermes.png',
  },
  {
    id: 'submundo',
    nome: 'O Submundo',
    foco: 'Resistência e sobrevivência',
    descricao:
      'Uma rede clandestina de sobreviventes, marginalizados e desertores que rejeitam a autoridade dos panteões estabelecidos. Sem hierarquia fixa, sem regras impostas de fora — só a lei de quem se ajuda a se manter vivo.',
    traits: { coragem: 0.6, sabedoria: 0.1, ordem: -0.8, astucia: 0.5, compaixao: 0.2, ambicao: 0.4, preguica: -0.2, confianca: 0.5 },
    imagem: 'src/assets/imagens/orgs/submundo.png',
  },
  {
    id: 'academia-de-atena',
    nome: 'Academia de Atena',
    foco: 'Conhecimento e estratégia',
    descricao:
      'Uma instituição que forma e orienta jovens descendentes, priorizando conhecimento, tática e disciplina intelectual sobre força bruta. Cada aliado é treinado para pensar três movimentos à frente.',
    traits: { coragem: 0.3, sabedoria: 0.9, ordem: 0.7, astucia: 0.5, compaixao: 0.3, ambicao: 0.4, preguica: -0.5, confianca: 0.5 },
    imagem: 'src/assets/imagens/orgs/academia-de-atena.png',
  },
];
