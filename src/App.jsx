import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DonationForm from './components/DonationForm';
import DonationsPage from './pages/DonationsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [donations, setDonations] = useState([]);

  const handleDonationSubmit = (formData) => {
    const newDonation = {
      id: Date.now(),
      type: 'Donation',
      paymentMode: formData.paymentMode,
      paymentStatus: 'Pending',
      status: 'Processing',
      date: new Date().toLocaleDateString('en-IN'),
      amount: formData.contribution,
      ...formData
    };
    setDonations([...donations, newDonation]);
    setCurrentPage('donations');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />

      {currentPage === 'home' ? (
        <div style={{
          flex: 1,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM0OThkYiIvPjwvc3ZnPg==)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <DonationForm onSubmit={handleDonationSubmit} />
        </div>
      ) : (
        <DonationsPage donations={donations} onBack={() => setCurrentPage('home')} />
      )}

      <Footer />
    </div>
  );
};

export default App;