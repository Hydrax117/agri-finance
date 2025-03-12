import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/user";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else if (
      !isLoading &&
      isAuthenticated &&
      allowedRoles &&
      !allowedRoles.includes(session.user.role as UserRole)
    ) {
      router.push("/unauthorized");
    }
  }, [isLoading, isAuthenticated, router, allowedRoles, session]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role as UserRole)) {
    return null;
  }

  return <>{children}</>;
}
