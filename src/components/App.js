import React, { useEffect, useState } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:4000/questions');
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  function handleAddNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedQuestionID) {
    const remainingQuestions = questions.filter((question) => question.id !== deletedQuestionID);
    setQuestions(remainingQuestions);
  }

  function handleUpdateAnswer(id, newCorrectIndex) {
    const updatedAnswers = questions.map((question) => {
      if (question.id === id) {
        return { ...question, correctIndex: newCorrectIndex };
      } else {
        return question;
      }
    });
    setQuestions(updatedAnswers);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      { page === 'Form' ? 
        <QuestionForm onNewQuestion={handleAddNewQuestion} />
       : 
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
        />
      }
    </main>
  );
}

export default App;