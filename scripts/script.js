console.log("LOLz");

let session_length = 25;
let break_length = 5;
let session_time = session_length * 60;
let break_time = break_length * 60;
let mainbuttonstatus = "start";
let sessionid = "SESSION RUNNING";
let pausedtime = session_time;
let state = "initial";
let globaltime = session_time;
const statusdisplay = document.getElementById("statusdisplay");
const clock = document.getElementById("clock");
const sincrement = document.getElementById("sincrement");
const sdecrement = document.getElementById("sdecrement");
const bincrement = document.getElementById("bincrement");
const bdecrement = document.getElementById("bdecrement");
const sdisplay = document.getElementById("sdisplay");
const bdisplay = document.getElementById("bdisplay");
const playbutton = document.getElementById("playbutton");
const resetbutton = document.getElementById("resetbutton");
const playimg = document.getElementById("playimg");

inttotime(session_time);

/* session increment-decrement functionality */
/*session*/
sincrement.addEventListener("click", s1);

function s1(){
  if (session_length < 45) {
    session_length += 1;
    session_time = session_length * 60;
  }
  sdisplay.innerHTML = session_length;
  inttotime(session_time);
}

sdecrement.addEventListener("click", s2);

function s2(){
  if (session_length > 2) {
    session_length -= 1;
    session_time = session_length * 60;
  }
  sdisplay.innerHTML = session_length;
  inttotime(session_time);
}

/*break*/
bincrement.addEventListener("click", b1);
function b1() {
  if (break_length < 20) {
    break_length += 1;
    break_time = break_length * 60;
  }
  bdisplay.innerHTML = break_length;
  inttotime(break_time);
}

bdecrement.addEventListener("click", b2);

function b2(){
  if (break_length > 1) {
    break_length -= 1;
    break_time = break_length * 60;
  }
  bdisplay.innerHTML = break_length;
  inttotime(break_time);
}

/* start-pause button event listeners */

playbutton.addEventListener("click", () => {

  /*INITIAL STATE*/
  if(mainbuttonstatus == "start"){
    console.log(mainbuttonstatus);
    mainbuttonstatus = "pause";
    playimg.setAttribute("src", "./images/pause_3.svg");
    countdown(session_time);
    state = "pausable";
    sincrement.removeEventListener("click",s1);
    sdecrement.removeEventListener("click",s2);
    bincrement.removeEventListener("click",b1);
    bdecrement.removeEventListener("click",b2);
    statusdisplay.innerHTML=sessionid;
  }
  /*PAUSED STATE*/
  else if (mainbuttonstatus == "pause") {
    console.log(mainbuttonstatus);
    mainbuttonstatus = "resume";
    playimg.setAttribute("src", "./images/play_3.svg");
    pausedtime=globaltime;
    state="runnable";
    statusdisplay.innerHTML="PAUSED";
  }
  /*RUNNING AFTER RESUME STATE*/
   else {
    console.log(mainbuttonstatus);
    mainbuttonstatus = "pause";
    playimg.setAttribute("src", "./images/pause_3.svg");
    state = "pausable";
    countdown(pausedtime);
    statusdisplay.innerHTML=sessionid;
  }

});

resetbutton.addEventListener("click", () => {
  console.clear();
  console.log("Reset all timers");
  location.reload();
});

/*converts integer to time format string*/

function inttotime(timeinint){
    let mm=0;
    let ss=0;
    mm=Math.trunc(timeinint/60);
    ss=timeinint%60;
    timestr = (mm<10?"0"+mm:mm)+":"+(ss<10?"0"+ss:ss);
    clock.innerHTML=timestr;
}

function countdown(time){

  globaltime=time;
    const timer = setTimeout(()=>{
    time=time-1;
    inttotime(time);
    countdown(time) ;
  },1000);
  if(time==0 || state=="runnable"){
    clearTimeout(timer);
    if(sessionid=="SESSION RUNNING"){
      sessionid="BREAK RUNNING";
      countdown(break_time)
    }
    else if(sessionid=="BREAK RUNNING"){
      sessionid="SESSION RUNNING";
      countdown(session_time);
    }
    else{
      console.log("end of session");
    };
    statusdisplay.innerHTML=sessionid;
  }


}



