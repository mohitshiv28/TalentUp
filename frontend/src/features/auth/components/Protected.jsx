import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary-foreground">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
