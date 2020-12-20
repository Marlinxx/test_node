const mysql = require('mysql');
require('dotenv').config();

let mySQL_pool;

module.exports.initialiseDB = () => {
    mySQL_pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: eval(process.env.DB_PORT),
        database: process.env.DATABASE,
        insecureAuth: true
    });
}

module.exports.executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        mySQL_pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error in get connection to' + process.env.HOST, err);
                reject(err);
            } else {
                connection.query(query, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            data: result
                        })
                    }
                });
            }
        })
    })
}
