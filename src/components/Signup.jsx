import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from './Signupschema';

const handleFormSubmission = (values) =>(
    console.log('Form Data', values)
)

const Signup = () => {
    const formik = useFormik({
        initialValues: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: handleFormSubmission,
      });
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto shadow-md rounded overflow-hidden border mt-32">
    <form onSubmit={formik.handleSubmit} className='border w-full md:w-2/3 p-6 shadow-md '>
        <h1 className='font-bold mb-4'>Sign Up</h1>
        <div className='mb-4'>
            <label className='block font-normal'>First Name</label>
            <input
                id="first_name"
                type='name'
                name='first_name'
                placeholder='First Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
                className='border block p-2 mt-1 w-full rounded'/>
                {formik.touched.first_name && formik.errors.first_name && <p className='text-red-500 text-sm'>{formik.errors.first_name}</p>}
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Last Name</label>
            <input
                id="last_name"
                type='name'
                name='last_name'
                placeholder='Last Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                className='border block p-2 mt-1 w-full rounded'/>
                {formik.touched.last_name && formik.errors.last_name && <p className='text-red-500 text-sm'>{formik.errors.last_name}</p>}
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Email</label>
            <input
                id="email"
                type='email'
                name='email'
                placeholder='Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className='border block p-2 mt-1 w-full rounded'/>
                {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm'>{formik.errors.email}</p>}
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Password</label>
            <input
                id="password"
                type='password'
                name='password'
                placeholder='Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className='border block p-2 mt-1 w-full rounded'/>
                {formik.touched.password && formik.errors.password && <p className='text-red-500 text-sm'>{formik.errors.password}</p>}
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Confirm Password</label>
            <input
                id="confirm_password"
                type='password'
                name='confirm_password'
                placeholder='Confirm Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
                className='border block p-2 mt-1 w-full rounded'/>
                {formik.touched.confirm_password && formik.errors.confirm_password && <p className='text-red-500 text-sm'>{formik.errors.confirm_password}</p>}
        </div>
        <div className='mb-4'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-4 rounded'>Sign Up</button>
        </div>
        <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium">
        Sign In now
        </a>
        </p>
    </form>
    <div className="hidden md:block w-full md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1000&q=80"
          alt="Laptop on clean workspace"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default Signup