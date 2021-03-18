import { useState, useEffect } from 'react';

const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);

  useEffect(() => {
    setInputs(initial);
  }, []);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let { value, name } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function resetForm() {
    setInputs(initial);
  }

  const clearForm = () => {
    const emptyState = Object.keys(inputs).reduce(
      (acc, key) => ({
        ...acc,
        [key]: '',
      }),
      {}
    );
    setInputs(emptyState);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
