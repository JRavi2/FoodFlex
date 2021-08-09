import React, { Dispatch } from "react";
import {
  IonHeader,
  useIonPopover,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Account.css";
import AccCards from "../components/AccCards";
import { power } from "ionicons/icons";

type AccountProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
  isVendor: boolean;
};

const PopoverList: React.FC<{
  onHide: () => void;
}> = ({ onHide }) => (
  <IonList>
    <IonItem lines="none" button>
      Change Avatar
    </IonItem>
    {/* <IonItem lines="none" detail={false} button onClick={onHide}>
      Close
    </IonItem> */}
  </IonList>
);

const Account: React.FC<AccountProps> = ({ setIsLoggedin, userName, setUsername, setIsVendor, isVendor }) => {
  const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });

  const logout = () => {
    setIsLoggedin(false);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

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
        {true && (
          <div className="ion-padding-top ion-text-center">
            <div>
              <img
                src="https://i.postimg.cc/s1dTZX3G/av4.png"
                onClick={(e) =>
                  present({
                    event: e.nativeEvent,
                  })
                }
                alt="avatar"
              />
            </div>
            <h2>{userName}</h2>
            <AccCards setUsername={setUsername}>Change Username</AccCards>
            <IonItem lines="none" className="acc-item">
              <IonLabel>Logout</IonLabel>
              <IonFab horizontal="end">
                <IonFabButton className="btn" size="small" color="success" onClick={() => logout()}>
                  <IonIcon icon={power}></IonIcon>
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
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Account;
