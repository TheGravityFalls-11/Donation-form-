import React from 'react';

const DonationsPage = ({ donations, onBack }) => {
  return (
    <div>
      <div style={{
        backgroundColor: '#ff6b35',
        padding: '15px 30px',
        display: 'flex',
        gap: '20px',
        borderBottom: '3px solid #e65a2b',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🏠 Home
        </button>
        <button
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📊 Dashboard
        </button>
        <button
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          👤 Profile
        </button>
        <button
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          💰 Donations & 80G
        </button>
        <button
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          👥 Refer Member
        </button>
        <button
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ❓ FAQ
        </button>
      </div>

      <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '500px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '30px', color: '#333' }}>DONATIONS & 80G</h2>

        {donations.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '100px 20px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{ color: '#999', fontSize: '16px' }}>No data available</p>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
              Your donation records will appear here after you make a donation.
            </p>
          </div>
        ) : (
          <>
            {/* Donation Details Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#ff6b35', borderBottom: '2px solid #ffe5d9', paddingBottom: '10px' }}>
                Latest Donation Details
              </h3>
              {donations[donations.length - 1] && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                  <div>
                    <strong>Name:</strong> {donations[donations.length - 1].title} {donations[donations.length - 1].fullName}
                  </div>
                  <div>
                    <strong>Email:</strong> {donations[donations.length - 1].email}
                  </div>
                  <div>
                    <strong>Gender:</strong> {donations[donations.length - 1].gender}
                  </div>
                  <div>
                    <strong>Date of Birth:</strong> {donations[donations.length - 1].dob}
                  </div>
                  <div>
                    <strong>Indian Citizen:</strong> {donations[donations.length - 1].isIndianCitizen === 'yes' ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <strong>Residing in India:</strong> {donations[donations.length - 1].residingInIndia === 'yes' ? 'Yes' : 'No'}
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Address:</strong> {donations[donations.length - 1].homeAddress}
                  </div>
                  <div>
                    <strong>State:</strong> {donations[donations.length - 1].state}
                  </div>
                  <div>
                    <strong>District:</strong> {donations[donations.length - 1].district}
                  </div>
                  <div>
                    <strong>Pincode:</strong> {donations[donations.length - 1].pincode}
                  </div>
                  <div>
                    <strong>Assembly Constituency:</strong> {donations[donations.length - 1].assemblyConstituency || 'Not specified'}
                  </div>
                  <div>
                    <strong>Payment Mode:</strong> {donations[donations.length - 1].paymentMode}
                  </div>
                  <div>
                    <strong>Contribution:</strong> ₹{donations[donations.length - 1].amount}
                  </div>
                </div>
              )}
            </div>

            {/* Donation Records Table */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                overflowX: 'auto'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 120px 140px 140px 120px 120px 120px 140px',
                  backgroundColor: '#ffe5d9',
                  padding: '15px 20px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#333',
                  borderBottom: '2px solid #ddd',
                  minWidth: '1000px'
                }}>
                  <div>S No</div>
                  <div>Type</div>
                  <div>Payment Mode</div>
                  <div>Payment Status</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Receipt - 80G</div>
                </div>

                {donations.map((donation, index) => (
                  <div
                    key={donation.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 120px 140px 140px 120px 120px 120px 140px',
                      padding: '15px 20px',
                      borderBottom: '1px solid #eee',
                      fontSize: '13px',
                      minWidth: '1000px'
                    }}
                  >
                    <div>{index + 1}</div>
                    <div>{donation.type}</div>
                    <div>{donation.paymentMode}</div>
                    <div>
                      <span style={{
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        padding: '3px 8px',
                        borderRadius: '3px',
                        fontSize: '12px'
                      }}>
                        {donation.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <span style={{
                        backgroundColor: '#d1ecf1',
                        color: '#0c5460',
                        padding: '3px 8px',
                        borderRadius: '3px',
                        fontSize: '12px'
                      }}>
                        {donation.status}
                      </span>
                    </div>
                    <div>{donation.date}</div>
                    <div style={{ fontWeight: 'bold', color: '#28a745' }}>₹{donation.amount}</div>
                    <div>
                      <button style={{
                        backgroundColor: '#ff6b35',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationsPage;