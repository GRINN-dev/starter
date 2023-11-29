"use client"

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormFieldContext,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"
import { Input } from "@/components/ui/input"

interface InputFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: JSX.Element | string
  type: "text" | "number" | "email" | "datetime-local" | "date" | "time" | "tel"
  description?: JSX.Element | string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export const InputFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  type,
  description,
  placeholder,
  required,
  disabled,
  ...props
}: InputFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-rubik-regular text-xs font-extrabold uppercase tracking-widest text-slate-900">
              {label}
              {required && <span className="pl-1 text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                disabled={disabled}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <div className="min-h-4 h-4">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  )
}