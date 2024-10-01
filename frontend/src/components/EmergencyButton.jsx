// components/EmergencyButton.jsx
import React, { useState } from "react";
import EmergencyForm from "./EmergencyForm";

export default function EmergencyButton({ onClick }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
    if (onClick) onClick();
  };

  return (
    <>
      <button
        className="w-80 h-12 bg-gradient-to-r ml-4 from-red-500 to-orange-500 text-white text-lg font-bold rounded-lg hover:bg-red-700 mt-4"
        onClick={handleClick}
      >
        Emergency
      </button>

      {showForm && <EmergencyForm />}
    </>
  );
}
