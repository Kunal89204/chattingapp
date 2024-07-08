import  {create} from "zustand"
import {createAuthSlice} from './slices/authSlice'
// import { createSocketSlice } from "./slices/socketSlice";


export const useAuthStore = create((set, get) => ({
    ...createAuthSlice(set, get),
    // ...createSocketSlice(set, get),
  }));