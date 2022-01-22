let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log("state Changed Called. Ready State:  " +
            xhr.readyState + " Status: " + xhr.status + " Time: " + showTime());
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
}
const getURL = "http://127.0.0.1:3000/employees/1";

function getUserDetails(data) {
    console.log("Get User data " + data);
}
makeAJAXCall("GET", getURL, getUserDetails);

const deleteURL = "http://127.0.0.1:3000/employees/4"

function userDeleted(data) {
    console.log("User Deleted " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://127.0.0.1:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };

function userAdded(data) {
    console.log("User Added: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, empData);