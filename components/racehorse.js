import { fireEvent } from "./eventfire.js";

export default class Racehorse extends HTMLElement{

    constructor(){
        super()
        
        //properties:

        this.horsename = this.getAttribute("name") || "this is a horse";
        this.keyInput = this.getAttribute("key");
        this.position = 0; //start position for the horses
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


            <div>${this.horsename}</div>
        `;
        // this.finishRace();
    }

    moveHorse(){

        document.addEventListener("start-race", () => {
            this.raceStarted = true; //race is active, horses can move
        })

        document.addEventListener("race-finished", () => {
            this.raceStarted = false; //race is finished horses can no longer move
        })
        

        //resets:
        document.addEventListener("reset-race", () => {
            this.position = 0; //sets the horses back to start
            this.render(); //rerender the page
            this.raceStarted = false; //race is no longer active, horses can't move
        })
       

        document.addEventListener("keyup", (e) => {
          
          if(this.raceStarted && e.key === this.keyInput){
            this.position += 1 ; //horse move with 1%
            this.render();


            //hey i have moved!
            fireEvent("horse-moved", [this.horsename , this.position]);
          }
        })
    }
   
   
   /*
    finishRace(){
        //if race is not finished and a horse has reached the finish line:
        if(!this.raceFinished && this.position > 80){
            this.raceFinished = true; // race finished, horses can no longer move
            fireEvent("race-finished", this.horsename); //fire event with the winner horse
           
        } else{
            return
        }
    }*/
}

customElements.define("race-horse", Racehorse);