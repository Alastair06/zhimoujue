// 《智谋决：三国萌将推线大作战》四大势力专属历史战役剧本库 (蜀汉传 · 曹魏传 · 东吴传 · 群雄传)
import { FACTION_INFOS, WEI_CHAPTERS, WU_CHAPTERS, QUN_CHAPTERS } from './campaigns-data.js?v=20261002_1';

export const STORY_CHAPTERS = [
  // ================= 📜 第一纪元：群雄逐鹿 · 乱世起兵 (公元184年 ~ 199年) =================
  {
    id: 1,
    era: 1,
    name: "桃园初战",
    title: "【第一章】桃园结义 · 涿郡起兵破黄巾",
    subtitle: "公元184年 · 刘关张桃园三结义，讨伐黄巾贼首程远志！",
    objective: { type: "destroy_castle", label: "攻城破寨", desc: "击溃黄巾贼寨大营！" },
    recruitHeroId: "zhangjiao",
    recruitHeroIds: ["zhangjiao"],
    enemyName: "黄巾渠帅程远志",
    enemyTitle: "黄巾山寨大营",
    enemyAvatar: "🦹",
    castleHp: 1300,
    enemyGoldRate: 12,
    rewardSilver: 200,
    rewardGoldIngot: 25,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "yiyidailao"],
    briefing: {
      enemyType: "黄巾乱民、草寇长弓手",
      strategyTip: "黄巾初起，贼兵散乱！派【坚盾步兵】列阵在前举盾御矢，关羽张飞率后排齐射；若敌军猬集成群，可引机关烈火雷【定点轰炸破其阵脚】！",
      recommendedUnits: ["infantry", "archer", "bomb"]
    },
    introDialogs: [
      { speaker: "刘备", avatar: "👑", role: "汉室宗亲", text: "二弟、三弟！黄巾猖獗，民不聊生。我等兄弟今日在桃园结义，正当齐心戮力，保境安民！", side: "left" },
      { speaker: "关羽", avatar: "🐉", role: "义勇之士", text: "兄长所言极是！关某手中青龙刀，专斩犯境乱贼！", side: "left" },
      { speaker: "张飞", avatar: "🐯", role: "燕人悍将", text: "大哥二哥放心！俺老张手握蛇矛冲在前面，把这伙毛贼杀个片甲不留！", side: "left" },
      { speaker: "程远志", avatar: "🦹", role: "黄巾渠帅", text: "苍天已死，黄天当立！哪里来的三个无名小卒，小的们，给我踏平他们！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "张飞", avatar: "🐯", role: "燕人悍将", text: "哈哈！贼首程远志已被二哥一刀斩落马下！贼兵全散啦！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "汉室宗亲", text: "初战告捷！缴获贼寇军饷与金元宝，速速犒赏乡勇，前往神兵阁锻造利刃！", side: "left" }
    ]
  },
  {
    id: 2,
    era: 1,
    name: "虎牢雄关",
    title: "【第二章】虎牢关前 · 三英并力战吕布",
    subtitle: "公元190年 · 十八路诸侯讨董卓，刘关张虎牢关合战战神吕奉先！",
    objective: { type: "assassinate_boss", targetBossType: "lvbu_ch2", targetBossName: "飞将吕布", label: "斩将夺旗", desc: "阵前击败天下第一飞将吕布！" },
    recruitHeroId: "diaochan",
    recruitHeroIds: ["diaochan"],
    enemyName: "天下第一飞将吕布",
    enemyTitle: "西凉雄关重镇",
    enemyAvatar: "assets/generals/lvbu_128.png",
    castleHp: 1800,
    enemyGoldRate: 14,
    rewardSilver: 250,
    rewardGoldIngot: 30,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "西凉精锐铁骑、飞将吕布",
      strategyTip: "人中吕布，马中赤兔！吕布武艺盖世狂暴霸体。对吕布使用【💃 倾城妙策】可令其瞬间心碎 -25 陷入魅惑！兄弟三人合力破关！",
      recommendedUnits: ["cavalry", "meirenji", "guanyu", "catapult"]
    },
    introDialogs: [
      { speaker: "吕布", avatar: "🐯", role: "天下第一", text: "我乃温侯吕布！关东诸侯尽皆鼠辈，谁敢上前与我一战？！", side: "right" },
      { speaker: "张飞", avatar: "🐯", role: "燕人悍将", text: "三姓家奴休得猖狂！燕人张翼德在此，看矛！", side: "left" },
      { speaker: "关羽", avatar: "🐉", role: "美髯公", text: "三弟休急，关某提青龙偃月刀助你一臂之力！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "平原相", text: "二弟三弟，我等同生共死！全军将士配合投石巨车与大炸弹，破其关隘！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "吕布", avatar: "🐯", role: "天下第一", text: "这刘关张三人联手竟如此厉害……西凉军暂且退守关内！", side: "right" },
      { speaker: "刘备", avatar: "👑", role: "平原相", text: "三英战吕布，威震天下！全军休整，进军神工坊犒劳三军！", side: "left" }
    ]
  },
  {
    id: 3,
    era: 1,
    name: "北海解围",
    title: "【第三章】北海解围 · 太史慈单骑求援",
    subtitle: "公元193年 · 北海孔融被黄巾管亥围困，刘玄德仗义出兵解围！",
    objective: { type: "destroy_castle", label: "解围突围", desc: "击溃黄巾围城大寨！" },
    recruitHeroId: "taishici",
    recruitHeroIds: ["taishici"],
    enemyName: "黄巾大帅管亥",
    enemyTitle: "北海围城大营",
    enemyAvatar: "🏹",
    castleHp: 2000,
    enemyGoldRate: 14,
    rewardSilver: 280,
    rewardGoldIngot: 30,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "黄巾重装悍匪、密集弓弩营",
      strategyTip: "管亥大军重重围困！派出【坚盾步兵】在前方顶住密集箭雨，关羽斩杀敌方前锋，迅速击溃敌阵！",
      recommendedUnits: ["infantry", "guanyu", "cavalry"]
    },
    introDialogs: [
      { speaker: "太史慈", avatar: "🏹", role: "东莱太史慈", text: "刘使君！北海孔融大人危在旦夕，特派慈单骑突围求援！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "平原相", text: "孔北海乃当世名士，备岂能坐视不理！二弟三弟，速发精兵解北海之围！", side: "left" },
      { speaker: "管亥", avatar: "🦹", role: "黄巾大帅", text: "刘备小儿也敢来送死！小的们，给我放箭！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "关羽", avatar: "🐉", role: "美髯公", text: "贼首管亥已被关某斩杀！北海之围已解！", side: "left" },
      { speaker: "孔融", avatar: "📜", role: "北海太守", text: "多谢刘使君仁义相救！刘使君真乃当世仁君也！", side: "left" }
    ]
  },
  {
    id: 4,
    era: 1,
    name: "徐州救援",
    title: "【第四章】徐州救援 · 陶谦三让徐州牧",
    subtitle: "公元194年 · 曹操大军征徐州，陶谦求救，刘玄德进驻徐州安民！",
    objective: { type: "defend_time", targetTimeSeconds: 70, label: "据险固守", desc: "坚守徐州要塞 70 秒！" },
    recruitHeroId: "xiahoudun",
    recruitHeroIds: ["xiahoudun"],
    enemyName: "曹魏先锋曹仁",
    enemyTitle: "曹营前线坚垒",
    enemyAvatar: "⚔️",
    castleHp: 2200,
    enemyGoldRate: 15,
    rewardSilver: 300,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "曹魏重甲先锋、铁壁阵型",
      strategyTip: "曹仁大军连续波次冲阵！前排以【坚盾步兵】吸收伤害，【重甲铁骑】与张飞紧密配合，坚守 70 秒即可退敌！",
      recommendedUnits: ["catapult", "zhangfei", "infantry"]
    },
    introDialogs: [
      { speaker: "陶谦", avatar: "📜", role: "徐州刺史", text: "曹公兵临徐州，老朽年迈无力抵挡，恳请玄德公救徐州百姓！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "平原相", text: "备定当尽心竭力，保徐州一境平安！", side: "left" },
      { speaker: "曹仁", avatar: "⚔️", role: "曹魏名将", text: "刘备！休要多管闲事，看我曹军精锐踏平徐州！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "陶谦", avatar: "📜", role: "徐州刺史", text: "玄德公仁德无双！老朽愿将徐州牌印相托，万望玄德公莫要推辞！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "徐州牧", text: "备定当整肃军纪，安抚黎民百姓！", side: "left" }
    ]
  },
  {
    id: 5,
    era: 1,
    name: "辕门射戟",
    title: "【第五章】辕门射戟 · 吕奉先智解危局",
    subtitle: "公元196年 · 袁术大将纪灵引兵击刘备，吕布于辕门射戟化解干戈！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_jiling", targetBossName: "淮南大将纪灵", label: "阵前破敌", desc: "阵前斩杀淮南大将纪灵！" },
    recruitHeroId: "jiling",
    recruitHeroIds: ["jiling"],
    enemyName: "淮南大将纪灵",
    enemyTitle: "袁术十万大军",
    enemyAvatar: "🛡️",
    castleHp: 2400,
    enemyGoldRate: 15,
    rewardSilver: 320,
    rewardGoldIngot: 35,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "淮南精锐重步兵、三尖刀亲卫队",
      strategyTip: "纪灵亲自督战！以【重甲铁骑】疾速冲撞撕裂其防线，关羽张飞集火直取纪灵首级！",
      recommendedUnits: ["cavalry", "bomb", "guanyu"]
    },
    introDialogs: [
      { speaker: "纪灵", avatar: "🛡️", role: "淮南上将", text: "奉袁公路主公之令，特来剿灭刘备！谁敢阻我三尖两刃刀！", side: "right" },
      { speaker: "张飞", avatar: "🐯", role: "燕人悍将", text: "纪灵匹夫！俺老张在此，且看你能走几合！", side: "left" },
      { speaker: "关羽", avatar: "🐉", role: "美髯公", text: "纪灵休得猖狂，关某大刀专斩狂妄之徒！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "纪灵", avatar: "🛡️", role: "淮南上将", text: "刘关张果然勇不可当……全军撤回淮南！", side: "right" },
      { speaker: "刘备", avatar: "👑", role: "徐州牧", text: "退去纪灵大军，徐州暂时稳固，速速积蓄军饷犒赏三军！", side: "left" }
    ]
  },
  {
    id: 6,
    era: 1,
    name: "白门终战",
    title: "【第六章】白门伏诛 · 曹刘联军平下邳",
    subtitle: "公元199年 · 吕布反目占据下邳，曹操与刘备联手水淹下邳生擒吕布！",
    objective: { type: "assassinate_boss", targetBossType: "lvbu", targetBossName: "战神狂暴吕布", label: "决战斩首", desc: "彻底击溃战神狂暴吕布！" },
    recruitHeroId: "dongzhuo",
    recruitHeroIds: ["dongzhuo","lvbu"],
    enemyName: "战神狂暴吕布",
    enemyTitle: "下邳坚固要塞",
    enemyAvatar: "assets/generals/lvbu_128.png",
    castleHp: 2700,
    enemyGoldRate: 16,
    rewardSilver: 350,
    rewardGoldIngot: 40,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "并州狼骑、狂暴飞将吕布",
      strategyTip: "第一纪元终极战役！吕布背水一战极具破坏力。必须以【💃 倾城妙策】控制其心碎 -25，刘关张合力集火阵斩吕布！",
      recommendedUnits: ["meirenji", "guanyu", "zhangfei", "catapult"]
    },
    introDialogs: [
      { speaker: "吕布", avatar: "🐯", role: "天下无双", text: "曹操、刘备！今日白门楼下，且让尔等见识天下第一的方天画戟！", side: "right" },
      { speaker: "刘备", avatar: "👑", role: "左将军", text: "奉先！你屡次背信弃义，今日天理昭彰，休怪我等不念旧情！", side: "left" },
      { speaker: "张飞", avatar: "🐯", role: "燕人悍将", text: "三姓家奴纳命来！今日定要分个高下！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "吕布", avatar: "🐯", role: "天下无双", text: "方天画戟折断……我吕奉先竟败于此地……", side: "right" },
      { speaker: "关羽", avatar: "🐉", role: "美髯公", text: "乱世枭雄伏诛！第一纪元天下纷争暂平，大业初现曙光！", side: "left" }
    ]
  },

  // ================= 📜 第二纪元：三分天下 · 鼎足之势 (公元200年 ~ 219年) =================
  {
    id: 7,
    era: 2,
    name: "白马斩将",
    title: "【第七章】白马坡前 · 关云长温酒斩颜良",
    subtitle: "公元200年 · 官渡前哨白马之战，关羽策马突刺，万军之中斩杀河北名将颜良！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_yanliang", targetBossName: "河北名将颜良", label: "万军斩首", desc: "策马突刺诛杀颜良！" },
    recruitHeroId: "yanliang",
    recruitHeroIds: ["yanliang"],
    enemyName: "河北名将颜良",
    enemyTitle: "袁绍先锋大营",
    enemyAvatar: "⚔️",
    castleHp: 2800,
    enemyGoldRate: 16,
    rewardSilver: 360,
    rewardGoldIngot: 40,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "河北重装精兵、大戟士大阵",
      strategyTip: "颜良麾下大戟士防御极高！派出【武圣关羽】释放青龙偃月斩 100% 破甲，万军丛中直取敌将首级！",
      recommendedUnits: ["guanyu", "infantry", "cavalry"]
    },
    introDialogs: [
      { speaker: "颜良", avatar: "⚔️", role: "河北名将", text: "我乃袁本初麾下第一大将颜良！谁敢上前受死！", side: "right" },
      { speaker: "关羽", avatar: "🐉", role: "汉寿亭侯", text: "吾观颜良，如插标卖首耳！关某去去便回！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "关羽", avatar: "🐉", role: "汉寿亭侯", text: "颜良首级已取！河北大军群龙无首，速破其营！", side: "left" }
    ]
  },
  {
    id: 8,
    era: 2,
    name: "延津诛将",
    title: "【第八章】延津之战 · 美髯公神威诛文丑",
    subtitle: "公元200年 · 袁绍遣名将文丑渡黄河追击，关云长飞马斩文丑，威震官渡！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_wenchou", targetBossName: "河北名将文丑", label: "渡口斩首", desc: "飞马斩落文丑！" },
    recruitHeroId: "wenchou",
    recruitHeroIds: ["wenchou","yuanshao"],
    enemyName: "河北名将文丑",
    enemyTitle: "延津渡口大寨",
    enemyAvatar: "🛡️",
    castleHp: 2900,
    enemyGoldRate: 16,
    rewardSilver: 380,
    rewardGoldIngot: 40,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "河北疾速骑兵队、渡口弓弩手",
      strategyTip: "文丑骑兵突击迅猛！前排以【坚盾步兵】吸收伤害，【重甲铁骑】与关羽形成合围夹击！",
      recommendedUnits: ["guanyu", "infantry", "cavalry"]
    },
    introDialogs: [
      { speaker: "文丑", avatar: "🛡️", role: "河北名将", text: "是谁斩了颜良兄长！纳命来！", side: "right" },
      { speaker: "关羽", avatar: "🐉", role: "汉寿亭侯", text: "关某在此！青龙偃月刀下，再添一亡魂！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "关羽", avatar: "🐉", role: "汉寿亭侯", text: "文丑亦已落马！袁绍河北大军丧胆！", side: "left" }
    ]
  },
  {
    id: 9,
    era: 2,
    name: "新野初捷",
    title: "【第九章】三顾茅庐 · 新野初出第一功",
    subtitle: "公元207年 · 刘备三顾茅庐请得诸葛孔明，博望坡初用奇计大破曹仁！",
    objective: { type: "destroy_castle", label: "破阵攻坚", desc: "攻破八门金锁大阵中军！" },
    recruitHeroId: "zhugeliang",
    recruitHeroIds: ["zhugeliang","pangtong"],
    enemyName: "征南将军曹仁",
    enemyTitle: "曹魏八门金锁大阵",
    enemyAvatar: "⚔️",
    castleHp: 3000,
    enemyGoldRate: 16,
    rewardSilver: 400,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "meirenji"],
    briefing: {
      enemyType: "八门金锁阵精锐、重甲铁卫",
      strategyTip: "曹仁摆下八门金锁阵！军师指点：从东南生门杀入，往正西景门杀出，阵法自破！",
      recommendedUnits: ["guanyu", "zhangfei", "bomb"]
    },
    introDialogs: [
      { speaker: "诸葛亮", avatar: "🪶", role: "卧龙军师", text: "主公，曹仁布八门金锁阵虽整齐，然中门缺乏策应。令云长、翼德直插生门，必获全胜！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "左将军", text: "得孔明如鱼得水！全军听从军师调遣！", side: "left" },
      { speaker: "曹仁", avatar: "⚔️", role: "征南将军", text: "此乃天下第一奇阵，看刘备如何破我大阵！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "张飞", avatar: "🐯", role: "万人敌", text: "哈哈！军师神机妙算，曹军阵脚全乱，大败而逃！", side: "left" },
      { speaker: "诸葛亮", avatar: "🪶", role: "卧龙军师", text: "初出茅庐第一功！主公速整顿军备，大敌曹操将至！", side: "left" }
    ]
  },
  {
    id: 10,
    era: 2,
    name: "长坂救主",
    title: "【第十章】长坂坡前 · 子龙单骑救幼主",
    subtitle: "公元208年 · 曹军虎豹骑南下，赵子龙七进七出，张翼德当阳断喝！",
    objective: { type: "defend_time", targetTimeSeconds: 75, label: "断后掩护", desc: "抵御曹魏精锐追击 75 秒！" },
    recruitHeroId: "zhaoyun",
    recruitHeroIds: ["zhaoyun","zhangliao"],
    enemyName: "曹魏五千虎豹骑",
    enemyTitle: "曹营先锋大寨",
    enemyAvatar: "⚔️",
    castleHp: 3200,
    enemyGoldRate: 17,
    rewardSilver: 420,
    rewardGoldIngot: 45,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "meirenji"], // 正式解锁赵云！
    briefing: {
      enemyType: "曹魏精锐虎豹骑、重装冲锋队",
      strategyTip: "长坂坡危急！赵子龙将军自带【七进七出 · 龙枪突刺】群体击飞；配合投石车与坚盾坚守 75 秒抵挡追兵！",
      recommendedUnits: ["zhaoyun", "infantry", "bomb"]
    },
    introDialogs: [
      { speaker: "曹纯", avatar: "⚔️", role: "虎豹骑统领", text: "丞相有令，生擒刘备！前排铁骑给我全速冲锋破阵！", side: "right" },
      { speaker: "赵云", avatar: "⚡", role: "常胜将军", text: "吾乃常山赵子龙也！怀抱幼主，长枪所向，何惧千军万马！", side: "left" },
      { speaker: "诸葛亮", avatar: "🪶", role: "卧龙军师", text: "子龙一身都是胆！翼德速去当阳桥接应，后方投石车密集抛射阻截追兵！", side: "left" },
      { speaker: "张飞", avatar: "🐯", role: "万人敌", text: "俺老张在长坂桥头候着！曹贼谁敢过来，立叫他死于矛下！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "刘备", avatar: "👑", role: "左将军", text: "子龙单骑救主，安然突围！翼德桥头喝退曹军，真乃万夫莫当！", side: "left" },
      { speaker: "诸葛亮", avatar: "🪶", role: "卧龙军师", text: "主公，此战已稳住阵脚。速联东吴，共图赤壁破曹大计！", side: "left" }
    ]
  },
  {
    id: 11,
    era: 2,
    name: "赤壁鏖战",
    title: "【第十一章】赤壁鏖战 · 孔明登坛借东风",
    subtitle: "公元208年冬 · 孙刘联军抗曹，诸葛孔明借东南大风火烧赤壁连环寨！",
    objective: { type: "destroy_castle", label: "水陆大捷", desc: "火烧赤壁攻克曹军连环水寨！" },
    recruitHeroId: "zhouyu",
    recruitHeroIds: ["zhouyu","sunce","ganning","huanggai"],
    enemyName: "曹操八十万水陆大军",
    enemyTitle: "赤壁连环水寨",
    enemyAvatar: "🏴",
    castleHp: 3500,
    enemyGoldRate: 18,
    rewardSilver: 450,
    rewardGoldIngot: 50,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "zhuge_ult", "meirenji"], // 解锁诸葛火风！
    briefing: {
      enemyType: "水陆重装步兵、巨型铁甲战船",
      strategyTip: "曹军战船铁锁连环！积攒军费施放【🔥 诸葛火风】，东南狂风呼啸而起，全屏烈焰焚烧连环寨，瞬间重创全场敌军！",
      recommendedUnits: ["zhuge_ult", "catapult", "cavalry"]
    },
    introDialogs: [
      { speaker: "曹操谋士", avatar: "🐺", role: "魏军军师", text: "我军战船铁索连环如履平地，江南江东，尽在丞相掌控之中！", side: "right" },
      { speaker: "诸葛亮", avatar: "🪶", role: "卧龙军师", text: "万事俱备，只欠东风！南屏山前借得东南风起，烈火定叫曹贼灰飞烟灭！", side: "left" },
      { speaker: "周瑜", avatar: "🏹", role: "东吴大都督", text: "孔明真神人也！东风已至，全军点火，火烧赤壁！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "诸葛亮", avatar: "🪶", role: "卧龙军师", text: "樯橹灰飞烟灭！曹军大势已去，天下三分大势底定！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "汉中王", text: "赤壁大捷！三军威震华夏，进军荆益两州，开创基业！", side: "left" }
    ]
  },
  {
    id: 12,
    era: 2,
    name: "西川入蜀",
    title: "【第十二章】西川入蜀 · 庞士元雒城定益州",
    subtitle: "公元214年 · 刘备进军益州，军师庞统智算雒城，击退西川名将张任！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_zhangren", targetBossName: "西川名将张任", label: "险关斩将", desc: "击溃西川名将张任！" },
    recruitHeroId: "machao",
    recruitHeroIds: ["machao","zhangren"],
    enemyName: "西川名将张任",
    enemyTitle: "雒城险要关隘",
    enemyAvatar: "🛡️",
    castleHp: 3600,
    enemyGoldRate: 18,
    rewardSilver: 460,
    rewardGoldIngot: 50,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "zhuge_ult", "meirenji"],
    briefing: {
      enemyType: "蜀道险隘守军、连弩强弓营",
      strategyTip: "张任善于设伏。以【大将赵云】突前破阵，【投石巨车】远距离轰破雒城险关！",
      recommendedUnits: ["zhaoyun", "catapult", "infantry"]
    },
    introDialogs: [
      { speaker: "张任", avatar: "🛡️", role: "益州大都督", text: "忠臣岂肯事二主！雒城险要在此，刘备休想迈进成都一步！", side: "right" },
      { speaker: "赵云", avatar: "⚡", role: "常胜将军", text: "刘皇叔仁义播于四海，张将军何不早降！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "益州牧", text: "全军将士破关安民，入据天府之国！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "刘备", avatar: "👑", role: "益州牧", text: "益州平定！沃野千里，民殷国富，大业基石已稳！", side: "left" }
    ]
  },
  {
    id: 13,
    era: 2,
    name: "定军扬威",
    title: "【第十三章】定军扬威 · 老将黄忠斩夏侯",
    subtitle: "公元219年 · 汉中争夺战，老将黄忠居高临下斩杀曹魏名将夏侯渊！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_xiahouyuan", targetBossName: "征西将军夏侯渊", label: "居高射斩", desc: "居高临下射斩夏侯渊！" },
    recruitHeroId: "huangzhong",
    recruitHeroIds: ["huangzhong","xiahouyuan","xuchu"],
    enemyName: "征西将军夏侯渊",
    enemyTitle: "定军山天险堡垒",
    enemyAvatar: "🛡️",
    castleHp: 3800,
    enemyGoldRate: 18,
    rewardSilver: 480,
    rewardGoldIngot: 55,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "zhuge_ult", "meirenji"], // 解锁黄忠！
    briefing: {
      enemyType: "定军山精锐弓箭营、重甲虎卫",
      strategyTip: "【🏹 老将黄忠】领命出战！黄忠将军拥有 360 超远距离狙击射程，在山头以逸待劳，配合投石巨车轰破要塞！",
      recommendedUnits: ["huangzhong", "catapult", "zhaoyun"]
    },
    introDialogs: [
      { speaker: "夏侯渊", avatar: "🛡️", role: "征西将军", text: "吾乃妙才夏侯渊！定军山天险在此，尔等休想踏进汉中半步！", side: "right" },
      { speaker: "黄忠", avatar: "🏹", role: "老将黄忠", text: "哈哈！老夫虽年过六旬，手中宝弓大刀依然能斩天下名将！", side: "left" },
      { speaker: "法正", avatar: "📜", role: "蜀汉军师", text: "夏侯渊轻而无谋。主公，令黄忠将军抢占山头高处，以逸待劳，一战可定！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "黄忠", avatar: "🏹", role: "老将黄忠", text: "老夫大刀已将夏侯渊斩于马下！定军山已入我军之手！", side: "left" },
      { speaker: "刘备", avatar: "👑", role: "汉中王", text: "老将军勇冠三军！汉中全境平定，大业可期！", side: "left" }
    ]
  },
  {
    id: 14,
    era: 2,
    name: "威震华夏",
    title: "【第十四章】水淹七军 · 武圣威震大华夏",
    subtitle: "公元219年 · 关羽北伐襄樊，掘汉江之水水淹七军，生擒于禁斩庞德！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_pangde", targetBossName: "白马将军庞德", label: "水淹七军", desc: "生擒并击破白马将军庞德！" },
    recruitHeroId: "weiyan",
    recruitHeroIds: ["weiyan","dianwei","pangde"],
    enemyName: "左将军于禁与庞德",
    enemyTitle: "樊城曹魏大营",
    enemyAvatar: "🌊",
    castleHp: 4000,
    enemyGoldRate: 19,
    rewardSilver: 500,
    rewardGoldIngot: 55,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "zhuge_ult", "meirenji"],
    briefing: {
      enemyType: "曹魏七军重装铠甲军、抬棺死士",
      strategyTip: "第二纪元巅峰！庞德抬棺死战。利用【武圣关羽】青龙偃月刀大范围破甲斩，配合全军推进一举瓦解樊城曹军！",
      recommendedUnits: ["guanyu", "zhaoyun", "catapult"]
    },
    introDialogs: [
      { speaker: "庞德", avatar: "⚔️", role: "白马将军", text: "我抬棺出战，誓与关羽决一死战！", side: "right" },
      { speaker: "关羽", avatar: "🐉", role: "前将军", text: "关某纵横天下数十载，何惧汝等鼠辈！汉江水起，看水淹七军！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "关羽", avatar: "🐉", role: "前将军", text: "七军全没，于禁投降！威震华夏，威名千古！", side: "left" }
    ]
  },

  // ================= 📜 第三纪元：北伐中原 · 鞠躬尽瘁 (公元221年 ~ 234年) =================
  {
    id: 15,
    era: 3,
    name: "猇亭激战",
    title: "【第十五章】猇亭之战 · 八百里连营抗东吴",
    subtitle: "公元222年 · 夷陵之战，刘备为关羽报仇亲征东吴，与陆逊决战猇亭！",
    objective: { type: "destroy_castle", label: "水陆激战", desc: "突破东吴水陆连环阵营！" },
    recruitHeroId: "sunquan",
    recruitHeroIds: ["sunquan","luxun","lvmeng","zhoutai","lusu"],
    enemyName: "东吴大都督陆逊",
    enemyTitle: "东吴火攻水陆大阵",
    enemyAvatar: "🔥",
    castleHp: 4200,
    enemyGoldRate: 19,
    rewardSilver: 520,
    rewardGoldIngot: 60,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "zhuge_ult", "meirenji"],
    briefing: {
      enemyType: "东吴火羽神射营、艨艟突击队",
      strategyTip: "陆逊善用火攻！前排以【坚盾步兵】吸收箭矢，【大将赵云】单骑救驾冲锋突入敌阵！",
      recommendedUnits: ["zhaoyun", "infantry", "bomb"]
    },
    introDialogs: [
      { speaker: "陆逊", avatar: "🏹", role: "大都督", text: "刘备连营八百里，犯兵家大忌！今日东吴火攻，定破蜀军！", side: "right" },
      { speaker: "赵云", avatar: "⚡", role: "常胜将军", text: "有赵子龙在此，谁敢伤我主公分毫！长枪破阵！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "刘备", avatar: "👑", role: "昭烈皇帝", text: "子龙救驾突围！白帝城托孤于丞相，蜀汉大业寄于孔明！", side: "left" }
    ]
  },
  {
    id: 16,
    era: 3,
    name: "平定南蛮",
    title: "【第十六章】七擒孟获 · 诸葛南征平蛮王",
    subtitle: "公元225年 · 诸葛亮南征平定南中，七擒七纵蛮王孟获，收服人心！",
    objective: { type: "assassinate_boss", targetBossType: "enemy_boss_menghuo", targetBossName: "南蛮大王孟获", label: "七擒七纵", desc: "阵前生擒蛮王孟获！" },
    recruitHeroId: "jiangwei",
    recruitHeroIds: ["jiangwei","menghuo"],
    enemyName: "南蛮大王孟获",
    enemyTitle: "南蛮藤甲象兵大寨",
    enemyAvatar: "🐘",
    castleHp: 4400,
    enemyGoldRate: 20,
    rewardSilver: 550,
    rewardGoldIngot: 60,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "zhuge_ult", "meirenji"],
    briefing: {
      enemyType: "南蛮藤甲军、巨象冲撞战阵",
      strategyTip: "藤甲兵刀枪不入唯独怕火！使用【🔥 诸葛火风】全屏烈焰焚烧藤甲，再以赵云冲破象兵大营！",
      recommendedUnits: ["zhuge_ult", "zhaoyun", "catapult"]
    },
    introDialogs: [
      { speaker: "孟获", avatar: "🐘", role: "南蛮蛮王", text: "我南蛮勇士身穿藤甲、骑乘巨象，诸葛孔明休想让我降服！", side: "right" },
      { speaker: "诸葛亮", avatar: "🪶", role: "蜀汉丞相", text: "攻心为上，攻城为下！今日借烈火破你藤甲，看你服也不服！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "孟获", avatar: "🐘", role: "南蛮蛮王", text: "丞相天威，南人不复反矣！愿永世归顺蜀汉！", side: "right" },
      { speaker: "诸葛亮", avatar: "🪶", role: "蜀汉丞相", text: "南中平定，后方无忧！传令全军休整，准备上表出师，北伐中原！", side: "left" }
    ]
  },
  {
    id: 17,
    era: 3,
    name: "祁山六出",
    title: "【第十七章】出师北伐 · 祁山六出破曹魏",
    subtitle: "公元228年 · 诸葛孔明受命出师，六出祁山北伐中原，克复汉室！",
    objective: { type: "defend_time", targetTimeSeconds: 80, label: "据险固守", desc: "扼守祁山要塞 80 秒！" },
    recruitHeroId: "simayi",
    recruitHeroIds: ["simayi","guojia","caoren"],
    enemyName: "魏大将军曹真",
    enemyTitle: "祁山防线重镇",
    enemyAvatar: "🛡️",
    castleHp: 4600,
    enemyGoldRate: 20,
    rewardSilver: 580,
    rewardGoldIngot: 65,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "zhuge_ult", "meirenji"],
    briefing: {
      enemyType: "曹魏精锐禁卫虎卫军、重型连弩投石车",
      strategyTip: "祁山天险坚固！利用【老将黄忠】百步穿杨狙击敌方守将，配合【投石巨车】轰碎其重重工事！",
      recommendedUnits: ["huangzhong", "catapult", "zhaoyun"]
    },
    introDialogs: [
      { speaker: "诸葛亮", avatar: "🪶", role: "蜀汉丞相", text: "先帝创业未半而中道崩殂。今天下三分，益州疲弊，此诚危急存亡之秋也！今当北定中原，兴复汉室！", side: "left" },
      { speaker: "曹真", avatar: "🛡️", role: "魏大将军", text: "诸葛孔明劳师远征，祁山重镇固若金汤，尔等必无功而返！", side: "right" }
    ],
    victoryDialogs: [
      { speaker: "赵云", avatar: "⚡", role: "镇东将军", text: "祁山防线已被我军攻破！曹真大军后撤！进军五丈原！", side: "left" }
    ]
  },
  {
    id: 18,
    era: 3,
    name: "五丈终决",
    title: "【第十八章】五丈决战 · 孔明智斗司马懿",
    subtitle: "公元234年 · 诸葛孔明与司马懿展开巅峰终极对决，智谋决出天下一统！",
    objective: { type: "destroy_castle", label: "天下一统", desc: "攻破渭水终极铁壁大营！" },
    recruitHeroId: "caocao",
    recruitHeroIds: ["caocao"],
    enemyName: "曹魏太尉司马懿",
    enemyTitle: "渭水终极铁壁大营",
    enemyAvatar: "🐺",
    castleHp: 5000,
    enemyGoldRate: 22,
    rewardSilver: 650,
    rewardGoldIngot: 80,
    allowedGeneralCards: ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "zhuge_ult", "meirenji"],
    briefing: {
      enemyType: "魏军终极铁甲禁卫军、连环滚石陷阱、神机重炮",
      strategyTip: "终极巅峰决战！司马懿坚壁清野全科技加持！全名将配合【诸葛火风】与【神兵装备】，砸破渭水大营，完成天下一统！",
      recommendedUnits: ["zhaoyun", "guanyu", "zhuge_ult", "catapult", "cavalry"]
    },
    introDialogs: [
      { speaker: "司马懿", avatar: "🐺", role: "曹魏太尉", text: "诸葛孔明，千里劳师远征！我军深沟高垒，坚守不战，看你能耐我何！", side: "right" },
      { speaker: "诸葛亮", avatar: "🪶", role: "蜀汉丞相", text: "司马公，鞠躬尽瘁，死而后已！今日神机妙算，定当克复中原！", side: "left" },
      { speaker: "赵云", avatar: "⚡", role: "常胜将军", text: "全军将士听令，随丞相出征，开创太平盛世！冲锋！", side: "left" }
    ],
    victoryDialogs: [
      { speaker: "司马懿", avatar: "🐺", role: "曹魏太尉", text: "诸葛孔明真天下奇才也！我军不及，天下归一矣！", side: "right" },
      { speaker: "诸葛亮", avatar: "🪶", role: "蜀汉丞相", text: "天下一统，四海升平！百姓安居乐业！功在千秋！🎉", side: "left" }
    ]
  }
];

// 四大势力专属历史战役总库 (四大阵营独立编年史)
export const FACTION_CAMPAIGNS = {
  shu: STORY_CHAPTERS,
  wei: WEI_CHAPTERS,
  wu: WU_CHAPTERS,
  qun: QUN_CHAPTERS
};

export { FACTION_INFOS };

// 萌将图鉴档案库 (四大阵营 · 40大名将全景收录)
export const GENERALS_ARCHIVE = [
  // ================= 🟢 蜀汉阵营 (10位) =================
  {
    id: "liubei",
    name: "主公刘备",
    camp: "shu",
    title: "汉室宗亲 · 仁德之风",
    icon: "👑",
    image: "assets/generals/liubei_128.png",
    cost: 180,
    hp: 450,
    atk: 48,
    speed: "稳健 (1.1)",
    range: "双剑 (45)",
    feature: "专属光环【仁德之风】：刘备在场时，全军士兵攻击力 +15%，移速 +10%",
    counter: "全军增益核心辅助主帅",
    story: "汉景帝之子中山靖王之后，桃园结义，以仁义得天下人心！"
  },
  {
    id: "guanyu",
    name: "武圣关羽",
    camp: "shu",
    title: "威震华夏 · 青龙破阵",
    icon: "🐉",
    image: "assets/generals/guanyu_128.png",
    cost: 210,
    hp: 580,
    atk: 70,
    speed: "勇猛 (1.3)",
    range: "偃月刀 (55)",
    feature: "专属神技【青龙偃月斩】：普攻 100% 破甲，释放青龙刀气重创前方直线敌军",
    counter: "最强前排攻坚破甲武圣",
    story: "美髯公关云长，过五关斩六将，水淹七军威震华夏！"
  },
  {
    id: "zhangfei",
    name: "万人敌张飞",
    camp: "shu",
    title: "当阳断喝 · 燕人咆哮",
    icon: "🐯",
    image: "assets/generals/zhangfei_128.png",
    cost: 195,
    hp: 540,
    atk: 65,
    speed: "狂暴 (1.4)",
    range: "丈八蛇矛 (50)",
    feature: "专属神技【当阳燕人吼】：每隔一段时间发出怒吼震退群体敌军并眩晕 1.2 秒",
    counter: "强力群控打断与破阵猛将",
    story: "燕人张翼德，长坂桥头一声断喝，吓退曹操百万大军，吼断当阳桥！"
  },
  {
    id: "zhaoyun",
    name: "常胜赵云",
    camp: "shu",
    title: "常胜将军 · 七进七出",
    icon: "⚡",
    image: "assets/generals/zhaoyun_128.png",
    cost: 200,
    hp: 500,
    atk: 60,
    speed: "迅猛 (1.5)",
    range: "长枪 (50)",
    feature: "专属神技【龙枪突刺】：向前猛冲突进横扫群体敌军，造成大范围击飞",
    counter: "全能主力英雄，能抗能打能破阵",
    story: "常山赵子龙，白袍银铠，长枪若游龙戏水，长坂坡前单骑救主，勇冠三军！"
  },
  {
    id: "zhugeliang",
    name: "卧龙诸葛亮",
    camp: "shu",
    title: "神机妙算 · 八卦奇门",
    icon: "🪶",
    image: "assets/generals/zhugeliang_128.png",
    cost: 220,
    hp: 420,
    atk: 75,
    speed: "神算 (1.0)",
    range: "法杖羽扇 (280)",
    feature: "专属神技【奇门八卦】：召唤神风烈焰焚烧敌营，全场迟缓敌军并造成大范围法术重创",
    counter: "天下第一顶级谋士群控",
    story: "躬耕于南阳，卧龙凤雏之首！羽扇纶巾，谈笑间樯橹灰飞烟灭！"
  },
  {
    id: "pangtong",
    name: "凤雏庞统",
    camp: "shu",
    title: "连环铁锁 · 智定乾坤",
    icon: "🕊️",
    image: "assets/generals/pangtong_128.png",
    cost: 190,
    hp: 390,
    atk: 50,
    speed: "从容 (0.9)",
    range: "法杖 (260)",
    feature: "专属神技【连环铁锁】：将多名敌军链锁，受到攻击时传递 25% 伤害",
    counter: "群体链式增伤核心军师",
    story: "卧龙凤雏得一可安天下！庞统献连环计破曹操，计定西川！"
  },
  {
    id: "huangzhong",
    name: "老将黄忠",
    camp: "shu",
    title: "老当益壮 · 百步穿杨",
    icon: "🏹",
    image: "assets/generals/huangzhong_128.png",
    cost: 185,
    hp: 380,
    atk: 55,
    speed: "沉着 (1.0)",
    range: "宝雕弓 (360)",
    feature: "专属神技【百步穿杨】：超远距离精准阻击，暴击率高，定点狙杀敌方后排",
    counter: "超远距离狙杀敌军高威胁目标",
    story: "五虎上将之一，定军山下老当益壮，斩杀曹魏名将夏侯渊！"
  },
  {
    id: "machao",
    name: "锦马超",
    camp: "shu",
    title: "神威天将 · 铁骑狂飙",
    icon: "🐎",
    image: "assets/generals/machao_128.png",
    cost: 215,
    hp: 520,
    atk: 68,
    speed: "极速 (2.4)",
    range: "虎头湛金枪 (50)",
    feature: "专属神技【西凉狂飙】：疾风冲锋击撞造成 160% 践踏重创与击飞",
    counter: "极速撕裂敌军防线与后排阵型",
    story: "西凉锦马超，狮盔银铠，勇武过人，人称神威天将军！"
  },
  {
    id: "weiyan",
    name: "狂骨魏延",
    camp: "shu",
    title: "嗜血狂战 · 勇猛反击",
    icon: "⚖️",
    image: "assets/generals/weiyan_128.png",
    cost: 190,
    hp: 560,
    atk: 62,
    speed: "凶猛 (1.2)",
    range: "狂战大刀 (45)",
    feature: "专属神技【狂骨嗜血】：受到伤害时狂暴反击，攻击附带 15% 生命吸血",
    counter: "强力持久近战绞肉核心",
    story: "蜀汉镇远将军、汉中太守，勇猛过人，善养士卒，战功赫赫！"
  },
  {
    id: "jiangwei",
    name: "幼麟姜维",
    camp: "shu",
    title: "九伐中原 · 文武双全",
    icon: "⚔️",
    image: "assets/generals/jiangwei_128.png",
    cost: 205,
    hp: 510,
    atk: 58,
    speed: "果敢 (1.3)",
    range: "麒麟枪 (50)",
    feature: "专属神技【文武麒麟刺】：向前挥出大范围麒麟剑气破阵，提升附近友军护甲",
    counter: "攻防一体的全能后期大将",
    story: "天水麒麟儿，得诸葛孔明毕生所学，九伐中原，鞠躬尽瘁！"
  },

  // ================= 🔵 东吴阵营 (10位) =================
  {
    id: "sunquan",
    name: "东吴大帝孙权",
    camp: "wu",
    title: "坐断东南 · 碧眼吴主",
    icon: "👑",
    image: "assets/generals/sunquan_128.png",
    cost: 200,
    hp: 520,
    atk: 50,
    speed: "稳重 (1.1)",
    range: "宝剑 (45)",
    feature: "专属光环【坐断东南】：友军城寨与前哨护甲 +15%，全军移速 +8%",
    counter: "据险守备与全军机动核心",
    story: "生子当如孙仲谋！十九岁继领江东，据险守江，开辟东吴帝业！"
  },
  {
    id: "sunce",
    name: "小霸王孙策",
    camp: "wu",
    title: "江东霸王 · 勇冠三军",
    icon: "🐯",
    image: "assets/generals/sunce_128.png",
    cost: 220,
    hp: 560,
    atk: 72,
    speed: "霸勇 (2.0)",
    range: "霸王枪 (50)",
    feature: "专属神技【霸王冲阵】：开局获得 120 点冲锋护盾，暴烈突刺击退群体敌军",
    counter: "极速破阵先锋与强力单挑猛将",
    story: "江东小霸王孙策，带三尺剑创江东基业，所向披靡！"
  },
  {
    id: "zhouyu",
    name: "美周郎周瑜",
    camp: "wu",
    title: "烈火赤壁 · 江东都督",
    icon: "🔥",
    image: "assets/generals/zhouyu_128.png",
    cost: 230,
    hp: 440,
    atk: 78,
    speed: "儒雅 (1.0)",
    range: "羽扇火令 (270)",
    feature: "专属神技【赤壁烈火】：召唤滔天火海点燃敌阵，每秒造成真实灼烧伤害",
    counter: "群体火法毁灭爆发核心",
    story: "遥想公瑾当年，小乔初嫁了，羽扇纶巾，谈笑间樯橹灰飞烟灭！"
  },
  {
    id: "lusu",
    name: "谋主鲁肃",
    camp: "wu",
    title: "榻上经纬 · 忠厚长者",
    icon: "📜",
    image: "assets/generals/lusu_128.png",
    cost: 180,
    hp: 430,
    atk: 46,
    speed: "宽和 (1.0)",
    range: "竹简法杖 (250)",
    feature: "专属光环【合纵抗曹】：每 15 秒为全军提供 10% 伤害减免护盾",
    counter: "防守反击与资源调度军师",
    story: "东吴大都督，榻上策定天下三分，促成孙刘联盟大破曹军！"
  },
  {
    id: "lvmeng",
    name: "虎威吕蒙",
    camp: "wu",
    title: "白衣渡江 · 智勇双全",
    icon: "⚔️",
    image: "assets/generals/lvmeng_128.png",
    cost: 195,
    hp: 500,
    atk: 60,
    speed: "机敏 (1.2)",
    range: "短刀长佩 (48)",
    feature: "专属神技【渡江突刺】：忽视目标 20% 护甲，背刺暴击率提升 25%",
    counter: "破防穿甲与战术潜行杀手",
    story: "士别三日当刮目相看！白衣渡江奇袭荆州，威震华夏！"
  },
  {
    id: "luxun",
    name: "儒将陆逊",
    camp: "wu",
    title: "连营烈火 · 白面都督",
    icon: "🪶",
    image: "assets/generals/luxun_128.png",
    cost: 210,
    hp: 460,
    atk: 66,
    speed: "从容 (1.1)",
    range: "连营剑令 (260)",
    feature: "专属神技【火烧连营】：使敌军陷入泥潭迟缓 40%，引爆连环火势",
    counter: "强力减速迟滞与连环火攻",
    story: "夷陵之战火烧连营八百里，一战成名，社稷之臣！"
  },
  {
    id: "ganning",
    name: "锦帆甘宁",
    camp: "wu",
    title: "百骑劫营 · 锦帆游侠",
    icon: "🏹",
    image: "assets/generals/ganning_128.png",
    cost: 205,
    hp: 510,
    atk: 68,
    speed: "极速 (2.1)",
    range: "双戟飞索 (45)",
    feature: "专属神技【百骑突袭】：越过敌前排直扑后方弓手，暴击率提升 15%",
    counter: "后排射手与攻城器械克星",
    story: "孟德有张辽，孤有甘兴霸！百骑劫魏营，谈笑凯歌还！"
  },
  {
    id: "taishici",
    name: "太史慈",
    camp: "wu",
    title: "箭无虚发 · 双戟神射",
    icon: "🏹",
    image: "assets/generals/taishici_128.png",
    cost: 175,
    hp: 440,
    atk: 52,
    speed: "矫健 (1.1)",
    range: "双戟飞箭 (250)",
    feature: "专属神技【流星连弩】：快速连射 5 支追风破甲箭，压制敌方推进",
    counter: "中距离高频物理压制",
    story: "东莱太史慈，弓马熟练，箭无虚发，北海单骑突围威震天下！"
  },
  {
    id: "zhoutai",
    name: "浴血周泰",
    camp: "wu",
    title: "不屈肉盾 · 舍生护主",
    icon: "🛡️",
    image: "assets/generals/zhoutai_128.png",
    cost: 190,
    hp: 600,
    atk: 54,
    speed: "死斗 (1.1)",
    range: "破刃大刀 (45)",
    feature: "专属神技【不屈战魂】：生命低于 30% 时受击伤害降低 25%，吸血提升 15%",
    counter: "残血极限抗伤第一金刚盾",
    story: "身被数十创犹奋勇死战，为护孙权浴血不屈，江东第一虎臣！"
  },
  {
    id: "huanggai",
    name: "赤壁黄盖",
    camp: "wu",
    title: "苦肉丹心 · 先登火船",
    icon: "⚓",
    image: "assets/generals/huanggai_128.png",
    cost: 170,
    hp: 520,
    atk: 50,
    speed: "勇毅 (1.2)",
    range: "铁鞭火矢 (45)",
    feature: "专属神技【火船先登】：对敌方城池要塞造成额外 20% 爆破伤害，阵亡留存火海",
    counter: "要塞攻坚与战役死士特化",
    story: "赤壁之战行苦肉大计，引火船焚尽曹瞒百万舟师！"
  },

  // ================= 🔴 曹魏阵营 (10位) =================
  {
    id: "caocao",
    name: "魏武帝曹操",
    camp: "wei",
    title: "乱世枭雄 · 唯才是举",
    icon: "👑",
    image: "assets/generals/caocao_128.png",
    cost: 250,
    hp: 680,
    atk: 65,
    speed: "威仪 (1.1)",
    range: "倚天剑 (50)",
    feature: "专属神技【短歌行】：全军攻击力提升 15%，并召唤虎豹骑先锋突击",
    counter: "霸气全能君王统帅",
    story: "对酒当歌，人生几何！宁教我负天下人，休教天下人负我！"
  },
  {
    id: "simayi",
    name: "冢虎司马懿",
    camp: "wei",
    title: "深谋远虑 · 鹰视狼顾",
    icon: "🔮",
    image: "assets/generals/simayi_128.png",
    cost: 240,
    hp: 620,
    atk: 72,
    speed: "沉稳 (1.1)",
    range: "暗雷法杖 (280)",
    feature: "专属神技【狼顾天雷】：召唤暗紫劫雷轰杀全场，封印敌军战技 3 秒",
    counter: "超强暗系雷霆法术封印",
    story: "宣皇帝司马懿，隐忍待时，高平陵之变一举定乾坤！"
  },
  {
    id: "guojia",
    name: "鬼才郭嘉",
    camp: "wei",
    title: "十胜十败 · 天妒奇才",
    icon: "🔮",
    image: "assets/generals/guojia_128.png",
    cost: 205,
    hp: 380,
    atk: 74,
    speed: "清奇 (1.0)",
    range: "十胜算筹 (270)",
    feature: "专属神技【十胜奇策】：洞悉敌阵破绽，降低敌方全员 10% 护甲",
    counter: "破防减甲与谋略削弱核心",
    story: "郭嘉不死，便无赤壁！算无遗策，魏之奇佐也！"
  },
  {
    id: "xiahoudun",
    name: "独眼夏侯惇",
    camp: "wei",
    title: "拔矢啖睛 · 刚烈先锋",
    icon: "👁️",
    image: "assets/generals/xiahoudun_128.png",
    cost: 200,
    hp: 580,
    atk: 64,
    speed: "刚烈 (1.2)",
    range: "长刀 (48)",
    feature: "专属神技【刚烈反戈】：受近战伤害反弹 15% 物理真实伤害，攻速激增",
    counter: "肉盾防反与浴血狂暴猛将",
    story: "父精母血不可弃！拔矢啖睛，曹魏宗室第一元勋！"
  },
  {
    id: "xiahouyuan",
    name: "神速夏侯渊",
    camp: "wei",
    title: "千里奔袭 · 穿云飞箭",
    icon: "🏹",
    image: "assets/generals/xiahouyuan_128.png",
    cost: 195,
    hp: 480,
    atk: 60,
    speed: "神速 (1.8)",
    range: "神速雕弓 (300)",
    feature: "专属神技【虎步关右】：高速穿插奔袭，定点射击击退敌方先锋",
    counter: "极速游击拉扯与远程狙击",
    story: "典军校尉夏侯渊，三日五百，六日一千，虎步关右！"
  },
  {
    id: "zhangliao",
    name: "名将张辽",
    camp: "wei",
    title: "古之召虎 · 威震合肥",
    icon: "⚡",
    image: "assets/generals/zhangliao_128.png",
    cost: 215,
    hp: 550,
    atk: 68,
    speed: "陷阵 (1.6)",
    range: "月牙长戟 (50)",
    feature: "专属神技【威震逍遥津】：向前突入斩破敌阵，降低周围敌军 15% 攻速",
    counter: "破阵陷坚与全能冲锋统帅",
    story: "合肥逍遥津八百破十万，威震江东，张辽止啼！"
  },
  {
    id: "caoren",
    name: "征南曹仁",
    camp: "wei",
    title: "八门金锁 · 铁壁坚垒",
    icon: "🛡️",
    image: "assets/generals/caoren_128.png",
    cost: 190,
    hp: 620,
    atk: 52,
    speed: "如山 (1.0)",
    range: "金锁大盾 (40)",
    feature: "专属神技【不动金锁】：受到攻城巨石与箭矢伤害降低 25%",
    counter: "防御工事构筑与前沿阵地之锚",
    story: "曹仁字子孝，天渊勇力，镇守樊城据关羽水淹七军！"
  },
  {
    id: "dianwei",
    name: "古之恶来典韦",
    camp: "wei",
    title: "舍命死卫 · 双戟撼山",
    icon: "🪓",
    image: "assets/generals/dianwei_128.png",
    cost: 210,
    hp: 610,
    atk: 72,
    speed: "猛勇 (1.2)",
    range: "双铁大戟 (45)",
    feature: "专属神技【死战恶来】：掷出重铁大戟击晕敌军 0.8 秒，物理免伤 10%",
    counter: "强力单挑与贴身卫护大将",
    story: "宛城血战舍命护主，手提双戟，敌莫敢近！"
  },
  {
    id: "xuchu",
    name: "虎痴许褚",
    camp: "wei",
    title: "裸衣恶斗 · 狂力撼地",
    icon: "🔨",
    image: "assets/generals/xuchu_128.png",
    cost: 205,
    hp: 630,
    atk: 70,
    speed: "悍勇 (1.1)",
    range: "破山巨锤 (45)",
    feature: "专属神技【虎痴重锤】：重锤撼地击飞前方扇形敌兵，单挑受创减免 15%",
    counter: "重装群控与单挑近身霸主",
    story: "虎痴许褚，裸衣斗马超，勇力过人，号称虎侯！"
  },
  {
    id: "pangde",
    name: "白马庞德",
    camp: "wei",
    title: "抬棺决死 · 白马先锋",
    icon: "🐎",
    image: "assets/generals/pangde_128.png",
    cost: 195,
    hp: 570,
    atk: 66,
    speed: "决死 (1.3)",
    range: "截头大刀 (48)",
    feature: "专属神技【抬棺决死】：血量越低攻击力越高，濒死获得 3 秒减伤护盾",
    counter: "死斗绝境逆风反打猛将",
    story: "抬梓战关羽，白马将军勇武善射，死节不降！"
  },

  // ================= 🟡 群雄阵营 (10位) =================
  {
    id: "lvbu",
    name: "战神吕布",
    camp: "qun",
    title: "天下无双 · 狂暴飞将",
    icon: "👹",
    image: "assets/generals/lvbu_128.png",
    cost: 260,
    hp: 750,
    atk: 90,
    speed: "飞将 (1.6)",
    range: "方天画戟 (60)",
    feature: "专属神技【天下无双】：暴怒狂暴霸体横扫，残血修罗狂暴攻防爆发",
    counter: "终极战神，无人能单挑匹敌",
    story: "人中吕布，马中赤兔！手持方天画戟，头戴紫金连环冠，横行天下！"
  },
  {
    id: "diaochan",
    name: "绝世貂蝉",
    camp: "qun",
    title: "月下倾城 · 连环离间",
    icon: "💃",
    image: "assets/generals/diaochan_128.png",
    cost: 165,
    hp: 360,
    atk: 35,
    speed: "翩跹 (1.2)",
    range: "惊鸿彩绫 (240)",
    feature: "专属神技【倾城魅惑】：使全场敌兵短暂眩晕魅惑 1 秒，削弱敌将 15% 护甲",
    counter: "全屏软控与敌方减甲核心",
    story: "司徒妙计设连环，月下倾城解国难，千古第一奇女子！"
  },
  {
    id: "dongzhuo",
    name: "西凉董卓",
    camp: "qun",
    title: "西凉魔王 · 暴虐重甲",
    icon: "👹",
    image: "assets/generals/dongzhuo_128.png",
    cost: 220,
    hp: 720,
    atk: 58,
    speed: "重铠 (0.9)",
    range: "暴虐佩刀 (45)",
    feature: "专属神技【倒行逆施】：击杀敌兵转化为自身 50 点临时护盾",
    counter: "超厚血条步兵绞肉屠夫",
    story: "西凉魔王董卓，带甲数十万入京，倒行逆施，乱世之始！"
  },
  {
    id: "yuanshao",
    name: "本初袁绍",
    camp: "qun",
    title: "四世三公 · 河北盟主",
    icon: "👑",
    image: "assets/generals/yuanshao_128.png",
    cost: 190,
    hp: 530,
    atk: 50,
    speed: "矜重 (1.0)",
    range: "思召宝剑 (48)",
    feature: "专属光环【世族望威】：开局前 8 秒全军弓箭手射程增加 15%",
    counter: "弓手压制与开局先声夺人",
    story: "四世三公名门望族，十八路诸侯盟主，雄踞河北四州！"
  },
  {
    id: "yanliang",
    name: "名将颜良",
    camp: "qun",
    title: "河北勇冠 · 先锋斩将",
    icon: "⚔️",
    image: "assets/generals/yanliang_128.png",
    cost: 190,
    hp: 550,
    atk: 65,
    speed: "先锋 (1.3)",
    range: "重斩大刀 (50)",
    feature: "专属神技【霸刀重劈】：开局获得 100 点先锋霸体护盾，普攻附带破甲",
    counter: "开局冲阵撕裂敌前排肉盾",
    story: "河北名将颜良，勇冠三军，白马坡前连斩宋宪、魏续！"
  },
  {
    id: "wenchou",
    name: "名将文丑",
    camp: "qun",
    title: "河北虎威 · 铁骑重踏",
    icon: "🐎",
    image: "assets/generals/wenchou_128.png",
    cost: 190,
    hp: 540,
    atk: 64,
    speed: "狂突 (1.5)",
    range: "破阵长槊 (50)",
    feature: "专属神技【铁槊狂踏】：狂暴冲锋将步兵击退击飞，造成践踏伤害",
    counter: "破阵冲撞与步兵防线撕裂手",
    story: "延津之战神勇无双，独战公孙瓒、击退徐晃张辽，威震北国！"
  },
  {
    id: "jiling",
    name: "上将纪灵",
    camp: "qun",
    title: "淮南第一 · 三尖双刃",
    icon: "🛡️",
    image: "assets/generals/jiling_128.png",
    cost: 175,
    hp: 530,
    atk: 55,
    speed: "重甲 (1.1)",
    range: "三尖两刃 (50)",
    feature: "专属神技【三尖狂舞】：重装横扫格挡 20% 近战普攻",
    counter: "稳健近战防御肉盾",
    story: "袁术帐下头号大将，手握五十斤三尖两刃刀，威镇淮南！"
  },
  {
    id: "zhangren",
    name: "忠节张任",
    camp: "qun",
    title: "西川枪王 · 忠烈伏弩",
    icon: "🏹",
    image: "assets/generals/zhangren_128.png",
    cost: 185,
    hp: 490,
    atk: 56,
    speed: "刚毅 (1.2)",
    range: "伏击强弩 (260)",
    feature: "专属神技【落凤伏杀】：设伏射出致命冷箭，对骑兵造成 140% 穿透伤",
    counter: "骑兵克星与落凤设伏神箭",
    story: "老臣宁死不降！忠臣不事二主，雒城之战射杀庞统，名垂青史！"
  },
  {
    id: "menghuo",
    name: "蛮王孟获",
    camp: "qun",
    title: "南中霸主 · 巨象重践",
    icon: "🐘",
    image: "assets/generals/menghuo_128.png",
    cost: 210,
    hp: 760,
    atk: 54,
    speed: "象步 (0.9)",
    range: "巨木金瓜 (48)",
    feature: "专属神技【巨象践踏】：驭象重踏震退周围小兵，受到法术伤害降低 15%",
    counter: "超强抗法厚血重装前排",
    story: "七擒七纵心悦诚服！南蛮各部俯首听命，永不复反！"
  },
  {
    id: "zhangjiao",
    name: "天师张角",
    camp: "qun",
    title: "大贤良师 · 黄天雷暴",
    icon: "⚡",
    image: "assets/generals/zhangjiao_128.png",
    cost: 190,
    hp: 400,
    atk: 70,
    speed: "法驾 (1.0)",
    range: "九节天杖 (270)",
    feature: "专属神技【黄天当立】：召唤落雷电击范围敌兵，造成麻痹减速",
    counter: "群体电击麻痹群控法师",
    story: "苍天已死，黄天当立！岁在甲子，天下大吉！掀开三国乱世序幕！"
  },
  {
    id: "infantry",
    name: "坚盾步兵",
    title: "铜墙铁壁 · 前排肉盾",
    icon: "🛡️",
    cost: 50,
    hp: 130,
    atk: 18,
    speed: "中等 (1.1)",
    range: "近战 (35)",
    feature: "举盾防御：受到远程飞箭伤害减免 50%",
    counter: "克制弓手，被骑兵冲锋击飞",
    story: "手持精铁圆盾与短剑的小战士，纪律严明，是保护后排的核心基石！"
  },
  {
    id: "archer",
    name: "连弩弓手",
    title: "百步穿杨 · 高抛输出",
    icon: "🏹",
    cost: 75,
    hp: 75,
    atk: 15,
    speed: "平稳 (0.9)",
    range: "超远 (240)",
    feature: "穿甲箭矢：对重甲骑兵额外造成 25% 穿甲伤害",
    counter: "克制重骑兵，被近战步兵突脸",
    story: "汉军神射手，擅长高抛弧线射击，箭如雨下，提供强大火力！"
  },
  {
    id: "cavalry",
    name: "重甲铁骑",
    title: "千军破阵 · 疾速冲撞",
    icon: "🐎",
    cost: 120,
    hp: 190,
    atk: 35,
    speed: "疾速 (2.2)",
    range: "冲锋 (45)",
    feature: "破阵冲撞：冲锋击中步兵时附带击退与浮空效果",
    counter: "克制步兵阵线，被集火弓箭穿甲克制",
    story: "身披重铠的骑兵，战马飞驰如电，撕裂敌军防线的王牌利刃！"
  },
  {
    id: "catapult",
    name: "投石巨车",
    title: "攻城天降 · 巨石破寨",
    icon: "🚜",
    cost: 160,
    hp: 240,
    atk: 60,
    speed: "缓慢 (0.7)",
    range: "极远 (340)",
    feature: "攻城重创：投掷巨石对敌方城池要塞造成 150% 伤害，地面溅射伤害",
    counter: "攻城摧寨神器，近战防御脆弱需步兵保护",
    story: "三国重型攻城器械，木质齿轮杠杆高抛巨大滚石，落地山崩地裂！"
  },
  {
    id: "meirenji",
    name: "美人计",
    title: "败战之计 · 惊鸿魅惑",
    icon: "💃",
    cost: 110,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "全屏",
    feature: "魅惑全场敌军 10 秒；对吕布/猛将造成 25 点心碎真伤，普通小兵 8 点 (CD: 30s)",
    counter: "克制敌方强力突进与战神武将",
    story: "败战计第三十一计，以柔克刚，令战神吕布瞬间化作春风细雨！"
  },
  {
    id: "zhuge_ult",
    name: "借东风",
    title: "胜战之计 · 火攻烈风",
    icon: "🔥",
    cost: 150,
    hp: 0,
    atk: 95,
    speed: "-",
    range: "全屏",
    feature: "诸葛借东南烈火狂风，全屏大轰炸造成 95 点毁灭伤害 (CD: 45s)",
    counter: "克制敌方大批密集兵海",
    story: "卧龙诸葛孔明登坛借东风，火烧赤壁，谈笑间樯橹灰飞烟灭！"
  },
  {
    id: "jinchan",
    name: "金蝉脱壳",
    title: "混战之计 · 金光护体",
    icon: "🪙",
    cost: 120,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "全军",
    feature: "我方全军瞬间获得 3.5 秒金光无敌并回血 60 点 (CD: 35s)",
    counter: "挽救危局与残血突击",
    story: "混战计第二十一计，脱身避险，转危为安！"
  },
  {
    id: "caochuan",
    name: "草船借箭",
    title: "敌战之计 · 借力化饷",
    icon: "🏹",
    cost: 80,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "全场",
    feature: "清空场上敌方全部飞箭，并转化为 150 战局铜钱 (CD: 30s)",
    counter: "克制敌方密集弓箭雨并快速致富",
    story: "敌战计第七计，草船借箭，谈笑之间借曹军十万箭矢为己用！"
  },
  {
    id: "shengdong",
    name: "声东击西",
    title: "胜战之计 · 调虎离山",
    icon: "📢",
    cost: 100,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "敌后排",
    feature: "使敌方后排弓手与投石车陷入眩晕混乱 8 秒 (CD: 28s)",
    counter: "克制敌方远程后排与攻城器械",
    story: "胜战计第六计，虚张声势，使敌方首尾难顾！"
  },
  {
    id: "paizhuan",
    name: "抛砖引玉",
    title: "敌战之计 · 巨石陷阱",
    icon: "🪨",
    cost: 95,
    hp: 0,
    atk: 130,
    speed: "-",
    range: "战场中央",
    feature: "在战场中央召唤巨型落石陷阱砸伤 130 点并击飞冲锋敌军 (CD: 22s)",
    counter: "克制敌方中路冲锋骑兵",
    story: "敌战计第十七计，设伏诱敌，落石重创！"
  },
  {
    id: "yiyidailao",
    name: "以逸待劳",
    title: "胜战之计 · 固守结阵",
    icon: "🛡️",
    cost: 90,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "全军",
    feature: "全军立盾固守结阵，受到所有伤害降低 70%，持续 8 秒 (CD: 25s)",
    counter: "硬抗敌方猛烈攻势与高爆发伤害",
    story: "胜战计第四计，以静制动，待敌疲惫而击之！"
  },
  {
    id: "qinzei",
    name: "擒贼擒王",
    title: "攻战之计 · 九天神雷",
    icon: "⚡",
    cost: 130,
    hp: 0,
    atk: 220,
    speed: "-",
    range: "锁定敌将",
    feature: "天降神雷精准劈向敌方最强主将，造成 220 点真实破甲重创 (CD: 40s)",
    counter: "定点斩杀敌方王牌主将",
    story: "攻战计第十八计，摧其坚，夺其魁，以解其体！"
  },
  {
    id: "chenhuo",
    name: "趁火打劫",
    title: "胜战之计 · 军费暴涨",
    icon: "🥁",
    cost: 85,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "全场",
    feature: "12 秒内击败敌军掉落 3 倍铜钱，军费暴涨 (CD: 25s)",
    counter: "在顺风或清怪时快速积累巨大经济优势",
    story: "胜战计第五计，乘敌之隙，速取军资！"
  },
  {
    id: "mantian",
    name: "瞒天过海",
    title: "胜战之计 · 迷雾隐蔽",
    icon: "🌫️",
    cost: 100,
    hp: 0,
    atk: 0,
    speed: "-",
    range: "全军",
    feature: "全屏升起大雾迷阵，全军闪避敌方所有远程飞箭，持续 10 秒 (CD: 35s)",
    counter: "克制敌方漫天箭雨与城防箭塔",
    story: "胜战计第一计，大雾迷江，神机莫测！"
  }
];

export class StoryManager {
  constructor() {
    this.currentChapterIndex = 0;
    this.currentDialogList = [];
    this.dialogStep = 0;
    this.isShowing = false;
    this.onFinishCallback = null;
    this.lastStepTime = 0;
  }

  cacheDom() {
    this.modalEl = document.getElementById("story-dialog-modal");
    this.speakerEl = document.getElementById("story-speaker-name");
    this.roleEl = document.getElementById("story-speaker-role");
    this.avatarEl = document.getElementById("story-speaker-avatar");
    this.textEl = document.getElementById("story-dialog-text");
    this.dialogCardEl = document.getElementById("story-card-box");
    this.stepBadgeEl = document.getElementById("story-step-badge");
  }

  getCurrentChapter(faction = 'shu') {
    const list = FACTION_CAMPAIGNS[faction] || FACTION_CAMPAIGNS.shu;
    return list[this.currentChapterIndex] || list[0];
  }

  playChapterIntro(chapterId, onFinish, faction = 'shu') {
    this.cacheDom();
    const list = FACTION_CAMPAIGNS[faction] || FACTION_CAMPAIGNS.shu;
    const chapter = list.find(c => c.id === chapterId) || list[0];
    this.currentChapterIndex = list.indexOf(chapter);
    this.currentDialogList = chapter.introDialogs || [];
    this.dialogStep = 0;
    this.onFinishCallback = onFinish;

    if (this.currentDialogList.length > 0) {
      this.showDialog();
    } else {
      if (onFinish) onFinish();
    }
  }

  playChapterVictory(chapterId, onFinish, faction = 'shu') {
    this.cacheDom();
    const list = FACTION_CAMPAIGNS[faction] || FACTION_CAMPAIGNS.shu;
    const chapter = list.find(c => c.id === chapterId) || list[0];
    this.currentChapterIndex = list.indexOf(chapter);
    this.currentDialogList = chapter.victoryDialogs || [];
    this.dialogStep = 0;
    this.onFinishCallback = onFinish;

    if (this.currentDialogList.length > 0) {
      this.showDialog();
    } else {
      if (onFinish) onFinish();
    }
  }

  showDialog() {
    this.isShowing = true;
    this.cacheDom();
    if (this.modalEl) {
      this.modalEl.classList.add("open");
      this.modalEl.style.display = "flex";
      this.modalEl.style.opacity = "1";
      this.modalEl.style.pointerEvents = "auto";
    }
    this.renderCurrentStep();
  }

  renderCurrentStep() {
    this.cacheDom();
    if (this.dialogStep >= this.currentDialogList.length) {
      this.closeDialog();
      return;
    }

    const item = this.currentDialogList[this.dialogStep];
    if (this.speakerEl) this.speakerEl.textContent = item.speaker;
    if (this.roleEl) this.roleEl.textContent = `【${item.role}】`;

    const GENERAL_AVATAR_MAP = {
      "赵云": "assets/generals/zhaoyun_128.png",
      "关羽": "assets/generals/guanyu_128.png",
      "张飞": "assets/generals/zhangfei_128.png",
      "刘备": "assets/generals/liubei_128.png",
      "诸葛亮": "assets/generals/zhugeliang_128.png",
      "吕布": "assets/generals/lvbu_128.png",
      "黄忠": "assets/generals/huangzhong_128.png",
      "马超": "assets/generals/machao_128.png",
      "魏延": "assets/generals/weiyan_128.png",
      "太史慈": "assets/generals/taishici_128.png",
      "曹操": "assets/generals/caocao_128.png",
      "司马懿": "assets/generals/simayi_128.png",
      "程远志": "assets/generals/chenyuanzhi_128.png"
    };

    if (this.avatarEl) {
      const avatarSrc = item.image || GENERAL_AVATAR_MAP[item.speaker];
      if (avatarSrc) {
        this.avatarEl.innerHTML = `<img src="${avatarSrc}" alt="${item.speaker}" class="dialogue-pixel-avatar" />`;
      } else if (item.avatar && (item.avatar.endsWith('.png') || item.avatar.endsWith('.webp') || item.avatar.includes('/'))) {
        this.avatarEl.innerHTML = `<img src="${item.avatar}" class="dialogue-pixel-avatar" />`;
      } else {
        this.avatarEl.textContent = item.avatar;
      }
    }

    if (this.textEl) this.textEl.textContent = item.text;
    if (this.stepBadgeEl) this.stepBadgeEl.textContent = `${this.dialogStep + 1} / ${this.currentDialogList.length}`;

    if (this.dialogCardEl) {
      if (item.side === 'right') {
        this.dialogCardEl.classList.add("enemy-speaker");
      } else {
        this.dialogCardEl.classList.remove("enemy-speaker");
      }
    }
  }

  nextStep() {
    const now = Date.now();
    if (this.lastStepTime && now - this.lastStepTime < 180) return;
    this.lastStepTime = now;

    if (!this.isShowing) return;
    this.dialogStep++;
    if (this.dialogStep >= this.currentDialogList.length) {
      this.closeDialog();
    } else {
      this.renderCurrentStep();
    }
  }

  skipDialog() {
    const now = Date.now();
    if (this.lastStepTime && now - this.lastStepTime < 180) return;
    this.lastStepTime = now;

    if (!this.isShowing) return;
    this.closeDialog();
  }

  closeDialog() {
    this.isShowing = false;
    this.cacheDom();
    if (this.modalEl) {
      this.modalEl.classList.remove("open");
      this.modalEl.style.display = "none";
      this.modalEl.style.opacity = "0";
      this.modalEl.style.pointerEvents = "none";
    }
    if (this.onFinishCallback) {
      const cb = this.onFinishCallback;
      this.onFinishCallback = null;
      try {
        cb();
      } catch (e) {
        console.error("onFinishCallback error:", e);
      }
    }
  }
}

// 战役击败生擒 · 名将归降收编条件表 (战功星级/钱粮/礼聘要求)
export const RECRUIT_CONDITIONS = {
  // === 初始三英不设招募（刘备、关羽、张飞为初始大将）===

  // --- 🟢 蜀汉 (7 位可招降名将) ---
  zhugeliang: {
    id: "zhugeliang",
    name: "卧龙诸葛亮",
    title: "神机妙算 · 鞠躬尽瘁",
    avatar: "assets/generals/zhugeliang_128.png",
    capturedInChapter: [9],
    desc: "当世谋圣，八卦奇门风火法术，超远攻击全场迟缓与范围法术轰炸！",
    dialogue: "“草庐三顾动天地，隆中定策分三国！亮愿随明主出山，兴复汉室！”",
    conditions: {
      minStars: 15,
      silverCost: 300,
      goldIngotsCost: 25
    }
  },
  pangtong: {
    id: "pangtong",
    name: "凤雏庞统",
    title: "士元连环 · 绝代智谋",
    avatar: "assets/generals/pangtong_128.png",
    capturedInChapter: [9],
    desc: "凤雏先生，铁锁连环古卷引爆连锁伤害，法术传导打击全屏敌军！",
    dialogue: "“卧龙既出，凤雏安能久伏！统愿献连环妙计，定鼎天下！”",
    conditions: {
      minStars: 18,
      silverCost: 280,
      goldIngotsCost: 25
    }
  },
  zhaoyun: {
    id: "zhaoyun",
    name: "大将赵云",
    title: "常胜将军 · 身是客胆",
    avatar: "assets/generals/zhaoyun_128.png",
    capturedInChapter: [10],
    desc: "常山赵子龙，白马银枪，七进七出长枪横扫群攻突刺破阵！",
    dialogue: "“血战长坂单骑返，幼主平安！子龙愿为主公赴汤蹈火，在所不辞！”",
    conditions: {
      minStars: 12,
      silverCost: 200
    }
  },
  machao: {
    id: "machao",
    name: "锦马超",
    title: "神威天将 · 铁骑狂飙",
    avatar: "assets/generals/machao_128.png",
    capturedInChapter: [12],
    desc: "西凉神威天将军，极速铁骑践踏撕裂敌军防线与后排！",
    dialogue: "“西凉男儿血性在，誓随明主讨曹贼！西凉铁骑任凭主公驱遣！”",
    conditions: {
      minStars: 20,
      silverCost: 320,
      goldIngotsCost: 20
    }
  },
  huangzhong: {
    id: "huangzhong",
    name: "老将黄忠",
    title: "老当益壮 · 宝雕穿杨",
    avatar: "assets/generals/huangzhong_128.png",
    capturedInChapter: [13],
    desc: "五虎老将，超远距离精准狙杀，定点狙杀敌方后排高威胁单位！",
    dialogue: "“老夫虽过六旬，手中宝弓大刀未老！定助主公扫平天下逆贼！”",
    conditions: {
      minStars: 22,
      copperCost: 1000,
      silverCost: 280
    }
  },
  weiyan: {
    id: "weiyan",
    name: "狂骨魏延",
    title: "嗜血狂战 · 勇冠三军",
    avatar: "assets/generals/weiyan_128.png",
    capturedInChapter: [14],
    desc: "嗜血反击，受到伤害狂暴吸血反攻，最强前排持久绞肉猛将！",
    dialogue: "“魏延得主公破格提拔重用，誓以一身武艺效死汉中，死而后已！”",
    conditions: {
      minStars: 24,
      silverCost: 260
    }
  },
  jiangwei: {
    id: "jiangwei",
    name: "幼麟姜维",
    title: "九伐中原 · 文武双全",
    avatar: "assets/generals/jiangwei_128.png",
    capturedInChapter: [16],
    desc: "丞相传人，文武双全麒麟破阵，攻防一体大幅强化附近友军！",
    dialogue: "“良禽择木而栖，得蒙恩师相授兵法，维定承相公遗志，克复中原！”",
    conditions: {
      minStars: 28,
      silverCost: 350,
      goldIngotsCost: 35
    }
  },

  // --- 🔵 东吴 (10 位可招降名将) ---
  taishici: {
    id: "taishici",
    name: "太史慈",
    title: "信义笃烈 · 双戟神射",
    avatar: "assets/generals/taishici_128.png",
    capturedInChapter: [3],
    desc: "东莱名将，双戟神射快速连发五连穿云箭，中距离高频物理压制！",
    dialogue: "“久慕使君仁德布于四海，北海蒙救，慈愿鞍前马后随使君征伐！”",
    conditions: {
      minStars: 6,
      copperCost: 600,
      silverCost: 100
    }
  },
  sunce: {
    id: "sunce",
    name: "小霸王孙策",
    title: "江东霸王 · 勇冠江淮",
    avatar: "assets/generals/sunce_128.png",
    capturedInChapter: [11],
    desc: "江东小霸王，虎头湛金枪开局自带巨额金光护盾，极速冲撞撕裂战线！",
    dialogue: "“小霸王策在此！江东儿郎愿与使君义结金兰，提枪并战天下！”",
    conditions: {
      minStars: 20,
      silverCost: 320,
      goldIngotsCost: 25
    }
  },
  zhouyu: {
    id: "zhouyu",
    name: "美周郎周瑜",
    title: "赤壁都督 · 火羽烈焰",
    avatar: "assets/generals/zhouyu_128.png",
    capturedInChapter: [11],
    desc: "东吴大都督，白羽折扇点燃全场烈焰，附带大范围持续灼烧与击退！",
    dialogue: "“谈笑间樯橹灰飞烟灭！公瑾愿为主公运筹帷幄，烈火燎原！”",
    conditions: {
      minStars: 20,
      silverCost: 320,
      goldIngotsCost: 25
    }
  },
  ganning: {
    id: "ganning",
    name: "锦帆甘宁",
    title: "锦帆夜袭 · 游侠豪气",
    avatar: "assets/generals/ganning_128.png",
    capturedInChapter: [11],
    desc: "锦帆游侠，腰悬铜铃双刀狂暴旋风，移速极快且暴击吸血！",
    dialogue: "“百翎锦帆、铜铃响动！甘兴霸百骑劫营，愿做主公破敌利刃！”",
    conditions: {
      minStars: 20,
      silverCost: 250,
      goldIngotsCost: 20
    }
  },
  huanggai: {
    id: "huanggai",
    name: "赤壁黄盖",
    title: "苦肉死战 · 赤胆忠心",
    avatar: "assets/generals/huanggai_128.png",
    capturedInChapter: [11],
    desc: "东吴宿将，铁鞭猛击阵亡时爆发烈焰火海，引燃周围全数敌兵！",
    dialogue: "“老夫赤胆忠心，愿效苦肉冲阵，为主公焚尽顽敌！”",
    conditions: {
      minStars: 20,
      copperCost: 900,
      silverCost: 200
    }
  },
  sunquan: {
    id: "sunquan",
    name: "东吴大帝孙权",
    title: "江东之主 · 帝王威仪",
    avatar: "assets/generals/sunquan_128.png",
    capturedInChapter: [15],
    desc: "东吴开国皇帝，辟邪宝剑号令水陆大军，全场士兵护甲与移速大幅提升！",
    dialogue: "“生子当如孙仲谋！权愿举江东六郡八十一州之众，与使君同舟共济！”",
    conditions: {
      minStars: 28,
      silverCost: 350,
      goldIngotsCost: 30
    }
  },
  luxun: {
    id: "luxun",
    name: "儒将陆逊",
    title: "业火连营 · 白面都督",
    avatar: "assets/generals/luxun_128.png",
    capturedInChapter: [15],
    desc: "年轻都督，业火连营剑气引爆敌阵，对密集步兵战线造成毁灭打击！",
    dialogue: "“书生都督陆伯言，愿施连营深谋，为主公经略中原！”",
    conditions: {
      minStars: 28,
      silverCost: 300,
      goldIngotsCost: 25
    }
  },
  lvmeng: {
    id: "lvmeng",
    name: "虎威吕蒙",
    title: "白衣渡江 · 刮目相看",
    avatar: "assets/generals/lvmeng_128.png",
    capturedInChapter: [15],
    desc: "智勇双全，白衣短枪擅长偷袭敌方军械要害，额外增加攻城器械伤害！",
    dialogue: "“士别三日当刮目相待！蒙虽武人，亦知大义，愿听主公差遣！”",
    conditions: {
      minStars: 28,
      silverCost: 260,
      goldIngotsCost: 20
    }
  },
  zhoutai: {
    id: "zhoutai",
    name: "浴血周泰",
    title: "百战创痕 · 不屈铁壁",
    avatar: "assets/generals/zhoutai_128.png",
    capturedInChapter: [15],
    desc: "身负数十战创，血量越低防御越高，终极肉盾守护友方后排！",
    dialogue: "“身上战创数十处，皆是勇武之证！周泰愿为主公血战到底！”",
    conditions: {
      minStars: 28,
      silverCost: 260,
      goldIngotsCost: 20
    }
  },
  lusu: {
    id: "lusu",
    name: "谋主鲁肃",
    title: "榻上长策 · 忠厚长者",
    avatar: "assets/generals/lusu_128.png",
    capturedInChapter: [15],
    desc: "东吴谋主，运筹帷幄稳固后方经济，提升战场军饷自然增长速率！",
    dialogue: "“指囷相赠、榻上陈策。肃愿以天下大势佐助明主！”",
    conditions: {
      minStars: 28,
      silverCost: 260,
      goldIngotsCost: 20
    }
  },

  // --- 🔴 曹魏 (10 位可招降名将) ---
  xiahoudun: {
    id: "xiahoudun",
    name: "独眼夏侯惇",
    title: "拔矢啖睛 · 刚烈破阵",
    avatar: "assets/generals/xiahoudun_128.png",
    capturedInChapter: [4],
    desc: "曹魏元勋大将，刚烈厚背重刀，重度霸体免伤与高伤破甲突进！",
    dialogue: "“拔矢啖睛何所惧！惇佩服玄德公仁义，愿效犬马之力！”",
    conditions: {
      minStars: 8,
      silverCost: 200,
      goldIngotsCost: 15
    }
  },
  zhangliao: {
    id: "zhangliao",
    name: "名将张辽",
    title: "逍遥破阵 · 威震江东",
    avatar: "assets/generals/zhangliao_128.png",
    capturedInChapter: [10],
    desc: "古今良将召虎，突进斩将撕裂阵型，攻击附带紫电穿透范围伤害！",
    dialogue: "“张辽一生唯敬真正英雄！使君仁厚重义，辽愿为先锋破阵！”",
    conditions: {
      minStars: 18,
      silverCost: 280,
      goldIngotsCost: 20
    }
  },
  xiahouyuan: {
    id: "xiahouyuan",
    name: "神速夏侯渊",
    title: "虎步关右 · 神速奇袭",
    avatar: "assets/generals/xiahouyuan_128.png",
    capturedInChapter: [13],
    desc: "曹魏神速大将，超快移速与宝雕强弓，疾速游走风筝压制敌方后排！",
    dialogue: "“虎步关右、三日五百！渊愿引雕弓精骑为主公奔袭四方！”",
    conditions: {
      minStars: 24,
      silverCost: 260,
      goldIngotsCost: 20
    }
  },
  xuchu: {
    id: "xuchu",
    name: "虎痴许褚",
    title: "虎痴撼地 · 镔铁巨锤",
    avatar: "assets/generals/xuchu_128.png",
    capturedInChapter: [13],
    desc: "曹魏护卫统领，镔铁八棱锤重击地面引发范围震荡眩晕！",
    dialogue: "“俺虎痴认准主公了！谁敢伤主公，先问过俺手中八棱巨锤！”",
    conditions: {
      minStars: 24,
      silverCost: 260,
      goldIngotsCost: 20
    }
  },
  dianwei: {
    id: "dianwei",
    name: "古之恶来典韦",
    title: "古之恶来 · 双铁大戟",
    avatar: "assets/generals/dianwei_128.png",
    capturedInChapter: [14],
    desc: "绝顶悍将，双铁大戟血战八方，残血时免伤率飙升至 50% 死战不退！",
    dialogue: "“古之恶来在此！双铁戟立地生风，至死守护主公大营！”",
    conditions: {
      minStars: 26,
      silverCost: 280,
      goldIngotsCost: 25
    }
  },
  pangde: {
    id: "pangde",
    name: "白马庞德",
    title: "抬棺死战 · 白马义勇",
    avatar: "assets/generals/pangde_128.png",
    capturedInChapter: [14],
    desc: "抬棺勇将，重铠白马重刃连续斩击，阵亡时自爆战意鼓舞全军！",
    dialogue: "“白马庞德誓死如归！明主在前，愿提重刀横扫千军！”",
    conditions: {
      minStars: 26,
      silverCost: 260,
      goldIngotsCost: 20
    }
  },
  simayi: {
    id: "simayi",
    name: "冢虎司马懿",
    title: "狼顾鹰视 · 奇谋深藏",
    avatar: "assets/generals/simayi_128.png",
    capturedInChapter: [17],
    desc: "当世冢虎，幽紫黑雾压制敌方全屏计策，迟缓敌方全军出征节奏！",
    dialogue: "“深沟高垒待天时，鹰视狼顾识真主。懿愿竭尽谋算，平定乱世！”",
    conditions: {
      minStars: 32,
      silverCost: 400,
      goldIngotsCost: 35
    }
  },
  guojia: {
    id: "guojia",
    name: "鬼才郭嘉",
    title: "十胜十败 · 算无遗策",
    avatar: "assets/generals/guojia_128.png",
    capturedInChapter: [17],
    desc: "魏军第一谋主，遗策奇谋令己方全员计策冷却时间大幅缩短！",
    dialogue: "“十胜十败算无遗策！奉孝愿随明主观沧海、定神州！”",
    conditions: {
      minStars: 32,
      silverCost: 350,
      goldIngotsCost: 30
    }
  },
  caoren: {
    id: "caoren",
    name: "征南曹仁",
    title: "天人将军 · 金锁铁壁",
    avatar: "assets/generals/caoren_128.png",
    capturedInChapter: [17],
    desc: "八门金锁阵主创，金锁重盾守护城池大营，令友方要塞受创减少 25%！",
    dialogue: "“曹子孝铁壁坚城镇守八方，愿固主公千秋基业！”",
    conditions: {
      minStars: 32,
      silverCost: 320,
      goldIngotsCost: 25
    }
  },
  caocao: {
    id: "caocao",
    name: "魏武帝曹操",
    title: "治世能臣 · 乱世奸雄",
    avatar: "assets/generals/caocao_128.png",
    capturedInChapter: [18],
    desc: "倚天神剑号令千军，自带霸者威压，降低敌军全员防御与移速！",
    dialogue: "“生子当如孙仲谋，天下英雄唯使君与操耳！今日归降，与玄德共谋大业！”",
    conditions: {
      minStars: 30,
      silverCost: 500,
      goldIngotsCost: 40
    }
  },

  // --- 🟡 群雄 (10 位可招降名将) ---
  zhangjiao: {
    id: "zhangjiao",
    name: "天师张角",
    title: "大贤良师 · 太平天师",
    avatar: "assets/generals/zhangjiao_128.png",
    capturedInChapter: [1],
    desc: "太平道教主，呼风唤雨引落雷电，超远距离大范围法术轰炸！",
    dialogue: "“苍天已逝，黄天未成……公乃仁德之主，张角愿以天术佐之！”",
    conditions: {
      minStars: 3,
      copperCost: 400,
      silverCost: 60
    }
  },
  diaochan: {
    id: "diaochan",
    name: "绝世貂蝉",
    title: "闭月绝色 · 连环倾城",
    avatar: "assets/generals/diaochan_128.png",
    capturedInChapter: [2],
    desc: "四大美女之一，连环折扇施放倾城魅惑，削弱敌方心智与攻击！",
    dialogue: "“妾身红颜飘零，蒙使君不弃，愿借倾城月色化干戈助大业！”",
    conditions: {
      minStars: 6,
      silverCost: 150,
      goldIngotsCost: 15
    }
  },
  jiling: {
    id: "jiling",
    name: "上将纪灵",
    title: "三尖两刃 · 勇冠淮南",
    avatar: "assets/generals/jiling_128.png",
    capturedInChapter: [5],
    desc: "淮南第一大将，五十斤三尖两刃刀大开大合，击退重骑兵与步兵战阵！",
    dialogue: "“三尖两刃刀甘拜下风！纪灵愿追随明主！”",
    conditions: {
      minStars: 10,
      copperCost: 700,
      silverCost: 120
    }
  },
  dongzhuo: {
    id: "dongzhuo",
    name: "西凉董卓",
    title: "西凉魔王 · 倒行逆施",
    avatar: "assets/generals/dongzhuo_128.png",
    capturedInChapter: [6],
    desc: "西凉重铠暴君，超厚血量绞肉战车，斩杀敌兵掠夺为自身临时护盾！",
    dialogue: "“本相虽败，豪气犹存！使君果有雄才，卓愿率西凉铁甲听令！”",
    conditions: {
      minStars: 12,
      silverCost: 260,
      goldIngotsCost: 25
    }
  },
  lvbu: {
    id: "lvbu",
    name: "战神吕布",
    title: "天下无双 · 飞将吕奉先",
    avatar: "assets/generals/lvbu_128.png",
    capturedInChapter: [2, 6],
    desc: "天下第一武将，手持方天画戟，残血狂暴霸体，方天乱舞范围横扫！",
    dialogue: "“方天画戟重归鞘，天下谁人是英雄！主公若不弃，布愿效犬马之劳！”",
    conditions: {
      minStars: 6,
      silverCost: 260,
      goldIngotsCost: 30
    }
  },
  yanliang: {
    id: "yanliang",
    name: "名将颜良",
    title: "大戟破阵 · 勇冠河北",
    avatar: "assets/generals/yanliang_128.png",
    capturedInChapter: [7],
    desc: "河北四庭柱之首，手持重型长钺狂暴横扫，对前排坚盾兵种高额破防！",
    dialogue: "“河北名将颜良在此，败军之将愿执大戟随使君冲锋陷阵！”",
    conditions: {
      minStars: 14,
      silverCost: 220,
      goldIngotsCost: 15
    }
  },
  wenchou: {
    id: "wenchou",
    name: "名将文丑",
    title: "铁骑狂突 · 威震延津",
    avatar: "assets/generals/wenchou_128.png",
    capturedInChapter: [8],
    desc: "河北无双悍将，策马执矛连续冲刺穿阵，强力击退沿途敌军！",
    dialogue: "“文丑愿与颜良兄长一同归降，誓死效忠主公！”",
    conditions: {
      minStars: 16,
      silverCost: 220,
      goldIngotsCost: 15
    }
  },
  yuanshao: {
    id: "yuanshao",
    name: "本初袁绍",
    title: "四世三公 · 河北盟主",
    avatar: "assets/generals/yuanshao_128.png",
    capturedInChapter: [8],
    desc: "十八路诸侯盟主，手持思召宝剑，开局赋予己方弓手超远射程压制！",
    dialogue: "“四世三公名门之后，今日方知玄德真英雄也！绍愿同心共扶汉室！”",
    conditions: {
      minStars: 16,
      silverCost: 300,
      goldIngotsCost: 30
    }
  },
  zhangren: {
    id: "zhangren",
    name: "忠节张任",
    title: "落凤神射 · 忠勇无双",
    avatar: "assets/generals/zhangren_128.png",
    capturedInChapter: [12],
    desc: "西川名将，落凤坡设伏铁胎重弩连射，对骑兵单位造成双倍伤害！",
    dialogue: "“忠臣感使君厚德！张任愿保益州太平，为天下苍生尽忠！”",
    conditions: {
      minStars: 22,
      silverCost: 240,
      goldIngotsCost: 15
    }
  },
  menghuo: {
    id: "menghuo",
    name: "蛮王孟获",
    title: "南蛮大王 · 百兽统御",
    avatar: "assets/generals/menghuo_128.png",
    capturedInChapter: [16],
    desc: "南蛮蛮王，巨象冲撞横扫千军，自带藤甲护盾抵挡大量物理穿刺！",
    dialogue: "“丞相仁义七擒七纵，孟获心服口服！南中万民永世归附！”",
    conditions: {
      minStars: 30,
      silverCost: 300,
      goldIngotsCost: 25
    }
  }
};
