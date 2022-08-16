import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { GlobalStyle } from "./styles/GlobalStyles";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Home from "./views/Home/Home";
import Registered from "./views/Registered/Registered";
import Donate from "./views/Donate/Donate";

const NotFound = lazy(() => import ("./views/NotFound/NotFound"));

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <GlobalStyle />
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
              <Login />
            </motion.div>
          } />
          <Route path="/register" element={
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
              <Register />
            </motion.div>
          } />
          <Route path="/registered/:teamID" element={
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
              <Registered />
            </motion.div>
          } />
          <Route path="*" element={
            <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
              <Suspense fallback={<>...</>}>
                <NotFound />
              </Suspense>
            </motion.div>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                <Home />
              </motion.div>
            </ProtectedRoute>
          } />
          {/* <Route path="/registered/:teamID" element={
            <ProtectedRoute>
              <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                <Registered />
              </motion.div>
            </ProtectedRoute>
          } /> */}
          <Route path="/donate" element={
            <ProtectedRoute>
              <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
                <Donate />
              </motion.div>
            </ProtectedRoute>
          } />
        </Routes>
    </AnimatePresence>
  );
}

export default App;
