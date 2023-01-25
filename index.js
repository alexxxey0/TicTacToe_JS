let empty_squares = 9;
let squares = document.querySelectorAll("td");
let corners = document.querySelectorAll(".corner");

let info_text = document.querySelector("#info-text");
let text = document.createElement("p");
let game_ended = false;
let won = 0;
let lost = 0;
let draw = 0;

const win_squares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function player_move(sqr) {

    let x_img = document.createElement("img");
    x_img.setAttribute("src", "red_x.png");
    x_img.style.width = "160px";
    x_img.style.display = "block";
    x_img.style.margin = "auto";

    let selected_sqr = squares[sqr];
    if (!selected_sqr.classList.contains("taken_x") && !selected_sqr.classList.contains("taken_o") && !game_ended) { // if selected square is empty
        selected_sqr.append(x_img);
        selected_sqr.classList.add("taken_x");
        selected_sqr.style.cursor = "default";
        empty_squares--;
    } else return;

    // loop over all of the possible winning combinations, and check if there is an X in all 3 positions
    // every square in the table has its number, like so:
    // 0 1 2
    // 3 4 5
    // 6 7 8

    let won_once = false;
    win_squares.forEach((element) => {
        if (squares[element[0]].classList.contains("taken_x") && squares[element[1]].classList.contains("taken_x") && squares[element[2]].classList.contains("taken_x")) {
            // this check is needed, because otherwise the "won" value will be incremented by 2 if player hits 2 winning combinations simultaneously (we don't want that)
            if (!won_once) { 
                won++;
                won_once = true;
            }
            document.querySelector("#won").innerText = "Games won: " + won;
            text.innerText = "You won! Congratulations!";
            info_text.append(text);
            game_ended = true;
        }
    })
    if (game_ended) return;

    if (empty_squares === 0) {
        draw++;
        document.querySelector("#draw").innerText = "Games ended in a draw: " + draw;
        text.innerText = "The game ended in a draw!";
        info_text.append(text);
        game_ended = true;
    }
    if (game_ended) return;

    let o_img = document.createElement("img");
    o_img.setAttribute("src", "o_img.png");
    o_img.style.width = "160px";
    o_img.style.display = "block";
    o_img.style.margin = "auto";

    /*do {
        let random_num = Math.floor(Math.random() * 9);  // Returns a random integer from 0 to 8
        var computer_sqr = squares[random_num];
    } while ((computer_sqr.classList.contains("taken_x") || computer_sqr.classList.contains("taken_o")) && empty_squares > 1);*/
    let computer_sqr;
    let random_num_0_3 = Math.floor(Math.random() * 4); // random integer from 0 to 3

    if (empty_squares === 8) { // computer's first move
        if (!squares[4].classList.contains("taken_x")) computer_sqr = squares[4];
        else computer_sqr = corners[random_num_0_3];
    } else {
        for (let element of win_squares) {
            let break_outer = false;
            let o_in_a_row = 0;

            for (let number of element) {
                if (squares[number].classList.contains("taken_o")) o_in_a_row++;
            }
            if (o_in_a_row === 2) { // if computer is 1 move away from winning, win
                for (let number of element) {
                    if (!squares[number].classList.contains("taken_o") && !squares[number].classList.contains("taken_x")) {
                        computer_sqr = squares[number];
                        break_outer = true;
                        break;
                    }
                }

            }
            if (break_outer) break;
        }
        if (computer_sqr === undefined) {
            for (let element of win_squares) {
                let break_outer = false;
                let x_in_a_row = 0;
                for (let number of element) {
                    if (squares[number].classList.contains("taken_x")) x_in_a_row++;
                }

                if (x_in_a_row === 2) { // if player is 1 move away from winning, prevent player from winning
                    for (let number of element) {
                        if (!squares[number].classList.contains("taken_o") && !squares[number].classList.contains("taken_x")) {
                            computer_sqr = squares[number];
                            break_outer = true;
                            break;
                        }
                    }
                }
                if (break_outer) break;
            }
        }
        console.log(computer_sqr);
        if (computer_sqr === undefined) {
            for (let element of win_squares) {
                let empty_in_a_row = 0;

                for (let number of element) {
                    if (!squares[number].classList.contains("taken_x") && !squares[number].classList.contains("taken_o")) empty_in_a_row++;
                }

                let random_num_0_1 = Math.floor(Math.random() * 2);
                if (empty_in_a_row === 2) {
                    for (let number of element) {
                        if (!squares[number].classList.contains("taken_x") && !squares[number].classList.contains("taken_o")) {
                            if (random_num_0_1 === 0 || computer_sqr === undefined) {
                                computer_sqr = squares[number];
                                console.log(computer_sqr);
                                break;
                            }
                        }
                    }
                }
            }  
        }      
    }

    if (empty_squares > 1) {
        computer_sqr.classList.add("taken_o");
        computer_sqr.style.cursor = "default";
        empty_squares--;

        setTimeout(() => {
            computer_sqr.append(o_img);
        }, 1000);
    }
    
    win_squares.forEach((element) => {
        if (squares[element[0]].classList.contains("taken_o") && squares[element[1]].classList.contains("taken_o") && squares[element[2]].classList.contains("taken_o")) {
            lost++;
            document.querySelector("#lost").innerText = "Games lost: " + lost;
            text.innerText = "You lost! Unlucky!";
            game_ended = true;
            setTimeout(() => {
                info_text.append(text);
            }, 1000);
        }
    })
    if (game_ended) return;
}


squares.forEach((element, index) => {
    element.addEventListener("click", function() {player_move(index)});
    element.style.cursor = "pointer";
})


function reset() {
    squares.forEach((element) => {
        if (element.hasChildNodes()) element.removeChild(element.firstChild);
        element.classList.remove("taken_x");
        element.classList.remove("taken_o");
        element.style.cursor = "pointer";
    })

    empty_squares = 9;
    game_ended = false;
    
    if (info_text.hasChildNodes()) info_text.removeChild(info_text.firstChild);
}

const reset_button = document.querySelector("#reset-button");
reset_button.addEventListener("click", function() {reset()});


