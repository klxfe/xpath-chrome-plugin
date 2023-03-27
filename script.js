const data = [];

setTimeout(() => {
    const collection = document.getElementsByTagName('button')
    for (let i = 0; i < collection.length; i++) {
        let j = i + 1;
        let obj = {
            name: getName(collection.item(i)),
            xpath: getXPathForElement(collection.item(i))
        };
        data.push(obj);
    }
    chrome.runtime.sendMessage(
        data,
        (response) => {
            console.log('response');
        })
}, 3000)

function getXPathForElement(element) {
    const idx = (sib, name) => sib
        ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
    return segs(element).join('/');
}

function getName(element) {
    if (element.getAttribute('id')) {
        return element.getAttribute('id');
    }
    if (element.getAttribute('class')) {
        return element.getAttribute('class');
    } else {
        return 'No name';
    }
}


