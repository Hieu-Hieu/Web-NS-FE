import React from "react";

interface Item {
    name: string;
    path: string;
    element: React.ReactElement;
}

interface Collection {
    items: Item[];
}

interface Router {
    collection: Collection;
}

declare function useRouting(): {
    generate: (name: string, params: { [key: string]: string } = {}) => string;
};

const router: Router;

export default router;

export { useRouting };
