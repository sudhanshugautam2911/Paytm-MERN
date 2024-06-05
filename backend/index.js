const express = require("express");
const rootRouter = require('./routes/index');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());  // To support the JSON body in post requests



app.use('/api/v1', rootRouter);

app.use('/', (req, res)=> {
    res.send("Server is running");
})

app.listen(5000, (req, res) => {
    console.log("Server is Running at Port 5000");
})