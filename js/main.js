let signUpName = document.getElementById('signUpName');
let signUpUserName = document.getElementById('signUpUserName');
let signUpPassword = document.getElementById('signUpPassword');
let existEmail= document.getElementById('existEmail');
let signUpsuccess= document.getElementById('signUpsuccess');
let fullData= document.getElementById('fullData');
let loginUserName = document.getElementById('loginUserName');
let loginPassword= document.getElementById('loginPassword');
let userWelcome= document.getElementById('userWelcome');
let incorrectData= document.getElementById('incorrectData');
let emptyInput= document.getElementById('emptyInput');
let logOut= document.getElementById('logOut');
var indexName=-1;
let allAccounts=[];
if (localStorage.getItem('accounts')==null) {
    allAccounts =[];
}
else{
    allAccounts= JSON.parse(localStorage.getItem('accounts'));   
}
function checkValidate() {
    var regex = /^[a-zA-Z][a-zA-Z0-9]{1,}(@)[a-z]/;
    if(regex.test(signUpUserName.value)){
        return true;
    }
    else{
        return false;
    }
}
function signUp() {
    if(checkValidate()&&signUpName.value!=''&&signUpPassword.value!=''){
        let account ={
            name  : signUpName.value,
            email : signUpUserName.value,
            password : signUpPassword.value
        };  
       if (allAccounts.length!=0){
            let exist= false;
            for(let i =0 ;i<allAccounts.length;i++){//loop in all account to check if exist
                if(allAccounts[i].email==account.email){ 
                    exist =true;
                    break;
                }
                else{
                    exist=false;
                }
            }
            if(exist){
                existEmail.classList.remove('d-none');
                signUpsuccess.classList.add('d-none');
                fullData.classList.add('d-none');

            }
            else{
                fullData.classList.add('d-none');
                existEmail.classList.add('d-none');
                signUpsuccess.classList.remove('d-none')
                allAccounts.push(account);
                localStorage.setItem('accounts', JSON.stringify(allAccounts));
                clearSignUp();
            }
       }
       else{
        allAccounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(allAccounts));
        clearSignUp();
        signUpsuccess.classList.remove('d-none')
        fullData.classList.add('d-none');
       }
    }
    else{
        fullData.classList.remove('d-none');
        existEmail.classList.add('d-none');
        signUpsuccess.classList.add('d-none')


    }
}
function clearSignUp() {
    signUpPassword.value='';
    signUpName.value='';
    signUpUserName.value='';
}
function login() {
    if(loginUserName.value!=''&&loginPassword.value!=''){
        emptyInput.classList.add('d-none')

        for (let i =0 ; i<allAccounts.length;i++){
            
            if(loginUserName.value==allAccounts[i].email&&loginPassword.value==allAccounts[i].password){
                incorrectData.classList.add('d-none');
                localStorage.setItem('indexOfName', JSON.stringify(i));
                window.location.href= 'home.html'
                break;
            }
            else{
                incorrectData.classList.remove('d-none');
            }

        }
    }
    else{
        emptyInput.classList.remove('d-none');
        incorrectData.classList.add('d-none');
    }
}

if (logOut) {
    console.log(indexName)
    userWelcome.innerHTML=`Welcome ${allAccounts[JSON.parse(localStorage.getItem('indexOfName'))].name}`
}
