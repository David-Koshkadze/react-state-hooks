import { useQuery } from "@tanstack/react-query";
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
  const [{ search }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      search: "",
    }
  );

  const { data: pokemon } = useQuery(
    ["pokemon"],
    () => fetch("/pokemon.json").then((res) => res.json()),
    {
      initialData: [],
    }
  );

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

// Pokemon Provider
export function PokemonProvider({ children }) {
  return (
    <PokemonContext.Provider value={useFetchPokemon()}>
      {children}
    </PokemonContext.Provider>
  );
}
