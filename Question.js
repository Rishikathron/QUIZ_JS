var question = document.getElementById('_question');
var option_tag = document.getElementById('_Options');
var startBtn = document.getElementById('start_btn');
var answerStatus = document.getElementById('answerStatus');

const questionsArr = {
      questionText: "Commonly used data types DO NOT include:11111111111111111111111111111111111",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    }


function displayQuestion (){
    question.innerHTML = questionsArr.questionText;
    questionsArr.options.forEach(element => {
        var entry = document.createElement('li');  
        entry.className = "ListOptions";    
        entry.textContent = element;
        option_tag.append(entry);
    });
    checkAnswer(questionsArr.answer);
    
}

function  checkAnswer(actual_Answer) {
    const ul = document.getElementById('_Options');
    ul.addEventListener('click' , (e) => {
        console.log(e.target.textContent);
        let expected_Answer = e.target.textContent;
        if(expected_Answer === actual_Answer){            
            displayAnswerStatus("Correct!");
        }
        else{
            displayAnswerStatus("Incorrect!");
        }
    });

    function displayAnswerStatus(Status){
        var hr =  document.createElement('hr');
        var Paragraph = document.createElement('p').innerHTML = Status;
        answerStatus.appendChild(hr);        
        answerStatus.append(Paragraph);
    }
}




//--------

window.onload = function() {
    displayQuestion ();
};
