
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';
import { getFiveQuestions } from '../../store/question';

import QuestionEdit from '../QuestionEdit';

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


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getQuestionById(id)).then(data => { if (!data) history.push('/404') })
    dispatch(getFiveQuestions())
  }, []);

  let filter;
  if (questionObj) {
    filter = questionVal.filter((question) => question.id !== questionObj.id)
  }


  return (
    <div className='question-detail-page-container'>
      {questionObj && (
        <div className='question-detail-outer'>

          <div className='question-detail-container'>
            <span className='question-detail-title'>{questionObj?.title}</span>
            <span className='question-detail-user'>Asked by: {questionObj?.User?.username}</span>
            <span>{questionObj?.content}</span>
            <QuestionEdit user={user} question={questionObj} />
          </div>
        </div>
      )}
      <div>
        <ul>
          {filter?.map(({ id, title, content }) => (

            <li key={id} >
              <Link to={`/questions/${id}`} key={id} showForm={showForm} setShowForm={setShowForm}>{title}
              </Link>
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionDetail;
