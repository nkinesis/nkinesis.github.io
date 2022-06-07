var counter = 0;

function init() {
    setMobileMenu()
    setListeners()
}

function setMobileMenu() {
    var icon = document.querySelector(".icon-file");
    var navbar = document.querySelector(".container-fluid .navbar");
    var defaultNavbarClass = "navbar row";
    if (icon && navbar) {
        icon.addEventListener("click", function () {
            if (navbar.className == defaultNavbarClass) {
                navbar.className = defaultNavbarClass + " open";
            } else {
                navbar.className = defaultNavbarClass;
            }
        });
    }
}

function setListeners() {
    var elm = document.querySelector(".icon-floppy");
    if (elm) {
        elm.addEventListener("dblclick", function () {
            counter++;
            if (counter > 3) {
                window.location = atob('c3BhY2UtaW52YWRlcnMuaHRtbA==');
            }
        });
    }
}

init();
