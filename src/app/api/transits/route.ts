import { NextResponse } from "next/server";
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export async function POST(request: any) {
  try {
      const { lat, lng } = await request.json();
      console.log("Request Payload:", { lat, lng });
      const types = ["train_station","taxi_stand","subway_station","light_rail_station","bus_station"]; 
      const opennow = true;

      const apiCalls = types.map((type) => {
        const apiurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&location=${lat},${lng}&type=${type}&opennow&radius=1000
        &key=${googleMapsApiKey}`; 
     console.log(apiurl);

          return fetch(apiurl).then((response) => response.json());
      });

      const results = await Promise.all(apiCalls);
       const fjson=results.flat();
    //    delete fjson.city;
      const mergedResults = {
          status: 'success',
          results: fjson, 
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