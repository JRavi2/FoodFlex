import React from "react";
import { IonPage,IonFab,IonGrid,IonRow, IonFabButton,IonIcon,IonCard,IonCardTitle, IonCol,IonCardHeader,IonCardSubtitle, IonRouterOutlet, IonCardContent, IonButton, IonLabel, IonContent } from '@ionic/react';
import Cards from "../components/Cards";
import "./Home.css"
import {cashOutline,power, pencilOutline,arrowUpCircleOutline,todayOutline,personOutline,addOutline} from "ionicons/icons";
const Home: React.FC = () =>{
    return(
      <IonPage className="page">
        <IonContent className="content">
        <IonCard className="top-card">
          <IonGrid className="top-grid">
            <IonRow>
              <IonCol>
          <IonCardHeader>
            <IonCardSubtitle>Hello</IonCardSubtitle>
            <IonCardTitle className="userName">Username</IonCardTitle>
            </IonCardHeader>
            </IonCol>
            <IonCol>
            <IonFab horizontal="end" >
                    <IonFabButton color="secondary" className="btn-power" size="small" >
                        <IonIcon icon={power} ></IonIcon>
                    </IonFabButton>
                </IonFab>
                </IonCol>
          </IonRow>
          </IonGrid>
          </IonCard>
        
          <IonCard className="main-card ion-text-center">
          <IonCardHeader>
            <IonCardSubtitle className="subHeading">Today's Recommendation</IonCardSubtitle>
            {/* <IonCardTitle className="heading">What's Cooking</IonCardTitle> */}
          </IonCardHeader>
          <IonCardContent className="ion-text-center">
            <IonCardTitle className="food-item">&#123;Halwa Poori&#125;</IonCardTitle>
            {/* <IonCardTitle  className="price"> 90/-</IonCardTitle>  */}
          </IonCardContent>
          </IonCard>
            <Cards fabButton={pencilOutline} startIcon={cashOutline}>Update Budget</Cards>
          <Cards fabButton={arrowUpCircleOutline} startIcon={todayOutline}>Add Menu</Cards>
          <Cards fabButton={addOutline} startIcon={personOutline}>Add Vendor</Cards>
          </IonContent>
        </IonPage>
    )
}

export default Home;