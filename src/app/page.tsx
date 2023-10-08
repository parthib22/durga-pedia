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
            <h3>
              {/* <ErrorOutlineIcon /> */}
              How to use?
              <button onClick={() => setCheck(!check)}>
                <CloseIcon />
              </button>
            </h3>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={{ color: "#ff4500", fontWeight: "bold" }}
                  >
                    Step 1
                  </Typography>
                }
                secondary={
                  <Typography style={{ color: "black", fontWeight: "700" }}>
                    Enter your start location
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={{ color: "#ff4500", fontWeight: "bold" }}
                  >
                    Step 2
                  </Typography>
                }
                secondary={
                  <Typography style={{ color: "black", fontWeight: "700" }}>
                    Choose no of pandals/range
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={{ color: "#ff4500", fontWeight: "bold" }}
                  >
                    Step 3
                  </Typography>
                }
                secondary={
                  <Typography style={{ color: "black", fontWeight: "700" }}>
                    Press route to get your ideal pandal hopping plan
                  </Typography>
                }
              />
            </ListItem>
            <div className="tSteps">
              <img className="tutimg" src="/tutorial.gif" alt="pub" />
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
