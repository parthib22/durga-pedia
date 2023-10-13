"use client";
import "../app/form.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount } from "../../slices/GlobalStore";
import { RWebShare } from "react-web-share";
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
import IosShareIcon from "@mui/icons-material/IosShare";
import { RootState } from "@/app/store";
import { setSomeProperty } from "../../slices/StateCheck";
import { LoaderCheck, setLoaderCheck } from "../../slices/LoaderCheck";
import { RotatingLines } from "react-loader-spinner";
import RouteIcon from "@mui/icons-material/Route";
import SearchIcon from "@mui/icons-material/Search";
// import GlobalConfig from "../app/app.config.js";

export default function FormBottom(props: { onSubmit: any }) {
  const dispatch = useDispatch();
  //dispatch(incrementByAmount(null));

  const sCheck = useSelector(
    (state: RootState) => state.loadercheck.loaderCheck
  );
  console.log("sCheck: " + sCheck[0].status);
  const [stateCheck, setStateCheck] = useState(false);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  useEffect(() => {
    if (
      sCheck != null &&
      sCheck.length > 0 &&
      typeof sCheck[0].status !== "undefined" &&
      sCheck[0].status != null
    ) {
      if (sCheck[0].status) {
        // start loader
        setStateCheck(true);
        console.log("from formbottom > scheck > loader is true");
      } else {
        // stop loader
        setStateCheck(false);
        console.log("from formbottom > scheck > loader is false");
      }
    }
  }, [sCheck]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollHeight = documentHeight - windowHeight;

      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollcheck(percentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(sCheck);
  const { setContextData }: any = useContext(MyContext);
  // const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(googleMapsApiKey);
  const address = useRef<HTMLInputElement | null>(null);
  // const address = useRef<HTMLInputElement | null | undefined>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });
  const [scrollcheck, setScrollcheck] = useState(0);
  const [countpandal, setCountPandal] = useState(1);
  const [checked, setChecked] = useState(false);
  const [labelcheck, setLabelcheck] = useState("pandal");
  const [geoClickCount, setGeoClickCount] = useState(false);

  const getlatlng = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (geoClickCount && coordinates) {
      StartPlanner(coordinates.lat, coordinates.lng);
      console.log("pds from click count: " + coordinates.lat + coordinates.lng);
    } else {
      if (address.current && address.current.value.trim() !== "") {
        const apiKey = "AIzaSyBbUTfwowrhJJ-lMPZlMlLM_v2Pui0QKDM";
        console.log(apiKey);
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address.current.value
        )}&key=${apiKey}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "OK" && data.results.length > 0) {
              const result = data.results[0];
              const { lat, lng } = result.geometry.location;

              setCoordinates({ lat: lat, lng: lng });
              StartPlanner(lat, lng);
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
    }
  };
  const globalapi = googleMapsApiKey;

  const { isLoaded }: any = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbUTfwowrhJJ-lMPZlMlLM_v2Pui0QKDM",
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
    // StartPlanner(lat, long);
    if (address.current !== null && address.current !== undefined) {
      address.current.value = lat + ", " + long;
    }
    console.log("Your latitude is :" + lat + " and longitude is " + long);
    setContextData("Your latitude is :" + lat + " and longitude is " + long);
  }
  function distanceGet(lat1: any, lng1: any, lat2: any, lng2: any) {
    var _eQuatorialEarthRadius = 6378.137;
    var _d2r = Math.PI / 180.0;
    var dlong = (lng2 - lng1) * _d2r;
    var dlat = (lat2 - lat1) * _d2r;
    var a =
      Math.pow(Math.sin(dlat / 2.0), 2.0) +
      Math.cos(lat1 * _d2r) *
        Math.cos(lat2 * _d2r) *
        Math.pow(Math.sin(dlong / 2.0), 2.0);
    var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    var d = _eQuatorialEarthRadius * c;

    return d;
  }

  async function StartPlanner(lat: any, lng: any) {
    let shortestDistance = Infinity;
    let flat = null;
    let flng = null;
    let name = null;
    let id = null;
    try {
      try {
        let wbar = [{ status: true }];
        dispatch(setLoaderCheck(wbar));
        console.log(
          "from formbottom > startplanner > loader is changed to true"
        );
      } catch (e) {
        console.error("Error at statecheck dispatch: " + e);
      }
      const pandalData = fetch(
        "https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@373f6e9cc17329cefa8b3fdb420efcd6f2eee949/output.json"
      ).then((response) => response.json());
      for (const pandal of await pandalData) {
        const latPandal = pandal.lat;
        const lngPandal = pandal.lng;
        const distance = distanceGet(lat, lng, latPandal, lngPandal);

        if (distance < shortestDistance) {
          shortestDistance = distance;
          flat = latPandal;
          flng = lngPandal;
          name = pandal.pandal;
          id = pandal.id;
        }
      }

      console.log(shortestDistance, flat, flng, name);

      // const MySwal = withReactContent(Swal);
      // MySwal.fire({
      //   title: "Found!",
      //   html: "Check your nearest pandal is :" + name,
      //   icon: "success",
      // });
      const cordiarray = [
        {
          lat: lat,
          lng: lng,
          lat1: flat,
          lng1: flng,
          nopal: countpandal,
          fid: id,
          pcheck: checked,
          type: labelcheck,
        },
      ];

      try {
        dispatch(incrementByAmount(cordiarray || null));
        setGeoClickCount(false);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }
  function shareNow() {}
  //ends
  return (
    <>
      <div className="form-container">
        <form onSubmit={getlatlng}>
          <div
            className={`expandIcon ${scrollcheck > 70 ? "expandIconRot" : ""}`}
            // className="expandIcon"
          >
            {<ExpandLessIcon />}
          </div>
          <div className="form-layout-1">
            <Autocomplete>
              <input
                ref={address}
                type="text"
                className="ipStartLoc"
                placeholder="Type your starting location"
                onChange={() => {
                  setGeoClickCount(false);
                }}
                required
              />
            </Autocomplete>
            <span
              className="btnStartLoc"
              color="primary"
              onClick={() => {
                GetLocation();
                setGeoClickCount(true);
              }}
            >
              {<MyLocationIcon />}
            </span>
          </div>

          <div className="form-layout-2">
            <label className="labelPandal">
              <span
                className={labelcheck === "range" ? "topactive" : ""}
                onClick={() => setLabelcheck("pandal")}
              >
                Number of Pandals
              </span>
              <span className="topactive">or</span>
              <span
                className={labelcheck === "pandal" ? "topactive" : ""}
                onClick={() => setLabelcheck("range")}
              >
                Range
              </span>
              <div
                className={
                  labelcheck === "pandal" ? "pandal-active" : "range-active"
                }
              ></div>
            </label>
            <span>
              <div
                id="minus"
                onClick={() =>
                  countpandal > 1 && setCountPandal(countpandal - 1)
                }
              >
                -
              </div>
              <div className="divPandal">
                {labelcheck === "pandal" ? (
                  countpandal
                ) : (
                  <>
                    {countpandal}
                    <p>km</p>
                  </>
                )}
              </div>
              <div
                id="plus"
                onClick={() =>
                  countpandal < 10 && setCountPandal(countpandal + 1)
                }
              >
                +
              </div>
            </span>
          </div>

          {/* <div className="form-layout-3">
            <label
              className="labelCheck"
              htmlFor="ipCheck"
              style={
                labelcheck === "range"
                  ? {
                      color: "rgb(255 255 255 / 0.5)",
                      textDecoration: "line-through",
                    }
                  : {}
              }
            >
              Is your starting point the end point?
            </label>
            <input
              id="ipCheck"
              type="checkbox"
              onChange={() => setChecked(!checked)}
              defaultChecked={checked}
              disabled={labelcheck === "range" ? true : false}
            />
          </div> */}
          <div className="form-layout-4">
            <button
              className="sbm-btn"
              aria-label="submit"
              type="submit"
              disabled={stateCheck}
              // onClick={() => {
              //   setStateCheck(true);
              //   console.log("scheck from pds " + stateCheck);
              // }}
            >
              {stateCheck ? (
                <RotatingLines
                  strokeColor="rgb(31 41 55)"
                  strokeWidth="4"
                  animationDuration="1"
                  width="27"
                  visible={true}
                />
              ) : (
                <div>
                  {labelcheck === "pandal" ? (
                    <>
                      <span>Route</span>
                      <RouteIcon />
                    </>
                  ) : (
                    <>
                      <span>Search</span>
                      <SearchIcon />
                    </>
                  )}
                </div>
              )}
            </button>

            <RWebShare
              data={{
                text: "One-stop app for pandal-hopping in Kolkata",
                url: "https://durgapedia.online/",
                title: "Durga Pedia",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <button type="button" aria-label="share" className="shareIco">
                <span>Share</span>
                <IosShareIcon />
              </button>
            </RWebShare>
          </div>
        </form>
      </div>
    </>
  );
}
