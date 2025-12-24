import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col justify-center items-center">
      <Navbar />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">Page Not Found</p>
      <a href="/" className="text-red-600">Go Home</a>
      <Footer />
    </div>
  );
};

export default NotFound;
