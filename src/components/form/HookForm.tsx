import HomeButton from '../HomeButton.tsx';
import { FieldValues, useForm } from 'react-hook-form';

function HookForm() {
  // These are some handy properties we can destructure form useForm Hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  // If not done inline, this is the convention for naming the function used as an argument for handleSubmit()
  const onSubmit = async (data: FieldValues) => {
    // We are not really submiting, are we?
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <section className='container mx-auto p-2 min-h-screen flex flex-col justify-center items-center'>
      <HomeButton />
      <h1 className='text-amber-500 uppercase text-4xl text-center py-4'>
        React Hook Form
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-2 my-4'>
        <input
          // we are spreading register to have access to all the props
          {...register('email', {
            required: 'Email is required',
            // Making sure email is of email format
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type='email'
          placeholder='email'
          className='px-4 py-2 rounded'
        />
        {errors.email && (
          <p className='text-red-500'>{`${errors.email.message}`}</p>
        )}
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 10,
              message: 'Password must be at least 10 characters',
            },
          })}
          type='password'
          placeholder='password'
          className='px-4 py-2 rounded'
        />
        {errors.password && (
          <p className='text-red-500'>{`${errors.password.message}`}</p>
        )}
        <input
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: (value) =>
              value === getValues('password') || 'Passwords must match',
          })}
          type='password'
          placeholder='confirm password'
          className='px-4 py-2 rounded'
        />
        {errors.confirmPassword && (
          <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
        )}
        <button
          type='submit'
          disabled={isSubmitting}
          className='bg-amber-500 disabled:bg-gray-500 py-2 rounded'>
          Submit
        </button>
      </form>
    </section>
  );
}

export default HookForm;
