"use client";
import "../app/form.css";
// import '../app/globals.css'
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {useDispatch} from "react-redux";
import {incrementByAmount} from '../../slices/GlobalStore';
import MyContext from "./MyContext";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { count } from "console";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


export default function FormBottom(props: { onSubmit: any }) {
  const dispatch = useDispatch();
  dispatch(incrementByAmount(null));
  const { setContextData }: any = useContext(MyContext);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(googleMapsApiKey);
  const address = useRef<HTMLInputElement | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });
  const [scrollcheck, setScrollcheck] = useState(0);
  const [countpandal, setCountPandal] = useState(1);
  useEffect(() => {
    const handlescroll = () => {
      setScrollcheck(
        ((window.pageYOffset || document.documentElement.scrollTop) /
          document.documentElement.clientHeight) *
          100
      );
    };
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);
  // console.log(scrollcheck);
  // useEffect(() => {

  // }, [addressbool]);
  const getlatlng = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (address.current && address.current.value.trim() !== "") {
      const apiKey = "AIzaSyDj2cR40F6xZo8mTepkyEpJl8BGVNDZ2qk";
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address.current.value
      )}&key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK" && data.results.length > 0) {
            const result = data.results[0];
            const { lat, lng } = result.geometry.location;
            StartPlanner(lat,lng);
            setCoordinates({ lat, lng });
            props.onSubmit(lat + "|" + lng);
          } else {
            console.log(data);
            setCoordinates({ lat: null, lng: null });
            console.error(
              "Unable to retrieve coordinates for the given address."
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching data from Google Maps API:", error);
        });
    } else {
      // Reset coordinates when the address is empty
      setCoordinates({ lat: null, lng: null });
    }
  };

 
  const { isLoaded }: any = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDj2cR40F6xZo8mTepkyEpJl8BGVNDZ2qk",
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <></>;
  }
  //getting latand lang cordinates on button click
  function GetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction);
    } else {
      alert(
        "It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it."
      );
    }
  }
  function successFunction(position: any) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    setCoordinates({ lat: lat, lng: long });
    console.log("Your latitude is :" + lat + " and longitude is " + long);
    setContextData("Your latitude is :" + lat + " and longitude is " + long);
  }
   function distanceGet(lat1:any,lng1:any,lat2:any,lng2:any)
   {
    var _eQuatorialEarthRadius = 6378.1370;
var _d2r = (Math.PI / 180.0);
    var dlong = (lng2 - lng1) * _d2r;
    var dlat = (lat2 - lat1) * _d2r;
    var a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
    var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    var d = _eQuatorialEarthRadius * c;

    return d;
   }
  async function StartPlanner  (lat:any,lng:any)
  {
    let shortestDistance = Infinity;
    let flat = null;
    let flng = null;
    let name=null;
 try{
  const pandalData=fetch("https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json").then((response) => response.json());
    for (const pandal of await pandalData) {
        const latPandal = pandal.lat;
        const lngPandal = pandal.lng;
        const distance = distanceGet(lat,lng,latPandal,lngPandal);

        if (distance < shortestDistance) {
            shortestDistance = distance;
            flat = latPandal;
            flng =lngPandal;
            name=pandal.pandal;
        }
    }


    console.log(shortestDistance,flat,flng,name)
    
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: "Found!",
      html: "Check your nearest pandal is :"+name,
      icon: 'success'
    })
    const cordiarray = [{"lat": lat, "lng": lng, "lat1": flat, "lng1": flng}];

try {
  dispatch(incrementByAmount(cordiarray || null));
} catch (e) {
  console.error(e);
}
  }
  catch(e)
  {
    console.error(e);
  }
     
    
}
  
  //ends
  return (
    <>
      <div className="form-container">
        <form onSubmit={getlatlng}>
       
          <div
            className={`expandIcon ${scrollcheck > 50 ? "expandIconRot" : ""}`}
          >
            {<ExpandLessIcon />}
          </div>
          <div className="form-layout-1">
            <Autocomplete>
              <input
                ref={address}
                type="text"
                className="ipStartLoc"
                placeholder="Enter your start location"
              />
            </Autocomplete>
            <button
              className="btnStartLoc"
              type="submit"
              color="primary"
              onClick={GetLocation}
            >
              {<MyLocationIcon />}
            </button>
          </div>

          <div className="form-layout-2">
            <label className="labelPandal">Number of Pandals:</label>
            <span>
              <button
                id="minus"
                onClick={() =>
                  countpandal > 1 && setCountPandal(countpandal - 1)
                }
              >
                -
              </button>
              <div className="divPandal">{countpandal}</div>
              <button
                id="plus"
                onClick={() =>
                  countpandal < 40 && setCountPandal(countpandal + 1)
                }
              >
                +
              </button>
            </span>
          </div>

          <div className="form-layout-3">
            <label className="labelCheck" htmlFor="ipCheck">
              Is your starting point the end point?
            </label>
            <input id="ipCheck" type="checkbox" />
          </div>
          <div className="form-layout-4">
            <button className="sbm-btn" type="submit">
              Get Roadmap
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
