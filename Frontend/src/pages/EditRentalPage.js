import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditRentalForm from '../components/products/EditRentalForm';

const EditRentalPage = () => {
  const [rental, setRental] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  // // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
  // const params = useParams();
  // // our dynamic segment was called productId, so we can access it as follows:
  // const rentalId = params.rentalId;

  // now simply use useEffect to fetch the product's data

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchRentalDetails = async () => {
      try {
        // send an HTTP GET request to the get chalets route we defined in our Express REST API
        const response = await fetch(
          `http://localhost:5000/rentals/user/${userId}`,
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
        setRental(data.rental);

        // after we set the products' state, let's set the loading state to false
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRentalDetails();

    return () => {
      fetchAbortController.abort();
    };
  }, [userId]);

  if (isLoading) {
    return <h1>Please wait while loading your rental details...</h1>;
  }

  if (!rental) {
    return <h1>Couldn't find rental...</h1>;
  }

  return (
      <div>
       <EditRentalForm rental={rental} />
     </div>
    
  );
};

export default EditRentalPage;