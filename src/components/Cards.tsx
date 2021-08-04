import React, { useState } from 'react';
import { IonFab,IonTabs,IonTabBar,IonTabButton, IonItem, IonRange, IonLabel, IonToast, IonGrid, IonButton, IonCol, IonIcon, IonCard, IonCardContent, IonRow, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonFabButton } from '@ionic/react';
import { cashOutline, pencilOutline } from "ionicons/icons";
import "./Cards.css";

const Cards: React.FC<{ fabButton: string; startIcon: string }> = (props) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const showContent = () => {
        setIsShow(!isShow);
    }
    const [toastIsShown, setToastIsShown] = useState<boolean>(false);

    const showToast = () => {
        setToastIsShown(true);
    }
    const [value, setValue] = useState(50);
    const [rangeValue, setRangeValue] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 0, upper: 0 });

    return (
        <IonCard className="card" >
            <IonItem lines="none" className="cardItem">
                <IonIcon className="card-icon" color="danger" icon={props.startIcon} slot="start" />
                <IonCardTitle className="title">{props.children}</IonCardTitle>
                <IonFab horizontal="end" >
                    <IonFabButton className="btn" onClick={showContent} size="small">
                        <IonIcon icon={props.fabButton} ></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonItem>
            {isShow &&
                <IonCardContent className="ion-text-center card-hidden">
                    <IonItem className="budget ion-text-right" lines="full">
                    <IonLabel position="fixed">Enter Budget</IonLabel>
                    <IonInput className="update-budget" type="number"></IonInput>
                    </IonItem>
                    
                    {/* <IonLabel>Budget: {value}</IonLabel>
         
                        <IonRange className="range" color="danger" min={0} value={value} max={250} pin={true} onIonChange={e => setValue(e.detail.value as number)}></IonRange> */}
                    {/* <IonItem>
            <IonLabel>Budget: {value}</IonLabel>
          </IonItem> */}

                    <IonButton  color="primary" onClick={() => showToast()}>Update</IonButton>


                    <IonToast
                        isOpen={toastIsShown}
                        onDidDismiss={() => setToastIsShown(false)}
                        message="Budget Updated!"
                        duration={3000}
                    />

                </IonCardContent>
            }
        </IonCard>
    )
}
export default Cards;