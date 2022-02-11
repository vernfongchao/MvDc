
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';
import { getFiveQuestions } from '../../store/question';
import { getAnswerByQuestion } from '../../store/answer';

import QuestionEdit from '../QuestionEdit';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);
  const questions = useSelector((state) => state.questionState.questions)
  const answers = useSelector((state) => state.answerState.answers)
  const questionVal = Object.values(questions)
  const [showForm, setShowForm] = useState(false)

  // const answers = Object.values(questionObj?.Answers)
  // console.log(questionObj?.Answers)

  // const answer = questionObj?.Answers.map((answer) => (

  // ))

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getQuestionById(id)).then(data => { if (!data) history.push('/404') })
    dispatch(getFiveQuestions())
    dispatch(getAnswerByQuestion(id))
  }, []);

  const answerArr = Object.values(answers)
  console.log('================================', answerArr)
  answerArr.map(({ id, content }) => {
    console.log('================================', id)
    console.log('================================', content)
  })



  let filter;
  if (questionObj) {
    filter = questionVal.filter((question) => question.id !== questionObj.id)
  }

  const hideForm = (e) => {
    setShowForm(false)
  }

  return (
    <div className='question-detail-page-container'>
      {questionObj && (
        <div className='question-detail-outer'>
          <div className='question-detail-container'>

            <span className='question-detail-title'>{questionObj?.title}</span>
            <span className='question-detail-user'>Asked by: {questionObj?.User?.username}</span>
            <span className='question-detail-content'>{questionObj?.content}</span>
            <QuestionEdit user={user} question={questionObj} showForm={showForm} setShowForm={setShowForm} />
          </div>
        </div>
      )}

      <div className='related-question-container'>
        <span className='releated-question-title'>Related Questions</span>
        <ul className='question-detail-ul'>
          {filter?.map(({ id, title, content }) => (
            <li key={id} className='question-detail-li'>
              <Link to={`/questions/${id}`} className='releated-question-link' key={id} onClick={hideForm}>{title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {answerArr.map(({ id, content }) => {
            <li key={id}>
              <span>sdafsdfasdfasd fasdfasdf asdf asdf asdf asdf {content}</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionDetail;
