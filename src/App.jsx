import { useState, useEffect} from 'react'
import './assets/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from './constants/routes';
import {Routes, Route, useSearchParams, Navigate} from 'react-router-dom';
import PageNotFound from './pages/404';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import "./App.css"
import { AuthApi} from './apis/identity/auth';
import { useQuery} from "@tanstack/react-query";
import {userLoggedIn} from './redux/actions/user.actions';
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();
  const { data: userData = {}} = useQuery({
    queryKey: ['userData'],
    queryFn: () => AuthApi.getUser(authToken),
    enabled: !!authToken
  });
  useEffect(() => {
    if (userData && Object.keys(userData).length !== 0) {
      dispatch(userLoggedIn(userData));
    }
  }, [userData, dispatch]);
  return (
    <Routes>
          <Route path={ROUTES.HOME} element={authToken ? <HomePage /> : <Navigate to={ROUTES.LOGIN} />} />
          <Route exact path={ROUTES.LOGIN} element={!authToken ? <LoginPage /> :  <Navigate to={ROUTES.HOME} />} />\
          <Route exact path={ROUTES.SIGNUP} element={!authToken ?  <SignupPage /> : <Navigate to={ROUTES.HOME} />} />
          <Route exact path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
          
    </Routes>
  )
}

export default App
