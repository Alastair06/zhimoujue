// Web Audio API 原生程序化音效合成器（零外部依赖，安全容错）
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn("AudioContext init failed", e);
    }
  }

  // 1. 金币/铜钱清脆碰撞声
  playCoin() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // 2. 战鼓敲击声 (低沉有力)
  playDrum() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  // 3. 炸药包引爆轰鸣声 (程序化噪波爆炸)
  playExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.5);
    } catch (e) {}
  }

  // 4. 谋略锦囊破空触发声
  playStratagem() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + idx * 0.05);

        gain.gain.setValueAtTime(0.2, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.4);
      });
    } catch (e) {}
  }

  // 5. 大捷凯旋号角
  playVictory() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((note, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(note, now + i * 0.12);

        gain.gain.setValueAtTime(0.2, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.5);
      });
    } catch (e) {}
  }

  // 6. 青龙偃月刀破空大横扫音效
  playDragonSlash() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // 7. 燕人怒吼咆哮震荡音效
  playRoar() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  // 8. 三国古战歌程序化循环 BGM (五声音阶古乐进行曲，0 外部文件体积)
  startBgm() {
    if (!this.enabled || this.bgmPlaying) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.bgmPlaying = true;
      this.bgmStep = 0;

      // 五声音阶旋律池 (D小调羽调式: D4, F4, G4, A4, C5, D5)
      const pentatonicNotes = [
        293.66, 349.23, 392.00, 440.00, 523.25, 587.33
      ];
      // 32 拍古战乐动机序列
      const melodyPattern = [
        0, -1, 2, 3,  4, 3, 2, 0,
        2, 3, 4, 5,   4, 2, 0, -1,
        3, 2, 0, 2,   3, 4, 3, 2,
        0, 2, 0, -1,  0, 2, 3, -1
      ];

      const stepTime = 0.22; // 约 136 BPM

      const scheduleStep = () => {
        if (!this.bgmPlaying || !this.ctx) return;
        const now = this.ctx.currentTime;
        const noteIdx = melodyPattern[this.bgmStep % melodyPattern.length];

        // 战鼓与低沉通通鼓
        if (this.bgmStep % 2 === 0) {
          const drumOsc = this.ctx.createOscillator();
          const drumGain = this.ctx.createGain();
          drumOsc.type = "sine";
          const startF = (this.bgmStep % 4 === 0) ? 110 : 80;
          drumOsc.frequency.setValueAtTime(startF, now);
          drumOsc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
          drumGain.gain.setValueAtTime(0.18, now);
          drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          drumOsc.connect(drumGain);
          drumGain.connect(this.ctx.destination);
          drumOsc.start(now);
          drumOsc.stop(now + 0.16);
        }

        // 丝竹/古筝清音主旋律
        if (noteIdx >= 0) {
          const freq = pentatonicNotes[noteIdx % pentatonicNotes.length];
          const melOsc = this.ctx.createOscillator();
          const melGain = this.ctx.createGain();
          melOsc.type = "triangle";
          melOsc.frequency.setValueAtTime(freq, now);

          melGain.gain.setValueAtTime(0.08, now);
          melGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 0.9);

          melOsc.connect(melGain);
          melGain.connect(this.ctx.destination);
          melOsc.start(now);
          melOsc.stop(now + stepTime * 0.9);
        }

        this.bgmStep++;
        this.bgmTimer = setTimeout(scheduleStep, stepTime * 1000);
      };

      scheduleStep();
    } catch (e) {
      console.warn("BGM start error", e);
    }
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleBgm() {
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  // 9. 40 大名将出征战吼与专属阵营号角
  playHeroDeploy(heroMeta) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const camp = heroMeta?.camp || 'shu';
      const now = this.ctx.currentTime;

      // 四大阵营特色战号频率组
      const campFreqs = {
        shu: [392.00, 523.25, 659.25, 783.99], // 蜀：仁义浩荡 G4-C5-E5-G5
        wei: [261.63, 329.63, 392.00, 523.25], // 魏：威严霸气 C4-E4-G4-C5
        wu:  [440.00, 554.37, 659.25, 880.00], // 吴：激昂江潮 A4-C#5-E5-A5
        qun: [329.63, 440.00, 587.33, 698.46]  // 群：霸气狂啸 E4-A4-D5-F5
      };
      const freqs = campFreqs[camp] || campFreqs.shu;
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f, now + idx * 0.08);
        gain.gain.setValueAtTime(0.22, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });

      // 原生浏览器语音播报名将战吼 (SpeechSynthesis，零体积开销)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && heroMeta?.shout) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(heroMeta.shout);
          utter.lang = 'zh-CN';
          utter.rate = 1.05;
          utter.pitch = (camp === 'wu' || camp === 'qun') ? 1.05 : 0.95;
          utter.volume = 0.9;
          window.speechSynthesis.speak(utter);
        } catch (err) {}
      }
    } catch (e) {}
  }

  // 10. 战役三星评级金星清脆金鸣 (1~3 颗金星阶梯升调)
  playStarChime(starIdx = 0) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // 依序递增：第1星 C5->G5，第2星 E5->C6，第3星 G5->E6->G6 绝顶清鸣
      const pitchConfigs = [
        [523.25, 783.99],
        [659.25, 1046.50],
        [783.99, 1318.51, 1567.98]
      ];
      const freqs = pitchConfigs[Math.min(starIdx, 2)] || pitchConfigs[0];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + idx * 0.06);
        gain.gain.setValueAtTime(0.28, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.38);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.38);

        // 闪烁高次谐波
        const shimmer = this.ctx.createOscillator();
        const sGain = this.ctx.createGain();
        shimmer.type = "triangle";
        shimmer.frequency.setValueAtTime(f * 2.5, now + idx * 0.06);
        sGain.gain.setValueAtTime(0.08, now + idx * 0.06);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        shimmer.connect(sGain);
        sGain.connect(this.ctx.destination);
        shimmer.start(now + idx * 0.06);
        shimmer.stop(now + idx * 0.06 + 0.25);
      });
    } catch (e) {}
  }

  // 11. 名将无双绝技全屏切入破空大拔刀
  playUltimateCutin() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 锐利拔刀破空声
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);

      // 低沉震撼重击
      const drumOsc = this.ctx.createOscillator();
      const drumGain = this.ctx.createGain();
      drumOsc.type = "sine";
      drumOsc.frequency.setValueAtTime(130, now + 0.05);
      drumOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);
      drumGain.gain.setValueAtTime(0.7, now + 0.05);
      drumGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      drumOsc.connect(drumGain);
      drumGain.connect(this.ctx.destination);
      drumOsc.start(now + 0.05);
      drumOsc.stop(now + 0.35);
    } catch (e) {}
  }

  // 12. 九天惊雷/天雷引爆 (白噪波突发滤波 + 滚雷低频震颤)
  playThunder() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const dur = 0.75;
      const bufferSize = this.ctx.sampleRate * dur;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(70, now + dur);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + dur);

      // 40Hz 滚雷重低音
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = "sine";
      sub.frequency.setValueAtTime(65, now);
      sub.frequency.exponentialRampToValueAtTime(25, now + dur);
      subGain.gain.setValueAtTime(0.6, now);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + dur);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + dur);
    } catch (e) {}
  }

  // 13. 烈火燎原/火海呼啸爆裂
  playFirestorm() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const dur = 0.85;
      const bufferSize = this.ctx.sampleRate * dur;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.linearRampToValueAtTime(1200, now + 0.35);
      filter.frequency.exponentialRampToValueAtTime(220, now + dur);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.01, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + dur);
    } catch (e) {}
  }

  // 14. 章节满星宝箱开启 (欢快六音阶琶音 + 金币撞击)
  playChestOpen() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // 升腾华丽琶音
      const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      arpeggio.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + i * 0.05);
        gain.gain.setValueAtTime(0.24, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.35);
      });
      setTimeout(() => this.playCoin(), 300);
      setTimeout(() => this.playCoin(), 420);
    } catch (e) {}
  }

  // 15. 武庙加官晋爵 · 官阶晋升大号角 (雄浑庄严汉家乐曲)
  playRankUp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // 宫商角徵羽庄严动机: C4 -> G4 -> C5 -> E5 -> G5(长鸣)
      const fanfare = [
        { f: 261.63, t: 0.00, d: 0.14 },
        { f: 392.00, t: 0.15, d: 0.14 },
        { f: 523.25, t: 0.30, d: 0.20 },
        { f: 659.25, t: 0.52, d: 0.22 },
        { f: 783.99, t: 0.76, d: 0.65 }
      ];
      fanfare.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(note.f, now + note.t);
        gain.gain.setValueAtTime(0.26, now + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + note.t);
        osc.stop(now + note.t + note.d);
      });
    } catch (e) {}
  }
}

// 使用 Proxy 包装 SoundManager，即使调用了未定义的音效方法也能安全空转，绝不抛出 TypeError
export const sound = new Proxy(new SoundManager(), {
  get(target, prop) {
    if (prop in target) return target[prop];
    return () => {};
  }
});

if (typeof window !== 'undefined') {
  window.sound = sound;
}
