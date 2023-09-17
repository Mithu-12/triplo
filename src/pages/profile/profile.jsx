import React from 'react';
import { useForm } from 'react-hook-form';
import { json } from 'react-router-dom';

function Profile() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch('http://localhost:8800/api/payment/payment-process',{
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res=> res.json())
    .then(res=>{

      console.log(res)
    })
  };

  return (
    <div className='p-28'>
      <h2>Sample Form with react-hook-form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format"
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { required: "Age is required", min: 0 })}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Profile;
