import React, {useState} from "react"
import { IonContent} from "@ionic/react";
import "./VendorHome.css";
import TransactionList from "../components/TransactionList"
const VendorHome: React.FC = () =>{
    const [nameUser, setName] = useState<string>("Ramu");
    const [amount, setAmount] = useState<number>(100);
    const [date, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');

    return(
        <IonContent>
             <div className="login-logo">
          <img src="https://i.postimg.cc/qv3578F0/trans.png" alt="Ionic logo" /> 
        </div>
        <TransactionList username={"Ravi"} amount={amount} date={date} ></TransactionList>
        <TransactionList username={"Kartik"} amount={amount} date={date}></TransactionList>
        <TransactionList username={"Harshita"} amount={amount} date={date}></TransactionList>
        </IonContent>
    )
}

export default VendorHome;