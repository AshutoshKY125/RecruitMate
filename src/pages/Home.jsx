import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to the Job Portal</h1>
      <p className="text-gray-600 mt-2">Manage interviews, candidates, and jobs effortlessly.</p>
      
      <div className="mt-6 flex space-x-4">
        <Link to="/candidate" className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
          Candidate Dashboard
        </Link>
        <Link to="/interviewer" className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
          Interviewer Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Home;
