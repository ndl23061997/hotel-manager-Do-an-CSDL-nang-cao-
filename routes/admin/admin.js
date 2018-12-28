var express = require('express');
var router = express.Router();
var adminModel = require('../../models/admin/admin');
var auth = require('../auth');
var roomRouter = require('./room/room')

router.use('/room', auth.checkLoginAdmin, roomRouter);
router.use(auth.checkLoginEmployee);

// Trang chu
router.get('/', (req, res, next) => {
    data = {
        title : 'Trang chủ',
        check : 'home'
    }
    res.render('admin/index', data);
})

module.exports = router;
