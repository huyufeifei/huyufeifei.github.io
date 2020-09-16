function loadFile(filePath) {
    console.log('in loadFile');
    var result = 'ERR';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    console.log(xmlhttp.status);
    if (xmlhttp.status===200) {
        result = xmlhttp.responseText;
    }
    return result;
}
document.write(loadFile('/source/html/head.html'));