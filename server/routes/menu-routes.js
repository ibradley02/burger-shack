var Burgers = require('../models/burger')
var Drinks = require('../models/drink')
var Sides = require('../models/side')
var router = require('express').Router()

router.get('/api/menu', (req, res, next)=>{
    var menu = {
        drinks: [],
        burgers: [],
        sides: []
    }
    Drinks.find({})
        .then(drinks => {
            menu.drinks = drinks
            Burgers.find({})
                .then(burgers=>{
                    menu.burgers = burgers
                    Sides.find({})
                        .then(sides=>{
                            menu.sides = sides
                            res.send(menu)
                        })
                })
            })
        .catch(err => res.status(400).send({Error: err}))
})

module.exports = router