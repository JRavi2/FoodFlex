import React, {Dispatch} from "react"
import { IonChip,IonLabel,IonIcon, IonButton } from "@ionic/react";
import {closeCircle} from "ionicons/icons";
type ChipsProps = {
    restName: string;
    isChips: boolean,
    setChip: Dispatch<React.SetStateAction<boolean>>
};
const ChipsComp: React.FC<ChipsProps>= (props) =>{
    return(
        <IonChip className="{props.restId}">
          <IonLabel>{props.restName}</IonLabel>
          <IonIcon icon={closeCircle} onClick={()=>props.setChip(!props.isChips)} />
          
        </IonChip>
    )
}

export default ChipsComp;