chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    async function prepareTable(){

        let container = "<table><tr><th>Name</th><th>XPath</th></tr>";

        message.forEach(function (element){
            container += `<tr><td>${element.name}</td><td>${element.xpath}</td></tr>`
        });

        document.getElementById('container').innerHTML = container;
    }
    sendResponse('hi');
    prepareTable();
})

document.getElementById("refresh").onclick = function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'update', function(response) {
        });
    });
}