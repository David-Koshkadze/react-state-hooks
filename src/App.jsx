import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PokemonProvider, usePokemonContext } from "./store";

const queryClient = new QueryClient();

function SearchBox() {
  const { search, setSearch } = usePokemonContext();

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}

function PokemonList() {
  const { pokemon } = usePokemonContext();

  return (
    <div>
      {pokemon.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <SearchBox />
        <PokemonList />
      </PokemonProvider>
    </QueryClientProvider>
  );
}

export default App;
