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

                :host {
                margin: 0 auto;
                width: 100%;
                overflow: hidden;
                }
                div {          
                background-color: #C4A484;
                color: white;
                position: relative;
                z-index: 1;
            }
                .finishline {
                    position: absolute;
                    left: 91%;
                    width: 5px;
                    background-color: yellow;
                    height: 100%;
                    z-index: 2;
                
                }
                p {
                    font-size: 2rem;
                    color: white;
                    font-weight: bold;
                }
                span{
                    color: yellow;
                }
            </style> 
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
            const winner = document.createElement("li")
            winner.innerHTML = `the winner was ${e.detail}!`

            document.getElementById("history-container").appendChild(winner);
        })

            document.addEventListener("winning-time", (e) => {
            this.shadowRoot.querySelector('#winning-time').textContent = e.detail;
           
        })

    }




}

customElements.define("race-track", RaceTrack);
