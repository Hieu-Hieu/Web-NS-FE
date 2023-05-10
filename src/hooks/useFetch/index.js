import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRouting } from "src/utils/router";
import useValues from "../useValues";

const useFetch = (initialParams, request) => {
    const rid = useRef(0);
    const defaultValues = {
        loading: false,
        data: [],
        pagination: { showSizeChanger: false, current: 1, pageSize: 0, total: 0 },
    };
    const [values, setValues] = useValues(defaultValues);
    const fetchParams = useRef(initialParams);
    const navigate = useNavigate();
    const { generate } = useRouting();
    const fetch = (params, reload = false) => {
        let rl = reload;
        if (!rl) {
            for (const key in params) {
                if (params[key] !== fetchParams.current[key]) {
                    rl = true;
                    break;
                }
            }
        }
        fetchParams.current = { ...fetchParams.current, ...params };
        if (!rl) {
            return;
        }
        const id = ++rid.current;
        setValues({ loading: true });
        request(fetchParams.current).then(({ status, data, message, pagination }) => {
            if (rid.current != id) {
                return;
            }
            if (status) {
                setValues({ loading: false, data, pagination });
                if (message) {
                    // notification.success({ message });
                }
            } else {
                setValues({ loading: false, data: [] });
                if (message) {
                    if (message === "Assignment not found!") {
                        navigate(generate("not-found"));
                    }
                    // notification.error({ message });
                }
            }
        });
    };
    const refetch = () => fetch({}, true);
    return [values.loading, values.data, values.pagination, fetch, refetch];
};

export default useFetch;
