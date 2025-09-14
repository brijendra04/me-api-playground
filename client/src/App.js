import React, { useEffect, useState } from 'react';

function App() {
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://me-api-backend-57hv.onrender.com/profile')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProfile(data);
        setFilteredProjects(data.projects);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (profile) {
      const fetchProjects = async () => {
        try {
          const response = await fetch(`https://me-api-backend-57hv.onrender.com/profile/projects/technology?tech=${searchTerm}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFilteredProjects(data);
        } catch (error) {
          console.error("Error fetching filtered projects:", error);
          setError(error);
        }
      };

      fetchProjects();
    }
  }, [searchTerm, profile]);


  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error.message}</div>;
  }

  if (!profile) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', lineHeight: '1.6' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', marginBottom: '5px' }}>{profile.name}</h1>
        <p style={{ color: '#555', fontSize: '1.1em' }}>{profile.email}</p>
        <p style={{ color: '#666' }}>{profile.bio}</p>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Skills</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {profile.skills.map((skill, index) => (
            <li key={index} style={{ background: '#f0f0f0', padding: '8px 12px', borderRadius: '5px', fontSize: '0.9em' }}>
              {skill.name} ({skill.proficiency})
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Projects</h2>
        <input
          type="text"
          placeholder="Search projects by technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredProjects.map((project, index) => (
            <div key={index} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#007bff', marginTop: '0' }}>{project.title}</h3>
              <p style={{ fontSize: '0.9em', color: '#555' }}>{project.description}</p>
              <p style={{ fontSize: '0.8em', color: '#777' }}>
                <strong>Technologies:</strong> {project.technologies.join(', ')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                {project.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '5px' }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
