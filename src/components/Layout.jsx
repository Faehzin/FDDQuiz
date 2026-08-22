import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="fdd-backdrop flex flex-col">
      <header className="relative z-10 flex items-center justify-center px-6 py-8">
        <Link to="/" className="text-center">
          <p className="font-display text-2xl tracking-[0.15em] text-fdd-gold-light fdd-glow-text sm:text-3xl">
            FILHOS DO DESTINO
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-fdd-cream-dark">Quiz</p>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pb-16 sm:px-6">{children}</main>

      <footer className="relative z-10 px-6 py-6 text-center text-xs text-fdd-cream-dark/70">
        Universo de Filhos do Destino — RPG de fantasia urbana grega.
      </footer>
    </div>
  );
}
