import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import FormInput from "./FormInput";
import { Loader2 } from "lucide-react";

interface LoginCardProps {
  title: string;
  description: string;
}

function LoginCard({ title, description }: LoginCardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password
      });

      const { token, role, username: loggedInUser } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", loggedInUser);

      if (role.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.log("Detail Error:", err.response?.data);
      alert(err.response?.data?.message || "Username atau password salah!");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border-1 border-black shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          {title}
        </h1>

        <p className="text-gray-600 text-center mt-2">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <FormInput
            id="username"
            label="Username"
            type="text"
            name="username"
            value={username}
            placeholder="Student Name"
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading} 
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading} 
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 p-2 rounded transition font-bold text-white 
              ${isLoading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Mohon Tunggu...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Belum Punya Akun?{" "}
          <Link
            to="/register"
            className={`text-blue-600 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginCard;