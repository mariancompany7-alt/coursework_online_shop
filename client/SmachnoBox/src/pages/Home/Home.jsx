import React, { useState, useEffect } from 'react';
import Main from '../../components/Main/Main';
import About from '../../components/About/About'; // Імпортуємо нову секцію

function Home() {
  const [plans, setPlans] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:5000/api/boxes')
      .then((response) => response.json())
      .then((data) => setPlans(data))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  return (
    <div>
      <About />
      <div id="menu">
         <Main plans={plans} />
      </div>
    </div>
  );
}

export default Home;