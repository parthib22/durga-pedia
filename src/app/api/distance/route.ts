import { NextResponse } from "next/server";
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export async function POST(request: any) {
  try {
    const { origins, destinations} = await request.json();
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${googleMapsApiKey}`
      );
      if (!response.ok) {
        throw new Error('Google Maps API request failed');
      }
      const data = await response.json();

   // const fjson = data.flat();

    const mergedResults = {
      status: 'success',
      results: data,
    };
    return NextResponse.json(mergedResults);
  } catch (error) {
    //console.error("Error:", error);
    return NextResponse.json({
      status: 'error',
      message: 'Request payload error',
      errors:error,
    });
  }
}