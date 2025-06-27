import { IonContent, IonHeader, IonPage, IonTitle, IonCard, IonButton, IonCardHeader } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div id='header'>
          <h2>Bienvenido</h2>
          <p>Has iniciado sesión correctamente</p>
        </div>
        

        <IonCard className="card1" routerLink="/clientes">
          <img src="/assets/images/Clientes.png" alt="Clients Icon" />
          <IonButton routerLink="/clientes" expand="block">
            Clientes
          </IonButton>
        </IonCard>

        <IonCard className="card1" routerLink="/clientes">
          <img src="/assets/images/Productos.png" alt="Products Icon" />
          <IonButton routerLink="/clientes" expand="block">
            Productos
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
