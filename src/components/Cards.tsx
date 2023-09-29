"use client";
import React, { useEffect, useState, useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../app/cards.css";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { stringify } from "querystring";
import { setSomeProperty } from "../../slices/StateCheck";
import { useDispatch } from "react-redux";
import Image from "next/image";

function Cards() {
  const [Display, SetDisplay] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [priceVis, setPriceVis] = useState(false);
  //console.log(Display);
  let visited = new Map();
  const dispatch = useDispatch();
  dispatch(setSomeProperty(null));
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const count = useSelector((state: RootState) => state.cordinates.value);
  let frar: {
    id: string;
    lat: string;
    lng: string;
    name: string;
    rst: any;
    distance: any;
    duration: any;
    trns: any;
    met: any;
    bst: any;
    fares: any;
    weather: any;
  }[] = [];
  const [pandals, setPandals] = useState<
    {
      id: string;
      lat: string;
      lng: string;
      name: string;
      rst: any;
      distance: any;
      duration: any;
      trns: any;
      met: any;
      bst: any;
      fares: any;
      weather: any;
    }[]
  >([]);
  useEffect(() => {
    //console.log("Count has changed to: " + count);
    if (count !== null) {
      //console.log(Display);

      // console.log("Count is not null and its value is: ");
      console.log(count);
      if (
        typeof count != "undefined" &&
        count != "" &&
        count[0].type.length > 0 &&
        count[0].type == "range"
      ) {
        console.log("entered from range");
        startRangeRouting();
      }
      if (
        typeof count != "undefined" &&
        count != "" &&
        count[0].type.length > 0 &&
        count[0].type == "pandal"
      ) {
        console.log("entered from pnadal ");
        startRouting();
      }
      // if (count[0].fid != null) {
      //   SetDisplay(true);
      // }
    }
  }, [count]);
  function getShortestRoute(idvar: any, pandalData: any) {
    let ar: any[] = [];
    try {
      //console.log(idvar);
      var k = 9999;
      for (const i in pandalData[idvar - 1][idvar]) {
        // console.log(pandalData[idvar-1][idvar][i]);
        if (!visited.has(i)) {
          // console.log(i);
          if (pandalData[idvar - 1][idvar][i] < k) {
            k = pandalData[idvar - 1][idvar][i];
            ar = [{ nid: i, ndist: k }];
          }
        }
      }
      // console.log(ar[0].nid);
      if (ar.length > 0) {
        visited.set(ar[0].nid, "bkcd");
      }

      return ar;
    } catch (e) {
      console.log(e);
      //return ar;
    }
  }
  async function GetDist(cords: any) {
    // console.log("in line 62");
    console.log(cords.lat1);
    // console.log(cords[0].lat1);
    const origins = cords.lat1 + "," + cords.lng1;
    const destinations = cords.lat2 + "," + cords.lng2;
    var d1, d2;
    //console.log(origins+"|"+destinations)
    try {
      await fetch("/api/distance", {
        method: "POST",
        headers: {
          Accept: "text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ origins, destinations }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(JSON.stringify(data) + " from 96");
          // Handle the response data here
          //console.log('Server Response:', data['results'][0].results);
          // console.log(data['results']['rows'][0]['elements'][0]['distance'].text);
          d1 = data["results"]["rows"][0]["elements"][0]["distance"].text;
          d2 = data["results"]["rows"][0]["elements"][0]["duration"].text;
        })
        .catch((error) => {});
      return [d1, d2];
    } catch (error) {
      console.log("error from 132: " + error);
      return error;
    }
  }

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

  async function GetFare(dist: any) {
    try {
      var distance = dist.distance;
      let ar: {
        bus: any;
        ubert: any;
        uberp: any;
        uberg: any;
        uberx: any;
        uberpre: any;
      }[] = [];
      await fetch("/api/fare", {
        method: "POST",
        headers: {
          Accept: "text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ distance }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("For distance = " + distance.distance);
          // console.log(distance);
          console.log(data);
          ar.push({
            bus: data["results"][0].bus,
            ubert: data["results"][1].uber_taxi,
            uberp: data["results"][2].uber_pool,
            uberg: data["results"][3].uber_ubergo,
            uberx: data["results"][4].uber_uberxl,
            uberpre: data["results"][5].uber_premier,
          });
        });
      return ar;
    } catch (error) {
      console.log("error from 132: " + error);
    }
  }
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
  async function showComputedRoute(keysval: any) {
    let str: string = "";
    var l1 = count[0].lat,
      ln1 = count[0].lng;
    var karval: any[] = [];

    for (const keysc of keysval) {
      // console.log(keysc);
      try {
        const pandalData = fetch(
          "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json"
        ).then((response) => response.json());
        var la, lo;
        for (const pandal of await pandalData) {
          if (pandal.id == keysc) {
            la = pandal.lat;
            lo = pandal.lng;
            // karval.push(la+","+lo);
            // console.log("l1 ="+l1+",ln1= "+ln1+",la= "+la+", lo"+lo)
            let distance_cal: any = await GetDist({
              lat1: l1,
              lng1: ln1,
              lat2: la,
              lng2: lo,
            });
            // console.log(Math.ceil(parseInt(distance_cal[0].split(" ")[0])));
            //var spl_dist=distance_cal.split("|");
            l1 = la;
            ln1 = lo;
            let fare = await GetFare({
              distance: Math.ceil(parseInt(distance_cal[0].split(" ")[0])),
            });
            let resname = await GetResturant({
              lat1: la,
              lng1: lo,
            });
            console.log(distance_cal);
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
              distance: distance_cal[0],
              duration: distance_cal[1],
              trns: train,
              met: metro,
              bst: bus,
              fares: fare,
              weather: weather,
            });
            str = str + la + "," + lo + "|";
            //karval.push({'la':la,'lo':lo});
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    let arstr = [];
    //console.log(arstr);
    arstr.push({
      lat: count[0].lat,
      lng: count[0].lng,
      lat1: count[0].lat1,
      lng1: count[0].lng1,
      nopal: count[0].nopal,
      fid: count[0].fid,
      pcheck: count[0].pcheck,
      value_cordinates: str,
      value_ids: keysval,
    });
    console.log(arstr);
    setPandals(frar);
    SetDisplay(true);
    console.log(pandals);
    try {
      str = count[0].lat + "," + count[0].lng + "|" + str;
      if (count[0].pcheck) {
        str = str + "|" + count[0].lat + "," + count[0].lng;
      }

      let vbar = [{ status: false, kar: str }];
      dispatch(setSomeProperty(vbar));
    } catch (e) {
      console.error("Error at statecheck dispatch: " + e);
    }
  }
  async function startRouting() {
    const pandalData = await fetch(
      "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@09e6f6c6e7bf3aa771adf311531cb44a5db30abb/outputk.json"
    ).then((response) => response.json());

    console.log("entered" + count);
    //console.log(count[0].fid);

    try {
      if (count[0].fid != null) {
        // console.log("entered");

        // const cordiarray:[number, number][]=[];
        visited.set(count[0].fid.toString(), "bkcd");
        var idvar = count[0].fid;
        var nop = count[0].nopal - 1;
        console.log(nop + "no of pandals");
        var text = " ";
        while (nop > 0) {
          var res = getShortestRoute(idvar, pandalData);
          if (res && res[0]) {
            idvar = res[0].nid;
          }

          nop--;
        }
        const keysval = Array.from(visited.keys());

        console.log(keysval);
        //console.log(keysval.length+"d");
        showComputedRoute(keysval);
        //console.log(cordiarray);
      }
    } catch (e) {
      console.error(e);
    }
  }
  async function startRangeRouting() {
    const pandalData = await fetch(
      "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@09e6f6c6e7bf3aa771adf311531cb44a5db30abb/outputk.json"
    ).then((response) => response.json());
    try {
      if (count[0].fid != null) {
        // console.log("entered");
        //  console.log(count);
        let ar: any[] = [];

        var knt = 0;
        // const cordiarray:[number, number][]=[];
        visited.set(count[0].fid.toString(), "bkcd");
        var idvar = count[0].fid;
        for (const i in pandalData[idvar - 1][idvar]) {
          if (!visited.has(i) && knt < 11) {
            // console.log(i);
            if (pandalData[idvar - 1][idvar][i] <= count[0].nopal && knt < 11) {
              let k = pandalData[idvar - 1][idvar][i];
              ar = [{ nid: i, ndist: k }];
              visited.set(ar[0].nid, "bkcd");
              knt++;
            }
          }
          if (knt >= 11) {
            break;
          }
        }

        const keysval = Array.from(visited.keys());
        // console.log("printing");
        console.log(keysval);
        showComputedRoute(keysval);
      }
    } catch (e) {
      console.error(e);
    }
  }
  function redirect(red: string) {
    window.open(red, "_blank");
  }
  //console.log(pandals);
  //if(Display)
  // if (true)
  //{
  // return <>{<CardsDisplay />}</>;
  if (!Array.isArray(pandals)) {
    return <div>loading</div>; // or any loading indicator
  } else {
    if (Display) {
      // if (scrollRef.current) {
      //   scrollRef.current.scrollIntoView({ behavior: "smooth" });
      // }

      return (
        <div ref={scrollRef} className="timeline">
          <div className="outer">
            {pandals.map((t) => (
              <div className="card" key={t.id}>
                <div className="info">
                  <div className="button_container">
                    <button className="mark mark-right">{<DoneIcon />}</button>
                    <button className="mark mark-wrong">{<ClearIcon />}</button>
                  </div>
                  <h2 className="title">
                    {t.name}
                    <button className="circular-button">📍</button>
                  </h2>
                  <p>
                    From above location Based on driving mode you will need{" "}
                    {t.duration} to travel {t.distance}
                  </p>
                  <div className="map_info">
                    <h3 className="map-written">Food 🍟</h3>
                    <div className="badge-container">
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
                  <div className="map_info">
                    <h4 className="map-written">Trains 🚅</h4>
                    <div className="badge-container">
                      {t.trns.length === 0 ? (
                        <span className="unbadge">
                          ! no train stations nearby
                        </span>
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
                      {}
                    </div>
                    <h4 className="map-written">Metro 🚇</h4>
                    <div className="badge-container">
                      {t.met.length === 0 ? (
                        <span className="unbadge">
                          ! no metro stations nearby
                        </span>
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
                    <h4 className="map-written">Bus Stops 🚌</h4>
                    <div className="badge-container">
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
                  <div className="map_info">
                    <span
                      className="map-written"
                      onClick={() => {
                        setPriceVis(!priceVis);
                        console.log(priceVis);
                      }}
                    >
                      <ArrowDropDownIcon />
                      Prices
                    </span>
                    <table className="fare_table">
                      <tbody style={{ display: priceVis ? "none" : "" }}>
                        <tr>
                          <td className="tableBody">Bus</td>
                          <td className="tableBody">₹ {t["fares"][0].bus}/-</td>
                        </tr>
                        <tr>
                          <td className="tableBody">Local Taxi</td>
                          <td className="tableBody">
                            ₹ {t["fares"][0].ubert}/-
                          </td>
                        </tr>
                        <tr>
                          <td className="tableBody">Uber Go</td>
                          <td className="tableBody">
                            ₹ {t["fares"][0].uberg}/-
                          </td>
                        </tr>
                        <tr>
                          <td className="tableBody">Uber Xl</td>
                          <td className="tableBody">
                            ₹ {t["fares"][0].uberx}/-
                          </td>
                        </tr>
                        <tr>
                          <td className="tableBody">Uber Premier</td>
                          <td className="tableBody">
                            ₹ {t["fares"][0].uberpre}/-
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="map_info">
                    <h3 className="map-written">Weather</h3>
                    <div className="weatherLg">
                      <div className="weatherSm">
                        <div className="tempLg">{t.weather.temp}°C</div>
                        <span className="locationSm">{t.weather.name}</span>
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
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Cards;
