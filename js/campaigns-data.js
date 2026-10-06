// 《智谋决》四大势力专属历史战役传记库 (曹魏传 · 东吴传 · 群雄传)

export const FACTION_INFOS = {
  shu: {
    id: "shu",
    name: "蜀汉传",
    subtitle: "兴复汉室 · 仁德昭烈",
    badge: "🟢 蜀汉传",
    themeColor: "#15803d",
    bgGradient: "linear-gradient(135deg, #14532d, #166534)",
    leader: "昭烈帝刘备",
    quote: "“惟贤惟德，能服于人！兴复汉室，还于旧都！”",
    buffDesc: "出征蜀汉武将享受【蜀道仁风】士气加成：攻击速度 +10%，军饷减免 15 铜钱！",
    totalChapters: 18
  },
  wei: {
    id: "wei",
    name: "曹魏传",
    subtitle: "魏武霸业 · 扫清六合",
    badge: "🔴 曹魏传",
    themeColor: "#b91c1c",
    bgGradient: "linear-gradient(135deg, #7f1d1d, #991b1b)",
    leader: "魏武帝曹操",
    quote: "“设使国家无有孤，不知当几人称帝，几人称王！”",
    buffDesc: "出征曹魏武将享受【魏武雄风】士气加成：攻击速度 +10%，军饷减免 15 铜钱！",
    totalChapters: 9
  },
  wu: {
    id: "wu",
    name: "东吴传",
    subtitle: "江东风云 · 虎踞龙盘",
    badge: "🔵 东吴传",
    themeColor: "#1d4ed8",
    bgGradient: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
    leader: "大都督周瑜 · 吴大帝孙权",
    quote: "“孤承父兄之烈，据长江之险，誓保江东六郡八十一州！”",
    buffDesc: "出征东吴武将享受【江表虎臣】士气加成：攻击速度 +10%，军饷减免 15 铜钱！",
    totalChapters: 9
  },
  qun: {
    id: "qun",
    name: "群雄传",
    subtitle: "诸侯逐鹿 · 乱世豪强",
    badge: "🟡 群雄传",
    themeColor: "#b45309",
    bgGradient: "linear-gradient(135deg, #78350f, #b45309)",
    leader: "天下群雄豪强",
    quote: "“王侯将相宁有种乎！乱世出英雄，何不自立为王，逐鹿天下！”",
    buffDesc: "出征群雄武将享受【乱世枭雄】士气加成：攻击速度 +10%，军饷减免 15 铜钱！",
    totalChapters: 8
  }
};

// ==========================================
// 🔴 曹魏传 · 魏武霸业九大专属战役 (公元189~234年)
// ==========================================
export const WEI_CHAPTERS = [
  {
    id: 1,
    faction: "wei",
    era: 1,
    name: "陈留起兵",
    title: "【第一章】陈留起兵 · 散家财讨伐国贼",
    subtitle: "公元189年 · 刺董未遂，曹操于陈留散家财招募义兵，誓诛国贼！",
    objective: { type: "destroy_castle", label: "攻城破寨", desc: "荡平西凉前锋大营！" },
    recruitHeroId: "xiahoudun",
    recruitHeroIds: ["xiahoudun", "caoren"],
    enemyName: "西凉前锋华雄",
    enemyTitle: "西凉突骑大营",
    enemyAvatar: "assets/generals/dianwei_128.png",
    castleHp: 1400,
    enemyGoldRate: 12,
    rewardSilver: 200,
    rewardGoldIngot: 25,
    allowedGeneralCards: ["caocao", "xiahoudun", "caoren", "yiyidailao"],
    briefing: {
      enemyType: "西凉精骑、突袭悍卒",
      strategyTip: "西凉骑兵冲锋极猛！利用坚盾步兵前排顶住，曹操率曹仁阵前结阵，适时使用【以逸待劳】稳固防线！",
      recommendedUnits: ["infantry", "archer", "caocao"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "奋武将军", text: "董贼欺天罔地，祸乱朝纲！孤散尽家资于陈留起兵，誓扫奸邪，以正乾坤！", side: "left" },
      { speaker: "夏侯惇", avatar: "assets/generals/xiahoudun_128.png", role: "曹魏元勋", text: "孟德！夏侯氏与曹氏子弟誓死相随，定教董贼见识中原雄兵！", side: "left" },
      { speaker: "西凉前锋", avatar: "🦹", role: "西凉战将", text: "曹阿瞒！凭你陈留这几千乌合之众，也敢挡我西凉铁骑？！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "奋武将军", text: "初战告捷！斩敌先锋，传檄天下诸侯共讨董卓！全军进发！", side: "left" },
      { speaker: "夏侯惇", avatar: "assets/generals/xiahoudun_128.png", role: "曹魏元勋", text: "缴获西凉战马军饷，速速犒赏将士！", side: "left" }
    ]
  },
  {
    id: 2,
    faction: "wei",
    era: 1,
    name: "兖州争锋",
    title: "【第二章】兖州争锋 · 收编百万青州兵",
    subtitle: "公元192年 · 百万黄巾犯兖州，曹操恩威并施破贼收精锐，定霸业根基！",
    objective: { type: "assassinate_boss", targetBossType: "zhangjiao", targetBossName: "大贤良师张角", label: "斩将夺旗", desc: "阵前击破黄巾大首领！" },
    recruitHeroId: "dianwei",
    recruitHeroIds: ["dianwei", "xuchu"],
    enemyName: "黄巾大首领张角",
    enemyTitle: "青州黄巾大营",
    enemyAvatar: "assets/generals/zhangjiao_128.png",
    castleHp: 1800,
    enemyGoldRate: 14,
    rewardSilver: 260,
    rewardGoldIngot: 30,
    allowedGeneralCards: ["caocao", "xiahoudun", "dianwei", "paizhuan"],
    briefing: {
      enemyType: "黄巾狂信徒、符咒术士、冲锋暴民",
      strategyTip: "贼兵势大但阵型散乱！派出恶来典韦冲阵斩将，直取首脑，降服余众！",
      recommendedUnits: ["infantry", "cavalry", "dianwei"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "兖州牧", text: "青州黄巾百万之众犯境！降之可得精兵，纵之则生灵涂炭！众将随孤破贼！", side: "left" },
      { speaker: "典韦", avatar: "assets/generals/dianwei_128.png", role: "古之恶来", text: "主公放心！俺手提双戟，遇神杀神，定斩贼酋首级来献！", side: "left" },
      { speaker: "张角", avatar: "assets/generals/zhangjiao_128.png", role: "大贤良师", text: "雷公助我！苍天已死，黄天当立！曹贼休得逆天！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "兖州牧", text: "黄巾大败！收得降卒三十余万，男女百余万，精选勇锐号称【青州兵】，霸业始成矣！", side: "left" },
      { speaker: "荀彧", avatar: "assets/generals/guojia_128.png", role: "首席王佐", text: "恭喜主公！得此强军，坐镇中原，进可攻退可守！", side: "left" }
    ]
  },
  {
    id: 3,
    faction: "wei",
    era: 1,
    name: "濮阳血战",
    title: "【第三章】濮阳血战 · 典韦突围击吕布",
    subtitle: "公元194年 · 吕布袭取兖州，曹操与吕布大战濮阳，恶来舍命救主！",
    objective: { type: "assassinate_boss", targetBossType: "lvbu", targetBossName: "飞将吕布", label: "斩将夺旗", desc: "阵前击退天下第一飞将吕布！" },
    recruitHeroId: "lvbu",
    recruitHeroIds: ["lvbu"],
    enemyName: "天下第一飞将吕布",
    enemyTitle: "并州飞骑精锐",
    enemyAvatar: "assets/generals/lvbu_128.png",
    castleHp: 2200,
    enemyGoldRate: 15,
    rewardSilver: 300,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["caocao", "dianwei", "xuchu", "meirenji"],
    briefing: {
      enemyType: "并州并铁骑、陷阵精锐、战神吕布",
      strategyTip: "吕布近战天下无双！使用【典韦】与【许褚】联袂抗衡，辅以倾城妙策弱化其狂暴冲锋！",
      recommendedUnits: ["dianwei", "xuchu", "catapult"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "兖州牧", text: "吕奉先趁孤征陶谦袭我后方！今日濮阳之战，誓夺回根本重地！", side: "left" },
      { speaker: "典韦", avatar: "assets/generals/dianwei_128.png", role: "古之恶来", text: "主公！贼兵来犯，韦手持十数枝短戟，待敌五步呼我，立教彼毙命！", side: "left" },
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "飞将军", text: "曹阿瞒！休要走脱！看某方天画戟取你首级！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "兖州牧", text: "古之恶来，名不虚传！吕布败走下邳，兖州彻底平定！", side: "left" },
      { speaker: "典韦", avatar: "assets/generals/dianwei_128.png", role: "古之恶来", text: "只要主公安然无恙，典韦万死不辞！", side: "left" }
    ]
  },
  {
    id: 4,
    faction: "wei",
    era: 1,
    name: "宛城绝地",
    title: "【第四章】宛城突围 · 恶来断后铸忠魂",
    subtitle: "公元197年 · 张绣贾诩夜袭大营，典韦拼死断后，曹操绝地突围！",
    objective: { type: "destroy_castle", label: "攻城拔寨", desc: "击溃宛城叛军大营，突围而出！" },
    recruitHeroId: "guojia",
    recruitHeroIds: ["guojia"],
    enemyName: "宛城枪王张绣",
    enemyTitle: "宛城伏兵连营",
    enemyAvatar: "assets/generals/zhangren_128.png",
    castleHp: 2400,
    enemyGoldRate: 15,
    rewardSilver: 320,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["caocao", "dianwei", "xuchu", "guojia"],
    briefing: {
      enemyType: "宛城叛军、长枪死士、夜袭伏兵",
      strategyTip: "夜袭营寨四面皆敌！迅速组织防御，让许褚与典韦掩护主公，以重装步兵稳扎稳打！",
      recommendedUnits: ["infantry", "archer", "xuchu"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "大将军", text: "悔不听奉孝之言！张绣叛乱，大营起火！孤之绝影马中箭，如何突围？！", side: "left" },
      { speaker: "典韦", avatar: "assets/generals/dianwei_128.png", role: "古之恶来", text: "主公快走！韦虽无双戟，徒手夺贼兵刃亦能力战千军！有韦在，贼兵休得前半步！", side: "left" },
      { speaker: "张绣", avatar: "assets/generals/zhangren_128.png", role: "宛城诸侯", text: "休放走了曹操！万箭齐发，拿下曹贼！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "大将军", text: "吾折长子、爱侄，俱无深痛；独泣典韦也！恶来真乃天下无双之忠烈！", side: "left" },
      { speaker: "郭嘉", avatar: "assets/generals/guojia_128.png", role: "鬼才谋士", text: "主公节哀！整军备战，他日张绣贾诩必来纳降！", side: "left" }
    ]
  },
  {
    id: 5,
    faction: "wei",
    era: 1,
    name: "白马延津",
    title: "【第五章】白马延津 · 声东击西斩文丑",
    subtitle: "公元200年 · 官渡前哨！郭嘉设奇谋诱敌深入，阵斩河北名将颜良文丑！",
    objective: { type: "assassinate_boss", targetBossType: "wenchou", targetBossName: "名将文丑", label: "斩将夺旗", desc: "阵前击斩河北大将文丑！" },
    recruitHeroId: "wenchou",
    recruitHeroIds: ["wenchou", "yanliang"],
    enemyName: "河北名将文丑",
    enemyTitle: "河北铁骑前锋",
    enemyAvatar: "assets/generals/wenchou_128.png",
    castleHp: 2600,
    enemyGoldRate: 16,
    rewardSilver: 350,
    rewardGoldIngot: 40,
    allowedGeneralCards: ["caocao", "guojia", "xuchu", "guanyu"],
    briefing: {
      enemyType: "河北重装铁骑、神射强弩营、名将文丑",
      strategyTip: "河北双雄勇猛非凡！使用【以逸待劳】守阵，待其冲锋脱节时，派出重将集火斩杀！",
      recommendedUnits: ["cavalry", "catapult", "guanyu"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "司空", text: "袁绍遣大将颜良围白马，文丑渡延津！郭奉孝，当用何计破之？", side: "left" },
      { speaker: "郭嘉", avatar: "assets/generals/guojia_128.png", role: "鬼才谋士", text: "诱其分兵，声东击西！佯攻其后，再遣关云长出其不意，一击破之！", side: "left" },
      { speaker: "文丑", avatar: "assets/generals/wenchou_128.png", role: "河北四庭柱", text: "曹军粮车已失！全军压上，生擒曹孟德！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "司空", text: "白马解围，延津大胜！连折袁绍两员虎将，河北军心已动摇矣！", side: "left" },
      { speaker: "许褚", avatar: "assets/generals/xuchu_128.png", role: "虎痴大将", text: "哈哈！袁绍所谓大将，在主公妙算面前不堪一击！", side: "left" }
    ]
  },
  {
    id: 6,
    faction: "wei",
    era: 2,
    name: "官渡决战",
    title: "【第六章】官渡决战 · 火烧乌巢定北方",
    subtitle: "公元200年 · 曹操以弱胜强，奇袭乌巢焚袁绍七十万大军粮草，威震天下！",
    objective: { type: "assassinate_boss", targetBossType: "yuanshao", targetBossName: "大将军袁绍", label: "斩将夺旗", desc: "阵前击溃四世三公袁绍大军！" },
    recruitHeroId: "yuanshao",
    recruitHeroIds: ["yuanshao"],
    enemyName: "四世三公袁绍",
    enemyTitle: "河北大将军中军",
    enemyAvatar: "assets/generals/yuanshao_128.png",
    castleHp: 3000,
    enemyGoldRate: 17,
    rewardSilver: 400,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["caocao", "guojia", "xuchu", "zhangliao"],
    briefing: {
      enemyType: "河北甲士大军、大黄弩连射阵、袁绍中军",
      strategyTip: "袁绍兵力数倍于我！派遣精锐骑兵突袭其粮道，利用投石巨车压制其箭楼，决胜一击！",
      recommendedUnits: ["cavalry", "catapult", "caocao"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "司空", text: "许子远夜投于孤，告以乌巢粮囤之虚实！天赐良机，全军衔枚夜袭乌巢！", side: "left" },
      { speaker: "郭嘉", avatar: "assets/generals/guojia_128.png", role: "鬼才谋士", text: "主公有十胜，袁绍有十败！此役一胜，北方四州唾手可得！", side: "left" },
      { speaker: "袁绍", avatar: "assets/generals/yuanshao_128.png", role: "大将军", text: "吾拥冀幽青并四州，精兵数十万！曹阿瞒米粒之珠，也敢与日月争辉？！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "司空", text: "乌巢大火冲天，袁绍全线崩溃！北方一统，指日可待！设使国家无有孤，不知当几人称帝！", side: "left" },
      { speaker: "郭嘉", avatar: "assets/generals/guojia_128.png", role: "鬼才谋士", text: "恭贺主公！天下大势，尽在我大魏掌握之中！", side: "left" }
    ]
  },
  {
    id: 7,
    faction: "wei",
    era: 2,
    name: "渭南破马超",
    title: "【第七章】渭南平叛 · 结沙筑冰破西凉",
    subtitle: "公元211年 · 西凉马超起兵报仇，曹操割须弃袍，设离间计结沙筑冰大破西凉军！",
    objective: { type: "assassinate_boss", targetBossType: "machao", targetBossName: "神威马超", label: "斩将夺旗", desc: "阵前击退神威天将军马超！" },
    recruitHeroId: "machao",
    recruitHeroIds: ["machao"],
    enemyName: "神威天将军马超",
    enemyTitle: "西凉神威铁骑",
    enemyAvatar: "assets/generals/machao_128.png",
    castleHp: 3200,
    enemyGoldRate: 18,
    rewardSilver: 420,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["caocao", "xuchu", "zhangliao", "caoren"],
    briefing: {
      enemyType: "西凉突骑、飞矛手、锦马超",
      strategyTip: "马超铁骑冲击天下最烈！依靠【虎痴许褚】怒目逼退马超，在沙土浇水结冰筑城守阵！",
      recommendedUnits: ["infantry", "xuchu", "catapult"]
    },
    introDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "魏公", text: "马儿不死，孤无葬地也！西凉骑兵悍勇异常，当依渭水坚壁，用贾诩离间之计！", side: "left" },
      { speaker: "许褚", avatar: "assets/generals/xuchu_128.png", role: "虎痴大将", text: "主公莫慌！有某在此，马超敢前行一步，立取其首！", side: "left" },
      { speaker: "马超", avatar: "assets/generals/machao_128.png", role: "神威天将军", text: "曹贼！杀我父兄，纳命来！今日定教你血债血偿！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "曹操", avatar: "🦅", role: "魏公", text: "离间计成，马超韩遂反目成仇！西凉全境平定，关陇安宁！", side: "left" },
      { speaker: "许褚", avatar: "assets/generals/xuchu_128.png", role: "虎痴大将", text: "虎痴战马超，痛快！主公安危永固！", side: "left" }
    ]
  },
  {
    id: 8,
    faction: "wei",
    era: 2,
    name: "威震逍遥津",
    title: "【第八章】逍遥津战 · 张辽八百破十万",
    subtitle: "公元215年 · 孙权十万大军围合肥，张辽率八百敢死勇士突阵，威震江东！",
    objective: { type: "assassinate_boss", targetBossType: "sunquan", targetBossName: "东吴大帝孙权", label: "斩将夺旗", desc: "阵前击破孙权中军帅旗！" },
    recruitHeroId: "zhangliao",
    recruitHeroIds: ["zhangliao"],
    enemyName: "东吴大帝孙权",
    enemyTitle: "东吴十万大军中军",
    enemyAvatar: "assets/generals/sunquan_128.png",
    castleHp: 3500,
    enemyGoldRate: 18,
    rewardSilver: 460,
    rewardGoldIngot: 50,
    allowedGeneralCards: ["zhangliao", "caoren", "xuchu", "xiahoudun"],
    briefing: {
      enemyType: "东吴水陆大军、江东解烦卫、孙权中军",
      strategyTip: "敌众我寡，须先挫其锐！张辽突阵直冲敌主帅，速战速决！",
      recommendedUnits: ["cavalry", "zhangliao", "infantry"]
    },
    introDialogs: [
      { speaker: "张辽", avatar: "assets/generals/zhangliao_128.png", role: "征东将军", text: "贼众十万，我军仅七千！若等合围则合肥必破！辽愿率八百敢死之士，天明突阵！", side: "left" },
      { speaker: "李典", avatar: "assets/generals/caoren_128.png", role: "破虏将军", text: "国家大事，何计私怨！曼成愿与文远同生共死！", side: "left" },
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "车骑将军", text: "区区张辽数百骑，竟敢直冲孤之中军？！众将合围，休放走了他！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "张辽", avatar: "assets/generals/zhangliao_128.png", role: "征东将军", text: "八百破十万！连斩吴将两员，孙权仓皇跳飞桥逃窜！江东小儿不敢夜啼矣！", side: "left" },
      { speaker: "曹操", avatar: "🦅", role: "魏王", text: "张辽古之名将不过如此也！拜征东将军，天下传颂！", side: "left" }
    ]
  },
  {
    id: 9,
    faction: "wei",
    era: 3,
    name: "祁山拒蜀",
    title: "【第九章】祁山拒蜀 · 坚壁清野成大业",
    subtitle: "公元228~234年 · 诸葛亮六出祁山，司马懿深谋远虑屯田坚守，克定天下！",
    objective: { type: "assassinate_boss", targetBossType: "zhugeliang", targetBossName: "卧龙诸葛亮", label: "斩将夺旗", desc: "阵前击退蜀相诸葛亮大军！" },
    recruitHeroId: "simayi",
    recruitHeroIds: ["simayi"],
    enemyName: "卧龙诸葛亮",
    enemyTitle: "蜀汉北伐大营",
    enemyAvatar: "assets/generals/zhugeliang_128.png",
    castleHp: 3800,
    enemyGoldRate: 20,
    rewardSilver: 500,
    rewardGoldIngot: 60,
    allowedGeneralCards: ["simayi", "zhangliao", "xuchu", "guojia"],
    briefing: {
      enemyType: "诸葛连弩兵、木牛流马辎重营、神机诸葛亮",
      strategyTip: "诸葛亮智谋通天连弩极强！司马懿坐镇中军深沟高垒，以耐力消耗其粮草，伺机反扑！",
      recommendedUnits: ["simayi", "catapult", "infantry"]
    },
    introDialogs: [
      { speaker: "司马懿", avatar: "🐺", role: "太尉 · 大都督", text: "诸葛孔明千里来袭，利在速战！孤偏深沟高垒，坚壁清野，使其粮尽自溃！", side: "left" },
      { speaker: "郭淮", avatar: "assets/generals/xiahoudun_128.png", role: "雍州刺史", text: "大都督神算！蜀军运粮千里，只要守住关陇，蜀人必退！", side: "left" },
      { speaker: "诸葛亮", avatar: "assets/generals/zhugeliang_128.png", role: "蜀汉丞相", text: "仲达知我粮尽，故坚守不出……然汉家社稷在此一举，老夫誓死北伐！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "司马懿", avatar: "🐺", role: "太尉 · 大都督", text: "天下奇才，亦难抗天命！五丈原星陨，魏室江山永固！四海归心，大业底定！🎉", side: "left" },
      { speaker: "曹操", avatar: "🦅", role: "魏武大帝", text: "设使天下无魏，不知几人称王！今日九州归一，四海升平！", side: "left" }
    ]
  }
];

// ==========================================
// 🔵 东吴传 · 江东风云九大专属战役 (公元191~222年)
// ==========================================
export const WU_CHAPTERS = [
  {
    id: 1,
    faction: "wu",
    era: 1,
    name: "跨江定乱",
    title: "【第一章】跨江定乱 · 破虏跨江战荆襄",
    subtitle: "公元191年 · 破虏将军孙坚跨江攻刘表，威震江汉，奠定孙氏基业！",
    objective: { type: "destroy_castle", label: "攻城破寨", desc: "荡平荆州先锋水寨！" },
    recruitHeroId: "huanggai",
    recruitHeroIds: ["huanggai"],
    enemyName: "荆州太守黄祖",
    enemyTitle: "江夏水师连营",
    enemyAvatar: "assets/generals/caoren_128.png",
    castleHp: 1400,
    enemyGoldRate: 12,
    rewardSilver: 200,
    rewardGoldIngot: 25,
    allowedGeneralCards: ["sunquan", "huanggai", "zhoutai", "yiyidailao"],
    briefing: {
      enemyType: "荆州水师、江防长弓手",
      strategyTip: "江东艨艟进击！黄盖老当益壮前排举盾顶住箭矢，水陆并进击溃敌砦！",
      recommendedUnits: ["infantry", "archer", "huanggai"]
    },
    introDialogs: [
      { speaker: "孙策", avatar: "assets/generals/sunquan_128.png", role: "少将军", text: "江东儿郎！父亲领破虏之师跨江北伐，誓荡平荆襄，立不世之功！", side: "left" },
      { speaker: "黄盖", avatar: "assets/generals/huanggai_128.png", role: "江东老将", text: "老夫愿为少主前锋！江表健儿，随我登岸破营！", side: "left" },
      { speaker: "黄祖", avatar: "assets/generals/caoren_128.png", role: "江夏太守", text: "江东孙氏小儿，休想过我江夏水寨半步！放箭！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "孙策", avatar: "assets/generals/sunquan_128.png", role: "少将军", text: "大破江夏水军！江东威名远扬天下，渡江北望，天下谁人可敌！", side: "left" },
      { speaker: "黄盖", avatar: "assets/generals/huanggai_128.png", role: "江东老将", text: "缴获战船辎重，少将军之威不下乌程侯矣！", side: "left" }
    ]
  },
  {
    id: 2,
    faction: "wu",
    era: 1,
    name: "神亭酣战",
    title: "【第二章】神亭激战 · 小霸王单骑会子义",
    subtitle: "公元195年 · 孙策神亭岭单骑遇东莱太史慈，双雄酣战惺惺相惜！",
    objective: { type: "assassinate_boss", targetBossType: "taishici", targetBossName: "名将太史慈", label: "斩将夺旗", desc: "阵前战服东莱太史慈！" },
    recruitHeroId: "taishici",
    recruitHeroIds: ["taishici"],
    enemyName: "东莱名将太史慈",
    enemyTitle: "神亭岭神射营",
    enemyAvatar: "assets/generals/taishici_128.png",
    castleHp: 1800,
    enemyGoldRate: 13,
    rewardSilver: 260,
    rewardGoldIngot: 30,
    allowedGeneralCards: ["sunquan", "zhouyu", "zhoutai", "meirenji"],
    briefing: {
      enemyType: "神射强弩手、东莱轻骑、名将太史慈",
      strategyTip: "太史慈箭法绝伦近战极勇！周瑜坐镇中军调兵遣将，周泰护卫近身搏杀收服猛将！",
      recommendedUnits: ["cavalry", "zhouyu", "zhoutai"]
    },
    introDialogs: [
      { speaker: "孙策", avatar: "assets/generals/sunquan_128.png", role: "小霸王", text: "神亭岭前何人挺枪跃马？某乃江东孙伯符是也！特来会你！", side: "left" },
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "中郎将", text: "伯符小心！此人便是东莱太史慈，箭不虚发，乃真勇将也！", side: "left" },
      { speaker: "太史慈", avatar: "assets/generals/taishici_128.png", role: "东莱名将", text: "大丈夫生于乱世，当带三尺剑立不世之功！来战！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "孙策", avatar: "assets/generals/sunquan_128.png", role: "小霸王", text: "好武艺！子义，天下大乱，正当与吾同心开创江东万世基业！", side: "left" },
      { speaker: "太史慈", avatar: "assets/generals/taishici_128.png", role: "名将太史慈", text: "使君胸襟宽广，太史慈愿领江东健儿，誓死追随！", side: "left" }
    ]
  },
  {
    id: 3,
    faction: "wu",
    era: 1,
    name: "平定六郡",
    title: "【第三章】平定六郡 · 横扫江东破纪灵",
    subtitle: "公元199年 · 袁术僭号称帝残暴扬州，孙策周瑜连战连捷平定江东六郡！",
    objective: { type: "assassinate_boss", targetBossType: "jiling", targetBossName: "名将纪灵", label: "斩将夺旗", desc: "阵前击破仲氏大将纪灵！" },
    recruitHeroId: "jiling",
    recruitHeroIds: ["jiling"],
    enemyName: "三尖刀将纪灵",
    enemyTitle: "仲氏伪帝前锋",
    enemyAvatar: "assets/generals/jiling_128.png",
    castleHp: 2200,
    enemyGoldRate: 14,
    rewardSilver: 300,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["sunquan", "zhouyu", "taishici", "huanggai"],
    briefing: {
      enemyType: "仲氏甲士、重装战斧兵、大将纪灵",
      strategyTip: "纪灵三尖两刃刀威力极大！周瑜以计谋控场，太史慈远程射杀，稳扎稳打！",
      recommendedUnits: ["infantry", "zhouyu", "archer"]
    },
    introDialogs: [
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "袁术倒行逆施，自取灭亡！我军顺天应民，今日一战拔除扬州残党！", side: "left" },
      { speaker: "太史慈", avatar: "assets/generals/taishici_128.png", role: "折冲将军", text: "太史慈愿为前驱，取纪灵三尖刀来献！", side: "left" },
      { speaker: "纪灵", avatar: "assets/generals/jiling_128.png", role: "仲氏大将军", text: "江东小儿休得狂妄！看某三尖两刃刀斩尔等下马！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "孙策", avatar: "assets/generals/sunquan_128.png", role: "吴侯", text: "江东六郡八十一州尽入掌握！民殷国富，大业基石已固！", side: "left" },
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "抚循百越，结纳名流，江东自此不可撼动矣！", side: "left" }
    ]
  },
  {
    id: 4,
    faction: "wu",
    era: 2,
    name: "江夏雪恨",
    title: "【第四章】江夏雪恨 · 甘宁先登报父仇",
    subtitle: "公元208年 · 孙权三伐江夏，甘宁凌统奋勇先登斩杀黄祖，雪洗世仇！",
    objective: { type: "destroy_castle", label: "攻城破寨", desc: "攻破江夏坚城，斩杀仇敌黄祖！" },
    recruitHeroId: "zhoutai",
    recruitHeroIds: ["zhoutai"],
    enemyName: "江夏宿敌黄祖",
    enemyTitle: "江夏水陆要塞",
    enemyAvatar: "assets/generals/caoren_128.png",
    castleHp: 2500,
    enemyGoldRate: 15,
    rewardSilver: 340,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["sunquan", "zhouyu", "taishici", "zhoutai"],
    briefing: {
      enemyType: "水寨死士、重装江防巨舰、黄祖亲兵",
      strategyTip: "江夏城防严密！集中投石车摧毁其城防，周泰血战冲杀在前，强拔坚城！",
      recommendedUnits: ["catapult", "zhoutai", "infantry"]
    },
    introDialogs: [
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "讨虏将军", text: "黄祖杀我先父，仇深似海！今日江东全军缟素，誓拔江夏，告慰父魂！", side: "left" },
      { speaker: "周泰", avatar: "assets/generals/zhoutai_128.png", role: "虎臣周泰", text: "主公！泰一身受数十创亦不足惜，愿为主公先登破城！", side: "left" },
      { speaker: "黄祖", avatar: "assets/generals/caoren_128.png", role: "江夏太守", text: "孙氏鼠辈，纠缠不休！凭尔等也想破我坚城？！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "讨虏将军", text: "大仇得报！黄祖伏诛！长江上游门户尽入孤之掌握！全军痛饮庆功！", side: "left" },
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "上游既定，江东可图天下矣！", side: "left" }
    ]
  },
  {
    id: 5,
    faction: "wu",
    era: 2,
    name: "赤壁鏖战",
    title: "【第五章】赤壁鏖战 · 谈笑间樯橹灰飞烟灭",
    subtitle: "公元208年 · 曹操八十万大军南下，周瑜黄盖火烧赤壁，定鼎三国乾坤！",
    objective: { type: "assassinate_boss", targetBossType: "caocao", targetBossName: "魏武曹操", label: "斩将夺旗", desc: "阵前火攻大破魏王曹操！" },
    recruitHeroId: "lvmeng",
    recruitHeroIds: ["lvmeng"],
    enemyName: "魏王曹操",
    enemyTitle: "曹魏南征八十万水陆大军",
    enemyAvatar: "assets/generals/caocao_128.png",
    castleHp: 3200,
    enemyGoldRate: 17,
    rewardSilver: 420,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["zhouyu", "huanggai", "taishici", "sunquan"],
    briefing: {
      enemyType: "中原重甲骑兵、虎豹骑、连环水战船、魏武曹操",
      strategyTip: "敌军势大且连锁结船！黄盖施苦肉火攻之策，周瑜引东南狂风，烈火焚尽万重敌！",
      recommendedUnits: ["zhouyu", "huanggai", "catapult"]
    },
    introDialogs: [
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "曹操驱北军犯顺，锁战船于赤壁！黄公覆，诈降火攻正在今夜！", side: "left" },
      { speaker: "黄盖", avatar: "assets/generals/huanggai_128.png", role: "丹阳太守", text: "老夫愿乘蒙冲斗舰，满载膏油，直冲敌水寨！烈火焚天！", side: "left" },
      { speaker: "曹操", avatar: "🦅", role: "丞相", text: "孤统八十万雄兵南下，江南指日可定！黄盖来降，天助大魏！……慢着，船后何来烈焰？！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "烈火燎原，赤壁映红半边天！曹贼仓皇北逃，天下自此三分！", side: "left" },
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "会稽太守", text: "公瑾之功，千秋无双！江东万年！🎉", side: "left" }
    ]
  },
  {
    id: 6,
    faction: "wu",
    era: 2,
    name: "南郡争雄",
    title: "【第六章】南郡争雄 · 周郎血战拔坚城",
    subtitle: "公元209年 · 周瑜甘宁血战南郡，中流矢而不退，强克曹仁拔取荆州要塞！",
    objective: { type: "assassinate_boss", targetBossType: "caoren", targetBossName: "征南大将军曹仁", label: "斩将夺旗", desc: "阵前击破南郡守将曹仁！" },
    recruitHeroId: "caoren",
    recruitHeroIds: ["caoren"],
    enemyName: "征南大将曹仁",
    enemyTitle: "曹魏南郡重镇",
    enemyAvatar: "assets/generals/caoren_128.png",
    castleHp: 2800,
    enemyGoldRate: 16,
    rewardSilver: 380,
    rewardGoldIngot: 40,
    allowedGeneralCards: ["zhouyu", "zhoutai", "taishici", "huanggai"],
    briefing: {
      enemyType: "守城重步兵、滚木礌石、铁壁曹仁",
      strategyTip: "曹仁玄武铁壁坚守极强！周瑜施展计谋瓦解其阵型，周泰领精锐近身强攻！",
      recommendedUnits: ["infantry", "zhouyu", "catapult"]
    },
    introDialogs: [
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "南郡乃荆襄咽喉！不拔南郡，江东无以自立！全军攻城！", side: "left" },
      { speaker: "吕蒙", avatar: "assets/generals/lvmeng_128.png", role: "虎威将军", text: "末将愿分兵断曹仁后路，合围南郡！", side: "left" },
      { speaker: "曹仁", avatar: "assets/generals/caoren_128.png", role: "征南大将军", text: "曹子孝在此！南郡城如生铁，周瑜小儿有来无回！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "周瑜", avatar: "assets/generals/zhouyu_128.png", role: "大都督", text: "南郡克复！曹仁弃城北遁！荆州重镇尽入江东版图！", side: "left" },
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "车骑将军", text: "都督神威！江东基业再上层楼！", side: "left" }
    ]
  },
  {
    id: 7,
    faction: "wu",
    era: 2,
    name: "濡须御曹",
    title: "【第七章】濡须御魏 · 生子当如孙仲谋",
    subtitle: "公元213年 · 曹操步骑四十万至濡须坞，孙权乘战船亲临敌阵，御敌于国门之外！",
    objective: { type: "destroy_castle", label: "攻城拔寨", desc: "击溃曹魏濡须前锋大营！" },
    recruitHeroId: "luxun",
    recruitHeroIds: ["luxun"],
    enemyName: "魏公曹操",
    enemyTitle: "曹魏南征御营",
    enemyAvatar: "assets/generals/caocao_128.png",
    castleHp: 3300,
    enemyGoldRate: 18,
    rewardSilver: 430,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["sunquan", "zhoutai", "lvmeng", "huanggai"],
    briefing: {
      enemyType: "中原精锐铁骑、濡须弩炮连营、曹魏禁军",
      strategyTip: "濡须坞攻防凶险！孙权坐镇御敌，周泰贴身肉盾护卫，以坚固壁垒迎击强敌！",
      recommendedUnits: ["zhoutai", "sunquan", "infantry"]
    },
    introDialogs: [
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "车骑将军", text: "曹操再提步骑四十万犯境！孤亲乘战船临阵，江东子弟岂有畏战之理？！", side: "left" },
      { speaker: "周泰", avatar: "assets/generals/zhoutai_128.png", role: "平虏将军", text: "有臣在，主公尽管观阵！贼箭敢近者立碎！", side: "left" },
      { speaker: "曹操", avatar: "🦅", role: "魏公", text: "生子当如孙仲谋！若刘景升儿子，豚犬耳！全军进击濡须坞！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "车骑将军", text: "曹操遣使退军！江东六郡金汤永固！", side: "left" },
      { speaker: "陆逊", avatar: "assets/generals/luxun_128.png", role: "海昌屯田都尉", text: "主公威震长江，大魏亦无可奈何矣！", side: "left" }
    ]
  },
  {
    id: 8,
    faction: "wu",
    era: 2,
    name: "白衣渡江",
    title: "【第八章】白衣渡江 · 巧计取荆襄降关羽",
    subtitle: "公元219年 · 吕蒙陆逊巧计白衣渡江袭取烽火台，围困麦城斩武圣收复荆州！",
    objective: { type: "assassinate_boss", targetBossType: "guanyu", targetBossName: "武圣关羽", label: "斩将夺旗", desc: "阵前击破威震华夏之武圣关羽！" },
    recruitHeroId: "guanyu",
    recruitHeroIds: ["guanyu"],
    enemyName: "武圣关羽",
    enemyTitle: "荆州武圣精锐大营",
    enemyAvatar: "assets/generals/guanyu_128.png",
    castleHp: 3600,
    enemyGoldRate: 19,
    rewardSilver: 480,
    rewardGoldIngot: 50,
    allowedGeneralCards: ["lvmeng", "luxun", "zhoutai", "sunquan"],
    briefing: {
      enemyType: "荆襄精锐校刀手、赤兔突骑、武圣关羽",
      strategyTip: "武圣关羽青龙刀斩击无双！吕蒙以计策伏击其粮道，陆逊书生妙算弱化其狂暴反击！",
      recommendedUnits: ["lvmeng", "luxun", "infantry"]
    },
    introDialogs: [
      { speaker: "吕蒙", avatar: "assets/generals/lvmeng_128.png", role: "南郡太守", text: "关羽水淹七军威震华夏，自以为江防无虞！令士卒化作商贾，白衣渡江巧拔烽火台！", side: "left" },
      { speaker: "陆逊", avatar: "assets/generals/luxun_128.png", role: "右部督", text: "关云长骄兵必败！江陵公安已克，关羽进退失据矣！", side: "left" },
      { speaker: "关羽", avatar: "assets/generals/guanyu_128.png", role: "前将军 · 汉寿亭侯", text: "碧眼儿！吕蒙鼠辈！安敢背信弃义袭我荆州？！看关某青龙偃月刀！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "吕蒙", avatar: "assets/generals/lvmeng_128.png", role: "南郡太守", text: "麦城既破，荆州全境收复！了却父兄三代夙愿！", side: "left" },
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "吴王", text: "荆襄九郡尽入大吴版图！吕子明天下奇功！", side: "left" }
    ]
  },
  {
    id: 9,
    faction: "wu",
    era: 3,
    name: "夷陵大火",
    title: "【第九章】夷陵大火 · 猇亭连营七百里灰飞",
    subtitle: "公元222年 · 刘备倾全国之兵伐吴，陆逊书生拜大都督，火烧连营七百里大获全胜！",
    objective: { type: "assassinate_boss", targetBossType: "liubei", targetBossName: "昭烈帝刘备", label: "斩将夺旗", desc: "阵前击破蜀汉先主刘备！" },
    recruitHeroId: "liubei",
    recruitHeroIds: ["liubei"],
    enemyName: "蜀汉先主刘备",
    enemyTitle: "蜀汉连营七百里御营",
    enemyAvatar: "assets/generals/liubei_128.png",
    castleHp: 4000,
    enemyGoldRate: 20,
    rewardSilver: 520,
    rewardGoldIngot: 60,
    allowedGeneralCards: ["luxun", "zhoutai", "sunquan", "huanggai"],
    briefing: {
      enemyType: "蜀汉御林军、白毦精兵、昭烈帝刘备",
      strategyTip: "蜀军结营七百里依草结寨！陆逊顺风纵火，利用漫天火势重创蜀军大营，一战定天下！",
      recommendedUnits: ["luxun", "zhoutai", "bomb"]
    },
    introDialogs: [
      { speaker: "陆逊", avatar: "assets/generals/luxun_128.png", role: "大都督 · 镇西将军", text: "刘备盛怒而来，结营七百里！今盛夏燥热，木石丛生，正当顺风纵火！", side: "left" },
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "吴王", text: "孤以大吴国运托付伯言！众将听令，凡不遵大都督号令者斩！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "蜀汉皇帝", text: "陆逊黄口孺子，安知兵法！朕征战半生……不好！营中四面火起！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "陆逊", avatar: "assets/generals/luxun_128.png", role: "大都督", text: "火烧夷陵连营七百里！蜀军土崩瓦解！大吴基业千秋鼎盛！🎉", side: "left" },
      { speaker: "孙权", avatar: "assets/generals/sunquan_128.png", role: "吴大帝", text: "伯言真乃国家柱石！江东山河永固，天下称帝称尊！", side: "left" }
    ]
  }
];

// ==========================================
// 🟡 群雄传 · 诸侯逐鹿八大专属战役 (公元184~225年)
// ==========================================
export const QUN_CHAPTERS = [
  {
    id: 1,
    faction: "qun",
    era: 1,
    name: "黄天当立",
    title: "【第一章】黄天当立 · 天公将军震神州",
    subtitle: "公元184年 · 张角创立太平道，振臂一呼天下响应，巨鹿起兵破汉军！",
    objective: { type: "destroy_castle", label: "攻城破寨", desc: "击溃汉军讨伐军大营！" },
    recruitHeroId: "zhangjiao",
    recruitHeroIds: ["zhangjiao"],
    enemyName: "汉中郎将卢植",
    enemyTitle: "大汉禁卫中军",
    enemyAvatar: "assets/generals/dianwei_128.png",
    castleHp: 1300,
    enemyGoldRate: 12,
    rewardSilver: 200,
    rewardGoldIngot: 25,
    allowedGeneralCards: ["zhangjiao", "diaochan", "lvbu", "yiyidailao"],
    briefing: {
      enemyType: "大汉禁军步兵、朝廷长弓卫队",
      strategyTip: "张角呼风唤雨施展雷法！以天公之名召唤万众暴民冲阵，雷霆击碎汉军大寨！",
      recommendedUnits: ["infantry", "archer", "zhangjiao"]
    },
    introDialogs: [
      { speaker: "张角", avatar: "assets/generals/zhangjiao_128.png", role: "天公将军", text: "苍天已死，黄天当立！岁在甲子，天下大吉！贫道以天公将军之名，救万民于水火！", side: "left" },
      { speaker: "黄巾信徒", avatar: "🦹", role: "太平道众", text: "神仙保佑，刀枪不入！追随天公将军，打倒贪官污吏！", side: "left" },
      { speaker: "汉军中郎将", avatar: "⚔️", role: "朝廷命官", text: "妖道妖术惑众，朝廷大军在此，尔等逆贼速速受死！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "张角", avatar: "assets/generals/zhangjiao_128.png", role: "天公将军", text: "黄巾大旗插遍九州！天下震荡，大汉气数尽矣！", side: "left" },
      { speaker: "黄巾信徒", avatar: "🦹", role: "太平道众", text: "天公将军神威！天下英雄当自立称王！", side: "left" }
    ]
  },
  {
    id: 2,
    faction: "qun",
    era: 1,
    name: "洛阳权柄",
    title: "【第二章】洛阳权柄 · 董卓提西凉雄兵入京",
    subtitle: "公元189年 · 董卓率二十万西凉铁骑入京，废少帝诛异己，权倾天下！",
    objective: { type: "assassinate_boss", targetBossType: "yuanshao", targetBossName: "司隶校尉袁绍", label: "斩将夺旗", desc: "阵前击退执迷不悟之袁绍！" },
    recruitHeroId: "dongzhuo",
    recruitHeroIds: ["dongzhuo"],
    enemyName: "司隶校尉袁绍",
    enemyTitle: "关东世家精锐",
    enemyAvatar: "assets/generals/yuanshao_128.png",
    castleHp: 1800,
    enemyGoldRate: 14,
    rewardSilver: 260,
    rewardGoldIngot: 30,
    allowedGeneralCards: ["dongzhuo", "lvbu", "zhangjiao", "paizhuan"],
    briefing: {
      enemyType: "西园禁卫军、世家私兵、名门袁绍",
      strategyTip: "董卓魔王狂暴冲锋，配合吕布无双压制，正面强行碾碎敌中军！",
      recommendedUnits: ["cavalry", "dongzhuo", "lvbu"]
    },
    introDialogs: [
      { speaker: "董卓", avatar: "assets/generals/dongzhuo_128.png", role: "西凉霸主", text: "天子暗弱，不可奉宗庙！某引西凉虎狼之师进京，天下大事尽操于我手！谁敢不服？！", side: "left" },
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "中郎将", text: "义父放心！有布在，朝中文武哪个敢有二心，立斩无赦！", side: "left" },
      { speaker: "袁绍", avatar: "assets/generals/yuanshao_128.png", role: "司隶校尉", text: "董贼！天下健者，岂唯董公！吾剑亦未尝不利！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "董卓", avatar: "assets/generals/dongzhuo_128.png", role: "相国", text: "哈哈！满朝公卿尽皆俯首！封孤为相国，剑履上殿，入朝不趋！", side: "left" },
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "温侯", text: "义父神威盖世，天下莫敢不从！", side: "left" }
    ]
  },
  {
    id: 3,
    faction: "qun",
    era: 1,
    name: "虎牢霸气",
    title: "【第三章】虎牢霸气 · 战神吕布独拒关东联军",
    subtitle: "公元190年 · 十八路诸侯联军犯虎牢关，温侯吕布一人一骑傲立关前，天下无双！",
    objective: { type: "assassinate_boss", targetBossType: "yuanshao", targetBossName: "盟主袁绍", label: "斩将夺旗", desc: "阵前击破关东联军盟主大营！" },
    recruitHeroId: "diaochan",
    recruitHeroIds: ["diaochan"],
    enemyName: "关东盟主袁绍",
    enemyTitle: "十八路诸侯联军大寨",
    enemyAvatar: "assets/generals/yuanshao_128.png",
    castleHp: 2200,
    enemyGoldRate: 15,
    rewardSilver: 300,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["lvbu", "diaochan", "dongzhuo", "meirenji"],
    briefing: {
      enemyType: "诸侯联军精锐、车轮冲锋陷阵兵、盟主帅营",
      strategyTip: "十八路诸侯轮番出阵！吕布方天画戟无双乱舞，貂蝉倾城妙策控场，神挡杀神！",
      recommendedUnits: ["lvbu", "cavalry", "diaochan"]
    },
    introDialogs: [
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "飞将军 · 温侯", text: "关东十八路鼠辈诸侯，也敢聚众犯关？！某手中方天画戟，正欲饮血！", side: "left" },
      { speaker: "貂蝉", avatar: "assets/generals/diaochan_128.png", role: "绝代佳人", text: "奉先将军天下无敌，妾身在关楼抚琴助威！", side: "left" },
      { speaker: "袁绍", avatar: "assets/generals/yuanshao_128.png", role: "关东盟主", text: "诸位诸侯！斩得吕布者，赏千金封万户侯！全军合围！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "飞将军 · 温侯", text: "哈哈！十八路诸侯皆抱头鼠窜！谁敢言天下第一？！唯我吕奉先！", side: "left" },
      { speaker: "董卓", avatar: "assets/generals/dongzhuo_128.png", role: "相国", text: "吾儿奉先真乃天神下凡！虎牢雄关固若金汤！", side: "left" }
    ]
  },
  {
    id: 4,
    faction: "qun",
    era: 1,
    name: "界桥争霸",
    title: "【第四章】界桥争霸 · 先登死士破白马义从",
    subtitle: "公元191年 · 袁绍界桥战公孙瓒，麴义八百先登死士伏击，大破白马义从！",
    objective: { type: "assassinate_boss", targetBossType: "caochun", targetBossName: "白马骁将", label: "斩将夺旗", desc: "阵前击破白马突骑统领！" },
    recruitHeroId: "yanliang",
    recruitHeroIds: ["yanliang", "wenchou"],
    enemyName: "白马统领公孙瓒",
    enemyTitle: "幽州白马义从突骑",
    enemyAvatar: "assets/generals/wenchou_128.png",
    castleHp: 2500,
    enemyGoldRate: 15,
    rewardSilver: 340,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["yuanshao", "yanliang", "wenchou", "yiyidailao"],
    briefing: {
      enemyType: "白马轻骑、塞外突骑、神射义从",
      strategyTip: "白马义从机动性极强！颜良文丑左右包抄，巨盾大弩伏地待其近身，万弩齐发！",
      recommendedUnits: ["infantry", "archer", "yanliang"]
    },
    introDialogs: [
      { speaker: "袁绍", avatar: "assets/generals/yuanshao_128.png", role: "四世三公 · 盟主", text: "吾四世三公门生故吏遍天下！公孙瓒区区塞外匹夫，也敢与吾争夺冀州？！", side: "left" },
      { speaker: "颜良", avatar: "assets/generals/yanliang_128.png", role: "河北名将", text: "主公！良愿与文丑引大弩千张，伏于盾后，专射敌白马！", side: "left" },
      { speaker: "公孙瓒", avatar: "assets/generals/wenchou_128.png", role: "白马将军", text: "白马义从，义之所至，生死相随！踏平袁本初大营！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "袁绍", avatar: "assets/generals/yuanshao_128.png", role: "四世三公 · 盟主", text: "界桥大捷！公孙瓒精骑尽墨！冀、青、幽、并四州，尽归我袁氏！", side: "left" },
      { speaker: "文丑", avatar: "assets/generals/wenchou_128.png", role: "河北名将", text: "主公威震北方！四世三公威名重现！", side: "left" }
    ]
  },
  {
    id: 5,
    faction: "qun",
    era: 1,
    name: "淮南称帝",
    title: "【第五章】淮南称帝 · 仲氏皇帝争霸中原",
    subtitle: "公元197年 · 袁术得传国玉玺称仲氏皇帝，命大将纪灵率重甲兵席卷徐淮！",
    objective: { type: "assassinate_boss", targetBossType: "liubei", targetBossName: "徐州牧刘备", label: "斩将夺旗", desc: "阵前击破徐州刘备军大营！" },
    recruitHeroId: "jiling",
    recruitHeroIds: ["jiling"],
    enemyName: "徐州牧刘备",
    enemyTitle: "徐州义兵大营",
    enemyAvatar: "assets/generals/liubei_128.png",
    castleHp: 2800,
    enemyGoldRate: 16,
    rewardSilver: 380,
    rewardGoldIngot: 40,
    allowedGeneralCards: ["jiling", "yuanshao", "lvbu", "paizhuan"],
    briefing: {
      enemyType: "徐州义士、丹阳精兵、仁德刘备",
      strategyTip: "刘备关张结义兄弟合战！派出大将纪灵舞动三尖两刃刀冲锋陷阵，重装破敌！",
      recommendedUnits: ["cavalry", "jiling", "catapult"]
    },
    introDialogs: [
      { speaker: "纪灵", avatar: "assets/generals/jiling_128.png", role: "仲氏大将军", text: "陛下受命于天，既寿永昌！刘备小儿占我徐州，今日奉旨讨逆！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "徐州牧", text: "袁公路僭号称尊，实乃汉贼！备虽不才，誓保社稷江山！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "纪灵", avatar: "assets/generals/jiling_128.png", role: "仲氏大将军", text: "三尖两刃刀威风八面！刘备大溃！淮南天威浩荡！", side: "left" }
    ]
  },
  {
    id: 6,
    faction: "qun",
    era: 2,
    name: "落凤坡设伏",
    title: "【第六章】落凤设伏 · 张任神弩射死庞统",
    subtitle: "公元214年 · 西川忠臣张任雁桥落凤坡设伏，神弩乱发射杀凤雏，誓死卫西川！",
    objective: { type: "assassinate_boss", targetBossType: "pangtong", targetBossName: "凤雏庞统", label: "斩将夺旗", desc: "阵前伏击斩杀凤雏庞统！" },
    recruitHeroId: "zhangren",
    recruitHeroIds: ["zhangren"],
    enemyName: "凤雏军师庞统",
    enemyTitle: "蜀汉入川先锋大营",
    enemyAvatar: "assets/generals/pangtong_128.png",
    castleHp: 3200,
    enemyGoldRate: 17,
    rewardSilver: 420,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["zhangren", "jiling", "wenchou", "yanliang"],
    briefing: {
      enemyType: "入川蜀军、白马先锋骑、凤雏庞统",
      strategyTip: "狭路相逢伏弩克敌！张任依托落凤坡险要地形，强弩万发封死道路，专射敌主帅！",
      recommendedUnits: ["archer", "zhangren", "infantry"]
    },
    introDialogs: [
      { speaker: "张任", avatar: "assets/generals/zhangren_128.png", role: "西川都督", text: "刘备假仁假义图谋益州！此地名为落凤坡，正克其军师凤雏！众将引弩待发！", side: "left" },
      { speaker: "庞统", avatar: "assets/generals/pangtong_128.png", role: "军师中郎将", text: "地势狭窄，两山夹道……此地何名？落凤坡？！不好！速退！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "张任", avatar: "assets/generals/zhangren_128.png", role: "西川都督", text: "一箭射落凤雏庞统！老主公待我恩重如山，张任纵粉身碎骨，亦不降汉贼！", side: "left" }
    ]
  },
  {
    id: 7,
    faction: "qun",
    era: 2,
    name: "下邳穷途",
    title: "【第七章】下邳突围 · 战神绝地白门楼决死",
    subtitle: "公元198年 · 曹操引水淹下邳，吕布陷于绝境，为保妻小赤兔画戟绝地突围！",
    objective: { type: "assassinate_boss", targetBossType: "caocao", targetBossName: "司空曹操", label: "斩将夺旗", desc: "阵前击退合围之曹操大军！" },
    recruitHeroId: "lvbu",
    recruitHeroIds: ["lvbu", "diaochan"],
    enemyName: "司空曹操",
    enemyTitle: "曹操合围大营",
    enemyAvatar: "assets/generals/caocao_128.png",
    castleHp: 3500,
    enemyGoldRate: 18,
    rewardSilver: 460,
    rewardGoldIngot: 50,
    allowedGeneralCards: ["lvbu", "diaochan", "zhangren", "zhangjiao"],
    briefing: {
      enemyType: "中原合围重甲军、投石水攻连营、曹操亲卫",
      strategyTip: "水淹下邳孤立无援！吕布背水一战爆发狂暴战神之力，赤兔马疾驰斩将夺旗！",
      recommendedUnits: ["lvbu", "diaochan", "cavalry"]
    },
    introDialogs: [
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "天下无双飞将", text: "只要方天画戟在手，赤兔神驹在跨，纵十万曹军合围，又有何惧！随我杀出血路！", side: "left" },
      { speaker: "貂蝉", avatar: "assets/generals/diaochan_128.png", role: "绝代佳人", text: "将军英姿犹在，妾身誓死相随！", side: "left" },
      { speaker: "曹操", avatar: "🦅", role: "司空", text: "吕布困守穷途，今日插翅难逃！众将齐出，活捉吕布！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "吕布", avatar: "assets/generals/lvbu_128.png", role: "天下无双飞将", text: "血战重围，天下谁能挡我！吕奉先之勇，千古绝伦！", side: "left" },
      { speaker: "貂蝉", avatar: "assets/generals/diaochan_128.png", role: "绝代佳人", text: "英雄傲立天地间，威震四海！", side: "left" }
    ]
  },
  {
    id: 8,
    faction: "qun",
    era: 3,
    name: "南蛮百象",
    title: "【第八章】南蛮百象 · 孟获七擒七纵雄踞南中",
    subtitle: "公元225年 · 蛮王孟获统御三江九洞百兽与藤甲巨象，誓死抗衡诸葛亮南征大军！",
    objective: { type: "assassinate_boss", targetBossType: "zhugeliang", targetBossName: "武乡侯诸葛亮", label: "斩将夺旗", desc: "阵前击退南征统帅诸葛亮！" },
    recruitHeroId: "menghuo",
    recruitHeroIds: ["menghuo"],
    enemyName: "南征丞相诸葛亮",
    enemyTitle: "蜀汉南征中军连营",
    enemyAvatar: "assets/generals/zhugeliang_128.png",
    castleHp: 3800,
    enemyGoldRate: 20,
    rewardSilver: 500,
    rewardGoldIngot: 60,
    allowedGeneralCards: ["menghuo", "zhangren", "lvbu", "zhangjiao"],
    briefing: {
      enemyType: "诸葛连弩精兵、木牛流马车队、神机诸葛亮",
      strategyTip: "诸葛亮智谋无双擅用火攻！孟获骑乘战象肉盾顶在前线，召唤百兽冲乱敌连弩阵地！",
      recommendedUnits: ["menghuo", "infantry", "cavalry"]
    },
    introDialogs: [
      { speaker: "孟获", avatar: "assets/generals/menghuo_128.png", role: "南蛮大王", text: "诸葛孔明侵我南中水土！三江九洞百象齐出，藤甲刀枪不入！教汉人军马有来无回！", side: "left" },
      { speaker: "南蛮勇士", avatar: "🐘", role: "百兽战士", text: "呜哇！战象冲锋，踏平山谷！大王威武！", side: "left" },
      { speaker: "诸葛亮", avatar: "assets/generals/zhugeliang_128.png", role: "蜀汉丞相", text: "蛮王孟获悍勇无匹，然攻心为上，攻城为下！诸将小心迎战！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "孟获", avatar: "assets/generals/menghuo_128.png", role: "南蛮大王", text: "哈哈！南蛮百兽震天吼！纵然神机诸葛，也知我南中不可轻侮！诸侯逐鹿，各领风骚！🎉", side: "left" },
      { speaker: "张任", avatar: "assets/generals/zhangren_128.png", role: "西川名将", text: "天下群雄并起，英雄好汉辈出！壮哉！", side: "left" }
    ]
  }
];
