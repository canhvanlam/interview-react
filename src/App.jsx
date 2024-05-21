import { useState } from 'react'
import './assets/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from './constants/routes';
import {Routes, Route, useSearchParams, Navigate} from 'react-router-dom';
import PageNotFound from './pages/404';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import "./App.css"
import { useSelector } from "react-redux";

function App() {
  const { isAuthorized } = useSelector(({ auth }) => ({
    isAuthorized: auth.authToken != null,
  }));
  return (
    <Routes>
      {isAuthorized ? (
        <>
          <Route exact path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={ <Navigate to={ROUTES.HOME} /> }/>
          <Route path={ROUTES.SIGNUP} element={ <Navigate to={ROUTES.HOME} /> }/>
        </>
      ) :
      (
        <>
          <Route exact path={ROUTES.PAGE_NOT_FOUND} element={<Navigate to={ROUTES.LOGIN} />} />
          <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route exact path={ROUTES.SIGNUP} element={<SignupPage />} />
        </>
      )
      }
    </Routes>
  )
}

export default App
