import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

const PokemonContext = createContext({
  pokemon: [],
});

function useFetchPokemon() {
  const [{ pokemon, search }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setPokemon":
          return { ...state, pokemon: action.payload };
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      pokemon: [],
      search: "",
    }
  );

  useEffect(() => {
    fetch("/pokemon.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "setPokemon", payload: data }));
  }, []);

  // set search
  const setSearch = useCallback((searchText) => {
    dispatch({ type: "setSearch", payload: searchText });
  }, []);

  // filter pokemon
  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [pokemon, search]
  );

  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );

  return { pokemon: sortedPokemon, search, setSearch };
}

export function usePokemonContext() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }) {
  return (
    <PokemonContext.Provider value={useFetchPokemon()}>
      {children}
    </PokemonContext.Provider>
  );
}
