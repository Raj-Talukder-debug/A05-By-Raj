document.getElementById("login-btn").addEventListener('click', ()=> {

    // 1 get the user name
    const inputUserName = document.getElementById("input-userName");
    const userName = inputUserName.value;
    
    const inputPassword  = document.getElementById("input-password");
    const password = inputPassword.value;
    
    if(userName == "admin" && password == "admin123"){
        alert("Sign in successful");

        window.location.assign("./home.html");
    }
    else{
        alert("Invalid Information");
        return;
    }


});