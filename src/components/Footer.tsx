"use client";
import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <p>Made with 💟 by</p>
        <p style={{ flexDirection: "row", gap: "5px", marginBottom: "7px" }}>
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/parthibds/`}
            target="_blank"
          >
            Parthib
          </Link>
          |
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/samadrit-das/`}
            target="_blank"
          >
            Samadrit
          </Link>
          |
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/biswaraj-bhattacharyya-77601023a/`}
            target="_blank"
          >
            Biswaraj
          </Link>
          |
          <Link
            className="nameD"
            href={`https://www.linkedin.com/in/sudip-biswas-2b1377216/`}
            target="_blank"
          >
            Sudip
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
