import { fireEvent } from "./eventfire.js";

export default class Racehorse extends HTMLElement{

    constructor(){
        super()
        
        //properties:

        this.horsename = this.getAttribute("name") || "just a horse";
        this.keyInput = this.getAttribute("key");
        this.position = 0;
        this.raceStarted = false;
        this.raceFinished = false;
        


        this.attachShadow({mode: "open"})
        this.render()
    }

     
    connectedCallback() {
        this.moveHorse();
      

    }
    
    
    //methods:
    render(){
        this.shadowRoot.innerHTML = `
            <style>
            div {
                position: relative;
                left: ${this.position}%;
            }
            
            </style>


            <div>This is a horse</div>
        `;
        this.finishRace();
    }

    moveHorse(){

        document.addEventListener("start-race", () => {
            this.raceStarted = true;
        })

        document.addEventListener("race-finished", () => {
            this.raceStarted = false;
        })

        document.addEventListener("keyup", (e) => {
          
          if(this.raceStarted && e.key === this.keyInput){
            this.position += 1 ;
            this.render();
          }
        })
    }
    finishRace(){
        if(!this.raceFinished && this.position > 80){
            this.raceFinished = true;
            fireEvent("race-finished", this.horsename);
           
        } else{
            return
        }
    }
}

customElements.define("race-horse", Racehorse);