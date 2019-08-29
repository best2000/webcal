function tokenizer(str) {
    function is_letter(c) {
        if (c == undefined) {
            return false;
        }
        else if (c.length == 1) {
            var code = c.charCodeAt(0);
            var begin = 'a'.charCodeAt(0);
            var end = 'z'.charCodeAt(0);
            if (code >= begin && code <= end || code >= 65 && code <= 90) {
                return true;
            }
        }
        return false;
    }
    function is_digit(c) {
        if (c == undefined) {
            return false;
        }
        else if (c.length == 1) {
            var code = c.charCodeAt(0);
            var begin = '0'.charCodeAt(0);
            var end = '9'.charCodeAt(0);
            if (code >= begin && code <= end) {
                return true;
            }
        }
        return false;
    }
    // defines types of tokens 
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["INVALID"] = 0] = "INVALID";
        TokenType[TokenType["STOP"] = 1] = "STOP";
        TokenType[TokenType["OPERATOR"] = 2] = "OPERATOR";
        TokenType[TokenType["LITERAL"] = 3] = "LITERAL";
        TokenType[TokenType["L_PAREN"] = 4] = "L_PAREN";
        TokenType[TokenType["R_PAREN"] = 5] = "R_PAREN";
        TokenType[TokenType["VAR"] = 6] = "VAR"; // variable (e.g. 'x1', 'y0', ...)
    })(TokenType || (TokenType = {}));
    var Tokenizer = /** @class */ (function () {
        function Tokenizer(str) {
            if (str == undefined) {
                str = '';
            }
            this.str = str; // set the input string
        }
        Tokenizer.prototype.next = function () {
            console.log("str = " + this.str);
            //create Token object name t
            var t = {
                type: null,
                value: ""
            };
            //loop for one token per turn of xxx.next() 
            //check for token type then return token object 
            var i = 0;
            while (i < this.str.length) {
                //if it a " " space then i+1 and go for next turn
                while (this.str[i] == " ") {
                    i = i + 1;
                }
                //if it number at first
                if (is_digit(this.str[i]) == true) {
                    var numval = "";
                    //check if it a >1 digit number
                    while (true) {
                        if (is_digit(this.str[i]) == false && this.str[i] != ".") {
                            break;
                        }
                        numval = numval + this.str[i];
                        i = i + 1;
                    }
                    this.str = this.str.slice(i);
                    t = {
                        type: TokenType.LITERAL,
                        value: numval
                    };
                    return t;
                }
                //if it varr at first
                else if (is_letter(this.str[i]) == true) {
                    var varval = "";
                    //check until end of varr that mean found operator or paren
                    while (true) {
                        if (this.str[i] == "+" || this.str[i] == "-" || this.str[i] == "*" || this.str[i] == "/" || this.str[i] == "(" || this.str[i] == ")") {
                            break;
                        }
                        varval = varval + this.str[i];
                        i = i + 1;
                    }
                    this.str = this.str.slice(i);
                    t = {
                        type: TokenType.VAR,
                        value: varval
                    };
                    return t;
                }
                //if it operator at first
                else if (this.str[i] == "+" || this.str[i] == "-" || this.str[i] == "*" || this.str[i] == "/" || this.str[i] == "!") {
                    t = {
                        type: TokenType.OPERATOR,
                        value: this.str[i]
                    };
                    //cut the already token string
                    this.str = this.str.slice(i + 1);
                    return t;
                }
                //if it open paren "("
                else if (this.str[i] == "(") {
                    t = {
                        type: TokenType.L_PAREN,
                        value: this.str[i]
                    };
                    this.str = this.str.slice(i + 1);
                    return t;
                }
                //if it close paren ")"
                else if (this.str[i] == ")") {
                    t = {
                        type: TokenType.R_PAREN,
                        value: this.str[i]
                    };
                    this.str = this.str.slice(i + 1);
                    return t;
                }
                //if it is invalid return object with invalid token type 
                else {
                    t = {
                        type: TokenType.INVALID,
                        value: ""
                    };
                    return t;
                }
            }
            //if it here so it end
            t = {
                type: TokenType.STOP,
                value: ""
            };
            return t;
        };
        return Tokenizer;
    }());
    var tokens = [];
    var tokenizer = new Tokenizer(str);
    while (true) {
        var t = tokenizer.next();
        if (t == null || t.type == TokenType.STOP) { // no more token 
            console.log('Tokenizer finished...');
            break;
        }
        if (t.type == TokenType.INVALID) {
            console.log('Invalid token found...');
            break;
        }
        tokens.push(t);
    }
    //console.log(tokens)
    return tokens;
}
function autoTree(tokenLis) {
    var node = /** @class */ (function () {
        //constructor 
        function node(data) {
            //field 
            this.data = null;
            this.left = null;
            this.right = null;
            this.data = data;
        }
        return node;
    }());
    function rootToken(tokenLis) {
        //console.log("__rootToken__")
        //useless paren check
        var pl = 0;
        var pr = 0;
        var i = 0;
        while (i < tokenLis.length) {
            if (tokenLis[i].type == 4 && tokenLis[i].value == "(") {
                pl = pl + 1;
            }
            else if (tokenLis[i].type == 5 && tokenLis[i].value == ")") {
                pr = pr + 1;
            }
            i = i + 1;
        }
        while (tokenLis[0].value == "(" && tokenLis[tokenLis.length - 1].value == ")" && pl == pr) {
            tokenLis = tokenLis.slice(1, -1);
        }
        //check end
        tokenLis2 = tokenLis;
        //console.log(tokenLis)
        var paBalan = 0;
        i = 0;
        while (i < tokenLis.length) {
            //console.log("here1")
            if (tokenLis[i].type == 4 && tokenLis[i].value == "(") {
                paBalan = paBalan + 1;
            }
            else if (tokenLis[i].type == 5 && tokenLis[i].value == ")") {
                paBalan = paBalan - 1;
            }
            //out of paren
            else if (paBalan == 0) {
                if (tokenLis[i].type == 2 && tokenLis[i].value == "+") {
                    cRootIndexNode = tokenLis[i];
                    cRootIndex = i;
                    return null;
                }
            }
            i = i + 1;
        }
        paBalan = 0;
        i = 0;
        while (i < tokenLis.length) {
            //console.log("here2")
            if (tokenLis[i].type == 4 && tokenLis[i].value == "(") {
                paBalan = paBalan + 1;
            }
            else if (tokenLis[i].type == 5 && tokenLis[i].value == ")") {
                paBalan = paBalan - 1;
            }
            //out of paren
            else if (paBalan == 0) {
                if (tokenLis[i].type == 2 && tokenLis[i].value == "*") {
                    cRootIndexNode = tokenLis[i];
                    cRootIndex = i;
                    return null;
                }
            }
            i = i + 1;
        }
        paBalan = 0;
        i = 0;
        while (i < tokenLis.length) {
            //console.log("here3")
            if (tokenLis[i].type == 4 && tokenLis[i].value == "(") {
                paBalan = paBalan + 1;
            }
            else if (tokenLis[i].type == 5 && tokenLis[i].value == ")") {
                paBalan = paBalan - 1;
            }
            //out of paren
            else if (paBalan == 0) {
                if (tokenLis[i].type == 2 && tokenLis[i].value == "!") {
                    cRootIndexNode = tokenLis[i];
                    cRootIndex = i;
                    return null;
                }
            }
            i = i + 1;
        }
        return tokenLis;
    }
    var tempNodeLis = [];
    var root = null;
    var cRootIndexNode = null;
    var cRootIndex = null;
    var cNodeL = null;
    var cNodeR = null;
    var tokenLis2 = null;
    var c = "00";
    console.log("__tokenLis__");
    console.log(tokenLis);
    rootToken(tokenLis);
    console.log("__tokenLis2__");
    console.log(tokenLis2);
    console.log("__cRootIndexNode__");
    console.log(cRootIndexNode);
    console.log("__cRootIndex__");
    console.log(cRootIndex);
    var cNode = new node(cRootIndexNode);
    root = cNode;
    //if it '!' or '*','+' then add left/right node
    if (cRootIndexNode.value == "!") {
        var newNodeL = tokenLis2.slice(cRootIndex + 1);
        //if it !(x)
        if (newNodeL.length == 3 && newNodeL[0].value == "(" && newNodeL[2].value == ")") {
            cNodeL = new node(newNodeL[1]);
            c = "00";
        }
        else if (newNodeL.length == 1) {
            cNodeL = new node(newNodeL[0]);
            c = "00";
        }
        else {
            cNodeL = new node(newNodeL);
            c = "10";
        }
    }
    else {
        var newNodeL = tokenLis2.slice(0, cRootIndex);
        var newNodeR = tokenLis2.slice(cRootIndex + 1);
        if (newNodeL.length == 1 && newNodeR.length == 1) {
            cNodeL = new node(newNodeL[0]);
            cNodeR = new node(newNodeR[0]);
            c = "00";
        }
        else if (newNodeL.length > 1 && newNodeR.length > 1) {
            cNodeL = new node(newNodeL);
            cNodeR = new node(newNodeR);
            c = "11";
        }
        else if (newNodeL.length == 1 && newNodeR.length > 1) {
            cNodeL = new node(newNodeL[0]);
            cNodeR = new node(newNodeR);
            c = "01";
        }
        else if (newNodeL.length > 1 && newNodeR.length == 1) {
            cNodeL = new node(newNodeL);
            cNodeR = new node(newNodeR[0]);
            c = "10";
        }
    }
    cNode.left = cNodeL;
    cNode.right = cNodeR;
    if (c[0] == "1") {
        tempNodeLis.push(cNodeL);
    }
    if (c[1] == "1") {
        tempNodeLis.push(cNodeR);
    }
    console.log("__tempNODELIST.node.data__");
    for (var i in tempNodeLis) {
        console.log(tempNodeLis[i].data);
    }
    console.log("---------------------------");
    //console.log(tempNodeLis)
    //console.log("------")
    while (tempNodeLis.length > 0) {
        //get current node
        cNode = tempNodeLis.shift();
        //reset all varry
        console.log("__cNode.data__");
        console.log(cNode.data);
        rootToken(cNode.data);
        console.log("__tokenLis2__");
        console.log(tokenLis2);
        console.log("__cRootIndexNode__");
        console.log(cRootIndexNode);
        console.log("__cRootIndex__");
        console.log(cRootIndex);
        cNodeL = null;
        cNodeR = null;
        //if it '!' or '*','+' then add left/right node
        if (cRootIndexNode.value == "!") {
            var newNodeL = tokenLis2.slice(cRootIndex + 1);
            if (newNodeL.length == 3 && newNodeL[0].value == "(" && newNodeL[2].value == ")") {
                cNodeL = new node(newNodeL[1]);
                c = "00";
            }
            else if (newNodeL.length == 1) {
                cNodeL = new node(newNodeL[0]);
                c = "00";
            }
            else {
                cNodeL = new node(newNodeL);
                c = "10";
            }
        }
        else {
            var newNodeL = tokenLis2.slice(0, cRootIndex);
            var newNodeR = tokenLis2.slice(cRootIndex + 1);
            if (newNodeL.length == 1 && newNodeR.length == 1) {
                cNodeL = new node(newNodeL[0]);
                cNodeR = new node(newNodeR[0]);
                c = "00";
            }
            else if (newNodeL.length > 1 && newNodeR.length > 1) {
                cNodeL = new node(newNodeL);
                cNodeR = new node(newNodeR);
                c = "11";
            }
            else if (newNodeL.length == 1 && newNodeR.length > 1) {
                cNodeL = new node(newNodeL[0]);
                cNodeR = new node(newNodeR);
                c = "01";
            }
            else if (newNodeL.length > 1 && newNodeR.length == 1) {
                cNodeL = new node(newNodeL);
                cNodeR = new node(newNodeR[0]);
                c = "10";
            }
        }
        cNode.left = cNodeL;
        cNode.right = cNodeR;
        if (c[0] == "1") {
            tempNodeLis.push(cNodeL);
        }
        if (c[1] == "1") {
            tempNodeLis.push(cNodeR);
        }
        //change node data to real root
        cNode.data = cRootIndexNode;
        console.log("__tempNODELIST.node.data__");
        for (var i in tempNodeLis) {
            console.log(tempNodeLis[i].data);
        }
        console.log("---------------------------");
    }
    return root;
}
function evalExpTree(root) {
    //if empty tree
    if (root == null) {
        return null;
    }
    //if leaf 
    if (root.left == null && root.right == null) {
        //if it varr
        if (root.data.type == 6) {
            return root.data.reVal;
        }
        //if it just number
        return Number(root.data.value);
    }
    //eval left-right tree
    var leftEval = evalExpTree(root.left);
    var rightEval = evalExpTree(root.right);
    //check operation to apply
    if (root.data.type == 2) {
        if (root.data.value == "+") {
            return leftEval || rightEval;
        }
        else if (root.data.value == "*") {
            return leftEval && rightEval;
        }
        else {
            return !leftEval + rightEval;
        }
    }
}
function repeat(str, im) {
    var strLis = [];
    for (var i = 1; i <= im; i++) {
        strLis.push(str);
    }
    return strLis.join('');
}
function showTree(root) {
    var i = 0;
    var reLis = "";
    reLis = "__showTree__\n";
    function showTreeRec(root) {
        reLis = reLis + (repeat("  ", i) + root.data.value + "\n");
        if (root.left != null) {
            i = i + 1;
            showTreeRec(root.left);
        }
        if (root.right != null) {
            showTreeRec(root.right);
            i = i - 1;
        }
    }
    showTreeRec(root);
    return reLis;
}

var a = tokenizer("!(!a*(!b))");
var root = autoTree(a);
console.log("__RESULT__");
console.log(evalExpTree(root));
console.log(showTree(root));
