//配置
var row
var col
var size = 5    //每个图片的边长, 单位rem
var space = 1   //图片的间距, 单位rem
var dir = []    //定位

document.getElementById("box_container").style.display = "none"
document.getElementById("curtain").style.display = "block"

function easy(){
    row = 3
    col = 4
    init()
}
function normal(){
    row = 6
    col = 8
    init()
}
function hard(){
    row = 6
    col = 14
    init()
}

//初始化函数
function init(){
    generate(row,col)
    document.body.style["padding-top"] = size/2+1+"rem"
    let cnt = 0
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            let box = document.createElement("div")
            document.getElementById("box_container").appendChild(box)
            let top = i*size + (i+1)*space
            let left = j*size + (j+1)*space
            dir.push({l: left, t: top})
            box.id = cnt++
            box.className = "img_box"
            box.style.width = size+"rem"
            box.style.height = size+"rem"
            box.style.top = top+"rem"
            box.style.left = left+"rem"
            box.style["background-image"] = "url(./static/"+getImage(box.id)+".jpg)"
            box.addEventListener("click",tip)
        }
    }
    document.getElementById("box_container").style.width = col*size + (col+1)*space + "rem"
    document.getElementById("box_container").style.height = row*size + (row+1)*space + "rem"
    document.getElementById("box_container").style["background-color"] = random_color()
    //=========
    document.getElementById("box_container").style.display = "block"
    document.getElementById("curtain").style.display = "none"
    document.getElementById("settings").style.display = "none"
}

function random_color(){
    var r = Math.floor( Math.random() * 256 );
    var g = Math.floor( Math.random() * 256 );    
    var b = Math.floor( Math.random() * 256 );
    return "rgb("+r+','+g+','+b+")";
}

function tip(){
    let id = this.id
    select(id)
}

function drawLine(id1,id2,str){
    let len = str.length
    let nowx = dir[id1].l + size/2, nowy = dir[id1].t + size/2
    for(let i=0;i<len;i++){
        if(str[i]=="U"){
            createLine(nowx-0.5,nowy-(size+space)-0.5 ,1,size+1+space)
            nowx = nowx
            nowy = nowy - (size+space)
        }
        if(str[i]=="D"){
            createLine(nowx-0.5,nowy-0.5 ,1,size+1+space)
            nowx = nowx
            nowy = nowy + (size+space)
        }
        if(str[i]=="L"){
            createLine(nowx-(size+space)-0.5,nowy-0.5,size+1+space,1)
            nowx = nowx - (size+space)
            nowy = nowy 
        }
        if(str[i]=="R"){
            createLine(nowx-0.5,nowy-0.5,size+1+space,1)
            nowx = nowx + (size+space)
            nowy = nowy 
        }
    }
    disappear(id1,id2)
}

function createLine(left,top,width,height){
    let line = document.createElement("div")
    document.getElementById("box_container").appendChild(line)
    line.className = "line"
    line.style.left = left + "rem"
    line.style.top = top + "rem"
    line.style.width = width + "rem"
    line.style.height = height + "rem"
}

function disappear(id1,id2){
    let paras = document.getElementsByClassName("line")
    let len = paras.length
    setTimeout(() => {
        document.getElementById(id1).style.opacity = 0
        document.getElementById(id2).style.opacity = 0
        for(let i=0;i<len;i++){
            paras[i].style.opacity = 0
        }
    }, 1000);
    setTimeout(()=>{
        document.getElementById(id1).style.display = "none"
        document.getElementById(id2).style.display = "none"
    },1500)
}

function setOpacity(id,val){
    document.getElementById(id).style.opacity = val
}

function win(){
    document.getElementById("curtain").style.display = "block"
    document.getElementById("win").style.display = "block"
}