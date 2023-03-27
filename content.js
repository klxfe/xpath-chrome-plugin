const update = function() {
    setTimeout(() => {
        const data = [];
        const collection = document.querySelectorAll('button');
        for (let button of collection) {
            let obj = {
                name: getName(button),
                xpath: getXPathForElement(button)
            };
            data.push(obj);
        }
        chrome.runtime.sendMessage(
            data,
            (response) => {
                console.log('response');
            })
    }, 1000)
}

function getXPathForElement(elm) {
    let allNodes = document.getElementsByTagName('*');
    for (let segs = []; elm && elm.nodeType == 1; elm = elm.parentNode)
    {
        if (elm.hasAttribute('id')) {
            let uniqueIdCount = 0;
            for (let n=0;n < allNodes.length;n++) {
                if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                if (uniqueIdCount > 1) break;
            }
            if ( uniqueIdCount == 1) {
                segs.unshift('id("' + elm.getAttribute('id') + '")');
                return segs.join('/');
            } else {
                segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
            }
        } else if (elm.hasAttribute('class')) {
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
        } else {
            for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                if (sib.localName == elm.localName)  i++; }
            segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
        }
    }
    return segs.length ? '/' + segs.join('/') : null;
}

function getName(element) {
    if (element.getAttribute('id')) {
        return element.getAttribute('id');
    }
    if (element.getAttribute('class')) {
        return element.getAttribute('class');
    } else {
        return 'button';
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        update();
        sendResponse('success');
    });


