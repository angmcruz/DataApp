import React, { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonItem, IonLabel, IonInput,
  IonButton, IonList, IonCard, IonCardHeader, IonCardTitle
} from '@ionic/react';
import { getDB } from '../db';

const Clientes: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [clientes, setClientes] = useState<any[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // ✅ nuevo estado

  // Cargar clientes desde SQLite
  const cargarClientes = async () => {
    try {
      const db = getDB();
      const res = await db.query('SELECT * FROM clientes ORDER BY id DESC');
      setClientes(res.values ?? []);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  // Insertar nuevo cliente
const guardarCliente = async () => {
  if (!nombre.trim()) {
    console.warn("Nombre vacío");
    return;
  }

  try {
    const db = getDB();
    const fecha = new Date().toISOString();

    await db.run(
      'INSERT INTO clientes (nombre, updated_at, sync_status) VALUES (?, ?, ?)',
      [nombre, fecha, 'pendiente']
    );
    const res = await db.query('SELECT * FROM clientes ORDER BY id DESC');
    console.log('🧾 Clientes después del insert:', res.values);

    setNombre('');
    setMostrarFormulario(false); // Oculta el formulario
    await cargarClientes();      // Fuerza recarga de la lista

  } catch (error) {
    console.error('Error al guardar cliente:', error);
  }
};

  useEffect(() => {
    cargarClientes();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Clientes</h2>

        <IonButton expand="block" onClick={() => setMostrarFormulario(!mostrarFormulario)} className="ion-margin-bottom">
          {mostrarFormulario ? 'Cancelar' : 'Agregar Cliente'}
        </IonButton>

        {mostrarFormulario && (
          <>
            <IonItem>
              <IonLabel position="floating">Nombre del cliente</IonLabel>
              <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} />
            </IonItem>

            <IonButton expand="block" onClick={guardarCliente} className="ion-margin-top">
              Guardar Cliente
            </IonButton>
          </>
        )}

        <IonList>
          {clientes.map(c => (
            <IonCard key={c.id}>
              <IonCardHeader>
                <IonCardTitle>{c.nombre}</IonCardTitle>
                <p><small>{c.updated_at}</small></p>
              </IonCardHeader>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Clientes;
