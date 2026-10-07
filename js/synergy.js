// 《吞食三国传》40大名将阵营体系与平衡羁绊核心引擎 (Synergy & Camp Engine)
// 遵循四大平衡红线：去极端化、数值预算控制在10%~20%、加法计算、机制克制代替无脑秒杀

// 1. 四大阵营元数据
export const CAMP_META = {
  shu: {
    id: "shu",
    name: "蜀汉",
    fullName: "蜀汉 · 仁德兴邦",
    color: "#16a34a",
    bgColor: "rgba(22, 163, 74, 0.12)",
    borderColor: "#22c55e",
    icon: "🟢",
    banner: "仁义"
  },
  wu: {
    id: "wu",
    name: "东吴",
    fullName: "东吴 · 水陆铁壁",
    color: "#0284c7",
    bgColor: "rgba(2, 132, 199, 0.12)",
    borderColor: "#38bdf8",
    icon: "🔵",
    banner: "江东"
  },
  wei: {
    id: "wei",
    name: "曹魏",
    fullName: "曹魏 · 铁血霸业",
    color: "#7e22ce",
    bgColor: "rgba(126, 34, 206, 0.12)",
    borderColor: "#a855f7",
    icon: "🔴",
    banner: "魏武"
  },
  qun: {
    id: "qun",
    name: "群雄",
    fullName: "群雄 · 逐鹿乱世",
    color: "#ea580c",
    bgColor: "rgba(234, 88, 12, 0.12)",
    borderColor: "#f97316",
    icon: "🟡",
    banner: "争霸"
  }
};

// 2. 40 大名将阵营归属表
export const HERO_CAMP_MAP = {
  // 🟢 蜀汉 (10)
  liubei: "shu",
  guanyu: "shu",
  zhangfei: "shu",
  zhaoyun: "shu",
  zhugeliang: "shu",
  pangtong: "shu",
  huangzhong: "shu",
  machao: "shu",
  weiyan: "shu",
  jiangwei: "shu",

  // 🔵 东吴 (10)
  sunquan: "wu",
  sunce: "wu",
  zhouyu: "wu",
  lusu: "wu",
  lvmeng: "wu",
  luxun: "wu",
  ganning: "wu",
  taishici: "wu",
  zhoutai: "wu",
  huanggai: "wu",

  // 🔴 曹魏 (10)
  caocao: "wei",
  simayi: "wei",
  guojia: "wei",
  xiahoudun: "wei",
  xiahouyuan: "wei",
  zhangliao: "wei",
  caoren: "wei",
  dianwei: "wei",
  xuchu: "wei",
  pangde: "wei",

  // 🟡 群雄 / 割据 (10)
  lvbu: "qun",
  diaochan: "qun",
  dongzhuo: "qun",
  yuanshao: "qun",
  yanliang: "qun",
  wenchou: "qun",
  jiling: "qun",
  zhangren: "qun",
  menghuo: "qun",
  zhangjiao: "qun"
};

// 3. 史诗三人终极羁绊 (Major 3-Hero Bonds)
// 激活条件：队伍中恰好包含对应3位英雄（或指定候选组中任意3位）
export const MAJOR_BONDS = [
  {
    id: "taoyuan",
    name: "桃园结义",
    requiredHeroes: ["liubei", "guanyu", "zhangfei"],
    type: "major",
    tier: 3,
    icon: "🌸",
    desc: "刘关张生命各提升 12%；任一人血量跌破 30% 时，张飞怒吼震退近身敌军，关羽护甲提升 15%，刘备为全场蜀兵施加 4 秒微量持续治疗（单场限触发 1 次救场）。",
    shortBonus: "全员生命+12%，残血防崩救场护阵",
    buffs: {
      heroHpMult: 0.12,
      onLowHpShield: true,
      lowHpTriggerHpRatio: 0.30
    }
  },
  {
    id: "wuhu",
    name: "五虎破阵",
    pool: ["guanyu", "zhangfei", "zhaoyun", "huangzhong", "machao"],
    minMatch: 3,
    type: "major",
    tier: 3,
    icon: "🐯",
    desc: "出战五虎将对敌方城寨要塞伤害提升 15%，首次与敌军交锋冲锋击退距离增加 20%，击退附带 0.8 秒硬直韧性。",
    shortBonus: "对要塞伤害+15%，首轮冲锋击退强化",
    buffs: {
      siegeDmgBonus: 0.15,
      firstChargeKnockback: 0.20,
      knockbackStunDuration: 0.8
    }
  },
  {
    id: "dongwu_dudou",
    name: "东吴大都督",
    pool: ["zhouyu", "lusu", "lvmeng", "luxun"],
    minMatch: 3,
    type: "major",
    tier: 3,
    icon: "🔥",
    desc: "全军火攻与谋略战技伤害提升 15%；每隔 30 秒升起一阵持续 4 秒的江东迷雾，迷雾期间友军全员闪避率提升 15%。",
    shortBonus: "火攻谋略+15%，周期江东迷雾闪避+15%",
    buffs: {
      fireDmgBonus: 0.15,
      fogIntervalSeconds: 30,
      fogDurationSeconds: 4,
      fogDodgeRate: 0.15
    }
  },
  {
    id: "jiangdong_jiye",
    name: "江东奠基",
    requiredHeroes: ["sunce", "sunquan", "zhouyu"],
    type: "major",
    tier: 3,
    icon: "👑",
    desc: "城寨初始防御耐久提高 20%；孙策初次冲锋获得 120 点临时护盾（持续 4 秒），周瑜普攻带轻微击退效果。",
    shortBonus: "城寨耐久+20%，孙策先锋护盾120",
    buffs: {
      castleHpMult: 0.20,
      initialHeroShield: { heroId: "sunce", shield: 120, duration: 4 },
      zhouyuKnockback: true
    }
  },
  {
    id: "weiwu_tiebi",
    name: "魏武铁壁死卫",
    requiredHeroes: ["caocao", "dianwei", "xuchu"],
    type: "major",
    tier: 3,
    icon: "🛡️",
    desc: "曹操受到伤害的 20% 转移给贴身的典韦/许褚；典韦与许褚受物理伤害减免 10%；生命低于 20% 时攻速提高 20%（持续 4 秒，单局限 1 次）。",
    shortBonus: "分摊曹操受创20%，双将物理免伤10%",
    buffs: {
      damageShareRatio: 0.20,
      bodyguardPhysDef: 0.10,
      bodyguardEnrageAtkSpd: 0.20
    }
  },
  {
    id: "weiwu_zongqin",
    name: "曹魏宗亲名将",
    requiredHeroes: ["caocao", "xiahoudun", "xiahouyuan"],
    type: "major",
    tier: 3,
    icon: "⚡",
    desc: "夏侯渊射程提升 15%，夏侯惇近战反伤 15%，曹操出阵时立即为两人提供 10% 移动速度增益。",
    shortBonus: "夏侯渊射程+15%，夏侯惇反伤15%",
    buffs: {
      archerRangeMult: 0.15,
      reflectDamageRatio: 0.15,
      heroSpeedMult: 0.10
    }
  },
  {
    id: "hanmo_qingfu",
    name: "汉末倾覆",
    requiredHeroes: ["lvbu", "dongzhuo", "diaochan"],
    type: "major",
    tier: 3,
    icon: "👹",
    desc: "貂蝉妙策降低目标 15% 护甲；吕布对被减甲敌军普攻附带 15% 物理破甲真实伤害；董卓生命上限提升 12%。",
    shortBonus: "减甲15%，吕布对破甲目标增伤15%",
    buffs: {
      armorShredRatio: 0.15,
      lvbuArmorPierceBonus: 0.15,
      dongzhuoHpMult: 0.12
    }
  },
  {
    id: "hebei_bazhu",
    name: "河北盟主",
    requiredHeroes: ["yuanshao", "yanliang", "wenchou"],
    type: "major",
    tier: 3,
    icon: "🏹",
    desc: "开局全军弓箭手获得前 8 秒射程提升 15%；颜良文丑开局获得 100 点先锋霸体护盾（持续 5 秒）。",
    shortBonus: "开局射程+15%，颜良文丑开场护盾100",
    buffs: {
      openingArcherRangeBonus: 0.15,
      openingShieldDuration: 5,
      initialHeroShield: { heroIds: ["yanliang", "wenchou"], shield: 100, duration: 5 }
    }
  }
];

// 4. 战术二人黄金羁绊 (Minor 2-Hero Bonds)
// 激活条件：出战阵容中包含对应 2 人；若已激活 3 人大羁绊，则不再重复叠加该 3 人内部的 2 人小羁绊
export const MINOR_BONDS = [
  {
    id: "wolong_fengchu",
    name: "卧龙凤雏",
    pair: ["zhugeliang", "pangtong"],
    type: "minor",
    tier: 2,
    icon: "🪶",
    desc: "庞统【连环铁锁】伤害传递比例提升至 25%，诸葛亮奇门战技冷却缩减 8%。",
    shortBonus: "铁锁传递25%，诸葛战技CD-8%",
    buffs: {
      chainDmgTransfer: 0.25,
      zhugeCooldownReduction: 0.08
    }
  },
  {
    id: "shitu_chuancheng",
    name: "师徒传承",
    pair: ["zhugeliang", "jiangwei"],
    type: "minor",
    tier: 2,
    icon: "⚔️",
    desc: "姜维附近友军护甲提升 8%；诸葛亮在阵中时，姜维战技剑气范围增加 15%。",
    shortBonus: "姜维周围护甲+8%，剑气范围+15%",
    buffs: {
      auraArmorBonus: 0.08,
      jiangweiSkillRangeMult: 0.15
    }
  },
  {
    id: "kurou_liehuo",
    name: "苦肉烈火",
    pair: ["zhouyu", "huanggai"],
    type: "minor",
    tier: 2,
    icon: "🔥",
    desc: "黄盖攻城要塞伤害提升 20%；黄盖阵亡时在原地留存 4 秒小范围火海，每秒灼烧周围敌军。",
    shortBonus: "黄盖攻城+20%，阵亡留存火海4秒",
    buffs: {
      huanggaiSiegeBonus: 0.20,
      huanggaiDeathFireDuration: 4
    }
  },
  {
    id: "jiangdong_shuangxiong",
    name: "江东双雄",
    pair: ["ganning", "taishici"],
    type: "minor",
    tier: 2,
    icon: "🏹",
    desc: "甘宁突进暴击率提升 10%，太史慈远程攻击速度提高 10%。",
    shortBonus: "甘宁暴击+10%，太史慈攻速+10%",
    buffs: {
      ganningCritBonus: 0.10,
      taishiciAtkSpdBonus: 0.10
    }
  },
  {
    id: "sizhan_xuedun",
    name: "死战血盾",
    pair: ["zhoutai", "sunce"],
    type: "minor",
    tier: 2,
    icon: "🛡️",
    desc: "周泰抵挡孙策受到的首次致命负面控制；孙策击杀敌将时为周泰恢复 10% 最大生命。",
    shortBonus: "免疫首发致命控制，斩将回血10%",
    buffs: {
      firstStunImmunity: true,
      killHealRatio: 0.10
    }
  },
  {
    id: "zhonghu_guicai",
    name: "冢虎鬼才",
    pair: ["simayi", "guojia"],
    type: "minor",
    tier: 2,
    icon: "🔮",
    desc: "敌方出战首个释放的战技冷却延长 2 秒，郭嘉受到近战物理伤害降低 12%。",
    shortBonus: "延缓敌方初发战技2秒，郭嘉近战免伤12%",
    buffs: {
      enemyInitialDelaySeconds: 2,
      guojiaPhysDamageReduction: 0.12
    }
  },
  {
    id: "shenwei_xiliang",
    name: "神威西凉",
    pair: ["machao", "weiyan"],
    type: "minor",
    tier: 2,
    icon: "🐎",
    desc: "马超与魏延近战攻击附带 10% 伤害吸血，突破敌方第一道防线时全军移速提升 10% 持续 5 秒。",
    shortBonus: "双将吸血+10%，破防全军移速+10%",
    buffs: {
      heroLifestealBonus: 0.10,
      breakthroughSpeedBonus: 0.10
    }
  },
  {
    id: "guan_huang_daojian",
    name: "关黄刀箭",
    pair: ["guanyu", "huangzhong"],
    type: "minor",
    tier: 2,
    icon: "🎯",
    desc: "关羽青龙破甲命中后，黄忠下一次宝雕神弓普攻必定命中并提升 15% 伤害。",
    shortBonus: "关羽破甲联动黄忠狙击增伤15%",
    buffs: {
      crossSkillDmgBonus: 0.15
    }
  },
  {
    id: "yingxiong_xiangxi",
    name: "英雄相惜",
    pair: ["guanyu", "zhangliao"],
    type: "minor",
    tier: 2,
    icon: "🤝",
    desc: "关羽与张辽并肩作战时，受控制时长缩短 20%，普攻物理伤害各提升 8%。",
    shortBonus: "受控时间缩减20%，普攻伤害+8%",
    buffs: {
      controlDurationReduction: 0.20,
      heroAtkBonus: 0.08
    }
  },
  {
    id: "nanman_xinfu",
    name: "七擒相惜",
    pair: ["zhugeliang", "menghuo"],
    type: "minor",
    tier: 2,
    icon: "🐘",
    desc: "孟获受到法术伤害降低 15%，诸葛亮八卦战技对孟获巨象附加风雷光环（践踏附带微量麻痹）。",
    shortBonus: "孟获法术免伤15%，巨象带风雷麻痹",
    buffs: {
      menghuoMagicDef: 0.15,
      elephantLightning: true
    }
  }
];

// 5. 阵营纯色共鸣 (Camp Resonances · 2人 / 3人 轻量基石底色)
export const CAMP_RESONANCES = {
  shu: {
    2: {
      id: "camp_shu_2",
      name: "蜀汉 · 仁义先锋",
      camp: "shu",
      icon: "🟢",
      desc: "全军士兵生命上限 +6%。",
      buffs: { armyHpMult: 0.06 }
    },
    3: {
      id: "camp_shu_3",
      name: "蜀汉 · 仁德兴邦",
      camp: "shu",
      icon: "🟢",
      desc: "全军士兵生命上限 +12%，且出战蜀将在阵亡时返还 20% 召唤耗资（降低断兵容错率）。",
      buffs: { armyHpMult: 0.12, deathRefundRatio: 0.20 }
    }
  },
  wu: {
    2: {
      id: "camp_wu_2",
      name: "东吴 · 疾行水军",
      camp: "wu",
      icon: "🔵",
      desc: "全军移速 +8%，弓箭手攻击轻微点燃（每秒造成 10 点固定灼烧伤害，持续 3 秒）。",
      buffs: { armySpeedMult: 0.08, archerBurnDmg: 10 }
    },
    3: {
      id: "camp_wu_3",
      name: "东吴 · 水陆铁壁",
      camp: "wu",
      icon: "🔵",
      desc: "全军移速 +15%，弓箭手点燃伤害翻倍至 20 点/秒，攻城器械防御提升 15%。",
      buffs: { armySpeedMult: 0.15, archerBurnDmg: 20, siegeDefenseBonus: 0.15 }
    }
  },
  wei: {
    2: {
      id: "camp_wei_2",
      name: "曹魏 · 铁壁先锋",
      camp: "wei",
      icon: "🔴",
      desc: "全军护甲 +8%。",
      buffs: { armyDefMult: 0.08 }
    },
    3: {
      id: "camp_wei_3",
      name: "曹魏 · 铁血霸业",
      camp: "wei",
      icon: "🔴",
      desc: "全军护甲 +15%，重骑兵冲击伤害额外提升 12%。",
      buffs: { armyDefMult: 0.15, cavalryChargeDmgBonus: 0.12 }
    }
  },
  qun: {
    2: {
      id: "camp_qun_2",
      name: "群雄 · 割据义勇",
      camp: "qun",
      icon: "🟡",
      desc: "出战武将登场时立刻获得 30 点初始士气/怒气。",
      buffs: { initialHeroMorale: 30 }
    },
    3: {
      id: "camp_qun_3",
      name: "群雄 · 逐鹿乱世",
      camp: "qun",
      icon: "🟡",
      desc: "武将击杀小兵回复 5 点士气，出战武将技能冷却缩减 8%。",
      buffs: { initialHeroMorale: 30, killMoraleGain: 5, heroCooldownReduction: 0.08 }
    }
  }
};

/**
 * 核心判定函数：根据当前出战的英雄队列（至多3名），严格按平衡规则计算激活的羁绊
 * 规则：
 * 1. 优先判定 3人史诗终极羁绊；若激活，则覆盖关闭该3人内部的小羁绊，防止恶性套娃叠加。
 * 2. 若未激活 3人大羁绊，则最多允许激活 2 个不冲突的 2人小羁绊。
 * 3. 统计阵营人数，附加轻量的纯色阵营共鸣底色加成。
 */
export function calculateActiveSynergies(selectedHeroIds = []) {
  const heroes = selectedHeroIds.filter(Boolean);
  const activeList = [];
  let majorActive = null;

  // 1. 检查 3 人史诗大羁绊
  for (const b of MAJOR_BONDS) {
    if (b.requiredHeroes) {
      const match = b.requiredHeroes.every(h => heroes.includes(h));
      if (match) {
        majorActive = { ...b, category: "major" };
        activeList.push(majorActive);
        break;
      }
    } else if (b.pool && b.minMatch) {
      const matchCount = b.pool.filter(h => heroes.includes(h)).length;
      if (matchCount >= b.minMatch) {
        majorActive = { ...b, category: "major" };
        activeList.push(majorActive);
        break;
      }
    }
  }

  // 2. 检查 2 人战术小羁绊 (如果未激活 3 人大羁绊，至多激活 2 个)
  if (!majorActive) {
    let minorCount = 0;
    for (const mb of MINOR_BONDS) {
      if (minorCount >= 2) break;
      if (mb.pair && mb.pair.every(h => heroes.includes(h))) {
        activeList.push({ ...mb, category: "minor" });
        minorCount++;
      }
    }
  }

  // 3. 统计阵营人数，附加阵营底色共鸣
  const campCounts = { shu: 0, wu: 0, wei: 0, qun: 0 };
  heroes.forEach(hId => {
    const c = HERO_CAMP_MAP[hId];
    if (c && campCounts[c] !== undefined) {
      campCounts[c]++;
    }
  });

  for (const [campKey, count] of Object.entries(campCounts)) {
    if (count >= 2) {
      const resMeta = CAMP_RESONANCES[campKey];
      if (resMeta && resMeta[count]) {
        activeList.push({ ...resMeta[count], category: "resonance", count });
      } else if (resMeta && resMeta[2]) {
        activeList.push({ ...resMeta[2], category: "resonance", count: 2 });
      }
    }
  }

  return activeList;
}

/**
 * 汇总生效的数值加成，供战斗引擎注入到 Unit 及战场全局中
 */
export function aggregateSynergyBuffs(activeSynergies = []) {
  const buffs = {
    armyHpMult: 0,
    armySpeedMult: 0,
    armyDefMult: 0,
    heroHpMult: 0,
    heroAtkBonus: 0,
    heroSpeedMult: 0,
    castleHpMult: 0,
    siegeDmgBonus: 0,
    fireDmgBonus: 0,
    archerBurnDmg: 0,
    deathRefundRatio: 0,
    initialHeroMorale: 0,
    killMoraleGain: 0,
    heroCooldownReduction: 0,
    firstChargeKnockback: 0,
    reflectDamageRatio: 0,
    heroLifestealBonus: 0,
    damageShareRatio: 0,
    initialShields: [], // Array of { heroId, shield, duration }
    specialFlags: {}
  };

  activeSynergies.forEach(syn => {
    const b = syn.buffs || {};
    if (b.armyHpMult) buffs.armyHpMult += b.armyHpMult;
    if (b.armySpeedMult) buffs.armySpeedMult += b.armySpeedMult;
    if (b.armyDefMult) buffs.armyDefMult += b.armyDefMult;
    if (b.heroHpMult) buffs.heroHpMult += b.heroHpMult;
    if (b.heroAtkBonus) buffs.heroAtkBonus += b.heroAtkBonus;
    if (b.heroSpeedMult) buffs.heroSpeedMult += b.heroSpeedMult;
    if (b.castleHpMult) buffs.castleHpMult += b.castleHpMult;
    if (b.siegeDmgBonus) buffs.siegeDmgBonus += b.siegeDmgBonus;
    if (b.fireDmgBonus) buffs.fireDmgBonus += b.fireDmgBonus;
    if (b.archerBurnDmg) buffs.archerBurnDmg = Math.max(buffs.archerBurnDmg, b.archerBurnDmg);
    if (b.deathRefundRatio) buffs.deathRefundRatio += b.deathRefundRatio;
    if (b.initialHeroMorale) buffs.initialHeroMorale += b.initialHeroMorale;
    if (b.killMoraleGain) buffs.killMoraleGain += b.killMoraleGain;
    if (b.heroCooldownReduction) buffs.heroCooldownReduction += b.heroCooldownReduction;
    if (b.firstChargeKnockback) buffs.firstChargeKnockback += b.firstChargeKnockback;
    if (b.reflectDamageRatio) buffs.reflectDamageRatio += b.reflectDamageRatio;
    if (b.heroLifestealBonus) buffs.heroLifestealBonus += b.heroLifestealBonus;
    if (b.damageShareRatio) buffs.damageShareRatio += b.damageShareRatio;

    // 护盾类特殊机制
    if (b.initialHeroShield) {
      if (b.initialHeroShield.heroId) {
        buffs.initialShields.push(b.initialHeroShield);
      } else if (b.initialHeroShield.heroIds) {
        b.initialHeroShield.heroIds.forEach(id => {
          buffs.initialShields.push({ heroId: id, shield: b.initialHeroShield.shield, duration: b.initialHeroShield.duration });
        });
      }
    }

    // 桃园救场等旗标
    if (b.onLowHpShield) buffs.specialFlags.taoyuanSave = true;
    if (b.zhouyuKnockback) buffs.specialFlags.zhouyuKnockback = true;
    if (b.firstStunImmunity) buffs.specialFlags.firstStunImmunity = true;
    if (b.chainDmgTransfer) buffs.specialFlags.chainDmgTransfer = b.chainDmgTransfer;
    if (b.fogIntervalSeconds) {
      buffs.specialFlags.fog = { interval: b.fogIntervalSeconds, duration: b.fogDurationSeconds, dodge: b.fogDodgeRate };
    }
  });

  return buffs;
}
