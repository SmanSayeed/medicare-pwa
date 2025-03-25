import React from "react";

const SerialStatusBadge = ({ status }) => {
  const statusStyles = {
    created: "bg-gray-200 text-gray-800",
    confirmed: "bg-green-200 text-green-800",
    checked_in: "bg-yellow-200 text-yellow-800",
    queue: "bg-orange-200 text-orange-800",
    in_consultation: "bg-blue-200 text-blue-800",
    completed: "bg-green-600 text-gray-100",
    no_show: "bg-red-200 text-red-800",
    canceled: "bg-red-400 text-white",
  };

  return (
    <span
      className={`px-1 py-1 rounded-full text-[10px] font-semibold ${statusStyles[status] || "bg-gray-300 text-black"}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};

export default SerialStatusBadge;