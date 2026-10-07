// 《吞食三国传》高品质手绘像素与名将战斗动画渲染引擎

// 安全的原生圆角矩形绘制函数
function safeRoundRect(ctx, x, y, width, height, radius) {
  let r = typeof radius === 'number' ? radius : 6;
  if (width < 2 * r) r = width / 2;
  if (height < 2 * r) r = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

// 像素武将与兵种素材配置表
const SPRITE_CONFIGS = {
  infantry: { src: "assets/generals/infantry_128.png", size: 52, bottomPad: 0.125, slash: "slash", slashColor: "#93c5fd" },
  archer: { src: "assets/generals/archer_128.png", size: 52, bottomPad: 0.070, slash: "shoot", slashColor: "#fef08a" },
  cavalry: { src: "assets/generals/cavalry_128.png", size: 62, bottomPad: 0.008, slash: "thrust", slashColor: "#f59e0b" },
  liubei: { src: "assets/generals/liubei_128.png", size: 58, bottomPad: 0.055, slash: "double_slash", slashColor: "#facc15" },
  guanyu: { src: "assets/generals/guanyu_128.png", size: 62, bottomPad: 0.125, slash: "blade", slashColor: "#22c55e" },
  zhangfei: { src: "assets/generals/zhangfei_128.png", size: 62, bottomPad: 0.070, slash: "spear", slashColor: "#f97316" },
  zhaoyun: { src: "assets/generals/zhaoyun_128.png", size: 60, bottomPad: 0.109, slash: "thrust", slashColor: "#38bdf8" },
  zhugeliang: { src: "assets/generals/zhugeliang_128.png", size: 58, bottomPad: 0.078, slash: "fan", slashColor: "#a855f7" },
  lvbu: { src: "assets/generals/lvbu_128.png", size: 68, bottomPad: 0.062, slash: "halberd", slashColor: "#ef4444" },
  chenyuanzhi: { src: "assets/generals/chenyuanzhi_128.png", size: 58, bottomPad: 0.070, slash: "blade", slashColor: "#eab308" },
  huangzhong: { src: "assets/generals/huangzhong_128.png", size: 60, bottomPad: 0.000, slash: "shoot", slashColor: "#facc15" },
  machao: { src: "assets/generals/machao_128.png", size: 62, bottomPad: 0.086, slash: "thrust", slashColor: "#38bdf8" },
  weiyan: { src: "assets/generals/weiyan_128.png", size: 60, bottomPad: 0.070, slash: "blade", slashColor: "#dc2626" },
  taishici: { src: "assets/generals/taishici_128.png", size: 58, bottomPad: 0.078, slash: "shoot", slashColor: "#60a5fa" },
  caocao: { src: "assets/generals/caocao_128.png", size: 62, bottomPad: 0.039, slash: "blade", slashColor: "#eab308" },
  simayi: { src: "assets/generals/simayi_128.png", size: 62, bottomPad: 0.055, slash: "fan", slashColor: "#a855f7" },
  sunce: { src: "assets/generals/sunce_128.png", size: 64, bottomPad: 0.045, slash: "thrust", slashColor: "#38bdf8" },
  zhouyu: { src: "assets/generals/zhouyu_128.png", size: 60, bottomPad: 0.055, slash: "fan", slashColor: "#ef4444" },
  dianwei: { src: "assets/generals/dianwei_128.png", size: 66, bottomPad: 0.045, slash: "double_slash", slashColor: "#dc2626" },
  diaochan: { src: "assets/generals/diaochan_128.png", size: 58, bottomPad: 0.055, slash: "fan", slashColor: "#ec4899" },
  sunquan: { src: "assets/generals/sunquan_128.png", size: 62, bottomPad: 0.045, slash: "blade", slashColor: "#10b981" },
  luxun: { src: "assets/generals/luxun_128.png", size: 60, bottomPad: 0.050, slash: "fan", slashColor: "#f97316" },
  xuchu: { src: "assets/generals/xuchu_128.png", size: 66, bottomPad: 0.045, slash: "blade", slashColor: "#f59e0b" },
  xiahoudun: { src: "assets/generals/xiahoudun_128.png", size: 64, bottomPad: 0.050, slash: "blade", slashColor: "#7e22ce" },
  zhangliao: { src: "assets/generals/zhangliao_128.png", size: 64, bottomPad: 0.045, slash: "thrust", slashColor: "#a855f7" },
  ganning: { src: "assets/generals/ganning_128.png", size: 62, bottomPad: 0.050, slash: "double_slash", slashColor: "#0891b2" },
  dongzhuo: { src: "assets/generals/dongzhuo_128.png", size: 68, bottomPad: 0.045, slash: "blade", slashColor: "#991b1b" },
  zhangjiao: { src: "assets/generals/zhangjiao_128.png", size: 62, bottomPad: 0.050, slash: "fan", slashColor: "#eab308" },
  yuanshao: { src: "assets/generals/yuanshao_128.png", size: 66, bottomPad: 0.045, slash: "blade", slashColor: "#eab308" },
  guojia: { src: "assets/generals/guojia_128.png", size: 60, bottomPad: 0.050, slash: "fan", slashColor: "#a855f7" },
  xiahouyuan: { src: "assets/generals/xiahouyuan_128.png", size: 62, bottomPad: 0.045, slash: "shoot", slashColor: "#10b981" },
  caoren: { src: "assets/generals/caoren_128.png", size: 66, bottomPad: 0.045, slash: "thrust", slashColor: "#3b82f6" },
  pangde: { src: "assets/generals/pangde_128.png", size: 64, bottomPad: 0.045, slash: "blade", slashColor: "#eab308" },
  lusu: { src: "assets/generals/lusu_128.png", size: 60, bottomPad: 0.050, slash: "fan", slashColor: "#0284c7" },
  lvmeng: { src: "assets/generals/lvmeng_128.png", size: 62, bottomPad: 0.045, slash: "thrust", slashColor: "#06b6d4" },
  zhoutai: { src: "assets/generals/zhoutai_128.png", size: 64, bottomPad: 0.045, slash: "double_slash", slashColor: "#d97706" },
  huanggai: { src: "assets/generals/huanggai_128.png", size: 64, bottomPad: 0.045, slash: "blade", slashColor: "#ea580c" },
  pangtong: { src: "assets/generals/pangtong_128.png", size: 60, bottomPad: 0.050, slash: "fan", slashColor: "#8b5cf6" },
  jiangwei: { src: "assets/generals/jiangwei_128.png", size: 62, bottomPad: 0.045, slash: "thrust", slashColor: "#10b981" },
  yanliang: { src: "assets/generals/yanliang_128.png", size: 66, bottomPad: 0.045, slash: "blade", slashColor: "#b91c1c" },
  wenchou: { src: "assets/generals/wenchou_128.png", size: 66, bottomPad: 0.045, slash: "spear", slashColor: "#78350f" },
  jiling: { src: "assets/generals/jiling_128.png", size: 64, bottomPad: 0.045, slash: "thrust", slashColor: "#ca8a04" },
  zhangren: { src: "assets/generals/zhangren_128.png", size: 62, bottomPad: 0.045, slash: "shoot", slashColor: "#10b981" },
  menghuo: { src: "assets/generals/menghuo_128.png", size: 68, bottomPad: 0.045, slash: "blade", slashColor: "#15803d" }
};

const SPRITE_CACHE = {};

// 初始化预加载所有精灵图
if (typeof window !== 'undefined') {
  for (const [key, cfg] of Object.entries(SPRITE_CONFIGS)) {
    const img = new Image();
    img.src = cfg.src;
    SPRITE_CACHE[key] = {
      img,
      loaded: false
    };
    img.onload = () => {
      SPRITE_CACHE[key].loaded = true;
    };
  }
}

export class CharacterRenderer {

  /**
   * 核心像素精灵动态绘制引擎 (带地面阴影、阵营光环、行进起伏、攻击突刺弧光、受击闪光)
   */
  static drawPixelGeneral(ctx, x, y, spriteKey, walkCycle = 0, attackTimer = 0, hurtTimer = 0, team = 'blue', customOpts = {}) {
    const cached = SPRITE_CACHE[spriteKey];
    if (!cached || !cached.loaded) {
      return false; // 素材未就绪时平滑回退到原生矢量渲染
    }

    const cfg = SPRITE_CONFIGS[spriteKey] || { size: 58, bottomPad: 0.08, slash: 'slash', slashColor: '#fff' };
    const isBlue = team === 'blue';
    const s = customOpts.size || cfg.size;
    const bottomPad = cfg.bottomPad || 0.08;

    ctx.save();
    // 1. 平移到角色足底锚点
    ctx.translate(x, y);

    // 2. 地面阴影与阵营战意光环 (贴地不变形)
    ctx.save();
    ctx.strokeStyle = isBlue ? "rgba(59, 130, 246, 0.45)" : "rgba(239, 68, 68, 0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.32, 7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 随行走轻微缩放的地面软阴影
    const bounce = Math.abs(Math.sin(walkCycle * 2.2)) * (customOpts.bounce || 4.2);
    const shadowScale = Math.max(0.65, 1 - (bounce / 20));
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.28 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. 阵营朝向：蓝军向右(1, 1)，红军向左(-1, 1)
    if (!isBlue) {
      ctx.scale(-1, 1);
    }

    // 4. 受击抖动与明亮闪光
    if (hurtTimer > 0) {
      const shakeX = (hurtTimer % 2 === 0 ? -3 : 2);
      ctx.translate(shakeX, 0);
      ctx.filter = "brightness(1.8) contrast(1.2)";
    }

    // 5. 行走起伏与微倾斜 (Q版果冻弹跳走动感)
    const tilt = Math.sin(walkCycle * 2.2) * 0.05;
    ctx.translate(0, -bounce);
    ctx.rotate(tilt);

    // 6. 攻击突进位移
    if (attackTimer > 0) {
      const lunge = Math.sin((attackTimer / 15) * Math.PI) * (customOpts.lunge || 13);
      ctx.translate(lunge, 0);
    }

    // 7. 精准像素贴图渲染 (关闭平滑抗锯齿，保持复古点阵纯净)
    ctx.imageSmoothingEnabled = false;
    const drawX = -s / 2;
    const drawY = -s + (s * bottomPad);
    ctx.drawImage(cached.img, drawX, drawY, s, s);

    // 8. 攻击时光效刀芒与突刺残影 (在人物前方)
    if (attackTimer > 0) {
      const slashType = customOpts.slash || cfg.slash;
      const slashColor = customOpts.slashColor || cfg.slashColor;

      ctx.save();
      ctx.strokeStyle = slashColor;
      ctx.shadowColor = slashColor;
      ctx.shadowBlur = 10;

      if (slashType === 'blade' || slashType === 'slash') {
        // 大刀/斩击弧光
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        const startAngle = -Math.PI * 0.45;
        const endAngle = Math.PI * 0.35;
        ctx.arc(s * 0.1, -s * 0.45, s * 0.48, startAngle, endAngle);
        ctx.stroke();

        // 刀刃高光流光
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(s * 0.1, -s * 0.45, s * 0.48, startAngle + 0.2, endAngle - 0.2);
        ctx.stroke();
      } else if (slashType === 'thrust' || slashType === 'spear') {
        // 长枪/蛇矛突刺锋芒
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(s * 0.15, -s * 0.45);
        ctx.lineTo(s * 0.72, -s * 0.45);
        ctx.stroke();

        // 枪尖破空菱形星芒
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s * 0.72, -s * 0.45, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (slashType === 'double_slash') {
        // 双股剑交叉双斩
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(s * 0.05, -s * 0.6);
        ctx.lineTo(s * 0.55, -s * 0.3);
        ctx.moveTo(s * 0.05, -s * 0.3);
        ctx.lineTo(s * 0.55, -s * 0.6);
        ctx.stroke();
      } else if (slashType === 'halberd') {
        // 吕布方天画戟烈焰霸道月牙
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(s * 0.15, -s * 0.48, s * 0.58, -Math.PI * 0.6, Math.PI * 0.4);
        ctx.stroke();
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else if (slashType === 'shoot') {
        // 弓箭破空虚影
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(s * 0.25, -s * 0.45);
        ctx.lineTo(s * 0.65, -s * 0.45);
        ctx.stroke();
      } else if (slashType === 'fan') {
        // 羽扇/谋士奇策罡风气浪
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(s * 0.15, -s * 0.45, s * 0.45, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
        ctx.fillStyle = slashColor;
        ctx.beginPath();
        ctx.arc(s * 0.52, -s * 0.45, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.restore();
    return true;
  }

  // 1. 坚盾步兵 🛡️ (高品质像素精灵 / 原生矢量双模渲染)
  static drawInfantry(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'infantry', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const isBlue = team === 'blue';
    const mainColor = isBlue ? "#3b82f6" : "#ef4444";
    const skinColor = "#fde047";
    const helmetColor = isBlue ? "#1d4ed8" : "#dc2626";

    // 跑步与身体弹跳
    const legSwing = Math.sin(walkCycle) * 6;
    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 3;
    ctx.translate(0, -bodyBounce);

    // 腿部 (两条黑色小短腿)
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-6 + legSwing, -10, 4, 10);
    ctx.fillRect(2 - legSwing, -10, 4, 10);

    // 身体 (圆嘟嘟铠甲)
    ctx.fillStyle = mainColor;
    safeRoundRect(ctx, -10, -26, 20, 18, 6);
    ctx.fill();

    // 头部 (大圆脸)
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -32, 10, 0, Math.PI * 2);
    ctx.fill();

    // 大铁盔与头顶盔缨
    ctx.fillStyle = helmetColor;
    ctx.beginPath();
    ctx.arc(0, -35, 11, Math.PI, 0);
    ctx.lineTo(11, -33);
    ctx.lineTo(-11, -33);
    ctx.fill();

    ctx.fillStyle = isBlue ? "#93c5fd" : "#fca5a5";
    ctx.beginPath();
    ctx.arc(0, -46, 4, 0, Math.PI * 2);
    ctx.fill();

    // 萌萌大眼睛 (受击时变 >_<)
    ctx.fillStyle = "#0f172a";
    if (hurtTimer > 0) {
      ctx.font = "bold 10px sans-serif";
      ctx.fillText("><", -5, -30);
    } else {
      ctx.beginPath();
      ctx.arc(isBlue ? 3 : -3, -33, 2.5, 0, Math.PI * 2);
      ctx.arc(isBlue ? 7 : -7, -33, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 左手金色包边大盾牌
    ctx.save();
    ctx.fillStyle = isBlue ? "#2563eb" : "#991b1b";
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2.5;
    safeRoundRect(ctx, isBlue ? -14 : 2, -28, 12, 18, 4);
    ctx.fill();
    ctx.stroke();
    // 盾牌金色十字纹
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(isBlue ? -9 : 7, -24, 2, 10);
    ctx.fillRect(isBlue ? -12 : 4, -20, 8, 2);
    ctx.restore();

    // 右手小短剑挥砍
    ctx.save();
    const slashAngle = attackTimer > 0 ? (isBlue ? 0.85 : -0.85) : 0;
    ctx.translate(isBlue ? 8 : -8, -20);
    ctx.rotate(slashAngle);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(-2, -14, 4, 14);
    ctx.fillStyle = "#d97706";
    ctx.fillRect(-4, -2, 8, 3);
    ctx.restore();

    ctx.restore();
  }

  // 2. 连弩弓手 🏹 (高品质像素精灵 / 原生矢量双模渲染)
  static drawArcher(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'archer', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const isBlue = team === 'blue';
    const mainColor = isBlue ? "#059669" : "#dc2626";
    const skinColor = "#fde047";

    const legSwing = Math.sin(walkCycle) * 5;
    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 2;
    ctx.translate(0, -bodyBounce);

    // 棕色小腿
    ctx.fillStyle = "#78350f";
    ctx.fillRect(-5 + legSwing, -8, 3, 8);
    ctx.fillRect(2 - legSwing, -8, 3, 8);

    // 斗篷身体
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(9, -10);
    ctx.lineTo(-9, -10);
    ctx.closePath();
    ctx.fill();

    // 脑袋
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -28, 8, 0, Math.PI * 2);
    ctx.fill();

    // 贝雷帽与帅气羽毛
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.ellipse(0, -32, 10, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(isBlue ? -6 : 6, -34);
    ctx.lineTo(isBlue ? -12 : 12, -44);
    ctx.lineTo(isBlue ? -4 : 4, -36);
    ctx.fill();

    // 眼睛
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(isBlue ? 2 : -2, -28, 2, 0, Math.PI * 2);
    ctx.fill();

    // 手中木弓 (拉弓射击动画)
    ctx.save();
    ctx.translate(isBlue ? 8 : -8, -20);
    ctx.strokeStyle = "#854d0e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 10, isBlue ? -Math.PI / 2 : Math.PI / 2, isBlue ? Math.PI / 2 : 3 * Math.PI / 2);
    ctx.stroke();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    if (attackTimer > 0) ctx.lineTo(isBlue ? -6 : 6, 0);
    else ctx.lineTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // 3. 重甲铁骑 🐎 (高品质像素精灵 / 原生矢量双模渲染)
  static drawCavalry(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'cavalry', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const isBlue = team === 'blue';
    const mainColor = isBlue ? "#2563eb" : "#dc2626";
    const horseColor = isBlue ? "#ffffff" : "#78350f";

    const horseGallop = Math.sin(walkCycle * 1.5) * 4;
    ctx.translate(0, -horseGallop);

    // 战马四蹄
    const legF = Math.sin(walkCycle * 1.5) * 8;
    const legB = Math.cos(walkCycle * 1.5) * 8;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(isBlue ? 8 + legF : -12 - legF, -10, 4, 10);
    ctx.fillRect(isBlue ? -12 + legB : 8 - legB, -10, 4, 10);

    // 马身
    ctx.fillStyle = horseColor;
    safeRoundRect(ctx, -16, -24, 32, 16, 8);
    ctx.fill();

    // 马头与马鬃
    ctx.beginPath();
    const headX = isBlue ? 14 : -14;
    ctx.arc(headX, -28, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isBlue ? "#facc15" : "#000000";
    ctx.fillRect(isBlue ? 8 : -12, -34, 4, 8);

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(isBlue ? 16 : -16, -29, 2, 0, Math.PI * 2);
    ctx.fill();

    // 马鞍
    ctx.fillStyle = mainColor;
    ctx.fillRect(-6, -26, 12, 6);

    // 骑士脑袋与头盔
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(0, -38, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isBlue ? "#1d4ed8" : "#991b1b";
    ctx.beginPath();
    ctx.arc(0, -40, 8, Math.PI, 0);
    ctx.fill();

    // 骑士长枪突刺
    ctx.save();
    const lanceLurch = attackTimer > 0 ? (isBlue ? 12 : -12) : 0;
    ctx.translate(lanceLurch, -32);
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(isBlue ? 28 : -28, 0);
    ctx.lineTo(isBlue ? 20 : -20, -3);
    ctx.lineTo(isBlue ? 20 : -20, 3);
    ctx.fill();

    ctx.strokeStyle = "#854d0e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(isBlue ? -10 : 10, 0);
    ctx.lineTo(isBlue ? 20 : -20, 0);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // 4. 投石巨车 🚜 (木质大轮滚动、杠杆抛石、推车小工)
  static drawCatapult(ctx, x, y, walkCycle, attackTimer, team) {
    ctx.save();
    ctx.translate(x, y);

    const isBlue = team === 'blue';

    // 车身木架
    ctx.fillStyle = "#854d0e";
    ctx.fillRect(-22, -18, 44, 10);

    // 双轮旋转
    const wheelRot = walkCycle * 2;
    [-14, 14].forEach(wx => {
      ctx.save();
      ctx.translate(wx, -6);
      ctx.rotate(wheelRot);
      ctx.fillStyle = "#78350f";
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-7, 0); ctx.lineTo(7, 0);
      ctx.moveTo(0, -7); ctx.lineTo(0, 7);
      ctx.stroke();
      ctx.restore();
    });

    // 投石杠杆臂与巨石
    ctx.save();
    ctx.translate(isBlue ? -6 : 6, -18);
    const armAngle = attackTimer > 0 ? (isBlue ? -0.85 : 0.85) : 0.4;
    ctx.rotate(armAngle);
    ctx.strokeStyle = "#b45309";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(isBlue ? 24 : -24, -20);
    ctx.stroke();

    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.arc(isBlue ? 24 : -24, -20, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 推车小工
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(isBlue ? -24 : 24, -20, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isBlue ? "#3b82f6" : "#ef4444";
    ctx.fillRect(isBlue ? -27 : 21, -14, 6, 8);

    ctx.restore();
  }

  // 5. 常胜大将赵云 ⚡ (高品质像素精灵 / 原生矢量双模渲染)
  static drawZhaoYun(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'zhaoyun', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle * 1.5) * 8;
    const bodyBounce = Math.abs(Math.sin(walkCycle * 1.5)) * 4;
    ctx.translate(0, -bodyBounce);

    // 银白色战靴
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(-8 + legSwing, -12, 5, 12);
    ctx.fillRect(3 - legSwing, -12, 5, 12);

    // 飘逸白色披风
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(-10, -32);
    ctx.lineTo(-24 - Math.sin(walkCycle) * 6, -14);
    ctx.lineTo(-6, -10);
    ctx.fill();

    // 亮银重铠
    ctx.fillStyle = "#94a3b8";
    safeRoundRect(ctx, -12, -32, 24, 22, 6);
    ctx.fill();

    // 蓝色龙纹坎肩
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(-8, -30, 16, 6);

    // 英俊面庞
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(0, -38, 11, 0, Math.PI * 2);
    ctx.fill();

    // 银亮战盔
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.arc(0, -42, 12, Math.PI, 0);
    ctx.lineTo(12, -40);
    ctx.lineTo(-12, -40);
    ctx.fill();

    // 盔顶蓝色缨穗
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(0, -53, 5, 0, Math.PI * 2);
    ctx.fill();

    // 坚毅双眼
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(4, -38, 3, 0, Math.PI * 2);
    ctx.arc(8, -38, 3, 0, Math.PI * 2);
    ctx.fill();

    // 手中亮银枪 (攻击时向前猛突)
    ctx.save();
    const thrustDist = attackTimer > 0 ? 28 : 0;
    ctx.translate(6 + thrustDist, -26);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(-2, -4, 42, 5); // 枪杆
    // 枪尖锋刃 (龙胆银刃)
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(40, -9);
    ctx.lineTo(54, -1.5);
    ctx.lineTo(40, 6);
    ctx.fill();

    // 红缨
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(40, -1.5, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  // 6. 主公刘备 👑 (高品质像素精灵 / 原生矢量双模渲染)
  static drawLiuBei(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'liubei', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle) * 6;
    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 3;
    ctx.translate(0, -bodyBounce);

    // 仁德金光脚环
    ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 黑色云头锦靴
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-7 + legSwing, -10, 5, 10);
    ctx.fillRect(2 - legSwing, -10, 5, 10);

    // 明黄锦袍
    ctx.fillStyle = "#eab308";
    safeRoundRect(ctx, -12, -30, 24, 20, 6);
    ctx.fill();

    // 红色护心镜
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(0, -20, 6, 0, Math.PI * 2);
    ctx.fill();

    // 面容大耳垂
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(0, -36, 11, 0, Math.PI * 2);
    ctx.fill();
    // 双耳垂肩
    ctx.fillRect(-12, -36, 3, 8);
    ctx.fillRect(9, -36, 3, 8);

    // 金冠束发
    ctx.fillStyle = "#facc15";
    ctx.fillRect(-8, -48, 16, 7);
    ctx.fillStyle = "#b45309";
    ctx.fillRect(-2, -54, 4, 6);

    // 仁德双眼
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(4, -36, 2.5, 0, Math.PI * 2);
    ctx.arc(8, -36, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 手中雌雄双股剑
    ctx.save();
    const slash = attackTimer > 0 ? 0.7 : 0;
    ctx.translate(8, -22);
    ctx.rotate(slash);
    // 雄剑 (金鞘)
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(2, -18, 4, 20);
    // 雌剑 (银鞘)
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(7, -15, 3, 18);
    ctx.restore();

    ctx.restore();
  }

  // 7. 武圣关羽 🐉 (绿锦战袍、长髯飘拂、手持青龙偃月刀)
  static drawGuanYu(ctx, x, y, walkCycle, attackTimer, hurtTimer) {
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle) * 7;
    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 3.5;
    ctx.translate(0, -bodyBounce);

    // 重甲战靴
    ctx.fillStyle = "#064e3b";
    ctx.fillRect(-8 + legSwing, -12, 6, 12);
    ctx.fillRect(2 - legSwing, -12, 6, 12);

    // 绿锦战袍
    ctx.fillStyle = "#059669";
    safeRoundRect(ctx, -14, -34, 28, 24, 7);
    ctx.fill();

    // 威严红脸
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(0, -40, 12, 0, Math.PI * 2);
    ctx.fill();

    // 五虎绿战冠
    ctx.fillStyle = "#047857";
    ctx.beginPath();
    ctx.arc(0, -45, 12, Math.PI, 0);
    ctx.fill();

    // 飘逸五缕长髯 (美髯公)
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.moveTo(-6, -34);
    ctx.quadraticCurveTo(0 + Math.sin(walkCycle) * 4, -14, 0, -8);
    ctx.quadraticCurveTo(4, -20, 6, -34);
    ctx.fill();

    // 卧蚕眉、丹凤眼
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(2, -43, 8, 2.5); // 卧蚕眉
    ctx.beginPath();
    ctx.arc(5, -40, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 手中青龙偃月刀
    ctx.save();
    const swingAngle = attackTimer > 0 ? 1.2 : 0;
    ctx.translate(10, -28);
    ctx.rotate(swingAngle);
    // 刀柄 (暗金色)
    ctx.fillStyle = "#92400e";
    ctx.fillRect(-3, -20, 5, 45);
    // 青龙大刀头
    ctx.fillStyle = "#67e8f9";
    ctx.beginPath();
    ctx.moveTo(2, -20);
    ctx.quadraticCurveTo(24, -36, 18, -48);
    ctx.lineTo(2, -32);
    ctx.fill();
    ctx.fillStyle = "#fbbf24"; // 吞口龙雀
    ctx.fillRect(0, -22, 6, 6);
    ctx.restore();

    ctx.restore();
  }

  // 8. 万人敌张飞 🐯 (黑面环眼、燕颔虎须、手握丈八蛇矛)
  static drawZhangFei(ctx, x, y, walkCycle, attackTimer, hurtTimer) {
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle * 1.3) * 7;
    const bodyBounce = Math.abs(Math.sin(walkCycle * 1.3)) * 4;
    ctx.translate(0, -bodyBounce);

    // 粗壮双腿
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-9 + legSwing, -12, 7, 12);
    ctx.fillRect(2 - legSwing, -7, 7, 12);

    // 狂怒黑甲
    ctx.fillStyle = "#334155";
    safeRoundRect(ctx, -15, -34, 30, 24, 8);
    ctx.fill();

    // 黑里透红面庞
    ctx.fillStyle = "#9a3412";
    ctx.beginPath();
    ctx.arc(0, -40, 13, 0, Math.PI * 2);
    ctx.fill();

    // 钢针炸腮虎须
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(0, -34, 15, 0, Math.PI);
    ctx.fill();

    // 环形怒目圆睁
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(5, -42, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(5, -42, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 手中丈八蛇矛 (弯曲蛇形矛尖)
    ctx.save();
    const stab = attackTimer > 0 ? 25 : 0;
    ctx.translate(8 + stab, -26);
    ctx.fillStyle = "#475569";
    ctx.fillRect(-2, -4, 45, 5); // 矛杆
    // 蛇形刃
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(42, -1.5);
    ctx.lineTo(48, -6);
    ctx.lineTo(54, 3);
    ctx.lineTo(60, -1.5);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // 9. 老将黄忠 🏹 (高品质像素精灵 / 原生矢量双模渲染)
  static drawHuangZhong(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'huangzhong', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle) * 5;
    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 3;
    ctx.translate(0, -bodyBounce);

    // 战靴
    ctx.fillStyle = "#78350f";
    ctx.fillRect(-7 + legSwing, -10, 5, 10);
    ctx.fillRect(2 - legSwing, -10, 5, 10);

    // 棕黄老将锁子甲
    ctx.fillStyle = "#b45309";
    safeRoundRect(ctx, -12, -30, 24, 20, 6);
    ctx.fill();

    // 面容
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(0, -36, 11, 0, Math.PI * 2);
    ctx.fill();

    // 银白长须 (老当益壮)
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(-7, -32);
    ctx.lineTo(0, -16);
    ctx.lineTo(7, -32);
    ctx.fill();

    // 铜盔
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(0, -40, 11, Math.PI, 0);
    ctx.fill();

    // 手拉宝雕神弓
    ctx.save();
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(10, -24, 18, -Math.PI * 0.45, Math.PI * 0.45);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // 10. 西凉锦马超 🐎 (神威天将军、白袍狮盔金枪)
  static drawMaChao(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'machao', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    this.drawCavalry(ctx, x, y, walkCycle, attackTimer, hurtTimer, team);
  }

  // 11. 狂骨魏延 🗡️ (嗜血反击狂刀)
  static drawWeiYan(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'weiyan', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    this.drawInfantry(ctx, x, y, walkCycle, attackTimer, hurtTimer, team);
  }

  // 12. 东莱太史慈 🏹 (神射双戟飞矢)
  static drawTaiShiCi(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'taishici', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    this.drawArcher(ctx, x, y, walkCycle, attackTimer, hurtTimer, team);
  }

  // 13. 魏武帝曹操 👑 (黑金衮龙袍、倚天神剑)
  static drawCaoCao(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'red') {
    if (this.drawPixelGeneral(ctx, x, y, 'caocao', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    this.drawLiuBei(ctx, x, y, walkCycle, attackTimer, hurtTimer, team);
  }

  // 14. 冢虎司马懿 🔮 (暗紫羽鹤氅、九幽天雷)
  static drawSimaYi(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'red') {
    if (this.drawPixelGeneral(ctx, x, y, 'simayi', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    this.drawLiuBei(ctx, x, y, walkCycle, attackTimer, hurtTimer, team);
  }

  // 10. 无双飞将战神吕布 🐯 (高品质像素精灵 / 原生矢量双模渲染)
  static drawLvBu(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'red') {
    if (this.drawPixelGeneral(ctx, x, y, 'lvbu', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle * 1.5) * 8;
    const bodyBounce = Math.abs(Math.sin(walkCycle * 1.5)) * 4;
    ctx.translate(0, -bodyBounce);

    // 战神金红斗气光环 (脚底)
    ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 1. 战靴与护腿 (黄金兽头吞口重靴)
    ctx.fillStyle = "#78350f";
    ctx.fillRect(-9 + legSwing, -13, 6, 13);
    ctx.fillRect(3 - legSwing, -13, 6, 13);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(-10 + legSwing, -6, 7, 5);
    ctx.fillRect(2 - legSwing, -6, 7, 5);

    // 2. 西凉红锦百花战袍 (身后随风飘摆)
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.moveTo(-12, -34);
    ctx.lineTo(-28 - Math.sin(walkCycle) * 8, -10);
    ctx.lineTo(-18, 0);
    ctx.lineTo(-4, -12);
    ctx.fill();

    // 3. 兽面吞头连环金铠 (躯干)
    ctx.fillStyle = "#b45309";
    safeRoundRect(ctx, -14, -36, 28, 26, 7);
    ctx.fill();

    // 金铠甲片高光纹理
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-12, -34, 24, 22);

    // 胸前兽面吞头金镜
    ctx.fillStyle = "#ea580c";
    ctx.beginPath();
    ctx.arc(0, -22, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#facc15";
    ctx.fillRect(-4, -24, 8, 4);

    // 4. 战神面容与头颅
    ctx.fillStyle = "#fed7aa";
    ctx.beginPath();
    ctx.arc(0, -42, 12, 0, Math.PI * 2);
    ctx.fill();

    // 剑眉虎目与冷峻战意
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    // 剑眉
    ctx.moveTo(-7, -46); ctx.lineTo(-1, -44);
    ctx.moveTo(1, -44); ctx.lineTo(7, -46);
    ctx.stroke();
    // 双目
    ctx.fillRect(-6, -43, 3.5, 3.5);
    ctx.fillRect(2, -43, 3.5, 3.5);

    // 5. 三叉束发紫金冠 (金顶冠身)
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(-12, -49);
    ctx.lineTo(-6, -58);
    ctx.lineTo(0, -51);
    ctx.lineTo(6, -58);
    ctx.lineTo(12, -49);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#7e22ce"; // 紫金嵌宝
    ctx.fillRect(-3, -52, 6, 4);

    // 6. 标志性双雉鸡翎 (长长的红尾双翎，随风波浪飘舞)
    const featherWave = Math.sin(Date.now() * 0.008) * 6;
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    // 左翎
    ctx.moveTo(-3, -56);
    ctx.quadraticCurveTo(-18 + featherWave, -78, -32 + featherWave * 1.5, -62);
    // 右翎
    ctx.moveTo(3, -56);
    ctx.quadraticCurveTo(18 - featherWave, -82, 36 - featherWave * 1.5, -66);
    ctx.stroke();

    // 翎羽顶端黄缨斑纹
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(-32 + featherWave * 1.5, -62, 4, 0, Math.PI * 2);
    ctx.arc(36 - featherWave * 1.5, -66, 4, 0, Math.PI * 2);
    ctx.fill();

    // 7. 绝世神兵 · 方天画戟 🔱 (长戟在手，烈火金光刀芒)
    ctx.save();
    const slash = attackTimer > 0 ? -1.3 : -0.25;
    ctx.translate(-8, -26);
    ctx.rotate(slash);

    // 乌金画戟杆
    ctx.fillStyle = "#334155";
    ctx.fillRect(-2, -26, 4, 54);

    // 枪尖矛头 (寒光破甲)
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(5, -26);
    ctx.lineTo(-5, -26);
    ctx.closePath();
    ctx.fill();

    // 双侧月牙金刃
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    // 左月牙
    ctx.arc(-8, -26, 7, Math.PI * 0.4, Math.PI * 1.6);
    // 右月牙
    ctx.arc(8, -26, 7, -Math.PI * 0.6, Math.PI * 0.6);
    ctx.stroke();

    // 戟头大红缨穗
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(0, -24, 5, 0, Math.PI * 2);
    ctx.fill();

    // 攻击时的方天画戟金红烈火月弧刀芒
    if (attackTimer > 0) {
      ctx.strokeStyle = "rgba(239, 68, 68, 0.7)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, -32, 28, -Math.PI * 0.8, Math.PI * 0.2);
      ctx.stroke();
    }

    ctx.restore();

    ctx.restore();
  }

  // 7. 武圣关羽 🐉 (高品质像素精灵 / 原生矢量双模渲染)
  static drawGuanYu(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'guanyu', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 4;
    ctx.translate(0, -bodyBounce);

    // 飘逸绿色战袍
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.moveTo(-14, -10);
    ctx.lineTo(-22, 0);
    ctx.lineTo(-4, -10);
    ctx.fill();

    // 金绿铠甲身体
    ctx.fillStyle = "#166534";
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2.5;
    safeRoundRect(ctx, -13, -34, 26, 24, 6);
    ctx.fill();
    ctx.stroke();

    // 枣红面容 (美髯公红脸)
    ctx.fillStyle = "#b91c1c";
    ctx.beginPath();
    ctx.arc(0, -42, 13, 0, Math.PI * 2);
    ctx.fill();

    // 绿色英雄巾帽
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.arc(0, -46, 14, Math.PI, 0);
    ctx.fill();

    // 金色额箍
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(-12, -47, 24, 4);

    // 威严丹凤眼 (微挑)
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(3, -43); ctx.lineTo(10, -45);
    ctx.moveTo(6, -43); ctx.lineTo(12, -45);
    ctx.stroke();

    // 绝美长髯 (美髯公随风飘洒)
    const beardSway = Math.sin(Date.now() * 0.008) * 3;
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.moveTo(-4, -36);
    ctx.quadraticCurveTo(8 + beardSway, -22, 4 + beardSway, -8);
    ctx.quadraticCurveTo(-6, -24, -2, -36);
    ctx.fill();

    // 青龙偃月刀 (冷艳锯锋芒)
    ctx.save();
    const bladeRot = attackTimer > 0 ? 1.05 : 0.15;
    ctx.translate(10, -26);
    ctx.rotate(bladeRot);

    // 长刀柄
    ctx.strokeStyle = "#854d0e";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(34, 0);
    ctx.stroke();

    // 刀头青龙吐刃
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(26, -5, 8, 10);

    // 偃月大刀刃
    ctx.fillStyle = "#38bdf8";
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(32, 0);
    ctx.quadraticCurveTo(46, -18, 56, -6);
    ctx.quadraticCurveTo(46, 6, 34, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 青龙刀气光晕
    if (attackTimer > 0) {
      ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
      ctx.beginPath();
      ctx.arc(46, -6, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.restore();
  }

  // 8. 万人敌张飞 🐯 (高品质像素精灵 / 原生矢量双模渲染)
  static drawZhangFei(ctx, x, y, walkCycle, attackTimer, hurtTimer, team = 'blue') {
    if (this.drawPixelGeneral(ctx, x, y, 'zhangfei', walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const bodyBounce = Math.abs(Math.sin(walkCycle)) * 4;
    ctx.translate(0, -bodyBounce);

    // 黑色重型皮甲
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#ea580c";
    ctx.lineWidth = 2.5;
    safeRoundRect(ctx, -14, -35, 28, 25, 6);
    ctx.fill();
    ctx.stroke();

    // 粗犷大脸
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(0, -42, 13, 0, Math.PI * 2);
    ctx.fill();

    // 豹头黑盔
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(0, -46, 14, Math.PI, 0);
    ctx.fill();

    // 盔顶红缨
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(0, -56, 5, 0, Math.PI * 2);
    ctx.fill();

    // 豹头环眼 (怒睁大圆眼)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(4, -43, 3.5, 0, Math.PI * 2);
    ctx.arc(9, -43, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(5, -43, 2, 0, Math.PI * 2);
    ctx.arc(10, -43, 2, 0, Math.PI * 2);
    ctx.fill();

    // 满脸黑刚须 (络腮大胡子)
    ctx.fillStyle = "#0f172a";
    [-10, -6, -2, 2, 6, 10].forEach(bx => {
      ctx.beginPath();
      ctx.arc(bx, -34, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 丈八蛇矛 (弯曲如蛇刃)
    ctx.save();
    const spearRot = attackTimer > 0 ? 0.9 : 0.05;
    ctx.translate(10, -26);
    ctx.rotate(spearRot);

    // 矛杆
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // 红缨
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(28, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    // 弯曲蛇形矛刃
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(36, -4);
    ctx.lineTo(42, 4);
    ctx.lineTo(48, -4);
    ctx.lineTo(54, 0);
    ctx.stroke();

    // 锋利尖端
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(54, -3);
    ctx.lineTo(60, 0);
    ctx.lineTo(54, 3);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // 9. 精致国风要塞大营 (蓝方汉室青砖飞檐箭楼 / 红方关卡专属营寨：黄巾茅草寨、西凉黑石铁血雄关、诸侯白石军寨)
  static drawCastle(ctx, x, y, team, hpRatio, shakeTimer, stageId = 1) {
    ctx.save();
    ctx.translate(x, y);

    if (shakeTimer > 0) {
      ctx.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
    }

    const isBlue = team === 'blue';
    const flameTime = Date.now() * 0.01;
    const flagWave = Math.sin(Date.now() * 0.006) * 5;

    if (isBlue) {
      // ================= 我方：汉家青砖飞檐箭楼 =================
      // 1. 青砖石砌主体
      ctx.fillStyle = "#334155";
      safeRoundRect(ctx, -44, -96, 88, 96, 6);
      ctx.fill();

      // 黛青石砖分缝勾线
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-42, -94, 84, 94);
      [-72, -48, -24].forEach(ly => {
        ctx.beginPath();
        ctx.moveTo(-42, ly); ctx.lineTo(42, ly);
        ctx.stroke();
      });
      [[-72, -48, -20], [-72, -48, 15], [-48, -24, -30], [-48, -24, 0], [-48, -24, 30], [-24, 0, -15], [-24, 0, 20]].forEach(([y1, y2, bx]) => {
        ctx.beginPath();
        ctx.moveTo(bx, y1); ctx.lineTo(bx, y2);
        ctx.stroke();
      });

      // 2. 汉风朱漆飞檐斗拱 (重檐歇山顶)
      ctx.fillStyle = "#991b1b";
      ctx.fillRect(-48, -98, 96, 5);
      // 上层青琉璃瓦飞檐
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.moveTo(-54, -99);
      ctx.quadraticCurveTo(-46, -107, 0, -107);
      ctx.quadraticCurveTo(46, -107, 54, -99);
      ctx.lineTo(48, -96);
      ctx.lineTo(-48, -96);
      ctx.closePath();
      ctx.fill();
      // 飞檐起翘与金脊兽
      ctx.fillStyle = "#facc15";
      ctx.fillRect(-54, -102, 4, 4);
      ctx.fillRect(50, -102, 4, 4);

      // 城头女墙箭垛
      ctx.fillStyle = "#475569";
      [-36, -12, 12, 36].forEach(cx => {
        ctx.fillRect(cx - 5, -112, 10, 6);
      });

      // 3. 拱形汉风厚重木门与抱鼓石
      ctx.fillStyle = "#78350f";
      ctx.beginPath();
      ctx.arc(0, -32, 18, Math.PI, 0);
      ctx.rect(-18, -32, 36, 32);
      ctx.fill();
      // 金色铜钉
      ctx.fillStyle = "#facc15";
      [-10, 10].forEach(gx => {
        [-24, -14, -4].forEach(gy => {
          ctx.fillRect(gx - 1.5, gy, 3, 3);
        });
      });
      // 汉白玉门前抱鼓石
      ctx.fillStyle = "#e2e8f0";
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      [-24, 24].forEach(bx => {
        ctx.beginPath();
        ctx.arc(bx, -6, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // 4. 青铜宫廷火鼎 (两旁烽火)
      [-32, 32].forEach((tx, idx) => {
        ctx.fillStyle = "#334155";
        ctx.fillRect(tx - 4, -48, 8, 8);
        ctx.fillStyle = "#ca8a04";
        ctx.fillRect(tx - 6, -50, 12, 3);

        const fH = 8 + Math.sin(flameTime + idx * 2) * 3;
        const fW = 4 + Math.cos(flameTime * 1.4 + idx) * 1.5;
        ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
        ctx.beginPath();
        ctx.arc(tx, -54, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.moveTo(tx - fW, -50);
        ctx.quadraticCurveTo(tx, -50 - fH * 1.3, tx, -50 - fH * 1.5);
        ctx.quadraticCurveTo(tx, -50 - fH * 1.3, tx + fW, -50);
        ctx.fill();
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.moveTo(tx - fW * 0.5, -50);
        ctx.quadraticCurveTo(tx, -50 - fH * 0.9, tx, -50 - fH * 1.0);
        ctx.quadraticCurveTo(tx, -50 - fH * 0.9, tx + fW * 0.5, -50);
        ctx.fill();
      });

      // 5. 汉军大纛帅旗 (绣金边蓝底汉旗)
      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -107);
      ctx.lineTo(0, -145);
      ctx.stroke();

      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.moveTo(0, -149); ctx.lineTo(-3, -144); ctx.lineTo(3, -144);
      ctx.fill();

      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.moveTo(0, -144);
      ctx.lineTo(32 + flagWave, -131);
      ctx.lineTo(0, -118);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -144);
      ctx.lineTo(32 + flagWave, -131);
      ctx.lineTo(0, -118);
      ctx.stroke();

      ctx.font = "bold 10px serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("汉", 12 + flagWave * 0.3, -127);

      // 6. 守军弓手
      this.drawArcher(ctx, 0, -112, 0, 0, 0, team);

    } else {
      // ================= 敌方：根据关卡定制要塞 =================
      const isYellowTurban = (stageId === 1 || stageId === 3);
      const isXiliang = (stageId === 2 || stageId === 5 || stageId === 6);

      if (isYellowTurban) {
        // ---------- A. 黄巾草棚排寨 (原木栅栏、茅草哨楼、黄天符幡、木拒马) ----------
        ctx.fillStyle = "#854d0e";
        safeRoundRect(ctx, -40, -90, 80, 90, 4);
        ctx.fill();

        // 竖向捆绑原木排条
        ctx.strokeStyle = "#583107";
        ctx.lineWidth = 2;
        for (let lx = -36; lx <= 36; lx += 12) {
          ctx.beginPath();
          ctx.moveTo(lx, -90); ctx.lineTo(lx, 0);
          ctx.stroke();
          ctx.fillStyle = "#3f2003";
          ctx.fillRect(lx + 2, -50 + (Math.abs(lx) % 15), 3, 4);
        }

        // 麻绳横向交叉捆绑
        ctx.strokeStyle = "#ca8a04";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(-38, -65); ctx.lineTo(38, -65);
        ctx.moveTo(-38, -30); ctx.lineTo(38, -30);
        ctx.stroke();
        ctx.setLineDash([]);

        // 茅草覆盖顶棚
        ctx.fillStyle = "#ca8a04";
        ctx.beginPath();
        ctx.moveTo(-46, -88);
        ctx.lineTo(0, -106);
        ctx.lineTo(46, -88);
        ctx.lineTo(42, -84);
        ctx.lineTo(-42, -84);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#eab308";
        ctx.lineWidth = 1.5;
        for (let sx = -42; sx <= 42; sx += 5) {
          ctx.beginPath();
          ctx.moveTo(sx, -84);
          ctx.lineTo(sx + (sx % 3 - 1) * 2, -80 + (Math.abs(sx) % 4));
          ctx.stroke();
        }

        // 破旧木门
        ctx.fillStyle = "#583107";
        ctx.fillRect(-16, -32, 32, 32);
        ctx.strokeStyle = "#a16207";
        ctx.lineWidth = 2;
        ctx.strokeRect(-16, -32, 32, 32);
        ctx.fillStyle = "#ca8a04";
        ctx.fillRect(-18, -18, 36, 5);

        // 防骑尖锐削尖木鹿角拒马
        ctx.strokeStyle = "#3f2003";
        ctx.lineWidth = 3;
        [-34, -20, 20, 34].forEach(kx => {
          ctx.beginPath();
          ctx.moveTo(kx, 0);
          ctx.lineTo(kx + (kx > 0 ? 12 : -12), -16);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(kx + (kx > 0 ? 6 : -6), -4);
          ctx.lineTo(kx + (kx > 0 ? -6 : 6), -14);
          ctx.stroke();
        });

        // 燃火原木柴堆火把
        [-28, 28].forEach((tx, idx) => {
          ctx.fillStyle = "#713f12";
          ctx.fillRect(tx - 2, -48, 4, 12);
          const fH = 8 + Math.sin(flameTime + idx * 3) * 3;
          const fW = 4 + Math.cos(flameTime * 1.5 + idx) * 1.5;
          ctx.fillStyle = "rgba(245, 158, 11, 0.3)";
          ctx.beginPath();
          ctx.arc(tx, -52, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ea580c";
          ctx.beginPath();
          ctx.moveTo(tx - fW, -48);
          ctx.quadraticCurveTo(tx, -48 - fH * 1.2, tx, -48 - fH * 1.4);
          ctx.quadraticCurveTo(tx, -48 - fH * 1.2, tx + fW, -48);
          ctx.fill();
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.moveTo(tx - fW * 0.5, -48);
          ctx.quadraticCurveTo(tx, -48 - fH * 0.8, tx, -48 - fH * 0.9);
          ctx.quadraticCurveTo(tx, -48 - fH * 0.8, tx + fW * 0.5, -48);
          ctx.fill();
        });

        // 黄天符幡战旗 (随风舞动的明黄神幡)
        ctx.strokeStyle = "#713f12";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -106);
        ctx.lineTo(0, -144);
        ctx.stroke();

        ctx.fillStyle = "#eab308";
        ctx.beginPath();
        ctx.moveTo(0, -144);
        ctx.lineTo(-30 - flagWave, -130);
        ctx.lineTo(-24 - flagWave, -124);
        ctx.lineTo(-30 - flagWave, -118);
        ctx.lineTo(0, -118);
        ctx.closePath();
        ctx.fill();

        ctx.font = "bold 9px serif";
        ctx.fillStyle = "#78350f";
        ctx.textAlign = "center";
        ctx.fillText("黃天", -12 - flagWave * 0.3, -127);

        // 黄巾守军
        this.drawArcher(ctx, 0, -106, 0, 0, 0, team);

      } else if (isXiliang) {
        // ---------- B. 西凉黑石铁血雄关 (黑曜玄铁岩垒、铁刺拒马、董/吕战旗) ----------
        ctx.fillStyle = "#0f172a";
        safeRoundRect(ctx, -44, -98, 88, 98, 4);
        ctx.fill();

        // 巨石分缝与铁皮铆钉包角
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 2;
        ctx.strokeRect(-42, -96, 84, 96);
        [-68, -40, -16].forEach(ly => {
          ctx.beginPath();
          ctx.moveTo(-42, ly); ctx.lineTo(42, ly);
          ctx.stroke();
        });
        ctx.fillStyle = "#475569";
        [-44, 38].forEach(ex => {
          ctx.fillRect(ex, -98, 6, 20);
          ctx.fillStyle = "#94a3b8";
          ctx.fillRect(ex + 1.5, -94, 3, 3);
          ctx.fillRect(ex + 1.5, -84, 3, 3);
        });

        // 铁铸狰狞尖刺女墙
        ctx.fillStyle = "#1e293b";
        [-38, -14, 10, 32].forEach(cx => {
          ctx.fillRect(cx - 4, -112, 10, 14);
          ctx.fillStyle = "#94a3b8";
          ctx.beginPath();
          ctx.moveTo(cx - 4, -112); ctx.lineTo(cx + 1, -118); ctx.lineTo(cx + 6, -112);
          ctx.fill();
        });

        // 铁闸千斤门楼 (垂直铁条与下扎铁刺)
        ctx.fillStyle = "#1e1b4b";
        ctx.fillRect(-18, -34, 36, 34);
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-18, -34, 36, 34);
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 2;
        [-10, 0, 10].forEach(tx => {
          ctx.beginPath();
          ctx.moveTo(tx, -34); ctx.lineTo(tx, 0);
          ctx.stroke();
          ctx.fillStyle = "#e2e8f0";
          ctx.beginPath();
          ctx.moveTo(tx - 2, 0); ctx.lineTo(tx, 4); ctx.lineTo(tx + 2, 0);
          ctx.fill();
        });

        // 铁甲倒刺拒马 (关前防御)
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 3;
        [-36, -20, 20, 36].forEach(kx => {
          ctx.beginPath();
          ctx.moveTo(kx, 0);
          ctx.lineTo(kx + (kx > 0 ? 14 : -14), -18);
          ctx.stroke();
          ctx.fillStyle = "#cbd5e1";
          const tipX = kx + (kx > 0 ? 14 : -14);
          ctx.fillRect(tipX - 2, -20, 4, 4);
        });

        // 铁兽首凶焰火盆 (血红妖焰)
        [-32, 32].forEach((tx, idx) => {
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(tx - 5, -50, 10, 8);
          ctx.fillStyle = "#7f1d1d";
          ctx.fillRect(tx - 7, -52, 14, 3);
          const fH = 9 + Math.sin(flameTime + idx * 2.8) * 3;
          const fW = 4 + Math.cos(flameTime * 1.6 + idx) * 1.5;
          ctx.fillStyle = "rgba(220, 38, 38, 0.35)";
          ctx.beginPath();
          ctx.arc(tx, -54, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#b91c1c";
          ctx.beginPath();
          ctx.moveTo(tx - fW, -50);
          ctx.quadraticCurveTo(tx, -50 - fH * 1.3, tx, -50 - fH * 1.6);
          ctx.quadraticCurveTo(tx, -50 - fH * 1.3, tx + fW, -50);
          ctx.fill();
          ctx.fillStyle = "#f97316";
          ctx.beginPath();
          ctx.moveTo(tx - fW * 0.5, -50);
          ctx.quadraticCurveTo(tx, -50 - fH * 0.9, tx, -50 - fH * 1.0);
          ctx.quadraticCurveTo(tx, -50 - fH * 0.9, tx + fW * 0.5, -50);
          ctx.fill();
        });

        // 铁血帅旗 (黑底赤焰边，“董”或“吕”)
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(0, -112);
        ctx.lineTo(0, -148);
        ctx.stroke();
        ctx.fillStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.moveTo(0, -154); ctx.lineTo(-3, -148); ctx.lineTo(3, -148);
        ctx.fill();

        ctx.fillStyle = "#020617";
        ctx.beginPath();
        ctx.moveTo(0, -148);
        ctx.lineTo(-32 - flagWave, -134);
        ctx.lineTo(0, -120);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "bold 10px serif";
        ctx.fillStyle = "#ef4444";
        ctx.textAlign = "center";
        const generalChar = (stageId === 2) ? "董" : "吕";
        ctx.fillText(generalChar, -12 - flagWave * 0.3, -130);

        // 守关西凉甲士
        this.drawArcher(ctx, 0, -112, 0, 0, 0, team);

      } else {
        // ---------- C. 诸侯白石军寨 (汉白玉/青石城垣、赤木辕门、诸侯魏字旗) ----------
        ctx.fillStyle = "#94a3b8";
        safeRoundRect(ctx, -42, -95, 84, 95, 6);
        ctx.fill();

        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 2;
        ctx.strokeRect(-38, -85, 76, 85);
        ctx.beginPath();
        ctx.moveTo(-38, -60); ctx.lineTo(38, -60);
        ctx.moveTo(-38, -35); ctx.lineTo(38, -35);
        ctx.stroke();

        ctx.fillStyle = "#64748b";
        [-40, -14, 14].forEach(cx => {
          ctx.fillRect(cx, -107, 18, 12);
        });

        // 赤木辕门
        ctx.fillStyle = "#991b1b";
        ctx.beginPath();
        ctx.arc(0, -32, 18, Math.PI, 0);
        ctx.rect(-18, -32, 36, 32);
        ctx.fill();

        [-28, 28].forEach((tx, idx) => {
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(tx - 2, -50, 4, 10);
          const fH = 7 + Math.sin(flameTime + idx * 2.5) * 3;
          const fW = 4 + Math.cos(flameTime * 1.3 + idx) * 1.5;
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.moveTo(tx - fW, -53);
          ctx.quadraticCurveTo(tx, -53 - fH * 1.4, tx, -53 - fH * 1.6);
          ctx.quadraticCurveTo(tx, -53 - fH * 1.4, tx + fW, -53);
          ctx.fill();
        });

        // 诸侯战旗
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -107);
        ctx.lineTo(0, -140);
        ctx.stroke();

        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.moveTo(0, -140);
        ctx.lineTo(-30 - flagWave, -128);
        ctx.lineTo(0, -116);
        ctx.fill();

        ctx.font = "bold 9px serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("魏", -12, -125);

        this.drawArcher(ctx, 0, -108, 0, 0, 0, team);
      }
    }

    ctx.restore();
  }

  // 16. 全18章敌方历史名将专属绘制 (程远志/曹仁/纪灵/颜良/文丑/曹操/张任/夏侯渊/庞德/陆逊/孟获/司马懿等)
  static drawEnemyGeneral(ctx, x, y, walkCycle, attackTimer, hurtTimer, bossType = 'general', team = 'red') {
    const cleanKey = bossType.replace(/^enemy_boss_/, '').replace(/_ch\d+$/, '');
    const fallbackBossMap = {
      guanhai: 'chenyuanzhi',
      caoren: 'caocao',
      jiling: 'chenyuanzhi',
      yanliang: 'weiyan',
      wenchou: 'machao',
      caochun: 'cavalry',
      zhangren: 'zhaoyun',
      xiahouyuan: 'huangzhong',
      pangde: 'machao',
      menghuo: 'zhangfei',
      caozhen: 'caocao'
    };
    const spriteKey = cleanKey.startsWith('lvbu')
      ? 'lvbu'
      : (SPRITE_CONFIGS[cleanKey] ? cleanKey : fallbackBossMap[cleanKey]);

    if (spriteKey && this.drawPixelGeneral(ctx, x, y, spriteKey, walkCycle, attackTimer, hurtTimer, team)) {
      return;
    }
    ctx.save();
    ctx.translate(x, y);

    const legSwing = Math.sin(walkCycle * 1.3) * 7;
    const bodyBounce = Math.abs(Math.sin(walkCycle * 1.3)) * 3.5;
    ctx.translate(0, -bodyBounce);

    if (hurtTimer > 0) {
      ctx.fillStyle = "#ffffff";
    }

    // 默认靴子
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-7 + legSwing, -11, 5, 11);
    ctx.fillRect(2 - legSwing, -11, 5, 11);

    if (bossType === 'chenyuanzhi' || bossType === 'guanhai') {
      // 🦹 黄巾渠帅 (黄抹额头巾、粗豪战袍、大砍刀)
      ctx.fillStyle = "#ca8a04";
      safeRoundRect(ctx, -13, -32, 26, 22, 6);
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -38, 11, 0, Math.PI * 2);
      ctx.fill();

      // 黄色抹额
      ctx.fillStyle = "#eab308";
      ctx.fillRect(-9, -46, 18, 6);

      // 大砍刀
      ctx.save();
      const chop = attackTimer > 0 ? -1.2 : -0.2;
      ctx.translate(-8, -24);
      ctx.rotate(chop);
      ctx.fillStyle = "#713f12";
      ctx.fillRect(-2, -14, 4, 28);
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(-8, -24, 12, 14);
      ctx.restore();

    } else if (bossType === 'caoren' || bossType === 'caozhen') {
      // 🛡️ 曹魏大将曹仁/曹真 (重装铁甲、铁壁重盾)
      ctx.fillStyle = "#1e293b";
      safeRoundRect(ctx, -14, -34, 28, 24, 6);
      ctx.fill();
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -40, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#64748b";
      ctx.fillRect(-8, -50, 16, 8);

      // 铁壁大盾
      ctx.fillStyle = "#334155";
      safeRoundRect(ctx, -18, -32, 10, 22, 3);
      ctx.fill();

    } else if (bossType === 'jiling') {
      // ⚔️ 纪灵 (三尖两刃刀、金铠红战袍)
      ctx.fillStyle = "#b91c1c";
      safeRoundRect(ctx, -13, -32, 26, 22, 6);
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -38, 11, 0, Math.PI * 2);
      ctx.fill();

      // 三尖两刃刀
      ctx.save();
      const chop = attackTimer > 0 ? -1.2 : -0.3;
      ctx.translate(-8, -24);
      ctx.rotate(chop);
      ctx.fillStyle = "#b45309";
      ctx.fillRect(-2, -20, 4, 40);
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.moveTo(0, -32); ctx.lineTo(6, -20); ctx.lineTo(-6, -20);
      ctx.fill();
      ctx.restore();

    } else if (bossType === 'yanliang' || bossType === 'wenchou') {
      // ⚔️ 颜良文丑 (河北名将重甲、大戟冲锋)
      ctx.fillStyle = "#7f1d1d";
      safeRoundRect(ctx, -14, -34, 28, 24, 6);
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -40, 12, 0, Math.PI * 2);
      ctx.fill();

      // 大戟
      ctx.save();
      const chop = attackTimer > 0 ? -1.2 : -0.2;
      ctx.translate(-8, -24);
      ctx.rotate(chop);
      ctx.fillStyle = "#78350f";
      ctx.fillRect(-2, -22, 4, 42);
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(-8, -26, 16, 6);
      ctx.restore();

    } else if (bossType === 'caocao') {
      // 👑 曹操 (魏王黑红衮服、紫金通天冠、倚天剑)
      ctx.fillStyle = "#450a0a";
      safeRoundRect(ctx, -14, -34, 28, 24, 7);
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -40, 12, 0, Math.PI * 2);
      ctx.fill();

      // 魏王通天冠
      ctx.fillStyle = "#facc15";
      ctx.fillRect(-8, -52, 16, 10);

      // 倚天宝剑
      ctx.save();
      const chop = attackTimer > 0 ? -0.8 : 0.1;
      ctx.translate(-8, -24);
      ctx.rotate(chop);
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(-2, -18, 4, 26);
      ctx.restore();

    } else if (bossType === 'luxun') {
      // 🔥 陆逊 (东吴儒将白袍、都督火攻令旗)
      ctx.fillStyle = "#dc2626";
      safeRoundRect(ctx, -12, -32, 24, 22, 6);
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -38, 11, 0, Math.PI * 2);
      ctx.fill();

      // 令旗
      ctx.save();
      ctx.translate(-8, -24);
      ctx.fillStyle = "#b45309";
      ctx.fillRect(-2, -20, 3, 28);
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.moveTo(0, -20); ctx.lineTo(-14, -14); ctx.lineTo(0, -8);
      ctx.fill();
      ctx.restore();

    } else if (bossType === 'menghuo') {
      // 🐘 孟获 (南蛮兽首皮甲、狂暴狼牙棒)
      ctx.fillStyle = "#78350f";
      safeRoundRect(ctx, -16, -36, 32, 26, 8);
      ctx.fill();

      ctx.fillStyle = "#d97706";
      ctx.beginPath();
      ctx.arc(0, -42, 13, 0, Math.PI * 2);
      ctx.fill();

      // 狼牙棒
      ctx.save();
      const chop = attackTimer > 0 ? -1.3 : -0.2;
      ctx.translate(-10, -26);
      ctx.rotate(chop);
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(-4, -20, 8, 30);
      ctx.restore();

    } else if (bossType === 'simayi') {
      // 🐺 司马懿 (曹魏太尉黑金八卦袍、黑金羽扇)
      ctx.fillStyle = "#0f172a";
      safeRoundRect(ctx, -13, -34, 26, 24, 6);
      ctx.fill();
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -40, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#581c87";
      ctx.fillRect(-8, -50, 16, 8);

      // 黑羽纶巾扇
      ctx.save();
      ctx.translate(-8, -24);
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(0, -8, 8, 0, Math.PI);
      ctx.fill();
      ctx.restore();

    } else {
      // 通用敌方大将
      ctx.fillStyle = "#991b1b";
      safeRoundRect(ctx, -13, -32, 26, 22, 6);
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(0, -38, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(-8, -22);
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(-2, -14, 4, 24);
      ctx.restore();
    }

    ctx.restore();
  }
}
