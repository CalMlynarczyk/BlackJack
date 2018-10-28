export default class Sound {
  private context: AudioContext;
  private buffer: AudioBuffer;
  private gainNode: GainNode;
  private source: AudioBufferSourceNode;

  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  public play() {
    this.init();
    this.source.start(this.context.currentTime);
  }

  public stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
    this.source.stop(this.context.currentTime + 0.5);
  }

  private init() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
  }
}
