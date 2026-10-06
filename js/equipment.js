// 《智谋决：三国萌将推线大作战》全套名将装备库、1~5星升星与集市商店系统

// 碎片合成新装备的标准成本（攒满 20 枚同款碎片可直接合成出 1 星本体）
export const SYNTHESIS_SHARD_COST = 20;

export const EQUIPMENT_DATABASE = [
  // ================= 🗡️ 神兵武器 (主加攻击、暴击、横扫特技) =================
  {
    id: "fangtian_huaji",
    name: "方天画戟",
    slot: "weapon",
    quality: "legendary",
    icon: "🔱",
    image: "assets/equipment/fangtian_huaji.png",
    exclusiveHero: "lvbu",
    exclusiveHeroName: "战神吕布专属",
    sourceBoss: "lvbu",
    sourceChapter: 2,
    sourceDesc: "击败第2章/第6章 战神吕布必掉 / 珍宝集市",
    desc: "三国第一战神吕奉先随身神兵，双月牙金刃，威震天下！",
    starStats: {
      1: { atk: 25, desc: "初阶胚子：攻击力 +25" },
      2: { atk: 50, crit: 0.06, desc: "百炼锋芒：攻击力 +50，暴击率 +6%" },
      3: { atk: 90, crit: 0.10, skill: "pojun", skillName: "破军横扫", desc: "破军横扫：攻击力 +90，普攻 25% 几率打出 140° 范围斩击" },
      4: { atk: 140, crit: 0.16, skill: "pojun_plus", skillName: "狂涛破阵", desc: "狂涛破阵：攻击力 +140，横扫几率 35% 且击退敌军" },
      5: { atk: 210, crit: 0.25, critDmg: 0.5, skill: "guishenqi", skillName: "真·鬼神泣", desc: "真·鬼神泣：攻击力 +210，暴伤 +50%，每8秒自动挥出烈焰大旋风！" }
    }
  },
  {
    id: "qinglong_dao",
    name: "青龙偃月刀",
    slot: "weapon",
    quality: "legendary",
    icon: "🐉",
    image: "assets/equipment/qinglong_dao.png",
    exclusiveHero: "guanyu",
    exclusiveHeroName: "武圣关羽专属",
    sourceBoss: "guanyu",
    sourceChapter: 7,
    sourceDesc: "第7章斩颜良掉落 / 珍宝集市",
    desc: "名曰冷艳锯，重八十二斤，温酒斩华雄，威震华夏！",
    starStats: {
      1: { atk: 28, desc: "初阶胚子：攻击力 +28" },
      2: { atk: 55, pierce: 0.2, desc: "青锋耀芒：攻击力 +55，无视目标 20% 护甲" },
      3: { atk: 95, pierce: 0.4, skill: "qinglong_slash", skillName: "青龙贯日", desc: "青龙贯日：攻击力 +95，普攻挥出碧绿龙形刀芒贯穿前排" },
      4: { atk: 150, pierce: 0.6, skill: "qinglong_slash_plus", skillName: "刀劈山河", desc: "刀劈山河：攻击力 +150，青龙刀芒伤害提升 50%" },
      5: { atk: 220, pierce: 1.0, skill: "wusheng_jianglin", skillName: "武圣降临", desc: "武圣降临：攻击力 +220，完全破甲，斩杀敌军时刷新冲锋！" }
    }
  },
  {
    id: "zhangba_shemao",
    name: "丈八蛇矛",
    slot: "weapon",
    quality: "epic",
    icon: "🐍",
    image: "assets/equipment/zhangba_shemao.png",
    exclusiveHero: "zhangfei",
    exclusiveHeroName: "万人敌张飞专属",
    sourceBoss: "zhangfei",
    sourceChapter: 10,
    sourceDesc: "第10章长坂桥掉落 / 珍宝集市",
    desc: "一丈八尺点钢矛，矛尖弯曲如灵蛇吐信，当阳桥头喝退百万曹兵！",
    starStats: {
      1: { atk: 22, desc: "初阶胚子：攻击力 +22" },
      2: { atk: 45, stunChance: 0.1, desc: "雷霆重击：攻击力 +45，普攻 10% 几率眩晕 1 秒" },
      3: { atk: 80, stunChance: 0.2, skill: "yanren_nu", skillName: "燕人狂怒", desc: "燕人狂怒：攻击力 +80，生命低于50%时攻击力暴增 40%" },
      4: { atk: 130, stunChance: 0.3, skill: "yanren_nu_plus", desc: "撼地狂澜：攻击力 +130，眩晕几率提升至 30%" },
      5: { atk: 190, stunChance: 0.4, skill: "dangyang_lei", skillName: "当阳惊雷", desc: "当阳惊雷：攻击力 +190，每次攻击带雷电震击，大范围退敌！" }
    }
  },
  {
    id: "longdan_qiang",
    name: "亮银龙胆枪",
    slot: "weapon",
    quality: "epic",
    icon: "⚡",
    image: "assets/equipment/longdan_qiang.png",
    exclusiveHero: "zhaoyun",
    exclusiveHeroName: "大将赵云专属",
    sourceBoss: "zhaoyun",
    sourceChapter: 9,
    sourceDesc: "第9章长坂坡救主掉落 / 珍宝集市",
    desc: "百炼白银透龙枪，长坂坡单骑救主，子龙一身都是胆！",
    starStats: {
      1: { atk: 20, spdBonus: 0.1, desc: "初阶胚子：攻击力 +20，攻速 +10%" },
      2: { atk: 42, spdBonus: 0.15, desc: "银龙穿云：攻击力 +42，攻速 +15%" },
      3: { atk: 75, spdBonus: 0.25, skill: "qijin_qichu", skillName: "疾风龙刺", desc: "疾风龙刺：攻击力 +75，每次攻击附带连续突刺3次" },
      4: { atk: 120, spdBonus: 0.35, skill: "qijin_qichu_plus", desc: "银龙破阵：攻击力 +120，攻速 +35%，冲锋不可阻挡" },
      5: { atk: 180, spdBonus: 0.50, skill: "tianxiang_long", skillName: "天翔龙胆", desc: "天翔龙胆：攻击力 +180，攻速 +50%，击败敌将回血 30%！" }
    }
  },
  {
    id: "shuanggu_jian",
    name: "雌雄双股剑",
    slot: "weapon",
    quality: "epic",
    icon: "⚔️",
    image: "assets/equipment/shuanggu_jian.png",
    exclusiveHero: "liubei",
    exclusiveHeroName: "主公刘备专属",
    sourceBoss: "liubei",
    sourceChapter: 5,
    sourceDesc: "第5章破纪灵掉落 / 珍宝集市",
    desc: "雌雄相随，仁德兼备，刘玄德起兵讨贼佩剑，双锋连击！",
    starStats: {
      1: { atk: 18, desc: "初阶：攻击力 +18" },
      2: { atk: 38, healOnKill: 20, desc: "仁德耀世：攻击力 +38，击杀敌兵回复 25 点生命" },
      3: { atk: 68, skill: "rende_jian", skillName: "仁义双锋", desc: "仁义双锋：攻击力 +68，在场时全军步兵攻击 +15%" },
      4: { atk: 110, desc: "帝道之威：攻击力 +110，击杀回血翻倍" },
      5: { atk: 165, skill: "zhaolie_tianxia", skillName: "昭烈帝皇斩", desc: "昭烈帝皇斩：攻击力 +165，每10秒爆发全屏光环强化全军攻击！" }
    }
  },
  {
    id: "baodiao_gong",
    name: "养由基宝雕弓",
    slot: "weapon",
    quality: "epic",
    icon: "🏹",
    image: "assets/equipment/baodiao_gong.png",
    exclusiveHero: "huangzhong",
    exclusiveHeroName: "老将黄忠专属",
    sourceBoss: "huangzhong",
    sourceChapter: 13,
    sourceDesc: "第13章定军山斩夏侯渊掉落 / 珍宝集市",
    desc: "春秋楚将养由基百步穿杨之宝弓，百发百中，开合如惊雷！",
    starStats: {
      1: { atk: 22, rangeBonus: 40, desc: "初阶：攻击力 +22，射程 +40" },
      2: { atk: 45, rangeBonus: 70, crit: 0.12, desc: "落雁神准：攻击力 +45，射程 +70，暴击 +12%" },
      3: { atk: 85, rangeBonus: 100, crit: 0.20, skill: "chuanyun_gong", skillName: "贯日流星", desc: "贯日流星：攻击力 +85，射程 +100，箭矢穿透首个目标继续杀伤后排" },
      4: { atk: 135, rangeBonus: 130, crit: 0.28, desc: "百步神威：攻击力 +135，暴击 +28%" },
      5: { atk: 195, rangeBonus: 160, crit: 0.40, skill: "dingjun_shenyong", skillName: "定军神弓", desc: "定军神弓：攻击力 +195，暴击造成 250% 毁灭终极伤害！" }
    }
  },
  {
    id: "zhanjin_qiang",
    name: "虎头湛金枪",
    slot: "weapon",
    quality: "legendary",
    icon: "🔱",
    image: "assets/equipment/zhanjin_qiang.png",
    exclusiveHero: "machao",
    exclusiveHeroName: "锦马超专属",
    sourceBoss: "machao",
    sourceChapter: 14,
    sourceDesc: "第14章潼关战曹操掉落 / 珍宝集市",
    desc: "镔铁精钢所铸，枪头为镏金虎头，乃西凉神威天将军锦马超神兵！",
    starStats: {
      1: { atk: 26, spdBonus: 0.15, desc: "初阶：攻击力 +26，攻速 +15%" },
      2: { atk: 52, spdBonus: 0.25, crit: 0.1, desc: "金锋烈影：攻击力 +52，移速 +0.3，暴击 +10%" },
      3: { atk: 90, spdBonus: 0.35, skill: "xiliang_kuangbiao", skillName: "西凉神威", desc: "西凉神威：攻击力 +90，骑兵冲阵践踏伤害提升 50%" },
      4: { atk: 145, spdBonus: 0.45, desc: "狮盔破阵：攻击力 +145，免疫减速" },
      5: { atk: 215, spdBonus: 0.60, skill: "shenwei_tianjiang", skillName: "神威天将", desc: "神威天将：攻击力 +215，冲锋时造成全线雷电穿刺震退！" }
    }
  },
  {
    id: "yitian_jian",
    name: "倚天青釭神剑",
    slot: "weapon",
    quality: "legendary",
    icon: "🗡️",
    image: "assets/equipment/yitian_jian.png",
    exclusiveHero: null,
    exclusiveHeroName: "曹操随身 / 全员通用",
    sourceBoss: "caocao",
    sourceChapter: 18,
    sourceDesc: "第18章绝战曹操掉落 / 珍宝集市",
    desc: "拔剑出鞘，剑气冲霄！青釭削铁如泥，天下谁人可挡！",
    starStats: {
      1: { atk: 24, pierce: 0.15, desc: "初阶：攻击力 +24，破甲 +15%" },
      2: { atk: 50, pierce: 0.30, desc: "削铁如泥：攻击力 +50，破甲 +30%" },
      3: { atk: 88, pierce: 0.50, skill: "qingtian_bidi", skillName: "青釭破坚", desc: "青釭破坚：攻击力 +88，对城墙与坚盾造成 150% 穿甲伤害" },
      4: { atk: 140, pierce: 0.70, desc: "天下霸道：攻击力 +140，破甲 +70%" },
      5: { atk: 210, pierce: 1.00, skill: "yitian_zhenshi", skillName: "倚天镇世", desc: "倚天镇世：攻击力 +210，完全无视护甲，斩杀敌兵掠夺双倍铜钱！" }
    }
  },
  {
    id: "jingtiejian",
    name: "精钢破甲矛",
    slot: "weapon",
    quality: "common",
    icon: "🗡️",
    image: "assets/equipment/jingtiejian.png",
    exclusiveHero: null,
    exclusiveHeroName: "全员通用",
    sourceBoss: null,
    sourceChapter: 1,
    sourceDesc: "珍宝阁地摊 400 铜钱购买",
    desc: "官府军械司标准化打造的破甲硬矛，结实耐用，升星平易近人。",
    starStats: {
      1: { atk: 12, desc: "初阶：攻击力 +12" },
      2: { atk: 26, desc: "打磨：攻击力 +26" },
      3: { atk: 48, skill: "chuantou", skillName: "穿刺破盾", desc: "穿刺破盾：攻击力 +48，对坚盾兵额外伤害 +25%" },
      4: { atk: 75, desc: "百炼：攻击力 +75" },
      5: { atk: 110, skill: "gangjin", skillName: "精钢寒铁", desc: "精钢寒铁：攻击力 +110，全军步兵攻击 +15" }
    }
  },

  // ================= 🛡️ 宝甲防具 (主加生命值、免伤、反伤特技) =================
  {
    id: "shoumian_kai",
    name: "兽面吞头连环铠",
    slot: "armor",
    quality: "legendary",
    icon: "🦺",
    image: "assets/equipment/shoumian_kai.png",
    exclusiveHero: "lvbu",
    exclusiveHeroName: "战神吕布专属",
    sourceBoss: "lvbu",
    sourceChapter: 6,
    sourceDesc: "击败第6章 白门楼吕布必掉 / 珍宝集市",
    desc: "西凉神工融玄铁精金所铸，前胸兽面吞口，刀枪不入！",
    starStats: {
      1: { hp: 150, desc: "初阶胚子：生命值 +150" },
      2: { hp: 320, defRed: 0.15, desc: "重铠生辉：生命值 +320，受到所有伤害减免 15%" },
      3: { hp: 550, defRed: 0.25, skill: "fang_yu_bomb", skillName: "金锁辟火", desc: "金锁辟火：生命值 +550，受到箭矢与敌方火雷伤害减免 40%" },
      4: { hp: 850, defRed: 0.35, skill: "kuangbao_xue", desc: "战神铁躯：生命值 +850，免伤 35%，生命越低护甲越高" },
      5: { hp: 1300, defRed: 0.45, skill: "buxiu_zhanhun", skillName: "不朽战魂", desc: "不朽战魂：生命值 +1300，免死一次并获得 3 秒无敌霸体！" }
    }
  },
  {
    id: "tiebi_kai",
    name: "玄武铁壁重铠",
    slot: "armor",
    quality: "epic",
    icon: "🛡️",
    image: "assets/equipment/tiebi_kai.png",
    exclusiveHero: "caoren",
    exclusiveHeroName: "曹仁 / 坚盾专属",
    sourceBoss: "caoren",
    sourceChapter: 4,
    sourceDesc: "击败第4章 曹仁必掉 / 珍宝集市",
    desc: "重达百斤的实心生铁板甲，曹子孝凭此铠挡下万千重箭！",
    starStats: {
      1: { hp: 120, desc: "初阶胚子：生命值 +120" },
      2: { hp: 260, reflect: 0.1, desc: "铁甲坚实：生命值 +260，反弹 10% 近战伤害" },
      3: { hp: 460, reflect: 0.25, skill: "tiebi_fanshang", skillName: "铁壁反刺", desc: "铁壁反刺：生命值 +460，受近战重击反弹 25% 真实伤害" },
      4: { hp: 720, reflect: 0.35, desc: "固若金汤：生命值 +720，反弹 35% 伤害" },
      5: { hp: 1100, reflect: 0.5, skill: "tongqiang_tiebi", skillName: "铜墙铁壁", desc: "铜墙铁壁：生命值 +1100，每受到 5 次攻击产生范围眩晕冲击波！" }
    }
  },
  {
    id: "mingguang_kai",
    name: "明光锁子甲",
    slot: "armor",
    quality: "common",
    icon: "🥋",
    image: "assets/equipment/mingguang_kai.png",
    exclusiveHero: null,
    exclusiveHeroName: "全员通用",
    sourceBoss: null,
    sourceChapter: 1,
    sourceDesc: "珍宝阁地摊 450 铜钱购买",
    desc: "大唐明光铠雏形，双镜高悬，军中精锐标准防具。",
    starStats: {
      1: { hp: 80, desc: "初阶：生命值 +80" },
      2: { hp: 180, desc: "加固：生命值 +180" },
      3: { hp: 320, skill: "guanghua", skillName: "镜面折射", desc: "镜面折射：生命值 +320，远程飞箭伤害减半" },
      4: { hp: 500, desc: "精制：生命值 +500" },
      5: { hp: 750, skill: "shiqi_huti", skillName: "明光浩荡", desc: "明光浩荡：生命值 +750，周围友军生命上限 +50" }
    }
  },

  // ================= 🐎 坐骑名驹 / 奇物 (主加移动速度、闪避、突袭特技) =================
  {
    id: "chitu_ma",
    name: "赤兔神驹",
    slot: "mount",
    quality: "legendary",
    icon: "🐎",
    image: "assets/equipment/chitu_ma.png",
    exclusiveHero: "lvbu",
    exclusiveHeroName: "战神吕布 / 关羽专属",
    sourceBoss: "lvbu",
    sourceChapter: 11,
    sourceDesc: "军备拍卖阁 60 金元宝 / 击败赤壁曹军掉落",
    desc: "奔腾千里荡尘埃，渡水登山紫雾开！人中吕布，马中赤兔！",
    starStats: {
      1: { speed: 0.4, desc: "初阶胚子：移动速度 +0.4" },
      2: { speed: 0.7, crit: 0.08, desc: "日行千里：移速 +0.7，冲锋暴击率 +8%" },
      3: { speed: 1.1, crit: 0.15, skill: "chitu_chongzhen", skillName: "飞将冲阵", desc: "飞将冲阵：移速 +1.1，出阵前 4 秒移速翻倍且完全免控！" },
      4: { speed: 1.5, crit: 0.22, desc: "赤焰追风：移速 +1.5，冲锋带火痕减速敌军" },
      5: { speed: 2.0, crit: 0.35, skill: "tianma_xingkong", skillName: "真·赤焰踏阵", desc: "真·赤焰踏阵：移速 +2.0，暴击 +35%，冲撞敌军直接造成 250 点烈火踏伤！" }
    }
  },
  {
    id: "dilu_ma",
    name: "马中探花·的卢",
    slot: "mount",
    quality: "epic",
    icon: "🦄",
    image: "assets/equipment/dilu_ma.png",
    exclusiveHero: "liubei",
    exclusiveHeroName: "主公刘备专属",
    sourceBoss: "liubei",
    sourceChapter: 8,
    sourceDesc: "军备集市 350 银两兑换",
    desc: "额生白点，一跃三丈跨过檀溪！刘玄德乘此宝马绝处逢生！",
    starStats: {
      1: { speed: 0.35, desc: "初阶胚子：移动速度 +0.35" },
      2: { speed: 0.6, dodge: 0.1, desc: "轻灵跃涧：移速 +0.6，闪避率 +10%" },
      3: { speed: 0.9, dodge: 0.2, skill: "tanxi_feiyue", skillName: "的卢飞溪", desc: "的卢飞溪：移速 +0.9，技能冷却时间缩短 20%，闪避 +20%" },
      4: { speed: 1.3, dodge: 0.3, desc: "神骏辟邪：移速 +1.3，闪避提升至 30%" },
      5: { speed: 1.8, dodge: 0.4, skill: "juedi_fengsheng", skillName: "绝处逢生", desc: "绝处逢生：受到致命伤时闪避并瞬移后撤 60 码恢复 20% 生命！" }
    }
  },
  {
    id: "huangbiao_ma",
    name: "西凉黄骠马",
    slot: "mount",
    quality: "common",
    icon: "🐴",
    image: "assets/equipment/huangbiao_ma.png",
    exclusiveHero: null,
    exclusiveHeroName: "全员通用",
    sourceBoss: null,
    sourceChapter: 1,
    sourceDesc: "珍宝阁地摊 380 铜钱购买",
    desc: "西凉边境骏马，脚力稳健耐旱，长途行军不可多得的好伙伴。",
    starStats: {
      1: { speed: 0.25, desc: "初阶：移动速度 +0.25" },
      2: { speed: 0.45, desc: "熟络：移动速度 +0.45" },
      3: { speed: 0.70, skill: "wenjian", skillName: "稳扎稳打", desc: "稳扎稳打：移速 +0.70，击退抗性 +50%" },
      4: { speed: 1.00, desc: "矫健：移动速度 +1.00" },
      5: { speed: 1.35, skill: "tuntian_zhu", skillName: "后勤奔驰", desc: "后勤奔驰：移速 +1.35，战局铜钱产速 +3/秒" }
    }
  }
];

// 升星消耗标准表 (从 N-1 星 升到 N 星 所需材料)
export const STAR_UPGRADE_COSTS = {
  2: { shards: 10, copper: 500, silver: 0, goldIngots: 0 },
  3: { shards: 25, copper: 1200, silver: 100, goldIngots: 0 },
  4: { shards: 50, copper: 2500, silver: 250, goldIngots: 0 },
  5: { shards: 100, copper: 5000, silver: 500, goldIngots: 30 }
};

// 获取装备在特定星级的综合属性
export function getEquipmentData(equipId, star = 1) {
  const base = EQUIPMENT_DATABASE.find(e => e.id === equipId);
  if (!base) return null;
  const s = Math.max(1, Math.min(5, star));
  const stats = base.starStats[s] || base.starStats[1];
  return {
    ...base,
    currentStar: s,
    stats
  };
}

// 计算某位武将当前穿戴的所有装备累加属性
export function calculateHeroEquipBonuses(heroLoadout, playerInventory) {
  const result = {
    atk: 0,
    hp: 0,
    speed: 0,
    crit: 0,
    pierce: 0,
    defRed: 0,
    reflect: 0,
    dodge: 0,
    skills: []
  };

  if (!heroLoadout) return result;

  ['weapon', 'armor', 'mount'].forEach(slot => {
    const equipId = heroLoadout[slot];
    if (equipId && playerInventory[equipId]) {
      const star = playerInventory[equipId].star || 1;
      const data = getEquipmentData(equipId, star);
      if (data && data.stats) {
        if (data.stats.atk) result.atk += data.stats.atk;
        if (data.stats.hp) result.hp += data.stats.hp;
        if (data.stats.speed) result.speed += data.stats.speed;
        if (data.stats.crit) result.crit += data.stats.crit;
        if (data.stats.pierce) result.pierce += data.stats.pierce;
        if (data.stats.defRed) result.defRed += data.stats.defRed;
        if (data.stats.reflect) result.reflect += data.stats.reflect;
        if (data.stats.dodge) result.dodge += data.stats.dodge;
        if (data.stats.skill) {
          result.skills.push({
            id: data.stats.skill,
            name: data.stats.skillName,
            desc: data.stats.desc,
            equipId: data.id,
            equipName: data.name
          });
        }
      }
    }
  });

  return result;
}

// 珍宝阁货架生成器 (构建 14 件分类完善的名将神装与升星碎片货柜)
export function generateShopStock() {
  return [
    // --- 🗡️ 绝世神兵专区 (元宝/铜钱购买 1星本体) ---
    {
      id: "shop_fangtian_huaji",
      name: "方天画戟 (1星)",
      category: "weapon",
      type: "item",
      equipId: "fangtian_huaji",
      currency: "goldIngots",
      price: 60,
      exclusiveHero: "lvbu",
      exclusiveHeroName: "战神吕布专属",
      icon: "🔱",
      image: "assets/equipment/fangtian_huaji.png",
      desc: "【战神神兵】天下无双吕奉先之刃，附带破军横扫与鬼神泣！"
    },
    {
      id: "shop_qinglong_dao",
      name: "青龙偃月刀 (1星)",
      category: "weapon",
      type: "item",
      equipId: "qinglong_dao",
      currency: "goldIngots",
      price: 50,
      exclusiveHero: "guanyu",
      exclusiveHeroName: "武圣关羽专属",
      icon: "🐉",
      image: "assets/equipment/qinglong_dao.png",
      desc: "【武圣神装】八十二斤青龙偃月，无视护甲且斩出直线龙芒！"
    },
    {
      id: "shop_longdan_qiang",
      name: "亮银龙胆枪 (1星)",
      category: "weapon",
      type: "item",
      equipId: "longdan_qiang",
      currency: "goldIngots",
      price: 45,
      exclusiveHero: "zhaoyun",
      exclusiveHeroName: "大将赵云专属",
      icon: "⚡",
      image: "assets/equipment/longdan_qiang.png",
      desc: "【常胜神枪】攻速疾风暴涨，七进七出突刺击退群敌！"
    },
    {
      id: "shop_zhangba_shemao",
      name: "丈八蛇矛 (1星)",
      category: "weapon",
      type: "item",
      equipId: "zhangba_shemao",
      currency: "goldIngots",
      price: 45,
      exclusiveHero: "zhangfei",
      exclusiveHeroName: "万人敌张飞专属",
      icon: "🐍",
      image: "assets/equipment/zhangba_shemao.png",
      desc: "【燕人重矛】普攻带概率眩晕，残血狂暴攻击力飙升！"
    },
    {
      id: "shop_baodiao_gong",
      name: "养由基宝雕弓 (1星)",
      category: "weapon",
      type: "item",
      equipId: "baodiao_gong",
      currency: "goldIngots",
      price: 40,
      exclusiveHero: "huangzhong",
      exclusiveHeroName: "老将黄忠专属",
      icon: "🏹",
      image: "assets/equipment/baodiao_gong.png",
      desc: "【百步神弓】射程 +40，暴击穿透敌军前排直轰后排！"
    },
    {
      id: "shop_jingtiejian",
      name: "精钢破甲矛 (1星)",
      category: "weapon",
      type: "item",
      equipId: "jingtiejian",
      currency: "copper",
      price: 400,
      exclusiveHero: null,
      exclusiveHeroName: "全员通用",
      icon: "🗡️",
      image: "assets/equipment/jingtiejian.png",
      desc: "【平民利器】大汉标准化重矛，结实耐用对盾兵特攻！"
    },

    // --- 🦺 名将宝甲专区 ---
    {
      id: "shop_shoumian_kai",
      name: "兽面吞头连环铠 (1星)",
      category: "armor",
      type: "item",
      equipId: "shoumian_kai",
      currency: "goldIngots",
      price: 50,
      exclusiveHero: "lvbu",
      exclusiveHeroName: "战神吕布专属",
      icon: "🦺",
      image: "assets/equipment/shoumian_kai.png",
      desc: "【战神重铠】巨额生命与免伤，免死一次并获无敌霸体！"
    },
    {
      id: "shop_tiebi_kai",
      name: "玄武铁壁重铠 (1星)",
      category: "armor",
      type: "item",
      equipId: "tiebi_kai",
      currency: "silver",
      price: 300,
      exclusiveHero: "caoren",
      exclusiveHeroName: "曹仁 / 坚盾专属",
      icon: "🛡️",
      image: "assets/equipment/tiebi_kai.png",
      desc: "【反伤神甲】反弹近战重击，受击蓄力触发眩晕冲击波！"
    },
    {
      id: "shop_mingguangkai",
      name: "明光锁子甲 (1星)",
      category: "armor",
      type: "item",
      equipId: "mingguang_kai",
      currency: "copper",
      price: 450,
      exclusiveHero: null,
      exclusiveHeroName: "全员通用",
      icon: "🥋",
      image: "assets/equipment/mingguang_kai.png",
      desc: "【军中精锐】双镜护胸，远程飞箭伤害大幅折减！"
    },

    // --- 🐎 名驹坐骑专区 ---
    {
      id: "shop_chitu_token",
      name: "赤兔神驹 (1星)",
      category: "mount",
      type: "item",
      equipId: "chitu_ma",
      currency: "goldIngots",
      price: 60,
      exclusiveHero: "lvbu",
      exclusiveHeroName: "战神吕布 / 关羽专属",
      icon: "🐎",
      image: "assets/equipment/chitu_ma.png",
      desc: "【神驹之首】人中吕布马中赤兔，开局极速冲锋带烈火！"
    },
    {
      id: "shop_dilu_ma",
      name: "马中探花·的卢 (1星)",
      category: "mount",
      type: "item",
      equipId: "dilu_ma",
      currency: "silver",
      price: 350,
      exclusiveHero: "liubei",
      exclusiveHeroName: "主公刘备专属",
      icon: "🦄",
      image: "assets/equipment/dilu_ma.png",
      desc: "【绝处逢生】大幅缩短技能冷却，濒死闪避后撤回血！"
    },
    {
      id: "shop_huangbiaoma",
      name: "西凉黄骠马 (1星)",
      category: "mount",
      type: "item",
      equipId: "huangbiao_ma",
      currency: "copper",
      price: 380,
      exclusiveHero: null,
      exclusiveHeroName: "全员通用",
      icon: "🐴",
      image: "assets/equipment/huangbiao_ma.png",
      desc: "【稳健战马】脚力耐旱，增加行军突进步伐与击退抗性！"
    },

    // --- 🧩 升星碎片特惠专区 (可用银两/铜钱购买升星) ---
    {
      id: "shop_shard_fangtian",
      name: "方天画戟碎片 x5",
      category: "shard",
      type: "shard",
      equipId: "fangtian_huaji",
      count: 5,
      currency: "silver",
      price: 150,
      exclusiveHero: "lvbu",
      exclusiveHeroName: "战神吕布专属",
      icon: "🧩",
      image: "assets/equipment/shard_weapon.png",
      desc: "【画戟升星材料】用于【方天画戟】升星打造，20片可合成本体！"
    },
    {
      id: "shop_shard_qinglong",
      name: "青龙偃月刀碎片 x5",
      category: "shard",
      type: "shard",
      equipId: "qinglong_dao",
      count: 5,
      currency: "silver",
      price: 130,
      exclusiveHero: "guanyu",
      exclusiveHeroName: "武圣关羽专属",
      icon: "🧩",
      image: "assets/equipment/shard_weapon.png",
      desc: "【青龙升星材料】用于【青龙偃月刀】升星打造，20片可合成本体！"
    },
    {
      id: "shop_shard_longdan",
      name: "亮银龙胆枪碎片 x5",
      category: "shard",
      type: "shard",
      equipId: "longdan_qiang",
      count: 5,
      currency: "silver",
      price: 120,
      exclusiveHero: "zhaoyun",
      exclusiveHeroName: "大将赵云专属",
      icon: "🧩",
      image: "assets/equipment/shard_weapon.png",
      desc: "【龙胆升星材料】用于【亮银龙胆枪】升星打造，20片可合成本体！"
    },
    {
      id: "shop_shard_shoumian",
      name: "兽面连环铠碎片 x5",
      category: "shard",
      type: "shard",
      equipId: "shoumian_kai",
      count: 5,
      currency: "silver",
      price: 120,
      exclusiveHero: "lvbu",
      exclusiveHeroName: "战神吕布专属",
      icon: "🧩",
      image: "assets/equipment/shard_armor.png",
      desc: "【兽面升星材料】用于【兽面吞头连环铠】升星锻造，20片可合成本体！"
    },
    {
      id: "shop_shard_mingguang",
      name: "明光锁子甲碎片 x10",
      category: "shard",
      type: "shard",
      equipId: "mingguang_kai",
      count: 10,
      currency: "copper",
      price: 350,
      exclusiveHero: null,
      exclusiveHeroName: "全员通用",
      icon: "🧩",
      image: "assets/equipment/shard_armor.png",
      desc: "【普及防具材料】消耗铜钱即可快速批量获得明光铠升星碎片！"
    }
  ];
}
