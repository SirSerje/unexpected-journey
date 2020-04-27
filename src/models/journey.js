import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Character = mongoose.model('Character', CharacterSchema);
export default Character;
