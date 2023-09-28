import { useState, useEffect } from 'react';

import AddProductForm from '../components/products/AddProductForm';

const AddChaletPage = () => {
  const [governorates, setGovernorates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchChalets = async () => {
      try {
        const response = await fetch('http://localhost:5000/governorates', {
          signal: fetchSignal
        });
        const data = await response.json();

        if (!response.ok) {
          throw Error(data.error);
        }

        setGovernorates(data.governorates);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchChalets();

    return () => {
      fetchAbortController.abort();
    };
  }, []);

  if (isLoading) {
    return <p>Loading list of existing governorates...</p>;
  }

  return (
    <div>
      <AddProductForm governorates={governorates} />
    </div>
  );
};

export default AddChaletPage;