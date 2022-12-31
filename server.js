const express = require('express')
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/key')
const ProductRoutes = require('./routes/productRoutes')
const path = require('path')


mongoose.connect(keys.URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        throw error
    } else {
        console.log("MongoDB Connected")
    }
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', ProductRoutes);
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'))
})


app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})