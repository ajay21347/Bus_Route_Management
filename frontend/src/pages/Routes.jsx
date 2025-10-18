import React from "react";
import BusCard from "./components/BusCard";

export default function Routes({ routes }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Available Routes
      </h1>
      <div className="grid sm:grid-cols02 lg:grid-cols-3 gap-6">
        {routes.map((bus, idx) => (
          <BusCard key={idx} bus={bus} />
        ))}
      </div>
    </div>
  );
}
