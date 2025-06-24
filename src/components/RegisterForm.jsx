import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Make sure path is correct

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    dbaName: '',
    owners: [''],
    coOwners: [''],
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      country: '',
      state: '',
      city: '',
      pincode: ''
    },
    billingAddress: {
      street: '',
      country: '',
      state: '',
      city: '',
      pincode: ''
    },
    billingSameAsPhysical: false,
  });

  // Update form field
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name.split('.')[1]]: value,
        },
      }));
    } else if (name.startsWith('billingAddress.')) {
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add dynamic owner or co-owner
  const addOwner = () => {
    setFormData(prev => ({
      ...prev,
      owners: [...prev.owners, ''],
    }));
  };

  const addCoOwner = () => {
    setFormData(prev => ({
      ...prev,
      coOwners: [...prev.coOwners, ''],
    }));
  };

  const handleOwnerChange = (i, value, type) => {
    const list = [...formData[type]];
    list[i] = value;
    setFormData(prev => ({
      ...prev,
      [type]: list,
    }));
  };

  // Toggle billing same as physical
  const toggleBillingSame = () => {
    setFormData(prev => {
      const same = !prev.billingSameAsPhysical;
      return {
        ...prev,
        billingSameAsPhysical: same,
        billingAddress: same ? { ...prev.address } : {
          street: '',
          country: '',
          state: '',
          city: '',
          pincode: ''
        }
      };
    });
  };

  // Handle form submission (dummy for now)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      confirmEmail,
      password,
      confirmPassword
    } = formData;

    if (email !== confirmEmail) return alert("Emails do not match");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created: ", userCred.user);
      // Route to OTP page or dashboard
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Business Name" required />
      <input type="text" name="dbaName" value={formData.dbaName} onChange={handleChange} placeholder="DBA Name" required />

      {formData.owners.map((owner, i) => (
        <input
          key={i}
          type="text"
          value={owner}
          onChange={(e) => handleOwnerChange(i, e.target.value, 'owners')}
          placeholder={`Owner ${i + 1} Name`}
        />
      ))}
      <button type="button" onClick={addOwner}>+ Add Owner</button>

      {formData.coOwners.map((coOwner, i) => (
        <input
          key={i}
          type="text"
          value={coOwner}
          onChange={(e) => handleOwnerChange(i, e.target.value, 'coOwners')}
          placeholder={`Co-Owner ${i + 1} Name`}
        />
      ))}
      <button type="button" onClick={addCoOwner}>+ Add Co-Owner</button>

      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} placeholder="Confirm Email" required />
      {formData.email === formData.confirmEmail && formData.email !== '' && <p style={{ color: 'green' }}>Email matches</p>}

      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
      {formData.password === formData.confirmPassword && formData.password !== '' && <p style={{ color: 'green' }}>Password matches</p>}

      {/* Physical Address */}
      <h4>Physical Address</h4>
      <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" />
      <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Country" />
      <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} placeholder="State" />
      <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" />
      <input type="text" name="address.pincode" value={formData.address.pincode} onChange={handleChange} placeholder="Pincode" />

      <label>
        <input type="checkbox" checked={formData.billingSameAsPhysical} onChange={toggleBillingSame} />
        Billing same as physical address
      </label>

      {!formData.billingSameAsPhysical && (
        <>
          <h4>Billing Address</h4>
          <input type="text" name="billingAddress.street" value={formData.billingAddress.street} onChange={handleChange} placeholder="Street" />
          <input type="text" name="billingAddress.country" value={formData.billingAddress.country} onChange={handleChange} placeholder="Country" />
          <input type="text" name="billingAddress.state" value={formData.billingAddress.state} onChange={handleChange} placeholder="State" />
          <input type="text" name="billingAddress.city" value={formData.billingAddress.city} onChange={handleChange} placeholder="City" />
          <input type="text" name="billingAddress.pincode" value={formData.billingAddress.pincode} onChange={handleChange} placeholder="Pincode" />
        </>
      )}

      <button type="submit">Register</button>
      <p>Already have an account? <button onClick={onSwitchToLogin}>Login</button></p>
    </form>
  );
};

export default RegisterForm;
