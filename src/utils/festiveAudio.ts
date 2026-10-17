/**
 * Synthesizes traditional Nepali festive ambient bells & sitar chimes
 * using pure Web Audio API. 100% resilient with zero external asset dependencies.
 */

class FestiveAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (Taar Sa)
    587.33, // D5 (Taar Re)
    659.25, // E5 (Taar Ga)
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playChime(freq: number, duration: number = 2.5) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Harmonics for bell-like sitar / singing bowl chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  public toggle(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    this.isPlaying = true;

    let step = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      const note = this.notes[step % this.notes.length];
      this.playChime(note, 3.0);
      step = (step + Math.floor(Math.random() * 3) + 1) % this.notes.length;
      
      const nextDelay = 1200 + Math.random() * 1400;
      this.timerId = window.setTimeout(loop, nextDelay);
    };

    loop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const festiveAudio = new FestiveAudioPlayer();
