"use client";
import "../app/form.css";
// import '../app/globals.css'
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import MyContext from "./MyContext";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { count } from "console";

export default function FormBottom(props: { onSubmit: any }) {
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

  // const handleInputChange = (e:any) => {
  //   setAddress(e.target.value);
  // };
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  //ends
  return (
    <>
      <div className="container">
        <form onSubmit={getlatlng}>
          {coordinates.lat && coordinates.lng && (
            <p>
              Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
            </p>
          )}
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
              <button id="plus" onClick={() => countpandal < 40 && setCountPandal(countpandal + 1)}>
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
          {/* added text below to simulate content */}
          <div style={{ textAlign: "justify", padding: "20px" }}>
            khanki kom lekh
          </div>
          {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  Button
</button> */}
        </form>
      </div>
    </>
  );
}
