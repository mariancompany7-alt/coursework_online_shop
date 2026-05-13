import React, { useState, useEffect } from 'react';
import Main from '../../components/Main/Main';

function Home() {
  const [plans, setPlans] = useState(null); // State to hold DB data

  useEffect(() => {
    // Call your backend endpoint
    fetch('http://localhost:5000/api/boxes')
      .then((response) => response.json())
      .then((data) => {
        setPlans(data); // Save the boxes into state
      })
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  return (
    <div>
      {/* Pass the data down to Main */}
      <Main plans={plans} />
    </div>
  );
}

export default Home;