import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Login Attempt:", { email, password });
    };
  
 
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md w-100 border border-black"
          >
            <h2 className="text-3xl font-semibold mb-6 ">Login</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
    
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-600 text-white   py-3 rounded border-black border hover:bg-black  transition"
            >
              Login
            </button>
          </form>
        </div>
      );
    }
    


export default Login