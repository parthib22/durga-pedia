import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MyProvider } from "../components/MyContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Durga Pedia",
  description: "Durga Puja Maps Pandals Bengali Pujo Bangali Kolkata",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Durga Pedia" />
        <meta
          property="og:description"
          content="One-stop app for pandal-hopping in Kolkata"
          // content="This website helps to travel during the Durga Puja days in Kolkata. It helps everyone to search and locate nearby durga pandals and visit them accordingly. Our app also gives detailed information about most of the pandals in west bengal as well as the weather, transit, food places, etc."
        />
        <meta property="og:image" content="/icon-192x192.png" />
        <meta property="og:url" content="https://durgapedia.online/" />
        <meta
          property="og:site_name"
          content="Durga Pedia: Travel during the Durga Puja days in Kolkata"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Durga Pedia: Travel during the Durga Puja days in Kolkata"
        />
        <meta
          name="twitter:description"
          content="This website helps to travel during the Durga Puja days in Kolkata. It helps everyone to search and locate nearby durga pandals and visit them accordingly. Our app also gives detailed information about most of the pandals in west bengal as well as the weather, transit, food places, etc."
        />
        <meta name="twitter:image" content="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <MyProvider>{children}</MyProvider>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDj2cR40F6xZo8mTepkyEpJl8BGVNDZ2qk&callback=initMap&libraries=places"
          defer
        ></script>
      </body>
    </html>
  );
}
