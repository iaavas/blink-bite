"use client";
import Sidebar from "../components/admin/Sidebar";
import AdminDetails from "../components/admin/AdminDetails";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// context

function Page() {
  const { role } = useAuth();
  const router = useRouter();
  if (role != "ADMIN") router.push("/login");
  return (
    <main className="flex  ">
      <Sidebar />
      <AdminDetails />
    </main>
  );
}

export default Page;
