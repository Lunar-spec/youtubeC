import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Layout from "./components/shared/Layout";
import Sidebar from "./components/shared/Sidebar";
import Loader from "./components/shared/Loader";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Channel = lazy(() => import("./pages/Channel"));
const Results = lazy(() => import("./pages/Results"));

// Loading fallback component
const LoadingFallback = () => (
  <Loader />
);

const App = () => {
  const isAuthenticated = useSelector(state => state.userDetails.token !== null);

  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <div className="absolute top-0 left-0 z-10">
          <Sidebar />
        </div>
        <main className="ml-16 w-full">
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/results" element={<Results />} />
                <Route path="/watch" element={<VideoPage />} />
                <Route
                  path="/channel/:id"
                  element={
                    <ProtectedRoute>
                      <Channel />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;