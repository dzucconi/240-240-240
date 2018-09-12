import fps from 'frame-interval';
import { Howl } from 'howler';

const STATE = {
  id: null,
  playing: false,
  loading: false,
  loaded: false,
};

const DOM = {
  player: document.getElementById('player'),
  play: document.getElementById('play'),
  progress: document.getElementById('progress'),
  seek: document.getElementById('seek'),
  state: document.getElementById('state'),
};

export default () => {
  const { src } = DOM.player.dataset;
  const sound = new Howl({
    preload: false,
    src: [src],
  });

  const progress = fps(requestAnimationFrame)(10, () => {
    const progress = sound.seek() / sound.duration();
    DOM.progress.style.width = `${(progress || 0) * 100}%`;
  });

  const play = () => {
    if (STATE.playing) return;
    if (STATE.loading) return;

    if (!STATE.loaded) {
      STATE.loading = true;
      DOM.state.textContent = 'Loading';

      sound.load();
      sound.once('load', () => {
        STATE.id = sound.play();
        progress();
        STATE.loading = false;
        STATE.loaded = true;
        STATE.playing = true;
        DOM.state.textContent = 'Pause';
      });

      return;
    }

    STATE.id = sound.play();
    STATE.playing = true;
    DOM.state.textContent = 'Pause';
  };

  const pause = () => {
    sound.pause(STATE.id);
    STATE.playing = false;
    DOM.state.textContent = 'Play';
  };

  const toggle = () => {
    if (STATE.playing) {
      pause();
      return;
    }

    play();
  };

  DOM.play.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  const seek = (e) => {
    const percentage = (e.offsetX / DOM.seek.offsetWidth);
    sound.seek(sound.duration() * percentage);
  };

  DOM.seek.addEventListener('mousedown', (e) => {
    seek(e);
    play();
  });

  sound.on('end', () => pause());
  sound.on('loaderror', () => {
    DOM.state.textContent = 'Error';
  });
};
