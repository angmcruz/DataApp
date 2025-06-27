import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Preferences.get({ key: 'usuario' });
      if (user.value) {
        setIsAuth(true);
      }
      setAuthChecked(true); // ya se revisó
    };
    checkAuth();
  }, []);

  if (!authChecked) return null; // espera a verificar

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
