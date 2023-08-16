let HTMLquestions = [
{
    "question": "Wer hat HTML erfunden?",
    "answer_1": "Robbie Williams",
    "answer_2": "Laddy Gaga",
    "answer_3": "Tim Berners-Lee",
    "answer_4": "Justin Bieber",
    "right_answer": 3
},
{
    "question": "Welche Methode wird verwendet, um ein Element in ein Array am Ende hinzuzufügen?",
    "answer_1": "appendTo",
    "answer_2": "push",
    "answer_3": "add",
    "answer_4": "insert",
    "right_answer": 2
}
];
let CSSquestions = [
    {
        "question": "Welche Einheit wird in CSS verwendet, um Schriftgrößen zu definieren?",
        "answer_1": "PX",
        "answer_2": "EM",
        "answer_3": "PT",
        "answer_4": "REM",
        "right_answer": 1        
    },
    {
        "question": "Welche CSS-Eigenschaft wird verwendet, um den Hintergrund eines Elements zu ändern?",
        "answer_1": "color",
        "answer_2": "border",
        "answer_3": "background-color",
        "answer_4": "font-size",
        "right_answer": 3        
    },
    {
        "question": "Welches Pseudoelement in CSS wird verwendet, um den ersten Buchstaben eines Textes zu vergrößern?",
        "answer_1": "::first-letter",
        "answer_2": "::initial-letter",
        "answer_3": "::big-letter",
        "answer_4": "::capital-letter",
        "right_answer": 1
             
    }
    ];
    let JSquestions = [
        {
            "question": "Welche Methode wird in JavaScript verwendet, um ein Element nach seiner ID auszuwählen?",
            "answer_1": "getElementByName",
            "answer_2": "getElement",
            "answer_3": "selectElementById",
            "answer_4": "getElementById",
            "right_answer": 4        
        },
        {
            "question": "Welche Funktion wird in JavaScript verwendet, um eine Zeitverzögerung zu erzeugen?",
            "answer_1": "setInterval",
            "answer_2": "delay",
            "answer_3": "sleep",
            "answer_4": "setTimeout",
            "right_answer": 4        
        },
        {
            "question": "Welche Schlüsselwort wird in JavaScript verwendet, um eine Variable zu deklarieren?",
            "answer_1": "var",
            "answer_2": "let",
            "answer_3": "const",
            "answer_4": "variable",
            "right_answer": 2
        }
    ];
    let Javaquestions = [
        {
            "question": "Welche Datenstruktur in Java verwendet das Prinzip 'First-In-First-Out'?",
            "answer_1": "Stapel (Stack)",
            "answer_2": "Schlange (Queue)",
            "answer_3": "Liste (List)",
            "answer_4": "Baum (Tree)",
            "right_answer": 2        
        },
        {
            "question": "Was ist der Unterschied zwischen einer abstrakten Klasse und einem Interface in Java?",
            "answer_1": "Eine abstrakte Klasse kann multiple Vererbung haben, ein Interface nicht.",
            "answer_2": "Ein Interface kann Methodenimplementierungen haben, eine abstrakte Klasse nicht.",
            "answer_3": "Eine abstrakte Klasse kann nicht von anderen Klassen abgeleitet werden, ein Interface schon.",
            "answer_4": "Ein Interface kann Felder und Konstruktoren haben, eine abstrakte Klasse nicht.",
            "right_answer": 1        
        },
        {
            "question": "Wie werden Ausnahmen (Exceptions) in Java behandelt?",
            "answer_1": "Mit bedingten Anweisungen (if-else)",
            "answer_2": "Mit Schleifen (Loops)",
            "answer_3": "Mit Try-Catch-Blöcken",
            "answer_4": "Mit Switch-Anweisungen",
            "right_answer": 3
        }
    ];
    
let quizChoice = 'HTML';
let answerCheckAktiv = true;   
let currentQuestion = 0;
let score = 0;
let myBorder = 0;
let AUDIO_SUCCESS =  new Audio('audio/success.mp3');
let AUDIO_FAIL =  new Audio('audio/fail.mp3')

function ShowQuestion(){
    document.getElementById('questionFooter').classList.remove('d-none');
    document.getElementById('quizArea').classList.remove('quiz-start');
    let allQuestions = questionChoice().length;

    if(currentQuestion >= allQuestions){
        showEndCard(allQuestions);
    }
    else{
        let percent = createPercent(allQuestions);
        createProgressBar(percent);
        showTheQuiz();
        createAnswer(allQuestions);
    }
}

function answerCheck(selection){
    let {correctAnswer, correctAnswerID, selectedAnswer} = createVar(selection);
    if(answerCheckAktiv){
    if(correctAnswer == selectedAnswer){
            AUDIO_SUCCESS.play();
            document.getElementById(selection).parentNode.classList.add('bg-success');
            score++;
        }
        else{
            AUDIO_FAIL.play();
            document.getElementById(selection).parentNode.classList.add('bg-danger');
            document.getElementById(correctAnswerID).parentNode.classList.add('bg-success');
        }
        document.getElementById('nextButton').disabled=false;
    }
    answerCheckAktiv = false;
}

function nextQuestion(){
    currentQuestion++;
    answerCheckAktiv = true;
    createQuestionCounter();
    ShowQuestion();
    resetAnswerButton();
}

function lastQuestion(){
    currentQuestion--;
    score--;
    answerCheckAktiv = true;
    if(score < 0){
        score = 0
    }
    if(currentQuestion < 0){
        currentQuestion = 0
    }
    createQuestionCounter();
    ShowQuestion();
    resetAnswerButton();
}

function resetAnswerButton(){
    document.getElementById('nextButton').disabled=true;
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function replay(){
    location.reload();
}

function createBorder(selection){
    resetBorder();

    document.getElementById(`${selection}Choice`).classList.add('my-border');
    document.getElementById(`${selection}Color`).classList.add('color-white');

    quizChoice = selection;
    currentQuestion = 0;
    createQuestionCounter();
    ShowQuestion();
}

function questionChoice(){
    if(quizChoice == 'HTML'){
        selectedQuestions = HTMLquestions;
    }
    else if(quizChoice == 'CSS'){
        selectedQuestions = CSSquestions;
    }
    else if(quizChoice == 'JS'){
        selectedQuestions = JSquestions;
    }
    else if(quizChoice == 'Java'){
        selectedQuestions = Javaquestions;
    }
    return selectedQuestions;
}

function showEndCard(allQuestions){
return document.getElementById('mainContainer').innerHTML = /*html*/`
<div class="card quiz-card" style="width: 18rem;">
    <div class="quiz-field-end">
      <div class="quizChoiceAreaEnd" id="quizChoiceArea">
        <img src="./img/logo.png" alt="">
        <div class="border-with-choice"><div id="HTMLChoice"></div><a id="HTMLColor" href="#/">HTML</a></div>
        <div class="border-with-choice"><div id="CSSChoice"></div><a id="CSSColor" href="#/">CSS</a></div>
        <div class="border-with-choice"><div id="JSChoice"></div><a id="JSColor" href="#/">JS</a></div>
        <div class="border-with-choice"><div id="JavaChoice"></div><a id="JavaColor" href="#/">Java</a></div>
      </div>
      <div class="quiz-area-end">
            <div class="end-logo">
                <img src="./img/brain result.png">
                <h5>COMPLETE<br>HTML QUIZ</h5>
            </div>
            <div>
                <b class="score">YOUR SCORE</b> <b>${score}/${allQuestions}</b>
            </div>
            <div class="end-buttons">
                <button type="button" class="btn btn-primary">SHARE</button>
                <button onclick="replay()" type="button" class="btn btn-outline-primary">REPLAY</button>
            </div>
    </div>
    <div class="trophy-div"><img class="trophy-img" src="./img/tropy.png"></div>
</div>
`;
}

function createPercent(allQuestions){
    let percent = (currentQuestion + 1) / allQuestions;
    percent = percent * 100;
    if(percent > 100){
        percent = 100;
    }
    return percent
}

function createProgressBar(percent){
    document.getElementById('progressBar').innerHTML = Math.round(percent) +" %";
    document.getElementById('progressBar').style = `width: ${percent}%`
}

function showTheQuiz(){
    return document.getElementById('quizArea').innerHTML = /*html*/`
    <div class="card-body">
             <h5 class="card-title" id="questionText">Frage</h5>
           </div>
           <div class="card quiz-answer m-3" onclick="answerCheck('answer_1')">
               <div class="card-body" id="answer_1">
                 Antwort
               </div>
           </div>
           <div class="card quiz-answer m-3">
             <div class="card-body" id="answer_2" onclick="answerCheck('answer_2')">
               Antwort
             </div>
           </div>
           <div class="card quiz-answer m-3">
             <div class="card-body" id="answer_3" onclick="answerCheck('answer_3')">
               Antwort
             </div>
           </div>
           <div class="card quiz-answer m-3">
             <div class="card-body" id="answer_4" onclick="answerCheck('answer_4')">
               Antwort
             </div>
           </div>
`;
}

function createAnswer(allQuestions){
    document.getElementById('bigCounter').innerHTML = allQuestions;
    let question = questionChoice()[currentQuestion];
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function createQuestionCounter(){
    document.getElementById('smallCounter').innerHTML = currentQuestion + 1;
}

function createVar(selection){
    let question = questionChoice()[currentQuestion];
    let correctAnswer = question['right_answer'];
    let correctAnswerID = `answer_${correctAnswer}`;
    let selectedAnswer = selection.slice(-1);
    return {question, correctAnswer, correctAnswerID, selectedAnswer}
}

function resetBorder(){
    var elements = document.querySelectorAll('.my-border');
    elements.forEach(function(element) {
        element.classList.remove('my-border');
    });
    var elements1 = document.querySelectorAll('.color-white');
    elements1.forEach(function(element1) {
        element1.classList.remove('color-white');
    });
}