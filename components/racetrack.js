import { fireEvent } from "./eventfire.js";

export default class RaceTrack extends HTMLElement{

    constructor(){
        super();


        
        this.attachShadow({ mode: "open" });
        this.render();

    }
    connectedCallback() {
      

    }

    render(){
        this.shadowRoot.innerHTML = `
        
            <h2>The race track:</h2>   
            <slot></slot>     

            <p>Winner is: <span id="race-winner"></span><br> With the time <span id="winning-time: "></span></p>
        
        `
        this.finishRace();
        ;
    }
    finishRace(){

       document.addEventListener("horse-moved", (e) => {
        //if race is not finished and a horse has reached the finish line:
            if(e.detail[1] > 80){

                fireEvent("race-finished", e.detail[0]);
            
            } else {
                return
            }

       })
        
    
    }




}

customElements.define("race-track", RaceTrack);
