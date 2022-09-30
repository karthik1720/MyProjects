var setPic1, setPic2, setNum1, setNum2;
function randomNumber(){
    var num = Math.floor(Math.random()*6)+1;
    return num;
}

function setPicVal(){
    setNum1 = randomNumber();
    setNum2 = randomNumber();
    setPic1 = "images/dice"+setNum1+".png";
    setPic2 = "images/dice"+setNum2+".png";
}

function outputVal(){
    if(setNum1 == setNum2){
       return "Draw"; 
    }
    else if(setNum1 > setNum2)
    {
        return "Player 1 is winner 🚩";
    }
    else{
        return "Player 2 is winner 🚩";
    }
}


function setImg(){
    setPicVal();
    document.querySelector(".img1").setAttribute("src",setPic1);
    document.querySelector(".img2").setAttribute("src",setPic2);
    document.querySelector("h1").innerHTML = outputVal();
}
