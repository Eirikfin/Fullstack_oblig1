import { fireEvent } from "./eventfire.js";

export default class Racehorse extends HTMLElement{

    constructor(){
        super()
        
        //properties:

        this.horsename = this.getAttribute("name");
        this.keyInput = this.getAttribute("key");
        this.position = 0;
        this.raceStarted = false;


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

        document.addEventListener("keyup", (e) => {
          
          if(this.raceStarted && e.key === this.keyInput){
            this.position += 1 ;
            this.render();
          }
        })
    }
    finishRace(){
        if(this.position > 80){
            return fireEvent("race-finished")
        } else{
            return
        }
    }
}

customElements.define("race-horse", Racehorse);