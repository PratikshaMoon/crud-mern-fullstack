/**
 * The above code is a React component that allows users to update their information by making a PATCH
 * request to the backend API.
 * @returns The Update component is returning a JSX element, which is a form for updating user data.
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  //getting data of a single user to edit it
  const getSingleUser = async()=>{
    const response = await fetch(`https://mernbymoon.onrender.com//${id}`)

    const result = await response.json()
    console.log(result)
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("")
      //seeing data
      console.log(result)

      setEmail(result.email)
      setAge(result.age)
      setName(result.name)
      
    }
  }

  //send updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    try {
      const response = await fetch(`https://mernbymoon.onrender.com//${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update user data: ${response.statusText}`);
      }
  
      navigate('/all');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(()=>{
    getSingleUser()
  },[])



  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}

<h1 clasName='text-center'>Edit Data</h1>

<form onSubmit={handleUpdate} >
<div className="mb-3">
<label className="form-label">Name</label>
<input type="text" className="form-control" value={name}
onChange={(e)=>{
setName(e.target.value)
}
}
/>
</div>

<div className="mb-3">
<label className="form-label">Email Address</label>
<input type="email" className="form-control" 
value={email}
onChange={(e)=>{
setEmail(e.target.value)
}
}
/>
</div>

<div className="mb-3">
<label className="form-label">Number</label>
<input type="number" className="form-control"
value={age}
onChange={(e)=>{
setAge(e.target.value)
}
}
/>
</div>


<button type="submit" className="btn btn-primary">Submit</button>
</form>
      
      </div>
  );
};

export default Update;
