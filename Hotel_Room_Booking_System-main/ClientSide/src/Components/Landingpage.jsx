import React from "react"
import { Link } from "react-router-dom"

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Welcome to Luxury Haven</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
            Experience unparalleled comfort and elegance in the heart of the city
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <div id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Luxury Haven?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Prime Location", description: "Situated in the heart of the city, close to all major attractions" },
              { title: "Luxurious Amenities", description: "Enjoy our spa, fitness center, and gourmet restaurants" },
              { title: "Exceptional Service", description: "Our staff is dedicated to making your stay unforgettable" },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Experience Luxury?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your stay now and indulge in the ultimate hotel experience.
          </p>
          <Link to='/rooms'>
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:bg-blue-700">
            Book Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
