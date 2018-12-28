var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});

function getAllRoom(callback) {
    conn.query('call get_all_room()', (err, data, fields) => {
        //console.log(data[0]);
        if (data[0].length > 0) {
            // neu ton tai tai khoan
            callback(true, data[0]);
        } else {
            callback(false, null);
        }
    });
}

function deleteRoom(roomID, callback) {
    conn.query('call delete_room(?)', [roomID], (err, data, fields) => {
        console.log(data['affectedRows']);
        if (data['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

function getDetail(roomID, callback) {
    conn.query('select id,name from RoomType', (err, data) => {
        let roomtypes = data;
        conn.query('select id, name from Hotel', (err, data2) => {
            let hotels = data2;
            conn.query('select * from Room where id =?', [roomID], (err, data3) => {
                let detail = data3;

                let rdata = {
                    detail : detail,
                    hotels : hotels,
                    roomtypes : roomtypes
                }
                callback(rdata)
            });
        });
    });
     

}

module.exports.getAllRoom = getAllRoom;
module.exports.deleteRoom = deleteRoom;
module.exports.getDetail = getDetail;