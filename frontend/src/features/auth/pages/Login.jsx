import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
export default function Login() {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary-foreground">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            Sign in to TalentUp
          </h1>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email address
              </label>

              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                className="w-full rounded-md border border-input bg-input px-3 py-2 text-sm outline-none transition-colors focus:border-ring"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>

                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-input bg-input px-3 py-2 text-sm outline-none transition-colors focus:border-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 cursor-pointer text-sm font-medium text-primary-foreground transition-opacity  hover:opacity-90"
            >
              Login
            </button>
          </form>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-4 text-center text-sm text-muted-foreground">
          New to TalentUp?{" "}
          <Link to={"/register"} className="text-primary hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
