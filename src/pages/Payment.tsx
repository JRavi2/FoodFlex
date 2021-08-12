import React, { Dispatch, useState } from "react";
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
    IonText,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonAlert,
} from '@ionic/react';
import "./Payment.css"
import { chevronDownOutline, restaurantOutline, cardOutline, sendOutline, send } from "ionicons/icons";
import Toasts from "../components/Toasts"
type PaymentProps = {
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    setHomeName: Dispatch<React.SetStateAction<string>>;
    userName: string;
    phoneNumber: number;
    amountPaid: number;
};
const Payment: React.FC<PaymentProps> = (props) => {
    const [present] = useIonPicker();
    const [showAlert, setShowAlert] = useState(false);
    const [pay, setPay] = useState<number>();
    const [value, setValue] = useState('Select vendor');
    const [msg, setmsg] = useState<string>("");
    const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const showToast = () => {
    setToastIsShown(true);
  }
    return (

        <IonPage>
            <IonContent >
                <IonCard color="secondary" className="ion-text-center pay-card">

                    <IonCardHeader className="ion-text-left header">
                        <IonCardSubtitle>Pay vendor</IonCardSubtitle>
                        <IonCardTitle className="user-title" ><p className="head">{props.userName}</p></IonCardTitle>
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
                                                { text: 'Vendor1', value: 'Maggie wala' },
                                                { text: 'Vendor2', value: 'Momo Wala' },
                                                { text: 'Vendor3', value: 'Pasta Wala' },
                                                { text: 'Vendor4', value: 'Thele ki chai' },
                                                { text: 'Vendor5', value: 'Pizze burger' },
                                                { text: 'Vendor6', value: 'Nukkad ki chai' },

                                            ],
                                        },
                                    ],
                                })
                            }
                        >
                            {value}
                        </IonButton>
                        <IonItem color="secondary" className="ion-text-center ">
                            {/* <IonIcon color="primary" icon={cardOutline}></IonIcon> */}
                            <IonInput placeholder="Enter Amount" type="number" color="primary" className="amt" onIonChange={e => setPay(parseInt((e.detail.value!)))}></IonInput>
                        </IonItem>
                        <IonItemSliding color="secondary">


                            <IonItem color="secondary" lines="none" className="ion-text-center swipe">
                                <IonLabel>Swipe to Send</IonLabel>
                            </IonItem>

                            <IonItemOptions side="end">
                                <IonItemOption color="secondary" onClick={showToast} expandable>
                                    <IonIcon icon={send}></IonIcon>
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