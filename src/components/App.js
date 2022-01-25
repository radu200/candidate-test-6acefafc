import React, { useState, useEffect, useCallback } from "react";
import logo from "../logo.svg";
import styles from "./App.module.scss";
import * as API from "../api/characters";

// Character list is available in the public directory

export default function App() {
  const [state, setState] = useState({
    characters: [],
    searchCategories: [],
    spinner: false,
    err: "",
  });

  const getCharacters = useCallback(async () => {
    try {
      setState((state) => ({ ...state, spinner: true }));
      const res = await API.getCharacters();
      if (res.status === 200) {
        setState((state) => ({
          ...state,
          permanentCharacters: res.data,
          characters: res.data,
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

  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <h1 className="App-title">Lord of the Rings Character Index</h1>
      </header>

      <section className="App-content">
        {/* Lovely character list goes here */}
      </section>
    </div>
  );
}
