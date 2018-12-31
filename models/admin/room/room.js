var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'hotel'
});

function getAllRoom(callback) {
    conn.query('call get_all_room()', (err, data, fields) => {
        if(err) {
            console.log(err)
            callback(false, null)
        }
        if (data[0].length > 0) {
            callback(true, data[0]);
        } else {
            callback(false, null);
        }
    });
}

function deleteRoom(roomID, callback) {
    conn.query('call delete_room(?)', [roomID], (err, data, fields) => {
        if (data && data['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

function updateRoom(roomID, newData, callback) {
    //console.log(roomID, newData);
    conn.query('call update_room(?,?,?,?,?,?,?)', [roomID, newData.hotel_id, newData.price, newData.type_id, newData.des, newData.image, newData.maso], (err, result, fields) => {
        if(err) {
            console.log(err)
            callback(false)
        }
        console.log('ket qua call update_room : ')
        console.log(result);
        if (result['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}

function getRoomByID(roomID, callback) {
    conn.query('call get_room(?)', [roomID], (err, data, fields) => {
        //console.log(data);
        if(err) {
            console.log(err);
            callback(false, null)
        }
        if (data[0][0]) {
            // console.log(data)
            callback(true, data[0][0])
        } else {
            callback(false,null);
        }
    });
}

function getTemplate(callback) {
    conn.query('select id,name from RoomType', (err, data) => {

        if (err) callback(false, null);
        let roomtypes = data;
        conn.query('select id, name, maso from Hotel', (err, data2) => {
            if (err) callback(false, null);
            let hotels = data2;
            callback(true, { hotels: hotels, roomtypes: roomtypes });
        });
    });
}

async function getDetail(roomID, callback) {
    conn.query('select id,name from RoomType', (err, data) => {
        let roomtypes = data;
        conn.query('select id, name, maso from Hotel', (err, data2) => {
            let hotels = data2;
            conn.query('select * from Room where id =?', [roomID], (err, data3) => {
                let detail = data3;

                let result = {
                    detail: detail,
                    hotels: hotels,
                    roomtypes: roomtypes
                }
                callback(result)
            });
        });
    });


    // let promise1 = conn.query('select id, name from RoomType');
    // let promise2 = conn.query('select id, name from Hotel');
    // let promise3 = conn.query('select * from Room where id =?', [roomID]);
    // const [result1, result2, result3] = await  Promise.all([promise1, promise2, promise3])
    // let result = {
    //     detail: result1,
    //     hotels: result2,
    //     roomtypes: result3
    // }
    // callback(result);

}

function addRoom(data, callback) {
    conn.query('call add_room(?,?,?,?,?,?)', [data.hotel_id, data.price, data.type_id, data.des, data.image, data.maso], (err, result) => {
        if (err) {
            console.log(err);
            callback(false);
            return;
        }
        console.log('Kết quả call add_room : \n' , result);
        if (result['affectedRows'] > 0)
            callback(true);
        else callback(false);
    })
}
module.exports.addRoom = addRoom;
module.exports.getTemplate = getTemplate;
module.exports.getAllRoom = getAllRoom;
module.exports.deleteRoom = deleteRoom;
module.exports.getDetail = getDetail;
module.exports.updateRoom = updateRoom;
module.exports.getRoomByID = getRoomByID;