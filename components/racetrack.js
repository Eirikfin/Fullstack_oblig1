import { fireEvent } from "./eventfire.js";

export default class RaceTrack extends HTMLElement{

    constructor(){
        super();


        
        this.attachShadow({ mode: "open" });
        this.render();
        this.displayWinner();

    }
    connectedCallback() {
      

    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>

                div {
                margin: 0 auto;
                width: 90%;
                background-color: #C4A484;
                color: white;
                position: relative;
                z-index: 1;
            }
                div .finishline {
                    position: absolute;
                    left: 90%;
                    width: 5px;
                    background-color: yellow;
                    height: 100%;
                    z-index: 2;
                }
                div > 
            </style>
            <h2>The race track:</h2>  
            <div> 
            <span class="finishline"></span>
            <slot></slot> 
               
            </div>
            <p>Winner is: <span id="race-winner"></span><br> With the time: <span id="winning-time"></span></p>
        
        `
        this.finishRace();
        ;
    }
    finishRace(){

       document.addEventListener("horse-moved", (e) => {
        //if race is not finished and a horse has reached the finish line:
            if(e.detail[1] > 90){ //if the distance is greater than 80

                fireEvent("race-finished", e.detail[0]); // fire event with payload, winers name
            
            } else {
                return
            }

       })
    }
    displayWinner(){
        document.addEventListener("race-finished", (e) => {
            this.shadowRoot.querySelector('#race-winner').textContent = e.detail;
        })

        document.addEventListener("winning-time", (e) => {
            this.shadowRoot.querySelector('#winning-time').textContent = e.detail;
        })

    }




}

customElements.define("race-track", RaceTrack);
