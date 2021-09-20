var compile=document.getElementById("compile");

var textarea2=document.getElementById("textarea2");

var request=new XMLHttpRequest();
var request2=new XMLHttpRequest();
compile.addEventListener("click",function()
{
    var textarea1=document.getElementById("textarea1").value;
    var select=document.getElementById("select").value;
var obj={
    code:textarea1.text,
    langId:select.value
}
request.open("post","https://codequotient.com/api/executeCode");
request.setRequestHeader("Content-Type","application/json");

request.send(JSON.stringify(obj));

request.addEventListener("load",function(e)
{
    var data=JSON.parse(e.target.responseText);
    if(data.error)
    {
       textarea2.innerText="code is null";

    }
    else
    {
        setTimeout(function()
        {
            request2.open("get","https://codequotient.com/api/codeResult/"+data.codeId);
            request2.send();
            request2.addEventListener("load",function(e)
            {
                var final_op=JSON.parse(e.target.responseText);
                if(final_op.data!=null)
                {
                    var ans=JSON.parse(final_op.data);
                    if(ans.output!="")
                    {
                        textarea2.innerText=ans.output;
                    }
                    else if(ans.errors!="")
                    {
                        textarea2.innerText=ans.errors;
                    }

                }
            })


        },4000);
    
      
    }

})
})