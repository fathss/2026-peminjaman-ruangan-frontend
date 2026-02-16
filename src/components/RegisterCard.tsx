import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

interface RegisterCardProps {
  title: string;
  description: string;
}

function RegisterCard({ title, description }: RegisterCardProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({
      username,
      email,
      password,
    });
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
            placeholder="user"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
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
            minLength={6}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
            Sudah Punya Akun?{" "}
            <Link
                to="/login"
                className="text-blue-600 hover:underline"
            >
                Login
            </Link>
        </p>


      </div>
    </div>
  );
}

export default RegisterCard;
