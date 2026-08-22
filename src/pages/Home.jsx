import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LaurelDivider from '../components/LaurelDivider';
import GreekFrame from '../components/GreekFrame';

const QUIZZES = [
  {
    to: '/quiz/deuses',
    titulo: 'Qual seu parente divino?',
    descricao:
      'Responda ao chamado do sangue. Descubra qual dos quinze deuses do panteão corre nas suas veias e molda seu destino.',
    cta: 'Descobrir meu deus',
  },
  {
    to: '/quiz/organizacoes',
    titulo: 'Qual organização você integraria?',
    descricao:
      'Nem todo descendente caminha sozinho. Descubra qual facção do mundo moderno de Filhos do Destino combina com quem você é.',
    cta: 'Descobrir minha organização',
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-10 py-8 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">Filhos do Destino</p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-fdd-cream fdd-glow-text sm:text-5xl">
          Sangue de deus, destino de mortal
        </h1>
        <LaurelDivider className="mx-auto mt-5 h-6 w-40 text-fdd-gold sm:h-7 sm:w-48" />
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-fdd-cream-dark sm:text-base">
          Em um mundo onde a mitologia grega nunca desapareceu — apenas se escondeu nas frestas do
          cotidiano — cada descendente carrega o sangue de um deus e escolhe (ou é escolhido por)
          uma organização que dá forma ao seu caminho. Responda aos dois quizzes e descubra a sua
          herança.
        </p>
      </div>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        {QUIZZES.map((quiz, i) => (
          <motion.div
            key={quiz.to}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="relative overflow-hidden rounded-3xl bg-fdd-cream p-6 text-fdd-ink shadow-2xl shadow-black/50 sm:p-8"
          >
            <GreekFrame thickness={10} tile={22} className="text-fdd-gold" />
            <div className="relative z-10 flex h-full flex-col items-center justify-between gap-5">
              <div>
                <h2 className="font-display text-xl text-fdd-ink sm:text-2xl">{quiz.titulo}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fdd-ink/80">{quiz.descricao}</p>
              </div>
              <Link
                to={quiz.to}
                className="inline-flex items-center justify-center rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm tracking-wide text-fdd-ink transition hover:bg-fdd-gold-light"
              >
                {quiz.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        to="/resultado"
        className="text-xs uppercase tracking-[0.3em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
      >
        Já respondi — ver meu resultado
      </Link>
    </div>
  );
}
