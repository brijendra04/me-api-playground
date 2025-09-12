const mongoose = require('mongoose');
const Profile = require('./models/Profile');
require('dotenv').config({ path: '../.env' });

const seedData = {
  name: "Brijendra Pratap",
  email: "brijendra.developer@gmail.com",
  education: [
    {
      institution: "University of Example",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2020-09-01",
      endDate: "2022-06-30",
      description: "Specialized in AI and Machine Learning."
    },
    {
      institution: "Another University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Software Engineering",
      startDate: "2016-09-01",
      endDate: "2020-05-31",
      description: "Focused on full-stack development."
    }
  ],
  skills: [
    { name: 'JavaScript', proficiency: 'Expert' },
    { name: 'Node.js', proficiency: 'Advanced' },
    { name: 'Express.js', proficiency: 'Advanced' },
    { name: 'MongoDB', proficiency: 'Advanced' },
    { name: 'React', proficiency: 'Advanced' },
    { name: 'Python', proficiency: 'Intermediate' },
    { name: 'Machine Learning', proficiency: 'Beginner' },
    { name: 'AI', proficiency: 'Beginner' }
  ],
  projects: [
    {
      title: "Me-API Playground Backend",
      description: "Developed a robust backend for a personal API playground, featuring user profile management, skill-based project filtering, and a comprehensive search functionality.",
      startDate: "2023-01-01",
      endDate: "2023-03-31",
      links: [
        { name: "GitHub", url: "https://github.com/johndoe/me-api-playground-backend", skill: "Node.js" },
        { name: "API Docs", url: "https://api.johndoe.com/docs", skill: "Express.js" }
      ]
    },
    {
      title: "AI Chatbot",
      description: "Built an intelligent chatbot using natural language processing and machine learning techniques.",
      startDate: "2022-07-01",
      endDate: "2022-12-31",
      links: [
        { name: "GitHub", url: "https://github.com/johndoe/ai-chatbot", skill: "Python" },
        { name: "Demo", url: "https://chatbot.johndoe.com", skill: "AI" }
      ]
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website to showcase my projects and skills.",
      technologies: ["React", "Node.js", "MongoDB", "Express"], // Added technologies
      links: [
        { name: "GitHub", url: "https://github.com/yourusername/portfolio", skill: "Web Development" },
        { name: "Live Demo", url: "https://yourportfolio.com", skill: "Web Development" }
      ]
    },
    {
      title: "E-commerce Platform",
      description: "Developed a full-stack e-commerce platform with user authentication and payment gateway integration.",
      technologies: ["React", "Redux", "Node.js", "Express", "PostgreSQL", "Stripe API"], // Added technologies
      links: [
        { name: "GitHub", url: "https://github.com/yourusername/ecommerce", skill: "Full-stack Development" }
      ]
    }
  ],
  work: [
    {
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      startDate: "2022-07-01",
      endDate: null, // Changed from "Present" to null
      description: "Developed and maintained web applications using Node.js and React."
    },
    {
      company: "Innovate Corp.",
      position: "Junior Developer",
      startDate: "2020-06-01",
      endDate: "2022-06-30",
      description: "Assisted in the development of various software projects."
    }
  ],
  links: [
    { name: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
    { name: "GitHub", url: "https://github.com/johndoe" },
    { name: "Portfolio", url: "https://johndoe.com" }
  ]
};

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected for seeding...');
  return Profile.deleteMany({}); // Clear existing data
})
.then(() => {
  console.log('Existing profiles cleared.');
  return Profile.create(seedData); // Insert new data
})
.then(() => {
  console.log('Database seeded successfully!');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Database seeding failed:', err);
  mongoose.connection.close();
});