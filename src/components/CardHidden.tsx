import React, {useState,useEffect} from "react";
import { IonPage,IonItem,IonToast,IonInput, IonAvatar, IonFab, IonGrid, IonRow, IonFabButton, IonIcon, IonCard, IonCardTitle, IonCol, IonCardHeader, IonCardSubtitle, IonRouterOutlet, IonCardContent, IonButton, IonLabel, IonContent } from '@ionic/react';

const CardHidden: React.FC<{refer: string}> = (props) => {
    const [state1,setState1] = useState<boolean>(false);
    const [state2,settate2] = useState<boolean>(false);
    const [state3,setState3] = useState<boolean>(false);
    useEffect(() => {
        if(props.refer=="encilOutline")
            setState1(!state1);
    })
    // if(props.refer=="penciloutline")
    //     setState1(!state1);
    const [toastIsShown, setToastIsShown] = useState<boolean>(false);

    const showToast = () => {
        setToastIsShown(true);
    }
    return (
        <IonCardContent className="ion-text-center card-hidden">
     {state1 &&
     <>
            <IonItem className="budget ion-text-right" lines="full">
                <IonLabel position="fixed">Enter Budget</IonLabel>
                <IonInput className="update-budget" type="number"></IonInput>
            </IonItem>



            <IonButton color="primary" onClick={() => showToast()}>Update</IonButton>


            <IonToast
                isOpen={toastIsShown}
                onDidDismiss={() => setToastIsShown(false)}
                message="Budget Updated!"
                duration={3000}
            />
            </>


     }
             </IonCardContent>

    )
}

export default CardHidden;