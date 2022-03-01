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