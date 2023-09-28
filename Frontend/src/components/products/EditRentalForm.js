import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../store/authContext';
import FormInputError from '../../UI/form/FormInputError';
// import SelectInput from '../../UI/form/SelectInput';
// import TextAreaInput from '../../UI/form/TextAreaInput';
import TextInput from '../../UI/form/TextInput';

const EditRentalForm = (props) => {
  const { register, handleSubmit, formState } = useForm();
  const userId = localStorage.getItem('userId');
  const authContext = useContext(AuthContext);
  
  const submitHandler = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/rentals/${props.rental[0]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${authContext.token}`
        },
        body: JSON.stringify(formData)
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

  const deleteHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rentals/${props.rental[0]._id}/${props.rental[0].chaletId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${authContext.token}`
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
    <form
      className="flex  flex-col p-10 gap-5 bg-gray-800 w-fit"
      // onSubmit={handleSubmit(submitHandler)}
    >
      <TextInput
        label="Start Date"
        type="date"
        name="startDate"
        defaultValue={props.rental[0].startDate.substring(0, 10)}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>Start Date must not be empty</FormInputError>
      )}

       <TextInput
        label="End Date"
        type="date"
        name="endDate"
        defaultValue={props.rental[0].endDate.substring(0, 10)}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>End Date must not be empty</FormInputError>
      )}

      <button
        type="submit"
        onClick={handleSubmit(submitHandler)}
        className="bg-white rounded-xl my-4 py-2 px-8 self-center"
      >
        Update
      </button>
      <button
        type="submit"
        onClick={handleSubmit(deleteHandler)}
        className="bg-white rounded-xl my-4 py-2 px-8 self-center"
      >
        Cancel Rental
      </button>
    </form>
  );
};

export default EditRentalForm;