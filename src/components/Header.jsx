import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#ff6b35',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '20px' }}>🪷</span>
        </div>
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>BHARATIYA JANATA PARTY</h1>
      </div>
      <nav style={{ display: 'flex', gap: '25px', alignItems: 'center', fontSize: '14px' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>UPCOMING EVENTS</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>MEDIA RESOURCES</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>KAMAL SANDESH</a>
        <select style={{
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid white',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          <option>English</option>
          <option>Hindi</option>
        </select>
        <button style={{
          backgroundColor: 'white',
          color: '#ff6b35',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Make a Donation
        </button>
      </nav>
    </header>
  );
};

export default Header;