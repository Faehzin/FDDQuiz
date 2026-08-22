// Traços vão de -1 (oposto do traço) a 1 (forte presença do traço).
export const GODS = [
  {
    id: 'zeus',
    nome: 'Zeus',
    dominio: 'Céu e Trovões',
    descricao:
      'Pai dos deuses e senhor do raio, Zeus é a autoridade que ordena o caos em lei. Seus descendentes em Filhos do Destino nascem com uma presença que impõe respeito antes mesmo de uma palavra ser dita — e um apetite por poder que raramente se satisfaz.',
    traits: { coragem: 0.7, sabedoria: 0.5, ordem: 0.8, astucia: 0.2, compaixao: 0.0, ambicao: 0.9, preguica: -0.3, confianca: 0.9 },
    imagem: 'src/assets/imagens/deuses/zeus.png',
  },
  {
    id: 'poseidon',
    nome: 'Poseidon',
    dominio: 'Mares e Tempestades',
    descricao:
      'Instável como as marés que comanda, Poseidon é força bruta e emoção sem filtro. Seus filhos carregam um temperamento que pode erguer ondas de coragem ou de fúria — raramente ficam parados quando algo os atinge.',
    traits: { coragem: 0.8, sabedoria: 0.2, ordem: -0.3, astucia: 0.1, compaixao: 0.1, ambicao: 0.5, preguica: -0.2, confianca: 0.7 },
    imagem: 'src/assets/imagens/deuses/poseidon.png',
  },
  {
    id: 'hades',
    nome: 'Hades',
    dominio: 'Submundo e Riquezas Ocultas',
    descricao:
      'Senhor do que fica embaixo — riquezas, segredos, os mortos. Hades governa com paciência fria e um senso de justiça que não perdoa. Seus descendentes enxergam o que os outros preferem ignorar.',
    traits: { coragem: 0.4, sabedoria: 0.6, ordem: 0.7, astucia: 0.5, compaixao: -0.2, ambicao: 0.3, preguica: 0.1, confianca: 0.5 },
    imagem: 'src/assets/imagens/deuses/hades.png',
  },
  {
    id: 'atena',
    nome: 'Atena',
    dominio: 'Sabedoria e Guerra Estratégica',
    descricao:
      'Nascida já em armadura, Atena é a guerra pensada antes de ser travada. Seus filhos raramente agem por impulso — preferem três passos à frente, um plano para cada cenário e a certeza de que a mente vence onde a força falha.',
    traits: { coragem: 0.6, sabedoria: 1, ordem: 0.8, astucia: 0.7, compaixao: 0.2, ambicao: 0.4, preguica: -0.6, confianca: 0.6 },
    imagem: 'src/assets/imagens/deuses/atena.png',
  },
  {
    id: 'apolo',
    nome: 'Apolo',
    dominio: 'Sol, Profecia e Artes',
    descricao:
      'Deus da luz, da música e da visão além do presente. Apolo entende padrões que outros não veem. Seus descendentes têm talento natural e uma inquietação criativa que os empurra sempre para o próximo horizonte.',
    traits: { coragem: 0.4, sabedoria: 0.7, ordem: 0.4, astucia: 0.3, compaixao: 0.4, ambicao: 0.5, preguica: -0.1, confianca: 0.7 },
    imagem: 'src/assets/imagens/deuses/apolo.png',
  },
  {
    id: 'artemis',
    nome: 'Ártemis',
    dominio: 'Caça e Lua',
    descricao:
      'Independente e implacável, Ártemis caminha sozinha entre as sombras da noite. Seus filhos confiam nos próprios instintos acima de qualquer autoridade e protegem ferozmente o que consideram seu.',
    traits: { coragem: 0.8, sabedoria: 0.4, ordem: 0.3, astucia: 0.5, compaixao: 0.3, ambicao: 0.2, preguica: -0.4, confianca: 0.6 },
    imagem: 'src/assets/imagens/deuses/artemis.png',
  },
  {
    id: 'ares',
    nome: 'Ares',
    dominio: 'Guerra e Violência',
    descricao:
      'Onde Atena calcula, Ares avança. É o impulso puro da batalha, sem estratégia nem remorso. Seus descendentes sentem a adrenalina do conflito como poucos — e têm dificuldade em recuar de uma briga.',
    traits: { coragem: 1, sabedoria: -0.4, ordem: -0.5, astucia: -0.2, compaixao: -0.5, ambicao: 0.6, preguica: -0.3, confianca: 0.8 },
    imagem: 'src/assets/imagens/deuses/ares.png',
  },
  {
    id: 'afrodite',
    nome: 'Afrodite',
    dominio: 'Amor e Beleza',
    descricao:
      'Afrodite move o mundo através do desejo e da conexão. Seus filhos entendem pessoas de um jeito instintivo, sabem exatamente o que dizer e usam charme como quem usa uma arma afiada.',
    traits: { coragem: 0.2, sabedoria: 0.1, ordem: -0.2, astucia: 0.6, compaixao: 0.5, ambicao: 0.4, preguica: 0.3, confianca: 0.8 },
    imagem: 'src/assets/imagens/deuses/afrodite.png',
  },
  {
    id: 'hefesto',
    nome: 'Hefesto',
    dominio: 'Forja e Criação',
    descricao:
      'Mestre artesão dos deuses, Hefesto constrói o que outros só imaginam. Seus descendentes preferem o trabalho silencioso e paciente à glória rápida — julgados pelo que criam, não pelo que dizem.',
    traits: { coragem: 0.3, sabedoria: 0.6, ordem: 0.6, astucia: 0.4, compaixao: 0.4, ambicao: 0.2, preguica: -0.1, confianca: 0.2 },
    imagem: 'src/assets/imagens/deuses/hefesto.png',
  },
  {
    id: 'hermes',
    nome: 'Hermes',
    dominio: 'Mensageiro e Comércio',
    descricao:
      'Rápido, esperto e sempre um passo à frente, Hermes atravessa fronteiras que ninguém mais consegue. Seus filhos são negociadores natos, confortáveis tanto em becos quanto em salas de reunião.',
    traits: { coragem: 0.3, sabedoria: 0.4, ordem: -0.4, astucia: 1, compaixao: 0.1, ambicao: 0.5, preguica: 0.2, confianca: 0.6 },
    imagem: 'src/assets/imagens/deuses/hermes.png',
  },
  {
    id: 'demeter',
    nome: 'Deméter',
    dominio: 'Colheita e Fertilidade',
    descricao:
      'Deméter é o cuidado que sustenta a vida — paciente, generosa, incansável. Seus descendentes colocam o bem-estar coletivo acima da própria ambição e são o alicerce de quem está ao redor.',
    traits: { coragem: 0.1, sabedoria: 0.5, ordem: 0.5, astucia: 0, compaixao: 0.9, ambicao: -0.1, preguica: 0, confianca: 0.3 },
    imagem: 'src/assets/imagens/deuses/demeter.png',
  },
  {
    id: 'dionisio',
    nome: 'Dioniso',
    dominio: 'Vinho e Êxtase',
    descricao:
      'Dioniso rompe regras como quem rompe garrafas — de propósito e sem culpa. Seus filhos vivem intensamente o presente, atraem multidões e desconfiam de qualquer coisa que pareça controle demais.',
    traits: { coragem: 0.3, sabedoria: 0.1, ordem: -0.8, astucia: 0.3, compaixao: 0.4, ambicao: -0.1, preguica: 0.7, confianca: 0.5 },
    imagem: 'src/assets/imagens/deuses/dionisio.png',
  },
  {
    id: 'hera',
    nome: 'Hera',
    dominio: 'Casamento e Poder',
    descricao:
      'Rainha por direito e por temperamento, Hera não esquece uma traição nem abre mão do que é seu. Seus descendentes lideram com disciplina de ferro e um senso agudo de lealdade — e de vingança.',
    traits: { coragem: 0.4, sabedoria: 0.6, ordem: 0.9, astucia: 0.5, compaixao: -0.1, ambicao: 0.8, preguica: -0.2, confianca: 0.8 },
    imagem: 'src/assets/imagens/deuses/hera.png',
  },
  {
    id: 'hestia',
    nome: 'Héstia',
    dominio: 'Lar e Comunidade',
    descricao:
      'Guardiã silenciosa da lareira, Héstia raramente busca os holofotes, mas é ela quem mantém tudo unido. Seus filhos criam refúgio onde quer que estejam e preferem construir comunidade a buscar glória pessoal.',
    traits: { coragem: -0.1, sabedoria: 0.5, ordem: 0.6, astucia: -0.1, compaixao: 0.8, ambicao: -0.6, preguica: 0.4, confianca: 0.2 },
    imagem: 'src/assets/imagens/deuses/hestia.png',
  },
  {
    id: 'persefone',
    nome: 'Perséfone',
    dominio: 'Primavera e Submundo',
    descricao:
      'Dividida entre dois mundos, Perséfone é ao mesmo tempo renovação e sombra. Seus descendentes carregam essa dualidade com naturalidade — gentis à luz do dia, insondáveis quando as coisas escurecem.',
    traits: { coragem: 0.3, sabedoria: 0.5, ordem: 0.2, astucia: 0.4, compaixao: 0.6, ambicao: 0.1, preguica: -0.1, confianca: 0.3 },
    imagem: 'src/assets/imagens/deuses/persefone.png',
  },
];
