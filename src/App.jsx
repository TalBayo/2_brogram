import Layout from "./components/Layout.jsx";
import Grid from "./components/Grid.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <Layout>
      <main>
        <Hero />
        <Grid />
      </main>
    </Layout>
  );
}

export default App;
