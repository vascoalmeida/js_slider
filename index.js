var animations = [["fade_in", "fade_out"], ["slide_show", "slide_hide"]];
var nav_dot_list;
var slide_list;
var img_list;
var current;
var img;
var text;

window.onload = function() {
    nav_dot_list = document.getElementsByClassName("nav_dot");
    slide_list = document.getElementsByClassName("slide");
    img_list = document.getElementsByTagName("img");
    text = document.getElementsByClassName("slide_text");
    img = document.getElementsByClassName("slide_img");
    current = slide_list[0];

    for (var i = 0; i < nav_dot_list.length; i++) {
        nav_dot_list[i].addEventListener("click", dot_clicked);
        text[i].addEventListener("click", alert_text);
        img[i].addEventListener("mouseover", img_animation);
        img[i].addEventListener("mouseleave", img_animation);
    }

    for (var i = 0; i < document.getElementsByClassName("anim_box").length; i++) {
        document.getElementsByClassName("anim_box")[i].addEventListener("click", change_animation);
    }
    on_timer_end();
}

function reset_timer() {
    var timer = document.getElementById("timer");
    var new_timer = timer.cloneNode(true);
    timer.parentNode.replaceChild(new_timer, timer);
    on_timer_end();
}

function slide(next_elem) {
    var selected_animation_button = document.getElementsByClassName("anim_box selected_button")[0];
    var anim = animations[selected_animation_button.getAttribute("data-index")];

    for (var i = 0; i < slide_list.length; i++) {
        if (slide_list[i].getAttribute("data-visibility") == "visible") {
            current = slide_list[i];
            break;
        }
    }
    current.classList.add(anim[1]);
    current.classList.remove(anim[0]);
    current.setAttribute("data-visibility", "hidden");
    current.style.display = "none";

    next_elem.classList.remove(anim[1]);
    next_elem.classList.add(anim[0]);
    next_elem.setAttribute("data-visibility", "visible");
    next_elem.style.opacity = "1";
    next_elem.style.display = "flex";
}

function dot_clicked() {
    next = slide_list[this.getAttribute("data-index")];
    slide(next, slide_list);

    for (var j = 0; j < nav_dot_list.length; j++) {
        nav_dot_list[j].classList.remove("selected_dot");
    }
    this.classList.add("selected_dot");

    reset_timer();
}

function change_animation() {
    for (var j = 0; j < document.getElementsByClassName("anim_box").length; j++) {
        document.getElementsByClassName("anim_box")[j].classList.remove("selected_button");
    }

    for(var j = 0; j < slide_list.length; j++) {
        slide_list[j].setAttribute("class", "slide");
    }

    this.classList.add("selected_button");
}

function switch_selected_dot() {
    var sel_dot = document.getElementsByClassName("selected_dot");
    var current_index = parseInt(sel_dot[0].getAttribute("data-index"));
    var next_dot;

    if(current_index == nav_dot_list.length - 1) {
        next = slide_list[0];
        next_dot = nav_dot_list[0];
    }
    else {
        next = slide_list[current_index + 1];
        next_dot = nav_dot_list[current_index + 1];
    }
    sel_dot[0].classList.remove("selected_dot");
    next_dot.classList.add("selected_dot");

    slide(next);
    reset_timer();
}

function on_timer_end() {
    var timer = document.getElementById("timer");
    timer.addEventListener("animationend", switch_selected_dot);

    for (var i = 0; i < img_list.length; i++) {
        img_list[i].addEventListener("mouseover", function() {play_pause_timer("paused")});
        img_list[i].addEventListener("mouseleave", function() {play_pause_timer("running")});
    }
}

function play_pause_timer(state) {
    document.getElementById("timer").style.animationPlayState = state;
}

function alert_text() {
    alert("De momento não é possível selecionar texto");
}

function img_animation() {
    for (var i = 0; i < img.length; i++) {
        if (img[i].classList.contains("scale_up")) {
            img[i].classList.remove("scale_up");
        }
        else {
            img[i].classList.add("scale_up");
        }
    }
}