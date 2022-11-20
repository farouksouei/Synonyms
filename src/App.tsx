import React, { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState<string>("");
  const [wordList, setWordList] = useState<string[]>([]);
  const handleFetchSynonyms = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.datamuse.com/words?rel_syn=${word}`
    );
    const data = await response.json();
    console.log(data);
    setWordList(data.map((item: any) => [item.word,item.score]));
  };
  return <div className="App">
    <form onSubmit={handleFetchSynonyms}>
      <label className="label-1" htmlFor="word-input">Your Word :</label>
      <input
        className="input-1"
        id="word-input"
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    <div className="synonyms">
      <h2>Synonyms</h2>
      <ul>
        {wordList.map((item, index) => (
          <li className="list-item" key={index}>
            {item[0]} with a score match of : {item[1]} points
          </li>
        ))}
      </ul>
    </div>
  </div>;
}

export default App;
