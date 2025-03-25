import React from "react";

export const StatusBadge = ({ status }) => {
  const statusColors = {
    created: "bg-blue-500 text-white",
    confirmed: "bg-green-500 text-white",
    checked_in: "bg-yellow-500 text-white",
    queue: "bg-orange-500 text-white",
    in_consultation: "bg-purple-500 text-white",
    completed: "bg-gray-500 text-white",
    no_show: "bg-red-500 text-white",
    canceled: "bg-red-700 text-white",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-sm font-semibold ${statusColors[status] || "bg-gray-300 text-black"}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};