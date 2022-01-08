const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const ProductModel = require('./models/Products')
const cors = require('cors')
require('dotenv').config()
const pass = process.env.PASS

const uri = `mongodb+srv://testuser00:${pass}@cluster0.trxjj.mongodb.net/YokeTest?retryWrites=true&w=majority`

app.use(express.json());
app.use(cors())

mongoose.connect(uri)

app.get('/getUsers', async (req, res) => {
    console.log('get request')
    try {
        const user = await UserModel.find()
        res.json(user)
    } catch (err) {
        res.send('Error ' + err)
    }
})
app.get('/getProducts', async (req, res) => {
    console.log('get request')
    try {
        const product = await ProductModel.find()
        res.json(product)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/setUser', async (req, res) => {
    console.log('post request')
    const product = new UserModel({
        name: req.body.name,
        email: req.body.email,
        account: req.body.account,
        isMember: req.body.isMember
    })
    try {
        const p1 = await product.save()
        res.json(p1)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/updateUser', async (req, res) => {
    const { filter } = req.body; // { productName: 'paper' };
    const { update } = req.body;
    const opts = { new: true, upsert: true };
    try {
        const data = await UserModel.findOneAndUpdate(filter, update, opts)
        res.json(data)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/setProduct', async (req, res) => {
    console.log('post request')
    const product = new ProductModel({
        productName: req.body.productName,
        price: req.body.price,
        quantityInStock: req.body.quantityInStock
    })
    try {
        const p1 = await product.save()
        res.json(p1)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/updateProduct', async (req, res) => {
    const { filter } = req.body; 
    const { update } = req.body;
    const opts = { new: true, upsert: true };
    try {
        const data = await ProductModel.findOneAndUpdate(filter, update, opts)
        res.json(data)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.listen(4000, ()=> {
    console.log('Server runnging on port 4000.')
})
