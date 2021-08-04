
import { IonApp, IonIcon, IonFooter, IonTabs, IonTabBar, IonTabButton, IonContent, IonCardTitle, IonCol, IonCardHeader, IonCardSubtitle, IonCard, IonRouterOutlet, IonCardContent, IonButton, IonLabel, IonToolbar } from '@ionic/react';
import "./App.css"
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { restaurantOutline, home, personCircle } from "ionicons/icons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import Cards from "./components/Cards";
import { cashOutline, pencilOutline, arrowUpCircleOutline, todayOutline, personOutline, addOutline } from "ionicons/icons";

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from "./pages/Home";
import Account from "./pages/Account"
const App: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);

  useEffect(() => {
    checkIsLoggedIn(setIsLoggedin);
  }, []);

  const checkIsLoggedIn = (setIsLoggedin: Dispatch<React.SetStateAction<boolean>>) => {
    if (false)
      setIsLoggedin(true);
  }
  return (
    <IonApp>
      <IonReactRouter>
        {!isLoggedin ?
          <IonRouterOutlet>
            <Route path="/signup" exact={true}>
                <Signup />
            </Route>
            <Route path="/" exact>
               <Login setIsLoggedin={setIsLoggedin} />
            </Route>
            <Route path="/home" exact>
               <Login setIsLoggedin={setIsLoggedin} />
            </Route>
            <Route path="/account" exact>
               <Login setIsLoggedin={setIsLoggedin} />
            </Route>

            
          </IonRouterOutlet>
          :
          <IonTabs>
            <IonRouterOutlet>
            <Route path="/home" component={Home} exact />
            <Route path="/account" exact >
            <Account setIsLoggedin={setIsLoggedin} />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home}></IonIcon>
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="account" href="/account">
                <IonIcon icon={personCircle}></IonIcon>

                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        }
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
