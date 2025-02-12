
// short component to fire events that are in the parameter
export function fireEvent(myEvent, payload){
    const event = new CustomEvent(myEvent, { detail: payload});

    document.addEventListener(myEvent, (e) => {
        console.log(`Event '${e.type}' fired with payload: ${e.detail}`);
    })

   document.dispatchEvent(event)


 }
 
