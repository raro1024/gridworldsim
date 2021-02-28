$(document).ready(function(){
    $("#addit").on("click",addit)
    $("#render").on("click",render)

})
var i =1;
function addit ()
{
    newit(i);
    $("#its").text("Its= "+i)
    i+=1;

}
function render()
{
init($("#width_grid").val(),$("#height_grid").val());
}