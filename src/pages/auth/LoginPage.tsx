import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../section/auth/Login';
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Login />
    </>
  );
}
