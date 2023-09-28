import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../store/authContext';
import FormInputError from '../../UI/form/FormInputError';
// import SelectInput from '../../UI/form/SelectInput';
// import TextAreaInput from '../../UI/form/TextAreaInput';
import TextInput from '../../UI/form/TextInput';

const RentChaletForm = (props) => {
  const { register, handleSubmit, formState } = useForm();
  const userId = localStorage.getItem('userId');

  const authContext = useContext(AuthContext);

  // const governoratesOptions = props.info.map((s) => {
  //   return { name: s.name, value: s._id };
  // });

  const submitHandler = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/rentals`, {
        method: 'POST',
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

  return (
    <form
      className="flex  flex-col p-10 gap-5 bg-gray-800 w-fit"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextInput
        label="Start Date"
        type="date"
        name="startDate"
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
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>End Date must not be empty</FormInputError>
      )}
      <TextInput
        label=""
        type="hidden"
        name="chaletId"
        value={props.info}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.chaletId && (
        <FormInputError>chaletId must not be empty</FormInputError>
      )}
      <TextInput
        label=""
        type="hidden"
        name="userId"
        value={userId}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.userId && (
        <FormInputError>userId must not be empty</FormInputError>
      )}
      <button
        type="submit"
        className="bg-white rounded-xl my-4 py-2 px-8 self-center"
      >
        Rent Chalet
      </button>
    </form>
  );
};

export default RentChaletForm;