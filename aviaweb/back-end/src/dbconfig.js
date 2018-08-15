var mysql = require('mysql')
var pool = require('mysql').createPool({
    host: '172.20.1.47',
    user: 'fedosov',
    password: '321',
    database: 'kardailskiy',
    connectionLimit: 100
});


exports.query = function (sql, props) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query(
                sql, props,
                function (err, res) {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
            connection.release();
        });
    });
};
    
    
