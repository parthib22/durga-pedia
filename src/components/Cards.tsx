"use client";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "../app/cards.css";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { getShebang } from "typescript";


function Cards() {
  const [Display,SetDisplay]=useState(false);
  console.log(Display);
  let visited=new Map();
  
  const count = useSelector((state:RootState) => state.cordinates.value);
  
  useEffect(() => {
   
    console.log("Count has changed to: " + count);
    if (count !== null) {
      console.log(Display);

      console.log("Count is not null and its value is: " );
      console.log(count);
      startRouting()
      SetDisplay(true);
    }
    
  }, [count]); 
  async function getShortestRoute(idvar: any) {
    console.log("entered1");
    let ar: any[]=[];
    try{
      const pandalData=await fetch("https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@09e6f6c6e7bf3aa771adf311531cb44a5db30abb/outputk.json").then((response) => response.json());
      

        console.log(pandalData[idvar-1][idvar]);
        var k=9999;
      for (const i in pandalData[idvar-1][idvar]) {
        // console.log(pandalData[idvar-1][idvar][i]);
         if(!visited.has(i))
         {
           if(pandalData[idvar-1][idvar][i]<k)
           {
          k=  pandalData[idvar-1][idvar][i];
          ar=[{"nid":i,"ndist":k}];
          }
         }
         
        
      }
      
     return ar;
    }
    catch(e)
    {
      console.log(e);
      //return ar;
    }
     
  }
  function startRouting() {
    console.log("entered"+count);
    console.log(count[0].fid);

    try {
      if (count[0].fid!=null){
       // console.log("entered");

        const cordiarray=[];
        visited.set(count[0].fid,"bkcd");
        var idvar=count[0].fid;
        //var nop=count.nopal-1;
        var res=getShortestRoute(idvar)
        res.then(result => {
          console.log(result);
        }).catch(error => {
          console.error("Error:", error);
        });
        //while (nop>0){
         // var res=
         
          // idvar=res.id;
          
        //}
      }
    }
    catch(e){
      console.error(e);
    }
  }

  console.log(count );
  const CardsDisplay=()=>{

 if(Display)
 {
  return (
    <div className="timeline">
      <div className="outer">
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneIcon />}</button>
              <button className="mark-wrong">{<ClearIcon />}</button>
            </div>
            <h2 className="title">
              Lorem ipsum
              <button className="circular-button">{<LocationOnIcon />}</button>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
                <span className="badge">Food</span>
                <span className="badge">Route</span>
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
                    <td className="tableBody">Uber Hire</td>
                    <td className="tableBody">₹ 100/-</td>
                  </tr>
                  <tr>
                    <td className="tableBody">Uber Pool</td>
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
                  <tr>
                    <td className="tableBody">Local Taxi</td>
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
                  <span className="locationSm font-semibold mt-1 text-gray-500">
                    Mudjimba, QLD
                  </span>
                </div>
                {<WbSunnyIcon style={{ color: "yellow", fontSize: "3em" }} />}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
            <div className="info">
              <div className="button_container">
                <button className="mark-right">{<DoneIcon />}</button>
                <button className="mark-wrong">{<ClearIcon />}</button>
              </div>
              <h2 className="title text-3xl font-bold">Title 2</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Map &nbsp;<p className="map_written_b">(মানচিত্র) </p>
                </h3>
                <button className="circular-button">
                  {<LocationOnIcon />}
                </button>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Food Places &nbsp;
                  <p className="map_written_b">(খাবারের জায়গা) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Foodz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">
                    Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz
                  </span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Transits &nbsp;<p className="map_written_b">(গণপরিবহন) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Prices &nbsp;<p className="map_written_b">(যাত্রা খরচ) </p>
                </h3>
                <table className="fare_table border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Medium
                      </th>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Bus
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Hire
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Pool
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Go
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Xl
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Premier
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Local Taxi
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Weather &nbsp;<p className="map_written_b">(আবহাওয়া) </p>
                </h3>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-6xl font-bold">29°C</span>
                    <span className="font-semibold mt-1 text-gray-500">
                      Mudjimba, QLD
                    </span>
                  </div>
                  {<WbSunnyIcon style={{ color: "yellow", fontSize: "3em" }} />}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card">
            <div className="info">
              <div className="button_container">
                <button className="mark-right">{<DoneOutlineIcon />}</button>
                <button className="mark-wrong">{<CloseIcon />}</button>
              </div>
              <h2 className="title text-3xl font-bold">Title 3</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Map &nbsp;<p className="map_written_b">(মানচিত্র) </p>
                </h3>
                <button className="circular-button">
                  {<LocationOnIcon />}
                </button>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Food Places &nbsp;
                  <p className="map_written_b">(খাবারের জায়গা) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Foodz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzz</span>
                  <span className="badge">Foodzzzzz</span>
                  <span className="badge">Foodzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Transits &nbsp;<p className="map_written_b">(গণপরিবহন) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Prices &nbsp;<p className="map_written_b">(যাত্রা খরচ) </p>
                </h3>
                <table className="fare_table border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Medium
                      </th>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Bus
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Hire
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Pool
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Go
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Xl
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Premier
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Local Taxi
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Weather &nbsp;<p className="map_written_b">(আবহাওয়া) </p>
                </h3>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-6xl font-bold">29°C</span>
                    <span className="font-semibold mt-1 text-gray-500">
                      Mudjimba, QLD
                    </span>
                  </div>
                  {<WbSunnyIcon style={{ color: "yellow", fontSize: "3em" }} />}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <div className="button_container">
                <button className="mark-right">{<DoneOutlineIcon />}</button>
                <button className="mark-wrong">{<CloseIcon />}</button>
              </div>
              <h2 className="title text-3xl font-bold">Title 4</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Map &nbsp;<p className="map_written_b">(মানচিত্র) </p>
                </h3>
                <button className="circular-button">
                  {<LocationOnIcon />}
                </button>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Food Places &nbsp;
                  <p className="map_written_b">(খাবারের জায়গা) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Foodz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">
                    Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz
                  </span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Transits &nbsp;<p className="map_written_b">(গণপরিবহন) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Prices &nbsp;<p className="map_written_b">(যাত্রা খরচ) </p>
                </h3>
                <table className="fare_table border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Medium
                      </th>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Bus
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Hire
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Pool
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Go
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Xl
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Premier
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Local Taxi
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Weather &nbsp;<p className="map_written_b">(আবহাওয়া) </p>
                </h3>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-6xl font-bold">29°C</span>
                    <span className="font-semibold mt-1 text-gray-500">
                      Mudjimba, QLD
                    </span>
                  </div>
                  {<WbSunnyIcon style={{ color: "yellow", fontSize: "3em" }} />}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <div className="button_container">
                <button className="mark-right">{<DoneOutlineIcon />}</button>
                <button className="mark-wrong">{<CloseIcon />}</button>
              </div>
              <h2 className="title text-3xl font-bold">Title 5</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Map &nbsp;<p className="map_written_b">(মানচিত্র) </p>
                </h3>
                <button className="circular-button">
                  {<LocationOnIcon />}
                </button>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Food Places &nbsp;
                  <p className="map_written_b">(খাবারের জায়গা) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Foodz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">Foodzzzzzzzzzzzz</span>
                  <span className="badge">Foodzzzz</span>
                  <span className="badge">
                    Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz
                  </span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl">
                  Transits &nbsp;<p className="map_written_b">(গণপরিবহন) </p>
                </h3>
                <div className="badge-container">
                  <span className="badge">Food</span>
                  <span className="badge">Route</span>
                </div>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Prices &nbsp;<p className="map_written_b">(যাত্রা খরচ) </p>
                </h3>
                <table className="fare_table border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Medium
                      </th>
                      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">
                        Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Bus
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Hire
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Pool
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Go
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Xl
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Uber Premier
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        Local Taxi
                      </td>
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        ₹ 100/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="map_info">
                <h3 className="map-written font-bold text-xl pb-8">
                  Weather &nbsp;<p className="map_written_b">(আবহাওয়া) </p>
                </h3>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-6xl font-bold">29°C</span>
                    <span className="font-semibold mt-1 text-gray-500">
                      Mudjimba, QLD
                    </span>
                  </div>
                  {<WbSunnyIcon style={{ color: "yellow", fontSize: "3em" }} />}
                </div>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
        }
        }
        return (
          <>
          {<CardsDisplay/>}
          </>
        );
}

export default Cards;


