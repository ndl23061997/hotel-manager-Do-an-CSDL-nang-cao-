var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});



module.exports.getAllService =  function getAllService(callback) {
    conn.query('call get_all_service()' , (err, rows) => {
        if(err) {
            console.log('model service line 15: \n', err);
            callback(false, null);
        } else {
            callback(true, rows[0])
        }
    })

}

module.exports.getServiceByID =  function getServiceByID(id, callback) {
    conn.query('call get_service_by_id(?)' , [id], (err, rows) => {
        if(err) {
            console.log('model service line 27: \n', err);
            callback(false, null);
        } else {
            if(row[0].length > 0) callback(true, rows[0])
            else callback(false, null);
        }
    })
}

module.exports.deleteService =  function deleteService(id, callback) {
    conn.query('call delete_service(?)' , [id], (err, rows) => {
        if(err) {
            console.log('model service line 39: \n', err)
            callback(false)
        }
        if (rows['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

module.exports.updateService =  function updateService (id, newData, callback) {
    conn.query('call edit_service(?,?,?,?,?,?,?,?)', [id,newData.maso, newData.name, newData.price,newData.type_id,  newData.image, newData.des, newData.status], (err, rows) => {
        if(err) {
            console.log('model service line 51: \n' ,err);
            callback(false);
        }
        if (rows['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}