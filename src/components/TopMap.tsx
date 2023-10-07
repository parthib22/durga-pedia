"use client";
import { GoogleMap } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import "../app/map.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { LoaderCheck, setLoaderCheck } from "../../slices/LoaderCheck";
import { RotatingLines } from "react-loader-spinner";

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
  const kCheck = useSelector(
    (state: RootState) => state.loadercheck.loaderCheck
  );
  interface MyData {
    kar?: string | null;
  }

  // Use the useState hook to manage sCheck
  const [sCheck, setsCheck] = useState<MyData[]>([]);
  //const[sCheck,setsCheck]=useState<MyData[]>([]);
  const [stch, Ststch] = useState(1);

  const bCheck = useSelector(
    (state: RootState) => state.statecheck.someProperty
  );
  console.log("value of bcheck recieved");
  console.log(bCheck);

  // },[])

  // console.log("value from top map")
  //     console.log(sCheck);
  useEffect(() => {
    console.log("entered in ueffect bcheck value");
    console.log(bCheck);
    if (
      bCheck != null &&
      bCheck.length > 0 &&
      typeof bCheck[0].kar !== "undefined" &&
      bCheck[0].kar != null
    ) {
      console.log("entered in ueffect 1st if");
      console.log(bCheck);

      setsCheck(bCheck);
    }

    if (
      sCheck != null &&
      sCheck.length > 0 &&
      typeof sCheck[0].kar !== "undefined" &&
      sCheck[0].kar != null
    ) {
      console.log("rendered if");
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          keyboardShortcuts: false,
          gestureHandling: "cooperative",
          center: { lat: 22.5726, lng: 88.3639 },
          zoom: 13,
          styles: [],
        }
      );
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
      });

      Ststch(0);
      const coordinatePairs = sCheck[0].kar
        .substring(0, sCheck[0].kar.length - 1)
        .split("|");
      console.log(coordinatePairs);
      var resultMapArray: {
        location: google.maps.LatLng;
        stopover: boolean;
      }[] = [];
      if (coordinatePairs.length > 2) {
        for (let i = 1; i < coordinatePairs.length - 1; i++) {
          const pair = coordinatePairs[i];

          const [latitude, longitude] = pair.split(",");
          resultMapArray.push({
            location: new google.maps.LatLng(
              parseFloat(latitude),
              parseFloat(longitude)
            ),
            stopover: true,
          });
        }
      }
      console.log(resultMapArray);
      directionsService.route(
        {
          origin: coordinatePairs[0],
          destination: coordinatePairs[coordinatePairs.length - 1],
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: resultMapArray,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK && response) {
            directionsRenderer.setDirections(response);
            console.log(response);
            const waypoints = response.routes[0].legs[0].via_waypoints; // Extract waypoints from the response

            console.log("in line 122");
            console.log(resultMapArray);
            // for (let i = 1; i < coordinatePairs.length; i++) {
            //   //console.log(waypoint);
            //   const pair = coordinatePairs[i];
            //   const [latitude, longitude] = pair.split(",");
            //   const marker = new google.maps.Marker({
            //     position: new google.maps.LatLng(
            //       parseFloat(latitude),
            //       parseFloat(longitude)
            //     ),
            //     map: map,
            //     icon: "/images/durga.png",
            //     title: "Waypoint",
            //   });
            //   // markers.push(marker);
            // }

            // const arrowSymbol = {
            //   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            //   scale: 4, // Adjust the size of the arrowhead
            //   fillColor: "blue", // Arrowhead color
            //   fillOpacity: 1, // Opacity of the arrowhead
            //   strokeWeight: 0, // No border
            // };
            const lineSymbol = {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 3,
              fillColor: "blue",
              strokeColor: "black",
              strokeOpacity: 1,
              fillOpacity: 1,
            };
            const polyline = new google.maps.Polyline({
              path: google.maps.geometry.encoding.decodePath(
                response.routes[0].overview_polyline
              ),
              icons: [
                {
                  icon: lineSymbol,
                  offset: "100%",
                },
              ],
              strokeColor: "blue", // Polyline color
              strokeOpacity: 0.5, // Opacity of the polyline
              strokeWeight: 2, // Width of the polyline
              map: map,
            });
            animateCircle(polyline);
            const markers = [];

            //markers for each waypoint
          }
        }
      );
      let infoWindow: google.maps.InfoWindow;
      infoWindow = new google.maps.InfoWindow();
      const locationButton = document.createElement("button");
      locationButton.innerHTML = `<svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MyLocationIcon"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>`;

      // locationButton.textContent = "📍";
      locationButton.classList.add("urlocbtn");

      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        locationButton
      );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            new google.maps.Marker({
              position: pos,
              map,
              title: "Your starting location",
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent("<div id='urloc'>Your Location</div>");
            locationButton.addEventListener("click", () => {
              infoWindow.open(map);
              map.setCenter(pos);
            });
          },
          () => {
            console.log("Browser doesn't support Geolocation");
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.log("Browser doesn't support Geolocation");
      }

      console.log("rendered if");
    } else {
      let infoWindow: google.maps.InfoWindow;
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          keyboardShortcuts: false,
          gestureHandling: "cooperative",
          center: { lat: 22.5726, lng: 88.3639 },
          zoom: 13,
          styles: [],
        }
      );
      // const locationButton = document.createElement("button");

      // locationButton.textContent = "Pan to Current Location";
      // locationButton.classList.add("custom-map-control-button");

      // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
      //   locationButton
      // );
      infoWindow = new google.maps.InfoWindow();
      // setTimeout(function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("<div id='urloc'>Your Location</div>");
            infoWindow.open(map);
            map.setCenter(pos);
            console.log("triggered");
          },
          () => {
            console.log("Browser doesn't support Geolocation");
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.log("Browser doesn't support Geolocation");
      }
      //}, 2000);

      console.log("rendered else" + stch);
      console.log(sCheck);
    }
  }, [bCheck]);

  function animateCircle(line: google.maps.Polyline) {
    let count = 0;

    window.setInterval(() => {
      count = (count + 1) % 200;

      const icons = line.get("icons");

      icons[0].offset = count / 2 + "%";
      line.set("icons", icons);
    }, 20);
  }
  console.log(name);
  return (
    <>
      {kCheck[0].status && (
        <>
          <div className="mapLoader">
            <RotatingLines
              strokeColor="rgb(31 41 55)"
              strokeWidth="3"
              animationDuration="1"
              width="50"
              visible={true}
            />
          </div>
        </>
      )}
      <div id="map" />
    </>
  );
};

export default TopMap;
