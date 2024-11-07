import { City } from "../model/city.model.js";
import mongoose from "mongoose";


export const addCity = (request, response, next) => {
  City.create({ stateId: request.body.id, name: request.body.name }).then(result => {
   return response.status(200).json({ msg: "City Added SuccesFully", status: true });
  }).catch(err => {
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  })
}


export const cityList = (request, response, next) => {
  City.find().then(result => {
    return response.status(200).json({ state: result, msg: "State List", status: true });
  }).catch(err => {
    return response.status(500).json({ err: "Internal Server Error", status: false })
  })
}


// export const findCityByState = async (request, response, next) => {
//   try {
//     const cities = await City.find({ stateId: request.body.stateId });
//     return response.status(200).json({ city: cities, status: true });
//   } catch (err) {
//     console.error(err);
//     return response.status(500).json({ Message: 'Server error', status: false });
//   }
// };


export const findCityByState = async (request, response, next) => {
  try {
    const { stateId } = request.body;
    console.log("Received request body:", request.body);
    console.log("Received stateId from request:", stateId);
    if (!stateId) {
      console.log("Error: stateId is missing from the request body.");
      return response.status(400).json({ Message: 'stateId is required', status: false });
    }
    // Validate if stateId is a valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(stateId)) {
      console.log("Error: Invalid stateId format.");
      return response.status(400).json({ message: 'Invalid stateId format', status: false });
    }
    const objectId = new mongoose.Types.ObjectId(stateId);
    console.log("Querying cities with state_id:", objectId);
    
    const cities = await City.find({ state_id: objectId });
    console.log("Fetched cities:", cities);

    if (cities.length === 0) {
      console.log("No cities found for the provided stateId.");
      return response.status(404).json({ message: 'No cities found for this stateId', status: false });
    }
    return response.status(200).json({ city: cities, status: true });
  } catch (err) {
    console.error("Error fetching cities:", err);
    return response.status(500).json({ Message: 'Server error', status: false });
  }
};


export const addSingleCity = async (request, response, next) => {
  const name = request.body;
  try {
    const city = await City.findOne(name);
    if (city) {
      return response.status(400).json({ message: 'City already exists', status: false });
    }
    const newCity = new City(name);
    await newCity.save();
    return response.status(200).json({ Message: "City Saved success...", status: true });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server Error', status: false });
  }
}


export const deleteCity = async (request, response) => {
  const id = req.params.id;
  try {
    const result = await City.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      response.status(204).json({ Message: "State Deleted Seccessfully...", status: true });
    } else {
      response.status(404).send({ message: 'State not found', status: false });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
};


export  const cityData = (request,response,next)=>{
  City.findOne({_id:request.body.cityId})
  .then(result=>{
        response.status(200).json({state : result.stateId,status:true});
  }).catch(err=>{
    response.status(500).json({Message : "Internal Server error....",status :true})
});
}


export const addCitys = async (request, response, next) => {
   try {
    for (let cities of request.body.cities) {
     await City.create({name : cities.name , stateId : cities.stateId});
    }
    return response.status(200).json({ msg: "Add city Succesfully", status: true });

  } catch (err) {
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  }
}