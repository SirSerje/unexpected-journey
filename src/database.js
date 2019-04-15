import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://q:q@cluster0-cpecu.gcp.mongodb.net/unexpected-journey', {useNewUrlParser: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'.red));
database.once('open', () => console.log('Successfully connected to MongoDB Atlas 🙌'.cyan));

export default database;
