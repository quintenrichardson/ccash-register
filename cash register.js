function checkCashRegister(price, cash, cid) {

    let changeDue = cash - price;
    let status = [];//status of cash in drawer

    let drawerTotal = 0;// total cash in register
    var quo = Math.floor(120 / 100);//finding the # of times dollar/cent amount can go into cash amount( kinda just here to remember the function to use it later in if statement)
    let cashToGive = [];
    //used to hold value of each currency unit 
    let givenCash = 0;

    const DENOMINATIONS = {
        "PENNY": .01,
        "NICKEL": .05,
        "DIME": .10,
        "QUARTER": .25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    }
    // used object keys to easily refer to currency units
    let currencyUnit = Object.keys(DENOMINATIONS);
    let worth = Object.values(DENOMINATIONS);

    for (let i = 0; i < cid.length; i++) {
        for (let j = 0; j < cid.length; j++) {
            if (typeof cid[i][j] === "number") {
                drawerTotal += cid[i][j];
            }
        }
    }
    let newDrawerTotal = parseFloat(drawerTotal);
    // planning on finding remainder of change/currency unit value and then dividing next unit (twenty)/remainder of hundred
    let hundredRem = 0;
    let twentyRem = 0;//
    let tenRem = 0;
    let fiveRem = 0;
    let dollarRem = 0;
    let quarterRem = 0;
    let dimeRem = 0;
    let nickelRem = 0;
    let pennyRem = 0;

    if (changeDue < newDrawerTotal || givenCash > 0 || givenCash === changeDue) {
        status.push("OPEN");
    } else if (changeDue == newDrawerTotal && givenCash === 0) {
        status.push("CLOSED")
    } else {

        status.push("INSUFFICIENT_FUNDS")
    };

    let realStatus = status.toString();

    //deduce initial amount
    if (changeDue > worth[8] && changeDue > cid[8][1] && Math.floor(changeDue / worth[8]) * 100 > cid[8][1]) {
        cashToGive.push(["ONE HUNDRED", Math.floor(changeDue / worth[8]) * 100]);
        hundredRem += (changeDue % worth[8]).toFixed(2);
    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["ONE HUNDRED", 0]);
        hundredRem += (changeDue % worth[8]).toFixed(2);

    } else {
        hundredRem += (changeDue % worth[8]).toFixed(2);
    };
    //deduce twenty amount
    if (hundredRem > worth[7] && hundredRem > cid[7][1] && Math.floor(hundredRem / worth[7]) * 20 < cid[7][1]) {
        cashToGive.push(["TWENTY", Math.floor(hundredRem / worth[7]) * 20]);
        twentyRem += (hundredRem % worth[7]).toFixed(2);

    } else if (hundredRem > cid[7][1] && cid[7][1] !== 0) {

        cashToGive.push(["TWENTY", cid[7][1]]);
        twentyRem += (hundredRem - cid[7][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["TWENTY", 0]);
        twentyRem += (hundredRem % worth[7]).toFixed(2);

    } else {
        twentyRem += (hundredRem % worth[7]).toFixed(2);
    };

    //deduce ten amount
    if (twentyRem > worth[6] && twentyRem > cid[6][1] && Math.floor(twentyRem / worth[6]) * 10 < cid[6][1]) {
        cashToGive.push(["TEN", Math.floor(twentyRem / worth[6]) * 10]);
        tenRem += (twentyRem % worth[6]).toFixed(2);

    } else if (twentyRem > cid[6][1] && cid[6][1] !== 0) {

        cashToGive.push(["TEN", cid[6][1]]);
        tenRem += (twentyRem - cid[6][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["TEN", 0]);
        tenRem += (twentyRem % worth[6]).toFixed(2);

    } else {
        tenRem += (twentyRem % worth[6]).toFixed(2);
    };


    //deduce initial amount
    if (tenRem > worth[5] && tenRem < cid[5][1] && Math.floor(tenRem / worth[5]) * 5 < cid[5][1]) {
        cashToGive.push(["FIVE", Math.floor(tenRem / worth[5]) * 5]);
        fiveRem += (tenRem % worth[5]).toFixed(2);
    } else if (tenRem > cid[5][1] && cid[5][1] !== 0) {

        cashToGive.push(["FIVE", cid[5][1]]);
        fiveRem += (tenRem - cid[5][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["FIVE", 0]);
        fiveRem += (tenRem % worth[5]).toFixed(2);

    } else {
        fiveRem += (tenRem % worth[5]).toFixed(2);
    };

    if (fiveRem > worth[4] && fiveRem < cid[4][1] && Math.floor(fiveRem / worth[4]) * 1 < cid[4][1]) {
        cashToGive.push(["ONE", Math.floor(fiveRem / worth[4]) * 1]);
        dollarRem += (fiveRem % worth[4]).toFixed(2);

    } else if (fiveRem > cid[4][1] && cid[4][1] !== 0) {

        cashToGive.push(["ONE", cid[4][1]]);
        dollarRem += (fiveRem - cid[4][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["ONE", 0]);
        dollarRem += (fiveRem % worth[4]).toFixed(2);

    } else {
        dollarRem += (fiveRem % worth[4]).toFixed(2);
    };

    if (dollarRem > worth[3] && dollarRem < cid[3][1] && Math.floor(dollarRem / worth[3]) * .25 < cid[3][1]) {
        cashToGive.push(["QUARTER", Math.floor(dollarRem / worth[3]) * .25]);
        quarterRem += (dollarRem % worth[3]).toFixed(2);

    } else if (dollarRem > cid[3][1] && cid[3][1] !== 0) {

        cashToGive.push(["QUARTER", cid[3][1]]);
        quarterRem += (dollarRem - cid[3][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["QUARTER", 0]);
        quarterRem += (dollarRem / worth[3] * .25);
    } else {
        quarterRem += (dollarRem % worth[3]).toFixed(2);;
    };


    if (quarterRem > worth[2] && quarterRem < cid[2][1] && Math.floor(quarterRem / worth[2]) * .1 < cid[2][1]) {
        cashToGive.push(["DIME", Math.floor(quarterRem / worth[2]) * .1]);
        dimeRem += (quarterRem % worth[2]).toFixed(2);

    } else if (quarterRem > cid[2][1] && cid[2][1] !== 0) {

        cashToGive.push(["QUARTER", cid[2][1]]);
        dimeRem += (quarterRem - cid[2][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["DIME", 0]);
        dimeRem += (quarterRem / worth[2] * .10).toFixed(2);

    } else {
        dimeRem += (quarterRem / worth[2] * .10);
    };
    console.log(dimeRem)

    if (dimeRem > worth[1] && dimeRem < cid[1][1] && Math.floor(dimeRem / worth[1]) * .05 < cid[1][1]) {
        cashToGive.push(["NICKEL", Math.floor(dimeRem / worth[1]) * .1]);
        nickelRem += (dimeRem % worth[1]).toFixed(2);

    } else if (dimeRem > cid[1][1] && cid[1][1] >= 0) {

        cashToGive.push(["NICKEL", cid[1][1]]);
        nickelRem += (dimeRem - cid[1][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["NICKEL", 0]);
        nickelRem += (dimeRem % worth[1]).toFixed(2);
    } else {
        nickelRem += (dimeRem % worth[1]).toFixed(2);
    };
    console.log(cid[0][1])

    if (nickelRem > worth[0] && nickelRem < cid[0][1] && Math.floor(nickelRem / worth[0]) * .01 < cid[0][1]) {
        cashToGive.push(["PENNY", Math.floor(nickelRem / worth[0]) * .01]);
        pennyRem += (nickelRem % worth[0]).toFixed(2);

    } else if (nickelRem > cid[0][1] && cid[0][1] >= 0) {

        cashToGive.push(["PENNY", cid[0][1]]);
        pennyRem += (dollarRem - cid[0][1]).toFixed(2);

    } else if (realStatus !== "OPEN" && realStatus !== "INSUFFICIENT_FUNDS") {
        cashToGive.push(["PENNY", cid[0][1]]);
        pennyRem += (nickelRem % worth[0]).toFixed(2);
    } else {
        pennyRem += (nickelRem % worth[0]).toFixed(2);
    };
    console.log(nickelRem)
    if (status == "CLOSED") {
        cashToGive.reverse()
    };

    if (status == "OPEN" && cashToGive.length == 0) {
        status.push("INSUFFICIENT_FUNDS");
        status.shift();
    }


    for (let i = 0; i < cashToGive.length; i++) {
        for (let j = 0; j < cashToGive.length; j++) {
            if (typeof cashToGive[i][j] === "number") {
                givenCash += cid[i][j];
            }
        }
    }

    let result = { "status": status.toString(), "change": cashToGive };

    console.log(result)
    return result;





}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);