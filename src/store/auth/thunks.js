import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesOnLogout } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./"

// Defining a thunk function
export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        //calling the action creation from the Slice using dispatch
        dispatch(checkingCredentials());

    }
}


export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = signInWithGoogle();
        //If the result is not ok, dispatch this function ( created on slices)
        if(!result.ok) return dispatch(logout( result.errorMessage ))
        // If everything is oik on auth, do this
        dispatch(login(result))


    }
}



export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async( dispatch ) => {
        
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password });

       if( !ok ) return dispatch(logout({ errorMessage }))

       dispatch(login({ uid, displayName, email, photoURL }))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({email, password})

        if(!result.ok) return dispatch(logout( result ))
        dispatch(login(result))

      

    }


}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(clearNotesOnLogout());
        dispatch(logout());
    }
}