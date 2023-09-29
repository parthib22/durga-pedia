import { NextResponse } from "next/server";
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export async function POST(request: any) {
  try {
      const { lat, lng } = await request.json();
    //  console.log("Request Payload:", { lat, lng });
      const types = [{type:"train_station",kword:"Train"},{type:"",kword:"Subway station"},{type:"",kword:"Bus stop"}]; 
      const opennow = true;

      const apiCalls = types.map((typeval) => {
        const apiurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&location=${lat},${lng}&keyword=${typeval.kword}&keyword=${typeval.type}&key=${googleMapsApiKey}`; 
    // console.log(apiurl);

          return fetch(apiurl).then((response) => response.json());
      });

      const results = await Promise.all(apiCalls);
       const fjson=results.flat();
    //    delete fjson.city;
    type ResultItem = {
        // Define the structure of the properties here
      };
     // console.log(fjson[0]['results'][0].types);
    var cnt=0;

    for (const property in fjson[0]['results']) {
 
  
        try{
            if(cnt>2)
            {
                delete fjson[0]['results'][property];
            }
            else{
        delete fjson[0]['results'][property].types;
        delete fjson[0]['results'][property].photos;
          delete fjson[0]['results'][property].plus_code;
        delete fjson[0]['results'][property].scope;
          delete fjson[0]['results'][property].reference;
          delete fjson[0]['results'][property].rating;
          delete fjson[0]['results'][property].icon;
          delete fjson[0]['results'][property].icon_background_color;
          delete fjson[0]['results'][property].icon_mask_base_uri;
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
  
      for (const property in fjson[1]['results']) {
      
        
        try{
            if(cnt>2)
            {
                delete fjson[1]['results'][property];
            }
            else{
          delete fjson[1]['results'][property].types;
        delete fjson[1]['results'][property].photos;
          delete fjson[1]['results'][property].plus_code;
        delete fjson[1]['results'][property].scope;
          delete fjson[1]['results'][property].reference;
          delete fjson[1]['results'][property].rating;
          delete fjson[1]['results'][property].icon;
          delete fjson[1]['results'][property].icon_background_color;
          delete fjson[1]['results'][property].icon_mask_base_uri;
          delete fjson[1]['results'][property].geometry.viewport;
          delete fjson[1]['results'][property].user_ratings_total;
              delete fjson[1]['results'][property].business_status;
      
        
                }    }
        catch(e )
          {
            
          }
        
       // console.log(property + ": " + results[0]['results'][0]['results'][property].types);
      
      }
       cnt=0;
      for (const property in fjson[2]['results']) {
        
        
        try{
            if(cnt>2)
            {
                delete fjson[2]['results'][property];
            }
            else{
        delete fjson[2]['results'][property].types;
        delete fjson[2]['results'][property].photos;
          delete fjson[2]['results'][property].plus_code;
        delete fjson[2]['results'][property].scope;
          delete fjson[2]['results'][property].reference;
          delete fjson[2]['results'][property].rating;
          delete fjson[2]['results'][property].icon;
          delete fjson[2]['results'][property].icon_background_color;
          delete fjson[2]['results'][property].icon_mask_base_uri;
          delete fjson[2]['results'][property].geometry.viewport;
          delete fjson[2]['results'][property].user_ratings_total;
              delete fjson[2]['results'][property].business_status;
              cnt++;
            }
        
        }
        catch(e )
          {
            
          }
      }
    //results[0]['results'][0].results.splice(3);
        // fjson['results'][0].results.splice(3);
        // fjson['results'][0].results.splice(3);
       // console.log(property + ": " + results[0]['results'][0]['results'][property].types);
      
      
      const mergedResults = {
          status: 'success',
          results: fjson, 
      };
    
      return NextResponse.json(mergedResults);
  } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({
          status: 'error',
          message: 'Request payload error'+error,
      });
  }
}