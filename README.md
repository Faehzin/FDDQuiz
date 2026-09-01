# Filhos do Destino — Quiz

Site oficial do universo de RPG "Filhos do Destino": landing page, quiz de
descoberta de personagem, mapa interativo do território (Lua Nova), gerador de
profecias e a página de resultado compartilhável. React + Vite + Tailwind v4.

## Sumário

- [Objetivo](#objetivo)
- [Stack técnica](#stack-técnica)
- [Como rodar localmente](#como-rodar-localmente)
- [Rotas](#rotas)
- [Arquitetura](#arquitetura)
  - [Fluxo do quiz e o motor de pontuação](#fluxo-do-quiz-e-o-motor-de-pontuação)
  - [Estado global (`ResultsContext`)](#estado-global-resultscontext)
  - [Assets por convenção (`import.meta.glob`)](#assets-por-convenção-importmetaglob)
  - [Animação de entrada](#animação-de-entrada)
  - [Tokens de design](#tokens-de-design)
- [Páginas em detalhe](#páginas-em-detalhe)
- [Banco de dados (Supabase)](#banco-de-dados-supabase)
- [Editando conteúdo](#editando-conteúdo)
- [Estrutura de pastas](#estrutura-de-pastas)

## Objetivo

Dois quizzes de personalidade que descobrem qual dos 16 deuses gregos é o
"parente divino" do usuário (15 perguntas) e qual das 5 organizações do
universo ele integraria (11 perguntas) — usando um vetor de traços de
personalidade e similaridade de cosseno, não um questionário de pontos fixos.
Em volta disso, o site também é a porta de entrada pro universo da campanha: uma landing page
apresentando a história e os personagens, um mapa navegável do território
(Lua Nova) e um gerador de profecias por template, ligado a um banco de dados
compartilhado para os jogadores registrarem e consultarem suas profecias.

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite |
| Roteamento | react-router-dom v7 (`BrowserRouter`, incluindo a View Transitions API nativa via prop `viewTransition`) |
| Estilo | Tailwind CSS v4 (tokens em `src/index.css`, via `@theme`) + DaisyUI |
| Animação | Framer Motion (variantes compartilhadas em `src/lib/motionVariants.js`) |
| Persistência | Supabase (Postgres) — resultados de quiz e profecias |
| Geração de imagem | `html-to-image` (card de resultado compartilhável) |
| Ícones | `react-icons` (família Font Awesome 6) |
| Lint | Oxlint |

Sem TypeScript — o projeto é JS puro (`.jsx`), com JSDoc pontual em funções
mais críticas (ex: `quizEngine.js`).

## Como rodar localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # oxlint
```

Crie um `.env.local` na raiz com as credenciais do Supabase:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Sem essas variáveis, o site funciona normalmente (quiz, mapa, landing) — só a
gravação/consulta no Supabase (resultado do quiz e profecias) é desativada,
com um aviso no console em vez de erro (ver `src/lib/supabaseClient.js`).

## Rotas

| Rota | Página | Observação |
|---|---|---|
| `/` | `Landing.jsx` | Landing page pública, fora do `<Layout>` padrão (tem seu próprio header/footer) |
| `/quizes` | `Home.jsx` | Ponto de partida dos dois quizzes (era a rota `/` antes da landing existir) |
| `/quiz/deuses` | `QuizGods.jsx` | Quiz de parente divino |
| `/quiz/organizacoes` | `QuizOrgs.jsx` | Quiz de organização |
| `/resultado` | `Result.jsx` | Resultado(s) do quiz + card compartilhável |
| `/mapa` | `MapaMundi.jsx` | Mapa interativo, tela cheia (fora do `<Layout>`, via portal) |
| `/profecias` | `Profecias.jsx` | Gerar ou consultar profecia por username |
| `*` | — | Redireciona pra `/` |

`/quizes`, `/quiz/*`, `/resultado` e `/profecias` compartilham o `<Layout>`
(header simples com o logo + footer com redes sociais). `/` (landing) e
`/mapa` têm chrome próprio e não usam `<Layout>`.

## Arquitetura

### Fluxo do quiz e o motor de pontuação

Cada resposta de pergunta carrega um `effect` — um objeto de traço → peso (ex:
`{ coragem: 2, preguica: -1 }`). O motor, em `src/lib/quizEngine.js`:

1. `scoreUser()` soma os efeitos de todas as respostas num vetor de traços do
   usuário.
2. `rankResults()` projeta o vetor de cada entidade (deus ou organização),
   normaliza os dois lados (z-score, usando `TRAIT_CALIBRATION_GODS` como
   tabela de média/desvio-padrão por traço) e calcula a similaridade de
   cosseno entre o vetor do usuário e o de cada entidade.
3. `weightedPick()` sorteia o resultado final entre as 3 entidades com maior
   similaridade, ponderado pelo próprio score — não é sempre a primeira
   colocada, mas as melhores têm mais chance.

`QuizFlow.jsx` é o componente genérico reaproveitado pelos dois quizzes
(`QuizGods`/`QuizOrgs` só passam `questions`, `entities` e o setter de
resultado certo); ele chama `scoreUser` → `rankResults` → `weightedPick` ao
final da última pergunta, grava o resultado no `ResultsContext` e dispara
`saveQuizResult()` (Supabase) antes de navegar pra `/resultado`.

### Estado global (`ResultsContext`)

`src/context/ResultsContext.jsx` guarda `godResult`/`orgResult` em memória
(`useState`, sem `localStorage`) — dura a sessão do navegador, não sobrevive a
um refresh. `/resultado` e a barra lateral do `/mapa`
(`MapResultSidebar.jsx`) leem daqui; nenhum outro lugar guarda esse estado.

### Assets por convenção (`import.meta.glob`)

Três arquivos em `src/lib/` (`assetImages.js`, `campaignImages.js`,
`mapImage.js`) seguem o mesmo padrão: usam `import.meta.glob` pra carregar
todos os arquivos de uma pasta de assets e montar um objeto `{ slug:
móduloImportado }`, onde `slug` é o nome do arquivo sem extensão. Isso permite
que o código referencie uma imagem pelo `id` de uma entidade de dados
(`godImageMap[hero.id]`) sem um `import` nomeado por arquivo — e sem quebrar o
build se o arquivo ainda não existir (o valor só fica `undefined`, e os
componentes caem num estado de placeholder). É assim que dá pra "só soltar o
arquivo na pasta" pra revelar um herói, trocar a arte do mapa, etc.

### Animação de entrada

`src/lib/motionVariants.js` define duas variantes do Framer Motion reusadas
no site inteiro: `fadeUp` (fade + leve subida, easing
`cubic-bezier(0.16, 1, 0.3, 1)`) e `staggerContainer` (escalona a entrada dos
filhos). Conteúdo acima da dobra anima no mount (`initial`/`animate`);
seções mais abaixo na landing usam `whileInView` com `once: true`, pra
disparar só quando o usuário rola até lá.

### Tokens de design

Paleta e tipografia vivem em `src/index.css` via `@theme` do Tailwind v4
(`--color-fdd-*`, fontes `Cinzel` (display) + `Inter` (texto)). Componentes
decorativos reaproveitados em várias páginas: `GreekFrame` (moldura em grega
nos 4 lados de um card), `GreekKeyStrip` (faixa horizontal, usada no
header/footer), `LaurelDivider` (divisor com ramo de louro).

## Páginas em detalhe

**Landing (`/`)** — 5 seções: header sticky (logo, nav, redes sociais, CTA
Fastplay), hero (headline + CTAs + arte do Zeus com máscara de dissolução e
fade de saída no scroll via `IntersectionObserver`), heróis da campanha
(`CAMPAIGN_HEROES`, cards verticais com flip 3D no hover revelando o
ator/atriz — só se o herói estiver `unlocked`), locais em destaque (reaproveita
o lore de `mapLocations.js`) e footer.

**Quiz (`/quizes`, `/quiz/deuses`, `/quiz/organizacoes`)** — fluxo de pergunta
única por vez, uma pergunta por vez com transição de slide (`QuestionCard`),
barra de progresso, e ao final grava no `ResultsContext` + Supabase.

**Resultado (`/resultado`)** — mostra o(s) resultado(s) já respondido(s),
convida a fazer o quiz que falta, e (com os dois resultados prontos) monta um
card compartilhável (`ShareSection`/`ShareCard`, renderizado como PNG via
`html-to-image` para download ou compartilhamento em redes sociais).

**Mapa Mundi (`/mapa`)** — mapa em tela cheia (fora do fluxo normal de layout,
renderizado via `createPortal` pra escapar do stacking context do `<Layout>`).
Arraste pra pan, zoom por botão/scroll/pinça, com o zoom mínimo calculado
dinamicamente (`computeFitRect`) pra sempre mostrar a imagem inteira sem
cortar, tipo `object-fit: contain`. Marcadores (`MapMarker`) contra-escalam
pra manter tamanho fixo na tela em qualquer zoom; clicar num marcador abre um
painel lateral (`MapDetailPanel`) com o lore daquele local. Uma barra lateral
discreta (`MapResultSidebar`) mostra o parente divino do usuário, se já tiver
feito o quiz.

**Profecias (`/profecias`)** — gera uma "profecia" combinando um fragmento
sorteado por parente divino (`ABERTURAS_POR_DEUS`) com outro por organização
(`MISSOES_POR_ORG`), em `src/lib/prophecyTemplate.js` — puramente local,
sem IA nem rede. O usuário registra a profecia com um `username` único
(gravado na tabela `profecias` do Supabase) e pode consultá-la depois na aba
"Buscar".

## Banco de dados (Supabase)

Duas tabelas, ambas com RLS habilitado e políticas públicas de leitura/escrita
(sem autenticação de usuário no site):

- **`quiz_results`** — só recebe `insert` (`tipo_quiz`, `resultado_id`,
  `vetor_usuario`). Nada no código lê essa tabela de volta hoje.
- **`profecias`** — `username` (único), `nome_exibicao`, `parente_divino`,
  `organizacao`, `texto_profecia`. A constraint `unique` em `username` já cria
  um índice B-tree no Postgres, então a busca por username em
  `fetchProphecyByUsername()` é O(log n) sem nada manual. O SQL de criação
  está documentado em comentário no topo de `src/lib/supabaseClient.js`.

## Editando conteúdo

Tudo que é conteúdo (não lógica) fica em `src/data/`, como arrays/objetos
simples — dá pra editar sem tocar em componente nenhum:

| O que | Arquivo | Observação |
|---|---|---|
| Deuses (parentes divinos) | `data/gods.js` | `traits` de -1 a 1 por atributo; imagem em `assets/imagens/deuses/{id}.png` |
| Organizações | `data/orgs.js` | Mesmo esquema de `traits`; imagem em `assets/imagens/orgs/{id}.png` |
| Perguntas dos quizzes | `data/question-gods.js`, `data/question-orgs.js` | Cada opção tem um `effect` (traço → peso) |
| Locais do mapa | `data/mapLocations.js` | Coordenadas `x`/`y` em % da imagem |
| Heróis da campanha | `data/campaignHeroes.js` | Ver abaixo |

**Para revelar um novo herói na landing:** solte o arquivo `{id}.png` (ou
`.jpg`/`.webp`) em `src/assets/imagens/campanha/`, preencha `nome`/`origem` na
entrada correspondente em `campaignHeroes.js` e troque `unlocked` pra `true`.
Se quiser o flip revelando o ator/atriz, adicione também a entrada em
`ACTOR_IMAGE_OVERRIDES` (`src/components/landing/HeroCard.jsx`) — os arquivos
de ator não seguem um padrão de nome único, então esse mapeamento é manual.

## Estrutura de pastas

```
src/
  assets/imagens/       # deuses, orgs, campanha (heróis/atores/logo/texturas), backgrounds, mapa
  components/           # componentes reutilizáveis (cards, decoração, quiz)
    landing/             # seções específicas da landing page
  context/               # ResultsContext (estado global do resultado do quiz)
  data/                  # conteúdo do site (deuses, orgs, perguntas, locais, heróis)
  hooks/                 # useCardImage (geração de PNG do card de resultado)
  lib/                    # motor do quiz, mapas de asset, variantes de animação, cliente Supabase
  pages/                  # uma por rota
docs/
  analise-algoritmos-busca.md   # levantamento acadêmico dos algoritmos de busca usados no projeto
```
