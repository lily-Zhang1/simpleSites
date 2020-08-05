$("#btn_login").on("click", function() {
    post();
});

function post(){
    var formData=new FormData(document.getElementById('form'))
    myAjax({
        url:'/login.html',
        method:'POST',
        success:function(text){
            document.getElementById('msg').innerText=text;
        },
        formData:formData
    })
}

var request=null;

function myAjax(json){
    var url=json.url;
    var method=json.method;
    var success=json.success;
    var formData=json.formData;
    loadXMLDoc(method,url,formData, function()
    {
        if(request!=null) {
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var text = request.responseText;
                    userlog = true;
                    init();
                    success(text);
                } else {
                }
            };
        }
    });
}

function loadXMLDoc(method,url,formData,cfunc) {
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        request=new XMLHttpRequest();
    }
    else {
        try{
            // IE6, IE5
            request=new ActiveObject('Microsoft.XMLHTTP');
        } catch(faild){
            alert('Error:Ajax request faild');
        }
    }
    request.onreadystatechange=cfunc;
    request.open(method,url,true);
    request.send(formData);
}

$(document).ready(function(){
    init();
});

var userlog = false;

function init(){
    const register = document.getElementById("register");
    const login = document.getElementById("login");
    const user = document.getElementById("user");
    const exit = document.getElementById("exit");
    const message = document.getElementById("msg");
    if(userlog==false){
        register.style.display='block';
        login.style.display='block';
        message.style.display='none';
        exit.style.display='none';
        user.style.display='none';
    } else{
        register.style.display='none';
        login.style.display='none';
        message.style.display='block';
        exit.style.display='block';
        user.style.display='block';
    }
}

