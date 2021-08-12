import React, { Dispatch, useState, useRef, useEffect } from "react";
import Toasts from "../components/Toasts"
import VendorHome from "./VendorHome";
import {
  IonPage,
  IonAvatar,
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
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import Cards from "../components/Cards";
import "./Home.css"
import { cashOutline, pencilOutline, arrowUpCircleOutline, todayOutline, personOutline, addOutline } from "ionicons/icons";
type ParentProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
  isVendor: boolean
};

const BudgetContent: React.FC = () => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const inBudget = useRef<HTMLIonInputElement>(null);

  const clearInput = () => {
    inBudget.current!.value = "";
  }
  const showToast = () => {
    clearInput();
    setToastIsShown(true);
  }
  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget" lines="full">
        <IonLabel color="primary" position="floating" className="budgetLabel">Enter Budget</IonLabel>
        <IonInput className="update-budget" ref={inBudget} type="number"></IonInput>
      </IonItem>
      <IonButton color="light" className="cardBtn" onClick={() => showToast()}> Update</IonButton>
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
      <IonItem className="budget" >
        {/* <IonLabel position="stacked" className="custom-file-upload"> */}
        <input type="file" className="messMenu" name="upload_mess_menu" />
        {/* </IonLabel> */}
      </IonItem>
      <IonButton color="light" className="cardBtn" onClick={() => showToast()}>Upload</IonButton>
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
      <IonItem>
        <IonLabel position="floating" color="primary">
          Enter vendor
        </IonLabel>
        <IonInput></IonInput>
        <IonFab horizontal="end" >
          <IonFabButton className="v-btn" color="light" size="small" onClick={() => showToast()}>
            <IonIcon icon={addOutline} color="primary"></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonItem>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Vendor Added"></Toasts>
    </IonCardContent>
  )
}
const Home: React.FC<ParentProps> = (props) => {
  const [recom, setRecom] = useState("");
  const [recomPrice, setRecomPrice] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/recommend/", {
      method: "GET",
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` }
    }).then((res) => {
      res.json().then(data => {
        console.log("Rec: ");
        console.log(data);
        if (data.flag == true) {
          setRecom(data.restr.name);
          setRecomPrice(data.restr.price);
        } else {
          setRecom("Mess food :(");
        }
      });
    });
  }, [])

  return (
    <IonPage className="page">
      {!props.isVendor ?
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
                    <img src="https://i.postimg.cc/s1dTZX3G/av4.png" />
                  </IonAvatar>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>

          <IonCard className="main-card ion-text-center">
            <IonCardHeader>
              Our Recommendation for Today
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              {recom}
              {/* uncomment for paybutton */}
              {/* <IonButton routerLink="/payment">Pay</IonButton> */}
            </IonCardContent>
            <IonCardContent className="ion-text-center">
              {recomPrice !== 0 ? recomPrice : ""}
            </IonCardContent>

          </IonCard>
          <Cards fabButton={pencilOutline} startIcon={cashOutline} CardCon={BudgetContent}>Update Budget</Cards>
          <Cards fabButton={arrowUpCircleOutline} startIcon={todayOutline} CardCon={MenuContent}>Add Menu</Cards>
          <Cards fabButton={addOutline} startIcon={personOutline} CardCon={VendorContent}>Add Vendor</Cards>
        </IonContent>
        :
        <VendorHome></VendorHome>
      }
    </IonPage>

  )
}

export default Home;
