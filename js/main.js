import { BattleWorld } from './game-engine.js?v=20261003_1';
import { sound } from './audio.js?v=20260904_1';
import { StoryManager, STORY_CHAPTERS, FACTION_CAMPAIGNS, FACTION_INFOS, GENERALS_ARCHIVE, RECRUIT_CONDITIONS } from './story.js?v=20261002_1';
import { 
  EQUIPMENT_DATABASE, 
  STAR_UPGRADE_COSTS, 
  SYNTHESIS_SHARD_COST,
  getEquipmentData, 
  calculateHeroEquipBonuses, 
  generateShopStock 
} from './equipment.js?v=20260904_1';
import { 
  CAMP_META, 
  HERO_CAMP_MAP, 
  calculateActiveSynergies, 
  aggregateSynergyBuffs 
} from './synergy.js?v=20261001_1';

// 全局 40 大名将元数据表 (四大阵营各10人，支持战前编队选择至多 3 人，严格单实例上阵)
export const HERO_META = {
  // ================= 🟢 蜀汉 (10) =================
  liubei: { id: "liubei", name: "主公刘备", camp: "shu", avatar: "assets/generals/liubei_128.png", btnId: "btn-spawn-liubei", overlayId: "deployed-liubei", cost: 180, job: "蜀汉先主", shout: "仁义定天下！全军随我冲锋！", color: "#16a34a" },
  guanyu: { id: "guanyu", name: "武圣关羽", camp: "shu", avatar: "assets/generals/guanyu_128.png", btnId: "btn-spawn-guanyu", overlayId: "deployed-guanyu", cost: 210, job: "五虎上将", shout: "青龙偃月，看关某取敌将首级！", color: "#16a34a" },
  zhangfei: { id: "zhangfei", name: "万人敌张飞", camp: "shu", avatar: "assets/generals/zhangfei_128.png", btnId: "btn-spawn-zhangfei", overlayId: "deployed-zhangfei", cost: 195, job: "燕人狂勇", shout: "燕人张翼德在此！谁敢与我决一死战！", color: "#b45309" },
  zhaoyun: { id: "zhaoyun", name: "常胜赵云", camp: "shu", avatar: "assets/generals/zhaoyun_128.png", btnId: "btn-spawn-zhaoyun", overlayId: "deployed-zhaoyun", cost: 200, job: "常山赵子龙", shout: "龙枪如龙，七进七出！子龙来也！", color: "#0284c7" },
  zhugeliang: { id: "zhugeliang", name: "卧龙诸葛亮", camp: "shu", avatar: "assets/generals/zhugeliang_128.png", btnId: "btn-spawn-zhugeliang", overlayId: "deployed-zhugeliang", cost: 220, job: "当世谋圣", shout: "草庐三分运筹帷幄，借天地造化破敌！", color: "#2563eb" },
  pangtong: { id: "pangtong", name: "凤雏庞统", camp: "shu", avatar: "assets/generals/pangtong_128.png", btnId: "btn-spawn-pangtong", overlayId: "deployed-pangtong", cost: 190, job: "经达纬策", shout: "妙策环生，铁锁连环！破敌就在此时！", color: "#7c3aed" },
  huangzhong: { id: "huangzhong", name: "老将黄忠", camp: "shu", avatar: "assets/generals/huangzhong_128.png", btnId: "btn-spawn-huangzhong", overlayId: "deployed-huangzhong", cost: 185, job: "宝雕穿杨", shout: "老将虽老，宝雕神弓不老！看箭！", color: "#b45309" },
  machao: { id: "machao", name: "锦马超", camp: "shu", avatar: "assets/generals/machao_128.png", btnId: "btn-spawn-machao", overlayId: "deployed-machao", cost: 215, job: "神威天将", shout: "西凉锦马超在此！踏破敌阵！", color: "#ea580c" },
  weiyan: { id: "weiyan", name: "狂骨魏延", camp: "shu", avatar: "assets/generals/weiyan_128.png", btnId: "btn-spawn-weiyan", overlayId: "deployed-weiyan", cost: 190, job: "嗜血狂将", shout: "义阳魏文长在此！狂骨嗜血破敌！", color: "#059669" },
  jiangwei: { id: "jiangwei", name: "幼麟姜维", camp: "shu", avatar: "assets/generals/jiangwei_128.png", btnId: "btn-spawn-jiangwei", overlayId: "deployed-jiangwei", cost: 205, job: "天水幼麟", shout: "天水姜伯约在此！文武双全破阵！", color: "#0284c7" },

  // ================= 🔵 东吴 (10) =================
  sunquan: { id: "sunquan", name: "东吴大帝孙权", camp: "wu", avatar: "assets/generals/sunquan_128.png", btnId: "btn-spawn-sunquan", overlayId: "deployed-sunquan", cost: 200, job: "坐断东南", shout: "生子当如孙仲谋！江东将士随孤破敌！", color: "#0284c7" },
  sunce: { id: "sunce", name: "小霸王孙策", camp: "wu", avatar: "assets/generals/sunce_128.png", btnId: "btn-spawn-sunce", overlayId: "deployed-sunce", cost: 220, job: "勇冠三军", shout: "江东小霸王在此！霸王枪出，所向披靡！", color: "#0284c7" },
  zhouyu: { id: "zhouyu", name: "美周郎周瑜", camp: "wu", avatar: "assets/generals/zhouyu_128.png", btnId: "btn-spawn-zhouyu", overlayId: "deployed-zhouyu", cost: 230, job: "赤壁都督", shout: "谈笑间樯橹灰飞烟灭！东风既起，烈火燎原！", color: "#ef4444" },
  lusu: { id: "lusu", name: "谋主鲁肃", camp: "wu", avatar: "assets/generals/lusu_128.png", btnId: "btn-spawn-lusu", overlayId: "deployed-lusu", cost: 180, job: "榻上经纬", shout: "合纵连横，保境安民！将士们坚守阵线！", color: "#0284c7" },
  lvmeng: { id: "lvmeng", name: "虎威吕蒙", camp: "wu", avatar: "assets/generals/lvmeng_128.png", btnId: "btn-spawn-lvmeng", overlayId: "deployed-lvmeng", cost: 195, job: "白衣渡江", shout: "士别三日当刮目相待！渡江突刺，斩！", color: "#0891b2" },
  luxun: { id: "luxun", name: "儒将陆逊", camp: "wu", avatar: "assets/generals/luxun_128.png", btnId: "btn-spawn-luxun", overlayId: "deployed-luxun", cost: 210, job: "白面都督", shout: "后发制人，火烧连营！看我妙策定江山！", color: "#f97316" },
  ganning: { id: "ganning", name: "锦帆甘宁", camp: "wu", avatar: "assets/generals/ganning_128.png", btnId: "btn-spawn-ganning", overlayId: "deployed-ganning", cost: 205, job: "百骑游侠", shout: "锦帆甘兴霸在此！百骑劫营，取敌首级！", color: "#06b6d4" },
  taishici: { id: "taishici", name: "太史慈", camp: "wu", avatar: "assets/generals/taishici_128.png", btnId: "btn-spawn-taishici", overlayId: "deployed-taishici", cost: 175, job: "东莱名将", shout: "大丈夫生于乱世，当带三尺之剑立不世之功！", color: "#0891b2" },
  zhoutai: { id: "zhoutai", name: "浴血周泰", camp: "wu", avatar: "assets/generals/zhoutai_128.png", btnId: "btn-spawn-zhoutai", overlayId: "deployed-zhoutai", cost: 190, job: "舍生不屈", shout: "身被数十创犹死战！休想伤我军中半步！", color: "#b45309" },
  huanggai: { id: "huanggai", name: "赤壁黄盖", camp: "wu", avatar: "assets/generals/huanggai_128.png", btnId: "btn-spawn-huanggai", overlayId: "deployed-huanggai", cost: 170, job: "苦肉先登", shout: "火船敢死，先登破寨！烈火听我号令！", color: "#ea580c" },

  // ================= 🔴 曹魏 (10) =================
  caocao: { id: "caocao", name: "魏武帝曹操", camp: "wei", avatar: "assets/generals/caocao_128.png", btnId: "btn-spawn-caocao", overlayId: "deployed-caocao", cost: 250, job: "乱世雄主", shout: "宁教我负天下人！倚天既出，谁与争锋！", color: "#7e22ce" },
  simayi: { id: "simayi", name: "冢虎司马懿", camp: "wei", avatar: "assets/generals/simayi_128.png", btnId: "btn-spawn-simayi", overlayId: "deployed-simayi", cost: 240, job: "鹰视狼顾", shout: "得时无怠，天道幽微！雷霆听我号令！", color: "#475569" },
  guojia: { id: "guojia", name: "鬼才郭嘉", camp: "wei", avatar: "assets/generals/guojia_128.png", btnId: "btn-spawn-guojia", overlayId: "deployed-guojia", cost: 205, job: "天妒奇佐", shout: "十胜十败，破敌如探囊取物！算无遗策！", color: "#9333ea" },
  xiahoudun: { id: "xiahoudun", name: "独眼夏侯惇", camp: "wei", avatar: "assets/generals/xiahoudun_128.png", btnId: "btn-spawn-xiahoudun", overlayId: "deployed-xiahoudun", cost: 200, job: "刚烈开国", shout: "拔矢啖睛，勇不可当！夏侯元让在此！", color: "#7e22ce" },
  xiahouyuan: { id: "xiahouyuan", name: "神速夏侯渊", camp: "wei", avatar: "assets/generals/xiahouyuan_128.png", btnId: "btn-spawn-xiahouyuan", overlayId: "deployed-xiahouyuan", cost: 195, job: "虎步关右", shout: "三日五百，六日一千！千里奔袭看箭！", color: "#a855f7" },
  zhangliao: { id: "zhangliao", name: "名将张辽", camp: "wei", avatar: "assets/generals/zhangliao_128.png", btnId: "btn-spawn-zhangliao", overlayId: "deployed-zhangliao", cost: 215, job: "古之召虎", shout: "威震逍遥津！张文远在此，破阵突击！", color: "#6b21a8" },
  caoren: { id: "caoren", name: "征南曹仁", camp: "wei", avatar: "assets/generals/caoren_128.png", btnId: "btn-spawn-caoren", overlayId: "deployed-caoren", cost: 190, job: "金锁铁壁", shout: "八门金锁固若金汤！休想踏过防线！", color: "#581c87" },
  dianwei: { id: "dianwei", name: "古之恶来典韦", camp: "wei", avatar: "assets/generals/dianwei_128.png", btnId: "btn-spawn-dianwei", overlayId: "deployed-dianwei", cost: 210, job: "舍命死卫", shout: "古之恶来典韦在此！双铁戟出，谁敢上前！", color: "#831843" },
  xuchu: { id: "xuchu", name: "虎痴许褚", camp: "wei", avatar: "assets/generals/xuchu_128.png", btnId: "btn-spawn-xuchu", overlayId: "deployed-xuchu", cost: 205, job: "虎侯破山", shout: "虎痴许褚在此！裸衣死战，巨锤撼地！", color: "#701a75" },
  pangde: { id: "pangde", name: "白马庞德", camp: "wei", avatar: "assets/generals/pangde_128.png", btnId: "btn-spawn-pangde", overlayId: "deployed-pangde", cost: 195, job: "抬棺决死", shout: "抬梓决死，白马陷阵！决不后退半步！", color: "#6b21a8" },

  // ================= 🟡 群雄 (10) =================
  lvbu: { id: "lvbu", name: "战神吕布", camp: "qun", avatar: "assets/generals/lvbu_128.png", btnId: "btn-spawn-lvbu", overlayId: "deployed-lvbu", cost: 260, job: "天下无双", shout: "无双战神吕布出阵！方天画戟，谁敢撄锋！", color: "#dc2626" },
  diaochan: { id: "diaochan", name: "绝世貂蝉", camp: "qun", avatar: "assets/generals/diaochan_128.png", btnId: "btn-spawn-diaochan", overlayId: "deployed-diaochan", cost: 165, job: "连环倾城", shout: "妾身薄命，愿借倾城月色化干戈！", color: "#ec4899" },
  dongzhuo: { id: "dongzhuo", name: "西凉董卓", camp: "qun", avatar: "assets/generals/dongzhuo_128.png", btnId: "btn-spawn-dongzhuo", overlayId: "deployed-dongzhuo", cost: 220, job: "西凉魔王", shout: "顺我者昌，逆我者亡！西凉铁甲碾碎敌军！", color: "#991b1b" },
  yuanshao: { id: "yuanshao", name: "本初袁绍", camp: "qun", avatar: "assets/generals/yuanshao_128.png", btnId: "btn-spawn-yuanshao", overlayId: "deployed-yuanshao", cost: 190, job: "河北盟主", shout: "四世三公号令天下！全军弓弩齐射！", color: "#c2410c" },
  yanliang: { id: "yanliang", name: "名将颜良", camp: "qun", avatar: "assets/generals/yanliang_128.png", btnId: "btn-spawn-yanliang", overlayId: "deployed-yanliang", cost: 190, job: "河北先锋", shout: "河北名将颜良在此！重刀破甲斩将！", color: "#ea580c" },
  wenchou: { id: "wenchou", name: "名将文丑", camp: "qun", avatar: "assets/generals/wenchou_128.png", btnId: "btn-spawn-wenchou", overlayId: "deployed-wenchou", cost: 190, job: "铁骑狂突", shout: "河北文丑在此！万军阵中取敌首级！", color: "#d97706" },
  jiling: { id: "jiling", name: "上将纪灵", camp: "qun", avatar: "assets/generals/jiling_128.png", btnId: "btn-spawn-jiling", overlayId: "deployed-jiling", cost: 175, job: "淮南第一", shout: "谁敢挡我五十斤三尖两刃刀！全军冲阵！", color: "#b45309" },
  zhangren: { id: "zhangren", name: "忠节张任", camp: "qun", avatar: "assets/generals/zhangren_128.png", btnId: "btn-spawn-zhangren", overlayId: "deployed-zhangren", cost: 185, job: "西川枪王", shout: "忠臣不事二主！伏弩齐发，绝不归降！", color: "#d97706" },
  menghuo: { id: "menghuo", name: "蛮王孟获", camp: "qun", avatar: "assets/generals/menghuo_128.png", btnId: "btn-spawn-menghuo", overlayId: "deployed-menghuo", cost: 210, job: "南中霸主", shout: "南蛮战象冲锋！让你们尝尝蛮王神力！", color: "#15803d" },
  zhangjiao: { id: "zhangjiao", name: "天师张角", camp: "qun", avatar: "assets/generals/zhangjiao_128.png", btnId: "btn-spawn-zhangjiao", overlayId: "deployed-zhangjiao", cost: 190, job: "大贤良师", shout: "苍天已死，黄天当立！岁在甲子，天下大吉！", color: "#eab308" }
};

// ================= 🏛️ 武庙官阶荣誉谱 (8 阶官爵天梯与全军战力加成) =================
export const MILITARY_RANKS = [
  { rank: 1, name: "从九品 · 义从伍长", minStars: 0, icon: "🎖️", buffDesc: "全军攻击 +0%, 护甲 +0", atkBonus: 0.00, defBonus: 0, motto: "裹粮从征，初试锋芒于行阵之间。" },
  { rank: 2, name: "正九品 · 破贼什长", minStars: 10, icon: "🎖️", buffDesc: "全军攻击 +2%, 护甲 +1", atkBonus: 0.02, defBonus: 1, motto: "斩将搴旗，破贼立功。" },
  { rank: 3, name: "从八品 · 别部司马", minStars: 25, icon: "🏅", buffDesc: "全军攻击 +4%, 护甲 +2", atkBonus: 0.04, defBonus: 2, motto: "引军偏师，分定诸郡。" },
  { rank: 4, name: "正八品 · 抚军都尉", minStars: 45, icon: "🏅", buffDesc: "全军攻击 +6%, 护甲 +3", atkBonus: 0.06, defBonus: 3, motto: "抚驭士马，严明军令，绥靖戎行。" },
  { rank: 5, name: "从七品 · 折冲校尉", minStars: 70, icon: "🎖️", buffDesc: "全军攻击 +8%, 护甲 +4", atkBonus: 0.08, defBonus: 4, motto: "折冲千里，勇冠三军。" },
  { rank: 6, name: "正七品 · 偏将军", minStars: 95, icon: "👑", buffDesc: "全军攻击 +10%, 护甲 +5", atkBonus: 0.10, defBonus: 5, motto: "受命前驱，扫荡群凶。" },
  { rank: 7, name: "从六品 · 镇军将军", minStars: 115, icon: "👑", buffDesc: "全军攻击 +12%, 护甲 +6", atkBonus: 0.12, defBonus: 6, motto: "受脤出征，威震疆宇，克定祸乱。" },
  { rank: 8, name: "正一品 · 天下大将军", minStars: 128, icon: "⚔️", buffDesc: "全军攻击 +15%, 护甲 +8", atkBonus: 0.15, defBonus: 8, motto: "节制天下诸军，秉钺总戎，位极人臣！" }
];

export function getMilitaryRank(totalStars) {
  let curRank = MILITARY_RANKS[0];
  let nextRank = null;
  for (let i = 0; i < MILITARY_RANKS.length; i++) {
    if (totalStars >= MILITARY_RANKS[i].minStars) {
      curRank = MILITARY_RANKS[i];
      nextRank = MILITARY_RANKS[i + 1] || null;
    } else {
      if (!nextRank) nextRank = MILITARY_RANKS[i];
      break;
    }
  }
  const progressRatio = nextRank 
    ? Math.min(1, Math.max(0, (totalStars - curRank.minStars) / (nextRank.minStars - curRank.minStars)))
    : 1.0;
  return { curRank, nextRank, progressRatio, totalStars };
}

// ================= 🎁 四大势力章节满星宝箱配置表 =================
export const FACTION_STAR_CHESTS = {
  shu: [
    { id: "shu_15", stars: 15, name: "涿鹿初捷 · 犒军锦匣", copper: 1500, silver: 300, goldIngots: 30, equipReward: "tiebi_kai", shardReward: null, desc: "赐铜钱千五百、白银三百两、元宝三十铤，颁玄甲【铁壁重铠】！" },
    { id: "shu_35", stars: 35, name: "威震华夏 · 赐爵赐印", copper: 4000, silver: 800, goldIngots: 80, equipReward: null, shardReward: { equipId: "qinglong_dao", name: "青龙偃月刀", count: 8 }, desc: "赐铜钱四千、白银八百两、元宝八十铤，拔赐【青龙偃月刀】残卷x8！" },
    { id: "shu_50", stars: 50, name: "汉中称王 · 御赐王库金匮", copper: 10000, silver: 2000, goldIngots: 200, equipReward: "yitian_jian", shardReward: null, desc: "赐铜钱万贯、白银两千两、元宝两百铤，特赐绝世神兵【倚天剑】！" }
  ],
  wei: [
    { id: "wei_8", stars: 8, name: "陈留义兵 · 奉檄颁赏", copper: 1200, silver: 250, goldIngots: 25, equipReward: "jingtiejian", shardReward: null, desc: "赐铜钱千二百、白银二百五十两、元宝二十五铤，赐配【精铁剑】！" },
    { id: "wei_18", stars: 18, name: "官渡定鼎 · 孟德犒功匣", copper: 3500, silver: 700, goldIngots: 70, equipReward: null, shardReward: { equipId: "fangtian_huaji", name: "方天画戟", count: 8 }, desc: "赐铜钱三千五百、白银七百两、元宝七十铤，授【方天画戟】残印x8！" },
    { id: "wei_25", stars: 25, name: "九锡魏王 · 封疆重器", copper: 8000, silver: 1600, goldIngots: 160, equipReward: "chitu_ma", shardReward: null, desc: "赐铜钱八千、白银千六百两、元宝百六十铤，御赐名驹【赤兔神驹】！" }
  ],
  wu: [
    { id: "wu_8", stars: 8, name: "经略江东 · 拔萃策勋匣", copper: 1200, silver: 250, goldIngots: 25, equipReward: "baodiao_gong", shardReward: null, desc: "赐铜钱千二百、白银二百五十两、元宝二十五铤，颁神弓【宝雕金弓】！" },
    { id: "wu_18", stars: 18, name: "赤壁风云 · 都督犒军匣", copper: 3500, silver: 700, goldIngots: 70, equipReward: null, shardReward: { equipId: "shoumian_kai", name: "兽面吞云铠", count: 8 }, desc: "赐铜钱三千五百、白银七百两、元宝七十铤，赏【兽面吞云铠】秘卷x8！" },
    { id: "wu_25", stars: 25, name: "鼎立江东 · 至尊御赐金匮", copper: 8000, silver: 1600, goldIngots: 160, equipReward: "yitian_jian", shardReward: null, desc: "赐铜钱八千、白银千六百两、元宝百六十铤，特赐至宝神兵【倚天剑】！" }
  ],
  qun: [
    { id: "qun_6", stars: 6, name: "风云初动 · 戡乱赏金", copper: 1000, silver: 200, goldIngots: 20, equipReward: "tiebi_kai", shardReward: null, desc: "赐铜钱千文、白银两百两、元宝二十铤，赏赐精铠【铁壁重铠】！" },
    { id: "qun_15", stars: 15, name: "诸侯逐鹿 · 霸府封赏", copper: 3000, silver: 600, goldIngots: 60, equipReward: null, shardReward: { equipId: "zhanjin_qiang", name: "湛金虎头枪", count: 8 }, desc: "赐铜钱三千、白银六百两、元宝六十铤，颁赐【湛金虎头枪】兵符x8！" },
    { id: "qun_22", stars: 22, name: "裂土分疆 · 问鼎秘匮", copper: 7000, silver: 1400, goldIngots: 140, equipReward: "dilu_ma", shardReward: null, desc: "赐铜钱七千、白银千四百两、元宝百四十铤，赐极品名骏【的卢神骏】！" }
  ]
};

if (typeof window !== 'undefined') {
  window.MILITARY_RANKS = MILITARY_RANKS;
  window.getMilitaryRank = getMilitaryRank;
  window.FACTION_STAR_CHESTS = FACTION_STAR_CHESTS;
}

// 全局悬浮 Toast 提示体系
export function showToast(msg, type = "success") {
  const container = document.getElementById("game-toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `game-toast ${type === 'error' ? 'toast-error' : (type === 'info' ? 'toast-info' : '')}`;
  const icon = type === 'error' ? '❌' : (type === 'info' ? 'ℹ️' : '✨');
  toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-16px) scale(0.9)";
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

// 本地存档管理器 (支持多槽位存档、跨设备代码导出导入、名将装备武库与碎片升星)
class SaveManager {
  static KEY_PREFIX = "zhimoujue_save_slot_";
  static ACTIVE_SLOT_KEY = "zhimoujue_active_slot";
  static LEGACY_KEY = "zhimoujue_save_v5";

  static getActiveSlot() {
    try {
      return parseInt(localStorage.getItem(SaveManager.ACTIVE_SLOT_KEY) || "1", 10) || 1;
    } catch (e) {
      return 1;
    }
  }

  static setActiveSlot(slotId) {
    try {
      localStorage.setItem(SaveManager.ACTIVE_SLOT_KEY, String(slotId));
    } catch (e) {}
  }

  static getSlotKey(slotId) {
    return `${SaveManager.KEY_PREFIX}${slotId}`;
  }

  static load(slotId = null) {
    const targetSlot = slotId || SaveManager.getActiveSlot();
    let raw = null;
    try {
      let item = localStorage.getItem(SaveManager.getSlotKey(targetSlot));
      // 兼容旧版单一存档：若槽位1为空但存在旧版存档，自动平滑迁移至槽位1
      if (!item && targetSlot === 1) {
        const legacy = localStorage.getItem(SaveManager.LEGACY_KEY);
        if (legacy) {
          item = legacy;
          localStorage.setItem(SaveManager.getSlotKey(1), legacy);
        }
      }
      if (item) raw = JSON.parse(item);
    } catch (e) {
      console.warn("Load save failed:", e);
    }

    const defaultStars = {};
    for (let i = 1; i <= 18; i++) defaultStars[i] = 0;

    const currentFaction = raw?.currentFaction || 'shu';
    const factionProgress = raw?.factionProgress || {
      shu: raw?.unlockedChapter || 1,
      wei: 1,
      wu: 1,
      qun: 1
    };
    if (!factionProgress.shu) factionProgress.shu = raw?.unlockedChapter || 1;
    if (!factionProgress.wei) factionProgress.wei = 1;
    if (!factionProgress.wu) factionProgress.wu = 1;
    if (!factionProgress.qun) factionProgress.qun = 1;

    const factionChapterStars = raw?.factionChapterStars || {
      shu: { ...(raw?.chapterStars || defaultStars) },
      wei: {},
      wu: {},
      qun: {}
    };
    if (!factionChapterStars.shu) factionChapterStars.shu = { ...(raw?.chapterStars || defaultStars) };
    if (!factionChapterStars.wei) factionChapterStars.wei = {};
    if (!factionChapterStars.wu) factionChapterStars.wu = {};
    if (!factionChapterStars.qun) factionChapterStars.qun = {};

    let recruited = (raw?.recruitedHeroes && Array.isArray(raw.recruitedHeroes) && raw.recruitedHeroes.length > 0) ? [...raw.recruitedHeroes] : ["liubei", "guanyu", "zhangfei"];
    if (!recruited.includes("liubei")) recruited.unshift("liubei");
    if (!recruited.includes("guanyu")) recruited.push("guanyu");
    if (!recruited.includes("zhangfei")) recruited.push("zhangfei");

    let selected = (raw?.selectedHeroes && Array.isArray(raw.selectedHeroes) && raw.selectedHeroes.length > 0) 
      ? raw.selectedHeroes.filter(h => recruited.includes(h)).slice(0, 3) 
      : ["liubei", "guanyu", "zhangfei"];
    if (selected.length === 0) selected = recruited.slice(0, 3);

    return {
      slotId: targetSlot,
      currentFaction: currentFaction,
      factionProgress: factionProgress,
      factionChapterStars: factionChapterStars,
      unlockedChapter: factionProgress[currentFaction] || 1,
      chapterStars: factionChapterStars[currentFaction] || defaultStars,
      copper: (raw && raw.copper !== undefined) ? raw.copper : 1000,
      silver: (raw && raw.silver !== undefined) ? raw.silver : 400,
      goldIngots: (raw && raw.goldIngots !== undefined) ? raw.goldIngots : 50,
      recruitedHeroes: recruited,
      selectedHeroes: selected,
      upgrades: {
        infantryHp: 0,
        archerPower: 0,
        economyRate: 12,
        bombPower: 0,
        castleHp: 0,
        copperWallHp: 0,
        towerDmg: false,
        superCharm: false,
        armyDodgeRank: 0,
        armyStunResistRank: 0,
        armyCritRank: 0,
        armyLifestealRank: 0,
        armyDefenseRank: 0,
        ...(raw?.upgrades || {})
      },
      inventory: raw?.inventory || {
        jingtiejian: { star: 1 },
        mingguang_kai: { star: 1 },
        huangbiao_ma: { star: 1 }
      },
      shards: raw?.shards || {
        fangtian_huaji: 0,
        shoumian_kai: 0,
        chitu_ma: 0,
        qinglong_dao: 0
      },
      generalEquip: raw?.generalEquip || {
        liubei: { weapon: "jingtiejian", armor: "mingguang_kai", mount: "huangbiao_ma" },
        guanyu: { weapon: null, armor: null, mount: null },
        zhangfei: { weapon: null, armor: null, mount: null },
        zhaoyun: { weapon: null, armor: null, mount: null },
        huangzhong: { weapon: null, armor: null, mount: null },
        taishici: { weapon: null, armor: null, mount: null },
        machao: { weapon: null, armor: null, mount: null },
        weiyan: { weapon: null, armor: null, mount: null },
        pangtong: { weapon: null, armor: null, mount: null },
        jiangwei: { weapon: null, armor: null, mount: null },
        lvbu: { weapon: null, armor: null, mount: null },
        zhugeliang: { weapon: null, armor: null, mount: null },
        caocao: { weapon: null, armor: null, mount: null },
        simayi: { weapon: null, armor: null, mount: null }
      },
      shopStock: (raw?.shopStock && raw.shopStock.length > 0) ? raw.shopStock : generateShopStock(),
      claimedStarChests: (raw?.claimedStarChests && Array.isArray(raw.claimedStarChests)) ? [...raw.claimedStarChests] : [],
      lastSavedTime: raw?.lastSavedTime || new Date().toLocaleTimeString(),
      saveTimestamp: raw?.saveTimestamp || Date.now()
    };
  }

  static save(state, slotId = null) {
    const targetSlot = slotId || state.slotId || SaveManager.getActiveSlot();
    try {
      state.slotId = targetSlot;
      state.lastSavedTime = new Date().toLocaleTimeString();
      state.saveTimestamp = Date.now();
      if (state.factionProgress && state.currentFaction) {
        state.unlockedChapter = state.factionProgress[state.currentFaction] || 1;
      }
      if (state.factionChapterStars && state.currentFaction) {
        state.chapterStars = state.factionChapterStars[state.currentFaction] || {};
      }
      localStorage.setItem(SaveManager.getSlotKey(targetSlot), JSON.stringify(state));
      // 冗余一份至旧 KEY 保障老版本逻辑
      if (targetSlot === 1) {
        localStorage.setItem(SaveManager.LEGACY_KEY, JSON.stringify(state));
      }
      const timeEl = document.getElementById("archive-last-autosave-time");
      if (timeEl) timeEl.textContent = `最后保存：${state.lastSavedTime}`;
    } catch (e) {
      console.warn("Save failed:", e);
    }
  }

  static getSlotInfo(slotId) {
    try {
      let item = localStorage.getItem(SaveManager.getSlotKey(slotId));
      if (!item && slotId === 1) {
        item = localStorage.getItem(SaveManager.LEGACY_KEY);
      }
      if (!item) return null;
      const data = JSON.parse(item);
      let stars = 0;
      if (data.factionChapterStars) {
        Object.values(data.factionChapterStars).forEach(fObj => {
          if (fObj) Object.values(fObj).forEach(s => stars += (s || 0));
        });
      } else if (data.chapterStars) {
        Object.values(data.chapterStars).forEach(s => stars += (s || 0));
      }
      return {
        slotId,
        exists: true,
        currentFaction: data.currentFaction || 'shu',
        chapter: data.unlockedChapter || 1,
        stars,
        copper: data.copper || 0,
        silver: data.silver || 0,
        goldIngots: data.goldIngots || 0,
        lastSavedTime: data.lastSavedTime || "未知时间"
      };
    } catch (e) {
      return null;
    }
  }

  static clearSlot(slotId) {
    try {
      localStorage.removeItem(SaveManager.getSlotKey(slotId));
      if (slotId === 1) localStorage.removeItem(SaveManager.LEGACY_KEY);
    } catch (e) {}
  }

  static exportSaveCode(slotId = null) {
    const targetSlot = slotId || SaveManager.getActiveSlot();
    const data = SaveManager.load(targetSlot);
    return btoa(encodeURIComponent(JSON.stringify(data)));
  }

  static importSaveCode(codeStr, targetSlot = null) {
    try {
      const jsonStr = decodeURIComponent(atob(codeStr.trim()));
      const data = JSON.parse(jsonStr);
      if (!data || typeof data !== "object") throw new Error("无效存档格式");
      const slot = targetSlot || SaveManager.getActiveSlot();
      data.slotId = slot;
      SaveManager.save(data, slot);
      return data;
    } catch (e) {
      throw new Error("存档代码解析失败，请检查是否完整复制！");
    }
  }
}

class PushWarGameApp {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.battle = new BattleWorld(this.canvas);
    this.story = new StoryManager();

    // 战前铜钱军策投资状态
    this.prebattleInvest = {
      extraGold: false,
      fastFarm: false,
      startCatapult: false
    };

    // 挂载全局句柄，支持内联 HTML 快速调用
    window.gameApp = this;
    window.HERO_META = HERO_META;
    window.GENERALS_ARCHIVE = GENERALS_ARCHIVE;
    window.STORY_CHAPTERS = STORY_CHAPTERS;
    window.FACTION_CAMPAIGNS = FACTION_CAMPAIGNS;
    window.FACTION_INFOS = FACTION_INFOS;
    window.RECRUIT_CONDITIONS = RECRUIT_CONDITIONS;
    this.heroMeta = HERO_META;
    window.storyNext = (e) => {
      if (e) {
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
        if (typeof e.preventDefault === 'function') e.preventDefault();
      }
      sound.playCoin();
      this.story.nextStep();
    };
    window.storySkip = (e) => {
      if (e) {
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
        if (typeof e.preventDefault === 'function') e.preventDefault();
      }
      this.story.skipDialog();
    };

    // 加载本地存档
    this.saveData = SaveManager.load();
    this.currentFaction = this.saveData.currentFaction || 'shu';

    this.currentStageId = 1;
    this.currentEra = 1; // 当前选中的纪元: 1(1~6章), 2(7~14章), 3(15~18章)
    this.gameState = "idle"; // 'idle', 'story', 'battling', 'result'
    this.currentView = "title"; // 'title', 'map', 'battle', 'workshop', 'equipment', 'gallery'

    // 战局内铜钱即时经济
    this.gold = 220;
    this.goldRate = this.saveData.upgrades.economyRate || 12;

    this.enemyGold = 220;
    this.enemyGoldRate = 12;
    this.goldTimer = 0;
    this.aiHeroSpawned = false;
    this.aimMouseX = null;

    // 敌方智能出兵冷却与决策状态
    this.enemySpawnCooldownTimer = 0;
    this.enemyRotationIndex = 0;
    this.playerSpawnHistory = [];
    this.enemyTargetSpawnPlan = null;
    this.enemyPlanWaitTicks = 0;
    this.aiTacticCooldown = 0;

    // 📜 三十六计锦囊冷却时间与计时器
    this.stratagemCD = {
      meirenji: 0,
      zhuge_ult: 0,
      jinchan: 0,
      caochuan: 0,
      shengdong: 0,
      paizhuan: 0,
      yiyidailao: 0,
      qinzei: 0,
      chenhuo: 0,
      mantian: 0
    };

    this.stratagemMaxCD = {
      meirenji: 30,
      zhuge_ult: 45,
      jinchan: 35,
      caochuan: 30,
      shengdong: 28,
      paizhuan: 22,
      yiyidailao: 25,
      qinzei: 40,
      chenhuo: 25,
      mantian: 35
    };

    this.stratagemCost = {
      meirenji: 110,
      zhuge_ult: 150,
      jinchan: 120,
      caochuan: 80,
      shengdong: 100,
      paizhuan: 95,
      yiyidailao: 90,
      qinzei: 130,
      chenhuo: 85,
      mantian: 100
    };

    // 军资武库交互状态
    this.selectedHeroForEquip = "guanyu";
    this.selectedEquipForForge = "fangtian_huaji";
    this.pickingSlot = null;
    this.currentArmoryTab = "heroes"; // heroes | forge | shop
    this.pendingRankPromotion = null;
  }

  init() {
    try { this.applyUpgradesToBattle(); } catch(e) { console.error(e); }
    try { this.bindGlobalEvents(); } catch(e) { console.error(e); }
    try { this.bindWorkshopEvents(); } catch(e) { console.error(e); }
    try { this.bindArmoryEvents(); } catch(e) { console.error(e); }
    try { this.bindStoryEvents(); } catch(e) { console.error(e); }
    try { this.bindGalleryEvents(); } catch(e) { console.error(e); }
    try { this.bindFactionTabs(); } catch(e) { console.error(e); }
    try { this.bindEraTabs(); } catch(e) { console.error(e); }
    try { this.bindArchiveEvents(); } catch(e) { console.error(e); }
    try { this.bindRankAndChestEvents(); } catch(e) { console.error(e); }

    this.switchView("title");

    // 自动补发保护：若已通关过第2章虎牢关/击败吕布但武库暂无方天画戟，自动补发 1 星方天画戟入库并保存！
    if (this.saveData && this.saveData.unlockedChapter >= 2 && (!this.saveData.inventory || !this.saveData.inventory["fangtian_huaji"])) {
      if (!this.saveData.inventory) this.saveData.inventory = {};
      this.saveData.inventory["fangtian_huaji"] = { star: 1 };
      SaveManager.save(this.saveData);
      setTimeout(() => {
        showToast("🎁 检测到主公已破虎牢关，战神神兵【方天画戟 (1星)】已补发入库！", "success");
      }, 1200);
    }

    // 启动游戏物理与渲染循环
    this.loop();
  }

  getFactionChapters(faction = this.currentFaction) {
    return FACTION_CAMPAIGNS[faction] || FACTION_CAMPAIGNS.shu;
  }

  getCurrentChapterConfig(stageId, faction = this.currentFaction) {
    const list = this.getFactionChapters(faction);
    return list.find(c => c.id === stageId) || list[0];
  }

  bindFactionTabs() {
    ['shu', 'wei', 'wu', 'qun'].forEach(f => {
      document.getElementById(`btn-faction-${f}`)?.addEventListener("click", () => {
        if (this.currentFaction === f) return;
        this.currentFaction = f;
        this.saveData.currentFaction = f;
        this.currentEra = 1;
        sound.playCoin();
        SaveManager.save(this.saveData);
        this.renderCampaignMap();
      });
    });
  }

  bindEraTabs() {
    [1, 2, 3].forEach(era => {
      document.getElementById(`btn-era-${era}`)?.addEventListener("click", () => {
        this.currentEra = era;
        sound.playCoin();
        [1, 2, 3].forEach(e => {
          const tab = document.getElementById(`btn-era-${e}`);
          if (tab) {
            if (e === era) tab.classList.add("active");
            else tab.classList.remove("active");
          }
        });
        this.renderCampaignMap();
      });
    });
  }

  bindGalleryEvents() {
    // 图鉴交互已经在 renderGalleryView 中绑定动态事件
  }

  // 绑定军机总督府存档事件
  bindArchiveEvents() {
    // 打开弹窗入口
    document.getElementById("btn-menu-archive")?.addEventListener("click", () => this.openArchiveModal());
    document.getElementById("btn-map-to-archive")?.addEventListener("click", () => this.openArchiveModal());

    // 关闭弹窗
    document.getElementById("btn-archive-close")?.addEventListener("click", () => {
      document.getElementById("modal-archive-manager")?.classList.remove("open");
    });

    // 导出存档代码并复制
    document.getElementById("btn-archive-export")?.addEventListener("click", () => {
      try {
        const code = SaveManager.exportSaveCode();
        const area = document.getElementById("archive-code-area");
        if (area) area.value = code;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(() => {
            showToast("📋 存档代码已成功复制到系统剪贴板！");
          }).catch(() => {
            showToast("📋 存档代码已生成，请长按文本框复制！");
          });
        } else {
          showToast("📋 存档代码已生成，请长按文本框复制！");
        }
      } catch (err) {
        showToast("导出存档失败：" + err.message, "error");
      }
    });

    // 导入存档代码
    document.getElementById("btn-archive-import")?.addEventListener("click", () => {
      const area = document.getElementById("archive-code-area");
      const code = area?.value?.trim();
      if (!code) {
        showToast("请先在文本框中粘贴存档代码！", "error");
        return;
      }
      try {
        const loaded = SaveManager.importSaveCode(code);
        this.saveData = loaded;
        this.applyUpgradesToBattle();
        this.updateTitleScreen();
        this.renderCampaignMap();
        this.openArchiveModal();
        sound.playVictory();
        showToast("📥 存档代码恢复成功！已切换为主公进度！");
      } catch (err) {
        showToast("导入失败：代码格式无效或损坏！", "error");
      }
    });

    // 清空重置当前槽位
    document.getElementById("btn-archive-reset-all")?.addEventListener("click", () => {
      const activeSlot = SaveManager.getActiveSlot();
      if (confirm(`⚠️ 危险操作提示：\n\n确定要清空重置【存档位 ${activeSlot}】的全部进度吗？\n所有战役进度与装备将被归零，主公需重新启程！`)) {
        SaveManager.clearSlot(activeSlot);
        this.saveData = SaveManager.load(activeSlot);
        this.applyUpgradesToBattle();
        this.updateTitleScreen();
        this.renderCampaignMap();
        this.renderArchiveSlots();
        sound.playDrum();
        showToast(`🔄 存档位 ${activeSlot} 已成功重置，恭迎主公再战天下！`);
      }
    });
  }

  openArchiveModal() {
    const modal = document.getElementById("modal-archive-manager");
    if (!modal) return;
    modal.classList.add("open");

    const curSlot = SaveManager.getActiveSlot();
    const tag = document.getElementById("archive-current-slot-tag");
    if (tag) tag.textContent = `存档位 ${curSlot}`;

    const timeEl = document.getElementById("archive-last-autosave-time");
    if (timeEl) timeEl.textContent = `最后保存：${this.saveData.lastSavedTime || "刚刚"}`;

    this.renderArchiveSlots();
  }

  renderArchiveSlots() {
    const listEl = document.getElementById("archive-slots-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    const activeSlot = SaveManager.getActiveSlot();

    [1, 2, 3].forEach(slotId => {
      const info = SaveManager.getSlotInfo(slotId);
      const isActive = slotId === activeSlot;
      const card = document.createElement("div");
      card.className = `archive-slot-card ${isActive ? 'active-slot' : ''}`;

      let chapterTitle = "第 1 章 · 桃园结义";
      const slotFaction = info?.currentFaction || 'shu';
      const slotFactionList = FACTION_CAMPAIGNS[slotFaction] || FACTION_CAMPAIGNS.shu;
      if (info && info.chapter && slotFactionList[info.chapter - 1]) {
        chapterTitle = slotFactionList[info.chapter - 1].title;
      }

      card.innerHTML = `
        <div style="flex:1;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <strong style="color:#1e293b; font-size:1.05rem;">💾 存档位 ${slotId}</strong>
            ${isActive ? '<span class="slot-badge-active">当前活跃</span>' : ''}
          </div>
          ${info ? `
            <div style="font-size:0.9rem; color:#475569; margin-bottom:2px;">
              <span>🚩 进度：<strong>${chapterTitle}</strong></span>
              <span style="margin-left:10px; color:#d97706;">⭐ 战功: ${info.stars} / 54</span>
            </div>
            <div style="font-size:0.85rem; color:#64748b;">
              <span>🪙 ${info.copper}</span>
              <span style="margin-left:8px;">🥈 ${info.silver}</span>
              <span style="margin-left:8px;">💰 ${info.goldIngots}</span>
              <span style="margin-left:12px; color:#94a3b8;">🕒 ${info.lastSavedTime}</span>
            </div>
          ` : `
            <div style="font-size:0.85rem; color:#94a3b8; font-style:italic;">📭 空白未占用存档位</div>
          `}
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          ${!isActive && info ? `
            <button class="btn-archive-op btn-archive-load" data-action="load" data-slot="${slotId}">📂 载入此档</button>
          ` : ''}
          <button class="btn-archive-op btn-archive-save" data-action="save" data-slot="${slotId}">💾 覆盖保存</button>
          ${info ? `
            <button class="btn-archive-op btn-archive-delete" data-action="delete" data-slot="${slotId}">🗑️ 清空</button>
          ` : ''}
        </div>
      `;

      card.querySelector('[data-action="load"]')?.addEventListener("click", () => {
        SaveManager.setActiveSlot(slotId);
        this.saveData = SaveManager.load(slotId);
        this.applyUpgradesToBattle();
        this.updateTitleScreen();
        this.renderCampaignMap();
        sound.playVictory();
        showToast(`📂 成功切换并载入【存档位 ${slotId}】！`);
        this.openArchiveModal();
      });

      card.querySelector('[data-action="save"]')?.addEventListener("click", () => {
        SaveManager.save(this.saveData, slotId);
        if (!isActive) SaveManager.setActiveSlot(slotId);
        sound.playCoin();
        showToast(`💾 进度已成功保存至【存档位 ${slotId}】！`);
        this.openArchiveModal();
      });

      card.querySelector('[data-action="delete"]')?.addEventListener("click", () => {
        if (confirm(`确定要清空【存档位 ${slotId}】的数据吗？`)) {
          SaveManager.clearSlot(slotId);
          if (slotId === activeSlot) {
            this.saveData = SaveManager.load(slotId);
            this.updateTitleScreen();
            this.renderCampaignMap();
          }
          showToast(`🗑️ 存档位 ${slotId} 已清空！`);
          this.renderArchiveSlots();
        }
      });

      listEl.appendChild(card);
    });
  }

  // ================= 🏛️ 武庙官阶与章节星级宝箱交互方法 =================
  bindRankAndChestEvents() {
    document.getElementById("title-player-rank")?.addEventListener("click", () => this.openMilitaryRankModal());
    document.getElementById("btn-title-stars")?.addEventListener("click", () => this.openMilitaryRankModal());
    document.getElementById("btn-map-rank")?.addEventListener("click", () => this.openMilitaryRankModal());
    document.getElementById("btn-close-rank-modal")?.addEventListener("click", () => this.closeMilitaryRankModal());
    document.getElementById("btn-promo-confirm")?.addEventListener("click", () => this.closeRankPromotionModal());
    document.getElementById("btn-chest-reward-confirm")?.addEventListener("click", () => this.closeChestRewardModal());
  }

  // 渲染当前势力章节满星宝箱行
  renderFactionStarChests() {
    const container = document.getElementById("faction-chest-row");
    if (!container) return;
    container.innerHTML = "";

    const faction = this.currentFaction || 'shu';
    const chests = FACTION_STAR_CHESTS[faction] || FACTION_STAR_CHESTS.shu;
    const currentFactionStars = (this.saveData.factionChapterStars && this.saveData.factionChapterStars[faction]) || {};
    let totalFactionStars = 0;
    Object.values(currentFactionStars).forEach(s => totalFactionStars += (s || 0));

    const claimedList = this.saveData.claimedStarChests || [];

    chests.forEach(chest => {
      const isClaimed = claimedList.includes(chest.id);
      const canClaim = !isClaimed && (totalFactionStars >= chest.stars);
      const progressRatio = Math.min(1.0, totalFactionStars / chest.stars);

      const card = document.createElement("div");
      card.className = `star-chest-card ${isClaimed ? 'claimed' : (canClaim ? 'can-claim' : '')}`;

      card.innerHTML = `
        <div class="chest-icon-box">
          <span>${isClaimed ? '📦' : (canClaim ? '🎁' : '🔒')}</span>
        </div>
        <div class="chest-info-col">
          <div class="chest-name-title">
            <span>${chest.name}</span>
          </div>
          <div class="chest-prog-text">
            <span>需达到: ${chest.stars}⭐ (当前: ${totalFactionStars}/${chest.stars})</span>
          </div>
          <div class="chest-bar-bg">
            <div class="chest-bar-fill" style="width: ${Math.floor(progressRatio * 100)}%;"></div>
          </div>
        </div>
        <button class="btn-chest-claim ${isClaimed ? 'claim-done' : (canClaim ? 'claim-ready' : 'claim-locked')}" data-chest-id="${chest.id}">
          ${isClaimed ? '已领取 √' : (canClaim ? '领取宝物 🎁' : '待达标 🔒')}
        </button>
      `;

      const btn = card.querySelector(".btn-chest-claim");
      if (canClaim) {
        btn?.addEventListener("click", (e) => {
          e.stopPropagation();
          this.claimFactionStarChest(chest);
        });
      } else if (!isClaimed) {
        btn?.addEventListener("click", (e) => {
          e.stopPropagation();
          showToast(`该宝箱需当前势力累积满 ${chest.stars}⭐！当前已有 ${totalFactionStars}⭐，内含:${chest.desc}`, "info");
        });
      }

      container.appendChild(card);
    });
  }

  // 领取势力星级宝箱奖励
  claimFactionStarChest(chest) {
    if (!this.saveData.claimedStarChests) this.saveData.claimedStarChests = [];
    if (this.saveData.claimedStarChests.includes(chest.id)) return;

    this.saveData.claimedStarChests.push(chest.id);

    // 奖励发放
    this.saveData.copper = (this.saveData.copper || 0) + chest.copper;
    this.saveData.silver = (this.saveData.silver || 0) + chest.silver;
    this.saveData.goldIngots = (this.saveData.goldIngots || 0) + chest.goldIngots;

    let lootItems = [
      { icon: "🪙", text: `铜钱 +${chest.copper}` },
      { icon: "🥈", text: `白银 +${chest.silver}` },
      { icon: "💰", text: `元宝 +${chest.goldIngots}` }
    ];

    if (chest.equipReward) {
      const eq = EQUIPMENT_DATABASE.find(e => e.id === chest.equipReward) || EQUIPMENT_DATABASE[0];
      if (!this.saveData.inventory[chest.equipReward]) {
        this.saveData.inventory[chest.equipReward] = { star: 1 };
        lootItems.push({ icon: eq.icon || "⚔️", text: `宝器【${eq.name}】已造册入武库！`, isEpic: true });
      } else {
        const shards = 8;
        this.saveData.shards[chest.equipReward] = (this.saveData.shards[chest.equipReward] || 0) + shards;
        lootItems.push({ icon: "🧩", text: `【${eq.name}】锻造残卷 +${shards}！`, isEpic: true });
      }
    }

    if (chest.shardReward) {
      const eqId = chest.shardReward.equipId;
      const count = chest.shardReward.count;
      const eq = EQUIPMENT_DATABASE.find(e => e.id === eqId) || EQUIPMENT_DATABASE[0];
      this.saveData.shards[eqId] = (this.saveData.shards[eqId] || 0) + count;
      lootItems.push({ icon: "🧩", text: `【${eq.name}】兵符残印 +${count}！`, isEpic: true });
    }

    SaveManager.save(this.saveData);
    sound.playChestOpen();

    this.openChestRewardModal(chest.name, lootItems);
    this.renderCampaignMap();
  }

  openChestRewardModal(chestName, items) {
    const modal = document.getElementById("modal-star-chest-reward");
    if (!modal) return;
    const titleEl = document.getElementById("chest-reward-title");
    if (titleEl) titleEl.textContent = `【${chestName}】开匣犒赏！`;
    const grid = document.getElementById("chest-reward-items-grid");
    if (grid) {
      grid.innerHTML = items.map(item => `
        <div class="chest-item-pill ${item.isEpic ? 'item-epic' : ''}">
          <span style="font-size:1.3rem;">${item.icon}</span>
          <span>${item.text}</span>
        </div>
      `).join('');
    }
    modal.classList.remove("hidden");
  }

  closeChestRewardModal() {
    document.getElementById("modal-star-chest-reward")?.classList.add("hidden");
  }

  // 打开武庙官阶封侯录
  openMilitaryRankModal() {
    const modal = document.getElementById("modal-military-rank");
    if (!modal) return;
    sound.playCoin();

    const totalStars = this.calculateTotalStars();
    const { curRank, nextRank, progressRatio } = getMilitaryRank(totalStars);

    document.getElementById("cur-rank-emblem").textContent = curRank.icon;
    document.getElementById("cur-rank-title").textContent = curRank.name;
    document.getElementById("cur-rank-motto").textContent = `“${curRank.motto}”`;
    document.getElementById("cur-rank-perks").innerHTML = `
      <span class="rank-perk-badge">⚔️ 全军攻击 +${Math.round(curRank.atkBonus * 100)}%</span>
      <span class="rank-perk-badge">🛡️ 全军基础护甲 +${curRank.defBonus}</span>
    `;

    document.getElementById("rank-total-stars-val").textContent = totalStars;
    document.getElementById("rank-next-need-label").textContent = nextRank 
      ? `下一阶【${nextRank.name.split(' · ')[1] || nextRank.name}】需 ${nextRank.minStars}⭐` 
      : '已达天下兵马大将军最高极阶！';
    document.getElementById("rank-progress-bar-fill").style.width = `${Math.floor(progressRatio * 100)}%`;

    // 渲染天梯阶梯
    const ladderEl = document.getElementById("rank-ladder-scroll");
    if (ladderEl) {
      ladderEl.innerHTML = MILITARY_RANKS.map(r => {
        const isUnlocked = totalStars >= r.minStars;
        const isCurrent = curRank.rank === r.rank;
        return `
          <div class="rank-item-card ${isUnlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''}">
            <div class="rank-item-left">
              <span class="rank-item-icon">${r.icon}</span>
              <div class="rank-item-info">
                <div class="rank-item-name">${r.name}</div>
                <div class="rank-item-perk">${r.buffDesc} · 解锁需 ${r.minStars}⭐</div>
              </div>
            </div>
            <div class="rank-item-status-tag ${isCurrent ? 'tag-cur' : (isUnlocked ? 'tag-done' : 'tag-lock')}">
              ${isCurrent ? '当前官职' : (isUnlocked ? '已受敕封 √' : '未解锁 🔒')}
            </div>
          </div>
        `;
      }).join('');
    }

    modal.classList.remove("hidden");
  }

  closeMilitaryRankModal() {
    document.getElementById("modal-military-rank")?.classList.add("hidden");
  }

  // 打开加官晋爵仪式弹窗
  openRankPromotionModal(newRank) {
    const modal = document.getElementById("modal-rank-promotion");
    if (!modal) return;
    sound.playRankUp();

    document.getElementById("promo-rank-icon").textContent = newRank.icon;
    document.getElementById("promo-rank-name").textContent = newRank.name;
    document.getElementById("promo-rank-motto").textContent = `“${newRank.motto}”`;
    document.getElementById("promo-rank-buff").innerHTML = `
      <span>⚔️ 全军攻击加成提升至: <strong>+${Math.round(newRank.atkBonus * 100)}%</strong></span>
      <span>🛡️ 全军基础护甲提升至: <strong>+${newRank.defBonus}</strong></span>
    `;

    modal.classList.remove("hidden");
  }

  closeRankPromotionModal() {
    document.getElementById("modal-rank-promotion")?.classList.add("hidden");
    this.updateTitleScreen();
    this.renderCampaignMap();
  }

  // 同步科技树数值与名将穿戴三大神装到战场实例
  applyUpgradesToBattle() {
    this.battle.upgrades.infantryHp = this.saveData.upgrades.infantryHp || 0;
    this.battle.upgrades.archerPower = this.saveData.upgrades.archerPower || 0;
    this.battle.upgrades.bombPower = this.saveData.upgrades.bombPower || 0;
    this.battle.upgrades.castleHp = (this.saveData.upgrades.castleHp || 0) + (this.saveData.upgrades.copperWallHp || 0);
    this.battle.upgrades.towerDmg = !!this.saveData.upgrades.towerDmg;
    this.battle.upgrades.superCharm = !!this.saveData.upgrades.superCharm;
    this.goldRate = this.saveData.upgrades.economyRate || 12;

    // 全军战术军略科技映射 (成长阶梯与上限换算)
    this.battle.upgrades.dodgeRate = (this.saveData.upgrades.armyDodgeRank || 0) * 0.03;
    this.battle.upgrades.stunResist = (this.saveData.upgrades.armyStunResistRank || 0) * 0.08;
    this.battle.upgrades.critRate = (this.saveData.upgrades.armyCritRank || 0) * 0.035;
    this.battle.upgrades.lifestealRate = (this.saveData.upgrades.armyLifestealRank || 0) * 0.03;
    this.battle.upgrades.armyDefense = (this.saveData.upgrades.armyDefenseRank || 0) * 8;

    // 遍历计算所有已解锁名将当前穿戴装备属性
    this.battle.heroEquipBonuses = {};
    const heroes = ["liubei", "guanyu", "zhangfei", "zhaoyun", "huangzhong", "taishici", "machao", "weiyan", "pangtong", "jiangwei"];
    heroes.forEach(hId => {
      const loadout = this.saveData.generalEquip[hId];
      this.battle.heroEquipBonuses[hId] = calculateHeroEquipBonuses(loadout, this.saveData.inventory);
    });
  }

  // 页面状态机切换
  switchView(viewName) {
    this.currentView = viewName;

    const views = {
      title: document.getElementById("view-title-screen"),
      map: document.getElementById("view-campaign-map"),
      battle: document.getElementById("view-battle-screen"),
      workshop: document.getElementById("view-workshop-screen"),
      armory: document.getElementById("view-armory-screen"),
      gallery: document.getElementById("view-gallery-screen")
    };

    Object.keys(views).forEach(k => {
      if (views[k]) {
        if (k === viewName) views[k].classList.remove("hidden");
        else views[k].classList.add("hidden");
      }
    });

    if (viewName === "title") {
      this.updateTitleScreen();
    } else if (viewName === "map") {
      this.renderCampaignMap();
    } else if (viewName === "workshop") {
      this.renderWorkshopView();
    } else if (viewName === "armory") {
      this.renderArmoryView();
    } else if (viewName === "gallery") {
      this.renderGalleryView();
    } else if (viewName === "battle") {
      this.battle.resize();
    }
  }

  calculateTotalStars() {
    let totalStars = 0;
    if (this.saveData.factionChapterStars) {
      ['shu', 'wei', 'wu', 'qun'].forEach(f => {
        const fObj = this.saveData.factionChapterStars[f];
        if (fObj) Object.values(fObj).forEach(s => totalStars += (s || 0));
      });
    } else {
      Object.values(this.saveData.chapterStars || {}).forEach(s => totalStars += (s || 0));
    }
    return totalStars;
  }

  // 更新主菜单战绩与武庙官阶
  updateTitleScreen() {
    const totalStars = this.calculateTotalStars();
    const rankInfo = getMilitaryRank(totalStars);
    
    const starEl = document.getElementById("title-total-stars");
    if (starEl) starEl.textContent = totalStars;

    const copperEl = document.getElementById("title-total-copper");
    if (copperEl) copperEl.textContent = this.saveData.copper || 0;

    const silverEl = document.getElementById("title-total-silver");
    if (silverEl) silverEl.textContent = this.saveData.silver;

    const goldIngotEl = document.getElementById("title-total-gold-ingot");
    if (goldIngotEl) goldIngotEl.textContent = this.saveData.goldIngots;

    const rankEl = document.getElementById("title-player-rank");
    if (rankEl) {
      rankEl.innerHTML = `${rankInfo.curRank.icon} ${rankInfo.curRank.name}`;
      rankEl.title = `武庙官阶: ${rankInfo.curRank.name}\n${rankInfo.curRank.buffDesc}\n点击查看封侯录`;
    }
  }

  // 渲染战役世界大地图 (支持四大势力专属传记切换与纪元过滤)
  renderCampaignMap() {
    const grid = document.getElementById("campaign-chapters-grid");
    if (!grid) return;

    const totalStars = this.calculateTotalStars();
    const rankInfo = getMilitaryRank(totalStars);

    const mapRankIcon = document.getElementById("map-rank-icon");
    if (mapRankIcon) mapRankIcon.textContent = rankInfo.curRank.icon;
    const mapRankDisplay = document.getElementById("map-rank-display");
    if (mapRankDisplay) mapRankDisplay.textContent = rankInfo.curRank.name.split(' · ')[1] || rankInfo.curRank.name;
    const mapRankBtn = document.getElementById("btn-map-rank");
    if (mapRankBtn) mapRankBtn.title = `武庙官阶: ${rankInfo.curRank.name}\n${rankInfo.curRank.buffDesc}\n点击查看封侯录`;

    const mapCopperEl = document.getElementById("map-copper-display");
    if (mapCopperEl) mapCopperEl.textContent = this.saveData.copper || 0;

    document.getElementById("map-silver-display").textContent = this.saveData.silver;
    document.getElementById("map-gold-ingot-display").textContent = this.saveData.goldIngots;
    const bestTag = document.getElementById("map-endless-best-tag");
    if (bestTag) bestTag.textContent = `最佳: ${this.saveData.maxEndlessWave || 0}波`;
    grid.innerHTML = "";

    // 渲染当前势力章节满星宝箱
    this.renderFactionStarChests();

    // 激活势力选项卡
    ['shu', 'wei', 'wu', 'qun'].forEach(f => {
      const btn = document.getElementById(`btn-faction-${f}`);
      if (btn) {
        if (f === this.currentFaction) btn.classList.add("active");
        else btn.classList.remove("active");
      }
    });

    // 更新势力横幅与誓词
    const factionMeta = FACTION_INFOS[this.currentFaction] || FACTION_INFOS.shu;
    const bannerEl = document.getElementById("faction-banner");
    if (bannerEl) bannerEl.style.background = factionMeta.bgGradient;
    const badgeEl = document.getElementById("faction-banner-badge");
    if (badgeEl) badgeEl.textContent = `${factionMeta.badge} · ${factionMeta.subtitle.split(' · ')[0]}`;
    const quoteEl = document.getElementById("faction-banner-quote");
    if (quoteEl) quoteEl.textContent = factionMeta.quote;
    const buffEl = document.getElementById("faction-banner-buff");
    if (buffEl) buffEl.textContent = `⚔️ ${factionMeta.buffDesc}`;

    const chapters = this.getFactionChapters();
    const currentProgress = (this.saveData.factionProgress && this.saveData.factionProgress[this.currentFaction]) || 1;
    const currentFactionStars = (this.saveData.factionChapterStars && this.saveData.factionChapterStars[this.currentFaction]) || {};
    let totalFactionStars = 0;
    Object.values(currentFactionStars).forEach(s => totalFactionStars += (s || 0));

    const progEl = document.getElementById("faction-progress-num");
    if (progEl) progEl.textContent = `${Math.min(currentProgress, chapters.length)}/${chapters.length}`;
    const starEl = document.getElementById("faction-stars-num");
    if (starEl) starEl.textContent = `${totalFactionStars}⭐`;

    const eraTabBar = document.getElementById("era-tab-bar");
    let displayChapters = chapters;
    if (this.currentFaction === 'shu') {
      if (eraTabBar) eraTabBar.style.display = "flex";
      displayChapters = chapters.filter(ch => ch.era === this.currentEra);
    } else {
      if (eraTabBar) eraTabBar.style.display = "none";
      displayChapters = chapters;
    }

    const CHAPTER_BOSS_DROP = {
      shu: {
        1: "jingtiejian", 2: "fangtian_huaji", 3: "baodiao_gong", 4: "tiebi_kai",
        5: "shuanggu_jian", 6: "shoumian_kai", 7: "qinglong_dao", 8: "dilu_ma",
        9: "longdan_qiang", 10: "zhangba_shemao", 11: "chitu_ma", 12: "zhanjin_qiang",
        13: "baodiao_gong", 14: "qinglong_dao", 15: "shoumian_kai", 16: "longdan_qiang",
        17: "tiebi_kai", 18: "yitian_jian"
      },
      wei: {
        1: "jingtiejian", 2: "tiebi_kai", 3: "fangtian_huaji", 4: "shoumian_kai",
        5: "qinglong_dao", 6: "baodiao_gong", 7: "zhanjin_qiang", 8: "dilu_ma",
        9: "yitian_jian"
      },
      wu: {
        1: "jingtiejian", 2: "baodiao_gong", 3: "tiebi_kai", 4: "shoumian_kai",
        5: "chitu_ma", 6: "longdan_qiang", 7: "shuanggu_jian", 8: "qinglong_dao",
        9: "yitian_jian"
      },
      qun: {
        1: "jingtiejian", 2: "tiebi_kai", 3: "fangtian_huaji", 4: "baodiao_gong",
        5: "shuanggu_jian", 6: "zhanjin_qiang", 7: "chitu_ma", 8: "yitian_jian"
      }
    };
    const factionDropMap = CHAPTER_BOSS_DROP[this.currentFaction] || CHAPTER_BOSS_DROP.shu;

    displayChapters.forEach(ch => {
      const isUnlocked = ch.id <= currentProgress;
      const stars = currentFactionStars[ch.id] || 0;

      let starStr = "";
      for (let i = 0; i < 3; i++) {
        starStr += i < stars ? "⭐" : "⚪";
      }

      const isThreeStars = (stars === 3);
      const card = document.createElement("div");
      card.className = `chapter-map-card ${isUnlocked ? '' : 'locked'} ${isThreeStars ? 'three-stars-cleared' : ''}`;
      const isAvatarImg = ch.enemyAvatar && (ch.enemyAvatar.endsWith('.png') || ch.enemyAvatar.includes('/'));
      const chapterAvatarHtml = isAvatarImg 
        ? `<img src="${ch.enemyAvatar}" class="chapter-avatar-pixel-img" alt="${ch.enemyName}" />` 
        : ch.enemyAvatar;

      const dropEquipId = factionDropMap[ch.id];
      const dropEquip = dropEquipId ? EQUIPMENT_DATABASE.find(e => e.id === dropEquipId) : null;
      const isEquipOwned = dropEquipId ? !!this.saveData.inventory[dropEquipId] : false;
      const dropHintText = dropEquip 
        ? (isEquipOwned ? `🧩 搜集残卷: ${dropEquip.name} x2~5` : `🎁 首捷必获: ${dropEquip.name}`)
        : `🥈+${ch.rewardSilver} 💰+${ch.rewardGoldIngot}`;

      const btnLabel = isUnlocked ? (isThreeStars ? '演兵再战 ⚔️' : (stars > 0 ? '再搴敌阵 ⚔️' : '出征 ⚔️')) : '🔒 待解锁';

      card.innerHTML = `
        <div class="chapter-card-top">
          <div class="chapter-avatar">${chapterAvatarHtml}</div>
          <div class="chapter-card-info">
            <div class="chapter-num-tag">第 ${ch.id} 章 · ${ch.name}</div>
            <div class="chapter-name-title">${ch.title.split(" · ")[1] || ch.title}</div>
          </div>
        </div>
        <div class="chapter-stars-row">${starStr}</div>
        <div class="chapter-card-bottom">
          <span class="chapter-reward-tag" style="background:${isEquipOwned ? '#f0fdf4' : '#fffbeb'}; color:${isEquipOwned ? '#166534' : '#b45309'}; border:1px solid ${isEquipOwned ? '#bbf7d0' : '#fde68a'}; font-size:0.75rem; font-weight:bold;">
            ${dropHintText}
          </span>
          <button class="btn-enter-stage">${btnLabel}</button>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener("click", () => {
          sound.playCoin();
          this.openPreBattleModal(ch.id);
        });
      }

      grid.appendChild(card);
    });
  }

  // 打开战前军情布阵弹窗 (支持铜钱战前投资、战役目标展示与名将出征编队至多3人)
  openPreBattleModal(stageId) {
    this.currentStageId = stageId;
    let ch;
    if (stageId === 'endless') {
      const best = this.saveData.maxEndlessWave || 0;
      ch = {
        id: 'endless',
        title: "🏯 铜雀演武 · 终局试炼",
        subtitle: "车轮血战 · 抵御各路诸侯无穷狂潮！",
        enemyAvatar: "🏯",
        enemyName: "诸侯联军",
        castleHp: 3000,
        briefing: {
          enemyType: "三国诸侯精锐与四方名将",
          strategyTip: "每 3 波必出敌军绝世神将！请合理搭配 3 人羁绊与神兵全力坚守！"
        },
        objective: {
          type: "endless",
          label: "铜雀演武",
          desc: `抵御无尽敌潮！历史最佳纪录: ${best} 波`
        }
      };
    } else {
      ch = this.getCurrentChapterConfig(stageId);
    }

    document.getElementById("pre-stage-title").textContent = ch.title;
    document.getElementById("pre-stage-sub").textContent = ch.subtitle;

    const preAvatarEl = document.getElementById("pre-stage-avatar");
    if (ch.enemyAvatar && (ch.enemyAvatar.endsWith('.png') || ch.enemyAvatar.includes('/'))) {
      preAvatarEl.innerHTML = `<img src="${ch.enemyAvatar}" class="pre-stage-avatar-pixel-img" alt="${ch.enemyName}" />`;
    } else {
      preAvatarEl.textContent = ch.enemyAvatar;
    }
    document.getElementById("pre-enemy-hp-badge").textContent = stageId === 'endless' ? `纪录: ${this.saveData.maxEndlessWave || 0} 波` : ("敌寨血量: " + ch.castleHp);
    document.getElementById("pre-enemy-types").textContent = "敌军主力：" + ch.briefing.enemyType;
    document.getElementById("pre-strategy-tip").textContent = ch.briefing.strategyTip;

    // 渲染战役多元目标与名将出征编队
    this.renderPreBattleObjectiveAndSquad(ch);

    // 渲染可用铜钱并绑定战前投资复选框
    const copperEl = document.getElementById("pre-invest-copper-display");
    if (copperEl) copperEl.textContent = this.saveData.copper;

    const chkGold = document.getElementById("chk-invest-gold");
    const chkFarm = document.getElementById("chk-invest-farm");
    const chkCatapult = document.getElementById("chk-invest-catapult");

    if (chkGold) chkGold.checked = this.prebattleInvest.extraGold;
    if (chkFarm) chkFarm.checked = this.prebattleInvest.fastFarm;
    if (chkCatapult) chkCatapult.checked = this.prebattleInvest.startCatapult;

    if (chkGold) chkGold.onchange = () => this.prebattleInvest.extraGold = chkGold.checked;
    if (chkFarm) chkFarm.onchange = () => this.prebattleInvest.fastFarm = chkFarm.checked;
    if (chkCatapult) chkCatapult.onchange = () => this.prebattleInvest.startCatapult = chkCatapult.checked;

    document.getElementById("prebattle-modal")?.classList.add("open");
  }

  // 渲染战役目标卡片与名将出征编队
  renderPreBattleObjectiveAndSquad(ch) {
    const obj = ch.objective || { type: "destroy_castle", label: "攻城破寨", desc: "击溃敌方要塞！" };

    const iconEl = document.getElementById("pre-obj-icon");
    const badgeEl = document.getElementById("pre-obj-badge");
    const titleEl = document.getElementById("pre-obj-title");
    const descEl = document.getElementById("pre-obj-desc");

    if (iconEl) {
      iconEl.textContent = obj.type === 'assassinate_boss' ? '🎯' : (obj.type === 'defend_time' ? '⏳' : '🏰');
    }
    if (badgeEl) {
      badgeEl.textContent = obj.label || "战役目标";
      badgeEl.style.background = obj.type === 'assassinate_boss' ? '#dc2626' : (obj.type === 'defend_time' ? '#d97706' : '#2563eb');
    }
    if (titleEl) titleEl.textContent = obj.label || "攻城破寨";
    if (descEl) descEl.textContent = obj.desc || "击溃敌方要塞！";

    this.renderPreBattleSquadUI();
  }

  renderPreBattleSquadUI() {
    if (!this.saveData.recruitedHeroes) this.saveData.recruitedHeroes = ["liubei", "guanyu", "zhangfei"];
    if (!this.saveData.selectedHeroes) this.saveData.selectedHeroes = ["liubei", "guanyu", "zhangfei"];

    const selected = this.saveData.selectedHeroes;
    const recruited = this.saveData.recruitedHeroes;

    const pill = document.getElementById("squad-counter-pill");
    if (pill) {
      pill.textContent = `已遣 ${selected.length} / 3`;
      pill.style.background = selected.length === 3 ? '#dbeafe' : '#fef3c7';
      pill.style.color = selected.length === 3 ? '#1e40af' : '#b45309';
    }

    // 渲染 3 大出战槽位
    const slotsEl = document.getElementById("pre-squad-slots");
    if (slotsEl) {
      slotsEl.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const heroId = selected[i];
        const slotCard = document.createElement("div");
        slotCard.className = `squad-slot-card ${heroId ? "occupied" : "empty"}`;

        if (heroId && HERO_META[heroId]) {
          const meta = HERO_META[heroId];
          const camp = meta.camp || HERO_CAMP_MAP[heroId] || 'shu';
          const campName = CAMP_META[camp]?.name || '蜀汉';
          slotCard.innerHTML = `
            <img src="${meta.avatar}" alt="${meta.name}" class="squad-slot-avatar" />
            <div class="squad-slot-name">${meta.name}</div>
            <div style="font-size:0.7rem; color:#64748b; margin-top:1px;"><span class="squad-camp-badge camp-tag-${camp}">${campName}</span></div>
            <div class="squad-slot-remove-tag">✕ 点击卸任</div>
          `;
          slotCard.onclick = () => {
            if (this.saveData.selectedHeroes.length <= 1) {
              showToast("⚠️ 出征大军需至少派遣 1 员大将领军！", "error");
              return;
            }
            this.saveData.selectedHeroes = this.saveData.selectedHeroes.filter(h => h !== heroId);
            SaveManager.save(this.saveData);
            sound.playCoin();
            this.renderPreBattleSquadUI();
          };
        } else {
          slotCard.innerHTML = `
            <div class="squad-slot-empty-title">➕ 待遣主将</div>
            <div class="squad-slot-empty-hint">点击下方名册遣将</div>
          `;
        }
        slotsEl.appendChild(slotCard);
      }
    }

    // 实时计算当前编队激活的羁绊与总军饷耗资
    const activeSynergies = calculateActiveSynergies(selected);
    const totalCost = selected.reduce((sum, hId) => sum + (HERO_META[hId]?.cost || 0), 0);

    const costPill = document.getElementById("pre-squad-cost-pill");
    if (costPill) {
      costPill.textContent = `总召唤耗资: ${totalCost} 🪙`;
    }

    const synEl = document.getElementById("pre-squad-synergies");
    if (synEl) {
      synEl.innerHTML = "";
      if (activeSynergies.length === 0) {
        synEl.innerHTML = `<span style="font-size:0.75rem; color:#94a3b8; padding:4px 0;">暂未激活羁绊（搭配同国武将或历史渊源大将可激活阵营共鸣与终极神技）</span>`;
      } else {
        activeSynergies.forEach(syn => {
          const badge = document.createElement("div");
          badge.className = `synergy-pill-badge ${syn.category}`;
          badge.title = syn.desc;
          badge.innerHTML = `
            <span>${syn.icon}</span>
            <strong>${syn.name}</strong>
            <span class="synergy-short-desc">${syn.shortBonus || syn.desc}</span>
          `;
          synEl.appendChild(badge);
        });
      }
    }

    // 绑定阵营分类筛选按钮
    const filterCamp = this.rosterCampFilter || 'all';
    const filterBtns = document.querySelectorAll(".roster-camp-btn");
    filterBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.camp === filterCamp);
      btn.onclick = (e) => {
        this.rosterCampFilter = e.currentTarget.dataset.camp;
        this.renderPreBattleSquadUI();
      };
    });

    // 渲染主公麾下名将名册 (支持按阵营过滤与显示阵营标签)
    const rosterEl = document.getElementById("pre-squad-roster");
    if (rosterEl) {
      rosterEl.innerHTML = "";
      const displayList = recruited.filter(heroId => {
        if (filterCamp === 'all') return true;
        const camp = HERO_META[heroId]?.camp || HERO_CAMP_MAP[heroId] || 'shu';
        return camp === filterCamp;
      });

      if (displayList.length === 0) {
        rosterEl.innerHTML = `<span style="font-size:0.75rem; color:#94a3b8; padding:8px;">暂无该阵营待命武将（随战役深入可纳降收编）</span>`;
      }

      displayList.forEach(heroId => {
        const meta = HERO_META[heroId];
        if (!meta) return;
        const isSelected = selected.includes(heroId);
        const camp = meta.camp || HERO_CAMP_MAP[heroId] || 'shu';
        const campName = CAMP_META[camp]?.name || '蜀';

        const pillBtn = document.createElement("div");
        pillBtn.className = `squad-roster-pill ${isSelected ? "active" : ""}`;
        pillBtn.innerHTML = `
          <img src="${meta.avatar}" alt="${meta.name}" class="squad-roster-pill-img" />
          <span class="squad-camp-badge camp-tag-${camp}">${campName}</span>
          <span class="squad-roster-pill-name">${meta.name}</span>
          <span class="squad-roster-pill-badge">${isSelected ? "已出战" : "待命"}</span>
        `;

        pillBtn.onclick = () => {
          if (isSelected) {
            if (this.saveData.selectedHeroes.length <= 1) {
              showToast("⚠️ 出征大军需至少派遣 1 员大将领军！", "error");
              return;
            }
            this.saveData.selectedHeroes = this.saveData.selectedHeroes.filter(h => h !== heroId);
            SaveManager.save(this.saveData);
            sound.playCoin();
            this.renderPreBattleSquadUI();
          } else {
            if (this.saveData.selectedHeroes.length >= 3) {
              showToast("⚠️ 出战名将至多 3 员！请先在上方卡槽换下大将！", "error");
              return;
            }
            this.saveData.selectedHeroes.push(heroId);
            SaveManager.save(this.saveData);
            sound.playCoin();
            this.renderPreBattleSquadUI();
          }
        };

        rosterEl.appendChild(pillBtn);
      });
    }
  }

  // 正式开启关卡战役
  startStage(stageId) {
    document.getElementById("prebattle-modal")?.classList.remove("open");
    document.getElementById("battle-result-modal")?.classList.remove("open");

    this.currentStageId = stageId;
    this.switchView("battle");

    // 开启战歌循环 BGM
    sound.startBgm();

    const isEndless = stageId === 'endless';
    this.isEndlessMode = isEndless;
    let ch;

    if (isEndless) {
      this.endlessWave = 1;
      this.endlessWaveTimer = 0;
      ch = {
        id: 'endless',
        castleHp: 3200,
        enemyGoldRate: 12,
        enemyName: "诸侯联军",
        enemyTitle: "第 1 波狂潮",
        allowedGeneralCards: Object.keys(HERO_META),
        objective: { type: 'endless', label: '铜雀演武', desc: '抵御无穷敌潮，守卫要塞！' }
      };
    } else {
      ch = this.getCurrentChapterConfig(stageId);
    }
    this.enemyGoldRate = ch.enemyGoldRate || 12;

    // 结算并应用战前铜钱投资特权
    let investCost = 0;
    let extraStartGold = 0;
    let extraFarmRate = 0;
    let spawnStartCatapult = false;

    if (this.prebattleInvest.extraGold && this.saveData.copper >= (investCost + 150)) {
      investCost += 150;
      extraStartGold = 150;
    }
    if (this.prebattleInvest.fastFarm && this.saveData.copper >= (investCost + 120)) {
      investCost += 120;
      extraFarmRate = 6;
    }
    if (this.prebattleInvest.startCatapult && this.saveData.copper >= (investCost + 180)) {
      investCost += 180;
      spawnStartCatapult = true;
    }

    if (investCost > 0) {
      this.saveData.copper -= investCost;
      SaveManager.save(this.saveData);
    }

    this.gold = 220 + extraStartGold;
    this.goldRate = (this.saveData.upgrades.economyRate || 12) + extraFarmRate;
    this.enemyGold = 220;
    this.aiHeroSpawned = false;
    this.playerSpawnHistory = [];
    this.enemyTargetSpawnPlan = null;
    this.enemyPlanWaitTicks = 0;
    this.aiTacticCooldown = 0;

    // 重置所有计谋 CD
    Object.keys(this.stratagemCD).forEach(k => this.stratagemCD[k] = 0);

    // 传入战役目标系统
    this.battle.init(ch.castleHp, stageId, ch.objective);

    // 注入战前编队激活的羁绊与平衡数值
    const selected = this.saveData.selectedHeroes || ["liubei", "guanyu", "zhangfei"];
    const activeSynergies = calculateActiveSynergies(selected);
    const synergyBuffs = aggregateSynergyBuffs(activeSynergies);
    if (this.battle && this.battle.setSynergies) {
      this.battle.setSynergies(activeSynergies, synergyBuffs, this);
    }

    // 注入武庙官阶全军攻击与护甲属性加成
    const currentTotalStars = this.calculateTotalStars();
    const rankInfo = getMilitaryRank(currentTotalStars);
    if (this.battle && this.battle.setRankBuff) {
      this.battle.setRankBuff({ atkBonus: rankInfo.curRank.atkBonus, defBonus: rankInfo.curRank.defBonus });
    }

    // 自动映射历史战役多元地形与动态天气 (plains, naval, mountain, night_fire, desert)
    let battlefieldTheme = ch.battlefieldTheme || 'plains';
    let battlefieldWeather = ch.battlefieldWeather || 'sunny';

    if (!ch.battlefieldTheme) {
      const fullText = `${ch.enemyName || ''} ${ch.enemyTitle || ''} ${ch.id || ''} ${ch.desc || ''}`;
      if (/赤壁|濡须|渡江|水淹|水战|江夏|柴桑|津|白帝/.test(fullText)) {
        battlefieldTheme = 'naval';
        battlefieldWeather = 'mist';
      } else if (/宛城|火|夜|下邳|濮阳|乌巢|官渡|火烧|夷陵/.test(fullText)) {
        battlefieldTheme = 'night_fire';
        battlefieldWeather = 'fire_embers';
      } else if (/落凤|定军|祁山|街亭|山|险|栈道|剑门|斜谷|南中|泸水/.test(fullText)) {
        battlefieldTheme = 'mountain';
        battlefieldWeather = 'wind';
      } else if (/西凉|马超|潼关|渭水|凉州|荒|界桥|白马/.test(fullText)) {
        battlefieldTheme = 'desert';
        battlefieldWeather = 'sand';
      }
    }
    if (isEndless) {
      battlefieldTheme = 'night_fire';
      battlefieldWeather = 'fire_embers';
    }

    this.battle.setBattlefieldTheme(battlefieldTheme, battlefieldWeather);

    // 初始化战役目标 HUD 悬浮指示条
    const objBadge = document.getElementById("hud-obj-badge");
    const objDesc = document.getElementById("hud-obj-desc");
    const objStatus = document.getElementById("hud-obj-status");
    if (objBadge && ch.objective) {
      objBadge.textContent = ch.objective.label || "战役目标";
      objBadge.style.background = ch.objective.type === 'assassinate_boss' ? '#dc2626' : (ch.objective.type === 'defend_time' ? '#d97706' : (isEndless ? '#b45309' : '#2563eb'));
      objDesc.textContent = ch.objective.desc || "击溃敌方要塞！";
      objStatus.textContent = isEndless ? "坚守波次: 1" : (ch.objective.type === 'defend_time' ? `坚守: ${ch.objective.targetTimeSeconds}s` : (ch.objective.type === 'assassinate_boss' ? '敌帅存活' : '要塞完好'));
    }

    if (spawnStartCatapult) {
      this.battle.spawnUnit("catapult", "blue");
      this.battle.addFloatingText("战前重金投石巨车领衔出阵！", 150, this.battle.groundY - 50, "#0284c7", 1.5);
    }

    document.getElementById("stage-badge").textContent = isEndless ? "铜雀演武" : ("第 " + stageId + " 章");
    document.getElementById("enemy-title-text").textContent = ch.enemyName;
    document.getElementById("enemy-sub-text").textContent = ch.enemyTitle;

    // 动态调整底部卡片可见性 (名将严格展示所选编队，至多3人)
    this.updateBattleDeckVisibility(ch.allowedGeneralCards || []);

    if (isEndless) {
      this.gameState = "battling";
      this.battle.addFloatingText("⚔️ 铜雀演武正式开阵！万军出击！", this.canvas.width * 0.5, this.battle.groundY - 100, "#f59e0b", 2.2);
    } else {
      // 启动关前剧情对话
      this.gameState = "story";
      this.story.playChapterIntro(stageId, () => {
        this.resumeBattle();
      }, this.currentFaction);
    }
  }

  // 根据当前编队与章节历史解锁状态控制底部卡片可用性 (英雄严格限制为出战编队所选至多3人)
  updateBattleDeckVisibility(allowedStratagems) {
    const selected = this.saveData.selectedHeroes || ["liubei", "guanyu", "zhangfei"];
    const container = document.querySelector(".deck-scroll-container");

    // 英雄卡牌：隐藏所有卡牌，动态为选中的 3 员大将创建/展示卡牌
    Object.keys(HERO_META).forEach(heroKey => {
      const meta = HERO_META[heroKey];
      const btn = document.getElementById(meta.btnId);
      if (btn) btn.style.display = "none";
    });

    selected.forEach(heroKey => {
      const meta = HERO_META[heroKey];
      if (!meta) return;
      const heroCamp = HERO_CAMP_MAP[heroKey];
      const isFactionMatch = (this.currentFaction && heroCamp === this.currentFaction);
      const actualCost = isFactionMatch ? Math.max(50, meta.cost - 15) : meta.cost;

      let btn = document.getElementById(meta.btnId);
      if (!btn && container) {
        btn = document.createElement("button");
        btn.className = "spawn-card-btn special-hero";
        btn.id = meta.btnId;
        btn.title = `${meta.name}，${meta.job}`;
        btn.innerHTML = `
          <span class="card-icon"><img src="${meta.avatar}" alt="${meta.name}" class="card-pixel-img" /></span>
          <span class="card-name">${meta.name}</span>
          <span class="card-cost-badge"><img src="assets/ui/coin_copper.png" class="ui-icon-nano" /> ${actualCost}${isFactionMatch ? '🔥' : ''}</span>
          <div class="hero-deployed-overlay" id="${meta.overlayId}"><span class="hero-deployed-badge">⚔️ 阵中</span><span class="hero-deployed-text">限出一员</span></div>
        `;
        const firstStrat = document.getElementById("btn-cast-meirenji");
        if (firstStrat) container.insertBefore(btn, firstStrat);
        else container.appendChild(btn);
      }

      if (btn) {
        btn.onclick = () => {
          if (this.gameState !== "battling") return;
          if (this.battle.isHeroAlive(heroKey, "blue")) {
            const heroUnit = this.battle.blueUnits.find(u => !u.isDead && (u.type === heroKey || u.type.startsWith(heroKey)));
            if (heroUnit && heroUnit.canCastUltimate()) {
              heroUnit.castUltimate(this.battle);
              return;
            }
            sound.playDrum();
            this.battle.addFloatingText(`⚠️【${meta.name}】正在阵中奋战，怒气蓄力中！`, 140, this.battle.groundY - 50, "#ef4444", 1.8);
            return;
          }
          if (this.gold >= actualCost) {
            this.gold -= actualCost;
            this.recordPlayerSpawn("hero");
            const spawnedUnit = this.battle.spawnUnit(heroKey, "blue");
            if (spawnedUnit && isFactionMatch) {
              spawnedUnit.attackSpeedBuff = (spawnedUnit.attackSpeedBuff || 1) * 1.1;
              spawnedUnit.isFactionBuffed = true;
            }
            sound.playStratagem();
            this.battle.addFloatingText(meta.shout, 140, this.battle.groundY - 50, meta.color || "#0284c7", 1.6);
            if (isFactionMatch) {
              this.battle.addFloatingText(`🔥 本阵将士亲征！士气高昂攻速+10%！`, 140, this.battle.groundY - 80, "#22c55e", 1.8);
            }
          }
        };

        const badge = btn.querySelector(".card-cost-badge");
        if (badge) badge.innerHTML = `<img src="assets/ui/coin_copper.png" class="ui-icon-nano" /> ${actualCost}${isFactionMatch ? '🔥' : ''}`;
        btn.style.display = "flex";
        btn.style.opacity = "1";
      }
    });

    // 三十六计锦囊卡牌：按章节历史允许列表解锁
    const stratMapping = {
      "btn-cast-meirenji": "meirenji",
      "btn-cast-zhuge-ult": "zhuge_ult",
      "btn-cast-jinchan": "jinchan",
      "btn-cast-caochuan": "caochuan",
      "btn-cast-shengdong": "shengdong",
      "btn-cast-paizhuan": "paizhuan",
      "btn-cast-yiyidailao": "yiyidailao",
      "btn-cast-qinzei": "qinzei",
      "btn-cast-chenhuo": "chenhuo",
      "btn-cast-mantian": "mantian"
    };

    Object.keys(stratMapping).forEach(btnId => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const key = stratMapping[btnId];
      if (allowedStratagems && allowedStratagems.includes(key)) {
        btn.style.display = "flex";
        btn.style.opacity = "1";
      } else {
        btn.style.display = "none";
      }
    });
  }

  resumeBattle() {
    this.gameState = "battling";
    sound.playDrum();
    const ch = this.getCurrentChapterConfig(this.currentStageId);
    this.battle.addFloatingText("⚔️ " + ch.title + " 开战！", this.canvas.width * 0.5, this.battle.groundY - 70, "#dc2626", 1.8);
  }

  // 绑定剧情对话事件
  bindStoryEvents() {
    const handleNext = (e) => {
      if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
      sound.playCoin();
      this.story.nextStep();
    };

    const handleSkip = (e) => {
      if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
      this.story.skipDialog();
    };

    const btnNext = document.getElementById("btn-story-next");
    if (btnNext) {
      btnNext.addEventListener("click", handleNext);
      btnNext.addEventListener("touchend", handleNext);
    }

    const btnSkip = document.getElementById("btn-story-skip");
    if (btnSkip) {
      btnSkip.addEventListener("click", handleSkip);
      btnSkip.addEventListener("touchend", handleSkip);
    }

    // 点击卡片主体区域推进
    const cardBox = document.getElementById("story-card-box");
    if (cardBox) {
      cardBox.addEventListener("click", (e) => {
        if (e.target && (e.target.id === 'btn-story-skip' || e.target.closest('#btn-story-skip'))) return;
        handleNext(e);
      });
    }

    // 键盘支持（空格键或回车推进）
    window.addEventListener("keydown", (e) => {
      if (this.gameState === "story" && this.story.isShowing) {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          handleNext();
        } else if (e.code === "Escape") {
          e.preventDefault();
          handleSkip();
        }
      }
    });
  }

  // 释放锦囊计谋 (执行严格 CD 与军费扣减)
  castStratagem(id, fn) {
    if (this.gameState !== "battling") return;
    const cost = this.stratagemCost[id] || 100;
    const currentCD = this.stratagemCD[id] || 0;

    if (this.gold >= cost && currentCD <= 0) {
      this.gold -= cost;
      this.stratagemCD[id] = this.stratagemMaxCD[id] || 30;
      fn();
    }
  }

  // 绑定全局导航与出兵事件
  bindGlobalEvents() {
    window.addEventListener("resize", () => {
      this.battle.resize();
    });

    // 主菜单按钮
    document.getElementById("btn-menu-campaign")?.addEventListener("click", () => {
      sound.playDrum();
      this.switchView("map");
    });

    // 铜雀演武 · 无尽试炼入口绑定
    document.getElementById("btn-menu-endless")?.addEventListener("click", () => {
      sound.playDrum();
      this.openPreBattleModal('endless');
    });
    document.getElementById("btn-map-endless")?.addEventListener("click", () => {
      sound.playDrum();
      this.openPreBattleModal('endless');
    });

    // 战歌 BGM 开关
    document.getElementById("btn-bgm-toggle")?.addEventListener("click", () => {
      const playing = sound.toggleBgm();
      const textEl = document.getElementById("btn-bgm-text");
      if (textEl) textEl.textContent = playing ? "🎵 战歌: 开" : "🔇 战歌: 关";
    });

    // 战场快捷数字键操控 (1/2/3 对应3位名将召唤/绝技释放，4/5/6/7 对应步/弓/骑/车)
    window.addEventListener("keydown", (e) => {
      if (this.gameState !== "battling") return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

      const selected = this.saveData.selectedHeroes || ["liubei", "guanyu", "zhangfei"];
      if (e.code === "Digit1" || e.code === "Numpad1") {
        if (selected[0]) {
          const meta = HERO_META[selected[0]];
          if (meta) document.getElementById(meta.btnId)?.click();
        }
      } else if (e.code === "Digit2" || e.code === "Numpad2") {
        if (selected[1]) {
          const meta = HERO_META[selected[1]];
          if (meta) document.getElementById(meta.btnId)?.click();
        }
      } else if (e.code === "Digit3" || e.code === "Numpad3") {
        if (selected[2]) {
          const meta = HERO_META[selected[2]];
          if (meta) document.getElementById(meta.btnId)?.click();
        }
      } else if (e.code === "Digit4" || e.code === "Numpad4") {
        document.getElementById("btn-spawn-infantry")?.click();
      } else if (e.code === "Digit5" || e.code === "Numpad5") {
        document.getElementById("btn-spawn-archer")?.click();
      } else if (e.code === "Digit6" || e.code === "Numpad6") {
        document.getElementById("btn-spawn-cavalry")?.click();
      } else if (e.code === "Digit7" || e.code === "Numpad7") {
        document.getElementById("btn-spawn-catapult")?.click();
      }
    });

    // 移动端横屏引导忽略按钮
    document.getElementById("btn-dismiss-orientation-tip")?.addEventListener("click", () => {
      document.body.classList.add("dismiss-orientation-tip");
    });

    document.getElementById("btn-menu-workshop")?.addEventListener("click", () => {
      sound.playCoin();
      this.switchView("workshop");
    });

    document.getElementById("btn-menu-armory")?.addEventListener("click", () => {
      sound.playCoin();
      this.switchView("armory");
    });

    document.getElementById("btn-map-to-armory")?.addEventListener("click", () => {
      sound.playCoin();
      this.switchView("armory");
    });

    document.getElementById("btn-menu-gallery")?.addEventListener("click", () => {
      sound.playCoin();
      this.switchView("gallery");
    });

    document.getElementById("btn-menu-sound")?.addEventListener("click", () => {
      sound.enabled = !sound.enabled;
      document.getElementById("title-sound-text").textContent = sound.enabled ? "音效: 开" : "音效: 关";
      const soundBtn = document.getElementById("btn-sound-toggle");
      if (soundBtn) soundBtn.textContent = sound.enabled ? "🔊 音效" : "🔇 静音";
    });

    // 各页面返回按钮
    document.getElementById("btn-map-back")?.addEventListener("click", () => this.switchView("title"));
    document.getElementById("btn-workshop-back")?.addEventListener("click", () => this.switchView("title"));
    document.getElementById("btn-armory-back")?.addEventListener("click", () => this.switchView("title"));
    document.getElementById("btn-gallery-back")?.addEventListener("click", () => this.switchView("title"));
    document.getElementById("btn-battle-quit-map")?.addEventListener("click", () => {
      sound.stopBgm();
      this.gameState = "idle";
      this.switchView("map");
    });

    // 结算面板前往武库
    document.getElementById("btn-res-to-armory")?.addEventListener("click", () => {
      document.getElementById("battle-result-modal")?.classList.remove("open");
      this.switchView("armory");
    });

    // 结算面板再次挑战刷专属碎片
    document.getElementById("btn-res-farm-again")?.addEventListener("click", () => {
      document.getElementById("battle-result-modal")?.classList.remove("open");
      sound.playCoin();
      this.startStage(this.currentStageId);
    });

    // 绝世神兵爆落弹窗操作
    document.getElementById("btn-epic-loot-goto-armory")?.addEventListener("click", () => {
      document.getElementById("modal-epic-loot")?.classList.remove("open");
      this.switchView("armory");
    });
    document.getElementById("btn-epic-loot-close")?.addEventListener("click", () => {
      document.getElementById("modal-epic-loot")?.classList.remove("open");
      document.getElementById("battle-result-modal")?.classList.add("open");
    });

    // 战前布阵弹窗
    document.getElementById("btn-prebattle-cancel")?.addEventListener("click", () => {
      document.getElementById("prebattle-modal")?.classList.remove("open");
    });

    document.getElementById("btn-prebattle-start")?.addEventListener("click", () => {
      this.startStage(this.currentStageId);
    });

    // 鼠标移动与定点扔炸弹
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.aimMouseX = e.clientX - rect.left;
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.aimMouseX = null;
    });

    this.canvas.addEventListener("click", (e) => {
      if (this.gameState !== "battling") return;

      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      if (clickX >= 100 && this.gold >= 90) {
        this.gold -= 90;
        this.battle.throwBombTo(clickX);
      }
    });

    // 基础兵种与器械 (并记录近期出兵战术供敌方 AI 侦测反制)
    document.getElementById("btn-spawn-infantry")?.addEventListener("click", () => {
      if (this.gameState === "battling" && this.gold >= 50) {
        this.gold -= 50;
        this.recordPlayerSpawn("infantry");
        this.battle.spawnUnit("infantry", "blue");
        sound.playDrum();
      }
    });

    document.getElementById("btn-spawn-archer")?.addEventListener("click", () => {
      if (this.gameState === "battling" && this.gold >= 75) {
        this.gold -= 75;
        this.recordPlayerSpawn("archer");
        this.battle.spawnUnit("archer", "blue");
        sound.playCoin();
      }
    });

    document.getElementById("btn-spawn-cavalry")?.addEventListener("click", () => {
      if (this.gameState === "battling" && this.gold >= 120) {
        this.gold -= 120;
        this.recordPlayerSpawn("cavalry");
        this.battle.spawnUnit("cavalry", "blue");
        sound.playDrum();
      }
    });

    document.getElementById("btn-spawn-catapult")?.addEventListener("click", () => {
      if (this.gameState === "battling" && this.gold >= 160) {
        this.gold -= 160;
        this.recordPlayerSpawn("catapult");
        this.battle.spawnUnit("catapult", "blue");
        sound.playDrum();
        this.battle.addFloatingText("🚜 投石巨车出击！超远滚石轰击！", 120, this.battle.groundY - 50, "#b45309", 1.4);
      }
    });

    document.getElementById("btn-throw-bomb")?.addEventListener("click", () => {
      if (this.gameState === "battling" && this.gold >= 90) {
        this.gold -= 90;
        const targetX = this.aimMouseX && this.aimMouseX >= 120 ? this.aimMouseX : this.canvas.width * 0.65;
        this.battle.throwBombTo(targetX);
      }
    });

    // 14 大名将召唤绑定 (记录名将出阵并严格限制全场同名武将仅存一员)
    Object.keys(HERO_META).forEach(heroKey => {
      const meta = HERO_META[heroKey];
      document.getElementById(meta.btnId)?.addEventListener("click", () => {
        if (this.gameState !== "battling") return;
        if (this.battle.isHeroAlive(heroKey, "blue")) {
          sound.playDrum();
          this.battle.addFloatingText(`⚠️【${meta.name}】正在阵中奋战，不可重复出阵！`, 140, this.battle.groundY - 50, "#ef4444", 1.8);
          return;
        }
        if (this.gold >= meta.cost) {
          this.gold -= meta.cost;
          this.recordPlayerSpawn("hero");
          this.battle.spawnUnit(heroKey, "blue");
          sound.playHeroDeploy(meta);
          this.battle.addFloatingText(meta.shout, 140, this.battle.groundY - 50, meta.color || "#0284c7", 1.6);
        }
      });
    });

    // 10 大三十六计锦囊施法绑定 (附带 CD 冷却限制)
    document.getElementById("btn-cast-meirenji")?.addEventListener("click", () => {
      this.castStratagem("meirenji", () => this.battle.castMeirenji());
    });

    document.getElementById("btn-cast-zhuge-ult")?.addEventListener("click", () => {
      this.castStratagem("zhuge_ult", () => this.battle.castZhugeStorm());
    });

    document.getElementById("btn-cast-jinchan")?.addEventListener("click", () => {
      this.castStratagem("jinchan", () => this.battle.castJinchan());
    });

    document.getElementById("btn-cast-caochuan")?.addEventListener("click", () => {
      this.castStratagem("caochuan", () => this.battle.castCaochuan(this));
    });

    document.getElementById("btn-cast-shengdong")?.addEventListener("click", () => {
      this.castStratagem("shengdong", () => this.battle.castShengdong());
    });

    document.getElementById("btn-cast-paizhuan")?.addEventListener("click", () => {
      this.castStratagem("paizhuan", () => this.battle.castPaizhuan());
    });

    document.getElementById("btn-cast-yiyidailao")?.addEventListener("click", () => {
      this.castStratagem("yiyidailao", () => this.battle.castYiyidailao());
    });

    document.getElementById("btn-cast-qinzei")?.addEventListener("click", () => {
      this.castStratagem("qinzei", () => this.battle.castQinzei());
    });

    document.getElementById("btn-cast-chenhuo")?.addEventListener("click", () => {
      this.castStratagem("chenhuo", () => this.battle.castChenhuo());
    });

    document.getElementById("btn-cast-mantian")?.addEventListener("click", () => {
      this.castStratagem("mantian", () => this.battle.castMantian());
    });

    // 结算面板操作
    const handleCloseResultModal = () => {
      document.getElementById("battle-result-modal")?.classList.remove("open");
      if (this.pendingRankPromotion) {
        const promo = this.pendingRankPromotion;
        this.pendingRankPromotion = null;
        this.openRankPromotionModal(promo);
      }
    };

    document.getElementById("btn-res-to-workshop")?.addEventListener("click", () => {
      handleCloseResultModal();
      this.switchView("workshop");
    });

    document.getElementById("btn-res-next-stage")?.addEventListener("click", () => {
      handleCloseResultModal();
      const currentFactionChapters = this.getFactionChapters();
      if (this.currentStageId < currentFactionChapters.length) {
        this.openPreBattleModal(this.currentStageId + 1);
      } else {
        this.switchView("map");
      }
    });

    document.getElementById("btn-res-retry-battle")?.addEventListener("click", () => {
      handleCloseResultModal();
      this.startStage(this.currentStageId);
    });
  }

  // 渲染神工坊科技树 (支持铜钱军需兑换与银两科技)
  renderWorkshopView() {
    const copperEl = document.getElementById("workshop-copper-display");
    if (copperEl) copperEl.textContent = this.saveData.copper || 0;

    document.getElementById("workshop-silver-display").textContent = this.saveData.silver || 0;
    
    document.getElementById("val-infantry-hp").textContent = this.saveData.upgrades.infantryHp || 0;
    document.getElementById("val-archer-atk").textContent = this.saveData.upgrades.archerPower || 0;
    document.getElementById("val-economy-rate").textContent = this.saveData.upgrades.economyRate || 12;
    document.getElementById("val-bomb-dmg").textContent = this.saveData.upgrades.bombPower || 0;
    document.getElementById("val-castle-hp").textContent = this.saveData.upgrades.castleHp || 0;

    const wallEl = document.getElementById("val-copper-wall-hp");
    if (wallEl) wallEl.textContent = this.saveData.upgrades.copperWallHp || 0;

    const copper = this.saveData.copper || 0;
    const silver = this.saveData.silver || 0;

    // 铜钱兑换与劳役按钮状态
    const btnEx100 = document.getElementById("btn-copper-exchange-100");
    const btnEx260 = document.getElementById("btn-copper-exchange-260");
    const btnWall = document.getElementById("btn-copper-upgrade-wall");

    if (btnEx100) {
      btnEx100.disabled = copper < 500;
      btnEx100.textContent = copper >= 500 ? "🪙 500 熔铸 100 银两" : "铜钱不足 (需 500)";
    }
    if (btnEx260) {
      btnEx260.disabled = copper < 1200;
      btnEx260.textContent = copper >= 1200 ? "🪙 1200 拨付 260 银两" : "铜钱不足 (需 1200)";
    }
    if (btnWall) {
      const isWallMax = (this.saveData.upgrades.copperWallHp || 0) >= 1500;
      if (isWallMax) {
        btnWall.disabled = true;
        btnWall.textContent = "✅ 要塞血量已达最高防度";
        btnWall.classList.add("btn-upgrade-maxed");
      } else {
        btnWall.disabled = copper < 400;
        btnWall.textContent = copper >= 400 ? "🪙 400 劳役加固 (+150血)" : "铜钱不足 (需 400)";
        btnWall.classList.remove("btn-upgrade-maxed");
      }
    }

    // 辅助函数：根据银两和铜钱自动设置升级按钮文字与智能补齐
    const updateUpgradeBtn = (btnId, costSilver, isMax, maxText = "✅ 已升至满级 (MAX)") => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      if (isMax) {
        btn.disabled = true;
        btn.textContent = maxText;
        btn.classList.add("btn-upgrade-maxed");
        btn.classList.remove("btn-upgrade-autoconvert");
        return;
      }
      btn.classList.remove("btn-upgrade-maxed");

      if (silver >= costSilver) {
        btn.disabled = false;
        btn.textContent = `🥈 ${costSilver} 银两研习`;
        btn.classList.remove("btn-upgrade-autoconvert");
      } else {
        const deficit = costSilver - silver;
        const neededCopper = deficit * 5; // 5 铜钱 = 1 银两折算率
        if (copper >= neededCopper) {
          btn.disabled = false;
          btn.textContent = `🪙 补齐差额升级 (耗 ${neededCopper} 铜钱)`;
          btn.classList.add("btn-upgrade-autoconvert");
        } else {
          btn.disabled = true;
          btn.textContent = `银两不足 (还差 ${deficit} 银两)`;
          btn.classList.remove("btn-upgrade-autoconvert");
        }
      }
    };

    // ⚔️ 渲染全军战术军略 (闪避/抗性/暴击/吸血/防御)
    const dodgeRank = this.saveData.upgrades.armyDodgeRank || 0;
    const stunRank = this.saveData.upgrades.armyStunResistRank || 0;
    const critRank = this.saveData.upgrades.armyCritRank || 0;
    const stealRank = this.saveData.upgrades.armyLifestealRank || 0;
    const defRank = this.saveData.upgrades.armyDefenseRank || 0;

    const elDodgeRank = document.getElementById("val-army-dodge-rank");
    const elDodgePct = document.getElementById("val-army-dodge-pct");
    if (elDodgeRank) elDodgeRank.textContent = `Lv.${dodgeRank}/5`;
    if (elDodgePct) elDodgePct.textContent = `+${dodgeRank * 3}%`;

    const elStunRank = document.getElementById("val-army-stun-resist-rank");
    const elStunPct = document.getElementById("val-army-stun-resist-pct");
    if (elStunRank) elStunRank.textContent = `Lv.${stunRank}/5`;
    if (elStunPct) elStunPct.textContent = `+${stunRank * 8}%`;

    const elCritRank = document.getElementById("val-army-crit-rank");
    const elCritPct = document.getElementById("val-army-crit-pct");
    if (elCritRank) elCritRank.textContent = `Lv.${critRank}/5`;
    if (elCritPct) elCritPct.textContent = `+${(critRank * 3.5).toFixed(1)}%`;

    const elStealRank = document.getElementById("val-army-lifesteal-rank");
    const elStealPct = document.getElementById("val-army-lifesteal-pct");
    if (elStealRank) elStealRank.textContent = `Lv.${stealRank}/5`;
    if (elStealPct) elStealPct.textContent = `+${stealRank * 3}%`;

    const elDefRank = document.getElementById("val-army-defense-rank");
    const elDefVal = document.getElementById("val-army-defense-val");
    if (elDefRank) elDefRank.textContent = `Lv.${defRank}/5`;
    if (elDefVal) elDefVal.textContent = `+${defRank * 8}防`;

    const dodgeCost = dodgeRank >= 5 ? 0 : [140, 180, 220, 260, 300][dodgeRank];
    const stunCost = stunRank >= 5 ? 0 : [130, 165, 200, 235, 270][stunRank];
    const critCost = critRank >= 5 ? 0 : [150, 195, 240, 285, 330][critRank];
    const stealCost = stealRank >= 5 ? 0 : [160, 200, 240, 280, 320][stealRank];
    const defCost = defRank >= 5 ? 0 : [120, 150, 180, 210, 240][defRank];

    updateUpgradeBtn("btn-buy-army-dodge", dodgeCost, dodgeRank >= 5, "✅ 身法已登峰造极 (MAX)");
    updateUpgradeBtn("btn-buy-army-stun-resist", stunCost, stunRank >= 5, "✅ 铁志百战不屈 (MAX)");
    updateUpgradeBtn("btn-buy-army-crit", critCost, critRank >= 5, "✅ 破阵枪芒无双 (MAX)");
    updateUpgradeBtn("btn-buy-army-lifesteal", stealCost, stealRank >= 5, "✅ 嗜血刀法大成 (MAX)");
    updateUpgradeBtn("btn-buy-army-defense", defCost, defRank >= 5, "✅ 玄铁重甲大成 (MAX)");

    updateUpgradeBtn("btn-buy-infantry", 120, this.saveData.upgrades.infantryHp >= 240);
    updateUpgradeBtn("btn-buy-archer", 150, this.saveData.upgrades.archerPower >= 32);
    updateUpgradeBtn("btn-buy-economy", 200, this.saveData.upgrades.economyRate >= 28);
    updateUpgradeBtn("btn-buy-bomb", 180, this.saveData.upgrades.bombPower >= 360);
    updateUpgradeBtn("btn-buy-castle", 140, this.saveData.upgrades.castleHp >= 2000);
    updateUpgradeBtn("btn-buy-tower", 160, this.saveData.upgrades.towerDmg, "✅ 箭塔守军已研习");
    updateUpgradeBtn("btn-buy-charm", 130, this.saveData.upgrades.superCharm, "✅ 倾国倾城已生效");
  }

  // 绑定神工坊科技升级与铜钱兑换事件 (支持铜钱自动补齐银两)
  bindWorkshopEvents() {
    const buyWithSilverOrAutoConvert = (costSilver, upgradeName, fn) => {
      let silver = this.saveData.silver || 0;
      let copper = this.saveData.copper || 0;

      if (silver >= costSilver) {
        this.saveData.silver -= costSilver;
        fn();
        SaveManager.save(this.saveData);
        this.applyUpgradesToBattle();
        sound.playCoin();
        showToast(`💡 成功研习【${upgradeName}】！消耗 🥈 ${costSilver} 银两`);
        this.renderWorkshopView();
      } else {
        const deficit = costSilver - silver;
        const neededCopper = deficit * 5;
        if (copper >= neededCopper) {
          this.saveData.silver = 0;
          this.saveData.copper -= neededCopper;
          fn();
          SaveManager.save(this.saveData);
          this.applyUpgradesToBattle();
          sound.playCoin();
          showToast(`💡 铜钱补齐差额！成功研习【${upgradeName}】（耗 🥈${silver} 银两 + 🪙${neededCopper} 铜钱）`);
          this.renderWorkshopView();
        } else {
          showToast(`国库银两与铜钱不足，无法研习【${upgradeName}】`, "error");
        }
      }
    };

    const buyWithCopper = (cost, fn, tip) => {
      if ((this.saveData.copper || 0) >= cost) {
        this.saveData.copper -= cost;
        fn();
        SaveManager.save(this.saveData);
        this.applyUpgradesToBattle();
        sound.playCoin();
        if (tip) showToast(tip);
        this.renderWorkshopView();
      } else {
        showToast(`国库铜钱不足 ${cost}！`, "error");
      }
    };

    // 铜钱军需司事件
    document.getElementById("btn-copper-exchange-100")?.addEventListener("click", () => {
      buyWithCopper(500, () => {
        this.saveData.silver = (this.saveData.silver || 0) + 100;
      }, "🪙 成功将 500 铜钱熔铸为 100 纯正银两！");
    });

    document.getElementById("btn-copper-exchange-260")?.addEventListener("click", () => {
      buyWithCopper(1200, () => {
        this.saveData.silver = (this.saveData.silver || 0) + 260;
      }, "💰 成功大宗拨付 260 纯正银两！");
    });

    document.getElementById("btn-copper-upgrade-wall")?.addEventListener("click", () => {
      if ((this.saveData.upgrades.copperWallHp || 0) < 1500) {
        buyWithCopper(400, () => {
          this.saveData.upgrades.copperWallHp = (this.saveData.upgrades.copperWallHp || 0) + 150;
        }, "🛠️ 招募民夫加固要塞成功！城堡生命值永久 +150");
      }
    });

    // ⚔️ 全军战术军略研习绑定 (均支持铜钱自动补齐银两)
    document.getElementById("btn-buy-army-dodge")?.addEventListener("click", () => {
      const rank = this.saveData.upgrades.armyDodgeRank || 0;
      if (rank < 5) {
        const cost = [140, 180, 220, 260, 300][rank];
        buyWithSilverOrAutoConvert(cost, "全军神行闪避", () => this.saveData.upgrades.armyDodgeRank = rank + 1);
      }
    });

    document.getElementById("btn-buy-army-stun-resist")?.addEventListener("click", () => {
      const rank = this.saveData.upgrades.armyStunResistRank || 0;
      if (rank < 5) {
        const cost = [130, 165, 200, 235, 270][rank];
        buyWithSilverOrAutoConvert(cost, "百战铁志抗性", () => this.saveData.upgrades.armyStunResistRank = rank + 1);
      }
    });

    document.getElementById("btn-buy-army-crit")?.addEventListener("click", () => {
      const rank = this.saveData.upgrades.armyCritRank || 0;
      if (rank < 5) {
        const cost = [150, 195, 240, 285, 330][rank];
        buyWithSilverOrAutoConvert(cost, "会心破阵暴击", () => this.saveData.upgrades.armyCritRank = rank + 1);
      }
    });

    document.getElementById("btn-buy-army-lifesteal")?.addEventListener("click", () => {
      const rank = this.saveData.upgrades.armyLifestealRank || 0;
      if (rank < 5) {
        const cost = [160, 200, 240, 280, 320][rank];
        buyWithSilverOrAutoConvert(cost, "陷阵饮血刀法", () => this.saveData.upgrades.armyLifestealRank = rank + 1);
      }
    });

    document.getElementById("btn-buy-army-defense")?.addEventListener("click", () => {
      const rank = this.saveData.upgrades.armyDefenseRank || 0;
      if (rank < 5) {
        const cost = [120, 150, 180, 210, 240][rank];
        buyWithSilverOrAutoConvert(cost, "重装玄铁护甲", () => this.saveData.upgrades.armyDefenseRank = rank + 1);
      }
    });

    // 银两科技事件 (均支持铜钱自动补齐)
    document.getElementById("btn-buy-infantry")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(120, "加厚精铁重盾", () => this.saveData.upgrades.infantryHp += 60);
    });

    document.getElementById("btn-buy-archer")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(150, "诸葛连弩改装", () => this.saveData.upgrades.archerPower += 8);
    });

    document.getElementById("btn-buy-economy")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(200, "屯田垦荒军饷", () => this.saveData.upgrades.economyRate += 4);
    });

    document.getElementById("btn-buy-bomb")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(180, "开花烈性炸药", () => this.saveData.upgrades.bombPower += 120);
    });

    document.getElementById("btn-buy-castle")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(140, "加固要塞城墙", () => this.saveData.upgrades.castleHp += 500);
    });

    document.getElementById("btn-buy-tower")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(160, "神机箭塔守军", () => this.saveData.upgrades.towerDmg = true);
    });

    document.getElementById("btn-buy-charm")?.addEventListener("click", () => {
      buyWithSilverOrAutoConvert(130, "倾国倾城魅力", () => this.saveData.upgrades.superCharm = true);
    });
  }

  // 绑定军资武库事件
  bindArmoryEvents() {
    // Tab 切换
    const tabs = [
      { id: "btn-armory-tab-heroes", tab: "heroes" },
      { id: "btn-armory-tab-forge", tab: "forge" },
      { id: "btn-armory-tab-shop", tab: "shop" }
    ];
    tabs.forEach(t => {
      document.getElementById(t.id)?.addEventListener("click", () => {
        this.currentArmoryTab = t.tab;
        sound.playCoin();
        tabs.forEach(item => {
          const btn = document.getElementById(item.id);
          if (btn) {
            if (item.tab === t.tab) btn.classList.add("active");
            else btn.classList.remove("active");
          }
        });
        this.renderArmoryView();
      });
    });

    // 装备槽位更换按钮
    document.getElementById("btn-change-weapon")?.addEventListener("click", () => this.openEquipPicker("weapon"));
    document.getElementById("btn-change-armor")?.addEventListener("click", () => this.openEquipPicker("armor"));
    document.getElementById("btn-change-mount")?.addEventListener("click", () => this.openEquipPicker("mount"));

    // 关闭装配弹窗
    document.getElementById("btn-picker-close")?.addEventListener("click", () => {
      document.getElementById("modal-equip-picker")?.classList.remove("open");
    });

    // 升星打造按钮
    document.getElementById("btn-forge-upgrade-star")?.addEventListener("click", () => {
      if (this.selectedEquipForForge) {
        this.upgradeEquipStar(this.selectedEquipForForge);
      }
    });

    // 刷新集市按钮
    document.getElementById("btn-shop-refresh")?.addEventListener("click", () => {
      this.refreshShopStock();
    });
  }

  // 渲染军资武库界面
  renderArmoryView() {
    document.getElementById("armory-copper-display").textContent = this.saveData.copper || 0;
    document.getElementById("armory-silver-display").textContent = this.saveData.silver || 0;
    document.getElementById("armory-gold-ingot-display").textContent = this.saveData.goldIngots || 0;

    const panels = {
      heroes: document.getElementById("panel-armory-heroes"),
      forge: document.getElementById("panel-armory-forge"),
      shop: document.getElementById("panel-armory-shop")
    };

    Object.keys(panels).forEach(k => {
      if (panels[k]) {
        if (k === this.currentArmoryTab) panels[k].classList.remove("hidden");
        else panels[k].classList.add("hidden");
      }
    });

    if (this.currentArmoryTab === "heroes") {
      this.renderHeroLoadoutView();
    } else if (this.currentArmoryTab === "forge") {
      this.renderForgeView();
    } else if (this.currentArmoryTab === "shop") {
      this.renderShopView();
    }
  }

  // 1. 渲染名将配装武库
  renderHeroLoadoutView() {
    const nav = document.getElementById("hero-equip-nav");
    if (!nav) return;
    nav.innerHTML = "";

    GENERALS_ARCHIVE.forEach(gen => {
      const btn = document.createElement("button");
      btn.className = `btn-era-tab ${gen.id === this.selectedHeroForEquip ? 'active' : ''}`;
      btn.style.cssText = "display:flex; align-items:center; gap:6px; white-space:nowrap; padding:6px 12px;";
      const tabIconHtml = gen.image ? `<img src="${gen.image}" style="width:22px; height:22px; object-fit:contain; image-rendering:pixelated; vertical-align:middle;" />` : gen.icon;
      btn.innerHTML = `<span>${tabIconHtml}</span><span>${gen.name}</span>`;
      btn.addEventListener("click", () => {
        this.selectedHeroForEquip = gen.id;
        sound.playCoin();
        this.renderHeroLoadoutView();
      });
      nav.appendChild(btn);
    });

    const currentHero = GENERALS_ARCHIVE.find(g => g.id === this.selectedHeroForEquip) || GENERALS_ARCHIVE[0];
    const loadout = this.saveData.generalEquip[currentHero.id] || { weapon: null, armor: null, mount: null };
    const bonus = calculateHeroEquipBonuses(loadout, this.saveData.inventory);

    const baseHp = typeof currentHero.hp === 'number' ? currentHero.hp : (parseInt(currentHero.hp) || 500);
    const baseAtk = typeof currentHero.atk === 'number' ? currentHero.atk : (parseInt(currentHero.atk) || 50);
    const baseSpeed = parseFloat(String(currentHero.speed).replace(/[^0-9.]/g, '')) || 1.2;

    const heroCurrentAvatarEl = document.getElementById("hero-current-avatar");
    if (currentHero.image) {
      heroCurrentAvatarEl.innerHTML = `<img src="${currentHero.image}" alt="${currentHero.name}" class="hero-current-pixel-img" />`;
    } else {
      heroCurrentAvatarEl.textContent = currentHero.icon;
    }
    document.getElementById("hero-current-name").textContent = currentHero.name;
    document.getElementById("hero-current-title").textContent = currentHero.title;

    document.getElementById("hero-attr-hp").textContent = baseHp + bonus.hp;
    document.getElementById("hero-bonus-hp").textContent = bonus.hp > 0 ? `(+${bonus.hp})` : `(+0)`;

    document.getElementById("hero-attr-atk").textContent = baseAtk + bonus.atk;
    document.getElementById("hero-bonus-atk").textContent = bonus.atk > 0 ? `(+${bonus.atk})` : `(+0)`;

    document.getElementById("hero-attr-speed").textContent = (baseSpeed + bonus.speed).toFixed(2);
    document.getElementById("hero-bonus-speed").textContent = bonus.speed > 0 ? `(+${bonus.speed.toFixed(2)})` : `(+0)`;

    if (bonus.skills.length > 0) {
      document.getElementById("hero-skills-summary").textContent = bonus.skills.map(s => s.name).join("、");
    } else {
      document.getElementById("hero-skills-summary").textContent = "暂无 (升至3星解锁神技)";
    }

    // 渲染三大装备槽位
    const updateSlot = (slotKey, defaultIcon, defaultTitle) => {
      const equipId = loadout[slotKey];
      const iconEl = document.getElementById(`slot-icon-${slotKey}`);
      const nameEl = document.getElementById(`slot-name-${slotKey}`);
      const starEl = document.getElementById(`slot-star-${slotKey}`);
      const descEl = document.getElementById(`slot-desc-${slotKey}`);

      if (equipId && this.saveData.inventory[equipId]) {
        const star = this.saveData.inventory[equipId].star || 1;
        const data = getEquipmentData(equipId, star);
        if (iconEl) {
          if (data && data.image) {
            iconEl.innerHTML = `<img src="${data.image}" alt="${data.name}" class="equip-slot-pixel-img" />`;
          } else {
            iconEl.textContent = data ? data.icon : defaultIcon;
          }
        }
        if (nameEl) nameEl.textContent = `${data.name}`;
        if (starEl) starEl.textContent = "⭐".repeat(star);
        if (descEl) descEl.textContent = data.stats.desc;
      } else {
        if (iconEl) iconEl.textContent = defaultIcon;
        if (nameEl) nameEl.textContent = `【${defaultTitle}】未穿戴`;
        if (starEl) starEl.textContent = "";
        if (descEl) descEl.textContent = "点击右侧按钮选择装备佩戴，大幅强化属性！";
      }
    };

    updateSlot("weapon", "🗡️", "神兵武器");
    updateSlot("armor", "🦺", "宝甲防具");
    updateSlot("mount", "🐎", "坐骑名驹");
  }

  // 打开装配选择浮层
  openEquipPicker(slot) {
    this.pickingSlot = slot;
    const titleMap = { weapon: "选择佩戴神兵武器", armor: "选择佩戴宝甲防具", mount: "选择佩戴坐骑名驹" };
    document.getElementById("picker-modal-title").textContent = titleMap[slot] || "装配装备";

    const container = document.getElementById("picker-items-container");
    if (!container) return;
    container.innerHTML = "";

    // 选项 1: 卸下当前装备
    const unequipBtn = document.createElement("div");
    unequipBtn.className = "shop-item-card";
    unequipBtn.style.cssText = "display:flex; align-items:center; justify-content:space-between; padding:10px 14px; cursor:pointer; background:#f8fafc; border:1px solid #cbd5e1;";
    unequipBtn.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.8rem;">🚫</span>
        <div>
          <strong style="color:#ef4444;">卸下当前槽位装备</strong>
          <div style="font-size:0.8rem; color:#64748b;">空置该装备槽</div>
        </div>
      </div>
      <button class="btn-sub-action" style="padding:4px 10px;">确认卸下</button>
    `;
    unequipBtn.addEventListener("click", () => {
      this.equipItemToHero(this.selectedHeroForEquip, slot, null);
      document.getElementById("modal-equip-picker")?.classList.remove("open");
    });
    container.appendChild(unequipBtn);

    // 筛选出属于该槽位的已拥有装备
    const available = EQUIPMENT_DATABASE.filter(e => e.slot === slot && this.saveData.inventory[e.id]);

    if (available.length === 0) {
      const tip = document.createElement("div");
      tip.style.cssText = "padding:20px; text-align:center; color:#94a3b8; font-size:0.9rem;";
      tip.textContent = "背包中暂无可用的该类装备，前往【珍宝集市】或挑战关卡 Boss 夺取吧！";
      container.appendChild(tip);
    } else {
      available.forEach(item => {
        const star = this.saveData.inventory[item.id]?.star || 1;
        const data = getEquipmentData(item.id, star);
        const card = document.createElement("div");
        card.className = "shop-item-card";
        card.style.cssText = "display:flex; align-items:center; justify-content:space-between; padding:10px 14px; cursor:pointer; background:#ffffff; border:2px solid #e2e8f0;";
        const iconHtml = (data && data.image)
          ? `<img src="${data.image}" class="equip-pixel-icon" style="width:40px; height:40px;">`
          : `<span style="font-size:2rem;">${data ? data.icon : '⚔️'}</span>`;
        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            ${iconHtml}
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <strong style="color:#1e293b;">${data.name}</strong>
                <span style="color:#f59e0b; font-size:0.85rem;">${"⭐".repeat(star)}</span>
              </div>
              <div style="font-size:0.8rem; color:#16a34a;">${data.stats.desc}</div>
            </div>
          </div>
          <button class="btn-buy-upgrade" style="padding:6px 14px; font-size:0.85rem; background:#16a34a; border-color:#15803d;">装配上阵</button>
        `;
        card.addEventListener("click", () => {
          this.equipItemToHero(this.selectedHeroForEquip, slot, item.id);
          document.getElementById("modal-equip-picker")?.classList.remove("open");
        });
        container.appendChild(card);
      });
    }

    document.getElementById("modal-equip-picker")?.classList.add("open");
  }

  equipItemToHero(heroId, slot, equipId) {
    if (!this.saveData.generalEquip[heroId]) {
      this.saveData.generalEquip[heroId] = { weapon: null, armor: null, mount: null };
    }
    this.saveData.generalEquip[heroId][slot] = equipId;
    SaveManager.save(this.saveData);
    this.applyUpgradesToBattle();
    sound.playCoin();
    this.renderHeroLoadoutView();
  }

  // 2. 渲染神兵铸造升星台 (支持全品类装备碎片全景展示、20碎片合成本体与1~5星突破)
  renderForgeView() {
    const listEl = document.getElementById("forge-equip-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    if (!this.selectedEquipForForge) {
      this.selectedEquipForForge = "fangtian_huaji";
    }

    EQUIPMENT_DATABASE.forEach(eq => {
      const isOwned = !!this.saveData.inventory[eq.id];
      const star = isOwned ? (this.saveData.inventory[eq.id].star || 1) : 0;
      const shards = this.saveData.shards[eq.id] || 0;
      const nextCost = isOwned ? STAR_UPGRADE_COSTS[star + 1] : null;
      const canUp = isOwned && nextCost && shards >= nextCost.shards;
      const canSynth = !isOwned && shards >= SYNTHESIS_SHARD_COST;

      const itemCard = document.createElement("div");
      itemCard.style.cssText = `display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-radius:8px; border:2px solid ${eq.id === this.selectedEquipForForge ? '#f59e0b' : '#e2e8f0'}; background:${eq.id === this.selectedEquipForForge ? '#fffbeb' : (isOwned ? '#ffffff' : '#f8fafc')}; cursor:pointer; opacity:${isOwned ? '1' : '0.85'};`;
      
      const itemIconHtml = eq.image 
        ? `<img src="${eq.image}" class="equip-pixel-icon" style="width:34px; height:34px; ${isOwned ? '' : 'filter: grayscale(80%);'}">` 
        : `<span style="font-size:1.6rem;">${eq.icon}</span>`;

      const heroBadge = eq.exclusiveHeroName 
        ? `<span style="font-size:0.68rem; color:#b45309; background:#fef3c7; padding:1px 4px; border-radius:4px; margin-left:4px; font-weight:normal;">${eq.exclusiveHeroName}</span>` 
        : '';

      let statusBadge = "";
      if (isOwned) {
        statusBadge = canUp ? '<span style="background:#ef4444; color:#fff; font-size:0.75rem; padding:2px 6px; border-radius:10px;">可升星</span>' : `<span style="font-size:0.8rem; color:#64748b;">${shards}片</span>`;
      } else {
        statusBadge = canSynth 
          ? `<span style="background:#16a34a; color:#fff; font-size:0.75rem; padding:2px 6px; border-radius:10px; font-weight:bold;">可合成(20/20)</span>` 
          : `<span style="font-size:0.75rem; color:#94a3b8;">拥有 ${shards}/20片</span>`;
      }

      itemCard.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          ${itemIconHtml}
          <div>
            <div style="font-weight:bold; font-size:0.9rem; color:${isOwned ? '#1e293b' : '#64748b'}; display:flex; align-items:center;">
              ${eq.name} ${heroBadge}
            </div>
            <div style="color:#f59e0b; font-size:0.8rem;">${isOwned ? "⭐".repeat(star) : '<span style="color:#94a3b8; font-size:0.75rem;">🔒 未解锁 (拥有碎片: ' + shards + ')</span>'}</div>
          </div>
        </div>
        <div>
          ${statusBadge}
        </div>
      `;
      itemCard.addEventListener("click", () => {
        this.selectedEquipForForge = eq.id;
        sound.playCoin();
        this.renderForgeView();
      });
      listEl.appendChild(itemCard);
    });

    // 渲染右侧选中的装备升星 / 碎片合成详情
    const curEquip = EQUIPMENT_DATABASE.find(e => e.id === this.selectedEquipForForge) || EQUIPMENT_DATABASE[0];
    const isOwned = !!this.saveData.inventory[curEquip.id];
    const curStar = isOwned ? (this.saveData.inventory[curEquip.id]?.star || 1) : 0;
    const shards = this.saveData.shards[curEquip.id] || 0;

    const forgeIconEl = document.getElementById("forge-item-icon");
    if (forgeIconEl) {
      if (curEquip && curEquip.image) {
        forgeIconEl.innerHTML = `<img src="${curEquip.image}" alt="${curEquip.name}" class="forge-item-pixel-img" style="${isOwned ? '' : 'filter: grayscale(80%);'}" />`;
      } else {
        forgeIconEl.textContent = curEquip ? curEquip.icon : '🔱';
      }
    }
    document.getElementById("forge-item-name").textContent = `${curEquip.name} ${curEquip.exclusiveHeroName ? '【' + curEquip.exclusiveHeroName + '】' : ''}`;
    
    let starStr = "";
    if (isOwned) {
      for (let i = 1; i <= 5; i++) starStr += (i <= curStar ? "⭐ " : "⚪ ");
    } else {
      starStr = "⚪ ⚪ ⚪ ⚪ ⚪ (未解锁本体)";
    }
    document.getElementById("forge-item-stars").textContent = starStr;

    const upBtn = document.getElementById("btn-forge-upgrade-star");

    if (!isOwned) {
      document.getElementById("forge-current-stats").textContent = `【初阶预览】${curEquip.starStats[1].desc}`;
      document.getElementById("forge-next-stats").textContent = `🛠️ 专属神兵合成：集齐 20 枚【${curEquip.name}】碎片，即可在此免费合成出 1 星本体神兵并永久入库！`;
      document.getElementById("forge-next-skill").textContent = `来源指引：${curEquip.sourceDesc}。${curEquip.desc}`;
      document.getElementById("forge-shard-count").textContent = `碎片储备: ${shards} / ${SYNTHESIS_SHARD_COST}`;
      const pct = Math.min(100, Math.floor((shards / SYNTHESIS_SHARD_COST) * 100));
      document.getElementById("forge-shard-progress").style.width = `${pct}%`;
      document.getElementById("forge-cost-summary").textContent = `合成消耗: 20 枚专属碎片 (无需任何额外金钱)`;

      const canSynth = shards >= SYNTHESIS_SHARD_COST;
      if (upBtn) {
        upBtn.disabled = !canSynth;
        upBtn.style.background = canSynth ? "#16a34a" : "#cbd5e1";
        upBtn.style.borderColor = canSynth ? "#15803d" : "#94a3b8";
        upBtn.style.cursor = canSynth ? "pointer" : "not-allowed";
        upBtn.textContent = canSynth 
          ? `🔨 消耗 20 碎片 · 立即合成【${curEquip.name} (1星)】！` 
          : `🔒 碎片不足 (还需 ${SYNTHESIS_SHARD_COST - shards} 片，可去集市选购或战役刷取)`;
        upBtn.onclick = () => {
          if (canSynth) this.synthesizeEquip(curEquip.id);
        };
      }
      return;
    }

    // 已拥有装备的 1~5 星升星逻辑
    const curData = getEquipmentData(curEquip.id, curStar);
    document.getElementById("forge-current-stats").textContent = curData.stats.desc;

    if (curStar >= 5) {
      document.getElementById("forge-next-stats").textContent = "🏆 该绝世神兵已升至满星 5 星神话！神力登峰造极！";
      document.getElementById("forge-next-skill").textContent = "";
      document.getElementById("forge-shard-count").textContent = `碎片储备: ${shards}`;
      document.getElementById("forge-shard-progress").style.width = "100%";
      document.getElementById("forge-cost-summary").textContent = "已达神话最高星级";
      if (upBtn) {
        upBtn.disabled = true;
        upBtn.style.background = "#cbd5e1";
        upBtn.style.borderColor = "#94a3b8";
        upBtn.style.cursor = "not-allowed";
        upBtn.textContent = "🏆 已达神话满星";
        upBtn.onclick = null;
      }
    } else {
      const nextCost = STAR_UPGRADE_COSTS[curStar + 1];
      const nextData = getEquipmentData(curEquip.id, curStar + 1);
      document.getElementById("forge-next-stats").textContent = `升至 ${curStar + 1} 星：${nextData.stats.desc}`;
      
      if (nextData.stats.skillName) {
        document.getElementById("forge-next-skill").textContent = `🔥 突破将觉醒专属神技：【${nextData.stats.skillName}】！`;
      } else {
        document.getElementById("forge-next-skill").textContent = "";
      }

      document.getElementById("forge-shard-count").textContent = `${shards} / ${nextCost.shards}`;
      const pct = Math.min(100, Math.floor((shards / nextCost.shards) * 100));
      document.getElementById("forge-shard-progress").style.width = `${pct}%`;

      let costStr = `升级消耗: 🪙 ${nextCost.copper} 铜钱`;
      if (nextCost.silver > 0) costStr += ` + 🥈 ${nextCost.silver} 银两`;
      if (nextCost.goldIngots > 0) costStr += ` + 💰 ${nextCost.goldIngots} 金元宝`;
      document.getElementById("forge-cost-summary").textContent = costStr;

      const canAfford = shards >= nextCost.shards && 
                        (this.saveData.copper || 0) >= nextCost.copper && 
                        (this.saveData.silver || 0) >= nextCost.silver && 
                        (this.saveData.goldIngots || 0) >= nextCost.goldIngots;

      if (upBtn) {
        upBtn.disabled = !canAfford;
        upBtn.style.background = canAfford ? "#d97706" : "#cbd5e1";
        upBtn.style.borderColor = canAfford ? "#b45309" : "#94a3b8";
        upBtn.style.cursor = canAfford ? "pointer" : "not-allowed";
        upBtn.textContent = canAfford ? `⭐ 消耗材料 · 升至 ${curStar + 1} 星！` : `材料不足 (还需 ${Math.max(0, nextCost.shards - shards)} 碎片)`;
        upBtn.onclick = () => {
          if (canAfford) this.upgradeEquipStar(curEquip.id);
        };
      }
    }
  }

  // 碎片合成新神装
  synthesizeEquip(equipId) {
    const shards = this.saveData.shards[equipId] || 0;
    if (shards < SYNTHESIS_SHARD_COST) {
      showToast(`碎片不足 ${SYNTHESIS_SHARD_COST} 枚，无法合成！`, "error");
      return;
    }
    if (this.saveData.inventory[equipId]) {
      showToast("主公武库已拥有该神装！", "warning");
      return;
    }

    this.saveData.shards[equipId] -= SYNTHESIS_SHARD_COST;
    this.saveData.inventory[equipId] = { star: 1 };
    SaveManager.save(this.saveData);
    sound.playVictory();
    
    const eq = EQUIPMENT_DATABASE.find(e => e.id === equipId);
    showToast(`🎉 恭喜主公！消耗 20 枚碎片，成功打造绝世神装【${eq?.name || equipId} (1星)】！已收入武库！`);
    
    this.applyUpgradesToBattle();
    this.renderArmoryView();
  }

  // 升星操作
  upgradeEquipStar(equipId) {
    const curStar = this.saveData.inventory[equipId]?.star || 1;
    if (curStar >= 5) return;
    const cost = STAR_UPGRADE_COSTS[curStar + 1];
    const shards = this.saveData.shards[equipId] || 0;

    if (shards >= cost.shards && 
        (this.saveData.copper || 0) >= cost.copper && 
        (this.saveData.silver || 0) >= cost.silver && 
        (this.saveData.goldIngots || 0) >= cost.goldIngots) {
      
      this.saveData.shards[equipId] -= cost.shards;
      this.saveData.copper -= cost.copper;
      this.saveData.silver -= cost.silver;
      this.saveData.goldIngots -= cost.goldIngots;
      this.saveData.inventory[equipId].star = curStar + 1;

      SaveManager.save(this.saveData);
      this.applyUpgradesToBattle();
      sound.playVictory();
      this.renderArmoryView();
    }
  }

  // 3. 渲染珍宝集市 (支持名将专属标识、碎片储备展示、货币余额提示、铜钱智能补齐银两与重复折算提示)
  renderShopView() {
    const grid = document.getElementById("armory-shop-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!this.saveData.shopStock || this.saveData.shopStock.length === 0) {
      this.saveData.shopStock = generateShopStock();
    }
    const stock = this.saveData.shopStock;

    stock.forEach(item => {
      const card = document.createElement("div");
      card.className = "shop-item-card";
      card.style.cssText = "background:#ffffff; border:2px solid #e2e8f0; border-radius:12px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;";

      const currencyIcon = { copper: "🪙", silver: "🥈", goldIngots: "💰" }[item.currency];
      const currencyName = { copper: "铜钱", silver: "银两", goldIngots: "元宝" }[item.currency];
      const playerBalance = this.saveData[item.currency] || 0;
      const isOwned = item.type === "item" && !!this.saveData.inventory[item.equipId];
      const currentShards = this.saveData.shards[item.equipId] || 0;
      
      let canBuy = playerBalance >= item.price;
      let autoConvertMode = false;
      let neededCopper = 0;

      // 若为银两货物且银两不足，检查国库铜钱是否可按 5:1 自动补齐
      if (!canBuy && item.currency === "silver") {
        const deficit = item.price - playerBalance;
        neededCopper = deficit * 5;
        if ((this.saveData.copper || 0) >= neededCopper) {
          canBuy = true;
          autoConvertMode = true;
        }
      }

      let btnText = `购买 (${currencyIcon} ${item.price})`;
      if (autoConvertMode) {
        btnText = `🪙 铜钱补齐购买 (耗 ${neededCopper} 铜钱)`;
      } else if (!canBuy) {
        btnText = `${currencyName}不足 (需 ${currencyIcon} ${item.price})`;
      }

      const heroTag = item.exclusiveHeroName 
        ? `<span style="font-size:0.75rem; background:#fee2e2; color:#b91c1c; padding:2px 6px; border-radius:6px; font-weight:bold;">【${item.exclusiveHeroName}】</span>`
        : `<span style="font-size:0.75rem; background:#f1f5f9; color:#475569; padding:2px 6px; border-radius:6px; font-weight:bold;">【全员通用】</span>`;

      const itemImg = item.image || (item.equipId && EQUIPMENT_DATABASE.find(e => e.id === item.equipId)?.image) || (item.type === 'shard' ? (EQUIPMENT_DATABASE.find(e => e.id === item.equipId)?.slot === 'armor' ? 'assets/equipment/shard_armor.png' : 'assets/equipment/shard_weapon.png') : null);
      const iconHtml = itemImg 
        ? `<div style="width:48px; height:48px; background:#f8fafc; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><img src="${itemImg}" class="equip-pixel-icon" style="width:38px; height:38px;"></div>`
        : `<span style="font-size:2.2rem; background:#f8fafc; padding:4px 8px; border-radius:8px;">${item.icon}</span>`;

      card.innerHTML = `
        <div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            ${iconHtml}
            <div style="flex:1;">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:4px; flex-wrap:wrap;">
                <strong style="color:#1e293b; font-size:1.02rem;">${item.name}</strong>
                <div style="display:flex; align-items:center; gap:4px;">
                  ${heroTag}
                  ${isOwned ? '<span style="font-size:0.75rem; background:#fef3c7; color:#b45309; padding:2px 6px; border-radius:8px; font-weight:bold;">已拥有</span>' : ''}
                </div>
              </div>
              <div style="color:#b45309; font-size:0.85rem; font-weight:bold; margin-top:2px;">
                ${currencyIcon} ${item.price} <span style="color:#94a3b8; font-weight:normal; font-size:0.8rem;">(我的${currencyName}: ${playerBalance})</span>
              </div>
            </div>
          </div>
          <div style="color:#64748b; font-size:0.85rem; line-height:1.5;">${item.desc}</div>
          ${item.type === 'shard' ? `<div style="font-size:0.8rem; color:#0284c7; margin-top:4px; font-weight:bold;">🧩 我的碎片储备: ${currentShards} 片 (集满 20 片可在铸造台合成 1星神兵)</div>` : ''}
          ${isOwned ? '<div style="color:#16a34a; font-size:0.8rem; margin-top:4px;">✨ 再次购买将自动折算为 15 枚专属升星碎片</div>' : ''}
        </div>
        <button class="btn-buy-upgrade ${autoConvertMode ? 'btn-upgrade-autoconvert' : ''}" style="margin-top:12px; padding:8px; font-size:0.95rem; background:${canBuy ? '#d97706' : '#cbd5e1'}; border-color:${canBuy ? '#b45309' : '#94a3b8'}; cursor:${canBuy ? 'pointer' : 'not-allowed'};" ${canBuy ? '' : 'disabled'}>
          ${btnText}
        </button>
      `;

      card.querySelector("button")?.addEventListener("click", () => {
        this.buyShopItem(item, autoConvertMode, neededCopper);
      });

      grid.appendChild(card);
    });
  }

  buyShopItem(item, autoConvertMode = false, neededCopper = 0) {
    const playerBalance = this.saveData[item.currency] || 0;
    if (autoConvertMode) {
      this.saveData.silver = 0;
      this.saveData.copper -= neededCopper;
    } else {
      if (playerBalance < item.price) {
        showToast("国库余额不足，无法购买！", "error");
        return;
      }
      this.saveData[item.currency] -= item.price;
    }

    if (item.type === "item") {
      if (!this.saveData.inventory[item.equipId]) {
        this.saveData.inventory[item.equipId] = { star: 1 };
        showToast(`🎉 成功斩获绝世神装【${item.name}】！已收入武库，可立即前往装配！`);
      } else {
        // 若已拥有则折算为 15 枚升星碎片
        this.saveData.shards[item.equipId] = (this.saveData.shards[item.equipId] || 0) + 15;
        const total = this.saveData.shards[item.equipId];
        showToast(`🎉 购得重复装备，已自动折算为 15 枚【${item.name}】专属升星碎片！(当前储备: ${total}片)`);
      }
    } else if (item.type === "shard") {
      this.saveData.shards[item.equipId] = (this.saveData.shards[item.equipId] || 0) + item.count;
      const total = this.saveData.shards[item.equipId];
      showToast(`🎉 成功购得【${item.name}】！碎片 +${item.count} (当前武库储备: ${total}片，20片可在铸造台合成)`);
    }

    SaveManager.save(this.saveData);
    this.applyUpgradesToBattle();
    sound.playCoin();
    this.renderArmoryView();
  }

  refreshShopStock() {
    if ((this.saveData.copper || 0) >= 100) {
      this.saveData.copper -= 100;
      this.saveData.shopStock = generateShopStock();
      SaveManager.save(this.saveData);
      sound.playCoin();
      showToast("🔄 集市货架已成功刷新！");
      this.renderArmoryView();
    } else {
      showToast("国库铜钱不足 100，无法刷新货架！", "error");
    }
  }

  // 渲染萌将与兵种图鉴
  renderGalleryView() {
    const listEl = document.getElementById("gallery-sidebar-list");
    if (!listEl) return;

    if (!this.galleryFilterCamp) {
      this.galleryFilterCamp = 'all';
    }

    // 更新收录总数徽章
    const pill = document.getElementById("gal-total-count-pill");
    if (pill) {
      pill.textContent = `📚 已收录图鉴: ${GENERALS_ARCHIVE.length} / ${GENERALS_ARCHIVE.length}`;
    }

    // 绑定阵营标签点击事件
    const filterBtns = document.querySelectorAll(".gal-camp-btn");
    filterBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        filterBtns.forEach(b => {
          b.classList.remove("active");
          b.style.background = "";
          b.style.color = "";
        });
        btn.classList.add("active");
        btn.style.background = "#3b82f6";
        btn.style.color = "#ffffff";
        this.galleryFilterCamp = btn.dataset.galCamp || 'all';
        this.renderGalleryList();
      };
    });

    this.renderGalleryList();
  }

  renderGalleryList() {
    const listEl = document.getElementById("gallery-sidebar-list");
    if (!listEl) return;

    const camp = this.galleryFilterCamp || 'all';
    const filtered = GENERALS_ARCHIVE.filter(gen => {
      if (camp === 'all') return true;
      if (camp === 'other') return !gen.camp || gen.camp === 'soldier' || gen.camp === 'neutral';
      return gen.camp === camp;
    });

    listEl.innerHTML = "";
    filtered.forEach((gen, idx) => {
      const card = document.createElement("div");
      card.className = `gal-nav-card ${idx === 0 ? 'active' : ''}`;
      const iconHtml = gen.image ? `<img src="${gen.image}" class="gal-nav-img" alt="${gen.name}" />` : gen.icon;
      card.innerHTML = `
        <span class="gal-nav-icon">${iconHtml}</span>
        <div>
          <div class="gal-nav-name">${gen.name}</div>
          <div class="gal-nav-tag">${gen.title.split(" · ")[0]}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".gal-nav-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.selectGalleryItem(gen);
      });

      listEl.appendChild(card);
    });

    if (filtered.length > 0) {
      this.selectGalleryItem(filtered[0]);
    }
  }

  selectGalleryItem(gen) {
    if (typeof gen === 'string') {
      gen = GENERALS_ARCHIVE.find(g => g.id === gen) || { id: gen };
    } else if (gen && !gen.name && gen.id) {
      gen = GENERALS_ARCHIVE.find(g => g.id === gen.id) || gen;
    }
    const galAvatarEl = document.getElementById("gal-avatar");
    if (gen.image) {
      galAvatarEl.innerHTML = `<img src="${gen.image}" alt="${gen.name}" class="gal-avatar-pixel-img" />`;
    } else {
      galAvatarEl.textContent = gen.icon;
    }
    document.getElementById("gal-name").textContent = gen.name;
    document.getElementById("gal-title").textContent = gen.title;
    document.getElementById("gal-cost").textContent = "🪙 铜钱花费: " + gen.cost;

    document.getElementById("gal-hp").textContent = gen.hp;
    document.getElementById("gal-atk").textContent = gen.atk;
    document.getElementById("gal-range").textContent = gen.range;
    document.getElementById("gal-speed").textContent = gen.speed;

    document.getElementById("gal-feature").textContent = gen.feature;
    document.getElementById("gal-counter").textContent = gen.counter;
    document.getElementById("gal-story").textContent = gen.story;

    // 礼聘招贤状态展示与招降弹窗联动
    const statusText = document.getElementById("gal-recruit-status-text");
    const recruitBtn = document.getElementById("btn-gal-recruit");
    if (statusText && recruitBtn) {
      const recruited = this.saveData.recruitedHeroes || ["liubei", "guanyu", "zhangfei"];
      const isRecruited = recruited.includes(gen.id);
      const cond = RECRUIT_CONDITIONS[gen.id];

      if (isRecruited) {
        statusText.innerHTML = `<span style="color:#10b981; font-weight:bold; font-size:0.92rem;">🎖️ 已在麾下效命</span>`;
        recruitBtn.style.display = "none";
      } else if (cond) {
        statusText.innerHTML = `<span style="color:#d97706; font-size:0.88rem;">📜 隐居羁旅 · 待明主厚礼相聘</span>`;
        recruitBtn.style.display = "inline-flex";
        recruitBtn.textContent = `🤝 礼聘招贤 (${cond.name})`;
        recruitBtn.onclick = () => {
          this.openRecruitModal(gen.id, () => {
            this.selectGalleryItem(gen);
            this.renderPreBattleSquadUI();
          });
        };
      } else {
        statusText.innerHTML = "";
        recruitBtn.style.display = "none";
      }
    }
  }

  // 记录玩家出兵战术历史供敌方 AI 实时侦测
  recordPlayerSpawn(type) {
    if (!this.playerSpawnHistory) this.playerSpawnHistory = [];
    this.playerSpawnHistory.push({ type, time: Date.now() });
    if (this.playerSpawnHistory.length > 8) {
      this.playerSpawnHistory.shift();
    }
  }

  // 敌方智能 AI 出兵决策 (战场感知 + 兵种克制 + 智能蓄费 + 全18章历史大将出战)
  updateEnemyAI() {
    if (this.gameState !== "battling") return;

    // 出兵决策冷却控制 (避免高频每帧扣款送死，形成清晰波次)
    if (this.enemySpawnCooldownTimer > 0) {
      this.enemySpawnCooldownTimer--;
      return;
    }

    // 1. 全 18 章专属历史名将配置
    const CHAPTER_ENEMY_BOSS_MAP = {
      1: { type: "enemy_boss_chenyuanzhi", name: "程远志", cost: 160, yell: "🦹 黄巾渠帅程远志领兵杀到！踏平涿郡！", color: "#ca8a04" },
      2: { type: "lvbu_ch2", name: "飞将吕布", cost: 220, yell: "🐯 关东诸侯尽皆鼠辈，谁敢上前与我一战？！", color: "#dc2626" },
      3: { type: "enemy_boss_guanhai", name: "管亥", cost: 170, yell: "🦹 黄巾大帅管亥在此！受死吧！", color: "#ca8a04" },
      4: { type: "enemy_boss_caoren", name: "曹仁", cost: 190, yell: "🛡️ 曹子孝在此！铁壁防御坚不可摧！", color: "#2563eb" },
      5: { type: "enemy_boss_jiling", name: "纪灵", cost: 180, yell: "⚔️ 淮南大将纪灵来也！三尖两刃刀破阵！", color: "#b91c1c" },
      6: { type: "lvbu", name: "战神狂暴吕布", cost: 230, yell: "🐯 白门楼下，天下无双吕奉先决死一战！", color: "#dc2626" },
      7: { type: "enemy_boss_yanliang", name: "颜良", cost: 190, yell: "⚔️ 河北名将颜良在此！谁敢插标卖首！", color: "#7f1d1d" },
      8: { type: "enemy_boss_wenchou", name: "文丑", cost: 190, yell: "⚔️ 河北名将文丑飞马杀到！报仇雪恨！", color: "#7f1d1d" },
      9: { type: "enemy_boss_caoren", name: "曹仁", cost: 200, yell: "🛡️ 八门金锁大阵起！看诸葛如何破阵！", color: "#2563eb" },
      10: { type: "enemy_boss_caochun", name: "曹纯", cost: 210, yell: "🐎 虎豹骑统领曹纯引五千铁骑急行突袭！", color: "#1e293b" },
      11: { type: "enemy_boss_caocao", name: "曹操", cost: 240, yell: "👑 丞相曹操督师八十万大军！顺我者昌！", color: "#991b1b" },
      12: { type: "enemy_boss_zhangren", name: "张任", cost: 190, yell: "🛡️ 西川名将张任在此！蜀道险关休想前进一步！", color: "#047857" },
      13: { type: "enemy_boss_xiahouyuan", name: "夏侯渊", cost: 210, yell: "🏹 征西将军妙才夏侯渊在此！定军天险必胜！", color: "#b45309" },
      14: { type: "enemy_boss_pangde", name: "庞德", cost: 220, yell: "⚔️ 白马将军庞德抬棺死战！誓斩关羽！", color: "#475569" },
      15: { type: "enemy_boss_luxun", name: "陆逊", cost: 210, yell: "🔥 东吴大都督陆逊传令：火箭齐发，火烧连营！", color: "#ea580c" },
      16: { type: "enemy_boss_menghuo", name: "孟获", cost: 250, yell: "🐘 南蛮蛮王孟获率藤甲巨象军团冲锋！", color: "#78350f" },
      17: { type: "enemy_boss_caozhen", name: "曹真", cost: 230, yell: "🛡️ 魏大将军曹真统帅祁山重装虎卫军！", color: "#1e293b" },
      18: { type: "enemy_boss_simayi", name: "司马懿", cost: 260, yell: "🐺 太尉司马仲达在此！深沟高垒，决一雌雄！", color: "#581c87" }
    };

    // 无尽试炼波次狂潮与敌帅刷新
    if (this.isEndlessMode) {
      this.endlessWaveTimer = (this.endlessWaveTimer || 0) + 1;
      // 约 22 秒 (1320 帧) 自动提升波次
      if (this.endlessWaveTimer >= 1320) {
        this.endlessWaveTimer = 0;
        this.endlessWave = (this.endlessWave || 1) + 1;
        this.aiHeroSpawned = false; // 每波允许召唤新大将
        this.enemyGoldRate = 12 + Math.min(26, Math.floor(this.endlessWave * 2));

        sound.playDrum();
        this.battle.addFloatingText(`🌊 第 ${this.endlessWave} 波敌军狂潮来袭！`, this.canvas.width * 0.65, this.battle.groundY - 100, "#ef4444", 2.2);

        const subEl = document.getElementById("enemy-sub-text");
        if (subEl) subEl.textContent = `第 ${this.endlessWave} 波狂潮`;
        const statusEl = document.getElementById("hud-obj-status");
        if (statusEl) statusEl.textContent = `波次: ${this.endlessWave}`;

        // 每 3 波必出三国敌方神将 (从 40 位名将中随机抽取)
        if (this.endlessWave % 3 === 0) {
          const bossList = Object.keys(HERO_META);
          const randHeroId = bossList[Math.floor(Math.random() * bossList.length)];
          const randHeroMeta = HERO_META[randHeroId];
          setTimeout(() => {
            this.battle.spawnUnit(randHeroId, "red");
            sound.playHeroDeploy(randHeroMeta);
            this.battle.addFloatingText(`👑 演武大将【${randHeroMeta.name}】亲率精锐冲阵！`, this.canvas.width - 200, this.battle.groundY - 70, randHeroMeta.color, 1.8);
          }, 800);
        }
      }
    }

    let currentBoss;
    if (this.isEndlessMode) {
      currentBoss = {
        type: "lvbu",
        name: "战神狂暴吕布",
        cost: 230,
        yell: "🔥 谁能挡我！天下无双引万军破寨！",
        color: "#dc2626"
      };
    } else {
      currentBoss = CHAPTER_ENEMY_BOSS_MAP[this.currentStageId] || CHAPTER_ENEMY_BOSS_MAP[1];
    }

    // 2. 战场实时态势感知 (蓝方活体与近期出兵记录)
    const aliveBlue = this.battle.blueUnits.filter(u => !u.isDead);
    const blueInfantryCount = aliveBlue.filter(u => u.type === 'infantry').length;
    const blueArcherCount = aliveBlue.filter(u => u.type === 'archer').length;
    const blueCavalryCount = aliveBlue.filter(u => u.type === 'cavalry').length;
    const blueCatapultCount = aliveBlue.filter(u => u.type === 'catapult').length;
    const blueHeroCount = aliveBlue.filter(u => u.isHero || !['infantry', 'archer', 'cavalry', 'catapult'].includes(u.type)).length;

    // 玩家近期出兵战术倾向
    const recentHistory = (this.playerSpawnHistory || []).slice(-4);
    const recentInfantryCount = recentHistory.filter(h => h.type === 'infantry').length;
    const recentArcherCount = recentHistory.filter(h => h.type === 'archer').length;
    const recentCavalryCount = recentHistory.filter(h => h.type === 'cavalry').length;

    // 3. 紧急防守判定：若蓝方已逼近我方城门 (< 220px)，且AI资金达到 50，先出盾兵急救
    const enemyCastleX = this.canvas.width;
    const isUrgent = aliveBlue.some(u => u.x > enemyCastleX - 220);
    if (isUrgent && this.enemyGold >= 50 && (!this.enemyTargetSpawnPlan || this.enemyTargetSpawnPlan.cost > 100)) {
      this.enemyGold -= 50;
      this.battle.spawnUnit("infantry", "red");
      this.enemySpawnCooldownTimer = 65;
      return;
    }

    // 4. 动态制定或刷新出兵计划
    if (!this.enemyTargetSpawnPlan || (this.enemyPlanWaitTicks && this.enemyPlanWaitTicks > 300)) {
      this.enemyPlanWaitTicks = 0;

      // 基础动态出兵权重
      let weights = {
        infantry: 25,
        archer: 25,
        cavalry: 25,
        catapult: 20,
        boss: (!this.aiHeroSpawned && this.enemyGold >= currentBoss.cost * 0.75) ? 35 : 0
      };

      const now = Date.now();
      const canAnnounceTactic = !this.aiTacticCooldown || (now - this.aiTacticCooldown > 6500);

      // 🎯 策略A：玩家连出坚盾步兵或场上盾兵成群 (>= 2)
      // 盾兵格挡 50% 飞箭伤害，弓箭彻底无效！调遣重甲铁骑（1.3倍践踏增伤+击退破阵）与投石巨车（范围重击）强行破阵！
      if (blueInfantryCount >= 2 || recentInfantryCount >= 2) {
        weights.cavalry = 85;  // 首选重装铁骑践踏
        weights.catapult = 65; // 次选巨石轰炸聚集盾阵
        weights.archer = 0;    // 绝不出弓箭给盾兵送人头刮痧
        weights.infantry = 15; // 少量护卫

        if (canAnnounceTactic) {
          this.aiTacticCooldown = now;
          this.battle.addFloatingText("⚠️ 敌军军师识破铁盾阵！调遣【重骑&投石】强行破阵！", this.canvas.width * 0.65, this.battle.groundY - 90, "#ef4444", 1.6);
        }
      }
      // 🎯 策略B：玩家连出重甲骑兵 (>= 2)
      // 骑兵冲锋速度极快，弓手穿甲对其造成 1.25 倍额外暴伤，辅以坚盾步兵构筑拒马防线！
      else if (blueCavalryCount >= 2 || recentCavalryCount >= 2) {
        weights.archer = 85;   // 弓手穿甲克制骑兵
        weights.infantry = 60; // 盾兵抗线阻滞冲锋
        weights.cavalry = 10;
        weights.catapult = 20;

        if (canAnnounceTactic) {
          this.aiTacticCooldown = now;
          this.battle.addFloatingText("⚠️ 敌军军师察觉铁骑冲锋！布下【强弓连弩&拒马盾】阻击！", this.canvas.width * 0.65, this.battle.groundY - 90, "#f59e0b", 1.6);
        }
      }
      // 🎯 策略C：玩家连出弓箭手 (>= 2)
      // 弓手脆皮怕贴脸，调派移速超快的重甲骑兵快速切入后排，或坚盾步兵顶箭推进！
      else if (blueArcherCount >= 2 || recentArcherCount >= 2) {
        weights.cavalry = 80;  // 疾速切入后排
        weights.infantry = 60; // 50% 格挡吸收箭雨
        weights.archer = 10;
        weights.catapult = 25;

        if (canAnnounceTactic) {
          this.aiTacticCooldown = now;
          this.battle.addFloatingText("⚠️ 敌军针对远程飞矢！调派【突击铁骑】疾速突袭！", this.canvas.width * 0.65, this.battle.groundY - 90, "#3b82f6", 1.6);
        }
      }
      // 🎯 策略D：蜀汉名将压境
      if (blueHeroCount >= 1 && !this.aiHeroSpawned) {
        weights.boss = 95;     // 敌大将亲自迎战
        weights.cavalry += 30;
        weights.catapult += 30;

        if (canAnnounceTactic) {
          this.aiTacticCooldown = now;
          this.battle.addFloatingText(`⚠️ 蜀汉名将临阵！敌将【${currentBoss.name}】誓死迎击！`, this.canvas.width * 0.65, this.battle.groundY - 90, "#9333ea", 1.6);
        }
      }

      // 根据权重轮盘随机抽取决定目标出兵计划
      const candidateList = [
        { type: "archer", cost: 75, weight: weights.archer, desc: "🏹 连弩弓手" },
        { type: "cavalry", cost: 120, weight: weights.cavalry, desc: "🐎 重甲铁骑" },
        { type: "infantry", cost: 50, weight: weights.infantry, desc: "🛡️ 坚盾步兵" },
        { type: "catapult", cost: 160, weight: weights.catapult, desc: "🚜 投石巨车" },
        { type: "boss", cost: currentBoss.cost, weight: weights.boss, desc: `👑 敌将 · ${currentBoss.name}` }
      ].filter(c => c.weight > 0);

      const totalWeight = candidateList.reduce((sum, c) => sum + c.weight, 0);
      let randVal = Math.random() * totalWeight;
      let chosen = candidateList[0];
      for (const cand of candidateList) {
        if (randVal < cand.weight) {
          chosen = cand;
          break;
        }
        randVal -= cand.weight;
      }

      this.enemyTargetSpawnPlan = chosen;
    }

    // 5. 智能蓄费与按计划出击 (军费未足时严格保留，杜绝低价兵种抢占军费)
    const currentPlan = this.enemyTargetSpawnPlan;
    this.enemyPlanWaitTicks = (this.enemyPlanWaitTicks || 0) + 1;

    if (this.enemyGold >= currentPlan.cost) {
      this.enemyGold -= currentPlan.cost;
      this.enemyTargetSpawnPlan = null;
      this.enemyPlanWaitTicks = 0;

      if (currentPlan.type === "boss") {
        this.aiHeroSpawned = true;
        this.battle.spawnUnit(currentBoss.type, "red");
        sound.playDrum();
        this.battle.addFloatingText(currentBoss.yell, this.canvas.width - 240, this.battle.groundY - 65, currentBoss.color, 1.6);
        if (currentBoss.type === "lvbu_ch2") {
          setTimeout(() => {
            this.battle.addFloatingText("⚠️ 战神凶猛！速用【💃 倾城妙策】魅惑克制！", this.canvas.width * 0.72, this.battle.groundY - 100, "#f59e0b", 1.8);
          }, 800);
        }
        this.enemySpawnCooldownTimer = 150 + Math.floor(Math.random() * 50);
      } else {
        this.battle.spawnUnit(currentPlan.type, "red");
        this.enemySpawnCooldownTimer = 100 + Math.floor(Math.random() * 45);
      }
    }
    // 蓄费等待中：绝不提前乱花军费！

    // 6. 敌方战术【轰天霹雳火雷】双向博弈机制 (定时向我方前锋阵地投掷火雷)
    this.enemyBombTimer = (this.enemyBombTimer || 0) + 1;
    if (this.enemyBombTimer >= 840) { // 约 14 秒一次
      this.enemyBombTimer = 0;
      const blueFrontline = this.battle.blueUnits.filter(u => !u.isDead);
      if (blueFrontline.length > 0) {
        const targetX = blueFrontline[0].x + (Math.random() - 0.5) * 30;
        this.battle.throwEnemyBombTo(targetX);
      }
    }
  }

  // 主循环
  loop() {
    try {
      if (this.gameState === "battling") {
        this.goldTimer++;
        if (this.goldTimer % 60 === 0) {
          this.gold += this.goldRate;
          this.enemyGold += this.enemyGoldRate;

          // 每秒递减计谋 CD
          Object.keys(this.stratagemCD).forEach(k => {
            if (this.stratagemCD[k] > 0) this.stratagemCD[k]--;
          });
        }

        this.updateEnemyAI();
        this.battle.update();

        if (this.battle.isGameOver) {
          this.handleGameOver();
        }
      }

      if (this.currentView === "battle") {
        this.syncHUD();
        this.battle.draw(this.aimMouseX);
      }
    } catch (e) {
      console.error("Game loop error:", e);
    }

    requestAnimationFrame(() => this.loop());
  }

  syncHUD() {
    const goldDisp = document.getElementById("gold-display");
    if (goldDisp) goldDisp.textContent = this.gold;

    const goldRate = document.getElementById("gold-rate-text");
    if (goldRate) goldRate.textContent = "(+" + this.goldRate + "/秒)";

    const enemyGoldDisp = document.getElementById("enemy-gold-display");
    if (enemyGoldDisp) enemyGoldDisp.textContent = this.enemyGold;

    const enemyGoldRate = document.getElementById("enemy-gold-rate-text");
    if (enemyGoldRate) enemyGoldRate.textContent = "(+" + this.enemyGoldRate + "/秒)";

    if (this.battle.blueCastle && this.battle.redCastle) {
      const blueRatio = Math.max(0, this.battle.blueCastle.hp / this.battle.blueCastle.maxHp) * 100;
      const redRatio = Math.max(0, this.battle.redCastle.hp / this.battle.redCastle.maxHp) * 100;

      const blueBar = document.getElementById("blue-castle-hp");
      if (blueBar) blueBar.style.width = blueRatio + "%";

      const redBar = document.getElementById("red-castle-hp");
      if (redBar) redBar.style.width = redRatio + "%";
    }

    const isBattling = this.gameState === "battling";
    const setBtn = (id, cost) => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !isBattling || this.gold < cost;
    };

    setBtn("btn-spawn-infantry", 50);
    setBtn("btn-spawn-archer", 75);
    setBtn("btn-spawn-cavalry", 120);
    setBtn("btn-spawn-catapult", 160);
    setBtn("btn-throw-bomb", 90);

    // 40 大名将按钮状态与“在阵中 / 绝技就绪”动态刷新
    Object.keys(HERO_META).forEach(heroType => {
      const meta = HERO_META[heroType];
      const btn = document.getElementById(meta.btnId);
      if (!btn) return;
      const isAlive = this.battle && this.battle.isHeroAlive && this.battle.isHeroAlive(heroType, "blue");
      const overlay = document.getElementById(meta.overlayId);

      if (isAlive) {
        const heroUnit = this.battle.blueUnits.find(u => !u.isDead && (u.type === heroType || u.type.startsWith(heroType)));
        const canUlt = heroUnit && heroUnit.canCastUltimate();
        if (canUlt) {
          btn.disabled = false; // 可点击直接触发无双大招！
          btn.classList.add("ultimate-ready");
          btn.classList.remove("hero-deployed");
          if (overlay) {
            overlay.classList.add("active");
            overlay.innerHTML = `<span class="hero-deployed-badge ult-ready-badge">🔥 绝技就绪</span><span class="hero-deployed-text ult-ready-text">点击释放！</span>`;
          }
        } else {
          btn.disabled = true;
          btn.classList.remove("ultimate-ready");
          btn.classList.add("hero-deployed");
          if (overlay) {
            overlay.classList.add("active");
            const ragePct = heroUnit ? Math.floor((heroUnit.rage / heroUnit.maxRage) * 100) : 0;
            overlay.innerHTML = `<span class="hero-deployed-badge">⚔️ 阵中</span><span class="hero-deployed-text">怒气 ${ragePct}%</span>`;
          }
        }
      } else {
        btn.classList.remove("hero-deployed");
        btn.classList.remove("ultimate-ready");
        if (overlay) {
          overlay.classList.remove("active");
          overlay.innerHTML = `<span class="hero-deployed-badge">⚔️ 阵中</span><span class="hero-deployed-text">限出一员</span>`;
        }
        btn.disabled = !isBattling || this.gold < meta.cost;
      }
    });

    // 战役目标悬浮状态实时同步
    if (this.battle && this.battle.objective) {
      const objStatus = document.getElementById("hud-obj-status");
      if (objStatus) {
        if (this.battle.objective.type === 'defend_time') {
          const sec = Math.max(0, Math.ceil(this.battle.defendFramesLeft / 60));
          objStatus.textContent = `⏱️ 坚守: ${sec}s`;
          objStatus.style.color = sec <= 10 ? '#ef4444' : '#22c55e';
        } else if (this.battle.objective.type === 'assassinate_boss') {
          if (this.battle.targetBossUnit) {
            if (this.battle.targetBossUnit.isDead) {
              objStatus.textContent = `🎯 敌帅已诛！`;
              objStatus.style.color = '#22c55e';
            } else {
              objStatus.textContent = `⚔️ 敌帅: ${this.battle.targetBossUnit.hp}/${this.battle.targetBossUnit.maxHp}`;
              objStatus.style.color = '#ef4444';
            }
          } else {
            objStatus.textContent = `⚔️ 待帅出阵`;
            objStatus.style.color = '#f59e0b';
          }
        } else {
          const rHp = Math.floor(this.battle.redCastle ? this.battle.redCastle.hp : 0);
          objStatus.textContent = `🏰 要塞: ${rHp}`;
          objStatus.style.color = '#38bdf8';
        }
      }
    }

    // 10 大三十六计锦囊状态与 CD 倒计时遮罩刷新
    const stratBtnMap = {
      meirenji: "btn-cast-meirenji",
      zhuge_ult: "btn-cast-zhuge-ult",
      jinchan: "btn-cast-jinchan",
      caochuan: "btn-cast-caochuan",
      shengdong: "btn-cast-shengdong",
      paizhuan: "btn-cast-paizhuan",
      yiyidailao: "btn-cast-yiyidailao",
      qinzei: "btn-cast-qinzei",
      chenhuo: "btn-cast-chenhuo",
      mantian: "btn-cast-mantian"
    };

    Object.keys(stratBtnMap).forEach(key => {
      const btnId = stratBtnMap[key];
      const btn = document.getElementById(btnId);
      const overlay = document.getElementById(`cd-${key}`);
      const cd = this.stratagemCD[key] || 0;
      const cost = this.stratagemCost[key] || 100;

      if (overlay) {
        const textEl = overlay.querySelector(".cd-text");
        if (cd > 0) {
          overlay.classList.add("active");
          if (textEl) textEl.textContent = cd + "s";
        } else {
          overlay.classList.remove("active");
          if (textEl) textEl.textContent = "";
        }
      }

      if (btn) {
        btn.disabled = !isBattling || this.gold < cost || cd > 0;
      }
    });
  }

  // 战斗结束结算处理 (发放银两与金元宝)
  handleGameOver() {
    this.gameState = "result";
    sound.stopBgm();

    // 终局挑战【铜雀演武 · 无尽试炼】专属结算
    if (this.isEndlessMode) {
      const waves = this.endlessWave || 1;
      const best = Math.max(this.saveData.maxEndlessWave || 0, waves);
      this.saveData.maxEndlessWave = best;

      const copperReward = waves * 180 + (this.battle.totalCopperEarned || 0);
      const silverReward = waves * 35;
      const goldReward = Math.floor(waves / 3) * 15;

      this.saveData.copper = (this.saveData.copper || 0) + copperReward;
      this.saveData.silver += silverReward;
      this.saveData.goldIngots += goldReward;
      SaveManager.save(this.saveData);

      const modalBox = document.getElementById("result-dialog-box");
      const banner = document.getElementById("result-icon-banner");
      const title = document.getElementById("result-title");
      const nextBtn = document.getElementById("btn-res-next-stage");
      const retryBtn = document.getElementById("btn-res-retry-battle");

      sound.playVictory();
      modalBox?.classList.remove("defeat");
      if (banner) banner.textContent = "🏆";
      if (title) title.textContent = "铜雀演武 · 试炼结案！";

      const starRow = document.getElementById("result-star-row");
      if (starRow) starRow.innerHTML = "<span>🏯 终局试炼</span>";
      const starLabel = document.getElementById("result-star-label");
      if (starLabel) starLabel.textContent = `成功坚守 ${waves} 波狂潮！(历史纪录: ${best} 波)`;

      const lootCopperEl = document.getElementById("res-loot-copper");
      if (lootCopperEl) lootCopperEl.textContent = `+${copperReward} 🪙 (已汇入国库)`;
      document.getElementById("res-loot-silver").textContent = `+${silverReward} 🥈`;
      document.getElementById("res-loot-gold-ingot").textContent = `+${goldReward} 💰`;
      document.getElementById("res-castle-hp").textContent = `${waves} 轮次`;

      const equipRow = document.getElementById("res-loot-equip-row");
      const lootEquipEl = document.getElementById("res-loot-equip");
      if (equipRow && lootEquipEl) {
        if (waves >= 5) {
          equipRow.style.display = "flex";
          lootEquipEl.textContent = "🎁 铜雀演武宝匣 (功勋大奖)";
        } else {
          equipRow.style.display = "none";
        }
      }

      if (nextBtn) {
        nextBtn.classList.remove("hidden");
        nextBtn.textContent = "再战一轮 ⚔️";
        nextBtn.onclick = () => {
          document.getElementById("battle-result-modal")?.classList.remove("open");
          this.startStage('endless');
        };
      }
      if (retryBtn) retryBtn.classList.add("hidden");
      document.getElementById("btn-res-farm-again")?.classList.add("hidden");

      document.getElementById("battle-result-modal")?.classList.add("open");
      return;
    }

    const isWin = this.battle.winner === 'blue';
    const ch = this.getCurrentChapterConfig(this.currentStageId);

    const modalBox = document.getElementById("result-dialog-box");
    const banner = document.getElementById("result-icon-banner");
    const title = document.getElementById("result-title");
    const nextBtn = document.getElementById("btn-res-next-stage");
    const retryBtn = document.getElementById("btn-res-retry-battle");

    if (isWin) {
      sound.playVictory();
      modalBox?.classList.remove("defeat");
      if (banner) banner.textContent = "🎉";
      if (title) title.textContent = "大 获 全 胜！";

      // 记录历史总星数与历史官阶
      const oldTotalStars = this.calculateTotalStars();
      const oldRank = getMilitaryRank(oldTotalStars).curRank;

      // 详尽三星判定与数据
      const starDetails = this.battle.calculateStarDetails();
      const stars = starDetails.stars;

      if (!this.saveData.factionChapterStars) this.saveData.factionChapterStars = { shu: {}, wei: {}, wu: {}, qun: {} };
      if (!this.saveData.factionChapterStars[this.currentFaction]) this.saveData.factionChapterStars[this.currentFaction] = {};
      const prevStars = this.saveData.factionChapterStars[this.currentFaction][this.currentStageId] || 0;
      if (stars > prevStars) {
        this.saveData.factionChapterStars[this.currentFaction][this.currentStageId] = stars;
      }
      this.saveData.chapterStars = this.saveData.factionChapterStars[this.currentFaction];

      // 战局铜钱全额 1:1 沉淀 + 满星特别犒赏 (+50% 铜钱加成)
      const earnedFromKills = this.battle.totalCopperEarned || 0;
      const surplusGold = Math.max(0, this.gold);
      const baseCopper = earnedFromKills + surplusGold;
      const isThreeStar = (stars === 3);
      const bonusCopper = isThreeStar ? Math.floor(baseCopper * 0.5) : 0;
      const totalBattleCopper = baseCopper + bonusCopper;

      this.saveData.copper = (this.saveData.copper || 0) + totalBattleCopper;
      this.saveData.silver += ch.rewardSilver;
      this.saveData.goldIngots += ch.rewardGoldIngot;

      const currentFactionChapters = this.getFactionChapters();
      if (!this.saveData.factionProgress) this.saveData.factionProgress = { shu: 1, wei: 1, wu: 1, qun: 1 };
      const currentProg = this.saveData.factionProgress[this.currentFaction] || 1;
      if (this.currentStageId === currentProg && currentProg < currentFactionChapters.length) {
        this.saveData.factionProgress[this.currentFaction]++;
      }
      this.saveData.unlockedChapter = this.saveData.factionProgress[this.currentFaction];

      // 检查官阶晋升
      const newTotalStars = this.calculateTotalStars();
      const newRank = getMilitaryRank(newTotalStars).curRank;
      if (newRank.rank > oldRank.rank) {
        this.pendingRankPromotion = newRank;
      }

      // 动态星级卡槽逐个点亮与清脆音效
      const starSlots = [
        document.getElementById("res-star-slot-1"),
        document.getElementById("res-star-slot-2"),
        document.getElementById("res-star-slot-3")
      ];
      starSlots.forEach((slot, idx) => {
        if (!slot) return;
        slot.classList.remove("earned");
        if (idx < stars) {
          setTimeout(() => {
            slot.classList.add("earned");
            sound.playStarChime(idx);
          }, 220 + idx * 300);
        }
      });

      const starLabel = document.getElementById("result-star-label");
      if (starLabel) {
        const starLabels = ["", "一星小捷 · 初战拔寨", "二星大捷 · 固若金汤", "⭐⭐⭐ 三星全功 · 威震华夏！"];
        starLabel.textContent = starLabels[stars] || "大获全胜！";
      }

      // 渲染三星达成条件清单
      const conditionsContainer = document.getElementById("result-star-conditions");
      if (conditionsContainer) {
        conditionsContainer.innerHTML = starDetails.conditions.map(c => `
          <div class="result-cond-row ${c.achieved ? 'achieved' : 'failed'}">
            <div class="cond-title-group">
              <span>${c.achieved ? '✅' : '⚪'}</span>
              <span>${c.title}</span>
            </div>
            <span class="cond-desc-tag">${c.desc}</span>
          </div>
        `).join('');
      }

      // 满星犒赏横幅展示
      const bonusBanner = document.getElementById("result-three-star-bonus");
      const bonusText = document.getElementById("res-three-star-bonus-text");
      if (bonusBanner) {
        if (isThreeStar) {
          bonusBanner.classList.remove("hidden");
          if (bonusText) bonusText.textContent = `全勋克捷！额外犒军铜钱 +${bonusCopper} 🪙（充实金匮），特赠名将专属武魂残卷！`;
        } else {
          bonusBanner.classList.add("hidden");
        }
      }

      const lootCopperEl = document.getElementById("res-loot-copper");
      if (lootCopperEl) lootCopperEl.textContent = `+${totalBattleCopper} 🪙（解运入库${isThreeStar ? ' · 全勋特赏' : ''}）`;

      document.getElementById("res-loot-silver").textContent = "+" + ch.rewardSilver + " 🥈";
      document.getElementById("res-loot-gold-ingot").textContent = "+" + ch.rewardGoldIngot + " 💰";
      document.getElementById("res-castle-hp").textContent = Math.floor((this.battle.blueCastle.hp / this.battle.blueCastle.maxHp) * 100) + "%";

      // 四大势力专属 Boss 战利品装备与专属碎片掉落全映射表 (首通得 1星本体，重复挑战得专属升星碎片)
      const CHAPTER_BOSS_DROP = {
        shu: {
          1: "jingtiejian", 2: "fangtian_huaji", 3: "baodiao_gong", 4: "tiebi_kai",
          5: "shuanggu_jian", 6: "shoumian_kai", 7: "qinglong_dao", 8: "dilu_ma",
          9: "longdan_qiang", 10: "zhangba_shemao", 11: "chitu_ma", 12: "zhanjin_qiang",
          13: "baodiao_gong", 14: "qinglong_dao", 15: "shoumian_kai", 16: "longdan_qiang",
          17: "tiebi_kai", 18: "yitian_jian"
        },
        wei: {
          1: "jingtiejian", 2: "tiebi_kai", 3: "fangtian_huaji", 4: "shoumian_kai",
          5: "qinglong_dao", 6: "baodiao_gong", 7: "zhanjin_qiang", 8: "dilu_ma",
          9: "yitian_jian"
        },
        wu: {
          1: "jingtiejian", 2: "baodiao_gong", 3: "tiebi_kai", 4: "shoumian_kai",
          5: "chitu_ma", 6: "longdan_qiang", 7: "shuanggu_jian", 8: "qinglong_dao",
          9: "yitian_jian"
        },
        qun: {
          1: "jingtiejian", 2: "tiebi_kai", 3: "fangtian_huaji", 4: "baodiao_gong",
          5: "shuanggu_jian", 6: "zhanjin_qiang", 7: "chitu_ma", 8: "yitian_jian"
        }
      };

      const factionDropMap = CHAPTER_BOSS_DROP[this.currentFaction] || CHAPTER_BOSS_DROP.shu;
      const targetEquipId = factionDropMap[this.currentStageId] || "mingguang_kai";
      const equipMeta = EQUIPMENT_DATABASE.find(e => e.id === targetEquipId) || EQUIPMENT_DATABASE[0];
      let firstEpicLoot = null;
      let dropLootText = "无特别战利品";

      if (!this.saveData.inventory[targetEquipId]) {
        // 首次击败该关 Boss，必定斩获 1 星神兵/宝甲本体！
        this.saveData.inventory[targetEquipId] = { star: 1 };
        firstEpicLoot = equipMeta;
        dropLootText = `🎉 阵前首捷拔寨，缴获当世重器：【${equipMeta.name}】！已造册入武库！`;
      } else {
        // 重复挑战该战役名将，必定获得 2~5 枚专属升星碎片；若三星通关额外特赏 +2 枚！
        let dropShards = 2 + Math.floor(Math.random() * 4); // 2~5 枚
        if (isThreeStar) dropShards += 2;
        this.saveData.shards[targetEquipId] = (this.saveData.shards[targetEquipId] || 0) + dropShards;
        const totalShards = this.saveData.shards[targetEquipId];
        dropLootText = `🧩 阵斩夺魁：收缴【${equipMeta.name}】锻造残卷 +${dropShards}！${isThreeStar ? '(承全勋殊赏+2) ' : ''}(武库现存: ${totalShards}卷)`;
      }

      // 无论首通还是重复刷碎片，确保立即将装备与碎片永久存盘！
      SaveManager.save(this.saveData);

      const resEquipEl = document.getElementById("res-loot-equip");
      if (resEquipEl) resEquipEl.textContent = dropLootText;

      nextBtn?.classList.remove("hidden");
      retryBtn?.classList.add("hidden");
      document.getElementById("btn-res-farm-again")?.classList.remove("hidden");

      // 先播放关后胜利剧情对话，再判定名将生擒纳降，随后弹出神兵大奖或结算面板
      this.story.playChapterVictory(this.currentStageId, () => {
        const candidates = ch.recruitHeroIds || (ch.recruitHeroId ? [ch.recruitHeroId] : []);
        const recruitId = candidates.find(id => !this.saveData.recruitedHeroes || !this.saveData.recruitedHeroes.includes(id));

        const proceedAfterRecruit = () => {
          if (firstEpicLoot) {
            const lootIconEl = document.getElementById("epic-loot-icon");
            if (lootIconEl) {
              if (firstEpicLoot.image) {
                lootIconEl.innerHTML = `<img src="${firstEpicLoot.image}" alt="${firstEpicLoot.name}" class="epic-loot-pixel-img" />`;
              } else {
                lootIconEl.textContent = firstEpicLoot.icon;
              }
            }
            document.getElementById("epic-loot-name").textContent = `【${firstEpicLoot.name} (1星)】`;
            document.getElementById("epic-loot-desc").textContent = `${firstEpicLoot.desc} 已收入主公武库！`;
            document.getElementById("epic-loot-stat").textContent = `⚔️ ${firstEpicLoot.starStats[1].desc}`;
            document.getElementById("modal-epic-loot")?.classList.add("open");
          } else {
            document.getElementById("battle-result-modal")?.classList.add("open");
          }
        };

        if (recruitId && RECRUIT_CONDITIONS[recruitId]) {
          this.openRecruitModal(recruitId, proceedAfterRecruit);
        } else {
          proceedAfterRecruit();
        }
      }, this.currentFaction);
    } else {
      modalBox?.classList.add("defeat");
      if (banner) banner.textContent = "😭";
      if (title) title.textContent = "城 池 陷 落！";

      const starRow = document.getElementById("result-star-row");
      if (starRow) starRow.innerHTML = "⚪ ⚪ ⚪";
      document.getElementById("result-star-label").textContent = "战局失利，重整旗鼓再战！";

      document.getElementById("res-loot-silver").textContent = "+0 🥈";
      document.getElementById("res-loot-gold-ingot").textContent = "+0 💰";
      document.getElementById("res-castle-hp").textContent = "0%";

      nextBtn?.classList.add("hidden");
      retryBtn?.classList.remove("hidden");
      document.getElementById("btn-res-farm-again")?.classList.add("hidden");

      document.getElementById("battle-result-modal")?.classList.add("open");
    }
  }

  // 阵前生擒与招降纳降体系
  openRecruitModal(heroId, onDone) {
    const modal = document.getElementById("modal-recruit-hero");
    if (!modal) {
      if (onDone) onDone();
      return;
    }

    const cond = RECRUIT_CONDITIONS[heroId];
    if (!cond) {
      if (onDone) onDone();
      return;
    }

    const avatarImg = document.getElementById("recruit-avatar-img");
    if (avatarImg) avatarImg.src = cond.avatar || `assets/generals/${heroId}_128.png`;
    document.getElementById("recruit-hero-name").textContent = cond.name;
    document.getElementById("recruit-hero-job").textContent = cond.title.split('·')[0].trim();
    document.getElementById("recruit-quote").textContent = cond.dialogue || "“愿为主公赴汤蹈火！”";
    document.getElementById("recruit-specialty-desc").textContent = cond.desc;

    // 计算当前总星级
    let totalStars = 0;
    if (this.saveData.chapterStars) {
      Object.values(this.saveData.chapterStars).forEach(s => totalStars += (s || 0));
    }

    // 检查各项条件
    const reqs = cond.conditions || {};
    const reqListEl = document.getElementById("recruit-req-list");
    reqListEl.innerHTML = "";

    let allMet = true;

    // 1. 战功星级
    if (reqs.minStars !== undefined) {
      const met = totalStars >= reqs.minStars;
      if (!met) allMet = false;
      const item = document.createElement("div");
      item.className = `recruit-req-item ${met ? 'met' : 'unmet'}`;
      item.innerHTML = `
        <span>⭐ 战役总功勋星级: 需 <strong>${reqs.minStars}</strong> 星 (当前: ${totalStars} 星)</span>
        <span class="${met ? 'recruit-req-status-met' : 'recruit-req-status-unmet'}">${met ? '✓ 满足' : '✕ 未达标'}</span>
      `;
      reqListEl.appendChild(item);
    }

    // 2. 铜钱军饷
    if (reqs.copperCost !== undefined) {
      const met = (this.saveData.copper || 0) >= reqs.copperCost;
      if (!met) allMet = false;
      const item = document.createElement("div");
      item.className = `recruit-req-item ${met ? 'met' : 'unmet'}`;
      item.innerHTML = `
        <span>🪙 礼聘军费: 需 <strong>${reqs.copperCost}</strong> 铜钱 (国库: ${this.saveData.copper || 0})</span>
        <span class="${met ? 'recruit-req-status-met' : 'recruit-req-status-unmet'}">${met ? '✓ 充足' : '✕ 军费不足'}</span>
      `;
      reqListEl.appendChild(item);
    }

    // 3. 银两赏赐
    if (reqs.silverCost !== undefined) {
      const met = (this.saveData.silver || 0) >= reqs.silverCost;
      if (!met) allMet = false;
      const item = document.createElement("div");
      item.className = `recruit-req-item ${met ? 'met' : 'unmet'}`;
      item.innerHTML = `
        <span>🥈 犒赏白银: 需 <strong>${reqs.silverCost}</strong> 银两 (存量: ${this.saveData.silver || 0})</span>
        <span class="${met ? 'recruit-req-status-met' : 'recruit-req-status-unmet'}">${met ? '✓ 充足' : '✕ 银两不足'}</span>
      `;
      reqListEl.appendChild(item);
    }

    // 4. 元宝信物
    if (reqs.goldIngotsCost !== undefined) {
      const met = (this.saveData.goldIngots || 0) >= reqs.goldIngotsCost;
      if (!met) allMet = false;
      const item = document.createElement("div");
      item.className = `recruit-req-item ${met ? 'met' : 'unmet'}`;
      item.innerHTML = `
        <span>💰 黄金元宝: 需 <strong>${reqs.goldIngotsCost}</strong> 元宝 (存量: ${this.saveData.goldIngots || 0})</span>
        <span class="${met ? 'recruit-req-status-met' : 'recruit-req-status-unmet'}">${met ? '✓ 充足' : '✕ 元宝不足'}</span>
      `;
      reqListEl.appendChild(item);
    }

    const acceptBtn = document.getElementById("btn-recruit-accept");
    acceptBtn.disabled = !allMet;
    acceptBtn.textContent = allMet ? `🤝 备厚礼纳降 · 收入麾下！` : `归顺条件未满足 (需积攒功勋或财帛)`;

    acceptBtn.onclick = () => {
      if (!allMet) return;
      if (reqs.copperCost) this.saveData.copper -= reqs.copperCost;
      if (reqs.silverCost) this.saveData.silver -= reqs.silverCost;
      if (reqs.goldIngotsCost) this.saveData.goldIngots -= reqs.goldIngotsCost;

      if (!this.saveData.recruitedHeroes) this.saveData.recruitedHeroes = ["liubei", "guanyu", "zhangfei"];
      if (!this.saveData.recruitedHeroes.includes(heroId)) {
        this.saveData.recruitedHeroes.push(heroId);
      }

      // 若当前编队未满 3 人，可自动选拔入阵
      if (this.saveData.selectedHeroes && this.saveData.selectedHeroes.length < 3 && !this.saveData.selectedHeroes.includes(heroId)) {
        this.saveData.selectedHeroes.push(heroId);
      }

      SaveManager.save(this.saveData);
      sound.playVictory();
      showToast(`🎉 成功纳降名将【${cond.name}】！已编入大军名将库！`, "success");

      modal.classList.remove("open");
      if (onDone) onDone();
    };

    const jailBtn = document.getElementById("btn-recruit-jail");
    jailBtn.onclick = () => {
      modal.classList.remove("open");
      showToast(`⛓️ 已将【${cond.name}】暂押天牢，日后可于名将谱随时纳降！`, "info");
      if (onDone) onDone();
    };

    modal.classList.add("open");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new PushWarGameApp();
  window.gameApp = app;
  window.game = app;
  app.init();
});
