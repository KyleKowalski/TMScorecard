$(document).ready(function() {

    $("#trTotalPlus1").click(function(){
        let totalTR = $("#trTotal1").text();
        totalTR++
        $("#trTotal1").text(totalTR);
    });

    $("#trTotalMinus1").click(function(){
        let totalTR = $("#trTotal1").text();
        totalTR--
        $("#trTotal1").text(totalTR);
    });

    $(".clicky").click(function(){
        console.log(this);
        let myTarget="#"+$(this).attr("myTargetValue")+$(this).attr("myTargetId");
        console.log(myTarget);
        let myValue =$(myTarget).text();
        console.log(`Current value: ${myValue}`);
        if ($(this).attr("math") === "plus") {
            myValue++
        }
        else {
            myValue--
        }
        $(myTarget).text(myValue);
        // TODO some sort of logging here
    })

}) // End document.ready