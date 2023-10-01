"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { LoaderCheck, setLoaderCheck } from "../../slices/LoaderCheck";
import { RootState } from "@/app/store";

const Footer = () => {
  //   const [kCheck, setKCheck] = useState(true);
  //   const sCheck = useSelector(
  //     (state: RootState) => state.loadercheck.loaderCheck
  //   );
  //   if (sCheck[0].staus) setKCheck(false);
  //   console.log("scheck from footer: " + sCheck[0].status);
  return (
    <>
      <div className={`footer ${""}`}>
        {/* <p>Thank you for using our app</p> */}
        <p>Made with 💟 by</p>
        <p style={{ flexDirection: "row", gap: "5px", marginBottom: "7px" }}>
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/parthibds/`}
            target="_blank"
          >
            Parthib DS
          </Link>
          |
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/samadrit-das/`}
            target="_blank"
          >
            Samadrit Das
          </Link>
          |
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/biswaraj-bhattacharyya-77601023a/`}
            target="_blank"
          >
            Biswaraj Bhatt
          </Link>
        </p>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <a className="contactD" href={`mailto:team.durgapedia@gmail.com`}>
            Contact Us
          </a>
          <p>© 2023 DurgaPedia</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
