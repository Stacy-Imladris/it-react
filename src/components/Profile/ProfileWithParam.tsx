import ProfileContainer from "../Profile/ProfileContainer";
import React from "react";
import {Params, useParams} from "react-router-dom";

export function ProfileWithParam() {
    const match: Params<string> = useParams<string>();

    return <ProfileContainer match={match}/>
}