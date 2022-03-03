function read_display_quote() {
    //console.log("inside the function")

    //get into the right collection
    db.collection("quotes").doc("tuesday")
    .onSnapshot(function(tuesdayDoc) {
        //console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;
    })
}
read_display_quote();

function insertName() {
    //to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            console.log(user.uid); //let me know who is user that logged in to get the UID
            currentUser = db.collection("user").doc(user.uid); //will go to the firestore and to the document of the user
            currentUser.get().then(userDoc =>{
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                //$("#name-goes-here").text(user_Name);
                document.getElementById("name-goes-here").innerText = user_Name;
            })
        }
    })
}
insertName();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"IC01",
        name: "Inca Trail",   
        country: "Peru",
        level: "hard",
        length: "42 km",
        details: "The trail follows the route the ancient Incas took over 650 years ago, and much of the original stonework is still in place."
    });
    hikesRef.add({
        code:"SG01",
        name: "Samaria Gorge Trail",   
        country: "Greece",
        level: "moderate",
        length: "16 km",
        details: "Starting in pine forests, this one-way hike descends through a narrow valley, eventually ending at the Libyan Sea."
    });
    hikesRef.add({
        code:"WC01",
        name: "West Coast Trail",  
        country: "Canada",
        level: "very hard",
        length: "72 km",
        details: "Located along Vancouver Island's wild Pacific Coast, the West Coast Trail is one of the most spectacular maritime hikes in Canada."
    });
}

// writeHikes(); 


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/hike" + i + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");