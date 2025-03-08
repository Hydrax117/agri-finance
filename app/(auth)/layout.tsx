import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="AgriFinance Logo"
              width={50}
              height={50}
            />
            <span className="ml-3 text-2xl font-bold text-green-700">
              AgriFinance
            </span>
          </div>
        </Link>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
