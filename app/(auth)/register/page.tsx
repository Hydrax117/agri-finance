// src/components/forms/RegisterForm.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Loader2, Check, AlertCircle } from "lucide-react";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formError, setFormError] = useState("");
//   const [formSuccess, setFormSuccess] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "farmer", // Default role
//     agreeToTerms: false,
//     firstName: "",
//     lastName: "",
//   });

//   // Password strength state
//   const [passwordStrength, setPasswordStrength] = useState({
//     score: 0,
//     message: "",
//   });

//   // Check password strength
//   useEffect(() => {
//     if (formData.password) {
//       const hasLowercase = /[a-z]/.test(formData.password);
//       const hasUppercase = /[A-Z]/.test(formData.password);
//       const hasNumber = /\d/.test(formData.password);
//       const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
//       const isLongEnough = formData.password.length >= 8;

//       let score = 0;
//       if (hasLowercase) score++;
//       if (hasUppercase) score++;
//       if (hasNumber) score++;
//       if (hasSpecialChar) score++;
//       if (isLongEnough) score++;

//       let message = "";
//       if (score < 3) message = "Weak";
//       else if (score < 5) message = "Medium";
//       else message = "Strong";

//       setPasswordStrength({ score, message });
//     } else {
//       setPasswordStrength({ score: 0, message: "" });
//     }
//   }, [formData.password]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const value =
//       e.target.type === "checkbox"
//         ? (e.target as HTMLInputElement).checked
//         : e.target.value;

//     setFormData({
//       ...formData,
//       [e.target.name]: value,
//     });
//   };

//   const validateForm = () => {
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setFormError("Please enter a valid email address");
//       return false;
//     }

//     // Password validation
//     if (formData.password.length < 8) {
//       setFormError("Password must be at least 8 characters long");
//       return false;
//     }

//     // Confirm password
//     if (formData.password !== formData.confirmPassword) {
//       setFormError("Passwords do not match");
//       return false;
//     }

//     // Terms agreement
//     if (!formData.agreeToTerms) {
//       setFormError("You must agree to the terms and conditions");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setFormError("");
//     setFormSuccess("");

//     // Validate form
//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setFormError(data.error || "Registration failed");
//         setIsLoading(false);
//         return;
//       }

//       // Registration successful
//       setFormSuccess("Account created successfully! Redirecting to login...");

//       // Redirect after a brief delay to show success message
//       setTimeout(() => {
//         router.push("/login?registered=true");
//       }, 2000);
//     } catch (error) {
//       console.error("Registration error:", error);
//       setFormError("An unexpected error occurred. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   // Get color based on password strength
//   const getPasswordStrengthColor = () => {
//     if (passwordStrength.score < 3) return "text-red-600";
//     if (passwordStrength.score < 5) return "text-yellow-600";
//     return "text-green-600";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         {formError && (
//           <div
//             className="rounded-md bg-red-50 p-4"
//             role="alert"
//             aria-live="assertive"
//           >
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <AlertCircle className="h-5 w-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">
//                   {formError}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         )}

//         {formSuccess && (
//           <div
//             className="rounded-md bg-green-50 p-4"
//             role="alert"
//             aria-live="assertive"
//           >
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <Check className="h-5 w-5 text-green-400" />
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-green-800">
//                   {formSuccess}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 First Name
//               </label>
//               <input
//                 id="firstName"
//                 name="firstName"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="John Doe"
//                 aria-required="true"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Last Name
//               </label>
//               <input
//                 id="lastName"
//                 name="lastName"
//                 type="text"
//                 required
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="John Doe"
//                 aria-required="true"
//               />
//             </div>

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
//                 autoComplete="new-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="••••••••"
//                 aria-required="true"
//               />
//               {formData.password && (
//                 <div className="mt-1 flex items-center">
//                   <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
//                     <div
//                       className={`h-1.5 rounded-full ${
//                         passwordStrength.score < 3
//                           ? "bg-red-500"
//                           : passwordStrength.score < 5
//                           ? "bg-yellow-500"
//                           : "bg-green-500"
//                       }`}
//                       style={{
//                         width: `${(passwordStrength.score / 5) * 100}%`,
//                       }}
//                     ></div>
//                   </div>
//                   <span className={`text-xs ${getPasswordStrengthColor()}`}>
//                     {passwordStrength.message}
//                   </span>
//                 </div>
//               )}
//               <p className="mt-1 text-xs text-gray-500">
//                 Password must be at least 8 characters
//               </p>
//             </div>

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="••••••••"
//                 aria-required="true"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Account Type
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 required
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
//                 aria-required="true"
//               >
//                 <option value="farmer">Farmer</option>
//                 <option value="lender">Lender</option>
//               </select>
//               <p className="mt-1 text-xs text-gray-500">
//                 {formData.role === "farmer"
//                   ? "Register as a farmer to apply for agricultural loans"
//                   : "Register as a lender to provide financing for farmers"}
//               </p>
//             </div>

//             <div className="flex items-start">
//               <div className="flex items-center h-5">
//                 <input
//                   id="agreeToTerms"
//                   name="agreeToTerms"
//                   type="checkbox"
//                   checked={formData.agreeToTerms}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//               </div>
//               <div className="ml-3 text-sm">
//                 <label
//                   htmlFor="agreeToTerms"
//                   className="font-medium text-gray-700"
//                 >
//                   I agree to the terms and conditions
//                 </label>
//                 <p className="text-gray-500">
//                   By creating an account, you agree to our{" "}
//                   <Link
//                     href="/terms"
//                     className="text-green-600 hover:text-green-500"
//                   >
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     href="/privacy"
//                     className="text-green-600 hover:text-green-500"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </p>
//               </div>
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
//                   Creating account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="font-medium text-green-600 hover:text-green-500 transition-colors"
//             >
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | AgriFinance",
  description: "Create a new AgriFinance account",
};

export default async function RegisterPage() {
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join AgriFinance as a farmer or lender
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
