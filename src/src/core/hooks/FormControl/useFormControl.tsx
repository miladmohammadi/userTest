import { useReducerWithCallback } from "../useReducerWithCallback";
import { useEffect, useRef } from "react";

interface IFormControlInitials {
  initialValues: Values;
  validationSchema: IValidationFunctions;
  onSubmit: (values: Values) => void;
}

interface IFormControlHandles {
  handleSubmit: any;
  handleChange: any;
  values: Values;
  errors: Errors;
  touched: Touched;
}

interface IFormControl {
  (props: IFormControlInitials): IFormControlHandles;
}

interface IValidationFunctions {
  [field: string]: (string: string) => string | undefined | null;
}

interface Values {
  [field: string]: any;
}

interface Touched {
  [field: string]: boolean;
}

interface Errors {
  [field: string]: string | undefined | null;
}

type Reducer<S, A> = (prevState: S, action: A) => S;
type Action = any;
const reducer: Reducer<any, Action> = (state, action) => {
  if (action.type === "RESET") {
    return setInitialState(action.payload);
  }
  if (action.type === "CHANGE") {
    return {
      ...state,
      values: {
        ...state.values,
        [action.field]: action.value,
      },
      touched: {
        ...state.touched,
        [action.field]: true,
      },
      errors: {
        ...state.errors,
        [action.field]: action.validationSchema(action.value),
      },
    };
  }
  if (action.type === "SUBMIT") {
    return {
      ...state,
      touched: touchAll(state.values),
      errors: validateAll(state.values, action.validationSchema),
    };
  }
  return state;
};
const touchAll = (values: Values): Touched => {
  return Object.keys(values).reduce((acc, key) => {
    return {
      ...acc,
      [key]: true,
    };
  }, {});
};
const validateAll = (values: Values, validationSchema: IValidationFunctions) => {
  const errors: Errors = {};
  Object.keys(validationSchema).forEach((field) => {
    errors[field] = validationSchema[field](values[field]);
  });
  return errors;
};

const allValid = (errors: Errors) => {
  return Object.values(errors).every((e) => e === null);
};
const setInitialState = (initialValues: Values) => {
  return {
    values: initialValues,
    touched: {},
    errors: {},
  };
};

const useFormControl: IFormControl = ({ initialValues, validationSchema, onSubmit }) => {
  const initialValuesRef = useRef(initialValues);
  const [{ values, errors, touched }, dispatch] = useReducerWithCallback(reducer, initialValues, setInitialState);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    dispatch({ type: "CHANGE", field: name, value, validationSchema: validationSchema[name] });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT", validationSchema: validationSchema }, ({ values, errors }) => {
      if (allValid(errors)) {
        onSubmit(values);
      }
    });
  };

  useEffect(() => {
    if (JSON.stringify(initialValuesRef.current) !== JSON.stringify(initialValues)) {
      dispatch({ type: "RESET", payload: initialValues });
      initialValuesRef.current = initialValues;
    }
  }, [initialValues]);

  return {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
  };
};
export default useFormControl;
