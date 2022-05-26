function init() {
    setMobileMenu()
}

function setMobileMenu() {
   var icon = document.querySelector(".icon-file");
   var navbar = document.querySelector(".container-fluid .navbar");
   var defaultNavbarClass = "navbar row";
   if (icon && navbar) {
    icon.addEventListener("click", function() {
        if (navbar.className == defaultNavbarClass) {
            navbar.className = defaultNavbarClass + " open";
        } else {
            navbar.className = defaultNavbarClass;
        }       
    });
   }
}

init();
