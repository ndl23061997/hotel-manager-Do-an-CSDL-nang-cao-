var express = require('express');
var router = express.Router();
var auth = require('../auth');
var roomRouter = require('./room/room')
var serviceRouter = require('./service/service')
router.use(auth.checkLoginEmployee);


router.use('/room', roomRouter);
router.use('/service',serviceRouter );


// Trang chu
router.get('/', (req, res, next) => {
    data = {
        title : 'Trang chủ',
        check : 'nav-home'
    }
    res.render('admin/index', data);
})

module.exports = router;
