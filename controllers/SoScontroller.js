const Notification = require("../models/notificationModel");

const sendSos = async (req, res) => {
  const { userId, admin, message, username } = req.body;

  try {
    const notification = await Notification.create({
      user: userId,
      admin,
      message,
      username,
    });

    return res
      .status(201)
      .json({ message: "Notification sent successfully", notification });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
};

const getAllSoS = async (req,res)=> {
  try{
    const notifications = await Notification.find({});
    if(!notifications){
      return  res.send('no messages').status(404);
    }
    return res.send(notifications).status(201);
  }
  catch(err){
    return res.send(err).status(500);
  }
}

module.exports = {sendSos,getAllSoS};
