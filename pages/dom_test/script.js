
var nowQuestionIndex = 0;
const questionContainer = document.getElementById('questions');
let correctAnswer = null;
let lastQuestion = null;
let correctAnswersCounter = 0;
let incorrectAnswers = [];

questions = mixArray(questions)

function mixArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuestion(questionIndex) {
    if (questionIndex >= questions.length) {
        showResult();
        return;
    }
    if (questionContainer.innerHTML !== '') {
        let breakElement = document.createElement('div');
        breakElement.setAttribute('class', 'flex-break');
        questionContainer.appendChild(breakElement);
    }
    let question = questions[questionIndex];
    let questionDiv = document.createElement('div');
    questionDiv.setAttribute('class', 'question');
    questionDiv.setAttribute('num', questionIndex);
    questionDiv.innerHTML = (questionIndex + 1) + ". " + question.question;
    questionContainer.appendChild(questionDiv);
    lastQuestion = questionDiv;
    let allAnswers = mixArray(question.incorrectAnswers.concat([question.correctAnswer]));
    allAnswers.forEach(element => {
        answerDiv = document.createElement('div');
        answerDiv.setAttribute('class', 'answer');
        answerDiv.innerHTML = element;
        questionContainer.appendChild(answerDiv);
        if (element === question.correctAnswer) {
            correctAnswer = answerDiv;
        } else {
            incorrectAnswers.push(answerDiv);
        }
        answerDiv.addEventListener('click', (event) => onClickAnswer(event));
    });
}


function hideElement(element){
    element.animate({transform: "translate(0px, 10000%)", opacity: 0}, {duration: 5000, fill: "forwards", easing: "ease"});
    setTimeout(function() {
        element.remove();
    }, 1000)
}
function onClickAnswer(event) {
    incorrectAnswers.forEach(element => hideElement(element));
    hideElement(correctAnswer);
    setTimeout(() => {
        if (correctAnswer != null && event.srcElement === correctAnswer) {
            lastQuestion.innerHTML += " ✅";
            correctAnswersCounter += 1;
        } else {
            lastQuestion.innerHTML += " ❌";
        }
        explanation = document.createElement('div');
        explanation.setAttribute('class', 'explanation');
        questionContainer.appendChild(explanation);
        explanation.classList.add('flex-break');
        explanation.innerHTML = questions[nowQuestionIndex].explanation;
        setTimeout(
            () => {
                hideElement(explanation)
                setTimeout(() => {
                    nowQuestionIndex += 1;
                    createQuestion(nowQuestionIndex);
                }, 5000);
            }, 5000
        );
    }, 5000);
}

function showResult() {
    let resultDiv = document.createElement("a");
    resultDiv.setAttribute("class", "results flex-break");
    resultDiv.innerHTML = "Результат: " + correctAnswersCounter + "/" + questions.length;
    resultDiv.style.marginLeft = "1%";
    questionContainer.insertBefore(resultDiv, questionContainer.firstChild)
    let i = 0
    questionContainer.querySelectorAll("div.question").forEach(
        question => {
            question.addEventListener(
                'click',
                (event) => {
                    questionContainer.querySelectorAll("div.answer").forEach((element) => element.remove());
                    answerDiv = document.createElement("div");
                    answerDiv.setAttribute("class", "answer");
                    answerDiv.innerHTML = questions[parseInt(question.getAttribute('num'))].correctAnswer;
                    questionContainer.insertBefore(answerDiv, question.nextSibling);
                }
            )
            i++;
        }
    )
}

createQuestion(nowQuestionIndex);