const express = require('express');
const bodyParser = require('body-parser');

const connectDB  = require("./config/database.config")
const app = express();
require('dotenv').config();
const cors = require('cors');
const allRoutes = require("./routes/index")



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
connectDB();
app.use('/api', allRoutes);


const PORT = process.env.PORT || 3000; 


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});