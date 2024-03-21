import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useCallback, useState } from "react";

function App() {
  const [selectInputLanguage, setSelectInputLanguage] = useState("en");
  const [selectOutputLanguage, setSelectOutputLanguage] = useState("hi");
  const [inputWord, setInputWord] = useState("");
  const [outputTranslation, setOutputTranslation] = useState("");

  const TextTranslator = useCallback(async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", selectInputLanguage);
    encodedParams.set("target_language", selectOutputLanguage);
    encodedParams.set("text", inputWord);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "6486bc95dbmsha9bb478e816a470p14ed9bjsnf6e81b43681b",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setOutputTranslation(response.data.data.translatedText);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [selectInputLanguage, selectOutputLanguage, inputWord]);

  const onClickHandler = () => {
    TextTranslator();
  };

  return (
    <div className="App">
    
      <input
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
      />

      <select
        value={selectInputLanguage}
        onChange={(e) => setSelectInputLanguage(e.target.value)}
      >
        <option value={"en"}>English</option>
        <option value={"nl"}>Dutch</option>
        <option value={"fr"}>French</option>
        <option value={"hi"}>Hindi</option>
        <option value={"it"}>Italian</option>
      </select>
      <select
        value={selectOutputLanguage}
        onChange={(e) => setSelectOutputLanguage(e.target.value)}
      >
        <option value={"en"}>English</option>
        <option value={"nl"}>Dutch</option>
        <option value={"fr"}>French</option>
        <option value={"hi"}>Hindi</option>
        <option value={"it"}>Italian</option>
      </select>
      <p>{outputTranslation}</p>
      <button onClick={onClickHandler}>Translate</button>
    </div>
  );
}

export default App;
