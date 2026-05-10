interface HeaderProps {
  subtitle: string;
}

export function Header({ subtitle }: HeaderProps) {
  return (
    <header className="hero" aria-label="Apresentacao do assistente virtual">
      <h1>Assistente Virtual IFES Cariacica</h1>
      <p>{subtitle}</p>
      <div className="hero-badges" aria-label="Principais funcionalidades">
        <span>Consulta paginas oficiais</span>
        <span>Responde duvidas frequentes</span>
        <span>Direciona para o link correto</span>
      </div>
    </header>
  );
}
