const express = require('express');
const env = require('dotenv');
// const connectToDatabase = require('./Config/db');
const BodyParser = require('body-parser');
const cors = require('cors');
const app = express()

//configure env
env.config();

//Enable middleware
app.use(BodyParser.urlencoded({
    extended: true
}));

//routes
const userRoutes = require('./Routes/userRoutes');

//Enable middleware
app.use(express.json())

//Connect to database
// connectToDatabase();

//cors
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
}))

//User middleware routes
app.use('/api', userRoutes);

//Port
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} stage on ${PORT}`);
});