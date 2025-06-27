import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home'; // PRINCIPAL
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos'
import { useEffect } from 'react';
import { initDB } from './db';

/* paginas de diseno */ 
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    console.log("se inicia el use")
    const iniciarBD = async () => {
      try {
        await initDB();
        console.log('✅ Base de datos inicializada');
      } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
      }
    };

    iniciarBD();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/clientes" component={Clientes} />
          <PrivateRoute exact path="/productos" component={Productos} />
          <Redirect exact from="/" to="/login" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
 

export default App;
