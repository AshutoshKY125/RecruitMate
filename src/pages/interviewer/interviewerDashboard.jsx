import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Star, User } from 'lucide-react';
import FeatureRanking from './FeatureRanking.jsx';
import CandidateProfile from './CandidateProfile';

function InterviewerDashboard() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <nav className="mt-5 px-2">
          <Link
            to="feature-ranking"
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Star className="mr-3 h-6 w-6" />
            Feature Ranking
          </Link>
          <Link
            to="candidate-profile"
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <User className="mr-3 h-6 w-6" />
            Candidate Profile
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="feature-ranking" element={<FeatureRanking />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
          <Route
            path="/"
            element={
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome, Interviewer!</h2>
                <p className="mt-4 text-gray-600">Please select a section from the sidebar to get started.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default InterviewerDashboard;