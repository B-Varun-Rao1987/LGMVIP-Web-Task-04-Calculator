(function(){
    "use strict";
    const toggleBtn=document.querySelector('.toggle button');
    const main=document.querySelector('.main');
    const firBtnTag=document.querySelector('.fir');
    const secBtnTag=document.querySelector('.sec');
    toggleBtn.addEventListener('click',function(){
        if(main.classList.contains('active')===true){
            main.classList.remove('active');
            firBtnTag.innerHTML="+ -";
            secBtnTag.innerHTML="x =";
        }
        else{
            main.classList.add("active");
            firBtnTag.innerHTML="√ π";
            secBtnTag.innerHTML="e =";
        }
    })

    let resClick=false;
    const angleSpan=document.querySelector('.screen span');
    const screen=document.querySelector('.type-window .input');
    const result=document.querySelector('.result-window');

    let exprn="";
    
    const innBtns=document.querySelectorAll('.btn div');
    let angle="rad";


    function sqrootHandle(expr){
        let sqroot="√";
        let sqRootInd=[];
            let j=0;
            while(true){
                j=expr.indexOf(sqroot,j);
                if(j>=0){
                    sqRootInd.push(j);
                    j++;
                }
                else
                    break;
            }
            
        if(sqRootInd.length!==0){
            for(let i=0;i<sqRootInd.length;i++){
                let startValInd=sqRootInd[i]+1;
                let val="";
                let prefixString;
                if(startValInd!==1)
                    prefixString=expr.slice(0,startValInd-1);
                else
                    prefixString=expr.slice(2,startValInd);
                let postFixString="";
                for(let j=startValInd+1;j<expr.length;j++){
                    if(expr[j]===")" ){
                        if(j!==expr.length-1)
                            postFixString=expr.slice(j);
                        else
                            postFixString=")";
                        break;
                    }
                    val+=expr[j];
                }
                for(let j=i+1;j<sqRootInd.length;j++){
                        sqRootInd[j]+=3;
                }
                val="sqrt("+val;
                expr=prefixString+val+postFixString;
            }
        }
        return expr;
    }

    function changeVal(expr,x){
        let trigFuncs=['sin','cos','tan'];
        let trigInd=[];
        for(let i=0;i<trigFuncs.length;i++){
            let j=0;
            while(true){
                j=expr.indexOf(trigFuncs[i],j);
                if(j>=0){
                    trigInd.push(j);
                    j++;
                }
                else
                    break;
            }
        }
        if(trigInd.length!==0){
            for(let i=0;i<trigInd.length;i++){
                let startValInd=trigInd[i]+4;
                let val="";
                let prefixString=expr.slice(0,startValInd);
                
                let postFixString="";
                for(let j=startValInd;j<expr.length;j++){
                    if(expr[j]===")" ){
                        if(j!==expr.length-1)
                        postFixString=expr.slice(j);
                        else
                        postFixString=")";
                        break;
                    }
                    val+=expr[j];
                }
                
                val+=x;
                expr=prefixString+val+postFixString;
            }
        }
        return expr;
    }

    let isSqRootPresent=false;
    let isPIPresent=false;
    let isLogPresent=false;
    innBtns.forEach(btn=>{
        btn.addEventListener('click',function(e){
            const valItem=e.target;
            if(valItem.classList.contains('del')){
                let expVal=screen.value; 
                let delExpChar=expVal[expVal.length-1];
                if(delExpChar==="π"){
                    let pilen=(Math.PI+"").length;
                    let eEnd=expVal.length-1;
                    let rEnd=exprn.length-1;
                    if(eEnd>=0 && rEnd>=0){
                        expVal=expVal.slice(0,eEnd);
                        exprn=exprn.slice(0,rEnd-pilen+1);
                    }
                    else{
                        expVal=expVal.slice(0,eEnd);
                        exprn=exprn.slice(0,rEnd);
                    }
                    screen.value=expVal;
                }           
                else if(delExpChar==="√"){
                    let eEnd=expVal.length-1;
                    let rEnd=exprn.length-1;
                    if(eEnd>=0 && rEnd>=0){
                        expVal=expVal.slice(0,eEnd);
                        if(rEnd!==3)
                            exprn=exprn.slice(0,rEnd-4+1);
                        else{
                            exprn="";
                        }
                    }
                    screen.value=expVal;
                }
                else if(delExpChar==="g"){    
                    let eEnd=expVal.length-1;
                    let rEnd=exprn.length-1;
                    if(eEnd>=0 && rEnd>=0){
                        if(eEnd!=2){
                            expVal=expVal.slice(0,eEnd-3+1);
                        }
                        else{
                            expVal="";
                        } 
                        if(rEnd!==4)
                            exprn=exprn.slice(0,rEnd-5+1);
                        else{
                            exprn="";
                        }
                    }
                    screen.value=expVal;
                }
                else if(delExpChar==="n" && expVal[expVal.length-2]==="l"){
                    let eEnd=expVal.length-1;
                    let rEnd=exprn.length-1;
                    if(eEnd>=0 && rEnd>=0){
                        if(eEnd!=1){
                            expVal=expVal.slice(0,eEnd-2+1);
                        }
                        else{
                            expVal="";
                        }    
                        if(rEnd!==2)
                            exprn=exprn.slice(0,rEnd-3+1);
                        else{
                            exprn="";
                        }              
                    }
                    screen.value=expVal;
                }
                else if((delExpChar==="n" && (expVal[expVal.length-2]==="i" || expVal[expVal.length-2]==="a"))||(delExpChar==="s")){
                    let eEnd=expVal.length-1;
                    let rEnd=exprn.length-1;
                    if(eEnd>=0 && rEnd>=0){
                        if(eEnd!=2){
                            expVal=expVal.slice(0,eEnd-3+1);
                        }
                        else{
                            expVal="";
                        } 
                        if(exprn[rEnd]!=="n" || exprn[rEnd]!=="s"){
                            let count=0;
                            let counter=rEnd;
                            while(exprn[counter]!=="("){
                                count++;
                                counter--;
                            }
                            count+=4;
                            if(rEnd===(count-1))
                                exprn="";
                            else
                                exprn=exprn.slice(0,rEnd-count+1);
                        }
                        else{
                            if(rEnd!==2)
                                exprn=exprn.slice(0,rEnd-3+1);
                            else{
                                exprn="";
                            }
                        }
                        screen.value=expVal;
                    }
                }
                else{
                    expVal=expVal.slice(0,expVal.length-1);
                    exprn=exprn.slice(0,exprn.length-1);
                    screen.value=expVal;
                }
            }
            else if(valItem.classList.contains('openBr')){
                if(valItem.innerText==="log"){
                    exprn+="log10(";
                    screen.value+="log(";
                }
                else if(valItem.innerText==="ln"){
                    exprn+="log(";
                    screen.value+="ln(";
                }
                else{
                    exprn+=valItem.innerText+'(';
                    screen.value+=valItem.innerText+'(';
                }
            }
            else if(valItem.innerText==='C'){
                exprn="";
                screen.value="";
                result.innerText="";
                angleSpan.innerText="";
                angle="rad";
                resClick=false;
            }
            else if(valItem.innerText==='√('){
                exprn+="sqrt(";
                screen.value+="√(";
            }
            else if(valItem.innerText==='deg'){
                if(exprn.search("sin")!==-1 || exprn.search("cos")!==-1 || exprn.search("tan")!==-1){
                    if(angle==="rad"){
                        exprn=changeVal(exprn,"*0.0174533");
                        angle="deg";
                        angleSpan.innerText=angle;
                    }
                    resClick=true;
                }
            }
            else if(valItem.innerText==='rad'){
                if(exprn.search("sin")!==-1 || exprn.search("cos")!==-1 || exprn.search("tan")!==-1){
                    angleSpan.innerText=angle;        
                    if(angle==="deg"){
                        exprn=changeVal(exprn,"*57.2958");
                        angle="rad";
                        angleSpan.innerText=angle;
                    }
                    resClick=true;
                }
            }
            else if(valItem.innerText==="x"){
                exprn+="*";
                screen.value+=valItem.innerText;
            }
            else if(valItem.innerText==="÷"){
                exprn+="/";
                screen.value+=valItem.innerText;
            }
            else if(valItem.innerText==="π"){
                let pi=Math.PI;
                exprn+=pi;
                isPIPresent=true;
                screen.value+="π";
            }
            else if(valItem.innerText==="00"){
                let scVal=screen.value;
                if(scVal===""){
                    exprn+="0";
                    screen.value="0";
                }
                else if(scVal.search("0.")!==-1){
                    exprn+="00";
                    screen.value+="00";
                }
                else if(scVal==="0"){
                    exprn="0";
                }
                else{
                    exprn+="00";
                    screen.value+="00";
                }
            }
            else if(valItem.innerText==="0"){
                let scVal=screen.value;
                if(scVal===""){
                    exprn+="0";
                    screen.value="0";
                }
                else if(scVal.search("0.")!==-1){
                    exprn+="0";
                    screen.value+="0";
                }
                else if(scVal==="0"){
                    exprn="0";
                }
                else{
                    exprn+="0";
                    screen.value+="0";
                }
            }
            else if(valItem.innerText==="inv"){
                screen.value=`1÷(${screen.value}`;
                exprn=`1/(${exprn}`;
            }
            else{
                exprn+=valItem.innerText;
                screen.value+=valItem.innerText;
            }
            if(resClick && (exprn.search("sin")!==-1 || exprn.search("cos")!==-1 || exprn.search("tan")!==-1)){
                let res;
                try{
                    res=math.evaluate(exprn);
                    if (!isFinite(res)) {
                        throw new Error('Invalid expression');
                    }
                    resClick=false;
                }
                catch(e){
                    if(exprn.length>=2 && 
                        (exprn[exprn.length-1]==='s' && exprn[exprn.length-2]==='o'
                        || exprn[exprn.length-1]==='n' && exprn[exprn.length-2]==='a'
                        || exprn[exprn.length-1]==='n' && exprn[exprn.length-2]==='i')){
                            if(exprn.length!==3)
                                exprn=exprn.slice(0,exprn.length-1-3+1);
                            else
                                exprn="";
                            if(screen.value.length!==3)
                                screen.value=screen.value.slice(0,screen.value.length-1-3+1);
                            else
                                screen.value="";
                        resClick=false;
                    }
                    
                    res="";
                    angleSpan.innerText="";
                }
                if(res!="")
                    angleSpan.innerText=angle;
                result.innerText=res;
                resClick=false;
            }   
            else{
                resClick=false;
                result.innerText="";
            }
        });
    }) 

    function evaluateExp(exp){
        let res="";
        try{
            res=math.evaluate(exp);
            if (!isFinite(res)) {
                throw new Error('Invalid expression');
            }
        }
        catch(e){
            res="Syntax Error!";
        }
        return res;
    }

    const resBtn=document.querySelector('.resBtn');

    resBtn.addEventListener('click',function(){
        if(isSqRootPresent || exprn.search("√")!==-1){
            isSqRootPresent=true;
            exprn=sqrootHandle(exprn);
        }
        if(exprn.search("log")!==-1 || exprn.search("ln")!==-1){
            isLogPresent=true;
        }
        if(exprn.search("π")!==-1)
            isPIPresent=true;
        if(resClick===true){
            resClick=false;
            if(result.innerText!=="Syntax Error!"){
                screen.value=result.innerText;
                exprn=result.innerText;
                if(exprn.search("sin")!==-1 || exprn.search("cos")!==-1 || exprn.search("tan")!==-1){
                    angleSpan.innerText=angle;
                }
                else{
                    angleSpan.innerText="";
                }
            }
            result.innerText="";

        }
        else if(exprn!=="" && resClick===false){
            resClick=true;
            if(exprn==="0")
                result.innerText="0";
            else{
                if(exprn.search("sin")!==-1 || exprn.search("cos")!==-1 || exprn.search("tan")!==-1){
                    angleSpan.innerText=angle;
                }
                else{
                    angleSpan.innerText="";
                }
                result.innerText=evaluateExp(exprn);
            }
        }
    });
})();
    