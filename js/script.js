var array = [];
function init() {
    ajaxCall();
    $(".loginCred").on("click", loginValidate);
}

function ajaxCall() {
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        context: this,
        url: "data/data.json",
        success: function (result) {
        },
        error: function (jqXHR, exception) {
            var err_msg = handleException(jqXHR, exception);
            console.log(err_msg);
        },
    }).done(function (result) {
        createDomStructure(result);
    });
}

function handleException(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    return msg;
}

function createDomStructure(valid) {//getting data from json
    var key;
    for (key in valid) {
        array = valid[key];
    }
}

function loginValidate() {
    var x = document.getElementById("username").value;
    var y = document.getElementById("passwords").value;
    for (index in array) {
        aResult = array[index];
        userid = aResult.username;
        passid = aResult.password;
    if ((x == "") && (y == "")) {
        document.getElementById("message1").innerHTML = "Please enter Username & password";
        return false;
    }
    if (y.length < 5) {
        document.getElementById("message2").innerHTML = "Password should be greater than 5 characters";
        return false;
    }
    if (y.length > 20) {
        document.getElementById("message2").innerHTML = "Password should be less than 20 characters";
        return false;
    }
    if (x != userid) {
        document.getElementById("message1").innerHTML = "Invalid Username";
    }
    if (y != passid) {
        document.getElementById("message2").innerHTML = "Invalid Password";
    }
    if ((x == userid) && (y == passid)) {
        alert("You have successfully login");
        $('.container').css('display','block');
        $('.login').css('display','none');
        return false;
    }
}
return false;
}

(function ($) {
    $.fn.showResult = function () {
        init();
    };
})($);
$.fn.showResult();