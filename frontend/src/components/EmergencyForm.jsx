// components/EmergencyForm.jsx
import React from "react";

export default function EmergencyForm() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 md:p-6 rounded-lg shadow-lg mt-4 max-w-xs mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
        Select Emergency Type
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">
            Emergency Type
          </label>
          <select className="w-full border border-indigo-300 p-2 rounded-lg text-indigo-800 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500">
            <option>Medical Emergency</option>
            <option>Police Emergency</option>
            <option>Fire Emergency</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">
            Additional Information
          </label>
          <textarea
            className="w-full border border-indigo-300 p-2 rounded-lg text-indigo-800 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            placeholder="Describe the emergency"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full h-10 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded-lg hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
