import React, { useState ,Dispatch} from 'react';
import { IonFab, IonTabs,IonAlert, IonTabBar, IonTabButton, IonItem, IonRange, IonLabel, IonToast, IonGrid, IonButton, IonCol, IonIcon, IonCard, IonCardContent, IonRow, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonFabButton } from '@ionic/react';
import { pencilOutline } from "ionicons/icons";
import "./AccCards.css";
type UserProps = {
    setUsername: Dispatch<React.SetStateAction<string>>;
  };
const AccCards: React.FC<UserProps> = (props,setUsername) => {
    const [showAlert, setShowAlert] = useState(false);
    
    return (
        <React.Fragment>
            <IonItem lines="none" className="acc-item">
                <IonLabel>{props.children}</IonLabel>
                <IonFab horizontal="end" >
                    <IonFabButton className="btn" size="small" onClick={() => setShowAlert(true)}>
                        <IonIcon icon={pencilOutline} ></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonItem>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={'New Username'}
                inputs={[
                    {
                        name: 'name1',
                        type: 'text',
                        placeholder: 'Enter Name',
                          
                    },
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log("Canceled");
                        }
                    },
                    {
                        text: 'Ok',
                        handler: (data) => {
                            var msg = data.name1;
                            props.setUsername(msg);
                        }
                    }
                ]}
            />
            </React.Fragment>

            )
}

            export default AccCards;