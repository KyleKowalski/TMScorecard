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

}) // End document.ready