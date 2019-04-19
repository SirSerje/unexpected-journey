const mongoose = require('mongoose');
const { Schema } = mongoose;

const journeySchema = new Schema({
  userId: String,
  journey: String,
  character: String
});

const Journey = mongoose.model('journey', journeySchema);

export default Journey;



