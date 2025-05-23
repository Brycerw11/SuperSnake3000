// Handle switching between Light Mode and Dark Mode

// Run code when document is loaded using jQuery
$(function (){

    // store theme icons' image url
    devicePrefIconSrc = "https://res.cloudinary.com/dtxrpihy6/image/upload/f_auto,q_auto/v1/SuperSnake3000Assets/t4fjiv6dainb9syzhgpk"
    darkModeIconSrc = "https://cdn-icons-png.freepik.com/512/6714/6714978.png" //temp icon
    lightModeIconSrc = "https://www.svgrepo.com/show/432507/light-mode.svg" //temp icon

    //preload Icons
    var deviceIconPreload = new Image()
    deviceIconPreload.src = devicePrefIconSrc

    var darkIconPreload = new Image()
    darkIconPreload.src = darkModeIconSrc
    var lightIconPreload = new Image()
    lightIconPreload.src = lightModeIconSrc


    var themeChoice = "device"; //default to device preference

    //find last saved theme choice and update if needed
    let storedThemeChoice = localStorage.getItem("SuperSnake3000Theme")
    switch(storedThemeChoice){
        case "light":
            themeChoice = "light";
            UpdateSiteTheme(true);
            break;
        case "dark":
            themeChoice = "dark";
            UpdateSiteTheme(true);
            break;
        default: //either the storedThemeChoice is "device" or it does not exist, so default to device
            UpdateStoredThemeChoice();
            UpdateSiteTheme(true);
            break;
    }

    //Add theme switch button
    imgHTML = `<img src="${devicePrefIconSrc}" alt="Device Theme Preference Icon">`
    buttonHTML = `<button id="theme-switch-button" title="Switch Color Theme"> ${imgHTML} </button>`
    $("body").append(buttonHTML)

    $("#theme-switch-button").on("click", function(){
        switch(themeChoice){
            case "light":
                themeChoice = "dark";
                UpdateSiteTheme();
                break;
            case "dark":
                themeChoice = "device";
                UpdateSiteTheme();
                break;
            default: //if not light or dark, its device
                themeChoice = "light";
                UpdateSiteTheme();
                break;
        }
        UpdateStoredThemeChoice();
    })

    function UpdateThemeSwitcherIcon(){
        switch(themeChoice){
            case "light":
                $("#theme-switch-button img").attr("src", lightModeIconSrc)
                $("#theme-switch-button img").attr("alt", "Light Theme Icon")
                break;
            case "dark":
                $("#theme-switch-button img").attr("src", darkModeIconSrc)
                $("#theme-switch-button img").attr("alt", "Dark Theme Icon")
                break;
            default: //if not light or dark then device
                $("#theme-switch-button img").attr("src", devicePrefIconSrc)
                $("#theme-switch-button img").attr("alt", "Device Theme Preference Icon")
                break;
        }
    }

    UpdateThemeSwitcherIcon(); //update switcher icon on inital load

    var transitionTimeoutID;
    function UpdateSiteTheme(initialLoad = false){

        UpdateThemeSwitcherIcon();

        //set color transitions when changing theme
        if (!initialLoad){
            $("*").addClass("theme-transition")
            clearTimeout(transitionTimeoutID)
    
            transitionTimeoutID = setTimeout(function(){
                $("*").removeClass("theme-transition")
            }, 505)
        }

        var targetTheme;
        if (themeChoice === "device"){
            if (matchMedia("prefers-color-scheme: dark")){
                targetTheme = "dark"
            } else {targetTheme = "light"}
        }
        else{
            targetTheme = themeChoice;
        }

        if(targetTheme === "dark"){
            $("body").addClass("dark-mode")
        } else{
            $("body").removeClass("dark-mode")
        }
    }

    function UpdateStoredThemeChoice(){
        try{
            localStorage.setItem("SuperSnake3000Theme", themeChoice)
        } catch (error){
            console.warn("This browser does not support Local Storage, certain features may be unavailable as a result.")
        }
    }

})