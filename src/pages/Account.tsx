import React, { useState, Dispatch } from 'react';
import { IonHeader,IonFab,IonFabButton,IonIcon, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert, IonLabel } from '@ionic/react';
import './Account.css';
import AccCards from "../components/AccCards";
 import {pencilOutline,power} from "ionicons/icons";

type AccountProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
};

const Account: React.FC<AccountProps> = (props) => {

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  }
  // const [userName, setUsername] = useState<string>("Ramu")

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
      <IonContent className="acc-content">
        {true &&
          (<div className="ion-padding-top ion-text-center">
            <img src="https://i.postimg.cc/KzS4dXGD/av2.png" alt="avatar" />
            <h2>{props.userName}</h2>
            <AccCards setUsername={props.setUsername} >Change Username</AccCards>
            <IonItem lines="none" className="acc-item">
                <IonLabel>Logout</IonLabel>
                <IonFab horizontal="end" >
                    <IonFabButton className="btn" size="small" onClick={() => props.setIsLoggedin(false)}>
                        <IonIcon icon={power} ></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonItem>
          
            {/* <IonList inset> */}
	      {/*
              <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => clicked('Change Password')}>Change Password</IonItem>
	      */}
	      {/* <IonItem lines="none" onClick={() => setIsLoggedin(false) } style={{cursor: "pointer"}}>Logout</IonItem>
            </IonList> */}
          </div>)
        }
      </IonContent>
    </IonPage>
  );
};

export default Account;
