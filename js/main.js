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
