// 《智谋决：烽火营地》全量数据与规则配置库
export const GAME_CONFIG = {
  PREPARATION_TIME: 300, // 5分钟（300秒）充足备战期
  
  // 通用三币换算比率：1金 = 10银 = 100铜
  CURRENCY_RATE: {
    GOLD_TO_SILVER: 10,
    SILVER_TO_COPPER: 10,
    GOLD_TO_COPPER: 100
  },

  // 开局初始资金（通用三币）
  START_MONEY: {
    gold: 8,     // 8金 = 800铜
    silver: 30,  // 30银 = 300铜
    copper: 150  // 150铜 (总财富折合 1250铜)
  },

  // 开局双方完全均等的初始兵力
  START_TROOPS: {
    infantry: 100, // 坚盾步兵
    archer: 35,    // 连弩弓兵
    cavalry: 20    // 重甲铁骑
  }
};

// 战役四大关卡
export const CAMPAIGN_STAGES = [
  {
    id: 1,
    name: "第一回：试锋芒 · 哨卡流寇",
    desc: "敌将为盘踞山寨的草莽流寇。熟悉5分钟备战，测试营防与基础兵器。",
    enemyName: "【黑风寨流寇】管亥部",
    generalId: "dianwei",
    strategistId: "guojia",
    personality: "reckless_warrior",
    enemyTroops: { infantry: 100, archer: 35, cavalry: 20 },
    rewardMoney: { copper: 100, silver: 20, gold: 3 },
    rewardExp: 120
  },
  {
    id: 2,
    name: "第二回：虎牢关 · 飞将吕布",
    desc: "西凉铁骑汹涌来袭！吕布天下无双但暴躁自傲，善用【激将之计】、【空城计】或【等级炸药包】智取！",
    enemyName: "【西凉虎狼阵营】飞将吕布军",
    generalId: "lvbu",
    strategistId: "guojia",
    personality: "reckless_warrior",
    enemyTroops: { infantry: 100, archer: 35, cavalry: 20 },
    rewardMoney: { copper: 180, silver: 35, gold: 6 },
    rewardExp: 220
  },
  {
    id: 3,
    name: "第三回：官渡峙 · 铁壁深垒",
    desc: "司马懿深沟高垒，箭塔林立！善用【火烧连环】、【调虎离山】或高等级炸药包定点爆破！",
    enemyName: "【魏武深垒阵营】司马懿军",
    generalId: "dianwei",
    strategistId: "simayi",
    personality: "fortress_turtle",
    enemyTroops: { infantry: 100, archer: 35, cavalry: 20 },
    rewardMoney: { copper: 240, silver: 50, gold: 10 },
    rewardExp: 320
  },
  {
    id: 4,
    name: "第四回：烽火决 · 赤壁连环",
    desc: "水陆大军压境，神机妙算与全军至宝神兵的终极大决战！",
    enemyName: "【神机天算联军】卧龙周瑜大军",
    generalId: "guanyu",
    strategistId: "zhuge",
    personality: "cunning_master",
    enemyTroops: { infantry: 100, archer: 35, cavalry: 20 },
    rewardMoney: { copper: 400, silver: 80, gold: 15 },
    rewardExp: 500
  }
];

// 16 大古典三十六计锦囊库
export const STRATAGEMS = [
  {
    id: "kurou",
    name: "苦肉计",
    icon: "🩸",
    cost: { copper: 35, silver: 10, gold: 0 },
    type: "counter_strike",
    desc: "故意示弱受创，诱使敌军彻底卸下防备。我方在绝境中爆发 200% 暴击致命反打！",
    triggersAgainst: "all_out_attack"
  },
  {
    id: "kongcheng",
    name: "空城之计",
    icon: "🪕",
    cost: { copper: 25, silver: 5, gold: 1 },
    type: "bluff",
    desc: "城头抚琴焚香。我方兵力少于敌方 60% 时必定触发，惊退敌军主力，实现以弱胜强！",
    triggersAgainst: "outnumbered"
  },
  {
    id: "yumu",
    name: "鱼目混珠",
    icon: "🎭",
    cost: { copper: 30, silver: 8, gold: 0 },
    type: "defense",
    desc: "以稻草假人和伪装部队冒充主力，全额替我方主力承受敌方第一轮全部远程火力与冲锋！",
    triggersAgainst: "first_strike"
  },
  {
    id: "huilu",
    name: "贿赂之计",
    icon: "💰",
    cost: { copper: 50, silver: 20, gold: 2 },
    type: "bribe",
    desc: "战前重金买通敌方先锋，决战时敌方 25% 士兵当场倒戈相向或临阵脱逃！",
    triggersAgainst: "general_troops"
  },
  {
    id: "jijiang",
    name: "激将之计",
    icon: "💢",
    cost: { copper: 30, silver: 10, gold: 0 },
    type: "taunt",
    desc: "专克【吕布】等自负猛将！言语激怒令其丧失理智单骑突进，陷入泥潭包围，武力归零！",
    triggersAgainst: "lvbu"
  },
  {
    id: "yihua",
    name: "移花接木",
    icon: "🪵",
    cost: { copper: 40, silver: 12, gold: 1 },
    type: "transfer",
    desc: "精妙战术调动！敌方对我方大本营的致命毁灭伤害，全部被转移到外围废弃木栅上！",
    triggersAgainst: "camp_damage"
  },
  {
    id: "diaohu",
    name: "调虎离山",
    icon: "🐅",
    cost: { copper: 35, silver: 15, gold: 1 },
    type: "lure",
    desc: "设疑将敌方最强主将引离中军帅帐，我方大军直接突袭敌方空虚的大本营！",
    triggersAgainst: "mighty_general"
  },
  {
    id: "caochuan",
    name: "草船借箭",
    icon: "🚣",
    cost: { copper: 35, silver: 10, gold: 1 },
    type: "absorb",
    desc: "克制多弓手与箭塔！完全吸收敌方全部远程箭雨，转化为我军箭矢并百倍奉还！",
    triggersAgainst: "archer_heavy"
  },
  {
    id: "huolian",
    name: "火烧连环",
    icon: "🔥",
    cost: { copper: 45, silver: 20, gold: 1 },
    type: "burn",
    desc: "引燃敌方密集连营或木寨，引发全屏连环大火，直接焚毁敌方全部营防工事！",
    triggersAgainst: "wood_camp"
  },
  {
    id: "dongfeng",
    name: "孔明借东风",
    icon: "🌬️",
    cost: { copper: 30, silver: 15, gold: 2 },
    type: "weather",
    desc: "呼风唤雨改变天时！令所有【火攻】与远程射击威力翻倍，风助火势！",
    triggersAgainst: "synergy_fire"
  },
  {
    id: "tianlong",
    name: "偷龙换凤",
    icon: "🐲",
    cost: { copper: 60, silver: 25, gold: 2 },
    type: "swap",
    desc: "神鬼莫测！决战前暗中偷换敌方 1 件高级神兵武器，将其属性和特效化为己用！",
    triggersAgainst: "enemy_weapon"
  },
  {
    id: "jiahuo",
    name: "嫁祸于人",
    icon: "🗡️",
    cost: { copper: 45, silver: 15, gold: 1 },
    type: "intrigue",
    desc: "离间反噬！挑起敌方主帅与谋士猜忌内讧，令敌方布设的计策全部失效甚至反弹！",
    triggersAgainst: "enemy_plan"
  },
  {
    id: "yibing",
    name: "疑兵之计",
    icon: "🚩",
    cost: { copper: 20, silver: 5, gold: 0 },
    type: "bluff",
    desc: "漫山遍野多插旌旗，使敌军误判我方有十万大军，不敢全军压上，士气受挫！",
    triggersAgainst: "rush"
  },
  {
    id: "tuoqiao",
    name: "金蝉脱壳",
    icon: "🦋",
    cost: { copper: 30, silver: 10, gold: 1 },
    type: "escape",
    desc: "战况不利时留下空营退敌，我方残存部队与金银全额撤退，免受全军覆没惩罚！",
    triggersAgainst: "defeat_protect"
  },
  {
    id: "luojing",
    name: "落井下石",
    icon: "🪨",
    cost: { copper: 30, silver: 15, gold: 0 },
    type: "execute",
    desc: "当敌方中计陷入混乱或被【炸药包】炸伤时，立刻追加致命打击，伤害暴增 100%！",
    triggersAgainst: "chaotic_enemy"
  },
  {
    id: "paozhuan",
    name: "抛砖引玉",
    icon: "🧱",
    cost: { copper: 25, silver: 5, gold: 0 },
    type: "trap",
    desc: "以极少数老弱兵力为诱饵，将敌方精锐主力引入包围死地予以聚歼！",
    triggersAgainst: "careful_enemy"
  }
];

// 双轨装备系统：1. 士兵军备（批量配装）
export const TROOP_WEAPONS = [
  {
    id: "wood_spear",
    name: "精木长扎枪",
    targetTroop: "infantry",
    icon: "🦯",
    desc: "步兵基础兵刃，提升基础刺杀与格挡能力。",
    powerBonus: 15,
    cost: { copper: 20, silver: 0, gold: 0 },
    quest: { desc: "初始默认已掌握", targetKills: 0 }
  },
  {
    id: "steel_saber",
    name: "百炼精钢刀",
    targetTroop: "infantry",
    icon: "🗡️",
    desc: "千锤百炼钢刀，步兵近战肉搏杀伤力大幅提升 35%！",
    powerBonus: 40,
    cost: { copper: 45, silver: 12, gold: 0 },
    quest: { desc: "累计击败 50 名敌军解锁", targetKills: 50 }
  },
  {
    id: "zhuge_crossbow",
    name: "诸葛连弩机",
    targetTroop: "archer",
    icon: "🏹",
    desc: "一匣十矢连发齐射！弓兵远程压制杀伤提升 50%！",
    powerBonus: 60,
    cost: { copper: 60, silver: 25, gold: 1 },
    quest: { desc: "累计击败 120 名敌军解锁", targetKills: 120 }
  },
  {
    id: "cavalry_halberd",
    name: "重甲斩马大槊",
    targetTroop: "cavalry",
    icon: "🔱",
    desc: "重骑兵冲锋巨刃，具有强大的破阵与破防能力！",
    powerBonus: 85,
    cost: { copper: 80, silver: 35, gold: 2 },
    quest: { desc: "累计击败 220 名敌军解锁", targetKills: 220 }
  }
];

// 双轨装备系统：2. 武将专属神兵（单体强力至宝）
export const GENERAL_RELICS = [
  {
    id: "fangtian",
    name: "方天画戟",
    icon: "🔱",
    desc: "无双神兵！武将武力值额外 +25，且开局冲锋附加范围横扫震荡！",
    mightAdd: 25,
    intellectAdd: 0,
    cost: { copper: 100, silver: 40, gold: 3 },
    quest: { desc: "通过第 2 关（战胜飞将吕布）解锁", targetStage: 2 }
  },
  {
    id: "bingfa_book",
    name: "《孙子兵法·竹简》",
    icon: "📜",
    desc: "兵家圣典！大幅提升武将智谋抗性 +45 点，使莽撞武将（如吕布）极难中伏中计！",
    mightAdd: 5,
    intellectAdd: 45,
    cost: { copper: 80, silver: 30, gold: 2 },
    quest: { desc: "累计使用计策获胜 2 次解锁", targetTactics: 2 }
  },
  {
    id: "chitu_horse",
    name: "神骏赤兔马",
    icon: "🐎",
    desc: "日行千里！即便陷入包围也能极速突围，全军战力 +50！",
    mightAdd: 18,
    intellectAdd: 10,
    cost: { copper: 120, silver: 50, gold: 4 },
    quest: { desc: "累计击败 300 名敌军解锁", targetKills: 300 }
  }
];

// 等级制炸药包配置 (1~5级投掷距离与威力)
export const DYNAMITE_CONFIG = {
  buyCost: { copper: 35, silver: 10, gold: 0 }, // 额外自购炸药包单价
  levelData: [
    {
      level: 1,
      name: "初级手抛炸药包",
      freeGiftCount: 1,
      rangeText: "近距投掷（敌方前排近战步兵）",
      targetTier: "frontline",
      baseDamage: 30,
      desc: "只能扔到敌军前沿，造成前排小范围爆炸杀伤（折损约25~35名敌方步兵）。"
    },
    {
      level: 2,
      name: "中距集束炸药包",
      freeGiftCount: 1,
      rangeText: "中距投掷（敌方外围木栅营防）",
      targetTier: "barricade",
      baseDamage: 55,
      desc: "可投至敌方阵地前沿，直接将敌方【木栅防线】彻底炸毁！"
    },
    {
      level: 3,
      name: "穿云强力炸药包",
      freeGiftCount: 2,
      rangeText: "远距飞掷（敌方了望箭塔）",
      targetTier: "watchtower",
      baseDamage: 85,
      desc: "强力投掷越过步兵，定点爆破摧毁敌方【了望箭塔】，消灭塔内弓兵！"
    },
    {
      level: 4,
      name: "飞天重型炸药包",
      freeGiftCount: 2,
      rangeText: "超远重抛（敌方后方辎重粮仓）",
      targetTier: "granary",
      baseDamage: 130,
      desc: "直击敌方后方辎重粮仓，引爆大火令敌军士气暴跌并陷入大溃退！"
    },
    {
      level: 5,
      name: "震天神火大药包",
      freeGiftCount: 3,
      rangeText: "全图神掷（敌方中军主帅大营）",
      targetTier: "headquarters",
      baseDamage: 220,
      desc: "绝技神掷！直接命中敌方中军帅帐，主将落马，造成全军毁灭性AOE重创！"
    }
  ]
};

// 战地医疗营与药材系统
export const MEDICAL_CONFIG = {
  buildingCost: { copper: 35, silver: 15, gold: 0 },
  supplies: [
    {
      id: "jinchuang_san",
      name: "止血金创散 (x5份)",
      icon: "🌿",
      healCount: 20,
      cost: { copper: 25, silver: 5, gold: 0 },
      desc: "战时与战后持续救治，救回 20 名重伤士兵重返军营。"
    },
    {
      id: "huatuo_gao",
      name: "华佗九转还魂膏 (x2份)",
      icon: "🧪",
      healCount: 50,
      cost: { copper: 50, silver: 20, gold: 1 },
      desc: "神医奇方！战时与战后极大保存主力精锐，救回 50 名重伤将士！"
    }
  ]
};

// 武将与谋士
export const GENERALS = [
  {
    id: "lvbu",
    name: "吕布",
    title: "无双虓虎",
    avatar: "🐯",
    might: 100,
    intellect: 25,
    trait: "【暴烈冲锋】：开局猛冲威力+60%；但极易中【激将之计】与【十面埋伏】！"
  },
  {
    id: "guanyu",
    name: "关羽",
    title: "威震华夏",
    avatar: "🐉",
    might: 94,
    intellect: 68,
    trait: "【青龙破阵】：阵地战极具压迫感；但生性孤傲，怕【奇袭粮道】与【调虎离山】。"
  },
  {
    id: "zhaoyun",
    name: "赵云",
    title: "常胜将军",
    avatar: "⚡",
    might: 92,
    intellect: 85,
    trait: "【一身是胆】：极难中计，受到负面计策削弱减半，残局战力翻倍！"
  },
  {
    id: "dianwei",
    name: "典韦",
    title: "古之恶来",
    avatar: "🛡️",
    might: 96,
    intellect: 35,
    trait: "【死战撼山】：步兵近战伤亡大幅降低；但智抗弱，怕【火烧连环】与【移花接木】。"
  }
];

export const STRATEGISTS = [
  {
    id: "zhuge",
    name: "诸葛亮",
    title: "卧龙先生",
    avatar: "🪶",
    wisdom: 98,
    skillName: "神机妙算",
    desc: "使用任何谋略计策成功率+30%，且决战前必定看破敌方1个暗藏锦囊！"
  },
  {
    id: "simayi",
    name: "司马懿",
    title: "冢虎谋主",
    avatar: "🐺",
    wisdom: 96,
    skillName: "坚壁深谋",
    desc: "营防坚固度+50%，所有伏兵与防守反击计策威力倍增！"
  },
  {
    id: "guojia",
    name: "郭嘉",
    title: "鬼才祭酒",
    avatar: "🔮",
    wisdom: 95,
    skillName: "十胜十败",
    desc: "敌方计策有40%概率反噬自伤；奇袭类计策伤害提升60%！"
  },
  {
    id: "zhouyu",
    name: "周瑜",
    title: "美周郎",
    avatar: "🔥",
    wisdom: 94,
    skillName: "火计风策",
    desc: "【火烧连环】与【孔明借东风】威力翻倍，连环爆炸摧毁敌方全营！"
  }
];

// 营地基建项目
export const BUILDINGS = [
  {
    id: "barricade",
    name: "加固营地木栅",
    cost: { copper: 25, silver: 0, gold: 0 },
    icon: "🪵",
    desc: "扎起尖锐木栅拒马，抵挡第一波敌军步骑冲锋。"
  },
  {
    id: "watchtower",
    name: "修筑了望箭塔",
    cost: { copper: 35, silver: 10, gold: 0 },
    icon: "🗼",
    desc: "居高临下倾泻箭雨，决战时提供远程压制火力！"
  },
  {
    id: "granary",
    name: "深挖地下粮仓",
    cost: { copper: 40, silver: 15, gold: 0 },
    icon: "🛖",
    desc: "粮草丰足，大幅增强全军士气，防范断粮混乱！"
  },
  {
    id: "hospital",
    name: "设立战地医疗营",
    cost: { copper: 35, silver: 15, gold: 0 },
    icon: "🏥",
    desc: "随军医官坐镇！决战中持续救护 + 战后最终抢救重伤官兵！"
  },
  {
    id: "iron_gate",
    name: "铸造铁壁要塞",
    cost: { copper: 60, silver: 25, gold: 2 },
    icon: "🚪",
    desc: "重金打造钢铁要塞瓮城，提供坚不可摧的终极防御！"
  }
];

// 兵种招募选项
export const RECRUITS = [
  {
    type: "infantry",
    name: "征募坚盾步兵 (+25兵)",
    count: 25,
    cost: { copper: 25, silver: 0, gold: 0 },
    icon: "🛡️",
    desc: "阵线磐石，稳固防御，克制骑兵冲击"
  },
  {
    type: "archer",
    name: "训练连弩弓兵 (+15兵)",
    count: 15,
    cost: { copper: 35, silver: 8, gold: 0 },
    icon: "🏹",
    desc: "远程压制，配合箭塔与草船借箭威力极高"
  },
  {
    type: "cavalry",
    name: "采买重甲铁骑 (+10兵)",
    count: 10,
    cost: { copper: 50, silver: 15, gold: 1 },
    icon: "🐎",
    desc: "雷霆突击，高机动冲击敌方薄弱阵线"
  }
];
