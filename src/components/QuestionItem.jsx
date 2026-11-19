import React from 'react';

const QuestionItem = ({
  question,
  answer,
  onChange,
  error,
  inputRef
}) => {
  const formattedNumber = String(question.id).padStart(2, '0');
  const textareaId = `question-${question.id}`;
  const errorId = `error-${question.id}`;

  return (
    <article
      className={`question-card ${error ? 'has-error' : ''}`}
      id={`card-${question.id}`}
      aria-labelledby={`label-${question.id}`}
    >
      <header className="question-header">
        <span className="question-badge">
          QUESTION {formattedNumber}
        </span>
        <label
          htmlFor={textareaId}
          id={`label-${question.id}`}
          className="question-text"
        >
          {question.question}
        </label>
      </header>

      <div className="input-wrapper">
        <textarea
          ref={inputRef}
          id={textareaId}
          name={textareaId}
          value={answer || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder="Write your answer here..."
          rows={5}
          className={`question-textarea ${error ? 'input-error' : ''}`}
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p id={errorId} className="validation-message" role="alert">
            <span className="error-icon" aria-hidden="true">!</span>
            {error}
          </p>
        )}
      </div>
    </article>
  );
};

export default QuestionItem;
