import React, { useState } from "react";

function Register() {
  const [owners, setOwners] = useState([""]);
  const [coOwners, setCoOwners] = useState([""]);
  const [securityQuestions] = useState([
    "What is your pet's name?",
    "What is your mother’s maiden name?",
    "What is your favorite color?",
    "What city were you born in?"
  ]);

  const handleAddOwner = () => setOwners([...owners, ""]);
  const handleAddCoOwner = () => setCoOwners([...coOwners, ""]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Business Registration</h1>

      {/* Title */}
      <div>
        <label>Title: </label>
        <input type="text" placeholder="e.g., Mr., Ms., Dr." />
      </div>

      {/* Business Name */}
      <div>
        <label>Business Name: </label>
        <input type="text" placeholder="Enter registered business name" />
      </div>

      {/* To Do Business */}
      <div>
        <label>To Do Business: </label>
        <input type="text" placeholder="Business activity" />
      </div>

      {/* Owner Names */}
      <div>
        <label>Owner(s):</label>
        {owners.map((_, idx) => (
          <input key={idx} type="text" placeholder={`Owner ${idx + 1}`} />
        ))}
        <button onClick={handleAddOwner}>+ Add Owner</button>
      </div>

      {/* Co-Owner Names */}
      <div>
        <label>Co-Owner(s):</label>
        {coOwners.map((_, idx) => (
          <input key={idx} type="text" placeholder={`Co-Owner ${idx + 1}`} />
        ))}
        <button onClick={handleAddCoOwner}>+ Add Co-Owner</button>
      </div>

      {/* Email + Confirm */}
      <div>
        <label>Email: </label>
        <input type="email" placeholder="Enter email" />
      </div>
      <div>
        <label>Confirm Email: </label>
        <input type="email" placeholder="Confirm email" />
      </div>

      {/* Phone Number */}
      <div>
        <label>Phone Number:</label>
        <select>
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
        </select>
        <input type="tel" placeholder="Enter phone number" />
      </div>

      {/* Security Question */}
      <div>
        <label>Security Question:</label>
        <select>
          {securityQuestions.map((q, i) => (
            <option key={i} value={q}>{q}</option>
          ))}
        </select>
        <input type="text" placeholder="Your answer" />
      </div>

      {/* Business Type */}
      <div>
        <label>Business Type:</label>
        <input type="text" placeholder="e.g., Sole Proprietorship, LLP" />
      </div>

      {/* Sub Category */}
      <div>
        <label>Sub Category:</label>
        <input type="text" placeholder="Type or search subcategory" />
      </div>

      {/* Physical Address */}
      <div>
        <label>Physical Address:</label>
        <input type="text" placeholder="Street Address" />
        <input type="text" placeholder="Street Number" />
        <input type="text" placeholder="Pincode/Zipcode" />
        <input type="text" placeholder="Country" />
        <input type="text" placeholder="State" />
        <input type="text" placeholder="City/Place" />
      </div>

      {/* Billing Address */}
      <div>
        <label>
          <input type="checkbox" /> Same as Physical Address
        </label>
        <input type="text" placeholder="Billing Street Address" />
        <input type="text" placeholder="Billing Pincode/Zipcode" />
      </div>

      {/* Submit Button */}
      <div style={{ marginTop: "20px" }}>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;
