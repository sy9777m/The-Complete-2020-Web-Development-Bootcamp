var button_list = document.querySelectorAll('.drum');
var drum_sound = new Audio('sounds/tom-1.mp3');

for (var i = 0; i < button_list.length; i++) {
    button_list[i].addEventListener('click', () => {
        var buttonInnerHTML = this.innerHTML;
        buttonAnimation(buttonInnerHTML);
        makeSound(buttonInnerHTML);
    });
}

document.addEventListener('keypress', (event) => {
    buttonAnimation(event.key);
    makeSound(event.key);
});

function makeSound(key) {
    switch(key) {
        case 'w':
            var sound = new Audio('sounds/crash.mp3');
            sound.play();
            break;
        case 'a':
            var sound = new Audio('sounds/kick-bass.mp3');
            sound.play();
            break;
        case 's':
            var sound = new Audio('sounds/snare.mp3');
            sound.play();
            break;
        case 'd':
            var sound = new Audio('sounds/tom-1.mp3');
            sound.play();
            break;
        case 'j':
            var sound = new Audio('sounds/tom-2.mp3');
            sound.play();
            break;
        case 'k':
            var sound = new Audio('sounds/tom-3.mp3');
            sound.play();
            break;
        case 'l':
            var sound = new Audio('sounds/tom-4.mp3');
            sound.play();
            break;
    
        default:
            break;
    }
}

function buttonAnimation(key) {
    var activeButton = document.querySelector('.' + key);
    
    activeButton.classList.add('pressed');
    
    setTimeout(() => {
        activeButton.classList.remove('pressed');
    }, 100);
    
}