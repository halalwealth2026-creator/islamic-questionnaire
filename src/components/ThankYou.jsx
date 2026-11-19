import React from 'react';

const ThankYou = () => {
  return (
    <section className="thank-you-container" aria-live="polite">
      <div className="thank-you-card">
        <div className="accent-mark" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#C2A56A" strokeWidth="2" />
            <path d="M13 20.5L17.5 25L27 15.5" stroke="#C2A56A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="thank-you-title">Thank You</h1>
        
        <p className="thank-you-text">
          Thank you for taking the time to complete this questionnaire.
        </p>
        <p className="thank-you-subtext">
          Your responses have been successfully submitted.
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
