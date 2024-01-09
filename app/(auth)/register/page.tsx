"use client";
import Footer from "@/app/components/ui/Footer";
import Loading from "@/app/components/ui/Loading";
import Nav from "@/app/components/ui/Nav";
import { useAuth } from "@/app/context/AuthContext";
import useRedirectOnRole from "@/app/hooks/useRedirectOnRole";
import { URL } from "@/constants/constant";
import { handleErrors } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Page() {
  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, addRole } = useAuth();

  useRedirectOnRole();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!email || !password || !password || !confirmPassword) {
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

        setIsLoading(false);
      } else {
        const data = await res.json();
        handleErrors(data.errors);

        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { position: "top-center" });
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="flex flex-col items-center  justify-center p-6 mt-8 sm:ml-8">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
            />
          </div>
          {!isLoading ? (
            <button
              type="submit"
              className="w-full bg-blue-200 text-black uppercase font py-2 px-4 rounded-sm font-urabn hover:bg-blue-300 focus:outline-none focus:shadow-outline-indigo font-urban tracking-wider"
            >
              Register
            </button>
          ) : (
            <Loading />
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
