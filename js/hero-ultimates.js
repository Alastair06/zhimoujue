// 《吞食三国传》名将怒气专属无双必杀技库 (Active Hero Ultimates)

export const HERO_ULTIMATES = {
  // ================= 🟢 蜀汉阵营 (10位) =================
  guanyu: {
    name: "青龙偃月 · 龙破九霄",
    shout: "青龙偃月，龙破九霄！看关某斩尽宵小！",
    color: "#16a34a",
    soundType: "dragonSlash",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      battle.triggerInkWashSlash({ type: 'guanyu', x: hero.x, y: hero.y, direction: 1, heroName: '关羽' });
      // 巨大青龙刀芒横扫全屏所有敌军
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(280, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 9 : -9;
          e.vy = -6;
          e.isFlying = true;
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(220, battle);

      // 青龙升腾特效粒子
      for (let i = 0; i < 40; i++) {
        battle.particles.push({
          x: hero.x + (Math.random() - 0.5) * 80,
          y: hero.y - Math.random() * 80,
          vx: Math.random() * 12 + 4,
          vy: (Math.random() - 0.5) * 6,
          color: ["#22c55e", "#15803d", "#86efac", "#facc15"][Math.floor(Math.random() * 4)],
          size: Math.random() * 10 + 4,
          alpha: 1,
          life: 0.03
        });
      }
    }
  },

  zhangfei: {
    name: "当阳断喝 · 断桥碎胆",
    shout: "燕人张翼德在此！谁敢与我决一死战？！",
    color: "#f97316",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(22);
      battle.triggerInkWashSlash({ type: 'zhangfei', x: hero.x, y: hero.y, direction: 1, heroName: '张飞' });
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.shield = 0;
          e.takeDamage(190, battle, 'true_damage');
          e.stunTimer = 180; // 吓破胆眩晕 3 秒！
          e.defense = Math.floor(e.defense * 0.5);
          e.vx = hero.team === 'blue' ? 7 : -7;
          e.vy = -4;
          e.isFlying = true;
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(160, battle);
    }
  },

  zhaoyun: {
    name: "七进七出 · 亮银龙胆刺",
    shout: "白马银枪，所向披靡！看某单骑救主！",
    color: "#38bdf8",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      battle.triggerInkWashSlash({ type: 'zhaoyun', x: hero.x, y: hero.y, direction: 1, heroName: '赵云' });
      hero.invulnerableTimer = 240; // 4 秒无敌闪避
      hero.speed = hero.baseSpeed * 2.2;
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 450) {
          e.takeDamage(260, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 8 : -8;
          e.vy = -5;
          e.isFlying = true;
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead && Math.abs(enemyCastle.x - hero.x) < 300) {
        enemyCastle.takeDamage(200, battle);
      }
      setTimeout(() => { if (hero) hero.speed = hero.baseSpeed; }, 4000);
    }
  },

  liubei: {
    name: "仁者无敌 · 昭烈汉室鼎",
    shout: "惟贤惟德，仁德昭烈！兴复汉室，还于旧都！",
    color: "#eab308",
    soundType: "coin",
    execute: (hero, battle) => {
      battle.triggerScreenShake(14);
      // 我方要塞与所有存活友军恢复 45% 生命值，并获得 6 秒【仁德金光盾】
      if (battle.blueCastle && !battle.blueCastle.isDead) {
        const healCastle = Math.floor(battle.blueCastle.maxHp * 0.45);
        battle.blueCastle.hp = Math.min(battle.blueCastle.maxHp, battle.blueCastle.hp + healCastle);
        battle.addFloatingText(`✨ 汉室九鼎庇护 +${healCastle} HP！`, battle.blueCastle.x + 50, battle.groundY - 120, "#facc15", 2.0);
      }
      battle.blueUnits.forEach(u => {
        if (!u.isDead) {
          const heal = Math.floor(u.maxHp * 0.5);
          u.hp = Math.min(u.maxHp, u.hp + heal);
          u.shield = (u.shield || 0) + 120; // 金光盾
          battle.addFloatingText(`✨ 昭烈圣佑 +${heal}`, u.x, u.y - 45, "#22c55e", 1.4);
        }
      });
    }
  },

  zhugeliang: {
    name: "八卦奇门 · 万象天雷轰",
    shout: "神机妙算夺天工，八卦奇门引天雷！",
    color: "#60a5fa",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      if (window.sound && typeof window.sound.playThunder === 'function') {
        window.sound.playThunder();
      }
      battle.triggerInkWashSlash({ type: 'canglan', x: battle.canvas.width * 0.6, y: battle.groundY - 50, direction: 1, heroName: '诸葛亮' });
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(280, battle, 'true_damage');
          e.stunTimer = 210; // 麻痹 3.5 秒
          battle.spawnSpark(e.x, e.y - 20);
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(220, battle);
    }
  },

  huangzhong: {
    name: "百步穿杨 · 金乌贯日箭",
    shout: "老夫虽老，宝弓犹劲！百步穿杨，例不虚发！",
    color: "#eab308",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(15);
      battle.triggerInkWashSlash({ type: 'huangzhong', x: hero.x, y: hero.y, direction: 1, heroName: '黄忠' });
      // 狙击敌方最强单位与要塞
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      const sorted = enemies.filter(e => !e.isDead).sort((a, b) => b.hp - a.hp);
      sorted.slice(0, 3).forEach(e => {
        e.takeDamage(360, battle, 'true_damage');
        battle.addFloatingText("🎯 金乌破心 -360！", e.x, e.y - 50, "#ef4444", 1.8);
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(250, battle);
    }
  },

  machao: {
    name: "神威天降 · 铁骑踏千峰",
    shout: "西凉神威锦马超在此！谁敢阻我？！",
    color: "#0284c7",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(240, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 10 : -10;
          e.vy = -6;
          e.isFlying = true;
          e.stunTimer = 120;
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(200, battle);
    }
  },

  pangtong: {
    name: "连环妙计 · 业火焚寨",
    shout: "凤雏展翅，巧用连环！铁索连舟，烈焰焚天！",
    color: "#ea580c",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(230, battle, 'true_damage');
          e.speed = Math.max(0.4, e.speed * 0.4); // 移速骤减
        }
      });
    }
  },

  weiyan: {
    name: "狂骨奔袭 · 子午夜惊雷",
    shout: "狂骨魏延，谁敢杀我！破阵斩将，就在今朝！",
    color: "#b45309",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      hero.atk += 30;
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) < 220).forEach(e => {
        e.takeDamage(260, battle, 'true_damage');
        e.vx = hero.team === 'blue' ? 8 : -8;
        e.isFlying = true;
      });
    }
  },

  jiangwei: {
    name: "幼麟蹈海 · 继志克定",
    shout: "臣愿承丞相遗志，九伐中原，誓复汉室！",
    color: "#2563eb",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      battle.blueUnits.forEach(u => {
        if (!u.isDead) {
          u.atk = Math.floor(u.atk * 1.35);
          battle.addFloatingText("⚔️ 汉军狂攻 +35%", u.x, u.y - 40, "#38bdf8", 1.2);
        }
      });
    }
  },

  // ================= 🔴 曹魏阵营 (10位) =================
  caocao: {
    name: "魏武雄风 · 短歌斩星河",
    shout: "设使国家无有孤，不知当几人称帝，几人称王！",
    color: "#dc2626",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      // 己方全军士气狂暴：攻速暴增 50%，移速 +40%，持续 6 秒！
      battle.blueUnits.forEach(u => {
        if (!u.isDead) {
          u.atkCooldown = Math.max(10, Math.floor(u.atkCooldown * 0.5));
          u.speed = u.baseSpeed * 1.4;
          battle.addFloatingText("🔥 魏武狂暴 攻速+50%！", u.x, u.y - 50, "#ef4444", 1.5);
        }
      });
      // 敌全军威慑减速 50%
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(160, battle, 'true_damage');
          e.speed = Math.max(0.5, e.speed * 0.5);
        }
      });
    }
  },

  simayi: {
    name: "冢虎隐忍 · 狼顾噬魂魄",
    shout: "隐忍十年，一朝风云！天下终归于我司马氏！",
    color: "#6b21a8",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      if (window.sound && typeof window.sound.playThunder === 'function') {
        window.sound.playThunder();
      }
      // 强行窃取敌方 80 军饷转入我方国库
      if (battle.mainRef) {
        battle.mainRef.gold += 80;
        battle.addFloatingText("💰 冢虎窃饷 +80 军饷！", hero.x, hero.y - 65, "#a855f7", 1.8);
      }
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(220, battle, 'true_damage');
          e.stunTimer = 120; // 侵蚀定身
        }
      });
    }
  },

  guojia: {
    name: "鬼才神算 · 十胜十败决",
    shout: "算无遗策！主公有十胜，袁绍有十败！",
    color: "#9333ea",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.charmedTimer = 180; // 混乱迷魂 3 秒
          battle.addFloatingText("🌀 鬼才心乱", e.x, e.y - 45, "#ec4899", 1.3);
        }
      });
    }
  },

  dianwei: {
    name: "古之恶来 · 狂暴掷双戟",
    shout: "恶来在此！贼兵休想越雷池一步！死！",
    color: "#b91c1c",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      hero.hp = Math.min(hero.maxHp, hero.hp + 200); // 嗜血回血
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 260) {
          e.takeDamage(320, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 9 : -9;
          e.vy = -6;
          e.isFlying = true;
        }
      });
    }
  },

  xuchu: {
    name: "虎痴碎山 · 裂地万钧锤",
    shout: "赤膊战马超！俺许褚一锤砸烂你！碎！",
    color: "#c2410c",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(22);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 240) {
          e.takeDamage(290, battle, 'true_damage');
          e.defense = 0; // 彻底碎甲
          e.stunTimer = 150;
        }
      });
    }
  },

  zhangliao: {
    name: "威震逍遥津 · 八百破十万",
    shout: "威震逍遥津！江东小儿，闻某之名安敢夜啼！",
    color: "#2563eb",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(240, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 9 : -9;
          e.isFlying = true;
        }
      });
    }
  },

  xiahoudun: {
    name: "拔矢啖睛 · 独眼盖世勇",
    shout: "父精母血，不可弃也！拔矢啖睛，杀！",
    color: "#991b1b",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      hero.hp = Math.min(hero.maxHp, hero.hp + 150);
      hero.atk += 25;
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 200) {
          e.takeDamage(260, battle, 'true_damage');
        }
      });
    }
  },

  caoren: {
    name: "玄武铁壁 · 南郡不动山",
    shout: "征南大将军曹仁在此！城在人在，誓死不退！",
    color: "#475569",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.blueUnits.forEach(u => {
        if (!u.isDead) {
          u.shield = (u.shield || 0) + 160;
          u.defense += 20;
          battle.addFloatingText("🛡️ 玄武铁壁 +160 盾", u.x, u.y - 40, "#94a3b8", 1.2);
        }
      });
    }
  },

  xiahouyuan: {
    name: "神速奔袭 · 虎步关右",
    shout: "典军校尉夏侯渊，三日五百，六日一千！杀！",
    color: "#d97706",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(15);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(220, battle, 'true_damage');
        }
      });
    }
  },

  pangde: {
    name: "白马抬棺 · 决死破樊城",
    shout: "抬棺出征！吾不杀关羽，关羽必杀吾！来战！",
    color: "#64748b",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 220) {
          e.takeDamage(270, battle, 'true_damage');
        }
      });
    }
  },

  // ================= 🔵 东吴阵营 (10位) =================
  zhouyu: {
    name: "江火燎原 · 樯橹灰飞烟灭",
    shout: "羽扇纶巾，谈笑间，樯橹灰飞烟灭！",
    color: "#ea580c",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(22);
      if (window.sound && typeof window.sound.playFirestorm === 'function') {
        window.sound.playFirestorm();
      }
      battle.triggerInkWashSlash({ type: 'canglan', x: battle.canvas.width * 0.5, y: battle.groundY - 50, direction: 1, heroName: '周瑜' });
      // 全屏火海焚烧
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(270, battle, 'true_damage');
          e.burnDmg = 15; // 持续灼烧
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(220, battle);

      // 烈焰粒子
      for (let i = 0; i < 40; i++) {
        battle.particles.push({
          x: Math.random() * battle.canvas.width,
          y: battle.groundY - Math.random() * 80,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 8 - 2,
          color: ["#ef4444", "#f97316", "#facc15"][Math.floor(Math.random() * 3)],
          size: Math.random() * 8 + 4,
          alpha: 1,
          life: 0.04
        });
      }
    }
  },

  sunquan: {
    name: "紫髯碧眼 · 坐断东南",
    shout: "孤承父兄之烈，据长江之险，誓保江东！",
    color: "#1d4ed8",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      battle.blueUnits.forEach(u => {
        if (!u.isDead) {
          u.atkCooldown = Math.max(10, Math.floor(u.atkCooldown * 0.65));
          u.shield = (u.shield || 0) + 100;
          battle.addFloatingText("🛡️ 江东神武 攻速+35%", u.x, u.y - 40, "#38bdf8", 1.2);
        }
      });
    }
  },

  sunce: {
    name: "小霸王 · 霸王裂地枪",
    shout: "小霸王孙伯符在此！江东儿郎，所向披靡！",
    color: "#f59e0b",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 220) {
          e.takeDamage(300, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 9 : -9;
          e.vy = -6;
          e.isFlying = true;
        }
      });
    }
  },

  taishici: {
    name: "神射天狼 · 穿云贯月箭",
    shout: "大丈夫生于乱世，当带三尺剑立不世之功！",
    color: "#0284c7",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      const sorted = enemies.filter(e => !e.isDead).sort((a, b) => b.hp - a.hp);
      if (sorted[0]) {
        sorted[0].takeDamage(380, battle, 'true_damage');
        battle.addFloatingText("🎯 穿云一箭 -380！", sorted[0].x, sorted[0].y - 50, "#ef4444", 2.0);
      }
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(220, battle);
    }
  },

  luxun: {
    name: "儒将妙谋 · 夷陵七百里火",
    shout: "书生拜大都督，亦能定天下！顺风纵火，破！",
    color: "#d97706",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      if (window.sound && typeof window.sound.playFirestorm === 'function') {
        window.sound.playFirestorm();
      }
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(250, battle, 'true_damage');
          e.defense = 0;
        }
      });
    }
  },

  ganning: {
    name: "锦帆百骑 · 劫营先登",
    shout: "锦帆贼甘兴霸来也！百骑劫魏营，功冠天下！",
    color: "#ea580c",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      hero.speed = hero.baseSpeed * 2.0;
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 250) {
          e.takeDamage(280, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 8 : -8;
          e.isFlying = true;
        }
      });
    }
  },

  zhoutai: {
    name: "浴血百战 · 不屈虎臣躯",
    shout: "身被几十创，血战卫吾主！周泰在此，谁能杀我！",
    color: "#78716c",
    soundType: "drum",
    execute: (hero, battle) => {
      hero.hp = hero.maxHp; // 浴血重生满血
      hero.shield = 200;
      battle.addFloatingText("🩸 浴血重生 满血复活！", hero.x, hero.y - 60, "#22c55e", 1.8);
    }
  },

  huanggai: {
    name: "苦肉赤壁 · 烈火战舰冲",
    shout: "苦肉计成！蒙冲斗舰，直冲曹寨！烧！",
    color: "#dc2626",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) {
        enemyCastle.takeDamage(320, battle);
        battle.addFloatingText("🔥 火船撞寨 -320！", enemyCastle.x, battle.groundY - 80, "#ef4444", 2.0);
      }
    }
  },

  lvmeng: {
    name: "白衣渡江 · 巧取荆襄九郡",
    shout: "士别三日当刮目相待！白衣渡江，奇袭烽火台！",
    color: "#2563eb",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(220, battle, 'true_damage');
          e.stunTimer = 120;
        }
      });
    }
  },

  lusu: {
    name: "榻上定策 · 联刘御强魏",
    shout: "天下大势，在于三分！抚平战乱，保境安民！",
    color: "#16a34a",
    soundType: "coin",
    execute: (hero, battle) => {
      if (battle.mainRef) battle.mainRef.gold += 100;
      battle.blueUnits.forEach(u => {
        if (!u.isDead) u.hp = Math.min(u.maxHp, u.hp + 100);
      });
    }
  },

  // ================= 🟡 群雄阵营 (10位) =================
  lvbu: {
    name: "方天画戟 · 天下无双魔神乱舞",
    shout: "天下无双，谁堪一击？！方天画戟下，神魔皆斩！",
    color: "#dc2626",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(25);
      battle.triggerInkWashSlash({ type: 'lvbu', x: hero.x, y: hero.y, direction: 1, heroName: '吕布' });
      hero.isBerserk = true;
      hero.invulnerableTimer = 300; // 5 秒霸体无敌
      hero.atk += 40;
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(360, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 10 : -10;
          e.vy = -7;
          e.isFlying = true;
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(280, battle);
    }
  },

  diaochan: {
    name: "倾国倾城 · 闭月迷魂蝶",
    shout: "妾身飘零半生，将军……肯怜惜我吗？",
    color: "#ec4899",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(14);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.charmedTimer = 240; // 魅惑 4 秒！
          e.takeDamage(80, battle, 'true_damage');
          battle.addFloatingText("💖 绝代魅惑 反戈一击！", e.x, e.y - 45, "#ec4899", 1.5);
        }
      });
    }
  },

  dongzhuo: {
    name: "魔王君临 · 西凉暴虐践踏",
    shout: "顺我者昌，逆我者亡！天下大事尽操于我手！",
    color: "#7f1d1d",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      hero.size = 54;
      hero.hp = Math.min(hero.maxHp, hero.hp + 200);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead && Math.abs(e.x - hero.x) < 260) {
          e.takeDamage(280, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 8 : -8;
          e.isFlying = true;
        }
      });
    }
  },

  yuanshao: {
    name: "思召宝剑 · 冀州千军弩阵",
    shout: "吾四世三公门生故吏遍天下！万弩齐发！",
    color: "#ca8a04",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(240, battle, 'true_damage');
          battle.spawnSpark(e.x, e.y - 20);
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(200, battle);
    }
  },

  zhangjiao: {
    name: "太平要术 · 天公九霄神雷",
    shout: "苍天已死，黄天当立！岁在甲子，天下大吉！雷公助我！",
    color: "#eab308",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(22);
      battle.triggerInkWashSlash({ type: 'canglan', x: battle.canvas.width * 0.5, y: battle.groundY - 50, direction: 1, heroName: '张角' });
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(290, battle, 'true_damage');
          e.stunTimer = 180;
        }
      });
      // 召唤 2 名黄巾死士助阵
      battle.spawnUnit('infantry', 'blue');
      battle.spawnUnit('infantry', 'blue');
      battle.addFloatingText("⚡ 太平天雷！黄巾死士从天而降！", hero.x + 50, battle.groundY - 100, "#facc15", 2.0);
    }
  },

  menghuo: {
    name: "蛮王百象 · 南蛮巨兽践踏",
    shout: "三江九洞百兽齐出！藤甲狂象，踏碎中原！",
    color: "#15803d",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(24);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(300, battle, 'true_damage');
          e.vx = hero.team === 'blue' ? 12 : -12;
          e.vy = -7;
          e.isFlying = true;
          e.defense = 0;
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(250, battle);
    }
  },

  zhangren: {
    name: "落凤神弩 · 绝命贯天破",
    shout: "老主公待我恩重如山！张任纵死，亦不降汉贼！",
    color: "#059669",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.forEach(e => {
        if (!e.isDead) {
          e.takeDamage(260, battle, 'true_damage');
        }
      });
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead) enemyCastle.takeDamage(250, battle);
    }
  },

  yanliang: {
    name: "河北双雄 · 裂空狂刀斩",
    shout: "河北名将颜良在此！曹军鼠辈，纳命来！",
    color: "#b45309",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) < 220).forEach(e => {
        e.takeDamage(290, battle, 'true_damage');
        e.vx = hero.team === 'blue' ? 8 : -8;
        e.isFlying = true;
      });
    }
  },

  wenchou: {
    name: "延津铁骑 · 疾风穿云枪",
    shout: "河北文丑在此！万马奔腾，踏平敌阵！",
    color: "#78350f",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) < 240).forEach(e => {
        e.takeDamage(280, battle, 'true_damage');
        e.vx = hero.team === 'blue' ? 9 : -9;
        e.isFlying = true;
      });
    }
  },

  jiling: {
    name: "三尖两刃 · 仲氏天威斩",
    shout: "看某三尖两刃刀！奉仲氏皇帝诏命，斩尔首级！",
    color: "#ca8a04",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) < 200).forEach(e => {
        e.takeDamage(270, battle, 'true_damage');
      });
    }
  }
};

// 通用名将保底绝技
export const DEFAULT_HERO_ULTIMATE = {
  name: "名将无双 · 破阵冲天斩",
  shout: "英雄拔剑，破阵斩将！随我冲锋！",
  color: "#f59e0b",
  soundType: "stratagem",
  execute: (hero, battle) => {
    battle.triggerScreenShake(16);
    const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
    enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) < 220).forEach(e => {
      e.takeDamage(250, battle, 'true_damage');
      e.vx = hero.team === 'blue' ? 7 : -7;
      e.isFlying = true;
    });
  }
};
