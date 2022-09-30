import React, { useState } from "react";

function List(props) {

    
    return (
        <div >
            <li id={props.id} onClick={()=>props.deleteItem(props.id)}>{props.arr}</li>
        </div>
    )
}

export default List;