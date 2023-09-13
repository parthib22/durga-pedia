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
<<<<<<< HEAD
            khanki kom lekh
=======
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            doloribus explicabo similique blanditiis quibusdam magni ipsam.
            Esse, blanditiis minus voluptate aspernatur voluptas earum
            voluptatum porro voluptatem. Reprehenderit molestiae iusto adipisci?
            Id magni, ad repellendus recusandae officiis atque incidunt
            distinctio. Autem debitis tenetur vel maxime nisi atque, assumenda
            unde tempore laboriosam accusamus, quod itaque temporibus quisquam
            necessitatibus veniam beatae nihil nam! Culpa, pariatur corporis
            tempore debitis nihil ullam, harum rem aperiam tenetur voluptatem
            expedita quos ab nostrum maxime perspiciatis modi cumque fuga quae
            id similique! Quam placeat sit deleniti natus ex. Odit quos
            voluptates, libero assumenda voluptatum quisquam enim id repellendus
            et provident perspiciatis voluptatem ea facere natus eius dolores
            earum est, cumque autem. Ea debitis, reprehenderit doloribus fuga
            quibusdam facere. Id omnis assumenda sapiente ratione error, nisi ab
            quaerat quod odio quibusdam voluptas quisquam voluptatum natus,
            autem voluptate praesentium. Rem in maiores sed accusantium voluptas
            ipsum accusamus placeat nisi facilis? Ullam unde atque porro dolorem
            harum. Impedit consectetur suscipit necessitatibus. Dolorum aperiam,
            necessitatibus fugiat sint, assumenda ut eaque explicabo soluta
            maxime ex eos, sapiente ad sit obcaecati perferendis! Ratione,
            delectus! Fugiat sit et voluptatem tenetur veniam quibusdam. Illo
            sunt commodi in officia molestias incidunt dignissimos architecto.
            Exercitationem nostrum deleniti error, assumenda laudantium cum
            asperiores qui doloribus delectus, aspernatur rerum aliquam. Dolorem
            consequatur accusantium adipisci dolorum eligendi expedita
            exercitationem amet sequi quidem! Recusandae odit iure omnis at
            maiores a eligendi velit quae voluptates nostrum magni, modi soluta
            dolorum delectus iste sunt? Odit ratione dolore nesciunt blanditiis,
            minus amet veritatis nulla vel optio. In, velit voluptas suscipit
            saepe officiis deserunt quod aut incidunt rerum. Repudiandae
            temporibus ratione similique sint, deleniti totam eveniet?
            Aspernatur quo consequuntur odio, ducimus aliquid pariatur! Rerum ad
            impedit numquam, repellat veritatis quam minus adipisci voluptas
            reiciendis fuga laudantium saepe inventore optio iure deleniti
            commodi praesentium ipsum voluptatem exercitationem! Molestias
            aperiam deleniti eveniet doloribus minus quidem velit nulla
            laboriosam, quas ratione harum ducimus pariatur provident quos
            veniam consequuntur nemo voluptates! Beatae, aspernatur provident.
            Veritatis excepturi incidunt inventore veniam vitae! Rerum hic
            asperiores eum, aliquam quod optio officia nam impedit magni dolor
            expedita sequi officiis quas, similique obcaecati consectetur nemo
            voluptatem praesentium. Fuga beatae nesciunt nobis recusandae,
            doloribus molestias voluptatibus? Porro consequuntur praesentium
            similique voluptas iure error, minima officia architecto repudiandae
            enim et nemo quas fugiat necessitatibus rem odit neque soluta earum
            placeat voluptate. Aliquam itaque ut id corrupti et! Libero
            obcaecati sequi maxime quisquam dolores tempore neque suscipit,
            aliquam quidem? Dolorem, quaerat laboriosam pariatur fugiat dolores
            ipsa iure minus totam enim in aut quam eligendi, numquam nihil illo
            temporibus. Maiores molestias modi a distinctio sapiente quo in
            laboriosam nesciunt magni praesentium facilis vel autem minus iusto
            nemo, quaerat excepturi. Officia voluptatem repudiandae aliquid
            consequatur hic id incidunt nesciunt expedita! Cum accusamus
            accusantium harum mollitia doloremque aliquid sapiente a, quaerat
            autem nihil! Accusantium facilis nulla voluptatum perspiciatis vitae
            provident saepe, inventore praesentium doloribus consequatur,
            excepturi, laudantium omnis quibusdam voluptatibus adipisci. Rerum,
            commodi nobis repellat nisi cupiditate voluptatum at culpa
            consequatur recusandae mollitia ipsam dolorum quos assumenda,
            maiores alias optio non? Laudantium, quasi pariatur quos sint
            sapiente vel voluptate repudiandae rerum. Repudiandae minus delectus
            laudantium corrupti id vitae optio beatae, facere itaque, quis
            exercitationem commodi ipsum accusantium sapiente necessitatibus
            impedit officiis excepturi suscipit voluptatum tempora quibusdam
            natus. Incidunt facere molestiae officia! Adipisci quidem doloremque
            repudiandae, veritatis perspiciatis, id aut assumenda ipsum tenetur
            porro distinctio ab? Possimus assumenda officiis repellat tempora
            veritatis dolorem sunt maxime voluptatem autem ipsam error dicta, in
            at. Voluptas, sunt pariatur? Mollitia, voluptatibus aliquam
            molestiae recusandae id ad? Sapiente accusamus adipisci possimus!
            Quaerat dolor ab dicta unde, libero dolore optio possimus, labore
            ipsa quos voluptate qui tenetur obcaecati? Atque ut quod nisi ea
            quas repellendus, quae illo eum nam incidunt ipsum quasi vitae
            voluptates, officiis est? Sequi atque quasi tempore tenetur nisi at
            rem eligendi sit necessitatibus eum. Nisi iste soluta cupiditate
            optio facere! Soluta incidunt rerum odio natus facere sint tempora
            exercitationem, nostrum, in perspiciatis aperiam dolorum! Laudantium
            temporibus magnam rem totam tempore hic quae fugiat veritatis! Alias
            minus ex suscipit quam animi dolorum autem sint illum quaerat
            quibusdam, dolor ea enim, quo pariatur praesentium nihil ipsam harum
            ullam, quis libero voluptas officiis explicabo nulla incidunt.
            Porro? Eveniet repellat doloribus dolore labore cumque repellendus!
            Quasi explicabo, veritatis aspernatur, quae dolor, ratione labore
            provident natus rerum adipisci dicta at ipsum ipsam illo minima
            delectus assumenda esse alias qui! Beatae ab, itaque cumque culpa
            reiciendis dolorem saepe dolorum provident incidunt nam sequi
            consequuntur consectetur praesentium ducimus fuga, inventore porro
            nemo eaque mollitia voluptatum non aliquid neque quo. Eligendi,
            ipsum. Ad expedita, praesentium veniam labore recusandae est? Illo
            quasi doloribus, voluptas accusantium consequuntur maiores vitae
            cupiditate incidunt, eum laudantium tempora, neque voluptatibus
            commodi eaque. Voluptatum minus officia at et eveniet. Cumque id
            unde dolorum vero possimus eaque odit dicta non ex ad laboriosam
            explicabo officia nobis ipsa voluptatem fugit asperiores culpa
            repellendus sapiente repudiandae, corporis, consequuntur sit.
            Officiis, sapiente quidem. Laboriosam ea unde, consequuntur officia
            iusto voluptatem eligendi enim facere molestiae distinctio at quod,
            delectus ullam dicta aspernatur excepturi saepe fugiat tenetur
            voluptate consectetur omnis nobis. Quo nostrum culpa adipisci.
            Libero voluptate exercitationem tenetur, laudantium labore
            cupiditate sint dolorem dicta eum. Temporibus illo iusto doloribus
            magni tenetur sit neque explicabo impedit vel esse, eaque eos sequi
            facilis, similique dicta praesentium! Eius voluptatem quas aperiam
            beatae nulla modi totam dolorum architecto sunt a adipisci facere,
            sit molestias asperiores quam harum, temporibus suscipit odit
            exercitationem qui quod impedit quos optio deserunt. Minima?
            Deleniti sequi ea, repudiandae laudantium ducimus consequatur?
            Nostrum facere excepturi earum ratione labore possimus nihil magnam
            voluptatem, laboriosam architecto mollitia fugit assumenda
            reprehenderit vero culpa provident, tempore ea eum natus. Sequi
            accusamus temporibus qui alias quibusdam ad eos pariatur modi
            corrupti maxime, esse, minus itaque debitis. Quidem vitae aliquid
            harum autem excepturi corrupti doloremque, maxime repellendus
            deserunt, et odit dicta. Voluptatem fugiat, nesciunt sint deleniti
            minus dignissimos eaque dolorum totam placeat fuga aliquam inventore
            eius ut laboriosam. Eveniet exercitationem labore excepturi
            pariatur? Repellat vel provident cumque eligendi ex! Cumque, amet.
            Unde, distinctio. Sed beatae quia velit totam, dignissimos quis quas
            ducimus adipisci. Repellat, laudantium expedita! Aut debitis ex
            repudiandae omnis laboriosam dolor unde molestiae officia excepturi
            nobis. Natus, illum at. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Error doloribus explicabo similique blanditiis
            quibusdam magni ipsam. Esse, blanditiis minus voluptate aspernatur
            voluptas earum voluptatum porro voluptatem. Reprehenderit molestiae
            iusto adipisci? Id magni, ad repellendus recusandae officiis atque
            incidunt distinctio. Autem debitis tenetur vel maxime nisi atque,
            assumenda unde tempore laboriosam accusamus, quod itaque temporibus
            quisquam necessitatibus veniam beatae nihil nam! Culpa, pariatur
            corporis tempore debitis nihil ullam, harum rem aperiam tenetur
            voluptatem expedita quos ab nostrum maxime perspiciatis modi cumque
            fuga quae id similique! Quam placeat sit deleniti natus ex. Odit
            quos voluptates, libero assumenda voluptatum quisquam enim id
            repellendus et provident perspiciatis voluptatem ea facere natus
            eius dolores earum est, cumque autem. Ea debitis, reprehenderit
            doloribus fuga quibusdam facere. Id omnis assumenda sapiente ratione
            error, nisi ab quaerat quod odio quibusdam voluptas quisquam
            voluptatum natus, autem voluptate praesentium. Rem in maiores sed
            accusantium voluptas ipsum accusamus placeat nisi facilis? Ullam
            unde atque porro dolorem harum. Impedit consectetur suscipit
            necessitatibus. Dolorum aperiam, necessitatibus fugiat sint,
            assumenda ut eaque explicabo soluta maxime ex eos, sapiente ad sit
            obcaecati perferendis! Ratione, delectus! Fugiat sit et voluptatem
            tenetur veniam quibusdam. Illo sunt commodi in officia molestias
            incidunt dignissimos architecto. Exercitationem nostrum deleniti
            error, assumenda laudantium cum asperiores qui doloribus delectus,
            aspernatur rerum aliquam. Dolorem consequatur accusantium adipisci
            dolorum eligendi expedita exercitationem amet sequi quidem!
            Recusandae odit iure omnis at maiores a eligendi velit quae
            voluptates nostrum magni, modi soluta dolorum delectus iste sunt?
            Odit ratione dolore nesciunt blanditiis, minus amet veritatis nulla
            vel optio. In, velit voluptas suscipit saepe officiis deserunt quod
            aut incidunt rerum. Repudiandae temporibus ratione similique sint,
            deleniti totam eveniet? Aspernatur quo consequuntur odio, ducimus
            aliquid pariatur! Rerum ad impedit numquam, repellat veritatis quam
            minus adipisci voluptas reiciendis fuga laudantium saepe inventore
            optio iure deleniti commodi praesentium ipsum voluptatem
            exercitationem! Molestias aperiam deleniti eveniet doloribus minus
            quidem velit nulla laboriosam, quas ratione harum ducimus pariatur
            provident quos veniam consequuntur nemo voluptates! Beatae,
            aspernatur provident. Veritatis excepturi incidunt inventore veniam
            vitae! Rerum hic asperiores eum, aliquam quod optio officia nam
            impedit magni dolor expedita sequi officiis quas, similique
            obcaecati consectetur nemo voluptatem praesentium. Fuga beatae
            nesciunt nobis recusandae, doloribus molestias voluptatibus? Porro
            consequuntur praesentium similique voluptas iure error, minima
            officia architecto repudiandae enim et nemo quas fugiat
            necessitatibus rem odit neque soluta earum placeat voluptate.
            Aliquam itaque ut id corrupti et! Libero obcaecati sequi maxime
            quisquam dolores tempore neque suscipit, aliquam quidem? Dolorem,
            quaerat laboriosam pariatur fugiat dolores ipsa iure minus totam
            enim in aut quam eligendi, numquam nihil illo temporibus. Maiores
            molestias modi a distinctio sapiente quo in laboriosam nesciunt
            magni praesentium facilis vel autem minus iusto nemo, quaerat
            excepturi. Officia voluptatem repudiandae aliquid consequatur hic id
            incidunt nesciunt expedita! Cum accusamus accusantium harum mollitia
            doloremque aliquid sapiente a, quaerat autem nihil! Accusantium
            facilis nulla voluptatum perspiciatis vitae provident saepe,
            inventore praesentium doloribus consequatur, excepturi, laudantium
            omnis quibusdam voluptatibus adipisci. Rerum, commodi nobis repellat
            nisi cupiditate voluptatum at culpa consequatur recusandae mollitia
            ipsam dolorum quos assumenda, maiores alias optio non? Laudantium,
            quasi pariatur quos sint sapiente vel voluptate repudiandae rerum.
            Repudiandae minus delectus laudantium corrupti id vitae optio
            beatae, facere itaque, quis exercitationem commodi ipsum accusantium
            sapiente necessitatibus impedit officiis excepturi suscipit
            voluptatum tempora quibusdam natus. Incidunt facere molestiae
            officia! Adipisci quidem doloremque repudiandae, veritatis
            perspiciatis, id aut assumenda ipsum tenetur porro distinctio ab?
            Possimus assumenda officiis repellat tempora veritatis dolorem sunt
            maxime voluptatem autem ipsam error dicta, in at. Voluptas, sunt
            pariatur? Mollitia, voluptatibus aliquam molestiae recusandae id ad?
            Sapiente accusamus adipisci possimus! Quaerat dolor ab dicta unde,
            libero dolore optio possimus, labore ipsa quos voluptate qui tenetur
            obcaecati? Atque ut quod nisi ea quas repellendus, quae illo eum nam
            incidunt ipsum quasi vitae voluptates, officiis est? Sequi atque
            quasi tempore tenetur nisi at rem eligendi sit necessitatibus eum.
            Nisi iste soluta cupiditate optio facere! Soluta incidunt rerum odio
            natus facere sint tempora exercitationem, nostrum, in perspiciatis
            aperiam dolorum! Laudantium temporibus magnam rem totam tempore hic
            quae fugiat veritatis! Alias minus ex suscipit quam animi dolorum
            autem sint illum quaerat quibusdam, dolor ea enim, quo pariatur
            praesentium nihil ipsam harum ullam, quis libero voluptas officiis
            explicabo nulla incidunt. Porro? Eveniet repellat doloribus dolore
            labore cumque repellendus! Quasi explicabo, veritatis aspernatur,
            quae dolor, ratione labore provident natus rerum adipisci dicta at
            ipsum ipsam illo minima delectus assumenda esse alias qui! Beatae
            ab, itaque cumque culpa reiciendis dolorem saepe dolorum provident
            incidunt nam sequi consequuntur consectetur praesentium ducimus
            fuga, inventore porro nemo eaque mollitia voluptatum non aliquid
            neque quo. Eligendi, ipsum. Ad expedita, praesentium veniam labore
            recusandae est? Illo quasi doloribus, voluptas accusantium
            consequuntur maiores vitae cupiditate incidunt, eum laudantium
            tempora, neque voluptatibus commodi eaque. Voluptatum minus officia
            at et eveniet. Cumque id unde dolorum vero possimus eaque odit dicta
            non ex ad laboriosam explicabo officia nobis ipsa voluptatem fugit
            asperiores culpa repellendus sapiente repudiandae, corporis,
            consequuntur sit. Officiis, sapiente quidem. Laboriosam ea unde,
            consequuntur officia iusto voluptatem eligendi enim facere molestiae
            distinctio at quod, delectus ullam dicta aspernatur excepturi saepe
            fugiat tenetur voluptate consectetur omnis nobis. Quo nostrum culpa
            adipisci. Libero voluptate exercitationem tenetur, laudantium labore
            cupiditate sint dolorem dicta eum. Temporibus illo iusto doloribus
            magni tenetur sit neque explicabo impedit vel esse, eaque eos sequi
            facilis, similique dicta praesentium! Eius voluptatem quas aperiam
            beatae nulla modi totam dolorum architecto sunt a adipisci facere,
            sit molestias asperiores quam harum, temporibus suscipit odit
            exercitationem qui quod impedit quos optio deserunt. Minima?
            Deleniti sequi ea, repudiandae laudantium ducimus consequatur?
            Nostrum facere excepturi earum ratione labore possimus nihil magnam
            voluptatem, laboriosam architecto mollitia fugit assumenda
            reprehenderit vero culpa provident, tempore ea eum natus. Sequi
            accusamus temporibus qui alias quibusdam ad eos pariatur modi
            corrupti maxime, esse, minus itaque debitis. Quidem vitae aliquid
            harum autem excepturi corrupti doloremque, maxime repellendus
            deserunt, et odit dicta. Voluptatem fugiat, nesciunt sint deleniti
            minus dignissimos eaque dolorum totam placeat fuga aliquam inventore
            eius ut laboriosam. Eveniet exercitationem labore excepturi
            pariatur? Repellat vel provident cumque eligendi ex! Cumque, amet.
            Unde, distinctio. Sed beatae quia velit totam, dignissimos quis quas
            ducimus adipisci. Repellat, laudantium expedita! Aut debitis ex
            repudiandae omnis laboriosam dolor unde molestiae officia excepturi
            nobis. Natus, illum at.
            
>>>>>>> d33f2619c1966a857a44283ac5e0d158e228af00
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  Button
</button>
        </form>
      </div>
    </>
  );
}
