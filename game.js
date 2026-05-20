const sounds = {
    "1" : new Audio("sounds/click01.mp3"),
    "2" : new Audio("sounds/click02.mp3"),
    "3" : new Audio("sounds/click03.mp3"),
    "4" : new Audio("sounds/click04.mp3"),
    "0" : new Audio("sounds/gameOver.mp3"),
}

var moves = [];
var usrTurn = true;
var ind = 0;
var levelText = $("h1")
var infoText = $("h2")



$(".btn").click(
    (ele)=>{
        if(usrTurn){
            if(!isMoveEmpty()){
                if(checkAns(ind,String($(ele.target).attr("id")))){
                    if(ind >= moves.length - 1){
                        PressButton($(ele.target).attr("id"));
                        console.log("the length is : ", moves.length);
                        ind = 0;
                        
                        setTimeout(()=>simonGoes(),1000);
                    }else{ 
                        PressButton($(ele.target).attr("id"));
                        ind+=1; 
                        levelText.text("level " + moves.length);
                    }
                    console.log(ind, " is correct");
                    
                }else{
                    console.log("Wrong button pressed");  
                    console.log("play again"); 
                    gameOver();     
                }
                
            }else{
               
                levelText.text("level " + moves.length);
                addMove($(ele.target).attr("id"));
                PressButton($(ele.target).attr("id"));
                simonGoes();
            }   
        }
    }

);


function isMoveEmpty(){ 
    if (moves.length == 0)
        return true 

    return false

}

function addMove(newMove){
    console.log("addMove called, added : ", newMove);
    moves.push(newMove);
}


function simonGoes(){
    
    usrTurn = false;
    console.log("Simon goes called for index ", ind);
    let time = 1000;
    for (let  i = 0; i < moves.length; i++){
        let btn = moves[i];
        setTimeout(()=>PressButton(btn), time);
        time += 900;
    }
    
    let nextMove = String(Math.floor(Math.random()*4)+ 1);
    addMove(nextMove);
    setTimeout(()=>{PressButton(nextMove); usrTurn = true;}, time);
    
    
}


function checkAns(index, box){
    
    console.log("checkAns called for id ", box);

    if( moves.length != 0 && moves[index] == box){
        return true;
    }else{
        return false;
    }
}



function PressButton(sid){
    const id = String(sid);
    
    console.log("PressButton Called for id ", id);
    PlaySound(sid);

    $("#" + id).addClass("pressed");
    setTimeout(()=>{$("#" + id).removeClass("pressed")}, 100);
}


function PlaySound(sid){
    
    console.log("PlaySound called for id ", sid);
    let id = String(sid);
    sounds[id].play();
    sounds[id].currentTime = 0;
}


function gameOver(){
    ind = 0;
    moves = [];
    levelText.text("Level " + 0);
    let body = $("body")
    PlaySound("0");
    body.addClass("gameOver");
    setTimeout(()=>{
           setTimeout(()=>{infoText.text("Press any button to play again!");}, 1000);
           body.removeClass("gameOver");
        }
       , 1000
    );
    
    infoText.text("GAME OVER")

}
