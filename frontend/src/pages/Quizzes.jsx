import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const QUIZZES = [
  {
    id: 1,
    title: 'UI/UX Fundamentals Quiz',
    course: 'Figma UI/UX Design',
    duration: '10 Mins',
    totalQuestions: 3,
    questions: [
      {
        question: 'What is the main focus of User Experience (UX) design?',
        options: ['Color gradients only', 'User journey, problem solving and usability', 'Writing database queries', 'Hardware manufacturing'],
        answer: 1,
      },
      {
        question: 'Which of the following is a key element of UI design?',
        options: ['Typography and button styles', 'Backend server architecture', 'Domain name registration', 'Data warehousing'],
        answer: 0,
      },
      {
        question: 'What is the purpose of wireframing in design?',
        options: ['To generate final CSS code', 'To blueprint the layout and structural design', 'To host web applications', 'To send newsletters'],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Brand Identity & Visual Principles',
    course: 'Brand Identity',
    duration: '15 Mins',
    totalQuestions: 2,
    questions: [
      {
        question: 'What defines a brand identity guidelines document?',
        options: ['Financial balance sheet', 'Logo usage, typography rules, color palette and brand voice', 'Employee contracts', 'Tax filings'],
        answer: 1,
      },
      {
        question: 'What is color psychology in branding?',
        options: ['How colors evoke emotional responses and perception in customers', 'Painting office walls', 'Calculating RGB values only', 'Standardizing screen brightness'],
        answer: 0,
      },
    ],
  },
]

export default function Quizzes({ navigate, currentPage }) {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizFinished, setQuizFinished] = useState(false)

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizFinished(false)
  }

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const calculateScore = () => {
    if (!activeQuiz) return 0
    let correct = 0
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correct++
      }
    })
    return correct
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Quizzes' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
              Knowledge Quizzes
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
              Test your understanding and earn completion scores for your enrolled courses.
            </p>
          </div>

          {!activeQuiz ? (
            /* Quiz Selection List */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {QUIZZES.map((quiz) => (
                <div
                  key={quiz.id}
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    border: '1px solid #F3F4F6',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: '#7C3AED', background: '#F5F3FF', padding: '3px 10px', borderRadius: 100 }}>
                        {quiz.course}
                      </span>
                      <span style={{ fontSize: 12, color: '#9CA3AF' }}>⏱️ {quiz.duration}</span>
                    </div>

                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 17, color: '#111827', margin: '0 0 8px' }}>
                      {quiz.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: '#6B7280', margin: '0 0 16px' }}>
                      {quiz.totalQuestions} Questions • Multiple Choice
                    </p>
                  </div>

                  <button
                    onClick={() => startQuiz(quiz)}
                    style={{
                      width: '100%',
                      padding: '11px',
                      background: '#111827',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    Start Quiz Now →
                  </button>
                </div>
              ))}
            </div>
          ) : quizFinished ? (
            /* Quiz Result Card */
            <div style={{ maxWidth: 560, margin: '20px auto', background: '#fff', borderRadius: 24, padding: 36, boxShadow: '0 10px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 8px' }}>
                Quiz Completed!
              </h2>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>
                You completed <strong>{activeQuiz.title}</strong>
              </p>

              <div style={{ background: '#F8FAFC', borderRadius: 16, padding: '20px 24px', marginBottom: 28, display: 'inline-block', minWidth: 200 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 36, color: '#2563EB' }}>
                  {calculateScore()} / {activeQuiz.questions.length}
                </div>
                <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 600, marginTop: 4 }}>
                  {Math.round((calculateScore() / activeQuiz.questions.length) * 100)}% Accuracy
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => startQuiz(activeQuiz)}
                  style={{ flex: 1, padding: '12px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => setActiveQuiz(null)}
                  style={{ flex: 1, padding: '12px', background: '#111827', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  Back to Quizzes
                </button>
              </div>
            </div>
          ) : (
            /* Active Quiz Question Interface */
            <div style={{ maxWidth: 680, margin: '0 auto', background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #F3F4F6', paddingBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', textTransform: 'uppercase' }}>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '4px 0 0' }}>{activeQuiz.title}</h3>
                </div>
                <button
                  onClick={() => setActiveQuiz(null)}
                  style={{ background: 'none', border: '1px solid #E5E7EB', padding: '6px 12px', borderRadius: 8, fontSize: 12.5, color: '#6B7280', cursor: 'pointer' }}
                >
                  Exit Quiz
                </button>
              </div>

              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 17, color: '#111827', marginBottom: 20, lineHeight: 1.5 }}>
                {activeQuiz.questions[currentQuestionIndex].question}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {activeQuiz.questions[currentQuestionIndex].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === oIdx
                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: 14,
                        border: isSelected ? '2px solid #2563EB' : '1.5px solid #E5E7EB',
                        background: isSelected ? '#EFF6FF' : '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'all 0.15s',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          border: isSelected ? '6px solid #2563EB' : '2px solid #D1D5DB',
                          background: '#fff',
                        }}
                      />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: isSelected ? '#1E3A5F' : '#374151', fontWeight: isSelected ? 600 : 400 }}>
                        {opt}
                      </span>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: selectedAnswers[currentQuestionIndex] !== undefined ? '#2563EB' : '#9CA3AF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 14.5,
                  cursor: selectedAnswers[currentQuestionIndex] !== undefined ? 'pointer' : 'not-allowed',
                }}
              >
                {currentQuestionIndex < activeQuiz.questions.length - 1 ? 'Next Question →' : 'Finish & View Score'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
