$(document).ready(function() {
    // TODO list
    // 4 Logging (click to view log?)
    // 5. CSS - more like the colors of the board


    // This will propt if the user tries to close/refresh the screen (since the entire app is not databased and just memory based)
    window.onbeforeunload = function() {
        return true;
    };

    let game = {
        roundNumber: 1,
        currentPlayer: 1,
        startingPlayer: 1,
        // activePlayers: 2,
        player1: "Player1",
        player2: "Player2",
        player3: "Player3",
        player4: "Player4",
        player5: "Player5",
    }

    $('#setupGameModal').modal('show');

    function setupGame() {
        // resetGame();
        getAndSetPlayerNames();
        hideInactivePlayers();
        setStartingPlayer();
        $('#setupGameModal').modal('hide');
    }

    function resetGame() {
        game.roundNumber = 1;
        game.currentPlayer = 1;
        game.startingPlayer = 1;
        game.activePlayers = 2;
        game.player1 = "Player1";
        game.player2 = "Player2";
        game.player3 = "Player3";
        game.player4 = "Player4";
        game.player5 = "Player5";
    }

    function getAndSetPlayerNames() {
        let player1Name = $('#player1Name').val();
        let player2Name = $('#player2Name').val();
        let player3Name = $('#player3Name').val();
        let player4Name = $('#player4Name').val();
        let player5Name = $('#player5Name').val();
        if (player1Name != '') {
            game.player1 = player1Name;
        }
        if (player2Name != '') {
            game.player2 = player2Name;
        }
        if (player3Name != '') {
            game.player3 = player3Name;
        }
        if (player4Name != '') {
            game.player4 = player4Name;
        }
        if (player5Name != '') {
            game.player5 = player5Name;
        }
        $('#player1Label').text(game.player1);
        $('#player2Label').text(game.player2);
        $('#player3Label').text(game.player3);
        $('#player4Label').text(game.player4);
        $('#player5Label').text(game.player5);
    }

    $('input[name="playerRadioButton"]').change(function(){
        game.currentPlayer = this.value
        updateCurrentPlayer();
    });

    $('input[name="choosePlayersRadioButton"]').change(function(){
        game.activePlayers = this.value;
        showPlayerNameInput();
    });

    function showPlayerNameInput() {
        for (let i = 1; i <= 5; i ++) {
            if (i <= game.activePlayers) {
                $('#player'+i+'Div').attr("hidden", false);
            }
            else {
                $('#player'+i+'Div').attr("hidden", true);
            }
        }
    }
    
    function updateCurrentPlayer() {
        $('.player1').removeClass('currentPlayer');
        $('.player2').removeClass('currentPlayer');
        $('.player3').removeClass('currentPlayer');
        $('.player4').removeClass('currentPlayer');
        $('.player5').removeClass('currentPlayer');

        $('.player'+[game.currentPlayer]).addClass('currentPlayer');
    }

    function hideInactivePlayers() {
        for (let i = 1; i <=5; i++) {
            if (i > game.activePlayers) {
                $('.player'+i).attr("hidden", true)
            }
        }
    }

    function setStartingPlayer() {
        $('#player1Id').removeClass('startingPlayer');
        $('#player2Id').removeClass('startingPlayer');
        $('#player3Id').removeClass('startingPlayer');
        $('#player4Id').removeClass('startingPlayer');
        $('#player5Id').removeClass('startingPlayer');

        $('#player'+[game.startingPlayer]+'Id').addClass('startingPlayer');

        $('#startingPlayer1').attr('hidden', true);
        $('#startingPlayer2').attr('hidden', true);
        $('#startingPlayer3').attr('hidden', true);
        $('#startingPlayer4').attr('hidden', true);
        $('#startingPlayer5').attr('hidden', true);

        $('#startingPlayer'+[game.startingPlayer]).removeAttr('hidden');
    };

    $(".clicky").click(function(){
        let myTarget="#"+$(this).attr("myTargetValue")+game.currentPlayer;
        let typeOfThingToChangeAsText = $(this).attr('myTargetvalue');
        let myValue =$(myTarget).text();

        // console.log(`mytarget: '${myTarget}' - typeOfThing: '${typeOfThingToChangeAsText}' - myvalue: '${myValue}'`);
        if ($(this).attr("math") === "plus") {
            myValue++
        }
        else {
            myValue--
        }

        if (myValue < 0 && typeOfThingToChangeAsText != "moneyPerRound") {
            callErrorModal(`You don't have enough of the target for that action.`);
            return false;
        }

        $(myTarget).text(myValue);
        // TODO some sort of logging here
    });

    $(".clickyTotal").click(function(){
        let myTarget="#"+$(this).attr("myTargetValue");
        let myValue = parseInt($(myTarget).text());

        if ($(this).attr("myTargetValue") === "oxygenTotal"){
            if ($(this).attr("math") === "plus"){
                if(myValue >= 14){
                    callErrorModal(`Unable to raise Oxygen - we are at max.`);
                    return false;
                }
            }
            if ($(this).attr("math") === "minus"){
                if(myValue <= 0){
                    callErrorModal(`Unable to lower Oxygen - we are at min.`);
                    return false;
                }
            }
        }

        if ($(this).attr("myTargetValue") === "tempTotal"){
            if ($(this).attr("math") === "plus"){
                if(myValue >= 8){
                    callErrorModal(`Unable to raise temp - we are at max.`);
                    return false;
                }
            }
            if ($(this).attr("math") === "minus"){
                if(myValue <= -30){
                    callErrorModal(`Unable to lower temp - we are at min.`);
                    return false;
                }
            }
        }

        if ($(this).attr("myTargetValue") === "waterTotal"){
            if ($(this).attr("math") === "plus"){
                if(myValue >= 9){
                    callErrorModal(`Unable to raise water - we are at max.`);
                    return false;
                }
            }
            if ($(this).attr("math") === "minus"){
                if(myValue <= 0){
                    callErrorModal(`Unable to lower water - we are at min.`);
                    return false;
                }
            }
        }

        if ($(this).attr("myTargetValue") === "venusTotal"){
            if ($(this).attr("math") === "plus"){
                if(myValue >= 30){
                    callErrorModal(`Unable to raise Venus - we are at max.`);
                    return false;
                }
            }
            if ($(this).attr("math") === "minus"){
                if(myValue <= 0){
                    callErrorModal(`Unable to lower Venus - we are at min.`);
                    return false;
                }
            }
        }

        let playerTrTarget = "#trTotal"+game.currentPlayer;
        let playerValue = parseInt($(playerTrTarget).text());

        let multiplier = 1;
        if ($(this).attr("myTargetValue") === "tempTotal" || $(this).attr("myTargetValue") === "venusTotal"){
            multiplier = 2;
        }

        if ($(this).attr("math") === "plus") {
            
            myValue += multiplier;
            playerValue++;
        }
        else {
            myValue -= multiplier;
            playerValue--;
        }
        $(myTarget).text(myValue);
        $(playerTrTarget).text(playerValue);
        // TODO some sort of logging here
    });

    $('#nextRound').click(function(){
        $('#nextRoundModal').modal('show');
    });

    $('#confirmNextRound').click(function(){
        $('#nextRoundModal').modal('hide');
        setupNextRound();
    });

    $('#notYetNextRound').click(function(){
        $('#nextRoundModal').modal('hide');
    });

    $('#confirmSetup').click(function(){
        setupGame();
    });

    function callErrorModal(thisError){
        $('#errorDiv').text(thisError);
        $('#errorModal').modal('show');
    }

    $('#closeErrorModal').click(function(){
        $('#errorModal').modal('hide');
    });

    $('#switchPositiveAndNegative').click(function(){
        event.preventDefault();
        let targetVal = parseInt($('#bigSwingInput').val());
        console.log(targetVal);
        if (targetVal > 0) {
            console.log(`making it negative`);
            $('#bigSwingInput').val(-targetVal);
            $('#bigSwingInput').removeClass('backgroundGreen');
            $('#bigSwingInput').addClass('backgroundRed');
        }
        else if (targetVal < 0) {
            console.log(`making it positive`);
            $('#bigSwingInput').val(Math.abs(targetVal));
            $('#bigSwingInput').removeClass('backgroundRed');
            $('#bigSwingInput').addClass('backgroundGreen');
        }
        else {
            console.log(`it was zero or empty - so - no`);
            return false;
        }
    });

    $('#bigSwingInput').change(function(){
        let targetVal = parseInt($('#bigSwingInput').val());
        console.log(targetVal);
        if (targetVal > 0) {
            console.log(`making it green`);
            $('#bigSwingInput').removeClass('backgroundRed');
            $('#bigSwingInput').removeClass('backgroundBlue');
            $('#bigSwingInput').addClass('backgroundGreen');
        }
        else if (targetVal < 0) {
            console.log(`making it red`);
            $('#bigSwingInput').removeClass('backgroundBlue');
            $('#bigSwingInput').removeClass('backgroundGreen');
            $('#bigSwingInput').addClass('backgroundRed');
        }
        else {
            console.log(`making it blue`);
            $('#bigSwingInput').removeClass('backgroundRed');
            $('#bigSwingInput').removeClass('backgroundGreen');
            $('#bigSwingInput').addClass('backgroundBlue');
            return false;
        }
    })

    $('#buyCard').click(function(){
        let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+game.currentPlayer).text());
        if (moneyCurrentlyAvailable >= 3) {
            $('#moneyTotal'+game.currentPlayer).text(moneyCurrentlyAvailable - 3);
            // TODO logging here.
        }
        else {
            callErrorModal(`You don't have enough money to buy another card.`);
            return false;
        }
    });

    $('#buyGreeneryWithPlants').click(function(){
        let plantsCurrentlyAvailable = parseInt($('#plantsTotal'+game.currentPlayer).text());
        let currentOxygen = parseInt($('#oxygenTotal').text());
        if (currentOxygen < 14) {
            let currentTRValue = parseInt($('#trTotal'+game.currentPlayer).text());
            $('#trTotal'+game.currentPlayer).text(currentTRValue + 1);
            $('#oxygenTotal').text(currentOxygen + 1);
        }
        else {
            console.log(`Oxygen was not raised as it is at max.`);
        }

        // In either case, we still let them buy it (if they can afford it)
        if (plantsCurrentlyAvailable >= 8) {
            $('#plantsTotal'+game.currentPlayer).text(plantsCurrentlyAvailable - 8);
            // TODO logging here.
        }
        else {
            callErrorModal(`You don't have enough plants to buy a greenery.`);
            return false;
        }
    });
    
    $('#buyGreeneryWithMoney').click(function(){
        let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+game.currentPlayer).text());
        let currentOxygen = parseInt($('#oxygenTotal').text());
        if (currentOxygen < 14) {
            let currentTRValue = parseInt($('#trTotal'+game.currentPlayer).text());
            $('#trTotal'+game.currentPlayer).text(currentTRValue + 1);
            $('#oxygenTotal').text(currentOxygen + 1);
        }
        else {
            console.log(`Oxygen was not raised as it is at max.`);
        }

        // In either case, we still let them buy it (if they can afford it)
        if (moneyCurrentlyAvailable >= 23) {
            $('#moneyTotal'+game.currentPlayer).text(moneyCurrentlyAvailable - 23);
            // TODO logging here.
        }
        else {
            callErrorModal(`You don't have enough money to buy a greenery.`);
            return false;
        }
    
    });
    
    $('#buyAquafer').click(function(){
        let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+game.currentPlayer).text());
        let currentAquafers = parseInt($('#waterTotal').text())
        if (currentAquafers < 9) {
            if (moneyCurrentlyAvailable >= 18) {
                $('#moneyTotal'+game.currentPlayer).text(moneyCurrentlyAvailable - 18);
                let currentTRValue = parseInt($('#trTotal'+game.currentPlayer).text());
                $('#trTotal'+game.currentPlayer).text(currentTRValue + 1);
                $('#waterTotal').text(currentAquafers + 1);
                // TODO logging here.
            }
            else {
                callErrorModal(`You don't have enough money to buy an aquafer.`);
                return false;
            }
        }
        else {
            callErrorModal(`There are no aquafers available for purchase.`);
        }
    
    });
    
    $('#buyPowerPlant').click(function(){
        let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+game.currentPlayer).text());
        if (moneyCurrentlyAvailable >= 11) {
            $('#moneyTotal'+game.currentPlayer).text(moneyCurrentlyAvailable - 11);
            let currentEnergyPerRound = parseInt($('#energyPerRound'+game.currentPlayer).text());
            $('#energyPerRound'+game.currentPlayer).text(currentEnergyPerRound + 1);
            // TODO logging here.
        }
        else {
            callErrorModal(`You don't have enough money to buy a power plant.`);
            return false;
        }
    
    });
    
    $('#buyCity').click(function(){
        let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+game.currentPlayer).text());
        if (moneyCurrentlyAvailable >= 25) {
            $('#moneyTotal'+game.currentPlayer).text(moneyCurrentlyAvailable - 25);
            let currentMoneyPerRound = parseInt($('#moneyPerRound'+game.currentPlayer).text());
            $('#moneyPerRound'+game.currentPlayer).text(currentMoneyPerRound + 1);
            // TODO logging here.
        }
        else {
            callErrorModal(`You don't have enough money to buy a city.`);
            return false;
        }

    });
    
    $('#buyAsteroidWithMoney').click(function(){
        let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+game.currentPlayer).text());
        let currentTemp = parseInt($('#tempTotal').text());
        if (currentTemp < 8) {
            if (moneyCurrentlyAvailable >= 14) {
                $('#moneyTotal'+game.currentPlayer).text(moneyCurrentlyAvailable - 14);
                let currentTRValue = parseInt($('#trTotal'+game.currentPlayer).text());
                $('#trTotal'+game.currentPlayer).text(currentTRValue + 1);
                $('#tempTotal').text(currentTemp + 2);
                // TODO logging here.
            }
            else {
                callErrorModal(`You don't have enough money to buy an asteroid.`);
                return false;
            }
        }
        else {
            callErrorModal(`The temperature can no longer be raised.`);
        }
    });

    $('#buyAsteroidWithHeat').click(function(){
        let heatCurrentlyAvailable = parseInt($('#heatTotal'+game.currentPlayer).text());
        let currentTemp = parseInt($('#tempTotal').text());
        if (currentTemp < 8) {
            if (heatCurrentlyAvailable >= 8) {
                $('#moneyTotal'+game.currentPlayer).text(heatCurrentlyAvailable - 8);
                let currentTRValue = parseInt($('#trTotal'+game.currentPlayer).text());
                $('#trTotal'+game.currentPlayer).text(currentTRValue + 1);
                $('#tempTotal').text(currentTemp + 2);
                // TODO logging here.
            }
            else {
                callErrorModal(`You don't have enough heat to buy an asteroid.`);
                return false;
            }
        }
        else {
            callErrorModal(`The temperature can no longer be raised.`);
        }
    });

    
    function setupNextRound() {
        // 1. raise the round number
        game.roundNumber++;
        $('#roundNumber').text('Round Number: '+game.roundNumber);

        // 2. shift the 'starting player' - make the 'starting player' active
        if (game.startingPlayer >= game.activePlayers){
            game.startingPlayer = 1;
        }
        else {
            game.startingPlayer++;
        }
        setStartingPlayer();

        // 3. Take the 'per round' and add to the 'regular total'
        // ... do this for each active player    
        for (let i = 1; i <= game.activePlayers; i++) {
            // 3a. Money
            let moneyCurrentlyAvailable = parseInt($('#moneyTotal'+i).text());
            let terraformRating = parseInt($('#trTotal'+i).text());
            let moneyPerRound = parseInt($('#moneyPerRound'+i).text());

            $('#moneyTotal'+i).text(moneyCurrentlyAvailable + terraformRating + moneyPerRound);
            
            // 3b. Steel
            let steelCurrentlyAvailable = parseInt($('#steelTotal'+i).text());
            let steelPerRound = parseInt($('#steelPerRound'+i).text());

            $('#steelTotal'+i).text(steelCurrentlyAvailable + steelPerRound);
            
            // 3c. Titanium
            let titaniumCurrentlyAvailable = parseInt($('#titaniumTotal'+i).text());
            let titaniumPerRound = parseInt($('#titaniumPerRound'+i).text());

            $('#titaniumTotal'+i).text(titaniumCurrentlyAvailable + titaniumPerRound);
            
            // 3d. Plants
            let plantsCurrentlyAvailable = parseInt($('#plantsTotal'+i).text());
            let plantsPerRound = parseInt($('#plantsPerRound'+i).text());

            $('#plantsTotal'+i).text(plantsCurrentlyAvailable + plantsPerRound);
            
            // 3e. Energy
            let energyCurrentlyAvailable = parseInt($('#energyTotal'+i).text());
            let energyPerRound = parseInt($('#energyPerRound'+i).text());

            $('#energyTotal'+i).text(energyPerRound); // current energy get moved to heat
            
            // 3f. Heat
            let heatCurrentlyAvailable = parseInt($('#heatTotal'+i).text());
            let heatPerRound = parseInt($('#heatPerRound'+i).text());

            $('#heatTotal'+i).text(energyCurrentlyAvailable + heatCurrentlyAvailable + heatPerRound); // current energy becomes heat 
        }
    }

    $('#bigSwingForm').submit(function(){
        event.preventDefault();
        // We need to grab the type of thing we are manipulating and the amount and the player - then do the math.
        let typeOfThingToChange = $('#bigSwingDropDown').find(":selected").val();
        let typeOfThingToChangeAsText = $('#bigSwingDropDown').find(":selected").text().toLowerCase();
        let valueOfThingToChangeAsText = $('#bigSwingInput').val();
        let valueOfThingToChange = parseInt($('#bigSwingInput').val());
        let currentValueOfThingToChange = parseInt($('#'+typeOfThingToChange+game.currentPlayer).text());

        if (valueOfThingToChangeAsText === "" || valueOfThingToChange > 100 || valueOfThingToChange < -100){
            console.log(`Value to change is in a bad range - fix it before submission`);
            callErrorModal('Please enter a value in the input box to continue...');
            return false;
        }

        if ((currentValueOfThingToChange + valueOfThingToChange) < 0) {
            callErrorModal(`You don't have enough ${typeOfThingToChangeAsText} for that action.`);
        }
        else {
            $('#'+typeOfThingToChange+game.currentPlayer).text(currentValueOfThingToChange + valueOfThingToChange);
            $('#bigSwingInput').val('');
            $('#bigSwingInput').removeClass('backgroundGreen');
            $('#bigSwingInput').removeClass('backgroundRed');
            $('#bigSwingInput').addClass('backgroundBlue');
        }
    });

    // These remove the precision needed to click a different player
    // You can click any of the player stats and you're good to go.  
    $('.player1').click(function(){
        $('#player1Radio').prop("checked", true);
        game.currentPlayer = 1;
        updateCurrentPlayer();
    });

    $('.player2').click(function(){
        $('#player2Radio').prop("checked", true);
        game.currentPlayer = 2;
        updateCurrentPlayer();
    });

    $('.player3').click(function(){
        $('#player3Radio').prop("checked", true);
        game.currentPlayer = 3;
        updateCurrentPlayer();
    });

    $('.player4').click(function(){
        $('#player4Radio').prop("checked", true);
        game.currentPlayer = 4;
        updateCurrentPlayer();
    });

    $('.player5').click(function(){
        $('#player5Radio').prop("checked", true);
        game.currentPlayer = 5;
        updateCurrentPlayer();
    });
    

}); // End document.ready