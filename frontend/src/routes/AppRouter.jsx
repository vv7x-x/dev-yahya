import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import AI from './AI';
import CV from './CV';
import GithubOpenSource from './GithubOpenSource';
import AdminDashboard from './AdminDashboard';

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<div className="text-neon text-center mt-20">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/github" element={<GithubOpenSource />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
