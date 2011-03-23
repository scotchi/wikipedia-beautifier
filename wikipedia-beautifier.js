function wiknifier()
{
    var fonts = '"minion-pro-1", "minion-pro-2", Palatino, Georgia, "Times New Roman", serif';

    var firstHeading = document.getElementById("firstHeading");
    firstHeading.style.fontFamily = fonts;
    firstHeading.style.width = "900px";
    firstHeading.style.marginLeft = firstHeading.style.marginRight = "auto";
    firstHeading.style.paddingTop = firstHeading.style.paddingBottom = "0.25em";
    firstHeading.style.border = "none";
    firstHeading.style.fontWeight = "bold";

    var bodyContent = document.getElementById("bodyContent");
    bodyContent.style.lineHeight = "1.55em";
    bodyContent.style.fontSize = "1.0em";
    bodyContent.style.fontFamily = fonts;
    bodyContent.style.border = "1px solid #ccc";
    bodyContent.style.width = "800px";
    bodyContent.style.padding = "50px";
    bodyContent.style.marginLeft = bodyContent.style.marginRight = "auto";
    bodyContent.style.marginTop = "1em";
    bodyContent.style.background = "#fbfbfb";

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

    var amboxes = document.getElementsByClassName("ambox");

    for(var i = 0; i < amboxes.length; i++)
    {
        amboxes[i].style.margin = "1.5em 10%";
    }

    var boxClasses = [ "infobox", "tright", "tleft", "taxobox", "wikitable" ];

    for(var i = 0; i < boxClasses.length; i++)
    {
        var boxes = document.getElementsByClassName(boxClasses[i]);

        for(var j = 0; j < boxes.length; j++)
        {
            boxes[j].style.marginTop = 0;
            boxes[j].style.marginBottom = "0.5em";
        }
    }

    var refs = document.getElementsByClassName("references-column-width");

    for(var i = 0; i < refs.length; i++)
    {
        refs[i].style["-webkit-column-width"] = "380px";
    }

    var increment = 30;

    function fadeIn(element)
    {
        if(element.fadeTimeout)
        {
            clearTimeout(element.fadeTimeout);
        }

        if(parseFloat(element.style.opacity) < 1.0)
        {
            element.style.opacity =
                Math.round(10 * Math.min(parseFloat(element.style.opacity) + 0.1, 1.0)) / 10;
            element.fadeTimeout = setTimeout(function() { fadeIn(element) }, increment);
        }
    }

    function fadeOut(element, limit)
    {
        if(element.fadeTimeout)
        {
            clearTimeout(element.fadeTimeout);
        }

        if(!limit)
        {
            limit = 0;
        }

        if(parseFloat(element.style.opacity) > limit)
        {
            element.style.opacity =
                Math.round(10 * Math.max(parseFloat(element.style.opacity) - 0.1, limit)) / 10;
            element.fadeTimeout = setTimeout(function() { fadeOut(element, limit) }, increment);
        }
    }

    function fader(element)
    {
        var transparent = 0;

        element.style.opacity = transparent;
        element.onmouseover = function() {
            fadeIn(element);
        }
        element.onmouseout = function() {
            element.fadeTimeout = setTimeout(function() { fadeOut(element, transparent) }, 100);
        }
    }

    fader(document.getElementById("mw-head"));
    fader(document.getElementById("mw-panel"));
}

wiknifier();
