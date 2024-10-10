const blogData = [
    {
      category: 'Stress',
      blogs: [
        { title: 'Stress Management Techniques', image: 'https://img.freepik.com/free-vector/businessman-meditating-office_74855-2352.jpg?t=st=1728582557~exp=1728586157~hmac=2b5f1c352b8228ff3d41ecda00e41785307ca379b497c817a988ea9ea3c7c93a&w=826' },
        { title: 'How to Handle Work Stress', image: 'https://img.freepik.com/free-vector/business-woman-is-holding-her-hair-stress-work-hand-drawn-style-vector-design-illustrations_1150-39771.jpg?t=st=1728582632~exp=1728586232~hmac=c6d20688dd0e4c841084f93ca1edf27b72f191781c9257017d639c044b3a417a&w=996' },
        { title: 'The Impact of Stress on Health', image: 'https://img.freepik.com/free-vector/people-with-depression-unhappiness_53876-66178.jpg?t=st=1728582689~exp=1728586289~hmac=b104320899ee2cf392378a9d70b89bc67d85e932e99797082b6903d761ba24f8&w=900' },
        { title: 'Reducing Stress with Meditation', image: 'https://img.freepik.com/free-vector/flat-man-sits-lotus-position-practicing-mindfulness-meditation-worker-doing-yoga-workplace_88138-510.jpg?t=st=1728582731~exp=1728586331~hmac=fbd1944789336ee8bbfa823238943358f8a009931c70f77a48a23b1ca7fbb713&w=826' },
      ],
    },
    {
      category: 'Anxiety',
      blogs: [
        { title: 'Understanding Anxiety Disorders', image: 'https://img.freepik.com/free-vector/composition-with-three-characters-discouraged-drug-addicts-backstreet-scenery-illustration_1284-63500.jpg?t=st=1728582954~exp=1728586554~hmac=0bbcb2afda6f100393a69b7d01392225185a35768b1bf3ddcd7f2f1cd6d7d736&w=1060' },
        { title: 'Tips to Reduce Anxiety', image: 'https://img.freepik.com/free-vector/hand-drawn-adhd-illustration_23-2149372712.jpg?t=st=1728582997~exp=1728586597~hmac=97676e81dd627061c3dccb9626c91ca8e4697ca408c2dd0b500e6d46bdb2f8c5&w=740' },
        { title: 'The Role of Therapy in Anxiety', image: 'https://img.freepik.com/free-vector/woman-crying-therapy-session_74855-17143.jpg?t=st=1728583034~exp=1728586634~hmac=a07aedb79627facba8a499f94bed4989f647657c590b7d14b9583af0a147b09e&w=1060' },
        { title: 'Anxiety and Lifestyle Changes', image: 'https://img.freepik.com/free-vector/introversion-agoraphobia-public-spaces-phobia-mental-illness-stress-social-anxiety-disorder-anxiety-screening-test-anxiety-attack-concept_335657-687.jpg?t=st=1728583068~exp=1728586668~hmac=e79b5aaf2afa73279f8d19433b42688f87a421deebadd68ca91a664c764c140d&w=996' },
      ],
    },
    {
      category: 'Depression',
      blogs: [
        { title: 'Signs of Depression', image: 'https://img.freepik.com/free-vector/spooky-hands-creeping-towards-sad-girl-sitting-floor-depressed-teenager-scared-abuse-flat-vector-illustration-fear-bullying-violence-concept-banner-website-design-landing-web-page_74855-25302.jpg?t=st=1728583406~exp=1728587006~hmac=04760287da65d1bdfa6c378526d6e9cdd7c2e63c8ff890389f6d10f056266d53&w=900' },
        { title: 'How to Support Someone with Depression', image: 'https://img.freepik.com/free-vector/woman-comforting-depressed-friend-giving-support-upset-mate-flat-vector-illustration-friendship-depression-help_74855-13285.jpg?t=st=1728583452~exp=1728587052~hmac=65ced91f5ec16c50aa40db786778bdcc3c22da094db972aef629170d22360de0&w=996' },
        { title: 'Depression Treatment Options', image: 'https://img.freepik.com/free-vector/psychologist-sitting-front-patient-with-mental-disorder-psychiatrist-session-flat-vector-illustration-health-care-psychological-service-concept-banner-website-design-landing-web-page_74855-22021.jpg?t=st=1728583530~exp=1728587130~hmac=c79c6e1df56ed25b1f7edb0b404d1ae594d51b014ced10dd8c2818863417ee0f&w=996' },
        { title: 'Managing Depression Through Exercise', image: 'https://img.freepik.com/free-vector/training-home-concept_23-2148497137.jpg?t=st=1728583559~exp=1728587159~hmac=4661714a0fd847064ffb85b6b5f62192b7b8f3aae6a284c494562456b49d7058&w=996' },
      ],
    },
    {
      category: 'Sleep',
      blogs: [
        { title: 'The Importance of Sleep', image: 'https://img.freepik.com/free-vector/peaceful-man-sleeping-bedroom-resting-bed-dreaming-space-cartoon-illustration_74855-14477.jpg?t=st=1728583598~exp=1728587198~hmac=edd6aa8b5d2749362c6bd25f52c41a7dc21ec59f1a517931c10b6aeb45853293&w=996' },
        { title: 'Tips for Better Sleep', image: 'https://img.freepik.com/free-vector/insomnia-causes-illustration-concept_23-2148647086.jpg?t=st=1728583634~exp=1728587234~hmac=aabcd5a9532685dd77910c54b0997256e19e6e99c509c34f6f4e9ac7ddd38796&w=996' },
        { title: 'How to Create a Sleep Routine', image: 'https://img.freepik.com/free-vector/circadian-rhythm-concept-with-tiny-woman-human-biological-clock-regulate-sleep-wake-day-night-cycle-routine-morning-evening-changes-planet-movement-around-sun-body-natural-daily-rhythms_88138-740.jpg?t=st=1728583660~exp=1728587260~hmac=23b10b9ce5b636d6a08399194a11bba820eb95a896f23d8f1d833894233bd014&w=996' },
        { title: 'Sleep Disorders and Their Treatment', image: 'https://img.freepik.com/free-vector/insomnia-concept-illustration_23-2148659568.jpg?t=st=1728583698~exp=1728587298~hmac=5fb63b0e181e42b12b71dd3b70b530f492a6db44dbb6e0a562bd144824799a4b&w=826' },
      ],
    },
  ];
  
  // const featuredBlogs = [
  //   { title: 'The world\'s first fitness influencer was a Victorian strongman', image: 'https://via.placeholder.com/300' },
  //   { title: 'Needs to Rename the James Webb Space Telescope', image: 'https://via.placeholder.com/150' },
  //   { title: 'These striking photos capture the future of human flight', image: 'https://via.placeholder.com/150' },
  // ];
  
  export { blogData };
  