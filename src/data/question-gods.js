export const QUESTIONS_GODS = [
  {
    id: 'g1',
    texto: 'Uma ameaça sobrenatural surge de repente na cidade. Qual sua primeira reação?',
    opcoes: [
      { texto: 'Avançar sem hesitar, de arma em punho.', effect: { coragem: 2, preguica: -1 } },
      { texto: 'Avaliar os sinais antes de agir.', effect: { sabedoria: 2, astucia: 1 } },
      { texto: 'Reunir aliados e organizar um plano.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Esperar a poeira baixar antes de se envolver.', effect: { preguica: 2, coragem: -1 } },
      { texto: 'Eu seria a ameaça', effect: {ambicao: 2, preguiça: -1}},
    ],
  },
  {
    id: 'g2',
    texto: 'Como você lida com um segredo perigoso que só você conhece?',
    opcoes: [
      { texto: 'Guardo comigo para sempre.', effect: { confianca: 2, ordem: 1 } },
      { texto: 'Uso a informação a meu favor quando for útil.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Conto para quem eu confio e pode me ajudar.', effect: { compaixao: 1, confianca: -1 } },
      { texto: 'Ignoro, ué.', effect: { preguica: 2, compaixao: -1 } },
    ],
  },
  {
    id: 'g3',
    texto: 'O que mais te motiva a agir?',
    opcoes: [
      { texto: 'Provar que sou capaz de qualquer coisa.', effect: { ambicao: 2, confianca: 1 } },
      { texto: 'Proteger quem eu amo.', effect: { compaixao: 2, coragem: 1 } },
      { texto: 'Entender como o mundo realmente funciona.', effect: { sabedoria: 2 } },
      { texto: 'Manter as coisas em equilíbrio e sob controle.', effect: { ordem: 2 } },
      { texto: 'Viver da melhor forma.', effect: {preguica: 1, ambicao: -1}},
    ],
  },
  {
    id: 'g4',
    texto: 'Você é convidado(a) para um jogo de risco alto. O que faz?',
    opcoes: [
      { texto: 'Topo na hora.', effect: { coragem: 2, ambicao: 1 } },
      { texto: 'Calculo as chances antes de decidir.', effect: { astucia: 2, sabedoria: 1 } },
      { texto: 'Prefiro assistir de longe, sem me arriscar à toa.', effect: { preguica: 2, ambicao: -1 } },
      { texto: 'Só entro se eu puder ditar as regras.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Eu teria feito o convite.', effect: {ambicao: 2, confianca: 1}},
    ],
  },
  {
    id: 'g5',
    texto: 'Um amigo comete um erro grave que machuca outras pessoas. Como você reage?',
    opcoes: [
      { texto: 'Ofereço apoio e ajudo a consertar o que for possível.', effect: { compaixao: 2 } },
      { texto: 'Cobro responsabilidade e consequências claras.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Uso a situação a meu favor, se possível.', effect: { astucia: 2, ambicao: 1 } },
      { texto: 'Me afasto.', effect: { preguica: 2, compaixao: -1 } },
      { texto: 'Vou fazê-lo se sentir mal por isso', effect: {astucia: 1, compaixao: -1}},
    ],
  },
  {
    id: 'g6',
    texto: 'Como você prefere passar seu tempo livre?',
    opcoes: [
      { texto: 'Treinando ou me aperfeiçoando, sem parar de verdade.', effect: { preguica: -2, ordem: 1 } },
      { texto: 'Lendo, estudando, investigando mistérios.', effect: { sabedoria: 2 } },
      { texto: 'Em festas, boa companhia, resenha.', effect: { preguica: 2, compaixao: 1 } },
      { texto: 'Planejando meu próximo grande passo.', effect: { ambicao: 2 } },
      { texto: 'Tempo livre?', effect:{preguica: -1, sabedoria: 2}},
    ],
  },
  {
    id: 'g7',
    texto: 'Alguém questiona sua autoridade abertamente. O que você faz?',
    opcoes: [
      { texto: 'Encaro de frente, sem recuar.', effect: { coragem: 2, confianca: 1 } },
      { texto: 'Escuto com calma, pode ter um ponto válido.', effect: { sabedoria: 2, coragem: -1 } },
      { texto: 'Reviro a situação com palavras, não força.', effect: { astucia: 2 } },
      { texto: 'Deixo pra lá.', effect: { preguica: 2, confianca: -1 } },
      { texto: 'Saio na porrada.', effect: {coragem: 2, ambicao: 1}},
    ],
  },
  {
    id: 'g8',
    texto: 'O que você mais teme perder?',
    opcoes: [
      { texto: 'Minha liberdade de agir sem seguir regra nenhuma.', effect: { ordem: -2, astucia: 1 } },
      { texto: 'As pessoas que eu protejo.', effect: { compaixao: 2 } },
      { texto: 'O controle da situação.', effect: { ordem: 2, confianca: 1 } },
      { texto: 'Minha reputação e o respeito dos outros.', effect: { confianca: 2, ambicao: 1 } },
      { texto: 'A minha vida.', effect: {ambicao: 1, compaixao: -1} },
    ],
  },
  {
    id: 'g9',
    texto: 'Como as outras pessoas costumam te descrever?',
    opcoes: [
      { texto: 'Corajoso(a) até o exagero.', effect: { coragem: 2 } },
      { texto: 'Frio(a) e calculista.', effect: { astucia: 2, compaixao: -1 } },
      { texto: 'Confiável e presente, sempre no controle.', effect: { confianca: 2, compaixao: 1 } },
      { texto: 'Difícil.', effect: { preguica: 2, coragem: 1 } },
      { texto: 'Engraçado e fofo.', effect: {preguiça: 1, compaixao: 3}},
    ],
  },
  {
    id: 'g10',
    texto: 'Um poder inesperado desperta em você. O que faz primeiro?',
    opcoes: [
      { texto: 'Testo os limites imediatamente, ambicionando dominá-lo.', effect: { ambicao: 2, coragem: 1 } },
      { texto: 'Estudo cuidadosamente antes de usar.', effect: { sabedoria: 2, ordem: 1 } },
      { texto: 'Escondo até entender as consequências.', effect: { astucia: 1, sabedoria: -1 } },
      { texto: 'Uso para ajudar quem está perto de mim.', effect: { compaixao: 2 } },
      { texto: 'KAABUMMMM', effect: {preguica: 1, coragem: 2}},
      { texto: 'Mato quem me machucou um dia.', effect: {ambicao: 2, ordem: -1}},
    ],
  },
  {
    id: 'g11',
    texto: 'Você gostou deste quiz?',
    opcoes: [
        { texto: 'Meio mal feito...', effect: {ambicao: 1, compaixao: -1}},
        { texto: 'Amei!', effect: {compaixao: 1, confianca: 2}},
        { texto: 'Deu uma preguica...', effect: {preguica: 3, coragem: 1}},
        { texto: 'Eu cliquei rápido para ver como funcionava.', effect: {sabedoria: 1, astucia: 1}},
    ],
  },
];