import { useState } from "react";
import "../../Css/ugcStaffForm.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export const UGCstaffadd = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const passwordGen = {
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );
    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;
    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setPassword(characters.join(""));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }
  const submission = (e) =>{
    console.log(fullName,password,email);
    fetch('http://127.0.0.1:8000/institute/addstaff/', { //role id update require wait for landing page
      method: 'POST',
      headers: { "Content-Type": "application/json" ,'Authorization':sessionStorage.getItem('token')},
      body: JSON.stringify({'name':fullName,"email_id":email,"password":password})
    }).then(async response=>{
      const data = await response.json();
      console.log(data)
      if(data['status'] == 200){
        console.log("Successfully added a staff")
      }})
    navigate('/ugcProfile');
  }
  const handlename = (e) =>{
    setFullname(e.target.value);
  }
  const handlemail = (e) =>{
    setEmail(e.target.value);
  }
  const handlepass = (e) =>{
    setPassword(e.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="title form-title">Create Staff</div>
        <div className=" form-content">
          <form action="#">
          <div className="row">
          <div className="col-md-6">
              <TextField
              required
              className="form-input"
              id="name"
              label="Name"
              defaultValue=""
              onChange={handlename}
            />
          </div>
          <div className="col-md-6">
            <TextField
            required
            className="form-input"
            id="mail"
            label="Email"
            defaultValue=""
            onChange={handlemail}
          />
          </div>
        </div>
        <div className="row" style={{width: "548px"}}>
          <div className="col-md-6">
            <TextField
            className="form-input"
            id="outlined-read-only-input"
            
            label="Password"
            value={password}
            // InputProps={{
            //   readOnly: true,
            // }}
            onChange={handlepass}
            
          />
          </div>
          <div className="col-md-6">
            <button
                    className="generate-password-btn btn btn-outline-succes"
                    onClick={generatePassword}
                  >
                    Generate Password
            </button>
          </div>
        </div>
            <div className="btn btn-primary form-btn">
            <button type='button' onClick={submission}>Register</button>
            </div>
          </form>
        </div>
        {/* New Form */}
      
      </div>
    </>
  );
};
export default UGCstaffadd;
