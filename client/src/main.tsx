import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HeaderComponent } from "@/components";
import { MainPage, HistoryPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderComponent />,
    children: [
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "",
        element: <MainPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
