"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../app/pandalinfo.css";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const PandalInfo = () => {
  const [enableCard, setEnableCard] = useState(false);
  return (
    <div className={`pandalCard ${enableCard && "cardClose"}`}>
      <div className="pandalInfo">
        <button
          className="pandalClose"
          onClick={() => setEnableCard(!enableCard)}
        >
          <ArrowBackIosNewIcon />
        </button>
        <h2 className="pandalTitle">
          t.name
          <button className="mapPinBtn">📍</button>
        </h2>
        <p>
          From above location Based on driving mode you will need /t.duration/{" "}
          to travel /t.distance/
        </p>
        <div className="pandalMapInfo">
          <div className="badge-container">
            <h4 className="mapTopic">Food</h4>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            {/* {t.rst.map((adv: any, index: any) => (
              <Link
                href={adv.map}
                target="_blank"
                className="badge"
                key={index}
              >
                {adv.rame}
              </Link>
            ))} */}
          </div>
        </div>
        <div className="pandalMapInfo">
          <div className="badge-container">
            <h4 className="mapTopic">Trains</h4>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            {/* {t.trns.length === 0 ? (
              <span className="unbadge">! no train stations nearby</span>
            ) : (
              t.trns.map(
                (
                  adv: {
                    tstame:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | React.PromiseLikeOfReactNode
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <span className="badge" key={index}>
                    {adv.tstame}
                  </span>
                )
              )
            )} */}
          </div>
          <div className="badge-container">
            <h4 className="mapTopic">Metro</h4>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            {/* {t.met.length === 0 ? (
              <span className="unbadge">! no metro stations nearby</span>
            ) : (
              t.met.map(
                (
                  adv: {
                    tstame:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | React.PromiseLikeOfReactNode
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <span className="badge" key={index}>
                    {adv.tstame}
                  </span>
                )
              )
            )} */}
          </div>
          <div className="badge-container">
            <h4 className="mapTopic">Bus Stops</h4>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            <div className="badge">food</div>
            {/* {t.met.length === 0 ? (
              <span className="unbadge">! no bus stops nearby</span>
            ) : (
              t.bst.map(
                (
                  adv: {
                    tstame:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | React.PromiseLikeOfReactNode
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <a className="badge" key={index}>
                    {adv.tstame}
                  </a>
                )
              )
            )} */}
          </div>
        </div>
        <div className="pandalMapInfo">
          <span className="mapTopic">Prices</span>
          <table className="pandalFareTable">
            <tbody>
              <tr>
                <td className="pandalTableBody">Bus</td>
                <td className="pandalTableBody">₹ 69/-</td>
              </tr>
              <tr>
                <td className="pandalTableBody">Local Taxi</td>
                <td className="pandalTableBody">₹ 69/-</td>
              </tr>
              <tr>
                <td className="pandalTableBody">Uber Go</td>
                <td className="pandalTableBody">₹ 69/-</td>
              </tr>
              <tr>
                <td className="pandalTableBody">Uber Xl</td>
                <td className="pandalTableBody">₹ 69/-</td>
              </tr>
              <tr>
                <td className="pandalTableBody">Uber Premier</td>
                <td className="pandalTableBody">₹ 69/-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pandalMapInfo">
          <h3 className="mapTopic">Weather</h3>
          <div className="pandalWeatherLg">
            <div className="pandalWeatherSm">
              <div className="pandalTempLg">t.weather.temp °C</div>
              <span className="pandalLocationSm">t.weather.name</span>
            </div>
            {/* <Image
              src={t.weather.icon}
              className="weatherImg"
              alt={"image"}
              width={50}
              height={50}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PandalInfo;
