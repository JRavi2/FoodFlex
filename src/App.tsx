import { IonApp, IonIcon, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, IonLabel } from "@ionic/react";
import "./App.css";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { Dispatch, useEffect, useState } from "react";
import { home, personCircle } from "ionicons/icons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VendorSignup from "./pages/VendorSignup";
import Payment from "./pages/Payment"
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import Account from "./pages/Account";
const App: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [userName, setUsername] = useState<string>("Ramu");
  const [isVendor, setIsVendor] = useState(false);
  const [phone, setPhone] = useState<number>(9988107754);
  const [amountPaid, setAmount] = useState<number>(300);


  useEffect(() => {
    checkIsLoggedIn(setIsLoggedin);
  }, []);

  const checkIsLoggedIn = (setIsLoggedin: Dispatch<React.SetStateAction<boolean>>) => {
    const token = localStorage.getItem("token");
    const vendor: any = localStorage.getItem("vendor");
    const name: any = localStorage.getItem("name");
    console.log(token);
    console.log(vendor);
    console.log(name);

    if (vendor) {
      console.log("vendor: ", vendor);
      setIsVendor(vendor === "1");
    } else {
      setIsVendor(false);
    }

    if (!token) {
      setIsLoggedin(false);
    } else {
      fetch(process.env.REACT_APP_BACKEND_API_URL + "/current-user/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          setUsername(name);
          setIsLoggedin(true);
        } else setIsLoggedin(false);
      });
    }
  };

  return (
    <IonApp className="mainApp">
      <IonReactRouter>
        {!isLoggedin ? (
          <IonRouterOutlet>
            <Route path="/signup" exact>
              <Signup setIsLoggedin={setIsLoggedin} setHomeName={setUsername} />
            </Route>
            <Route path="/vendorSignup" exact>
              <VendorSignup setIsLoggedin={setIsLoggedin} setHomeName={setUsername} setIsVendor={setIsVendor} />
            </Route>
            <Route path="/" exact>
              <Login setIsLoggedin={setIsLoggedin} setIsVendor={setIsVendor} setHomeName={setUsername} />
            </Route>
            <Route path="/home" exact>
              <Login setIsLoggedin={setIsLoggedin} setIsVendor={setIsVendor} setHomeName={setUsername} />
            </Route>
            <Route path="/account" exact>
              <Login setIsLoggedin={setIsLoggedin} setIsVendor={setIsVendor} setHomeName={setUsername} />
            </Route>
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" exact>
                <Home
                  setIsLoggedin={setIsLoggedin}
                  setIsVendor={setIsVendor}
                  isVendor={isVendor}
                  userName={userName}
                  setUsername={setUsername}
                />
              </Route>
              <Route path="/account" exact>
                <Account
                  setIsLoggedin={setIsLoggedin}
                  setIsVendor={setIsVendor}
                  isVendor={isVendor}
                  userName={userName}
                  setUsername={setUsername}
                />
              </Route>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route exact path="/signup" render={() => <Redirect to="/home" />} />
              <Route exact path="/vendorSignup" render={() => <Redirect to="/home" />} />
              <Route exact path="/payment" render={() => <Redirect to="/home" />}>
                <Payment setIsLoggedin={setIsLoggedin} setHomeName={setUsername} userName={userName} phoneNumber={phone} amountPaid={amountPaid}></Payment>
              </Route>

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
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
