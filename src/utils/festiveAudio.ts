/**
 * High-Quality 100% Royalty-Free & Copyright-Free Traditional Nepali Festive Audio Engine
 * Synthesizes authentic instrumental tunes of:
 * 1. 'Malshree Dhun' (दसैँ मालश्री धुन) with Bansuri (bamboo flute), Sitar plucks, Madal beats, and Temple bells
 * 2. 'Deusi-Bhailo' (तिहार देउसी-भैलो धुन) with rhythmic folk Madal and joyful celebratory melody
 * 3. 'Temple Chimes' (मन्दिर घण्ट र शंख) with golden bronze bell resonance
 *
 * Engineered with studio dynamics compression, 3-band EQ enhancement, and loud, clear default volume (85%).
 * Completely client-side, zero latency, zero external bandwidth, 100% royalty-free forever.
 */

export type FestiveTrackType = 'malshree' | 'deusi' | 'ambient';

class FestiveAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMutedState = false;
  private volumeLevel = 0.85; // High default volume (85%) for loud, clear playback
  private currentTrack: FestiveTrackType = 'malshree';
  private timerId: number | null = null;

  // Audio Nodes
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private lowEq: BiquadFilterNode | null = null;
  private midEq: BiquadFilterNode | null = null;
  private highEq: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Event Listeners for UI sync
  private listeners: Set<() => void> = new Set();

  // Musical Note Frequencies (Hz)
  private readonly NOTES = {
    C3: 130.81,
    G3: 196.00,
    A3: 220.00,
    C4: 261.63, // Sa
    D4: 293.66, // Re
    E4: 329.63, // Ga
    F4: 349.23, // Ma
    Fs4: 369.99, // Teevra Ma
    G4: 392.00, // Pa
    A4: 440.00, // Dha
    B4: 493.88, // Ni
    C5: 523.25, // Taar Sa
    D5: 587.33, // Taar Re
    E5: 659.25, // Taar Ga
    G5: 783.99, // Taar Pa
  };

  // Malshree Dhun Melodic Sequence (Traditional Dashain Raga)
  private readonly MALSHREE_SEQUENCE: { note: number; duration: number; type: 'flute' | 'sitar' | 'bell'; hasMadal?: boolean }[] = [
    { note: 392.00, duration: 0.6, type: 'flute', hasMadal: true },  // Pa
    { note: 440.00, duration: 0.5, type: 'flute' },                  // Dha
    { note: 523.25, duration: 0.9, type: 'flute', hasMadal: true },  // Sa5
    { note: 493.88, duration: 0.45, type: 'sitar' },                 // Ni
    { note: 440.00, duration: 0.55, type: 'flute', hasMadal: true }, // Dha
    { note: 392.00, duration: 0.8, type: 'flute' },                  // Pa
    { note: 329.63, duration: 0.5, type: 'sitar', hasMadal: true },  // Ga
    { note: 392.00, duration: 0.5, type: 'flute' },                  // Pa
    { note: 349.23, duration: 0.4, type: 'flute' },                  // Ma
    { note: 329.63, duration: 0.5, type: 'sitar', hasMadal: true },  // Ga
    { note: 293.66, duration: 0.5, type: 'flute' },                  // Re
    { note: 261.63, duration: 1.1, type: 'flute', hasMadal: true },  // Sa (Restful anchor)
    
    // Phrase 2 (Ascending Dashain Joy)
    { note: 261.63, duration: 0.4, type: 'sitar' },                  // Sa
    { note: 293.66, duration: 0.4, type: 'sitar', hasMadal: true },  // Re
    { note: 329.63, duration: 0.5, type: 'flute' },                  // Ga
    { note: 392.00, duration: 0.6, type: 'flute', hasMadal: true },  // Pa
    { note: 440.00, duration: 0.5, type: 'sitar' },                  // Dha
    { note: 523.25, duration: 0.7, type: 'flute', hasMadal: true },  // Sa5
    { note: 587.33, duration: 0.5, type: 'flute' },                  // Re5
    { note: 523.25, duration: 0.6, type: 'sitar', hasMadal: true },  // Sa5
    { note: 440.00, duration: 0.5, type: 'flute' },                  // Dha
    { note: 392.00, duration: 1.0, type: 'flute', hasMadal: true },  // Pa
  ];

  // Deusi-Bhailo Melodic Sequence (Tihar Folk Tune: "Bhaileni aain aagana...")
  private readonly DEUSI_SEQUENCE: { note: number; duration: number; type: 'flute' | 'sitar' | 'bell'; hasMadal?: boolean }[] = [
    { note: 261.63, duration: 0.35, type: 'flute', hasMadal: true }, // Sa
    { note: 329.63, duration: 0.35, type: 'flute' },                 // Ga
    { note: 392.00, duration: 0.4, type: 'flute', hasMadal: true },  // Pa
    { note: 392.00, duration: 0.4, type: 'sitar' },                 // Pa
    { note: 440.00, duration: 0.35, type: 'flute', hasMadal: true }, // Dha
    { note: 392.00, duration: 0.4, type: 'flute' },                 // Pa
    { note: 329.63, duration: 0.6, type: 'flute', hasMadal: true },  // Ga
    
    // "Barasari din ma..."
    { note: 329.63, duration: 0.35, type: 'sitar' },                 // Ga
    { note: 392.00, duration: 0.35, type: 'flute', hasMadal: true }, // Pa
    { note: 440.00, duration: 0.4, type: 'flute' },                  // Dha
    { note: 523.25, duration: 0.55, type: 'flute', hasMadal: true }, // Sa5
    { note: 440.00, duration: 0.35, type: 'sitar' },                 // Dha
    { note: 392.00, duration: 0.4, type: 'flute', hasMadal: true },  // Pa
    { note: 329.63, duration: 0.4, type: 'flute' },                 // Ga
    { note: 293.66, duration: 0.35, type: 'sitar', hasMadal: true }, // Re
    { note: 261.63, duration: 0.8, type: 'flute', hasMadal: true },  // Sa
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // 1. Studio Compressor for punchy, loud clarity without clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.12, this.ctx.currentTime);

      // 2. 3-Band Equalizer: Low shelf warmth, Mid boost clarity, High shelf sparkle
      this.lowEq = this.ctx.createBiquadFilter();
      this.lowEq.type = 'lowshelf';
      this.lowEq.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.lowEq.gain.setValueAtTime(3.0, this.ctx.currentTime); // Rich acoustic body

      this.midEq = this.ctx.createBiquadFilter();
      this.midEq.type = 'peaking';
      this.midEq.frequency.setValueAtTime(2600, this.ctx.currentTime);
      this.midEq.Q.setValueAtTime(1.2, this.ctx.currentTime);
      this.midEq.gain.setValueAtTime(4.0, this.ctx.currentTime); // Vocal/Flute presence

      this.highEq = this.ctx.createBiquadFilter();
      this.highEq.type = 'highshelf';
      this.highEq.frequency.setValueAtTime(7500, this.ctx.currentTime);
      this.highEq.gain.setValueAtTime(3.5, this.ctx.currentTime); // Bright festival bell shimmer

      // 3. Analyser Node for visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      // 4. Master Gain Node
      this.masterGain = this.ctx.createGain();
      const effectiveVol = this.isMutedState ? 0 : this.volumeLevel;
      this.masterGain.gain.setValueAtTime(effectiveVol, this.ctx.currentTime);

      // Signal Chain:
      // Nodes -> lowEq -> midEq -> highEq -> compressor -> analyser -> masterGain -> destination
      this.lowEq.connect(this.midEq);
      this.midEq.connect(this.highEq);
      this.highEq.connect(this.compressor);
      this.compressor.connect(this.analyser);
      this.analyser.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Synthesize Bansuri (Nepali Bamboo Flute)
   * Warm breathy tone with gentle vibrato and wooden warmth
   */
  private playBansuri(freq: number, duration: number) {
    if (!this.ctx || !this.lowEq) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();

    // Subtle pitch vibrato (Bansuri breath modulation)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(4.5, now);
    vibrato.connect(osc1.frequency);
    vibrato.connect(osc2.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic overtone

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, now);

    // Dynamic Flute Envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.48, now + 0.08); // Responsive soft attack
    gainNode.gain.linearRampToValueAtTime(0.38, now + duration * 0.75); // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.lowEq);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  /**
   * Synthesize Sitar Pluck
   * Crisp metal attack with rich overtone decay
   */
  private playSitar(freq: number, duration: number) {
    if (!this.ctx || !this.lowEq) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscHigh = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    oscHigh.type = 'triangle';
    oscHigh.frequency.setValueAtTime(freq * 3, now); // Sitar jawari buzz

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 2, now);
    filter.Q.setValueAtTime(3.0, now);

    // Pluck Envelope
    gainNode.gain.setValueAtTime(0.45, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    oscHigh.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.lowEq);

    osc.start(now);
    oscHigh.start(now);
    osc.stop(now + duration);
    oscHigh.stop(now + duration);
  }

  /**
   * Synthesize Traditional Nepali Madal Drum
   * Deep bass resonance ('Dha') + sharp treble slap ('Tang')
   */
  private playMadal() {
    if (!this.ctx || !this.lowEq) return;
    const now = this.ctx.currentTime;

    // Bass head ('Bayan' / Dha)
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(110, now);
    bassOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18); // Pitch drop punch

    bassGain.gain.setValueAtTime(0.55, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    bassOsc.connect(bassGain);
    bassGain.connect(this.lowEq);
    bassOsc.start(now);
    bassOsc.stop(now + 0.22);

    // Treble head ('Dayan' / Tang)
    const trebleOsc = this.ctx.createOscillator();
    const trebleFilter = this.ctx.createBiquadFilter();
    const trebleGain = this.ctx.createGain();

    trebleOsc.type = 'triangle';
    trebleOsc.frequency.setValueAtTime(480, now);
    trebleFilter.type = 'bandpass';
    trebleFilter.frequency.setValueAtTime(540, now);
    trebleFilter.Q.setValueAtTime(4.0, now);

    trebleGain.gain.setValueAtTime(0.35, now);
    trebleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    trebleOsc.connect(trebleFilter);
    trebleFilter.connect(trebleGain);
    trebleGain.connect(this.lowEq);
    trebleOsc.start(now);
    trebleOsc.stop(now + 0.08);
  }

  /**
   * Synthesize Sacred Bronze Temple Bell & Cymbals (Ghanta)
   */
  private playTempleBell(freq: number = 2400) {
    if (!this.ctx || !this.lowEq) return;
    const now = this.ctx.currentTime;

    const harmonics = [1, 1.48, 2.08, 2.76];
    harmonics.forEach((h, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * h, now);

      const amp = (0.25 / (index + 1));
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.lowEq!);
      osc.start(now);
      osc.stop(now + 1.8);
    });
  }

  /**
   * Main Melodic Sequencer Loop
   */
  private runSequencer() {
    if (!this.isPlaying) return;

    if (this.currentTrack === 'malshree') {
      let step = 0;
      const playStep = () => {
        if (!this.isPlaying || this.currentTrack !== 'malshree') return;
        const current = this.MALSHREE_SEQUENCE[step % this.MALSHREE_SEQUENCE.length];

        if (current.type === 'flute') {
          this.playBansuri(current.note, current.duration);
        } else {
          this.playSitar(current.note, current.duration);
        }

        if (current.hasMadal) {
          this.playMadal();
        }

        // Add periodic temple bell every 8 notes
        if (step % 8 === 0) {
          this.playTempleBell(1850);
        }

        step++;
        const nextDelay = current.duration * 900;
        this.timerId = window.setTimeout(playStep, nextDelay);
      };

      playStep();
    } else if (this.currentTrack === 'deusi') {
      let step = 0;
      const playStep = () => {
        if (!this.isPlaying || this.currentTrack !== 'deusi') return;
        const current = this.DEUSI_SEQUENCE[step % this.DEUSI_SEQUENCE.length];

        if (current.type === 'flute') {
          this.playBansuri(current.note, current.duration);
        } else {
          this.playSitar(current.note, current.duration);
        }

        if (current.hasMadal) {
          this.playMadal();
        }

        if (step % 6 === 0) {
          this.playTempleBell(2200);
        }

        step++;
        const nextDelay = current.duration * 820; // Festive upbeat folk tempo
        this.timerId = window.setTimeout(playStep, nextDelay);
      };

      playStep();
    } else {
      // Ambient Temple Bells
      const playStep = () => {
        if (!this.isPlaying || this.currentTrack !== 'ambient') return;
        const notes = [this.NOTES.C4, this.NOTES.E4, this.NOTES.G4, this.NOTES.A4, this.NOTES.C5, this.NOTES.D5];
        const note = notes[Math.floor(Math.random() * notes.length)];
        this.playSitar(note, 2.2);
        this.playTempleBell(1600 + Math.random() * 800);

        const nextDelay = 1400 + Math.random() * 1200;
        this.timerId = window.setTimeout(playStep, nextDelay);
      };

      playStep();
    }
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- PUBLIC API ---

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public playTrack(track: FestiveTrackType = 'malshree') {
    this.initContext();
    this.stopSequencer();
    this.currentTrack = track;
    this.isPlaying = true;
    this.runSequencer();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    this.stopSequencer();
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playTrack(this.currentTrack);
      return true;
    }
  }

  public setTrack(track: FestiveTrackType) {
    const wasPlaying = this.isPlaying;
    this.currentTrack = track;
    if (wasPlaying) {
      this.playTrack(track);
    } else {
      this.notify();
    }
  }

  public getCurrentTrack(): FestiveTrackType {
    return this.currentTrack;
  }

  public isPlayingTrack(): boolean {
    return this.isPlaying;
  }

  public setVolume(level: number) {
    this.volumeLevel = Math.max(0, Math.min(1, level));
    if (this.masterGain && this.ctx) {
      const targetVol = this.isMutedState ? 0 : this.volumeLevel;
      this.masterGain.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public setMuted(muted: boolean) {
    this.isMutedState = muted;
    if (this.masterGain && this.ctx) {
      const targetVol = this.isMutedState ? 0 : this.volumeLevel;
      this.masterGain.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
    this.notify();
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMutedState);
    return this.isMutedState;
  }

  public getAnalyserData(dataArray: Uint8Array<ArrayBuffer>): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(dataArray);
    }
  }

  private stopSequencer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export const festiveAudio = new FestiveAudioEngine();
