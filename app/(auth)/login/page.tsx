// src/components/forms/LoginForm.tsx

// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Loader2 } from "lucide-react"; // For loading spinner

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/";
//   const error = searchParams.get("error");

//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [formError, setFormError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;

//     setFormData({
//       ...formData,
//       [e.target.name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setFormError("");

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email: formData.email,
//         password: formData.password,
//         callbackUrl,
//       });

//       if (result?.error) {
//         setFormError(
//           result.error === "CredentialsSignin"
//             ? "Invalid email or password"
//             : result.error
//         );
//         setIsLoading(false);
//         return;
//       }

//       if (result?.ok) {
//         router.push(callbackUrl);
//         router.refresh();
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       setFormError("An unexpected error occurred. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-0 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>

//         {(error || formError) && (
//           <div
//             className="rounded-md bg-red-50 p-4"
//             role="alert"
//             aria-live="assertive"
//           >
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-red-400"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">
//                   {formError ||
//                     (error === "CredentialsSignin"
//                       ? "Invalid email or password"
//                       : "An error occurred. Please try again.")}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="you@example.com"
//                 aria-required="true"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="••••••••"
//                 aria-required="true"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="rememberMe"
//                 name="rememberMe"
//                 type="checkbox"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <Link
//                 href="/forgot-password"
//                 className="font-medium text-green-600 hover:text-green-500 transition-colors"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 transition-colors"
//               aria-busy={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Dont have an account?{" "}
//             <Link
//               href="/register"
//               className="font-medium text-green-600 hover:text-green-500 transition-colors"
//             >
//               Register here
//             </Link>
//           </p>
//         </div>

//         <div className="relative mt-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">
//               Or continue with
//             </span>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-3">
//           <button
//             type="button"
//             onClick={() => signIn("google", { callbackUrl })}
//             className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Google
//           </button>
//           <button
//             type="button"
//             onClick={() => signIn("github", { callbackUrl })}
//             className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             GitHub
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { LoginForm } from "@/components/forms/LoginForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | AgriFinance",
  description: "Log in to your AgriFinance account",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    const role = session.user.role;
    if (role === "FARMER") {
      redirect("/farmer");
    } else if (role === "LENDER") {
      redirect("/lender");
    } else if (role === "ADMIN") {
      redirect("/admin");
    }
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your AgriFinance dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
