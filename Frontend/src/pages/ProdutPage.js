// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ChaletPage = () => {
//   const [chalet, setChalet] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
//   const params = useParams();
//   // our dynamic segment was called chaletId, so we can access it as follows:
//   const chaletId = params.chaletId;

//   // now simply use useEffect to fetch the chalet's data

//   useEffect(() => {
//     const fetchAbortController = new AbortController();
//     const fetchSignal = fetchAbortController.signal;

//     const fetchChaletDetails = async () => {
//       try {
//         // send an HTTP GET request to the get chalets route we defined in our Express REST API
//         const response = await fetch(
//           `http://localhost:5000/chalets/${chaletId}`,
//           {
//             signal: fetchSignal
//           }
//         );
//         // parse the response content to JSON and store it into data variable
//         const data = await response.json();

//         // If there is an HTTP error (the response is NOT ok), throw the error message we get from the REST API.
//         if (!response.ok) {
//           // remember, in our REST API we return an error message in our response that has the key 'error'.
//           throw Error(data.error);
//         }

//         // we now need to set our component state to the chalets we fetched
//         setChalet(data.chalet);

//         // after we set the chalets' state, let's set the loading state to false
//         setIsLoading(false);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };

//     fetchChaletDetails();

//     return () => {
//       fetchAbortController.abort();
//     };
//   }, [chaletId]);

//   if (isLoading) {
//     return <h1>Please wait while loading chalet details...</h1>;
//   }

//   if (!chalet) {
//     return <h1>Couldn't find chalet...</h1>;
//   }

//   return (
//     // el chalet
//     <div className="flex justify-center items-center w-screen gap-8 flex-wrap">
//       <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl">
//         <h1 className="font-bold text-4xl">{chalet.name}</h1>
//         <img
//           src={chalet.imgURL}
//           alt={chalet.name}
//           className="object-scale-down h-[300px] bg-white p-10 rounded-3xl"
//         />
//         <p className="text-lg">{chalet.description}</p>
//         <h3 className="text-lg font-bold"> {chalet.supplierId.name}</h3>
//         <h3 className="text-lg font-bold">{chalet.price} EGP</h3>
//       </div>
//       {/* 7eta elle ganb el porduct */}
//       <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl">
//         <h1 className="font-bold text-4xl">{chalet.supplierId.name}</h1>
//         <img
//           src={chalet.supplierId.imgURL}
//           alt={chalet.supplierId.name}
//           className="object-scale-down h-[300px] bg-white p-10 rounded-3xl"
//         />
//         <h2 className="text-lg">{chalet.supplierId.email} EGP</h2>
//         <h2 className="text-lg">{chalet.supplierId.address}</h2>
//       </div>
//     </div>
//   );
// };

// export default ChaletPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RentChaletForm from '../components/products/RentChaletForm';

const ProdutPage = () => {
  const [chalet, setChalet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
  const params = useParams();
  // our dynamic segment was called productId, so we can access it as follows:
  const chaletId = params.chaletId;

  // now simply use useEffect to fetch the product's data

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchChaletDetails = async () => {
      try {
        // send an HTTP GET request to the get chalets route we defined in our Express REST API
        const response = await fetch(
          `http://localhost:5000/chalets/${chaletId}`,
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
        setChalet(data.chalet);

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
  }, [chaletId]);

  if (isLoading) {
    return <h1>Please wait while loading chalet details...</h1>;
  }

  if (!chalet) {
    return <h1>Couldn't find chalet...</h1>;
  }

  return (
    //Card el chalet
    <div className="flex justify-center items-center w-screen gap-8 flex-wrap">
      <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl">
        <h1 className="font-bold text-4xl">{chalet.name}</h1>
        { <h3 className="text-4xl">{chalet.govId.name}</h3> } 
        {/* Lazem tekun wa5da mo7afza */}
        {/* <h2 className="font-bold text-4xl">{chalet.govId}</h2> */}
        {/* <h1 className="font-bold text-4xl">{chalet.govId.name}</h1> */}
        {/* <h2 className="font-bold text-4xl">{chalet.governoratesId.name}</h2> */}

        
        <img
          src={chalet.imgURL}
          alt={chalet.name}
          className="object-scale-down h-[300px] bg-white p-10 rounded-3xl"
        />
        {/* <p className="text-lg">{chalet.governoratesId.name}</p> ID's Dol elle 3amlin mashakel */}
        <h3 className="text-4xl">{chalet.email}</h3>
        <h3 className="text-4xl">{chalet.address}</h3>

        <h3 className="text-lg font-bold">{chalet.price} EGP</h3>
      </div>
     {/* <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl"> */}
     <RentChaletForm info={chalet._id} />
        
      {/* </div> */}
    </div>

    
    
  );
};

export default ProdutPage;


    {/* Card elle ganb el chalet */}
      {/* <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl">

        
      </div> */}
        {/* <h1 className="font-bold text-4xl">{chalet.supplierId.name}</h1> */}
        {/* <img

          className="object-scale-down h-[300px] bg-white p-10 rounded-3xl"
        /> */}
          // src={chalet.governoratesId.name}     DOL ELLE 3AMLIN MOSHKELA
          // alt={chalet.governoratesId.name}
{/* <h2 className="text-lg">{chalet.supplierId.email} EGP</h2>
        <h2 className="text-lg">{chalet.supplierId.address}</h2> */}