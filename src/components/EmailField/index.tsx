import React from 'react';
import FormField, {
  type FormFieldProps,
} from '@/components/FormField';
import { Input } from '@/components/ui/input';

export interface EmailFieldProps extends
  Omit<FormFieldProps, 'children'>,
  Omit<React.ComponentProps<'input'>, 'name' | 'defaultValue'> {}

const EmailField = ({
  name,
  defaultValue,
  rules,
  shouldUnregister,
  control,
  disabled,
  ...props
}: EmailFieldProps) => (
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
        type="email"
        {...props}
        {...field}
      />
    )}
  </FormField>
);

export default EmailField;
