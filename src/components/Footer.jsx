import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px 30px',
      marginTop: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px'
      }}>
        <div>
          <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Disclaimer</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#95a5a6' }}>
            BJP Central Office 6-A, Pandit Deen Dayal Upadhyaya Marg, New Delhi-110002,India | Copyright © 2026
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>Connect with us:</span>
          <div style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>f</div>
          <div style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>t</div>
          <div style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>y</div>
          <div style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            border: '1px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>s</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;