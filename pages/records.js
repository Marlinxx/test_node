const express = require('express');
const router = express.Router();
const database = require('../utils/database');

getValues = async (req, res) => {
    let query = `SELECT * FROM ${process.env.DATABASE}.records`;
    await database.executeQuery(query, res);
}

generateValues = async (req, res) => {
    let rowsCount = 10000;
    let values ='';
    for(let count = 1; count <= rowsCount; count++) {
        values +=`(${count},'value1','value2','value3',
        'value4','value5','value6','value7','value8',
        'value9','value10','Y')`
        if(count != rowsCount) {
            values +=',';
        }
    };
    let query = `INSERT INTO 
                    ${process.env.DATABASE}.records 
                    (ID,FIELD1,FIELD2,FIELD3,FIELD4,FIELD5,
                    FIELD6,FIELD7,FIELD8,FIELD9,
                    FIELD10,ACTIVEINDICATOR) 
                    VALUES 
                    ${values}`;
    await database.executeQuery(query, res);
}

resetTable = async (req, res) => {
    let query = `DELETE FROM ${process.env.DATABASE}.records`
    await database.executeQuery(query, res);
}

setExpiryAll = async (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP`
    await database.executeQuery(query, res);
}

setInactiveAll = async (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP, 
                    ACTIVEINDICATOR='N'`
    await database.executeQuery(query, res);
}

setExpiry = async (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP 
                    WHERE ID=${req.body.id}`
    await database.executeQuery(query, res);
}

setInactive = async (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP, 
                    ACTIVEINDICATOR='N' 
                    WHERE ID=${req.body.id}`
    await database.executeQuery(query, res);
}

router.get('/getValues', getValues);
router.get('/resetTable', resetTable);
router.get('/generateValues', generateValues);
router.get('/setExpiryAll', setExpiryAll);
router.get('/setInactiveAll', setInactiveAll);
router.post('/setExpiry', setExpiry);
router.post('/setInactive', setInactive);

module.exports = router;