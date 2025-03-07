// Handle switching between Light Mode and Dark Mode

// Run code when document is loaded using jQuery
$(function (){

    var themeChoice = "device"; //default to device preference

    //find last saved theme choice and update if needed
    let storedThemeChoice = localStorage.getItem("SuperSnake3000Theme")
    switch(storedThemeChoice){
        case "light":
            themeChoice = "light";
            UpdateSiteTheme();
            break;
        case "dark":
            themeChoice = "dark";
            UpdateSiteTheme();
            break;
        default: //either the storedThemeChoice is "device" or it does not exist, so default to device
            UpdateStoredThemeChoice();
            UpdateSiteTheme();
            break;
    }

    //Add theme switch button
    let devicePrefIconSrc = "../../assets/icons/DevicePreferenceIcon.svg"
    // $("body").append(`<button id="theme-switch-button" title="Switch Color Theme"> <img src="${devicePrefIconSrc}" alt="Device Preference Theme Icon"> </button>`)

    function UpdateSiteTheme(){
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