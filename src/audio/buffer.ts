export default class Buffer {
  private context: AudioContext;
  private urls: string[];
  private buffer: AudioBuffer[];

  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];

    this.loadSound = this.loadSound.bind(this);
  }

  public loadSound(url: string, index: number) {
    const request = new XMLHttpRequest();
    request.open("get", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      this.context.decodeAudioData(request.response, (buffer) => {
        this.buffer[index] = buffer;
      });
    };

    request.send();
  }

  public loadAll() {
    this.urls.forEach(this.loadSound);
  }

  public getSoundByIndex(index) {
    return this.buffer[index];
  }
}
