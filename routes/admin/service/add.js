var express = require('express');
var router = express.Router();

router.get('/service', (req, res)=> {
    res.send('Add service');
})

router.get('/service-type', (req, res)=> {
    res.send('Add service type');
})
module.exports = router;