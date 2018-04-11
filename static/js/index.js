var email = "";
window.onload = function() {
  // CloseInput();
  
     $('#afterlogin').hide();
    
    
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) {
   ajaxRequest.onreadystatechange = ajaxResponse;
   ajaxRequest.open("GET", "api/user/"); // Where?
   ajaxRequest.send(null);
    }

    function ajaxResponse() {
        if(ajaxRequest.readyState != 4) {
              console.log("its in process");
        }
        else if(ajaxRequest.status == 200){
            create(ajaxRequest.response);
            }
        
        else{
            alert("Its in Error");
        }
    }
}
/*
function addrecord(){
    alert(email);
    var add = new Object();
    add.email = document.getElementById('i_email').value;
    add.invitator = document.getElementById('i_user').value;
 
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("POST", "/api/user/");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.send(JSON.stringify(add));  
    }
    function ajaxResponse() {
        if(ajaxRequest.readyState != 4)
        {
            console.log("its in process")

        }else if(ajaxRequest.status == 200){
            alert(this.responseText);
            onload(); 
        }
        else{
            console.log("Error")
        } 
        
  }
}
*/

function create(obj){
    var data = JSON.parse(obj);
    var form = "";
    for(i=0; i<data.length; i++){
       
        form += '<tr><td>' +data[i].name+ '</td><td>' +data[i].city+ '</td><td>' +data[i].phone+ '</td><td>' +data[i].email+ '</td><td><button class="btn btn-info" onclick="updateRecord(\'' +data[i]._id + '\')">edit</button>&nbsp&nbsp<button class="btn btn-warning" onclick="requestDelete(\'' +data[i]._id + '\')"> delete</button></td></tr>';
        
    }
    document.getElementById('empTable').innerHTML = form;
}


function requestDelete(id){
   alert(id);
   var choice =  confirm("Are you sure, you want to delete this record")
   if (choice == true) 
   {
       deleterecord(id);
        //document.getElementById("loading").style.display = "block";

   }  			
}
function reload(){
    window.location.reload();
}
function deleterecord(id){
     var ajaxRequest = new XMLHttpRequest();
 if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("DELETE", "/api/user/"+id);
        ajaxRequest.send(null);
    }
    function ajaxResponse() {//This gets called when the readyState changes.
        if(ajaxRequest.readyState != 4){
            console.log("its in process")
        }
        else if(ajaxRequest.status == 200){
            alert(this.responseText);
            onload();
            reload();/*===Record delted complete load the data again*/
        }
        else{
            console.log("Error")
        }
  }
}
function login(){
    var obj = new Object();
   
    obj.pwd = document.getElementById('l_pwd').value;
    obj.email =document.getElementById('l_email').value;
    var getemail = obj.email;
   
    var ajaxRequest = new XMLHttpRequest();
 if (ajaxRequest) {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("POST", "/api/user/login");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.send(JSON.stringify(obj));
 }
    function ajaxResponse() {//This gets called when the readyState changes.
        if(ajaxRequest.readyState != 4){
            console.log("its in process")
        }else if(ajaxRequest.status == 200){
            email = getemail;
            //alert(email);
            //alert(this.response);
            afterLogin(ajaxRequest.response);
            
        }
        else{
            console.log("Error");
        }
  }
}
function afterLogin(obj){
    var data = JSON.parse(obj);
    if(data.status){
        //alert("hello");
        $('#afterlogin').show();
        $('#login').hide();
        
    }
    else{
        alert("null");
    }
    
    
}
function afterInvite(obj,eml){
    var data = JSON.parse(obj);
    if(data.flag){
        if(confirm(data.message)){
            resend(eml);
     }
        
    else{
        alert(data.message);    
    }
}
}
function resend(eml){
    alert(eml);
    var add = new Object();
    add.email = eml;
   
    
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("POST", "/api/invite/resend");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.send(JSON.stringify(add));  
    }
    function ajaxResponse() {
        if(ajaxRequest.readyState != 4)
        {
            console.log("its in process")

        }else if(ajaxRequest.status == 200){
            alert(this.responseText);
           //alert(ajaxRequest.response);
           // onload(); 
        }
        else{
            console.log("Error")
        } 
        
  }
}

/*function updateRecord(id){
   alert("hello");
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) {
    ajaxRequest.onreadystatechange = ajaxResponse;
    ajaxRequest.open("GET", "api/user/"+id); // Where?
    ajaxRequest.send(null);
    }

    function ajaxResponse() {
        if(ajaxRequest.readyState != 4) {
              console.log("its in process")
        }
        else if(ajaxRequest.status == 200){
            createForm(ajaxRequest.response,id);
            }
        
        else{
            alert("Its in Error");
        }
    }
}*/

function addinvite(){
    alert(email);
    var add = new Object();
    add.email = document.getElementById('i_email').value;
    add.type = document.getElementById('i_invitator').value;
    add.aemail = email;
    //var aemail = email;
    var toemail = add.email
    //alert(aemail);
    
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("POST", "/api/invite/");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.send(JSON.stringify(add));  
    }
    function ajaxResponse() {
        if(ajaxRequest.readyState != 4)
        {
            console.log("its in process")

        }else if(ajaxRequest.status == 200){
            //alert(this.responseText);
            afterInvite(ajaxRequest.response,toemail);
           // onload(); 
        }
        else{
            console.log("Error")
        } 
        
  }
}


function user(){
   
    $('#chat').hide();
    $('#user').show();
    $('#invite').hide();
}

function invites(){
  
    $('#chat').hide();
    $('#user').hide();
    $('#invite').show();
}
                        
  

function createForm(obj,id)
{
    var data = JSON.parse(obj); 
    alert(data.name);
    var formString ="";
    $("#editor").show();
    $("#wrapper").hide();
    document.getElementById('name').value=data.name;
    document.getElementById('code').value=data.pwd;
    document.getElementById('phone').value=data.phone;
    document.getElementById('email').value=data.email;
    formString += '<button type="submit" name="submit" class="form-btn semibold" onclick="window.location.reload(); updateRec(' + id + ');">Update</button>'; 
    //alert(formString);
    document.getElementById('kkkk').innerHTML = formString;
    
}
function updateRec(id){
    var order = new Object();
    order.name = document.getElementById('name').value;
    order.pwd = document.getElementById('city').value;
    order.phone =document.getElementById('phone').value;
    order.email =document.getElementById('email').value;
    //alert(JSON.stringify(order))
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("PUT","/api/user/"+id);
        ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
        ajaxRequest.send(JSON.stringify(order));       
    }
    function ajaxResponse(){
        if(ajaxRequest.readyState != 4){
            console.log("its in process")
        }
        else if(ajaxRequest.status == 200) {
             alert(this.responseText);
            onload(); 
        }
        else{
            console.log("Error")
        }
  }
}

function saverecord(){
    //alert("hello");
    var add = new Object();
    add.name = document.getElementById('add_name').value;
    add.pwd = document.getElementById('add_code').value;
    add.email = document.getElementById('add_email').value;
    add.phone = document.getElementById('add_phone').value;
 
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("POST", "/api/user/");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.send(JSON.stringify(add));  
    }
    function ajaxResponse() {
        if(ajaxRequest.readyState != 4)
        {
            console.log("its in process")

        }else if(ajaxRequest.status == 200){
            alert(this.responseText);
            onload(); 
        }
        else{
            console.log("Error")
        } 
        
  }
}