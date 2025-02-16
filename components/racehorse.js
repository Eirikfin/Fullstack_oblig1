import { fireEvent } from "./eventfire.js";

export default class Racehorse extends HTMLElement{

    constructor(){
        super()
        
        //properties:
        this.horsename = this.getAttribute("name") || "this is a horse";
        this.keyInput = this.getAttribute("key");
        this.horseSymbol = this.getAttribute("symbol") || "🦖";
        this.position = 0; //start position for the horses
        this.raceStarted = false;
        this.raceFinished = false;
      
        


        this.attachShadow({mode: "open"})
        this.render()
    }

     
    connectedCallback() {
     
        this.horsename = this.getAttribute("name") || "this is a horse";
        this.keyInput = this.getAttribute("key");
        this.horseSymbol = this.getAttribute("symbol") || "🦖";


        this.moveHorse();
        this.render()

    }
    
    
    //methods:
    render(){
        this.shadowRoot.innerHTML = `
            <style>
            
            .container{
                border: solid white 5px;
            }

            div {
                position: relative;
                left: ${this.position}%;
                margin-left: 10px;
            }
            span {
                font-size: 2.2rem;
            }
            
            p {
                font-size: 1.2rem;
                font-weight: bold;
            }
            </style>

            <article class="container">
            <div><p><span>${this.horseSymbol}</span> <-- ${this.horsename} </p>
           
                <p>press "${this.keyInput}" to move </p>
            </div></article>
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
            this.position += 1 ; //horse move right with 1%
            this.render();


            //hey i have moved!
            fireEvent("horse-moved", [this.horsename , this.position]);
          }
        })
    }
}

customElements.define("race-horse", Racehorse);