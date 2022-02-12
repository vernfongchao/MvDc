
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';
import { getQuestions } from '../../store/question';
import { getAnswers } from '../../store/answer';

import QuestionEdit from '../QuestionEdit';
import Answers from '../Answers';
import AnswerFormModal from '../AnswerForm';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);
  const questions = useSelector((state) => state.questionState.questions)
  const questionVal = Object.values(questions)
  const [showForm, setShowForm] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getQuestionById(id)).then(data => { if (!data) history.push('/404') })
    dispatch(getQuestions())
    dispatch(getAnswers())
    setShowForm(false)
  }, [dispatch, id, history]);


  let filter;
  if (questionObj) {
    filter = questionVal.filter((question) => question.id !== questionObj.id)
  }

  const hideForm = (e) => {
    setShowForm(false)
    setValidationErrors([])
  }

  return (
    <>
      <div className='question-detail-page-container'>
        <img src="https://static3.srcdn.com/wordpress/wp-content/uploads/2021/03/Darkseid-vs-thanos-Justice-league-snyder-cut-Avengers-infinity-war-.jpg"
          alt='Batman vs Ironman'
          className='home-page-background'
        >
        </img>

        {questionObj && (
          <div className='question-detail-outer'>
            <div className='question-detail-container'>

              <span className='question-detail-title'>{questionObj?.title}</span>
              <span className='question-detail-user'>Asked by: {questionObj?.User?.username}</span>
              <span className='question-detail-content'>{questionObj?.content}</span>
              <QuestionEdit user={user}
                question={questionObj}
                showForm={showForm}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                setShowForm={setShowForm} />
              {(user && (user.id !== questionObj?.userId) && <AnswerFormModal />)}
            </div>
          </div>
        )}

        <div className='related-question-container'>
          <span className='releated-question-title'>Related Questions:</span>
          <ul className='question-detail-ul'>
            {filter?.map(({ id, title, content }) => (
              <li key={id} className='question-detail-li'>
                <NavLink to={`/questions/${id}`} className='releated-question-link' onClick={hideForm} id={id}>{title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Answers id={questionObj?.id} />
      </div>

    </>
  );
};

export default QuestionDetail;
