const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./db");

const urlEncodedParser = bodyParser.urlencoded({extended : true});

const app = express();

app.use(express.static(path.join(__dirname,"../Frontend")));

// ------------ ROUTES --------------

const doctorRoute = require("./routes/doctor");
const patientRoute = require("./routes/patient");
const reportRoute = require("./routes/report");
const thistoryRoute = require("./routes/treatmentHistory");

app.use('/doctor', doctorRoute);
app.use('/patient', patientRoute);
app.use('/report', reportRoute);
app.use('/treatmentHistory', thistoryRoute);

// -----------------------------------

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

app.listen(5000, () => {
    console.log("Server connected at port http://localhost:5000");
})