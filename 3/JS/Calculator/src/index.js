// const currentInput = ""
const appendNumber = (number) => {
    document.getElementById("display").value += number;
}

const appendOperator = (operator) => {
    document.getElementById("display").value += operator;
}

const clearDisplay = () => {
    document.getElementById("display").value = "";
}

const calculate = () => {
    try{
        document.getElementById("display").value = eval(document.getElementById("display").value);
    }
    catch(error){
        document.getElementById("display").value = "Error"
    }
}

const backSpace = () => {
    let currentInput = document.getElementById("display").value;
    if(currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        document.getElementById("display").value = currentInput;
    }
}