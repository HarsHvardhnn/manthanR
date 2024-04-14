const mongoose = require('mongoose');
require('dotenv').config();

// mongodb+srv://harshvchawla996:ZeKEWIzV0BgDxxJz@cluster0.ehvlcx1.mongodb.net/manthan
const dbConnect  = async () =>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database connected');

    }).catch((err) => {
        console.log(err);
    })
}

module.exports ={dbConnect};


