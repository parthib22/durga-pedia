"use client";
import { GoogleMap } from "@react-google-maps/api";
import React, { useEffect } from "react";
import "../app/map.css";

declare global {
  interface Window {
    google: {
      maps: {
        Map: typeof google.maps.Map;
      };
    };
  }
}
interface TopMapProps {
  name: string; //changes by sam
}
const TopMap: React.FC<TopMapProps> = ({ name }) => {
  //changes by sam
  useEffect(() => {
    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        gestureHandling: "cooperative",
        center: { lat: 22.5726, lng: 88.3639 },
        zoom: 13,
        styles: [],
      }
    );
  }, []);
  console.log(name);
  return (
    <>
      <div
        id="map"
        // style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
};

export default TopMap;
