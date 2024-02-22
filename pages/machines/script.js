 function start() { // Начало
    
    var ans = confirm("Приступаем?");
    while(true){
        if (ans) {
            alert('Жизнь продолжается, и мы должны двигаться дальше');
            showInput();
            break;
        } else {
            alert("Даже камень движется дальше");
            ans = confirm("Приступаем?");
        }
    }
    
}

function showInput() { //Вводим путь
    var length = parseFloat(prompt('Введите длину пути в км:'));
    if (length > 0 && length <= 100 && !isNaN(length)) {		
		var content = document.getElementById('content');
		content.style.display = "block";
        addEventListeners(length);
    } 
    else {
        alert("Неверный ввод! Введите число от 1 до 100.");
        showInput();
    }
}



function fuelControl(length, fuelConsumption) {
    var fuel = parseFloat(document.getElementById('fuelRange').value);
    var fuelNeeded = length * fuelConsumption;
    if (fuel >= fuelNeeded) {
        document.getElementById('result').innerHTML = ':)';
    } else {
        document.getElementById('result').innerHTML = ':(';
    }
}

function addEventListeners(length) {
    var btnMoto = document.getElementById('motoButton');
    var btnCar = document.getElementById('carButton');
    var fuelRange = document.getElementById('fuelRange');

    btnMoto.addEventListener('click', function () {
        fuelControl(length, 5);
    });

    btnCar.addEventListener('click', function () {
        fuelControl(length, 10);
    });

    fuelRange.addEventListener('input', function () {
        document.getElementById('fuelValue').textContent = fuelRange.value;
    });
}

window.addEventListener('load', start);