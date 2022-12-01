function to_decimal(n,base){
    let total = 0;
    for (let i = 0; i < n.length; i++){
        if ((n[n.length - (i+1)]) == 'A'){
            total += 10 * (base**i);
        }
        if ((n[n.length - (i+1)]) == 'B'){
            total += 11 * (base**i);
        }
        if ((n[n.length - (i+1)]) == 'C'){
            total += 12 * (base**i);
        }
        if ((n[n.length - (i+1)]) == 'D'){
            total += 13 * (base**i);
        }
        if ((n[n.length - (i+1)]) == 'E'){
            total += 14 * (base**i);
        }
        if ((n[n.length - (i+1)]) == 'F'){
            total += 15 * (base**i);
        }
        if ((n[n.length - (i+1)]) >= 0 && (n[n.length - (i+1)]) <= 9){
            total += parseInt(n[n.length - (i+1)]) * (base**i)
        }
    }
    return total;
}

function to_binary(n){
    n = parseInt(n);
    let bin = "";
    while (true){
        if (n == 1){
            bin = '1' + bin;
            return bin;
        }
        else {
            bin = (n%2).toString() + bin;
            n = Math.floor(n/2);
        }
    }
}

function binary_is_good(n,base){
    if (base == 16){
        return (n.length%4) == 0;
    }
    else {
        return (n.length%3) == 0;
    }
}

function correction_binary(n,base){
    while (!(binary_is_good(n,base))){
        n = '0' + n;
    }
    return n;
}

function to_octal(n){
    octal = "";
    n = correction_binary(n,8);
    for (let i = 0; i < Math.floor(n.length/3);i++){
        byte = "";
        for (let j = 0; j < 3;j++){
            byte += n[j+(i*3)];
        }
        octal += to_decimal(byte,2).toString();
    }
    return octal;
}

function to_hexa(n){
    hexa = "";
    n = correction_binary(n,16);
    for (let i = 0; i < Math.floor(n.length/4); i++){
        byte = "";
        for (let j = 0; j < 4; j++){
            byte += n[j+(i*4)];
        }
        dec = to_decimal(byte,2);
        if (dec == 10){
            byte = 'A';
        }
        if (dec == 11){
            byte = 'B';
        }
        if (dec == 12){
            byte = 'C';
        }
        if (dec == 13){
            byte = 'D';
        }
        if (dec == 14){
            byte = 'E';
        }
        if (dec == 15){
            byte = 'F';
        }
        if (dec <= 9){
            byte = dec.toString();
        }
        hexa += byte;
    }
    return hexa;
}

function is_correct(n,base){
    for (let i = 0; i < n.length; i++){
        if (base == 2){
            if (n[i] != '1' && n[i] != '0'){
                return false;
            }
        }
        if (base == 8){
            if (n[i] != '0' && n[i] != '1' && n[i] != '2' && n[i] != '3' && n[i] != '4' && n[i] != '5' && n[i] != '6' && n[i] != '7'){
                return false;
            }
        }
        if (base == 10){
            if (n[i] != '0' && n[i] != '1' && n[i] != '2' && n[i] != '3' && n[i] != '4' && n[i] != '5' && n[i] != '6' && n[i] != '7' && n[i] != '8' && n[i] != '9'){
                return false;
            }
        }
        if (base == 16){
            if (n[i] != '0' && n[i] != '1' && n[i] != '2' && n[i] != '3' && n[i] != '4' && n[i] != '5' && n[i] != '6' && n[i] != '7' && n[i] != '8' && n[i] != '9' && n[i] != 'A' && n[i] != 'B' && n[i] != 'C' && n[i] != 'D' && n[i] != 'E' && n[i] != 'F'){
                return false;
            }
        }
    }
    return true;
}

function menu() {
    document.getElementById('number').focus();
    let n = document.getElementById('number').value;
    document.getElementById('base2_label').className = "";
    document.getElementById('base8_label').className = "";
    document.getElementById('base10_label').className = "";
    document.getElementById('base16_label').className = "";
    var base = document.querySelector('input[name="base"]:checked').value;
    document.getElementById("base" + base + "_label").className = "underline";

    let good = true;
    if (n == 0 || n == ''){
        document.getElementById('result').innerHTML = "Votre nombre est invalide";
        good = false;
    }
    if (is_correct(n,base) == false){
        document.getElementById('result').innerHTML = "Votre nombre est incorrect avec la base";
        good = false;
    }
    if (good == true) {
        if (base == 2){
            b8 = to_octal(n);
            b10 = to_decimal(n,2);
            b16 = to_hexa(n);
            document.getElementById('result').innerHTML = "Votre nombre est " + n + " en base de 2.<br>En octal (8) : " + b8 + "<br>En décimal (10) : " + b10 + "<br>En héxadécimal (16) : " + b16;
        }
        if (base == 8){
            b10 = to_decimal(n,8);
            b2 = to_binary(b10);
            b16 = to_hexa(b2);
            document.getElementById('result').innerHTML = "Votre nombre est " + n + " en base de 8.<br>En binaire (2) : " + b2 + "<br>En décimal (10) : " + b10 + "<br>En héxadécimal (16) : " + b16;
        }
        if (base == 10){
            b2 = to_binary(n);
            b8 = to_octal(b2);
            b16 = to_hexa(b2);
            document.getElementById('result').innerHTML = "Votre nombre est " + n + " en base de 10.<br>En binaire (2) : " + b2 + "<br>En octal (8) : " + b8 + "<br>En héxadécimal (16) : " + b16;
        }
        if (base == 16){
            b10 = to_decimal(n,16);
            b2 = to_binary(b10);
            b8 = to_octal(b2);
            document.getElementById('result').innerHTML = "Votre nombre est " + n + " en base de 16.<br>En binaire (2) : " + b2 + "<br>En octal (8) : " + b8 + "<br>En décimal (10) : " + b10;
        }
    }
}