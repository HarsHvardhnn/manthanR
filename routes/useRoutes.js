const express = require("express");
const userModel = require("../models/userSchema");
const {
  login,
  signup,
  sendOtp,
  clearAll,
  updateProfile,
  getuserInfo,
  resetPassword,
} = require("../controllers/userController");
const {
  getQuestions,
  getAllQuestions,
} = require("../controllers/QuestionController");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/authMiddleware");
const { setAnswers } = require("../controllers/AnswerController");
const router = express.Router();
const {
  insertQuestions,
  getUsers,
  getAllAnswers,
} = require("../controllers/newController");
const {
  promoteToAdmin,
  adminLogin,
  getalladmins,
  createAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const {
  submitReport,
  getReportedUsers,
  getAdminWiseData,
  notifyAdmin,
} = require("../controllers/supAdminController");
const Profile = require("../models/profileModel");
const { sendSos, getAllSoS } = require("../controllers/SoScontroller");
const verifyToken = require("../middlewares/authenticateToken");

router.post("/signup", signup);
router.post("/login",  login);
router.post("/promote-to-admin", verifyToken, promoteToAdmin);
router.post("/send-sos", verifyToken, sendSos);
router.get("/get-all-sos/:id", verifyToken, getAllSoS);
// router.get('/get-user/:id',findUser);
// router.get('/', (req,res)=>{
//     res.send('hel;lo woprld');
//     console.log('object')
// })
// Assuming your userModel file is located in '../models/userModel'

// router.get('/getdata' , async (req,res) => {
//   res.send('hi').status(200);
// })

router.post("/update-tnc", verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    // console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { has_accepted_tnc: true },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/super-login", verifyToken, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's role is "super admin"
    if (user.role !== "super admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only super admins can access." });
    }

    // Check if the password is correct
    // Note: You should use a secure password comparison method like bcrypt here
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create a JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, "H@rsh123", {
      expiresIn: "1h",
    });

    // Send the token in the response
    console.log(user);
    res
      .status(200)
      .json({ message: "Super admin login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/check-email", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const userEmail = await userModel.findOne({ email: email });
    if (!userEmail) {
      return res.send("user doesnt exist").status(404);
    } else return res.status(200).send("user found please send otp");
  } catch (err) {
    return res.send("internal server error").status(500);
  }
});

router.delete("/clear", verifyToken, clearAll);
router.post("/Doit",  insertQuestions);
router.get("/getAllUsers", verifyToken, getUsers);
router.post("/setAnswer", verifyToken, setAnswers);
router.post("/sendOtp", verifyToken, sendOtp);
router.post("/reset-password", verifyToken, resetPassword);
router.get("/getQ",verifyToken, getAllQuestions);
router.get("/getAllData", verifyToken, getAllAnswers);
router.post("/adminLogin", verifyToken, adminLogin);

router.post("/update-profile", verifyToken, updateProfile);
router.get("/get-profile/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userProfile = await Profile.findById(id);
    if (!userProfile) {
      return res.status(403).send("Profile not updated");
    } else {
      return res.status(201).send("Profile already updated");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});
router.post("/create-admin", verifyToken, createAdmin);
router.delete("/delete-admin/:id", verifyToken, deleteAdmin);
// router.get('/getQuestions' , getQuestions);
router.post("/submit-report", verifyToken, submitReport);
router.get("/get-reported-users", verifyToken, getReportedUsers);
router.get("/get-user-info/:id", verifyToken, getuserInfo);
router.post("/getAdminwisedata", getAdminWiseData);
router.get("/getAllAdmins", verifyToken, getalladmins);
router.post("/reportpsy", verifyToken, notifyAdmin);
module.exports = router;
