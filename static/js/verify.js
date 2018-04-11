window.onload = function()
{
    var set = window.location.href;
    var id = set.split("id=")[1];
    
      var order = new Object();
           

    var ajaxRequest = new XMLHttpRequest();
		if (ajaxRequest) 
        {
            ajaxRequest.onreadystatechange = ajaxResponse;
            ajaxRequest.open("PUT","/api/user/"+id);
            ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
            ajaxRequest.send(JSON.stringify(order));
           
		}
       function ajaxResponse() 
        {
            if(ajaxRequest.readyState != 4)
            {
                console.log("its in process")

            }else if(ajaxRequest.status == 200)
            {
            alert(this.responseText);
                window.location.href = "index.html"
            }
            else
            {
                console.log("Error")
            }

  }
}