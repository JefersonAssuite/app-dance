import React from "react";
import { NativeBaseProvider } from "native-base"; // 🔹 Importa o NativeBaseProvider
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { auth } from "./services/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <NativeBaseProvider> {/* 🔹 Envolve toda a aplicação */}
      <Router>
        <Routes>
          <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/feed" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
