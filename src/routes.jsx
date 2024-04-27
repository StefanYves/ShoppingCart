import App from "./App";
import FakeStore from "./utils/FakeStore";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FakeStore />,
      },
    ],
  },
];

export default routes;
