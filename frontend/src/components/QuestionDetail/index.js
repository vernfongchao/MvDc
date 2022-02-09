import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getQuestionById } from '../../store/question';

import QuestionEdit from '../QuestionEdit';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);

  const [showEditForm, setShowEditForm] = useState(false)


  useEffect(() => {
    setShowEditForm(false)
    dispatch(getQuestionById(id))
    window.scrollTo(0, 0);
  }, []);

  // let content = null;
  // if (showEditForm && (user?.id === questionObj.userId)) {
  //   content = (
  //     <QuestionEdit
  //       question={questionObj}
  //       hideForm={() => setShowEditForm(false)}>
  //     </QuestionEdit>
  //   )
  // }
  return (
    <div className='question-detail-container'>
      <span>{questionObj?.title}</span>
      <span>{questionObj?.User?.username}</span>
      <span>{questionObj?.content}</span>
      {/* <div>
        {(!showEditForm && (user?.id === questionObj?.userId)) &&
          (
            <div>
              <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
            </div>
          )}
      </div> */}
      <QuestionEdit />
    </div>
  );
};

export default QuestionDetail;
