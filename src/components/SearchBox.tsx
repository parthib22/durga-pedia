"use client";
import { StandaloneSearchBox } from "@react-google-maps/api";
// import data from "@/app/Pandels";
import ClearIcon from "@mui/icons-material/Clear";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useState, useEffect } from "react";
import React from "react";
import "../app/SearchBox.css";

async function getPandalData() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json"
    );
    const pandalData = await response.json();
    return pandalData;
  } catch (error) {
    console.error("Error fetching pandal data:", error);
    throw error;
  }
}

const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [datas, setDatas] = useState([]); // Initialize datas as an empty array
  // const [suggestionsActive, setSuggestionsActive] = useState(false);

  useEffect(() => {
    getPandalData()
      .then((data) => {
        setDatas(data); // Set the fetched data in the state
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array to fetch data only once

  useEffect(() => {
    // Ensure that datas is an array before filtering
    if (Array.isArray(datas)) {
      const filteredData = datas.filter((item: any) =>
        item.pandal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchTerm.length >= 3) {
        console.log(searchTerm);
        setSearchResults(filteredData.slice(0, 10));
      }
      // setSuggestionsActive(true);
    }
  }, [searchTerm, datas]);

  // const handleChange = (e: { target: { value: string } }) => {
  //   const query = e.target.value.toLowerCase();
  //   setValue(query);
  //   if (query.length > 1) {
  //     const filterSuggestions = data.filter(
  //       (suggestion: string) => suggestion.toLowerCase().indexOf(query) > -1
  //     );
  //     setSuggestions(filterSuggestions);
  //     setSuggestionsActive(true);
  //   } else {
  //     setSuggestionsActive(false);
  //   }
  // };

  // const handleKeyDown = (e: { keyCode: number }) => {
  //   // UP ARROW
  //   if (e.keyCode === 38) {
  //     if (suggestionIndex === 0) {
  //       return;
  //     }
  //     setSuggestionIndex(suggestionIndex - 1);
  //   }
  //   // DOWN ARROW
  //   else if (e.keyCode === 40) {
  //     if (suggestionIndex - 1 === suggestions.length) {
  //       return;
  //     }
  //     setSuggestionIndex(suggestionIndex + 1);
  //   }
  //   // ENTER
  //   else if (e.keyCode === 13) {
  //     setValue(suggestions[suggestionIndex]);
  //     setSuggestionIndex(0);
  //     setSuggestionsActive(false);
  //   }
  // };

  const Suggestions = () => {
    if (searchTerm.length >= 3) {
      return (
        <ul className="suggestions">
          {searchResults.map((item: any) => (
            <li key={item.id}>{item.pandal}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="autocomplete">
      <div>
        <span
          className={searchTerm.length > 0 ? "clearIco" : "icoActive"}
          onClick={() => setSearchTerm("")}
        >
          {<ClearIcon />}
        </span>
        <span className="shareIco">{<IosShareIcon />}</span>
        <input
          className={searchTerm.length > 0 ? "ipPadding" : ""}
          placeholder="Happy Birthday Parthib!"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
      </div>
      {<Suggestions />}
    </div>
  );
};
export default AutoComplete;
