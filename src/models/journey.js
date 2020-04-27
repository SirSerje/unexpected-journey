import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const JourneySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Journey = mongoose.model('Journey', JourneySchema);
export default Journey;
