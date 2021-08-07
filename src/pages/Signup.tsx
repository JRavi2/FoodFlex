import React, { useState, useContext, Dispatch, ReactElement, useRef } from "react";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import "./Login.css";
import "./Signup.css";
import SignUpInput from "../components/SignUpInput";
import ChipsComp from "../components/ChipsComp";
// import { RouteComponentProps, Redirect } from 'react-router';

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [preferredRestaurants, setPreferredRestaurants] = useState("");
  const [preferredCuisines, setPreferredCuisines] = useState("");
  const [dislikedDishes, setDislikedDishes] = useState("");
  const [restSuggestions, setRestSuggestions] = useState<ReactElement<any, any>>();
  const [selectedRests, setSelectedRests] = useState<{ id: any; name: any }[]>([]);
  const [ischips, setChip] = useState(true);
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [usernameError, setUsernameError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  const restInput = useRef<HTMLIonInputElement>(null);

  // Select a Restaurant
  const selectRest = (e: any) => {
    const id = e.target.id;
    const name = e.target.innerText;
    const newArray = [...selectedRests, { id: id, name: name }];
    console.log(newArray);
    setSelectedRests(newArray);
    setRestSuggestions(<div></div>);
    setPreferredRestaurants("");
  };

  // Change the autocomplete dropdown based on suggestions
  const onRestInputChange = (e: any) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].some((key) => key === e.key)) {
      // TODO: Move up and down in suggestions (Low Priority)
      console.log("TBD");
    } else {
      // Show suggestions
      console.log("Input value: ", restInput.current!.value);
      fetch(
        process.env.REACT_APP_ZOMATO_API_URL + `/search?count=5&q=${e.target.value}&lat=28.6362295&lon=77.3763150`,
        {
          headers: {
            Accept: "application/json",
            "User-Key": "28c7fdb103232548b1503df6df9b4520",
          },
        }
      ).then((resp) => {
        resp.json().then((data) => {
          const rests = data.restaurants;
          // The suggestions List
          const list = (
            <div id="autocomplete-list" className="autocomplete-items">
              {rests.map((rest: any) => {
                return (
                  <div id={rest.restaurant.id} key={rest.restaurant.id} onClick={selectRest}>
                    {" "}
                    {rest.restaurant.name}{" "}
                  </div>
                );
              })}
            </div>
          );
          setRestSuggestions(list);
          setPreferredRestaurants(e.target.value);
        });
      });
    }
  };

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

  const removeChip = (restId: number) => {
    const newSelectedRest: any = selectedRests.filter((rest) => {
      return rest.id !== restId;

    })

    setSelectedRests(newSelectedRest);
  }
  console.log(selectedRests);
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
            <IonItem>
              <IonLabel position="floating" color="primary">
                Username
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setUsername(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>
            <SignUpInput nameIn={"password1"} typeIn={"password"} value={password1} setter={setPassword1}>Password</SignUpInput>
            <SignUpInput nameIn={"password2"} typeIn={"password"} value={password2} setter={setPassword2}>Confirm Password</SignUpInput>
            <SignUpInput nameIn={"name"} typeIn={"text"} value={name} setter={setName}>Name</SignUpInput>
            <SignUpInput nameIn={"address"} typeIn={"text"} value={address} setter={setAddress}>Address</SignUpInput>
            <SignUpInput nameIn={"phone"} typeIn={"tel"} value={phone} setter={setPhone}>Phone</SignUpInput>
            <SignUpInput nameIn={"budget"} typeIn={"number"} value={budget} setter={setBudget}>Budget</SignUpInput>


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

            <IonItem>
              <IonLabel position="floating" color="primary">
                Preferred Restaurants
              </IonLabel>
              <IonInput
                name="preferred_restaurants"
                type="text"
                value={preferredRestaurants}
                onKeyDown={onRestInputChange}
                ref={restInput}
              ></IonInput>
              <div>
                {restSuggestions}
              </div>
              <div>
                {selectedRests.map((rest: any) => (
                  <div id={rest.id}>
                    <ChipsComp restName={rest.name} restId={rest.id} removeChip={removeChip} />
                  </div>

                ))
                }
              </div>
            </IonItem>

            <IonItem>
              <IonLabel position="floating" color="primary">
                Preferred Cuisines
              </IonLabel>
              <IonInput
                name="preferred_cuisines"
                type="text"
                value={preferredCuisines}
                onIonChange={(e) => setPreferredCuisines(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating" color="primary">
                Disliked Dishes
              </IonLabel>
              <IonInput
                name="not_preferred"
                type="text"
                value={dislikedDishes}
                onIonChange={(e) => setDislikedDishes(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Mess Menu
              </IonLabel>
              <input type="file" name="upload_mess_menu" />
            </IonItem>
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
