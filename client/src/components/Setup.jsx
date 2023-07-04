import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

 function Setup(props) {
  const history = useHistory()
  const [twofactor, setTwofactor] = useState({});


  const email = localStorage.getItem("email");
  console.log(email,"richa shah")
  const setup = () => {
    
    const email = localStorage.getItem("email");
    console.log(email,"setup email")
    fetch('http://localhost:5000/api/auth/twofactor/setup', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then(async response => {
        const result = await response.json();
        if (response.status === 200) {
          console.log(result, "result in setup()");
          setTwofactor(result);
        }
      });
  };
  const confirm = (otp) => {
  
    const email = localStorage.getItem("email");
    const body = {
      token: otp,
      email: email
    };
    fetch('http://localhost:5000/api/auth/twofactor/verify', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        const result = response.body;
        console.log(result, "result god")
        if (response.status === 200) {
          setTwofactor(prevState => ({
            ...prevState,
            secret: prevState.tempSecret,
            tempSecret: ""
          }));
        }
        console.log(response, "response in setup")
        fetchauthentication()
      })
      .catch(err => alert('invalid otp'));
  }

  const disable = () => {
    const email = localStorage.getItem("email");
    fetch('http://localhost:5000/api/auth/twofactor/setup', { method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email }) })
      .then(response => {
        const result = response.body;
        console.log(result, "god disble")
        console.log(response);
        if (response.status === 200) {
          props.history.push('/setup');
        }
        fetchauthentication()
      }).catch(err =>{
         console.log("multiple authentication attempt can lead to lock")
        history.push("/setup")
        });
  }

  useEffect(() => {
   fetchauthentication()
  }, []);

  function fetchauthentication(){
    const email = localStorage.getItem("email");
    fetch(`http://localhost:5000/api/auth/twofactor/authenticated?email=${email}`)
    .then(response => response.json())
    .then(data => {
      setTwofactor(prevState => ({
        ...prevState,
        authenticated: data.authenticated
      }));
    })
    .catch(err => {
      if (err.status === 401) {
        props.history.push('/');
      }
    });
  }

  return (
    <div>
      {console.log("hello", twofactor)}
   
     {twofactor.authenticated!==1 &&
      <div className="col-md-4 col-md-offset-4" v-if="!twofactor.secret">
      <h3>Setup Otp</h3>
      <div>
        {!twofactor.tempSecret && <button onClick={setup} className="btn btn-default button-28 btnenable">Enable</button>}
      </div>
      {twofactor.tempSecret  &&
        <span>
          <p>Scan the QR code or enter the secret in Google Authenticator</p>
          <img src={twofactor.dataURL} alt="..." className="img-thumbnail" />
          <p>Secret - {twofactor.tempSecret}</p>
          <p>Type - TOTP</p>

          <div className="form-group">
            <label htmlFor="otp">Enter Otp:</label>
          
            <input onChange={(e) => {
const updatedValue = e.target.value;
setTwofactor(prevState => ({ ...prevState, otp: updatedValue }));
}} type="text" value={twofactor.otp || ''} />
          </div>
          <button onClick={() => confirm(twofactor.otp)} className="btn btn-success button-28">confirm</button>

        </span>
      }
    </div>}

      {twofactor.authenticated === 1 && <div className="col-md-1">
        <h3>Disable</h3>
        <button onClick={disable} className="btn btn-danger">Disable</button>

      </div>}
    </div>
  )
}


export default Setup