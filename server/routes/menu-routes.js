var Burgers = require('../models/burger')
var Drinks = require('../models/drink')
var Sides = require('../models/side')
var router = require('express').Router()

router.get('/api/menu', (req, res, next)=>{
    Burgers.find({})
        .then(burgers => res.send(burgers))
        .catch(err => res.status(400).send({Error: err}))
    Drinks.find({})
        .then(drinks => res.send(drinks))
        .catch(err => res.status(400).send({Error: err}))
    Sides.find({})
        .then(side => res.send(side))
        .catch(err => res.status(400).send({Error: err}))
})

module.exports = router