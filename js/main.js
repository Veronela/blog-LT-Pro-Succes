const firebaseConfig = {
    apiKey: "AIzaSyCk1YD-hwJnyKBFbOzLFgid2DNVWy5AaiE",
    authDomain: "liceul-pro-succes.firebaseapp.com",
    projectId: "liceul-pro-succes",
    storageBucket: "liceul-pro-succes.appspot.com",
    messagingSenderId: "487649734640",
    appId: "1:487649734640:web:d0383882e8890ad704b735",
    measurementId: "G-MCS2SHDRFK"
  };




function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}


const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');


let user = null; 
let admins=["bieDfO0C5NSl79LoqKylZvDYsoo2"]

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

const db=firebase.firestore();

const postaridb=db.collection("postari");

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick=function(){
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() {window.location.reload(); });
}
logoutBtn.onclick=function() {
    auth.signOut();
    window.location.reload();
}
function isAdmin(){
    let admin;
    if (user==null)
    return false;

    admin=admins.includes(user.uid); //true or false
    return admin;
}
function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;


    let result = day + "-" + month + "-" + year;

    return result; 

}

auth.onAuthStateChanged(function(fuser) {
    user=fuser;
    console.log(user);
    if(user !== null) {
        //logat in sistem
        logoutBtn.style.display="block";
        loginBtn.style.display="none";

        salutare.innerHTML = "Salutare, " +  user.displayName;


        if (isAdmin()==true){
            postareBtn.style.display="block";
            
        }
        else{
            postareBtn.style.display="none";

        }

    }
    else{
        //nu este logat in sistem
        logoutBtn.style.display="none";
        loginBtn.style.display="block";
        postareBtn.style.display="none";
    }
    document.querySelector("body").style.display="block";
    

})



if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}