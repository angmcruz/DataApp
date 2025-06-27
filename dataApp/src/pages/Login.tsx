import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, IonToast } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (usuario === 'admin' && clave === '1234') {
      await Preferences.set({
        key: 'usuario',
        value: JSON.stringify({ nombre: 'admin' }),
      });
      history.push('/home');
    } else {
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Bienvenido a tu dataApp</h1>

        <IonItem>
          <IonLabel position="floating">Usuario</IonLabel>
          <IonInput value={usuario} onIonChange={e => setUsuario(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" value={clave} onIonChange={e => setClave(e.detail.value!)} />
        </IonItem>

        <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">Entrar</IonButton>

        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message="Credenciales incorrectas"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
