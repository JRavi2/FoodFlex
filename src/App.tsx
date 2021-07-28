import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Dispatch } from 'react';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/Login';
import RedirectToLogin from './pages/RedirectToLogin';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

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
import {useEffect, useState} from 'react';
import Account from './pages/Account';

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
        <IonSplitPane contentId="main">
	  {isLoggedin && <Menu />}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
	      { isLoggedin ? <Redirect to="/page/Inbox" /> : <Login setIsLoggedin={setIsLoggedin} /> }
            </Route>
            <Route path="/page/:name" exact={true}>
	      { isLoggedin ? <Page /> : <Login setIsLoggedin={setIsLoggedin} /> }
            </Route>
            <Route path="/page/account" exact={true}>
	      { isLoggedin ? <Account setIsLoggedin={setIsLoggedin} /> : <Login setIsLoggedin={setIsLoggedin} /> }
            </Route>
            <Route path="/login" exact={true}>
	      <Login setIsLoggedin={setIsLoggedin} />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
