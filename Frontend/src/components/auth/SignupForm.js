import { useForm } from 'react-hook-form';
import FormInputError from '../../UI/form/FormInputError';
import TextInput from '../../UI/form/TextInput';

const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm();

  const submitHandler = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
        validation={{ required: true }}
      />
      {formState.errors.password && (
        <FormInputError>Password must not be empty.</FormInputError>
      )}

      <button
        type="submit"
        className="bg-white rounded-xl my-4 py-2 px-8 self-center"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
