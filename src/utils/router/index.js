import routes from "src/routes";
import { generatePath } from "react-router-dom";
import { useSelector } from "react-redux";

class RouteCollection {
  items;
  constructor(items) {
    this.items = items;
  }
}

class Route {
  name;
  path;
  element;
  layout;
  role;
  constructor(data) {
    this.name = data.name;
    this.path = data.path;
    this.element = data.element;
    this.layout = data.layout;
    this.role = data.role || [];
  }
}

class Router {
  collection = null;
  constructor(routes) {
    const items = [];
    routes.forEach((raw) => {
      items.push(new Route(raw));
    });
    this.collection = new RouteCollection(items);
  }
}

const router = new Router(routes);

export const useRouting = () => {
  const lang = useSelector((state) => state.general.lang);
  const generate = (name, params = {}) => {
    const route = router.collection.items.find((r) => r.name === name);
    if (route) {
      params.lang = lang;
      return generatePath(`/:lang${route.path}`, params);
    }
    return "";
  };
  return { generate };
};

export default router;
