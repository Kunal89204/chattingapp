import axios from 'axios'
import React from 'react'
import {useAuthStore} from '../context/store'

const useLogin = () => {
    const {login} = useAuthStore()

    const loginHook = (data) => {
        
        axios.post('https://chattarpattarkabackend.onrender.com/api/v1/login', data)
        .then((respo) => {
            if (respo.data.accessToken) {
                console.log(respo.data.accessToken)
                localStorage.setItem('user', JSON.stringify(respo.data))
                login(respo.data)
            }else {
                console.log(respo.data.message);
              }
        }).catch((error) => {
            console.log(error);
          });
    }
  return {loginHook}
}

export default useLogin