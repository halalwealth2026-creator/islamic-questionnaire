import React, { useState, useRef } from 'react';
import { questions } from '../data/questions';
import QuestionItem from './QuestionItem';

const Questionnaire = ({ onSubmitted }) => {
  const [currentStep, setCurrentStep] = useState('info'); // 'info' | 'questions'
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [basicInfoErrors, setBasicInfoErrors] = useState({});

  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // References to basic info inputs for error focusing
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // References to question inputs for auto-scroll and focus on validation error
  const inputRefs = useRef({});
  const questionnaireSectionRef = useRef(null);

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({
      ...prev,
      [field]: value
    }));

    if (basicInfoErrors[field]) {
      setBasicInfoErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleStartClick = (e) => {
    if (e) e.preventDefault();

    const validationErrors = {};
    if (!basicInfo.name || !basicInfo.name.trim()) {
      validationErrors.name = 'Please enter your name.';
    }

    if (!basicInfo.email || !basicInfo.email.trim()) {
      validationErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email.trim())) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!basicInfo.phone || !basicInfo.phone.trim()) {
      validationErrors.phone = 'Please enter your phone number.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setBasicInfoErrors(validationErrors);
      if (validationErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (validationErrors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (validationErrors.phone && phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
      return;
    }

    setBasicInfoErrors({});
    setCurrentStep('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerChange = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear validation error when user begins typing
    if (errors[id]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate all 10 questions
    const validationErrors = {};
    let firstUnansweredId = null;

    questions.forEach((q) => {
      const val = answers[q.id];
      if (!val || val.trim().length === 0) {
        validationErrors[q.id] = 'Please enter your answer before submitting.';
        if (!firstUnansweredId) {
          firstUnansweredId = q.id;
        }
      }
    });

    if (firstUnansweredId) {
      setErrors(validationErrors);

      // Smoothly scroll to the first unanswered question
      const targetCard = document.getElementById(`card-${firstUnansweredId}`);
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      const targetInput = inputRefs.current[firstUnansweredId];
      if (targetInput) {
        setTimeout(() => targetInput.focus(), 300);
      }
      return;
    }

    // Form is completely valid
    setErrors({});
    setIsSubmitting(true);

    try {
      // Collect structured submission data
      const submissionData = {
        basicInfo: {
          name: basicInfo.name.trim(),
          email: basicInfo.email.trim(),
          phone: basicInfo.phone.trim()
        },
        responses: questions.map(q => ({
          id: q.id,
          question: q.question,
          answer: answers[q.id].trim()
        }))
      };

      // Store in localStorage as persistent record
      try {
        const existingEntries = JSON.parse(localStorage.getItem('islamic_questionnaire_submissions') || '[]');
        existingEntries.push({
          timestamp: new Date().toISOString(),
          ...submissionData
        });
        localStorage.setItem('islamic_questionnaire_submissions', JSON.stringify(existingEntries));
      } catch (storageErr) {
        console.warn('LocalStorage error:', storageErr);
      }

      // Simulate a brief submission delay for natural UX
      await new Promise(resolve => setTimeout(resolve, 600));

      if (onSubmitted) {
        onSubmitted(submissionData);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      {currentStep === 'info' ? (
        /* 1. Basic Information Page */
        <section className="intro-section" aria-label="Basic Information">
          <div className="intro-content">
            <div className="intro-accent-line" aria-hidden="true" />
            <h1 className="intro-title">
              Islamic Learning &amp; Values Questions
            </h1>
            <p className="intro-description">
              We would love to understand your interests, experiences, and perspectives regarding Islamic learning and values. Please answer the following questions thoughtfully.
            </p>

            <div className="basic-info-container">
              <h2 className="basic-info-subtitle">Basic Information</h2>

              <form onSubmit={handleStartClick} noValidate className="basic-info-form">
                <div className="field-group">
                  <label htmlFor="user-name" className="field-label">
                    Name
                  </label>
                  <div className="input-wrapper">
                    <input
                      ref={nameInputRef}
                      id="user-name"
                      type="text"
                      value={basicInfo.name}
                      onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className={`text-input ${basicInfoErrors.name ? 'input-error' : ''}`}
                      aria-required="true"
                      aria-invalid={Boolean(basicInfoErrors.name)}
                    />
                    {basicInfoErrors.name && (
                      <p className="validation-message" role="alert">
                        <span className="error-icon" aria-hidden="true">!</span>
                        {basicInfoErrors.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="user-email" className="field-label">
                    Email
                  </label>
                  <div className="input-wrapper">
                    <input
                      ref={emailInputRef}
                      id="user-email"
                      type="email"
                      value={basicInfo.email}
                      onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={`text-input ${basicInfoErrors.email ? 'input-error' : ''}`}
                      aria-required="true"
                      aria-invalid={Boolean(basicInfoErrors.email)}
                    />
                    {basicInfoErrors.email && (
                      <p className="validation-message" role="alert">
                        <span className="error-icon" aria-hidden="true">!</span>
                        {basicInfoErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="user-phone" className="field-label">
                    Phone Number
                  </label>
                  <div className="input-wrapper">
                    <input
                      ref={phoneInputRef}
                      id="user-phone"
                      type="tel"
                      value={basicInfo.phone}
                      onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={`text-input ${basicInfoErrors.phone ? 'input-error' : ''}`}
                      aria-required="true"
                      aria-invalid={Boolean(basicInfoErrors.phone)}
                    />
                    {basicInfoErrors.phone && (
                      <p className="validation-message" role="alert">
                        <span className="error-icon" aria-hidden="true">!</span>
                        {basicInfoErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="basic-info-action">
                  <button
                    type="submit"
                    className="btn-start"
                    aria-label="Start Questionnaire"
                  >
                    Start
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        /* 2. Questionnaire Form Section (Questions 1 - 10) */
        <section
          ref={questionnaireSectionRef}
          id="questionnaire-section"
          className="questionnaire-section"
          aria-label="Questionnaire Form"
        >
          <div className="section-divider">
            <span className="divider-text">QUESTIONNAIRE</span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="questionnaire-form">
            <div className="questions-container">
              {questions.map((q) => (
                <QuestionItem
                  key={q.id}
                  question={q}
                  answer={answers[q.id]}
                  error={errors[q.id]}
                  inputRef={(el) => (inputRefs.current[q.id] = el)}
                  onChange={handleAnswerChange}
                />
              ))}
            </div>

            <div className="submit-section">
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Questions'}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default Questionnaire;
