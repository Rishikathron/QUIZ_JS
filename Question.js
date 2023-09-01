var question = document.getElementById('_question');
var option_tag = document.getElementById('_Options');
var startBtn = document.getElementById('start_btn');
var answerStatus = document.getElementById('answerStatus');
var timer = document.getElementById('Timer');
var card = document.getElementsByClassName('card');
var scoreSheet = document.getElementById('score_sheet');
var redirect_div = document.getElementById('redirect_buttons');


let remainingTime = 50;
let Score = 0;
let userName = "Anonymous";

const questionsArr = [
    {
              questionText: "1. Commonly used data types DO NOT include:",
              options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
              answer: "3. alerts",
            },
            {
              questionText: "2. Arrays in JavaScript can be used to store ______.",
              options: [
                "1. numbers and strings",
                "2. other arrays",
                "3. booleans",
                "4. all of the above",
              ],
              answer: "4. all of the above",
            },
            {
              questionText:
                "3. String values must be enclosed within _____ when being assigned to variables.",
              options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
              answer: "3. quotes",
            },
            {
              questionText:
                "4. A very useful tool used during development and debugging for printing content to the debugger is:",
              options: [
                "1. JavaScript",
                "2. terminal/bash",
                "3. for loops",
                "4. console.log",
              ],
              answer: "4. console.log",
            },
            {
              questionText:
                "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
              options: ["1. break", "2. stop", "3. halt", "4. exit"],
              answer: "1. break",
            }
]

function startQuiz(){
    getUserName();
    startTimer();
    displayQuestion();
}

function getUserName(){
    userName = document.getElementById('inputText').value;
    console.log(userName);

    userNameDiv = document.getElementsByClassName('userName_div');
    console.log(userNameDiv);
    for (var i=0 ; i<userNameDiv.length ; i++){
        userNameDiv[i].style.display = "none";
    }
    
    questionDiv = document.getElementsByClassName('question_block');
    console.log(questionDiv);

    for (var i=0 ; i<questionDiv.length ; i++){
        questionDiv[i].style.display = "block";
    }    
}

let index = 0;
function displayQuestion (){   
    if(index > questionsArr.length){        
        gameOver();
        return ;
    } 

    let QuestionValues = questionsArr[index++]
    console.log(QuestionValues);
    question.innerHTML = QuestionValues.questionText;
    QuestionValues.options.forEach(element => {
        var entry = document.createElement('li');  
        entry.className = "ListOptions";    
        entry.textContent = element;
        option_tag.append(entry);
    });
    checkAnswer(QuestionValues.answer);    
}

function  checkAnswer(actual_Answer) {
    const ul = document.getElementById('_Options');
    ul.addEventListener('click' , (e) => {
        console.log(e.target.textContent);
        let expected_Answer = e.target.textContent;
        if(expected_Answer === actual_Answer){            
            displayAnswerStatus("Correct!");
            Score += 1;
            setTimeout(() => {
                clearAnswerStatus();
                displayQuestion();
              }, 1000);
        }
        else{
            displayAnswerStatus("Incorrect!");
            penalty();
            setTimeout(() => {
                clearAnswerStatus();
                displayQuestion();
              }, 1000);
        }
    });  

}

function displayAnswerStatus(Status){
    //answerStatus.firstChild.style.display = "block";
    answerStatus.lastChild.textContent = Status;
    console.log(answerStatus);
    console.log(answerStatus.getElementsByTagName('hr').style);
    answerStatus.getElementsByTagName('hr')[0].style.display = "block"
    // var hr =  document.createElement('hr');
    // var Paragraph = document.createElement('p');
    // Paragraph.textContent = Status;
    // answerStatus.append(hr);        
    // answerStatus.appendChild(Paragraph);
}

function clearAnswerStatus(){
    answerStatus.getElementsByTagName('hr')[0].style.display = "none"
    answerStatus.lastChild.textContent = "";
    question.textContent = "";
    option_tag.textContent = "";
}

function startTimer(){
    var Interval = setInterval(()=>{
        timer.textContent = remainingTime;
        if(remainingTime <= 0){
            timer.textContent = 0;
            clearInterval(Interval);
        }
        remainingTime--;
    },1000)
}

function penalty() {
    remainingTime = remainingTime - 10;
}

function gameOver(){    
    
    question.textContent = "Scores";
    question.style.fontSize = "2rem";

    var list_score = document.createElement('p').textContent = `Your Score : ${Score}`
    option_tag.append(list_score);    
    redirect_div.style.display = "block"
    remainingTime = 0;

    
}
//--------starting function---------

window.onload = function() {

    var playbutton = document.getElementById('playbtn');
    playbutton.addEventListener('click',(e)=>{
        startQuiz();
    });    
};
