import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} - Trabajo Práctico Integrador III
        </p>
        <p className="text-sm font-light mt-1">
          Desarrollado por:{" "}
          <span className="font-bold">Franco Sian Leandro Francisco</span>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
