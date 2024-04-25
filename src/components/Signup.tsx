import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../config";
import Logo from "../../assets/Logo.png";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorList, setErrorList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/signup`, formData);
      console.log("Success:", response.data);
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errors: string[] = Object.values<string[]>(
          error.response.data.errors
        ).flat();
        setErrorList(errors);
      } else {
        setErrorList(["An unexpected error occurred."]);
      }
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2E1A47] to-white">
      <div className="w-full max-w-md px-6 py-8 mx-auto">
        <div className="flex items-center mb-6 text-3xl font-semibold text-white">
          <img className="w-24 h-24 mr-2" src={Logo} alt="11th planet logo" />
          <span>11th Planet Jiu Jitsu</span>
        </div>
        <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up for an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2E1A47] focus:border-[#2E1A47] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2E1A47] focus:border-[#2E1A47] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2E1A47] focus:border-[#2E1A47] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2E1A47] focus:border-[#2E1A47] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errorList.length > 0 && (
                <div
                  className="p-4 mb-4 flex items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-medium">
                      Please fix the following errors:
                    </span>
                    <ul className="mt-1.5 list-disc list-inside">
                      {errorList.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-[#2E1A47] hover:bg-[#3c2355] focus:ring-4 focus:outline-none focus:ring-[#2E1A47] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2E1A47] dark:hover:bg-[#3c2355] dark:focus:ring-primary-800"
              >
                {isLoading ? "Signing Up..." : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#2E1A47] hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
