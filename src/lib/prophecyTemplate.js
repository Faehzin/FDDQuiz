// Geração de profecia por template: sorteia uma abertura (por parente divino)
// e uma missão (por organização), combinando os fragmentos com o nome de
// exibição do semideus. Puramente aleatório/local — nenhuma dependência do
// Supabase ou de rede.

const ABERTURAS_POR_DEUS = {
  zeus: [
    'Enquanto o trovão ecoar sobre o Olimpo e nenhum juramento for maior que a palavra do Pai dos Deuses,',
    'Sob o peso da coroa que ninguém ousa contestar, enquanto o céu obedecer a um só cetro,',
    'Enquanto o raio queima mais forte sobre quem ousar desafiar a vontade do Olimpo,',
    'Sob a tempestade que anuncia sua fúria, e a promessa de que nenhum mortal ou semideus escapará do que está por vir,',
  ],
  poseidon: [
    'Enquanto as marés se recusarem a manter a calma e o mar guardar mais segredos do que revela,\n',
    'Sob a fúria que dorme no fundo de todo oceano, pronta para despertar sem aviso,\n',
    'Enquanto a água continuar a moldar o mundo, seu tridente irá se sujar de sangue de um aliado ou inimigo, e ninguém saberá a diferença,\n',
    'Sob a tempestade que se forma no horizonte, a calmaria em seu peito jamais passará,\n',
  ],
  hades: [
    'Nas profundezas onde nenhuma luz do Olimpo alcança, onde cada passo é contado e nada se esquece,\n',
    'Enquanto o silêncio do submundo guardar mais verdade que qualquer palácio acima dele,\n',
    'Sob a sombra que se estende sobre todos os vivos, lembrando que a morte é apenas o começo de outra história,\n',
    'Enquanto os minérios chamarem por seu nome, e tudo abaixo de seus pés ainda se curvas à sua vontade,\n',
  ],
  atena: [
    'Sob o olhar frio de quem já viu todas as jogadas antes de a primeira peça se mover,\n',
    'Enquanto a estratégia valer mais que a força bruta e o silêncio antes da batalha for a arma mais afiada,\n',
    'Enquanto a sabedoria de mil anos guiar cada passo, como uma coruja que clama pelos seus filhotes,\n',
    'Sob a luz que revela o que ninguém mais vê, e a verdade que se esconde atrás de cada mentira,\n',
  ],
  apolo: [
    'Enquanto o sol atravessar o céu e cada nota, verso ou visão carregar um fragmento do futuro,\n',
    'Sob a luz que revela o que ainda está por vir, onde arte e profecia nascem do mesmo fôlego,\n',
    'Sua música ecoa acordes que nunca foram ouvidos, mas que todos sentirão quando o destino se cumprir,\n',
    'Enquanto o sol brilhar a cada manhã, e a beleza do mundo se revelar em cada detalhe,\n',
  ],
  ares: [
    'Enquanto houver injustiça de pé, e um punho cerrado for resposta suficiente,\n',
    'Sob o clamor da batalha que nunca terminou de verdade, apenas trocou de campo,\n',
    'Seu sangue vermelho pulsará com fúria quando seu melhor amigo morrer por sua culpa,\n',
    'Enquanto a guerra continuar a chamar por quem ousa lutar, você perderá cada segundo de vida pensando em guerra,\n',
  ],
  afrodite: [
    'Enquanto o coração insistir em escolher antes que a razão tenha chance de opinar,\n',
    'Sob o feitiço que nenhum escudo detém, porque nenhuma armadura protege o que se ama,\n',
    'Seu destino é ser amado por cada um deles, cada um com sua própria razão, mas você jamais sentirá amor por ninguém,\n',
    'Enquanto houver um olhar que desperte desejo, e uma mão que se estenda para tocar o que não pode ser tocado,\n',
  ],
  hefesto: [
    'No calor da forja onde toda mágoa vira metal e todo metal vira algo que dura,\n',
    'Enquanto houver algo quebrado esperando para ser reconstruído com as próprias mãos,\n',
    'Sob o fogo que molda o mundo, e a paciência que transforma cada erro em aprendizado,\n',
    'Porquanto seus pés tocarem o chão e suas mãos moldarem armadilhas, você irá perder toda batalha não planejada,\n',
  ],
  hermes: [
    'Enquanto houver uma fronteira a atravessar antes que alguém perceba que ela existia,\n',
    'Sob o vento que carrega toda mensagem, toda barganha e todo segredo bem guardado,\n',
    'Enquanto a velocidade for mais importante que a força, e a astúcia mais valiosa que a coragem,\n',
    'Ser rápido não vai salvar seus pais humanos. Ser esperto não vai salvar seus amigos. Ser esperto e rápido vai salvar você, e só você,\n',
  ],
  demeter: [
    'Enquanto a terra continuar dando fruto para quem souber esperar a estação certa,\n',
    'Sob a promessa antiga de que nada que cresce se perde, apenas muda de forma,\n',
    'Enquanto houver uma semente que ainda não germinou, e alguém disposto a cuidar dela,\n',
    'Sob a colheita que recompensa o trabalho paciente, você sentirá o fruto de suas ações,\n',
  ],
  dionisio: [
    'Enquanto a taça continuar cheia e a próxima hora importar menos que este exato instante,\n',
    'Sob o êxtase que rompe toda regra e não pede desculpas por isso,\n',
    'Enquanto houver uma festa que ninguém lembra, mas todos sentirão o efeito dela,\n',
    'Sob a loucura que se esconde atrás de cada sorriso, e a alegria que desafia toda lógica,\n',
  ],
  nike: [
    'Enquanto houver uma linha de chegada, e vontade suficiente para ser o primeiro a cruzá-la,\n',
    'Sob o peso da vitória que se conquista de novo a cada amanhecer, nunca garantida de véspera,\n',
    'Enquanto a coragem for mais valiosa que a força, e a determinação mais importante que a sorte,\n',
    'Sob o grito que ecoa mais alto que qualquer dúvida, e a certeza de que cada passo vale a pena,\n',
  ],
  hecate: [
    'Na encruzilhada onde três caminhos se encontram e nenhum deles é óbvio,\n',
    'Enquanto houver um enigma sem resposta e alguém disposto a decifrá-lo à luz de vela,\n',
    'Sob a escuridão que revela mais do que a luz jamais poderia, e o mistério que desafia toda explicação,\n',
    'Quando a magia antiga deixar de sussurrar segredos que ninguém mais entende, você ouvirá o chamado do mal,\n',
  ],
  nyx: [
    'Sob o manto da noite que guarda todo segredo até que ele esteja pronto para ser contado,\n',
    'Enquanto as estrelas continuarem testemunhando o que ninguém mais vê,\n',
    'Você é a noite da vida de todos aqueles que ama. Quando eles precisarem de você, você não estará lá. Quando eles não precisarem mais de você, você estará lá,\n',
    'Enquanto houver um sonho que ninguém mais ousa sonhar, e alguém disposto a persegui-lo,\n',
  ],
  thanatos: [
    'No último suspiro que ninguém atravessa duas vezes, onde toda história finalmente se fecha,\n',
    'Enquanto houver uma promessa a cumprir antes que o silêncio final chegue,\n',
    'Sob a inevitabilidade que todos tentam evitar, mas que você encara de frente,\n',
    'Enquanto a vida continuar a se esvair, você jamais sentirá o luto. O vazio de seus olhos reflete sua triste alma e,\n',
  ],
  nemesis: [
    'Enquanto a balança insistir em voltar ao equilíbrio, custe o que custar,\n',
    'Sob o peso da justiça que não esquece nem perdoa antes da hora certa,\n',
    'Enquanto houver uma dívida a ser paga, e alguém disposto a cobrar cada centavo,\n',
    'Sob a vingança que se esconde atrás de cada sorriso, e a retribuição que ninguém ousa desafiar,\n',
  ],
  default: ['Enquanto os fios do destino continuarem entrelaçados acima de todos nós,\n'],
};

const MISSOES_POR_ORG = {
  'Lua-nova': [
    'seu destino está entre os muros de Lua Nova, protegendo o que os mortais nunca saberão que precisou ser protegido.',
    'as Moiras te chamam para vestir a armadura de Lua Nova e responder pelo Olimpo sempre que o mundo mortal estiver em risco.',
    'seu fio se entrelaça com o de Lua Nova, e você lutará, para sempre, por humanos que lhe odeiam.',
  ],
  Anthros: [
    'seu caminho cruza com a Zeta tatuada na pele de quem jurou apagar todo vestígio do divino.',
    'as Moiras sussurram que sua história vai se chocar com a Anthros, e nem todo sangue divino escapa dessa guerra silenciosa.',
    'seu fio se enrola com o da Anthros, e você vai lutar, para sempre, contra seus próprios irmãos e irmãs.',
  ],
  Imitheos: [
    'o poder absoluto te chama, e a Imítheos promete que o sangue divino não deveria se curvar a ninguém.',
    'as Moiras veem em você a ambição que a Imítheos cultiva: divino e mortal fundidos numa só vontade de comandar.',
    'seu fio se entrelaça com o da Imítheos, e você vai lutar, para sempre, por quem não tem medo de ser mais que um semideus.',
    'o olimpo entende sua importância. A Imítheos entende sua importância. As Moiras entendem sua importância. E você entende que não há importância maior que a sua própria.',
  ],
  '83': [
    'seu fio está sendo cortado antes da hora pela Legião 83, que jurou libertar todo semideus do destino que os próprios deuses escreveram.',
    'as Moiras temem sua chegada: a Legião 83 não pede permissão para reescrever o que estava predestinado.',
    'seu fio se enrola com o da Legião 83, e você vai lutar, para sempre, por quem não teme desafiar os deuses.',
    'o Olimpo teme sua chegada, mas não será o bastante. Você cairá lutando, rodeado de pessoas que ama. Pelo menos, é um bom fim.',
  ],
  taurinos: [
    'seu destino segue um caminho estranho e sagrado, onde os Taurinos veneram o minotauro como poucos ousam entender.',
    'as Moiras riem baixinho ao ver seu fio se enrolar no dos Taurinos... Nem todo destino precisa fazer sentido.',
    'seu fio se entrelaça com o dos Taurinos, e... é. Só isso.',
    'seu destino é amar minotauros, mais do que a si mesmo',
  ],
  default: ['as Moiras ainda tecem seu fio, e nem elas sabem ao certo onde ele vai dar.'],
};

function sortearItem(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

export function gerarProfecia({ nomeExibicao, parenteDivino, organizacao }) {
  const abertura = sortearItem(ABERTURAS_POR_DEUS[parenteDivino] ?? ABERTURAS_POR_DEUS.default);
  const missao = sortearItem(MISSOES_POR_ORG[organizacao] ?? MISSOES_POR_ORG.default);

  return `${abertura} ${nomeExibicao}, ${missao}`;
}
