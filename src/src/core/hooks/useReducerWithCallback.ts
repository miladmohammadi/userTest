import React from "react";
/**
 * Defines the custom dispatch function that wraps the dispatch returned from useReducer.
 */

type CustomReactDispatchWithCallback<A, S> = (action: A, callback?: DispatchCallback<S>) => void;

/**
 * Defines the callback contract. It should be a function that receives the updated state.
 */
type DispatchCallback<S> = (state: S) => void;

/**
 * Wraps `React.useReducer` and provides a custom dispatch function that accepts
 * a callback that will be cached and then invoked when the reducer state changes.
 */
export function useReducerWithCallback<R extends React.Reducer<any, any>, I>(
  reducer: R,
  initialState: I & React.ReducerState<R>,
  initializer: (arg: I & React.ReducerState<R>) => React.ReducerState<R>,
) {
  const callbackRef = React.useRef<DispatchCallback<React.ReducerState<R>>>();

  const [state, dispatch] = React.useReducer(reducer, initialState, initializer);

  React.useEffect(() => {
    callbackRef.current?.(state);
  }, [state]);

  const customDispatch: CustomReactDispatchWithCallback<React.ReducerAction<R>, React.ReducerState<R>> = (
    action,
    callback,
  ) => {
    callbackRef.current = callback;
    dispatch(action);
  };

  return [state, customDispatch] as const;
}
