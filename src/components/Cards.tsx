"use client";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "../app/cards.css";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import axios from "axios";

function Cards() {
  const [Display, SetDisplay] = useState(false);
  console.log(Display);
  let visited = new Map();

  const count = useSelector((state: RootState) => state.cordinates.value);
  let frar: { id: string; lat: string; lng: string; name: string; rst:any }[] = [];
  const [pandals, setPandals] = useState<
    { id: string; lat: string; lng: string; name: string; rst:any }[]
  >([]);
  useEffect(() => {
    console.log("Count has changed to: " + count);
    if (count !== null) {
      console.log(Display);

      console.log("Count is not null and its value is: ");
      console.log(count);
      startRouting();
      if (count[0].fid != null) {
        SetDisplay(true);
      }
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
  async function GetDist(cords:any) {
    const origins = cords.lat1+","+cords.lng1;
    const destinations = cords.lat2+","+cords.lng2;
    const apiKey = 'AIzaSyDj2cR40F6xZo8mTepkyEpJl8BGVNDZ2qk'; // Replace with your actual API key

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`);
      const distance = response.data.rows[0].elements[0].distance.text;
      console.log(distance);

      // return `Iteration ${iterator}:${distance}`;
    }
    catch(e){
      console.log(e);
    }
  }
  async function GetTransit(cords:any) {
    
  }
  async function GetFare(dist:any) {
    
  }
  async function GetResturant(cords:any) {
    try {
      var lat=cords.lat1,lng=cords.lng1;
      let ar: { rame: string; lat: string; lng: string; map: any }[] = [];
      await fetch('/api/restaurants', {
          method: 'POST',
          headers:{
              'Accept': 'text/plain, */*',
              "Content-type":"application/json"
          },
          body:JSON.stringify({lat,lng}),
          
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the JSON response
        }).then((data) => {
          // Handle the response data here
          //console.log('Server Response:', data['results'][0].results);
          console.log("data from line 103"+data);
          var cnt=0,latnew,lngnew;
          for (const i in data['results'][0].results){
            if (cnt>6){
              break;
            }
            //console.log(data['results'][0].results[i].geometry.location.lat);
            if (data['results'][0].results[i].opening_hours.open_now == true && data['results'][0].results[i].rating>=4){
              latnew=data['results'][0].results[i].geometry.location.lat;
              lngnew=data['results'][0].results[i].geometry.location.lng;
              ar.push({
                rame:data['results'][0].results[i].name,
                lat:data['results'][0].results[i].geometry.location.lat,
                lng:data['results'][0].results[i].geometry.location.lng,
                map:"http://maps.google.com/maps?q="+latnew+","+ lngnew+"&ll="+latnew+","+ lngnew+"z=17",
              })
              cnt++;
            }
          }
       
          console.log("ar from line 123: "+ar);
          // Now you can access data.results to get the merged results
        }).catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch Error:', error);
        });
        console.log("ar from line 129: "+ar);
        return(ar);
    } catch (error) {
      console.log("error from 132: "+error);
    }
  }
  async function showComputedRoute(keysval: any) {
    let str: string = "";
    for (const keysc of keysval) {
      // console.log(keysc);
      try {
        const pandalData = fetch(
          "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json"
        ).then((response) => response.json());
        var la, lo,l1=count[0].lat,ln1=count[0].lng;
        for (const pandal of await pandalData) {
          if (pandal.id == keysc) {
            la = pandal.lat;
            lo = pandal.lng;
            // GetDist({
            //   "lat1":l1,
            //   "lng1":ln1,
            //   "lat2":la,
            //   "lng2":lo,
            // });
            
            let resname=await GetResturant({
              "lat1":la,
              "lng1":lo,

            });
            console.log(resname);
            l1=la,ln1=lo;
            
            frar.push({
              id: pandal.id,
              lat: pandal.lat,
              lng: pandal.lng,
              name: pandal.pandal,
              rst:resname,
            });
            str = str + la + "," + lo + "|";
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
        //console.log(nop);
        var text = " ";
        while (nop > 0) {
          var res = getShortestRoute(idvar, pandalData);
          if (res && res[0]) {
            idvar = res[0].nid;
          }

          nop--;
        }
        const keysval = Array.from(visited.keys());

        //console.log("hellod");
        //console.log(keysval.length+"d");
        showComputedRoute(keysval);
        //console.log(cordiarray);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // return <>{<CardsDisplay />}</>;
  if (!Array.isArray(pandals)) {
    return <div>loading</div>; // or any loading indicator
  }
  console.log(pandals);
  //if(Display)
  // if (true)
  //{
  return (
    <div className="timeline">
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
                <button className="circular-button">
                  {<LocationOnIcon />}
                </button>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              {/* <div className="map_info">
              <h3 className="map-written">
                Map
                <p className="map_written_b">(মানচিত্র) </p>
              </h3>
              
            </div> */}
              <div className="map_info">
                <h3 className="map-written">
                  Food
                  {/* <p className="map_written_b">(খাবারের জায়গা) </p> */}
                </h3>
                <div className="badge-container">
                {t.rst.map((adv: { rame: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; },index: React.Key | null | undefined) => (
                   <span className="badge" key={index}>{adv.rame}</span>))}
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written">
                  Transits
                  {/* <p className="map_written_b">(গণপরিবহন) </p> */}
                </h3>
                <div className="badge-container">
                  <span className="badge">Train</span>
                  <span className="badge">Metro</span>
                  <span className="badge">Tram</span>
                  <span className="badge">Bus</span>
                  <span className="badge">Yellow Taxi</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written">
                  Prices
                  {/* <p className="map_written_b">(যাত্রা খরচ) </p> */}
                </h3>
                <table className="fare_table">
                  <thead>
                    <tr>
                      <th className="tableHead">Medium</th>
                      <th className="tableHead">Fare</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tableBody">Bus</td>
                      <td className="tableBody">₹ 100/-</td>
                    </tr>
                    <tr>
                      <td className="tableBody">Local Taxi</td>
                      <td className="tableBody">₹ 100/-</td>
                    </tr>
                    <tr>
                      <td className="tableBody">Uber Go</td>
                      <td className="tableBody">₹ 100/-</td>
                    </tr>
                    <tr>
                      <td className="tableBody">Uber Xl</td>
                      <td className="tableBody">₹ 100/-</td>
                    </tr>
                    <tr>
                      <td className="tableBody">Uber Premier</td>
                      <td className="tableBody">₹ 100/-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="map_info">
                <h3 className="map-written">
                  Weather
                  {/* <p className="map_written_b">(আবহাওয়া) </p> */}
                </h3>
                <div className="weatherLg">
                  <div className="weatherSm">
                    <div className="tempLg">29°C</div>
                    <span className="locationSm">Mudjimba, QLD</span>
                  </div>
                  {<WbSunnyIcon style={{ color: "yellow", fontSize: "3em" }} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  //}
}

export default Cards;
