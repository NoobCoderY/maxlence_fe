/**
 * App routes configuration for role-based access
 *
 * - Public: NotFoundPage, ForbiddenPage, CandidatePortalPage
 * - Auth: Login, Signup, Forgot/Reset Password, FillUserDetails, VerifyEmail/Token
 * - Protected (all roles): Dashboard, About, Profile, Projects, Leave Management (user/holidays)
 * - Member: Time Tracking, Upload Report (user)
 * - Admin/Super Admin: Reports, User Logs, Employee Onboarding, ATS Dashboard
 * - Super Admin/Admin: Leave Management (admin), Clients, Users, Upload Report (list), Employees (HR Candidate List, Employee Details)
 */

// Core
import { createBrowserRouter } from 'react-router-dom';

// Public pages
import NotFoundPage from './not-found-page';
import ForbiddenPage from './forbidden-page';

// Layouts
import UserLayout from '@/layouts/user-layout';
import AuthLayout from '@/layouts/auth-layout';

// Route guards
import { ProtectedRoute, RoleProtectedRoute } from './protected-route';

// Auth pages
import LoginPage from '@/modules/auth/pages/loginPage';
import SignupPage from '@/modules/auth/pages/signupPage';
import ForgotPasswordPage from '@/modules/auth/pages/forgotPasswordPage';
import ResetPasswordForm from '@/modules/auth/pages/resetPasswordPage';
import VerifyEmailPage from '@/modules/auth/pages/verifyEmailPage';
import GoogleAuthSuccessPage from '@/modules/auth/pages/googleAuthSuccessPage';
import RegistrationThanksPage from '@/modules/auth/pages/registrationThanksPage';

// User profile
import EditProfilePage from '@/modules/users/pages/editProfilePage';
import UpdatePasswordForm from '@/modules/users/components/update-password';

// Users
import UserListPage from '@/modules/users/pages/userListPage';
import UserDetailsPage from '@/modules/users/pages/userDetailsPage';

export const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <div>Home</div>,
          },

          {
            path: '/profile',
            element: <EditProfilePage />,
          },
          {
            path: '/users/list',
            element: <UserListPage />,
          },
          {
            path: '/users/:userId',
            element: <UserDetailsPage />,
          },
          {
            element: (
              <RoleProtectedRoute
                allowedRoles={[
                 'user'
                ]}
              />
            ),
            children: [],
          },

          {
            element: <RoleProtectedRoute allowedRoles={['admin']} />,
            children: [],
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout/>,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordForm />,
      },

      {
        path: '/verify-invite/:token',
        element: <VerifyEmailPage />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },

      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/auth/success',
        element: <GoogleAuthSuccessPage />,
      },
      {
        path: '/auth/thanks',
        element: <RegistrationThanksPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/update-password',
            element: <UpdatePasswordForm />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
  },
]);
