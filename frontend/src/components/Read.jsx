import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Read = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
 

  async function getData() {
    try {
      const response = await fetch("https://mernbymoon.onrender.com/");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      }

      if (response.ok) {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data");
    }
  }

  const handleDelete = async (_id)=>{
      const response = await fetch(`https://mernbymoon.onrender.com//${_id}`,{
        method: "DELETE"
      })
      const result = await response.json()
      console.log(result)
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      }

      if (response.ok) {
        setData([]);
        
        getData()
        
      }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container my-2 '>

{error && <div class="alert alert-danger">{error}</div>}

      <h2 className="text-center">All Data</h2>
      <div className="row ">
        {data?.map((e) => (
          <div key={e._id} className="col-md-4 col-sm-6 mb-3">
            <div className="card p-3 mb-2 bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title text-white">{e.name}</h5>
                <h6 className="card-subtitle text-white mb-2">{e.email}</h6>
                <h6 className="card-subtitle text-white mb-2 ">Age: {e.age}</h6>
                <button href="#" className="btn btn-danger mx-2"
                onClick={()=>handleDelete(e._id)}
                >Delete</button>
                <Link to={`/${e._id}`} className="btn btn-primary mx-2  ">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
