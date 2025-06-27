import React, { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonItem, IonLabel, IonInput,
  IonButton, IonList, IonCard, IonCardHeader, IonCardTitle
} from '@ionic/react';
import { getDB } from '../db';

const Productos: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Estamos en productos</h1>
      </IonContent>
    </IonPage>
  );
};

export default Productos;