import { FormEvent, useState } from 'react';
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'

function Register() {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      await axios.post('https://auth-server-production-90c7.up.railway.app/register', { username, password });
      setLoading(false)
      alert("Successfuly registered")
      navigate("/login") 

    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <>
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label className="block mb-2 font-medium">Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          {loading ? (
            <img src="/loadingCircle.svg" alt="Loading" className="w-5 h-5" />
          ) : (
            <p>Register</p>
          )}
        </button>
        <div className="mt-2 text-center mb-4">
          <Link to={"/login"} className="text-black hover:text-green-600 underline">
            Go to Login
          </Link>
      </div>
      </form>
    </div>
  </>
  )
}

export default Register;