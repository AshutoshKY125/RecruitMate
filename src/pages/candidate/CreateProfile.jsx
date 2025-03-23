import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    leetcode: "",
    gfg: "",
    profile: "",
    resume_link: "",
    others: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType("");

    try {
      console.log("📤 Sending Data:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/candidates/create",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Profile Created:", response.data);
      setStatusMessage("Profile successfully created!");
      setStatusType("success");

      setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "❌ Error creating profile:",
        error.response?.data || error.message
      );
      setStatusMessage(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Profile</h2>

      {statusMessage && (
        <div
          className={`p-3 mb-4 rounded-md text-white ${
            statusType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700"
            >
              {field.replace("_", " ").toUpperCase()}
              {["name", "email", "resume_link"].includes(field) && " *"}
            </label>
            {field === "profile" || field === "others" ? (
              <textarea
                name={field}
                id={field}
                rows={3}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required={["name", "email", "resume_link"].includes(field)}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
