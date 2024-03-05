// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/authHooks/AuthContext";
// import { ReactNode } from "react";

// interface ProtectedRouteProps {
//   redirectPath?: string;
//   children: ReactNode;
// }

// const ProtectedRoute = ({
//   redirectPath = "/login",
//   children,
// }: ProtectedRouteProps) => {
//   const { authState } = useAuth();

//   if (authState.loading) {
//     return <div>Loading...</div>;
//   }

//   if (!authState.isAuthenticated) {
//     //redirect unaunthetiated users
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
