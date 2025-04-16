import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/Auth/LoginView";
import SignUpView from "./views/Auth/SigUpView";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView/>} index />
        </Route>
        <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginView/>} index />
            <Route path="/auth/signup" element={<SignUpView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}