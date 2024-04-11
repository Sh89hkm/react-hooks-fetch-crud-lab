import React from 'react';

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  async function handleDelete(questionID) {
    await fetch(`http://localhost:4000/questions/${questionID}`, {
      method: 'DELETE',
    });
    onDeleteQuestion(questionID);
  }

  async function handleUpdate(id, newCorrectIndex) {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    };
    await fetch(`http://localhost:4000/questions/${id}`, config);
    onUpdateAnswer(id, newCorrectIndex);
  }

  const options = answers.map((answer, index) => (
    <option
      key={index}
      value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          onChange={(e) => handleUpdate(id, e.target.value)}
          defaultValue={correctIndex}
        >
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(id)} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;