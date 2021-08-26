import React, { Dispatch, useState,useRef } from "react";
import {
    IonPage,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    useIonPicker,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonAlert,
} from '@ionic/react';
import "./Payment.css"
import {restaurantOutline, send } from "ionicons/icons";
import Toasts from "../components/Toasts"
type PaymentProps = {
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    setHomeName: Dispatch<React.SetStateAction<string>>;
    userName: string;
    phoneNumber: number;
    amountPaid: number;
    currBudget: number;
    setBudget: Dispatch<React.SetStateAction<number>>;
};
const Payment: React.FC<PaymentProps> = (props) => {
    const [present] = useIonPicker();
    const inAmount = useRef<HTMLIonInputElement>(null);
    const [pay, setPay] = useState<number>();
    const [value, setValue] = useState('Select vendor');
    const [msg, setmsg] = useState<string>("");
    const [toastIsShown, setToastIsShown] = useState<boolean>(false);
    const clearInput = () => {
        inAmount.current!.value = "";
      }
  const showToast = () => {
    clearInput();
    setToastIsShown(true);
    setValue("Select vendor")
  }
    return (

        <IonPage>
            <IonContent >
                <IonCard color="secondary" className="ion-text-center pay-card">

                    <IonCardHeader className="ion-text-left header">
                        <IonCardSubtitle>Balance</IonCardSubtitle>
                        <IonCardTitle className="user-title" ><p className="head">&#8377; {props.currBudget}</p></IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent className="cardcon">
                        <IonIcon icon={restaurantOutline} className="rest" size="small"></IonIcon>
                        <IonButton
                            className="vendorop ion-text-left"
                            expand="block"
                            fill="clear"
                            color="tertiary"
                            onClick={() =>
                                present({
                                    buttons: [
                                        {
                                            text: 'Confirm',
                                            handler: (selected) => {
                                                setValue(selected.vendors.value)
                                            },
                                        },
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            cssClass: 'secondary',
                                            handler: () => {
                                                console.log("Canceled");
                                            }
                                        }
                                    ],
                                    columns: [
                                        {
                                            name: 'vendors',
                                            options: [
                                                { text: 'Food Express', value: 'Food Express, Noida' },
                                                { text: 'Agra Retaurant', value: 'Agra Retaurant' },
                                                { text: 'Vinod Fast Food', value: 'Vinod Fast Food' },
                                                { text: 'Foodie Range', value: 'Foodie Range' },
                                                { text: 'Veerji Food Corner', value: 'Veerji Food Corner' },
                                                { text: 'Kathi Junction', value: 'Kathi Junction' },

                                            ],
                                        },
                                    ],
                                })
                            }
                        >
                            {value}
                        </IonButton>
                        <IonItem color="secondary" className="ion-text-center ">
                            <IonInput placeholder="Enter Amount" type="number" ref={inAmount} color="primary" className="amt" onIonChange={e => setPay(parseInt((e.detail.value!)))}></IonInput>
                        </IonItem>
                        <IonItemSliding color="secondary">
                            <IonItem color="secondary" lines="none" className="ion-text-center swipe">
                                <IonLabel>Swipe to Send</IonLabel>
                            </IonItem>

                            <IonItemOptions side="end">
                                <IonItemOption color="secondary" onClick={showToast} expandable>
                                    <IonIcon icon={send} size="medium"></IonIcon>
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                        <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Payment Confirmed"></Toasts>

                    </IonCardContent>
                </IonCard>
                <div className="pay-logo">
                    <img src="https://i.postimg.cc/YSm0wwDW/pay2.png" alt="Ionic logo" />
                </div>
            </IonContent>


        </IonPage>



    )

}

export default Payment;