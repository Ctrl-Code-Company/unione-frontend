import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageContext } from "./LanguageProvider";
import { useTranslation } from "react-i18next";
import { DataProvider } from "./DataContext";

import "./App.css";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import University from "./components/University/University";
import Calculator from "./components/Calculator/Calculator";
import Mock from "./components/Mock/Mock";
import Library from "./components/Library/Library";
import Profile from "./components/Profile/Profile";
import Domestic from "./components/Domestic/Domestic";
import MathTest from "./components/Test/MathFullTest/MathTest/MathTest";
import MathFullTest from "./components/Test/MathFullTest/MathFullTest";
import ComingSoon from "./components/Test/ComingSoon/ComingSoon";
import Chat from "./components/Chat/Chat";
import InternetConnectionAlert from "./components/InternetConnectionAlert/InternetConnectionAlert";
import Price from "./components/Price/Price";
import Loading from "./components/Loading/Loading";
import RecemmondationSystem from "./components/RecommendationSystem/RecemmondationSystem";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const token = localStorage.getItem("token");
  const { language } = useContext(LanguageContext);
  const { i18n } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useLayoutEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };
  if (!isOnline) {
    return <InternetConnectionAlert />;
  }

  const RouteWithChat = ({ children }) => {
    return (
      <>
        <Chat />
        {children}
      </>
    );
  };

  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <RouteWithChat>
                  <Home />
                </RouteWithChat>
              }
            />
            <Route
              path="international"
              element={
                <RouteWithChat>
                  <University />
                </RouteWithChat>
              }
            />
            <Route
              path="domestic"
              element={
                <RouteWithChat>
                  <Domestic />
                </RouteWithChat>
              }
            />
            <Route
              path="recommendations"
              element={
                <ProtectedRoute>
                  <RecemmondationSystem />
                </ProtectedRoute>
              }
            />
            <Route
              path="mock"
              element={
                <RouteWithChat>
                  <DataProvider>
                    <Mock />
                  </DataProvider>
                </RouteWithChat>
              }
            />
            <Route
              path="calculator"
              element={
                <RouteWithChat>
                  <Calculator />
                </RouteWithChat>
              }
            />
            <Route
              path="library"
              element={
                <RouteWithChat>
                  <Library />
                </RouteWithChat>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="mock/confirm/:id"
            element={
              <ProtectedRoute>
                <MathTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="buyCoin"
            element={
              <ProtectedRoute>
                <Price />
              </ProtectedRoute>
            }
          />

          <Route path="profile" element={<Profile />} />
          <Route path="/mock/confirm/:id/test" element={<MathFullTest />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
