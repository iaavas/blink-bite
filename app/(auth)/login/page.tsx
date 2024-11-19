"use client";
import Footer from "@/app/components/ui/Footer";
import Nav from "@/app/components/ui/Nav";
import React, { useState } from "react";
import { URL } from "@/constants/constant";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/components/ui/Loading";
import { useRouter } from "next/navigation";
import usegreenirectOnRole from "@/app/hooks/useRedirectOnRole";
import Link from "next/link";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, addRole } = useAuth();
  usegreenirectOnRole();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!email || !password) {
        toast.error("Please fill in all fields.", { position: "top-center" });
        return;
      }

      setIsLoading(true);

      const formBody = {
        user: {
          email,
          password,
        },
      };

      const res = await fetch(`${URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });

      if (res.status === 200) {
        toast.success("Logged In", { position: "top-center" });
        const data = await res.json();

        login(data.user.token);
        addRole(data.user.role);
      } else {
        const data = await res.json();
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { position: "top-center" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      <div className="flex flex-col items-center justify-center px-6 py-12 mt-8">
        <form
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">Login</h2>

          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 ease-in"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 ease-in"
            />
          </div>

          {!isLoading ? (
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none transition duration-300"
            >
              Login
            </button>
          ) : (
            <div className="flex justify-center mt-4">
              <Loading />
            </div>
          )}

          <div className="mt-6 text-center">
            <span className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-green-500 font-semibold hover:underline"
              >
                Register here
              </Link>
            </span>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
