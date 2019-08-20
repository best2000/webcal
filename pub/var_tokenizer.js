function spaceSkipper(str, i) {
    while (str[i] == " ") {
        i = i + 1;
    }
    //console.log("__spaceSkip i__")
    //console.log(i)
    //console.log("__spaceSkip str[i]__")
    //console.log(str[i])
    //console.log("---------------------------")
    return i;
}
function varrTokenObj(str) {
    var varDict = {};
    var Var = "";
    var VarVal = "";
    var stat = 0;
    var i = 0;
    while (i < str.length) {
        //console.log("__Var__")
        //console.log(Var)
        //console.log("__VarVal__")
        //console.log(VarVal)
        //console.log("__i__")
        //console.log(i)
        //console.log("__str[i]__")
        //console.log(str[i])
        //console.log("---------------------------")
        //skip " "
        i = spaceSkipper(str, i);
        //if end of varval
        if (str[i] == ";") {
            stat = 0;
            i = i + 1;
            i = spaceSkipper(str, i);
            //add var info to dict
            varDict[Var] = VarVal;
            //reset var varval
            Var = "";
            VarVal = "";
        }
        //if stat add varval
        else if (str[i] == "=") {
            stat = 1;
            i = i + 1;
            i = spaceSkipper(str, i);
        }
        //console.log("__beforeStatCheck__")
        //console.log(stat)
        //console.log("__beforeStatCheck i__")
        //console.log(i)
        //console.log("__beforeStatCheck str[i]__")
        //console.log(str[i])
        //console.log("---------------------------")
        //add str[i] to var/varval varriable
        if (stat == 0) {
            Var = Var + str[i];
        }
        else {
            VarVal = VarVal + str[i];
        }
        i = i + 1;
    }
    console.log("__varDict__");
    console.log(varDict);
    console.log("---------------------------");
    return (varDict);
}
function autoVarToken() {
    var input = document.getElementById("var_textarea").value;
    console.log(input);
    var varDict = varrTokenObj(input);
}
function varTest() {
    document.getElementById("output_textarea").value = "";
    var input = document.getElementById("input_textarea").value;
    if (input != "") {
        var varDict = varrTokenObj(input);
        var varDictString = JSON.stringify(varDict);
        document.getElementById("output_textarea").value = varDictString;
    }
}
