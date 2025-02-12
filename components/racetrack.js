import { fireEvent } from "./eventfire.js";

export default class RaceTrack extends HTMLElement{

    constructor(){
        super();


        
        this.attachShadow({ mode: "open" });
        this.render();

    }

    render(){
        this.shadowRoot.innerHTML = `
        
            <h2>The race track:</h2>   
            <slot></slot>     
        
        `;
    }





}

customElements.define("race-track", RaceTrack);