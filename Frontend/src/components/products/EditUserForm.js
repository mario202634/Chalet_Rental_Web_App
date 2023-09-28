import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../store/authContext';
import FormInputError from '../../UI/form/FormInputError';
import SelectInput from '../../UI/form/SelectInput';
import TextAreaInput from '../../UI/form/TextAreaInput';
import TextInput from '../../UI/form/TextInput';

const EditUserForm = (props) => {
  const { register, handleSubmit, formState } = useForm();
  const userId = localStorage.getItem('userId');
  const authContext = useContext(AuthContext);

  // const userData = props.user.map((s) => {
  //   return { value: s.username };
  // });

  const submitHandler = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
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
  return (
    <form
      className="flex  flex-col p-10 gap-5 bg-gray-800 w-fit"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextInput
        label="Name"
        type="text"
        name="name"
        defaultValue={props.userx.name}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>Name must not be empty</FormInputError>
      )}
      
      <TextInput
        label="Username"
        type="text"
        name="username"
        defaultValue={props.userx.username}
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.username && (
        <FormInputError>Username must not be empty.</FormInputError>
      )}

      <TextInput
        label="Password"
        type="password"
        name="password"
        register={register}
        validation={{ required: false }}
      />
      {formState.errors.password && (
        <FormInputError>Password must not be empty.</FormInputError>
      )}

      <button
        type="submit"
        className="bg-white rounded-xl my-4 py-2 px-8 self-center"
      >
        Update
      </button>
    </form>
  );
};

export default EditUserForm;