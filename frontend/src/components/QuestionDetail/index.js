
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';
import { useHistory } from 'react-router-dom';

import QuestionEdit from '../QuestionEdit';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);


  useEffect(() => {
    try {

      const question = dispatch(getQuestionById(id))
    } catch {
      history.push('/404-page-not-found')
    }

    // console.log(question)
    // if (!question) return history.push('/404-page-not-found')
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      {questionObj && (
        <div className='question-detail-container'>
          <span className='question-detail-title'>{questionObj?.title}</span>
          <span className='question-detail-user'>A {questionObj?.User?.username}</span>
          <span>{questionObj?.content}</span>
          <QuestionEdit user={user} question={questionObj} />
        </div>
      )}
    </>
  );
};

export default QuestionDetail;
