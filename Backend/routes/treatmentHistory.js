const express = require("express");
const bodyParser = require("body-parser");

const db = require("../db");

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended : true});

router.post('/add', urlEncodedParser, (req, res) => {
    const {PID, DID, VisitDate, Symptom, Diagnosis, Medicine, Test, Pmode} = req.body;

    db.beginTransaction((err) => {
        if(err){
            throw err;
        }
        const insert_tHistory_query = "insert into thistory values (?, ?, ?, ?, ?, ?)";

        db.query(insert_tHistory_query, [PID, DID, Symptom, Diagnosis, Medicine, Test], (err, result) => {
            if(err){
                return db.rollback(() => {
                    throw err;
                })
            }

            const insert_receipt_query = "insert into receipt values (?, ?, ?)";

            db.query(insert_receipt_query, [PID, Pmode, VisitDate], (err, result) => {
                if(err){
                    return db.rollback(() => {
                        throw err;
                    });
                }

                db.commit((err) => {
                    if(err){
                        return db.rollback(() => {
                            throw err;
                        });
                    }

                    res.redirect('/index.html');
                });
            });

        });
    });
    
});

module.exports = router;