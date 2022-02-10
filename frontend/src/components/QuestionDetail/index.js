
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';

import QuestionEdit from '../QuestionEdit';

import './QuestionDetail.css'

const QuestionDetail = ({ key }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);
  const [question, setQuestion] = useState(true)


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getQuestionById(id)).then(data => { if (!data) history.push('/404') })

  }, []);

  // if (!key) {
  //   history.push('/404')
  // }

  return (
    <>
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
    </>
  );
};

export default QuestionDetail;
