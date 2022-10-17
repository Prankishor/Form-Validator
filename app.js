const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');


//Show input error message
function showError(input, msg) {
    const formContent = input.parentElement;
    formContent.className = 'form-content error';
    const small = formContent.querySelector('small');
    small.innerText = msg;
}

//show success outline
function showSuccess(input) {
    const formContent = input.parentElement;
    formContent.className = 'form-content success';
}

//check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        //console.log(input.value);
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    });
}

//CheckLength

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
    else {
        showSuccess(input);
    }
}

//matchPassword

function matchPassword(password, repassword) {
    if (password.value !== repassword.value) {
        showError(repassword, 'Password doesn"t match');
    }
    else if (repassword.value != '') {
        showSuccess(repassword)
    }
}

//CheckMailId

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input);
    }
    else {
        showError(input, "Email is not valid");
    }
}

//Get Field Name

function getFieldName(input) {
    if (input.id === 'repassword') {
        return 'Password';
    }
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    //console.log(username.value);

    checkRequired([username, email, password, repassword]);
    checkEmail(email);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    matchPassword(password, repassword);
});
