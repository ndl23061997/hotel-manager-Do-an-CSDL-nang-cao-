var express = require('express');
var router = express.Router();

router.get('/service/:id', (req, res)=> {
    res.send('Edit service' + id);
})

router.get('/service-type/:id', (req, res)=> {
    let id = req.params.id;
    res.send('Edit service type' + id);
})

module.exports = router;