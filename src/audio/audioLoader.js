import Sound from "./sound";
import Buffer from "./buffer";

const context = new (window.AudioContext || window.webkitAudioContext)();

const sounds = [
  "audio/another.wav",
];

const buffer = new Buffer(context, sounds);
buffer.loadAll();

const hitSound = () => new Sound(context, buffer.getSoundByIndex(0));

export default hitSound;
