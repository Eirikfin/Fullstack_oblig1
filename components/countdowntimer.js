import { fireEvent } from "./eventfire.js";

export default class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      // properties:
      this.time = 0;
      this.countDown = this.getAttribute('seconds') || 5;
  
     

      this.render(); // Initial render
    }
  
    connectedCallback() {
    // shadow-DOM elements:
    this.timeDisplay = this.shadowRoot.querySelector('#clock');
    this.startBtn = this.shadowRoot.querySelector('#start-button');
    this.resetBtn = this.shadowRoot.querySelector('#reset-button');
    this.countDownMsg = this.shadowRoot.querySelector('#countdown-msg')

    // adding eventlistener:
    this.startBtn.addEventListener("click", () =>{this.startRace()});
    this.resetBtn.addEventListener("click", () =>{this.resetTimer()});
    
    document.addEventListener("race-finished", () => {this.stopTimer()});
    }
    // methods:

    startRace() {
        //disable button when it is clicked
        this.startBtn.disabled = true;
      
       //start the countdown
        const countdownInterval = setInterval(() => {
          //check if countdown is bigger than 0:
          if (this.countDown > 0){
            this.countDownMsg.textContent = this.countDown; //display time
            this.countDown--; // reduce countdown with 1
          //if no longer true clear interval
          } else {
            clearInterval(countdownInterval);
            this.countDownMsg.textContent = "GO!!"; // Race start message
            this.startTimer(); // Start the main timer
          }
        }, 1000);
      }

    startTimer() {
       fireEvent("start-race")
        this.runningTime = setInterval(() => {
    
        this.time += 0.01; 
        this.timeDisplay.textContent = `${this.time.toFixed(2)}`;
      }, 10);
      
    
    }

    stopTimer() {
      clearInterval(this.runningTime);
      fireEvent("winning-time", this.time.toFixed(2));
    }

    resetTimer(){
        fireEvent("reset-race")

        clearInterval(this.runningTime)
        this.time= 0;
        this.countDown = this.getAttribute('seconds') || 5;
        this.countDownMsg.textContent = "";
        this.timeDisplay.textContent = ` ${this.time.toFixed(2)}`;
        this.startBtn.disabled = false;
    }

    render() {
    
      this.shadowRoot.innerHTML = `
      <style>
        :host{
          border: solid black 2px;
          border-radius: 20px;
          padding: 40px;
          background-color: white;
        }
        p {
          font-weight: bold;
          font-size: 2rem;
        }
        #clock{
          font-size: 3rem;
        }
        #countdown-msg{
        font-size: 5rem;
        text-align: center;
        margin:auto;
        }
        section{
          display: flex;
          gap: 1em;
        }
        button{
          width: 80%;
          height: 40px;
          border-radius: 20px;
        }
      
      </style>  
      
      <div>
          <h2>Countdown Timer:</h2>
          <p id="timer">time: <span id="clock">${this.time.toFixed(2)}</span></p>
          <p id="countdown-msg"></p>
            
          <section>
          <button id="start-button">Start</button>
          <button id="reset-button">Reset</button>
          </section>
          </div>
      `;
    }
  }
  
  customElements.define("countdown-timer", CountdownTimer);
