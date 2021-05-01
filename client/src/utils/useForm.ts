import { useState, useEffect } from 'react';

const useForm = <T>(initial: T) => {
  const [inputs, setInputs] = useState<T>(initial);

  useEffect(() => {
    setInputs(initial);
  }, []);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let { value, name, type } = event.currentTarget;

    if (type === 'file') {
      [value] = event.currentTarget.files as any;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const emptyState = Object.keys(inputs).reduce(
      (acc, key) => ({
        ...acc,
        [key]: '',
      }),
      {}
    );
    setInputs(emptyState as T);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
