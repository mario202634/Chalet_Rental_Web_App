// import React, { useState, useEffect } from 'react';

// import EditUserForm from '../components/products/EditUserForm';
// const userId = localStorage.getItem('userId');

// const EditUserPage = () => {
//   const [userz, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAbortController = new AbortController();
//     const fetchSignal = fetchAbortController.signal;

//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/user/6392825ba8af2bf7513483b4`, {
//           signal: fetchSignal
//         });
//         const data = await response.json();

//         if (!response.ok) {
//           throw Error(data.error);
//         }

//         setUser(data.userz);
//         setIsLoading(false);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };

//     fetchUser();

//     return () => {
//       fetchAbortController.abort();
//     };
//   }, [userId]);

//   if (isLoading) {
//     return <p>Loading list of existing governorates...</p>;
//   }
//   if (!userz) {
//     return <h1>Couldn't find user...</h1>;
//   }
//   return (
//     <div>
//       <EditUserForm userz={userz.username} />
//     </div>
//   );
// };

// export default EditUserPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/products/EditUserForm';

const EditUserPage = () => {
  const [userx, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const userId = localStorage.getItem('userId');

  // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
  const params = useParams();
  // // our dynamic segment was called productId, so we can access it as follows:
   const userId = params.userId;

  // now simply use useEffect to fetch the product's data

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchChaletDetails = async () => {
      try {
        // send an HTTP GET request to the get chalets route we defined in our Express REST API
        const response = await fetch(
          `http://localhost:5000/user/${userId}`,

          {
            signal: fetchSignal
          }
        );
        // parse the response content to JSON and store it into data variable
        const data = await response.json();

        // If there is an HTTP error (the response is NOT ok), throw the error message we get from the REST API.
        if (!response.ok) {
          // remember, in our REST API we return an error message in our response that has the key 'error'.
          throw Error(data.error);
        }

        // we now need to set our component state to the products we fetched
        setUser(data.users);

        // after we set the products' state, let's set the loading state to false
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchChaletDetails();

    return () => {
      fetchAbortController.abort();
    };
  }, [userId]);

  if (isLoading) {
    return <h1>Please wait while loading your details...</h1>;
  }

  if (!userx) {
    return <h1>Couldn't find user...</h1>;
  }

  return (
      <div>
       <EditUserForm userx={userx} />
     </div>
    
  );
};

export default EditUserPage;