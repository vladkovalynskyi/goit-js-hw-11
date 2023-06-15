import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const storedTime = localStorage.getItem('videoplayer-current-time');

if (storedTime) {
  player.setCurrentTime(storedTime);
}

player.on('timeupdate', throttle(() => {
  player.getCurrentTime().then((currentTime) => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}, 1000));


