const FiftyQuestionsModel = require('../models/newModel');
const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken')
const insertQuestions = async (req, res) => {
    try {
        const token = req.headers.authorization; 
  
        const { email, user_response, answers, score } = req.body;

        const userPromise = userModel.findOne({ email }, { _id: 1 });
        const updateScorePromise = userModel.findOneAndUpdate(
            { email },
            { $set: { score, score_date: new Date() } },
            { new: true }
        );

        const [user, updatedUser] = await Promise.all([userPromise, updateScorePromise]);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const mappedQuestions = answers.map(qa => ({
            question: qa.question,
            answer: qa.answer
        }));

        const newQuestionsDoc = new FiftyQuestionsModel({
            user: user._id,
            questions: mappedQuestions,
            user_response
        });

        await newQuestionsDoc.save();

        return res.status(201).json({ message: "Questions inserted successfully" });
    } catch (error) {
        console.error("Error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({role:'user'}).select('-password');
        return res.status(200).send(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};
const getAllAnswers = async (req, res) => {
    try {
     
      // Verify the token if needed
      // const decoded = jwt.verify(token, secretKey);      
      const questions = await FiftyQuestionsModel.find({});
      return res.status(200).send(questions);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "server error" });
    }
  };

module.exports = { insertQuestions ,getUsers ,getAllAnswers};
