import React, { useState, useContext, Dispatch, ReactElement, useRef, useEffect } from "react";
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonSlides, IonSlide } from "@ionic/react";
import SignUpInput from "../components/SignUpInput";
import ChipsComp from "../components/ChipsComp";
import PersonalInfo from "../components/PersonalInfo";
import Preferences from "../components/Preferences"

import "./SignUpSlide.css";
const slideOpts = {
    initialSlide: 0,
    speed: 400
};
type Props = {
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    setHomeName: Dispatch<React.SetStateAction<string>>;
};
const SignUpSlide: React.FC<Props> = ({ setIsLoggedin, setHomeName }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lname,setLName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [budget, setBudget] = useState("");
    const [panNum, setPan] = useState("");
    const inInput = useRef<HTMLIonInputElement>(null);

    return (
        <IonPage>
            <IonContent>
                <IonSlides pager={true}  options={slideOpts}>
                    <IonSlide className="slides">
                        <form noValidate>
                            <PersonalInfo setUsername={setUsername} setPassword={setPassword} setName={setName} setLName={setLName} setAddress={setAddress} setPhone={setPhone} setBudget={setBudget} setPan={setPan} inInput={inInput}></PersonalInfo>
                        </form>
                    </IonSlide>
                    <IonSlide>
                        <Preferences setIsLoggedin={setIsLoggedin} setHomeName={setHomeName} username={username} password={password} name={name} lname={lname} address={address} phone={phone} budget={budget} panNum={panNum} inInput={inInput}></Preferences>
                    </IonSlide>
                </IonSlides>
            </IonContent>
        </IonPage>
    );
}

export default SignUpSlide;