import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  ClipboardCheck,
  FileText,
  BarChart as ChartBar,
  Upload,
  UserCircle,
} from "lucide-react";
import Test1 from "./Test1";
import Test2 from "./Test2";
import InterviewResults from "./interviewResults";
import UploadResume from "./UploadResume";
import CreateProfile from "./CreateProfile";

function candidateNavbar() {
  const navItems = [
    { path: "test1", name: "Test 1", icon: ClipboardCheck },
    { path: "test2", name: "Test 2", icon: FileText },
    { path: "results", name: "Interview Results", icon: ChartBar },
    { path: "upload-resume", name: "Upload Resume", icon: Upload },
    { path: "create-profile", name: "Create Profile", icon: UserCircle },
  ];
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <Routes>
          <Route path="test1" element={<Test1 />} />
          <Route path="test2" element={<Test2 />} />
          <Route path="results" element={<InterviewResults />} />
          <Route path="upload-resume" element={<UploadResume />} />
          <Route path="create-profile" element={<CreateProfile />} />
        </Routes>
      </div>
    </div>
  );
}
export default candidateNavbar;
