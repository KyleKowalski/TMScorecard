$(document).ready(function() {

    let game = {
        currentPlayer: 1,
        user1: "user1",
        user2: "user2",
        user3: "user3",
        user4: "user4",
        user5: "user5",
    }

    $('input[name="playerRadioButton"]').change(function(){
        game.currentPlayer = this.value
    });


    $(".clicky").click(function(){
        let myTarget="#"+$(this).attr("myTargetValue")+game.currentPlayer;
        let myValue =$(myTarget).text();
        if ($(this).attr("math") === "plus") {
            myValue++
        }
        else {
            myValue--
        }
        $(myTarget).text(myValue);
        // TODO some sort of logging here
    });

    $(".clickyTotal").click(function(){
        // TODO add some collars to the values
        // TODO alter the targets to the appropriate value (x2 multipliers etc)
        let myTarget="#"+$(this).attr("myTargetValue");
        let myValue =$(myTarget).text();

        let playerTrTarget = "#trTotal"+game.currentPlayer;
        let playerValue = $(playerTrTarget).text();

        if ($(this).attr("math") === "plus") {
            myValue++
            playerValue++
        }
        else {
            myValue--
            playerValue--
        }
        $(myTarget).text(myValue);
        $(playerTrTarget).text(playerValue);
        // TODO some sort of logging here
    });

}) // End document.ready