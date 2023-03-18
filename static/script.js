function updateTime() {
    // Fetch the time remaining from the server
    fetch('/gettime', {method: 'get'})
        .then(response => response.text())
        .then(text => {
            // console.log(text);
            if (text == "Game Over"){
                console.log("DONE!!");
                location.href = "http://localhost:8000/gameover";
            }
            // text = text.substr(text.length-10).replace("</div>", "");
            text = text.replace('<div id="currTime" style="display:none;">', "");
            text = text.replace('</div>', "");
            console.log(text);
        // Update the DOM with the new time remaining
        document.getElementById('timeRemaining').textContent = text;

        })
        .catch(error => console.error(error));
}

// Update the time remaining every second
setInterval(updateTime, 1000);

$(document).on('keydown', function(event) {
    if (event.key === 'i') {
        var text = $('#dropBtn2').text();
        text = text.replace('Drop ', '');
        alert("Your Inventory : " + text);
    }
});

$(document).ready(function() {

    // hide the div id location
    $("#location").css("visibility", "hidden");
    // get the value of the location
    var loc = $("#location").text();
    

    // var checkpoint = 0;
    function animateConversation(convo) {
        // Loop through each message in the conversation
        for (var i = 0; i < convo.length; i++) {
            // Add a new paragraph element to the message hub
            $('#hub').append("<p id='ch" + i + "'><strong><u></u></strong></p>");

        }

        // Start the conversation by animating the first message
        animateText(0, convo[0].name, convo[0].text);

        // Function to animate the text for a message
        function animateText(index, name, text) {
            var i = 0;
            var ele = "#ch" + index + " strong u";
            $(ele).text(name);
            $(ele).append(": ");

            function typeWriter() {
                if (i < text.length) {
                    $('#ch' + index).append(text.charAt(i));
                    i++;
                    setTimeout(typeWriter, 10);
                } else {
                    // Animation for current message is complete, animate next message
                    var nextIndex = index + 1;
                    if (nextIndex < convo.length) {
                        setTimeout(function() {
                            animateText(nextIndex, convo[nextIndex].name, convo[nextIndex].text);
                        }, 1000); // Add a delay of 1 second before animating next message
                    }
                    else{
                        $("#location").css("visibility", "visible");
                    }
                }
            }

            typeWriter();
        }
    }

        var convo1 = [
            { name: "Nova", text: "Good evening, Agent O. This is Nova speaking, your liaison for this mission. Can you confirm that you're in position and ready to proceed?" },
            { name: "AgentO", text: "Affirmative, Nova. I'm in position outside the suspect's home and ready to begin the mission." },
            { name: "Nova", text: "Excellent, Agent O. Our intel suggests that the valuable asset is located inside the suspect's home, and your mission is to retrieve it. Please proceed with caution and follow the plan we've discussed." },
            { name: "AgentO", text: "Understood, Nova. Entering the hall now." }
        ];

        console.log("Current Checkpoint: " + checkpoint);
        
        if (checkpoint == 0) {
            // clear the hub
            $('#hub').empty();
            // HIDE THE buttons with name direction
            $("#north").css("visibility", "hidden");
            $("#east").css("visibility", "hidden");
            $("#west").css("visibility", "hidden");
            $("#south").css("visibility", "hidden");


            // animateConversation(convo1);
            
            // append the conversation to the hub
            $('#hub').append("<p id='ch0'><strong><u>Nova</u></strong>: Good evening, Agent O. This is Nova speaking, your liaison for this mission. Can you confirm that you're in position and ready to proceed?</p>");
            $('#hub').append("<p id='ch1'><strong><u>AgentO</u></strong>: Affirmative, Nova. I'm in position outside the suspect's home and ready to begin the mission.</p>");
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Excellent, Agent O. Our intel suggests that the valuable asset is located inside the suspect's home, and your mission is to retrieve it. Please proceed with caution and follow the plan we've discussed.</p>");
            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Understood, Nova. Entering the hall now.</p>");
            $('#hub').append("<p id='ch4'><strong><u>Nova</u></strong>: I have full confidence in your abilities, Agent O. Stay focused, stay sharp, and stay safe out there. Good luck.</p>");
            // create a button named continue
            $('#hub').append("<button class='btn btn-dark' id='continue' name='continue'>Continue</button>");


            // show the location
            $("#location").css("visibility", "visible");

            // click the button to show all the buttons

            $("#continue").click(function() {
                // show the buttons
                $("#north").css("visibility", "visible");
                $("#east").css("visibility", "visible");
                $("#west").css("visibility", "visible");
                $("#south").css("visibility", "visible");

                // empty the hub
                $('#hub').empty();
                // append the conversation to the hub
                $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: I see. All the rooms seem to be locked, Nova. I need to find a key to proceed.</p>");
                $('#hub').append("<p id='ch4'><strong><u>Nova</u></strong>: That's correct, Agent O. We believe the key is hidden somewhere in the hall. Once you find it, you'll be able to unlock the rooms and move forward with your mission.</p>");

                // hide the continue button
                $("#continue").css("display", "none");
            });

        }

        else if (checkpoint == 1) {
            console.log("checkpoint 1");
            // found chest
            $('#hub').empty();

            $('#hub').append("<p id='ch0'><strong><u>AgentO</u></strong>: Nova, I found a chest. It was hidden behind a curtain in the corner of the hall. And you were right, a kitchen key is kept.</p>");
            $('#hub').append("<p id='ch1'><strong><u>Nova</u></strong>: Excellent work, Agent O. You're proving to be quite the asset yourself. Use the kitchen key to move East.</p>");

        }

        else if(checkpoint == 2) {
            // at kitchen
            $('#hub').empty();
            
            $('#hub').append("<p id='ch0'><strong><u>Nova</u></strong>: Agent O, you've made it to the kitchen. Our intel suggests that there may be some useful items in there for you.</p>");
              $('#hub').append("<p id='ch1'><strong><u>AgentO</u></strong>: Understood, Nova.</p>");

        }

        else if(checkpoint == 3) {
            // at living room
            $('#hub').empty();
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Agent O, you're now in the living room. Our intel suggests that there may be some important items in there that could help you complete your mission.</p>");
            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Got it, Nova.</p>");
            

        }
        
        else if(checkpoint == 4) {
            // at bathroom
            $('#hub').empty();
            
            $('#hub').append("<p id='ch0'><strong><u>Nova</u></strong>: Agent O, you've made it to the bathroom. Our intel suggests that there may be some useful items in there for you.</p>");
              $('#hub').append("<p id='ch1'><strong><u>AgentO</u></strong>: Understood, Nova.</p>");

        }

        else if(checkpoint == 5) {
            // at bedroom
            $('#hub').empty();
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Agent O, you're now in the bed room. Our intel suggests that there may be some important items in there that could help you complete your mission.</p>");
            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Got it, Nova.</p>");

        }

        else if(checkpoint == 6) {
            // at hall
            $('#hub').empty();
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: To the north of your current position is the living room, to the east is the kitchen, to the south is the bathroom, and to the west is the bedroom.</p>");
            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Got it, Nova.</p>");

        }


        else if(checkpoint == 7) {
            // at bathroom with broken pipe.

            $('#hub').empty();
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Good work getting to the bathroom quickly. We've got a water leak and it's getting worse. If it bursts, the suspect might wake up. I need you to use the broken pipe you found in the kitchen to fix the leak. Over.</p>");

            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Copy that. I'm on it. Over.</p>");
            $('#hub').append("<p id='ch4'><strong><u>Nova</u></strong>: Keep me updated on your progress. Over.</p>");
        }

        else if(checkpoint == 8) {
            $('#hub').empty();
            // fix the pipe
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Good job, AgentO! The water leakage is now fixed. Did you find anything else in the bathroom?</p>");
            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Yes, I found a key in the keyholder.</p>");
            $('#hub').append("<p id='ch4'><strong><u>Nova</u></strong>: That's great! Is there any label on the key? Maybe we can figure out which room it unlocks.</p>");
            $('#hub').append("<p id='ch5'><strong><u>AgentO</u></strong>: Yes, it says 'Bedroom'.</p>");
            $('#hub').append("<p id='ch6'><strong><u>Nova</u></strong>: Perfect! That means we can now access the bedroom. Let's head over there and see what we can find. Keep up the good work!</p>");					
        }

        else if(checkpoint == 9) {
            $('#hub').empty();
            // at bedroom with document
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: AgentO, I found the document hidden in a drawer.</p>");
            $('#hub').append("<p id='ch3'><strong><u>AgentO</u></strong>: Excellent work! Let's take a look at it and see what information we can gather. This might be a key piece of evidence in our investigation.</p>");
            $('#hub').append("<p id='ch4'><strong><u>Nova</u></strong>: Sure thing. Here you go.</p>");
            $('#hub').append("<p id='ch5'><strong><u>AgentO</u></strong>: (Examining the document) This is exactly what we were looking for! It has all the information we need to make progress in our case. You've done a fantastic job, AgentO. I'm glad to have you on this mission.</p>");
            $('#hub').append("<p id='ch6'><strong><u>Nova</u></strong>: Thank you, Nova. It was a team effort. I couldn't have done it without your guidance.</p>");
            $('#hub').append("<p id='ch7'><strong><u>AgentO</u></strong>: That's what I'm here for. Now, let's get out of here before the suspect returns. We don't want to get caught.</p>");

        }
        else if(checkpoint == 10) {
            $('#hub').empty();
            // at bedroom
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: AgentO, you have made it to the bedroom. Great work so far! I believe the document we're looking for should be somewhere near the suspect's bed. But be very careful, any noise could alert the suspect. We don't want to risk getting caught.</p>");

        }
        else if(checkpoint == 11) {
            $('#hub').empty();
            // take item again
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: You're already holding it! </p>");

        }
        else if(checkpoint == 12) {
            $('#hub').empty();
            // drop item again
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: You aren't holding it! </p>");

        }
        else if(checkpoint == 13) {
            $('#hub').empty();
            // locked door
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Door is locked!. Get the key first! </p>");

        }
        else if(checkpoint == 14) {
            $('#hub').empty();
            // unkown path
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: You can't go that way. </p>");

        }
        else if(checkpoint == 15) {
            $('#hub').empty();
            // pipe fix without broken pipe
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: You need to pick up the other part of broken pipe first! </p>");

        }
        else if(checkpoint == 16) {
            $('#hub').empty();
            // escape without document
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: You need to find the document first! </p>");

        }
        else if(checkpoint == 17) {
            $('#hub').empty();
            // escaped !!
            
            // $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Haha You escaped !! </p>");
            location.href = "http://localhost:8000/theend";

        }
        else if(checkpoint == 18) {
            $('#hub').empty();
            // escaped !!
            
            $('#hub').append("<p id='ch2'><strong><u>Nova</u></strong>: Find the Exit Door ! </p>");

        }

        



    // drop item in inventory
    var dropperButton1 = $("#dropBtn1").attr("value");
    console.log(dropperButton1);

    if (dropperButton1 != null) {
        $("#dropBtn2").show();
        $("#dropBtn2").text("Drop " + dropperButton1);
    }
    else {
        $("#dropBtn2").hide();
    }

    $("#dropBtn2").click(function() {
        var getValue = $("#dropBtn1").attr("value");
        console.log(getValue);
        location.href = "http://localhost:8000/game?drop=" + getValue;
    });

    // pick item in room

    var radios = $('input[type="radio"][name="picktheitem1"]');
    
    //if there are any radio buttons with name picktheitem1 then hdie the div with id picktheitemMain
    if (radios.length == 0) {
        // $('#picktheitemMain').hide(); //.css('visibility', 'hidden');
        $('#picktheitem').append('<p>There are no items to pick.</p>');
    }

    radios.each(function() {
        $('#picktheitem').append('<div class="form-check"><input class="form-check-input" type="radio" name="picktheitem2" id="picktheitem2' + $(this).val() + '" value="' + $(this).val() + '"><label class="form-check-label" for="picktheitem2' + $(this).val() + '">' + $(this).val()+ '</label></div>');
    });


    // if any of the radio buttons with name picktheitem2 are clicked windows.location.href = "http://localhost:8000/game?pick=" + $(this).val();
    $('input[type="radio"][name="picktheitem2"]').click(function() {
        var value = $(this).val();
        location.href = "http://localhost:8000/game?pick=" + value;
    });

    // use item in inventory

    var radios = $('input[type="radio"][name="usetheitem1"]');

    radios.each(function() {
        $('#usetheitem').append('<div class="form-check"><input class="form-check-input" type="radio" name="usetheitem2" id="usetheitem2' + $(this).val() + '" value="' + $(this).val() + '"><label class="form-check-label" for="usetheitem2' + $(this).val() + '">' + $(this).val()+ '</label></div>');
    });

    if (radios.length == 0) {
        $('#usetheitem').append('<p>There are no items to use.</p>');
    }

    $('input[type="radio"][name="usetheitem2"]').click(function() {
        var value = $(this).val();
        use_the_item(value);
    });


    // for map
    var map1 = document.getElementById("mapImage1");

    // if (map1 != null) {
    //     map2.style.display = "none";
    // }

    var map2 = document.getElementById("mapImage2");

    // copy the src of map2 to map1
    map2.src = map1.src;


});






function generateMathPuzzle() {
    var num1 = Math.floor(Math.random() * 10) + 1; // generates a random number between 1 and 10
    var num2 = Math.floor(Math.random() * 10) + 1; // generates a random number between 1 and 10
    var operator = Math.floor(Math.random() * 3); // generates a random number between 0 and 2
    var result;

    switch (operator) {
        case 0: // addition
        result = num1 + num2;
        return { problem: num1 + " + " + num2 + " = ?", answer: result };
        case 1: // subtraction
        if (num2 > num1) {
            var temp = num1;
            num1 = num2;
            num2 = temp;
        }
        result = num1 - num2;
        return { problem: num1 + " - " + num2 + " = ?", answer: result };
        case 2: // multiplication
        result = num1 * num2;
        return { problem: num1 + " x " + num2 + " = ?", answer: result };
    }
}

function use_the_item(Item){
    // print the item and message
    console.log(Item);
    if (Item == "chest"){
        // get the puzzle
        var Puzzle = generateMathPuzzle();
        // get user provided message with prompt
        var Message = prompt(Puzzle.problem);
        // print the message
        console.log(Message);
        // check if the message is correct
        if (Message == Puzzle.answer){
            // if correct, print the message
            // console.log("Correct");
            location.href = "http://localhost:8000/game?useItem=" + Item;
        } else {
            // if incorrect, print the message
            alert("Invalid answer. Try again!!");
            // unclick the radio button
            document.getElementById("usetheitem2"+Item).checked = false;
        }
    }
    else {
        console.log(Item);
        location.href = "http://localhost:8000/game?useItem=" + Item;
    }
    // send a get request to the server wiht the item and message to the url localhost:8000/game
    //location.href = "http://localhost:8000/game?use=" + Item + "&usemessage=" + Message;			
}
