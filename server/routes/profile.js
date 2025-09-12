const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET all profiles (or a single profile if exists)
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (profiles.length === 0) {
      console.warn('No profiles found in the database.'); // Added logging
      return res.status(404).json({ message: 'No profile found. Please create one.' });
    }
    // Assuming only one profile for this application
    console.log('Profile data fetched successfully:', profiles[0]); // Added logging
    res.json(profiles[0]);
  } catch (err) {
    console.error('Error fetching profile:', err); // Enhanced error logging
    res.status(500).json({ message: err.message, error: err }); // Include error object for more details
  }
});

// CREATE a profile
router.post('/', async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    email: req.body.email,
    education: req.body.education,
    skills: req.body.skills,
    projects: req.body.projects,
    work: req.body.work,
    links: req.body.links,
  });

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a profile
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Cannot find profile' });
    }

    if (req.body.name != null) {
      profile.name = req.body.name;
    }
    if (req.body.email != null) {
      profile.email = req.body.email;
    }
    if (req.body.education != null) {
      profile.education = req.body.education;
    }
    if (req.body.skills != null) {
      profile.skills = req.body.skills;
    }
    if (req.body.projects != null) {
      profile.projects = req.body.projects;
    }
    if (req.body.work != null) {
      profile.work = req.body.work;
    }
    if (req.body.links != null) {
      profile.links = req.body.links;
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a profile
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Cannot find profile' });
    }
    await profile.remove();
    res.json({ message: 'Deleted Profile' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET projects by skill
router.get('/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    const profiles = await Profile.find();
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profile found.' });
    }
    const profile = profiles[0];
    let filteredProjects = profile.projects;

    if (skill) {
      filteredProjects = filteredProjects.filter(project =>
        project.links.some(link => link.skill && link.skill.toLowerCase() === skill.toLowerCase())
      );
    }
    res.json(filteredProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET projects by technology
router.get('/projects/technology', async (req, res) => {
  try {
    const { tech } = req.query;
    const profiles = await Profile.find();
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profile found.' });
    }
    const profile = profiles[0];
    let filteredProjects = profile.projects;

    if (tech) {
      const lowercasedTech = tech.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.technologies.some(technology => technology.toLowerCase().includes(lowercasedTech)) ||
        project.links.some(link => link.skill && link.skill.toLowerCase().includes(lowercasedTech))
      );
    }
    res.json(filteredProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all unique skills
router.get('/skills/top', async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profile found.' });
    }
    const profile = profiles[0];
    const uniqueSkills = [...new Set(profile.skills)];
    res.json(uniqueSkills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEARCH profile data
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const profiles = await Profile.find();
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profile found.' });
    }
    const profile = profiles[0];

    if (!q) {
      return res.json(profile);
    }

    const searchTerm = q.toLowerCase();
    const results = {};

    // Search in name and email
    if (profile.name.toLowerCase().includes(searchTerm)) {
      results.name = profile.name;
    }
    if (profile.email.toLowerCase().includes(searchTerm)) {
      results.email = profile.email;
    }

    // Search in skills
    results.skills = profile.skills.filter(skill =>
      skill.toLowerCase().includes(searchTerm)
    );

    // Search in projects
    results.projects = profile.projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm)
    );

    // Search in work experience
    results.work = profile.work.filter(job =>
      job.company.toLowerCase().includes(searchTerm) ||
      job.position.toLowerCase().includes(searchTerm) ||
      (job.description && job.description.toLowerCase().includes(searchTerm))
    );

    // Search in education
    results.education = profile.education.filter(edu =>
      edu.institution.toLowerCase().includes(searchTerm) ||
      edu.degree.toLowerCase().includes(searchTerm) ||
      edu.fieldOfStudy.toLowerCase().includes(searchTerm)
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;