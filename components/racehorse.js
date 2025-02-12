import { fireEvent } from "./eventfire.js";

export default class Racehorse extends HTMLElement{

    constructor(){
        super()


        this.attachShadow({mode: "open"})
        this.render()
    }


    render(){
        this.shadowRoot.innerHTML = `
            <p>This is a horse</p>
        `;
    }
}

customElements.define("race-horse", Racehorse);