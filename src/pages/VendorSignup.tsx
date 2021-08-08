import React, { useState, useContext, Dispatch, ReactElement, useRef } from "react";
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import "./Login.css";
import "./Signup.css";
import SignUpInput from "../components/SignUpInput";
// import { RouteComponentProps, Redirect } from 'react-router';

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [usernameError, setUsernameError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    // extract form data
    const target = e.target as HTMLFormElement;
    console.log(target);
    const formdata = new FormData(target);

    // POST the request to Staticman's API endpoint
    fetch(process.env.REACT_APP_API_URL + "/signup/", {
      method: "POST",
      // headers: {"Content-Type": "application/form-data"},
      body: formdata,
    })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <IonPage id="login-page">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <div className="login-logo">
          <img src="https://i.postimg.cc/d3nNXrr2/signup.png" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <SignUpInput nameIn={"username"} typeIn={"text"} value={username} setter={setUsername}>
              Username
            </SignUpInput>
            <SignUpInput nameIn={"password1"} typeIn={"password"} value={password1} setter={setPassword1}>
              Password
            </SignUpInput>
            <SignUpInput nameIn={"password2"} typeIn={"password"} value={password2} setter={setPassword2}>
              Confirm Password
            </SignUpInput>
            <SignUpInput nameIn={"name"} typeIn={"text"} value={name} setter={setName}>
              Name
            </SignUpInput>
            <SignUpInput nameIn={"address"} typeIn={"text"} value={address} setter={setAddress}>
              Address
            </SignUpInput>
            <SignUpInput nameIn={"phone"} typeIn={"tel"} value={phone} setter={setPhone}>
              Phone
            </SignUpInput>
            <SignUpInput nameIn={"price"} typeIn={"number"} value={price} setter={setPrice}>
              Price
            </SignUpInput>

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="password1"
                type="password"
                value={password1}
                onIonChange={(e) => setPassword1(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Confirm Password
              </IonLabel>
              <IonInput
                name="password2"
                type="password"
                value={password2}
                onIonChange={(e) => setPassword2(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Name
              </IonLabel>
              <IonInput name="name" type="text" value={name} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Address
              </IonLabel>
              <IonInput
                name="address"
                type="text"
                value={address}
                onIonChange={(e) => setAddress(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Phone
              </IonLabel>
              <IonInput
                name="phone"
                type="text"
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Budget
              </IonLabel>
              <IonInput
                name="budget"
                type="number"
                value={budget}
                onIonChange={(e) => setBudget(e.detail.value!)}
              ></IonInput>
            </IonItem> */}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" color="light" expand="block">
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
