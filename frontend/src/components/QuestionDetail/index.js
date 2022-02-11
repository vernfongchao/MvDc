
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';
import { getFiveQuestions } from '../../store/question';
import { getAnswerByQuestion } from '../../store/answer';
import { getAnswers } from '../../store/answer';

import QuestionEdit from '../QuestionEdit';
import Answers from '../Answers';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);
  const questions = useSelector((state) => state.questionState.questions)
  // const answers = useSelector((state) => state.answerState.answers)
  const questionVal = Object.values(questions)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getQuestionById(id)).then(data => { if (!data) history.push('/404') })
    dispatch(getFiveQuestions())
    dispatch(getAnswers())
  }, []);


  let filter;
  if (questionObj) {
    filter = questionVal.filter((question) => question.id !== questionObj.id)
  }

  const hideForm = (e) => {
    setShowForm(false)
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
              <QuestionEdit user={user} question={questionObj} showForm={showForm} setShowForm={setShowForm} />
            </div>
          </div>
        )}

        <div className='related-question-container'>
          <span className='releated-question-title'>Related Questions</span>
          <ul className='question-detail-ul'>
            {filter?.map(({ id, title, content }) => (
              <li key={id} className='question-detail-li'>
                <Link to={`/questions/${id}`} className='releated-question-link' key={id} onClick={hideForm} id={id}>{title}
                </Link>
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
