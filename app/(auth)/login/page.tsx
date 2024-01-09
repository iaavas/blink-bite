"use client";
import Footer from "@/app/components/ui/Footer";
import Nav from "@/app/components/ui/Nav";
import React, { useState } from "react";
import { URL } from "@/constants/constant";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/components/ui/Loading";
import { useRouter } from "next/navigation";
import { handleErrors } from "@/lib/utils";
import useRedirectOnRole from "@/app/hooks/useRedirectOnRole";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, addRole } = useAuth();
  console.log("object");
  console.log(process.env.NODE_ENV);

  useRedirectOnRole();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!email || !password) return;

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

      if (res.status == 200) {
        toast.success("Logged In", { position: "top-center" });
        const data = await res.json();

        login(data.user.token);
        addRole(data.user.role);

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
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-sm font-urban tracking-wider"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLoading ? (
            <button
              type="submit"
              className="w-full bg-blue-200 text-black uppercase font py-2 px-4 rounded-sm font-urabn hover:bg-blue-300 focus:outline-none focus:shadow-outline-indigo font-urban tracking-wider"
            >
              Login
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
