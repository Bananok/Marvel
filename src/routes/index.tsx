import { RouteObject } from "react-router-dom";

import About from "./About";
import Characters from "./Characters";
import Comics from "./Comics";
import Favourites from "./Favourites";
import Series from "./Series";

export const routes: RouteObject[] = [
  {
    path: "404",
    element: <div>Not Found</div>,
  },
  {
    path: "/",
    children: [
      { index: true, element: <Characters /> },
      {
        path: "/:id",
        element: <About entities="characters" />,
      },
    ],
  },
  {
    path: "/comics",
    children: [
      { index: true, element: <Comics /> },
      {
        path: "/comics/:id",
        element: <About entities="comics" />,
      },
    ],
  },
  {
    path: "/series",
    children: [
      { index: true, element: <Series /> },
      {
        path: "/series/:id",
        element: <About entities="series" />,
      },
    ],
  },
  {
    path: "/favourites",
    children: [{ index: true, element: <Favourites /> }],
  },
];
