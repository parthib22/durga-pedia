"use client"
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useState } from "react";
import React from "react";
import "../app/SearchBox.css";

const AutoComplete = ({ data }:any) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: { target: { value: string; }; }) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        (suggestion: string) => suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleKeyDown = (e: { keyCode: number; }) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    const handleClick = (e:any) => {
      setSuggestions([]);
      setValue(e.target.innerText);
      setSuggestionsActive(false);
    };
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      <input
        placeholder="Search in your area"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
};
// samadrit gandu
export default AutoComplete;