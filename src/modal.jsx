import React, { useState } from "react";
import "./modal.css"; // Add styling as needed

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  // Validate Form Fields
  const validate = () => {
    const errors = {};
    const { username, email, phone, dob } = formData;

    if (!username) errors.username = "Username is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      errors.email = "Invalid email.";
    }
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      errors.phone = "Invalid phone number.";
    }
    if (!dob) {
      errors.dob = "Date of birth is required.";
    } else if (new Date(dob) > new Date()) {
      alert("Invalid date of birth. Future dates are not allowed.");
      errors.dob = "Invalid date of birth.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({ username: "", email: "", phone: "", dob: "" });
      setIsOpen(false); // Close the modal after successful submission
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal") {
      setIsOpen(false);
    }
  };

  return (
    <div className="modal">
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div>
                <label>Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
