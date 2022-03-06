export interface ValidationFunction {
  (name: string, value?: string): string | undefined | null;
}
export interface ValidationFunctionsComposer {
  (name: string, validator: ValidationFunction): ValidationFunction;
}

export const emailValidator: ValidationFunction = (value: string) => {
  if (!value) {
    return "Email is required";
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "Invalid email address";
  }
  return null;
};

export const passwordValidator: ValidationFunction = (value) => {
  if (!value) {
    return "Password is required";
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (value.length > 20) {
    return "Password must be less than 20 characters";
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/i.test(value)) {
    return "Password must contain at least one lowercase letter, one uppercase letter and one number";
  }
  return null;
};

export const simpleRequiredValidator: ValidationFunction = (name = "This", value) => {
  if (!value) {
    return `${name} field is required`;
  }
  return null;
};

export const composeNameValidator: ValidationFunctionsComposer = (name, validator: ValidationFunction) => {
  return (value) => validator(name, value);
};
