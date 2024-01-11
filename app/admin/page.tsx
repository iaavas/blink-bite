"use client";
import Sidebar from "../components/admin/Sidebar";
import AdminDetails from "../components/admin/AdminDetails";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading";

// context

function Page() {
  const { role } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "ADMIN") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [role, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="flex">
      <Sidebar />
      <AdminDetails />
    </main>
  );
}

export default Page;
