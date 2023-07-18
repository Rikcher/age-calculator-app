const inputs = [...document.querySelectorAll(".inputs")]    //* inputs of user 
const texts = [...document.querySelectorAll(".input-text")]    //* day/month/year on top of input box
const errors = [...document.querySelectorAll(".error")]    //* error text under input box
const form = document.querySelector("#date")
const button = document.querySelector("button")
const values = inputs.map(input => input.value)    //* values that user entered in the input box
const answers = [...document.querySelectorAll(".answers")]    //* years/month/days in the answer

const finalResult = [0, 0, 0]
const date = new Date()    //* todays date 
const maxValues = [31, 12, date.getFullYear()]    //* max values of input boxes

//* listen for change of values in inputs boxes and show errors if needed */
form.addEventListener("submit", (e) => {
    if(values.includes("")) {
        inputs.map(elem => {
            if(elem.value === "") {          // if input boxes are empty show error message "This fields is required"
                texts[inputs.indexOf(elem)].style.color = "var(--light-red)"
                errors[inputs.indexOf(elem)].style.display = "block"
                errors[inputs.indexOf(elem)].innerHTML = "This fields is required"
                inputs[inputs.indexOf(elem)].style.border = "1px solid var(--light-red)"
                inputs[inputs.indexOf(elem)].classList.add("inputs-red")
            } else if(elem.value > maxValues[inputs.indexOf(elem)]) {          // if values in input box larger than max values show error message
                    texts[inputs.indexOf(elem)].style.color = "var(--light-red)"
                    errors[inputs.indexOf(elem)].style.display = "block"
                    if(inputs.indexOf(elem) == 2) {
                        errors[inputs.indexOf(elem)].innerHTML = `Must be in the past`          // if invalid number in "year" input box show error message "Must be in the past"
                    } else {
                        errors[inputs.indexOf(elem)].innerHTML = `Must be a valid ${texts[inputs.indexOf(elem)].innerHTML.toLocaleLowerCase()}`          // if invalid numbers in "day" and "month" input boxes show error message "Must be a valid month/day"
                    }   
                    inputs[inputs.indexOf(elem)].style.border = "1px solid var(--light-red)"
                    inputs[inputs.indexOf(elem)].classList.add("inputs-red")
            } else {          // if everything is alright add value to final result
                texts[inputs.indexOf(elem)].style.color = "var(--smokey-grey)"
                errors[inputs.indexOf(elem)].style.display = "none"
                inputs[inputs.indexOf(elem)].style.border = "1px solid var(--light-grey)"
                inputs[inputs.indexOf(elem)].classList.remove("inputs-red")
                finalResult.splice(inputs.indexOf(elem), 1, elem.value)
            } 
        })
        if(finalResult[1] == 4 || finalResult[1] == 6 || finalResult[1] == 9 || finalResult[1] == 11) {          // show error message if user entered 31 day in 30 days month
            if(finalResult[0] > 30) {
                for (let i = 0; i < 3; i++) {
                    texts[i].style.color = "var(--light-red)"
                    errors[0].style.display = "block"
                    errors[0].innerHTML = "Must be a valid Date"
                    inputs[i].style.border = "1px solid var(--light-red)"
                    inputs[i].classList.add("inputs-red")
                }
                finalResult.splice(0, 1, 0)
            }
        } else if(finalResult[1] == 2) {          // show error message if user entered more than 28 days in february
            if(finalResult[0] > 28) {
                for (let i = 0; i < 3; i++) {
                    texts[i].style.color = "var(--light-red)"
                    errors[0].style.display = "block"
                    errors[0].innerHTML = "Must be a valid Date"
                    inputs[i].style.border = "1px solid var(--light-red)"
                    inputs[i].classList.add("inputs-red")
                }
                finalResult.splice(0, 1, 0)
            }
        }
    }
    if(!(finalResult.includes(0))) {
        function calcDates(a) {          // calculate difference between todays date and users date
            let years = 0;
            let months = 0;
            let days = 0;
            years = date.getFullYear() - a[2]
            if((date.getMonth() + 1) <= a[1]) {
                if(!(years - 1 < 0)) {
                    years -= 1
                    months = ((date.getMonth() + 1) + 12) - a[1]
                }   
            } else {
                months = (date.getMonth() + 1) - a[1]
            }
            if(date.getDate() < a[0]) {
                months -= 1;
                if(date.getMonth() == 4 || date.getMonth() == 6 || date.getMonth() == 9 || date.getMonth() == 11) {
                    days = (date.getDate() + 30) - a[0]
                } else if(date.getMonth() == 2) {
                    days = (date.getDate() + 28) - a[0]
                } else {
                    days = (date.getDate() + 31) - a[0]
                }
            } else {
                days = date.getDate() - a[0]
            }
            return [years, months, days]   
        }
        answers.map(answer => {
            setTimeout(() => {
                answer.style.setProperty("--answer", `"${calcDates(finalResult)[answers.indexOf(answer)]}"`)          // replace "- -" in answer with final answer 
                answer.style.setProperty("--animation", "changeToNumbers 0.5s ease-in-out")          // add animations to changing numbers
            }, 200)
        })
    }
    e.preventDefault()          // prevent refreshing of page after submission
})

//********************************************* */

//* change color of submit button on hover */

button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "var(--off-black)"
})
button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "var(--purple)"
})

//***************** */

//* change horizontal line in the middle of box for mobile and back /

const width = window.innerWidth
const line = document.querySelector(".separator")
if(width <= 375) {
    line.innerHTML = `
    <hr>
    <button type="submit" form="date" value="submit">
        <img src="assets/images/icon-arrow.svg" alt="arrow">
    </button>
    <hr>
    `
}
window.addEventListener("resize", () => {
    if(width <= 375) {
        line.innerHTML = `
        <hr>
        <button type="submit" form="date" value="submit">
            <img src="assets/images/icon-arrow.svg" alt="arrow">
        </button>
        <hr>
        `
    } else {
        line.innerHTML = `
        <hr>
        <button type="submit" form="date" value="submit">
            <img src="assets/images/icon-arrow.svg" alt="arrow">
        </button>
        `
    }
})

//***************** */



