import React, {useState} from "react"
import { IonContent,IonText,IonCardHeader,IonIcon,IonFab,IonFabButton, IonRow,IonCard,IonCol,IonItem, IonCardTitle, IonCardSubtitle} from "@ionic/react";
import { cashOutline, enterOutline, arrowUpCircleOutline, todayOutline, personOutline, addOutline } from "ionicons/icons";
import "./VendorHome.css";
import TransactionList from "../components/TransactionList"
const VendorHome: React.FC = () =>{
    const [nameUser, setName] = useState<string>("Ramu");
    const [amount, setAmount] = useState<number>(100);
    // const [date,setDate] = useState<Date>()
    const [date, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');

    return(
        <IonContent>
             <div className="login-logo">
          <img src="https://i.postimg.cc/qv3578F0/trans.png" alt="Ionic logo" /> 
        </div>
        <TransactionList username={nameUser} amount={amount} date={date} ></TransactionList>
        <TransactionList username={nameUser} amount={amount} date={date}></TransactionList>

        {/* <IonCard className="card" >
            <IonItem lines="none" className="cardItem">
            <IonIcon className="card-icon" color="warning" icon={enterOutline} slot="start" />
            <IonCardHeader className="info">
                <IonCardTitle>Added to account</IonCardTitle>
                <IonCardSubtitle className="title" color="secondary">From: Abc</IonCardSubtitle>
            </IonCardHeader>
    
            <IonText className="amount">+100</IonText>
              

    
            </IonItem>
            </IonCard> */}
        </IonContent>
    )
}

export default VendorHome;