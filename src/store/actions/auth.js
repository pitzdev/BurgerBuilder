import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart =() =>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess =(idToken,localId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: localId
    };
};

export const authFail =(error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logOut =()=>{
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout =(expirationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logOut());
        },expirationTime* 1000);
    }
}

export const auth=(email,password,isSignUp) =>{
    return  dispatch=>{
        dispatch(authStart());
        const authD ={
            email: email,
            password: password,
            returnSecureToken: true
        }
         
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE0SUclhxMm4jcCmBHhHew3VauZAGUFTI';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE0SUclhxMm4jcCmBHhHew3VauZAGUFTI';
        }
        axios.post(url, authD)
        .then(res =>{
            const expirationDate =new Date (new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(error =>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const setAuthRedirectPath =(path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path :path
    }
}

export const authCheckState =() =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logOut());

            }else{
                const userId =localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}