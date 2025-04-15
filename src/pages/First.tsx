import { Link } from 'react-router-dom';

function First() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default First