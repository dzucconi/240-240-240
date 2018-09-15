import fps from 'frame-interval';
import { Howl } from 'howler';
import debounce from 'lodash.debounce';

const STATE = {
  id: null,
  playing: false,
  loading: false,
  loaded: false,
};

const DOM = {
  body: document.body,
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

  const __play__ = () => {
    STATE.id = sound.play();
    STATE.playing = true;
    DOM.state.textContent = 'Pause';
    DOM.body.dataset.playing = true;
  };

  const play = () => {
    if (STATE.playing) return;
    if (STATE.loading) return;

    if (!STATE.loaded) {
      STATE.loading = true;
      DOM.state.textContent = 'Loading';

      sound.load();
      sound.once('load', () => {
        STATE.loading = false;
        STATE.loaded = true;

        progress();
        __play__();
      });

      return;
    }

    __play__();
  };

  const pause = () => {
    sound.pause(STATE.id);

    STATE.playing = false;

    DOM.state.textContent = 'Play';
    DOM.body.dataset.playing = false;
  };

  const toggle = () => {
    if (STATE.playing) {
      pause();
      return;
    }

    play();
  };

  const seek = (e) => {
    const percentage = (e.offsetX / DOM.seek.offsetWidth);
    sound.seek(sound.duration() * percentage);
  };

  DOM.play.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  DOM.seek.addEventListener('mousedown', (e) => {
    seek(e);
    play();
  });

  const deactivate = debounce(() => {
    DOM.body.dataset.active = false;
  }, 500);

  DOM.body.addEventListener('mousemove', () => {
    DOM.body.dataset.active = true;
    deactivate();
  });

  sound.on('end', () => pause());
  sound.on('loaderror', () => {
    DOM.state.textContent = 'Error';
  });
};
