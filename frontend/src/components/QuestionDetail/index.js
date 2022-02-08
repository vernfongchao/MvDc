import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuestionDetail = () => {
  const { id } = useParams()
  console.log(id)
  const questionsObj = useSelector((state) => state.questionState.questions[id])
  // const question = Object.values(questionsObj)
  const { title, content } = questionsObj

  return (
    <div>
      <span>{title}</span>
      <span>{content}</span>
    </div>
  );
};

export default QuestionDetail;
