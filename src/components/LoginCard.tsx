import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

interface LoginCardProps {
    title: string;
    description: string;
}

function LoginCard({ title, description }: LoginCardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ username, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border-1 border-black shadow-lg rounded-lg p-6">

        <h1 className="text-3xl font-bold text-blue-600 text-center">
          {title}
        </h1>

        <p className="text-gray-600 text-center mt-2">
          {description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-6"
        >
          <FormInput
            id="username"
            label="Username"
            type="text"
            name="username"
            value={username}
            placeholder="Student Name"
            onChange={(e) => setUsername(e.target.value)}
            required
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
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
          >
            Submit
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
            Belum Punya Akun?{" "}
            <Link
                to="/register"
                className="text-blue-600 hover:underline"
            >
                Daftar
            </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginCard