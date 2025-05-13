import React from 'react'

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto shadow-md rounded overflow-hidden border mt-32">
    <form className='border w-full md:w-2/3 p-6 shadow-md '>
        <h1 className='font-bold mb-4'>Sign Up</h1>
        <div className='mb-4'>
            <label className='block font-normal'>First Name</label>
            <input
                id="first_name"
                type='name'
                name='first_name'
                placeholder='First Name'
                className='border block p-2 mt-1 w-full rounded'
                />
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Last Name</label>
            <input
                id="last_name"
                type='name'
                name='last_name'
                placeholder='Last Name'
                className='border block p-2 mt-1 w-full rounded'/>
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Email</label>
            <input
                id="email"
                type='email'
                name='email'
                placeholder='Email'
                className='border block p-2 mt-1 w-full rounded'/>
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Password</label>
            <input
                id="password"
                type='password'
                name='password'
                placeholder='Password'
                className='border block p-2 mt-1 w-full rounded'/>
        </div>
        <div className='mb-4'>
            <label className='block font-normal'>Confirm Password</label>
            <input
                id="confirm_password"
                type='password'
                name='confirm_password'
                placeholder='Confirm Password'
                className='border block p-2 mt-1 w-full rounded'/>
        </div>
        <div className='mb-4'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-4 rounded'>Sign Up</button>
        </div>
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