import React, { useState } from 'react';
import { IonFab,IonTabs,IonTabBar,IonTabButton, IonItem, IonRange, IonLabel, IonToast, IonGrid, IonButton, IonCol, IonIcon, IonCard, IonCardContent, IonRow, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonFabButton } from '@ionic/react';
import { cashOutline, pencilOutline } from "ionicons/icons";
import "./Cards.css";
import CardHidden from './CardHidden';
type CardProps = {
    CardCon: React.FunctionComponent;
    fabButton: string;
    startIcon: string;
  };
const Cards: React.FC< CardProps > = (props) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const showContent = () => {
        setIsShow(!isShow);
    }
    const [toastIsShown, setToastIsShown] = useState<boolean>(false);

    const showToast = () => {
        setToastIsShown(true);
    }
    

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
                    <props.CardCon></props.CardCon>
            }
        </IonCard>
    )
}
export default Cards;