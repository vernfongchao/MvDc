import React,{useEffect} from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import AnswerFormModal from '../../Answers/AnswerForm';
import EditDeleteModal from '../QuestionEditDeleteModal';
import Answers from '../../Answers/AnswerDetails';

import './QuestionDetail.css'

const QuestionDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const questionObj = useSelector((state) => state.questionState.questions[id])
  const user = useSelector(state => state.session.user);
  const questions = useSelector((state) => state.questionState.questions)


  if (!questionObj) {
    history.push('/404')
  }

  const shuffle = arr => {

    let index = arr.length;

    while (index != 0) {
      let randomIndex = Math.floor(Math.random() * index)
      index--

      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
    }

    return arr
  }

  let filter = Object.values(questions).filter((question) => question?.id !== questionObj?.id).slice(0, 9)
  shuffle(filter).slice(0, 9)

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  return (
    <div className='question-detail-page-container'>
      <img src="https://static3.srcdn.com/wordpress/wp-content/uploads/2021/03/Darkseid-vs-thanos-Justice-league-snyder-cut-Avengers-infinity-war-.jpg"
        alt='Batman vs Ironman'
        className='home-page-background'
      >
      </img>
      <div className='question-detail-answer-container'>

        {questionObj && (
          <div className='question-detail-outer'>
            <div className='question-detail-container'>
              {user?.id === questionObj?.userId && <EditDeleteModal question={questionObj} />}
              <span className='question-detail-title'>{questionObj?.title}</span>
              <span className='question-detail-user'>Asked by: {questionObj?.User?.username}</span>
              <span className='question-detail-content'>{questionObj?.content}</span>
              {(user) && (user?.id !== questionObj?.userId) && (<AnswerFormModal question={questionObj} />)}
            </div>
          </div>
        )}
        <Answers id={questionObj?.id} />
      </div>
      <div className='related-question-container'>
        <span className='releated-question-title'>Related Questions:</span>
        <ul className='question-detail-ul'>
          {filter?.map(({ id, title, content }) => (
            <li key={id} className='question-detail-li'>
              <NavLink to={`/questions/${id}`} className='releated-question-link' id={id}>{title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionDetail;
