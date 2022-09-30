import react from "react";

function Form(props) {
 return (
    <div className="form">
        <input type="text" onChange={props.updateVal} value={props.inputVal}/>
        <button onClick={props.submitButton} >
          <span>Add</span>
        </button>
      </div>
 )  
}

export default Form;