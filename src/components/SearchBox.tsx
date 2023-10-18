"use client";
import { StandaloneSearchBox } from "@react-google-maps/api";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NavigationIcon from "@mui/icons-material/Navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";
import React from "react";
import "../app/searchbox.css";
import "../app/pandalinfo.css";
import Link from "next/link";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import { Placeholder } from "rsuite";
import "rsuite/dist/rsuite.min.css";

async function getPandalData() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@76798f91ac960d9ea1ed9e6f8b708edc5c3504df/output.json"
    );
    const pandalData = await response.json();
    return pandalData;
  } catch (error) {
    console.error("Error fetching pandal data:", error);
    throw error;
  }
}

const AutoComplete = () => {
  const [foodEx, setFoodEx] = useState(false);
  const [trainEx, setTrainEx] = useState(false);
  const [metroEx, setMetroEx] = useState(false);
  const [busEx, setBusEx] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [datas, setDatas] = useState([]); // Initialize datas as an empty array
  // const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [enableCard, setEnableCard] = useState(true);
  const [cardLoad, setCardLoad] = useState(false);
  const [Pandals, setPandals] = useState<
    {
      id: string;
      lat: string;
      lng: string;
      adr: string;
      name: string;
      rst: any;
      trns: any;
      met: any;
      bst: any;
      weather: any;
    }[]
  >([]);
  let frar: {
    id: string;
    lat: string;
    lng: string;
    adr: string;
    name: string;
    rst: any;
    trns: any;
    met: any;
    bst: any;
    weather: any;
  }[] = [];
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
  async function GetTransitTrain(cords: any) {
    try {
      var lat = cords.lat1,
        lng = cords.lng1;
      let ar: { tstame: string; lat: string; lng: string; map: any }[] = [];
      await fetch("/api/transits", {
        method: "POST",
        headers: {
          Accept: "text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ lat, lng }),
      })
        .then((response) => response.json())
        .then((data) => {
          var cnt = 0,
            latnew,
            lngnew;
          // console.log(data['results'][0].results[0]);
          for (const i in data["results"][0].results) {
            if (cnt > 6) {
              break;
            }
            latnew = data["results"][0].results[i].geometry.location.lat;
            lngnew = data["results"][0].results[i].geometry.location.lng;
            ar.push({
              tstame: data["results"][0].results[i].name,
              lat: data["results"][0].results[i].geometry.location.lat,
              lng: data["results"][0].results[i].geometry.location.lng,
              map:
                "https://www.google.com/maps/search/?api=1&query=" +
                latnew +
                "," +
                lngnew +
                "&query_place_id=" +
                data["results"][0].results[i].place_id,
            });
            cnt++;
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
      return ar;
    } catch (error) {
      console.log("error from 132: " + error);
    }
  }

  async function GetTransitMetro(cords: any) {
    try {
      var lat = cords.lat1,
        lng = cords.lng1;
      let ar: { tstame: string; lat: string; lng: string; map: any }[] = [];
      await fetch("/api/transits", {
        method: "POST",
        headers: {
          Accept: "text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ lat, lng }),
      })
        .then((response) => response.json())
        .then((data) => {
          var cnt = 0,
            latnew,
            lngnew;
          var leng = data["results"][1].results;
          // console.log(leng.length);
          for (const i in data["results"][1].results) {
            if (cnt > 6) {
              break;
            }
            if (i >= leng.length) {
              break;
            }
            //console.log(data['results'][0].results[i].geometry.location.lat);
            latnew = data["results"][1].results[i]["geometry"].location.lat;
            lngnew = data["results"][1].results[i]["geometry"].location.lng;
            ar.push({
              tstame: data["results"][1].results[i].name,
              lat: data["results"][1].results[i].geometry.location.lat,
              lng: data["results"][1].results[i].geometry.location.lng,
              map:
                "https://www.google.com/maps/search/?api=1&query=" +
                latnew +
                "," +
                lngnew +
                "&query_place_id=" +
                data["results"][1].results[i].place_id,
            });
            cnt++;
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
      return ar;
    } catch (error) {
      console.log("error from 132: " + error);
    }
  }

  async function GetTransitBus(cords: any) {
    try {
      var lat = cords.lat1,
        lng = cords.lng1;
      let ar: { tstame: string; lat: string; lng: string; map: any }[] = [];
      await fetch("/api/transits", {
        method: "POST",
        headers: {
          Accept: "text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ lat, lng }),
      })
        .then((response) => response.json())
        .then((data) => {
          var leng = data["results"][2].results;
          console.log(leng.length);
          var cnt = 0,
            latnew,
            lngnew;
          for (const i in data["results"][2].results) {
            if (cnt > 6) {
              break;
            }
            // console.log(data['results'][2]['results'][i]);
            if (i >= leng.length || data["results"][2]["results"][i] === null) {
              break;
            }
            //console.log(data['results'][0].results[i].geometry.location.lat);
            latnew = data["results"][2].results[i].geometry.location.lat;
            lngnew = data["results"][2].results[i].geometry.location.lng;
            ar.push({
              tstame: data["results"][2].results[i].name,
              lat: data["results"][2].results[i].geometry.location.lat,
              lng: data["results"][2].results[i].geometry.location.lng,
              map:
                "https://www.google.com/maps/search/?api=1&query=" +
                latnew +
                "," +
                lngnew +
                "&query_place_id=" +
                data["results"][2].results[i].place_id,
            });
            cnt++;
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
      return ar;
    } catch (error) {
      console.log("error from 132: " + error);
    }
  }

  async function GetFare(dist: any) {}
  async function GetResturant(cords: any) {
    try {
      var lat = cords.lat1,
        lng = cords.lng1;
      let ar: { rame: string; lat: string; lng: string; map: string }[] = [];
      await fetch("/api/restaurants", {
        method: "POST",
        headers: {
          Accept: "text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ lat, lng }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var cnt = 0,
            latnew,
            lngnew;
          for (const i in data["results"][0].results) {
            if (cnt > 6) {
              break;
            }
            //console.log(data['results'][0].results[i].geometry.location.lat);
            if (
              data["results"][0].results[i].opening_hours.open_now == true &&
              data["results"][0].results[i].rating >= 4
            ) {
              latnew = data["results"][0].results[i].geometry.location.lat;
              lngnew = data["results"][0].results[i].geometry.location.lng;
              ar.push({
                rame: data["results"][0].results[i].name,
                lat: data["results"][0].results[i].geometry.location.lat,
                lng: data["results"][0].results[i].geometry.location.lng,
                map:
                  "https://www.google.com/maps/search/?api=1&query=" +
                  latnew +
                  "," +
                  lngnew +
                  "&query_place_id=" +
                  data["results"][0].results[i].place_id,
              });
              cnt++;
            }
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
      return ar;
    } catch (error) {
      console.log("error from 132: " + error);
    }
  }
  async function GetWeather(cords: any) {
    try {
      var url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        cords.lat1 +
        "&lon=" +
        cords.lng1 +
        "5&appid=0d6fc19faf7830c989855c0eec84a0ad&units=metric";
      // console.log(url);
      const response = await fetch(url);
      const wth = await response.json();
      // console.log(wth['weather'][0].icon);
      // console.log(wth['main'].temp);
      // console.log(wth.name);
      var iconurl =
        "https://openweathermap.org/img/wn/" +
        wth["weather"][0].icon +
        "@2x.png";
      return {
        icon: iconurl,
        temp: Math.ceil(wth["main"].temp),
        name: wth.name,
      };
      // .then((data)=>{
      //   console.log(data);
      // })
      // console.log(vb);
    } catch (e) {
      console.log(e);
    }
  }
  async function startSearching(i: any) {
    try {
      const pandalData = fetch(
        "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@76798f91ac960d9ea1ed9e6f8b708edc5c3504df/output.json"
      ).then((response) => response.json());
      var la, lo;
      for (const pandal of await pandalData) {
        if (pandal.id == i) {
          la = pandal.lat;
          lo = pandal.lng;
          // karval.push(la+","+lo);
          // console.log("l1 ="+l1+",ln1= "+ln1+",la= "+la+", lo"+lo)

          let resname = await GetResturant({
            lat1: la,
            lng1: lo,
          });
          //console.log(distance_cal);
          let train = await GetTransitTrain({
            lat1: la,
            lng1: lo,
          });
          let metro = await GetTransitMetro({
            lat1: la,
            lng1: lo,
          });
          let bus = await GetTransitBus({
            lat1: la,
            lng1: lo,
          });

          let weather = await GetWeather({
            lat1: la,
            lng1: lo,
          });
          console.log(weather);
          frar.push({
            id: pandal.id,
            lat: pandal.lat,
            lng: pandal.lng,
            adr: pandal.address,
            name: pandal.pandal,
            rst: resname,
            trns: train,
            met: metro,
            bst: bus,
            weather: weather,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    console.log(frar);
    setPandals(frar);
    setCardLoad(true);
    // setEnableCard(false);
    console.log(Pandals);
  }
  const PandalCard = () => {
    if (!Array.isArray(Pandals)) {
      return <div>loading</div>; // or any loading indicator
    } else {
      if (cardLoad === false) {
        return (
          <>
            <div className={`pandalInfo ${enableCard && "cardClose"}`}>
              <button
                aria-label="close"
                className={`pandalClose ${enableCard && "cardClose"}`}
                onClick={() => setEnableCard(true)}
              >
                <ArrowBackIosNewIcon />
              </button>
              <div className="pandalLoader">
                <Placeholder.Paragraph
                  className="ph"
                  rows={1}
                  rowHeight={30}
                  rowMargin={25}
                />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  rows={3}
                  rowHeight={12}
                  rowMargin={10}
                />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  rows={1}
                  rowHeight={17}
                  rowMargin={20}
                />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  rows={1}
                  rowHeight={17}
                  rowMargin={20}
                />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  rows={1}
                  rowHeight={17}
                  rowMargin={20}
                />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  rows={1}
                  rowHeight={17}
                  rowMargin={20}
                />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  rows={1}
                  rowHeight={17}
                  rowMargin={20}
                />
                <br />
                <br />
                <Placeholder.Paragraph
                  className="ph"
                  graph={"square"}
                  rows={2}
                  rowHeight={17}
                  rowMargin={10}
                  style={{ paddingBottom: "40px" }}
                />
              </div>
            </div>
          </>
        );
      } else if (cardLoad || enableCard == false) {
        console.log(Pandals);
        return (
          <>
            {Pandals.map((t: any) => (
              <div
                key={t.lat}
                className={`pandalInfo ${enableCard && "cardClose"}`}
              >
                <button
                  aria-label="close"
                  className={`pandalClose ${enableCard && "cardClose"}`}
                  onClick={() => setEnableCard(true)}
                >
                  <ArrowBackIosNewIcon />
                </button>
                <Link
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    t.lat +
                    "," +
                    t.lng
                  }
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  className="pandalTitle"
                >
                  {t.name}
                  <button aria-label="navigation" className="mapPinBtn">
                    <NavigationIcon />
                  </button>
                </Link>
                <p style={{ width: "100%", textAlign: "left" }}>{t.adr}</p>
                <div className="pandalMapInfo">
                  <div className="pandalBadgeContainer">
                    <h4 className="mapTopic" onClick={() => setFoodEx(!foodEx)}>
                      Food
                      <span className={foodEx ? "" : "expandedIcon"}>
                        <ArrowDropDownIcon />
                      </span>
                    </h4>
                    {t.rst.length === 0 ? (
                      <span className="pandalUnBadge">
                        ! no restaurants nearby
                      </span>
                    ) : (
                      t.rst.map((adv: any, index: any) => (
                        <Link
                          href={adv.map}
                          target="_blank"
                          className={`pandalBadge ${foodEx && "cardClose"}`}
                          key={index}
                        >
                          {adv.rame}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div className="pandalMapInfo">
                  <div className="pandalBadgeContainer">
                    <h4
                      className="mapTopic"
                      onClick={() => setTrainEx(!trainEx)}
                    >
                      Trains
                      <span className={trainEx ? "" : "expandedIcon"}>
                        <ArrowDropDownIcon />
                      </span>
                    </h4>
                    {t.trns.length === 0 ? (
                      <span className="pandalUnBadge">
                        ! no train stations nearby
                      </span>
                    ) : (
                      t.trns.map(
                        (
                          adv: {
                            map: URL;
                            tstame:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | React.PromiseLikeOfReactNode
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <Link
                            href={adv.map}
                            target="_blank"
                            className={`pandalBadge ${trainEx && "cardClose"}`}
                            key={index}
                          >
                            {adv.tstame}
                          </Link>
                        )
                      )
                    )}
                  </div>
                  <div className="pandalBadgeContainer">
                    <h4
                      className="mapTopic"
                      onClick={() => setMetroEx(!metroEx)}
                    >
                      Metro
                      <span className={metroEx ? "" : "expandedIcon"}>
                        <ArrowDropDownIcon />
                      </span>
                    </h4>

                    {t.met.length === 0 ? (
                      <span className="pandalUnBadge">
                        ! no metro stations nearby
                      </span>
                    ) : (
                      t.met.map(
                        (
                          adv: {
                            map: URL;
                            tstame:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | React.PromiseLikeOfReactNode
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <Link
                            href={adv.map}
                            target="_blank"
                            className={`pandalBadge ${metroEx && "cardClose"}`}
                            key={index}
                          >
                            {adv.tstame}
                          </Link>
                        )
                      )
                    )}
                  </div>
                  <div className="pandalBadgeContainer">
                    <h4 className="mapTopic" onClick={() => setBusEx(!busEx)}>
                      Bus Stops
                      <span className={busEx ? "" : "expandedIcon"}>
                        <ArrowDropDownIcon />
                      </span>
                    </h4>

                    {t.met.length === 0 ? (
                      <span className="pandalUnBadge">
                        ! no bus stops nearby
                      </span>
                    ) : (
                      t.bst.map(
                        (
                          adv: {
                            map: URL;
                            tstame:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | React.PromiseLikeOfReactNode
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <Link
                            href={adv.map}
                            target="_blank"
                            className={`pandalBadge ${busEx && "cardClose"}`}
                            key={index}
                          >
                            {adv.tstame}
                          </Link>
                        )
                      )
                    )}
                  </div>
                </div>

                <div className="pandalMapInfo">
                  <h3 className="mapTopic">Weather</h3>
                  <div className="pandalWeatherLg">
                    <Link
                      href={"/"}
                      target="_blank"
                      className="pandalWeatherSm"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="pandalTempLg">
                        {t.weather.temp}°C
                        <Image
                          src={t.weather.icon}
                          className="weatherImg"
                          alt={"image"}
                          width={80}
                          height={80}
                        />
                      </div>
                      <span className="pandalLocationSm">{t.weather.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      }
    }
  };

  const Suggestions = () => {
    if (searchTerm.length >= 1) {
      return (
        <>
          {" "}
          <ul className={`suggestions ${!enableCard && "cardClose"}`}>
            {searchResults.map((item: any) => (
              <li
                key={item.id}
                onClick={() => {
                  console.log(item.id);
                  setEnableCard(false);
                  setCardLoad(false);
                  startSearching(item.id);
                }}
              >
                {item.pandal}
              </li>
            ))}
          </ul>
          <ul className={`defaultReport ${!enableCard && "cardClose"}`}>
            <li>
              <a
                href="https://forms.gle/wMnzHZSYGg2gVoMH9"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                Report a missing Durga Puja
              </a>
            </li>
          </ul>
        </>
      );
    }
  };

  return (
    <div className="autocomplete">
      <div>
        <span
          className={searchTerm.length > 0 ? "clearIco" : "icoActive"}
          onClick={() => {
            setSearchTerm("");
            setEnableCard(true);
          }}
        >
          {<ClearIcon />}
        </span>
        {/* <span className="shareIco">{<IosShareIcon />}</span> */}
        <img className="logoimg" src="\icon-192x192.png" alt="ico" />
        <input
          // className={searchTerm.length > 0 ? "ipPadding" : ""}
          placeholder="Search any pandal in Kolkata"
          spellCheck={false}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setEnableCard(true);
          }}
          // onKeyDown={handleKeyDown}
        />
      </div>
      {<Suggestions />}
      {<PandalCard />}
    </div>
  );
};
export default AutoComplete;
