import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonLabel,
} from '@ionic/react';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import React, { useState } from 'react';

const Camera: React.FC = () => {
  
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Camera</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
    <IonGrid>
      <IonRow>
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
              </IonCol>
            ))
          ) : (
            <IonLabel className="ion-text-lg-center">Belum ada foto</IonLabel>
          )}
      </IonRow>
    </IonGrid>
    <IonFab vertical="bottom" horizontal="center" slot="fixed">
      <IonFabButton onClick={takePhoto}>
        <IonIcon icon={camera} />
      </IonFabButton>
    </IonFab>

    <IonActionSheet
      isOpen={!!photoToDelete}
      buttons={[
        {
          text: 'Delete',
          role: 'destructive',
          icon: trash,
          handler: () => {
            if (photoToDelete) {
              deletePhoto(photoToDelete);
              setPhotoToDelete(undefined);
            }
          },
        },
        {
          text: 'Cancel',
          icon: close,
          role: 'cancel',
        },
      ]}
      onDidDismiss={() => setPhotoToDelete(undefined)}
    />
  </IonContent>
</IonPage>

  );
};

export default Camera;
