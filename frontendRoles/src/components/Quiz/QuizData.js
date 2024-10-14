import anxietyImage from "./quiz1.jpg";
import depressionImage from "./quiz2.jpg";
import perfectionimage from "./quiz3.jpg";
const QuizData = {
  quizzes: [
    {
      id: "depression1",
      name: "Depression Quiz",
      image: depressionImage,
      questions: [
        {
          question:
            "Are you facing trouble concentrating on things, such as reading books or remembering things?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question:
            "Has there been a change in your appetite - are you eating too much or too less?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question: "Have you been feeling tired or facing a lack of energy?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question:
            "Are you having problems with sleep - trouble falling asleep, or staying asleep, or sleeping a lot?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question:
            "Have you been fidgety or restless and moving too much or the opposite, moving or speaking too slowly?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question: "Has your interest or pleasure in doing things reduced?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question:
            "Have you been feeling down, having a low mood, or feeling hopeless?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question:
            "Have you feeling bad about yourself or that you are a failure or have let yourself or your family down?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
        {
          question:
            "Have you ever thought of hurting yourself or thought that you would be better off dead?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "More than half of time", score: 2 },
            { text: "Almost always", score: 3 },
          ],
        },
      ],
      scoring: {
        "0-4": `
          <h2 style="font-size: 20px; font-weight: 600">No Depression</h2>
          <p style="font-size: 17px">
            Based on your responses, you are not showing significant signs of depression. 
            It's great that you're feeling mentally well! 
          </p>
           <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
            <li>If you ever feel overwhelmed or notice changes in your mental health, don't hesitate to reach out for support.</li>
            <li>Maintaining a healthy lifestyle, including regular exercise, good sleep, and a balanced diet, can help keep you on track.</li>
          </ul>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/stress/5-pillars-of-mindful-awareness-that-transformed-my-life" style="color: #1d4ed8; text-decoration: underline;">5 Pillars of Mindful Awareness That Transformed My Life</a>
          </p>
        `,
        "5-9": `
          <h2 style="font-size: 20px; font-weight: 600">Mild Depression</h2>
          <p style="font-size: 17px">
            Your score indicates mild symptoms of depression. 
            This might mean you're experiencing occasional low mood or lack of motivation, but these symptoms may not be affecting your daily life significantly. 
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">  
            <li>Keep monitoring your feelings, and consider making small changes like regular physical activity, mindfulness practices, or talking to a friend.</li>
            <li>If these symptoms persist, it may be helpful to seek guidance from a mental health professional for early support.</li>
          </ul>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/stress/5-pillars-of-mindful-awareness-that-transformed-my-life" style="color: #1d4ed8; text-decoration: underline;">5 Pillars of Mindful Awareness That Transformed My Life</a>
          </p>
        `,
        "10-14": `
          <h2 style="font-size: 20px; font-weight: 600">Moderate Depression</h2>
          <p style="font-size: 17px">
            Your score suggests moderate symptoms of depression. 
            These feelings might be affecting your ability to function in certain areas of life. 
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
          <li>It's important to take action now to prevent these symptoms from worsening.</li>
          <li>We recommend scheduling a consultation with a psychiatrist or mental health professional who can help you explore treatment options such as therapy or lifestyle adjustments. 
            Early intervention can make a significant difference.</li>
          </ul>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/stress/4-fears-that-create-people-pleasers-and-how-to-ease-them" style="color: #1d4ed8; text-decoration: underline;">4 Fears That Create People-Pleasers and How to Ease Them</a>
          </p>
        `,
        "15-19": `
          <h2 style="font-size: 20px; font-weight: 600">Moderately Severe Depression</h2>
          <p style="font-size: 17px">
            Your score indicates moderately severe symptoms of depression. 
            It is likely that these feelings are making everyday tasks challenging and reducing your overall quality of life.
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
            <li>Seeking professional support is highly recommended at this stage.</li>
            <li>Treatment such as Cognitive Behavioral Therapy (CBT), medication, or a combination of both can help you manage these symptoms effectively.</li>
          </ul>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/stress/4-fears-that-create-people-pleasers-and-how-to-ease-them" style="color: #1d4ed8; text-decoration: underline;">4 Fears That Create People-Pleasers and How to Ease Them</a>
          </p>
        `,
        "20-27": `
          <h2 style="font-size: 20px; font-weight: 600">Severe Depression</h2>
          <p style="font-size: 17px">
            Your responses indicate severe symptoms of depression. 
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
          <li>It's essential that you seek professional help immediately.</li> 
          <li>Treatment options such as therapy and antidepressants can significantly improve your condition.</li>
          <li>A psychiatrist can offer personalized guidance to help you regain control of your mental health.</li> 
          <p style="font-size: 17px">Remember, help is available, and taking the first step by seeking support is vital.</p>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/personal-growth-&-recovery/how-i-created-a-beautiful-life-on-the-other-side-of-burnout" style="color: #1d4ed8; text-decoration: underline;">How I Created a Beautiful Life on the Other Side of Burnout</a>
          </p>
        `,
      },
    },
    {
      id: "anxiety1",
      name: "Anxiety Quiz",
      image: anxietyImage,
      questions: [
        {
          question: "Have you been feeling very nervous or on edge?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
        {
          question: "Have you been able to stop or control your worries?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
        {
          question:
            "Have you been worrying too much about different things or feeling as if something bad is going to happen?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
        {
          question:
            "Have you been facing trouble relaxing or finding it hard to sit still?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
        {
          question: "Have you been irritable or easily annoyed?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
        {
          question: "Becoming easily annoyed or irritable",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
        {
          question: "Feeling afraid, as if something awful might happen",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 },
          ],
        },
      ],
      scoring: {
        "0-4": `
        <h2 style="font-size: 20px; font-weight: 600">Minimal Anxiety</h2>
        <p style="font-size: 17px">
          Your responses suggest minimal or no significant symptoms of anxiety. This is a positive sign, and it's great that anxiety is not affecting your daily life.
        </p>
         <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
          <li>Keep practicing healthy habits like regular exercise, a balanced diet, and stress management techniques to maintain your well-being.</li>
          <li>Should you ever feel an increase in anxiety, don't hesitate to seek support or revisit these self-assessments.</li>
        </ul>
        <p style="font-size: 15px; margin-top: 15px;">
          Recommended Reading: 
          <a href="/blogs/anxiety/the-amazing-healing-power-of-talking-about-our-anxiety" style="color: #1d4ed8; text-decoration: underline;">The Amazing Healing Power of Talking About Our Anxiety</a>
        </p>
      `,
        "5-9": `
        <h2 style="font-size: 20px; font-weight: 600">Mild Anxiety</h2>
        <p style="font-size: 17px">
          Your score indicates mild symptoms of anxiety. You may notice occasional feelings of worry, restlessness, or nervousness, but they likely aren't severely impacting your daily life.
        </p>
         <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
          <li>It's important to keep an eye on these feelings and adopt stress-reducing activities like mindfulness, relaxation techniques, or physical activity.</li>
          <li>If these symptoms persist or worsen, consider seeking advice from a mental health professional to manage them early on.</li>
        </ul>
        <p style="font-size: 15px; margin-top: 15px;">
          Recommended Reading: 
          <a href="/blogs/anxiety/the-amazing-healing-power-of-talking-about-our-anxiety" style="color: #1d4ed8; text-decoration: underline;">The Amazing Healing Power of Talking About Our Anxiety</a>
        </p>
      `,
        "10-14": `
        <h2 style="font-size: 20px; font-weight: 600">Moderate Anxiety</h2>
        <p style="font-size: 17px">
        Your responses suggest moderate anxiety. These feelings of worry and tension may be affecting your ability to concentrate, sleep, or complete daily tasks.
        </p>
         <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
          <li>It's a good time to seek help from a mental health professional who can guide you through strategies like Cognitive Behavioral Therapy (CBT), relaxation exercises, or lifestyle changes.</li>
          <li>Early intervention can prevent these symptoms from becoming more severe.</li>
        </ul>
        <p style="font-size: 15px; margin-top: 15px;">
          Recommended Reading: 
          <a href="/blogs/anxiety/managing-anxiety" style="color: #1d4ed8; text-decoration: underline;">Managing Anxiety</a>
        </p>
      `,
        "15-21": `
        <h2 style="font-size: 20px; font-weight: 600">Severe Anxiety</h2>
        <p style="font-size: 17px">
          Your score indicates severe anxiety, which may be significantly impacting your quality of life. These symptoms could include constant worry, physical symptoms like headaches or heart palpitations, and difficulty managing everyday activities. 
        </p>
         <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
          <li>It is highly recommended that you consult a psychiatrist or therapist as soon as possible.</li>
          <li>Treatment options, including therapy and possibly medication, can help you regain control of your anxiety and improve your overall well-being.</li>
        </ul>
        <p style="font-size: 15px; margin-top: 15px;">
          Recommended Reading: 
          <a href="/blogs/anxiety/managing-anxiety" style="color: #1d4ed8; text-decoration: underline;">Managing Anxiety</a>
        </p>
      `,
      },
    },
    {
      id: "perfectionism1",
      name: "Perfectionism Test",
      image: perfectionimage,
      questions: [
        {
          question: "I often think that I should’ve done better than I did.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question:
            "I tend to put things off if I don’t have the time to do them perfectly.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I'm afraid to fail when working on an important project.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question:
            "I strive to impress others with my best qualities or accomplishments.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I think less of myself if I repeat a mistake.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I strive to maintain control of my emotions at all times.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I get upset when things don’t go as planned.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question:
            "I am often disappointed in the quality of other people's work.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I feel that my standards couldn't be too high.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I'm afraid that people will think less of me if I fail.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I'm constantly trying to improve myself.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I'm unhappy if anything I do is considered average.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "My home and office need to be clean and orderly always.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question:
            "I feel inferior to others who are more intelligent, attractive, or successful than I.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
        {
          question: "I must look my very best whenever I'm out in public.",
          options: [
            { text: "Yes", score: 1 },
            { text: "No", score: 0 },
          ],
        },
      ],
      scoring: {
        "0-4": `
          <h2 style="font-size: 20px; font-weight: 600">No Significant Perfectionism Issues</h2>
          <p style="font-size: 17px">
            Your responses suggest that perfectionism is not a significant issue for you. 
            You seem to maintain a healthy balance and have realistic expectations for yourself and others.
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
            <li>Continue practicing self-acceptance and be mindful of your achievements without overly high standards.</li>
            <li>Maintaining flexibility and adaptability can help sustain this positive outlook.</li>
          </ul>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/personal-growth-&-recovery/how-i-created-a-beautiful-life-on-the-other-side-of-burnout" style="color: #1d4ed8; text-decoration: underline;">How I Created a Beautiful Life on the Other Side of Burnout</a>
          </p>
        `,
        "5-15": `
          <h2 style="font-size: 20px; font-weight: 600">Potential Problem with Perfectionism</h2>
          <p style="font-size: 17px">
            Your score indicates a tendency toward perfectionism. 
            This might mean you set very high standards for yourself or others, and you may experience stress, frustration, or dissatisfaction when these standards aren't met.
          </p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 17px;">
            <li>It is important to recognize when your standards are becoming unrealistic or harmful. Consider setting more achievable goals and learning to appreciate your progress.</li>
            <li>Practices such as mindfulness, self-compassion, and cognitive behavioral strategies can help manage these tendencies.</li>
            <li>If perfectionism is causing significant distress or interfering with your daily life, seeking support from a mental health professional might be beneficial.</li>
          </ul>
          <p style="font-size: 15px; margin-top: 15px;">
            Recommended Reading: 
            <a href="/blogs/personal-growth-&-recovery/how-i-created-a-beautiful-life-on-the-other-side-of-burnout" style="color: #1d4ed8; text-decoration: underline;">How I Created a Beautiful Life on the Other Side of Burnout</a>
          </p>
        `,
      },
    },
  ],
};

export default QuizData;
