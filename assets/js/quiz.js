var Quiz = function () {

  'use strict'

  var VERSION = '1.0.1-dev'

  var dom = {
    html: {
      quiz: null,
      results: null,
      submit: null,
      previous: null,
      next: null 
    },
    //current slide
    currentSlide: 0
  }

  function init () 
  {
    for(var elementID in dom.html) {
      dom.html[elementID] = document.getElementById(elementID);
    }

    buildQuiz();
    showSlide(0);
    // on submit, show results
    submit.addEventListener("click", showResults);
    previous.addEventListener("click", showPreviousSlide);
    next.addEventListener("click", showNextSlide);

  }

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];
    // for each question...
    Questions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];
      let letter;
      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label id = "${letter}">
             <input type="radio" name="question${questionNumber}" value="${letter}" >
              <span id="${letter}"> ${letter} :
                ${currentQuestion.answers[letter]}
              </span>
           </label>`
        );
      }
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question">(${questionNumber + 1}). ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    dom.html.quiz.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = dom.html.quiz.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrectAns = 0;

    // for each question...
    Questions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      const answerContent = answerContainer.querySelector(`#${userAnswer}`);
      
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrectAns++;
        answerContent.style.color= "green";
        answerContent.style.background = "white";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContent.style.color = "red";
        answerContent.style.background = "white";


      }
    });

    // show number of correct answers out of total
    dom.html.results.innerHTML = `You score ${numCorrectAns} out of ${Questions.length}`;
  }

  function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slides[dom.currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    dom.currentSlide = n;

    if (dom.currentSlide === 0) {
      previous.style.display = "none";
    } else {
      previous.style.display = "inline-block";
    }

    if (dom.currentSlide ===slides.length - 1) {
      next.style.display = "none";
      submit.style.display = "inline-block";
    } else {
      next.style.display = "inline-block";
      submit.style.display = "none";
    }
  }
  function showNextSlide() {
    showSlide(dom.currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(dom.currentSlide - 1);
  }
  //Quiz object
  return {
    init: init,
    VERSION: VERSION
  }
}();
