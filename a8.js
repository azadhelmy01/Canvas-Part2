let canvas = document.getElementById("myCanvas");
let page = document.getElementById("html")
let ctx = canvas.getContext("2d");
let r = document.getElementById("radius")
let color = document.getElementById("color")
let cords = [];
//initialize an empty array (has nothing in it)
//so when i add objects to the array within a function, storing it in here it will be stored as a global variable
let xCord;
//intiliazing x cord

let yCord;
//intializing y cord
let count = 0
// count is 0. since it is a 2d array i Know that in (myArray[a][b])
// "b" will either 1 or 0 and "a" will be as however long it is 
// that is why i have used the count so everytime i click count will add 1
//   0  1   
// 0 c  b
// 1 x  y
// 2 n  m
// 3 p  q
// [0][0] --> c, [0][1] -- b 


canvas.onclick = function () {
    //This anonymous function happens when the canvas is clicked on
    let shade = color.value; //just getting color from drop down menu
    cords.push([event.offsetX, event.offsetY]) //everytime i click those cordinates are pushed forming a 2d Array
    //since the array is within an array, the array WITHIN has only two values [0] and [1] w
    //coordinates now exist in the array
    xCord = cords[count][0]; //since intially count = 0, this will be our first index and the [0] 
    //refers to the first index within that array within an array. so currently xCords[0][0]
    yCord = cords[count][1];//since intially count = 0, this will be our first index and the [1] 
    //refers to the first index within that array within an array. so currently xCords[0][1]
    //x and y Cord gets stored into  global variable so i can use it outsdie this function

    //LETS SAY cords[count][0] = 50
    //LETS SAY cords[count][1] = 25 
    // it will look like this
    //    0   1   
    // 0 [50  25]
    ctx.fillStyle = "black";
    //just using shade as the fillstyle
    ctx.beginPath();
    ctx.arc(xCord, yCord, 10, 0, 2 * Math.PI)
    //basically since we defined xCord and yCord it would make sense above to have the centre of the circle where we clicked
    ctx.stroke();
    ctx.fill();
    console.log(cords.toString())
    count = count + 1
    //adds another count so when we click again count will be 1 and it will move on to the index below (since we are thinking
    // of the 2d array as a grid)
}


//when enter is click on the text box below function happens
r.addEventListener("keyup", change)
function change() {
    if (event.key == "Enter") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)//clears the canvas// so everytime we hit enter with a
        // new radius value then it basically just redraws circles with that radius

        let radius = Number(r.value); //when enter is the value of text box is taken as well
        if ((isNaN(radius) == false) && (radius >= 1 && radius <= 25)) {
            for (i = 0; i < cords.length; i++) {
                //since we have our array with the values in it from the previous function i can use it
                //"i" works similar to count, and since there are values within the cords Array, we can get it's length
                //it's length im assuming is correlated with count. from the above function 
                //since we used count to be added everytime the function was clicked, we were basically adding one more index "below" 
                //if we clicked 6 times means count = 6 and the length of the array is 6 with another array 
                // holding 2 values within each index.
                xCord = cords[i][0];
                //"i" is 0 intially so im getting the value at cords[0][0] which will be the first x-cord introduced to the array
                yCord = cords[i][1];
                //same function as above variable but cords[0][1] will get the first y-cord introduced to the array
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(xCord, yCord, radius, 0, 2 * Math.PI)
                ctx.stroke();
                ctx.fill();
            }

        }
        else {
            alert("Please enter a valid number between 1 and 25")
        }


    }
}

page.addEventListener("keyup", colorSwitch)

function colorSwitch() {
    if (event.key == "c") {
        let radius = r.value;
        if (isNaN(radius) == false) {
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                let shade = color.value;

                for (let i = 0; i < cords.length; i++) {
                    xCord = cords[i][0]
                    yCord = cords[i][1]
                    ctx.fillStyle = shade
                    ctx.beginPath();
                    ctx.arc(xCord, yCord, 10, 0, 2 * Math.PI)
                    ctx.stroke();
                    ctx.fill();
                }

            }
        }
        else {
            alert("Please enter a valid number between 1 and 25")

        }
    }


}



page.addEventListener("keyup", colorRandom)

function colorRandom() {
    if (event.key == "r") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < cords.length; i++) {
            shade = colorRandomizer()
            xCord = cords[i][0]
            yCord = cords[i][1]
            ctx.fillStyle = shade
            ctx.beginPath();
            ctx.arc(xCord, yCord, 10, 0, 2 * Math.PI)
            ctx.stroke();
            ctx.fill();
        }


    }


}

function colorRandomizer() {
    let shade = ""
    let randomNum = Math.floor(Math.random() * 3 + 1)
    if (randomNum == 1) {
        shade = "LemonChiffon";
    }
    else if (randomNum == 2) {
        shade = "DarkRed";
    }
    else if (randomNum == 3) {
        shade = "HoneyDew";
    }
    return shade
}