const inmuebleRoute = require("./routes/inmuebles")
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBconnnection succesfull!"))
    .catch((err)=>{
        console.log(err);
    });

app.use(express.json());
app.use("/api/inmuebles", inmuebleRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server is running! ${PORT}`);
});