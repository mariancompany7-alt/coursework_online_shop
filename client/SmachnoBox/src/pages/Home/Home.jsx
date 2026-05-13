import React, { useState, useEffect } from 'react';
import Main from '../../components/Main/Main';

function Home() {
  // 1. Initialize state as an empty array
  const [plans, setPlans] = useState([]); 

  useEffect(() => {
    // 2. Fetch the data from your backend
    fetch('http://localhost:5000/api/boxes')
      .then((response) => response.json())
      .then((data) => {
        setPlans(data); // 3. Save the database data
      })
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  return (
    <div>
      {/* 4. Render the Main component and pass the data to it */}
      <Main plans={plans} />
    </div>
  );
}

export default Home;