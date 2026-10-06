import { 
  GAME_CONFIG, CAMPAIGN_STAGES, STRATAGEMS, 
  TROOP_WEAPONS, GENERAL_RELICS, DYNAMITE_CONFIG, 
  MEDICAL_CONFIG, GENERALS, STRATEGISTS, BUILDINGS, RECRUITS 
} from './data.js';

// 货币通用换算辅助类
export class CurrencyHelper {
  // 将金银铜统一折算为铜币总值
  static toTotalCopper(money) {
    const g = money.gold || 0;
    const s = money.silver || 0;
    const c = money.copper || 0;
    return (g * 100) + (s * 10) + c;
  }

  // 从拥有金额中扣除指定成本（优先扣铜，再扣银，最后破开金币）
  static deduct(wallet, cost) {
    const totalHave = this.toTotalCopper(wallet);
    const totalCost = this.toTotalCopper(cost);

    if (totalHave < totalCost) return false;

    let remaining = totalHave - totalCost;
    // 重新换算回金、银、铜
    wallet.gold = Math.floor(remaining / 100);
    remaining %= 100;
    wallet.silver = Math.floor(remaining / 10);
    wallet.copper = remaining % 10;
    return true;
  }
}

// 玩家指挥官全局档案（跨关卡继承）
export class PlayerProfile {
  constructor() {
    this.level = 1;
    this.exp = 0;
    this.expToNext = 120;
    this.totalKills = 0;
    this.tacticWins = 0;
    this.currentStageIndex = 0; // 第1关

    // 装备解锁与购买记录
    this.unlockedTroopWeapons = { wood_spear: true };
    this.equippedTroopWeapons = { wood_spear: true };

    this.unlockedRelics = {};
    this.equippedRelics = {};

    // 炸药包库存 (开局赠送 + 自购)
    this.dynamiteCount = 1;

    // 医疗物资
    this.medicalSupplies = {
      jinchuang_san: 0,
      huatuo_gao: 0
    };
  }

  addExp(amount) {
    this.exp += amount;
    let leveled = false;
    while (this.exp >= this.expToNext && this.level < 5) {
      this.exp -= this.expToNext;
      this.level++;
      this.expToNext = Math.floor(this.expToNext * 1.8);
      leveled = true;
    }
    return leveled;
  }

  checkUnlocks() {
    let newUnlocks = [];

    // 检查士兵武器
    TROOP_WEAPONS.forEach(w => {
      if (!this.unlockedTroopWeapons[w.id]) {
        if (this.totalKills >= w.quest.targetKills) {
          this.unlockedTroopWeapons[w.id] = true;
          newUnlocks.push(w.name);
        }
      }
    });

    // 检查武将神兵
    GENERAL_RELICS.forEach(r => {
      if (!this.unlockedRelics[r.id]) {
        let ok = false;
        if (r.quest.targetStage && this.currentStageIndex >= r.quest.targetStage - 1) ok = true;
        if (r.quest.targetKills && this.totalKills >= r.quest.targetKills) ok = true;
        if (r.quest.targetTactics && this.tacticWins >= r.quest.targetTactics) ok = true;
        if (ok) {
          this.unlockedRelics[r.id] = true;
          newUnlocks.push(r.name);
        }
      }
    });

    return newUnlocks;
  }
}

// 阵营状态
export class FactionState {
  constructor(isPlayer = true, name = "我方大本营") {
    this.isPlayer = isPlayer;
    this.name = name;
    
    this.money = { ...GAME_CONFIG.START_MONEY };
    this.troops = { ...GAME_CONFIG.START_TROOPS };
    
    this.general = null;
    this.strategist = null;
    
    this.buildings = {
      barricade: 0,
      watchtower: 0,
      granary: 0,
      hospital: 0,
      iron_gate: 0
    };
    
    this.equippedStratagems = []; // 最多3张
    this.activeDynamites = 0;     // 准备在决战投掷的数量
    this.isScouted = false;        // 敌方是否已被侦察破雾
  }

  getTotalTroops() {
    return this.troops.infantry + this.troops.archer + this.troops.cavalry;
  }

  build(bId) {
    const bDef = BUILDINGS.find(b => b.id === bId);
    if (!bDef) return { success: false, msg: "建筑不存在" };
    if (!CurrencyHelper.deduct(this.money, bDef.cost)) {
      return { success: false, msg: "银钱不足，无法修筑！" };
    }
    this.buildings[bId] = (this.buildings[bId] || 0) + 1;
    return { success: true, msg: `修筑【${bDef.name}】成功！` };
  }

  recruit(type) {
    const rDef = RECRUITS.find(r => r.type === type);
    if (!rDef) return { success: false, msg: "兵种不存在" };
    if (!CurrencyHelper.deduct(this.money, rDef.cost)) {
      return { success: false, msg: "钱粮军饷不足，无法征募！" };
    }
    this.troops[type] += rDef.count;
    return { success: true, msg: `征募成功！【${rDef.name}】入列！` };
  }

  equipStratagem(sId) {
    if (this.equippedStratagems.length >= 3) {
      return { success: false, msg: "锦囊袋已满（最多密署3计）！" };
    }
    if (this.equippedStratagems.some(s => s.id === sId)) {
      return { success: false, msg: "此计已在部署中！" };
    }
    const sDef = STRATAGEMS.find(s => s.id === sId);
    if (!sDef) return { success: false, msg: "计策不存在" };
    if (!CurrencyHelper.deduct(this.money, sDef.cost)) {
      return { success: false, msg: "军费不足以密署该计策！" };
    }
    this.equippedStratagems.push(sDef);
    return { success: true, msg: `成功向军师问策，密署【${sDef.name}】！` };
  }

  removeStratagem(sId) {
    const idx = this.equippedStratagems.findIndex(s => s.id === sId);
    if (idx !== -1) {
      const removed = this.equippedStratagems.splice(idx, 1)[0];
      this.money.copper += Math.floor(CurrencyHelper.toTotalCopper(removed.cost) * 0.7);
      return { success: true, msg: `已撤回【${removed.name}】，回收部分军费。` };
    }
    return { success: false, msg: "未找到计策" };
  }
}

// AI 决策引擎
export class EnemyAIEngine {
  constructor(aiFaction, stageConfig) {
    this.ai = aiFaction;
    this.stage = stageConfig;
  }

  initStage() {
    this.ai.general = GENERALS.find(g => g.id === this.stage.generalId) || GENERALS[0];
    this.ai.strategist = STRATEGISTS.find(s => s.id === this.stage.strategistId) || STRATEGISTS[0];
    this.ai.name = this.stage.enemyName;
    this.ai.troops = { ...this.stage.enemyTroops };

    // 默认工事
    if (this.stage.personality === "fortress_turtle") {
      this.ai.buildings.barricade = 2;
      this.ai.buildings.watchtower = 2;
      this.ai.buildings.granary = 1;
      this.ai.equippedStratagems.push(STRATAGEMS.find(s => s.id === "yibing"));
    } else if (this.stage.personality === "reckless_warrior") {
      this.ai.buildings.barricade = 1;
      this.ai.equippedStratagems.push(STRATAGEMS.find(s => s.id === "jijiang"));
    } else {
      this.ai.buildings.barricade = 1;
      this.ai.buildings.watchtower = 1;
      this.ai.equippedStratagems.push(STRATAGEMS.find(s => s.id === "huolian"));
    }
  }

  performAction() {
    // AI在5分钟内定期花钱扩军
    if (this.stage.personality === "reckless_warrior") {
      if (Math.random() < 0.6) this.ai.recruit("cavalry");
      else this.ai.recruit("infantry");
    } else if (this.stage.personality === "fortress_turtle") {
      if (this.ai.buildings.watchtower < 3) this.ai.build("watchtower");
      else this.ai.recruit("archer");
    } else {
      if (Math.random() < 0.5) this.ai.recruit("archer");
      else this.ai.recruit("cavalry");
    }
  }
}

// 决战推演与裁决系统
export class BattleResolver {
  constructor(player, enemy, profile) {
    this.player = player;
    this.enemy = enemy;
    this.profile = profile;
    this.logs = [];
    this.winner = null;
    this.combatHealed = 0;
    this.finalHealed = 0;
  }

  resolve() {
    this.logs = [];
    const pStart = this.player.getTotalTroops();
    const eStart = this.enemy.getTotalTroops();

    this.addLog("⚔️ 【决战号角吹响】两军营门大开，旌旗蔽空，战鼓雷动！", "header");
    this.addLog(`我方（指挥官 Lv.${this.profile.level}）：主帅 ${this.player.general.name}（武力${this.player.general.might}）与 ${this.player.strategist.name}，率兵 ${pStart} 人！`);
    this.addLog(`敌方：主帅 ${this.enemy.general.name}（武力${this.enemy.general.might}）与 ${this.enemy.strategist.name}，率兵 ${eStart} 人！`);

    let pTroops = { ...this.player.troops };
    let eTroops = { ...this.enemy.troops };
    let pMorale = 100 + (this.player.buildings.granary * 20);
    let eMorale = 100 + (this.enemy.buildings.granary * 20);

    let pMight = this.player.general.might;
    let eMight = this.enemy.general.might;

    let pStrats = [...this.player.equippedStratagems];
    let eStrats = [...this.enemy.equippedStratagems];

    // 武将神兵加成
    Object.keys(this.profile.equippedRelics).forEach(rId => {
      if (this.profile.equippedRelics[rId]) {
        const rDef = GENERAL_RELICS.find(r => r.id === rId);
        if (rDef) {
          pMight += rDef.mightAdd;
          this.addLog(`🔱 我方主帅装备神兵【${rDef.name}】，武力与威慑大幅增强！`, "highlight");
        }
      }
    });

    // ==========================================
    // 第一幕：三十六计·绝密锦囊交锋
    // ==========================================
    this.addLog("\n📜 【第一幕：谋略暗流·锦囊斗智】", "section");

    // 嫁祸于人 / 离间
    if (pStrats.some(s => s.id === "jiahuo")) {
      this.addLog(`💡 我方施展【嫁祸于人】！挑起敌方主帅与谋士内讧，敌方锦囊全部作废反弹！`, "success");
      eStrats = [];
    }

    // 贿赂之计
    if (pStrats.some(s => s.id === "huilu")) {
      const bribed = Math.floor(eTroops.infantry * 0.25);
      eTroops.infantry -= bribed;
      pTroops.infantry += bribed;
      this.addLog(`💰 战前重金买通敌前锋！【贿赂之计】生效：敌方 ${bribed} 名步兵临阵倒戈归降我军！`, "super-success");
    }

    // 激将之计 (专克吕布)
    if (pStrats.some(s => s.id === "jijiang")) {
      if (this.enemy.general.id === "lvbu") {
        this.addLog(`💢 激将得手！敌将吕布暴怒失去理智，孤军冒进陷入泥潭重围，武力威慑直接归零！`, "super-success");
        eMight = 0;
        eMorale -= 40;
      } else {
        this.addLog(`💢 我方施展【激将之计】，扰乱了敌军阵型！`, "normal");
        eMorale -= 20;
      }
    }

    // 火烧连环 + 孔明借东风组合
    const hasFire = pStrats.some(s => s.id === "huolian");
    const hasWind = pStrats.some(s => s.id === "dongfeng");
    if (hasFire && hasWind) {
      this.addLog(`🔥🌪️ 【神谋天合·赤壁再现】借东风引燃火烧连环！狂风裹挟漫天烈焰，直接烧光敌方全部木栅营防！`, "super-success");
      this.enemy.buildings.barricade = 0;
      eTroops.infantry = Math.floor(eTroops.infantry * 0.4);
      eMorale -= 50;
    } else if (hasFire) {
      this.addLog(`🔥 烈火借势！我方施展【火烧连环】，焚毁敌方外围营寨！`, "super-success");
      this.enemy.buildings.barricade = 0;
      eTroops.infantry = Math.floor(eTroops.infantry * 0.7);
    }

    // 草船借箭
    if (pStrats.some(s => s.id === "caochuan")) {
      const absorbed = Math.floor(eTroops.archer * 1.2);
      this.addLog(`🚣 【草船借箭】大获全胜！诱骗吸收敌方全部箭雨，转化为我军箭矢反射敌军，造成 ${absorbed} 点反弹杀伤！`, "super-success");
      eTroops.infantry = Math.max(0, eTroops.infantry - absorbed);
    }

    // 空城之计
    if (pStrats.some(s => s.id === "kongcheng")) {
      if (pStart <= eStart * 0.65) {
        this.addLog(`🪕 兵力虽少，城头抚琴！【空城之计】大显神威，敌军疑有天罗地网惊慌撤退，士气暴降 50 点！`, "super-success");
        eMorale -= 50;
        eMight = Math.floor(eMight * 0.3);
      }
    }

    // 苦肉计
    if (pStrats.some(s => s.id === "kurou")) {
      this.addLog(`🩸 【苦肉计】生效！我方将士诱敌轻信，全军爆发 200% 破釜沉舟暴击杀伤！`, "super-success");
      pMight += 30;
    }

    // ==========================================
    // 第二幕：特种破袭·等级炸药包投掷
    // ==========================================
    if (this.player.activeDynamites > 0) {
      this.addLog("\n💣 【第二幕：特种奇袭·炸药包轰鸣】", "section");
      const dData = DYNAMITE_CONFIG.levelData.find(l => l.level === this.profile.level) || DYNAMITE_CONFIG.levelData[0];
      const count = this.player.activeDynamites;
      
      this.addLog(`🧨 我方指挥官（Lv.${this.profile.level}）点燃引信，强掷 ${count} 枚【${dData.name}】！`);
      this.addLog(`🎯 射程覆盖：【${dData.rangeText}】！`);

      if (dData.targetTier === "frontline") {
        const dmg = Math.min(eTroops.infantry, dData.baseDamage * count);
        eTroops.infantry -= dmg;
        this.addLog(`💥 巨响震天！炸药包在敌军前锋开花，掀翻步兵 ${dmg} 人！`, "super-success");
      } else if (dData.targetTier === "barricade") {
        this.enemy.buildings.barricade = 0;
        const dmg = Math.min(eTroops.infantry, Math.floor(dData.baseDamage * count * 0.8));
        eTroops.infantry -= dmg;
        this.addLog(`💥 炸药包精准炸塌敌方【木栅防线】，并波及敌兵 ${dmg} 人！`, "super-success");
      } else if (dData.targetTier === "watchtower") {
        this.enemy.buildings.watchtower = 0;
        const arcLoss = Math.min(eTroops.archer, 30 * count);
        eTroops.archer -= arcLoss;
        this.addLog(`💥 远距强掷直击【了望箭塔】！箭塔轰然倒塌，消灭塔内弓兵 ${arcLoss} 人！`, "super-success");
      } else if (dData.targetTier === "granary") {
        this.enemy.buildings.granary = 0;
        eMorale -= 45;
        this.addLog(`💥 炸中敌方后方辎重粮仓！火光冲天，敌军断粮大乱！`, "super-success");
      } else if (dData.targetTier === "headquarters") {
        eMight = Math.floor(eMight * 0.2);
        eMorale -= 60;
        eTroops.infantry = Math.floor(eTroops.infantry * 0.5);
        this.addLog(`🔥 绝技神掷！炸药包正中敌方【中军主帅大营】！敌将重伤，全军陷入大恐慌！`, "super-success");
      }
    }

    // ==========================================
    // 第三幕：工事对射与战时医疗救护
    // ==========================================
    this.addLog("\n🏹 【第三幕：军械对射·战时急救】", "section");

    // 计算士兵武器加成
    let troopBonus = 0;
    Object.keys(this.profile.equippedTroopWeapons).forEach(wId => {
      if (this.profile.equippedTroopWeapons[wId]) {
        const wDef = TROOP_WEAPONS.find(w => w.id === wId);
        if (wDef) troopBonus += wDef.powerBonus;
      }
    });

    if (troopBonus > 0) {
      this.addLog(`⚔️ 我方士兵装备精良神兵利刃，全军获得 +${troopBonus} 点军械攻击加成！`, "highlight");
    }

    const pDef = (this.player.buildings.barricade * 20) + (this.player.buildings.iron_gate * 80);
    const pArcDmg = (pTroops.archer * 1.5) + (this.player.buildings.watchtower * 40);
    const eDef = (this.enemy.buildings.barricade * 20) + (this.enemy.buildings.iron_gate * 80);
    const eArcDmg = (eTroops.archer * 1.5) + (this.enemy.buildings.watchtower * 40);

    const pRawLoss = Math.max(5, Math.floor((eArcDmg - pDef * 0.3) * 0.4));
    const eRawLoss = Math.max(5, Math.floor((pArcDmg - eDef * 0.3) * 0.4));

    pTroops.infantry = Math.max(0, pTroops.infantry - pRawLoss);
    eTroops.infantry = Math.max(0, eTroops.infantry - eRawLoss);

    // 战时持续医疗急救
    if (this.player.buildings.hospital > 0) {
      this.combatHealed = Math.floor(pRawLoss * 0.4);
      pTroops.infantry += this.combatHealed;
      this.addLog(`⚕️ 【战地医疗营】医官冒着箭雨持续急救，战时救回 ${this.combatHealed} 名伤兵重返阵列！`, "success");
    }

    // ==========================================
    // 第四幕：大军白刃冲锋与决战判定
    // ==========================================
    this.addLog("\n⚡ 【第四幕：白刃冲锋·决出胜负】", "section");

    const pStrength = (pTroops.infantry * 1.0) + (pTroops.archer * 0.8) + (pTroops.cavalry * 2.2) + troopBonus;
    const eStrength = (eTroops.infantry * 1.0) + (eTroops.archer * 0.8) + (eTroops.cavalry * 2.2);

    const pScore = (pStrength * (pMorale / 100)) + (pMight * 1.8) + (pDef * 0.5);
    const eScore = (eStrength * (eMorale / 100)) + (eMight * 1.8) + (eDef * 0.5);

    let stagePlayerLoss = 0;
    let stageEnemyLoss = 0;

    if (pScore > eScore * 1.1) {
      this.winner = "player";
      this.profile.tacticWins++;
      const rem = Math.min(0.85, (pScore - eScore) / pScore + 0.3);
      stagePlayerLoss = pStart - Math.floor(pStart * rem);
      stageEnemyLoss = eStart - Math.floor(eStart * 0.08);

      this.addLog("\n🏆 🎉 【大捷！！！】", "victory-header");
      this.addLog(`我方计策神妙、军械精良！敌军大败溃逃，斩将夺旗，赢下本关！`, "super-success");
    } else if (eScore > pScore * 1.1) {
      this.winner = "enemy";
      stagePlayerLoss = pStart - Math.floor(pStart * 0.15);
      stageEnemyLoss = eStart - Math.floor(eStart * 0.5);

      this.addLog("\n💀 🌧️ 【战败撤退……】", "defeat-header");
      this.addLog(`我方阵线被敌军悍勇突破，鸣金收兵！请重新整军问策！`, "danger");
    } else {
      this.winner = "draw";
      stagePlayerLoss = Math.floor(pStart * 0.4);
      stageEnemyLoss = Math.floor(eStart * 0.4);
      this.addLog("\n🤝 ⚔️ 【势均力敌·握手言和】", "header");
    }

    this.profile.totalKills += Math.max(15, stageEnemyLoss);

    // ==========================================
    // 第五幕：战后医疗营最终大抢救
    // ==========================================
    this.addLog("\n🏥 【第五幕：战后抚伤·医馆终极抢救】", "section");

    let postHeal = 0;
    if (this.player.buildings.hospital > 0) {
      postHeal += Math.floor(stagePlayerLoss * 0.3);
    }
    if (this.profile.medicalSupplies.jinchuang_san > 0 && stagePlayerLoss > postHeal) {
      const useCount = Math.min(this.profile.medicalSupplies.jinchuang_san, 3);
      postHeal += useCount * 20;
      this.profile.medicalSupplies.jinchuang_san -= useCount;
      this.addLog(`🌿 消耗 ${useCount} 份【止血金创散】，额外救回 ${useCount * 20} 名重伤官兵！`, "success");
    }
    if (this.profile.medicalSupplies.huatuo_gao > 0 && stagePlayerLoss > postHeal) {
      postHeal += 50;
      this.profile.medicalSupplies.huatuo_gao -= 1;
      this.addLog(`🧪 服用神药【华佗九转还魂膏】，奇迹般复原 50 名重伤将士！`, "super-success");
    }

    this.finalHealed = Math.min(stagePlayerLoss, postHeal);
    const actualDead = Math.max(0, stagePlayerLoss - this.finalHealed);

    this.addLog(`📋 战后总抚伤结算：战时急救救活 ${this.combatHealed} 人，战后终极抢救救回 ${this.finalHealed} 人，实际阵亡 ${actualDead} 人！`);

    return {
      winner: this.winner,
      logs: this.logs,
      playerLoss: actualDead,
      totalHealed: this.combatHealed + this.finalHealed,
      enemyLoss: stageEnemyLoss,
      totalKills: this.profile.totalKills
    };
  }

  addLog(text, style = "normal") {
    this.logs.push({ text, style });
  }
}
