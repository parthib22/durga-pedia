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

export default function Home() {
  const [passCords, setCords] = useState(""); //changes by sam
  const getData = (data: string) => {
    //changes by sam
    console.log("i am in page.tsx my data" + data);
    setCords(data);
  };
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
