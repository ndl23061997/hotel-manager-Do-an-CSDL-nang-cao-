var express = require('express');
var router = express.Router();
var roomModel = require('../../../models/admin/room/room');


router.get('/list*', (req, res) => {
    let page = req.query.page ? req.query.page : '' ;
    data = {
        title : 'Quản lí phòng', 
        check : 'room' , 
        page : page
    };
    data['message1'] = req.flash('message1');
    data['message2'] = req.flash('message2');
    console.log(data);
    switch(page) {
        case 'abc': 
            
        break;
        default:
        page = 'roomlist';
        roomModel.getAllRoom((result, datas) => {
            data['datas'] = datas;
            res.render('admin/room/index', data);
        })
        break;
    }
    
});

router.get('/delete*', (req, res) => {
    let page = req.query.page ? req.query.page : '';
    switch(page) {
        case 'roomlist': // Xoa phong 
            let id = req.query.id;
            roomModel.deleteRoom(id, (result) => {
                if(result) {
                    req.flash('message1', 'Xóa thông tin phòng thành công!');
                } else {
                    req.flash('message2' , 'Có lỗi xảy ra, vui lòng thử lại!');
                }
                console.log(req);
                res.redirect('list?page=roomlist');
            });
        break;
        default:
            res.redirect('list?page=roomlist');
        break;
    }
});

router.get('/edit*', (req, res) => {
    let page = req.query.page ? req.query.page : '';
    let data = {
        title : 'Sửa thông tin phòng',
        page : page,
        check : 'room'
    }
    switch(page) {
        case 'roomlist': // Sua thong tin phong 
            let id = req.query.id;
            roomModel.getDetail(id, (result) => {
                data['data'] = result;
                res.render('admin/room/edit-room', data);
            });
           
        break;
        default:
            res.redirect('list?page=roomlist');
        break;
    }
});

module.exports = router;