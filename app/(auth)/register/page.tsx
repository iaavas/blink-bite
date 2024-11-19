"use client";
import Footer from "@/app/components/ui/Footer";
import Loading from "@/app/components/ui/Loading";
import Nav from "@/app/components/ui/Nav";
import { useAuth } from "@/app/context/AuthContext";
import usegreenirectOnRole from "@/app/hooks/useRedirectOnRole";
import { URL } from "@/constants/constant";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, addRole } = useAuth();
  usegreenirectOnRole();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!email || !password || !confirmPassword) {
        toast.error("Please fill in all fields and ensure passwords match", {
          position: "top-center",
        });
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Confirm Password and Passwords must be equal", {
          position: "top-center",
        });
        return;
      }

      setIsLoading(true);

      const formBody = {
        user: {
          email,
          password,
          username: userName,
        },
      };


      

      const res = await fetch(`${URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });

      if (res.status === 200) {
        toast.success("Registered Successfully", { position: "top-center" });
        const data = await res.json();

        login(data.user.token);
        addRole("USER");
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
        <ToastContainer/>
      <Nav />

      <div className="flex flex-col items-center justify-center px-6 py-12 mt-8">
        <form
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Register</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 font-medium"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 font-medium"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 font-medium"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 font-medium"
            />
          </div>

          {!isLoading ? (
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none transition duration-300"
            >
              Register
            </button>
          ) : (
            <div className="flex justify-center mt-4">
              <Loading />
            </div>
          )}

          <div className="mt-6 text-center">
            <span className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-500 font-semibold hover:underline"
              >
                Login Here.
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
