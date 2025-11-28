import React from "react";
import Loading from "../components/Loading";

const Profile = ({ user }) => {
  if (!user) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-300">
            <span className="text-3xl font-bold text-blue-600 uppercase">
              {user.username ? user.username.substring(0, 2) : "US"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {user.username}
          </h1>
          <p className="text-blue-100">{user.email}</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Información Personal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">
                ID de Usuario
              </label>
              <p className="text-gray-800 font-mono bg-gray-100 p-2 rounded">
                {user.id}
              </p>
            </div>

            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">
                Nombre de Usuario
              </label>
              <p className="text-gray-800 p-2">{user.username}</p>
            </div>

            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">
                Nombre
              </label>
              <p className="text-gray-800 p-2 border rounded">
                {user.person?.name || user.name || "No definido"}
              </p>
            </div>

            <div>
              <label className="block text-gray-500 text-sm font-bold mb-1">
                Apellido
              </label>
              <p className="text-gray-800 p-2 border rounded">
                {user.person?.lastname || user.lastname || "No definido"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
