function toggle(ele) {
    console.log('ele');
    var element = document.getElementById(ele);
    if (element.classList.contains("fa-square-caret-down")) {
        element.classList.remove("fa-square-caret-down");
        element.classList.add("fa-square-caret-up");
    } else if (element.classList.contains("fa-square-caret-up")) {
        element.classList.remove("fa-square-caret-up");
        element.classList.add("fa-square-caret-down");
    }
}

