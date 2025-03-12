import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRole } from "@/types/user";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user;
  const isAuthenticated = !!user;
  const isLoading = status === "loading";

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }

      if (user?.role === UserRole.FARMER) {
        router.push("/farmer");
      } else if (user?.role === UserRole.LENDER) {
        router.push("/lender");
      } else if (user?.role === UserRole.ADMIN) {
        router.push("/admin");
      }

      return true;
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    phone?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return false;
      }

      // Automatically log in the user after registration
      return await login(userData.email, userData.password);
    } catch {
      setError("An unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    loading,
    error,
    login,
    register,
    logout,
  };
}
