"use client";
import FormBottom from "@/components/FormBottom";
import TopMap from "@/components/TopMap";
import SearchBox from "@/components/SearchBox";
// import Pandels from "@/app/Pandels";
import { useState } from "react";
import { RootState, AppDispatch } from "./store";
import { Providers } from "./Provider";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../../slices/GlobalStore";
import Cards from "@/components/Cards";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Typography } from "@mui/material";

export default function Home() {
  const [passCords, setCords] = useState(""); //changes by sam
  const getData = (data: string) => {
    //changes by sam
    console.log("i am in page.tsx my data" + data);
    setCords(data);
  };
  const [check, setCheck] = useState(true);
  if (check)
    return (
      <>
        <div className="tutorial">
          <div className="tPanel">
            <div className="tTop">
              <span>
                <img src="/icon-192x192.png" alt="ico" />
                {/* <ErrorOutlineIcon /> */}
                <div>
                  DURGAPEDIA <p>How to use</p>
                </div>
              </span>
              <button aria-label="close" onClick={() => setCheck(!check)}>
                <CloseIcon />
              </button>
            </div>

            <div className="tSteps">
              <span>
                <h6>1. </h6>
                <p>Type your starting location below</p>
              </span>
              <span>
                <h6>2. </h6>
                <p>{`Set the "Number of Pandals" you want to visit`}</p>
              </span>
              <span>
                <h6>3. </h6>
                <p>
                  {`Press the "Route" / "Search" button to get your perfect pandal
                  hopping plan`}
                </p>
              </span>
            </div>
            <video loop controls controlsList="nodownload" autoPlay>
              <source src="/tutorial.webm" type="video/webm" />
            </video>
            <div className="tTop">
              <span style={{ marginTop: 0 }}>
                <div>
                  <p style={{ marginLeft: 7, marginTop: -10 }}>You can also</p>
                </div>
              </span>
            </div>
            <div className="tSteps">
              <span>
                <h6>4. </h6>
                <p>Press on any information to find them on Google Maps</p>
              </span>
              <span>
                <h6>5. </h6>
                <p>Search for any pandal on the searchbar at the top</p>
              </span>
              <span>
                <h6>6. </h6>
                <p>
                  If you dont find a pandal, you can directly report or submit
                  it
                </p>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <Providers>
          <SearchBox />
          <TopMap name={passCords} />
          <FormBottom onSubmit={getData} />
          <Cards />
        </Providers>
      </>
    );
}
