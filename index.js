const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const router= require('./routes/useRoutes')
const session = require('express-session');
const mongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const {dbConnect }= require('./config/database');
require('dotenv').config();
const path = require('path');
dbConnect();

questions = [
    "I think I have a particular meaning and purpose of my life.",
    "I have happy memories of the past.",
    "I am very much satisfied about everything in my life.",
    
    "In general, I feel I am in charge of the situation in which I live.",
    "In most ways my life is close to my ideal.",
    "The conditions of my life are excellent.",
    "So far, I have the important things I want in life.",
    "If I could live my life over, I would change almost nothing.",
    "In many ways, I feel contented about my achievements in life.",
    "I am living the kind of life I wanted to.",
    "I find easy to make decisions.",
    "In my daily life I get a chance to show how capable I am.",
    "I feel positive and creative.",
    "I find I can think quite clearly.",
    "I am quite good at managing responsibilities of my daily life.",
    "For me, life has been a continuous process of learning, changing, and growth.",
    "I feel that I am capable of working hard.",
    "I feel eager to tackle my daily tasks or make new decisions.",
    "I feel I can easily handle or cope with any serious problem.",
    "I think it is important to have new experiences that challenge how you think about yourself and the world.",
    "I take immense interest in other people.",
    "I always keep committed and involved.",
    "I have an adjusting nature and sense of belongingness.",
    "I feel I must do what others expect me to do.",
    "People would describe me as a giving person, willing to share my time with others.",
    "I have a good influence on life.",
    "It is always necessary that others approve of what I do.",
    "Maintaining close relationships gives pleasure to me.",
    "I experience warm and trusting relationships with others.",
    "I believe that people are essentially good and can be trusted.",
    "I remain energetic, active, and vigorous the whole day.",
    "The thought of an accident doesn't affect me.",
    "Tension in life doesn't affect my health.",
    "I have no difficulty sleeping.",
    "I keep myself busy the whole day.",
    "Illness doesn't affect my mental health.",
    "I feel rested when I wake up in the morning.",
    "Talking or thinking about my illness doesn't make any difference to me.",
    "Usually, I don't feel tired, worn out, used up, or exhausted.",
    "Age-related problems are part of life.",
    "Personal relationships give me pleasure.",
    "I enjoy the company of other people.",
    "I enjoy my personal achievements.",
    "I perform useful activities like reading, gardening, etc., in my leisure time.",
    "I have no hesitation in talking to anyone.",
    "I like to do any task at the right place and right time.",
    "I have good relations with relatives and friends.",
    "I feel satisfied by doing religious activities.",
    "I like to watch programs on TV with everyone.",
    "I am always careful about my manner of dress."
  ];
//   mongoose.connect('mongodb+srv://harshvchawla998:hk7lr8ridGifGowr@cluster0.or0hgok.mongodb.net/databaseforapp',
//   { useNewUrlParser: true }).then(() => {
//     console.log('Database connected');
//   }).catch((err) => {
//     console.error('Error connecting to database:', err);
//   });

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204, 
    }
))

// app.use(express.static('./frontendRoles/build'));
// app.get("*" , (req,res)=>{
//   res.sendFile(path.resolve(__dirname,"frontendRoles", "build" , "index.html"));
// })

// app.use(session({
//   secret: 'harsh8247',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false },
//   store:mongoStore.create({
//     mongoUrl:"mongodb://127.0.0.1:27017/roleshiit"
//   }),

// }));
const PORT = process.env.PORT || 3030;
app.use('/v1', router);
const server = app.listen(PORT,'0.0.0.0', () => {
  console.log('Server connected');
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});





