const express = require('express')
const {dbConnect} = require('./utiles/db')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config()

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

<<<<<<< HEAD
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/home", require("./routes/home/homeRoutes"));
app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.get("/", (req, res) => res.send("Hello World"));
=======
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/home', require('./routes/home/homeRoutes'))
app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/home/customerAuthRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.get('/', (req, res) => res.send('Hello World'))
>>>>>>> parent of 294d7d41 (Debug)

const port = process.env.PORT
dbConnect()
app.listen(port, function(req, res){
    console.log(`Server is running on port ${port}!`);
})