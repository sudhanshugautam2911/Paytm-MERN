const express = require("express");
const rootRouter = require('./routes/index');
const cors = require("cors");

app.use(cors());
app.use(express.json());  // To support the JSON body in post requests

const app = express();

const PORT = process.env.PORT || "5000";

app.use('/api/v1', rootRouter);

app.listen(PORT, (req, res) => {
    console.log("Server is Running at Port: ", PORT);
})