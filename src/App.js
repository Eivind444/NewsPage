import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  let [state, setState] = useState([]);
  let [initalState, setInitial] = useState([]);
  let [dark, setDark] = useState(false);
  let [loading, setLoading] = useState(true);

  // fetch the data from the url and update state variables
  useEffect(() => {
    const getNews = async () => {
      try {
        let news = await fetch("");
        if (!news.ok) {
          throw new Error(`HTTP error: ${news.status}`);
        }
        let result = await news.json();
        setState(result[0].TOP10);
        setInitial(result[0].TOP10);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch data");
      }
    };

    getNews();
  }, []);

  function searchArticles(term) {
    return initalState.filter((article) => {
      return article.Tittel.toLowerCase().includes(term.toLowerCase());
    });
  }

  return (
    <div className={dark ? "AppDark" : "App"}>
      <NavBar
        searchFunc={searchArticles}
        updateFunc={setState}
        theme={dark}
        updateTheme={setDark}
      ></NavBar>

      {loading && <div className="loading"></div>}
      <div className="wrapper">
        <section>
          {state.map((article, i) => {
            return (
              <Card
                theme={dark ? "cardDark" : "card"}
                key={i}
                article={article}
              ></Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}

function Card({ article, theme }) {
  return (
    <a href={"https://" + article.Url}>
      <div className={theme}>
        <img src={article.LEADIMAGE} alt={article.Tittel} />
        <h2>{article.Tittel}</h2>
      </div>
    </a>
  );
}

function NavBar({ searchFunc, updateFunc, theme, updateTheme }) {
  return (
    <div className="navBar">
      <a href={"https://www.adressa.no/"}>
        <h2>Home</h2>
      </a>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          updateFunc(searchFunc(e.target.value));
        }}
      ></input>
      <button
        className={theme ? "themeButtonDark" : "themeButton"}
        onClick={() => updateTheme(!theme)}
      ></button>
    </div>
  );
}

export default App;