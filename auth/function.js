function registerUser(event){
    console.log("hello world");
    var parent=event.target.parentNode;
    var email=parent.querySelector("#email-register").value;
    var username=parent.querySelector("#username-register").value;
    var password=parent.querySelector("#pwd-register").value;


    firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
            function(result){
                console.log(result);
                window.location.replace("file:///C:/Users/lenovo/Downloads/Nidheesh/WEB%20DEVELOPMENT/MESSENGER/reply.html");
                //.. refers to the previous directory 
            }
        )
        .catch(
            function(error){
                console.log(error);
            }
        );
}
function loginUser(event){
    console.log("hello world");
    var parent=event.target.parentNode;
    var email=parent.querySelector("#email-login").value;
    var password=parent.querySelector("#pwd-login").value;
}
function isLoggedIn(){
    
}