// 《吞食三国传》名将怒气专属无双必杀技库 (Active Hero Ultimates)
// 兵略平衡版：削减全屏秒杀，划定前锋交锋半径，规范攻城震荡，让兵种调度与战术克制重归核心。

// 获取身前交锋范围内的敌军（避免全图秒杀后排与泉水小兵，默认前锋半径 250 码）
export function getFrontlineEnemies(hero, battle, radius = 250) {
  const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
  return enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) <= radius);
}

// 攻城冲击判定：仅当武将亲自杀到敌阵门楼前沿 (小于 130 码) 时造成适量破城震荡，杜绝全屏隔空炸城
export function damageCastleIfClose(hero, battle, dmg = 45) {
  const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
  if (enemyCastle && !enemyCastle.isDead) {
    if (Math.abs(enemyCastle.x - hero.x) <= 130) {
      enemyCastle.takeDamage(dmg, battle);
      battle.addFloatingText(`💥 破阵冲击 -${dmg}`, enemyCastle.x + (hero.team === 'blue' ? -25 : 25), battle.groundY - 70, "#f59e0b", 1.4);
    }
  }
}

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
      // 巨大青龙刀芒斩击身前锋线敌军 (范围 260 码)
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(135, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.vy = -4;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 50);

      // 青龙升腾特效粒子
      for (let i = 0; i < 30; i++) {
        battle.particles.push({
          x: hero.x + (Math.random() - 0.5) * 60,
          y: hero.y - Math.random() * 60,
          vx: Math.random() * 8 + 3,
          vy: (Math.random() - 0.5) * 5,
          color: ["#22c55e", "#15803d", "#86efac", "#facc15"][Math.floor(Math.random() * 4)],
          size: Math.random() * 8 + 3,
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
      battle.triggerScreenShake(20);
      battle.triggerInkWashSlash({ type: 'zhangfei', x: hero.x, y: hero.y, direction: 1, heroName: '张飞' });
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.shield = 0;
        e.takeDamage(100, battle, 'skill');
        e.stunTimer = 120; // 慑服眩晕 2 秒
        e.defense = Math.floor(e.defense * 0.7);
        e.vx = hero.team === 'blue' ? 6 : -6;
        e.vy = -3;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 40);
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
      hero.invulnerableTimer = 150; // 2.5 秒身法闪避
      hero.speed = hero.baseSpeed * 1.6;
      const targets = getFrontlineEnemies(hero, battle, 250);
      targets.forEach(e => {
        e.takeDamage(130, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.vy = -4;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 45);
      setTimeout(() => { if (hero) hero.speed = hero.baseSpeed; }, 2500);
    }
  },

  liubei: {
    name: "仁者无敌 · 昭烈汉室鼎",
    shout: "惟贤惟德，仁德昭烈！兴复汉室，还于旧都！",
    color: "#eab308",
    soundType: "coin",
    execute: (hero, battle) => {
      battle.triggerScreenShake(14);
      // 我方要塞与身周奋战友军沐浴金光，恢复生命与护盾
      if (battle.blueCastle && !battle.blueCastle.isDead) {
        const healCastle = Math.floor(battle.blueCastle.maxHp * 0.15);
        battle.blueCastle.hp = Math.min(battle.blueCastle.maxHp, battle.blueCastle.hp + healCastle);
        battle.addFloatingText(`✨ 汉室九鼎庇护 +${healCastle} HP！`, battle.blueCastle.x + 50, battle.groundY - 120, "#facc15", 1.6);
      }
      battle.blueUnits.forEach(u => {
        if (!u.isDead && Math.abs(u.x - hero.x) <= 300) {
          const heal = Math.floor(u.maxHp * 0.25);
          u.hp = Math.min(u.maxHp, u.hp + heal);
          u.shield = (u.shield || 0) + 60; // 仁德金光盾
          battle.addFloatingText(`✨ 圣佑 +${heal}`, u.x, u.y - 45, "#22c55e", 1.3);
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
      battle.triggerScreenShake(18);
      if (window.sound && typeof window.sound.playThunder === 'function') {
        window.sound.playThunder();
      }
      battle.triggerInkWashSlash({ type: 'canglan', x: hero.x + 120, y: battle.groundY - 50, direction: 1, heroName: '诸葛亮' });
      // 奇门遁甲定点轰击战线前沿区域 (半径 280 码)
      const targets = getFrontlineEnemies(hero, battle, 280);
      targets.forEach(e => {
        e.takeDamage(135, battle, 'skill');
        e.stunTimer = 120; // 麻痹定身 2 秒
        battle.spawnSpark(e.x, e.y - 20);
      });
      damageCastleIfClose(hero, battle, 50);
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
      // 狙击视线范围内生命值最高的 2 名敌军将校
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      const sorted = enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) <= 380).sort((a, b) => b.hp - a.hp);
      sorted.slice(0, 2).forEach(e => {
        e.takeDamage(160, battle, 'skill');
        battle.addFloatingText("🎯 金乌破心 -160！", e.x, e.y - 50, "#ef4444", 1.6);
      });
      damageCastleIfClose(hero, battle, 50);
    }
  },

  machao: {
    name: "神威天降 · 铁骑踏千峰",
    shout: "西凉神威锦马超在此！谁敢阻我？！",
    color: "#0284c7",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const targets = getFrontlineEnemies(hero, battle, 250);
      targets.forEach(e => {
        e.takeDamage(120, battle, 'skill');
        e.vx = hero.team === 'blue' ? 8 : -8;
        e.vy = -4;
        e.isFlying = true;
        e.stunTimer = 60; // 冲撞击晕 1 秒
      });
      damageCastleIfClose(hero, battle, 45);
    }
  },

  pangtong: {
    name: "连环妙计 · 业火焚寨",
    shout: "凤雏展翅，巧用连环！铁索连舟，烈焰焚天！",
    color: "#ea580c",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(105, battle, 'skill');
        e.speed = Math.max(0.6, e.speed * 0.6); // 战线迟滞减速
      });
      damageCastleIfClose(hero, battle, 35);
    }
  },

  weiyan: {
    name: "狂骨奔袭 · 子午夜惊雷",
    shout: "狂骨魏延，谁敢杀我！破阵斩将，就在今朝！",
    color: "#b45309",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      hero.atk += 18;
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  jiangwei: {
    name: "幼麟蹈海 · 继志克定",
    shout: "臣愿承丞相遗志，九伐中原，誓复汉室！",
    color: "#2563eb",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      // 身周 300 码汉军将士备受激励，攻击提升 20%
      battle.blueUnits.forEach(u => {
        if (!u.isDead && Math.abs(u.x - hero.x) <= 300) {
          u.atk = Math.floor(u.atk * 1.20);
          battle.addFloatingText("⚔️ 汉军昂扬 +20%", u.x, u.y - 40, "#38bdf8", 1.2);
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
      battle.triggerScreenShake(18);
      // 身侧全军鼓舞：攻速提升 25%，移速 +20%
      battle.blueUnits.forEach(u => {
        if (!u.isDead && Math.abs(u.x - hero.x) <= 320) {
          u.atkCooldown = Math.max(12, Math.floor(u.atkCooldown * 0.75));
          u.speed = u.baseSpeed * 1.2;
          battle.addFloatingText("🔥 魏武天威 攻速+25%！", u.x, u.y - 50, "#ef4444", 1.4);
        }
      });
      // 阵前敌军受威慑减速
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(85, battle, 'skill');
        e.speed = Math.max(0.6, e.speed * 0.75);
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  simayi: {
    name: "冢虎隐忍 · 狼顾噬魂魄",
    shout: "隐忍十年，一朝风云！天下终归于我司马氏！",
    color: "#6b21a8",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      if (window.sound && typeof window.sound.playThunder === 'function') {
        window.sound.playThunder();
      }
      // 窃取敌方 35 军饷注入国库
      if (battle.mainRef) {
        battle.mainRef.gold += 35;
        battle.addFloatingText("💰 冢虎巧计 +35 军饷！", hero.x, hero.y - 65, "#a855f7", 1.6);
      }
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(110, battle, 'skill');
        e.stunTimer = 70; // 侵蚀定身 1.2 秒
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  guojia: {
    name: "鬼才神算 · 十胜十败决",
    shout: "算无遗策！主公有十胜，袁绍有十败！",
    color: "#9333ea",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(14);
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(60, battle, 'skill');
        e.charmedTimer = 110; // 迷魂扰乱 1.8 秒
        battle.addFloatingText("🌀 鬼才乱阵", e.x, e.y - 45, "#ec4899", 1.3);
      });
    }
  },

  dianwei: {
    name: "古之恶来 · 狂暴掷双戟",
    shout: "恶来在此！贼兵休想越雷池一步！死！",
    color: "#b91c1c",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      hero.hp = Math.min(hero.maxHp, hero.hp + 100); // 战意回血
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(145, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.vy = -4;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 45);
    }
  },

  xuchu: {
    name: "虎痴碎山 · 裂地万钧锤",
    shout: "赤膊战马超！俺许褚一锤砸烂你！碎！",
    color: "#c2410c",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(130, battle, 'skill');
        e.defense = Math.floor(e.defense * 0.6); // 碎甲 40%
        e.stunTimer = 90; // 震地昏厥 1.5 秒
      });
      damageCastleIfClose(hero, battle, 45);
    }
  },

  zhangliao: {
    name: "威震逍遥津 · 八百破十万",
    shout: "威震逍遥津！江东小儿，闻某之名安敢夜啼！",
    color: "#2563eb",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(120, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  xiahoudun: {
    name: "拔矢啖睛 · 独眼盖世勇",
    shout: "父精母血，不可弃也！拔矢啖睛，杀！",
    color: "#991b1b",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      hero.hp = Math.min(hero.maxHp, hero.hp + 80);
      hero.atk += 15;
      const targets = getFrontlineEnemies(hero, battle, 200);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  caoren: {
    name: "玄武铁壁 · 南郡不动山",
    shout: "征南大将军曹仁在此！城在人在，誓死不退！",
    color: "#475569",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.blueUnits.forEach(u => {
        if (!u.isDead && Math.abs(u.x - hero.x) <= 260) {
          u.shield = (u.shield || 0) + 80;
          u.defense += 10;
          battle.addFloatingText("🛡️ 玄武铁壁 +80 盾", u.x, u.y - 40, "#94a3b8", 1.2);
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
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(110, battle, 'skill');
      });
      damageCastleIfClose(hero, battle, 35);
    }
  },

  pangde: {
    name: "白马抬棺 · 决死破樊城",
    shout: "抬棺出征！吾不杀关羽，关羽必杀吾！来战！",
    color: "#64748b",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  // ================= 🔵 东吴阵营 (10位) =================
  zhouyu: {
    name: "江火燎原 · 樯橹灰飞烟灭",
    shout: "羽扇纶巾，谈笑间，樯橹灰飞烟灭！",
    color: "#ea580c",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      if (window.sound && typeof window.sound.playFirestorm === 'function') {
        window.sound.playFirestorm();
      }
      battle.triggerInkWashSlash({ type: 'canglan', x: hero.x + 120, y: battle.groundY - 50, direction: 1, heroName: '周瑜' });
      // 阵前纵火焚烧锋线部队 (范围 280 码)
      const targets = getFrontlineEnemies(hero, battle, 280);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
        e.burnDmg = 8; // 持续微弱灼烧
      });
      damageCastleIfClose(hero, battle, 50);

      // 烈焰火花粒子
      for (let i = 0; i < 25; i++) {
        battle.particles.push({
          x: hero.x + (Math.random() - 0.2) * 200,
          y: battle.groundY - Math.random() * 60,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 5 - 2,
          color: ["#ef4444", "#f97316", "#facc15"][Math.floor(Math.random() * 3)],
          size: Math.random() * 6 + 3,
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
      battle.triggerScreenShake(15);
      battle.blueUnits.forEach(u => {
        if (!u.isDead && Math.abs(u.x - hero.x) <= 280) {
          u.atkCooldown = Math.max(12, Math.floor(u.atkCooldown * 0.8));
          u.shield = (u.shield || 0) + 60;
          battle.addFloatingText("🛡️ 江东奋战 攻速+20%", u.x, u.y - 40, "#38bdf8", 1.2);
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
      battle.triggerScreenShake(18);
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(135, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.vy = -4;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 45);
    }
  },

  taishici: {
    name: "神射天狼 · 穿云贯月箭",
    shout: "大丈夫生于乱世，当带三尺剑立不世之功！",
    color: "#0284c7",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(15);
      // 强弓定点击穿敌阵前锋最强将领
      const enemies = hero.team === 'blue' ? battle.redUnits : battle.blueUnits;
      const sorted = enemies.filter(e => !e.isDead && Math.abs(e.x - hero.x) <= 360).sort((a, b) => b.hp - a.hp);
      if (sorted[0]) {
        sorted[0].takeDamage(175, battle, 'skill');
        battle.addFloatingText("🎯 穿云一箭 -175！", sorted[0].x, sorted[0].y - 50, "#ef4444", 1.8);
      }
      damageCastleIfClose(hero, battle, 45);
    }
  },

  luxun: {
    name: "儒将妙谋 · 夷陵七百里火",
    shout: "书生拜大都督，亦能定天下！顺风纵火，破！",
    color: "#d97706",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      if (window.sound && typeof window.sound.playFirestorm === 'function') {
        window.sound.playFirestorm();
      }
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(115, battle, 'skill');
        e.defense = Math.floor(e.defense * 0.6); // 烈火焚甲
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  ganning: {
    name: "锦帆百骑 · 劫营先登",
    shout: "锦帆贼甘兴霸来也！百骑劫魏营，功冠天下！",
    color: "#ea580c",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      hero.speed = hero.baseSpeed * 1.5;
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 45);
      setTimeout(() => { if (hero) hero.speed = hero.baseSpeed; }, 3000);
    }
  },

  zhoutai: {
    name: "浴血百战 · 不屈虎臣躯",
    shout: "身被几十创，血战卫吾主！周泰在此，谁能杀我！",
    color: "#78716c",
    soundType: "drum",
    execute: (hero, battle) => {
      const heal = Math.floor(hero.maxHp * 0.4);
      hero.hp = Math.min(hero.maxHp, hero.hp + heal);
      hero.shield = (hero.shield || 0) + 100;
      battle.addFloatingText(`🩸 不屈浴血 +${heal} HP！`, hero.x, hero.y - 60, "#22c55e", 1.6);
    }
  },

  huanggai: {
    name: "苦肉赤壁 · 烈火战舰冲",
    shout: "苦肉计成！蒙冲斗舰，直冲敌阵！烧！",
    color: "#dc2626",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      // 战舰冲击阵前敌军；若已推进至城下则撞击要塞
      const enemyCastle = hero.team === 'blue' ? battle.redCastle : battle.blueCastle;
      if (enemyCastle && !enemyCastle.isDead && Math.abs(enemyCastle.x - hero.x) <= 180) {
        enemyCastle.takeDamage(85, battle);
        battle.addFloatingText("🔥 火船撞寨 -85！", enemyCastle.x, battle.groundY - 80, "#ef4444", 1.8);
      }
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(110, battle, 'skill');
      });
    }
  },

  lvmeng: {
    name: "白衣渡江 · 巧取荆襄九郡",
    shout: "士别三日当刮目相待！白衣渡江，奇袭烽火台！",
    color: "#2563eb",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(110, battle, 'skill');
        e.stunTimer = 80; // 突袭惊骇 1.3 秒
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  lusu: {
    name: "榻上定策 · 联刘御强魏",
    shout: "天下大势，在于三分！抚平战乱，保境安民！",
    color: "#16a34a",
    soundType: "coin",
    execute: (hero, battle) => {
      if (battle.mainRef) battle.mainRef.gold += 40;
      battle.blueUnits.forEach(u => {
        if (!u.isDead && Math.abs(u.x - hero.x) <= 260) {
          u.hp = Math.min(u.maxHp, u.hp + 60);
          battle.addFloatingText("🌿 军心安定 +60", u.x, u.y - 35, "#22c55e", 1.1);
        }
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
      battle.triggerScreenShake(22);
      battle.triggerInkWashSlash({ type: 'lvbu', x: hero.x, y: hero.y, direction: 1, heroName: '吕布' });
      hero.isBerserk = true;
      hero.invulnerableTimer = 150; // 2.5 秒霸体护身 (从 5 秒合理下调)
      hero.atk += 20; // 攻势增幅适度
      const targets = getFrontlineEnemies(hero, battle, 250);
      targets.forEach(e => {
        e.takeDamage(160, battle, 'skill');
        e.vx = hero.team === 'blue' ? 8 : -8;
        e.vy = -5;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 60);
    }
  },

  diaochan: {
    name: "倾国倾城 · 闭月迷魂蝶",
    shout: "妾身飘零半生，将军……肯怜惜我吗？",
    color: "#ec4899",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(14);
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.charmedTimer = 130; // 魅惑停步 2.2 秒
        e.takeDamage(50, battle, 'skill');
        battle.addFloatingText("💖 绝代心乱", e.x, e.y - 45, "#ec4899", 1.3);
      });
    }
  },

  dongzhuo: {
    name: "魔王君临 · 西凉暴虐践踏",
    shout: "顺我者昌，逆我者亡！天下大事尽操于我手！",
    color: "#7f1d1d",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      hero.hp = Math.min(hero.maxHp, hero.hp + 100);
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(130, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 45);
    }
  },

  yuanshao: {
    name: "思召宝剑 · 冀州千军弩阵",
    shout: "吾四世三公门生故吏遍天下！万弩齐发！",
    color: "#ca8a04",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const targets = getFrontlineEnemies(hero, battle, 280);
      targets.forEach(e => {
        e.takeDamage(110, battle, 'skill');
        battle.spawnSpark(e.x, e.y - 20);
      });
      damageCastleIfClose(hero, battle, 45);
    }
  },

  zhangjiao: {
    name: "太平要术 · 天公九霄神雷",
    shout: "苍天已死，黄天当立！岁在甲子，天下大吉！雷公助我！",
    color: "#eab308",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      battle.triggerInkWashSlash({ type: 'canglan', x: hero.x + 100, y: battle.groundY - 50, direction: 1, heroName: '张角' });
      const targets = getFrontlineEnemies(hero, battle, 280);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
        e.stunTimer = 100; // 雷击麻痹 1.6 秒
      });
      // 召唤 1 名黄巾死士助阵前排
      battle.spawnUnit('infantry', 'blue');
      battle.addFloatingText("⚡ 太平神雷！黄巾死士助战！", hero.x + 50, battle.groundY - 100, "#facc15", 1.8);
      damageCastleIfClose(hero, battle, 45);
    }
  },

  menghuo: {
    name: "蛮王百象 · 南蛮巨兽践踏",
    shout: "三江九洞百兽齐出！藤甲狂象，踏碎中原！",
    color: "#15803d",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(20);
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(135, battle, 'skill');
        e.vx = hero.team === 'blue' ? 9 : -9;
        e.vy = -5;
        e.isFlying = true;
        e.defense = Math.floor(e.defense * 0.7);
      });
      damageCastleIfClose(hero, battle, 50);
    }
  },

  zhangren: {
    name: "落凤神弩 · 绝命贯天破",
    shout: "老主公待我恩重如山！张任纵死，亦不降汉贼！",
    color: "#059669",
    soundType: "stratagem",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const targets = getFrontlineEnemies(hero, battle, 260);
      targets.forEach(e => {
        e.takeDamage(115, battle, 'skill');
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  yanliang: {
    name: "河北双雄 · 裂空狂刀斩",
    shout: "河北名将颜良在此！曹军鼠辈，纳命来！",
    color: "#b45309",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const targets = getFrontlineEnemies(hero, battle, 220);
      targets.forEach(e => {
        e.takeDamage(130, battle, 'skill');
        e.vx = hero.team === 'blue' ? 7 : -7;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  wenchou: {
    name: "延津铁骑 · 疾风穿云枪",
    shout: "河北文丑在此！万马奔腾，踏平敌阵！",
    color: "#78350f",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(18);
      const targets = getFrontlineEnemies(hero, battle, 240);
      targets.forEach(e => {
        e.takeDamage(125, battle, 'skill');
        e.vx = hero.team === 'blue' ? 8 : -8;
        e.isFlying = true;
      });
      damageCastleIfClose(hero, battle, 40);
    }
  },

  jiling: {
    name: "三尖两刃 · 仲氏天威斩",
    shout: "看某三尖两刃刀！奉仲氏皇帝诏命，斩尔首级！",
    color: "#ca8a04",
    soundType: "drum",
    execute: (hero, battle) => {
      battle.triggerScreenShake(16);
      const targets = getFrontlineEnemies(hero, battle, 200);
      targets.forEach(e => {
        e.takeDamage(120, battle, 'skill');
      });
      damageCastleIfClose(hero, battle, 40);
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
    const targets = getFrontlineEnemies(hero, battle, 220);
    targets.forEach(e => {
      e.takeDamage(120, battle, 'skill');
      e.vx = hero.team === 'blue' ? 6 : -6;
      e.isFlying = true;
    });
    damageCastleIfClose(hero, battle, 40);
  }
};
