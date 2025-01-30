import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gradient-to-b from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to the Plant Manager
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 mb-6">
          Manage your plants, characteristics, and associations efficiently with
          our user-friendly interface. Navigate through the menu to get started!
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/plants">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200">
              Manage Plants
            </button>
          </Link>
          <Link to="/characteristics">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200">
              Manage Characteristics
            </button>
          </Link>
          <Link to="/associations">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200">
              Manage Associations
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
