var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});

function getAccountByUsername(username, callback) {
    conn.query('call get_account_by_username(?)', [username], (err, data) => {
        if (data[0].length > 0 ) {
            // neu ton tai tai khoan
            callback(true, data[0][0]);
        } else {
            callback(false, null);
        }
    });
}

function getAccount(username, password, callback) {
    conn.query("call get_account(?, ?)", [username, password], (err, data) => {
        if(err) throw err;
        console.log(data);
        if (data[0].length > 0) {
            // neu ton tai tai khoan
            callback(true, data[0][0]);
        } else {
            callback(false, null);
        }
    });
}

module.exports.getAccountByUsername = getAccountByUsername;

module.exports.getAccount = getAccount;