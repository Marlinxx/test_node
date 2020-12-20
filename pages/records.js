const express = require('express');
const router = express.Router();
const database = require('../utils/database');

getValues = (req, res) => {
    let query = `SELECT * FROM ${process.env.DATABASE}.records`;
    database.executeQuery(query).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED',
            err: err.code + '-' + err.sqlMessage
        })
    })
}

generateValues = (req, res) => {
    let rowsCount = 10000;
    let values = '';
    for (let count = 1; count <= rowsCount; count++) {
        values += `(${count},'value1','value2','value3',
        'value4','value5','value6','value7','value8',
        'value9','value10','Y')`
        if (count != rowsCount) {
            values += ',';
        }
    };
    let query = `INSERT INTO 
                    ${process.env.DATABASE}.records 
                    (ID,FIELD1,FIELD2,FIELD3,FIELD4,FIELD5,
                    FIELD6,FIELD7,FIELD8,FIELD9,
                    FIELD10,ACTIVEINDICATOR) 
                    VALUES 
                    ${values}`;
    database.executeQuery(query, res).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED',
            err: err.code + '-' + err.sqlMessage
        })
    })
}

resetTable = (req, res) => {
    let query = `DELETE FROM ${process.env.DATABASE}.records`
    database.executeQuery(query, res).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED',
            err: err.code + '-' + err.sqlMessage
        })
    })
}

setExpiryAll = (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP`
    database.executeQuery(query, res).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED', 
            err: err.code + '-' + err.sqlMessage
        })
    })
}

setInactiveAll = (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP, 
                    ACTIVEINDICATOR='N'`
    database.executeQuery(query, res).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED',
            err: err.code + '-' + err.sqlMessage
        })
    })
}

setExpiry = (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP 
                    WHERE ID=${req.body.id}`
    database.executeQuery(query, res).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED', 
            err: err.code + '-' + err.sqlMessage
        })
    })
}

setInactive = (req, res) => {
    let query = `UPDATE ${process.env.DATABASE}.records SET 
                    EXPIRY_DATE=CURRENT_TIMESTAMP, 
                    ACTIVEINDICATOR='N' 
                    WHERE ID=${req.body.id}`
    database.executeQuery(query, res).then(result => {
        res.send({
            status: 'SUCCESS',
            data: result
        })
    }).catch((err) => {
        res.send({
            status: 'FAILED', 
            err: err.code + '-' + err.sqlMessage
        })
    })
}

router.get('/getValues', getValues);
router.get('/resetTable', resetTable);
router.get('/generateValues', generateValues);
router.get('/setExpiryAll', setExpiryAll);
router.get('/setInactiveAll', setInactiveAll);
router.post('/setExpiry', setExpiry);
router.post('/setInactive', setInactive);

module.exports = router;