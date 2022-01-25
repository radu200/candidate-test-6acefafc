import React, { useState, useEffect, useCallback } from "react";
import logo from "../logo.svg";
import styles from "./App.module.scss";
import * as API from "../api/characters";
import * as helpers from "./helpers";
import CharacterCard from "./cards/character";
import SearchInput from "./inputs/search";

// Character list is available in the public directory
const orderCategories = [
  {
    id: 1,
    title: "SignificanceIndex",
    value: "significanceIndex",
  },
  {
    id: 2,
    title: "Alphabetical",
    value: "alphabetical",
  },
];

export default function App() {
  const [state, setState] = useState({
    //purpose of the permanent state is to keep intial data instead of fetching.
    //Normaly with real api I would do another request to search by category in backend
    permanentCharacters: [],
    characters: [],
    searchCategories: [],
    orderCategories: orderCategories,
    spinner: false,
    err: "",
  });

  const getCharacters = useCallback(async () => {
    try {
      setState((state) => ({ ...state, spinner: true }));
      const res = await API.getCharacters();

      if (res.status === 200) {
        const searchCategories = helpers.generateSearchCategories(res.data);

        setState((state) => ({
          ...state,
          permanentCharacters: res.data,
          characters: res.data,
          searchCategories,
        }));
      }
    } catch (err) {
      setState((state) => ({
        ...state,
        err: "An error occured",
      }));
    } finally {
      setState((state) => ({ ...state, spinner: false }));
    }
  }, []);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  const searchByCategory = (e) => {
    const category = e.target.value;

    const characters = state.permanentCharacters.filter(
      (c) => c.category === category
    );
    setState((state) => ({ ...state, characters }));
  };

  const orderBy = (e) => {
    const category = e.target.value;
    const characters = state.characters.sort((a, b) => {
      if (category === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return a.significanceIndex - b.significanceIndex;
    });
    setState((state) => ({ ...state, characters }));
  };

  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <h1 className="App-title">Lord of the Rings Character Index</h1>
      </header>

      <section className="App-content">
        <SearchInput
          data={state.searchCategories}
          id="categorySearch"
          title="Category"
          onChange={searchByCategory}
        />
        <SearchInput
          data={state.orderCategories}
          id="orderSearch"
          title="Order By"
          onChange={orderBy}
        />
        {state.characters.map((character) => (
          <CharacterCard {...character} key={character.significanceIndex} />
        ))}
      </section>
    </div>
  );
}
