import React, { useState, Dispatch } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react';
import './Account.css';
import { RouteComponentProps, Redirect } from 'react-router';

type AccountProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
};

const Account: React.FC<AccountProps> = ({ setIsLoggedin }) => {

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  }

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {true &&
          (<div className="ion-padding-top ion-text-center">
            <img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
            <h2>Hello abc</h2>
            <IonList inset>
              <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => clicked('Change Password')}>Change Password</IonItem>
	      <IonItem onClick={() => setIsLoggedin(false) }>Logout</IonItem>
            </IonList>
          </div>)
        }
      </IonContent>
    </IonPage>
  );
};

export default Account;
