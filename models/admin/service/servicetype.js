var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});



module.exports.getAllServiceType =  (callback) => {
    conn.query('call get_all_servicetype()' , (err, rows) => {
        if(err) {
            console.log('model `servicetype` line 15: \n', err);
            callback(false, null);
        } else {
            console.log('model `servicetype` line 18: \n', rows);
            callback(true, rows[0])
        }
    })

}

module.exports.getServiceTypeByID =  (id, callback) => {
    conn.query('call get_servicetype_by_id(?)' , [id], (err, rows) => {
        if(err) {
            console.log('model `servicetype` line 27: \n', err);
            callback(false, null);
        } else {
            if(row[0].length > 0) callback(true, rows[0])
            else callback(false, null);
        }
    })
}

module.exports.deleteServiceType =  (id, callback) => {
    conn.query('call delete_servicetype(?)' , [id], (err, rows) => {
        if(err) {
            console.log('model `servicetype` line 39: \n', err)
            callback(false)
        }
        if (rows['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

module.exports.updateServiceType = (id, newData, callback) => {
    conn.query('call edit_service(?,?,?)', [id,newData.name, newData.des], (err, rows) => {
        if(err) {
            console.log('model servicetype line 51: \n' ,err);
            callback(false);
        }
        if (rows['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}