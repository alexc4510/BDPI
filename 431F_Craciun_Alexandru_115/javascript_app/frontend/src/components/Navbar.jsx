import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            Plant Manager
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/plants"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Plants
            </Link>
          </li>
          <li>
            <Link
              to="/characteristics"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Characteristics
            </Link>
          </li>
          <li>
            <Link
              to="/associations"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Associations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
