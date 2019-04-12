const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
})

const User = mongoose.model('user', userSchema)

export default User;