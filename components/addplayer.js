export default class Addplayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    margin-top: 30px;
                }
               
                button {
                    color: white;
                    background-color: green;
                    margin-left: 20px;
                }
                #keyInput {
                    width: 30px;
                }
            
            </style>

            <form id="playerForm">
                <label> Player Name:
                    <input type="text" id="playername" name="playername" required>
                </label>
                <label> Key for movement:
                    <input type="text" maxlength="1" id="keyInput" name="key" required>
                </label>
                <label> Choose your emoji:
                    <select id="animal" required>
                        <option value="🐪">🐪</option>
                        <option value="🐄">🐄</option>
                        <option value="🐖">🐖</option>
                        <option value="🦍">🦍</option>
                        <option value="🐓">🐓</option>
                    </select>
                </label>
                <button type="submit">Add Player</button>
            </form>
        `;

        
        this.shadowRoot.querySelector("#playerForm").addEventListener("submit", (e) => this.addPlayer(e)); //eventlistener for when form is submitted
    }

    addPlayer(e) {
        e.preventDefault();
        //values input in form:
        const playerName = this.shadowRoot.querySelector('#playername').value; 
        const key = this.shadowRoot.querySelector('#keyInput').value;
        const playerIcon = this.shadowRoot.querySelector('#animal').value;

     
        //creating the element and setting attributes
        const player = document.createElement("race-horse");
        player.setAttribute("name", playerName);
        player.setAttribute("key", key);
        player.setAttribute("symbol", playerIcon);

        document.querySelector("race-track").appendChild(player);
    }
}

customElements.define("create-player", Addplayer);
