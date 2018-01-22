$(document).ready(function() {

    let game = {
        roundNumber: 1,
        currentPlayer: 1,
        startingPlayer: 1,
        activePlayers: 5,
        player1: "Player1",
        player2: "Player2",
        player3: "Player3",
        player4: "Player4",
        player5: "Player5",
    }

    $('#setupGameModal').toggle();

    function setupGame() {
        getAndSetPlayerNames();
        hideInactivePlayers();
        setStartingPlayer();
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
    };

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

    $('#nextRound').click(function(){
        // TODO bring up a modal to prompt for 'are you sure?'
        $('#nextRoundModal').toggle();
    });

    $('#confirmNextRound').click(function(){
        $('#nextRoundModal').toggle();
        setupNextRound();
    });

    $('#notYetNextRound').click(function(){
        $('#nextRoundModal').toggle();
    });

    $('#confirmSetup').click(function(){
        $('#setupGameModal').toggle();
        setupGame();
    })

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

            $('#moneyTotal'+i).text(moneyCurrentlyAvailable + terraformRating + moneyPerRound)
            
            // 3b. Steel
            let steelCurrentlyAvailable = parseInt($('#steelTotal'+i).text());
            let steelPerRound = parseInt($('#steelPerRound'+i).text());

            $('#steelTotal'+i).text(steelCurrentlyAvailable + steelPerRound)
            
            // 3c. Titanium
            let titaniumCurrentlyAvailable = parseInt($('#titaniumTotal'+i).text());
            let titaniumPerRound = parseInt($('#titaniumPerRound'+i).text());

            $('#titaniumTotal'+i).text(titaniumCurrentlyAvailable + titaniumPerRound)
            
            // 3d. Plants
            let plantsCurrentlyAvailable = parseInt($('#plantsTotal'+i).text());
            let plantsPerRound = parseInt($('#plantsPerRound'+i).text());

            $('#plantsTotal'+i).text(plantsCurrentlyAvailable + plantsPerRound)
            
            // 3e. Energy
            let energyCurrentlyAvailable = parseInt($('#energyTotal'+i).text());
            let energyPerRound = parseInt($('#energyPerRound'+i).text());

            $('#energyTotal'+i).text(energyCurrentlyAvailable + energyPerRound)
            
            // 3f. Heat
            let heatCurrentlyAvailable = parseInt($('#heatTotal'+i).text());
            let heatPerRound = parseInt($('#heatPerRound'+i).text());

            $('#heatTotal'+i).text(heatCurrentlyAvailable + heatPerRound)
        }
    }
    

}); // End document.ready