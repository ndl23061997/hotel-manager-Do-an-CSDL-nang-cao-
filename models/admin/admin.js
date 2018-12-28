var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});

function getAccountByUsername(username, callback) {
    conn.query('call get_account_by_username(?)', [username], (err, rows, fields) => {
        if (err) throw err;
        if (rows[0].length > 0) {
            // neu ton tai tai khoan
            callback(true, rows[0][0]);
        } else {
            callback(false, null);
        }
    });
}

module.exports.getAccountByUsername = getAccountByUsername;