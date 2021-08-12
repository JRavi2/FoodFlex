import React, { Dispatch } from "react";
import {
    IonPage,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonContent,
} from '@ionic/react';
import "./Payment.css"
type PaymentProps = {
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    setHomeName: Dispatch<React.SetStateAction<string>>;
    userName: string;
    phoneNumber: number;
    amountPaid: number;
};
const Payment: React.FC<PaymentProps> = (props) => {
    return (
        <IonPage>
            <IonContent color="secondary">
                <div className="pay-logo">
                    <img src="https://i.postimg.cc/YSm0wwDW/pay2.png" alt="Ionic logo" />
                </div>
                <IonCard color="secondary" className="ion-text-center pay-card">
                    <IonCardHeader >
                        <IonCardTitle className="user-title" ><p className="head">{props.userName}</p></IonCardTitle>
                        <IonCardSubtitle className="num">+91 {props.phoneNumber}</IonCardSubtitle>
                        <IonCardSubtitle className="transfer-date">Transfer on Aug 23 2021</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="cardcon">
                        <h1 className="amt"><strong>- {props.amountPaid}</strong></h1>
                        <IonButton color="tertiary" expand="full" shape="round" fill="outline">Send</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )

}

export default Payment;