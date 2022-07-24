import React from 'react';
import { Routes, Route } from "react-router-dom";
import Editor from "./components/App/Editor";
import { AppProvider } from "./context/AppContext";
import { PageProvider } from "./context/PageContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {
    return (
        <UserAuthContextProvider>
            <Routes>
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <AppProvider>
                                <PageProvider>
                                    <Editor />
                                </PageProvider>
                            </AppProvider>
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </UserAuthContextProvider>
    );
}

export default App;
