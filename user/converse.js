var username;
function getName(){
    firebase.auth().onAuthStateChanged(
        function(user){
            if(user){
                username=user.displayName;
            }
            //this if(user) is used to check whether the user is undefined or not 
            //and if the user is defined then change the value of username variable to the user.displayName(this is the name of the user)
        }
    )
}
function logout(){
    firebase.auth().signOut()
    //the .signOut is a specififc function provided by firebase
        .then(function(){
            window.location.replace("../auth/user.html");
        })
        .catch(
            function(error){
                console.log(error);
            }
        );
}
function postMessage(){
    var message=document.getElementById("message").value;
    var data={
        sender:username,
        content:message,
        sentAt:(new Date()).getTime()
    }
    firebase.firestore().collection("messages").add(data);
    //.firestore is a service that stores database(the place where messages are stored)
    //every key on the keyboard has a specific number that we can use to function the key
    document.getElementById("message").value="";    
}
function msgTypeHandle(event){
    console.log(event.keyCode);
    if(event.keyCode==13 && !event.shiftKey){
        postMessage();
    }
}
function getChatDom(data){
    var offset=0;
    if(data["sender"]==username){
        offset=2;
    }
    var element=document.createElement("div");
    element.classList=["row"];
        element.innerHTML=`<div class = "col-sm-10 col-sm-offset-${offset} message-box">
        <p class = "sender"><b>${data["sender"]}</b></p>
        <p class = "message">${data["content"]}</p>
    </div>`;
    return element;
}
//! refers to not.This means that the condition will not be true.
function loadMessages(){
    getName();
    //this has been used only to change the username variable
    //this is the way to give another function in a function
    var chat=document.getElementById("chat-box");
    firebase.firestore().collection("messages").orderBy("sentAt")
        .onSnapshot(
            //snapshot consists of all the changes in the database.
            //first time when we get the snapshot it contains all the messages in the database.
            //when there is a new change the snapshot does not send all the changes but only send the latest change
            function(snapShot){
                snapShot.docChanges().forEach(
                    function(change){
                        console.log(change);
                        var element=getChatDom(change.doc.data());
                        chat.appendChild(element);
                    }
                )
            }
        )
}