import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import StockPickerPage from "./features/stockPicker/StockPickerPage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

//init react-router
const router = createBrowserRouter([
  {
    path: "/stock-picker",
    element: <StockPickerPage />,
  },
  {
    path: "/stock-picker/:symbol",
    element: <StockPickerPage />,
  },
]);

//init react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// add system dark mode support
// add form library like react-hook-form or use ant build in once
// To keep timeSeries separate so we use else where
// free API limitation only showing 5 min interval
