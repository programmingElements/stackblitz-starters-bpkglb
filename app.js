const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db");
const {employeeRouter} = require("./src/routes/employee.routes");

dotEnv.config()
const app = express();

const PORT = process.env.PORT || 6774;

app.use('/employee', employeeRouter)

connectDB()
.then(() => {
  console.log("MongoDB Connected Successfully!")
})
.catch((error) => {
  console.log("MongoDB Connection Failed ", error)
})

app.listen(PORT, () => {
  console.log(`Server Started and Running at ${PORT}`);
})