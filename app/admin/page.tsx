"use client";
import Sidebar from "../components/admin/Sidebar";
import AdminDetails from "../components/admin/AdminDetails";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// context

function Page() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(
    function () {
      if (role != "ADMIN") router.push("/login");
    },
    [role, router]
  );

  return (
    <main className="flex  ">
      <Sidebar />
      <AdminDetails />
    </main>
  );
}

export default Page;
