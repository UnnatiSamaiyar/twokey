import React from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

/**
 * ProtectedRoute is a component that enforces access control for routes.
 *
 * If a user is authenticated (has a valid token), the component renders the route content.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * @component
 * @param {Object} props - The props for the ProtectedRoute component.
 * @param {React.Component} props.component - The component to be rendered if the user is authenticated.
 * @returns {JSX.Element} The rendered JSX element, either the route content or a redirection to the login/home page.
 */
export function ProtectedRoute({ component: Component, ...rest }) {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace state={{ path: location.pathname }} />
  );
}
export default ProtectedRoute