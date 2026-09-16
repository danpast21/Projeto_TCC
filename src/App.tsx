import { Chat } from "./components/Chat";
import "./styles.css";

export default function App() {
  return (
    <>
      <header className="govbar" aria-label="Barra institucional">
        <a href="https://www.gov.br" target="_blank" rel="noreferrer">
          Portal do Governo Brasileiro
        </a>
      </header>

      <div className="ifes-header">
        <div className="ifes-header-inner">
          <p className="ifes-title">Instituto Federal do Espirito Santo</p>
          <p className="ifes-subtitle">Campus Cariacica - Ministerio da Educacao</p>
        </div>
      </div>

      <main className="app-shell">
        <Chat />
      </main>

      <footer className="app-footer" aria-label="Rodape institucional">
        <img src="/favicon.ico" alt="Icone do IFES" className="footer-favicon" />
        <p>As respostas sao baseadas em paginas oficiais do IFES Campus Cariacica.</p>
      </footer>
    </>
  );
}
