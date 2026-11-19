# Islamic Learning & Values Questionnaire

A professional, clean, modern, and responsive single-page Question & Answer Submission Form built with **React.js**, **JavaScript**, and **CSS**.

---

## Features & Implementation Highlights

- **Single-Page Form Flow**:
  - **Start Section**: Includes the title, introduction, and a "Start" button that smoothly scrolls to the questionnaire without navigating away.
  - **10 Sequential Questions**: All 10 questions are rendered vertically on the same page with exact prompt wording and order.
  - **Free-Text Answer Textareas**: Sized comfortably (140px min-height) with placeholder `"Write your answer here..."`. No radio buttons, checkboxes, dropdowns, or predefined answers.
  - **JavaScript Form Validation**: All questions are required. Submitting with any unanswered field triggers a smooth scroll to the first missing question, highlights the textarea, and displays the required inline error message: `"Please enter your answer before submitting."`.
  - **Submit Button**: Sized in Antique Gold (`#C2A56A`) with Deep Navy text (`#123A63`), prevents duplicate submissions during processing.
  - **Thank You Screen**: Replaces/transitions the questionnaire with the exact required heading and confirmation message:
    > **Thank You**  
    > *"Thank you for taking the time to complete this questionnaire."*  
    > *"Your responses have been successfully submitted."*

---

## Strict 60-30-10 Colour Palette

- **60% Primary**: Soft White (`#F7F9FB`) — Main page and form backgrounds.
- **30% Secondary**: Deep Navy (`#123A63`) & Slate Gray (`#5F748C`) — Headings, question titles, descriptive text, and subtle borders.
- **10% Accent**: Antique Gold (`#C2A56A`) — Start & Submit buttons, focus rings, question tags, and decorative accents.

---

## Project Structure

```text
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── Questionnaire.jsx
    │   ├── QuestionItem.jsx
    │   └── ThankYou.jsx
    ├── data/
    │   └── questions.js
    └── styles/
        └── questionnaire.css
```

---

## Available Scripts

- `npm run dev`: Starts the local development server at `http://127.0.0.1:5173/`.
- `npm run build`: Generates the production build inside the `dist/` directory.
- `npm run preview`: Previews the production build locally.
