// 《智谋决：烽火营地》儿童卡通 Q 版动态乱斗沙盘引擎
export class BattleVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.animating = false;
    
    // 双方小人单位
    this.leftUnits = [];
    this.rightUnits = [];
    
    // 特效与投掷物
    this.projectiles = [];
    this.effects = [];
    this.textPopups = []; // 漫画文字气泡 (如 "BOOM!", "？？？", "+HP❤️")

    this.stagePhase = "standby"; // standby, charge, clash, retreat
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth || 800;
    this.canvas.height = this.canvas.clientHeight || 180;
  }

  start(playerTroops, enemyTroops) {
    this.resize();
    this.animating = true;
    this.projectiles = [];
    this.effects = [];
    this.textPopups = [];
    this.stagePhase = "charge";

    // 初始化我方卡通小人 (蓝队)
    this.leftUnits = [];
    const pInf = Math.min(10, Math.max(4, Math.floor((playerTroops.infantry || 100) / 15)));
    const pArc = Math.min(6, Math.max(2, Math.floor((playerTroops.archer || 35) / 10)));
    const pCav = Math.min(4, Math.max(1, Math.floor((playerTroops.cavalry || 20) / 10)));

    for (let i = 0; i < pInf; i++) this.leftUnits.push({ type: "infantry", icon: "🛡️", x: 40 + i * 18, y: this.canvas.height - 35, vx: 1.6, hp: 100, state: "run" });
    for (let i = 0; i < pArc; i++) this.leftUnits.push({ type: "archer", icon: "🏹", x: 20 + i * 16, y: this.canvas.height - 55, vx: 1.2, hp: 100, state: "run" });
    for (let i = 0; i < pCav; i++) this.leftUnits.push({ type: "cavalry", icon: "🐎", x: 60 + i * 22, y: this.canvas.height - 45, vx: 2.4, hp: 120, state: "run" });

    // 初始化敌方卡通小人 (红队)
    this.rightUnits = [];
    const eInf = Math.min(10, Math.max(4, Math.floor((enemyTroops.infantry || 100) / 15)));
    const eArc = Math.min(6, Math.max(2, Math.floor((enemyTroops.archer || 35) / 10)));
    const eCav = Math.min(4, Math.max(1, Math.floor((enemyTroops.cavalry || 20) / 10)));

    for (let i = 0; i < eInf; i++) this.rightUnits.push({ type: "infantry", icon: "🛡️", x: this.canvas.width - 60 - i * 18, y: this.canvas.height - 35, vx: -1.6, hp: 100, state: "run" });
    for (let i = 0; i < eArc; i++) this.rightUnits.push({ type: "archer", icon: "🏹", x: this.canvas.width - 40 - i * 16, y: this.canvas.height - 55, vx: -1.2, hp: 100, state: "run" });
    for (let i = 0; i < eCav; i++) this.rightUnits.push({ type: "cavalry", icon: "🐎", x: this.canvas.width - 80 - i * 22, y: this.canvas.height - 45, vx: -2.4, hp: 120, state: "run" });

    this.loop();
  }

  stop() {
    this.animating = false;
  }

  // 抛出可爱大炸弹
  throwDynamite() {
    const startX = 60;
    const startY = this.canvas.height - 60;
    const targetX = this.canvas.width * 0.72;
    const targetY = this.canvas.height - 35;

    this.projectiles.push({
      x: startX,
      y: startY,
      startX,
      startY,
      targetX,
      targetY,
      progress: 0,
      speed: 0.03,
      arcHeight: 90,
      type: "bomb"
    });
  }

  // 火烧连环特效
  spawnFireEffect() {
    for (let i = 0; i < 40; i++) {
      this.effects.push({
        x: this.canvas.width * 0.6 + Math.random() * (this.canvas.width * 0.35),
        y: this.canvas.height - 25,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        color: Math.random() < 0.5 ? "#f97316" : "#ef4444",
        size: Math.random() * 8 + 4,
        alpha: 1,
        life: 0.03
      });
    }
    this.addComicText("🔥 烈火连营！", this.canvas.width * 0.75, 40, "#ef4444");
  }

  // 医疗营爱心大加血
  spawnHealEffect() {
    for (let i = 0; i < 25; i++) {
      this.effects.push({
        x: 80 + Math.random() * 160,
        y: this.canvas.height - 30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 2 - 1,
        color: "#22c55e",
        size: Math.random() * 6 + 3,
        alpha: 1,
        life: 0.02
      });
    }
    this.addComicText("❤️ 救死扶伤 +HP!", 140, 40, "#16a34a");
  }

  // 诸葛亮空城抚琴
  spawnKongchengEffect() {
    this.addComicText("🎵 诸葛城头抚琴~", 120, 30, "#a855f7");
    this.addComicText("💦 敌军惊慌: 有伏兵快撤! ？？？", this.canvas.width - 220, 40, "#3b82f6");
    // 敌军小人转头往回跑
    this.rightUnits.forEach(u => {
      u.vx = 2.5; // 掉头往右跑
    });
  }

  // 漫画大文字弹出 (POPUP)
  addComicText(text, x, y, color = "#ea580c") {
    this.textPopups.push({
      text,
      x,
      y,
      vy: -0.6,
      alpha: 1,
      scale: 1.4,
      color
    });
  }

  // 爆炸大蘑菇云
  spawnCartoonExplosion(x, y) {
    this.addComicText("💥 轰！BOOM!", x - 50, y - 40, "#dc2626");
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 5 + 2;
      this.effects.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        color: ["#facc15", "#fb923c", "#ef4444", "#ffffff"][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 4,
        alpha: 1,
        life: 0.035
      });
    }
  }

  loop() {
    if (!this.animating) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. 绘制蓝天与草地背景
    const grassTop = this.canvas.height - 28;
    this.ctx.fillStyle = "#86efac"; // 嫩绿草地
    this.ctx.fillRect(0, grassTop, this.canvas.width, 28);
    this.ctx.fillStyle = "#4ade80";
    this.ctx.fillRect(0, grassTop + 14, this.canvas.width, 14);

    // 绘制可爱小花花
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText("🌸", 40, this.canvas.height - 6);
    this.ctx.fillText("🌼", 180, this.canvas.height - 6);
    this.ctx.fillText("🌻", this.canvas.width - 200, this.canvas.height - 6);
    this.ctx.fillText("🌸", this.canvas.width - 50, this.canvas.height - 6);

    // 2. 绘制我方营寨 (左侧小城堡)
    this.ctx.font = "28px sans-serif";
    this.ctx.fillText("🏰", 10, grassTop);

    // 绘制敌方营寨 (右侧小山寨)
    this.ctx.fillText("🏯", this.canvas.width - 45, grassTop);

    // 3. 更新与绘制双方小兵
    const midX = this.canvas.width / 2;

    // 我方蓝队小兵
    this.leftUnits.forEach(u => {
      if (u.x < midX - 20) {
        u.x += u.vx;
      } else {
        // 到达中间，开始开心地挥刀打架
        u.x += (Math.random() - 0.5) * 1.5;
      }
      this.ctx.font = "22px sans-serif";
      this.ctx.fillText(u.icon, u.x, u.y);
    });

    // 敌方红队小兵
    this.rightUnits.forEach(u => {
      if (u.x > midX + 20) {
        u.x += u.vx;
      } else {
        u.x += (Math.random() - 0.5) * 1.5;
      }
      this.ctx.font = "22px sans-serif";
      this.ctx.fillText(u.icon, u.x, u.y);
    });

    // 中间交战时冒出卡通交锋小星星 ✨ 🥊
    if (Math.random() < 0.3) {
      this.ctx.font = "16px sans-serif";
      this.ctx.fillText(["✨", "🥊", "💫", "💨"][Math.floor(Math.random() * 4)], midX - 20 + Math.random() * 40, grassTop - 10 - Math.random() * 20);
    }

    // 4. 更新与绘制抛物线大炸弹
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.progress += p.speed;

      p.x = p.startX + (p.targetX - p.startX) * p.progress;
      const arc = Math.sin(p.progress * Math.PI) * p.arcHeight;
      p.y = p.startY + (p.targetY - p.startY) * p.progress - arc;

      // 绘制大黑炸弹 💣
      this.ctx.font = "26px sans-serif";
      this.ctx.fillText("💣", p.x - 12, p.y);

      // 引信小火星
      this.ctx.font = "14px sans-serif";
      this.ctx.fillText("✨", p.x + 8, p.y - 10);

      if (p.progress >= 1) {
        this.spawnCartoonExplosion(p.targetX, p.targetY);
        this.projectiles.splice(i, 1);
      }
    }

    // 5. 更新粒子特效 (火光/爱心)
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const ef = this.effects[i];
      ef.x += ef.vx;
      ef.y += ef.vy;
      ef.alpha -= ef.life;

      if (ef.alpha <= 0) {
        this.effects.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, ef.alpha);
      this.ctx.fillStyle = ef.color;
      this.ctx.beginPath();
      this.ctx.arc(ef.x, ef.y, ef.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 6. 更新漫画气泡大文字
    for (let i = this.textPopups.length - 1; i >= 0; i--) {
      const txt = this.textPopups[i];
      txt.y += txt.vy;
      txt.alpha -= 0.015;

      if (txt.alpha <= 0) {
        this.textPopups.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, txt.alpha);
      this.ctx.font = "bold 18px cursive, sans-serif";
      this.ctx.fillStyle = txt.color;
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 4;
      this.ctx.strokeText(txt.text, txt.x, txt.y);
      this.ctx.fillText(txt.text, txt.x, txt.y);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}
