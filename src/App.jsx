import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import ThankYou from './components/ThankYou';

function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitted = (data) => {
    setSubmitted(true);
    // Smoothly scroll to top so Thank You card is centered nicely
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="app-container">
      {!submitted ? (
        <Questionnaire onSubmitted={handleSubmitted} />
      ) : (
        <ThankYou />
      )}
    </main>
  );
}

export default App;
