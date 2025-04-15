/**
 * signature.js
 * uc11cuba85 ucea0ubc84uc2a4uc640 uad00ub828ub41c uae30ub2a5uc744 uad00ub9acud569ub2c8ub2e4.
 */

let canvas;
let ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// uc800uc7a5ub41c uc11cuba85 ubc30uc5f4
let savedSignatures = [];

// ud604uc7ac uc120ud0ddub41c uc11cuba85 uc778ub371uc2a4
let selectedSignatureIndex = -1;

/**
 * uc11cuba85 ucea0ubc84uc2a4 ucd08uae30ud654
 */
function initSignatureCanvas() {
    canvas = document.getElementById('signature-canvas');
    ctx = canvas.getContext('2d');
    
    // ucea0ubc84uc2a4 ubc30uacbd ubc0f uc2a4ud0c0uc77c uc124uc815
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // uc774ubca4ud2b8 ub9acuc2a4ub108 ub4f1ub85d
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // ud130uce58 uc774ubca4ud2b8 uc9c0uc6d0
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
}

/**
 * ud130uce58 uc2a4ud06cub9b0 uc774ubca4ud2b8 ucc98ub9ac
 */
function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    isDrawing = true;
    lastX = touchX;
    lastY = touchY;
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
    
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(touchX, touchY);
    ctx.stroke();
    
    lastX = touchX;
    lastY = touchY;
}

/**
 * uadf8ub9acuae30 uc2dcuc791
 */
function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
}

/**
 * uadf8ub9acuae30 
 */
function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    [lastX, lastY] = [currentX, currentY];
}

/**
 * uadf8ub9acuae30 uc911ub2e8
 */
function stopDrawing() {
    isDrawing = false;
}

/**
 * ucea0ubc84uc2a4 ube44uc6b0uae30
 */
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    selectedSignatureIndex = -1;
}

/**
 * uc11cuba85 uc800uc7a5
 */
function saveSignature() {
    const signatureData = canvas.toDataURL('image/png');
    savedSignatures.push(signatureData);
    saveSignaturesToStorage();
    renderSavedSignatures();
    clearCanvas();
}

/**
 * uc11cuba85 uc800uc7a5uc18cuc5d0 uc800uc7a5
 */
function saveSignaturesToStorage() {
    try {
        localStorage.setItem('savedSignatures', JSON.stringify(savedSignatures));
    } catch (e) {
        console.error('uc11cuba85 uc800uc7a5 uc624ub958:', e);
    }
}

/**
 * uc800uc7a5uc18cuc5d0uc11c uc11cuba85 ubd88ub7ecuc624uae30
 */
function loadSignaturesFromStorage() {
    try {
        const storedSignatures = localStorage.getItem('savedSignatures');
        if (storedSignatures) {
            savedSignatures = JSON.parse(storedSignatures);
            renderSavedSignatures();
        }
    } catch (e) {
        console.error('uc11cuba85 ubd88ub7ecuc624uae30 uc624ub958:', e);
    }
}

/**
 * uc800uc7a5ub41c uc11cuba85 ud654uba74uc5d0 ub80cub354ub9c1
 */
function renderSavedSignatures() {
    const container = document.getElementById('saved-signatures');
    container.innerHTML = '';
    
    if (savedSignatures.length === 0) {
        container.innerHTML = '<p>uc800uc7a5ub41c uc11cuba85uc774 uc5c6uc2b5ub2c8ub2e4.</p>';
        return;
    }
    
    savedSignatures.forEach((signature, index) => {
        const signatureItem = document.createElement('div');
        signatureItem.className = 'saved-signature-item';
        if (index === selectedSignatureIndex) {
            signatureItem.classList.add('selected');
        }
        
        const img = document.createElement('img');
        img.src = signature;
        img.alt = `uc11cuba85 ${index + 1}`;
        
        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'saved-signature-delete';
        deleteBtn.innerHTML = 'X';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSignature(index);
        });
        
        signatureItem.appendChild(img);
        signatureItem.appendChild(deleteBtn);
        
        signatureItem.addEventListener('click', () => {
            selectSignature(index);
        });
        
        container.appendChild(signatureItem);
    });
}

/**
 * uc11cuba85 uc120ud0dd
 */
function selectSignature(index) {
    selectedSignatureIndex = index;
    // ucea0ubc84uc2a4uc5d0 uc120ud0ddub41c uc11cuba85 uadf8ub9acuae30
    clearCanvas();
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = savedSignatures[index];
    
    // uc120ud0ddub41c uc544uc774ud15c UI uc5c5ub370uc774ud2b8
    renderSavedSignatures();
}

/**
 * uc11cuba85 uc0aduc81c
 */
function deleteSignature(index) {
    savedSignatures.splice(index, 1);
    saveSignaturesToStorage();
    
    if (selectedSignatureIndex === index) {
        selectedSignatureIndex = -1;
        clearCanvas();
    } else if (selectedSignatureIndex > index) {
        selectedSignatureIndex--;
    }
    
    renderSavedSignatures();
}

/**
 * uc11cuba85 uc774ubbf8uc9c0 uac00uc838uc624uae30
 */
function getSelectedSignatureImage() {
    if (selectedSignatureIndex >= 0 && selectedSignatureIndex < savedSignatures.length) {
        return savedSignatures[selectedSignatureIndex];
    }
    
    // ud604uc7ac uadf8ub824uc9c4 ucea0ubc84uc2a4 uc0acuc6a9
    return canvas.toDataURL('image/png');
}

// uc678ubd80ub85c ub178ucd9cud560 ud568uc218
window.SignatureManager = {
    init: initSignatureCanvas,
    clear: clearCanvas,
    save: saveSignature,
    load: loadSignaturesFromStorage,
    getSelectedImage: getSelectedSignatureImage
};
