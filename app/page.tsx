import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Farmers with Access to Finance
            </h1>
            <p className="text-lg mb-8">
              AI-powered agricultural financing that connects farmers with
              investors for sustainable growth.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/register?role=farmer"
                className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
              >
                Apply for Financing
              </Link>
              <Link
                href="/register?role=lender"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
              >
                Become an Investor
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/farm-hero.jpg"
              alt="Farmer in Field"
              width={700}
              height={100}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Farmers */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Farmers</h3>
              <p className="text-gray-600">
                Register, complete your profile, and apply for financing
                tailored to your farm's needs.
              </p>
            </div>

            {/* AI Scoring */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Credit Scoring</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your farm data to generate a fair
                credit score beyond traditional metrics.
              </p>
            </div>

            {/* For Investors */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Investors</h3>
              <p className="text-gray-600">
                Browse vetted farming projects, invest in agricultural growth,
                and track your impact and returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="/images/farmer-benefits.jpg"
                alt="Farmer with crops"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6">Benefits for Farmers</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>
                    Quick access to agricultural financing with less paperwork
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>
                    Fair credit assessment beyond traditional banking metrics
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>
                    Flexible repayment terms aligned with harvest cycles
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>
                    Build a digital financial history to improve future
                    financing options
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/farmer-profile-1.jpg"
                  alt="Farmer Portrait"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Maria Rodriguez</h4>
                  <p className="text-sm text-gray-600">
                    Rice Farmer, Philippines
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                "This platform helped me secure financing for irrigation
                equipment that tripled my rice yield. The AI scoring system
                recognized my farming potential when traditional banks
                wouldn't."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/farmer-profile-2.jpg"
                  alt="Farmer Portrait"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Emmanuel Osei</h4>
                  <p className="text-sm text-gray-600">Cocoa Farmer, Ghana</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I connected with investors who believed in sustainable cocoa
                farming. The loan helped me transition to organic practices, and
                now I sell premium beans at higher prices."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Agricultural Finance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of farmers and investors creating
            sustainable agricultural growth together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/register?role=farmer"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              Apply for Financing
            </Link>
            <Link
              href="/register?role=lender"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Become an Investor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
