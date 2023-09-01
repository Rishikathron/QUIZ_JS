var question = document.getElementById('_question');
var option_tag = document.getElementById('_Options');
var startBtn = document.getElementById('start_btn');
var answerStatus = document.getElementById('answerStatus');
var timer = document.getElementById('Timer');
let remainingTime = 50;

const questionsArr = [
            {
              questionText: "Commonly used data types DO NOT include:",
              options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
              answer: "3. alerts",
            },
            {
              questionText: "Arrays in JavaScript can be used to store ______.",
              options: [
                "1. numbers and strings",
                "2. other arrays",
                "3. booleans",
                "4. all of the above",
              ],
              answer: "4. all of the above",
            }
]

let index = 0;
function displayQuestion (){   
    // if(index == questionsArr.length){
    //     alert("Qiz Compleated");
    //     index = 0;
    //     return ;
    // } 

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
    
    //displayQuestion();
}

function  checkAnswer(actual_Answer) {
    const ul = document.getElementById('_Options');
    ul.addEventListener('click' , (e) => {
        console.log(e.target.textContent);
        let expected_Answer = e.target.textContent;
        if(expected_Answer === actual_Answer){            
            displayAnswerStatus("Correct!");
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

    function displayAnswerStatus(Status){
        var hr =  document.createElement('hr');
        var Paragraph = document.createElement('p').innerHTML = Status;
        answerStatus.appendChild(hr);        
        answerStatus.append(Paragraph);
    }

}

function clearAnswerStatus(){
    answerStatus.removeChild(answerStatus.lastChild);
    answerStatus.removeChild(answerStatus.firstChild);
    document.getElementsByTagName('p').textContent = "";
    question.textContent = "";
    option_tag.textContent = "";
}
function startTimer(){
    var Interval = setInterval(()=>{
        timer.textContent = remainingTime;
        if(remainingTime <= 0){
            alert("GameEnd");
            timer.textContent = 0;
            clearInterval(Interval);
        }
        remainingTime--;
    },1000)
}


function penalty() {
    remainingTime = remainingTime - 10;
}

//--------

window.onload = function() {
    startTimer();
    displayQuestion ();
};
