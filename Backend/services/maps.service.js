const axios = require("axios");
const captainModel=require("../models/captain.model")


module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng
      };
    } else {
      console.error('Error from API:', data.status, data.error_message);
      throw new Error("Unable to fetch Coordinates");
    }
  } catch (error) {
   console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};


module.exports.getDistanceTime=async(origin,destination)=>
{
  if(!origin || !destination)
  {
    throw new Error("Origin and destination are required")
  }
  const apiKey=process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response= await axios.get(url);
    if (response.data.rows[0].elements[0].status==='ZERO_RESULTS')
    {
      throw new Error("No routes found")
    }
    return response.data.rows[0].elements[0];
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}


module.exports.getAutoCompleteSuggestions= async(input)=>
{
  if(!input)
    throw new Error("Query is Required");

  const apiKey = process.env.GOOGLE_MAPS_API; 
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response=await axios.get(url);
    if(response.data.status==="OK")
    {
      return response.data.predictions;
    }
    else
    {
      throw new Error('Unable to Fetch Suggestions')
    }
    
  } catch (error) {
     
    console.log(error);
    throw error;
    
  }
}


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {



    // {
    //     location: {
    //         $geoWithin: {
    //             $centerSphere: [ [ ltd, lng ], radius / 6371 ]
    //         }
    //     }
    // }
    const captains = await captainModel.find();

    return captains;

}

