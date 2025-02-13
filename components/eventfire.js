
// short component to fire events that are in the parameter
export function fireEvent(myEvent, payload){
    const event = new CustomEvent(myEvent, { detail: payload});

   document.dispatchEvent(event)


 }
 
