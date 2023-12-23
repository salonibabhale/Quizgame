const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard =document.querySelector('.scoreCard');
const alert =document.querySelector('.alert');
const startBtn =document.querySelector('.startBtn');
const timer =document.querySelector('.timer');



//make an array of object that stores question and answer
const quiz=[
    {
        question: "  which of the following is not CSS box model property?",
        choices: ["margin","padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },

    {
        question:" The green planet in the solar system is?",
        choices:[" Mars", " Uranus", " Venus", "Earth"],
        answer:"Uranus"
    },

    {
        question:" Which HTML tag do we use to display text along with a scrolling effect?",
        choices:["<div>","<scroll>", "<marquee>", "None of the above"],
        answer:"<marquee>"
    },

    {
        question:" In HTML, the tags are ",
        choices:[" in upper case", "case-sensitive","in lowercase ", " not case sensitive"],
        answer:"not case sensitive"
    },

    {
      question:"Where was India’s first national Museum opened?",
      choices:["Delhi","Hyderabad","Rajasthan","Mumbai"],
      answer:"Mumbai"
    },



];

//Making variables
let currentQuestionIndex =0;
let score=0;
let quizOver="false";
let timeLeft= 15;
let timerId ="null";

//arrow function tom show questions
const showQuestions = () =>{

const questionDetails =quiz[currentQuestionIndex];
questionBox.textContent = questionDetails.question;

choicesBox.textContent ="";
for(let i=0; i<questionDetails.choices.length; i++){
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement('div');
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add('choice');
    choicesBox.appendChild(choiceDiv);

choiceDiv.addEventListener('click', ()=>{
if(choiceDiv.classList.contains('selected')){
    choiceDiv.classList.remove('selected');
}
else{
    choiceDiv.classList.add('selected');
}
});

}
if (currentQuestionIndex < quiz.length){
    startTimer();
}
//console.log("QuestionDetails");
}

//function to check answers
const checkAnswer =() =>{
    const selectedchoice =document.querySelector('.choice.selected');
    if(selectedchoice.textContent === quiz[currentQuestionIndex].answer){
       // alert("Corrent Answer!");
        displayAlert("Correct Answer");
        score++; 
    }
    else{
        //alert("wrong Answer!");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the correct answer`);
    }

    timeLeft = 15;
   currentQuestionIndex++; 
if(currentQuestionIndex < quiz.length){
    currentQuestionIndex++;
    showQuestions();
}

else {
    showScore();
    stopTimer();
    
}
    //console.log(selectedchoice);
}

//fuction to show score
const showScore = () =>{
    questionBox.textContent ="";
    choicesBox.textContent="";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}`;
    displayAlert("You have completed your quiz")
    nextBtn.textContent ="PLAY AGAIN";
    quizOver = "true";
    timer.style.display= "none";;

}

//function to show alert
const displayAlert = (msg) =>{
   
        alert.style.display="block";
        alert.textContent = msg;
        setTimeout(()=>{
            alert.style.display="none"
    },2000);
   
}

//function to start timer 
const startTimer = () =>{
    clearInterval(timerId); //check for 
    timer.textContent = timeLeft;

    const countDown = ()=>{ 
    timer.textContent = timeLeft;
if (timeLeft === 0){
    const confirmUser = confirm("Time up!!! do you want to play the quiz again");
    if(confirmUser){
        timeLeft = 15;
        startQuiz();
    }
    else {
        startBtn.style.display= "block";
        container.style.display="none";
        return;
    }

}
}
 timerId = setInterval(countDown,1000);
}
// function to stop timer 
const stopTimer = ()=>{


    clearInterval(timerId);
}

//function to start quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display ="flex";
    showQuestions();
}

//adding event listerner to start button 
startBtn.addEventListener('click', ()=> {
    startBtn.style.display="none";
container.style.display="block";

});


nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
       // alert("select your answer");
        displayAlert("select Your Answer");
    return;

    }
    if(quizOver){
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        currentQuestionIndex=0;
        quizOver= false;
        score= 0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
    

});

