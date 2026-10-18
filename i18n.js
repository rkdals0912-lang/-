/* KSA 다국어(i18n) 레이어 — 한국어/English/中文/සිංහල/Русский
   - 한국어 원문을 키로 사용, 번역이 없는 문구는 한국어 그대로 표시됩니다.
   - 문구 추가: KSA_I18N.add({'한국어 원문':['English','中文','සිංහල','Русский']})
   - 라벨 미리보기/편집 캔버스(.canvasBox)는 실제 인쇄물이므로 번역하지 않습니다. */
(function(){
var LANGS=[['ko','한국어'],['en','English'],['zh','中文'],['si','සිංහල'],['ru','Русский']];
var IDX={en:0,zh:1,si:2,ru:3}, K=/[가-힣]/, KEY='ksa-lang';
var D={
'작업자':['Worker','作业员','සේවකයා','Оператор'],
'이름 입력':['Enter name','输入姓名','නම ඇතුළත් කරන්න','Введите имя'],
'⌂ 홈':['⌂ Home','⌂ 首页','⌂ මුල් පිටුව','⌂ Главная'],
'작업자 모드':['Worker mode','作业员模式','සේවක මාදිලිය','Режим оператора'],
'관리자 모드 전환 (PIN)':['Switch to admin mode (PIN)','切换管理员模式 (PIN)','පරිපාලක මාදිලියට මාරු වන්න (PIN)','Режим администратора (PIN)'],
'DB 확인중':['Checking DB','正在检查数据库','DB පරීක්ෂා කරමින්','Проверка БД'],
'관리자 PIN':['Admin PIN','管理员PIN','පරිපාලක PIN','PIN администратора'],
'확인':['OK','确认','තහවුරු කරන්න','ОК'],
'취소':['Cancel','取消','අවලංගු කරන්න','Отмена'],
'저장':['Save','保存','සුරකින්න','Сохранить'],
'오늘':['Today','今天','අද','Сегодня'],
'↻ 새로고침':['↻ Refresh','↻ 刷新','↻ නැවුම් කරන්න','↻ Обновить'],
'메뉴':['Menu','菜单','මෙනුව','Меню'],
'원하는 업무를 선택하세요. 관리자 기능은 관리자 모드에서 활성화됩니다.':['Choose a task. Admin functions are enabled in admin mode.','请选择业务。管理员功能须在管理员模式下启用。','කාර්යයක් තෝරන්න. පරිපාලක කාර්යයන් පරිපාලක මාදිලියේදී ක්‍රියාත්මක වේ.','Выберите задачу. Функции администратора доступны в режиме администратора.'],
'일괄 출력':['Batch print','批量打印','තොග මුද්‍රණය','Пакетная печать'],
'작업지시 기반 출력':['Print from work orders','基于作业指令打印','වැඩ නියෝග මත මුද්‍රණය','Печать по заданиям'],
'실시간 출력':['Live print','实时打印','සජීවී මුද්‍රණය','Печать на месте'],
'현장 즉시 발행':['On-site instant issue','现场即时打印','ස්ථානයේම වහාම නිකුත් කිරීම','Мгновенная печать'],
'라벨 편집':['Label editor','标签编辑','ලේබල් සංස්කරණය','Редактор этикеток'],
'제품 관리':['Products','产品管理','නිෂ්පාදන කළමනාකරණය','Продукты'],
'LOT 규칙':['LOT rules','LOT规则','LOT නීති','Правила LOT'],
'프레스일지':['Press log','压机日志','ප්‍රෙස් දිනපොත','Журнал пресса'],
'출력 이력':['Print history','打印记录','මුද්‍රණ ඉතිහාසය','История печати'],
'프린터':['Printer','打印机','මුද්‍රණ යන්ත්‍රය','Принтер'],
'권한 마스터':['Permissions','权限管理','අවසර කළමනාකරණය','Права доступа'],
'1. 일괄 출력 모드':['1. Batch print mode','1. 批量打印模式','1. තොග මුද්‍රණ මාදිලිය','1. Пакетная печать'],
'2. 실시간 출력 모드':['2. Live print mode','2. 实时打印模式','2. සජීවී මුද්‍රණ මාදිලිය','2. Печать на месте'],
'🏷 라벨 마스터':['🏷 Label master','🏷 标签母版','🏷 ලේබල් ප්‍රධාන','🏷 Мастер этикеток'],
'▦ 제품관리(마스터)':['▦ Product master','▦ 产品主数据','▦ නිෂ්පාදන ප්‍රධාන','▦ Мастер продуктов'],
'🖨 계획 없이 출력':['🖨 Print without plan','🖨 无计划打印','🖨 සැලසුමකින් තොරව මුද්‍රණය','🖨 Печать без плана'],
'▤ 프레스일지':['▤ Press log','▤ 压机日志','▤ ප්‍රෙස් දිනපොත','▤ Журнал пресса'],
'🔐 권한 마스터':['🔐 Permissions','🔐 权限管理','🔐 අවසර කළමනාකරණය','🔐 Права доступа'],
'주간':['Day shift','白班','දිවා','Дневная'],
'야간':['Night shift','夜班','රාත්‍රී','Ночная'],
'제품 선택':['Select product','选择产品','නිෂ්පාදනය තෝරන්න','Выбор продукта'],
'품목코드 검색':['Search item code','搜索品目代码','අයිතම කේතය සොයන්න','Поиск по коду'],
'총 드럼 수':['Total drums','总桶数','මුළු ඩ්‍රම් ගණන','Всего бочек'],
'작업지시 목록':['Work order list','作业指令列表','වැඩ නියෝග ලැයිස්තුව','Список заданий'],
'작업지시 관리 (관리자)':['Work orders (Admin)','作业指令管理(管理员)','වැඩ නියෝග (පරිපාලක)','Задания (админ)'],
'현재 선택된 작업':['Selected job','当前所选作业','තෝරාගත් කාර්යය','Выбранное задание'],
'프린터 검색':['Find printers','搜索打印机','මුද්‍රණ යන්ත්‍ර සොයන්න','Найти принтеры'],
'라벨 미리보기':['Label preview','标签预览','ලේබල් පෙරදසුන','Предпросмотр этикетки'],
'🖨 바로 인쇄 (선택한 드럼만)':['🖨 Print now (selected drums)','🖨 立即打印(仅所选桶)','🖨 වහාම මුද්‍රණය (තෝරාගත් ඩ්‍රම්)','🖨 Печать (выбранные бочки)'],
'🖨 전체 드럼 인쇄':['🖨 Print all drums','🖨 打印全部桶','🖨 සියලු ඩ්‍රම් මුද්‍රණය','🖨 Печать всех бочек']
};
var cur='ko', M=new WeakMap();
try{ cur=localStorage.getItem(KEY)||'ko'; }catch(e){}
if(!IDX.hasOwnProperty(cur)) cur='ko';

function tr(s){
  if(cur==='ko'||typeof s!=='string') return s;
  var k=s.trim(), e=D[k];
  return (e&&e[IDX[cur]])?s.replace(k,e[IDX[cur]]):s;
}
function skip(el){ return !el||(el.closest&&el.closest('script,style,textarea,.canvasBox,#editorCanvasWrap,#langSel')); }
function text(n,force){
  if(skip(n.parentNode)) return;
  var r=M.get(n), v=n.nodeValue;
  if(!(r&&v===r.t)){ if(!K.test(v)){ if(r)M.delete(n); return; } r={o:v}; }
  else if(!force) return;
  r.t=tr(r.o); M.set(n,r); if(r.t!==v) n.nodeValue=r.t;
}
function attrs(el,force){
  if(skip(el)) return;
  var m=el.__i18n||(el.__i18n={});
  ['placeholder','title','aria-label'].forEach(function(a){
    var v=el.getAttribute(a); if(v==null) return; var r=m[a];
    if(!(r&&v===r.t)){ if(!K.test(v)){ delete m[a]; return; } r=m[a]={o:v}; }
    else if(!force) return;
    r.t=tr(r.o); if(r.t!==v) el.setAttribute(a,r.t);
  });
}
function walk(root,force){
  if(root.nodeType===3){ text(root,force); return; }
  if(root.nodeType!==1) return;
  attrs(root,force);
  var w=document.createTreeWalker(root,5,null), n;
  while((n=w.nextNode())){ n.nodeType===3?text(n,force):attrs(n,force); }
}
function setLang(l){
  if(!IDX.hasOwnProperty(l)&&l!=='ko') return;
  cur=l; try{ localStorage.setItem(KEY,l); }catch(e){}
  document.documentElement.lang=l;
  var s=document.getElementById('langSel'); if(s) s.value=l;
  walk(document.body,true);
}
function mount(){
  var host=document.querySelector('header .meta');
  if(host&&!document.getElementById('langSel')){
    var s=document.createElement('select'); s.id='langSel'; s.setAttribute('aria-label','Language');
    s.style.cssText='background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.25);color:#fff;padding:5px 8px;border-radius:6px;font-size:12.5px;width:auto;cursor:pointer;';
    LANGS.forEach(function(x){ var o=document.createElement('option'); o.value=x[0]; o.textContent=x[1]; o.style.color='#1b232f'; s.appendChild(o); });
    s.value=cur; s.onchange=function(){ setLang(s.value); };
    host.insertBefore(s,host.firstChild);
  }
  document.documentElement.lang=cur;
  walk(document.body,true);
  new MutationObserver(function(ms){
    ms.forEach(function(m){
      if(m.type==='childList') m.addedNodes.forEach(function(n){ walk(n); });
      else if(m.type==='characterData') text(m.target);
      else attrs(m.target);
    });
  }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});
}
['alert','confirm','prompt'].forEach(function(f){
  var o=window[f]; window[f]=function(a,b){ return o.call(window,tr(a),b); };
});
window.KSA_I18N={t:tr,set:setLang,get:function(){return cur;},add:function(d){ for(var k in d) D[k]=d[k]; walk(document.body,true); }};
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
