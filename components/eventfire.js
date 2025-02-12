
// short component to fire events that are in the parameter
export function fireEvent(myEvent){
    const event = new Event(myEvent)

    document.addEventListener(myEvent, (e) => {
        console.log(`Event '${myEvent}' fired`);
    })

   document.dispatchEvent(event)


 }
 
