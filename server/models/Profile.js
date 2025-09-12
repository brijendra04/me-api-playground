const mongoose = require('mongoose');

// Define nested schemas first
const LinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  skill: { type: String }, // Optional: to associate a link with a specific skill
});

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  links: [LinkSchema],
});

const WorkExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

// Now define the main ProfileSchema
const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  education: [EducationSchema],
  skills: [SkillSchema],
  projects: [ProjectSchema],
  work: [WorkExperienceSchema],
  links: [LinkSchema],
});

module.exports = mongoose.model('Profile', ProfileSchema);