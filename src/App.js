import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SphereWithCharacter from './components/SphereWithCharacter';
import ProfilePage from './profil/ProfilePage';
import ProjectsPage from './project/projectPage';
import ProjectDetails from './project_details/ProjectDetails';
import HomePage from './homepage/HomePage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sphere" element={<SphereWithCharacter />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectName" element={<ProjectDetails />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
