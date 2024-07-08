import axios from 'axios'
import React from 'react'
import {useAuthStore} from '../context/store'

const useRegister = () => {
    const {login}  = useAuthStore()

    const registerHook = (data) => {
        axios.post('http://localhost:8000/api/v1/register', data)
        .then((respo) => {
            if (respo.data.accessToken) {
                console.log(respo.data.accessToken)
                localStorage.setItem('user', JSON.stringify(respo.data))
                login(respo.data)
            }else {
                console.log(respo.data.message);
              }
        })
        .catch((error) => {
            console.log(error);
          });
    
    }
  return {registerHook}
}

export default useRegister