import { useState } from "react";

//layout
import RootLayout from "./RootLayout.jsx";

//react-router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails";
import Auth from "./Pages/Auth.jsx";
import NotFound from "./Pages/NotFound.jsx";

//components
import PublicRoute from "./components/PublidRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

//toast
import { Toaster } from "react-hot-toast";

import SearchProvider from "./context/SearchProvider.jsx";

//react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthProvider.jsx";

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
function App() {
  const [isAuth, setIsAuth] = useState(true);
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home isAuth={isAuth} setIsAuth={setIsAuth} />,
        },
        {
          path: "create-blog",
          element: (
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          ),
        },
        {
          path: "blog-details/:slug",
          element: <BlogDetails />,
        },
        {
          path: "update-blog/:slug",
          element: <Blog />,
        },
        {
          path: "auth",
          element: (
            <PublicRoute>
              <Auth />
            </PublicRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
