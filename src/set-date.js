function displayDate(value){
    let options = {
        weekday: "short",
        month: "short",
        day: "numeric"
    }

    document.querySelector("#date").innerHTML = value.toLocaleDateString("en-US", options);
    document.querySelector("#local-time").innerHTML = value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setInterval(() =>{
        let now = new Date();
        displayDate(now);
    }, 10000);
}

let today = new Date();
displayDate(today);

