const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoBD connected");
    }
    catch(err){
        console.log("Erro connecting to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDB;