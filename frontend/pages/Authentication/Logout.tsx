import React from "react";
import { useSignOut } from "react-auth-kit";

import {redirect} from 'react-router-dom';

export default function Logout() {
    const signOut = useSignOut();

    if(signOut()) {
        return redirect("/");
    } 

    return redirect("/");
}