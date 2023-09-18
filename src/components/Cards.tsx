"use client";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "../app/cards.css";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";


function Cards() {

  const [Display, SetDisplay] = useState(false);
  console.log(Display);
  let visited = new Map();
 
  const count = useSelector((state: RootState) => state.cordinates.value);
   let frar:{ id: string; lat: string; lng: string; name: string; }[]=[];
   const [pandals, setPandals] = useState<{id: string,lat:string,lng:string,name:string }[]>([]);
  useEffect(() => {
    console.log("Count has changed to: " + count);
    if (count !== null) {
      console.log(Display);

      console.log("Count is not null and its value is: ");
      console.log(count);
      startRouting()
      if (count[0].fid!=null){
        SetDisplay(true);
    }
  }
    
  }, [count]); 
  function getShortestRoute(idvar: any,pandalData:any) {
    
    let ar: any[]=[];
    try{
      
        //console.log(idvar);
        var k=9999;
      for (const i in pandalData[idvar-1][idvar]) {
        // console.log(pandalData[idvar-1][idvar][i]);
         if(!visited.has(i))
         {
         // console.log(i);
           if(pandalData[idvar-1][idvar][i]<k)
           {
          k=  pandalData[idvar-1][idvar][i];
          ar=[{"nid":i,"ndist":k}];
          }
         }
         
        
      }
     // console.log(ar[0].nid);
     if (ar.length > 0) {
      visited.set(ar[0].nid, "bkcd");
    }

     return ar;
    }
    catch(e)
    {
      console.log(e);
      //return ar;
    }
     
  }
  async function showComputedRoute(keysval:any){
    let str:string="";
    for(const keysc of  keysval) {
      console.log(keysc);
      try{
       
        const pandalData=fetch("https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json").then((response) => response.json());
        var la,lo;  
        for (const pandal of await pandalData) {
            if(pandal.id==keysc)
            {
              la=pandal.lat;
              lo=pandal.lng
              frar.push({"id":pandal.id,"lat":pandal.lat,"lng":pandal.lng,"name":pandal.pandal});
              str=str+la+","+lo+"|";
            }
          }
         
        }catch(e){
          console.error(e);
        }
         
      }
     
      let arstr=[];
      //console.log(arstr);
      arstr.push({"lat": count[0].lat, "lng": count[0].lng, "lat1": count[0].lat1, "lng1": count[0].lng1, "nopal": count[0].nopal, "fid": count[0].fid,
       "pcheck": count[0].pcheck,"value_cordinates":str,"value_ids":keysval});
      console.log(arstr);
     setPandals(frar);
     SetDisplay(true);
      console.log(pandals);  
  }
  async function startRouting() {
    const pandalData= await fetch("https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@09e6f6c6e7bf3aa771adf311531cb44a5db30abb/outputk.json").then((response) => response.json());

    console.log("entered"+count);
    //console.log(count[0].fid);

    try {
      if (count[0].fid!=null){
       // console.log("entered");
      
       // const cordiarray:[number, number][]=[];
        visited.set(count[0].fid.toString(),"bkcd");
        var idvar=count[0].fid;
        var nop=count[0].nopal-1;
       //console.log(nop);
       var text=" ";
        while (nop>0){
       
           var res=getShortestRoute(idvar,pandalData)
           if (res && res[0]) {
          idvar=res[0].nid;
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

 // console.log(count+"ddd");
  const CardsDisplay = () => {
    console.log(Display);  
      if(Display)
    // if (true) 
  {
      return (
        
        <div className="timeline">
          <div className="outer">
          {frar.map((t) => (
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
                      <span className="locationSm">Mudjimba, QLD</span>
                    </div>
                    {
                      <WbSunnyIcon
                        style={{ color: "yellow", fontSize: "3em" }}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
  ))}
           
          </div>
        </div>
      );
    }
  };

  // return <>{<CardsDisplay />}</>;
  if (!Array.isArray(pandals)) {
   
    return <div>loading</div>; // or any loading indicator
  }
  console.log(Display);  
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
                      <span className="locationSm">Mudjimba, QLD</span>
                    </div>
                    {
                      <WbSunnyIcon
                        style={{ color: "yellow", fontSize: "3em" }}
                      />
                    }
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


