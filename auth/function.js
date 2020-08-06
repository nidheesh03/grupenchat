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
                firebase.auth().onAuthStateChanged(
                    function(user){
                        if(user){
                            user.updateProfile(
                                {
                                    displayName:username
                                }
                            )
                            .then(
                                function(){
                                    window.location.replace("../user/reply.html");
                                }
                            )
                            .catch(
                                function(error){
                                    console.log(error);
                                }
                      )
                        }
                        else{
                            console.log("error");
                        }
                    }
                )
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
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(
        function(result){
            window.location.replace("../user/reply.html");
        }
    )
    .catch(
        function(error){
            console.log(error);
        }
    )
}
function isLoggedIn(){
    
}
