import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardData from '../../UI/card/CardData';
import CardActions from '../../UI/card/CardActions';
import CardBody from '../../UI/card/CardBody';
import CardHeader from '../../UI/card/CardHeader';

const UserSummary = (props) => {
  // use the navigate function provided by the useNavigate react router hook
  const navigate = useNavigate();

  const btnOnClickHandler = () => {
    navigate(`/admin/editUser/${props.user._id}`);
  };
  const btnOnClickHandler2 = async() => {
    try {
      const response = await fetch(`http://localhost:5000/user/${props.user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
        //body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }

      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CardData>
      <CardBody>
        <h3 className="font-bold">{props.user.name}</h3>
        <h5>{props.user.username}</h5>
      </CardBody>
      <CardActions>
        <button
          className="bg-white py-3 px-10 font-bold rounded-xl"
          onClick={btnOnClickHandler}
        >
          Edit
        </button>
        <button
          className="bg-white py-3 px-10 font-bold rounded-xl"
          onClick={btnOnClickHandler2}
        >
          Delete
        </button>
      </CardActions>
    </CardData>
  );
};

export default UserSummary;
