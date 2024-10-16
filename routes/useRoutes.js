const express = require("express");
const csv = require('csv-parser');
const fs = require('fs');
const userModel = require("../models/userSchema");
const otpModel = require("../models/otpModel")
const {
  login,
  signup,
  sendOtp,
  clearAll,
  updateProfile,
  getuserInfo,
  resetPassword,
  editProfile,
} = require("../controllers/userController");
const { validationResult } = require('express-validator');
const {
  getQuestions,
  getAllQuestions,
} = require("../controllers/QuestionController");
const jwt = require("jsonwebtoken");
const {upload,uploadImage} = require('../middlewares/fileUpload')
const { auth } = require("../middlewares/authMiddleware");
const { setAnswers } = require("../controllers/AnswerController");
const router = express.Router();
const sendBulkEmail = require('../bullkMail')
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
  getAdminReportedUsers,
  notifyAdmin,
  authorityLogin,
  getUserAdmin
} = require("../controllers/supAdminController");
const Profile = require("../models/profileModel");
const { sendSos, getAllSoS } = require("../controllers/SoScontroller");
const verifyToken = require("../middlewares/authenticateToken");
const supAdminModel = require("../models/superAdminModel");
// const uploadImage = require("../middlewares/fileUpload");
const {sendOTP} = require('../otpService')
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
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/upload', upload.single('image'), uploadImage, function(req, res) {
  res.json({ imageUrl: req.imageUrl });
});


router.post('/upload-student-data' ,upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const users = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => users.push({ username: data.username, email: data.email, password: data.password }))
    .on('end', async () => {
      try {
        console.log(users)
        await userModel.insertMany(users, { ordered: false }); 
        fs.unlinkSync(req.file.path);
        res.send('File processed successfully.');
      } catch (error) { 
        console.log(users)
        console.error('Error inserting users: ', error);
        res.status(500).send('Error processing file.');
      }
    });
})

router.post("/super-login", async (req, res) => {
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
router.post("/check-email",  async (req, res) => {
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
router.post("/Doit",verifyToken,  insertQuestions);
router.get("/getAllUsers", verifyToken, getUsers);
router.post("/setAnswer", verifyToken, setAnswers);
router.post("/sendOtp", verifyToken, sendOtp);
router.post("/reset-password", resetPassword);
router.get("/getQ",verifyToken, getAllQuestions);
router.get("/getAllData", verifyToken, getAllAnswers);
router.post("/adminLogin", adminLogin);

router.get('/get-user-j' , async(req,res)=>{
  try{
    const user = await userModel.find({email:'user23@example.com'});
    return res.send(user);

  }catch(err){
    console.log(err)
  }
})

router.get('/pfp/:id' ,  async (req,res)=>{
  try {
    const {id}= req.params;
        const user =  await  userModel.findById(id);
        console.log(id)
    console.log(user)
    return res.send(user?.profile_pic).status(200);
  }
  catch(err){
    console.log(err)
    return res.send('error').status(500);
  }
})

router.post('/assign-warden' , verifyToken ,async(req,res) => {
 try{
  // const userProfile = await Profile.findOne({user:req.decoded.userId});
  //  console.log(userProfile)
  const user = await userModel.findById(req.decoded?.userId);
  if(user.assigned_warden){
    return res.send({info:'warden already assigned to user' , message:user?.assigned_warden})
  }
  const wardens = await userModel.find({role:'warden',hostelName:user?.hostelName});


   console.log('user' ,  user);
   
  //  console.log(wardens)
   
  if(!wardens){
    return res.send('no wardens for this hostel registered').status(404);
    
  }

   
  const updatedUser = await userModel.findByIdAndUpdate({_id:user._id} , {
    assigned_warden:wardens[0],
  })

  //  console.log(updatedUser);

  return res.send({message:'warden assigned' , updatedUser}).status(201);

  
 }catch(err){
  console.log(err)
  return res.send(err).status(500);
 }
  
  
})


router.post('/assign-admin' , verifyToken , async(req,res) => {
  try{
    // const {semester , dept, degree}  = req.body;
    const user1 = req.decoded;

    

   const user = await userModel.findById(user1.userId);



   console.log(user)

   if(user?.assigned_admin){
    const admin = await userModel.find({
      _id:user.assigned_admin
    }).select('-password');

    return res.send({message:'admin already assigned' ,  admin:admin});
   }
   

  const admins = await userModel.find({
  role: 'admin',
  semesters: { $elemMatch: { $eq: String(user.semester) } },
  degrees:  { $elemMatch: { $eq: String(user.degree) } },
  depts:  { $elemMatch: { $eq: String(user.dept) } }
});

console.log(admins)

    if(admins.length<=0 ){
      return res.send('Admin not found for this user').status(404)
    }
    console.log(admins)
    const updatedUser = await userModel.findByIdAndUpdate({_id:user._id} , {
      assigned_admin:admins[0],

    })

    return res.send({message:"admin assigned" , user:updatedUser}).status(201)

  }
  catch(err){
    console.log(err);
    return res.send(err)
  }
}

)



router.get('/get-assigned-admin' , verifyToken,  async (req,res) => {
  try{
    const {userId}= req.decoded;
    const user =  await userModel.findById(userId);
    console.log(user);
    const admin = await userModel.findById(user.assigned_admin);
    console.log(admin);

    return res.send(admin).status(200)
  }
catch(err){
  console.log(err)
  return res.send(err)
}}
)

router.get('/get-user-with-info', verifyToken, async (req, res) => {
  try {

    const userData = await userModel.find({});

    const profileData = await Profile.find({});

    const mergedData = userData.map(user => {
      const profile = profileData.find(profile => String(profile.user) === String(user._id));
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        assigned_admin:user.assigned_admin,
        profile: profile || {} 
      };
    });

    // console.log('Merged Data:', mergedData);
    res.status(200).json(mergedData);
  } catch (error) {
    console.error('Error merging user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.post('/edit-profile' ,upload.single('image'),uploadImage ,verifyToken ,editProfile)

router.post("/update-profile", upload.single('image'),uploadImage,  verifyToken, updateProfile);
router.get("/get-profile/:id", verifyToken, async (req, res) => {
  try {


    const { id } = req.params;
    // console.log(id);
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


router.post('/report-to-psych',verifyToken, async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const id = req.body.userID;
    
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
   const super_admin = await userModel.find({role:'super admin'});
 
   const supadminId= super_admin[0]?._id || '6633b695e302c9a413f4a578';

    let userExists = await supAdminModel.exists({ user: id });

    if (!userExists) {

        await supAdminModel.create({ user: id,admin:supadminId,message:'reported by super admin directly', reported_psych: true });
    }
    

    const update = await supAdminModel.findOneAndUpdate(
      { user: id },
      { reported_psych: true },
      { new: true }
  ).select("-password");

  const userMess = await supAdminModel.findOne({user:id});
  const userMessage = userMess.message;

  

  if (!update) {
      return res.status(404).json({ error: "User not found" });
  }
  

  // if (update.password) {
  //     delete update.password;
  // }
  

  update.message= userMessage;
  return res.status(200).json(update);
  
  
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
router.post('/send-otp', async (req, res) => {
  // const { email } = req.decoded;
  const {email} = req.body;
  // email = 'harshvchawla997@gmail.com';

  // console.log(decoded);
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const otp = generateOTP(); 
    await sendOTP(email, otp);
    await otpModel.create({ email: email, otp: otp });

    res.status(200).json({ message: `OTP sent to ${email}`, otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' ,error});
  }
});




router.post('/add-users',  async (req, res) => {
  try {
      // Extract user data array from form data
      // console.log(req.body)
      const parsedUserDataArray = req.body;
    //  console.log(JSON.parse(req.body['formData']))
      // Parse each user object in the array
    
      // console.log(usersData)

      // Process each user and save to the database
      for (const userData of parsedUserDataArray) {
          userData.role = 'user'; // Set role to 'user'
          await userModel.create(userData); // Create user in the database
      }

      // Respond with success message
      res.status(201).json({ message: 'Users added successfully' });
  } catch (error) {
      console.error('Error adding users:', error);
      res.status(500).json({ error: 'Error adding users' });
  }
});




router.post('/upload-summary' ,verifyToken, async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.body.userID;
    const sum = req.body.summary;
    console.log(sum);
  
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const summ = JSON.parse(sum)

    const update = await supAdminModel.findOneAndUpdate(
      { user: id },
      { actionSummary:summ},
      { new: true }
    );

    if (!update) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(update);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
})


router.get('/get-summary/:id',verifyToken, async (req,res) => {
  try{
    const { id }= req.params;
    const summary = await supAdminModel.find({user:id});
    if(!summary){
      return res.send('user not found').status(404);
    }

    return res.send(summary).status(201);
    

  }catch(err){
    return res.send('error').status(500);  }
})
router.post("/create-admin", verifyToken, createAdmin);

router.post('/send-bulk-email', async (req, res) => {
  const { recipients, subject, body } = req.body;

  if (!recipients || !subject || !body) {
    return res.status(400).json({ message: 'Recipients, subject, and body are required' });
  }

  try {
    // Send the bulk email
    await sendBulkEmail(recipients, subject, body);
    
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send emails', error });
  }
});

router.delete('/delete-duplicates', async (req, res) => {
  const field  ='email';

  if (!field) {
      return res.status(400).json({ message: "Field parameter is required" });
  }

  try {
      const duplicates = await userModel.aggregate([
          {
              $group: {
                  _id: `$${field}`,
                  count: { $sum: 1 },
                  docs: { $push: "$_id" },  
              }
          },
          {
              $match: {
                  count: { $gt: 1 }  
              }
          }
      ]);

     for (const duplicate of duplicates) {
          const idsToDelete = duplicate.docs.slice(1); 

          await userModel.deleteMany({ _id: { $in: idsToDelete } });
      }

      res.status(200).json({ message: "Duplicate users deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/warden/students', async (req,res)=>{

})


router.delete("/delete-admin/:id", verifyToken, deleteAdmin);
// router.get('/getQuestions' , getQuestions);
router.get('/assigned-admin/:id' ,async (req,res)=>{
  try {
    const id = req.params.id;
    const admin = await userModel.findOne({_id:id});
    console.log(admin);
    return res.send(admin.assigned_admin).status(200);
  }catch(err){
    return res.send(err).status(500)
  }

})

router.get('/user/get-score/:id' , async (req,res)=>{
  try {
    const {id} = req.params;
    const user = await userModel.findOne({_id:id});
    // console.log(user)
    const score = {
      score:user.score,
      date:user.score_date,
    }
    // console.log(score)
    return res.send(score).status(201);
  }catch(err){
    return res.send(err).status(500);
  }
})
router.post("/submit-report", verifyToken, submitReport);
router.get("/get-reported-users",verifyToken,  getReportedUsers);
router.get("/get-admin-reported-users/:id",  getAdminReportedUsers);
router.get("/get-user-info/:id",verifyToken ,getuserInfo);
router.post("/getAdminwisedata", getAdminWiseData);
router.get('/user-admin-data/:admin',getUserAdmin)
router.get("/getAllAdmins", verifyToken, getalladmins);
router.post("/reportpsy", verifyToken, notifyAdmin);
router.get('/admin/users/:adminId'  , async(req,res) => {
  try{
    const {adminId} = req.params;
    const adminUsers = await userModel.find({assigned_admin:adminId}).select('-password');
    if(!adminUsers){
      return res.send('no students under this admin');
    }
    return res.send(adminUsers);



 
  }catch(err){
    console.log(err);
  }

})


router.post('/single-login' , authorityLogin)
module.exports = router;
