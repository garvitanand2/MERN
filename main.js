function myFunctionReset() {
    alert("Do you want to reset the form");
    var len = document.getElementById("login").length;
    for (var i = 0; i < len; i++) {
        document.getElementById("login").elements[i].value = "";
    }
    var ele = document.getElementsByName("gender");
    for(var i=0;i<ele.length;i++)
       ele[i].checked = false;

}

function openCity(evt, cityName) {
    document.getElementById('addContact').style.display = "none";
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    display();
}




function display() {
    $("#list").find($("tr")).slice(1).remove();
    local_data = localStorage.getItem('key');
    local_data = JSON.parse(local_data);
    console.log(local_data);
    for (let i = local_data.length - 1; i >= 0; i--) {
        var x = document.getElementById('list').insertRow(1);
        x.id = i;
        var c1 = x.insertCell(0);
        var c2 = x.insertCell(1);
        var c3 = x.insertCell(2);
        var c4 = x.insertCell(3);
        var c5 = x.insertCell(4);
        var c6 = x.insertCell(5);
        var c7 = x.insertCell(6);
        var c8 = x.insertCell(7);
        var c9 = x.insertCell(8);
        var c10 = x.insertCell(9);
        c1.innerHTML = i+1;
        c2.innerHTML = local_data[i].firstname;
        c3.innerHTML = local_data[i].lastname;
        c4.innerHTML = local_data[i].email;
        c5.innerHTML = local_data[i].password;
        c6.innerHTML = local_data[i].mobile;
        c7.innerHTML = local_data[i].sufferingFrom;
        c8.innerHTML = local_data[i].gender;
        c9.innerHTML = " <button class='btn btn-primary' name='edit' onclick='edit( this.parentNode.parentNode.rowIndex)' type='button' '>Edit</button>";
        c10.innerHTML = "<button class='btn btn-danger' name='delete'   onclick='delete_data(this.parentNode.parentNode.rowIndex)'  type='button' '>Delete</button>";
    }
}




// Delete using javaSscript
function delete_data(o) {
    var indexRow = o;
    var delrow = indexRow - 1;
    local_data = localStorage.getItem('key');
    local_data = JSON.parse(local_data);
    local_data.splice(delrow, 1);
    localStorage.clear();
    localStorage.setItem('key', JSON.stringify(local_data));
    display();
} 




// Edit using JavaScript
function edit(o) {
            var indexRow = o;
            var editrow = indexRow - 1;
            local_data = localStorage.getItem('key');
            local_data = JSON.parse(local_data);
            let firstname     = local_data[editrow].firstname;
            let lastname      = local_data[editrow].lastname;
            let email         = local_data[editrow].email; 
            let password      = local_data[editrow].password;
           // let gender        = local_data[editrow].gender;
            let sufferingFrom = local_data[editrow].sufferingFrom;   
            let mobile        = local_data[editrow].mobile; 
            document.getElementById('Paris').style.display = "none";
            document.getElementById('addContact').style.display = "block";
            document.getElementById("fname").value = firstname;
            document.getElementById("lname").value = lastname;
            document.getElementById("email").value = email;
            document.getElementById("password").value = password;
            document.getElementById("mob").value = mobile;
            document.getElementById("fever").value = sufferingFrom;
            document.getElementById('mob').readOnly = true;
}




function Submit() {

    let temp = document.getElementById("mob").value;
    local_data = localStorage.getItem('key');
    local_data = JSON.parse(local_data);
    let j = 0; let check = 0;
    let read = document.getElementById('mob').readOnly

    // Edit only condition 
    for (var i = 0; i < local_data.length; i++) {
        if (temp == local_data[i].mobile && read == true) {
            j = i;
            // Getting the data from the form and storing it on local storage except gender 
            let firstname = document.getElementById('fname').value;
            let lastname = document.getElementById('lname').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let sufferingFrom = document.getElementById('fever').value;
            var gen = document.querySelector('input[name="gender"]:checked').value;
            console.log(gen);
            console.log("Edit data");
            // Setting up the object values of the object 
            local_data[j].firstname = firstname;
            local_data[j].lastname = lastname;
            local_data[j].email = email;
            local_data[j].password = password;
            local_data[j].sufferingFrom = sufferingFrom;
            local_data[j].gender = gen;
            localStorage.setItem('key', JSON.stringify(local_data));
            check = 1;
            alert("Details Updated");
        }
    }

    let add = 0;
    if (read == false) {

        for (var i = 0; i < local_data.length; i++) {
            if (temp == local_data[i].mobile) {
                add = add + 1;
                alert("User is already registered");
            
            }
        }
    }// End of if condn for read check
    if (add == 0 && read == false) {
        var len = document.getElementById("login").length;
        var login_data = {};
        for (var i = 0; i < len; i++) {
            const key = document.getElementById("login").elements[i].name;
            const value = document.getElementById("login").elements[i].value;
            if (['submit', 'reset'].indexOf(key) === -1) {
                if (key == "gender") {
                    var gen = document.querySelector('input[name="gender"]:checked').value;
                    login_data['gender'] = gen;
                }
                else {
                    login_data[key] = value;
                }
            }
        }
        local_data = JSON.parse(localStorage.getItem('key')) || [];
        local_data.push(login_data);
        localStorage.setItem('key', JSON.stringify(local_data));
        openCity(event, 'Paris');
    }

    // Default edit
// console.log("Hi");
//     var len = document.getElementById("login").length;
//     var login_data = {};
//     console.log(login_data);
//     for (var i = 0; i < len; i++) {
//         const key = document.getElementById("login").elements[i].name;
//         const value = document.getElementById("login").elements[i].value;
//         if (['submit', 'reset'].indexOf(key) === -1) {
//             if (key == "gender") {
//                 var gen = document.querySelector('input[name="gender"]:checked').value;
//                 login_data['gender'] = gen;
//             }
//             else {
//                 login_data[key] = value;
//             }
//         }
//     }
//     local_data = JSON.parse(localStorage.getItem('key')) || [];
//     local_data.push(login_data);
//     localStorage.setItem('key', JSON.stringify(local_data));
//     openCity(event, 'Paris');
//     //Default edit end


    // End of main        
} 

