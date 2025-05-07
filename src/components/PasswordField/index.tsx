import React from 'react';
import FormField, {
  type FormFieldProps,
} from '@/components/FormField';
import { Input } from '@/components/ui/input';

export interface PasswordFieldProps extends
  Omit<FormFieldProps, 'children'>,
  Omit<React.ComponentProps<'input'>, 'name' | 'defaultValue'> {}

const PasswordField = ({
  name,
  defaultValue,
  rules,
  shouldUnregister,
  control,
  disabled,
  ...props
}: PasswordFieldProps) => (
  <FormField
    name={name}
    defaultValue={defaultValue}
    rules={rules}
    shouldUnregister={shouldUnregister}
    control={control}
    disabled={disabled}
    {...props}
  >
    {({ field }) => (
      <Input
        type="password"
        {...props}
        {...field}
      />
    )}
  </FormField>
);

export default PasswordField;
