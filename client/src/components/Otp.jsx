import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Otp = () => {
  const [otp, setOtp] = useState('');
  const history = useHistory()

  const login = (otp) => {
    let email = localStorage.getItem("email")

    if (otp) {
      const payload = {
        email: email,

      };

      const options = {
        headers: {
          ['x-otp']: otp,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
      };

      fetch('http://localhost:5000/api/auth/otpverify', options)
        .then(async (response) => {
          console.log(response, "response after otp");
          if (response.status === 200) {
            alert(`Correct`);
            localStorage.setItem("loggedin", true);
            window.localStorage.loggedin = true;
            history.push("/")
          } else {
            alert(`Invalid otp`);
          }
        })
        .catch(err => {
          console.log("Invalid creds", err);
        });
    }
  };

  return (
    <div className="col-md-4 col-md-offset-4">
      <div className="form-group">
        <label htmlFor="otp">Enter Otp:</label>
        <input
          onChange={(e) => setOtp(e.target.value)}
          type="otp"
          className="form-control"
          id="otp"
        />
      </div>
      <button onClick={() => login(otp)} className="btn btn-default">
        Submit
      </button>
    </div>
  );
};

export default Otp;
