const express = require('express');
const User = require('../models/users');
const Order = require('../models/orders')
const Menu =  require('../models/menu');
const { update } = require('../models/users');
const router = new express.Router();

// sign up 
router.post('/users', async (req, res)=> {
    const newUser =  new User(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser)
    } catch (e) {
        res.status(400).send(e)
    }

})

// making orders
router.post('/orders', async (req, res)=> {
    const matchOrder = await Menu.find({});
    const newOrder = new Order(req.body)
    const isValid = newOrder.every(choice => matchOrder.includes(choice.name) );

    if (isValid) {
        try{
            await newOrder.save();
            res.status(201).send(newOrder);
        }catch (e) {
            res.status(400).send(e)
        }
    } else {
        return res.status(404).send('order is not on the menu')
    }

});

// get the available menu
router.get('/menu', async (req, res)=> {
    try{
        const menu =  await Menu.find({});
        res.status(200).send(menu)
    } catch(e) {
        res.status(500).send(e)
    }
});


// updating orders
router.patch('/orders/:id', async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdate = ['name', 'quantity']
    const isValid =  updates.every(update => allowedUpdate.includes(update) );

    if (!isValid) {
        return res.status(400).send({
            error: 'the menu does not contain the key value'
        })
    }

    try{
        const orderToUpdate = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!orderToUpdate) {
            return res.status(404).send('order does not exist')
        }
        
        res.send(orderToUpdate)

    }catch {

    }

})

// deleting a single order
router.delete('/orders/:id', async (req, res) =>{
    try{
        const orderToDelete = await Order.findOneAndDelete(req.params.id);
        if(!orderToDelete) {
            return res.status(404).send({
                ordeId : req.params.id,
                error: "order not found"
            })
        }

        res.send('order deleted')
    } catch (e) {
        res.status(500).send(e)
    }
});

// deelting all orders that have not been completed

router.delete('/orders', async (req, res)=> {

    try{
        const orders = await Order.deleteMany({completed: false})
        res.send(orders);
    }catch(e) {
        res.status(500).send(e)
    }
});


module.exports = router