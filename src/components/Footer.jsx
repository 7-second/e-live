import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 text-center">
      &copy; {new Date().getFullYear()} World TV. All Rights Reserved.
    </footer>
  );
};

export default Footer;
