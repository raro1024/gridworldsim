$(document).ready(function(){
    $("#addit").on("click",addit)

})
var i =1;
function addit ()
{
    newit(i);
    $("#its").text("Its= "+i)
    i+=1;

}