/**
 * taskpane.js
 * Office.js APIub97c uc0acuc6a9ud558uc5ec uc804uc790uc11cuba85uc744 ubb38uc11cuc5d0 uc0bduc785ud558ub294 uae30ub2a5uc744 uad6cud604ud569ub2c8ub2e4.
 */

// Office uc560ub4dcuc778 ucd08uae30ud654
(function () {
    "use strict";
    
    // Office ucd08uae30ud654 ud568uc218
    Office.onReady(function(info) {
        // Office ucd08uae30ud654uac00 uc644ub8ccub418uba74 UI ubc0f uc774ubca4ud2b8 ud578ub4e4ub7ec uc124uc815
        if (info.host === Office.HostType.Word || 
            info.host === Office.HostType.Excel || 
            info.host === Office.HostType.PowerPoint) {
            
            // uc11cuba85 ucea4ubc14uc2a4 ucd08uae30ud654
            window.SignatureManager.init();
            window.SignatureManager.load();
            
            // ubc84ud2bc uc774ubca4ud2b8 ub9acuc2a4ub108 ucd94uac00
            document.getElementById("btn-clear").addEventListener("click", window.SignatureManager.clear);
            document.getElementById("btn-save").addEventListener("click", window.SignatureManager.save);
            document.getElementById("btn-insert").addEventListener("click", insertSignatureToDocument);
        }
    });
})();

/**
 * ubb38uc11cuc5d0 uc11cuba85 uc0bduc785
 */
function insertSignatureToDocument() {
    // ud604uc7ac uc120ud0ddub41c uc11cuba85 uc774ubbf8uc9c0 uc5bbuae30
    const signatureImage = window.SignatureManager.getSelectedImage();
    
    if (!signatureImage) {
        showNotification("uc11cuba85uc744 uadf8ub9acuac70ub098 uc800uc7a5ub41c uc11cuba85uc744 uc120ud0ddud574uc8fcuc138uc694.");
        return;
    }
    
    // ud638uc2a4ud2b8 uc560ud50cub9acucf00uc774uc158uc5d0 ub530ub77c uc0bduc785 ubc29ubc95 ubd84uae30
    if (Office.context.host === Office.HostType.Word) {
        insertSignatureToWord(signatureImage);
    } else if (Office.context.host === Office.HostType.Excel) {
        insertSignatureToExcel(signatureImage);
    } else if (Office.context.host === Office.HostType.PowerPoint) {
        insertSignatureToPowerPoint(signatureImage);
    } else {
        showNotification("uc9c0uc6d0ub418uc9c0 uc54aub294 Office ud638uc2a4ud2b8 uc560ud50cub9acucf00uc774uc158uc785ub2c8ub2e4.");
    }
}

/**
 * Word ubb38uc11cuc5d0 uc11cuba85 uc0bduc785
 */
function insertSignatureToWord(signatureImage) {
    Word.run(function (context) {
        // uc120ud0ddub41c uc704uce58(ud604uc7ac ucee4uc11c uc704uce58)uc5d0 uc774ubbf8uc9c0 uc0bduc785
        const range = context.document.getSelection();
        
        // uc774ubbf8uc9c0 uc0bduc785
        range.insertInlinePictureFromBase64(getBase64Data(signatureImage), Word.InsertLocation.replace);
        
        return context.sync();
    })
    .then(function () {
        showNotification("Word ubb38uc11cuc5d0 uc11cuba85uc774 uc0bduc785ub418uc5c8uc2b5ub2c8ub2e4.");
    })
    .catch(function (error) {
        console.error("Word uc11cuba85 uc0bduc785 uc624ub958:", error);
        showNotification("Word ubb38uc11cuc5d0 uc11cuba85 uc0bduc785 uc911 uc624ub958uac00 ubc1cuc0ddud588uc2b5ub2c8ub2e4.", true);
    });
}

/**
 * Excel ubb38uc11cuc5d0 uc11cuba85 uc0bduc785
 */
function insertSignatureToExcel(signatureImage) {
    Excel.run(function (context) {
        // ud604uc7ac uc2dcud2b8 uc5f0uacb0
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        
        // ud604uc7ac uc120ud0ddub41c uc140 uac00uc838uc624uae30
        const range = sheet.getSelectedRange();
        
        // uc774ubbf8uc9c0 uc0bduc785
        const image = sheet.shapes.addImage(getBase64Data(signatureImage));
        
        // uc120ud0ddub41c uc140uc758 uc704uce58 uac00uc838uc624uae30
        range.load("address");
        range.load("left");
        range.load("top");
        
        return context.sync()
            .then(function() {
                // uc774ubbf8uc9c0 uc704uce58 uc124uc815 (uc140 uc704uce58 uae30uc900)
                image.left = range.left;
                image.top = range.top;
                image.height = 100; // uae30ubcf8 ud06cuae30 uc124uc815
                image.width = 200;  // uae30ubcf8 ud06cuae30 uc124uc815
                
                return context.sync();
            });
    })
    .then(function () {
        showNotification("Excel uc2dcud2b8uc5d0 uc11cuba85uc774 uc0bduc785ub418uc5c8uc2b5ub2c8ub2e4.");
    })
    .catch(function (error) {
        console.error("Excel uc11cuba85 uc0bduc785 uc624ub958:", error);
        showNotification("Excel uc2dcud2b8uc5d0 uc11cuba85 uc0bduc785 uc911 uc624ub958uac00 ubc1cuc0ddud588uc2b5ub2c8ub2e4.", true);
    });
}

/**
 * PowerPoint uc2acub77cuc774ub4dcuc5d0 uc11cuba85 uc0bduc785
 */
function insertSignatureToPowerPoint(signatureImage) {
    PowerPoint.run(function (context) {
        // ud604uc7ac uc2acub77cuc774ub4dc uac00uc838uc624uae30
        const slide = context.presentation.getSelectedSlides().getItem(0);
        
        // uc11cuba85 uc774ubbf8uc9c0 uc0bduc785
        const image = slide.shapes.addImage(getBase64Data(signatureImage));
        image.left = 200; // uae30ubcf8 uc704uce58 uc124uc815
        image.top = 200;  // uae30ubcf8 uc704uce58 uc124uc815
        image.height = 100; // uae30ubcf8 ud06cuae30 uc124uc815
        image.width = 200;  // uae30ubcf8 ud06cuae30 uc124uc815
        
        return context.sync();
    })
    .then(function () {
        showNotification("PowerPoint uc2acub77cuc774ub4dcuc5d0 uc11cuba85uc774 uc0bduc785ub418uc5c8uc2b5ub2c8ub2e4.");
    })
    .catch(function (error) {
        console.error("PowerPoint uc11cuba85 uc0bduc785 uc624ub958:", error);
        showNotification("PowerPoint uc2acub77cuc774ub4dcuc5d0 uc11cuba85 uc0bduc785 uc911 uc624ub958uac00 ubc1cuc0ddud588uc2b5ub2c8ub2e4.", true);
    });
}

/**
 * Data URLuc5d0uc11c uc21cuc218ud55c Base64 ub370uc774ud130 ucd94ucd9c
 */
function getBase64Data(dataUrl) {
    // Data URLuc5d0uc11c base64 ub370uc774ud130ub9cc ucd94ucd9c
    return dataUrl.split(',')[1];
}

/**
 * uc0acuc6a9uc790uc5d0uac8c uc54cub9bc ud45cuc2dc
 */
function showNotification(message, isError = false) {
    // uac04ub2e8ud55c uc54cub9bc ubc15uc2a4
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px';
    notification.style.backgroundColor = isError ? '#d13438' : '#107c10';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.textAlign = 'center';
    notification.style.transition = 'opacity 0.5s';
    notification.style.opacity = '0';
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    // ud398uc774ub4dc uc778 ud6a8uacfc
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // 3ucd08 ud6c4 uc54cub9bc uc0aduc81c
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}
