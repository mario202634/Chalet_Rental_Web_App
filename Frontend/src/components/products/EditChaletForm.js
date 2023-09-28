import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../store/authContext';
import FormInputError from '../../UI/form/FormInputError';
// import SelectInput from '../../UI/form/SelectInput';
import TextAreaInput from '../../UI/form/TextAreaInput';
import TextInput from '../../UI/form/TextInput';

const EditChaletForm = (props) => {
  const { register, handleSubmit, formState } = useForm();
  const userId = localStorage.getItem('userId');
  const authContext = useContext(AuthContext);
  
  const submitHandler = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/chalets/${props.chalet[0]._id}`, {
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
      const response = await fetch(`http://localhost:5000/chalets/${props.chalet[0]._id}`, {
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
        label="Name"
        type="name"
        name="name"
        defaultValue={props.chalet[0].name}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>Chalet name must not be empty</FormInputError>
      )}

    <TextInput
        label="E-Mail"
        type="email"
        name="email"
        defaultValue={props.chalet[0].email}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>E-Mail must not be empty</FormInputError>
      )}

      <TextAreaInput
        label="Address"
        name="address"
        defaultValue={props.chalet[0].address}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.description && (
        <FormInputError>Chalet address must not be empty</FormInputError>
      )}

      {/* <TextAreaInput
        label="Description"
        name="description"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.description && (
        <FormInputError>Chalet description must not be empty</FormInputError>
      )} */}

      <TextInput
        label="Image URL"
        type="text"
        name="imgURL"
        defaultValue={props.chalet[0].imgURL}
        register={register}
      />
      
      <TextInput
        label="Price"
        type="number"
        name="price"
        defaultValue={props.chalet[0].price}
        register={register}
        validation={{ required: true, min: 0 }}
      />
      {formState.errors.price && (
        <FormInputError>Chalet price must be greater than 0.</FormInputError>
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
        Delete Chalet
      </button>
    </form>
  );
};

export default EditChaletForm;