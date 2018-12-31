var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});

function getAllRoomType(callback) {
    conn.query('call get_all_roomtype()', (err, data, fields) => {
        if(err) {
            console.log(err)
            callback(false, null)
        }
        if (data && data[0].length > 0) {
            callback(true, data[0]);
        } else {
            callback(false, null);
        }
    });
}

function deleteRoomType(id, callback) {
    conn.query('call delete_roomtype(?)', [id], (err, data, fields) => {
        if(err) {
            console.log(err)
            callback(false)
        }
        if (data && data['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

function updateRoomType(id, newData, callback) {
    // console.log(HotelID, newData);
    conn.query('call update_roomtype(?,?,?)', [id, newData.name, newData.des], (err, data, fields) => {
        if(err) {
            console.log(err);
            callback(false);
        }
        if (data['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

function getRoomTypeByID(id,callback) {
    conn.query('call get_roomtype(?)',[id],(err, data, fields) => {
        if(err) {
            console.log(err);
            callback(false);
        }
        if (data[0][0]) {
            // neu ton tai tai khoan
            callback(true, data[0][0]);
        } else {
            callback(false, null);
        }
    });
}



function addRoomType(newData, callback) {
    conn.query('call add_roomtype(?,?)', [newData.name,newData.des], (err, data, fields) => {
        if(err) {
            console.log(err);
            callback(false);
        }
        if (data['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}
module.exports.addRoomType = addRoomType;
module.exports.getAllRoomType = getAllRoomType;
module.exports.deleteRoomType = deleteRoomType;
module.exports.updateRoomType = updateRoomType;
module.exports.getRoomTypeByID = getRoomTypeByID;