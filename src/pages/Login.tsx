import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"

function Login() {
  const navigate = useNavigate()
    
  const [usernameText, setUsernameText] = useState<string>("")
  const [passwordText, setPasswordText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true)
      await axios.post(
        'https://auth-server-production-90c7.up.railway.app/login',
        { username:usernameText, password:passwordText },
        { withCredentials: true } // Important for cookies!
      )

      setPasswordText("")
      setUsernameText("")
      setLoading(false)

      navigate("/start")

    } catch (err : any) {
      if(err.status == 401){
        alert("Wrong creditentals")
        setLoading(false)

        setPasswordText("")
        setUsernameText("")
      }
      else
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
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <label className="block mb-2 font-medium">Username:</label>
      <input
        type="text"
        value={usernameText}
        onChange={e => setUsernameText(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mb-2 font-medium">Password:</label>
      <input
        type="password"
        value={passwordText}
        onChange={e => setPasswordText(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center"
      >
        {loading ? (
          <img src="/loadingCircle.svg" alt="Loading" className="w-5 h-5" />
        ) : (
          <p>Submit</p>
        )}
      </button>
      <div className="mt-2 text-center mb-4">
        <Link to={"/register"} className="text-black hover:text-blue-700 underline">
          Go to Register
        </Link>
      </div>
    </form>
  </div>
  </>
    )
}

export default Login;