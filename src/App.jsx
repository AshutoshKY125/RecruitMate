import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CreateProfile from "./pages/candidate/CreateProfile";
import InterviewResults from "./pages/candidate/interviewResults";
import Test1 from "./pages/candidate/Test1";
import Test2 from "./pages/candidate/Test2";
import UploadResume from "./pages/candidate/UploadResume";
import InterviewerDashboard from "./pages/interviewer/interviewerDashboard";
import CandidateProfile from "./pages/interviewer/CandidateProfile";
import FeatureRanking from "./pages/interviewer/FeatureRanking";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Candidate Routes */}
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/candidate/create-profile" element={<CreateProfile />} />
        <Route path="/candidate/results" element={<InterviewResults />} />
        <Route path="/candidate/test1" element={<Test1 />} />
        <Route path="/candidate/test2" element={<Test2 />} />
        <Route path="/candidate/upload-resume" element={<UploadResume />} />

        {/* Interviewer Routes */}
        <Route path="/interviewer" element={<InterviewerDashboard />} />
        <Route path="/interviewer/candidate-profile" element={<CandidateProfile />} />
        <Route path="/interviewer/feature-ranking" element={<FeatureRanking />} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
