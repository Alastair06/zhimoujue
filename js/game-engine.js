import { sound } from './audio.js';
import { CharacterRenderer } from './character-renderer.js';
import { HERO_CAMP_MAP } from './synergy.js?v=20261001_1';
import { HERO_ULTIMATES, DEFAULT_HERO_ULTIMATE } from './hero-ultimates.js?v=20261003_1';

// 全40位名将战场像素精灵与武器打击光芒映射表
export const HERO_SPRITE_MAPPING = {
  // 🟢 蜀汉 (10)
  liubei: { sprite: 'liubei', slash: 'double_slash', slashColor: '#facc15' },
  guanyu: { sprite: 'guanyu', slash: 'blade', slashColor: '#22c55e' },
  zhangfei: { sprite: 'zhangfei', slash: 'spear', slashColor: '#f97316' },
  zhaoyun: { sprite: 'zhaoyun', slash: 'thrust', slashColor: '#38bdf8' },
  zhugeliang: { sprite: 'zhugeliang', slash: 'fan', slashColor: '#a855f7' },
  huangzhong: { sprite: 'huangzhong', slash: 'shoot', slashColor: '#facc15' },
  machao: { sprite: 'machao', slash: 'thrust', slashColor: '#38bdf8' },
  weiyan: { sprite: 'weiyan', slash: 'blade', slashColor: '#dc2626' },
  pangtong: { sprite: 'pangtong', slash: 'fan', slashColor: '#8b5cf6' },
  jiangwei: { sprite: 'jiangwei', slash: 'thrust', slashColor: '#10b981' },

  // 🔵 东吴 (10)
  sunquan: { sprite: 'sunquan', slash: 'blade', slashColor: '#10b981' },
  sunce: { sprite: 'sunce', slash: 'thrust', slashColor: '#38bdf8' },
  zhouyu: { sprite: 'zhouyu', slash: 'fan', slashColor: '#ef4444' },
  lusu: { sprite: 'lusu', slash: 'fan', slashColor: '#0284c7' },
  lvmeng: { sprite: 'lvmeng', slash: 'thrust', slashColor: '#06b6d4' },
  luxun: { sprite: 'luxun', slash: 'fan', slashColor: '#f97316' },
  ganning: { sprite: 'ganning', slash: 'double_slash', slashColor: '#0891b2' },
  taishici: { sprite: 'taishici', slash: 'shoot', slashColor: '#60a5fa' },
  zhoutai: { sprite: 'zhoutai', slash: 'double_slash', slashColor: '#d97706' },
  huanggai: { sprite: 'huanggai', slash: 'blade', slashColor: '#ea580c' },
  sunjian: { sprite: 'caocao', slash: 'blade', slashColor: '#dc2626' },

  // 🔴 曹魏 (10)
  caocao: { sprite: 'caocao', slash: 'blade', slashColor: '#eab308' },
  simayi: { sprite: 'simayi', slash: 'fan', slashColor: '#a855f7' },
  guojia: { sprite: 'guojia', slash: 'fan', slashColor: '#a855f7' },
  xiahoudun: { sprite: 'xiahoudun', slash: 'blade', slashColor: '#7e22ce' },
  xiahouyuan: { sprite: 'xiahouyuan', slash: 'shoot', slashColor: '#10b981' },
  zhangliao: { sprite: 'zhangliao', slash: 'thrust', slashColor: '#a855f7' },
  caoren: { sprite: 'caoren', slash: 'thrust', slashColor: '#3b82f6' },
  dianwei: { sprite: 'dianwei', slash: 'double_slash', slashColor: '#dc2626' },
  xuchu: { sprite: 'xuchu', slash: 'blade', slashColor: '#f59e0b' },
  xuhuang: { sprite: 'weiyan', slash: 'blade', slashColor: '#86198f' },
  zhanghe: { sprite: 'zhaoyun', slash: 'thrust', slashColor: '#7c3aed' },
  pangde: { sprite: 'pangde', slash: 'blade', slashColor: '#eab308' },

  // 🟡 群雄 (10)
  lvbu: { sprite: 'lvbu', slash: 'halberd', slashColor: '#ef4444' },
  diaochan: { sprite: 'diaochan', slash: 'fan', slashColor: '#ec4899' },
  dongzhuo: { sprite: 'dongzhuo', slash: 'blade', slashColor: '#991b1b' },
  yuanshao: { sprite: 'yuanshao', slash: 'blade', slashColor: '#eab308' },
  huaxiong: { sprite: 'zhangfei', slash: 'blade', slashColor: '#b91c1c' },
  yanliang: { sprite: 'yanliang', slash: 'blade', slashColor: '#b91c1c' },
  wenchou: { sprite: 'wenchou', slash: 'spear', slashColor: '#78350f' },
  jiaxu: { sprite: 'zhugeliang', slash: 'fan', slashColor: '#ca8a04' },
  chenggong: { sprite: 'zhugeliang', slash: 'fan', slashColor: '#d97706' },
  jiling: { sprite: 'jiling', slash: 'thrust', slashColor: '#ca8a04' },
  zhangren: { sprite: 'zhangren', slash: 'shoot', slashColor: '#10b981' },
  menghuo: { sprite: 'menghuo', slash: 'blade', slashColor: '#15803d' },
  zhangjiao: { sprite: 'zhangjiao', slash: 'fan', slashColor: '#eab308' }
};

// 角色单位类
export class Unit {
  constructor(options) {
    this.team = options.team; // 'blue' 或 'red'
    this.type = options.type; // 'infantry', 'archer', 'cavalry', 'catapult', 'zhaoyun', 'lvbu'
    this.bossName = options.bossName || '';
    this.bossType = options.bossType || '';
    this.x = options.x;
    this.y = options.y;
    this.maxHp = options.hp || 100;
    this.hp = this.maxHp;
    this.shield = options.shield || 0;
    this.shieldTimer = options.shieldDuration ? options.shieldDuration * 60 : 0;
    this.burnDmg = options.burnDmg || 0;
    this.atk = options.atk || 15;
    this.speed = options.speed || 1.2;
    this.range = options.range || 35;
    this.atkCooldown = options.atkCooldown || 60;
    this.cooldownTimer = 0;

    this.icon = options.icon || "🛡️";
    this.size = options.size || 32;

    this.state = "walk";
    this.walkCycle = 0;
    this.attackAnimTimer = 0;
    this.hurtTimer = 0;

    // 美人计魅惑状态
    this.charmedTimer = 0;

    // 物理击飞状态
    this.vx = 0;
    this.vy = 0;
    this.isFlying = false;
    this.rotation = 0;

    // 武将专属技能冷却 (赵云旋风斩、吕布狂暴)
    this.skillCooldown = 300; // 5秒
    this.skillTimer = 0;
    this.isBerserk = false; // 吕布狂暴

    this.isDead = false;

    // 装备特技与防御属性
    this.defRed = options.defRed || 0;
    this.reflect = options.reflect || 0;
    this.equipSkills = options.equipSkills || [];
    this.baseSpeed = this.speed;
    this.lifetime = 0;

    // 战神狂暴、军略研习与控制抗性属性
    this.defense = options.defense || 0;
    this.attackRoundCount = 0;
    this.defendRoundCount = 0;
    this.stunTimer = 0;
    this.dodgeRate = options.dodgeRate || 0;
    this.stunResist = options.stunResist || 0;
    this.critRate = options.critRate || 0;
    this.lifestealRate = options.lifestealRate || 0;

    // 🔥 名将专属怒气值系统与无双必杀技状态
    const cleanType = (this.type || '').replace(/_ch\d+$/, '');
    this.isHero = !!(BattleWorld.ALL_HERO_STATS && (BattleWorld.ALL_HERO_STATS[this.type] || BattleWorld.ALL_HERO_STATS[cleanType]));
    this.rage = 0;
    this.maxRage = 100;
    this.ultimateReady = false;
    this.invulnerableTimer = 0;
  }

  addRage(amount) {
    if (!this.isHero || this.team !== 'blue') return;
    const oldRage = this.rage || 0;
    this.rage = Math.min(this.maxRage, oldRage + amount);
    if (this.rage >= this.maxRage && oldRage < this.maxRage) {
      this.ultimateReady = true;
    }
  }

  canCastUltimate() {
    return this.isHero && this.team === 'blue' && !this.isDead && ((this.rage || 0) >= this.maxRage);
  }

  castUltimate(battle) {
    if (!this.canCastUltimate()) return false;
    this.rage = 0;
    this.ultimateReady = false;
    const cleanKey = (this.type || '').replace(/_ch\d+$/, '');
    const ultConfig = HERO_ULTIMATES[this.type] || HERO_ULTIMATES[cleanKey] || DEFAULT_HERO_ULTIMATE;
    
    // 触发战场全屏切入
    battle.triggerUltimateCutin({
      heroKey: cleanKey || this.type,
      heroName: this.bossName || battle.getHeroName(this.type),
      skillName: ultConfig.name,
      shout: ultConfig.shout,
      color: ultConfig.color || '#facc15'
    });

    // 追踪绝技释放次数用于战役星级判定
    battle.heroUltimateCastCount = (battle.heroUltimateCastCount || 0) + 1;

    // 播放专属无双必杀破空与全屏战吼音效
    if (window.sound && typeof window.sound.playUltimateCutin === 'function') {
      window.sound.playUltimateCutin();
    } else if (window.sound && typeof window.sound.playStratagem === 'function') {
      window.sound.playStratagem();
    }
    battle.addFloatingText(`🔥【${ultConfig.name}】！`, this.x, this.y - 70, ultConfig.color || "#facc15", 2.0);

    // 执行专属大招逻辑
    if (typeof ultConfig.execute === 'function') {
      ultConfig.execute(this, battle);
    }
    return true;
  }

  update(battle) {
    if (this.isDead) return;

    this.lifetime++;
    if (this.hurtTimer > 0) this.hurtTimer--;
    if (this.invulnerableTimer > 0) this.invulnerableTimer--;

    // 0. 眩晕状态判定：被击晕中，原地停滞无法移动与攻击
    if (this.stunTimer > 0) {
      this.stunTimer--;
      this.state = "idle";
      return;
    }

    // 🐎 装备特技：赤兔神驹【飞将冲阵】(前 4 秒移速翻倍且霸体)
    if (this.equipSkills && this.equipSkills.some(s => s.id === 'chitu_chongzhen')) {
      if (this.lifetime < 240) {
        this.speed = this.baseSpeed * 2.0;
      } else {
        this.speed = this.baseSpeed;
      }
    }

    // 1. 美人计魅惑中：原地犯花痴并持续掉心碎血量
    if (this.charmedTimer > 0) {
      this.charmedTimer--;
      if (this.charmedTimer % 50 === 0) {
        // 敌将/吕布受 25 点强力心碎真伤，普通小兵受 8 点心碎轻伤
        const isBoss = (this.type === 'lvbu' || this.type === 'zhaoyun' || this.type === 'guanyu' || this.type === 'zhangfei');
        const charmDmg = isBoss ? 25 : 8;
        this.takeDamage(charmDmg, battle, 'true_damage');
        battle.addFloatingText(isBoss ? "💔 战神心碎 -25" : "💔 心碎 -8", this.x, this.y - 45, "#ec4899", isBoss ? 1.4 : 1.0);
      }
      return;
    }

    // 2. 物理击飞
    if (this.isFlying) {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.45;
      this.rotation += 0.2;

      // 击飞期间同样保证在屏幕与城门合法区域内
      const maxFlyX = (battle.redCastle && !battle.redCastle.isDead) ? (battle.redCastle.x - 35) : (battle.canvas.width - 40);
      const minFlyX = (battle.blueCastle && !battle.blueCastle.isDead) ? (battle.blueCastle.x + 35) : 40;
      if (this.team === 'blue') this.x = Math.min(maxFlyX, Math.max(30, this.x));
      else this.x = Math.max(minFlyX, Math.min(battle.canvas.width - 30, this.x));

      if (this.y >= battle.groundY - 10) {
        this.y = battle.groundY - 10;
        this.isFlying = false;
        this.rotation = 0;
        this.vx = 0;
        this.vy = 0;
      }
      return;
    }

    // 3. 战神吕布狂暴修罗模式：生命值 <= 1/3 时开启，攻击增加 20，防御增加 100
    if (this.type.startsWith('lvbu') && this.hp <= this.maxHp * (1 / 3) && !this.isBerserk) {
      this.isBerserk = true;
      this.atk += 20;
      this.defense = (this.defense || 0) + 100;
      battle.screenShake = 18;
      battle.addFloatingText("🔥 战神狂暴 · 修罗降世！(攻+20 防+100)", this.x, this.y - 75, "#dc2626", 1.8);
      sound.playDrum();

      // 狂暴破土金红煞气烈焰粒子
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 6 + 3;
        battle.particles.push({
          x: this.x,
          y: this.y - 20,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 3,
          color: ["#ef4444", "#dc2626", "#facc15", "#f97316"][Math.floor(Math.random() * 4)],
          size: Math.random() * 8 + 4,
          alpha: 1,
          life: 0.04
        });
      }
    }

    if (this.type === 'zhaoyun') {
      this.skillTimer++;
      if (this.skillTimer >= this.skillCooldown) {
        this.skillTimer = 0;
        this.castZhaoYunWhirlwind(battle);
      }
    }

    if (this.type === 'guanyu') {
      this.skillTimer++;
      if (this.skillTimer >= 320) {
        this.skillTimer = 0;
        this.castGuanYuDragonSlash(battle);
      }
    }

    if (this.type === 'zhangfei') {
      this.skillTimer++;
      if (this.skillTimer >= 260) {
        this.skillTimer = 0;
        this.castZhangFeiRoar(battle);
      }
    }

    if (this.type === 'huangzhong') {
      this.skillTimer++;
      if (this.skillTimer >= 240) {
        this.skillTimer = 0;
        this.castHuangZhongSnipe(battle);
      }
    }

    if (this.type.startsWith('lvbu')) {
      this.skillTimer++;
      const maxCd = this.type === 'lvbu_ch2' ? 370 : 240; // 虎牢关放宽至 6.2 秒，白门楼为 4.0 秒
      if (this.skillTimer >= maxCd) {
        this.skillTimer = 0;
        this.castLvBuWhirlwind(battle, this.type === 'lvbu_ch2' ? 135 : 180);
      }
    }

    // 4. 寻找敌军目标与城池门楼物理阻挡
    const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
    const enemyCastle = this.team === 'blue' ? battle.redCastle : battle.blueCastle;

    // 严密计算要塞门楼阻挡边界与屏幕边界 (绝对禁止单位越界穿帮)
    const maxBoundX = (battle.redCastle && !battle.redCastle.isDead) ? (battle.redCastle.x - 35) : (battle.canvas.width - 40);
    const minBoundX = (battle.blueCastle && !battle.blueCastle.isDead) ? (battle.blueCastle.x + 35) : 40;

    // 先行对单位自身坐标执行物理硬边界约束
    if (this.team === 'blue') {
      this.x = Math.min(maxBoundX, Math.max(30, this.x));
    } else {
      this.x = Math.max(minBoundX, Math.min(battle.canvas.width - 30, this.x));
    }

    let target = null;
    let targetDist = 9999;

    for (const enemy of enemies) {
      if (enemy.isDead) continue;
      const dist = this.team === 'blue' ? (enemy.x - this.x) : (this.x - enemy.x);
      if (dist > 0 && dist < targetDist) {
        targetDist = dist;
        target = enemy;
      }
    }

    // 若无前方敌方小兵，则锁定敌方要塞
    if (!target && enemyCastle && !enemyCastle.isDead) {
      const castleDist = this.team === 'blue' ? (enemyCastle.x - this.x) : (this.x - enemyCastle.x);
      targetDist = Math.max(0, castleDist);
      target = enemyCastle;
    }

    // 如果已经在敌方城门前（例如赵云突刺冲锋至门下），且要塞存活，无条件锁定要塞进行攻击，绝不前行越界
    if (enemyCastle && !enemyCastle.isDead) {
      const isAtGate = this.team === 'blue' ? (this.x >= maxBoundX - 5) : (this.x <= minBoundX + 5);
      if (isAtGate && (!target || target === enemyCastle)) {
        target = enemyCastle;
        targetDist = Math.min(targetDist, this.range);
      }
    }

    // 5. 攻击或前进
    if (target && targetDist <= this.range) {
      this.state = "attack";
      if (this.cooldownTimer <= 0) {
        this.performAttack(target, battle);
        this.cooldownTimer = this.atkCooldown;
        this.attackAnimTimer = 15;
      }
    } else {
      this.state = "walk";
      this.walkCycle += 0.15;
      if (this.team === 'blue') {
        this.x = Math.min(maxBoundX, this.x + this.speed);
      } else {
        this.x = Math.max(minBoundX, this.x - this.speed);
      }
    }

    // 二次硬校验，杜绝任何位移动画突破屏幕或敌阵
    if (this.team === 'blue') {
      this.x = Math.min(maxBoundX, Math.max(30, this.x));
    } else {
      this.x = Math.max(minBoundX, Math.min(battle.canvas.width - 30, this.x));
    }

    if (this.cooldownTimer > 0) this.cooldownTimer--;
    if (this.attackAnimTimer > 0) this.attackAnimTimer--;
  }

  // 赵云主动技：龙枪旋风冲锋
  castZhaoYunWhirlwind(battle) {
    sound.playStratagem();
    battle.addFloatingText("⚡ 龙枪突刺 · 七进七出！", this.x + 30, this.y - 65, "#0284c7", 1.6);
    this.attackAnimTimer = 25;
    battle.triggerInkWashSlash({ type: 'zhaoyun', x: this.x, y: this.y, direction: this.team === 'blue' ? 1 : -1, heroName: '赵云' });
    
    // 向前冲锋并横扫前方所有敌军与要塞 (绝不越过城池大门)
    const enemyCastle = this.team === 'blue' ? battle.redCastle : battle.blueCastle;
    const maxBoundX = (battle.redCastle && !battle.redCastle.isDead) ? (battle.redCastle.x - 35) : (battle.canvas.width - 40);
    const minBoundX = (battle.blueCastle && !battle.blueCastle.isDead) ? (battle.blueCastle.x + 35) : 40;

    if (this.team === 'blue') {
      this.x = Math.min(maxBoundX, this.x + 40);
    } else {
      this.x = Math.max(minBoundX, this.x - 40);
    }

    const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
    enemies.forEach(e => {
      if (!e.isDead && Math.abs(e.x - this.x) < 110) {
        e.takeDamage(90, battle, 'skill');
        e.vx = this.team === 'blue' ? 4 : -4;
        e.isFlying = true;
        e.vy = -4;
      }
    });

    // 若冲至敌军要塞大营，七进七出同样对要塞造成龙枪穿刺伤害！
    if (enemyCastle && !enemyCastle.isDead && Math.abs(enemyCastle.x - this.x) < 110) {
      enemyCastle.takeDamage(90, battle);
    }

    for (let i = 0; i < 20; i++) {
      battle.spawnSpark(this.x + (Math.random() - 0.5) * 50, this.y - 20);
    }
  }

  // 关羽主动技：青龙偃月刀气大横扫
  castGuanYuDragonSlash(battle) {
    sound.playDragonSlash();
    battle.addFloatingText("🐉 青龙偃月 · 千里走单骑！", this.x + 40, this.y - 70, "#16a34a", 1.7);
    this.attackAnimTimer = 30;
    battle.triggerInkWashSlash({ type: 'guanyu', x: this.x, y: this.y, direction: this.team === 'blue' ? 1 : -1, heroName: '关羽' });
    
    const enemyCastle = this.team === 'blue' ? battle.redCastle : battle.blueCastle;
    const maxBoundX = (battle.redCastle && !battle.redCastle.isDead) ? (battle.redCastle.x - 35) : (battle.canvas.width - 40);
    const minBoundX = (battle.blueCastle && !battle.blueCastle.isDead) ? (battle.blueCastle.x + 35) : 40;

    // 踏步大范围挥刀 (不越过城池门楼)
    if (this.team === 'blue') {
      this.x = Math.min(maxBoundX, this.x + 25);
    } else {
      this.x = Math.max(minBoundX, this.x - 25);
    }

    const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
    enemies.forEach(e => {
      if (!e.isDead && Math.abs(e.x - this.x) < 140) {
        e.takeDamage(120, battle, 'true_damage');
        e.vx = this.team === 'blue' ? 6 : -6;
        e.isFlying = true;
        e.vy = -5;
      }
    });

    if (enemyCastle && !enemyCastle.isDead && Math.abs(enemyCastle.x - this.x) < 140) {
      enemyCastle.takeDamage(120, battle);
    }

    // 青绿色青龙刀光粒子
    for (let i = 0; i < 25; i++) {
      battle.particles.push({
        x: this.x + (Math.random() - 0.5) * 60,
        y: this.y - 30 + (Math.random() - 0.5) * 30,
        vx: (this.team === 'blue' ? 1 : -1) * (Math.random() * 6 + 4),
        vy: (Math.random() - 0.5) * 4,
        color: ["#22c55e", "#38bdf8", "#fbbf24", "#ffffff"][Math.floor(Math.random() * 4)],
        size: Math.random() * 6 + 3,
        alpha: 1,
        life: 0.05
      });
    }
  }

  // 张飞专属技：当阳桥燕人怒吼
  castZhangFeiRoar(battle) {
    sound.playRoar();
    battle.addFloatingText("🐯 燕人张翼德在此！喝退敌军！", this.x, this.y - 70, "#ea580c", 1.7);
    this.attackAnimTimer = 30;
    battle.triggerInkWashSlash({ type: 'zhangfei', x: this.x, y: this.y, direction: this.team === 'blue' ? 1 : -1, heroName: '张飞' });

    const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
    enemies.forEach(e => {
      if (!e.isDead && Math.abs(e.x - this.x) < 160) {
        e.takeDamage(65, battle, 'skill');
        // 恐惧后退与短暂停滞
        e.vx = this.team === 'blue' ? 7 : -7;
        e.isFlying = true;
        e.vy = -3;
        e.cooldownTimer = Math.max(e.cooldownTimer, 90); // 恐惧眩晕
      }
    });

    // 咆哮声波震荡粒子
    for (let i = 0; i < 30; i++) {
      const angle = (Math.random() - 0.5) * Math.PI * 0.8 + (this.team === 'blue' ? 0 : Math.PI);
      const spd = Math.random() * 8 + 4;
      battle.particles.push({
        x: this.x,
        y: this.y - 30,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color: ["#ea580c", "#facc15", "#ef4444", "#ffffff"][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 4,
        alpha: 1,
        life: 0.04
      });
    }
  }

  // 黄忠专属技：百步穿杨 · 穿云贯日
  castHuangZhongSnipe(battle) {
    sound.playCoin();
    battle.addFloatingText("🏹 百步穿杨 · 穿云贯日！", this.x, this.y - 65, "#eab308", 1.6);
    this.attackAnimTimer = 30;
    battle.triggerInkWashSlash({ type: 'huangzhong', x: this.x, y: this.y, direction: this.team === 'blue' ? 1 : -1, heroName: '黄忠' });

    const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
    const enemyCastle = this.team === 'blue' ? battle.redCastle : battle.blueCastle;

    // 穿透前方所有敌人
    enemies.forEach(e => {
      if (!e.isDead) {
        const dist = this.team === 'blue' ? (e.x - this.x) : (this.x - e.x);
        if (dist > 0 && dist < 450) {
          e.takeDamage(110, battle, 'skill');
          e.vx = this.team === 'blue' ? 3 : -3;
          e.isFlying = true;
          e.vy = -3;
        }
      }
    });

    if (enemyCastle && !enemyCastle.isDead) {
      const castleDist = this.team === 'blue' ? (enemyCastle.x - this.x) : (this.x - enemyCastle.x);
      if (castleDist > 0 && castleDist < 450) {
        enemyCastle.takeDamage(110, battle);
      }
    }

    // 金光穿云箭矢粒子特效
    for (let i = 0; i < 20; i++) {
      battle.particles.push({
        x: this.x + (this.team === 'blue' ? 1 : -1) * (i * 20),
        y: this.y - 25 + (Math.random() - 0.5) * 10,
        vx: (this.team === 'blue' ? 1 : -1) * (Math.random() * 5 + 8),
        vy: (Math.random() - 0.5) * 2,
        color: ["#facc15", "#f59e0b", "#ffffff"][Math.floor(Math.random() * 3)],
        size: Math.random() * 5 + 3,
        alpha: 1,
        life: 0.05
      });
    }
  }

  // 战神吕布专属绝技：【无双乱舞 · 鬼神泣】 (360° 画戟狂暴大旋风 + 真实伤害 + 强力击飞)
  castLvBuWhirlwind(battle, dmg = 180) {
    sound.playExplosion();
    battle.screenShake = 16;
    battle.addFloatingText("🐯 无双乱舞 · 鬼神泣！", this.x, this.y - 75, "#dc2626", 1.8);
    this.attackAnimTimer = 35;

    const enemyCastle = this.team === 'red' ? battle.blueCastle : battle.redCastle;
    const maxBoundX = (battle.redCastle && !battle.redCastle.isDead) ? (battle.redCastle.x - 35) : (battle.canvas.width - 40);
    const minBoundX = (battle.blueCastle && !battle.blueCastle.isDead) ? (battle.blueCastle.x + 35) : 40;

    // 向前狂突横扫 (绝不冲出城池或屏幕边界)
    if (this.team === 'red') {
      this.x = Math.max(minBoundX, this.x - 35);
    } else {
      this.x = Math.min(maxBoundX, this.x + 35);
    }

    const enemies = this.team === 'red' ? battle.blueUnits : battle.redUnits;
    enemies.forEach(e => {
      if (!e.isDead && Math.abs(e.x - this.x) < 165) {
        e.takeDamage(dmg, battle, 'true_damage');
        e.vx = this.team === 'red' ? -8 : 8;
        e.isFlying = true;
        e.vy = -6;
      }
    });

    if (enemyCastle && !enemyCastle.isDead && Math.abs(enemyCastle.x - this.x) < 165) {
      enemyCastle.takeDamage(dmg, battle);
    }

    // 金红色战神狂暴烈焰粒子
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 8 + 4;
      battle.particles.push({
        x: this.x,
        y: this.y - 25,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        color: ["#ef4444", "#f97316", "#facc15", "#ffffff"][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 4,
        alpha: 1,
        life: 0.04
      });
    }
  }

  performAttack(target, battle) {
    if (this.type === 'archer') {
      battle.spawnArrow(this.x, this.y - 15, target, this.atk, this.team);
      sound.playCoin();
    } else if (this.type === 'zhugeliang') {
      battle.spawnArrow(this.x, this.y - 15, target, this.atk, this.team);
      sound.playCoin();
      if (Math.random() < 0.35) {
        battle.triggerInkWashSlash({ type: 'canglan', x: target.x, y: target.y - 15, direction: this.team === 'blue' ? 1 : -1, heroName: '八卦奇门' });
      }
    } else if (this.type === 'catapult') {
      battle.spawnBoulder(this.x, this.y - 25, target.x, this.atk);
      sound.playDrum();
    } else {
      sound.playDrum();
      battle.spawnSlashEffect(target.x, target.y - 10);
      
      // 兵种克制与攻击类型判定
      let damage = this.atk;

      // 骑兵冲撞撞击破阵：有几率击退敌方步兵
      if (this.type === 'cavalry' && target.type === 'infantry') {
        damage = Math.floor(damage * 1.3); // 骑兵破步兵
        const maxBound = (battle.redCastle && !battle.redCastle.isDead) ? (battle.redCastle.x - 35) : (battle.canvas.width - 40);
        const minBound = (battle.blueCastle && !battle.blueCastle.isDead) ? (battle.blueCastle.x + 35) : 40;
        target.x = Math.max(minBound, Math.min(maxBound, target.x + (this.team === 'blue' ? 12 : -12)));
      }

      let totalHits = 1;
      let isStunProc = false;
      let isCritProc = false;
      let isComboProc = false;
      let isLifestealProc = false;

      // 战神吕布狂暴/暴击模式普攻特技判定
      if (this.type.startsWith('lvbu')) {
        this.attackRoundCount = (this.attackRoundCount || 0) + 1;
        if (this.isBerserk) {
          // 1. 每打 2 回合 5% 概率击晕敌人，且狂暴模式击晕时吕布连出两下攻击 (受敌方铁志抗性减免)
          if (this.attackRoundCount % 2 === 0 && Math.random() < 0.05) {
            isStunProc = true;
            totalHits = Math.max(totalHits, 2);
            if (!(target instanceof Castle)) {
              if (target.stunResist > 0 && Math.random() < target.stunResist) {
                battle.addFloatingText("🛡️ 铁志抵抗眩晕！", target.x, target.y - 50, "#059669", 1.4);
                target.stunTimer = 0;
              } else {
                const stunDuration = Math.max(30, Math.floor(180 * (1 - (target.stunResist || 0) * 0.8)));
                target.stunTimer = stunDuration; // 3 秒基准，依抗性缩减
              }
            }
            battle.addFloatingText("💫 战神击晕！神速连斩两下！", this.x, this.y - 65, "#facc15", 1.6);
          }

          // 2. 每 3 回合 8% 概率出现连击，最少攻打 2 次，最多打 4 次
          if (this.attackRoundCount % 3 === 0 && Math.random() < 0.08) {
            isComboProc = true;
            const comboHits = 2 + Math.floor(Math.random() * 3); // 2, 3, 4
            totalHits = Math.max(totalHits, comboHits);
            battle.addFloatingText(`⚡ 狂暴连击 x${totalHits}！`, this.x, this.y - 75, "#ea580c", 1.7);
          }

          // 3. 每打 4 回合 20% 概率出现暴击，对敌伤害乘以 2
          if (this.attackRoundCount % 4 === 0 && Math.random() < 0.20) {
            isCritProc = true;
            damage = damage * 2;
            battle.screenShake = 12;
            battle.triggerInkWashSlash({ type: 'lvbu', x: this.x, y: this.y, direction: this.team === 'blue' ? 1 : -1, heroName: '吕布' });
            battle.addFloatingText(`💥 战神暴击！伤害 x2！`, target.x, target.y - 45, "#dc2626", 1.8);
          }

          // 4. 每 2 回合 10% 概率吸取敌方生命
          if (this.attackRoundCount % 2 === 0 && Math.random() < 0.10) {
            isLifestealProc = true;
          }
        }
      }

      // ⚔️ 我方全军战术军略：会心暴击与嗜血研习触发
      if (this.team === 'blue') {
        if (this.critRate > 0 && Math.random() < this.critRate) {
          damage = Math.floor(damage * 1.75);
          battle.addFloatingText("💥 会心暴击！", target.x, target.y - 35, "#ea580c", 1.3);
          battle.spawnSpark(target.x, target.y - 15);
        }
        if (this.lifestealRate > 0 && Math.random() < this.lifestealRate) {
          const heal = Math.min(Math.floor(damage * 0.5), 60);
          this.hp = Math.min(this.maxHp, this.hp + heal);
          battle.addFloatingText(`🩸 嗜血 +${heal}`, this.x, this.y - 40, "#22c55e", 1.2);
        }
      }

      // 执行普攻（支持单发、击晕双击或 2~4 次狂暴连击）
      for (let h = 0; h < totalHits; h++) {
        if (target.isDead) break;
        if (target instanceof Castle) {
          const castleDmg = Math.max(8, Math.floor(damage * 0.35));
          target.takeDamage(castleDmg, battle);
        } else {
          target.takeDamage(damage, battle, this.type);
        }

        if (this.isHero && this.team === 'blue') {
          this.addRage(12);
        }

        if (h > 0) {
          battle.spawnSlashEffect(target.x + (Math.random() - 0.5) * 20, target.y - 10 + (Math.random() - 0.5) * 15);
        }

        // 嗜血吸心结算 (恢复等额生命值，上限不超过 maxHp)
        if (isLifestealProc && h === 0) {
          const healAmount = Math.min(damage, 140);
          this.hp = Math.min(this.maxHp, this.hp + healAmount);
          battle.addFloatingText(`🩸 战神嗜血 +${healAmount} HP！`, this.x, this.y - 55, "#22c55e", 1.5);
          for (let p = 0; p < 8; p++) {
            battle.particles.push({
              x: target.x,
              y: target.y - 15,
              vx: (this.x - target.x) * 0.08 + (Math.random() - 0.5) * 2,
              vy: -Math.random() * 3 - 1,
              color: "#22c55e",
              size: 4,
              alpha: 1,
              life: 0.05
            });
          }
        }
      }

      // 🗡️ 装备特技：【破军横扫】(方天画戟特技)
      if (this.equipSkills && this.equipSkills.some(s => s.id === 'pojun' || s.id === 'pojun_plus' || s.id === 'guishenqi')) {
        if (Math.random() < 0.35) {
          battle.addFloatingText("✨ 破军横扫！", this.x + 20, this.y - 45, "#f59e0b", 1.4);
          const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
          enemies.forEach(e => {
            if (!e.isDead && Math.abs(e.x - this.x) < 140) {
              e.takeDamage(Math.floor(this.atk * 0.75), battle, 'slash');
              e.x += this.team === 'blue' ? 12 : -12;
            }
          });
        }
      }
    }
  }

  takeDamage(amount, battle, attackType = 'normal') {
    if (this.invulnerableTimer > 0) {
      battle.addFloatingText("✨ 金身无敌！免伤！", this.x, this.y - 45, "#facc15", 1.3);
      battle.spawnSpark(this.x, this.y - 20);
      return;
    }

    let finalDmg = amount;

    // 🛡️ 临时护盾吸收判定 (如先锋护盾、霸体护盾)
    if (this.shield > 0) {
      if (this.shield >= finalDmg) {
        this.shield -= finalDmg;
        battle.addFloatingText(`🛡️ 护盾抵消 -${finalDmg}`, this.x, this.y - 45, "#38bdf8", 1.1);
        battle.spawnSpark(this.x, this.y - 20);
        return;
      } else {
        finalDmg -= this.shield;
        battle.addFloatingText("🛡️ 护盾破裂！", this.x, this.y - 45, "#38bdf8", 1.1);
        this.shield = 0;
      }
    }

    // 🛡️ 魏武铁壁死卫羁绊：曹操受创 20% 转移给身边存活的典韦/许褚
    if (this.team === 'blue' && this.type === 'caocao' && battle.synergyBuffs && battle.synergyBuffs.damageShareRatio > 0) {
      const bodyguard = battle.blueUnits.find(u => !u.isDead && (u.type === 'dianwei' || u.type === 'xuchu') && Math.abs(u.x - this.x) < 140);
      if (bodyguard) {
        const shared = Math.floor(finalDmg * battle.synergyBuffs.damageShareRatio);
        finalDmg -= shared;
        bodyguard.takeDamage(shared, battle, 'shared');
        battle.addFloatingText(`🛡️ 死卫分摊 -${shared}`, bodyguard.x, bodyguard.y - 40, "#a855f7", 1.1);
      }
    }

    // 💨 我方全军神行闪避训练：有几率触发身法闪避敌方伤害 (0 扣血)
    if (this.team === 'blue' && this.dodgeRate > 0) {
      if (Math.random() < this.dodgeRate) {
        battle.addFloatingText("💨 灵巧闪避！未受伤害！", this.x, this.y - 45, "#38bdf8", 1.2);
        battle.spawnSpark(this.x, this.y - 20);
        return;
      }
    }

    // 战神狂暴模式受击判定：每 2 回合 10% 概率闪避，完全避开敌方伤害 (0 伤害)
    if (this.type.startsWith('lvbu') && this.isBerserk) {
      this.defendRoundCount = (this.defendRoundCount || 0) + 1;
      if (this.defendRoundCount % 2 === 0 && Math.random() < 0.10) {
        battle.addFloatingText("💨 绝世闪避！未受伤害！", this.x, this.y - 50, "#38bdf8", 1.5);
        battle.spawnSpark(this.x, this.y - 20);
        return;
      }
    }

    // 坚盾步兵格挡箭矢：远程飞箭伤害减免 50%
    if (this.type === 'infantry' && attackType === 'arrow') {
      finalDmg = Math.max(4, Math.floor(amount * 0.5));
      battle.addFloatingText("🛡️ 格挡 -50%", this.x, this.y - 50, "#38bdf8", 1.1);
    }

    // 弓兵穿甲对重甲骑兵造成额外伤害
    if (this.type === 'cavalry' && attackType === 'arrow') {
      finalDmg = Math.floor(amount * 1.25);
    }

    // 🛡️ 装备特技：宝甲百分比免伤 (如兽面吞头连环铠)
    if (this.defRed > 0) {
      finalDmg = Math.max(2, Math.floor(finalDmg * (1 - this.defRed)));
    }

    // 🛡️ 战神防御力属性抵扣伤害 (抵扣至多 100 点伤害，真实伤害除外，保留保底 2 点伤害)
    if (this.defense > 0 && attackType !== 'true_damage') {
      const absorbed = Math.min(this.defense, Math.max(0, finalDmg - 2));
      finalDmg -= absorbed;
    }

    // 🛡️ 装备特技：铁壁近战反伤 (如玄武铁壁重铠)
    if (this.reflect > 0 && attackType !== 'reflect' && attackType !== 'arrow' && attackType !== 'bomb') {
      const reflectDmg = Math.max(4, Math.floor(finalDmg * this.reflect));
      battle.addFloatingText(`⚡ 反伤 -${reflectDmg}`, this.x, this.y - 55, "#a855f7", 1.1);
      const enemyCastle = this.team === 'blue' ? battle.redCastle : battle.blueCastle;
      // 反弹伤害给最近的敌兵
      const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
      const nearest = enemies.find(e => !e.isDead && Math.abs(e.x - this.x) < 100);
      if (nearest) nearest.takeDamage(reflectDmg, battle, 'reflect');
    }

    this.hp -= finalDmg;
    this.hurtTimer = 10;
    battle.addFloatingText(`-${finalDmg}`, this.x, this.y - 40, this.team === 'blue' ? "#ef4444" : "#f59e0b");

    if (this.isHero && this.team === 'blue') {
      this.addRage(Math.min(25, Math.max(6, Math.floor(finalDmg * 0.15))));
    }

    if (this.hp <= 0 && !this.isDead) {
      this.isDead = true;
      battle.spawnDeathGhost(this.x, this.y);

      // 蜀汉阵营共鸣抚恤金返还 (出战蜀将阵亡返还20%军资)
      if (this.team === 'blue' && battle.synergyBuffs && battle.synergyBuffs.deathRefundRatio > 0 && battle.isHeroType(this.type)) {
        const refund = Math.round((this.cost || 200) * battle.synergyBuffs.deathRefundRatio);
        if (refund > 0 && battle.mainRef) {
          battle.mainRef.gold += refund;
          battle.addFloatingText(`🪙 蜀汉抚恤 +${refund}`, this.x, this.y - 50, "#22c55e", 1.5);
        }
      }

      // 击杀敌军掉落铜钱奖励与流光跳字
      if (this.team === 'red') {
        const isLuBu = this.type.startsWith('lvbu');
        const isBoss = isLuBu || this.type.startsWith('enemy_boss_');

        const dropCopper = isLuBu ? 160 : (this.type.startsWith('enemy_boss_') ? 120 : ({
          infantry: 15,
          archer: 20,
          cavalry: 35,
          catapult: 50
        }[this.type] || 25));

        const multiplier = (battle.tripleGoldTimer > 0) ? 3 : 1;
        const actualEarn = dropCopper * multiplier;

        battle.totalCopperEarned = (battle.totalCopperEarned || 0) + actualEarn;
        battle.addFloatingText(`🪙 +${actualEarn}`, this.x, this.y - 55, "#facc15", 1.4);
        battle.spawnCoinParticles(this.x, this.y);

        if (isLuBu) {
          battle.addFloatingText("🔱 战神陨落！斩获【方天画戟】专属神装战利品！", this.x, this.y - 85, "#f59e0b", 1.8);
          battle.screenShake = 12;
          for (let i = 0; i < 20; i++) battle.spawnSpark(this.x + (Math.random() - 0.5) * 60, this.y - 30);
        } else if (isBoss) {
          battle.addFloatingText("🎁 斩落敌将！掉落名将专属升星碎片战利品！", this.x, this.y - 80, "#38bdf8", 1.6);
          battle.screenShake = 8;
        }
      } else if (this.team === 'blue' && battle.isHeroType(this.type)) {
        const hName = battle.getHeroName(this.type);
        battle.addFloatingText(`⚠️【${hName}】力竭阵亡！可重新召集出征！`, this.x, this.y - 70, "#fca5a5", 1.8);
      }
    }
  }

  draw(ctx, battle) {
    if (this.isDead) return;

    ctx.save();

    if (this.isFlying) {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.translate(-this.x, -this.y);
    }

    // 🔥 名将满怒金色流光太极阵光环 (脚下八卦金色流光光圈与公转灵珠)
    if (this.isHero && this.team === 'blue' && this.ultimateReady) {
      const t = (battle.battleDurationFrames || 0) * 0.08;
      ctx.save();
      ctx.translate(this.x, this.y - 2);
      
      // 外层八卦旋转金圈
      ctx.strokeStyle = "rgba(250, 204, 21, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.ellipse(0, 0, 26 + Math.sin(t * 2) * 2, 9 + Math.sin(t * 2) * 1, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 内层旋转金芒刻度
      ctx.save();
      ctx.rotate(t);
      ctx.strokeStyle = "rgba(254, 240, 138, 0.9)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * 12, Math.sin(ang) * 4);
        ctx.lineTo(Math.cos(ang) * 22, Math.sin(ang) * 7.5);
        ctx.stroke();
      }
      ctx.restore();

      // 围绕光圈公转的 4 颗金芒灵珠
      for (let i = 0; i < 4; i++) {
        const beadAng = -t * 1.5 + (i * Math.PI / 2);
        const bx = Math.cos(beadAng) * 24;
        const by = Math.sin(beadAng) * 8.5;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    try {
      if (this.type === 'infantry') {
        CharacterRenderer.drawInfantry(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.hurtTimer, this.team);
      } else if (this.type === 'archer') {
        CharacterRenderer.drawArcher(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.hurtTimer, this.team);
      } else if (this.type === 'cavalry') {
        CharacterRenderer.drawCavalry(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.hurtTimer, this.team);
      } else if (this.type === 'catapult') {
        CharacterRenderer.drawCatapult(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.team);
      } else if (this.type.startsWith('enemy_boss_') || this.type === 'enemy_boss') {
        const bossKey = this.bossType || this.type.replace('enemy_boss_', '');
        CharacterRenderer.drawEnemyGeneral(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.hurtTimer, bossKey, this.team);
      } else {
        // 全40位名将专属与精细化像素路由 (支持独立Sprite或高保真专属映射)
        const heroKey = this.type.replace(/_ch\d+$/, '');
        const mapCfg = HERO_SPRITE_MAPPING[heroKey] || HERO_SPRITE_MAPPING[this.type];
        if (mapCfg) {
          const drawn = CharacterRenderer.drawPixelGeneral(
            ctx, this.x, this.y, mapCfg.sprite, this.walkCycle, this.attackAnimTimer, this.hurtTimer, this.team,
            { slash: mapCfg.slash, slashColor: mapCfg.slashColor }
          );
          if (!drawn) {
            CharacterRenderer.drawEnemyGeneral(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.hurtTimer, heroKey, this.team);
          }
        } else {
          // 通用名将兜底
          CharacterRenderer.drawEnemyGeneral(ctx, this.x, this.y, this.walkCycle, this.attackAnimTimer, this.hurtTimer, heroKey, this.team);
        }
      }
    } catch (err) {
      console.warn("Unit draw error", err);
    }

    // 战神狂暴模式红莲修罗煞气光环与头顶印记
    if (this.type.startsWith('lvbu') && this.isBerserk) {
      const t = (battle.battleDurationFrames || 0) * 0.12;
      ctx.save();
      ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
      ctx.lineWidth = 3.5;
      ctx.shadowColor = "#dc2626";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y - 2, 28 + Math.sin(t) * 3, 9 + Math.cos(t) * 2, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 狂暴模式头顶印记
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "#7f1d1d";
      ctx.shadowBlur = 6;
      ctx.fillText("🔥 狂暴修罗", this.x, this.y - 78);
      ctx.restore();
    }

    // 💫 被击晕单位头顶金色旋转光圈动画 (敌方被击晕的那个人头上会有一个金色的圈圈在他头上一直转)
    if (this.stunTimer > 0) {
      const headY = this.y - (this.size || 32) - 16;
      const spinAngle = (battle.battleDurationFrames || 0) * 0.16;
      ctx.save();
      ctx.translate(this.x, headY);
      
      // 倾斜立体旋转金色光圈
      ctx.rotate(Math.PI / 12);
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 6, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 围绕光圈公转的 3 枚小金星
      for (let i = 0; i < 3; i++) {
        const starAngle = spinAngle + (i * Math.PI * 2 / 3);
        const starX = Math.cos(starAngle) * 16;
        const starY = Math.sin(starAngle) * 6;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#fef08a";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(starX, starY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 👑 敌将金色标识展示
    if (this.type.startsWith('enemy_boss_') || this.type.startsWith('lvbu')) {
      ctx.fillStyle = "#facc15";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("👑 " + (this.bossName || "敌将"), this.x, this.y - 64);
    }

    // ⭐ 蓝方名将生命槽、怒气槽与绝技就绪标识
    if (this.isHero && this.team === 'blue') {
      const heroName = this.bossName || (battle.getHeroName ? battle.getHeroName(this.type) : "名将");
      const headY = this.y - 58;
      const barW = 44;
      const barH = 5;
      const rageH = 4;

      // 头顶武将名号
      ctx.fillStyle = "#fde047";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.85)";
      ctx.shadowBlur = 4;
      ctx.fillText(`⭐ ${heroName}`, this.x, headY - 14);

      // 绝技就绪时头顶跳动徽标：🔥【绝技就绪】
      if (this.ultimateReady) {
        const bounce = Math.sin((battle.battleDurationFrames || 0) * 0.15) * 3;
        ctx.save();
        ctx.fillStyle = "#fef08a";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "#dc2626";
        ctx.shadowBlur = 10;
        ctx.fillText("🔥 绝技就绪！", this.x, headY - 26 + bounce);
        ctx.restore();
      }

      // 生命条 (常驻)
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.fillRect(this.x - barW / 2, headY - 8, barW, barH);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(this.x - barW / 2, headY - 8, barW * (Math.max(0, this.hp) / this.maxHp), barH);

      // 金色怒气条 (常驻)
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(this.x - barW / 2, headY - 2, barW, rageH);
      
      const rageRatio = Math.max(0, Math.min(1, (this.rage || 0) / this.maxRage));
      if (this.ultimateReady) {
        // 满怒流金闪耀动效
        ctx.save();
        const flashGrad = ctx.createLinearGradient(this.x - barW / 2, 0, this.x + barW / 2, 0);
        flashGrad.addColorStop(0, "#f59e0b");
        flashGrad.addColorStop(0.5, "#ffffff");
        flashGrad.addColorStop(1, "#f59e0b");
        ctx.fillStyle = flashGrad;
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 8;
        ctx.fillRect(this.x - barW / 2, headY - 2, barW * rageRatio, rageH);
        ctx.restore();
      } else {
        // 蓄力金橙渐变
        const rageGrad = ctx.createLinearGradient(this.x - barW / 2, 0, this.x + barW / 2, 0);
        rageGrad.addColorStop(0, "#d97706");
        rageGrad.addColorStop(1, "#facc15");
        ctx.fillStyle = rageGrad;
        ctx.fillRect(this.x - barW / 2, headY - 2, barW * rageRatio, rageH);
      }
    } else if (this.hp < this.maxHp) {
      // 普通小兵与敌方单位血条
      const barW = this.type.startsWith('enemy_boss_') || this.type.startsWith('lvbu') ? 44 : 32;
      const barH = 5;
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(this.x - barW / 2, this.y - 58, barW, barH);
      ctx.fillStyle = this.team === 'blue' ? "#38bdf8" : "#f87171";
      ctx.fillRect(this.x - barW / 2, this.y - 58, barW * (Math.max(0, this.hp) / this.maxHp), barH);
    }

    ctx.restore();
  }
}

// 抛物线实体小箭 (高真度飞箭、倒刺钢簇与风痕气流)
export class Arrow {
  constructor(startX, startY, target, damage, team) {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.prevX = startX;
    this.prevY = startY;
    this.target = target;
    this.targetX = target.x;
    this.targetY = target.y - 15;
    this.damage = damage;
    this.team = team;
    this.progress = 0;
    this.speed = 0.045;
    this.arcHeight = 40;
    this.isFinished = false;
    this.angle = team === 'blue' ? 0.3 : -0.3 + Math.PI;
    this.trail = [];
  }

  update(battle) {
    this.prevX = this.x;
    this.prevY = this.y;
    this.progress += this.speed;
    this.x = this.startX + (this.targetX - this.startX) * this.progress;
    const arc = Math.sin(this.progress * Math.PI) * this.arcHeight;
    this.y = this.startY + (this.targetY - this.startY) * this.progress - arc;

    const dx = this.x - this.prevX;
    const dy = this.y - this.prevY;
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      this.angle = Math.atan2(dy, dx);
    }

    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 5) this.trail.shift();

    if (this.progress >= 1) {
      this.isFinished = true;
      if (this.target && !this.target.isDead) {
        this.target.takeDamage(this.damage, battle, 'arrow');
      }
      battle.spawnSpark(this.targetX, this.targetY);
    }
  }

  draw(ctx) {
    ctx.save();

    // 飞行动态气流羽痕
    if (this.trail.length > 1) {
      ctx.save();
      ctx.strokeStyle = this.team === 'blue' ? "rgba(96, 165, 250, 0.45)" : "rgba(248, 113, 113, 0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // 箭杆 (木质实心箭杆)
    ctx.strokeStyle = "#854d0e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-11, 0);
    ctx.lineTo(9, 0);
    ctx.stroke();

    // 锋利精钢箭簇 (破甲三角箭头)
    ctx.fillStyle = "#e2e8f0";
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(13, 0);
    ctx.lineTo(7, -3);
    ctx.lineTo(8, 0);
    ctx.lineTo(7, 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 阵营羽翎 (箭羽尾翼)
    ctx.fillStyle = this.team === 'blue' ? "#3b82f6" : "#ef4444";
    ctx.beginPath();
    ctx.moveTo(-11, 0);
    ctx.lineTo(-6, -3.5);
    ctx.lineTo(-2, 0);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-11, 0);
    ctx.lineTo(-6, 3.5);
    ctx.lineTo(-2, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

// 投石巨车掷出的滚石 (3D 旋转青石、岩棱高光、飞沙走石与落地投影)
export class Boulder {
  constructor(startX, startY, targetX, damage) {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.damage = damage;
    this.progress = 0;
    this.speed = 0.025;
    this.arcHeight = 95;
    this.rotation = 0;
    this.isFinished = false;
  }

  update(battle) {
    this.progress += this.speed;
    this.rotation += 0.18;
    this.x = this.startX + (this.targetX - this.startX) * this.progress;
    const arc = Math.sin(this.progress * Math.PI) * this.arcHeight;
    this.y = this.startY + (battle.groundY - 15 - this.startY) * this.progress - arc;

    // 滚动飞沙走石烟尘粒子
    if (Math.random() < 0.45) {
      battle.particles.push({
        x: this.x + (Math.random() - 0.5) * 12,
        y: this.y + (Math.random() - 0.5) * 12,
        vx: -Math.sign(this.targetX - this.startX) * (Math.random() * 2 + 1),
        vy: (Math.random() - 0.5) * 2,
        color: ["#94a3b8", "#cbd5e1", "#e2e8f0"][Math.floor(Math.random() * 3)],
        size: Math.random() * 4 + 2,
        alpha: 0.7,
        life: 0.05
      });
    }

    if (this.progress >= 1) {
      this.isFinished = true;
      battle.triggerBoulderImpact(this.targetX, battle.groundY, this.damage);
    }
  }

  draw(ctx, battle) {
    ctx.save();

    // 投石地面接触投影
    if (battle) {
      const groundShadowY = battle.groundY - 6;
      const heightAbove = Math.max(0, groundShadowY - this.y);
      const shadowScale = Math.max(0.3, 1 - heightAbove / 130);
      ctx.fillStyle = "rgba(15, 23, 42, 0.28)";
      ctx.beginPath();
      ctx.ellipse(this.x, groundShadowY, 15 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3D 旋转青石巨石
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // 巨石主体
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    // 暗部凹凸阴影
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.arc(2, 2, 13, 0, Math.PI * 0.75);
    ctx.arc(-2, -2, 11, Math.PI * 0.75, 0, true);
    ctx.fill();

    // 亮部高光岩棱
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-3, -3, 8, Math.PI, Math.PI * 1.5);
    ctx.stroke();

    // 岩石碎裂纹理
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-5, 2);
    ctx.lineTo(0, -1);
    ctx.lineTo(6, 4);
    ctx.stroke();

    ctx.restore();
  }
}

// 战术炸药包 / 敌方霹雳火雷 (生铁火药球、黄铜喷嘴、燃烧火星与飞烟拖尾)
export class BombProjectile {
  constructor(startX, startY, targetX, targetY, damage, team = 'blue') {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.team = team;
    this.progress = 0;
    this.speed = 0.035;
    this.arcHeight = 110;
    this.isFinished = false;
  }

  update(battle) {
    this.progress += this.speed;
    this.x = this.startX + (this.targetX - this.startX) * this.progress;
    const arc = Math.sin(this.progress * Math.PI) * this.arcHeight;
    this.y = this.startY + (this.targetY - this.startY) * this.progress - arc;

    // 引线燃烧火星与飞烟拖尾
    if (Math.random() < 0.7) {
      battle.particles.push({
        x: this.x + 6,
        y: this.y - 14,
        vx: (Math.random() - 0.5) * 2 - (this.team === 'blue' ? 1.5 : -1.5),
        vy: -Math.random() * 2.5 - 1,
        color: ["#f59e0b", "#f97316", "#ef4444", "#fef08a"][Math.floor(Math.random() * 4)],
        size: Math.random() * 4 + 2,
        alpha: 0.9,
        life: 0.06
      });
    }

    if (this.progress >= 1) {
      this.isFinished = true;
      if (this.team === 'blue') {
        battle.triggerExplosion(this.targetX, this.targetY, this.damage);
      } else {
        battle.triggerEnemyExplosion(this.targetX, this.targetY, this.damage);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // 生铁黑火雷球体 (带有金属球体高光)
    const rad = 13;
    const ironGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, rad);
    ironGrad.addColorStop(0, "#64748b");
    ironGrad.addColorStop(0.5, "#1e293b");
    ironGrad.addColorStop(1, "#090d16");
    ctx.fillStyle = ironGrad;
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.fill();

    // 铁雷高光点
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(-4, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 雷管黄铜火药喷嘴
    ctx.fillStyle = "#b45309";
    ctx.fillRect(-3, -rad - 3, 6, 4);

    // 弯曲麻绳导火索
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -rad - 2);
    ctx.quadraticCurveTo(4, -rad - 8, 7, -rad - 9);
    ctx.stroke();

    // 导火索端头剧烈燃烧火球 (呼吸脉冲)
    const sparkR = 3.5 + Math.sin(Date.now() * 0.035) * 1.5;
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(7, -rad - 9, sparkR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.arc(7, -rad - 9, sparkR * 0.65, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// 城堡大营类
export class Castle {
  constructor(x, groundY, team, maxHp = 1500, stageId = 1) {
    this.x = x;
    this.y = groundY;
    this.team = team;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.shakeTimer = 0;
    this.isDead = false;
    this.stageId = stageId;

    this.towerRange = 280;
    this.towerCooldown = 55;
    this.towerTimer = 0;
  }

  update(battle) {
    if (this.isDead) return;

    // 城堡箭塔自动防卫射击
    this.towerTimer++;
    if (this.towerTimer >= this.towerCooldown) {
      const enemies = this.team === 'blue' ? battle.redUnits : battle.blueUnits;
      for (const enemy of enemies) {
        if (enemy.isDead) continue;
        const dist = Math.abs(enemy.x - this.x);
        if (dist <= this.towerRange) {
          const dmg = (this.team === 'blue' && battle.upgrades.towerDmg) ? 28 : 20;
          battle.spawnArrow(this.x, this.y - 100, enemy, dmg, this.team);
          this.towerTimer = 0;
          break;
        }
      }
    }
  }

  takeDamage(amount, battle) {
    this.hp -= amount;
    this.shakeTimer = 8;
    battle.addFloatingText(`-${amount}`, this.x, this.y - 105, "#dc2626");

    if (this.hp <= 0) {
      this.hp = 0;
      this.isDead = true;
      battle.onCastleDestroyed(this.team);
    }
  }

  draw(ctx, stageId = this.stageId) {
    try {
      CharacterRenderer.drawCastle(ctx, this.x, this.y, this.team, this.hp / this.maxHp, this.shakeTimer, stageId || this.stageId || 1);
    } catch (err) {
      console.warn("Castle draw error", err);
    }
  }
}

// 横版推线主游戏战场世界
export class BattleWorld {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.groundY = 300;
    this.stageId = 1;

    this.blueUnits = [];
    this.redUnits = [];
    this.arrows = [];
    this.bombs = [];
    this.boulders = [];
    this.particles = [];
    this.floatingTexts = [];
    this.inkSlashes = [];

    // 苍穹归雁行阵 (极简水墨剪影)
    this.wildGeese = [
      { relX: 0, relY: 0, scale: 0.9 },
      { relX: -22, relY: 14, scale: 0.82 },
      { relX: -44, relY: 28, scale: 0.75 },
      { relX: -20, relY: -14, scale: 0.82 },
      { relX: -40, relY: -28, scale: 0.75 }
    ];
    this.geeseFlockX = 350;
    this.geeseFlockY = 65;
    this.geeseSpeed = 0.55;
    this.geeseWingTimer = 0;

    // 战场微风飘絮与桃花落英微粒
    this.ambientPetals = Array.from({ length: 16 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 300,
      vx: -(Math.random() * 0.7 + 0.5),
      vy: Math.random() * 0.4 + 0.25,
      size: Math.random() * 3 + 2,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.05,
      color: Math.random() > 0.4 ? "#fbcfe8" : "#fed7aa"
    }));

    this.blueCastle = null;
    this.redCastle = null;
    this.maxBombRangeX = 800;

    this.upgrades = {
      infantryHp: 0,
      archerPower: 0,
      bombPower: 0,
      castleHp: 0,
      towerDmg: false,
      superCharm: false,
      dodgeRate: 0,
      stunResist: 0,
      critRate: 0,
      lifestealRate: 0,
      armyDefense: 0
    };

    this.weapons = {
      shuanggu_jian: 0,
      qinglong_dao: 0,
      zhangba_shemao: 0,
      longdan_qiang: 0,
      baodiao_gong: 0,
      baiyu_fan: 0
    };

    this.heroEquipBonuses = {}; // 各名将穿戴装备加成表

    this.windmillAngle = 0;
    this.cloudOffset = 0;
    this.screenShake = 0;
    this.isGameOver = false;
    this.winner = null;

    this.battleDurationFrames = 0;
    this.heroUltimateCastCount = 0;
    this.rankBuff = { atkBonus: 0, defBonus: 0 };

    // 战场多元地形与动态天气系统 (plains, naval, mountain, night_fire, desert)
    this.battlefieldTheme = 'plains';
    this.battlefieldWeather = 'sunny';
    this.weatherParticles = [];
    this.ultimateCutin = null;
    this.initWeatherParticles();
  }

  triggerScreenShake(intensity = 16) {
    this.screenShake = Math.max(this.screenShake || 0, intensity);
  }

  setBattlefieldTheme(theme = 'plains', weather = 'sunny') {
    this.battlefieldTheme = theme || 'plains';
    this.battlefieldWeather = weather || 'sunny';
    this.initWeatherParticles();
  }

  initWeatherParticles() {
    const w = this.canvas ? this.canvas.width : 900;
    const h = this.canvas ? this.canvas.height : 450;
    const weather = this.battlefieldWeather;

    if (weather === 'mist') {
      this.weatherParticles = Array.from({ length: 24 }, () => ({
        x: Math.random() * w,
        y: (Math.random() * 0.7 + 0.3) * h,
        vx: Math.random() * 0.4 + 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 32 + 20,
        alpha: Math.random() * 0.35 + 0.15,
        type: 'mist'
      }));
    } else if (weather === 'fire_embers') {
      this.weatherParticles = Array.from({ length: 36 }, () => ({
        x: Math.random() * w,
        y: h - Math.random() * 200,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 2.2 + 0.8),
        size: Math.random() * 4 + 2,
        alpha: Math.random() * 0.8 + 0.2,
        color: ['#ef4444', '#f97316', '#facc15', '#b91c1c'][Math.floor(Math.random() * 4)],
        type: 'ember'
      }));
    } else if (weather === 'sand') {
      this.weatherParticles = Array.from({ length: 32 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: -(Math.random() * 5.5 + 3.5),
        vy: Math.random() * 1.2 + 0.2,
        size: Math.random() * 4 + 2,
        alpha: Math.random() * 0.6 + 0.3,
        color: ['#ca8a04', '#d97706', '#f59e0b', '#78350f'][Math.floor(Math.random() * 4)],
        type: 'sand'
      }));
    } else if (weather === 'wind') {
      this.weatherParticles = Array.from({ length: 22 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: -(Math.random() * 2.5 + 1.2),
        vy: Math.random() * 1.5 + 0.6,
        size: Math.random() * 5 + 3,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        color: ['#dc2626', '#ea580c', '#b45309', '#ca8a04'][Math.floor(Math.random() * 4)],
        type: 'leaf'
      }));
    } else {
      this.weatherParticles = Array.from({ length: 18 }, () => ({
        x: Math.random() * w,
        y: Math.random() * (this.groundY || 300),
        vx: -(Math.random() * 0.8 + 0.4),
        vy: Math.random() * 0.5 + 0.25,
        size: Math.random() * 4 + 2,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.05,
        color: Math.random() > 0.4 ? "#fbcfe8" : "#fed7aa",
        type: 'petal'
      }));
    }
  }

  updateWeatherParticles() {
    const w = this.canvas ? this.canvas.width : 900;
    const h = this.canvas ? this.canvas.height : 450;
    const gTop = this.groundY;

    this.weatherParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.rot !== undefined && p.vRot !== undefined) p.rot += p.vRot;

      if (p.type === 'mist') {
        if (p.x > w + p.size) p.x = -p.size;
      } else if (p.type === 'ember') {
        if (p.y < 20 || p.x < 0 || p.x > w) {
          p.y = gTop + Math.random() * 40;
          p.x = Math.random() * w;
        }
      } else if (p.type === 'sand') {
        if (p.x < -20) {
          p.x = w + 20;
          p.y = Math.random() * h;
        }
      } else {
        if (p.x < -20) p.x = w + 20;
        if (p.y > gTop + 20) {
          p.y = 20 + Math.random() * 80;
          p.x = w + Math.random() * 40;
        }
      }
    });
  }

  triggerUltimateCutin({ heroKey, heroName, skillName, shout, color }) {
    this.ultimateCutin = {
      heroKey: heroKey || 'guanyu',
      heroName: heroName || '当世名将',
      skillName: skillName || '无双破阵',
      shout: shout || '受死吧！',
      color: color || '#facc15',
      frame: 0,
      maxFrames: 68
    };
    this.triggerScreenShake(18);
  }

  // 释放特技写意水墨飞白大刀芒与沉浸震屏
  triggerInkWashSlash({ type, x, y, direction = 1, heroName = '' }) {
    this.screenShake = 12; // 强力震屏

    // 依技能定制光晕与墨势
    let aura = "#ea580c";
    if (type === 'zhaoyun' || type === 'canglan') aura = "#38bdf8";
    else if (type === 'guanyu' || type === 'qinglong') aura = "#22c55e";
    else if (type === 'zhangfei' || type === 'dangyang') aura = "#f97316";
    else if (type === 'huangzhong' || type === 'chiyang') aura = "#facc15";
    else if (type === 'lvbu' || type === 'crimson') aura = "#dc2626";

    this.inkSlashes.push({
      type,
      x,
      y,
      direction,
      heroName,
      aura,
      frame: 0,
      maxFrames: 22,
      splashes: Array.from({ length: 18 }, () => ({
        dx: (direction * (Math.random() * 90 + 30)),
        dy: (Math.random() - 0.5) * 60,
        r: Math.random() * 6 + 2.5
      }))
    });
  }

  init(enemyMaxHp = 1500, stageId = 1, objective = null) {
    this.stageId = stageId;
    this.resize();

    this.blueUnits = [];
    this.redUnits = [];
    this.arrows = [];
    this.bombs = [];
    this.boulders = [];
    this.particles = [];
    this.floatingTexts = [];
    this.inkSlashes = [];

    const blueBaseHp = 1500 + this.upgrades.castleHp;
    this.blueCastle = new Castle(80, this.groundY, 'blue', blueBaseHp, this.stageId);
    this.redCastle = new Castle(this.canvas.width - 80, this.groundY, 'red', enemyMaxHp, this.stageId);

    this.isGameOver = false;
    this.winner = null;
    this.battleDurationFrames = 0;
    this.heroUltimateCastCount = 0;
    this.totalCopperEarned = 0;

    // 战役目标系统 (攻城破寨 / 斩将夺旗 / 据险固守)
    this.objective = objective || { type: "destroy_castle", label: "攻城破寨", desc: "击溃敌方要塞！" };
    this.targetBossUnit = null;
    this.defendFramesLeft = (this.objective.targetTimeSeconds || 75) * 60;

    // 战前编队激活的羁绊与平衡数值
    this.activeSynergies = [];
    this.synergyBuffs = {};
    this.mainRef = null;
    this.taoyuanSaved = false;
  }

  setRankBuff(rankBuff) {
    this.rankBuff = rankBuff || { atkBonus: 0, defBonus: 0 };
  }

  setSynergies(synergies, buffs, mainRef) {
    this.activeSynergies = synergies || [];
    this.synergyBuffs = buffs || {};
    this.mainRef = mainRef || null;
    this.taoyuanSaved = false;

    if (this.blueCastle && this.synergyBuffs.castleHpMult) {
      this.blueCastle.maxHp = Math.round(this.blueCastle.maxHp * (1 + this.synergyBuffs.castleHpMult));
      this.blueCastle.hp = this.blueCastle.maxHp;
    }

    if (this.activeSynergies.length > 0) {
      const synNames = this.activeSynergies.map(s => `【${s.name}】`).join(" ");
      setTimeout(() => {
        this.addFloatingText(`✨ 激活羁绊: ${synNames}`, this.canvas.width * 0.45, this.groundY - 110, "#facc15", 2.2);
      }, 500);
    }
  }

  // 精准锁定真实物理像素与视口尺寸
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width > 0 ? rect.width : (this.canvas.clientWidth || window.innerWidth || 900);
    const h = rect.height > 0 ? rect.height : (this.canvas.clientHeight || (window.innerHeight - 112) || 450);

    this.canvas.width = Math.floor(w);
    this.canvas.height = Math.floor(h);

    this.groundY = Math.max(160, this.canvas.height - 42);
    this.maxBombRangeX = this.canvas.width * 0.85;

    if (this.blueCastle) {
      this.blueCastle.x = 80;
      this.blueCastle.y = this.groundY;
    }
    if (this.redCastle) {
      this.redCastle.x = this.canvas.width - 80;
      this.redCastle.y = this.groundY;
    }
  }

  // 判断单位类型是否属于不可重复出现的名将/Boss
  isHeroType(type) {
    if (!type || typeof type !== 'string') return false;
    return Boolean(HERO_CAMP_MAP[type]) || type.startsWith('enemy_boss_') || type.startsWith('lvbu');
  }

  // 检查某一阵营中该名将是否已存活在战场上
  isHeroAlive(type, team = 'blue') {
    const units = team === 'blue' ? this.blueUnits : this.redUnits;
    if (!units) return false;
    return units.some(u => u.type === type && !u.isDead);
  }

  // 获取名将的规范中文尊号
  getHeroName(type) {
    const HERO_NAMES = {
      // 蜀汉 (10)
      liubei: "主公刘备", guanyu: "武圣关羽", zhangfei: "万人敌张飞", zhaoyun: "常山赵子龙",
      zhugeliang: "卧龙诸葛亮", pangtong: "凤雏庞统", huangzhong: "老将黄忠", machao: "西凉锦马超",
      weiyan: "狂骨魏延", jiangwei: "幼麟姜维",
      // 东吴 (10)
      sunquan: "东吴大帝孙权", sunce: "小霸王孙策", zhouyu: "美周郎周瑜", lusu: "谋主鲁肃",
      lvmeng: "虎威吕蒙", luxun: "儒将陆逊", ganning: "锦帆甘宁", taishici: "东莱太史慈",
      zhoutai: "浴血周泰", huanggai: "赤壁黄盖",
      // 曹魏 (10)
      caocao: "魏武帝曹操", simayi: "冢虎司马懿", guojia: "鬼才郭嘉", xiahoudun: "独眼夏侯惇",
      xiahouyuan: "神速夏侯渊", zhangliao: "名将张辽", caoren: "征南曹仁", dianwei: "古之恶来典韦",
      xuchu: "虎痴许褚", pangde: "白马庞德",
      // 群雄 (10)
      lvbu: "战神吕布", lvbu_ch2: "飞将吕布", diaochan: "绝世貂蝉", dongzhuo: "西凉董卓",
      yuanshao: "本初袁绍", yanliang: "名将颜良", wenchou: "名将文丑", jiling: "上将纪灵",
      zhangren: "忠节张任", menghuo: "蛮王孟获", zhangjiao: "天师张角"
    };
    return HERO_NAMES[type] || "当世名将";
  }

  static ALL_HERO_STATS = {
    // 🟢 蜀汉 (10)
    liubei: { icon: "👑", size: 40, hp: 450, atk: 48, speed: 1.1, range: 45, atkCooldown: 34, bossName: "主公刘备" },
    guanyu: { icon: "🐉", size: 44, hp: 580, atk: 70, speed: 1.3, range: 55, atkCooldown: 35, bossName: "武圣关羽" },
    zhangfei: { icon: "🐯", size: 44, hp: 540, atk: 65, speed: 1.4, range: 50, atkCooldown: 32, bossName: "万人敌张飞" },
    zhaoyun: { icon: "⚡", size: 42, hp: 500, atk: 60, speed: 1.5, range: 50, atkCooldown: 30, bossName: "常胜赵云" },
    zhugeliang: { icon: "🪶", size: 40, hp: 420, atk: 75, speed: 1.0, range: 280, atkCooldown: 50, bossName: "卧龙诸葛亮" },
    pangtong: { icon: "🕊️", size: 38, hp: 390, atk: 50, speed: 0.9, range: 260, atkCooldown: 50, bossName: "凤雏庞统" },
    huangzhong: { icon: "🏹", size: 40, hp: 380, atk: 55, speed: 1.0, range: 360, atkCooldown: 45, bossName: "老将黄忠" },
    machao: { icon: "🐎", size: 44, hp: 520, atk: 68, speed: 2.4, range: 50, atkCooldown: 28, bossName: "锦马超" },
    weiyan: { icon: "⚖️", size: 42, hp: 560, atk: 62, speed: 1.2, range: 45, atkCooldown: 32, bossName: "狂骨魏延" },
    jiangwei: { icon: "⚔️", size: 42, hp: 510, atk: 58, speed: 1.3, range: 50, atkCooldown: 32, bossName: "幼麟姜维" },

    // 🔵 东吴 (10)
    sunquan: { icon: "👑", size: 42, hp: 520, atk: 50, speed: 1.1, range: 45, atkCooldown: 34, bossName: "东吴大帝孙权" },
    sunce: { icon: "🐯", size: 44, hp: 560, atk: 72, speed: 2.0, range: 50, atkCooldown: 28, bossName: "小霸王孙策" },
    zhouyu: { icon: "🔥", size: 40, hp: 440, atk: 78, speed: 1.0, range: 270, atkCooldown: 48, bossName: "美周郎周瑜" },
    lusu: { icon: "📜", size: 38, hp: 430, atk: 46, speed: 1.0, range: 250, atkCooldown: 45, bossName: "谋主鲁肃" },
    lvmeng: { icon: "⚔️", size: 42, hp: 500, atk: 60, speed: 1.2, range: 48, atkCooldown: 32, bossName: "虎威吕蒙" },
    luxun: { icon: "🪶", size: 40, hp: 460, atk: 66, speed: 1.1, range: 260, atkCooldown: 46, bossName: "儒将陆逊" },
    ganning: { icon: "🏹", size: 42, hp: 510, atk: 68, speed: 2.1, range: 45, atkCooldown: 26, bossName: "锦帆甘宁" },
    taishici: { icon: "🏹", size: 40, hp: 440, atk: 52, speed: 1.1, range: 250, atkCooldown: 30, bossName: "太史慈" },
    zhoutai: { icon: "🛡️", size: 44, hp: 600, atk: 54, speed: 1.1, range: 45, atkCooldown: 34, bossName: "浴血周泰" },
    huanggai: { icon: "⚓", size: 42, hp: 520, atk: 50, speed: 1.2, range: 45, atkCooldown: 35, bossName: "赤壁黄盖" },

    // 🔴 曹魏 (10)
    caocao: { icon: "👑", size: 44, hp: 680, atk: 65, speed: 1.1, range: 50, atkCooldown: 34, bossName: "魏武帝曹操" },
    simayi: { icon: "🦅", size: 42, hp: 620, atk: 72, speed: 1.1, range: 280, atkCooldown: 48, bossName: "冢虎司马懿" },
    guojia: { icon: "🔮", size: 38, hp: 380, atk: 74, speed: 1.0, range: 270, atkCooldown: 46, bossName: "鬼才郭嘉" },
    xiahoudun: { icon: "👁️", size: 44, hp: 580, atk: 64, speed: 1.2, range: 48, atkCooldown: 32, bossName: "独眼夏侯惇" },
    xiahouyuan: { icon: "🏹", size: 42, hp: 480, atk: 60, speed: 1.8, range: 300, atkCooldown: 38, bossName: "神速夏侯渊" },
    zhangliao: { icon: "⚡", size: 44, hp: 550, atk: 68, speed: 1.6, range: 50, atkCooldown: 30, bossName: "名将张辽" },
    caoren: { icon: "🛡️", size: 46, hp: 620, atk: 52, speed: 1.0, range: 40, atkCooldown: 36, bossName: "征南曹仁" },
    dianwei: { icon: "🪓", size: 46, hp: 610, atk: 72, speed: 1.2, range: 45, atkCooldown: 30, bossName: "古之恶来典韦" },
    xuchu: { icon: "🔨", size: 46, hp: 630, atk: 70, speed: 1.1, range: 45, atkCooldown: 32, bossName: "虎痴许褚" },
    pangde: { icon: "🐎", size: 44, hp: 570, atk: 66, speed: 1.3, range: 48, atkCooldown: 32, bossName: "白马庞德" },

    // 🟡 群雄 (10)
    lvbu: { icon: "🐯", size: 48, hp: 750, atk: 90, speed: 1.6, range: 60, atkCooldown: 30, bossName: "战神吕布" },
    diaochan: { icon: "💃", size: 38, hp: 360, atk: 35, speed: 1.2, range: 240, atkCooldown: 45, bossName: "绝世貂蝉" },
    dongzhuo: { icon: "👹", size: 48, hp: 720, atk: 58, speed: 0.9, range: 45, atkCooldown: 36, bossName: "西凉董卓" },
    yuanshao: { icon: "👑", size: 42, hp: 530, atk: 50, speed: 1.0, range: 48, atkCooldown: 35, bossName: "本初袁绍" },
    yanliang: { icon: "⚔️", size: 44, hp: 550, atk: 65, speed: 1.3, range: 50, atkCooldown: 32, bossName: "名将颜良" },
    wenchou: { icon: "🐎", size: 44, hp: 540, atk: 64, speed: 1.5, range: 50, atkCooldown: 30, bossName: "名将文丑" },
    jiling: { icon: "🛡️", size: 44, hp: 530, atk: 55, speed: 1.1, range: 50, atkCooldown: 34, bossName: "上将纪灵" },
    zhangren: { icon: "🏹", size: 42, hp: 490, atk: 56, speed: 1.2, range: 260, atkCooldown: 42, bossName: "忠节张任" },
    menghuo: { icon: "🐘", size: 48, hp: 760, atk: 54, speed: 0.9, range: 48, atkCooldown: 38, bossName: "蛮王孟获" },
    zhangjiao: { icon: "⚡", size: 40, hp: 400, atk: 70, speed: 1.0, range: 270, atkCooldown: 48, bossName: "天师张角" }
  };

  spawnUnit(type, team) {
    // 严格限制：同一个武将全场只能同时出现一个（阵亡前不可重复召唤）
    if (this.isHeroType(type) && this.isHeroAlive(type, team)) {
      const heroTitle = this.getHeroName(type);
      console.warn(`[BattleWorld] ${team} 武将 ${type}(${heroTitle}) 正在阵中奋战，拒绝重复生成！`);
      return null;
    }

    const startX = team === 'blue' ? 120 : this.canvas.width - 120;
    let config = { team, type, x: startX, y: this.groundY - 10 };

    if (type === 'infantry') {
      const extraHp = team === 'blue' ? this.upgrades.infantryHp : 0;
      config = { ...config, icon: "🛡️", size: 30, hp: 130 + extraHp, atk: 18, speed: 1.1, range: 35, atkCooldown: 45 };
    } else if (type === 'archer') {
      const extraAtk = team === 'blue' ? this.upgrades.archerPower : 0;
      config = { ...config, icon: "🏹", size: 28, hp: 75, atk: 15 + extraAtk, speed: 0.9, range: 240, atkCooldown: 55 };
    } else if (type === 'cavalry') {
      config = { ...config, icon: "🐎", size: 34, hp: 190, atk: 35, speed: 2.2, range: 45, atkCooldown: 40 };
    } else if (type === 'catapult') {
      config = { ...config, icon: "🚜", size: 38, hp: 240, atk: 60, speed: 0.7, range: 340, atkCooldown: 95 };
    } else if (type === 'lvbu_ch2') {
      config = { ...config, icon: "🐯", size: 48, hp: 1100, atk: 88, speed: 1.3, range: 60, atkCooldown: 32, bossName: "飞将吕布" };
    } else if (BattleWorld.ALL_HERO_STATS[type]) {
      const hStats = BattleWorld.ALL_HERO_STATS[type];
      config = { ...config, ...hStats };
      if (team === 'blue' && this.weapons) {
        if (type === 'liubei' && this.weapons.shuanggu_jian) config.atk += this.weapons.shuanggu_jian * 12;
        if (type === 'guanyu' && this.weapons.qinglong_dao) config.atk += this.weapons.qinglong_dao * 25;
        if (type === 'zhangfei' && this.weapons.zhangba_shemao) config.atk += this.weapons.zhangba_shemao * 20;
        if (type === 'zhaoyun' && this.weapons.longdan_qiang) config.atk += this.weapons.longdan_qiang * 22;
        if (type === 'huangzhong' && this.weapons.baodiao_gong) config.atk += this.weapons.baodiao_gong * 18;
        if (type === 'lvbu' && this.weapons.fangtian_huaji) config.atk += this.weapons.fangtian_huaji * 25;
      }
      if (type === 'lvbu' && team === 'red') {
        config.hp = 1500;
        config.atk = 115;
        config.size = 52;
        config.bossName = "战神狂暴吕布";
      }
    } else if (type.startsWith('enemy_boss_')) {
      const bossType = type.replace('enemy_boss_', '');
      const bossStats = {
        chenyuanzhi: { name: "程远志", hp: 460, atk: 45, speed: 1.2, range: 45 },
        guanhai: { name: "管亥", hp: 500, atk: 48, speed: 1.1, range: 45 },
        caoren: { name: "曹仁", hp: 580, atk: 48, speed: 1.0, range: 40 },
        jiling: { name: "纪灵", hp: 530, atk: 54, speed: 1.2, range: 50 },
        yanliang: { name: "颜良", hp: 560, atk: 62, speed: 1.3, range: 50 },
        wenchou: { name: "文丑", hp: 540, atk: 60, speed: 1.4, range: 50 },
        caochun: { name: "曹纯", hp: 520, atk: 58, speed: 2.0, range: 45 },
        caocao: { name: "曹操", hp: 680, atk: 52, speed: 1.1, range: 50 },
        zhangren: { name: "张任", hp: 480, atk: 55, speed: 1.0, range: 280 },
        xiahouyuan: { name: "夏侯渊", hp: 540, atk: 64, speed: 1.6, range: 45 },
        pangde: { name: "庞德", hp: 620, atk: 68, speed: 1.2, range: 50 },
        luxun: { name: "陆逊", hp: 500, atk: 58, speed: 1.1, range: 260 },
        menghuo: { name: "孟获", hp: 800, atk: 52, speed: 0.9, range: 45 },
        caozhen: { name: "曹真", hp: 640, atk: 56, speed: 1.0, range: 45 },
        simayi: { name: "司马懿", hp: 750, atk: 65, speed: 1.1, range: 280 },
        guanyu: { name: "武圣关羽", hp: 780, atk: 72, speed: 1.1, range: 50 },
        liubei: { name: "昭烈帝刘备", hp: 680, atk: 52, speed: 1.1, range: 45 },
        zhouyu: { name: "大都督周瑜", hp: 620, atk: 66, speed: 1.1, range: 260 },
        sunquan: { name: "东吴大帝孙权", hp: 720, atk: 55, speed: 1.1, range: 50 },
        sunce: { name: "小霸王孙策", hp: 740, atk: 70, speed: 1.3, range: 45 },
        taishici: { name: "名将太史慈", hp: 640, atk: 64, speed: 1.2, range: 45 },
        yuanshao: { name: "大将军袁绍", hp: 700, atk: 56, speed: 1.0, range: 250 },
        dianwei: { name: "古之恶来典韦", hp: 800, atk: 68, speed: 1.0, range: 45 },
        xuchu: { name: "虎痴许褚", hp: 780, atk: 66, speed: 1.0, range: 45 },
        zhangjiao: { name: "大贤良师张角", hp: 640, atk: 60, speed: 1.0, range: 270 },
        dongzhuo: { name: "西凉魔王董卓", hp: 850, atk: 65, speed: 0.9, range: 45 },
        pangtong: { name: "凤雏庞统", hp: 600, atk: 62, speed: 1.0, range: 260 },
        machao: { name: "神威马超", hp: 720, atk: 68, speed: 1.3, range: 50 },
        zhugeliang: { name: "卧龙诸葛亮", hp: 650, atk: 65, speed: 1.0, range: 280 }
      }[bossType] || { name: "敌方名将", hp: 500, atk: 50, speed: 1.1, range: 45 };

      config = {
        ...config,
        icon: "👑",
        size: 46,
        hp: bossStats.hp,
        atk: bossStats.atk,
        speed: bossStats.speed,
        range: bossStats.range,
        atkCooldown: 34,
        bossType: bossType,
        bossName: bossStats.name
      };
    }

    // 注入战前编队平衡羁绊与阵营底色增益
    if (team === 'blue' && this.synergyBuffs) {
      const isHero = this.isHeroType(type);
      const hpBonus = (this.synergyBuffs.armyHpMult || 0) + (isHero ? (this.synergyBuffs.heroHpMult || 0) : 0);
      if (hpBonus > 0) config.hp = Math.round(config.hp * (1 + hpBonus));

      const spdBonus = (this.synergyBuffs.armySpeedMult || 0) + (isHero ? (this.synergyBuffs.heroSpeedMult || 0) : 0);
      if (spdBonus > 0) config.speed = Number((config.speed * (1 + spdBonus)).toFixed(2));

      if (isHero && this.synergyBuffs.heroAtkBonus) {
        config.atk = Math.round(config.atk + this.synergyBuffs.heroAtkBonus);
      }
      if (this.synergyBuffs.armyDefMult) {
        config.defense = (config.defense || 0) + Math.round(this.synergyBuffs.armyDefMult * 60);
      }
      // 检查初始护盾
      const shieldCfg = (this.synergyBuffs.initialShields || []).find(s => s.heroId === type);
      if (shieldCfg) {
        config.shield = shieldCfg.shield;
        config.shieldDuration = shieldCfg.duration;
      }
      if (type === 'archer' && this.synergyBuffs.archerBurnDmg) {
        config.burnDmg = this.synergyBuffs.archerBurnDmg;
      }
    }

    // 叠加全军军略科技研习加成 (闪避、抗性、暴击、吸血、防御)
    if (team === 'blue') {
      config.dodgeRate = this.upgrades.dodgeRate || 0;
      config.stunResist = this.upgrades.stunResist || 0;
      config.critRate = (config.critRate || 0) + (this.upgrades.critRate || 0);
      config.lifestealRate = this.upgrades.lifestealRate || 0;
      config.defense = (config.defense || 0) + (this.upgrades.armyDefense || 0);
    }

    // 叠加武庙官阶荣誉威名加成 (全军攻击比例与基础防御)
    if (team === 'blue' && this.rankBuff) {
      if (this.rankBuff.atkBonus) {
        config.atk = Math.round(config.atk * (1 + this.rankBuff.atkBonus));
      }
      if (this.rankBuff.defBonus) {
        config.defense = (config.defense || 0) + this.rankBuff.defBonus;
      }
    }

    // 叠加名将佩戴装备的三大件属性与特技
    if (team === 'blue' && this.heroEquipBonuses && this.heroEquipBonuses[type]) {
      const b = this.heroEquipBonuses[type];
      config.hp = (config.hp || 100) + (b.hp || 0);
      config.atk = (config.atk || 15) + (b.atk || 0);
      config.speed = (config.speed || 1.2) + (b.speed || 0);
      config.crit = (config.crit || 0) + (b.crit || 0);
      config.defRed = (config.defRed || 0) + (b.defRed || 0);
      config.reflect = (config.reflect || 0) + (b.reflect || 0);
      config.equipSkills = b.skills || [];
    }

    const u = new Unit(config);
    if (team === 'blue') {
      this.blueUnits.push(u);
    } else {
      this.redUnits.push(u);
      if (this.objective && this.objective.type === 'assassinate_boss') {
        const targetType = this.objective.targetBossType;
        if (targetType && (u.type === targetType || u.bossType === targetType)) {
          this.targetBossUnit = u;
        }
      }
    }
    return u;
  }

  spawnArrow(startX, startY, target, damage, team) {
    this.arrows.push(new Arrow(startX, startY, target, damage, team));
  }

  spawnBoulder(startX, startY, targetX, damage) {
    this.boulders.push(new Boulder(startX, startY, targetX, damage));
  }

  throwBombTo(targetX) {
    const clampedX = Math.min(this.maxBombRangeX, Math.max(120, targetX));
    const dmg = 150 + this.upgrades.bombPower;
    this.bombs.push(new BombProjectile(100, this.groundY - 70, clampedX, this.groundY, dmg, 'blue'));
    sound.playCoin();
  }

  // 敌方战术火雷投掷
  throwEnemyBombTo(targetX) {
    const clampedX = Math.max(120, Math.min(this.canvas.width - 150, targetX));
    const startX = this.canvas.width - 100;
    this.bombs.push(new BombProjectile(startX, this.groundY - 70, clampedX, this.groundY, 85, 'red'));
    sound.playDrum();
    this.addFloatingText("🔥 敌军投掷霹雳火雷！", startX - 30, this.groundY - 70, "#ea580c", 1.4);
  }

  triggerExplosion(x, y, damage) {
    this.screenShake = 15;
    sound.playExplosion();
    this.addFloatingText("💥 惊雷破阵！", x, y - 50, "#dc2626", 1.8);

    this.redUnits.forEach(u => {
      if (u.isDead) return;
      const dist = Math.abs(u.x - x);
      if (dist < 140) {
        u.takeDamage(damage, this, 'bomb');
        u.isFlying = true;
        u.vx = (u.x - x) * 0.08 + 2;
        u.vy = -Math.random() * 8 - 5;
      }
    });

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 8 + 3;
      this.particles.push({
        x,
        y: y - 10,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 3,
        color: ["#facc15", "#fb923c", "#ef4444", "#ffffff"][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 3,
        alpha: 1,
        life: 0.04
      });
    }
  }

  triggerEnemyExplosion(x, y, damage) {
    this.screenShake = 14;
    sound.playExplosion();
    this.addFloatingText("💥 敌方火雷爆炸！", x, y - 50, "#ea580c", 1.7);

    this.blueUnits.forEach(u => {
      if (u.isDead) return;
      const dist = Math.abs(u.x - x);
      if (dist < 130) {
        u.takeDamage(damage, this, 'bomb');
        u.isFlying = true;
        u.vx = (u.x - x) * 0.08 - 2;
        u.vy = -Math.random() * 7 - 4;
      }
    });

    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 7 + 3;
      this.particles.push({
        x,
        y: y - 10,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 3,
        color: ["#ea580c", "#f97316", "#ef4444", "#713f12"][Math.floor(Math.random() * 4)],
        size: Math.random() * 8 + 3,
        alpha: 1,
        life: 0.04
      });
    }
  }

  triggerBoulderImpact(x, y, damage) {
    this.screenShake = 8;
    sound.playDrum();
    this.addFloatingText("🪨 咚！巨石轰击！", x, y - 40, "#b45309", 1.4);

    this.redUnits.forEach(u => {
      if (u.isDead) return;
      if (Math.abs(u.x - x) < 95) {
        u.takeDamage(damage, this, 'boulder');
      }
    });

    if (Math.abs(this.redCastle.x - x) < 100) {
      this.redCastle.takeDamage(damage * 1.5, this);
    }
  }

  // 1. 美人计
  castMeirenji() {
    sound.playStratagem();
    const charmTime = this.upgrades.superCharm ? 750 : 600;
    this.addFloatingText("💃 美人计 · 绝代惊鸿魅惑！", this.canvas.width * 0.5, 60, "#ec4899", 1.6);

    this.redUnits.forEach(u => {
      if (!u.isDead) {
        u.charmedTimer = charmTime;
      }
    });
  }

  // 2. 借东风
  castZhugeStorm() {
    this.screenShake = 10;
    sound.playStratagem();
    const bonus = (this.weapons && this.weapons.baiyu_fan) ? (this.weapons.baiyu_fan * 0.2) : 0;
    const baseDmg = Math.floor(95 * (1 + bonus));
    this.addFloatingText("🌪️🔥 借东风 · 赤壁烈焰燎原！", this.canvas.width * 0.65, 80, "#ef4444", 1.6);

    this.redUnits.forEach(u => {
      if (!u.isDead) {
        u.takeDamage(baseDmg, this, 'fire');
        u.isFlying = true;
        u.vy = -6;
      }
    });
  }

  // 3. 金蝉脱壳 (战术无敌金光 + 全军回血 60)
  castJinchan() {
    sound.playStratagem();
    this.addFloatingText("🪙 金蝉脱壳 · 秘策绝尘护三军！", this.canvas.width * 0.4, 70, "#f59e0b", 1.6);
    this.blueUnits.forEach(u => {
      if (!u.isDead) {
        u.hp = Math.min(u.maxHp, u.hp + 60);
        u.invulnerableTimer = 210; // 3.5秒无敌
      }
    });
  }

  // 4. 草船借箭 (吸收敌箭并奖励 150 铜钱)
  castCaochuan(app) {
    sound.playCoin();
    this.addFloatingText("🏹 草船借箭 · 纳箭为饷！", this.canvas.width * 0.35, 75, "#0284c7", 1.6);
    this.arrows = []; // 清空全场敌方飞箭
    if (app) app.gold += 150;
  }

  // 5. 声东击西 (敌方后排弓手与器械陷入混乱 8 秒)
  castShengdong() {
    sound.playStratagem();
    this.addFloatingText("📢 声东击西 · 调虎离山！", this.canvas.width * 0.7, 70, "#8b5cf6", 1.6);
    this.redUnits.forEach(u => {
      if (!u.isDead && (u.type === 'archer' || u.type === 'catapult')) {
        u.cooldownTimer = 480; // 8秒无法攻击
      }
    });
  }

  // 6. 抛砖引玉 (战场中央召唤巨型滚石陷阱)
  castPaizhuan() {
    sound.playDrum();
    this.triggerBoulderImpact(this.canvas.width * 0.6, this.groundY, 130);
  }

  // 7. 以逸待劳 (全军立盾固守结阵，减伤 70% 持续 8 秒)
  castYiyidailao() {
    sound.playStratagem();
    this.addFloatingText("🛡️ 以逸待劳 · 全军结阵固守，万矢莫穿！", this.canvas.width * 0.35, 65, "#059669", 1.6);
    this.blueUnits.forEach(u => {
      if (!u.isDead) {
        u.defenseStanceTimer = 480; // 8秒减伤70%
      }
    });
  }

  // 8. 擒贼擒王 (天降神雷精准劈敌方最强主将/要塞 220 真实破甲伤害)
  castQinzei() {
    this.screenShake = 12;
    sound.playExplosion();
    this.addFloatingText("⚡ 擒贼擒王 · 疾雷破空诛敌酋！", this.canvas.width * 0.75, 50, "#eab308", 1.8);
    
    // 优先锁定敌方名将
    let target = this.redUnits.find(u => !u.isDead && (u.type === 'lvbu' || u.type === 'guanyu' || u.type === 'zhangfei' || u.type === 'zhaoyun'))
                 || this.redUnits.find(u => !u.isDead)
                 || this.redCastle;

    if (target) {
      target.takeDamage(220, this, 'lightning');
    }
  }

  // 9. 趁火打劫 (12 秒内击杀敌军掉落 3 倍铜钱)
  castChenhuo() {
    sound.playCoin();
    this.addFloatingText("🥁 趁火打劫 · 犒军战资三倍充盈！", this.canvas.width * 0.5, 65, "#d97706", 1.6);
    this.tripleGoldTimer = 720; // 12秒
  }

  // 10. 瞒天过海 (全屏浓雾，全军闪避飞箭 10 秒)
  castMantian() {
    sound.playStratagem();
    this.addFloatingText("🌫️ 瞒天过海 · 迷雾隐蔽闪避飞箭！", this.canvas.width * 0.45, 65, "#64748b", 1.6);
    this.fogDodgeTimer = 600; // 10秒
  }

  spawnSlashEffect(x, y) {
    this.particles.push({
      x, y, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, color: "#ffffff", size: 6, alpha: 1, life: 0.1
    });
  }

  spawnSpark(x, y) {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, color: "#fde047", size: 3, alpha: 1, life: 0.1
      });
    }
  }

  spawnCoinParticles(x, y) {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 4 + 2;
      this.particles.push({
        x,
        y: y - 20,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        color: ["#facc15", "#f59e0b", "#fbbf24", "#ffffff"][Math.floor(Math.random() * 4)],
        size: Math.random() * 5 + 3,
        alpha: 1,
        life: 0.05
      });
    }
  }

  spawnDeathGhost(x, y) {
    this.addFloatingText("👻", x, y - 20, "#94a3b8", 1.2);
  }

  addFloatingText(text, x, y, color = "#ea580c", scale = 1.0) {
    this.floatingTexts.push({
      text, x, y, vy: -1.2, color, scale, alpha: 1
    });
  }

  // 结算星级评价 (1~3 星)
  calculateStars() {
    return this.calculateStarDetails().stars;
  }

  // 计算三星评级各项目标的详细达成情况
  calculateStarDetails() {
    if (this.winner !== 'blue') {
      return {
        stars: 0,
        hpRatio: 0,
        seconds: Math.floor(this.battleDurationFrames / 60),
        ultCount: this.heroUltimateCastCount || 0,
        conditions: [
          { id: 'win', title: '旗开得胜 · 荡平敌阵克捷拔寨', achieved: false, desc: '军令未竣，阵线陷于苦战' },
          { id: 'hp', title: '固若金汤 · 本营营垒完备七成以上', achieved: false, desc: '营垒受创，防御仅余残破' },
          { id: 'speed_or_ult', title: '兵贵神速 · 一分钟内克敌或展无双绝艺', achieved: false, desc: '迁延苦战，未成胜势' }
        ]
      };
    }

    const hpRatio = this.blueCastle ? (this.blueCastle.hp / this.blueCastle.maxHp) : 1;
    const seconds = Math.floor(this.battleDurationFrames / 60);
    const ultCount = this.heroUltimateCastCount || 0;

    const cond1 = true; // 达成胜利通关
    const cond2 = hpRatio >= 0.70; // 要塞生命 >= 70%
    const cond3 = seconds <= 60 || ultCount >= 1; // 60秒内速通 或 释放过至少1次绝技

    let stars = 1;
    if (cond2) stars++;
    if (cond3) stars++;

    return {
      stars,
      hpRatio,
      seconds,
      ultCount,
      conditions: [
        {
          id: 'win',
          title: '旗开得胜 · 荡平敌阵克捷拔寨',
          achieved: cond1,
          desc: '三军用命，成功斩将拔寨！ ⭐'
        },
        {
          id: 'hp',
          title: '固若金汤 · 本营营垒完备七成以上',
          achieved: cond2,
          desc: cond2 
            ? `壁垒森严！帅营完好度 ${Math.floor(hpRatio * 100)}% ⭐` 
            : `营垒受创，防御仅余 ${Math.floor(hpRatio * 100)}%（未固七成防线）`
        },
        {
          id: 'speed_or_ult',
          title: '兵贵神速 · 一分钟内克敌或展无双绝艺',
          achieved: cond3,
          desc: cond3 
            ? (ultCount >= 1 ? `猛将摧锋！施展名将无双绝艺 ${ultCount} 次 ⭐` : `兵贵神速！仅历 ${seconds} 秒即平定战线 ⭐`)
            : `迁延苦战 ${seconds} 秒，且阵中未见名将无双摧锋`
        }
      ]
    };
  }

  onCastleDestroyed(team) {
    this.isGameOver = true;
    this.winner = team === 'blue' ? 'red' : 'blue';
    this.screenShake = 25;
    sound.playExplosion();
    if (this.winner === 'blue') sound.playVictory();

    // 城堡坍塌巨石碎裂飞溅粒子
    const castleX = team === 'blue' ? this.blueCastle.x : this.redCastle.x;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 9 + 3;
      this.particles.push({
        x: castleX + (Math.random() - 0.5) * 60,
        y: this.groundY - 50 + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 4,
        color: ["#94a3b8", "#64748b", "#cbd5e1", "#f97316", "#ef4444"][Math.floor(Math.random() * 5)],
        size: Math.random() * 10 + 4,
        alpha: 1,
        life: 0.02
      });
    }
  }

  onObjectiveComplete(team, toastText = '') {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.winner = team;
    this.screenShake = 22;
    if (toastText) {
      this.addFloatingText(toastText, this.canvas.width * 0.5, this.groundY - 100, team === 'blue' ? "#22c55e" : "#ef4444", 1.8);
    }
    if (this.winner === 'blue') {
      sound.playVictory();
      this.redUnits.forEach(u => {
        u.isDead = true;
      });
    } else {
      sound.playExplosion();
    }
  }

  update() {
    if (this.isGameOver) return;

    this.battleDurationFrames++;

    // 战役多元目标达成检测 (斩首 / 守城 / 攻坚)
    if (this.objective) {
      if (this.objective.type === 'assassinate_boss') {
        const targetType = this.objective.targetBossType;
        if (!this.targetBossUnit) {
          const boss = this.redUnits.find(u => u.type === targetType || (u.bossType && u.bossType === targetType));
          if (boss) {
            this.targetBossUnit = boss;
          }
        }
        if (this.targetBossUnit && this.targetBossUnit.isDead) {
          this.onObjectiveComplete('blue', `🎯 阵斩敌帅【${this.objective.targetBossName || '敌方主帅'}】！敌军溃散！`);
          return;
        }
      } else if (this.objective.type === 'defend_time') {
        this.defendFramesLeft--;
        if (this.defendFramesLeft <= 0) {
          if (this.blueCastle && !this.blueCastle.isDead) {
            this.onObjectiveComplete('blue', '⏳ 坚守功成！成功抵御敌军猛攻！');
            return;
          }
        }
      }
    }

    // 🌸 桃园结义残血死战救场触发 (生命跌破30%时张飞怒吼击退 + 关羽加防 + 刘备回血，单局限1次)
    if (this.synergyBuffs && this.synergyBuffs.specialFlags && this.synergyBuffs.specialFlags.taoyuanSave && !this.taoyuanSaved) {
      const dangerHero = this.blueUnits.find(u => !u.isDead && (u.type === 'liubei' || u.type === 'guanyu' || u.type === 'zhangfei') && u.hp <= u.maxHp * 0.3);
      if (dangerHero) {
        this.taoyuanSaved = true;
        this.screenShake = 16;
        sound.playDrum();
        this.addFloatingText("🌸【桃园结义】义薄云天！兄弟死战救场！", dangerHero.x, this.groundY - 75, "#f43f5e", 2.2);

        this.redUnits.forEach(ru => {
          if (!ru.isDead && Math.abs(ru.x - dangerHero.x) < 180) {
            ru.x += 110;
            ru.stunTimer = 48;
          }
        });

        const gy = this.blueUnits.find(u => !u.isDead && u.type === 'guanyu');
        if (gy) gy.defense = (gy.defense || 0) + 15;

        this.blueUnits.forEach(bu => {
          if (!bu.isDead) bu.hp = Math.min(bu.maxHp, Math.round(bu.hp + bu.maxHp * 0.08));
        });
      }
    }

    this.windmillAngle += 0.02;
    this.cloudOffset = (this.cloudOffset + 0.3) % (this.canvas.width + 400);

    // 飞雁苍穹滑翔与振翅
    this.geeseWingTimer += 0.08;
    this.geeseFlockX -= this.geeseSpeed;
    if (this.geeseFlockX < -160) {
      this.geeseFlockX = this.canvas.width + 120;
      this.geeseFlockY = 45 + Math.random() * 40;
    }

    // 战场飘絮与桃花微粒
    this.ambientPetals.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;
      if (p.x < -20) p.x = this.canvas.width + 20;
      if (p.y > this.groundY + 20) {
        p.y = 20 + Math.random() * 80;
        p.x = this.canvas.width + Math.random() * 40;
      }
    });

    // 特技水墨刀芒生命周期更新
    this.inkSlashes.forEach(ink => ink.frame++);
    this.inkSlashes = this.inkSlashes.filter(ink => ink.frame < ink.maxFrames);

    this.blueCastle.y = this.groundY;
    this.redCastle.y = this.groundY;

    this.blueCastle.update(this);
    this.redCastle.update(this);

    // 城堡受损冒烟特效 (当城堡生命低于40%)
    if (this.battleDurationFrames % 10 === 0) {
      [this.blueCastle, this.redCastle].forEach(c => {
        if (c && c.hp < c.maxHp * 0.4 && !c.isDead) {
          this.particles.push({
            x: c.x + (Math.random() - 0.5) * 40,
            y: this.groundY - 80 + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2 - 1,
            color: Math.random() < 0.6 ? "#475569" : "#f97316",
            size: Math.random() * 8 + 4,
            alpha: 0.8,
            life: 0.03
          });
        }
      });
    }

    this.blueUnits.forEach(u => u.update(this));
    this.redUnits.forEach(u => u.update(this));

    this.blueUnits = this.blueUnits.filter(u => !u.isDead);
    this.redUnits = this.redUnits.filter(u => !u.isDead);

    this.arrows.forEach(a => a.update(this));
    this.arrows = this.arrows.filter(a => !a.isFinished);

    this.boulders.forEach(b => b.update(this));
    this.boulders = this.boulders.filter(b => !b.isFinished);

    this.bombs.forEach(b => b.update(this));
    this.bombs = this.bombs.filter(b => !b.isFinished);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.life;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= 0.02;
      if (ft.alpha <= 0) this.floatingTexts.splice(i, 1);
    }

    // 更新大招全屏切入横幅
    if (this.ultimateCutin) {
      this.ultimateCutin.frame++;
      if (this.ultimateCutin.frame >= this.ultimateCutin.maxFrames) {
        this.ultimateCutin = null;
      }
    }

    // 更新动态天气粒子
    this.updateWeatherParticles();
  }

  drawBattlefieldSky(ctx, w, gTop) {
    const theme = this.battlefieldTheme || 'plains';
    const skyGrad = ctx.createLinearGradient(0, 0, 0, gTop);

    if (theme === 'naval') {
      // 🔵 江东水战 · 烟波浩渺之江天水色
      skyGrad.addColorStop(0, "#082f49");
      skyGrad.addColorStop(0.35, "#0369a1");
      skyGrad.addColorStop(0.75, "#38bdf8");
      skyGrad.addColorStop(1, "#bae6fd");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, this.canvas.height);

      // 江天冷月银辉
      const moonX = w * 0.16, moonY = 56;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 14, moonX, moonY, 60);
      moonGlow.addColorStop(0, "rgba(224, 242, 254, 0.9)");
      moonGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.25)");
      moonGlow.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f0f9ff";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 16, 0, Math.PI * 2);
      ctx.fill();

    } else if (theme === 'mountain') {
      // 🟣 崇山峻岭 · 落凤坡与定军山高山暮色
      skyGrad.addColorStop(0, "#1e1b4b");
      skyGrad.addColorStop(0.4, "#3730a3");
      skyGrad.addColorStop(0.75, "#818cf8");
      skyGrad.addColorStop(1, "#fed7aa");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, this.canvas.height);

      // 晚霞余晖残阳
      const sunX = w * 0.82, sunY = 70;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 12, sunX, sunY, 50);
      sunGlow.addColorStop(0, "rgba(254, 215, 170, 0.95)");
      sunGlow.addColorStop(0.4, "rgba(249, 115, 22, 0.35)");
      sunGlow.addColorStop(1, "rgba(249, 115, 22, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fdba74";
      ctx.beginPath();
      ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
      ctx.fill();

    } else if (theme === 'night_fire') {
      // 🔴 烽火夜战 · 宛城火海与下邳夜围
      skyGrad.addColorStop(0, "#030712");
      skyGrad.addColorStop(0.35, "#1e1b4b");
      skyGrad.addColorStop(0.7, "#7f1d1d");
      skyGrad.addColorStop(1, "#ea580c");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, this.canvas.height);

      // 夜空点点繁星
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      const starSeed = [23, 78, 145, 220, 310, 420, 530, 640, 750, 860];
      starSeed.forEach((sx, idx) => {
        const sy = 15 + ((idx * 37) % 55);
        ctx.fillRect(sx % w, sy, 2, 2);
      });

      // 猩红血月
      const moonX = w * 0.85, moonY = 55;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 14, moonX, moonY, 58);
      moonGlow.addColorStop(0, "rgba(254, 202, 202, 0.95)");
      moonGlow.addColorStop(0.35, "rgba(239, 68, 68, 0.35)");
      moonGlow.addColorStop(1, "rgba(239, 68, 68, 0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 58, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fca5a5";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 16, 0, Math.PI * 2);
      ctx.fill();

    } else if (theme === 'desert') {
      // 🟡 西凉关陇 · 狂沙漫卷与大漠孤烟
      skyGrad.addColorStop(0, "#78350f");
      skyGrad.addColorStop(0.35, "#b45309");
      skyGrad.addColorStop(0.75, "#f59e0b");
      skyGrad.addColorStop(1, "#fef08a");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, this.canvas.height);

      // 大漠炙热巨日
      const sunX = w * 0.22, sunY = 65;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 65);
      sunGlow.addColorStop(0, "rgba(254, 240, 138, 0.95)");
      sunGlow.addColorStop(0.4, "rgba(245, 158, 11, 0.35)");
      sunGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 65, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fef9c3";
      ctx.beginPath();
      ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // 🟢 中原原野 (默认)
      skyGrad.addColorStop(0, "#1d4ed8");
      skyGrad.addColorStop(0.4, "#38bdf8");
      skyGrad.addColorStop(0.8, "#bae6fd");
      skyGrad.addColorStop(1, "#fed7aa");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, this.canvas.height);

      const sunX = 85, sunY = 60;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 12, sunX, sunY, 55);
      sunGlow.addColorStop(0, "rgba(254, 240, 138, 0.95)");
      sunGlow.addColorStop(0.35, "rgba(251, 191, 36, 0.35)");
      sunGlow.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 55, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    // 绘制苍穹漂浮云雾
    const drawCloud = (cx, cy, scale, color = "rgba(255, 255, 255, 0.85)") => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 6, 20, 0, Math.PI * 2);
      ctx.arc(18, 8, 16, 0, Math.PI * 2);
      ctx.arc(-18, 8, 16, 0, Math.PI * 2);
      ctx.arc(36, 12, 11, 0, Math.PI * 2);
      ctx.arc(-36, 12, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const cloudBase = this.cloudOffset || 0;
    const cloudColor = (theme === 'night_fire') ? "rgba(75, 85, 99, 0.55)" : (theme === 'desert' ? "rgba(253, 230, 138, 0.65)" : "rgba(255, 255, 255, 0.85)");
    drawCloud(((cloudBase * 0.45 + 180) % (w + 260)) - 130, 42, 0.95, cloudColor);
    drawCloud(((cloudBase * 0.3 + 520) % (w + 260)) - 130, 65, 0.8, cloudColor);
    drawCloud(((cloudBase * 0.2 + 860) % (w + 260)) - 130, 36, 1.15, cloudColor);

    // 苍穹南飞墨色归雁 (中原与水战主题专属)
    if (theme === 'plains' || theme === 'naval') {
      const wingAngle = Math.sin(this.geeseWingTimer) * 0.45;
      ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
      this.wildGeese.forEach(g => {
        const gx = this.geeseFlockX + g.relX;
        const gy = this.geeseFlockY + g.relY;
        if (gx > -20 && gx < w + 20) {
          ctx.save();
          ctx.translate(gx, gy);
          ctx.scale(g.scale, g.scale);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(-5, -5 - wingAngle * 6, -11, -3 - wingAngle * 8);
          ctx.quadraticCurveTo(-5, -2 - wingAngle * 3, 0, 1);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(5, -5 - wingAngle * 6, 11, -3 - wingAngle * 8);
          ctx.quadraticCurveTo(5, -2 - wingAngle * 3, 0, 1);
          ctx.fill();
          ctx.restore();
        }
      });
    }
  }

  drawBattlefieldFarScenery(ctx, w, gTop) {
    const theme = this.battlefieldTheme || 'plains';

    if (theme === 'naval') {
      // 🔵 江东水战 · 远江群山、泊锚战船楼橹与水墨帆影
      ctx.fillStyle = "#0e7490";
      ctx.beginPath();
      ctx.moveTo(0, gTop - 25);
      ctx.quadraticCurveTo(w * 0.2, gTop - 90, w * 0.42, gTop - 40);
      ctx.quadraticCurveTo(w * 0.65, gTop - 110, w * 0.88, gTop - 45);
      ctx.lineTo(w, gTop - 70);
      ctx.lineTo(w, gTop - 25);
      ctx.closePath();
      ctx.fill();

      // 近景江心连环艨艟楼船剪影 (古代战船桅杆帆影)
      const drawWarshipSilhouette = (bx, by, scale) => {
        ctx.save();
        ctx.translate(bx, by);
        ctx.scale(scale, scale);
        // 船体
        ctx.fillStyle = "#164e63";
        ctx.beginPath();
        ctx.moveTo(-35, 0); ctx.lineTo(-45, -12); ctx.lineTo(45, -12); ctx.lineTo(35, 0);
        ctx.closePath(); ctx.fill();
        // 楼橹
        ctx.fillRect(-15, -28, 30, 16);
        ctx.fillRect(-8, -38, 16, 10);
        // 主桅杆与船帆
        ctx.strokeStyle = "#083344";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -12); ctx.lineTo(0, -60);
        ctx.moveTo(-16, -12); ctx.lineTo(-16, -48);
        ctx.stroke();
        // 军帆
        ctx.fillStyle = "rgba(207, 250, 254, 0.45)";
        ctx.beginPath();
        ctx.moveTo(0, -58); ctx.quadraticCurveTo(16, -42, 0, -26); ctx.fill();
        // 军旗
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(0, -60); ctx.lineTo(12, -56); ctx.lineTo(0, -52); ctx.fill();
        ctx.restore();
      };

      drawWarshipSilhouette(w * 0.28, gTop - 25, 0.75);
      drawWarshipSilhouette(w * 0.52, gTop - 20, 0.95);
      drawWarshipSilhouette(w * 0.76, gTop - 28, 0.7);

    } else if (theme === 'mountain') {
      // 🟣 崇山峻岭 · 落凤险峡、千仞悬崖与孤松险峰
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.moveTo(0, gTop);
      ctx.lineTo(0, gTop - 110);
      ctx.lineTo(w * 0.16, gTop - 180);
      ctx.lineTo(w * 0.32, gTop - 95);
      ctx.lineTo(w * 0.55, gTop - 195);
      ctx.lineTo(w * 0.74, gTop - 120);
      ctx.lineTo(w * 0.9, gTop - 175);
      ctx.lineTo(w, gTop - 105);
      ctx.lineTo(w, gTop);
      ctx.closePath();
      ctx.fill();

      // 近景落凤峡谷岩壁
      ctx.fillStyle = "#475569";
      ctx.beginPath();
      ctx.moveTo(0, gTop);
      ctx.lineTo(0, gTop - 65);
      ctx.quadraticCurveTo(w * 0.25, gTop - 130, w * 0.45, gTop - 55);
      ctx.quadraticCurveTo(w * 0.7, gTop - 125, w, gTop - 60);
      ctx.lineTo(w, gTop);
      ctx.closePath();
      ctx.fill();

      // 悬崖峭壁绝顶孤松
      const drawCliffPine = (px, py, scale) => {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(scale, scale);
        ctx.strokeStyle = "#1c1917";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(12, -18, 4, -32);
        ctx.quadraticCurveTo(-6, -42, 10, -50);
        ctx.stroke();
        ctx.fillStyle = "#14532d";
        ctx.beginPath();
        ctx.arc(10, -50, 14, 0, Math.PI * 2);
        ctx.arc(-2, -38, 10, 0, Math.PI * 2);
        ctx.arc(20, -38, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCliffPine(w * 0.16, gTop - 95, 0.85);
      drawCliffPine(w * 0.72, gTop - 90, 0.95);

    } else if (theme === 'night_fire') {
      // 🔴 烽火夜战 · 宛城火海、烽火连天残堡与浓烟烈焰
      ctx.fillStyle = "#450a0a";
      ctx.beginPath();
      ctx.moveTo(0, gTop);
      ctx.lineTo(0, gTop - 75);
      ctx.lineTo(w * 0.22, gTop - 125);
      ctx.lineTo(w * 0.45, gTop - 80);
      ctx.lineTo(w * 0.68, gTop - 135);
      ctx.lineTo(w * 0.88, gTop - 85);
      ctx.lineTo(w, gTop - 110);
      ctx.lineTo(w, gTop);
      ctx.closePath();
      ctx.fill();

      // 远景燃烧的烽火箭楼与烈火
      const drawBurningTower = (tx, ty) => {
        ctx.save();
        ctx.translate(tx, ty);
        ctx.fillStyle = "#1c1917";
        ctx.fillRect(-8, -45, 16, 45);
        ctx.fillRect(-14, -50, 28, 8);
        const t = (this.battleDurationFrames || 0) * 0.15;
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(-10, -50);
        ctx.quadraticCurveTo(0, -68 + Math.sin(t) * 6, 10, -50);
        ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.moveTo(-6, -50);
        ctx.quadraticCurveTo(0, -62 + Math.cos(t) * 4, 6, -50);
        ctx.fill();
        ctx.restore();
      };
      drawBurningTower(w * 0.35, gTop);
      drawBurningTower(w * 0.65, gTop);

    } else if (theme === 'desert') {
      // 🟡 西凉关陇 · 漫天沙丘、汉代烽燧边塞与枯木胡杨
      ctx.fillStyle = "#b45309";
      ctx.beginPath();
      ctx.moveTo(0, gTop);
      ctx.quadraticCurveTo(w * 0.25, gTop - 110, w * 0.5, gTop - 45);
      ctx.quadraticCurveTo(w * 0.78, gTop - 120, w, gTop - 55);
      ctx.lineTo(w, gTop);
      ctx.closePath();
      ctx.fill();

      const drawDesertRampart = (rx, ry) => {
        ctx.save();
        ctx.translate(rx, ry);
        ctx.fillStyle = "#78350f";
        ctx.beginPath();
        ctx.moveTo(-22, 0); ctx.lineTo(-16, -42); ctx.lineTo(16, -42); ctx.lineTo(22, 0);
        ctx.closePath(); ctx.fill();
        ctx.fillRect(-14, -48, 6, 6); ctx.fillRect(8, -48, 6, 6);
        ctx.restore();
      };
      drawDesertRampart(w * 0.48, gTop);

      const drawDryPoplar = (px, py) => {
        ctx.save();
        ctx.translate(px, py);
        ctx.strokeStyle = "#451a03";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(-4, -28); ctx.lineTo(-14, -42);
        ctx.moveTo(-4, -28); ctx.lineTo(12, -40);
        ctx.stroke();
        ctx.restore();
      };
      drawDryPoplar(w * 0.2, gTop);
      drawDryPoplar(w * 0.82, gTop);

    } else {
      // 🟢 中原原野 · 双层青黛翠峦与水车磨坊 (默认)
      ctx.fillStyle = "#93c5fd";
      ctx.beginPath();
      ctx.moveTo(0, gTop);
      ctx.lineTo(0, gTop - 85);
      ctx.lineTo(w * 0.14, gTop - 145);
      ctx.lineTo(w * 0.28, gTop - 95);
      ctx.lineTo(w * 0.46, gTop - 160);
      ctx.lineTo(w * 0.64, gTop - 105);
      ctx.lineTo(w * 0.82, gTop - 150);
      ctx.lineTo(w, gTop - 90);
      ctx.lineTo(w, gTop);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#6ee7b7";
      ctx.beginPath();
      ctx.moveTo(0, gTop);
      ctx.quadraticCurveTo(w * 0.18, gTop - 80, w * 0.38, gTop - 45);
      ctx.quadraticCurveTo(w * 0.58, gTop - 95, w * 0.8, gTop - 50);
      ctx.quadraticCurveTo(w * 0.92, gTop - 75, w, gTop);
      ctx.closePath();
      ctx.fill();

      const millX = w * 0.5;
      const millY = gTop - 48;
      ctx.fillStyle = "#78350f";
      ctx.fillRect(millX - 5, millY, 10, 26);
      ctx.save();
      ctx.translate(millX, millY);
      ctx.rotate(this.windmillAngle);
      ctx.strokeStyle = "#ca8a04";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-16, 0); ctx.lineTo(16, 0);
      ctx.moveTo(0, -16); ctx.lineTo(0, 16);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawBattlefieldGround(ctx, w, gTop) {
    const theme = this.battlefieldTheme || 'plains';
    const bottomH = this.canvas.height - gTop;

    if (theme === 'naval') {
      // 🔵 江东水战 · 连环战船宽厚战板与铁索浮桥
      const waveT = (this.battleDurationFrames || 0) * 0.05;
      const waterGrad = ctx.createLinearGradient(0, gTop - 12, 0, this.canvas.height);
      waterGrad.addColorStop(0, "#0369a1");
      waterGrad.addColorStop(0.5, "#0284c7");
      waterGrad.addColorStop(1, "#082f49");
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, gTop - 10, w, bottomH + 10);

      // 江水翻涌浪花
      ctx.strokeStyle = "rgba(224, 242, 254, 0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x += 30) {
        const wy = gTop - 6 + Math.sin(waveT + x * 0.04) * 3;
        if (x === 0) ctx.moveTo(x, wy);
        else ctx.lineTo(x, wy);
      }
      ctx.stroke();

      // 连环战船厚重橡木战板 (Pontoon Warship Deck)
      const deckGrad = ctx.createLinearGradient(0, gTop, 0, this.canvas.height);
      deckGrad.addColorStop(0, "#78350f");
      deckGrad.addColorStop(0.3, "#92400e");
      deckGrad.addColorStop(1, "#451a03");
      ctx.fillStyle = deckGrad;
      ctx.fillRect(0, gTop, w, bottomH);

      // 船板拼缝与铜钉
      ctx.strokeStyle = "rgba(41, 30, 19, 0.7)";
      ctx.lineWidth = 2;
      for (let y = gTop + 10; y < this.canvas.height; y += 14) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.strokeStyle = "rgba(30, 20, 12, 0.5)";
      ctx.lineWidth = 1.5;
      for (let x = 40; x < w; x += 65) {
        ctx.beginPath(); ctx.moveTo(x, gTop); ctx.lineTo(x, this.canvas.height); ctx.stroke();
      }

      // 连环粗大铁索
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 3.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath(); ctx.moveTo(0, gTop + 4); ctx.lineTo(w, gTop + 4); ctx.stroke();
      ctx.setLineDash([]);

      // 战船防护围栏
      ctx.fillStyle = "#b45309";
      for (let x = 15; x < w; x += 45) {
        ctx.fillRect(x, gTop - 5, 4, 8);
      }

    } else if (theme === 'mountain') {
      // 🟣 崇山峻岭 · 崎岖险隘岩道、碎石与险崖
      ctx.fillStyle = "#64748b";
      ctx.fillRect(0, gTop - 4, w, 8);

      const passGrad = ctx.createLinearGradient(0, gTop, 0, this.canvas.height);
      passGrad.addColorStop(0, "#57534e");
      passGrad.addColorStop(0.4, "#44403c");
      passGrad.addColorStop(1, "#292524");
      ctx.fillStyle = passGrad;
      ctx.fillRect(0, gTop + 4, w, bottomH - 4);

      ctx.strokeStyle = "rgba(28, 25, 23, 0.6)";
      ctx.lineWidth = 2;
      for (let x = 30; x < w; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, gTop + 8);
        ctx.lineTo(x + 18, gTop + 22);
        ctx.lineTo(x + 35, gTop + 14);
        ctx.stroke();
      }

      const drawRock = (rx, ry, rw, rh) => {
        ctx.fillStyle = "#78716c";
        ctx.beginPath(); ctx.ellipse(rx, ry, rw, rh, 0, 0, Math.PI * 2); ctx.fill();
      };
      drawRock(180, gTop + 24, 8, 5);
      drawRock(360, gTop + 16, 6, 4);
      drawRock(w * 0.52, gTop + 28, 9, 6);
      drawRock(w * 0.75, gTop + 20, 7, 5);

    } else if (theme === 'night_fire') {
      // 🔴 烽火夜战 · 焦黑火海焦土与熔岩裂缝
      ctx.fillStyle = "#7f1d1d";
      ctx.fillRect(0, gTop - 4, w, 6);

      const burntGrad = ctx.createLinearGradient(0, gTop, 0, this.canvas.height);
      burntGrad.addColorStop(0, "#292524");
      burntGrad.addColorStop(0.4, "#1c1917");
      burntGrad.addColorStop(1, "#0c0a09");
      ctx.fillStyle = burntGrad;
      ctx.fillRect(0, gTop + 2, w, bottomH - 2);

      ctx.strokeStyle = "rgba(239, 68, 68, 0.75)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#f97316";
      ctx.shadowBlur = 8;
      for (let x = 50; x < w; x += 110) {
        ctx.beginPath();
        ctx.moveTo(x, gTop + 10); ctx.lineTo(x + 22, gTop + 18); ctx.lineTo(x + 45, gTop + 12);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      const drawGroundTorch = (tx, ty) => {
        ctx.fillStyle = "#78350f";
        ctx.fillRect(tx - 2, ty - 22, 4, 22);
        ctx.fillStyle = "#ef4444";
        ctx.beginPath(); ctx.arc(tx, ty - 24, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#facc15";
        ctx.beginPath(); ctx.arc(tx, ty - 24, 2.5, 0, Math.PI * 2); ctx.fill();
      };
      drawGroundTorch(190, gTop + 12);
      drawGroundTorch(w * 0.5, gTop + 10);
      drawGroundTorch(w - 220, gTop + 12);

    } else if (theme === 'desert') {
      // 🟡 西凉关陇 · 狂沙大漠古道与风蚀波纹
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(0, gTop - 4, w, 6);

      const sandGrad = ctx.createLinearGradient(0, gTop, 0, this.canvas.height);
      sandGrad.addColorStop(0, "#ca8a04");
      sandGrad.addColorStop(0.35, "#b45309");
      sandGrad.addColorStop(1, "#78350f");
      ctx.fillStyle = sandGrad;
      ctx.fillRect(0, gTop + 2, w, bottomH - 2);

      ctx.strokeStyle = "rgba(161, 98, 7, 0.55)";
      ctx.lineWidth = 2;
      for (let y = gTop + 10; y < this.canvas.height; y += 12) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 40) {
          const sy = y + Math.sin(x * 0.05) * 2;
          if (x === 0) ctx.moveTo(x, sy);
          else ctx.lineTo(x, sy);
        }
        ctx.stroke();
      }

    } else {
      // 🟢 中原原野 · 草坪路肩与军旅大道 (默认)
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(0, gTop - 6, w, 10);

      const roadGrad = ctx.createLinearGradient(0, gTop, 0, this.canvas.height);
      roadGrad.addColorStop(0, "#ca8a04");
      roadGrad.addColorStop(0.35, "#a16207");
      roadGrad.addColorStop(1, "#713f12");
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, gTop + 4, w, bottomH - 4);

      // 车辙双印
      ctx.strokeStyle = "rgba(113, 63, 18, 0.45)";
      ctx.lineWidth = 3;
      ctx.setLineDash([18, 12]);
      ctx.beginPath();
      ctx.moveTo(0, gTop + 14); ctx.lineTo(w, gTop + 14);
      ctx.moveTo(0, gTop + 24); ctx.lineTo(w, gTop + 24);
      ctx.stroke();
      ctx.setLineDash([]);

      const drawGrassTuft = (gx, gy) => {
        ctx.strokeStyle = "#15803d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, gy); ctx.lineTo(gx - 4, gy - 7);
        ctx.moveTo(gx, gy); ctx.lineTo(gx, gy - 9);
        ctx.moveTo(gx, gy); ctx.lineTo(gx + 4, gy - 7);
        ctx.stroke();
      };
      drawGrassTuft(140, gTop + 3);
      drawGrassTuft(320, gTop + 2);
      drawGrassTuft(w * 0.55, gTop + 3);
      drawGrassTuft(w * 0.78, gTop + 2);
      drawGrassTuft(w - 180, gTop + 3);

      const reedTime = Date.now() * 0.0025;
      const drawReedCluster = (rx, ry, count = 5, baseHeight = 26) => {
        for (let i = 0; i < count; i++) {
          const rPhase = i * 0.75 + rx * 0.02;
          const sway = Math.sin(reedTime + rPhase) * (5 + i * 1.2);
          const h = baseHeight + (i % 3) * 5;
          ctx.strokeStyle = (i % 2 === 0) ? "#65a30d" : "#84cc16";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(rx + (i - count / 2) * 4, ry);
          ctx.quadraticCurveTo(rx + (i - count / 2) * 4 + sway * 0.5, ry - h * 0.6, rx + (i - count / 2) * 4 + sway, ry - h);
          ctx.stroke();
          ctx.fillStyle = (i % 2 === 0) ? "#fef08a" : "#fef9c3";
          ctx.beginPath();
          ctx.ellipse(rx + (i - count / 2) * 4 + sway, ry - h, 2, 4.5, sway * 0.04, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      drawReedCluster(120, gTop - 2, 5, 24);
      drawReedCluster(260, gTop - 3, 6, 26);
      drawReedCluster(w * 0.38, gTop - 2, 6, 28);
      drawReedCluster(w * 0.62, gTop - 3, 5, 25);
      drawReedCluster(w * 0.84, gTop - 4, 6, 27);
    }
  }

  drawWeatherParticles(ctx) {
    if (!this.weatherParticles || this.weatherParticles.length === 0) return;

    this.weatherParticles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.rot !== undefined) ctx.rotate(p.rot);

      if (p.type === 'mist') {
        ctx.fillStyle = "rgba(224, 242, 254, 0.28)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'ember') {
        ctx.fillStyle = p.color || "#ef4444";
        ctx.shadowColor = "#f97316";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'sand') {
        ctx.fillStyle = p.color || "#ca8a04";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.8, p.size * 0.6, -Math.PI / 12, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color || "#fbcfe8";
        ctx.globalAlpha = p.alpha || 0.75;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  drawUltimateCutin(ctx) {
    if (!this.ultimateCutin) return;
    const { heroKey, heroName, skillName, shout, color, frame, maxFrames } = this.ultimateCutin;
    const w = this.canvas.width;
    const h = this.canvas.height;

    let alpha = 1;
    let slideX = 0;
    if (frame < 10) {
      const p = frame / 10;
      alpha = p;
      slideX = (1 - p) * -120;
    } else if (frame > maxFrames - 14) {
      const p = (maxFrames - frame) / 14;
      alpha = p;
      slideX = (1 - p) * 120;
    }

    ctx.save();

    // 1. 顶部与底部电影黑边
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.75})`;
    ctx.fillRect(0, 0, w, 28);
    ctx.fillRect(0, h - 28, w, 28);

    // 2. 中央倾斜战术必杀横幅
    const bannerY = h * 0.44;
    const bannerH = 118;
    const topY = bannerY - bannerH / 2;
    const botY = bannerY + bannerH / 2;

    ctx.save();
    const bannerGrad = ctx.createLinearGradient(0, topY, w, botY);
    bannerGrad.addColorStop(0, `rgba(15, 23, 42, ${alpha * 0.94})`);
    bannerGrad.addColorStop(0.35, `rgba(30, 41, 59, ${alpha * 0.96})`);
    bannerGrad.addColorStop(0.7, `rgba(15, 23, 42, ${alpha * 0.94})`);
    bannerGrad.addColorStop(1, `rgba(2, 6, 23, ${alpha * 0.96})`);
    ctx.fillStyle = bannerGrad;

    ctx.beginPath();
    ctx.moveTo(0, topY);
    ctx.lineTo(w, topY - 8);
    ctx.lineTo(w, botY + 8);
    ctx.lineTo(0, botY);
    ctx.closePath();
    ctx.fill();

    // 横幅上下流光描边
    ctx.strokeStyle = color || "#facc15";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = color || "#facc15";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(0, topY); ctx.lineTo(w, topY - 8);
    ctx.moveTo(0, botY); ctx.lineTo(w, botY + 8);
    ctx.stroke();
    ctx.restore();

    // 3. 动态穿梭流光能量条纹
    const streakOffset = ((frame * 24) % (w + 200)) - 100;
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(streakOffset, topY);
    ctx.lineTo(streakOffset + 80, botY);
    ctx.stroke();
    ctx.restore();

    // 4. 左侧名将霸气大立绘 (放大 2.6 倍)
    const portraitX = Math.max(90, w * 0.18) + slideX;
    const portraitY = bannerY + 28;

    ctx.save();
    const auraGrad = ctx.createRadialGradient(portraitX, bannerY, 10, portraitX, bannerY, 75);
    auraGrad.addColorStop(0, color || "#facc15");
    auraGrad.addColorStop(0.4, `rgba(250, 204, 21, ${alpha * 0.5})`);
    auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(portraitX, bannerY, 75, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(portraitX, portraitY);
    ctx.scale(2.6, 2.6);
    try {
      const cleanHeroKey = (heroKey || '').replace(/_ch\d+$/, '');
      const mapCfg = HERO_SPRITE_MAPPING[cleanHeroKey] || HERO_SPRITE_MAPPING[heroKey];
      if (mapCfg) {
        const drawn = CharacterRenderer.drawPixelGeneral(
          ctx, 0, 0, mapCfg.sprite, 0, 10, 0, 'blue',
          { slash: mapCfg.slash, slashColor: mapCfg.slashColor }
        );
        if (!drawn) {
          CharacterRenderer.drawEnemyGeneral(ctx, 0, 0, 0, 10, 0, cleanHeroKey, 'blue');
        }
      } else {
        CharacterRenderer.drawEnemyGeneral(ctx, 0, 0, 0, 10, 0, cleanHeroKey, 'blue');
      }
    } catch (err) {
      console.warn("Cutin portrait error", err);
    }
    ctx.restore();

    // 5. 右侧书法字风与震撼文案排版
    const textX = Math.max(180, w * 0.32) + slideX;
    ctx.save();

    // 行 1: ⚡【无双绝技 · 技能名】⚡
    ctx.font = `bold 24px "Songti SC", "SimSun", "STSong", "Noto Serif CJK SC", serif, sans-serif`;
    ctx.textAlign = "left";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.strokeText(`⚡【无双绝技 · ${skillName}】⚡`, textX, bannerY - 18);
    ctx.fillStyle = color || "#facc15";
    ctx.shadowColor = color || "#facc15";
    ctx.shadowBlur = 14;
    ctx.fillText(`⚡【无双绝技 · ${skillName}】⚡`, textX, bannerY - 18);

    // 行 2: 武将尊号
    ctx.font = `bold 16px sans-serif`;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeText(`👑 出战名将：${heroName}`, textX, bannerY + 10);
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(`👑 出战名将：${heroName}`, textX, bannerY + 10);

    // 行 3: 沉浸战吼台词
    ctx.font = `italic bold 17px "Kaiti SC", "STKaiti", "KaiTi", cursive, serif, sans-serif`;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.strokeText(`“${shout}”`, textX, bannerY + 38);
    ctx.fillStyle = "#fef08a";
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 8;
    ctx.fillText(`“${shout}”`, textX, bannerY + 38);

    ctx.restore();
    ctx.restore();
  }

  draw(aimX = null) {
    this.ctx.save();

    if (this.screenShake > 0) {
      this.screenShake--;
      this.ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const w = this.canvas.width;
    const gTop = this.groundY;

    // 1. 苍穹与日月中天 (依当前主题动态渲染)
    this.drawBattlefieldSky(this.ctx, w, gTop);

    // 2. 远景地貌与山川要塞 (依当前主题动态渲染)
    this.drawBattlefieldFarScenery(this.ctx, w, gTop);

    // 3. 战场地面与行军大道 (依当前主题动态渲染)
    this.drawBattlefieldGround(this.ctx, w, gTop);

    // 4. 动态环境天气微粒 (江雾浪花/落英飘絮/火星余烬/狂沙飞石/高山落叶)
    this.drawWeatherParticles(this.ctx);

    // 4. 城堡 (依关卡定制主题)
    if (this.blueCastle) this.blueCastle.draw(this.ctx, this.stageId);
    if (this.redCastle) this.redCastle.draw(this.ctx, this.stageId);

    // 5. 双方小人士兵
    this.blueUnits.forEach(u => u.draw(this.ctx, this));
    this.redUnits.forEach(u => u.draw(this.ctx, this));

    // 6. 投射物 (飞箭/巨石/霹雳火雷)
    this.arrows.forEach(a => a.draw(this.ctx));
    this.boulders.forEach(b => b.draw(this.ctx, this));
    this.bombs.forEach(b => b.draw(this.ctx));

    // 7. 特技写意水墨飞白大刀芒与泼墨墨滴
    this.inkSlashes.forEach(ink => {
      const p = ink.frame / ink.maxFrames;
      const alpha = (1 - p);
      this.ctx.save();
      this.ctx.translate(ink.x, ink.y - 25);
      this.ctx.scale(ink.direction, 1);

      const strokeWidth = (1 - p) * 24;
      this.ctx.lineCap = "round";

      // 浓黑水墨主脉
      this.ctx.lineWidth = Math.max(1, strokeWidth);
      this.ctx.strokeStyle = `rgba(15, 23, 42, ${alpha * 0.9})`;
      this.ctx.beginPath();
      this.ctx.moveTo(-40, 20);
      this.ctx.bezierCurveTo(20, -50, 80, -40, 140 + p * 30, -10);
      this.ctx.stroke();

      // 写意飞白与武将真气辉光 (青龙翠碧/龙枪苍蓝/猩红狂暴)
      this.ctx.lineWidth = strokeWidth * 0.6;
      this.ctx.strokeStyle = ink.aura || `rgba(234, 88, 12, ${alpha * 0.95})`;
      this.ctx.beginPath();
      this.ctx.moveTo(-20, 25);
      this.ctx.bezierCurveTo(30, -45, 90, -35, 150 + p * 40, -5);
      this.ctx.stroke();

      // 飞白断笔效果
      this.ctx.lineWidth = strokeWidth * 0.25;
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 15);
      this.ctx.bezierCurveTo(40, -35, 100, -25, 155 + p * 40, -2);
      this.ctx.stroke();

      // 泼墨飞溅墨滴
      ink.splashes.forEach(s => {
        this.ctx.fillStyle = `rgba(15, 23, 42, ${alpha * 0.85})`;
        this.ctx.beginPath();
        this.ctx.arc(s.dx * (0.6 + p * 0.6), s.dy * (0.6 + p * 0.6), Math.max(0.5, s.r * (1 - p * 0.5)), 0, Math.PI * 2);
        this.ctx.fill();
      });

      this.ctx.restore();
    });

    // 7. 诸葛神谋·八卦天机战术瞄准阵 (彻底取代 🎯 emoji)
    if (aimX !== null && aimX >= 100 && aimX <= this.maxBombRangeX) {
      this.ctx.save();
      const reticleY = gTop - 12;
      const rot = (Date.now() * 0.0025);

      // 外圈金色八卦符文旋转圆环
      this.ctx.save();
      this.ctx.translate(aimX, reticleY);
      this.ctx.rotate(rot);

      this.ctx.strokeStyle = "rgba(245, 158, 11, 0.88)";
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 36, 0, Math.PI * 2);
      this.ctx.stroke();

      // 八卦 8 卦象刻度线
      this.ctx.strokeStyle = "rgba(251, 191, 36, 0.95)";
      this.ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        this.ctx.beginPath();
        this.ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 30);
        this.ctx.lineTo(Math.cos(a) * 36, Math.sin(a) * 36);
        this.ctx.stroke();
      }
      this.ctx.restore();

      // 反向旋转的内圈火雷符阵
      this.ctx.save();
      this.ctx.translate(aimX, reticleY);
      this.ctx.rotate(-rot * 1.5);
      this.ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
      this.ctx.lineWidth = 1.8;
      this.ctx.setLineDash([5, 5]);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 22, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();

      // 锁定中心战术十字星准星
      this.ctx.strokeStyle = "#ef4444";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(aimX - 10, reticleY); this.ctx.lineTo(aimX + 10, reticleY);
      this.ctx.moveTo(aimX, reticleY - 10); this.ctx.lineTo(aimX, reticleY + 10);
      this.ctx.stroke();

      this.ctx.fillStyle = "#ef4444";
      this.ctx.beginPath();
      this.ctx.arc(aimX, reticleY, 3, 0, Math.PI * 2);
      this.ctx.fill();

      // 准星顶部战术落点标记文字
      this.ctx.font = "bold 12px sans-serif";
      this.ctx.fillStyle = "#f59e0b";
      this.ctx.textAlign = "center";
      this.ctx.fillText("【天降神火】", aimX, reticleY - 44);

      this.ctx.restore();
    }

    // 8. 粒子与飘字
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    for (const ft of this.floatingTexts) {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, ft.alpha);
      this.ctx.font = `bold ${Math.floor(18 * ft.scale)}px cursive, sans-serif`;
      this.ctx.fillStyle = ft.color;
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth = 4;
      this.ctx.strokeText(ft.text, ft.x, ft.y);
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    }

    // 9. 名将无双必杀技全屏切入立绘横幅
    if (this.ultimateCutin) {
      this.drawUltimateCutin(this.ctx);
    }

    this.ctx.restore();
  }
}
