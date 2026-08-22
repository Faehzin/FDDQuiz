import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import EntityImage from './EntityImage';
import GreekFrame from './GreekFrame';
import { godImageMap, orgImageMap } from '../lib/assetImages';

/** Card compartilhável (estilo sticker) combinando deus + organização. */
export default function ShareCard({ god, org }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(false);

  async function handleDownload() {
    if (!cardRef.current) return;
    setDownloading(true);
    setError(false);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = 'filhos-do-destino-resultado.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Falha ao gerar imagem do card:', err);
      setError(true);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={cardRef}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-fdd-bg-light to-fdd-bg-deep p-8 text-center text-fdd-cream"
      >
        <GreekFrame thickness={10} tile={20} className="text-fdd-gold" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-fdd-gold-light">Filhos do Destino</p>
          <p className="mt-1 font-display text-lg text-fdd-cream-dark">Meu resultado</p>

          <div className="mt-8 flex items-center justify-center gap-6">
            {god && (
              <div className="flex flex-col items-center gap-2">
                <EntityImage
                  src={godImageMap[god.id]}
                  nome={god.nome}
                  className="h-24 w-24 rounded-full border-4 border-fdd-gold object-cover"
                />
                <p className="font-display text-sm text-fdd-gold-light">{god.nome}</p>
              </div>
            )}
            {org && (
              <div className="flex flex-col items-center gap-2">
                <EntityImage
                  src={orgImageMap[org.id]}
                  nome={org.nome}
                  className="h-24 w-24 rounded-full border-4 border-fdd-gold object-cover"
                />
                <p className="font-display text-sm text-fdd-gold-light">{org.nome}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="rounded-full border-2 border-fdd-gold bg-fdd-gold/10 px-6 py-2 font-display text-sm tracking-wide text-fdd-gold-light transition hover:bg-fdd-gold/20 disabled:opacity-50"
      >
        {downloading ? 'Gerando...' : 'Baixar card'}
      </button>
      {error && (
        <p className="text-xs text-fdd-cream-dark">
          Não foi possível gerar a imagem agora — tente novamente.
        </p>
      )}
    </div>
  );
}
