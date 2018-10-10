export default class Buffer {
    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];

        this.loadSound = this.loadSound.bind(this);
    }

    loadSound(url, index) {
        const request = new XMLHttpRequest();
        request.open("get", url, true);
        request.responseType = "arraybuffer";

        request.onload = () => {
            this.context.decodeAudioData(request.response, buffer => {
                this.buffer[index] = buffer;
            });
        };

        request.send();
    }

    loadAll() {
        this.urls.forEach(this.loadSound);
    }

    getSoundByIndex(index) {
        return this.buffer[index];
    }
}
