$().ready(function() {
    $("#signupForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            agree: "required"
        },
        messages: {
            username: {
                required: "please enter your username",
                minlength: "Username consists of at least 4 letters"
            },
            email: "Please enter a correct email address",
            password: {
                required: "Please enter the password",
                minlength: "Password length cannot be less than 5 letters"
            },
            confirm_password: {
                required: "Please enter the password",
                minlength: "Password length cannot be less than 5 letters",
                equalTo: "Two password input is inconsistent"
            },
            agree: "Please accept our statement",
        }
    })
});