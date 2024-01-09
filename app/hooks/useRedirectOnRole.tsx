import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const useRedirectOnRole = () => {
  const { token, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token && role === "ADMIN") {
      router.push("/admin");
    }

    if (token && role === "USER") {
      router.push("/");
    }
  }, [token, role, router]);
};

export default useRedirectOnRole;
