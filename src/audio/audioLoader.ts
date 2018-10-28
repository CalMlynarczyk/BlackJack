import Buffer from "./buffer";
import Sound from "./sound";

declare global {
  interface Window {
    AudioContext(): void;
    webkitAudioContext(): void;
  }
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context: AudioContext = new window.AudioContext();

const sounds = [
  "audio/another.wav",
];

const buffer = new Buffer(context, sounds);
buffer.loadAll();

const hitSound = () => new Sound(context, buffer.getSoundByIndex(0));

export default hitSound;
