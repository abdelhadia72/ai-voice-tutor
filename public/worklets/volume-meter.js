class VolumeMeterProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.volume = 0;
    this.updateIntervalInMS = 25;
    this.nextUpdateFrame = this.updateIntervalInMS;
    this.intervalInFrames = this.updateIntervalInMS / 1000 * sampleRate;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    if (input.length > 0) {
      const samples = input[0];
      let sum = 0;
      let rms = 0;

      // Calculate RMS
      for (let i = 0; i < samples.length; i++) {
        sum += samples[i] * samples[i];
      }
      rms = Math.sqrt(sum / samples.length);

      // Update volume
      this.volume = Math.max(rms, this.volume * 0.95);

      this.nextUpdateFrame -= samples.length;
      if (this.nextUpdateFrame < 0) {
        this.nextUpdateFrame += this.intervalInFrames;
        this.port.postMessage({ volume: this.volume });
      }

      // Pass audio through
      for (let channel = 0; channel < output.length; ++channel) {
        output[channel].set(input[channel]);
      }
    }

    return true;
  }
}

registerProcessor('vumeter-out', VolumeMeterProcessor); 