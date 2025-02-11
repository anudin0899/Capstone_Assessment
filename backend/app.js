const express = require('express');
const env = require('dotenv');
const BodyParser = require('body-parser');
const cors = require('cors');


const app = express();

env.config();

app.use(express.json());


//Enable middleware
app.use(BodyParser.urlencoded({
    extended: true
}));


const authRoutes = require('./Controller/auth');


app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
}))


app.use('/api',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})