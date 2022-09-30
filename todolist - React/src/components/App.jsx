import React, { useState } from "react";
import Heading from './Heading';
import Form from './Form';
import List from './List';

function App() {
  let arr = [];
  const [inputVal, setInputVal] = useState("");
  const [arrVal, setArrVal] = useState([]);


  function updateVal(event) {
    setInputVal(
      event.target.value
    )
  }



  function submitButton() {
    setArrVal(
      preVal => {
        return ([...preVal, inputVal])

      }
    )
    setInputVal("")
  }

  function deleteItem(id){
    
    setArrVal(prev=>
     {
      return prev.filter((item, index) =>{
        return index !==id;
      }
      )
     }
      )
  }

  return (
    <div className="container">
      <Heading></Heading>
      <Form inputVal={inputVal} submitButton={submitButton} updateVal={updateVal}></Form>
      <div>
        <ul>
          {
            arrVal.map((arr,index) =>
              <List arr={arr} key={index} id = {index} deleteItem = {deleteItem}></List>
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
