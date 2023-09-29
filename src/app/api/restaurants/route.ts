import { NextResponse } from "next/server";
const googleMapsApiKey = "Api key"

export async function POST(request: any) {
  try {
    const { lat, lng } = await request.json();
    // console.log("Request Payload:", { lat, lng });

    
    const types = ["restaurant"];
    const opennow = true;

    const apiCalls = types.map((type) => {
      const apiurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&location=${lat},${lng}&keyword=${type}&opennow&radius=1000&key=${googleMapsApiKey}`;
     // console.log(apiurl);
      return fetch(apiurl).then((response) => response.json());
    });

    const results = await Promise.all(apiCalls);
    const fjson = results.flat();
    var cnt=0;
    // console.log(fjson[0].next_page_token);

    

    for (const property in fjson[0]['results']) {
 
  
      try{
          if(cnt>5)
          {
              delete fjson[0]['results'][property];
          }
          else{
         delete fjson[0]['results'][property].types;
         delete fjson[0]['results'][property].photos;
        delete fjson[0]['results'][property].plus_code;
        delete fjson[0]['results'][property].scope;
        delete fjson[0]['results'][property].reference;        
        delete fjson[0]['results'][property].icon;
        delete fjson[0]['results'][property].icon_background_color;
        delete fjson[0]['results'][property].icon_mask_base_uri;
        delete fjson[0]['results'][property].price_level;
        delete fjson[0]['results'][property].geometry.viewport;
        delete fjson[0]['results'][property].user_ratings_total;
        delete fjson[0]['results'][property].business_status;
      }
  }
      catch(e )
        {
          
        }
      
      //console.log(property + ": " + fjson[0]['results'][property].types);
    
    }


    delete fjson[0].html_attributions;
    delete fjson[0].next_page_token;

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