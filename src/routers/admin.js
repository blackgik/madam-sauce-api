const express = require('express');
const User = require("../models/users");
const Menu = require("../models/menu");
const Orders = require('../models/orders');
const Order = require('../models/orders');
const router = new express.Router

// creating food menu
router.post('/menu', async (req, res) =>{
    const newDish = new Menu(req.body);
    try {
        await newDish.save()
        res.status(201).send(newDish)
    } catch(e) {
        res.status(400).send(e)
    }
})

// update my menu
router.patch('/menu/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ['name', 'description', 'price', 'time'];
    const isValid = updates.every(update => allowedupdates.includes(update));

    if (!isValid) {
        return res.status(400).send({
            error: 'input key is not valid'
        })
    }

    try{
         const MenuDishToUpdate = await Menu.findByIdAndUpdate(req.params.id, res.body, );
         if(!MenuDishToUpdate) {
             return res.status(404).send()
         }

         res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// get all users
router.get('/users', async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
});

// getting all orders:
router.get('/orders', async (req, res) =>{
    try{
        const orders = await Order.find({})
        res.status(200).send(orders)
    }catch (e) {
        res.status(400).send(e)
    }
})

//delete completed orders
router.delete('/orders', async (req, res)=> {
    try{
        const completedOrder = await Orders.deleteMany({completed: true});
        res.send(completedOrder)
    } catch (e) {
        res.send(500).send(e)
    }
})

// updating my order to completed : true when order is completed
router.patch('/orders/:id', async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdate = ['completed']
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


//exporting the module to index.js
module.exports = router;