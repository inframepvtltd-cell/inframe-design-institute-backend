import mongoose from "mongoose";

const StateSchema = mongoose.Schema({
  stateName: String,
});

const stateModel = mongoose.model("state", StateSchema);

export { stateModel };
