import { Link } from 'react-router-dom';
import { useResults } from '../context/ResultsContext';
import ResultDetail from '../components/ResultDetail';
import ShareCard from '../components/ShareCard';
import LaurelDivider from '../components/LaurelDivider';
import { godImageMap, orgImageMap } from '../lib/assetImages';

export default function Result() {
  const { godResult, orgResult } = useResults();

  if (!godResult && !orgResult) {
    return (
      <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-6 text-center">
        <h1 className="font-display text-2xl text-fdd-cream sm:text-3xl">
          Você ainda não descobriu seu destino
        </h1>
        <p className="text-sm text-fdd-cream-dark">
          Responda a um dos quizzes para revelar seu resultado aqui.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/quiz/deuses"
            className="rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm text-fdd-ink transition hover:bg-fdd-gold-light"
          >
            Fazer quiz dos deuses
          </Link>
          <Link
            to="/quiz/organizacoes"
            className="rounded-full border-2 border-fdd-gold-dark bg-fdd-gold px-6 py-2 font-display text-sm text-fdd-ink transition hover:bg-fdd-gold-light"
          >
            Fazer quiz das organizações
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-10 py-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-fdd-gold-light">Seu destino</p>
        <h1 className="mt-3 font-display text-3xl text-fdd-cream fdd-glow-text sm:text-4xl">
          O que os fios revelam
        </h1>
        <LaurelDivider className="mx-auto mt-4 h-6 w-40 text-fdd-gold" />
      </div>

      {godResult && (
        <ResultDetail
          kicker="Seu parente divino"
          entity={godResult.entity}
          subtitulo={godResult.entity.dominio}
          imageSrc={godImageMap[godResult.entity.id]}
          retryTo="/quiz/deuses"
          retryLabel="Refazer este quiz"
        />
      )}

      {orgResult && (
        <ResultDetail
          kicker="Sua organização"
          entity={orgResult.entity}
          subtitulo={orgResult.entity.foco}
          imageSrc={orgImageMap[orgResult.entity.id]}
          retryTo="/quiz/organizacoes"
          retryLabel="Refazer este quiz"
        />
      )}

      {!godResult && (
        <Link
          to="/quiz/deuses"
          className="text-xs uppercase tracking-[0.2em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
        >
          Ainda falta descobrir seu parente divino →
        </Link>
      )}
      {!orgResult && (
        <Link
          to="/quiz/organizacoes"
          className="text-xs uppercase tracking-[0.2em] text-fdd-cream-dark underline decoration-fdd-gold-dark underline-offset-4 hover:text-fdd-gold-light"
        >
          Ainda falta descobrir sua organização →
        </Link>
      )}

      {godResult && orgResult && (
        <div className="w-full border-t border-fdd-gold-dark/30 pt-10">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-fdd-gold-light">
            Card compartilhável
          </p>
          <ShareCard god={godResult.entity} org={orgResult.entity} />
        </div>
      )}
    </div>
  );
}
