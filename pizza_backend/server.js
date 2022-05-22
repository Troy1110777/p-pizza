const express = require('express');
const env = require('dotenv').config('.env');
const connectDatabase = require('./config/database');
const Pizza=require('./models/pizzaModel')

const pizzasRoute = require('./route/pizzasRoute')
const userRoute = require('./route/userRoute')
const orderRoute = require('./route/orderRoute');
const cookieParser = require('cookie-parser');
const path = require("path")

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config('.env');
}

const app = express()

app.use(cookieParser())
app.use(express.json());



//connecting to database
connectDatabase()


// app.get('/',(req, res)=>{
//     res.send("Server working on" + process.env.PORT);
// });

app.use('/api/pizzas/',pizzasRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', orderRoute)

//connecting with forntend app
app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`)
});

