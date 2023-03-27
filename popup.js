chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    async function prepareTable(){
        // let arrayName = ['One', 'Two', 'Three'];
        // let arrayXpath = ['//div1', '//div2', '//div3'];

        let container = "<table><tr><th>Name</th><th>XPath</th></tr>";

        // for(let i = 0; i < arrayName.length; i++){
        //     container += `<tr><td>${arrayName[i]}</td><td>${arrayXpath[i]}</td></tr>`
        // }

        message.forEach(function (element){
            container += `<tr><td>${element.name}</td><td>${element.xpath}</td></tr>`
        });

        document.getElementById('container').innerHTML = container;
    }
    console.log(message);
    console.log(sender);
    sendResponse('hi');
    prepareTable();
})
