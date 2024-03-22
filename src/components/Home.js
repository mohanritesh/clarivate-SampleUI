import React, { useState, useEffect } from 'react';

function Home() {
  const [healthCheckData, setHealthCheckData] = useState(null);

  useEffect(() => {
    fetchHealthCheckData();
  }, []);

  const fetchHealthCheckData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/healthcheck`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.text();
      setHealthCheckData(data);
    } catch (error) {
      console.error('Error fetching health check data:', error);
    }
  };

  return (
    <div>
      <h2>API Health Check</h2>
      <p>{healthCheckData ? healthCheckData : 'Loading...'}</p>
    </div>
  );
}
export default Home;