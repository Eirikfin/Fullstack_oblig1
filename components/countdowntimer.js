export default class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      this.clocktimer = ['ready', 'set', 'GO!'];
      this.time = 0;
  
     

      this.render(); // Initial render
    }
  
    connectedCallback() {
    // shadow-DOM elements:
    this.timeDisplay = this.shadowRoot.querySelector('#clock');
    this.startBtn = this.shadowRoot.querySelector('#start-button');
    this.resetBtn = this.shadowRoot.querySelector('#reset-button');

    // adding eventlistener:
    this.startBtn.addEventListener("click", () =>{this.startTimer()});
    this.resetBtn.addEventListener("click", () =>{this.resetTimer()});
    }
  
    startTimer() {
       
        this.runningTime = setInterval(() => {
    
        this.time += 0.01; 
        this.timeDisplay.textContent = `time: ${this.time.toFixed(2)}`;
      }, 10);

    
    }
    resetTimer(){
        clearInterval(this.runningTime)
        this.time= 0;
        this.timeDisplay.textContent = `time: ${this.time.toFixed(2)}`;

    }
    render() {
     // elements in shadowDOM:
    



      this.shadowRoot.innerHTML = `
        <div>
          <h1>Countdown Timer:</h1>
          <p id="timer">time: <span id="clock">${this.time.toFixed(2)}</span></p>
            
          <button id="start-button">Start</button>
          <button id="reset-button">Reset</button>
        
          </div>
      `;
    }
  }
  
  customElements.define("countdown-timer", CountdownTimer);
  