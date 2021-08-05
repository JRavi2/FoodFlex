import React, { Dispatch, useState } from "react";
import Toasts from "../components/Toasts"
import {
  IonPage,
  IonAvatar,
  IonToast,
  IonGrid,
  IonRow,
  IonItem,
  IonInput,
  IonCard,
  IonCardTitle,
  IonCol,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonContent
} from '@ionic/react';
import Cards from "../components/Cards";
import "./Home.css"
import { cashOutline, power, pencilOutline, arrowUpCircleOutline, todayOutline, personOutline, addOutline } from "ionicons/icons";

type ParentProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
};
const BudgetContent: React.FC = () => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);

  const showToast = () => {
    setToastIsShown(true);
  }
  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget ion-text-right" lines="full">
        <IonLabel position="fixed">Enter Budget</IonLabel>
        <IonInput className="update-budget" type="number"></IonInput>
      </IonItem>
      <IonButton color="primary" onClick={() => showToast()}>Update</IonButton>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Budget Updated"></Toasts>
    </IonCardContent>
  )
}
const MenuContent: React.FC = () => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const showToast = () => {
    setToastIsShown(true);
  }
  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget ion-text-right" lines="full">
        <IonLabel position="fixed">Enter File</IonLabel>
        <IonInput className="update-budget" type="number"></IonInput>
      </IonItem>
      <IonButton color="primary" onClick={() => showToast()}>Update</IonButton>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Menu Added"></Toasts>
    </IonCardContent>
  )
}
const VendorContent: React.FC = () => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const showToast = () => {
    setToastIsShown(true);
  }
  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget ion-text-right" lines="full">
        <IonLabel position="fixed">Enter Vendor</IonLabel>
        <IonInput className="update-budget" type="number"></IonInput>
      </IonItem>
      <IonButton color="primary" onClick={() => showToast()}>Update</IonButton>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Vendor Added"></Toasts>
    </IonCardContent>
  )
}
const Home: React.FC<ParentProps> = (props) => {
  return (
    <IonPage className="page">
      <IonContent className="content">
        <IonCard className="top-card">
          <IonGrid className="top-grid">
            <IonRow>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Hello</IonCardSubtitle>
                  <IonCardTitle className="userName">{props.userName}</IonCardTitle>
                </IonCardHeader>
              </IonCol>
              <IonCol className="av-col" >
                <IonAvatar className="home-img" >
                  <img src="https://i.postimg.cc/KzS4dXGD/av2.png" />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        <IonCard className="main-card ion-text-center">
          <IonCardHeader>
          </IonCardHeader>
          <IonCardContent className="ion-text-center">
          </IonCardContent>
        </IonCard>
        <Cards fabButton={pencilOutline} startIcon={cashOutline} CardCon={BudgetContent}>Update Budget</Cards>
        <Cards fabButton={arrowUpCircleOutline} startIcon={todayOutline} CardCon={MenuContent}>Add Menu</Cards>
        <Cards fabButton={addOutline} startIcon={personOutline} CardCon={VendorContent}>Add Vendor</Cards>
      </IonContent>
    </IonPage>
  )
}

export default Home;