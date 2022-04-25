var d = new Date();
var currentPage = 1;

function initDates() {
    document.querySelector(".clock").innerText = getHourString();
    document.querySelector(".last").innerText = getDateString();
    setInterval(function() {
        document.querySelector(".clock").innerText = getHourString();
    }, 10000);
}

function getDateString() {
    return d.toLocaleString("pt-br", { day: "numeric", year: "numeric", weekday: "short", month: "long" });
}

function getHourString() {
    return d.toLocaleString("pt-br", { hour: "numeric", minute: "numeric", hour12: "true" });
}


function changeDisplay(query, display) {
    var el = document.querySelector(query);
    el.style.display = display;
}

function navigate(pagenum, element) {
    toggleSelected(element);
    gotoPage(pagenum);
}

function gotoPage(pagenum) {
    changeDisplay(".credits", "none");
    switch (pagenum) {
        case 0:
            changeDisplay(".about", "none");
            changeDisplay(".publications", "none");
            changeDisplay(".cv", "none");
            changeDisplay(".contact", "block");
            currentPage = 4;
            break;
        case 1:
            changeDisplay(".about", "block");
            changeDisplay(".publications", "none");
            changeDisplay(".cv", "none");
            changeDisplay(".cv", "none");
            changeDisplay(".contact", "none");
            break;
        case 2:
            changeDisplay(".about", "none");
            changeDisplay(".publications", "block");
            changeDisplay(".cv", "none");
            changeDisplay(".contact", "none");
            break;
        case 3:
            changeDisplay(".about", "none");
            changeDisplay(".publications", "none");
            changeDisplay(".cv", "block");
            changeDisplay(".contact", "none");
            break;
        case 4:
            changeDisplay(".about", "none");
            changeDisplay(".publications", "none");
            changeDisplay(".cv", "none");
            changeDisplay(".contact", "block");
            break;
        case 5:
            changeDisplay(".about", "block");
            changeDisplay(".publications", "none");
            changeDisplay(".cv", "none");
            changeDisplay(".contact", "none");
            currentPage = 1;
            break;
        default:
            break;
    }
}

function showCredits() {
    resetNav();
    changeDisplay(".about", "none");
    changeDisplay(".publications", "none");
    changeDisplay(".cv", "none");
    changeDisplay(".contact", "none");
}

function showSitegram() {
    resetNav();
    changeDisplay(".about", "none");
    changeDisplay(".publications", "none");
    changeDisplay(".cv", "none");
    changeDisplay(".contact", "none");
    changeDisplay(".contact", "none");
}

function nextPage() {
    currentPage++;
    resetNav();
    gotoPage(currentPage);
}

function prevPage() {
    currentPage--;
    resetNav();
    gotoPage(currentPage);
}

function toggleSelected(element) {
    var elms = document.querySelectorAll("nav a");
    var el = elms.length;
    for (var i = 0; i < el; i++) {
        if (elms[i] == element) {
            elms[i].className = "selected";
        } else {
            elms[i].className = "";
        }
    }
}

function resetNav() {
    var elms = document.querySelectorAll("nav a");
    var el = elms.length;
    for (var i = 0; i < el; i++) {
        elms[i].className = "";
    }
}