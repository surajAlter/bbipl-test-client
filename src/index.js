import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Layout from "./layout/Layout";
import Home from "./layout/Home";
import Error from "./Error.jsx";
import Signup from "./authentication/officials/SignUp.jsx";
import Login from "./authentication/officials/Login.jsx";
import WorkerAttendance from "./pages/officials/constructions/WorkerAttendance.jsx";
import About from "./pages/About.jsx";
// import Services from './pages/Services.jsx';
import MainServices from "./pages/services/MainService.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DeveloperAttendanceForm from "./pages/DeveloperAttendanceForm.jsx";
import FinanceAttendanceForm from "./pages/DevAndFinAttendanceForm.jsx";
import UserDashboard from "./pages/users/UserDashboard.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import RequirementForm from "./pages/forms/Requirements.jsx";
import LoanApplicationForm from "./pages/forms/LoanApplicationForm.jsx";

// login
import UserForgotPassword from "./authentication/users/UserForgotPassword.jsx";
import UserLogin from "./authentication/users/UserLogin.jsx";
import UserSignUp from "./authentication/users/UserSignUp.jsx";

//officials

import OfficialForgotPasswordForAdm from "./authentication/officials/OfficialForgotPasswordForAdm.jsx";
import OfficialForgotPasswordForDev from "./authentication/officials/OfficialForgotPasswordForAdm.jsx";
import OfficialForgotPasswordForConAndFin from "./authentication/officials/OfficialForgotPasswordForConAndFin.jsx";
import ForgotPassword from "./authentication/officials/ForgotPassword.jsx";
import ConstructionsDashBoard from "./pages/officials/constructions/ConstructionsDashBoard.jsx";
import Logout from "./components/admin/Logout.jsx";
import FinanceDashBoard from "./pages/officials/finance/FinanceDashBoard.jsx";
import OfficialDashboard from "./pages/officials/OfficialDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

//contexts
import { UserProvider } from "./context/UserContext";

// const routerFromelements=
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<Error />}>
			<Route path="" element={<Home />}></Route>
			{/* login */}
			<Route
				path="authentication/officials/officials-login"
				element={<Login />}
			></Route>

			<Route path="authentication/logout" element={<Logout />} />

			<Route
				path="authentication/officials/forgot-password"
				element={<ForgotPassword />}
			></Route>

			{/* <Route
				path="authentication/officials/cons-and-fin-forgot-password"
				element={<OfficialForgotPasswordForConAndFin />}
			></Route>
			<Route
				path="bbipl-dev-forgot"
				element={<OfficialForgotPasswordForDev />}
			></Route>
			<Route
				path="bbipl-adm-forgot"
				element={<OfficialForgotPasswordForAdm />}
			></Route> */}

			{/* user */}
			<Route
				path="authentication/users/user-login"
				element={<UserLogin />}
			></Route>
			<Route
				path="authentication/users/user-sign-up"
				element={<UserSignUp />}
			></Route>
			<Route
				path="authentication/users/user-forgot-password"
				element={<UserForgotPassword />}
			></Route>
			<Route
				path="pages/user-dashboard"
				element={<UserDashboard />}
			></Route>
			{/* <Route path="authentication/sign-up" element={<Signup />}></Route> */}
			<Route
				path="pages/admin-dashboard"
				element={
					<ProtectedRoute requiredRole="admin">
						<AdminDashboard />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="pages/admin"
				element={
					<ProtectedRoute requiredRole="admin">
						<Admin />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="pages/manager-dashboard"
				element={
					<ProtectedRoute requiredRole="manager">
						<OfficialDashboard />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="pages/backend-support-dashboard"
				element={
					<ProtectedRoute requiredRole="backendSupport">
						<OfficialDashboard />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="pages/team-leader-dashboard"
				element={
					<ProtectedRoute requiredRole="teamLeader">
						<OfficialDashboard />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="pages/telecaller-dashboard"
				element={
					<ProtectedRoute requiredRole="telecaller">
						<OfficialDashboard />
					</ProtectedRoute>
				}
			></Route>
			<Route
				path="pages/developer-attendance-form"
				element={<DeveloperAttendanceForm />}
			></Route>
			<Route
				path="pages/finance-attendance-form"
				element={<FinanceAttendanceForm />}
			></Route>

			{/* contructions -route */}
			<Route
				path="pages/construction-dashboard"
				element={<ConstructionsDashBoard />}
			></Route>
			<Route path="pages/about" element={<About />}></Route>
			<Route path="pages/services" element={<MainServices />}></Route>
			<Route path="pages/contact-us" element={<ContactUs />}></Route>
			<Route
				path="pages/forms/requirements"
				element={<RequirementForm />}
			></Route>
			<Route
				path="pages/dashboard/finance"
				element={<FinanceDashBoard />}
			></Route>
			<Route
				path="loan-application-form"
				element={<LoanApplicationForm />}
			></Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router}></RouterProvider>
		</UserProvider>
	</React.StrictMode>
);
