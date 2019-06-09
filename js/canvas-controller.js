
let canvas;
let ctx;


function init() {    
    createMeme()
    createCanvas()
    renderTxtsEditor()
}



function renderTxtsEditor() {
    var strHtml = gMeme.txts.map(function (txt, idx) {
        return `

                  <p>


                    <input type="text" data-property="line" placeholder="${txt.line}" oninput="editTxt(this,${idx})">
                    <i class="fas fa-text-height"></i> <input type="range" value="${txt.size}"  min="10" step="2" data-property="size" oninput="editTxt(this ,${idx})">
                    <input type="color" value="${txt.color}" data-property="color" oninput="editTxt(this,${idx})">
                    Font: 
                    <select data-property="font" oninput="editTxt(this,${idx})">
                    <option value="${txt.font}">${txt.font}</option>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Verdana">Verdana</option>
                     <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    </select>
                    <br>

                    <p>
                    <i class="fas fa-arrows-alt-h"></i> <input type="number" value="${txt.x}"  min="0" step="5" data-property="x" oninput="editTxt(this ,${idx})">
                    <i class="fas fa-arrows-alt-v"></i> <input type="number" value="${txt.y}"  min="0" step="5" data-property="y" oninput="editTxt(this ,${idx})">

                    <select data-property="align" oninput="editTxt(this,${idx})">
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                     </select>
                    </p>


                       <button class="btn"onclick="newTxtBtnClicked()">
                    <i class="fas fa-plus"></i> Add Line
                </button>
                    </p>
                    <br>

        
        `
    })
        .join(' ');

    document.querySelector('.choice-wrapper').innerHTML = strHtml;

}

function editTxt(elinput, txtIdx) {
    var property = elinput.dataset.property;  // using data-* attributes
    var value;
    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value;
            break;
        case 'checkbox':
            value = elinput.checked;
            break;
        default: // text, number
            value = elinput.value;
            break;
    }
    gMeme.txts[txtIdx][property] = value;


    createCanvas();
}


 function createCanvas(){
    let imgId = onLoadImg();
    // let canvas = getCanvas();
    // let ctx = getCtx()
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext("2d");
    var img = new Image()
    img.src = `meme-imgs/${imgId}.jpg`
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.height, canvas.width);

        gMeme.txts.forEach(function (txt) {
            drawTxt(txt);
        });
 }
}


function drawTxt(txt) {
    ctx.font = txt.size + 'px' + ' ' + txt.font;
    ctx.textAlign = txt.align;
    ctx.fillStyle = txt.color;
    ctx.fillText(txt.line, txt.x, txt.y);
}


function onChangeFont(elementName) {
    currentElement = elementName;
    switch (currentElement) {
        case 'Arial':
            ctx.font = gTxtSize + 'px ' + ' ' + ' Arial';
            ctx.fillText(gTxt, 160, 150);
            break;
        case 'Times New Roman':
            ctx.font = gTxtSize + 'px ' + ' ' + 'Times New Roman';
            ctx.fillText(gTxt, 160, 150);  
                      break;
        case 'Helvetica':
            ctx.font = gTxtSize + 'px ' + ' ' + ' Helvetica';
            ctx.fillText(gTxt, 160, 150);
            break;
        case 'Verdana':
            ctx.font = gTxtSize + 'px ' + ' ' + ' Verdana';
            ctx.fillText(gTxt, 160, 150);
            break;
        case 'Tahoma':
            ctx.font = gTxtSize + 'px ' + ' ' + ' Verdana';
            ctx.fillText(gTxt, 160, 150);
            break;
        case 'Geneva':
            ctx.font = gTxtSize + 'px ' + ' ' + ' Verdana';
            ctx.fillText(gTxt, 160, 150);
            break;
    }
}


function newTxtBtnClicked() {
    gMeme.txts.push(createTxt('New Line', 150, 150));
    createCanvas()
    renderTxtsEditor();
}




function downloadCanvas(elLink) {
    var data = canvas.toDataURL();
    elLink.href = data;

}



function onLoadImg() {
    return loadImg();
}

function onClearCanvas() {
    clearCanvas();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}





// upload

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}


function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}
