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

    var refLists = document.getElementsByClassName("reflist");

    for(var i = 0; i < refLists.length; i++)
    {
        refLists[i].style["-webkit-column-width"] = "380px";
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

