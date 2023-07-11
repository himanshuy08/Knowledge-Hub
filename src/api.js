import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

export default function useProtectedRoute(){
    const navigator = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("email")===null) {
            navigator("/LogIn")
        }
    })
    
    
};