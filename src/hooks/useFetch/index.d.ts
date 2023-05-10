interface Response {
    status: boolean;
    data: any[];
    pagination?: {
        showSizeChanger: boolean;
        current: number;
        pageSize: number;
        total: number;
    };
}

interface RequestFetch<T1> {
    (params: T1): Promise<Response>;
}

interface Dispatch<T1, boolean> {
    (params: T1, reload: boolean = false): void;
}

declare function useFetch<T1>(
    initialParams: T1,
    requestFetch: RequestFetch<T1>
): [boolean, any[], {}, Dispatch<T1, boolean>, () => void];

export default useFetch;
