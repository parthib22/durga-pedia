"use client";
import { StandaloneSearchBox } from "@react-google-maps/api";
// import data from "@/app/Pandels";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import React from "react";
import "../app/searchbox.css";
import "../app/pandalinfo.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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
  const [enableCard, setEnableCard] = useState(true);

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

  const PandalCard = () => {
    return (
      <div className={`pandalCard ${enableCard && "cardClose"}`}>
        <div className="pandalInfo">
          <button className="pandalClose" onClick={() => setEnableCard(true)}>
            <ArrowBackIosNewIcon />
          </button>
          <h2 className="pandalTitle">
            t.name
            <button className="mapPinBtn">📍</button>
          </h2>
          <p>
            From above location Based on driving mode you will need /t.duration/{" "}
            to travel /t.distance/
          </p>
          <div className="pandalMapInfo">
            <div className="badge-container">
              <h4 className="mapTopic">Food</h4>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
             
            </div>
          </div>
          <div className="pandalMapInfo">
            <div className="badge-container">
              <h4 className="mapTopic">Trains</h4>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
             
            </div>
            <div className="badge-container">
              <h4 className="mapTopic">Metro</h4>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              
            </div>
            <div className="badge-container">
              <h4 className="mapTopic">Bus Stops</h4>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              <div className="badge">food</div>
              
            </div>
          </div>
          <div className="pandalMapInfo">
            <span className="mapTopic">Prices</span>
            <table className="pandalFareTable">
              <tbody>
                <tr>
                  <td className="pandalTableBody">Bus</td>
                  <td className="pandalTableBody">₹ 69/-</td>
                </tr>
                <tr>
                  <td className="pandalTableBody">Local Taxi</td>
                  <td className="pandalTableBody">₹ 69/-</td>
                </tr>
                <tr>
                  <td className="pandalTableBody">Uber Go</td>
                  <td className="pandalTableBody">₹ 69/-</td>
                </tr>
                <tr>
                  <td className="pandalTableBody">Uber Xl</td>
                  <td className="pandalTableBody">₹ 69/-</td>
                </tr>
                <tr>
                  <td className="pandalTableBody">Uber Premier</td>
                  <td className="pandalTableBody">₹ 69/-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pandalMapInfo">
            <h3 className="mapTopic">Weather</h3>
            <div className="pandalWeatherLg">
              <div className="pandalWeatherSm">
                <div className="pandalTempLg">t.weather.temp °C</div>
                <span className="pandalLocationSm">t.weather.name</span>
              </div>
              {/* <Image
                src={t.weather.icon}
                className="weatherImg"
                alt={"image"}
                width={50}
                height={50}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Suggestions = () => {
    if (searchTerm.length >= 3) {
      return (
        <ul className="suggestions">
          {searchResults.map((item: any) => (
            <li
              key={item.id}
              onClick={() => {
                console.log("pds from pandalcard");
                setEnableCard(false);
              }}
            >
              {item.pandal}
            </li>
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
        {/* <span className="shareIco">{<IosShareIcon />}</span> */}
        <input
          // className={searchTerm.length > 0 ? "ipPadding" : ""}
          placeholder="Search pandals in Kolkata"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
      </div>
      {<Suggestions />}
      {<PandalCard/>}
    </div>
  );
};
export default AutoComplete;
