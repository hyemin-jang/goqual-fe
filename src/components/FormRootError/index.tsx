import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormRootError = () => {
  const { formState } = useFormContext();
  return (
    formState.errors && formState.errors.root
      ? (
        <div>
          {formState.errors.root.message}
        </div>
      )
      : null
  );
};

export default FormRootError;
