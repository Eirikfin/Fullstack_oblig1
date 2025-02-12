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
    }
    // methods:
    startRace() {
    
        this.startBtn.disabled = true;
       
    
        // Show "ready, set, GO!" messages before starting the timer
        const countdownInterval = setInterval(() => {
          if (this.countDown > 0){
            this.countDownMsg.textContent = this.countDown;
            this.countDown--;
          
          } else {
            clearInterval(countdownInterval);
            this.countDownMsg.textContent = ""; // Clear message after GO!
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
    resetTimer(){
        fireEvent("reset-race")

        clearInterval(this.runningTime)
        this.time= 0;
        this.countDown = this.getAttribute('seconds') || 5;
        
        this.timeDisplay.textContent = ` ${this.time.toFixed(2)}`;
        this.startBtn.disabled = false;
    }
    render() {
    
    
      this.shadowRoot.innerHTML = `
        <div>
          <h1>Countdown Timer:</h1>
          <p id="timer">time: <span id="clock">${this.time.toFixed(2)}</span></p>
          <p id="countdown-msg"></p>
            
          <button id="start-button">Start</button>
          <button id="reset-button">Reset</button>
        
          </div>
      `;
    }
  }
  
  customElements.define("countdown-timer", CountdownTimer);
