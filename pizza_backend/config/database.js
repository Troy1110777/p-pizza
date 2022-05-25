const mongoose = require('mongoose');

const connectDatabase = () => {
    if (process.env.NODE_ENV==='PRODUCTION'){
        mongoose.connect(process.env.DB_URI_PROD, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
    }
    else{
        mongoose.connect(process.env.DB_URI_DEV, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
    }
}

module.exports = connectDatabase;