var Drinks = require('../models/drink')
var router = require('express').Router()


router.post('/api/drinks', (req, res, next) => {
    if(!req.body.sizes.l || !req.body.sizes.m){
        return res.send('INVALID DRINK PLEASE INCLUDE SIZES')
    }
    var drink = {
        name: req.body.name,
        sizes: {
            l: req.body.sizes.l,
            m: req.body.sizes.m
        }
    }
   Drinks.create(drink)
    .then(drink=>{
        res.send(drink)
    })
    .catch(err =>{
        res.status(400).send({Error: err})
    })
})

router.get('/api/drinks', (req, res, next)=>{
    Drinks.find({})
        .then(drinks =>{
            res.send(drinks)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.get('/api/drinks/:id', (req, res, next)=>{
    Drinks.findById(req.params.id)
        .then(drink=>{
            res.send(drink)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.put('/api/drinks/:id', (req, res, next)=>{
    var action = 'Update Drink'
    Drinks.findByIdAndUpdate(req.params.id, req.body)
        .then(data=>{
            res.send(handleResponse(action, data))
        })
        .catch(err =>{
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/api/drinks/:id', (req, res, next)=>{
    Drinks.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.send({message: 'So much for that drink'})
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

function handleResponse(action, data, error){
    var response =  {
        message: action,
        data: data
    }
    if(error){
        response.error = error
    }
    return response
}


module.exports = router











module.exports = router