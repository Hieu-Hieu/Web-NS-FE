import { useReducer } from "react";

const useValues = (initialValues) => {
    const [values, dispatch] = useReducer((oldValues, newValues) => {
        return { ...oldValues, ...newValues };
    }, initialValues);
    const setValues = (newValues) => {
        dispatch(newValues);
    };
    return [values, setValues];
};

export default useValues;
