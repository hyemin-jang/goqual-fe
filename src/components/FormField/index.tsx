import React from 'react';
import {
  ControllerProps,
  FieldPath,
} from 'react-hook-form';

import {
  FormDescription,
  FormField as BaseFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface FormFieldProps<
  TValue = string,
  TName extends FieldPath<Record<string, TValue>> = FieldPath<Record<string, TValue>>,
> extends Omit<ControllerProps<Record<string, TValue>, TName>, 'render'> {
  label?: string;
  description?: string;
  children: (renderProps: Parameters<ControllerProps<Record<string, TValue>, TName>['render']>[0]) => React.ReactNode | React.ReactNode;
}

const FormField = <
  TValue = string,
  TName extends FieldPath<Record<string, TValue>> = FieldPath<Record<string, TValue>>,
>({
    name,
    label,
    description,
    children,
    ...props
  }: FormFieldProps<TValue, TName>) => (
    <BaseFormField<Record<string, TValue>, TName>
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem>
          {
            label && (
              <FormLabel>
                {label}
              </FormLabel>
            )
          }
          {
            typeof children === 'function'
              ? children({ field, fieldState, formState })
              : children
          }
          {
            description && (
              <FormDescription>
                {description}
              </FormDescription>
            )
          }
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );

export default FormField;
