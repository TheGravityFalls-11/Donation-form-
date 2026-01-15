import React, { useState } from 'react';

const DonationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    title: 'Mr',
    email: '',
    isIndianCitizen: '',
    residingInIndia: '',
    gender: 'Male',
    dob: '',
    homeAddress: '',
    state: 'Tamil Nadu',
    district: 'Chengalpattu',
    assemblyConstituency: '',
    pincode: '',
    paymentMode: 'Online',
    contribution: '',
    acceptUpdates: false,
    acceptDeclaration: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.isIndianCitizen) {
      newErrors.isIndianCitizen = 'Please select if you are an Indian citizen';
    }

    if (!formData.residingInIndia) {
      newErrors.residingInIndia = 'Please select if you are residing in India';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.homeAddress.trim()) {
      newErrors.homeAddress = 'Home address is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!formData.contribution) {
      newErrors.contribution = 'Contribution amount is required';
    } else if (formData.contribution <= 0) {
      newErrors.contribution = 'Amount must be greater than 0';
    } else if (formData.contribution > 20000) {
      newErrors.contribution = 'Amount cannot exceed ₹20,000';
    }

    if (!formData.acceptDeclaration) {
      newErrors.acceptDeclaration = 'You must accept the declaration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>MAKE A DONATION</h2>
      
      {Object.keys(errors).length > 0 && (
        <div style={{
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '20px',
          color: '#c00'
        }}>
          <strong>Please fix the following errors:</strong>
          <ul style={{ margin: '5px 0 0 20px', fontSize: '13px' }}>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Full Name <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '80px'
              }}
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
            </select>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                flex: 1,
                padding: '8px',
                border: errors.fullName ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          {errors.fullName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.fullName}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Email <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Are you an Indian Citizen? <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="isIndianCitizen"
                value="yes"
                checked={formData.isIndianCitizen === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="isIndianCitizen"
                value="no"
                checked={formData.isIndianCitizen === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
          {errors.isIndianCitizen && <span style={{ color: 'red', fontSize: '12px' }}>{errors.isIndianCitizen}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Are you Residing in India? <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="residingInIndia"
                value="yes"
                checked={formData.residingInIndia === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="residingInIndia"
                value="no"
                checked={formData.residingInIndia === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
          {errors.residingInIndia && <span style={{ color: 'red', fontSize: '12px' }}>{errors.residingInIndia}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Gender <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Date of Birth <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.dob ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {errors.dob && <span style={{ color: 'red', fontSize: '12px' }}>{errors.dob}</span>}
        </div>

        <h3 style={{ fontSize: '16px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>Contact Details</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Home Address <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            placeholder="Enter your address"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.homeAddress ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {errors.homeAddress && <span style={{ color: 'red', fontSize: '12px' }}>{errors.homeAddress}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option>Chengalpattu</option>
              <option>Chennai</option>
              <option>Kanchipuram</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Assembly Constituency (AC)</label>
            <select
              name="assemblyConstituency"
              value={formData.assemblyConstituency}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="">-- Select --</option>
              <option value="Chengalpattu">Chengalpattu</option>
              <option value="Tambaram">Tambaram</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Pincode <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="603001"
              maxLength="6"
              style={{
                width: '100%',
                padding: '8px',
                border: errors.pincode ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            {errors.pincode && <span style={{ color: 'red', fontSize: '12px' }}>{errors.pincode}</span>}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
            Payment Mode <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="paymentMode"
                value="Online"
                checked={formData.paymentMode === 'Online'}
                onChange={handleChange}
              />
              Online
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="paymentMode"
                value="Offline"
                checked={formData.paymentMode === 'Offline'}
                onChange={handleChange}
              />
              Offline
            </label>
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffe5d9',
          border: errors.contribution ? '2px dashed red' : '2px dashed #ff6b35',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
            YOUR CONTRIBUTION <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            name="contribution"
            value={formData.contribution}
            onChange={handleChange}
            placeholder="Enter amount (Max: ₹20,000)"
            style={{
              width: '100%',
              padding: '10px',
              border: errors.contribution ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
            Total Amount: ₹ {formData.contribution || 0}
          </p>
          {errors.contribution && <span style={{ color: 'red', fontSize: '12px' }}>{errors.contribution}</span>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#555' }}>
            <input 
              type="checkbox"
              name="acceptUpdates"
              checked={formData.acceptUpdates}
              onChange={handleChange}
              style={{ marginTop: '3px' }} 
            />
            <span>I am willing to receive regular BJP updates.</span>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#555' }}>
            <input 
              type="checkbox"
              name="acceptDeclaration"
              checked={formData.acceptDeclaration}
              onChange={handleChange}
            />
            <span>
              I do hereby declare that the contributions are from my personal fund and would not be reimbursed to me. I also agree to the 
              policy that no individual/institutional contributions exceeding Rupees twenty thousand will be entertained. <span style={{ color: 'red' }}>*</span>
            </span>
          </label>
          {errors.acceptDeclaration && <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.acceptDeclaration}</span>}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DonationForm;