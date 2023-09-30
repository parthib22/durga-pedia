// bus fare
import { NextResponse } from "next/server";
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
var fares = 0;
function busfare(distance: number) {
  //let time = Date.getHours();
  console.log(distance);
  if (distance <= 3) fares= 8;
  else if (distance > 3 && distance <= 7) fares= 10;
  else if (distance > 7 && distance <= 12) fares= 12;
  else if (distance > 10 && distance <= 15) fares= 15;
  else {
    if (distance > 15) {
      
      fares = fares + busfare(distance - 15);
    }
  }
  return fares;
}
// uber fare
function uberfare(distance: number, cartype: string) {
  console.log(distance);
  try {
    let fare = 0;
    if (cartype == 'pool' || cartype == 'ubergo') {
      fare = 48 + (24 * distance);
      if (fare < 63)
        fare = 63;
    }
    else if (cartype == 'uberxl') {
      fare = 69 + (22 * distance);
      if (fare < 79)
        fare = 79;
    }
    else if (cartype == 'premier') {
      fare = 53 + (37 * distance);
      if (fare < 105)
        fare = 105;
    }
    else if (cartype == 'taxi') {
      console.log("enter in else if" + distance);
      fare = 50 + (16 * distance);
      if (fare < 32)
        fare = 32;
    }
    return fare;
  }
  catch(e) {
    return e;
  }
}
export async function POST(request: any) {
  try {
    const { distance} = await request.json();
    console.log("Request Payload:", { distance });

    // fare in array format
    fares = 0;
    const allfareu = uberfare(distance, 'ubergo');
    const allfareb = busfare(distance);
    const allfare = [{ "bus": busfare(distance) }, { "uber_taxi": uberfare(distance,"taxi")}, { "uber_pool": uberfare(distance,"pool")},{ "uber_ubergo": uberfare(distance,"ubergo")} , { "uber_uberxl": uberfare(distance,"uberxl")},{ "uber_premier": uberfare(distance,"premier")}];
const mergedResults = {
  status: 'success',
  results: allfare, 
};

return NextResponse.json(mergedResults);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
        status: 'error',
        message: 'Request payload error',
    });
}
}

