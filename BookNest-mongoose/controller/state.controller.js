import { State } from "../model/state.model.js";
export const addState = async (request, response, next) => {
    try {
        for (let name of request.body) {
            await State.create({ stateName:name});
        }
        return response.status(200).json({ msg: "States has been saved", status: true });

    } catch (err) {
        return response.status(500).json({ msg: "Internal Server Error", status: false});
}
}
export const findState = (request,response,next)=>{
    State.find().then(result=>{
        return response.status(200).json({  state : result ,Message: "States has been saved...", status: true })
    }).catch(err=>{
        return response.status(500).json({ Message: "Internal Server error...", status: false })
   })
}
export const stateList = (request, response, next) => {
  State.find().then(result => {
    return response.status(200).json({ stateList: result, status: true });
  }).catch(err => {
    return response.status(500).json({ Message: "Internal server error...", status: false });
  })
}
export const addSingleState = async (request, response, next) => {
  const name = request.body;
  try {
    const state = await State.findOne(name);
    if (state) {
      return response.status(400).json({ message: 'State already exists', status: false });
    }
    const newState = new State(name);
    await newState.save();
    return response.status(200).json({ Message: "State Saved success...", status: true });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server Error', status: false });
  }
}
export const deleteState = async (request, response) => {
  const id = req.params.id;
  try {
    const result = await State.deleteOne({ _id: id });

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