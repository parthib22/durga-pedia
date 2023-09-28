"use client";
import { StandaloneSearchBox } from "@react-google-maps/api";
// import data from "@/app/Pandels";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import React from "react";
import "../app/searchbox.css";
import "../app/pandalinfo.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import Image from "next/image";
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
  const [Pandals,setPandals]=useState<
  {
    id: string;
    lat: string;
    lng: string;
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
                "http://maps.google.com/maps?q=" +
                latnew +
                "," +
                lngnew +
                "&ll=" +
                latnew +
                "," +
                lngnew +
                "z=17",
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
                "http://maps.google.com/maps?q=" +
                latnew +
                "," +
                lngnew +
                "&ll=" +
                latnew +
                "," +
                lngnew +
                "z=17",
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
                "http://maps.google.com/maps?q=" +
                latnew +
                "," +
                lngnew +
                "&ll=" +
                latnew +
                "," +
                lngnew +
                "z=17",
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
                  "http://maps.google.com/maps?q=" +
                  latnew +
                  "," +
                  lngnew +
                  "&ll=" +
                  latnew +
                  "," +
                  lngnew +
                  "z=17",
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
  async function startSearching(i:any)
  {
    try {
      const pandalData = fetch(
        "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json"
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
    setEnableCard(false)
    console.log(Pandals);
    
  }
  const PandalCard = () => {
    if (!Array.isArray(Pandals)) {
      return <div>loading</div>; // or any loading indicator
    } else {
    if(enableCard==false)
    {
      console.log(Pandals);
    return (
      <>
      {Pandals.map((t:any) => (
      <div key={t.lat} className={`pandalInfo ${enableCard && "cardClose"}`}>
        
        <button className="pandalClose" onClick={() => setEnableCard(true)}>
          <ArrowBackIosNewIcon />
        </button>
        
        <h2 className="pandalTitle">
          {t.name}
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
            {t.rst.map((adv: any, index: any) => (
                <Link
                  href={adv.map}
                  target="_blank"
                  className="badge"
                  key={index}
                >
                  {adv.rame}
                </Link>
              ))}
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
            {t.trns.length === 0 ? (
                <span className="unbadge">! no train stations nearby</span>
              ) : (
                t.trns.map(
                  (
                    adv: {
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
                    <span className="badge" key={index}>
                      {adv.tstame}
                    </span>
                  )
                )
              )}
          </div>
          <div className="badge-container">
            <h4 className="mapTopic">Metro</h4>
           
            {t.met.length === 0 ? (
                <span className="unbadge">! no metro stations nearby</span>
              ) : (
                t.met.map(
                  (
                    adv: {
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
                    <span className="badge" key={index}>
                      {adv.tstame}
                    </span>
                  )
                )
              )}
          </div>
          <div className="badge-container">
            <h4 className="mapTopic">Bus Stops</h4>
           
            {t.met.length === 0 ? (
                <span className="unbadge">! no bus stops nearby</span>
              ) : (
                t.bst.map(
                  (
                    adv: {
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
                    <a className="badge" key={index}>
                      {adv.tstame}
                    </a>
                  )
                )
              )}
          </div>
        </div>
       
        <div className="pandalMapInfo">
          <h3 className="mapTopic">Weather</h3>
          <div className="pandalWeatherLg">
            <div className="pandalWeatherSm">
              <div className="pandalTempLg">{t.weather.temp} °C</div>
              <span className="pandalLocationSm">{t.weather.name}</span>
            </div>
            <Image
                src={t.weather.icon}
                className="weatherImg"
                alt={"image"}
                width={50}
                height={50}
              />
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
    if (searchTerm.length >= 3) {
      return (
        <ul className={`suggestions ${!enableCard && "cardClose"}`}>
          {searchResults.map((item: any) => (
            <li
              key={item.id}
              onClick={() => {
                console.log(item.id);
                startSearching(item.id)
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
          onClick={() => {
            setSearchTerm("");
            setEnableCard(true);
          }}
        >
          {<ClearIcon />}
        </span>
        {/* <span className="shareIco">{<IosShareIcon />}</span> */}
        <input
          // className={searchTerm.length > 0 ? "ipPadding" : ""}
          placeholder="Search pandals in Kolkata"
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
