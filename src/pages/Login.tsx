import React, { useState, useContext, Dispatch } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonTitle } from '@ionic/react';
import './Login.css';
// import { RouteComponentProps, Redirect } from 'react-router';

type Props = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<Props> = ({ setIsLoggedin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      setIsLoggedin(true);
    }
  };

  return (
    <IonPage id="login-page">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent id="login-page">

        <div className="login-logo">
          <img src="https://i.postimg.cc/9Fp9sV0Y/log.png" alt="Ionic logo"  /> 
        </div>
        <IonTitle className="welcome ion-text-center">WELCOME ! </IonTitle>
        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" className="loginLabel" color="danger">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText >
              <p className="ion-padding-start errorLogin">
                *Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel className="loginLabel" position="floating" color="danger">Password</IonLabel>
              <IonInput name="password"  type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText >
              <p className="ion-padding-start errorLogin">
                *Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" color="success" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>
       
      </IonContent>

    </IonPage>
  );
};

export default Login;
