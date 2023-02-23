import { PokemonProvider, usePokemonContext } from "./store";

function SearchBox() {
  const { search, setSearch } = usePokemonContext();

  return (
    <input 
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
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
    <PokemonProvider>
      <SearchBox />
      <PokemonList />
    </PokemonProvider>
  );
}

export default App;
