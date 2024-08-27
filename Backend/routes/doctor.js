const express = require("express");
const bodyParser = require("body-parser");

const db = require("../db");

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended : true});

router.get('/', urlEncodedParser, (req, res) => {
    const DID = req.body.DIDID;

    const queryString = "select * from doctor";

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