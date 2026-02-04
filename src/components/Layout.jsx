export default function Layout(props) {
  const { children } = props;
  const header = (
    <header>
      <h1 className="text-gradient">The Brogram</h1>
      <p>The Ultimate 30-Day Workout Program</p>
    </header>
  );
  const footer = (
    <footer>
      <p>
        Built by{" "}
        <a href="https://github.com/talbayo" target="_blank">
          Tal Bayo
        </a>
        <br/>Styled with <a href="https://fantacss.smoljames.com" target="_blank">FantaCSS</a>
      </p>
    </footer>
  );
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
