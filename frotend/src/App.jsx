import { useState,useRef } from 'react'
import verifyCredentials from './handlers/verifyCredentials';
export default function App() {
  const [errorMessage,setErrorMessage] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const result = await verifyCredentials(email,password);
    if(!result.credentials){
      setErrorMessage(result.error);
      alert(errorMessage);
    }
    else{
      //redirect to dashboard
    }
  }
  return (
    <>
    <div> <img src="" alt="UrbanCart" /> </div>
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Enter email id" ref={emailRef}/>
      <input type="password" placeholder="Enter password" ref={passwordRef}/>
      
      <button onClick={()=>loginHandler()}>Login</button>
      <span>Don't have an account?</span> 
      <a href=''>Sign up</a>
    </div>
    
    </>
  )
}