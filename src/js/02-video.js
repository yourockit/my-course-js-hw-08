import throttle from "lodash.throttle";
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(e) {
    const playTime = e.seconds;
    localStorage.setItem(CURRENT_TIME, playTime);
};

function setCurrentTime() {
    const getCurrentTime = localStorage.getItem(CURRENT_TIME);
    if (getCurrentTime) {
        player.setCurrentTime(getCurrentTime).catch(function(error) {
            console.log(error);
        });
    };
};

setCurrentTime();