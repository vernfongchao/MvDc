import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuestionDetail = () => {


  return (
    <div>
      <span>{title}</span>
      <span>{content}</span>
    </div>
  );
};

export default QuestionDetail;
