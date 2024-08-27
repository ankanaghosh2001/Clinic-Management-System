const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

const router =  express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended : true });

router.get('/', urlEncodedParser, (req, res) => {
    const lDate = req.query.date1;
    const uDate = req.query.date2;

    const queryString = `select R.VisitDate, P.Pname, D.Dname, D.Dtype, R.Pmode, T.Test from patient P, doctor D, thistory T, receipt R where D.DID = T.DID and P.PID = T.PID and P.PID = R.PID and R.VisitDate > "${lDate}" and R.VisitDate < "${uDate}" order by R.VisitDate asc`;

    db.query(queryString, [], (err, result) => {
        if(err){
            throw err;
        }

        if(result.length === 0){
            res.sendStatus(404);
        }

        else{
            res.status(200).json(result);
        }
    });
});

module.exports = router;