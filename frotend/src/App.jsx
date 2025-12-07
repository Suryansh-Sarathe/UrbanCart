import { useRef } from 'react'

export default function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginHandler = () => {
     
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