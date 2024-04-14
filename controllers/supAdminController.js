const { notifyPsy } = require("../mailService");
const supAdminModel = require("../models/superAdminModel");
const userModel = require("../models/userSchema")

const submitReport = async (req, res) => {
    try {
        const { user, message ,admin } = req.body;
        // console.log(usermessage);
        console.log(admin);
        if (!user || !message) {
            return res.status(400).json({ error: "User and message are required fields." });
        }

        const user1 = await userModel.findOne({ email: user });
        if (!user1) {
            return res.status(404).json({ error: "User not found." });
        }

        const userId = user1._id;

        const report = await supAdminModel.create({ user: userId, message: message ,admin:admin });

        res.status(200).json({ message: "Report submitted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}

const getAdminWiseData = async (req, res) => {
    try {
        const { admin } = req.body;
        console.log("Received admin:", admin);

        const data = await supAdminModel.find({ admin: admin });
        console.log("Found data:", data);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        return res.send(data);
    } catch (error) {
        console.error("Error in getAdminWiseData:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const notifyAdmin = async (req,res) => {
    try{
        const user = req.body.user;
       const resp=  notifyPsy(user,"report@gmail.com");
        return res.send(resp).status(200);
    }catch(err){
        res.send(err.message).status(500);
    }
}


const getReportedUsers = async (req, res) => {
    try {
     const users = await supAdminModel.find({});
     return res.send(users).status(200);
    
    }
    catch(err){
        console.log(err);
        res.send('error').status(500);
    }
}



module.exports ={submitReport , getReportedUsers ,getAdminWiseData ,notifyAdmin };