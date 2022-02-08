import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { getQuestionById } from '../../store/question';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  console.log(questionObj)

  useEffect(() => {
    dispatch(getQuestionById(id))
  }, [dispatch, id]);

  return (
    <div className='question-detail-container'>
      <span>{questionObj?.title}</span>
      <span>{questionObj?.User.username}</span>
      <span>{questionObj?.content}</span>
    </div>
  );
};

export default QuestionDetail;
