let empty_squares = 9;
let squares = document.querySelectorAll("td");

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
        empty_squares--;
    } else return;

    // loop over all of the possible winning combinations, and check if there is an X in all 3 positions
    // every square in the table has its number, like so:
    // 0 1 2
    // 3 4 5
    // 6 7 8
    win_squares.forEach((element) => {
        if (squares[element[0]].classList.contains("taken_x") && squares[element[1]].classList.contains("taken_x") && squares[element[2]].classList.contains("taken_x")) {
            won++;
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

    do {
        let random_num = Math.floor(Math.random() * 8);  // Returns a random integer from 0 to 8
        var computer_sqr = squares[random_num];
    } while ((computer_sqr.classList.contains("taken_x") || computer_sqr.classList.contains("taken_o")) && empty_squares > 1);


    if (empty_squares > 1) {
        computer_sqr.classList.add("taken_o");
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
    element.classList.add("sqr" + (index));
    element.addEventListener("click", function() {player_move(index)});
})

function reset() {
    squares.forEach((element) => {
        console.log(element);
        if (element.hasChildNodes()) element.removeChild(element.firstChild);
        element.classList.remove("taken_x");
        element.classList.remove("taken_o");
    })

    empty_squares = 9;
    game_ended = false;
    
    if (info_text.hasChildNodes()) info_text.removeChild(info_text.firstChild);
    
}

const reset_button = document.querySelector("#reset-button");
reset_button.addEventListener("click", function() {reset()});


