function beautifier()
{
    function insertCSS(url)
    {
        var head = document.getElementsByTagName("head")[0];         
        var css= document.createElement("link");
        css.type = "text/css";
        css.rel = "stylesheet";
        css.href = url;
        head.appendChild(css);
    }

    insertCSS(chrome.extension.getURL("wikipedia-beautifier.css"));

    function parentDiv(element)
    {
        return (!element.parentNode || element.parentElement.tagName == "DIV") ?
            element.parentNode : parentDiv(element.parentNode);
    }

    function paragraphAdjuster(elements, margin)
    {
        for(var i = 0; i < elements.length; i++)
        {
            if(parentDiv(elements[i]) == bodyContent)
            {
                elements[i].className += (elements[i].className ? " " : "") + "hyphenate";
                elements[i].style.textAlign = "justify";
                elements[i].style.marginBottom = margin;
            }
        }
    }

    paragraphAdjuster(bodyContent.getElementsByTagName("p"), "1.0em");
    paragraphAdjuster(bodyContent.getElementsByTagName("li"), "0.5em");

    Hyphenator.run();

    var refs = document.getElementsByClassName("references-column-width");

    for(var i = 0; i < refs.length; i++)
    {
        refs[i].style["-webkit-column-width"] = "380px";
    }
}

beautifier();
