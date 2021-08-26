import React, { useState, ReactElement, useEffect, useRef, RefObject, Dispatch } from "react";
import {
    IonIcon,
    IonGrid,
    IonCard,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonLabel,
    IonInput
} from "@ionic/react";
import fuzzysort from "fuzzysort";
import ChipsComp from "../components/ChipsComp";
import { fastFoodOutline, peopleOutline, checkmarkDoneOutline, closeCircleOutline, clipboardOutline } from "ionicons/icons";

type Prefprops = {
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    setHomeName: Dispatch<React.SetStateAction<string>>;
    username: string;
    password: string;
    name: string;
    lname: string;
    address: string;
    phone: any;
    budget: any;
    panNum: any;
    inInput: RefObject<HTMLIonInputElement>;

};
const Preferences: React.FC<Prefprops> = (props) => {

    const [preferredRestaurants, setPreferredRestaurants] = useState("");
    const [restSuggestions, setRestSuggestions] = useState<ReactElement<any, any>>();
    const [selectedRests, setSelectedRests] = useState<{ id: any; name: any }[]>([]);
    const [preferredCuisines, setPreferredCuisines] = useState("");
    const [dislikedDishes, setDislikedDishes] = useState("");

    const [preferredVendors, setPreferredVendors] = useState("");
    const [vendorList, setVendorList] = useState<{ id: any; name: any }[]>([
        { id: "abc", name: "ABC" },
        { id: "xyz", name: "XYZ" },
    ]);
    const [vendorSuggestions, setVendorSuggestions] = useState<ReactElement<any, any>>();
    const [selectedVendors, setSelectedVendors] = useState<{ id: any; name: any }[]>([]);
    // const [formSubmitted, setFormSubmitted] = useState(false);
    // const [usernameError, setUsernameError] = useState(false);
    // const [passwordError, setPasswordError] = useState(false);

    const restInput = useRef<HTMLIonInputElement>(null);
    const clearInputs = () => {
        console.log(props.inInput.current!.value!)
        props.inInput.current!.value = "";
    }
    // Get the nearby vendors list
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch(
                process.env.REACT_APP_BACKEND_API_URL +
                `/closest_vendors/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
                {
                    method: "GET",
                }
            ).then((res) => {
                res.json().then((data) => {
                    console.log("Vendors: ");
                    console.log(data.vendors);
                    setVendorList(data.vendors);
                });
            });
        });
    }, []);

    // Select a Vendor
    const selectVendor = (e: any) => {
        const id = e.target.id;
        const name = e.target.innerText;
        const newArray = [...selectedVendors, { id: id, name: name }];
        setSelectedVendors(newArray);
        setRestSuggestions(<div></div>);
        setPreferredVendors("");
        setVendorSuggestions(<></>);
    };

    // Select a Restaurant
    const selectRest = (e: any) => {
        const id = e.target.id;
        const name = e.target.innerText;
        const newArray = [...selectedRests, { id: id, name: name }];
        setSelectedRests(newArray);
        setVendorSuggestions(<div></div>);
        setPreferredRestaurants("");
        setRestSuggestions(<></>);
    };

    // Change the autocomplete dropdown based on suggestions
    const onVendorInpChange = (e: any) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].some((key) => key === e.key)) {
            // TODO: Move up and down in suggestions (Low Priority)
            console.log("TBD");
        } else {
            // Show suggestions
            // console.log("Input value: ", restInput.current!.value);
            const suggestions = vendorList.length !== 0 ? fuzzysort.go(e.target.value, vendorList, { key: "name" }) : [];
            // The suggestions List
            const list = (
                <div id="autocomplete-list" className="autocomplete-items">
                    {suggestions.map(({ obj }: any) => {
                        return (
                            <div id={obj.id} key={obj.id} onClick={selectVendor}>
                                {" "}
                                {obj.name}{" "}
                            </div>
                        );
                    })}
                </div>
            );
            console.log(suggestions);
            setVendorSuggestions(list);
            setPreferredVendors(e.target.value);
        }
    };

    // Change the autocomplete dropdown based on suggestions
    const onRestInputChange = (e: any) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].some((key) => key === e.key)) {
            // TODO: Move up and down in suggestions (Low Priority)
            console.log("TBD");
        } else {
            // Show suggestions
            // console.log("Input value: ", restInput.current!.value);
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

    const signup = (e: React.FormEvent) => {
        e.preventDefault();

        // extract form data
        const target = e.target as HTMLFormElement;
        console.log(target);
        const formdata = new FormData(e.target as HTMLFormElement);

        const json: any = {};
        formdata.forEach(function (value, prop) {
            json[prop] = value;
        });

        const restIds = selectedRests.map((rest) => rest.id);
        const vendorNames = selectedVendors.map((vendor) => vendor.id);
        json["preferred_restaurants"] = restIds.join(",");
        json["preferred_vendors"] = vendorNames.length != 0 ? vendorNames.join(",") : ",";
        json["username"] = props.username;
        json["password"] = props.password;
        json["first_name"] = props.name;
        json["last_name"] = props.lname;
        json["address"] = props.address;
        json["phone"] = props.phone;
        json["budget"] = props.budget;
        json["pan_num"] = props.panNum;

        console.log(json);
        navigator.geolocation.getCurrentPosition((position) => {
            json["latitude"] = position.coords.latitude;
            json["longitude"] = position.coords.longitude;

            fetch(process.env.REACT_APP_BACKEND_API_URL + "/new_signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json),
            })
                .then((userResponse) => {
                    if (userResponse.status == 201) {
                        console.log("User success");

                        // Upload the menu
                        fetch(process.env.REACT_APP_BACKEND_API_URL + "/file_upload/", {
                            method: "POST",
                            body: formdata,
                        }).then((fileResponse) => {
                            // If upload is successful, log in
                            if (fileResponse.status == 204) {
                                userResponse.json().then((data) => {
                                    localStorage.setItem("token", data.user.token);
                                    localStorage.setItem("vendor", "0");
                                    localStorage.setItem("name", data.student.name);
                                    props.setHomeName(data.student.name);
                                    props.setIsLoggedin(true);
                                    console.log(data);
                                });
                            }
                        });
                    } else {
                        console.log("error");
                        userResponse.json().then((data) => {
                            // TODO: Display the errors on screen
                            console.log(data);
                        });
                    }
                })
                .catch((error) => {
                    console.log("error");
                    console.log(error);
                });
        });
    };

    const removeRestChip = (restId: number) => {
        const newSelectedRest: any = selectedRests.filter((rest) => {
            return rest.id !== restId;
        });
        setSelectedRests(newSelectedRest);
    };

    const removeVendChip = (vendId: number) => {
        const newSelectedVendors: any = selectedVendors.filter((vend) => {
            return vend.id !== vendId;
        });
        setSelectedRests(newSelectedVendors);
    };
    return (
        <form noValidate onSubmit={signup}>
            <IonGrid className="pref">
                <IonRow>
                    <IonCol>
                        <h2 className="header pref">Preferences</h2>
                    </IonCol>
                </IonRow>
                <IonRow className="cardRow">
                    <IonCard>
                        <IonItem>
                            <IonIcon icon={fastFoodOutline} color="primary" className="ion-padding"></IonIcon>
                            <IonLabel className="labels" >
                                Preferred Restaurants
                            </IonLabel>
                            <IonInput
                                color="primary"
                                name="preferred_restaurants"
                                type="text"
                                value={preferredRestaurants}
                                onKeyDown={onRestInputChange}
                                ref={restInput}
                            ></IonInput>
                            {/* <div>{restSuggestions}</div> */}
                        </IonItem>
                        <div>{restSuggestions}</div>

                        {selectedRests.map((rest: any) => (
                            <IonItem lines="none" className="chipsDiv">
                                <div id={rest.id}>
                                    <ChipsComp restName={rest.name} restId={rest.id} removeChip={removeRestChip} />
                                </div>
                            </IonItem>
                        ))}
                    </IonCard>
                </IonRow>
                <IonRow className="cardRow">
                    <IonCard>
                        <IonItem>
                            <IonIcon icon={peopleOutline} color="primary" className="ion-padding"></IonIcon>
                            <IonLabel>
                                Preferred Vendors
                            </IonLabel>
                            <IonInput
                                color="primary"
                                name="preferred_vendors"
                                type="text"
                                value={preferredVendors}
                                onKeyDown={onVendorInpChange}
                            // ref={restInput}
                            ></IonInput>
                            {/* <div>{vendorSuggestions}</div> */}
                        </IonItem>
                        <div>{vendorSuggestions}</div>
                        {selectedVendors.map((vend: any) => (
                            <IonItem lines="none" className="chipsDiv">
                                <div id={vend.id}>
                                    <ChipsComp restName={vend.name} restId={vend.id} removeChip={removeVendChip} />
                                </div>
                            </IonItem>
                        ))}

                    </IonCard>
                </IonRow>
                <IonRow>
                    <IonCard>
                        <IonItem>
                            <IonIcon icon={checkmarkDoneOutline} className="ion-padding" color="primary"></IonIcon>
                            <IonLabel>
                                Preferred Cuisines
                            </IonLabel>
                            <IonInput
                                color="primary"
                                name="preferred_cuisines"
                                type="text"
                                value={preferredCuisines}
                                onIonChange={(e) => setPreferredCuisines(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCard>
                </IonRow>
                <IonRow>
                    <IonCard>

                        <IonItem>
                            <IonIcon icon={closeCircleOutline} className="ion-padding" color="primary"></IonIcon>

                            <IonLabel>
                                Disliked Dishes
                            </IonLabel>
                            <IonInput
                                color="primary"
                                name="not_preferred"
                                type="text"
                                value={dislikedDishes}
                                onIonChange={(e) => setDislikedDishes(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </IonCard>
                </IonRow>
                <IonRow>
                    <IonCard>
                        <IonItem>
                            <IonIcon icon={clipboardOutline} className="ion-padding" color="primary"></IonIcon>
                            <IonLabel>
                                Mess Menu
                            </IonLabel>
                        </IonItem>
                        <div className="ion-padding">
                            <input type="file" name="file" />
                        </div>
                    </IonCard>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" className="btn-sub" onClick={clearInputs}>
                            Submit
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    )
}

export default Preferences;