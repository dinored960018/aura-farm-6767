var Gu=Object.defineProperty;var Zp=(n,t,e)=>t in n?Gu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var En=(n,t,e)=>()=>{if(e)throw e[0];try{return n&&(t=n(n=0)),t}catch(i){throw e=[i],i}};var Cc=(n,t)=>{for(var e in t)Gu(n,e,{get:t[e],enumerable:!0})};var Qa=(n,t,e)=>Zp(n,typeof t!="symbol"?t+"":t,e);var Fi,Xi,He,m_,Tn,An,on,Vu,Rn,qi,jn,Pc,Js,Gr,ln,js,Vr,Qn,Yi,Wr,Ic,Lc,Qs,Oi,Wu,Ki=En(()=>{Fi={radius:.45,height:1.8,eye:1.55},Xi={speed:9.5,jump:10.5,doubleJump:9.5,gravity:25,dashSpeed:27,dashTime:.17,dashCooldown:2.2,ultraSpeedMul:1.4},He={fart:{id:"fart",slot:1,name:"\uBC29\uADC0 \uAE30\uAD00\uCD1D",emoji:"\u{1F4A8}",body:6.7,head:13.4,interval:.1,mag:67,reload:1.67,spread:.016,pellets:1,range:90,auto:!0},six7:{id:"six7",slot:2,name:"67 \uB9AC\uBCFC\uBC84",emoji:"\u{1F90C}",body:33.5,head:67,interval:.46,mag:6,reload:1.3,spread:.002,pellets:1,range:150,auto:!1},boom:{id:"boom",slot:3,name:"\uBC14\uC778\uBD90 \uC0F7\uAC74",emoji:"\u{1F4E2}",body:8,head:13,interval:.85,mag:6,reload:1.5,spread:.07,pellets:9,range:32,auto:!1}},m_=Object.keys(He),Tn={id:"laser",slot:0,name:"\uB208\uAE54 \uB808\uC774\uC800",emoji:"\u{1F441}\uFE0F",body:6.7,head:13.4,interval:.1,mag:1,reload:0,spread:0,pellets:1,range:120,auto:!0,pierce:!0},An={damage:67,range:3.4,cooldown:.8,knock:19},on={hitBody:67,hitHead:676,kill:1e3,death:-1e3,fell:-2e3,farmPerSec:420,farmInterrupted:-676,sixSeven:67,orb:1676},Vu=34,Rn={radius:5,damage:45,knock:16,fuseMs:2e3},qi={radius:20,damage:220,knock:30,fuseMs:2600,aimRange:70},jn={radius:13,ms:6700,tickMs:670,damage:6.7},Pc={killExtendMs:2e3,killHeal:34},Js={flySpeed:38,latchRange:1.3,tickMs:150,damage:6.7,auraSteal:67},Gr={range:16,cone:.6,tickMs:800,damage:24,knock:22,finalKnock:44,finalDamage:40,count:6},ln={flySpeed:60,hits:3,range:1.5,damage:[45,60,90],knock:28,splashRadius:6,splashDamage:18},js={radius:18,slowMul:.4,regenPerSec:13,reflect:.5},Vr={radius:8,radiusStep:1,finalRadius:17,tickMs:670,damage:17,finalDamage:40,knock:12,finalKnock:26,count:7},Qn={radius:26,kissRange:2.6,tickMs:250,damage:6.7,auraDrain:100,heal:3},Yi={radius:17,coreRadius:3.5,pull:9,tickMs:200,damage:10,geyserRadius:14,geyserDamage:30,geyserUp:24},Wr={minsu:{name:"\uB208\uAE54 \uB808\uC774\uC800",ms:6700,desc:"6.7\uCD08\uAC04 \uBCBD\uAE4C\uC9C0 \uB6AB\uB294 \uB808\uC774\uC800. \uBCBD \uB4A4 \uC0C1\uB300\uB3C4 \uBCF4\uC784"},sigma:{name:"\uC2DC\uADF8\uB9C8 \uAC01\uC131",ms:6700,desc:"\uC774\uB3D9 1.4\uBC30, \uB370\uBBF8\uC9C0 1.67\uBC30, \uC548 \uBC00\uB9BC. \uD0AC\uB9C8\uB2E4 \uC2DC\uAC04 \uC5F0\uC7A5\uACFC \uD68C\uBCF5"},cat:{name:"\uB0E5\uB0E5 \uAE09\uC2B5",ms:6700,desc:"\uC5BC\uAD74\uC5D0 \uBD99\uC5B4 \uC544\uC6B0\uB77C\uB97C \uD6D4\uCE58\uACE0 \uC870\uC791\uC744 \uB4A4\uC9D1\uC74C. F\uB85C \uB5BC\uC5B4\uB0C4"},cone:{name:"\uD575 \uBAA8\uB4DC",ms:2600,desc:"\uC870\uC900\uD55C \uACF3\uC5D0 \uD575. \uD130\uC9C4 \uB4A4 \uBC29\uC0AC\uB2A5 \uC9C0\uB300\uAC00 \uB0A8\uC74C"},toilet:{name:"\uB300\uBB3C\uB0B4\uB9BC",ms:5e3,desc:"5\uCD08\uAC04 \uBE68\uC544\uB4E4\uC774\uACE0, \uB05D\uB0A0 \uB54C \uBB3C\uAE30\uB465\uC73C\uB85C \uB2E4 \uB744\uC6C0"},streamer:{name:"\uC9D6\uAE30 \uBC29\uC1A1",ms:4800,desc:"\uBE68\uB9AC \uB2EC\uB9AC\uBA70 6\uBC88 \uC9D6\uAE30. \uB9C8\uC9C0\uB9C9\uC740 \uC0AC\uBC29\uC73C\uB85C \uD130\uC9C0\uB294 \uC0E4\uC6B0\uD305"},tung:{name:"\uC0AC\uD6C4\uB974 \uD0C0\uC784",ms:4700,desc:"\uC810\uC810 \uCEE4\uC9C0\uB294 \uCDA9\uACA9\uD30C 7\uBC88. 7\uBC88\uC9F8 \uC0AC\uD6C4\uB974\uAC00 \uC81C\uC77C \uD07C"},hero:{name:"\uBA54\uAC00 \uD380\uCE58",ms:5e3,desc:"\uBB34\uC801 \uC0C1\uD0DC\uB85C \uC14B\uC744 \uAD00\uD1B5. \uB54C\uB9B4\uC218\uB85D \uC138\uC9C0\uACE0 \uC8FC\uBCC0\uAE4C\uC9C0 \uD130\uC9D0"},rizz:{name:"\uB9AC\uC988 \uB9E4\uD639",ms:3500,desc:"\uC0C1\uB300\uAC00 \uAC78\uC5B4\uC624\uACE0 \uACF5\uACA9 \uBABB \uD568. \uAC00\uAE4C\uC774 \uC624\uBA74 \uC544\uC6B0\uB77C\uC640 \uCCB4\uB825\uC744 \uBE8F\uC74C"},chill:{name:"\uC644\uC804 \uCE60\uD568",ms:5e3,desc:"5\uCD08\uAC04 \uBB34\uC801\uC5D0 \uCCB4\uB825 \uD68C\uBCF5. \uC3DC \uCD1D\uC54C\uC740 \uB418\uB3CC\uC544\uAC10. \uC8FC\uBCC0\uC740 \uB290\uB824\uC9D0"}},Ic={dogfight:{name:"\u{1F436}\u2708\uFE0F \uBD04\uBC14\uB974\uB514\uB85C \uB3C4\uAE30\uB85C \uACF5\uC2B5!!",ms:7e3,say:"Bombardiro Doggilo"},sixseven:{name:"6\uFE0F\u20E37\uFE0F\u20E3 67 \uD0C0\uC784: \uBAA8\uB4E0 \uB370\uBBF8\uC9C0 67",ms:6700,say:"six seven, six seven"},bighead:{name:"\u{1F5FF} \uB300\uB450 \uC2DC\uB300: \uBA38\uB9AC \uD310\uC815 \uB300\uD3ED\uBC1C",ms:13e3,say:"\uB300\uB450 \uC2DC\uB300"},moon:{name:"\u{1F319} \uC624\uD558\uC774\uC624 \uC800\uC911\uB825",ms:13e3,say:"only in ohio"}},Lc=Object.keys(Ic),Qs={minsu:{name:"\uBBFC\uC218",skin:16765503,shirt:3108342},sigma:{name:"\uC2DC\uADF8\uB9C8",skin:12171716,shirt:1842210},cat:{name:"\uD0B9\uBC1B\uB294 \uACE0\uC591\uC774",skin:16751164,shirt:16119285},cone:{name:"\uC624\uD558\uC774\uC624 \uC8FC\uBBFC",skin:8379482,shirt:9060348},toilet:{name:"\uBCC0\uAE30\uB9E8",skin:16762536,shirt:16777215},streamer:{name:"\uC9D6\uB294 \uC2A4\uD2B8\uB9AC\uBA38",skin:7226406,shirt:14163500},tung:{name:"\uD241\uD241\uD241 \uC0AC\uD6C4\uB974",skin:11039807,shirt:9396016},hero:{name:"\uBA54\uAC00\uBE0C\uB85C",skin:15910560,shirt:15217708},rizz:{name:"\uB9AC\uC988\uC655",skin:15910560,shirt:16727450},chill:{name:"\uCE60\uAC00\uC774",skin:12160354,shirt:9146521}},Oi=Object.keys(Qs),Wu={countdownMs:3e3,respawnMs:2600,invulnMs:1200,resultsMs:6700,pickupRespawnMs:2e4,eventFirstMs:25e3,eventGapMs:32e3}});function Xr(n,t,e){for(let i=0;i<e;i++)[n,t]=[-t,n];return[n,t]}function $p(n,t){let[e,i]=Xr(n.min[0],n.min[2],t),[s,r]=Xr(n.max[0],n.max[2],t);return{...n,min:[Math.min(e,s),n.min[1],Math.min(i,r)],max:[Math.max(e,s),n.max[1],Math.max(i,r)]}}function eo(n,t){return t.flatMap(e=>n.map(i=>{let[s,r]=Xr(i.pos[0],i.pos[2],e),[a,o]=Xr(i.push[0],i.push[2],e);return{...i,pos:[s,i.pos[1],r],push:[a,0,o]}}))}function Pn(n,t){return t.flatMap(e=>n.map(([i,s,r])=>{let[a,o]=Xr(i,r,e);return[a,s,o]}))}function io(n,t,e,i,s,r,a=.5){let o=[];for(let l=0;l<i;l++){let c=t+e*l;o.push(St(n-s/2,0,c-.5,n+s/2,a*(l+1),c+.5,r))}return o}function In(n,t,e,i=100){let s=-1/0;for(let r of n.boxes)t>r.min[0]&&t<r.max[0]&&e>r.min[2]&&e<r.max[2]&&r.max[1]<=i&&r.max[1]>s&&(s=r.max[1]);return s}function Yu(n,t,e,i,s=1/0){let r=0,a=s;for(let o=0;o<3;o++)if(Math.abs(t[o])<1e-8){if(n[o]<e[o]||n[o]>i[o])return 1/0}else{let l=1/t[o],c=(e[o]-n[o])*l,h=(i[o]-n[o])*l;if(c>h&&([c,h]=[h,c]),c>r&&(r=c),h<a&&(a=h),r>a)return 1/0}return r}function sm(n,t,e,i){let s=n[0]-e[0],r=n[1]-e[1],a=n[2]-e[2],o=s*t[0]+r*t[1]+a*t[2],l=s*s+r*r+a*a-i*i,c=o*o-l;if(c<0)return 1/0;let h=-o-Math.sqrt(c);return h>=0?h:l<0?0:1/0}function Bi(n,t,e,i=200){let s=i;for(let r of n.boxes){let a=Yu(t,e,r.min,r.max,s);a<s&&(s=a)}return s}function no(n,t,e,i=!1,s=200){let r=i?Cn.bigHeadY:Cn.headY,a=i?Cn.bigHeadR:Cn.headR,o=sm(n,t,[e[0],e[1]+r,e[2]],a),l=Yu(n,t,[e[0]-Cn.bodyHalf,e[1],e[2]-Cn.bodyHalf],[e[0]+Cn.bodyHalf,e[1]+Cn.bodyTop,e[2]+Cn.bodyHalf],s);return o===1/0&&l===1/0?null:o<=l?o<=s?{t:o,head:!0}:null:l<=s?{t:l,head:!1}:null}function rm(n,t){return(n[0]-t[0])**2+(n[1]-t[1])**2+(n[2]-t[2])**2}function Ku(n,t=[]){if(!t.length)return n.spawns[Math.floor(Math.random()*n.spawns.length)];let e=s=>Math.min(...t.map(r=>rm(s.pos,r)));return[...n.spawns].sort((s,r)=>e(r)-e(s))[Math.floor(Math.random()*2)]}var St,ts,ai,to,tr,Jp,jp,Qp,Xu,tm,em,im,qu,nm,Zi,qr,er,Cn,Ts=En(()=>{St=(n,t,e,i,s,r,a,o={})=>({min:[n,t,e],max:[i,s,r],kind:a,...o});ts=(n,t)=>t.flatMap(e=>n.map(i=>$p(i,e))),ai=[0,1,2,3],to=[0,2];tr=n=>n.map(t=>({pos:t,yaw:Math.atan2(t[0],t[2])}));Jp={id:"ohio",name:"\uC624\uD558\uC774\uC624 \uAD6C\uB369\uC774",emoji:"\u{1F573}\uFE0F",desc:"\uAC00\uC6B4\uB370 \uAD6C\uBA4D + \uACF5\uC911 \uBA85\uB2F9",bounds:29,fallY:-25,showcase:{pos:[0,0,0],r:7.4},boxes:[St(-28,-2,-28,28,0,-7,"floor",{floor:!0}),St(-28,-2,7,28,0,28,"floor",{floor:!0}),St(-28,-2,-7,-7,0,7,"floor",{floor:!0}),St(7,-2,-7,28,0,7,"floor",{floor:!0}),St(-7,-1,-1.75,7,0,1.75,"bridge"),St(-1.75,-1,-7,1.75,0,-1.75,"bridge"),St(-1.75,-1,1.75,1.75,0,7,"bridge"),St(-29,-2,-29,29,12,-28,"wall",{wall:!0}),St(-29,-2,28,29,12,29,"wall",{wall:!0}),St(-29,-2,-28,-28,12,28,"wall",{wall:!0}),St(28,-2,-28,29,12,28,"wall",{wall:!0}),St(-4,6,-4,4,6.6,4,"plat"),...ts([St(-27,0,-27,-17,4,-17,"plat"),...io(-22,-9.5,-1,8,4,"step"),St(-14,0,-14,-11,2.4,-11,"crate"),St(-10,0,-21,-7,1.6,-18,"crate"),St(-13,0,-3.5,-11,3,3.5,"wall"),St(-3,0,-24,3,3,-22.5,"wall"),St(9,0,-16,12.5,2.2,-12.5,"crate"),St(16,0,-24,22,1.2,-18,"step"),St(17.5,1.2,-22.5,20.5,2.6,-19.5,"crate"),St(-25,0,4,-21,2,8,"crate")],to)],decor:[],pads:[{pos:[0,0,-6],radius:1,power:21,push:[0,0,2.6]},{pos:[0,0,6],radius:1,power:21,push:[0,0,-2.6]},{pos:[-6,0,0],radius:1,power:21,push:[2.6,0,0]},{pos:[6,0,0],radius:1,power:21,push:[-2.6,0,0]},{pos:[24,0,-1],radius:1.4,power:17,push:[-5,0,0]},{pos:[-24,0,1],radius:1.4,power:17,push:[5,0,0]}],spawns:tr([[-22,4,-22],[22,4,22],[-24,0,22],[24,0,-22],[-17,0,-3],[17,0,3]]),pickups:[{kind:"chicken",pos:[-20,4.4,-20]},{kind:"chicken",pos:[20,4.4,20]},{kind:"chicken",pos:[-8.5,.4,13]},{kind:"chicken",pos:[8.5,.4,-13]},{kind:"orb",pos:[0,7.2,0]}],theme:{sky:[[0,"#12062e"],[.45,"#7a1fa2"],[.56,"#ff4fa3"],[.62,"#ffb347"],[1,"#25083f"]],fog:[4856685,45,150],hemi:[16769264,3219563,2.1],sun:1.5,tex:{floor:{base:"#3b2e6e",line:"#46367f",checker:!0,label:"67"},wall:{base:"#ff5c95",line:"#c7215f"},crate:{base:"#ffc233",line:"#b57a00"},plat:{base:"#2ad3d7",line:"#07898c"},step:{base:"#8d63ff",line:"#5a2fd1"},bridge:{base:"#46e063",line:"#1d8c34"}},signs:[[["6767"],"#000","#ffee00",[0,8,-27.97],0,20],[["ONLY IN","OHIO"],"#14002e","#ff5f1f",[0,8,27.97],Math.PI,20],[["SKILL","ISSUE"],"#fff","#e00",[-27.97,8,-12],Math.PI/2,16],[["SIGMA","\u{1F5FF} GRINDSET"],"#111","#fff",[-27.97,8,12],Math.PI/2,16],[["\uC5B4\uCA54\uD2F0\uBE44","\uC800\uCA54\uD2F0\uBE44"],"#00154a","#00e5ff",[27.97,8,-12],-Math.PI/2,16],[["AURA","+6767"],"#2a1a00","#ffd700",[27.97,8,12],-Math.PI/2,16]],pit:{pos:[0,-16,0],size:14,lines:["OHIO","\u2193\u2193\u2193"],bg:"#3a0000",fg:"#ff3b00"},big67:[0,15.5,0]}},jp=[[-60,40,14],[55,52,12],[-48,-58,16],[60,-44,14],[0,70,18],[-74,-6,12],[72,10,15],[8,-74,16]],Qp={id:"roof",name:"\uC2DC\uADF8\uB9C8 \uC625\uC0C1",emoji:"\u{1F306}",desc:"\uBCBD \uC5C6\uC74C. \uBC00\uB9AC\uBA74 \uCD94\uB77D",bounds:40,fallY:-25,showcase:{pos:[0,0,0],r:7.4},boxes:[St(-12,-3,-12,12,0,12,"floor",{floor:!0}),...ts([St(20,-3,-9,36,0,9,"floor",{floor:!0}),St(12,-1,-2,20,0,2,"bridge"),St(6,0,6,9,2,9,"crate"),St(8,0,-2,9,1.5,2,"wall"),St(29,0,-3,35,2.5,5,"plat"),...io(32,-7.5,1,5,4,"step"),St(22,0,3,25,1.5,6,"crate"),St(22,0,-8,24,2.4,-6,"crate"),St(35,0,5,36,1,9,"wall")],ai)],decor:[St(-12,-90,-12,12,-3,12,"city"),...ts([St(20,-90,-9,36,-3,9,"city")],ai),...jp.map(([n,t,e])=>St(n-e/2,-90,t-e/2,n+e/2,-12-Math.abs(n+t)%16,t+e/2,"city"))],pads:eo([{pos:[26,0,7.5],radius:1,power:17,push:[-13.2,0,13.2]}],ai),spawns:tr(Pn([[31,2.5,1],[24,0,0],[-5,0,-9]],ai)),pickups:[...Pn([[0,.4,9.5]],ai).map(n=>({kind:"chicken",pos:n})),{kind:"orb",pos:[32,3.3,1]},{kind:"orb",pos:[-32,3.3,-1]}],theme:{sky:[[0,"#1b2a6b"],[.42,"#c84b7a"],[.5,"#ff9248"],[.56,"#ffd76a"],[.62,"#5c2d55"],[1,"#14102a"]],fog:[12872298,60,220],hemi:[16773336,5913173,2.2],sun:1.7,tex:{floor:{base:"#6a6a78",line:"#5c5c69",checker:!0,label:"\u{1F5FF}"},wall:{base:"#d94f3d",line:"#8f2d20"},crate:{base:"#8fd14f",line:"#4f8a1c"},plat:{base:"#f2b134",line:"#a8740f"},step:{base:"#4aa8ff",line:"#1a64b8"},bridge:{base:"#ffe066",line:"#000000"},city:{base:"#2c2f4a",line:"#ffd76a",windows:!0}},signs:[[["SIGMA","ROOFTOP"],"#000","#ffd700",[0,11,-38],0,22],[["\uB5A8\uC5B4\uC9C0\uBA74","-2000 AURA"],"#fff","#e00",[0,11,38],Math.PI,22],[["MOGGED"],"#14002e","#ff5fa2",[-38,11,0],Math.PI/2,22],[["GRINDSET","NEVER STOP"],"#0a2a12","#7dff8e",[38,11,0],-Math.PI/2,22]],pit:null,big67:[0,19,0]}},Xu=[];for(let[n,t]of[[-20,-18],[-20,-11],[-14,-18],[-9,-16],[-15,-11],[-21,-3],[-14,-4],[-9,-11]])Xu.push(St(n,4.96,t,n+3,5,t+1,"lamp"));tm={id:"office",name:"\uBC31\uB8F8 \uC0AC\uBB34\uC2E4",emoji:"\u{1F3E2}",desc:"\uC881\uC740 \uBCF5\uB3C4 + \uC625\uC0C1 2\uCE35",bounds:25,fallY:-25,showcase:{pos:[0,0,0],r:5.6},boxes:[St(-24,-1,-24,24,0,24,"floor",{floor:!0}),...ts([St(-25,-1,-25,25,9,-24,"wall",{wall:!0}),St(-24,5,-24,24,5.6,-6,"plat"),St(-18,0,-24,-17,5,-14,"wall"),St(-24,0,-8,-12,5,-7,"wall"),St(-12,0,-20,-11,5,-12,"wall"),St(-8,0,-8,-7,5,-3,"wall"),St(-23,0,-23,-20,1.1,-21,"crate"),St(-16,0,-5,-13,1.1,-3.5,"crate"),St(-7,0,-22,-3,1.1,-20.5,"crate")],ai)],decor:ts(Xu,ai),pads:[{pos:[0,0,-4],radius:1,power:21,push:[0,0,-3.5]},{pos:[0,0,4],radius:1,power:21,push:[0,0,3.5]},{pos:[-4,0,0],radius:1,power:21,push:[-3.5,0,0]},{pos:[4,0,0],radius:1,power:21,push:[3.5,0,0]}],spawns:tr(Pn([[-21,0,-12],[-14,0,-18]],ai)),pickups:[...Pn([[-14.5,.5,-9.5]],ai).map(n=>({kind:"chicken",pos:n})),{kind:"orb",pos:[15,6.4,15]},{kind:"orb",pos:[-15,6.4,-15]}],theme:{sky:[[0,"#05060f"],[.5,"#161a33"],[1,"#05060f"]],fog:[12167516,16,62],hemi:[16774852,9075258,2.6],sun:.5,tex:{floor:{base:"#b5a35a",line:"#a9974f",checker:!0,label:"67"},wall:{base:"#d9c872",line:"#b5a24c"},crate:{base:"#7a5230",line:"#4f3219"},plat:{base:"#cfc9a0",line:"#a09a70"},step:{base:"#8d63ff",line:"#5a2fd1"},bridge:{base:"#46e063",line:"#1d8c34"}},signs:[[["\uD1F4\uADFC","\uAE08\uC9C0"],"#fff","#000",[-6,2.8,-23.97],0,8],[["EXIT","\uC5C6\uC74C"],"#0a5c2a","#fff",[6,2.8,23.97],Math.PI,8],[["\uCD9C\uADFC","6:07"],"#fff","#c00",[-23.97,2.8,4],Math.PI/2,7],[["\uC2A4\uD0AC","\uC774\uC288"],"#fff","#00f",[23.97,2.8,-4],-Math.PI/2,7]],pit:null,big67:[0,11,0]}},em={id:"boat",name:"\uC544\uC6B0\uB77C \uBCF4\uD2B8",emoji:"\u{1F6A3}",desc:"\uBC30 \uC138 \uCC99. \uBB3C\uC5D0 \uBE60\uC9C0\uBA74 \uB05D",bounds:31,fallY:-8,showcase:{pos:[0,0,4],r:6.4},boxes:[St(-4,-2,-30,4,0,30,"floor",{floor:!0}),...ts([St(14,-2,-26,22,0,26,"floor",{floor:!0}),St(4,-.5,-2,14,0,2,"bridge"),St(4,-.5,14,14,0,18,"bridge"),St(-2,0,-22,2,3,-14,"wall"),...io(0,-8.5,-1,6,4,"step"),St(16,0,6,20,1.6,9,"crate"),St(15,0,-20,18,2.2,-17,"crate"),St(20,0,-4,22,2.5,2,"wall")],to)],decor:[],pads:eo([{pos:[18,0,-23],radius:1,power:14,push:[-16,0,0]}],to),spawns:tr([[-18,0,-20],[18,0,20],[-18,0,8],[18,0,-8],[0,0,26],[0,0,-26]]),pickups:[...Pn([[18,.5,13],[0,3.5,-18]],to).map((n,t)=>({kind:t%2?"orb":"chicken",pos:n}))],theme:{sky:[[0,"#2a8bd8"],[.48,"#a8e0ff"],[.54,"#fff3c4"],[.6,"#1d7fa8"],[1,"#0a3a5c"]],fog:[11065582,60,200],hemi:[16777215,4885148,2.4],sun:1.6,tex:{floor:{base:"#a8703c",line:"#8a5a2c",checker:!0,label:"67"},wall:{base:"#f4f4f0",line:"#c44a3a"},crate:{base:"#ffc233",line:"#b57a00"},plat:{base:"#2ad3d7",line:"#07898c"},step:{base:"#c98a50",line:"#8a5a2c"},bridge:{base:"#d9b078",line:"#8a5a2c"}},signs:[[["AURA","FARMING"],"#000","#ffd700",[0,11,-34],0,22],[["\uBC43\uBA38\uB9AC","\uBA85\uB2F9"],"#fff","#0a5c9c",[0,11,34],Math.PI,22],[["\uBB3C \uC870\uC2EC"],"#0a3a5c","#fff",[-30,9,0],Math.PI/2,18],[["\uC218\uC601","\uAE08\uC9C0"],"#c00","#fff",[30,9,0],-Math.PI/2,18]],pit:{pos:[0,-5,0],size:260,lines:["\u{1F30A} \u{1F30A} \u{1F30A}"],bg:"#1a86b8",fg:"#7fd4f0"},big67:[0,18,0]}},im={id:"restroom",name:"\uAC70\uB300 \uD654\uC7A5\uC2E4",emoji:"\u{1F6BB}",desc:"\uCE78\uB9C9\uC774 \uC0AC\uC774 \uC228\uBC14\uAF2D\uC9C8 + \uB300\uC655 \uBCC0\uAE30",bounds:27,fallY:-25,showcase:{pos:[0,0,0],r:6},boxes:[St(-26,-1,-26,26,0,26,"floor",{floor:!0}),...ts([St(-27,-1,-27,27,10,-26,"wall",{wall:!0}),St(-20,0,-26,-19,4,-18,"step"),St(-14,0,-26,-13,4,-18,"step"),St(-8,0,-26,-7,4,-18,"step"),St(10,0,-4,16,2,4,"crate"),St(16,0,-5,19,6,5,"plat")],ai)],decor:[],pads:eo([{pos:[13,0,7],radius:1,power:15,push:[0,0,-3.5]}],ai),spawns:tr(Pn([[-11,0,-21],[6,0,-6]],ai)),pickups:[...Pn([[-17,.5,-22]],ai).map(n=>({kind:"chicken",pos:n})),{kind:"orb",pos:[13,2.8,0]},{kind:"orb",pos:[-13,2.8,0]}],theme:{sky:[[0,"#dfe9ee"],[1,"#aebfc8"]],fog:[14017256,40,120],hemi:[16777215,9414836,2.5],sun:.9,tex:{floor:{base:"#f4f6f7",line:"#d5dde2",checker:!0,label:"67"},wall:{base:"#bfe3ee",line:"#8fc0d0"},crate:{base:"#ffffff",line:"#c8d2d8"},plat:{base:"#f0f4f6",line:"#b8c4cc"},step:{base:"#3f7fbf",line:"#2a5a8c"},bridge:{base:"#46e063",line:"#1d8c34"}},signs:[[["\uC190 \uC53B\uC73C\uC138\uC694"],"#fff","#07f",[0,7,-25.97],0,16],[["SKIBIDI","\uAE08\uC9C0"],"#fff","#d00",[0,7,25.97],Math.PI,16],[["\uD734\uC9C0","\uC5C6\uC74C"],"#222","#fff",[-25.97,7,0],Math.PI/2,14],[["\uBB3C \uB0B4\uB824","\uC8FC\uC138\uC694"],"#ffe","#040",[25.97,7,0],-Math.PI/2,14]],pit:null,big67:[0,14,0]}},qu=[];for(let n=0;n<8;n++){let t=9-n;qu.push(St(-t,.5*n,-t,t,.5*(n+1),t,"step"))}nm={id:"arena",name:"67 \uCF5C\uB85C\uC138\uC6C0",emoji:"\u{1F3DF}\uFE0F",desc:"\uAE30\uB465 \uC232, \uD53C\uB77C\uBBF8\uB4DC, 2\uCE35 \uAD00\uC911\uC11D",bounds:31,fallY:-25,showcase:{pos:[0,0,20],r:6},boxes:[St(-30,-2,-30,30,0,30,"floor",{floor:!0}),...qu,...ts([St(-31,-2,-31,31,10,-30,"wall",{wall:!0}),St(-30,4,-30,30,4.6,-24,"plat"),...io(-20,-15.5,-1,9,4,"bridge",4.6/9),St(-23,0,-9,-20,8,-6,"wall"),St(-14,0,-14,-11,8,-11,"wall"),St(-7,0,-17,-3,1.4,-14,"crate")],ai)],decor:[],pads:eo([{pos:[-20,0,0],radius:1,power:20,push:[12.5,0,0]}],ai),spawns:tr(Pn([[-12,0,-21],[-26,0,-3]],ai)),pickups:[...Pn([[-27,5,0]],ai).map(n=>({kind:"chicken",pos:n})),{kind:"orb",pos:[0,4.8,0]}],theme:{sky:[[0,"#3f8fe0"],[.5,"#bfe4ff"],[.56,"#ffe9b0"],[1,"#c9a26a"]],fog:[15258792,55,170],hemi:[16774364,10254922,2.3],sun:1.7,tex:{floor:{base:"#d9bd85",line:"#cdb077",checker:!0,label:"67"},wall:{base:"#efe3c8",line:"#b8a57f"},crate:{base:"#a8703c",line:"#70471f"},plat:{base:"#c9b48a",line:"#8f7c58"},step:{base:"#e0a848",line:"#a8741f"},bridge:{base:"#d9cfae",line:"#9c9070"}},signs:[[["ARE YOU","NOT AURA?"],"#5c0a0a","#ffd700",[0,8,-29.97],0,20],[["6-7","GLADIATOR"],"#000","#fff",[0,8,29.97],Math.PI,20],[["SIGMA","IMPERATOR"],"#2a0a5c","#ffd700",[-29.97,8,0],Math.PI/2,18],[["\uAC80\uD22C\uC0AC","\uBAA8\uC9D1"],"#fff","#900",[29.97,8,0],-Math.PI/2,18]],pit:null,big67:[0,16,0]}},Zi={ohio:Jp,roof:Qp,office:tm,boat:em,restroom:im,arena:nm},qr=Object.keys(Zi),er="ohio";Cn={headY:1.6,headR:.55,bigHeadY:1.95,bigHeadR:1.15,bodyHalf:.55,bodyTop:1.25}});function Yn(n=0,t=0,e=0){return{x:n,y:t,z:e,vx:0,vy:0,vz:0,onGround:!1,jumps:0,dashT:0,dashCd:0,dashX:0,dashZ:0}}function hc(n,t,e,i){for(let s of n.boxes)if(t+vs>s.min[0]&&t-vs<s.max[0]&&e+iu>s.min[1]&&e<s.max[1]&&i+vs>s.min[2]&&i-vs<s.max[2])return s;return null}function eu(n,t,e,i){let s=e;for(let r of n.boxes)t+vs>r.min[0]&&t-vs<r.max[0]&&e+iu>r.min[1]&&e<r.max[1]&&i+vs>r.min[2]&&i-vs<r.max[2]&&r.max[1]>s&&(s=r.max[1]);return s-e+.001}function ip(n,t,e,i){let s=eu(n,t,e,i);return s<=Uv&&!hc(n,t,e+s,i)}function Fv(n,t,e,i){let{map:s}=i,r=[],a=Xi.gravity*(i.gravityMul??1),o=Xi.speed*(i.speedMul??1),l=Math.sin(t.yaw),c=Math.cos(t.yaw),h=-l*t.fwd+c*t.right,u=-c*t.fwd-l*t.right,d=Math.hypot(h,u);d>1&&(h/=d,u/=d);let f=d>.01;if(n.dashCd=Math.max(0,n.dashCd-e),t.dash&&n.dashCd<=0){let _=f?h:-l,T=f?u:-c,S=Math.hypot(_,T)||1;n.dashX=_/S,n.dashZ=T/S,n.dashT=Xi.dashTime,n.dashCd=Xi.dashCooldown,r.push("dash")}if(t.jump&&(n.onGround?(n.vy=Xi.jump,n.onGround=!1,n.jumps=1,r.push("jump")):n.jumps<2&&(n.vy=Xi.doubleJump,n.jumps=2,r.push("doubleJump"))),n.dashT>0)n.dashT-=e,n.vx=n.dashX*Xi.dashSpeed,n.vz=n.dashZ*Xi.dashSpeed,n.vy=Math.max(n.vy,0),n.dashT<=0&&(n.vx=n.dashX*o,n.vz=n.dashZ*o);else if(n.onGround){let _=Math.min(1,16*e);n.vx+=(h*o-n.vx)*_,n.vz+=(u*o-n.vz)*_}else if(f){let _=Math.min(1,5*e);n.vx+=(h*o-n.vx)*_,n.vz+=(u*o-n.vz)*_}n.dashT<=0&&(n.vy-=a*e);let p=n.x+n.vx*e;hc(s,p,n.y,n.z)&&(n.onGround&&ip(s,p,n.y,n.z)?n.y+=eu(s,p,n.y,n.z):(p=n.x,n.vx=0)),n.x=p;let v=n.z+n.vz*e;hc(s,n.x,n.y,v)&&(n.onGround&&ip(s,n.x,n.y,v)?n.y+=eu(s,n.x,n.y,v):(v=n.z,n.vz=0)),n.z=v;let g=n.onGround,m=n.vy,x=n.y+n.vy*e,M=hc(s,n.x,x,n.z);if(M?(n.vy<=0?(n.y=M.max[1],n.onGround=!0,n.jumps=0,!g&&m<-9&&r.push("land")):n.y=M.min[1]-iu-.001,n.vy=0):(n.y=x,n.onGround=!1,g&&n.jumps===0&&(n.jumps=1)),n.onGround){for(let _ of s.pads)if(Math.hypot(n.x-_.pos[0],n.z-_.pos[2])<_.radius&&Math.abs(n.y-_.pos[1])<.3){n.vy=_.power,n.vx+=_.push[0],n.vz+=_.push[2],n.onGround=!1,n.jumps=1,r.push("pad");break}}return r}function za(n,t,e,i){let s=[],r=Math.min(e,.1),a=!0;for(;r>1e-5;){let o=Math.min(r,.011111111111111112),l=a?t:{...t,jump:!1,dash:!1};s.push(...Fv(n,l,o,i)),r-=o,a=!1}return s}var vs,iu,Uv,nu=En(()=>{Ki();vs=Fi.radius,iu=Fi.height,Uv=.55});var Br,cu=En(()=>{Ki();Br=class{constructor(t,e,i){this.id=t,this.name=e,this.skin=i,this.isBot=!1,this.room=null,this.ready=!1,this.wins=0,this.rtt=0,this.resetForMatch()}resetForMatch(){this.pos=[0,0,0],this.yaw=0,this.pitch=0,this.weapon="fart",this.emote=0,this.hp=100,this.aura=0,this.kills=0,this.alive=!0,this.respawnAt=0,this.invulnUntil=0,this.ultraUntil=0,this.ultraKind=null,this.cat=null,this.flush=null,this.ultraTick=0,this.charmUntil=0,this.charmBy=null,this.slowUntil=0,this.lastHitBy=null,this.lastHitAt=0,this.lastShot={},this.lastSlap=0,this.lastSixSeven=0,this.movedAt=0,this.history=[],this.stats={shots:0,hitShots:0,headshots:0,damage:0,deaths:0,streak:0,bestStreak:0,auraEarned:0}}pushHistory(t){for(this.history.push({t,p:this.pos});this.history.length>2&&t-this.history[0].t>600;)this.history.shift()}rewound(t){let e=this.history;if(e.length===0)return this.pos;if(t<=e[0].t)return e[0].p;for(let i=e.length-1;i>0;i--)if(e[i-1].t<=t){let s=e[i-1],r=e[i];if(t>=r.t)return r.p;let a=(t-s.t)/(r.t-s.t||1);return[s.p[0]+(r.p[0]-s.p[0])*a,s.p[1]+(r.p[1]-s.p[1])*a,s.p[2]+(r.p[2]-s.p[2])*a]}return this.pos}teleport(t){this.pos=[...t],this.history=[],this.send({t:"teleport",pos:this.pos})}send(){}sendRaw(){}}});function pp(n,t,e){let i=n.boxes.filter(r=>t>r.min[0]&&t<r.max[0]&&e>r.min[2]&&e<r.max[2]&&r.max[1]>=-.5);if(!i.length)return NaN;i.sort((r,a)=>r.min[1]-a.min[1]);let s=i[0].max[1];for(let r=!0;r;){r=!1;for(let a of i)a.min[1]<=s+.01&&a.max[1]>s&&(s=a.max[1],r=!0)}return s}function xp(n){if(hu.has(n.id))return hu.get(n.id);let t=n.bounds,e=t*2,i=new Float32Array(e*e),s=new Uint8Array(e*e);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a-t+.5,c=o-t+.5,h=pp(n,l,c);if(!Number.isNaN(h))for(let[u,d]of[[-.46,-.46],[.46,-.46],[-.46,.46],[.46,.46]]){let f=pp(n,l+u,c+d);!Number.isNaN(f)&&f>h&&(h=f)}i[o*e+a]=h}for(let a=0;a<e;a++)for(let o=0;o<e;o++){if(Number.isNaN(i[o*e+a]))continue;let l=a>0&&o>0&&a<e-1&&o<e-1;for(let u=-1;l&&u<=1;u++)for(let d=-1;l&&d<=1;d++)Number.isNaN(i[(o+d)*e+a+u])&&(l=!1);let c=a-t+.5,h=o-t+.5;for(let u of n.pads)Math.hypot(c-u.pos[0],h-u.pos[2])<u.radius+.8&&(l=!1);s[o*e+a]=l?1:0}let r={B:t,N:e,h:i,safe:s,parent:new Int32Array(e*e),queue:new Int32Array(e*e)};return hu.set(n.id,r),r}function mp(n,t,e){let i=Math.max(0,Math.min(n.N-1,Math.floor(t+n.B)));return Math.max(0,Math.min(n.N-1,Math.floor(e+n.B)))*n.N+i}function gp(n,t){if(n.safe[t])return t;let{N:e}=n,i=t%e,s=(t-i)/e;for(let r=1;r<12;r++)for(let a=-r;a<=r;a++)for(let o=-r;o<=r;o++){if(Math.max(Math.abs(a),Math.abs(o))!==r)continue;let l=i+a,c=s+o;if(!(l<0||c<0||l>=e||c>=e)&&n.safe[c*e+l])return c*e+l}return-1}function yp(n,t,e,i,s){let{N:r,B:a,h:o,safe:l,parent:c,queue:h}=n,u=gp(n,mp(n,t,e)),d=gp(n,mp(n,i,s));if(u<0||d<0)return[];c.fill(-1),c[u]=u;let f=0,p=0,v=u,g=1/0;h[p++]=u;let m=d%r,x=(d-m)/r,M=[1,-1,r,-r];for(;f<p;){let T=h[f++],S=T%r,y=(T-S)/r,w=(S-m)**2+(y-x)**2;if(w<g&&(g=w,v=T),T===d)break;for(let C of M){if(C===1&&S===r-1||C===-1&&S===0)continue;let R=T+C;R<0||R>=r*r||c[R]!==-1||!l[R]||o[R]-o[T]>.56||(c[R]=T,h[p++]=R)}}let _=[];for(let T=v;T!==u;T=c[T])_.push([T%r-a+.5,Math.floor(T/r)-a+.5]);return _.reverse(),_}function vp(n,t,e,i){for(;t<n.length&&Math.hypot(n[t][0]-e,n[t][1]-i)<.75;)t++;return t}var hu,_p=En(()=>{hu=new Map});var _c,Mp=En(()=>{cu();Ki();nu();Ts();_p();_c=class extends Br{constructor(t,e,i){super(t,e,i),this.isBot=!0,this.body=Yn(),this.nextDecide=0,this.strafe=1,this.nextShot=0,this.seenSince=0,this.nextEmote=0,this.emoteUntil=0,this.path=[],this.pathIdx=0,this.nextPath=0}onSpawn(){this.body=Yn(...this.pos),this.seenSince=0,this.path=[],this.nextPath=0,this.nextEmote=Date.now()+4e3+Math.random()*6e3}teleport(t){this.pos=[...t],this.body=Yn(...t),this.path=[],this.nextPath=0}applyKnock(t){this.body.vx+=t[0],this.body.vy=Math.max(this.body.vy,t[1]),this.body.vz+=t[2],this.body.onGround=!1}chooseTarget(t,e,i=null){let s=null,r=1/0;for(let a of i?[i]:t.others(this)){if(!a.alive)continue;let o=[a.pos[0],a.pos[1]+1.1,a.pos[2]],l=[o[0]-e[0],o[1]-e[1],o[2]-e[2]],c=Math.hypot(l[0],l[1],l[2])||1,h=[l[0]/c,l[1]/c,l[2]/c],u=Bi(t.map,e,h,c)>=c-.05,d=c+(u?0:30);d<r&&(r=d,s={o:a,to:l,dist:c,dir:h,canSee:u})}return s}think(t,e,i){if(!this.alive)return;let s=t.map,r=[this.pos[0],this.pos[1]+Fi.eye,this.pos[2]],a={map:s,gravityMul:t.event?.kind==="moon"?.35:1,speedMul:e<this.slowUntil?.33:.82},o=e<this.charmUntil&&this.charmBy?.alive,l=this.chooseTarget(t,r,o?this.charmBy:null);if(!l){za(this.body,{fwd:0,right:0,yaw:this.yaw},i,a),this.pos=[this.body.x,this.body.y,this.body.z];return}let{o:c,to:h,dist:u,dir:d,canSee:f}=l;f?this.seenSince||(this.seenSince=e):this.seenSince=0;let v=Math.atan2(-h[0],-h[2])-this.yaw;for(;v>Math.PI;)v-=Math.PI*2;for(;v<-Math.PI;)v+=Math.PI*2;this.yaw+=v*Math.min(1,6*i),this.pitch=Math.asin(Math.max(-1,Math.min(1,d[1]))),e>this.nextDecide&&(this.nextDecide=e+500+Math.random()*1200,this.strafe=Math.random()<.5?-1:1),!f&&e>this.nextEmote&&(this.emote=Math.random()<.7?1:2,this.emoteUntil=e+2500,this.nextEmote=e+9e3+Math.random()*7e3);let g=e<this.emoteUntil&&!f;if(g||(this.emote=0,this.emoteUntil=0),f&&this.aura>=6767&&!this.ultraKind&&!o&&(t.onUltra(this),this.cat))return;let m={fwd:0,right:0,yaw:this.yaw,jump:!1,dash:!1};if(!g)if(f&&u<=7&&!o){m.fwd=u<4?-.6:0,m.right=this.strafe;let _=Math.sin(this.yaw),T=Math.cos(this.yaw),S=-_*m.fwd+T*m.right,y=-T*m.fwd-_*m.right,w=Math.hypot(S,y)||1;In(s,this.body.x+S/w*2.2,this.body.z+y/w*2.2,this.body.y+1)<-.5&&(m.fwd=0,m.right=0)}else{e>this.nextPath&&(this.nextPath=e+600+Math.random()*300,this.path=yp(xp(s),this.body.x,this.body.z,c.pos[0],c.pos[2]),this.pathIdx=0),this.pathIdx=vp(this.path,this.pathIdx,this.body.x,this.body.z);let _=this.path[this.pathIdx];_&&(m.yaw=Math.atan2(-(_[0]-this.body.x),-(_[1]-this.body.z)),m.fwd=1)}let x=[this.body.x,this.body.z];this.body.onGround&&f&&Math.random()<.006&&(m.jump=!0),za(this.body,m,i,a);let M=Math.hypot(this.body.x-x[0],this.body.z-x[1])<.01;if(M&&(m.fwd||m.right)&&this.body.onGround&&(this.body.vy=10,this.body.onGround=!1),this.pos=[this.body.x,this.body.y,this.body.z],M||(this.movedAt=e),this.pushHistory(e),this.hp<100&&t.checkPickups(this,e),f&&!o&&e-this.seenSince>450&&e>this.nextShot){if(u<3&&!t.isGrabbed(this)){this.nextShot=e+900,t.onSlap(this,{d});return}let _=this.ultraKind==="minsu"?Tn:u<9?He.boom:u<22?He.fart:He.six7;_!==Tn&&(this.weapon=_.id),this.nextShot=e+_.interval*1e3*(_.auto?1.3:1.8);let T=.05+u*.0018,S=[];for(let y=0;y<_.pellets;y++){let w=_.pellets>1?_.spread:T,C=y===0&&_.pellets>1?[(Math.random()-.5)*T,(Math.random()-.5)*T,(Math.random()-.5)*T]:[0,0,0];S.push([d[0]+C[0]+(Math.random()-.5)*w*2,d[1]+C[1]+(Math.random()-.5)*w*2,d[2]+C[2]+(Math.random()-.5)*w*2])}t.onShoot(this,{w:_.id,o:r,dirs:S})}}}});var bp={};Cc(bp,{addWords:()=>jv,cleanText:()=>Ya});function jv(n){for(let t of n)t&&uu.add(t)}function Qv(n){let t=n.toLowerCase(),e=t.replace(/[013457@$]/g,i=>Jv[i]);return uu.has(t)||uu.has(e)?!0:$v.some(i=>e.includes(i))}function Ya(n){return String(n).replace(/[\p{L}\p{N}@$]+/gu,t=>Qv(t)?"*".repeat(t.length):t)}var uu,$v,Jv,Mc=En(()=>{uu=new Set(["fuck","shit","bitch","cunt","nigger","nigga","faggot","retard","whore","slut","dick","pussy","asshole","bastard","rape"]),$v=["fuck","nigg","fagg","shit","bitch","\uC2DC\uBC1C","\uC528\uBC1C","\uC528\uBC14","\uBCD1\uC2E0","\uC886","\uC874\uB098","\uC0C8\uB07C","\uC9C0\uB784","\uC345","\uB2C8\uBBF8","\uB290\uAE08","\uC139\uC2A4","\uCC3D\uB140"],Jv={0:"o",1:"i",3:"e",4:"a",5:"s",7:"t","@":"a",$:"s"}});var Sp={};Cc(Sp,{Room:()=>Ka,TICK_MS:()=>pu});var du,bc,Ee,t_,e_,i_,Ka,pu,mu=En(()=>{Ki();Ts();Mp();Mc();du=n=>typeof n=="number"&&Number.isFinite(n),bc=n=>Array.isArray(n)&&n.length===3&&n.every(du),Ee=n=>Math.round(n*100)/100,t_=["AI Minsu","Practice NPC","Bot Rocks","Ohio Bot","Payroll Bot","Skill Issue","Intern Bot"],e_=8e3,i_=()=>Date.now(),Ka=class{constructor(t,e,i,s={}){this.id=t,this.name=e,this.hub=i,this.t={...Wu,...s},this.players=[],this.state="lobby",this.stateUntil=0,this.matchEndsAt=0,this.mapChoice=er,this.map=Zi[er],this.pickups=[],this.bombs=[],this.nukes=[],this.fallouts=[],this.event=null,this.nextEventAt=0}summary(){return{id:this.id,name:this.name,state:this.state,count:this.players.length,humans:this.players.filter(t=>!t.isBot).length,max:4,map:this.mapChoice}}roomMessage(){return{t:"room",room:{id:this.id,name:this.name,state:this.state,mapChoice:this.mapChoice,mapId:this.map.id,players:this.players.map(t=>({id:t.id,name:t.name,skin:t.skin,ready:t.ready,wins:t.wins,isBot:t.isBot}))}}}broadcast(t){let e=JSON.stringify(t);for(let i of this.players)i.sendRaw(e)}sendRoom(){this.broadcast(this.roomMessage()),this.hub.roomsChanged()}add(t){return this.state!=="lobby"||(this.players.length>=4&&this.players.some(e=>e.isBot)&&this.removeBot(),this.players.length>=4)?!1:(t.room=this,t.ready=!1,t.wins=0,this.players.push(t),this.sendRoom(),!0)}remove(t){let e=this.players.indexOf(t);if(e<0)return;t.ultraKind&&this.endUltra(t,!1);for(let s of this.players)s.cat?.target===t&&(s.cat.target=null,s.cat.latched=!1);if(this.players.splice(e,1),t.room=null,this.players.filter(s=>!s.isBot).length===0){this.players=[],this.hub.deleteRoom(this);return}this.state==="countdown"||this.state==="playing"?this.players.length>=2?(this.broadcast({t:"sys",key:"sys.fled",vars:{name:t.name}}),this.sendRoom()):this.endMatch(this.players[0],"ragequit"):this.state==="results"?(this.broadcast({t:"sys",key:"sys.fled",vars:{name:t.name}}),this.sendRoom()):(this.players.forEach(s=>{s.ready=s.isBot}),this.broadcast({t:"sys",key:"sys.left",vars:{name:t.name}}),this.sendRoom())}addBot(){if(this.state!=="lobby"||this.players.length>=4)return;let t=new Set(this.players.map(s=>s.name)),e=t_.filter(s=>!t.has(s)),i=new _c(this.hub.nextId(),e[Math.floor(Math.random()*e.length)],Oi[Math.floor(Math.random()*Oi.length)]);i.room=this,i.ready=!0,i.wins=0,this.players.push(i),this.sendRoom(),this.maybeStart()}removeBot(){if(this.state==="lobby"){for(let t=this.players.length-1;t>=0;t--)if(this.players[t].isBot){this.players.splice(t,1);break}this.sendRoom()}}setReady(t,e){this.state==="lobby"&&(t.ready=!!e,this.sendRoom(),this.maybeStart())}setSkin(t,e){this.state!=="lobby"||!Oi.includes(e)||(t.skin=e,this.sendRoom())}setMap(t,e){this.state!=="lobby"||e!=="random"&&!qr.includes(e)||this.mapChoice===e||(this.mapChoice=e,e!=="random"&&(this.map=Zi[e]),this.broadcast({t:"sys",key:"sys.map",vars:{name:t.name},mapId:e}),this.sendRoom())}rename(t,e){if(this.state!=="lobby"||t.name===e)return;let i=t.name;t.name=e,this.broadcast({t:"sys",key:"sys.rename",vars:{old:i,name:e}}),this.sendRoom()}chat(t,e){let i=String(e??"").replace(/[\u0000-\u001f]/g,"").trim().slice(0,120);i&&this.broadcast({t:"chat",from:t.name,text:Ya(i)})}maybeStart(){this.state==="lobby"&&this.players.length>=2&&this.players.every(t=>t.ready)&&this.startMatch()}startMatch(){let t=Date.now();if(this.mapChoice==="random"){let i=qr.filter(s=>s!==this.map.id);this.map=Zi[i[Math.floor(Math.random()*i.length)]]}this.state="countdown",this.stateUntil=t+this.t.countdownMs,this.event=null,this.bombs=[],this.nukes=[],this.fallouts=[],this.nextEventAt=t+this.t.countdownMs+this.t.eventFirstMs,this.matchEndsAt=t+this.t.countdownMs+367*1e3,this.pickups=this.map.pickups.map(i=>({...i,active:!0,respawnAt:0}));let e=[];for(let i of this.players)i.resetForMatch(),this.placeAtSpawn(i,e),e.push(i.pos);this.broadcast({t:"matchStart",map:this.map.id,countdownMs:this.t.countdownMs,endsIn:this.matchEndsAt-t,players:this.players.map(i=>({id:i.id,name:i.name,skin:i.skin,pos:i.pos,yaw:i.yaw,isBot:i.isBot})),pickups:this.pickups.map(i=>i.active)}),this.sendRoom()}placeAtSpawn(t,e){let i=Ku(this.map,e);t.pos=[...i.pos],t.yaw=i.yaw,t.pitch=0,t.history=[],t.alive=!0,t.hp=100,t.invulnUntil=Date.now()+this.t.invulnMs,t.emote=0,t.lastHitBy=null,t.charmUntil=0,t.charmBy=null,t.slowUntil=0,t.isBot&&t.onSpawn()}others(t){return this.players.filter(e=>e!==t)}isPlaying(){return this.state==="playing"}bigHead(){return this.event?.kind==="bighead"}isGrabbed(t){return this.players.some(e=>e.cat?.latched&&e.cat.target===t)}creditFor(t,e=Date.now()){if(t.lastHitBy&&e-t.lastHitAt<e_&&this.players.includes(t.lastHitBy))return t.lastHitBy;let i=this.others(t);return i.length===1?i[0]:null}tick(t,e){this.state==="countdown"?(t>=this.stateUntil&&(this.state="playing",this.broadcast({t:"go"}),this.sendRoom()),this.snapshot(t)):this.state==="playing"?(this.tickPlaying(t,e),this.state==="playing"&&this.snapshot(t)):this.state==="results"&&t>=this.stateUntil&&this.backToLobby()}tickPlaying(t,e){for(let i of[...this.players]){if(this.state!=="playing"||(i.isBot&&!i.cat&&i.think(this,t,e),this.state!=="playing"))return;if(!i.alive){t>=i.respawnAt&&this.respawn(i);continue}if(i.ultraUntil&&t>=i.ultraUntil&&this.endUltra(i,!0),i.cat&&this.tickCat(i,t,e),this.state!=="playing"||(i.flush&&i.alive&&this.tickFlush(i,t),this.state!=="playing")||(i.alive&&(i.ultraKind==="streamer"||i.ultraKind==="tung")&&this.tickContact(i,t),this.state!=="playing")||(i.alive&&i.ultraKind==="rizz"&&this.tickRizz(i,t),this.state!=="playing")||(i.alive&&i.ultraKind==="chill"&&(i.hp=Math.min(100,Ee(i.hp+js.regenPerSec*e))),i.alive&&i.emote===1&&t-i.movedAt>150&&this.addAura(i,on.farmPerSec*e,null),i.alive&&!i.cat&&i.pos[1]<this.map.fallY&&(this.kill(i,this.creditFor(i,t),{weapon:"fall",head:!1}),this.state!=="playing")))return}for(let i=0;i<this.pickups.length;i++){let s=this.pickups[i];!s.active&&t>=s.respawnAt&&(s.active=!0,this.broadcast({t:"pickup",i,active:!0}))}this.tickBombs(t),this.state==="playing"&&(this.tickNukes(t),this.state==="playing"&&(this.tickFallouts(t),this.state==="playing"&&(this.tickEvents(t),t>=this.matchEndsAt&&this.endByTime())))}tickEvents(t){this.event&&t>=this.event.until&&(this.event=null,this.broadcast({t:"event",kind:null})),!this.event&&t>=this.nextEventAt&&this.startEvent(Lc[Math.floor(Math.random()*Lc.length)],t)}startEvent(t,e=Date.now()){let i=Ic[t];this.event={kind:t,until:e+i.ms},this.nextEventAt=e+i.ms+this.t.eventGapMs,this.broadcast({t:"event",kind:t,ms:i.ms}),t==="dogfight"&&this.scheduleAirstrike(e)}scheduleAirstrike(t){let e=this.players.filter(s=>s.alive),i=this.map.bounds-2;for(let s=0;s<13;s++){let r=e.length&&Math.random()<.7?e[s%e.length].pos:this.map.showcase.pos,a=Math.max(-i,Math.min(i,r[0]+(Math.random()-.5)*9)),o=Math.max(-i,Math.min(i,r[2]+(Math.random()-.5)*9)),l=In(this.map,a,o,r[1]+1),c=l>-50?l:r[1],h=t+Rn.fuseMs+(s<6?s*280:2e3+(s-6)*280);this.bombs.push({pos:[a,c,o],at:h}),this.broadcast({t:"bomb",pos:[Ee(a),Ee(c),Ee(o)],in:h-t})}}tickBombs(t){if(!this.bombs.length)return;let e=this.bombs.filter(i=>t>=i.at);this.bombs=this.bombs.filter(i=>t<i.at);for(let i of e){this.broadcast({t:"boom",pos:i.pos});for(let s of[...this.players]){if(!s.alive)continue;let r=s.pos[0]-i.pos[0],a=s.pos[1]+.9-i.pos[1],o=s.pos[2]-i.pos[2],l=Math.hypot(r,a,o);if(l>=Rn.radius)continue;let c=1-l/Rn.radius,h=l||1;if(this.knock(s,[r/h*Rn.knock*c,8*c+3,o/h*Rn.knock*c]),this.damage(s,this.creditFor(s,t),Rn.damage*c,{weapon:"bomb",head:!1,env:!0,pos:s.pos}),this.state!=="playing")return}}}onUltra(t){if(!this.isPlaying()||!t.alive||t.aura<6767||t.ultraKind)return;let e=Date.now(),i=Wr[t.skin]?t.skin:"sigma",s=Wr[i];if(t.aura=0,t.ultraKind=i,t.ultraUntil=e+s.ms,t.emote=0,t.waveN=0,t.ultraTick=0,t.rizzTick=0,this.broadcast({t:"ultra",id:t.id,on:!0,ms:s.ms,kind:i}),i==="cat")t.cat={target:null,latched:!1,start:[...t.pos],nextTick:0};else if(i==="toilet")t.flush={nextTick:e};else if(i==="cone")this.launchNuke(t,e);else if(i==="hero")t.cat={punch:!0,target:null,hits:0,done:new Set,start:[...t.pos],landing:null};else if(i==="chill")for(let r of this.others(t))!r.alive||Math.hypot(r.pos[0]-t.pos[0],r.pos[2]-t.pos[2])>js.radius||(r.slowUntil=e+s.ms,this.broadcast({t:"slow",id:t.id,to:r.id,ms:s.ms}));else if(i==="rizz")for(let r of this.others(t))!r.alive||Math.hypot(r.pos[0]-t.pos[0],r.pos[2]-t.pos[2])>Qn.radius||(r.charmUntil=e+s.ms,r.charmBy=t,this.broadcast({t:"charm",id:t.id,to:r.id,ms:s.ms}))}endUltra(t,e){if(!t.ultraKind)return;let i=t.cat,s=t.flush&&e&&t.alive&&i_()>=t.ultraUntil;if(t.cat=null,t.flush=null,t.ultraKind=null,t.ultraUntil=0,i&&t.alive&&e){let r=i.landing??(i.latched&&i.target?.alive?i.target.pos:i.start);t.teleport(r)}e&&this.broadcast({t:"ultra",id:t.id,on:!1}),s&&this.geyser(t)}geyser(t){this.broadcast({t:"geyser",id:t.id,pos:t.pos.map(Ee),radius:Yi.geyserRadius});for(let e of this.others(t)){if(!e.alive)continue;let i=e.pos[0]-t.pos[0],s=e.pos[2]-t.pos[2],r=Math.hypot(i,s)||1;if(!(r>Yi.geyserRadius||Math.abs(e.pos[1]-t.pos[1])>8)&&(this.knock(e,[i/r*6,Yi.geyserUp,s/r*6]),this.damage(e,t,Yi.geyserDamage,{weapon:"flush",head:!1,env:!0,pos:e.pos}),this.state!=="playing"))return}}tickRizz(t,e){if(!(e<t.rizzTick)){t.rizzTick=e+Qn.tickMs;for(let i of this.others(t))if(!(!i.alive||i.charmBy!==t||e>=i.charmUntil)&&!(Math.hypot(i.pos[0]-t.pos[0],i.pos[2]-t.pos[2])>Qn.kissRange)&&(this.addAura(i,-Qn.auraDrain,null),this.addAura(t,Qn.auraDrain,null),t.hp=Math.min(100,Ee(t.hp+Qn.heal)),this.damage(i,t,Qn.damage,{weapon:"rizz",head:!1,env:!0,pos:i.pos}),this.state!=="playing"))return}}tickFallouts(t){if(this.fallouts.length){this.fallouts=this.fallouts.filter(e=>t<e.until);for(let e of this.fallouts)if(!(t<e.next)){e.next=t+jn.tickMs;for(let i of[...this.players])if(!(i===e.owner||!i.alive)&&!(Math.hypot(i.pos[0]-e.pos[0],i.pos[2]-e.pos[2])>jn.radius||Math.abs(i.pos[1]-e.pos[1])>6)&&(this.damage(i,this.players.includes(e.owner)?e.owner:null,jn.damage,{weapon:"nuke",head:!1,env:!0,pos:i.pos}),this.state!=="playing"))return}}}nearestAlive(t){let e=null,i=1/0;for(let s of this.others(t)){if(!s.alive)continue;let r=Math.hypot(s.pos[0]-t.pos[0],s.pos[1]-t.pos[1],s.pos[2]-t.pos[2]);r<i&&(i=r,e=s)}return e}tickCat(t,e,i){let s=t.cat;if(s.punch){this.tickHero(t,s,e,i);return}if((!s.target||!s.target.alive)&&(s.latched&&this.broadcast({t:"cat",id:t.id,to:null}),s.latched=!1,s.target=this.nearestAlive(t),!s.target))return;let r=s.target;if(!s.latched){let a=[r.pos[0],r.pos[1]+.6,r.pos[2]],o=[a[0]-t.pos[0],a[1]-t.pos[1],a[2]-t.pos[2]],l=Math.hypot(o[0],o[1],o[2])||1,c=Js.flySpeed*i;l<=Math.max(Js.latchRange,c)?(s.latched=!0,s.nextTick=e,this.broadcast({t:"cat",id:t.id,to:r.id})):(t.pos=[t.pos[0]+o[0]/l*c,t.pos[1]+o[1]/l*c,t.pos[2]+o[2]/l*c],t.yaw=Math.atan2(-o[0],-o[2]))}if(s.latched){let a=Math.sin(r.yaw),o=Math.cos(r.yaw);if(t.pos=[r.pos[0]-a*.55,r.pos[1]+.55,r.pos[2]-o*.55],t.yaw=r.yaw+Math.PI,e>=s.nextTick){s.nextTick=e+Js.tickMs;let l=Math.min(r.aura,Js.auraSteal);l>0&&(this.addAura(r,-l,null),this.addAura(t,l,null)),this.damage(r,t,Js.damage,{weapon:"claw",head:!1,env:!0,pos:r.pos})}}t.movedAt=e,t.pushHistory(e)}disabled(t,e){return e<t.charmUntil}tickContact(t,e){if(e<t.ultraTick)return;let i=t.ultraKind==="tung",s=i?Vr:Gr;t.ultraTick=e+s.tickMs,t.waveN=(t.waveN??0)+1;let r=t.waveN>=s.count,a=-Math.sin(t.yaw),o=-Math.cos(t.yaw),l=i?r?Vr.finalRadius:Vr.radius+(t.waveN-1)*Vr.radiusStep:Gr.range;i?this.broadcast({t:"wave",id:t.id,pos:t.pos.map(Ee),radius:l,n:t.waveN,final:r}):this.broadcast({t:"bark",id:t.id,pos:t.pos.map(Ee),yaw:Ee(t.yaw),range:Gr.range,final:r});let c=[t.pos[0],t.pos[1]+Fi.eye,t.pos[2]];for(let h of this.others(t)){if(!h.alive||e<h.invulnUntil)continue;let u=h.pos[0]-t.pos[0],d=h.pos[2]-t.pos[2],f=Math.hypot(u,d)||1;if(f>l||Math.abs(h.pos[1]-t.pos[1])>6)continue;if(!i){if(!r&&(u*a+d*o)/f<Gr.cone)continue;let v=[u,h.pos[1]+1-c[1],d],g=Math.hypot(v[0],v[1],v[2])||1;if(Bi(this.map,c,[v[0]/g,v[1]/g,v[2]/g],g)<g-.05)continue}let p=r?s.finalKnock:s.knock;if(this.knock(h,[u/f*p,r?15:9,d/f*p]),this.damage(h,t,r?s.finalDamage:s.damage,{weapon:i?"tung":"bark",head:!1,env:!0,pos:h.pos}),this.state!=="playing")return}}tickHero(t,e,i,s){if(!e.target||!e.target.alive||e.done.has(e.target)){let h=null,u=1/0;for(let d of this.others(t)){if(!d.alive||e.done.has(d))continue;let f=Math.hypot(d.pos[0]-t.pos[0],d.pos[1]-t.pos[1],d.pos[2]-t.pos[2]);f<u&&(u=f,h=d)}if(e.target=h,!h){this.endUltra(t,!0);return}}let r=e.target,a=[r.pos[0],r.pos[1]+.6,r.pos[2]],o=[a[0]-t.pos[0],a[1]-t.pos[1],a[2]-t.pos[2]],l=Math.hypot(o[0],o[1],o[2])||1,c=ln.flySpeed*s;if(t.yaw=Math.atan2(-o[0],-o[2]),l>Math.max(ln.range,c))t.pos=[t.pos[0]+o[0]/l*c,t.pos[1]+o[1]/l*c,t.pos[2]+o[2]/l*c];else{if(e.done.add(r),e.hits++,e.landing=[...r.pos],this.knock(r,[o[0]/l*ln.knock,12,o[2]/l*ln.knock]),this.damage(r,t,ln.damage[Math.min(e.hits-1,ln.damage.length-1)],{weapon:"hero",head:!1,env:!0,pos:r.pos}),this.state!=="playing"||!t.cat)return;this.broadcast({t:"punch",id:t.id,pos:r.pos.map(Ee),n:e.hits});for(let h of this.others(t))if(!(h===r||!h.alive||e.done.has(h)||Math.hypot(h.pos[0]-r.pos[0],h.pos[1]-r.pos[1],h.pos[2]-r.pos[2])>ln.splashRadius)&&(this.damage(h,t,ln.splashDamage,{weapon:"hero",head:!1,env:!0,pos:h.pos}),this.state!=="playing"||!t.cat))return;if(e.hits>=ln.hits){this.endUltra(t,!0);return}}t.movedAt=i,t.pushHistory(i)}tickFlush(t,e){if(!(e<t.flush.nextTick)){t.flush.nextTick=e+Yi.tickMs;for(let i of this.others(t)){if(!i.alive||e<i.invulnUntil)continue;let s=t.pos[0]-i.pos[0],r=t.pos[2]-i.pos[2],a=Math.hypot(s,r)||1;if(a>Yi.radius||Math.abs(t.pos[1]-i.pos[1])>8)continue;let o=Yi.pull*(1-a/Yi.radius)+3;if(this.knock(i,[s/a*o,2.2,r/a*o]),a<Yi.coreRadius&&(this.damage(i,t,Yi.damage,{weapon:"flush",head:!1,env:!0,pos:i.pos}),this.state!=="playing"))return}}}launchNuke(t,e){let i=Math.cos(t.pitch),s=[-Math.sin(t.yaw)*i,Math.sin(t.pitch),-Math.cos(t.yaw)*i],r=[t.pos[0],t.pos[1]+Fi.eye,t.pos[2]],a=Bi(this.map,r,s,qi.aimRange),o=[r[0]+s[0]*a,r[1]+s[1]*a,r[2]+s[2]*a],l=In(this.map,o[0],o[2],o[1]+.5),c=[Ee(o[0]),Ee(l>-50?l:Math.max(0,o[1])),Ee(o[2])];this.nukes.push({pos:c,at:e+qi.fuseMs,owner:t}),this.broadcast({t:"nuke",id:t.id,pos:c,in:qi.fuseMs,radius:qi.radius})}tickNukes(t){if(!this.nukes.length)return;let e=this.nukes.filter(i=>t>=i.at);this.nukes=this.nukes.filter(i=>t<i.at);for(let i of e){this.broadcast({t:"nukeBoom",id:i.owner.id,pos:i.pos,radius:qi.radius});let s=this.players.includes(i.owner)?i.owner:null,r=[i.pos[0],i.pos[1]+3,i.pos[2]];for(let a of[...this.players]){if(a===i.owner||!a.alive)continue;let o=[a.pos[0]-r[0],a.pos[1]+1-r[1],a.pos[2]-r[2]],l=Math.hypot(o[0],o[1],o[2])||1;if(l>=qi.radius)continue;let c=[o[0]/l,o[1]/l,o[2]/l],h=Bi(this.map,r,c,l)<l-.05,u=1-l/qi.radius;if(this.knock(a,[c[0]*qi.knock*u,14*u+4,c[2]*qi.knock*u]),this.damage(a,s,qi.damage*u*(h?.5:1),{weapon:"nuke",head:!1,env:!0,pos:a.pos}),this.state!=="playing")return}this.fallouts.push({pos:i.pos,owner:i.owner,until:t+jn.ms,next:t+jn.tickMs}),this.broadcast({t:"fallout",pos:i.pos,radius:jn.radius,ms:jn.ms})}}onState(t,e){if(!this.isPlaying()&&this.state!=="countdown"||!bc(e.p)||!du(e.y)||!du(e.pi)||!t.alive)return;let i=Date.now();if(this.state==="playing"&&!t.cat){Math.hypot(e.p[0]-t.pos[0],e.p[2]-t.pos[2])>.02&&(t.movedAt=i);let a=this.map.bounds+20;t.pos=[Math.max(-a,Math.min(a,e.p[0])),Math.max(-60,Math.min(60,e.p[1])),Math.max(-a,Math.min(a,e.p[2]))]}t.cat||(t.yaw=e.y),t.pitch=Math.max(-1.6,Math.min(1.6,e.pi)),He[e.w]&&(t.weapon=e.w);let s=!t.cat&&(e.e===1||e.e===2)?e.e:0;s===2&&t.emote!==2&&i-t.lastSixSeven>2e3&&(t.lastSixSeven=i,this.addAura(t,on.sixSeven,"sixSeven")),t.emote=s,t.cat||t.pushHistory(i),this.checkPickups(t,i)}checkPickups(t,e){for(let i=0;i<this.pickups.length;i++){let s=this.pickups[i];s.active&&(Math.hypot(t.pos[0]-s.pos[0],t.pos[1]+.9-s.pos[1],t.pos[2]-s.pos[2])>1.9||s.kind==="chicken"&&t.hp>=100||(s.active=!1,s.respawnAt=e+this.t.pickupRespawnMs,s.kind==="chicken"?t.hp=Math.min(100,t.hp+Vu):this.addAura(t,on.orb,"orb"),this.broadcast({t:"pickup",i,active:!1,by:t.id,kind:s.kind})))}}onShoot(t,e){if(!this.isPlaying()||!t.alive||t.cat||this.disabled(t,Date.now()))return;let i=e.w===Tn.id?t.ultraKind==="minsu"?Tn:null:He[e.w];if(!i||!bc(e.o)||!Array.isArray(e.dirs)||e.dirs.length===0||e.dirs.length>i.pellets)return;let s=Date.now(),r=t.ultraKind==="sigma",a=i.interval*(r?.6:1)*.75*1e3;if(s-(t.lastShot[i.id]??0)<a)return;t.lastShot[i.id]=s;let o=[t.pos[0],t.pos[1]+Fi.eye,t.pos[2]],l=Math.hypot(e.o[0]-o[0],e.o[1]-o[1],e.o[2]-o[2])<3?e.o:o,c=s-t.rtt/2-100,h=this.others(t).filter(p=>p.alive&&s>=p.invulnUntil).map(p=>({player:p,pos:p.rewound(c),total:0,head:!1,hits:0})),u=[];t.stats.shots++;for(let p of e.dirs){if(!bc(p))continue;let v=Math.hypot(p[0],p[1],p[2]);if(v<.5)continue;let g=[p[0]/v,p[1]/v,p[2]/v],m=i.pierce?i.range:Bi(this.map,l,g,i.range),x=null,M=null;for(let _ of h){let T=no(l,g,_.pos,this.bigHead(),m);T&&(i.pierce?(_.hits++,_.total+=T.head?i.head:i.body,T.head&&(_.head=!0)):(m=T.t,x=_,M=T))}u.push([Ee(l[0]+g[0]*m),Ee(l[1]+g[1]*m),Ee(l[2]+g[2]*m)]),x&&(x.hits++,x.total+=M.head?i.head:i.body,M.head&&(x.head=!0))}let d=JSON.stringify({t:"shot",id:t.id,w:i.id,o:l.map(Ee),ends:u});for(let p of this.players)p!==t&&p.sendRaw(d);let f=h.filter(p=>p.hits>0);f.length&&(t.stats.hitShots++,f.some(p=>p.head)&&t.stats.headshots++);for(let p of f){if(this.state!=="playing")return;this.damage(p.player,t,p.total,{weapon:i.id,head:p.head,pos:p.pos})}}onSlap(t,e){if(!this.isPlaying()||!t.alive||t.cat||!bc(e.d))return;let i=Date.now();if(this.disabled(t,i)||i-t.lastSlap<An.cooldown*1e3*.8)return;t.lastSlap=i,this.broadcast({t:"slapFx",id:t.id});let s=this.players.find(l=>l.cat?.latched&&l.cat.target===t);if(s){this.endUltra(s,!0),this.knock(s,[(s.pos[0]-t.pos[0])*6,9,(s.pos[2]-t.pos[2])*6]),this.damage(s,t,An.damage,{weapon:"slap",head:!1,pos:s.pos});return}let r=[t.pos[0],t.pos[1]+Fi.eye,t.pos[2]],a=Math.hypot(e.d[0],e.d[1],e.d[2])||1,o=null;for(let l of this.others(t)){if(!l.alive||i<l.invulnUntil)continue;let c=l.rewound(i-t.rtt/2-100),h=[c[0]-r[0],c[1]+1-r[1],c[2]-r[2]],u=Math.hypot(h[0],h[1],h[2]);if(u>An.range||(u<.01?1:(h[0]*e.d[0]+h[1]*e.d[1]+h[2]*e.d[2])/(u*a))<.55)continue;let f=[h[0]/(u||1),h[1]/(u||1),h[2]/(u||1)];Bi(this.map,r,f,u)<u-.01||(!o||u<o.dist)&&(o={target:l,tp:c,norm:f,dist:u})}o&&(this.knock(o.target,[o.norm[0]*An.knock,9,o.norm[2]*An.knock]),this.damage(o.target,t,An.damage,{weapon:"slap",head:!1,pos:o.tp}))}onFell(t){this.isPlaying()&&t.alive&&!t.cat&&t.pos[1]<this.map.fallY+8&&this.kill(t,this.creditFor(t),{weapon:"fall",head:!1})}knock(t,e){t.ultraKind!=="sigma"&&(t.isBot?t.applyKnock(e):t.send({t:"knock",v:e.map(Ee)}))}damage(t,e,i,s){let r=Date.now();if(!t?.alive||r<t.invulnUntil||t.ultraKind==="hero")return;if(t.ultraKind==="chill"){e&&e!==t&&!s.env&&e.ultraKind!=="chill"&&this.damage(e,t,i*js.reflect,{weapon:"reflect",head:!1,env:!0,pos:e.pos});return}let a=i;s.env||(this.event?.kind==="sixseven"&&(a=67),e?.ultraKind==="sigma"&&(a*=1.67)),a=Ee(a),t.hp=Ee(t.hp-a),e&&(s.weapon!=="bomb"&&(e.stats.damage=Ee(e.stats.damage+a),t.lastHitBy=e,t.lastHitAt=r),s.env||this.addAura(e,s.head?on.hitHead:on.hitBody,s.head?"head":null)),t.emote===1&&this.addAura(t,on.farmInterrupted,"farmHit");let o=t.hp<=0;this.broadcast({t:"hit",to:t.id,from:e?.id??null,dmg:a,head:!!s.head,weapon:s.weapon,hp:Math.max(0,t.hp),pos:t.pos.map(Ee),dead:o}),o&&this.kill(t,e,s)}kill(t,e,i){if(!t.alive)return;let s=Date.now();t.ultraKind&&this.endUltra(t,!0),t.alive=!1,t.hp=0,t.emote=0,t.respawnAt=s+this.t.respawnMs,t.stats.deaths++;let r=i.weapon==="fall";this.addAura(t,r?on.fell:on.death,r?"fall":"death"),e&&(e.kills++,e.stats.streak++,e.stats.streak>e.stats.bestStreak&&(e.stats.bestStreak=e.stats.streak),!r&&i.weapon!=="bomb"&&this.addAura(e,on.kill,"kill"),e.ultraKind==="sigma"&&e.alive&&(e.ultraUntil+=Pc.killExtendMs,e.hp=Math.min(100,e.hp+Pc.killHeal),this.broadcast({t:"ultraExt",id:e.id,ms:e.ultraUntil-s}))),t.stats.streak=0,this.broadcast({t:"kill",victim:t.id,killer:e?.id??null,weapon:i.weapon,head:!!i.head,pos:t.pos.map(Ee),killerKills:e?.kills??0,victimKills:t.kills,respawnMs:this.t.respawnMs}),e&&e.kills>=7&&this.endMatch(e,"kills")}respawn(t){let e=this.others(t).filter(i=>i.alive).map(i=>i.pos);this.placeAtSpawn(t,e),this.broadcast({t:"spawn",id:t.id,pos:t.pos,yaw:t.yaw,invulnMs:this.t.invulnMs})}addAura(t,e,i){let s=t.aura;t.aura=Math.max(0,Math.min(6767,t.aura+e)),t.stats.auraEarned+=Math.max(0,t.aura-s),i&&this.broadcast({t:"aura",id:t.id,delta:Math.round(e),reason:i})}endByTime(){let t=[...this.players].sort((r,a)=>a.kills-r.kills||a.aura-r.aura),[e,i]=t,s=i&&e.kills===i.kills&&Math.round(e.aura)===Math.round(i.aura);this.endMatch(s?null:e,"time")}endMatch(t,e){if(this.state==="results"||this.state==="lobby")return;t&&t.wins++;for(let r of this.players)r.ultraKind&&this.endUltra(r,!1);this.state="results",this.stateUntil=Date.now()+this.t.resultsMs,this.event=null,this.bombs=[],this.nukes=[],this.fallouts=[];let i=t?Math.max(0,...this.others(t).map(r=>r.kills)):0,s=[...this.players].sort((r,a)=>a.kills-r.kills||a.aura-r.aura);this.broadcast({t:"matchEnd",winner:t?.id??null,reason:e,sixSeven:!!(t&&t.kills===7&&i===6),resultsMs:this.t.resultsMs,players:s.map(r=>({id:r.id,name:r.name,skin:r.skin,kills:r.kills,wins:r.wins,aura:Math.round(r.aura),stats:r.stats}))}),this.sendRoom()}backToLobby(){this.state="lobby";for(let t of this.players)t.ready=t.isBot;this.broadcast({t:"backToLobby"}),this.sendRoom()}snapshot(t){this.broadcast({t:"snap",s:t,left:Math.max(0,this.matchEndsAt-t),players:this.players.map(e=>({id:e.id,p:e.pos.map(Ee),y:Ee(e.yaw),pi:Ee(e.pitch),w:e.weapon,e:e.emote,hp:Math.max(0,Math.round(e.hp*10)/10),aura:Math.round(e.aura),k:e.kills,a:e.alive,u:!!e.ultraKind,inv:t<e.invulnUntil}))})}},pu=1e3/30});var wp={};Cc(wp,{createHub:()=>n_});function gu(n,t,e=20){let i=String(n??"").replace(/[\u0000-\u001f]/g,"").trim().slice(0,e);return i?Ya(i):t}function n_({timings:n={},autoTick:t=!0}={}){let e=new Map,i=new Set,s=0,r=0,a={nextId:()=>++s,roomsChanged(){let d=JSON.stringify({t:"rooms",rooms:[...e.values()].map(f=>f.summary())});for(let f of i)f.room||f.sendRaw(d)},deleteRoom(d){e.delete(d.id),a.roomsChanged()}},o=d=>{let f=new Ka(String(++r),d,a,n);return e.set(f.id,f),f};function l(d,f){let p;try{p=JSON.parse(String(f))}catch{return}if(!p||typeof p!="object")return;let v=d.room;switch(p.t){case"ping":typeof p.rtt=="number"&&p.rtt>=0&&(d.rtt=Math.min(250,p.rtt)),d.send({t:"pong",c:p.c,s:Date.now()});break;case"hello":d.name=gu(p.name,d.name),Oi.includes(p.skin)&&(d.skin=p.skin);break;case"rename":{let g=gu(p.name,d.name);v?v.rename(d,g):d.name=g;break}case"create":v||o(gu(p.name,`${d.name}'s room`,20)).add(d);break;case"join":if(!v){let g=e.get(String(p.id));(!g||!g.add(d))&&d.send({t:"error",key:"err.roomFull"})}break;case"leave":v&&(v.remove(d),d.send({t:"left"}),a.roomsChanged());break;case"ready":v?.setReady(d,p.ready);break;case"skin":v?v.setSkin(d,p.skin):Oi.includes(p.skin)&&(d.skin=p.skin);break;case"map":v?.setMap(d,p.id);break;case"chat":v?.chat(d,p.text);break;case"addBot":v?.addBot();break;case"removeBot":v?.removeBot();break;case"state":v?.onState(d,p);break;case"shoot":v?.onShoot(d,p);break;case"slap":v?.onSlap(d,p);break;case"ultra":v?.onUltra(d);break;case"fell":v?.onFell(d);break;default:break}}let c=Date.now();function h(){let d=Date.now(),f=Math.min(.1,(d-c)/1e3);c=d;for(let p of e.values())try{p.tick(d,f)}catch(v){console.error("\uBC29 \uCC98\uB9AC \uC624\uB958",p.id,v)}}let u=t?setInterval(h,pu):0;return{rooms:e,tick:h,connect(d){let f=new xu(a.nextId(),"Random NPC","minsu",d);return i.add(f),f.send({t:"welcome",id:f.id,rooms:[...e.values()].map(p=>p.summary()),tickHz:30}),{message:p=>l(f,p),close(){i.delete(f)&&(f.room?.remove(f),a.roomsChanged())}}},stop(){clearInterval(u)}}}var xu,Ep=En(()=>{mu();cu();Ki();Mc();xu=class extends Br{constructor(t,e,i,s){super(t,e,i),this.rawSend=s}send(t){this.sendRaw(JSON.stringify(t))}sendRaw(t){this.rawSend(t)}}});Ki();Ts();var hi=(n,t)=>n+Math.random()*(t-n),so=class{constructor(){if(this.ctx=null,this.volume=.8,this.muted=!1,this.holds=new Set,this.music=null,this.ttsOn="speechSynthesis"in window,this.voices=[],this.ttsOn){let t=()=>{this.voices=speechSynthesis.getVoices()};t(),speechSynthesis.addEventListener?.("voiceschanged",t)}}unlock(){if(!this.ctx){let t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.silent?0:this.volume;let e=this.ctx.createDynamicsCompressor();e.threshold.value=-10,e.ratio.value=6,this.master.connect(e),e.connect(this.ctx.destination),this.musicBus=this.ctx.createGain(),this.musicBus.gain.value=.32,this.musicBus.connect(this.master);let i=this.ctx.sampleRate*2;this.noiseBuf=this.ctx.createBuffer(1,i,this.ctx.sampleRate);let s=this.noiseBuf.getChannelData(0);for(let a=0;a<i;a++)s[a]=Math.random()*2-1;this.crunch=this.ctx.createWaveShaper();let r=new Float32Array(1024);for(let a=0;a<1024;a++){let o=a/512-1;r[a]=Math.tanh(o*6)}this.crunch.curve=r,this.crunch.connect(this.master)}this.ctx.state==="suspended"&&this.ctx.resume()}setVolume(t){this.volume=t,this.applyGain()}toggleMute(){return this.muted=!this.muted,this.applyGain(),this.muted}setHold(t,e){e?this.holds.add(t):this.holds.delete(t),this.applyGain()}get silent(){return this.muted||this.holds.size>0}applyGain(){this.master&&(this.master.gain.value=this.silent?0:this.volume),this.silent&&this.ttsOn&&speechSynthesis.cancel()}get ready(){return!!this.ctx&&this.ctx.state==="running"}env(t,e,i,s,r){t.gain.setValueAtTime(1e-4,e),t.gain.exponentialRampToValueAtTime(Math.max(s,2e-4),e+i),t.gain.exponentialRampToValueAtTime(1e-4,e+i+r)}osc(t,e,i,s,r,{at:a=0,out:o,a:l=.005}={}){let c=this.ctx.currentTime+a,h=this.ctx.createOscillator(),u=this.ctx.createGain();return h.type=t,h.frequency.setValueAtTime(e,c),i!==e&&h.frequency.exponentialRampToValueAtTime(Math.max(i,1),c+s),this.env(u,c,l,r,s),h.connect(u),u.connect(o??this.master),h.start(c),h.stop(c+s+l+.05),h}noise(t,e,{at:i=0,type:s="bandpass",f0:r=1e3,f1:a,q:o=1,out:l,a:c=.002}={}){let h=this.ctx.currentTime+i,u=this.ctx.createBufferSource();u.buffer=this.noiseBuf,u.loop=!0;let d=this.ctx.createBiquadFilter();d.type=s,d.Q.value=o,d.frequency.setValueAtTime(r,h),a&&d.frequency.exponentialRampToValueAtTime(a,h+t);let f=this.ctx.createGain();this.env(f,h,c,e,t),u.connect(d),d.connect(f),f.connect(l??this.master),u.start(h,Math.random()),u.stop(h+t+c+.05)}fart(t=hi(.14,.24),e=hi(62,105),i=.5){if(!this.ready)return;let s=this.ctx,r=s.currentTime,a=s.createOscillator();a.type="sawtooth",a.frequency.setValueAtTime(e*1.35,r),a.frequency.exponentialRampToValueAtTime(e*.7,r+t);let o=s.createOscillator();o.type="square",o.frequency.setValueAtTime(hi(24,42),r),o.frequency.linearRampToValueAtTime(hi(14,30),r+t);let l=s.createGain();l.gain.value=.45;let c=s.createGain();c.gain.value=.55,o.connect(l),l.connect(c.gain);let h=s.createBiquadFilter();h.type="lowpass",h.frequency.value=hi(420,720),h.Q.value=7;let u=s.createGain();this.env(u,r,.012,i,t),a.connect(c),c.connect(h),h.connect(u),u.connect(this.master),a.start(r),o.start(r),a.stop(r+t+.1),o.stop(r+t+.1),this.noise(t*.6,i*.18,{f0:300,q:2})}bigFart(){this.fart(1.15,58,.8)}vineBoom(){this.ready&&(this.osc("sine",150,38,1.1,1,{out:this.crunch}),this.osc("triangle",80,30,1.3,.7),this.noise(.09,.8,{type:"lowpass",f0:2400,q:.5}),[.17,.34,.51].forEach((t,e)=>this.osc("sine",90,34,.5,.33/(e+1),{at:t})))}airhorn(){this.ready&&[[0,.12],[.16,.12],[.32,.5]].forEach(([t,e])=>{[466,469,702,932].forEach((i,s)=>{this.osc("sawtooth",i,i*.995,e,s===3?.08:.17,{at:t,a:.01,out:this.crunch})})})}metalPipe(){if(!this.ready)return;let t=(e,i)=>{[523,1394,2377,3611,5120].forEach((s,r)=>{this.osc("sine",s,s*.992,1.3/(r*.5+1),.3*i/(r+1),{at:e,a:.001})}),this.noise(.04,.5*i,{at:e,f0:4e3,q:1})};t(0,1),t(.26,.5),t(.42,.28),t(.53,.14)}bonk(){this.ready&&(this.osc("triangle",620,180,.13,.7,{a:.001}),this.noise(.05,.4,{f0:1600}))}slap(){this.ready&&(this.noise(.09,1,{type:"highpass",f0:1400,q:.3,a:.001}),this.noise(.05,.8,{f0:3e3,q:.8,a:.001,at:.008}),this.osc("sine",210,70,.1,.8,{a:.001}))}whiff(){this.ready&&this.noise(.2,.35,{f0:600,f1:2200,q:1.5,a:.04})}boing(t=!1){if(!this.ready)return;let e=this.ctx,i=e.currentTime,s=t?.75:.45,r=e.createOscillator();r.type="sine",r.frequency.setValueAtTime(t?130:200,i),r.frequency.exponentialRampToValueAtTime(t?780:950,i+s*.42),r.frequency.exponentialRampToValueAtTime(t?300:430,i+s);let a=e.createOscillator();a.frequency.value=19;let o=e.createGain();o.gain.value=90,a.connect(o),o.connect(r.frequency);let l=e.createGain();this.env(l,i,.01,.5,s),r.connect(l),l.connect(this.master),r.start(i),a.start(i),r.stop(i+s+.1),a.stop(i+s+.1)}squeak(){if(!this.ready)return;let t=hi(1050,1500);this.osc("sine",t,t*1.5,.07,.09),this.osc("sine",t*1.45,t,.06,.07,{at:.06})}quack(){if(!this.ready)return;let t=this.ctx,e=t.currentTime,i=t.createBiquadFilter();i.type="bandpass",i.frequency.value=1150,i.Q.value=4;let s=t.createGain();this.env(s,e,.01,.9,.17);let r=t.createOscillator();r.type="sawtooth",r.frequency.setValueAtTime(430,e),r.frequency.exponentialRampToValueAtTime(235,e+.17),r.connect(i),i.connect(s),s.connect(this.master),r.start(e),r.stop(e+.25)}bark(){this.ready&&[0,.17].forEach(t=>{let e=this.ctx.currentTime+t,i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=900,i.Q.value=2.5;let s=this.ctx.createGain();this.env(s,e,.006,.8,.1);let r=this.ctx.createOscillator();r.type="sawtooth",r.frequency.setValueAtTime(hi(540,680),e),r.frequency.exponentialRampToValueAtTime(190,e+.1),r.connect(i),i.connect(s),s.connect(this.master),r.start(e),r.stop(e+.2)})}planeFlyby(){if(!this.ready)return;let t=this.ctx,e=t.currentTime,i=t.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(170,e),i.frequency.linearRampToValueAtTime(240,e+1.6),i.frequency.linearRampToValueAtTime(95,e+3.4);let s=t.createBiquadFilter();s.type="lowpass",s.frequency.value=900;let r=t.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.exponentialRampToValueAtTime(.35,e+1.5),r.gain.exponentialRampToValueAtTime(1e-4,e+3.4),i.connect(s),s.connect(r),r.connect(this.master),i.start(e),i.stop(e+3.5)}explosion(){this.ready&&(this.noise(.7,1,{type:"lowpass",f0:1800,f1:90,q:.6,out:this.crunch}),this.osc("sine",120,28,.7,.9))}sadTrombone(){if(!this.ready)return;let t=[[311,0,.3],[293,.32,.3],[277,.64,.3],[261,.96,1]];for(let[e,i,s]of t){let r=this.ctx.currentTime+i,a=this.ctx.createOscillator();if(a.type="sawtooth",a.frequency.setValueAtTime(e,r),s>.5){let c=this.ctx.createOscillator();c.frequency.value=5.2;let h=this.ctx.createGain();h.gain.value=9,c.connect(h),h.connect(a.frequency),c.start(r),c.stop(r+s)}let o=this.ctx.createBiquadFilter();o.type="lowpass",o.Q.value=5,o.frequency.setValueAtTime(500,r),o.frequency.linearRampToValueAtTime(1300,r+.1),o.frequency.linearRampToValueAtTime(600,r+s);let l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,r),l.gain.exponentialRampToValueAtTime(.4,r+.03),l.gain.setValueAtTime(.4,r+s-.05),l.gain.exponentialRampToValueAtTime(1e-4,r+s),a.connect(o),o.connect(l),l.connect(this.master),a.start(r),a.stop(r+s+.02)}}bing(){this.ready&&(this.osc("sine",1318,1318,.5,.25),this.osc("sine",1975,1975,.7,.2,{at:.11}))}bong(){this.ready&&(this.osc("sine",196,190,1.3,.7,{a:.003}),this.osc("sine",523,515,.8,.25,{a:.003}),this.osc("sine",1041,1030,.4,.12,{a:.003}))}tick(){this.ready&&this.osc("square",1900,1500,.035,.18,{a:.001})}click(){this.ready&&this.osc("square",760,500,.03,.12,{a:.001})}dry(){this.ready&&this.osc("square",300,240,.05,.14,{a:.001})}dash(){this.ready&&this.noise(.2,.55,{f0:400,f1:3e3,q:1,a:.01})}land(){this.ready&&(this.osc("sine",130,50,.13,.5),this.noise(.05,.2,{type:"lowpass",f0:900}))}reload(){this.ready&&([0,.15,.3].forEach(t=>this.noise(.03,.4,{at:t,f0:3200,q:3})),this.osc("sawtooth",300,840,.3,.13,{at:.5}))}chomp(){this.ready&&[0,.11,.22].forEach(t=>this.noise(.07,.45,{at:t,type:"lowpass",f0:1800,q:3}))}sparkle(){this.ready&&[1568,2093,2637,3136,4186].forEach((t,e)=>this.osc("sine",t,t,.32,.13,{at:e*.06}))}shoot(t,e=!1,i=!1){if(!this.ready)return;let s=e?.55:1;if(t==="laser")this.laser();else if(t==="fart")this.fart(void 0,i?hi(110,160):void 0,.5*s);else if(t==="six7"){this.noise(.08,.95*s,{f0:2200,q:.6,a:.001}),this.osc("square",130,62,.16,.6*s,{a:.002,out:this.crunch});let r=this._six=!this._six;this.osc("sawtooth",r?660:494,r?620:440,.1,.16*s,{at:.03})}else t==="boom"&&(this.vineBoom(),this.noise(.14,.9*s,{type:"lowpass",f0:4e3,f1:500,a:.001}))}laser(){this.ready&&(this.osc("sawtooth",1700,900,.09,.14,{a:.002}),this.osc("square",2600,2100,.05,.05,{a:.002}))}meow(){if(!this.ready)return;let t=this.ctx,e=t.currentTime,i=t.createBiquadFilter();i.type="bandpass",i.Q.value=3,i.frequency.setValueAtTime(700,e),i.frequency.linearRampToValueAtTime(1900,e+.14),i.frequency.linearRampToValueAtTime(800,e+.42);let s=t.createGain();this.env(s,e,.03,.9,.42);let r=t.createOscillator();r.type="sawtooth",r.frequency.setValueAtTime(520,e),r.frequency.linearRampToValueAtTime(880,e+.15),r.frequency.linearRampToValueAtTime(430,e+.45),r.connect(i),i.connect(s),s.connect(this.master),r.start(e),r.stop(e+.5)}scratch(){this.ready&&this.noise(.07,.5,{f0:hi(2500,4e3),f1:hi(700,1200),q:2,a:.002})}tungTung(){this.ready&&(this.osc("triangle",330,150,.14,1,{a:.001,out:this.crunch}),this.noise(.03,.6,{f0:1300,q:3,a:.001}),this.osc("sine",95,45,.3,.8))}flush(t=5e3){if(!this.ready)return;let e=t/1e3;this.noise(e,.65,{f0:2600,f1:240,q:1.2,a:.25}),this.noise(e*.7,.3,{type:"lowpass",f0:500,f1:140,q:3,a:.3});for(let i=0;i<9;i++)this.osc("sine",hi(300,700),hi(700,1500),.07,.13,{at:hi(.2,e)})}nukeWind(t=2600){if(!this.ready)return;let e=t/1e3,i=this.ctx,s=i.currentTime,r=i.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(500,s),r.frequency.exponentialRampToValueAtTime(4200,s+e);let a=i.createGain();a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.42,s+e*.96),a.gain.setValueAtTime(1e-4,s+e),r.connect(a),a.connect(this.master);let o=i.createOscillator();o.frequency.value=11;let l=i.createGain();l.gain.value=.12,o.connect(l),l.connect(a.gain),o.start(s),o.stop(s+e);for(let c of[110,111.5,165,220.7,330]){let h=i.createOscillator();h.type="sawtooth",h.frequency.setValueAtTime(c,s),h.frequency.exponentialRampToValueAtTime(c*2.6,s+e),h.connect(r),h.start(s),h.stop(s+e)}}nukeBoom(){this.ready&&(this.noise(5.5,1,{type:"lowpass",f0:2400,f1:45,q:.5,a:.03,out:this.crunch}),this.osc("sine",90,19,5.5,1,{out:this.crunch}),this.osc("triangle",55,22,6.5,.8))}eyePop(t){this.boing(t),t&&this.ready&&this.osc("sine",1400,300,.05,.5,{a:.001,at:.02})}playMusic(t){if(!this.ctx||this.music?.name===t||(this.stopMusic(),!t))return;let e=am[t];if(!e)return;let i=this.ctx.createGain();i.gain.setValueAtTime(1e-4,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(e.gain??1,this.ctx.currentTime+.15),i.connect(this.musicBus);let s={name:t,bus:i,step:0,next:this.ctx.currentTime+.08,timer:0},r=60/e.bpm/4;s.timer=setInterval(()=>{for(;s.next<this.ctx.currentTime+.14;)e.play(this,s.step,s.next,i,r),s.step++,s.next+=r},40),this.music=s}stopMusic(){if(!this.music)return;let{timer:t,bus:e}=this.music;clearInterval(t);let i=this.ctx.currentTime;e.gain.cancelScheduledValues(i),e.gain.setValueAtTime(Math.max(e.gain.value,2e-4),i),e.gain.exponentialRampToValueAtTime(1e-4,i+.18),setTimeout(()=>e.disconnect(),300),this.music=null}note(t,e,i,s,r,a,o){let l=this.ctx.createOscillator(),c=this.ctx.createGain();l.type=t,l.frequency.setValueAtTime(e,i),o&&l.frequency.exponentialRampToValueAtTime(o,i+s),c.gain.setValueAtTime(1e-4,i),c.gain.exponentialRampToValueAtTime(r,i+.004),c.gain.exponentialRampToValueAtTime(1e-4,i+s),l.connect(c),c.connect(a),l.start(i),l.stop(i+s+.02)}hat(t,e,i){let s=this.ctx.createBufferSource();s.buffer=this.noiseBuf;let r=this.ctx.createBiquadFilter();r.type="highpass",r.frequency.value=7e3;let a=this.ctx.createGain();a.gain.setValueAtTime(e,t),a.gain.exponentialRampToValueAtTime(1e-4,t+.05),s.connect(r),r.connect(a),a.connect(i),s.start(t,Math.random()),s.stop(t+.06)}cowbell(t,e,i,s){this.note("square",t,e,.16,i,s),this.note("square",t*1.48,e,.16,i*.7,s)}say(t,{lang:e="en-US",pitch:i=1,rate:s=1,volume:r=1,interrupt:a=!0}={}){if(!(!this.ttsOn||this.silent))try{a&&speechSynthesis.cancel();let o=new SpeechSynthesisUtterance(t);o.lang=e,o.pitch=i,o.rate=s,o.volume=Math.min(1,r*this.volume*1.25);let l=this.voices.find(c=>c.lang===e)??this.voices.find(c=>c.lang.startsWith(e.slice(0,2)));l&&(o.voice=l),speechSynthesis.speak(o)}catch{}}sayMeme(t){let e=/[가-힣]/.test(t);this.say(t,{lang:e?"ko-KR":"en-US",pitch:Math.random()<.5?hi(.1,.5):hi(1.5,2),rate:hi(.75,1.3)})}},Yr=n=>440*Math.pow(2,(n-69)/12),am={lobby:{bpm:112,gain:.9,play(n,t,e,i,s){let r=[72,0,76,79,0,76,72,0,74,0,77,81,0,77,74,0,71,0,74,79,0,74,71,0,72,76,79,84,79,76,72,0],a=[48,48,55,55,50,50,57,57],o=r[t%r.length];o&&n.note("triangle",Yr(o),e,s*1.4,.26,i),t%4===0&&n.note("sine",Yr(a[t/4%8]-12),e,s*2.6,.5,i),t%4===2&&n.hat(e,.1,i)}},battle:{bpm:168,gain:.75,play(n,t,e,i,s){let r=[40,40,52,40,40,52,40,43,45,45,57,45,43,43,55,42],a=[76,0,0,79,0,0,83,0,82,0,79,0,76,0,74,0];n.note("sawtooth",Yr(r[t%16]),e,s*.85,.24,i),t%64>=32&&a[t%16]&&n.note("square",Yr(a[t%16]),e,s*.8,.09,i),t%4===0&&n.note("sine",150,e,.1,.8,i,45),t%8===4&&n.hat(e,.32,i),t%2===1&&n.hat(e,.08,i)}},phonk:{bpm:132,gain:1.3,play(n,t,e,i,s){let a=[62,0,62,0,65,0,62,0,69,0,68,0,65,0,62,60][t%16];a&&n.cowbell(Yr(a+12),e,.1,i),(t%16===0||t%16===6||t%16===10)&&n.note("sine",72,e,.42,1,i,38),t%8===4&&(n.hat(e,.5,i),n.note("square",210,e,.07,.25,i,90)),t%2===0&&n.hat(e,.12,i)}}};Ki();var Zu={"home.tagline":"Up to 4 players. Eyeball-popping FPS.","home.nickname":"Nickname","home.nickPh":"Random NPC","home.roomPh":"Room name (whatever)","home.create":"Create room","home.joinPh":"Invite code from a friend","home.join":"Join by code","home.rooms":"Open rooms","home.empty":"No rooms yet. Be the first sigma.","home.finding":"Looking for server...",roomDefault:"{name}'s room","conn.host":"Your browser is the server","conn.guest":"Connected to host","conn.server":"Connected to server","conn.lost":"Server lost. Reconnecting...","conn.hostLeft":"Host left. Game over.","conn.badCode":"Can't join with that code. The host must keep their window open.","room.title":"Lobby","room.leave":"Leave","room.renamePh":"Nickname","room.rename":"Rename","room.ready":"Ready \u{1F5FF}","room.play":"PLAY NOW \u{1F5FF}","room.unready":"Cancel ready","room.waiting":"Ready (waiting for players)","room.invite":"\u{1F517} Invite","room.inviteTitle":"Copy invite link","room.map":"Map","room.character":"Your character","room.chat":"Chat","room.chatPh":"Say something","room.send":"Send","room.controls":"Controls","room.me":" (you)","room.wins":"{n}W","room.isReady":"Ready","room.notReady":"Not ready","room.empty":"Empty slot","room.emptySub":"Friend or bot","room.random":"Random","room.randomDesc":"Any map, decided at start","room.fighting":"In a match","room.ultra":"Ultimate: {name}. {desc}","room.ghost":"Waiting...",system:"System","sys.fled":"{name} ran away lol","sys.left":"{name} left. Scared?","sys.map":"{name} changed the map to {map}","sys.rename":"{old} is now {name}","sys.again":"Press Ready to go again","err.roomFull":"Can't join. Room is full or already playing.","toast.addressInvite":"Send the link in your address bar to invite friends","toast.noRoom":"No room yet","toast.inviteFail":"Couldn't reach the invite server. Bots still work.","toast.inviteWait":"Getting your invite code. One sec.","toast.copied":"Invite link copied (code {code})","toast.copiedPlain":"Address copied","toast.muted":"Muted. But the sound is the whole game.","toast.unmuted":"Sound on","help.1":"<b>WASD</b> move \xB7 <b>Space</b> jump (double) \xB7 <b>Shift</b> dash","help.2":"<b>Left click</b> fire \xB7 <b>Right click</b> zoom \xB7 <b>R</b> reload \xB7 <b>1 2 3</b> weapons","help.3":"<b>F</b> slap (67 damage, sends them flying)","help.4":"<b>Hold G</b> aura farm \xB7 <b>Hold T</b> 6-7","help.5":"Fill aura to 6,767 and press <b>E</b> for your ultimate","help.6":"2-4 player free-for-all. Everyone ready to start. First to 7 kills.","keys.g":"<kbd>G</kbd> hold: aura farm","keys.t":"<kbd>T</kbd> hold: 6-7","keys.f":"<kbd>F</kbd> slap","keys.shift":"<kbd>Shift</kbd> dash","keys.space":"<kbd>Space</kbd>\xD72 double jump","keys.num":"<kbd>1 2 3</kbd> weapons","hud.first7":"First to 7","hud.sanity":"SANITY {n}","hud.ultraReady":"Press E: {name}","hud.respawn":"Respawning... enjoy their aura meanwhile","hud.lock":"Click to fight","hud.lockSub":"Esc releases the mouse","hud.quote":"Tactical nuke incoming. Touch grass while you still can","hud.nukeOther":"{name} launched a nuke. Get behind a wall!","hud.nukeMine":"Nuke launched. You are radiation-proof.","hud.deathFall":"Fell into Ohio","hud.deathBy":"Eyes removed by {name} with {weapon}","hud.go":"SHOOT!!","shout.free":"Free kill","shout.matchPoint":"6:6 match point","shout.cat":"Cat on your face!! Press F!","shout.charm":"{name} rizzed you up...","shout.slow":"{name} is too chill. Everything slows down...","shout.flee":"{name}: {ultra}. RUN","shout.chicken":"\u{1F357} Delicious","shout.farming":"Aura farming...","shout.pad":"BOING","fx.slap":"SLAP!!","fx.tung":"TUNG!","name.left":"Someone who left","name.gravity":"Gravity","name.plane":"\u{1F436} Dog fighter","result.draw":"Draw?? Both NPCs","result.win":"YOU WIN","result.lose":"YOU LOSE","result.drawSub":"DRAW","reason.kills":"{n} kills","reason.time":"Time up","reason.ragequit":"Everyone ran away lol","result.sixSeven":"6 : 7 SIX SEVEN NO WAY","stat.kills":"Kills","stat.deaths":"Deaths","stat.acc":"Accuracy","stat.heads":"Headshots","stat.damage":"Damage dealt","stat.aura":"Aura earned","stat.wins":"Total wins","result.back":"Back to lobby in {s}s","aura.sixSeven":"6-7","aura.orb":"Aura crystal","aura.head":"Headshot","aura.farmHit":"Hit while farming","aura.fall":"Fell into Ohio","aura.death":"Died","aura.kill":"Kill","tts.laser":"eye laser","tts.cat":"cat attack","tts.meow":"meow","shout.flipped":"CONTROLS FLIPPED!!","skin.minsu":"Minsu","skin.sigma":"Sigma","skin.cat":"Smug Cat","skin.cone":"Ohio Local","skin.toilet":"Toilet Man","skin.streamer":"Bark Streamer","skin.tung":"Tung Sahur","skin.hero":"Mega Bro","skin.rizz":"Rizz King","skin.chill":"Chill Dude","ultra.minsu":"Eye Laser","ultra.sigma":"Sigma Mode","ultra.cat":"Cat Ambush","ultra.cone":"Nuke Mode","ultra.toilet":"Mega Flush","ultra.streamer":"Bark Stream","ultra.tung":"Sahur Time","ultra.hero":"Mega Punch","ultra.rizz":"Rizz Charm","ultra.chill":"Too Chill","ultraDesc.minsu":"Eye lasers that pierce walls and bodies for 6.7s. You see enemies through walls.","ultraDesc.sigma":"1.4x speed, 1.67x damage, no knockback. Every kill heals and extends it.","ultraDesc.cat":"Latch onto a face, steal aura and flip their controls. Victim presses F to shake you off.","ultraDesc.cone":"Nuke where you aim. Half damage behind walls. Leaves a radiation zone.","ultraDesc.toilet":"Suck everyone in for 5s, then launch them all with a geyser.","ultraDesc.streamer":"Run fast and bark 6 times. The last one is a shout in every direction.","ultraDesc.tung":"7 growing shockwaves. The 7th SAHUR is the biggest.","ultraDesc.hero":"Unstoppable flight through 3 enemies. Each punch hits harder and splashes nearby.","ultraDesc.rizz":"Enemies walk to you and cannot attack. Up close you drain their aura and health.","ultraDesc.chill":"Immune for 5s and healing. Bullets bounce back. Nearby enemies slow down.","weapon.fart":"Fart SMG","weapon.six7":"67 Revolver","weapon.boom":"Vine Boom Shotgun","weapon.laser":"Eye Laser","label.fart":"\u{1F4A8} Fart","label.six7":"\u{1F90C} 67","label.boom":"\u{1F4E2} Vine Boom","label.slap":"\u{1F590}\uFE0F Slap","label.bomb":"\u{1F436} Airstrike","label.fall":"\u{1F573}\uFE0F Fall","label.rizz":"\u{1F618} Rizz","label.reflect":"\u{1F60C} Too Chill","label.claw":"\u{1F43E} Claws","label.nuke":"\u2622\uFE0F Nuke","label.laser":"\u{1F441}\uFE0F Laser","label.flush":"\u{1F6BD} Flush","label.bark":"\u{1F399}\uFE0F Bark","label.hero":"\u{1F9B8} Punch","label.tung":"\u{1F941} Sahur","event.dogfight":"\u{1F436}\u2708\uFE0F AIR DOG SQUADRON STRIKE!!","event.sixseven":"6\uFE0F\u20E37\uFE0F\u20E3 67 TIME: all damage is 67","event.bighead":"\u{1F5FF} BIG HEAD ERA: huge headshots","event.moon":"\u{1F319} Ohio low gravity","eventSay.dogfight":"air dog raid","eventSay.sixseven":"six seven, six seven","eventSay.bighead":"big head era","eventSay.moon":"only in ohio","map.ohio":"Ohio Pit","mapDesc.ohio":"Center pit + floating prime spot","map.roof":"Sigma Rooftop","mapDesc.roof":"No walls. Get pushed, fall.","map.office":"Backrooms Office","mapDesc.office":"Tight halls + a second floor on the roof","map.boat":"Aura Boats","mapDesc.boat":"Three boats. Fall in the water and you are done.","map.restroom":"Giant Restroom","mapDesc.restroom":"Stall hide and seek + king-size toilets","map.arena":"67 Colosseum","mapDesc.arena":"Pillars, a pyramid, upper seats"},om={"home.tagline":"\uCD5C\uB300 4\uC778 \uB208\uAE54 \uC801\uCD9C FPS","home.nickname":"\uB2C9\uB124\uC784","home.nickPh":"\uC775\uBA85\uC758 NPC","home.roomPh":"\uBC29 \uC774\uB984 (\uB300\uCDA9)","home.create":"\uBC29 \uB9CC\uB4E4\uAE30","home.joinPh":"\uCE5C\uAD6C\uD55C\uD14C \uBC1B\uC740 \uCD08\uB300 \uCF54\uB4DC","home.join":"\uCF54\uB4DC\uB85C \uCC38\uAC00","home.rooms":"\uC5F4\uB9B0 \uBC29","home.empty":"\uBC29 \uC5C6\uC74C. \uB2C8\uAC00 \uCCAB \uBC88\uC9F8 \uC2DC\uADF8\uB9C8\uAC00 \uB3FC\uB77C.","home.finding":"\uC11C\uBC84 \uCC3E\uB294 \uC911...",roomDefault:"{name}\uC758 \uBC29","conn.host":"\uC774 \uBE0C\uB77C\uC6B0\uC800\uAC00 \uC11C\uBC84","conn.guest":"\uBC29\uC7A5\uC5D0\uAC8C \uC5F0\uACB0\uB428","conn.server":"\uC11C\uBC84 \uC5F0\uACB0\uB428","conn.lost":"\uC11C\uBC84 \uB04A\uAE40. \uB2E4\uC2DC \uBD99\uB294 \uC911...","conn.hostLeft":"\uBC29\uC7A5\uC774 \uB098\uAC00\uC11C \uB05D\uB0A8","conn.badCode":"\uADF8 \uCD08\uB300 \uCF54\uB4DC\uB85C \uBABB \uB4E4\uC5B4\uAC10. \uBC29\uC7A5 \uCC3D\uC774 \uCF1C\uC838 \uC788\uC5B4\uC57C \uD568","room.title":"\uB300\uAE30\uC2E4","room.leave":"\uB098\uAC00\uAE30","room.renamePh":"\uB2C9\uB124\uC784","room.rename":"\uB2C9\uBCC0","room.ready":"\uC900\uBE44 \uC644\uB8CC \u{1F5FF}","room.play":"\uBC14\uB85C \uC2DC\uC791 \u{1F5FF}","room.unready":"\uC900\uBE44 \uCDE8\uC18C","room.waiting":"\uC900\uBE44 (\uC0C1\uB300 \uAE30\uB2E4\uB9AC\uB294 \uC911)","room.invite":"\u{1F517} \uCD08\uB300","room.inviteTitle":"\uCD08\uB300 \uB9C1\uD06C \uBCF5\uC0AC","room.map":"\uB9F5","room.character":"\uB0B4 \uCE90\uB9AD\uD130","room.chat":"\uCC44\uD305","room.chatPh":"\uD55C\uB9C8\uB514","room.send":"\uC804\uC1A1","room.controls":"\uC870\uC791","room.me":" (\uB098)","room.wins":"{n}\uC2B9","room.isReady":"\uC900\uBE44 \uC644\uB8CC","room.notReady":"\uC900\uBE44 \uC548 \uD568","room.empty":"\uBE48\uC790\uB9AC","room.emptySub":"\uCE5C\uAD6C \uB610\uB294 \uBD07","room.random":"\uB79C\uB364","room.randomDesc":"\uC2DC\uC791\uD560 \uB54C \uC544\uBB34 \uB9F5\uC774\uB098","room.fighting":"\uC2F8\uC6B0\uB294 \uC911","room.ultra":"\uAC01\uC131: {name}. {desc}","room.ghost":"\uC0C1\uB300 \uAD6C\uD568",system:"\uC2DC\uC2A4\uD15C","sys.fled":"{name} \uB3C4\uB9DD\uCE68 \u314B\u314B","sys.left":"{name} \uB098\uAC10. \uCAC4?","sys.map":"{name}: \uB9F5\uC744 {map}(\uC73C)\uB85C \uBC14\uAFC8","sys.rename":"{old} \u2192 {name} \uB2C9\uBCC0\uD568","sys.again":"\uD55C \uD310 \uB354 \uD558\uB824\uBA74 \uC900\uBE44 \uB20C\uB7EC\uB77C","err.roomFull":"\uADF8 \uBC29\uC740 \uBABB \uB4E4\uC5B4\uAC10. \uAF49 \uCC3C\uAC70\uB098 \uAC8C\uC784 \uC911\uC784.","toast.addressInvite":"\uC9C0\uAE08 \uC8FC\uC18C\uCC3D \uB9C1\uD06C\uB97C \uCE5C\uAD6C\uD55C\uD14C \uBCF4\uB0B4\uBA74 \uC774 \uBC29\uC73C\uB85C \uB4E4\uC5B4\uC634","toast.noRoom":"\uBC29\uC774 \uC544\uC9C1 \uC5C6\uC74C","toast.inviteFail":"\uCD08\uB300 \uC11C\uBC84 \uC5F0\uACB0 \uC2E4\uD328. \uBD07\uC804\uC740 \uB428","toast.inviteWait":"\uCD08\uB300 \uCF54\uB4DC \uBC1B\uB294 \uC911. \uC7A0\uAE50\uB9CC","toast.copied":"\uCD08\uB300 \uB9C1\uD06C \uBCF5\uC0AC\uD568 (\uCF54\uB4DC {code})","toast.copiedPlain":"\uC8FC\uC18C \uBCF5\uC0AC\uD568","toast.muted":"\uC74C\uC18C\uAC70. \uADFC\uB370 \uC774 \uAC8C\uC784\uC740 \uC18C\uB9AC\uAC00 \uBCF8\uCCB4\uC784","toast.unmuted":"\uC18C\uB9AC \uCF2C","help.1":"<b>WASD</b> \uC774\uB3D9 \xB7 <b>Space</b> \uC810\uD504(2\uB2E8) \xB7 <b>Shift</b> \uB300\uC2DC","help.2":"<b>\uC88C\uD074\uB9AD</b> \uBC1C\uC0AC \xB7 <b>\uC6B0\uD074\uB9AD</b> \uC90C \xB7 <b>R</b> \uC7A5\uC804 \xB7 <b>1 2 3</b> \uBB34\uAE30","help.3":"<b>F</b> \uC2F8\uB300\uAE30 (67 \uB370\uBBF8\uC9C0, \uB0A0\uB824\uBC84\uB9BC)","help.4":"<b>G \uAFB9</b> \uC544\uC6B0\uB77C \uD30C\uBC0D \xB7 <b>T \uAFB9</b> 6-7","help.5":"\uC544\uC6B0\uB77C 6,767 \uCC44\uC6B0\uACE0 <b>E</b> = \uCE90\uB9AD\uD130\uBCC4 \uAC01\uC131","help.6":"2~4\uBA85 \uAC1C\uC778\uC804. \uC804\uC6D0 \uC900\uBE44\uD558\uBA74 \uC2DC\uC791, \uBA3C\uC800 7\uD0AC","keys.g":"<kbd>G</kbd> \uAFB9: \uC544\uC6B0\uB77C \uD30C\uBC0D","keys.t":"<kbd>T</kbd> \uAFB9: 6-7","keys.f":"<kbd>F</kbd> \uC2F8\uB300\uAE30","keys.shift":"<kbd>Shift</kbd> \uB300\uC2DC","keys.space":"<kbd>Space</kbd>\xD72 \uC774\uB2E8\uC810\uD504","keys.num":"<kbd>1 2 3</kbd> \uBB34\uAE30","hud.first7":"\uBA3C\uC800 7\uD0AC","hud.sanity":"\uC815\uC2E0\uB825 {n}","hud.ultraReady":"E \uB20C\uB7EC\uC11C {name}","hud.respawn":"\uBD80\uD65C \uC911... \uADF8\uB3D9\uC548 \uC0C1\uB300 \uC544\uC6B0\uB77C \uAC10\uC0C1\uD558\uC148","hud.lock":"\uD074\uB9AD\uD574\uC11C \uCC38\uC804","hud.lockSub":"Esc \uB204\uB974\uBA74 \uB9C8\uC6B0\uC2A4 \uD480\uB9BC","hud.quote":"\uC804\uC220\uD575 \uD22C\uD558. \uC544\uC9C1 \uC794\uB514 \uB9CC\uC9C8 \uC218 \uC788\uC744 \uB54C \uB9CC\uC838\uB77C","hud.nukeOther":"{name}: \uD575 \uC408\uB2E4. \uBCBD \uB4A4\uB85C \uC228\uC5B4\uB77C","hud.nukeMine":"\uD575 \uBC1C\uC0AC. \uB10C \uBC29\uC0AC\uB2A5 \uBA74\uC5ED\uC784","hud.deathFall":"\uC624\uD558\uC774\uC624\uB85C \uCD94\uB77D\uD568","hud.deathBy":"{name}\uC758 {weapon}\uC5D0 \uB208\uAE54 \uBF51\uD798","hud.go":"\uC3F4\uB77C!!","shout.free":"\uACF5\uC9DC \uD0AC \uAC1C\uAFC0","shout.matchPoint":"6:6 \uB9E4\uCE58\uD3EC\uC778\uD2B8","shout.cat":"\uC5BC\uAD74\uC5D0 \uACE0\uC591\uC774 \uBD99\uC74C!! F\uB85C \uB5BC\uC5B4\uB0B4","shout.charm":"{name}\uD55C\uD14C \uBC18\uD568... \uBAB8\uC774 \uBA4B\uB300\uB85C \uAC10","shout.slow":"{name} \uB108\uBB34 \uCE60\uD568. \uC138\uC0C1\uC774 \uB290\uB824\uC9D0...","shout.flee":"{name}: {ultra} \uB3C4\uB9DD\uCCD0","shout.chicken":"\u{1F357} \uB9DB\uB3C4\uB9AC","shout.farming":"\uC544\uC6B0\uB77C \uD30C\uBC0D \uC911...","shout.pad":"\uBFCC\uC789","fx.slap":"\uCC30\uC2F9!!","fx.tung":"\uD241!","name.left":"\uB098\uAC04 \uC0AC\uB78C","name.gravity":"\uC911\uB825","name.plane":"\u{1F436} \uAC1C \uC804\uD22C\uAE30","result.draw":"\uBB34\uC2B9\uBD80?? \uB458 \uB2E4 NPC","result.win":"YOU WIN","result.lose":"YOU LOSE","result.drawSub":"DRAW","reason.kills":"{n}\uD0AC \uB2EC\uC131","reason.time":"\uC2DC\uAC04 \uB05D","reason.ragequit":"\uB2E4 \uB3C4\uB9DD\uAC10 \u314B\u314B","result.sixSeven":"6 : 7 SIX SEVEN \uC2E4\uD654\uB0D0","stat.kills":"\uD0AC","stat.deaths":"\uB370\uC2A4","stat.acc":"\uBA85\uC911\uB960","stat.heads":"\uD5E4\uB4DC\uC0F7","stat.damage":"\uC785\uD78C \uB370\uBBF8\uC9C0","stat.aura":"\uBC8C\uC5B4\uB4E4\uC778 \uC544\uC6B0\uB77C","stat.wins":"\uB204\uC801 \uC2B9\uC218","result.back":"{s}\uCD08 \uB4A4 \uB300\uAE30\uC2E4\uB85C \uBCF5\uADC0","aura.sixSeven":"6-7","aura.orb":"\uC544\uC6B0\uB77C \uACB0\uC815 \uD68D\uB4DD","aura.head":"\uD5E4\uB4DC\uC0F7","aura.farmHit":"\uD30C\uBC0D \uC911 \uCC98\uB9DE\uC74C","aura.fall":"\uC624\uD558\uC774\uC624 \uCD94\uB77D","aura.death":"\uC0AC\uB9DD","aura.kill":"\uD0AC","tts.laser":"\uB208\uAE54 \uB808\uC774\uC800","tts.cat":"\uB0E5\uB0E5 \uAE09\uC2B5","tts.meow":"\uB0E5","shout.flipped":"\uC870\uC791 \uB4A4\uC9D1\uD798!!","skin.minsu":"\uBBFC\uC218","skin.sigma":"\uC2DC\uADF8\uB9C8","skin.cat":"\uD0B9\uBC1B\uB294 \uACE0\uC591\uC774","skin.cone":"\uC624\uD558\uC774\uC624 \uC8FC\uBBFC","skin.toilet":"\uBCC0\uAE30\uB9E8","skin.streamer":"\uC9D6\uB294 \uC2A4\uD2B8\uB9AC\uBA38","skin.tung":"\uD241\uD241\uD241 \uC0AC\uD6C4\uB974","skin.hero":"\uBA54\uAC00\uBE0C\uB85C","skin.rizz":"\uB9AC\uC988\uC655","skin.chill":"\uCE60\uAC00\uC774","ultra.minsu":"\uB208\uAE54 \uB808\uC774\uC800","ultra.sigma":"\uC2DC\uADF8\uB9C8 \uAC01\uC131","ultra.cat":"\uB0E5\uB0E5 \uAE09\uC2B5","ultra.cone":"\uD575 \uBAA8\uB4DC","ultra.toilet":"\uB300\uBB3C\uB0B4\uB9BC","ultra.streamer":"\uC9D6\uAE30 \uBC29\uC1A1","ultra.tung":"\uC0AC\uD6C4\uB974 \uD0C0\uC784","ultra.hero":"\uBA54\uAC00 \uD380\uCE58","ultra.rizz":"\uB9AC\uC988 \uB9E4\uD639","ultra.chill":"\uC644\uC804 \uCE60\uD568","ultraDesc.minsu":"6.7\uCD08\uAC04 \uBCBD\uACFC \uBAB8\uC744 \uB6AB\uB294 \uB208\uAE54 \uB808\uC774\uC800. \uBCBD \uB4A4 \uC0C1\uB300\uB3C4 \uBCF4\uC784","ultraDesc.sigma":"\uC774\uB3D9 1.4\uBC30, \uB370\uBBF8\uC9C0 1.67\uBC30, \uC548 \uBC00\uB9BC. \uD0AC\uB9C8\uB2E4 \uD68C\uBCF5\uACFC \uC2DC\uAC04 \uC5F0\uC7A5","ultraDesc.cat":"\uC5BC\uAD74\uC5D0 \uBD99\uC5B4 \uC544\uC6B0\uB77C\uB97C \uD6D4\uCE58\uACE0 \uC870\uC791\uC744 \uB4A4\uC9D1\uC74C. \uB9DE\uB294 \uCABD\uC740 F\uB85C \uB5BC\uC5B4\uB0C4","ultraDesc.cone":"\uC870\uC900\uD55C \uACF3\uC5D0 \uD575. \uBCBD \uB4A4\uBA74 \uC808\uBC18. \uD130\uC9C4 \uC790\uB9AC\uC5D0 \uBC29\uC0AC\uB2A5 \uC9C0\uB300\uAC00 \uB0A8\uC74C","ultraDesc.toilet":"5\uCD08\uAC04 \uBE68\uC544\uB4E4\uC774\uACE0, \uB05D\uB0A0 \uB54C \uBB3C\uAE30\uB465\uC73C\uB85C \uC804\uBD80 \uB744\uC6C0","ultraDesc.streamer":"\uBE68\uB9AC \uB2EC\uB9AC\uBA70 6\uBC88 \uC9D6\uAE30. \uB9C8\uC9C0\uB9C9\uC740 \uC0AC\uBC29\uC73C\uB85C \uD130\uC9C0\uB294 \uC0E4\uC6B0\uD305","ultraDesc.tung":"\uC810\uC810 \uCEE4\uC9C0\uB294 \uCDA9\uACA9\uD30C 7\uBC88. 7\uBC88\uC9F8 \uC0AC\uD6C4\uB974\uAC00 \uC81C\uC77C \uD07C","ultraDesc.hero":"\uBB34\uC801 \uC0C1\uD0DC\uB85C \uC14B\uC744 \uAD00\uD1B5. \uB54C\uB9B4\uC218\uB85D \uC138\uC9C0\uACE0 \uC8FC\uBCC0\uAE4C\uC9C0 \uD130\uC9D0","ultraDesc.rizz":"\uC0C1\uB300\uAC00 \uAC78\uC5B4\uC624\uACE0 \uACF5\uACA9 \uBABB \uD568. \uAC00\uAE4C\uC774 \uC624\uBA74 \uC544\uC6B0\uB77C\uC640 \uCCB4\uB825\uC744 \uBE8F\uC74C","ultraDesc.chill":"5\uCD08\uAC04 \uBB34\uC801\uC5D0 \uCCB4\uB825 \uD68C\uBCF5. \uC3DC \uCD1D\uC54C\uC740 \uB418\uB3CC\uC544\uAC10. \uC8FC\uBCC0\uC740 \uB290\uB824\uC9D0","weapon.fart":"\uBC29\uADC0 \uAE30\uAD00\uCD1D","weapon.six7":"67 \uB9AC\uBCFC\uBC84","weapon.boom":"\uBC14\uC778\uBD90 \uC0F7\uAC74","weapon.laser":"\uB208\uAE54 \uB808\uC774\uC800","label.fart":"\u{1F4A8} \uBC29\uADC0","label.six7":"\u{1F90C} 67","label.boom":"\u{1F4E2} \uBC14\uC778\uBD90","label.slap":"\u{1F590}\uFE0F \uC2F8\uB300\uAE30","label.bomb":"\u{1F436} \uACF5\uC2B5","label.fall":"\u{1F573}\uFE0F \uCD94\uB77D","label.rizz":"\u{1F618} \uB9AC\uC988","label.reflect":"\u{1F60C} \uB108\uBB34 \uCE60\uD568","label.claw":"\u{1F43E} \uD560\uD034\uAE30","label.nuke":"\u2622\uFE0F \uD575","label.laser":"\u{1F441}\uFE0F \uB808\uC774\uC800","label.flush":"\u{1F6BD} \uBB3C\uB0B4\uB9BC","label.bark":"\u{1F399}\uFE0F \uC9D6\uAE30","label.hero":"\u{1F9B8} \uD380\uCE58","label.tung":"\u{1F941} \uC0AC\uD6C4\uB974","event.dogfight":"\u{1F436}\u2708\uFE0F \uAC1C \uC804\uD22C\uAE30 \uACF5\uC2B5!!","event.sixseven":"6\uFE0F\u20E37\uFE0F\u20E3 67 \uD0C0\uC784: \uBAA8\uB4E0 \uB370\uBBF8\uC9C0 67","event.bighead":"\u{1F5FF} \uB300\uB450 \uC2DC\uB300: \uBA38\uB9AC \uD310\uC815 \uB300\uD3ED\uBC1C","event.moon":"\u{1F319} \uC624\uD558\uC774\uC624 \uC800\uC911\uB825","eventSay.dogfight":"air dog raid","eventSay.sixseven":"six seven, six seven","eventSay.bighead":"\uB300\uB450 \uC2DC\uB300","eventSay.moon":"only in ohio","map.ohio":"\uC624\uD558\uC774\uC624 \uAD6C\uB369\uC774","mapDesc.ohio":"\uAC00\uC6B4\uB370 \uAD6C\uBA4D + \uACF5\uC911 \uBA85\uB2F9","map.roof":"\uC2DC\uADF8\uB9C8 \uC625\uC0C1","mapDesc.roof":"\uBCBD \uC5C6\uC74C. \uBC00\uB9AC\uBA74 \uCD94\uB77D","map.office":"\uBC31\uB8F8 \uC0AC\uBB34\uC2E4","mapDesc.office":"\uC881\uC740 \uBCF5\uB3C4 + \uC625\uC0C1 2\uCE35","map.boat":"\uC544\uC6B0\uB77C \uBCF4\uD2B8","mapDesc.boat":"\uBC30 \uC138 \uCC99. \uBB3C\uC5D0 \uBE60\uC9C0\uBA74 \uB05D","map.restroom":"\uAC70\uB300 \uD654\uC7A5\uC2E4","mapDesc.restroom":"\uCE78\uB9C9\uC774 \uC0AC\uC774 \uC228\uBC14\uAF2D\uC9C8 + \uB300\uC655 \uBCC0\uAE30","map.arena":"67 \uCF5C\uB85C\uC138\uC6C0","mapDesc.arena":"\uAE30\uB465 \uC232, \uD53C\uB77C\uBBF8\uB4DC, 2\uCE35 \uAD00\uC911\uC11D"},lm={"\uC5B4\uCA54\uD2F0\uBE44|\uC800\uCA54\uD2F0\uBE44":["COPE","SEETHE"],"\uB5A8\uC5B4\uC9C0\uBA74|-2000 AURA":["FALL =","-2000 AURA"],"\uD1F4\uADFC|\uAE08\uC9C0":["NO","LEAVING"],"EXIT|\uC5C6\uC74C":["NO","EXIT"],"\uCD9C\uADFC|6:07":["WORK AT","6:07"],"\uC2A4\uD0AC|\uC774\uC288":["SKILL","ISSUE"],"\uBC43\uBA38\uB9AC|\uBA85\uB2F9":["PRIME","SPOT"],"\uBB3C \uC870\uC2EC":["WET"],"\uC218\uC601|\uAE08\uC9C0":["NO","SWIMMING"],"\uC190 \uC53B\uC73C\uC138\uC694":["WASH HANDS"],"SKIBIDI|\uAE08\uC9C0":["NO","SKIBIDI"],"\uD734\uC9C0|\uC5C6\uC74C":["NO","TP"],"\uBB3C \uB0B4\uB824|\uC8FC\uC138\uC694":["PLEASE","FLUSH"],"\uAC80\uD22C\uC0AC|\uBAA8\uC9D1":["GLADIATORS","WANTED"]},cm={en:Zu,ko:om},Ln="en";try{let n=localStorage.getItem("aura-lang");(n==="ko"||n==="en")&&(Ln=n)}catch{}var Kr=()=>Ln;function $u(n){let t=null;try{t=localStorage.getItem("aura-lang")}catch{}t||(Ln=String(n??"").toLowerCase().startsWith("ko")?"ko":"en")}var ro=()=>Ln==="ko"?"ko-KR":"en-US";function Ju(n){Ln=n==="ko"?"ko":"en";try{localStorage.setItem("aura-lang",Ln)}catch{}}function it(n,t){let e=cm[Ln][n]??Zu[n]??n;if(t)for(let[i,s]of Object.entries(t))e=e.split(`{${i}}`).join(String(s));return e}function ju(n){return Ln==="en"?lm[n.join("|")]??n:n}function Qu(n=document){document.documentElement.lang=Ln;for(let t of n.querySelectorAll("[data-i18n]"))t.textContent=it(t.dataset.i18n);for(let t of n.querySelectorAll("[data-i18n-html]"))t.innerHTML=it(t.dataset.i18nHtml);for(let t of n.querySelectorAll("[data-i18n-ph]"))t.placeholder=it(t.dataset.i18nPh);for(let t of n.querySelectorAll("[data-i18n-title]"))t.title=it(t.dataset.i18nTitle)}var gi=n=>n[Math.floor(Math.random()*n.length)],hm={en:{kill:["EYES REMOVED","SKILL ISSUE","L + RATIO","GG EZ","SHIPPED TO OHIO","NPC DELETED","SIGMA MOVE","COPE","SEETHE","DO YOUR HOMEWORK","CLOCK OUT","LOL LOL LOL","SIX SEVEN!","FANUM TAX","AURA GAP","FUNDAMENTALS ISSUE","TRALALERO TRALALA","MOGGED","WHAT WAS THAT?","WHERE ARE YOUR EYES?","TOUCH GRASS"],death:["SKILL ISSUE","BRUH","HOW?","LOST YOUR EYES","YOU ARE THE NPC","AURA BANKRUPT","UNPLUG YOUR MOUSE","IS THIS AN FPS?","CERTIFIED OHIO","WAS THAT ON PURPOSE?","THAT GOT CLIPPED","MOM SAYS DINNER","CRINGE"],fall:["STRAIGHT TO OHIO","FELL BY YOURSELF LOL","CAN'T SEE THE FLOOR?","DO YOU HAVE EYES?","FREEFALL MASTER"],ticker:["BREAKING: Minsu files for aura bankruptcy at -6767",'Ohio residents insist "we are normal"',"Man yells 6-7, cannot explain why",'Experts: "eyes do not normally do that"',"Sigma population up 67%","Fart SMG now under environmental regulation","Air dog squadron bombs town again","Tung Tung Tung Sahur late for the third time","Chicken restores health (no medical basis)","Man runs out of aura choosing a menu","Hat industry nervous as big head era begins","Shotgun going boom is normal, says shotgun"],win:["CERTIFIED SIGMA","MAIN CHARACTER","AURA BILLIONAIRE","EYEBALL COLLECTOR","MAYOR OF OHIO"],lose:["CERTIFIED NPC","AURA BANKRUPT","EYEBALL DONOR","EXILED FROM OHIO","GRADE A SKILL ISSUE"],reload:["reloading lol","one sec","tung tung tung","loading...","buying bullets"],claw:["MEOW!","SCRATCH!","\u{1F4A2}","\u{1F43E}","HISS"]},ko:{kill:["\uB208\uAE54 \uC801\uCD9C \uC644\uB8CC","SKILL ISSUE","\uC751 \uC544\uB2C8\uC57C~","\uC5B4\uCA54\uD2F0\uBE44","\uC800\uCA54\uD2F0\uBE44","GG EZ","\uC624\uD558\uC774\uC624\uB85C \uD0DD\uBC30 \uBC1C\uC1A1","NPC \uCC98\uB9AC \uC644\uB8CC","SIGMA MOVE","\uD0B9\uBC1B\uC96C?","\uC219\uC81C\uD574","\uD1F4\uADFC\uD558\uC138\uC694","\u314B\u314B\u314B\u314B\u314B\u314B\u314B","SIX SEVEN!","FANUM TAX \uC9D5\uC218","L + RATIO","\uC544\uC6B0\uB77C \uCC28\uC774 \uC2E4\uD654\uB0D0","\uAE30\uBCF8\uAE30 \uC774\uC288","\uB7ED\uD0A4\uBE44\uD0A4\uC796\uC544","TRALALERO TRALALA","\uD3FC \uBBF8\uCCE4\uB2E4","\uC774\uAC8C \uB9DE\uB0D0","MOGGED","\uB108 \uC9C0\uAE08 \uBB50\uD568?","\uB208\uAE54 \uC5B4\uB514 \uAC14\uC74C?"],death:["\uC2A4\uD0AC \uC774\uC288","BRUH","\uC65C \uB9DE\uC74C?","\uB208\uAE54 \uC783\uC5B4\uBC84\uB9BC","\uB108 NPC\uC784","\uC544\uC6B0\uB77C \uD30C\uC0B0","\uB9C8\uC6B0\uC2A4 \uBF51\uC544\uB77C","\uC774\uAC8C FPS\uC784?","\uC624\uD558\uC774\uC624 \uC8FC\uBBFC \uD310\uC815","\uC9C0\uAE08 \uADF8\uAC70 \uC77C\uBD80\uB7EC\uC784?","\uBC29\uAE08 \uADF8\uAC70 \uD074\uB9BD \uB530\uC600\uC74C","\uC5C4\uB9C8\uAC00 \uBC25 \uBA39\uC73C\uB798","CRINGE"],fall:["\uC624\uD558\uC774\uC624\uB85C \uC9C1\uD589","\uD63C\uC790 \uB5A8\uC5B4\uC9D0 \u314B\u314B\u314B","\uBC14\uB2E5 \uC548 \uBCF4\uC784?","\uB208 \uB2EC\uB9B0 \uAC70 \uB9DE\uC74C?","\uC790\uC720\uB099\uD558 \uC7A5\uC778"],ticker:["\uC18D\uBCF4: \uBBFC\uC218 \uC544\uC6B0\uB77C -6767 \uD30C\uC0B0 \uC2E0\uCCAD",'\uC624\uD558\uC774\uC624 \uC8FC\uBBFC\uB4E4 "\uC6B0\uB9AC\uB294 \uD3C9\uBC94\uD569\uB2C8\uB2E4" \uC8FC\uC7A5','6-7 \uC678\uCE5C \uB0A8\uC131, \uC774\uC720 \uBB3B\uC790 "\uADF8\uB0E5"','\uC804\uBB38\uAC00 "\uB208\uAE54\uC740 \uC6D0\uB798 \uD280\uC5B4\uB098\uC624\uC9C0 \uC54A\uC544"',"\uC2DC\uADF8\uB9C8 \uC218 67% \uC99D\uAC00","\uBC29\uADC0 \uAE30\uAD00\uCD1D \uD658\uACBD\uBD80 \uADDC\uC81C \uB300\uC0C1 \uC9C0\uC815","\uAC1C \uC804\uD22C\uAE30 \uD3B8\uB300, \uB610 \uBBFC\uAC00 \uD3ED\uACA9","TUNG TUNG TUNG \uC0AC\uD6C4\uB974 3\uC5F0\uC18D \uC9C0\uAC01","\uCE58\uD0A8 \uBA39\uC73C\uBA74 \uCCB4\uB825 \uD68C\uBCF5 (\uC758\uD559\uC801 \uADFC\uAC70 \uC5C6\uC74C)","\uBA54\uB274 \uACE0\uB974\uB2E4 \uC544\uC6B0\uB77C \uC18C\uC9C4","\uB300\uB450 \uC2DC\uB300 \uB3C4\uB798\uC5D0 \uBAA8\uC790 \uC5C5\uACC4 \uAE34\uC7A5","\uC0F7\uAC74 \uC3E0 \uB54C\uB9C8\uB2E4 \uCFF5 \uC18C\uB9AC \uB098\uB294 \uAC83 \uC815\uC0C1"],win:["\uC2DC\uADF8\uB9C8 \uC778\uC99D","\uC624\uB298\uC758 \uC8FC\uC778\uACF5","\uC544\uC6B0\uB77C \uC7AC\uBC8C","\uB208\uAE54 \uC218\uC9D1\uAC00","\uC624\uD558\uC774\uC624 \uC2DC\uC7A5 \uB2F9\uC120"],lose:["NPC \uC778\uC99D","\uC544\uC6B0\uB77C \uD30C\uC0B0","\uB208\uAE54 \uAE30\uC99D\uC790","\uC624\uD558\uC774\uC624 \uCD94\uBC29","\uC2A4\uD0AC \uC774\uC288 1\uAE09"],reload:["\uC7A5\uC804 \uC911 \u314B\u314B","\uC7A0\uAE50\uB9CC\uC694","\uCF69\uCF69\uCF69","loading...","\uCD1D\uC54C \uC0AC\uB7EC \uAC10"],claw:["\uB0E5!","\uD560\uD034\uAE30!","\u{1F4A2}","\u{1F43E}","\uCEAC\uC545"]}},cn=n=>hm[Kr()][n],td={minsu:"\u{1F610}",sigma:"\u{1F5FF}",cat:"\u{1F63C}",cone:"\u{1F6F8}",toilet:"\u{1F6BD}",streamer:"\u{1F399}\uFE0F",tung:"\u{1FAB5}",hero:"\u{1F9B8}",rizz:"\u{1F60F}",chill:"\u{1F415}"};var Cd=0,uh=1,Pd=2;var wa=1,ul=2,Rr=3,gn=0,Ze=1,De=2,Vn=0,gs=1,_e=2,dh=3,fh=4,Id=5;var Fs=100,Ld=101,Dd=102,Nd=103,Ud=104,Fd=200,Od=201,Bd=202,kd=203,ph=204,mh=205,zd=206,Hd=207,Gd=208,Vd=209,Wd=210,Xd=211,qd=212,Yd=213,Kd=214,No=0,Uo=1,Fo=2,_r=3,Oo=4,Bo=5,ko=6,zo=7,dl=0,Zd=1,$d=2,Hi=0,gh=1,xh=2,yh=3,vh=4,_h=5,Mh=6,Os=7;var bh=300,Bs=301,Cr=302,fl=303,pl=304,dn=1e3,un=1001,Ho=1002,We=1003,Jd=1004;var Ea=1005;var yi=1006,ml=1007;var Wn=1008;var Si=1009,Sh=1010,wh=1011,Pr=1012,gl=1013,en=1014,nn=1015,Xe=1016,xl=1017,yl=1018,ks=1020,Eh=35902,Th=35899,Ah=1021,Rh=1022,sn=1023,zn=1026,Xn=1027,Ch=1028,vl=1029,xs=1030,_l=1031;var Ml=1033,Ta=33776,Aa=33777,Ra=33778,Ca=33779,bl=35840,Sl=35841,wl=35842,El=35843,Tl=36196,Al=37492,Rl=37496,Cl=37488,Pl=37489,Pa=37490,Il=37491,Ll=37808,Dl=37809,Nl=37810,Ul=37811,Fl=37812,Ol=37813,Bl=37814,kl=37815,zl=37816,Hl=37817,Gl=37818,Vl=37819,Wl=37820,Xl=37821,ql=36492,Yl=36494,Kl=36495,Zl=36283,$l=36284,Ia=36285,Jl=36286;var na=2300,Go=2301,Lo=2302,ih=2303,nh=2400,sh=2401,rh=2402;var jd=3200;var La=0,Qd=1,qn="",be="srgb",sa="srgb-linear",ra="linear",fe="srgb";var Do=7680;var tf=519,ef=512,nf=513,sf=514,Ph=515,rf=516,af=517,Ih=518,Lh=519,Dh=35044,zs=35048;var Nh="300 es",zi=2e3,Mr=2001;function um(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function dm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function of(){let n=aa("canvas");return n.style.display="block",n}var ed={},br=null;function oa(...n){let t="THREE."+n.shift();br?br("log",t,...n):console.log(t,...n)}function lf(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Bt(...n){n=lf(n);let t="THREE."+n.shift();if(br)br("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function zt(...n){n=lf(n);let t="THREE."+n.shift();if(br)br("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function ia(...n){let t=n.join(" ");t in ed||(ed[t]=!0,Bt(...n))}function cf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var hf={[No]:No,[Fo]:ko,[Oo]:Oo,[_r]:Bo,[Uo]:Uo,[ko]:Fo,[zo]:zo,[Bo]:_r},fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ui=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Dc=Math.PI/180,Vo=180/Math.PI;function Hs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ui[n&255]+ui[n>>8&255]+ui[n>>16&255]+ui[n>>24&255]+"-"+ui[t&255]+ui[t>>8&255]+"-"+ui[t>>16&15|64]+ui[t>>24&255]+"-"+ui[e&63|128]+ui[e>>8&255]+"-"+ui[e>>16&255]+ui[e>>24&255]+ui[i&255]+ui[i>>8&255]+ui[i>>16&255]+ui[i>>24&255]).toLowerCase()}function oe(n,t,e){return Math.max(t,Math.min(e,n))}function fm(n,t){return(n%t+t)%t}function Nc(n,t,e){return(1-e)*n+e*t}function uf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function jl(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function df(n,t){if(t.constructor===Float32Array)return n;let e=jl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function ff(n,t){if(t.constructor===Float32Array)return n;let e=jl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var kh=class kh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(oe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};kh.prototype.isVector2=!0;var bt=kh,pn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],f=r[a+1],p=r[a+2],v=r[a+3];if(u!==v||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*v;g<0&&(d=-d,f=-f,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){let x=Math.acos(g),M=Math.sin(x);m=Math.sin(m*x)/M,o=Math.sin(o*x)/M,l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+v*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+p*o,u=u*m+v*o;let x=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=x,c*=x,h*=x,u*=x}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return t[e]=o*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-o*f,t[e+2]=c*p+h*f+o*d-l*u,t[e+3]=h*p-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),f=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>u){let f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},zh=class zh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(id.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(id.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Uc.copy(this).projectOnVector(t),this.sub(Uc)}reflect(t){return this.sub(Uc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(oe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};zh.prototype.isVector3=!0;var N=zh,Uc=new N,id=new pn,Hh=class Hh{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],p=i[8],v=s[0],g=s[3],m=s[6],x=s[1],M=s[4],_=s[7],T=s[2],S=s[5],y=s[8];return r[0]=a*v+o*x+l*T,r[3]=a*g+o*M+l*S,r[6]=a*m+o*_+l*y,r[1]=c*v+h*x+u*T,r[4]=c*g+h*M+u*S,r[7]=c*m+h*_+u*y,r[2]=d*v+f*x+p*T,r[5]=d*g+f*M+p*S,r[8]=d*m+f*_+p*y,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=e*u+i*d+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return t[0]=u*v,t[1]=(s*c-h*i)*v,t[2]=(o*i-s*a)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ia("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Fc.makeScale(t,e)),this}rotate(t){return ia("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Fc.makeRotation(-t)),this}translate(t,e){return ia("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Fc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Hh.prototype.isMatrix3=!0;var Gt=Hh,Fc=new Gt,nd=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sd=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pm(){let n={enabled:!0,workingColorSpace:sa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===fe&&(s.r=kn(s.r),s.g=kn(s.g),s.b=kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===fe&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qn?ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[sa]:{primaries:t,whitePoint:i,transfer:ra,toXYZ:nd,fromXYZ:sd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:nd,fromXYZ:sd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:be}}}),n}var ae=pm();function kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ir,Wo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ir===void 0&&(ir=aa("canvas")),ir.width=t.width,ir.height=t.height;let s=ir.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ir}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=aa("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(kn(e[i]/255)*255):e[i]=kn(e[i]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},mm=0,Sr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Hs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Oc(s[a].image)):r.push(Oc(s[a]))}else r=Oc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Oc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Wo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}var gm=0,Bc=new N,vi=class n extends fn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=un,s=un,r=yi,a=Wn,o=sn,l=Si,c=n.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Hs(),this.name="",this.source=new Sr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Bc).x}get height(){return this.source.getSize(Bc).y}get depth(){return this.source.getSize(Bc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case dn:t.x=t.x-Math.floor(t.x);break;case un:t.x=t.x<0?0:1;break;case Ho:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case dn:t.y=t.y-Math.floor(t.y);break;case un:t.y=t.y<0?0:1;break;case Ho:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};vi.DEFAULT_IMAGE=null;vi.DEFAULT_MAPPING=bh;vi.DEFAULT_ANISOTROPY=1;var Gh=class Gh{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,_=(f+1)/2,T=(m+1)/2,S=(h+d)/4,y=(u+v)/4,w=(p+g)/4;return M>_&&M>T?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=S/i,r=y/i):_>T?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=S/s,r=w/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=y/r,s=w/r),this.set(i,s,r,e),this}let x=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Gh.prototype.isVector4=!0;var Ie=Gh,Xo=class extends fn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new vi({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:yi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Sr(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Oe=class extends Xo{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},la=class extends vi{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var qo=class extends vi{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var hl=class hl{constructor(t,e,i,s,r,a,o,l,c,h,u,d,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,d,f,p,v,g)}set(t,e,i,s,r,a,o,l,c,h,u,d,f,p,v,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hl().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/nr.setFromMatrixColumn(t,0).length(),r=1/nr.setFromMatrixColumn(t,1).length(),a=1/nr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,f=a*u,p=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=p+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,p=c*h,v=c*u;e[0]=d+v*o,e[4]=p*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-p,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,p=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=p+f*o,e[1]=f+p*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,p=o*h,v=o*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,p=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=p*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-v*u}else if(t.order==="XZY"){let d=a*l,f=a*c,p=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xm,t,ym)}lookAt(t,e,i){let s=this.elements;return Ti.subVectors(t,e),Ti.lengthSq()===0&&(Ti.z=1),Ti.normalize(),es.crossVectors(i,Ti),es.lengthSq()===0&&(Math.abs(i.z)===1?Ti.x+=1e-4:Ti.z+=1e-4,Ti.normalize(),es.crossVectors(i,Ti)),es.normalize(),ao.crossVectors(Ti,es),s[0]=es.x,s[4]=ao.x,s[8]=Ti.x,s[1]=es.y,s[5]=ao.y,s[9]=Ti.y,s[2]=es.z,s[6]=ao.z,s[10]=Ti.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],p=i[2],v=i[6],g=i[10],m=i[14],x=i[3],M=i[7],_=i[11],T=i[15],S=s[0],y=s[4],w=s[8],C=s[12],R=s[1],D=s[5],F=s[9],G=s[13],I=s[2],z=s[6],Y=s[10],V=s[14],tt=s[3],W=s[7],j=s[11],Q=s[15];return r[0]=a*S+o*R+l*I+c*tt,r[4]=a*y+o*D+l*z+c*W,r[8]=a*w+o*F+l*Y+c*j,r[12]=a*C+o*G+l*V+c*Q,r[1]=h*S+u*R+d*I+f*tt,r[5]=h*y+u*D+d*z+f*W,r[9]=h*w+u*F+d*Y+f*j,r[13]=h*C+u*G+d*V+f*Q,r[2]=p*S+v*R+g*I+m*tt,r[6]=p*y+v*D+g*z+m*W,r[10]=p*w+v*F+g*Y+m*j,r[14]=p*C+v*G+g*V+m*Q,r[3]=x*S+M*R+_*I+T*tt,r[7]=x*y+M*D+_*z+T*W,r[11]=x*w+M*F+_*Y+T*j,r[15]=x*C+M*G+_*V+T*Q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15],x=l*f-c*d,M=o*f-c*u,_=o*d-l*u,T=a*f-c*h,S=a*d-l*h,y=a*u-o*h;return e*(v*x-g*M+m*_)-i*(p*x-g*T+m*S)+s*(p*M-v*T+m*y)-r*(p*_-v*S+g*y)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],x=e*o-i*a,M=e*l-s*a,_=e*c-r*a,T=i*l-s*o,S=i*c-r*o,y=s*c-r*l,w=h*v-u*p,C=h*g-d*p,R=h*m-f*p,D=u*g-d*v,F=u*m-f*v,G=d*m-f*g,I=x*G-M*F+_*D+T*R-S*C+y*w;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return t[0]=(o*G-l*F+c*D)*z,t[1]=(s*F-i*G-r*D)*z,t[2]=(v*y-g*S+m*T)*z,t[3]=(d*S-u*y-f*T)*z,t[4]=(l*R-a*G-c*C)*z,t[5]=(e*G-s*R+r*C)*z,t[6]=(g*_-p*y-m*M)*z,t[7]=(h*y-d*_+f*M)*z,t[8]=(a*F-o*R+c*w)*z,t[9]=(i*R-e*F-r*w)*z,t[10]=(p*S-v*_+m*x)*z,t[11]=(u*_-h*S-f*x)*z,t[12]=(o*C-a*D-l*w)*z,t[13]=(e*D-i*C+s*w)*z,t[14]=(v*M-p*T-g*x)*z,t[15]=(h*T-u*M+d*x)*z,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,v=a*h,g=a*u,m=o*u,x=l*c,M=l*h,_=l*u,T=i.x,S=i.y,y=i.z;return s[0]=(1-(v+m))*T,s[1]=(f+_)*T,s[2]=(p-M)*T,s[3]=0,s[4]=(f-_)*S,s[5]=(1-(d+m))*S,s[6]=(g+x)*S,s[7]=0,s[8]=(p+M)*y,s[9]=(g-x)*y,s[10]=(1-(d+v))*y,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=nr.set(s[0],s[1],s[2]).length(),o=nr.set(s[4],s[5],s[6]).length(),l=nr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),$i.copy(this);let c=1/a,h=1/o,u=1/l;return $i.elements[0]*=c,$i.elements[1]*=c,$i.elements[2]*=c,$i.elements[4]*=h,$i.elements[5]*=h,$i.elements[6]*=h,$i.elements[8]*=u,$i.elements[9]*=u,$i.elements[10]*=u,e.setFromRotationMatrix($i),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=zi,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),f=(i+s)/(i-s),p,v;if(l)p=r/(a-r),v=a*r/(a-r);else if(o===zi)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Mr)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=zi,l=!1){let c=this.elements,h=2/(e-t),u=2/(i-s),d=-(e+t)/(e-t),f=-(i+s)/(i-s),p,v;if(l)p=1/(a-r),v=a/(a-r);else if(o===zi)p=-2/(a-r),v=-(a+r)/(a-r);else if(o===Mr)p=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};hl.prototype.isMatrix4=!0;var Se=hl,nr=new N,$i=new Se,xm=new N(0,0,0),ym=new N(1,1,1),es=new N,ao=new N,Ti=new N,rd=new Se,ad=new pn,Hn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(oe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-oe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return rd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ad.setFromEuler(this),this.setFromQuaternion(ad,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hn.DEFAULT_ORDER="XYZ";var ca=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},vm=0,od=new N,sr=new pn,Dn=new Se,oo=new N,Zr=new N,_m=new N,Mm=new pn,ld=new N(1,0,0),cd=new N(0,1,0),hd=new N(0,0,1),ud={type:"added"},bm={type:"removed"},rr={type:"childadded",child:null},kc={type:"childremoved",child:null},ni=class n extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=Hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new N,e=new Hn,i=new pn,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Se},normalMatrix:{value:new Gt}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return sr.setFromAxisAngle(t,e),this.quaternion.multiply(sr),this}rotateOnWorldAxis(t,e){return sr.setFromAxisAngle(t,e),this.quaternion.premultiply(sr),this}rotateX(t){return this.rotateOnAxis(ld,t)}rotateY(t){return this.rotateOnAxis(cd,t)}rotateZ(t){return this.rotateOnAxis(hd,t)}translateOnAxis(t,e){return od.copy(t).applyQuaternion(this.quaternion),this.position.add(od.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ld,t)}translateY(t){return this.translateOnAxis(cd,t)}translateZ(t){return this.translateOnAxis(hd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?oo.copy(t):oo.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Zr,oo,this.up):Dn.lookAt(oo,Zr,this.up),this.quaternion.setFromRotationMatrix(Dn),s&&(Dn.extractRotation(s.matrixWorld),sr.setFromRotationMatrix(Dn),this.quaternion.premultiply(sr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(zt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ud),rr.child=t,this.dispatchEvent(rr),rr.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(bm),kc.child=t,this.dispatchEvent(kc),kc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ud),rr.child=t,this.dispatchEvent(rr),rr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,t,_m),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zr,Mm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ni.DEFAULT_UP=new N(0,1,0);ni.DEFAULT_MATRIX_AUTO_UPDATE=!0;ni.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xe=class extends ni{constructor(){super(),this.isGroup=!0,this.type="Group"}},Sm={type:"move"},wr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let g=e.getJointPose(v,i),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new xe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},lo={h:0,s:0,l:0};function zc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var at=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=i,ae.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ae.workingColorSpace){if(t=fm(t,1),e=oe(e,0,1),i=oe(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=zc(a,r,t+1/3),this.g=zc(a,r,t),this.b=zc(a,r,t-1/3)}return ae.colorSpaceToWorking(this,s),this}setStyle(t,e=be){function i(r){r!==void 0&&parseFloat(r)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){let i=pf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=vr(t.r),this.g=vr(t.g),this.b=vr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return ae.workingToColorSpace(di.copy(this),t),Math.round(oe(di.r*255,0,255))*65536+Math.round(oe(di.g*255,0,255))*256+Math.round(oe(di.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(di.copy(this),e);let i=di.r,s=di.g,r=di.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(di.copy(this),e),t.r=di.r,t.g=di.g,t.b=di.b,t}getStyle(t=be){ae.workingToColorSpace(di.copy(this),t);let e=di.r,i=di.g,s=di.b;return t!==be?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(is),this.setHSL(is.h+t,is.s+e,is.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(is),t.getHSL(lo);let i=Nc(is.h,lo.h,e),s=Nc(is.s,lo.s,e),r=Nc(is.l,lo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},di=new at;at.NAMES=pf;var ha=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new at(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},as=class extends ni{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ji=new N,Nn=new N,Hc=new N,Un=new N,ar=new N,or=new N,dd=new N,Gc=new N,Vc=new N,Wc=new N,Xc=new Ie,qc=new Ie,Yc=new Ie,Bn=class n{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Ji.subVectors(t,e),s.cross(Ji);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Ji.subVectors(s,e),Nn.subVectors(i,e),Hc.subVectors(t,e);let a=Ji.dot(Ji),o=Ji.dot(Nn),l=Ji.dot(Hc),c=Nn.dot(Nn),h=Nn.dot(Hc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Xc.setScalar(0),qc.setScalar(0),Yc.setScalar(0),Xc.fromBufferAttribute(t,e),qc.fromBufferAttribute(t,i),Yc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Xc,r.x),a.addScaledVector(qc,r.y),a.addScaledVector(Yc,r.z),a}static isFrontFacing(t,e,i,s){return Ji.subVectors(i,e),Nn.subVectors(t,e),Ji.cross(Nn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ji.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),Ji.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;ar.subVectors(s,i),or.subVectors(r,i),Gc.subVectors(t,i);let l=ar.dot(Gc),c=or.dot(Gc);if(l<=0&&c<=0)return e.copy(i);Vc.subVectors(t,s);let h=ar.dot(Vc),u=or.dot(Vc);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(i).addScaledVector(ar,a);Wc.subVectors(t,r);let f=ar.dot(Wc),p=or.dot(Wc);if(p>=0&&f<=p)return e.copy(r);let v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(i).addScaledVector(or,o);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return dd.subVectors(r,s),o=(u-h)/(u-h+(f-p)),e.copy(s).addScaledVector(dd,o);let m=1/(g+v+d);return a=v*m,o=d*m,e.copy(i).addScaledVector(ar,a).addScaledVector(or,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},os=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ji.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ji.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ji.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ji):ji.fromBufferAttribute(r,a),ji.applyMatrix4(t.matrixWorld),this.expandByPoint(ji);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),co.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),co.copy(i.boundingBox)),co.applyMatrix4(t.matrixWorld),this.union(co)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ji),ji.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($r),ho.subVectors(this.max,$r),lr.subVectors(t.a,$r),cr.subVectors(t.b,$r),hr.subVectors(t.c,$r),ns.subVectors(cr,lr),ss.subVectors(hr,cr),As.subVectors(lr,hr);let e=[0,-ns.z,ns.y,0,-ss.z,ss.y,0,-As.z,As.y,ns.z,0,-ns.x,ss.z,0,-ss.x,As.z,0,-As.x,-ns.y,ns.x,0,-ss.y,ss.x,0,-As.y,As.x,0];return!Kc(e,lr,cr,hr,ho)||(e=[1,0,0,0,1,0,0,0,1],!Kc(e,lr,cr,hr,ho))?!1:(uo.crossVectors(ns,ss),e=[uo.x,uo.y,uo.z],Kc(e,lr,cr,hr,ho))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ji).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ji).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Fn=[new N,new N,new N,new N,new N,new N,new N,new N],ji=new N,co=new os,lr=new N,cr=new N,hr=new N,ns=new N,ss=new N,As=new N,$r=new N,ho=new N,uo=new N,Rs=new N;function Kc(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Rs.fromArray(n,r);let o=s.x*Math.abs(Rs.x)+s.y*Math.abs(Rs.y)+s.z*Math.abs(Rs.z),l=t.dot(Rs),c=e.dot(Rs),h=i.dot(Rs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ge=new N,fo=new bt,wm=0,Ve=class extends fn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Dh,this.updateRanges=[],this.gpuType=nn,this.version=0,this._normalizationScale=t!==void 0?jl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)fo.fromBufferAttribute(this,e),fo.applyMatrix3(t),this.setXY(e,fo.x,fo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):df(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):ff(t,this.array)}};var ua=class extends Ve{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var da=class extends Ve{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Kt=class extends Ve{constructor(t,e,i){super(new Float32Array(t),e,i)}},Em=new os,Jr=new N,Zc=new N,Is=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Em.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jr.subVectors(t,this.center);let e=Jr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Jr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jr.copy(t.center).add(Zc)),this.expandByPoint(Jr.copy(t.center).sub(Zc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Tm=0,ki=new Se,$c=new ni,ur=new N,Ai=new os,jr=new os,ii=new N,we=class n extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(um(t)?da:ua)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Gt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ki.makeRotationFromQuaternion(t),this.applyMatrix4(ki),this}rotateX(t){return ki.makeRotationX(t),this.applyMatrix4(ki),this}rotateY(t){return ki.makeRotationY(t),this.applyMatrix4(ki),this}rotateZ(t){return ki.makeRotationZ(t),this.applyMatrix4(ki),this}translate(t,e,i){return ki.makeTranslation(t,e,i),this.applyMatrix4(ki),this}scale(t,e,i){return ki.makeScale(t,e,i),this.applyMatrix4(ki),this}lookAt(t){return $c.lookAt(t),$c.updateMatrix(),this.applyMatrix4($c.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ur).negate(),this.translate(ur.x,ur.y,ur.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Ai.setFromBufferAttribute(r),this.morphTargetsRelative?(ii.addVectors(this.boundingBox.min,Ai.min),this.boundingBox.expandByPoint(ii),ii.addVectors(this.boundingBox.max,Ai.max),this.boundingBox.expandByPoint(ii)):(this.boundingBox.expandByPoint(Ai.min),this.boundingBox.expandByPoint(Ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(Ai.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];jr.setFromBufferAttribute(o),this.morphTargetsRelative?(ii.addVectors(Ai.min,jr.min),Ai.expandByPoint(ii),ii.addVectors(Ai.max,jr.max),Ai.expandByPoint(ii)):(Ai.expandByPoint(jr.min),Ai.expandByPoint(jr.max))}Ai.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ii.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ii));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ii.fromBufferAttribute(o,c),l&&(ur.fromBufferAttribute(t,c),ii.add(ur)),s=Math.max(s,i.distanceToSquared(ii))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ve(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let C=0;C<i.count;C++)o[C]=new N,l[C]=new N;let h=new N,u=new N,d=new N,f=new bt,p=new bt,v=new bt,g=new N,m=new N;function x(C,R,D){c[C]=c[R]=c[D]=1,h.fromBufferAttribute(i,C),u.fromBufferAttribute(i,R),d.fromBufferAttribute(i,D),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,R),v.fromBufferAttribute(r,D),u.sub(h),d.sub(h),p.sub(f),v.sub(f);let F=1/(p.x*v.y-v.x*p.y);isFinite(F)&&(g.copy(u).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(F),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(F),o[C].add(g),o[R].add(g),o[D].add(g),l[C].add(m),l[R].add(m),l[D].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let C=0,R=M.length;C<R;++C){let D=M[C],F=D.start,G=D.count;for(let I=F,z=F+G;I<z;I+=3)x(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let _=new N,T=new N,S=new N,y=new N;function w(C){S.fromBufferAttribute(s,C),y.copy(S);let R=o[C];_.copy(R),_.sub(S.multiplyScalar(S.dot(R))).normalize(),T.crossVectors(y,R);let F=T.dot(l[C])<0?-1:1;a.setXYZW(C,_.x,_.y,_.z,F)}for(let C=0,R=i.count;C<R;++C)c[C]&&w(C);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Ve(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){let p=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ii.fromBufferAttribute(t,e),ii.normalize(),t.setXYZ(e,ii.x,ii.y,ii.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Ve(d,h,u)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Dh,this.updateRanges=[],this.version=0,this.uuid=Hs()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=fd(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let i=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=fd(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function fd(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Hs()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var xi=new N,fa=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s,this._normalizationScale=t!==void 0?jl(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)xi.fromBufferAttribute(this,e),xi.applyMatrix4(t),this.setXYZ(e,xi.x,xi.y,xi.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)xi.fromBufferAttribute(this,e),xi.applyNormalMatrix(t),this.setXYZ(e,xi.x,xi.y,xi.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)xi.fromBufferAttribute(this,e),xi.transformDirection(t),this.setXYZ(e,xi.x,xi.y,xi.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){oa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ve(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){oa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):df(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):ff(t,this.data.array)}},Jc=new N,Am=new N,Rm=new Gt,Qi=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Jc.subVectors(i,e).cross(Am.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Jc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Rm.getNormalMatrix(t),s=this.coplanarPoint(Jc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Cm=0,tn=class extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=Hs(),this.name="",this.type="Material",this.blending=gs,this.side=gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ph,this.blendDst=mh,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Do,this.stencilZFail=Do,this.stencilZPass=Do,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new at().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Qi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new bt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new bt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Re=class extends tn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},dr,Qr=new N,fr=new N,pr=new N,mr=new bt,ta=new bt,mf=new Se,po=new N,ea=new N,mo=new N,pd=new bt,jc=new bt,md=new bt,Le=class extends ni{constructor(t=new Re){if(super(),this.isSprite=!0,this.type="Sprite",dr===void 0){dr=new we;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Yo(e,5);dr.setIndex([0,1,2,0,2,3]),dr.setAttribute("position",new fa(i,3,0,!1)),dr.setAttribute("uv",new fa(i,2,3,!1))}this.geometry=dr,this.material=t,this.center=new bt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&zt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fr.setFromMatrixScale(this.matrixWorld),mf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),pr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fr.multiplyScalar(-pr.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;go(po.set(-.5,-.5,0),pr,a,fr,s,r),go(ea.set(.5,-.5,0),pr,a,fr,s,r),go(mo.set(.5,.5,0),pr,a,fr,s,r),pd.set(0,0),jc.set(1,0),md.set(1,1);let o=t.ray.intersectTriangle(po,ea,mo,!1,Qr);if(o===null&&(go(ea.set(-.5,.5,0),pr,a,fr,s,r),jc.set(0,1),o=t.ray.intersectTriangle(po,mo,ea,!1,Qr),o===null))return;let l=t.ray.origin.distanceTo(Qr);l<t.near||l>t.far||e.push({distance:l,point:Qr.clone(),uv:Bn.getInterpolation(Qr,po,ea,mo,pd,jc,md,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){let e=super.toJSON(t);return e.object.center=this.center.toArray(),e}};function go(n,t,e,i,s,r){mr.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(ta.x=r*mr.x-s*mr.y,ta.y=s*mr.x+r*mr.y):ta.copy(mr),n.copy(t),n.x+=ta.x,n.y+=ta.y,n.applyMatrix4(mf)}var On=new N,Qc=new N,xo=new N,yo=new N,pa=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,On)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=On.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(On.copy(this.origin).addScaledVector(this.direction,e),On.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Qc.copy(t).add(e).multiplyScalar(.5),xo.copy(e).sub(t).normalize(),yo.copy(this.origin).sub(Qc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(xo),o=yo.dot(this.direction),l=-yo.dot(xo),c=yo.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Qc).addScaledVector(xo,d),f}intersectSphere(t,e){if(t.radius<0)return null;On.subVectors(t.center,this.origin);let i=On.dot(this.direction),s=On.dot(On)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,On)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,d=t.y-a.y,f=t.z-a.z,p=e.x-a.x,v=e.y-a.y,g=e.z-a.z,m=i.x-a.x,x=i.y-a.y,M=i.z-a.z,_=Math.abs(l),T=Math.abs(c),S=Math.abs(h),y,w,C,R,D,F,G,I,z,Y,V,tt;if(_>=T&&_>=S?(C=l,F=u,z=p,tt=m,l>=0?(y=c,w=h,R=d,D=f,G=v,I=g,Y=x,V=M):(y=h,w=c,R=f,D=d,G=g,I=v,Y=M,V=x)):T>=S?(C=c,F=d,z=v,tt=x,c>=0?(y=h,w=l,R=f,D=u,G=g,I=p,Y=M,V=m):(y=l,w=h,R=u,D=f,G=p,I=g,Y=m,V=M)):(C=h,F=f,z=g,tt=M,h>=0?(y=l,w=c,R=u,D=d,G=p,I=v,Y=m,V=x):(y=c,w=l,R=d,D=u,G=v,I=p,Y=x,V=m)),C===0)return null;let W=y/C,j=w/C,Q=1/C,Et=R-W*F,Dt=D-j*F,X=G-W*z,yt=I-j*z,wt=Y-W*tt,Nt=V-j*tt,gt=wt*yt-Nt*X,Ht=Et*Nt-Dt*wt,xt=X*Dt-yt*Et;if(s){if(gt<0||Ht<0||xt<0)return null}else if((gt<0||Ht<0||xt<0)&&(gt>0||Ht>0||xt>0))return null;let pt=gt+Ht+xt;if(pt===0)return null;let Jt=Q*(gt*F+Ht*z+xt*tt);return(pt>0?Jt<0:Jt>0)?null:this.at(Jt/pt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Vt=class extends tn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},gd=new Se,Cs=new pa,vo=new Is,xd=new N,_o=new N,Mo=new N,bo=new N,th=new N,So=new N,yd=new N,wo=new N,Ct=class extends ni{constructor(t=new we,e=new Vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){So.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(th.fromBufferAttribute(u,t),a?So.addScaledVector(th,h):So.addScaledVector(th.sub(e),h))}e.add(So)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vo.copy(i.boundingSphere),vo.applyMatrix4(r),Cs.copy(t.ray).recast(t.near),!(vo.containsPoint(Cs.origin)===!1&&(Cs.intersectSphere(vo,xd)===null||Cs.origin.distanceToSquared(xd)>(t.far-t.near)**2))&&(gd.copy(r).invert(),Cs.copy(t.ray).applyMatrix4(gd),!(i.boundingBox!==null&&Cs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Cs)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){let g=d[p],m=a[g.materialIndex],x=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,T=M;_<T;_+=3){let S=o.getX(_),y=o.getX(_+1),w=o.getX(_+2);s=Eo(this,m,t,i,c,h,u,S,y,w),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){let x=o.getX(g),M=o.getX(g+1),_=o.getX(g+2);s=Eo(this,a,t,i,c,h,u,x,M,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=d.length;p<v;p++){let g=d[p],m=a[g.materialIndex],x=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,T=M;_<T;_+=3){let S=_,y=_+1,w=_+2;s=Eo(this,m,t,i,c,h,u,S,y,w),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){let x=g,M=g+1,_=g+2;s=Eo(this,a,t,i,c,h,u,x,M,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Pm(n,t,e,i,s,r,a,o){let l;if(t.side===Ze?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===gn,o),l===null)return null;wo.copy(o),wo.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(wo);return c<e.near||c>e.far?null:{distance:c,point:wo.clone(),object:n}}function Eo(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,_o),n.getVertexPosition(l,Mo),n.getVertexPosition(c,bo);let h=Pm(n,t,e,i,_o,Mo,bo,yd);if(h){let u=new N;Bn.getBarycoord(yd,_o,Mo,bo,u),s&&(h.uv=Bn.getInterpolatedAttribute(s,o,l,c,u,new bt)),r&&(h.uv1=Bn.getInterpolatedAttribute(r,o,l,c,u,new bt)),a&&(h.normal=Bn.getInterpolatedAttribute(a,o,l,c,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new N,materialIndex:0};Bn.getNormal(_o,Mo,bo,d.normal),h.face=d,h.barycoord=u}return h}var Er=class extends vi{constructor(t=null,e=1,i=1,s,r,a,o,l,c=We,h=We,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ps=new Is,Im=new bt(.5,.5),To=new N,ls=class{constructor(t=new Qi,e=new Qi,i=new Qi,s=new Qi,r=new Qi,a=new Qi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=zi,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],v=r[9],g=r[10],m=r[11],x=r[12],M=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,m-p,T-x).normalize(),s[1].setComponents(c+a,f+h,m+p,T+x).normalize(),s[2].setComponents(c+o,f+u,m+v,T+M).normalize(),s[3].setComponents(c-o,f-u,m-v,T-M).normalize(),i)s[4].setComponents(l,d,g,_).normalize(),s[5].setComponents(c-l,f-d,m-g,T-_).normalize();else if(s[4].setComponents(c-l,f-d,m-g,T-_).normalize(),e===zi)s[5].setComponents(c+l,f+d,m+g,T+_).normalize();else if(e===Mr)s[5].setComponents(l,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(t){Ps.center.set(0,0,0);let e=Im.distanceTo(t.center);return Ps.radius=.7071067811865476+e,Ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(To.x=s.normal.x>0?t.max.x:t.min.x,To.y=s.normal.y>0?t.max.y:t.min.y,To.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(To)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},vd=new Se,Ko=class n{constructor(){this.coordinateSystem=zi,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];vd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new ls),i[s].setFromProjectionMatrix(vd,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new ls),e[s].copy(i[s]);return this._count=t._count,this}clone(){return new n().copy(this)}};var Ls=class extends tn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},_d=new Se,ah=new pa,Ao=new Is,Ro=new N,cs=class extends ni{constructor(t=new we,e=new Ls){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ao.copy(i.boundingSphere),Ao.applyMatrix4(s),Ao.radius+=r,t.ray.intersectsSphere(Ao)===!1)return;_d.copy(s).invert(),ah.copy(t.ray).applyMatrix4(_d);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,v=f;p<v;p++){let g=c.getX(p);Ro.fromBufferAttribute(u,g),Md(Ro,g,l,s,t,e,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,v=f;p<v;p++)Ro.fromBufferAttribute(u,p),Md(Ro,p,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Md(n,t,e,i,s,r,a){let o=ah.distanceSqToPoint(n);if(o<e){let l=new N;ah.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var ma=class extends vi{constructor(t=[],e=Bs,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ke=class extends vi{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Gn=class extends vi{constructor(t,e,i=en,s,r,a,o=We,l=We,c,h=zn,u=1){if(h!==zn&&h!==Xn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ga=class extends Gn{constructor(t,e=en,i=Bs,s,r,a=We,o=We,l,c=zn){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},xa=class extends vi{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},qt=class n extends we{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,s,a,2),p("x","z","y",1,-1,t,i,-e,s,a,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(u,2));function p(v,g,m,x,M,_,T,S,y,w,C){let R=_/y,D=T/w,F=_/2,G=T/2,I=S/2,z=y+1,Y=w+1,V=0,tt=0,W=new N;for(let j=0;j<Y;j++){let Q=j*D-G;for(let Et=0;Et<z;Et++){let Dt=Et*R-F;W[v]=Dt*x,W[g]=Q*M,W[m]=I,c.push(W.x,W.y,W.z),W[v]=0,W[g]=0,W[m]=S>0?1:-1,h.push(W.x,W.y,W.z),u.push(Et/y),u.push(1-j/w),V+=1}}for(let j=0;j<w;j++)for(let Q=0;Q<y;Q++){let Et=d+Q+z*j,Dt=d+Q+z*(j+1),X=d+(Q+1)+z*(j+1),yt=d+(Q+1)+z*j;l.push(Et,Dt,yt),l.push(Dt,X,yt),tt+=6}o.addGroup(f,tt,C),f+=tt,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},_i=class n extends we{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,p=i*2+r,v=s+1,g=new N,m=new N;for(let x=0;x<=p;x++){let M=0,_=0,T=0,S=0;if(x<=i){let C=x/i,R=C*Math.PI/2;_=-h-t*Math.cos(R),T=t*Math.sin(R),S=-t*Math.cos(R),M=C*u}else if(x<=i+r){let C=(x-i)/r;_=-h+C*e,T=t,S=0,M=u+C*d}else{let C=(x-i-r)/i,R=C*Math.PI/2;_=h+t*Math.sin(R),T=t*Math.cos(R),S=t*Math.sin(R),M=u+d+C*u}let y=Math.max(0,Math.min(1,M/f)),w=0;x===0?w=.5/s:x===p&&(w=-.5/s);for(let C=0;C<=s;C++){let R=C/s,D=R*Math.PI*2,F=Math.sin(D),G=Math.cos(D);m.x=-T*G,m.y=_,m.z=T*F,o.push(m.x,m.y,m.z),g.set(-T*G,S,T*F),g.normalize(),l.push(g.x,g.y,g.z),c.push(R+w,y)}if(x>0){let C=(x-1)*v;for(let R=0;R<s;R++){let D=C+R,F=C+R+1,G=x*v+R,I=x*v+R+1;a.push(D,F,G),a.push(F,I,G)}}}this.setIndex(a),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},fi=class n extends we{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new N,h=new bt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=i+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ee=class n extends we{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,v=[],g=i/2,m=0;x(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function x(){let _=new N,T=new N,S=0,y=(e-t)/i;for(let w=0;w<=r;w++){let C=[],R=w/r,D=R*(e-t)+t;for(let F=0;F<=s;F++){let G=F/s,I=G*l+o,z=Math.sin(I),Y=Math.cos(I);T.x=D*z,T.y=-R*i+g,T.z=D*Y,u.push(T.x,T.y,T.z),_.set(z,y,Y).normalize(),d.push(_.x,_.y,_.z),f.push(G,1-R),C.push(p++)}v.push(C)}for(let w=0;w<s;w++)for(let C=0;C<r;C++){let R=v[C][w],D=v[C+1][w],F=v[C+1][w+1],G=v[C][w+1];(t>0||C!==0)&&(h.push(R,D,G),S+=3),(e>0||C!==r-1)&&(h.push(D,F,G),S+=3)}c.addGroup(m,S,0),m+=S}function M(_){let T=p,S=new bt,y=new N,w=0,C=_===!0?t:e,R=_===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,g*R,0),d.push(0,R,0),f.push(.5,.5),p++;let D=p;for(let F=0;F<=s;F++){let I=F/s*l+o,z=Math.cos(I),Y=Math.sin(I);y.x=C*Y,y.y=g*R,y.z=C*z,u.push(y.x,y.y,y.z),d.push(0,R,0),S.x=z*.5+.5,S.y=Y*.5*R+.5,f.push(S.x,S.y),p++}for(let F=0;F<s;F++){let G=T+F,I=D+F;_===!0?h.push(I,I+1,G):h.push(I+1,I,G),w+=3}c.addGroup(m,w,_===!0?1:2),m+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},oi=class n extends ee{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zo=class n extends we{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){let M=new N,_=new N,T=new N;for(let S=0;S<e.length;S+=3)f(e[S+0],M),f(e[S+1],_),f(e[S+2],T),l(M,_,T,x)}function l(x,M,_,T){let S=T+1,y=[];for(let w=0;w<=S;w++){y[w]=[];let C=x.clone().lerp(_,w/S),R=M.clone().lerp(_,w/S),D=S-w;for(let F=0;F<=D;F++)F===0&&w===S?y[w][F]=C:y[w][F]=C.clone().lerp(R,F/D)}for(let w=0;w<S;w++)for(let C=0;C<2*(S-w)-1;C++){let R=Math.floor(C/2);C%2===0?(d(y[w][R+1]),d(y[w+1][R]),d(y[w][R])):(d(y[w][R+1]),d(y[w+1][R+1]),d(y[w+1][R]))}}function c(x){let M=new N;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(x),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){let x=new N;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];let _=g(x)/2/Math.PI+.5,T=m(x)/Math.PI+.5;a.push(_,1-T)}p(),u()}function u(){for(let x=0;x<a.length;x+=6){let M=a[x+0],_=a[x+2],T=a[x+4],S=Math.max(M,_,T),y=Math.min(M,_,T);S>.9&&y<.1&&(M<.2&&(a[x+0]+=1),_<.2&&(a[x+2]+=1),T<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,M){let _=x*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function p(){let x=new N,M=new N,_=new N,T=new N,S=new bt,y=new bt,w=new bt;for(let C=0,R=0;C<r.length;C+=9,R+=6){x.set(r[C+0],r[C+1],r[C+2]),M.set(r[C+3],r[C+4],r[C+5]),_.set(r[C+6],r[C+7],r[C+8]),S.set(a[R+0],a[R+1]),y.set(a[R+2],a[R+3]),w.set(a[R+4],a[R+5]),T.copy(x).add(M).add(_).divideScalar(3);let D=g(T);v(S,R+0,x,D),v(y,R+2,M,D),v(w,R+4,_,D)}}function v(x,M,_,T){T<0&&x.x===1&&(a[M]=x.x-1),_.x===0&&_.z===0&&(a[M]=T/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.detail)}};var ya=class n extends we{constructor(t=[new bt(0,-.5),new bt(.5,0),new bt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=oe(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,u=new N,d=new bt,f=new N,p=new N,v=new N,g=0,m=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:g=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:v.normalize(),l.push(v.x,v.y,v.z);break;default:g=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let x=0;x<=e;x++){let M=i+x*h*s,_=Math.sin(M),T=Math.cos(M);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*_,u.y=t[S].y,u.z=t[S].x*T,a.push(u.x,u.y,u.z),d.x=x/e,d.y=S/(t.length-1),o.push(d.x,d.y);let y=l[3*S+0]*_,w=l[3*S+1],C=l[3*S+0]*T;c.push(y,w,C)}}for(let x=0;x<e;x++)for(let M=0;M<t.length-1;M++){let _=M+x*t.length,T=_,S=_+t.length,y=_+t.length+1,w=_+1;r.push(T,S,w),r.push(y,w,S)}this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("uv",new Kt(o,2)),this.setAttribute("normal",new Kt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}},Ds=class n extends Zo{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},bi=class n extends we{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){let x=m*d-a;for(let M=0;M<c;M++){let _=M*u-r;p.push(_,-x,0),v.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){let M=x+c*m,_=x+c*(m+1),T=x+1+c*(m+1),S=x+1+c*m;f.push(M,_,S),f.push(_,T,S)}this.setIndex(f),this.setAttribute("position",new Kt(p,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},va=class n extends we{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],h=[],u=t,d=(e-t)/s,f=new N,p=new bt;for(let v=0;v<=s;v++){for(let g=0;g<=i;g++){let m=r+g/i*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<s;v++){let g=v*(i+1);for(let m=0;m<i;m++){let x=m+g,M=x,_=x+i+1,T=x+i+2,S=x+1;o.push(M,_,S),o.push(_,T,S)}}this.setIndex(o),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var kt=class n extends we{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new N,d=new N,f=[],p=[],v=[],g=[];for(let m=0;m<=i;m++){let x=[],M=m/i,_=a+M*o,T=t*Math.cos(_),S=Math.sqrt(t*t-T*T),y=0;m===0&&a===0?y=.5/e:m===i&&l===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){let C=w/e,R=s+C*r;u.x=-S*Math.cos(R),u.y=T,u.z=S*Math.sin(R),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(C+y,1-M),x.push(c++)}h.push(x)}for(let m=0;m<i;m++)for(let x=0;x<e;x++){let M=h[m][x+1],_=h[m][x],T=h[m+1][x],S=h[m+1][x+1];(m!==0||a>0)&&f.push(M,_,S),(m!==i-1||l<Math.PI)&&f.push(_,T,S)}this.setIndex(f),this.setAttribute("position",new Kt(p,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Be=class n extends we{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new N,f=new N,p=new N;for(let v=0;v<=i;v++){let g=a+v/i*o;for(let m=0;m<=s;m++){let x=m/s*r;f.x=(t+e*Math.cos(g))*Math.cos(x),f.y=(t+e*Math.cos(g))*Math.sin(x),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),d.x=t*Math.cos(x),d.y=t*Math.sin(x),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(m/s),u.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=s;g++){let m=(s+1)*v+g-1,x=(s+1)*(v-1)+g-1,M=(s+1)*(v-1)+g,_=(s+1)*v+g;l.push(m,x,_),l.push(x,M,_)}this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Gs(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(bd(s))s.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(bd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function pi(n){let t={};for(let e=0;e<n.length;e++){let i=Gs(n[e]);for(let s in i)t[s]=i[s]}return t}function bd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Lm(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Uh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var Vs={clone:Gs,merge:pi},Dm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pe=class extends tn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dm,this.fragmentShader=Nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gs(t.uniforms),this.uniformsGroups=Lm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new at().setHex(s.value);break;case"v2":this.uniforms[i].value=new bt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new N().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Gt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Se().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},$o=class extends pe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ns=class extends tn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new at(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=La,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var mn=class extends tn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new at(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=La,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=dl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Jo=class extends tn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},jo=class extends tn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function gr(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Co(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var hs=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Qo=class extends hs{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nh,endingEnd:nh}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case sh:r=t,o=2*e-i;break;case rh:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case sh:a=t,l=2*i-e;break;case rh:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(i-e)/(s-e),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,x=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,M=(-1-f)*g+(1.5+f)*v+.5*p,_=f*g-f*v;for(let T=0;T!==o;++T)r[T]=m*a[h+T]+x*a[c+T]+M*a[l+T]+_*a[u+T];return r}},tl=class extends hs{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},el=class extends hs{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},il=class extends hs{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(i-e)/(s-e),v=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*v+a[l+g]*p;return r}let d=o*2,f=t-1;for(let p=0;p!==o;++p){let v=a[c+p],g=a[l+p],m=f*d+p*2,x=u[m],M=u[m+1],_=t*d+p*2,T=h[_],S=h[_+1],y=Fm(i,e,x,T,s);r[p]=gf(y,v,M,S,g)}return r}};function gf(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function Um(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Fm(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=gf(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Um(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Ri=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=gr(e,this.TimeBufferType),this.values=gr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:gr(t.times,Array),values:gr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Co(t.settings)&&(i.settings={inTangents:gr(t.settings.inTangents,Array),outTangents:gr(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new el(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new tl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Qo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new il(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case na:e=this.InterpolantFactoryMethodDiscrete;break;case Go:e=this.InterpolantFactoryMethodLinear;break;case Lo:e=this.InterpolantFactoryMethodSmooth;break;case ih:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Bt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return na;case this.InterpolantFactoryMethodLinear:return Go;case this.InterpolantFactoryMethodSmooth:return Lo;case this.InterpolantFactoryMethodBezier:return ih}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t;Co(this.settings)&&(Sd(this.settings.inTangents,t),Sd(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Co(this.settings)&&(wd(this.settings.inTangents,t),wd(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(zt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(zt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){zt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){zt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&dm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){zt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Lo,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,d=u-i,f=u+i;for(let p=0;p!==i;++p){let v=e[u+p];if(v!==e[d+p]||v!==e[f+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,d=a*i;for(let f=0;f!==i;++f)e[d+f]=e[u+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Co(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Sd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function wd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Ri.prototype.ValueTypeName="";Ri.prototype.TimeBufferType=Float32Array;Ri.prototype.ValueBufferType=Float32Array;Ri.prototype.DefaultInterpolation=Go;var us=class extends Ri{constructor(t,e,i){super(t,e,i)}};us.prototype.ValueTypeName="bool";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=na;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var nl=class extends Ri{constructor(t,e,i,s){super(t,e,i,s)}};nl.prototype.ValueTypeName="color";var sl=class extends Ri{constructor(t,e,i,s){super(t,e,i,s)}};sl.prototype.ValueTypeName="number";var rl=class extends hs{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)pn.slerpFlat(r,0,a,c-o,a,c,l);return r}},_a=class extends Ri{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new rl(this.times,this.values,this.getValueSize(),t)}};_a.prototype.ValueTypeName="quaternion";_a.prototype.InterpolantFactoryMethodSmooth=void 0;var ds=class extends Ri{constructor(t,e,i){super(t,e,i)}};ds.prototype.ValueTypeName="string";ds.prototype.ValueBufferType=Array;ds.prototype.DefaultInterpolation=na;ds.prototype.InterpolantFactoryMethodLinear=void 0;ds.prototype.InterpolantFactoryMethodSmooth=void 0;var al=class extends Ri{constructor(t,e,i,s){super(t,e,i,s)}};al.prototype.ValueTypeName="vector";var ol=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xf=new ol,ll=class{constructor(t){this.manager=t!==void 0?t:xf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ll.DEFAULT_MATERIAL_NAME="__DEFAULT";var Tr=class extends ni{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new at(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},fs=class extends Tr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ni.DEFAULT_UP),this.updateMatrix(),this.groundColor=new at(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},eh=new Se,Ed=new N,Td=new N,Ma=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=Si,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ls,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Ed.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ed),Td.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Td),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){eh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(eh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Mr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(eh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Po=new N,Io=new pn,hn=new N,ba=class extends ni{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Po,Io,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Po,Io,hn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Po,Io,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Po,Io,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},rs=new N,Ad=new bt,Rd=new bt,Ke=class extends ba{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Vo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Dc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vo*2*Math.atan(Math.tan(Dc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(rs.x,rs.y).multiplyScalar(-t/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rs.x,rs.y).multiplyScalar(-t/rs.z)}getViewSize(t,e){return this.getViewBounds(t,Ad,Rd),e.subVectors(Rd,Ad)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Dc*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var oh=class extends Ma{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0}},ps=class extends Tr{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new oh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Us=class extends ba{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},lh=class extends Ma{constructor(){super(new Us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ms=class extends Tr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ni.DEFAULT_UP),this.updateMatrix(),this.target=new ni,this.shadow=new lh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var xr=-90,yr=1,Ar=class extends ni{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(xr,yr,t,e);s.layers=this.layers,this.add(s);let r=new Ke(xr,yr,t,e);r.layers=this.layers,this.add(r);let a=new Ke(xr,yr,t,e);a.layers=this.layers,this.add(a);let o=new Ke(xr,yr,t,e);o.layers=this.layers,this.add(o);let l=new Ke(xr,yr,t,e);l.layers=this.layers,this.add(l);let c=new Ke(xr,yr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===zi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Mr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.mipmapsAutoUpdate=v,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},cl=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}},Sa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Om.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Om(){this._document.hidden===!1&&this.reset()}var Fh="\\[\\]\\.:\\/",Bm=new RegExp("["+Fh+"]","g"),Oh="[^"+Fh+"]",km="[^"+Fh.replace("\\.","")+"]",zm=/((?:WC+[\/:])*)/.source.replace("WC",Oh),Hm=/(WCOD+)?/.source.replace("WCOD",km),Gm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Oh),Vm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Oh),Wm=new RegExp("^"+zm+Hm+Gm+Vm+"$"),Xm=["material","materials","bones","map"],ch=class{constructor(t,e,i){let s=i||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ae=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Bm,"")}static parseTrackName(t){let e=Wm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Xm.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Bt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){zt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){zt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){zt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){zt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){zt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;zt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=ch;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var b_=new Float32Array(1);var Vh=class Vh{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Vh.prototype.isMatrix2=!0;var hh=Vh;function Bh(n,t,e,i){let s=qm(i);switch(e){case Ah:return n*t;case Ch:return n*t/s.components*s.byteLength;case vl:return n*t/s.components*s.byteLength;case xs:return n*t*2/s.components*s.byteLength;case _l:return n*t*2/s.components*s.byteLength;case Rh:return n*t*3/s.components*s.byteLength;case sn:return n*t*4/s.components*s.byteLength;case Ml:return n*t*4/s.components*s.byteLength;case Ta:case Aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Sl:case El:return Math.max(n,16)*Math.max(t,8)/4;case bl:case wl:return Math.max(n,8)*Math.max(t,8)/2;case Tl:case Al:case Cl:case Pl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Rl:case Pa:case Il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Nl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ul:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Fl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ol:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Bl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case kl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case zl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Hl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Gl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Vl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Wl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Xl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ql:case Yl:case Kl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Zl:case $l:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ia:case Jl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function qm(n){switch(n){case Si:case Sh:return{byteLength:1,components:1};case Pr:case wh:case Xe:return{byteLength:2,components:1};case xl:case yl:return{byteLength:2,components:4};case en:case gl:case nn:return{byteLength:4,components:1};case Eh:case Th:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function kf(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Km(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let v=u[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Zm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$m=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,t0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,i0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,s0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,r0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,a0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,o0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,l0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,c0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,g0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,x0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,y0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,v0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,_0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w0="gl_FragColor = linearToOutputTexel( gl_FragColor );",E0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,T0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,P0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,I0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,F0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,z0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,H0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,q0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Y0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Z0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,J0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ig=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ag=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,og=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lg=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,xg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,wg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ag=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Dg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ug=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Og=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Kg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ex=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ix=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ax=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ux=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,px=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ax=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:Zm,alphahash_pars_fragment:$m,alphamap_fragment:Jm,alphamap_pars_fragment:jm,alphatest_fragment:Qm,alphatest_pars_fragment:t0,aomap_fragment:e0,aomap_pars_fragment:i0,batching_pars_vertex:n0,batching_vertex:s0,begin_vertex:r0,beginnormal_vertex:a0,bsdfs:o0,iridescence_fragment:l0,bumpmap_pars_fragment:c0,clipping_planes_fragment:h0,clipping_planes_pars_fragment:u0,clipping_planes_pars_vertex:d0,clipping_planes_vertex:f0,color_fragment:p0,color_pars_fragment:m0,color_pars_vertex:g0,color_vertex:x0,common:y0,defaultnormal_vertex:v0,displacementmap_pars_vertex:_0,displacementmap_vertex:M0,emissivemap_fragment:b0,emissivemap_pars_fragment:S0,colorspace_fragment:w0,colorspace_pars_fragment:E0,envmap_fragment:T0,envmap_common_pars_fragment:A0,envmap_pars_fragment:R0,envmap_pars_vertex:C0,envmap_physical_pars_fragment:z0,envmap_vertex:P0,fog_vertex:I0,fog_pars_vertex:L0,fog_fragment:D0,fog_pars_fragment:N0,gradientmap_pars_fragment:U0,lightmap_pars_fragment:F0,lights_lambert_fragment:O0,lights_lambert_pars_fragment:B0,lights_pars_begin:k0,lights_toon_fragment:H0,lights_toon_pars_fragment:G0,lights_phong_fragment:V0,lights_phong_pars_fragment:W0,lights_physical_fragment:X0,lights_physical_pars_fragment:q0,lights_fragment_begin:Y0,lights_fragment_maps:K0,lights_fragment_end:Z0,lightprobes_pars_fragment:$0,logdepthbuf_fragment:J0,logdepthbuf_pars_fragment:j0,logdepthbuf_pars_vertex:Q0,logdepthbuf_vertex:tg,map_fragment:eg,map_pars_fragment:ig,map_particle_fragment:ng,map_particle_pars_fragment:sg,metalnessmap_fragment:rg,metalnessmap_pars_fragment:ag,morphinstance_vertex:og,morphcolor_vertex:lg,morphnormal_vertex:cg,morphtarget_pars_vertex:hg,morphtarget_vertex:ug,normal_fragment_begin:dg,normal_fragment_maps:fg,normal_pars_fragment:pg,normal_pars_vertex:mg,normal_vertex:gg,normalmap_pars_fragment:xg,clearcoat_normal_fragment_begin:yg,clearcoat_normal_fragment_maps:vg,clearcoat_pars_fragment:_g,iridescence_pars_fragment:Mg,opaque_fragment:bg,packing:Sg,premultiplied_alpha_fragment:wg,project_vertex:Eg,dithering_fragment:Tg,dithering_pars_fragment:Ag,roughnessmap_fragment:Rg,roughnessmap_pars_fragment:Cg,shadowmap_pars_fragment:Pg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Lg,shadowmask_pars_fragment:Dg,skinbase_vertex:Ng,skinning_pars_vertex:Ug,skinning_vertex:Fg,skinnormal_vertex:Og,specularmap_fragment:Bg,specularmap_pars_fragment:kg,tonemapping_fragment:zg,tonemapping_pars_fragment:Hg,transmission_fragment:Gg,transmission_pars_fragment:Vg,uv_pars_fragment:Wg,uv_pars_vertex:Xg,uv_vertex:qg,worldpos_vertex:Yg,background_vert:Kg,background_frag:Zg,backgroundCube_vert:$g,backgroundCube_frag:Jg,cube_vert:jg,cube_frag:Qg,depth_vert:tx,depth_frag:ex,distance_vert:ix,distance_frag:nx,equirect_vert:sx,equirect_frag:rx,linedashed_vert:ax,linedashed_frag:ox,meshbasic_vert:lx,meshbasic_frag:cx,meshlambert_vert:hx,meshlambert_frag:ux,meshmatcap_vert:dx,meshmatcap_frag:fx,meshnormal_vert:px,meshnormal_frag:mx,meshphong_vert:gx,meshphong_frag:xx,meshphysical_vert:yx,meshphysical_frag:vx,meshtoon_vert:_x,meshtoon_frag:Mx,points_vert:bx,points_frag:Sx,shadow_vert:wx,shadow_frag:Ex,sprite_vert:Tx,sprite_frag:Ax},_t={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},yn={basic:{uniforms:pi([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:pi([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new at(0)},envMapIntensity:{value:1}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:pi([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:pi([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:pi([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new at(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:pi([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:pi([_t.points,_t.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:pi([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:pi([_t.common,_t.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:pi([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:pi([_t.sprite,_t.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distance:{uniforms:pi([_t.common,_t.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distance_vert,fragmentShader:Qt.distance_frag},shadow:{uniforms:pi([_t.lights,_t.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};yn.physical={uniforms:pi([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};var Ql={r:0,b:0,g:0},Rx=new Se,zf=new Gt;zf.set(-1,0,0,0,1,0,0,0,1);function Cx(n,t,e,i,s,r){let a=new at(0),o=s===!0?0:1,l,c,h=null,u=0,d=null;function f(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){let _=x.backgroundBlurriness>0;M=t.get(M,_)}return M}function p(x){let M=!1,_=f(x);_===null?g(a,o):_&&_.isColor&&(g(_,1),M=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(x,M){let _=f(M);_&&_.isCubeTexture?(c===void 0&&(c=new Ct(new qt(1,1,1),new pe({name:"BackgroundCubeMaterial",uniforms:Gs(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,S,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Rx.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zf),c.material.toneMapped=ae.getTransfer(_.colorSpace)!==fe,(h!==_||u!==_.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ct(new bi(2,2),new pe({name:"BackgroundMaterial",uniforms:Gs(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ae.getTransfer(_.colorSpace)!==fe,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,M){x.getRGB(Ql,Uh(n)),e.buffers.color.setClear(Ql.r,Ql.g,Ql.b,M,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,g(a,o)},render:p,addToRenderList:v,dispose:m}}function Px(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(D,F,G,I,z){let Y=!1,V=u(D,I,G,F);r!==V&&(r=V,c(r.object)),Y=f(D,I,G,z),Y&&p(D,I,G,z),z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,_(D,F,G,I),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function u(D,F,G,I){let z=I.wireframe===!0,Y=i[F.id];Y===void 0&&(Y={},i[F.id]=Y);let V=D.isInstancedMesh===!0?D.id:0,tt=Y[V];tt===void 0&&(tt={},Y[V]=tt);let W=tt[G.id];W===void 0&&(W={},tt[G.id]=W);let j=W[z];return j===void 0&&(j=d(l()),W[z]=j),j}function d(D){let F=[],G=[],I=[];for(let z=0;z<e;z++)F[z]=0,G[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:I,object:D,attributes:{},index:null}}function f(D,F,G,I){let z=r.attributes,Y=F.attributes,V=0,tt=G.getAttributes();for(let W in tt)if(tt[W].location>=0){let Q=z[W],Et=Y[W];if(Et===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(Et=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(Et=D.instanceColor)),Q===void 0||Q.attribute!==Et||Et&&Q.data!==Et.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function p(D,F,G,I){let z={},Y=F.attributes,V=0,tt=G.getAttributes();for(let W in tt)if(tt[W].location>=0){let Q=Y[W];Q===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor));let Et={};Et.attribute=Q,Q&&Q.data&&(Et.data=Q.data),z[W]=Et,V++}r.attributes=z,r.attributesNum=V,r.index=I}function v(){let D=r.newAttributes;for(let F=0,G=D.length;F<G;F++)D[F]=0}function g(D){m(D,0)}function m(D,F){let G=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;G[D]=1,I[D]===0&&(n.enableVertexAttribArray(D),I[D]=1),z[D]!==F&&(n.vertexAttribDivisor(D,F),z[D]=F)}function x(){let D=r.newAttributes,F=r.enabledAttributes;for(let G=0,I=F.length;G<I;G++)F[G]!==D[G]&&(n.disableVertexAttribArray(G),F[G]=0)}function M(D,F,G,I,z,Y,V){V===!0?n.vertexAttribIPointer(D,F,G,z,Y):n.vertexAttribPointer(D,F,G,I,z,Y)}function _(D,F,G,I){v();let z=I.attributes,Y=G.getAttributes(),V=F.defaultAttributeValues;for(let tt in Y){let W=Y[tt];if(W.location>=0){let j=z[tt];if(j===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){let Q=j.normalized,Et=j.itemSize,Dt=t.get(j);if(Dt===void 0)continue;let X=Dt.buffer,yt=Dt.type,wt=Dt.bytesPerElement,Nt=yt===n.INT||yt===n.UNSIGNED_INT||j.gpuType===gl;if(j.isInterleavedBufferAttribute){let gt=j.data,Ht=gt.isInterleavedBuffer===!0?gt.stride:gt.itemSize,xt=j.offset;if(gt.isInstancedInterleavedBuffer||gt.isInstancedBufferAttribute){for(let pt=0;pt<W.locationSize;pt++)m(W.location+pt,gt.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let pt=0;pt<W.locationSize;pt++)g(W.location+pt);n.bindBuffer(n.ARRAY_BUFFER,X);for(let pt=0;pt<W.locationSize;pt++)M(W.location+pt,Et/W.locationSize,yt,Q,Ht*wt,(xt+Et/W.locationSize*pt)*wt,Nt)}else{if(j.isInstancedBufferAttribute){for(let gt=0;gt<W.locationSize;gt++)m(W.location+gt,j.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let gt=0;gt<W.locationSize;gt++)g(W.location+gt);n.bindBuffer(n.ARRAY_BUFFER,X);for(let gt=0;gt<W.locationSize;gt++)M(W.location+gt,Et/W.locationSize,yt,Q,Et*wt,Et/W.locationSize*gt*wt,Nt)}}else if(V!==void 0){let Q=V[tt];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(W.location,Q);break;case 3:n.vertexAttrib3fv(W.location,Q);break;case 4:n.vertexAttrib4fv(W.location,Q);break;default:n.vertexAttrib1fv(W.location,Q)}}}}x()}function T(){C();for(let D in i){let F=i[D];for(let G in F){let I=F[G];for(let z in I){let Y=I[z];for(let V in Y)h(Y[V].object),delete Y[V];delete I[z]}}delete i[D]}}function S(D){if(i[D.id]===void 0)return;let F=i[D.id];for(let G in F){let I=F[G];for(let z in I){let Y=I[z];for(let V in Y)h(Y[V].object),delete Y[V];delete I[z]}}delete i[D.id]}function y(D){for(let F in i){let G=i[F];for(let I in G){let z=G[I];if(z[D.id]===void 0)continue;let Y=z[D.id];for(let V in Y)h(Y[V].object),delete Y[V];delete z[D.id]}}}function w(D){for(let F in i){let G=i[F],I=D.isInstancedMesh===!0?D.id:0,z=G[I];if(z!==void 0){for(let Y in z){let V=z[Y];for(let tt in V)h(V[tt].object),delete V[tt];delete z[Y]}delete G[I],Object.keys(G).length===0&&delete i[F]}}}function C(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:y,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function Ix(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Lx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let y=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(y){return!(y!==sn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){let w=y===Xe&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==Si&&y!==nn&&!w&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Bt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Bt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,maxSamples:T,samples:S}}function Dx(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Qi,o=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=n.get(u);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{let x=r?0:i,M=x*4,_=m.clippingState||null;l.value=_,_=h(p,d,M,f);for(let T=0;T!==M;++T)_[T]=e[T];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,p){let v=u!==null?u.length:0,g=null;if(v!==0){if(g=l.value,p!==!0||g===null){let m=f+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,_=f;M!==v;++M,_+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}var Ua=class extends Oe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ma(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new qt(5,5,5),r=new pe({name:"CubemapFromEquirect",uniforms:Gs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ze,blending:Vn});r.uniforms.tEquirect.value=e;let a=new Ct(s,r),o=e.minFilter;return e.minFilter===Wn&&(e.minFilter=yi),new Ar(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},yf=256,Nx=3,Ux=20,Hf=256,Gf=16,Fx=3,Ox=new N,Bx=new at,ec=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ar(1,10,null),this._boxMesh=new Ct(new qt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=Ox}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,v=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(t.background=l.getClearColor(Bx));let g=new Ar(i,s,h);return g.position.copy(o),g.update(l,t),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=f,l.autoClearStencil=p,t.background=v,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_f(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(yf,uf(t))}_fromTexture(t,e){t.mapping===Bs||t.mapping===Cr?this._setSize(t.image.length===0?yf:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=vf(t,!1,!1),i=Math.log2(t)-Nx;for(let s=0;s<=i;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=vf(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Bs||t.mapping===Cr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mf()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=_f()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=kx(),this._integrationMaterial=zx());let e=this._cubeSize,i=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Gf);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-Fx)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(Hf*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Hx());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,i),s.envMap.value=t.texture,this._renderCube(r,0,i)}};function vf(n,t,e){return new Ua(n,{minFilter:Wn,generateMipmaps:t,type:Xe,colorSpace:sa,depthBuffer:e})}function Fa(n,t,e){return new pe({name:n,uniforms:t,vertexShader:Qt.cube_vert,fragmentShader:e,side:Ze,blending:Vn,depthTest:!1,depthWrite:!1})}function kx(){return Fa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Hf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function zx(){return Fa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Gf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Hx(){return Fa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ux}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function _f(){return Fa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Mf(){return Fa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Gx(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===fl||f===pl)if(t.has(d)){let p=t.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let v=new Ua(p.height);return v.fromEquirectangularTexture(n,d),t.set(d,v),d.addEventListener("dispose",c),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,p=f===fl||f===pl,v=f===Bs||f===Cr;if(p||v){let g=e.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new ec(n)),g=p?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{let x=d.image;return p&&x&&x.height>0||v&&x&&l(x)?(i===null&&(i=new ec(n)),g=p?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===fl?d.mapping=Bs:f===pl&&(d.mapping=Cr),d}function l(d){let f=0,p=6;for(let v=0;v<p;v++)d[v]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function Vx(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&ia("WebGLRenderer: "+i+" extension not supported."),s}}}function Wx(n,t,e,i){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let v=r.get(p);v&&(t.remove(v),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,v){return s[v.id]!==void 0||(v.addEventListener("dispose",o),s[v.id]=new WeakRef(v),a.register(v,v.id,v),e.memory.geometries++),v}function h(p){let v=p.attributes;for(let g in v)t.update(v[g],n.ARRAY_BUFFER)}function u(p){let v=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let x=v!==null?v.array.length:g.array.length/3-1,M=g.count>=65535?da:ua,_=new M(Math.ceil(x/3)*6,1),T=_.array;if(v!==null){let y=v.array;m=v.version;for(let w=0,C=0;w<x;w+=3){let R=y[w+0],D=y[w+1],F=y[w+2];T[C++]=R,T[C++]=D,T[C++]=D,T[C++]=F,T[C++]=F,T[C++]=R}}else{m=g.version;for(let y=0,w=0;y<x;y+=3){let C=y+0,R=y+1,D=y+2;T[w++]=C,T[w++]=R,T[w++]=R,T[w++]=D,T[w++]=D,T[w++]=C}}_.version=m;let S=r.get(p);S&&t.remove(S),r.set(p,_)}function d(p){let v=r.get(p);if(v){let g=p.index;g!==null&&v.version<g.version&&u(p)}else u(p);return r.get(p)}function f(){for(let p in s){let v=s[p].deref();v!==void 0&&l(v)}}return{get:c,update:h,getWireframeAttribute:d,dispose:f}}function Xx(n,t,e){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){n.drawElements(i,d,r,u*a),e.update(d,i,1)}function c(u,d,f){f!==0&&(n.drawElementsInstanced(i,d,r,u*a,f),e.update(d,i,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,f);let v=0;for(let g=0;g<f;g++)v+=d[g];e.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function qx(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:zt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Yx(n,t,e){let i=new WeakMap,s=new Ie;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let C=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],M=0;f===!0&&(M=1),p===!0&&(M=2),v===!0&&(M=3);let _=o.attributes.position.count*M,T=1;_>t.maxTextureSize&&(T=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let S=new Float32Array(_*T*4*u),y=new la(S,_,T,u);y.type=nn,y.needsUpdate=!0;let w=M*4;for(let R=0;R<u;R++){let D=g[R],F=m[R],G=x[R],I=_*T*4*R;for(let z=0;z<D.count;z++){let Y=z*w;f===!0&&(s.fromBufferAttribute(D,z),S[I+Y+0]=s.x,S[I+Y+1]=s.y,S[I+Y+2]=s.z,S[I+Y+3]=0),p===!0&&(s.fromBufferAttribute(F,z),S[I+Y+4]=s.x,S[I+Y+5]=s.y,S[I+Y+6]=s.z,S[I+Y+7]=0),v===!0&&(s.fromBufferAttribute(G,z),S[I+Y+8]=s.x,S[I+Y+9]=s.y,S[I+Y+10]=s.z,S[I+Y+11]=G.itemSize===4?s.w:1)}}d={count:u,texture:y,size:new bt(_,T)},i.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Kx(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Zx={[gh]:"LINEAR_TONE_MAPPING",[xh]:"REINHARD_TONE_MAPPING",[yh]:"CINEON_TONE_MAPPING",[vh]:"ACES_FILMIC_TONE_MAPPING",[Mh]:"AGX_TONE_MAPPING",[Os]:"NEUTRAL_TONE_MAPPING",[_h]:"CUSTOM_TONE_MAPPING"};function $x(n,t,e,i,s,r){let a=new Oe(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new we;h.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Kt([0,2,0,0,2,0],2));let u=new $o({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ct(h,u),f=new Us(-1,1,1,-1,0,1),p=null,v=null,g=!1,m,x=null,M=[],_=!1;this.setSize=function(T,S){a.setSize(T,S),o!==null&&o.setSize(T,S),l!==null&&l.setSize(T,S);for(let y=0;y<M.length;y++){let w=M[y];w.setSize&&w.setSize(T,S)}},this.setEffects=function(T){M=T,_=M.length>0&&M[0].isRenderPass===!0;let S=a.width,y=a.height;M.length>0&&o===null&&(o=new Oe(S,y,{type:Xe,depthBuffer:!1,stencilBuffer:!1}),l=new Oe(S,y,{type:Xe,depthBuffer:!1,stencilBuffer:!1}));let w=s===!0&&M.some(C=>C.needsDepthTexture===!0);w!==(a.depthTexture!==null)&&(w===!0&&c===null&&(c=new Gn(S,y),r===!0&&(c.format=Xn,c.type=ks)),a.dispose(),a.depthTexture=w?c:null,a.resolveDepthBuffer=w,a.storeMultisampledDepthBuffer=w);for(let C=0;C<M.length;C++){let R=M[C];R.setSize&&R.setSize(S,y),w&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(T,S){if(g||T.toneMapping===Hi&&M.length===0)return!1;if(x=S,S!==null){let y=S.width,w=S.height;(a.width!==y||a.height!==w)&&this.setSize(y,w)}return _===!1&&T.setRenderTarget(a),m=T.toneMapping,T.toneMapping=Hi,!0},this.hasRenderPass=function(){return _},this.end=function(T,S){T.toneMapping=m,g=!0;let y=a,w=o;for(let C=0;C<M.length;C++){let R=M[C];R.enabled!==!1&&(R.render(T,w,y,S),R.needsSwap!==!1&&(y=w,w=w===o?l:o))}if(p!==T.outputColorSpace||v!==T.toneMapping){p=T.outputColorSpace,v=T.toneMapping,u.defines={},ae.getTransfer(p)===fe&&(u.defines.SRGB_TRANSFER="");let C=Zx[v];C&&(u.defines[C]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,T.setRenderTarget(x),T.render(d,f),x=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var Vf=new vi,Wf=new Gn(1,1),Xf=new ga(1),qf=new la,Yf=new qo,Kf=new ma,bf=[],Sf=[],wf=new Float32Array(16),Ef=new Float32Array(9),Tf=new Float32Array(4);function Dr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=bf[s];if(r===void 0&&(r=new Float32Array(s),bf[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function $e(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Je(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ic(n,t){let e=Sf[t];e===void 0&&(e=new Int32Array(t),Sf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Jx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function jx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;n.uniform2fv(this.addr,t),Je(e,t)}}function Qx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if($e(e,t))return;n.uniform3fv(this.addr,t),Je(e,t)}}function ty(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;n.uniform4fv(this.addr,t),Je(e,t)}}function ey(n,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Je(e,t)}else{if($e(e,i))return;Tf.set(i),n.uniformMatrix2fv(this.addr,!1,Tf),Je(e,i)}}function iy(n,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Je(e,t)}else{if($e(e,i))return;Ef.set(i),n.uniformMatrix3fv(this.addr,!1,Ef),Je(e,i)}}function ny(n,t){let e=this.cache,i=t.elements;if(i===void 0){if($e(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Je(e,t)}else{if($e(e,i))return;wf.set(i),n.uniformMatrix4fv(this.addr,!1,wf),Je(e,i)}}function sy(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ry(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;n.uniform2iv(this.addr,t),Je(e,t)}}function ay(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;n.uniform3iv(this.addr,t),Je(e,t)}}function oy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;n.uniform4iv(this.addr,t),Je(e,t)}}function ly(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function cy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;n.uniform2uiv(this.addr,t),Je(e,t)}}function hy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;n.uniform3uiv(this.addr,t),Je(e,t)}}function uy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;n.uniform4uiv(this.addr,t),Je(e,t)}}function nc(n){return n.version===0&&(n.compareFunction=Lh,n.needsUpdate=!0),n}function dy(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=nc(Wf):r=Vf,e.setTexture2D(t||r,s)}function fy(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Yf,s)}function py(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=nc(Xf):r=Kf,e.setTextureCube(t||r,s)}function my(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||qf,s)}function gy(n){switch(n){case 5126:return Jx;case 35664:return jx;case 35665:return Qx;case 35666:return ty;case 35674:return ey;case 35675:return iy;case 35676:return ny;case 5124:case 35670:return sy;case 35667:case 35671:return ry;case 35668:case 35672:return ay;case 35669:case 35673:return oy;case 5125:return ly;case 36294:return cy;case 36295:return hy;case 36296:return uy;case 35678:case 36198:case 36298:case 36306:case 35682:return dy;case 35679:case 36299:case 36307:return fy;case 35680:case 36300:case 36308:case 36293:return py;case 36289:case 36303:case 36311:case 36292:return my}}function xy(n,t){n.uniform1fv(this.addr,t)}function yy(n,t){let e=Dr(t,this.size,2);n.uniform2fv(this.addr,e)}function vy(n,t){let e=Dr(t,this.size,3);n.uniform3fv(this.addr,e)}function _y(n,t){let e=Dr(t,this.size,4);n.uniform4fv(this.addr,e)}function My(n,t){let e=Dr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function by(n,t){let e=Dr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Sy(n,t){let e=Dr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wy(n,t){n.uniform1iv(this.addr,t)}function Ey(n,t){n.uniform2iv(this.addr,t)}function Ty(n,t){n.uniform3iv(this.addr,t)}function Ay(n,t){n.uniform4iv(this.addr,t)}function Ry(n,t){n.uniform1uiv(this.addr,t)}function Cy(n,t){n.uniform2uiv(this.addr,t)}function Py(n,t){n.uniform3uiv(this.addr,t)}function Iy(n,t){n.uniform4uiv(this.addr,t)}function Ly(n,t,e){let i=this.cache,s=t.length,r=ic(e,s);$e(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=nc(Wf):a=Vf;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Dy(n,t,e){let i=this.cache,s=t.length,r=ic(e,s);$e(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Yf,r[a])}function Ny(n,t,e){let i=this.cache,s=t.length,r=ic(e,s);$e(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=nc(Xf):a=Kf;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function Uy(n,t,e){let i=this.cache,s=t.length,r=ic(e,s);$e(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||qf,r[a])}function Fy(n){switch(n){case 5126:return xy;case 35664:return yy;case 35665:return vy;case 35666:return _y;case 35674:return My;case 35675:return by;case 35676:return Sy;case 5124:case 35670:return wy;case 35667:case 35671:return Ey;case 35668:case 35672:return Ty;case 35669:case 35673:return Ay;case 5125:return Ry;case 36294:return Cy;case 36295:return Py;case 36296:return Iy;case 35678:case 36198:case 36298:case 36306:case 35682:return Ly;case 35679:case 36299:case 36307:return Dy;case 35680:case 36300:case 36308:case 36293:return Ny;case 36289:case 36303:case 36311:case 36292:return Uy}}var qh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=gy(e.type)}},Yh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fy(e.type)}},Kh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Wh=/(\w+)(\])?(\[|\.)?/g;function Af(n,t){n.seq.push(t),n.map[t.id]=t}function Oy(n,t,e){let i=n.name,s=i.length;for(Wh.lastIndex=0;;){let r=Wh.exec(i),a=Wh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Af(e,c===void 0?new qh(o,n,t):new Yh(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Kh(o),Af(e,u)),e=u}}}var Ir=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Oy(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Rf(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var By=37297,ky=0;function zy(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Cf=new Gt;function Hy(n){ae._getMatrix(Cf,ae.workingColorSpace,n);let t=`mat3( ${Cf.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(n)){case ra:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Pf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+zy(n.getShaderSource(t),o)}else return r}function Gy(n,t){let e=Hy(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Vy={[gh]:"Linear",[xh]:"Reinhard",[yh]:"Cineon",[vh]:"ACESFilmic",[Mh]:"AgX",[Os]:"Neutral",[_h]:"Custom"};function Wy(n,t){let e=Vy[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var tc=new N;function Xy(){ae.getLuminanceCoefficients(tc);let n=tc.x.toFixed(4),t=tc.y.toFixed(4),e=tc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Na).join(`
`)}function Yy(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ky(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Na(n){return n!==""}function If(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Lf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zh(n){return n.replace(Zy,$y)}function $y(n,t){let e=Qt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Zh(e)}var Jy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Df(n){return n.replace(Jy,jy)}function jy(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Qy={[wa]:"SHADOWMAP_TYPE_PCF",[Rr]:"SHADOWMAP_TYPE_VSM"};function tv(n){return Qy[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ev={[Cr]:"ENVMAP_MODE_REFRACTION"};function iv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ev[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var nv={[dl]:"ENVMAP_BLENDING_MULTIPLY",[Zd]:"ENVMAP_BLENDING_MIX",[$d]:"ENVMAP_BLENDING_ADD"};function sv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":nv[n.combine]||"ENVMAP_BLENDING_NONE"}function rv(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=tv(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=iv(e),u=sv(e),d=qy(e),f=Yy(r),p=s.createProgram(),v,g,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Na).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Na).join(`
`),g.length>0&&(g+=`
`)):(v=[Nf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Na).join(`
`),g=[Nf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hi?"#define TONE_MAPPING":"",e.toneMapping!==Hi?Qt.tonemapping_pars_fragment:"",e.toneMapping!==Hi?Wy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,Gy("linearToOutputTexel",e.outputColorSpace),Xy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Na).join(`
`)),a=Zh(a),a=If(a,e),a=Lf(a,e),o=Zh(o),o=If(o,e),o=Lf(o,e),a=Df(a),o=Df(o),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,v=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",e.glslVersion===Nh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let x=m+v+a,M=m+g+o,_=Rf(s,s.VERTEX_SHADER,x),T=Rf(s,s.FRAGMENT_SHADER,M);s.attachShader(p,_),s.attachShader(p,T),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function S(R){if(n.debug.checkShaderErrors){let D=s.getProgramInfoLog(p)||"",F=s.getShaderInfoLog(_)||"",G=s.getShaderInfoLog(T)||"",I=D.trim(),z=F.trim(),Y=G.trim(),V=!0,tt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,_,T);else{let W=Pf(s,_,"vertex"),j=Pf(s,T,"fragment");zt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+W+`
`+j)}else I!==""?Bt("WebGLProgram: Program Info Log:",I):(z===""||Y==="")&&(tt=!1);tt&&(R.diagnostics={runnable:V,programLog:I,vertexShader:{log:z,prefix:v},fragmentShader:{log:Y,prefix:g}})}s.deleteShader(_),s.deleteShader(T),y=new Ir(s,p),w=Ky(s,p)}let y;this.getUniforms=function(){return y===void 0&&S(this),y};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(p,By)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ky++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=_,this.fragmentShader=T,this}var av=0,$h=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Jh(t),e.set(t,i)),i}},Jh=class{constructor(t){this.id=av++,this.code=t,this.usedTimes=0}};function ov(n){return n===xs||n===Pa||n===Ia}function lv(n,t,e,i,s,r){let a=new ca,o=new $h,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(y){return l.add(y),y===0?"uv":`uv${y}`}function p(y,w,C,R,D,F){let G=R.fog,I=D.geometry,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,Y=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,V=t.get(y.envMap||z,Y),tt=d[y.type],W=i.precision;y.precision!==null&&(W=i.getMaxPrecision(y.precision),W!==y.precision&&Bt("WebGLProgram.getParameters:",y.precision,"not supported, using",W,"instead."));let j=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Q=j!==void 0?j.length:0,Et=0;I.morphAttributes.position!==void 0&&(Et=1),I.morphAttributes.normal!==void 0&&(Et=2),I.morphAttributes.color!==void 0&&(Et=3);let Dt,X,yt,wt;if(tt){let vt=yn[tt];Dt=vt.vertexShader,X=vt.fragmentShader}else{Dt=y.vertexShader,X=y.fragmentShader;let vt=o.getVertexShaderStage(y),ge=o.getFragmentShaderStage(y);o.update(y,vt,ge),yt=vt.id,wt=ge.id}let Nt=n.getRenderTarget(),gt=n.state.buffers.depth.getReversed(),Ht=D.isInstancedMesh===!0,xt=D.isBatchedMesh===!0,pt=!!y.map,Jt=!!y.matcap,ne=!!V,Wt=ne&&V.isPMREMTexture===!0,Fe=!!y.aoMap,qe=!!y.lightMap,Mi=!!y.bumpMap&&y.wireframe===!1,Ne=!!y.normalMap,an=!!y.displacementMap,Qe=!!y.emissiveMap,Li=!!y.metalnessMap,Di=!!y.roughnessMap,Ni=y.anisotropy>0,U=y.clearcoat>0,Ui=y.diffuseRoughness>0,Ce=y.dispersion>0,Pe=y.retroreflectivity>0,mt=y.iridescence>0,Ye=y.sheen>0,Ft=y.transmission>0,Xt=Ni&&!!y.anisotropyMap,A=U&&!!y.clearcoatMap,b=U&&!!y.clearcoatNormalMap,B=U&&!!y.clearcoatRoughnessMap,et=Ui&&!!y.diffuseRoughnessMap,J=mt&&!!y.iridescenceMap,ot=mt&&!!y.iridescenceThicknessMap,dt=Ye&&!!y.sheenColorMap,K=Ye&&!!y.sheenRoughnessMap,Z=!!y.specularMap,ct=!!y.specularColorMap,P=!!y.specularIntensityMap,$=Ft&&!!y.transmissionMap,q=Ft&&!!y.thicknessMap,ht=!!y.gradientMap,rt=!!y.alphaMap,lt=y.alphaTest>0,Lt=!!y.alphaHash,jt=!!y.extensions,nt=Hi;y.toneMapped&&(Nt===null||Nt.isXRRenderTarget===!0)&&(nt=n.toneMapping);let Ut=Wt?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,Zt={shaderID:tt,shaderType:y.type,shaderName:y.name,vertexShader:Dt,fragmentShader:X,defines:y.defines,customVertexShaderID:yt,customFragmentShaderID:wt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:W,batching:xt,batchingColor:xt&&D._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&D.instanceColor!==null,instancingMorph:Ht&&D.morphTexture!==null,outputColorSpace:Nt===null?n.outputColorSpace:Nt.isXRRenderTarget===!0?Nt.texture.colorSpace:ae.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:pt,matcap:Jt,envMap:ne,envMapMode:ne&&V.mapping,envMapPMREM:Wt,envMapMaxLod:Wt?Ut.length-1:null,envMapSize:Wt?Ut[0].width:null,aoMap:Fe,lightMap:qe,bumpMap:Mi,normalMap:Ne,displacementMap:an,emissiveMap:Qe,normalMapObjectSpace:Ne&&y.normalMapType===Qd,normalMapTangentSpace:Ne&&y.normalMapType===La,packedNormalMap:Ne&&y.normalMapType===La&&ov(y.normalMap.format),metalnessMap:Li,roughnessMap:Di,anisotropy:Ni,anisotropyMap:Xt,clearcoat:U,clearcoatMap:A,clearcoatNormalMap:b,clearcoatRoughnessMap:B,diffuseRoughness:Ui,diffuseRoughnessMap:et,dispersion:Ce,retroreflection:Pe,iridescence:mt,iridescenceMap:J,iridescenceThicknessMap:ot,sheen:Ye,sheenColorMap:dt,sheenRoughnessMap:K,specularMap:Z,specularColorMap:ct,specularIntensityMap:P,transmission:Ft,transmissionMap:$,thicknessMap:q,gradientMap:ht,opaque:y.transparent===!1&&y.blending===gs&&y.alphaToCoverage===!1,alphaMap:rt,alphaTest:lt,alphaHash:Lt,combine:y.combine,mapUv:pt&&f(y.map.channel),aoMapUv:Fe&&f(y.aoMap.channel),lightMapUv:qe&&f(y.lightMap.channel),bumpMapUv:Mi&&f(y.bumpMap.channel),normalMapUv:Ne&&f(y.normalMap.channel),displacementMapUv:an&&f(y.displacementMap.channel),emissiveMapUv:Qe&&f(y.emissiveMap.channel),metalnessMapUv:Li&&f(y.metalnessMap.channel),roughnessMapUv:Di&&f(y.roughnessMap.channel),anisotropyMapUv:Xt&&f(y.anisotropyMap.channel),clearcoatMapUv:A&&f(y.clearcoatMap.channel),clearcoatNormalMapUv:b&&f(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&f(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:et&&f(y.diffuseRoughnessMap.channel),iridescenceMapUv:J&&f(y.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&f(y.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&f(y.sheenColorMap.channel),sheenRoughnessMapUv:K&&f(y.sheenRoughnessMap.channel),specularMapUv:Z&&f(y.specularMap.channel),specularColorMapUv:ct&&f(y.specularColorMap.channel),specularIntensityMapUv:P&&f(y.specularIntensityMap.channel),transmissionMapUv:$&&f(y.transmissionMap.channel),thicknessMapUv:q&&f(y.thicknessMap.channel),alphaMapUv:rt&&f(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Ne||Ni),vertexNormals:!!I.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!I.attributes.uv&&(pt||rt),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||I.attributes.normal===void 0&&Ne===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:gt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Et,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:F.filter(vt=>vt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,decodeVideoTexture:pt&&y.map.isVideoTexture===!0&&ae.getTransfer(y.map.colorSpace)===fe,decodeVideoTextureEmissive:Qe&&y.emissiveMap.isVideoTexture===!0&&ae.getTransfer(y.emissiveMap.colorSpace)===fe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===De,flipSided:y.side===Ze,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:jt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&y.extensions.multiDraw===!0||xt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Zt.vertexUv1s=l.has(1),Zt.vertexUv2s=l.has(2),Zt.vertexUv3s=l.has(3),l.clear(),Zt}function v(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let C in y.defines)w.push(C),w.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(g(w,y),m(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function g(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapPMREM),y.push(w.envMapMaxLod),y.push(w.envMapSize),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.diffuseRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.numLightProbeGrids),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function m(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.diffuseRoughness&&a.enable(25),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function x(y){let w=d[y.type],C;if(w){let R=yn[w];C=Vs.clone(R.uniforms)}else C=y.uniforms;return C}function M(y,w){let C=h.get(w);return C!==void 0?++C.usedTimes:(C=new rv(n,w,y,s),c.push(C),h.set(w,C)),C}function _(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function S(){o.dispose()}return{getParameters:p,getProgramCacheKey:v,getUniforms:x,acquireProgram:M,releaseProgram:_,releaseShaderCache:T,programs:c,dispose:S}}function cv(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function hv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Uf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Ff(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,v,g,m){let x=n[t];return x===void 0?(x={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:m},n[t]=x):(x.id=d.id,x.object=d,x.geometry=f,x.material=p,x.materialVariant=a(d),x.groupOrder=v,x.renderOrder=d.renderOrder,x.z=g,x.group=m),t++,x}function l(d,f,p,v,g,m,x){x.reversedDepth===!0&&(g=-g);let M=o(d,f,p,v,g,m);p.transmission>0?i.push(M):p.transparent===!0?s.push(M):e.push(M)}function c(d,f,p,v,g,m){let x=o(d,f,p,v,g,m);p.transmission>0?i.unshift(x):p.transparent===!0?s.unshift(x):e.unshift(x)}function h(d,f){e.length>1&&e.sort(d||hv),i.length>1&&i.sort(f||Uf),s.length>1&&s.sort(f||Uf)}function u(){for(let d=t,f=n.length;d<f;d++){let p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function uv(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Ff,n.set(i,[a])):s>=r.length?(a=new Ff,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function dv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new at};break;case"SpotLight":e={position:new N,direction:new N,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new at,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new at,groundColor:new at};break;case"RectAreaLight":e={color:new at,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function fv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var pv=0;function mv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function gv(n){let t=new dv,e=fv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,r=new Se,a=new Se;function o(c){let h=0,u=0,d=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,x=0,M=0,_=0,T=0,S=0,y=0,w=0,C=0,R=0;c.sort(mv);for(let F=0,G=c.length;F<G;F++){let I=c[F],z=I.color,Y=I.intensity,V=I.distance,tt=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===xs?tt=I.shadow.map.texture:tt=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=z.r*Y,u+=z.g*Y,d+=z.b*Y;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],Y);R++}else if(I.isSunLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,Q=e.get(I);Q.shadowIntensity=j.intensity,Q.shadowBias=j.bias,Q.shadowNormalBias=j.normalBias,Q.shadowRadius=j.radius,Q.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[p]=Q,i.sunShadowMap[p]=tt;let Et=j.getViewportCount();for(let Dt=0;Dt<Et;Dt++)i.sunShadowMatrix[v+Dt]=j.getMatrix(Dt),i.sunShadowCascade[v+Dt]=j._cascadeData[Dt];v+=Et,p++}i.sun[f]=W,f++}else if(I.isDirectionalLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,Q=e.get(I);Q.shadowIntensity=j.intensity,Q.shadowBias=j.bias,Q.shadowNormalBias=j.normalBias,Q.shadowRadius=j.radius,Q.shadowMapSize=j.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=tt,i.directionalShadowMatrix[g]=I.shadow.matrix,T++}i.directional[g]=W,g++}else if(I.isSpotLight){let W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(z).multiplyScalar(Y),W.distance=V,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[x]=W;let j=I.shadow;if(I.map&&(i.spotLightMap[w]=I.map,w++,j.updateMatrices(I),I.castShadow&&C++),i.spotLightMatrix[x]=j.matrix,I.castShadow){let Q=e.get(I);Q.shadowIntensity=j.intensity,Q.shadowBias=j.bias,Q.shadowNormalBias=j.normalBias,Q.shadowRadius=j.radius,Q.shadowMapSize=j.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=tt,y++}x++}else if(I.isRectAreaLight){let W=t.get(I);W.color.copy(z).multiplyScalar(Y),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[M]=W,M++}else if(I.isPointLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){let j=I.shadow,Q=e.get(I);Q.shadowIntensity=j.intensity,Q.shadowBias=j.bias,Q.shadowNormalBias=j.normalBias,Q.shadowRadius=j.radius,Q.shadowMapSize=j.mapSize,Q.shadowCameraNear=j.camera.near,Q.shadowCameraFar=j.camera.far,i.pointShadow[m]=Q,i.pointShadowMap[m]=tt,i.pointShadowMatrix[m]=I.shadow.matrix,S++}i.point[m]=W,m++}else if(I.isHemisphereLight){let W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(Y),W.groundColor.copy(I.groundColor).multiplyScalar(Y),i.hemi[_]=W,_++}}M>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_FLOAT_1,i.rectAreaLTC2=_t.LTC_FLOAT_2):(i.rectAreaLTC1=_t.LTC_HALF_1,i.rectAreaLTC2=_t.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let D=i.hash;(D.sunLength!==f||D.directionalLength!==g||D.pointLength!==m||D.spotLength!==x||D.rectAreaLength!==M||D.hemiLength!==_||D.numSunShadows!==p||D.numDirectionalShadows!==T||D.numPointShadows!==S||D.numSpotShadows!==y||D.numSpotMaps!==w||D.numLightProbes!==R)&&(i.sun.length=f,i.directional.length=g,i.spot.length=x,i.rectArea.length=M,i.point.length=m,i.hemi.length=_,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=y,i.spotShadowMap.length=y,i.spotLightMatrix.length=y+w-C,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=R,D.sunLength=f,D.directionalLength=g,D.pointLength=m,D.spotLength=x,D.rectAreaLength=M,D.hemiLength=_,D.numSunShadows=p,D.numDirectionalShadows=T,D.numPointShadows=S,D.numSpotShadows=y,D.numSpotMaps=w,D.numLightProbes=R,i.version=pv++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0,g=0,m=h.matrixWorldInverse;for(let x=0,M=c.length;x<M;x++){let _=c[x];if(_.isSunLight){let T=i.sun[u];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(m),u++}else if(_.isDirectionalLight){let T=i.directional[d];T.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),d++}else if(_.isSpotLight){let T=i.spot[p];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let T=i.rectArea[v];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(_.width*.5,0,0),T.halfHeight.set(0,_.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){let T=i.point[f];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let T=i.hemi[g];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function Of(n){let t=new gv(n),e=[],i=[],s=[];function r(u){h.camera=u,e.length=0,i.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):e.push(u)}function o(u){i.push(u)}function l(){t.setup(e),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function xv(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Of(n),t.set(s,[o])):r>=a.length?(o=new Of(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var yv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_v=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Mv=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Bf=new Se,Da=new N,Xh=new N;function bv(n,t,e){let i=new ls,s=new bt,r=new bt,a=new Ie,o=new Jo,l=new jo,c={},h=e.maxTextureSize,u={[gn]:Ze,[Ze]:gn,[De]:De},d=new pe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:yv,fragmentShader:vv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new we;p.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Ct(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wa;let m=this.type;this.render=function(S,y,w){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===ul&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=wa);let C=n.getRenderTarget(),R=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Vn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=m!==this.type;G&&y.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=S.length;I<z;I++){let Y=S[I],V=Y.shadow;if(V===void 0){Bt("WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let tt=V.getFrameExtents();s.multiply(tt),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,V.mapSize.y=r.y));let W=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=W,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Rr){if(Y.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Oe(s.x,s.y,{format:xs,type:Xe,minFilter:yi,magFilter:yi,generateMipmaps:!1}),V.map.texture.name=Y.name+".shadowMap",V.map.depthTexture=new Gn(s.x,s.y,nn),V.map.depthTexture.name=Y.name+".shadowMapDepth",V.map.depthTexture.format=zn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=We,V.map.depthTexture.magFilter=We}else Y.isPointLight?(V.map=new Ua(s.x),V.map.depthTexture=new ga(s.x,en)):(V.map=new Oe(s.x,s.y),V.map.depthTexture=new Gn(s.x,s.y,en)),V.map.depthTexture.name=Y.name+".shadowMap",V.map.depthTexture.format=zn,this.type===wa?(V.map.depthTexture.compareFunction=W?Ih:Ph,V.map.depthTexture.minFilter=yi,V.map.depthTexture.magFilter=yi):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=We,V.map.depthTexture.magFilter=We);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let j=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Y.isPointLight!==!0&&V.updateMatrices(Y,w);let Q=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:w.layers;for(let Et=0;Et<j;Et++){let Dt=V.getCamera(Et);if(Y.isPointLight){let X=V.camera,yt=V.matrix,wt=Y.distance||X.far;wt!==X.far&&(X.far=wt,X.updateProjectionMatrix()),Da.setFromMatrixPosition(Y.matrixWorld),X.position.copy(Da),Xh.copy(X.position),Xh.add(_v[Et]),X.up.copy(Mv[Et]),X.lookAt(Xh),X.updateMatrixWorld(),yt.makeTranslation(-Da.x,-Da.y,-Da.z),Bf.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Bf,X.coordinateSystem,X.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,Et),n.clear();else{Et===0&&(n.setRenderTarget(V.map),n.clear());let X=V.getViewport(Et);a.set(r.x*X.x,r.y*X.y,r.x*X.z,r.y*X.w),F.viewport(a)}i=V.getFrustum(Et),_(y,w,Dt,Y,Q,this.type)}V.isPointLightShadow!==!0&&this.type===Rr&&x(V,w),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(C,R,D)};function x(S,y){let w=t.update(v);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new Oe(s.x,s.y,{format:xs,type:Xe}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(y,null,w,d,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(y,null,w,f,v,null)}function M(S,y,w,C){let R=null,D=w.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)R=D;else if(R=w.isPointLight===!0?l:o,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let F=R.uuid,G=y.uuid,I=c[F];I===void 0&&(I={},c[F]=I);let z=I[G];z===void 0&&(z=R.clone(),I[G]=z,y.addEventListener("dispose",T)),R=z}if(R.visible=y.visible,R.wireframe=y.wireframe,C===Rr?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:u[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,w.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let F=n.properties.get(R);F.light=w}return R}function _(S,y,w,C,R,D){if(S.visible===!1)return;if(S.layers.test(R)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&D===Rr)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,S.matrixWorld);let I=t.update(S),z=S.material;if(Array.isArray(z)){let Y=I.groups;for(let V=0,tt=Y.length;V<tt;V++){let W=Y[V],j=z[W.materialIndex];if(j&&j.visible){let Q=M(S,j,C,D);S.onBeforeShadow(n,S,y,w,I,Q,W),n.renderBufferDirect(w,null,I,Q,S,W),S.onAfterShadow(n,S,y,w,I,Q,W)}}}else if(z.visible){let Y=M(S,z,C,D);S.onBeforeShadow(n,S,y,w,I,Y,null),n.renderBufferDirect(w,null,I,Y,S,null),S.onAfterShadow(n,S,y,w,I,Y,null)}}let G=S.children;for(let I=0,z=G.length;I<z;I++)_(G[I],y,w,C,R,D)}function T(S){S.target.removeEventListener("dispose",T);for(let w in c){let C=c[w],R=S.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function Sv(n,t){function e(){let P=!1,$=new Ie,q=null,ht=new Ie(0,0,0,0);return{setMask:function(rt){q!==rt&&!P&&(n.colorMask(rt,rt,rt,rt),q=rt)},setLocked:function(rt){P=rt},setClear:function(rt,lt,Lt,jt,nt){nt===!0&&(rt*=jt,lt*=jt,Lt*=jt),$.set(rt,lt,Lt,jt),ht.equals($)===!1&&(n.clearColor(rt,lt,Lt,jt),ht.copy($))},reset:function(){P=!1,q=null,ht.set(-1,0,0,0)}}}function i(){let P=!1,$=!1,q=null,ht=null,rt=null;return{setReversed:function(lt){if($!==lt){let Lt=t.get("EXT_clip_control");lt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),$=lt;let jt=rt;rt=null,this.setClear(jt)}},getReversed:function(){return $},setTest:function(lt){lt?gt(n.DEPTH_TEST):Ht(n.DEPTH_TEST)},setMask:function(lt){q!==lt&&!P&&(n.depthMask(lt),q=lt)},setFunc:function(lt){if($&&(lt=hf[lt]),ht!==lt){switch(lt){case No:n.depthFunc(n.NEVER);break;case Uo:n.depthFunc(n.ALWAYS);break;case Fo:n.depthFunc(n.LESS);break;case _r:n.depthFunc(n.LEQUAL);break;case Oo:n.depthFunc(n.EQUAL);break;case Bo:n.depthFunc(n.GEQUAL);break;case ko:n.depthFunc(n.GREATER);break;case zo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ht=lt}},setLocked:function(lt){P=lt},setClear:function(lt){rt!==lt&&(rt=lt,$&&(lt=1-lt),n.clearDepth(lt))},reset:function(){P=!1,q=null,ht=null,rt=null,$=!1}}}function s(){let P=!1,$=null,q=null,ht=null,rt=null,lt=null,Lt=null,jt=null,nt=null;return{setTest:function(Ut){P||(Ut?gt(n.STENCIL_TEST):Ht(n.STENCIL_TEST))},setMask:function(Ut){$!==Ut&&!P&&(n.stencilMask(Ut),$=Ut)},setFunc:function(Ut,Zt,vt){(q!==Ut||ht!==Zt||rt!==vt)&&(n.stencilFunc(Ut,Zt,vt),q=Ut,ht=Zt,rt=vt)},setOp:function(Ut,Zt,vt){(lt!==Ut||Lt!==Zt||jt!==vt)&&(n.stencilOp(Ut,Zt,vt),lt=Ut,Lt=Zt,jt=vt)},setLocked:function(Ut){P=Ut},setClear:function(Ut){nt!==Ut&&(n.clearStencil(Ut),nt=Ut)},reset:function(){P=!1,$=null,q=null,ht=null,rt=null,lt=null,Lt=null,jt=null,nt=null}}}let r=new e,a=new i,o=new s,l={},c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,M=null,_=null,T=null,S=null,y=null,w=new at(0,0,0),C=0,R=!1,D=null,F=null,G=null,I=null,z=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,tt=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=tt>=1):W.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=tt>=2);let j=null,Q={},Et=n.getParameter(n.SCISSOR_BOX),Dt=n.getParameter(n.VIEWPORT),X=new Ie().fromArray(Et),yt=new Ie().fromArray(Dt);function wt(P,$,q,ht){let rt=new Uint8Array(4),lt=n.createTexture();n.bindTexture(P,lt),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<q;Lt++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D($,0,n.RGBA,1,1,ht,0,n.RGBA,n.UNSIGNED_BYTE,rt):n.texImage2D($+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,rt);return lt}let Nt={};Nt[n.TEXTURE_2D]=wt(n.TEXTURE_2D,n.TEXTURE_2D,1),Nt[n.TEXTURE_CUBE_MAP]=wt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Nt[n.TEXTURE_2D_ARRAY]=wt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Nt[n.TEXTURE_3D]=wt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),gt(n.DEPTH_TEST),a.setFunc(_r),Mi(!1),Ne(uh),gt(n.CULL_FACE),Fe(Vn);function gt(P){h[P]!==!0&&(n.enable(P),h[P]=!0)}function Ht(P){h[P]!==!1&&(n.disable(P),h[P]=!1)}function xt(P,$){return d[P]!==$?(n.bindFramebuffer(P,$),d[P]=$,P===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=$),P===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=$),!0):!1}function pt(P,$){let q=p,ht=!1;if(P){q=f.get($),q===void 0&&(q=[],f.set($,q));let rt=P.textures;if(q.length!==rt.length||q[0]!==n.COLOR_ATTACHMENT0){for(let lt=0,Lt=rt.length;lt<Lt;lt++)q[lt]=n.COLOR_ATTACHMENT0+lt;q.length=rt.length,ht=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,ht=!0);ht&&n.drawBuffers(q)}function Jt(P){return v!==P?(n.useProgram(P),v=P,!0):!1}let ne={[Fs]:n.FUNC_ADD,[Ld]:n.FUNC_SUBTRACT,[Dd]:n.FUNC_REVERSE_SUBTRACT};ne[Nd]=n.MIN,ne[Ud]=n.MAX;let Wt={[Fd]:n.ZERO,[Od]:n.ONE,[Bd]:n.SRC_COLOR,[ph]:n.SRC_ALPHA,[Wd]:n.SRC_ALPHA_SATURATE,[Gd]:n.DST_COLOR,[zd]:n.DST_ALPHA,[kd]:n.ONE_MINUS_SRC_COLOR,[mh]:n.ONE_MINUS_SRC_ALPHA,[Vd]:n.ONE_MINUS_DST_COLOR,[Hd]:n.ONE_MINUS_DST_ALPHA,[Xd]:n.CONSTANT_COLOR,[qd]:n.ONE_MINUS_CONSTANT_COLOR,[Yd]:n.CONSTANT_ALPHA,[Kd]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(P,$,q,ht,rt,lt,Lt,jt,nt,Ut){if(P===Vn){g===!0&&(Ht(n.BLEND),g=!1);return}if(g===!1&&(gt(n.BLEND),g=!0),P!==Id){if(P!==m||Ut!==R){if((x!==Fs||T!==Fs)&&(n.blendEquation(n.FUNC_ADD),x=Fs,T=Fs),Ut)switch(P){case gs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _e:n.blendFunc(n.ONE,n.ONE);break;case dh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case fh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:zt("WebGLState: Invalid blending: ",P);break}else switch(P){case gs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _e:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case dh:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fh:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",P);break}M=null,_=null,S=null,y=null,w.set(0,0,0),C=0,m=P,R=Ut}return}rt=rt||$,lt=lt||q,Lt=Lt||ht,($!==x||rt!==T)&&(n.blendEquationSeparate(ne[$],ne[rt]),x=$,T=rt),(q!==M||ht!==_||lt!==S||Lt!==y)&&(n.blendFuncSeparate(Wt[q],Wt[ht],Wt[lt],Wt[Lt]),M=q,_=ht,S=lt,y=Lt),(jt.equals(w)===!1||nt!==C)&&(n.blendColor(jt.r,jt.g,jt.b,nt),w.copy(jt),C=nt),m=P,R=!1}function qe(P,$){P.side===De?Ht(n.CULL_FACE):gt(n.CULL_FACE);let q=P.side===Ze;$&&(q=!q),Mi(q),P.blending===gs&&P.transparent===!1?Fe(Vn):Fe(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);let ht=P.stencilWrite;o.setTest(ht),ht&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Qe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?gt(n.SAMPLE_ALPHA_TO_COVERAGE):Ht(n.SAMPLE_ALPHA_TO_COVERAGE)}function Mi(P){D!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),D=P)}function Ne(P){P!==Cd?(gt(n.CULL_FACE),P!==F&&(P===uh?n.cullFace(n.BACK):P===Pd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ht(n.CULL_FACE),F=P}function an(P){P!==G&&(V&&n.lineWidth(P),G=P)}function Qe(P,$,q){P?(gt(n.POLYGON_OFFSET_FILL),(I!==$||z!==q)&&(I=$,z=q,a.getReversed()&&($=-$,q=-q),n.polygonOffset($,q))):Ht(n.POLYGON_OFFSET_FILL)}function Li(P){P?gt(n.SCISSOR_TEST):Ht(n.SCISSOR_TEST)}function Di(P){P===void 0&&(P=n.TEXTURE0+Y-1),j!==P&&(n.activeTexture(P),j=P)}function Ni(P,$,q){q===void 0&&(j===null?q=n.TEXTURE0+Y-1:q=j);let ht=Q[q];ht===void 0&&(ht={type:void 0,texture:void 0},Q[q]=ht),(ht.type!==P||ht.texture!==$)&&(j!==q&&(n.activeTexture(q),j=q),n.bindTexture(P,$||Nt[P]),ht.type=P,ht.texture=$)}function U(){let P=Q[j];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Ui(){try{n.compressedTexImage2D(...arguments)}catch(P){zt("WebGLState:",P)}}function Ce(){try{n.compressedTexImage3D(...arguments)}catch(P){zt("WebGLState:",P)}}function Pe(){try{n.texSubImage2D(...arguments)}catch(P){zt("WebGLState:",P)}}function mt(){try{n.texSubImage3D(...arguments)}catch(P){zt("WebGLState:",P)}}function Ye(){try{n.compressedTexSubImage2D(...arguments)}catch(P){zt("WebGLState:",P)}}function Ft(){try{n.compressedTexSubImage3D(...arguments)}catch(P){zt("WebGLState:",P)}}function Xt(){try{n.texStorage2D(...arguments)}catch(P){zt("WebGLState:",P)}}function A(){try{n.texStorage3D(...arguments)}catch(P){zt("WebGLState:",P)}}function b(){try{n.texImage2D(...arguments)}catch(P){zt("WebGLState:",P)}}function B(){try{n.texImage3D(...arguments)}catch(P){zt("WebGLState:",P)}}function et(P){return u[P]!==void 0?u[P]:n.getParameter(P)}function J(P,$){u[P]!==$&&(n.pixelStorei(P,$),u[P]=$)}function ot(P){X.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),X.copy(P))}function dt(P){yt.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),yt.copy(P))}function K(P,$){let q=c.get($);q===void 0&&(q=new WeakMap,c.set($,q));let ht=q.get(P);ht===void 0&&(ht=n.getUniformBlockIndex($,P.name),n.uniformBlockBinding($,ht,ht),q.set(P,ht))}function Z(P,$,q){let rt=c.get($).get(P);l[rt]!==q&&(n.bindBufferBase(n.UNIFORM_BUFFER,rt,q),l[rt]=q)}function ct(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},j=null,Q={},d={},l={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,M=null,_=null,T=null,S=null,y=null,w=new at(0,0,0),C=0,R=!1,D=null,F=null,G=null,I=null,z=null,X.set(0,0,n.canvas.width,n.canvas.height),yt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:gt,disable:Ht,bindFramebuffer:xt,drawBuffers:pt,useProgram:Jt,setBlending:Fe,setMaterial:qe,setFlipSided:Mi,setCullFace:Ne,setLineWidth:an,setPolygonOffset:Qe,setScissorTest:Li,activeTexture:Di,bindTexture:Ni,unbindTexture:U,compressedTexImage2D:Ui,compressedTexImage3D:Ce,texImage2D:b,texImage3D:B,pixelStorei:J,getParameter:et,updateUBOMapping:K,uniformBlockBinding:Z,texStorage2D:Xt,texStorage3D:A,texSubImage2D:Pe,texSubImage3D:mt,compressedTexSubImage2D:Ye,compressedTexSubImage3D:Ft,scissor:ot,viewport:dt,reset:ct}}function wv(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,h=new WeakMap,u=new Set,d,f=new WeakMap,p=new Set,v=new FinalizationRegistry(A=>p.delete(A)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,b){return g?new OffscreenCanvas(A,b):aa("canvas")}function x(A,b,B){let et=1,J=Xt(A);if((J.width>B||J.height>B)&&(et=B/Math.max(J.width,J.height)),et<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let ot=Math.floor(et*J.width),dt=Math.floor(et*J.height);d===void 0&&(d=m(ot,dt));let K=b?m(ot,dt):d;return K.width=ot,K.height=dt,K.getContext("2d").drawImage(A,0,0,ot,dt),Bt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+ot+"x"+dt+")."),K}else return"data"in A&&Bt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function M(A){return A.generateMipmaps}function _(A){n.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,b,B,et,J,ot=!1){if(A!==null){if(n[A]!==void 0)return n[A];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let dt;et&&(dt=t.get("EXT_texture_norm16"),dt||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=b;if(b===n.RED&&(B===n.FLOAT&&(K=n.R32F),B===n.HALF_FLOAT&&(K=n.R16F),B===n.UNSIGNED_BYTE&&(K=n.R8),B===n.UNSIGNED_SHORT&&dt&&(K=dt.R16_EXT),B===n.SHORT&&dt&&(K=dt.R16_SNORM_EXT)),b===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.R8UI),B===n.UNSIGNED_SHORT&&(K=n.R16UI),B===n.UNSIGNED_INT&&(K=n.R32UI),B===n.BYTE&&(K=n.R8I),B===n.SHORT&&(K=n.R16I),B===n.INT&&(K=n.R32I)),b===n.RG&&(B===n.FLOAT&&(K=n.RG32F),B===n.HALF_FLOAT&&(K=n.RG16F),B===n.UNSIGNED_BYTE&&(K=n.RG8),B===n.UNSIGNED_SHORT&&dt&&(K=dt.RG16_EXT),B===n.SHORT&&dt&&(K=dt.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.RG8UI),B===n.UNSIGNED_SHORT&&(K=n.RG16UI),B===n.UNSIGNED_INT&&(K=n.RG32UI),B===n.BYTE&&(K=n.RG8I),B===n.SHORT&&(K=n.RG16I),B===n.INT&&(K=n.RG32I)),b===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.RGB8UI),B===n.UNSIGNED_SHORT&&(K=n.RGB16UI),B===n.UNSIGNED_INT&&(K=n.RGB32UI),B===n.BYTE&&(K=n.RGB8I),B===n.SHORT&&(K=n.RGB16I),B===n.INT&&(K=n.RGB32I)),b===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),B===n.UNSIGNED_INT&&(K=n.RGBA32UI),B===n.BYTE&&(K=n.RGBA8I),B===n.SHORT&&(K=n.RGBA16I),B===n.INT&&(K=n.RGBA32I)),b===n.RGB&&(B===n.UNSIGNED_SHORT&&dt&&(K=dt.RGB16_EXT),B===n.SHORT&&dt&&(K=dt.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),b===n.RGBA){let Z=ot?ra:ae.getTransfer(J);B===n.FLOAT&&(K=n.RGBA32F),B===n.HALF_FLOAT&&(K=n.RGBA16F),B===n.UNSIGNED_BYTE&&(K=Z===fe?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&dt&&(K=dt.RGBA16_EXT),B===n.SHORT&&dt&&(K=dt.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(A,b){let B;return A?b===null||b===en||b===ks?B=n.DEPTH24_STENCIL8:b===nn?B=n.DEPTH32F_STENCIL8:b===Pr&&(B=n.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===en||b===ks?B=n.DEPTH_COMPONENT24:b===nn?B=n.DEPTH_COMPONENT32F:b===Pr&&(B=n.DEPTH_COMPONENT16),B}function w(A,b){return M(A)===!0||A.isFramebufferTexture&&A.minFilter!==We&&A.minFilter!==yi?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function C(A){let b=new WeakRef(A);i.get(A).__ref=b,p.add(b),v.register(A,b,b)}function R(A){let b=i.get(A).__ref;b!==void 0&&(p.delete(b),v.unregister(b))}function D(A){G(A.target)}function F(A){I(A.target)}function G(A){A.removeEventListener("dispose",D),R(A),Y(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&u.delete(A)}function I(A){A.removeEventListener("dispose",F),R(A),tt(A)}function z(){for(let A of p){let b=A.deref();b!==void 0&&(b.isRenderTarget===!0?I(b):G(b))}p.clear(),u.clear()}function Y(A){let b=i.get(A);if(b.__webglInit===void 0)return;let B=A.source,et=f.get(B);if(et){let J=et[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&V(A),Object.keys(et).length===0&&f.delete(B)}i.remove(A)}function V(A){let b=i.get(A);n.deleteTexture(b.__webglTexture);let B=A.source,et=f.get(B);delete et[b.__cacheKey],a.memory.textures--}function tt(A){let b=i.get(A);b.__depthDisposeCallback&&b.__depthDisposeCallback();let B=A.depthTexture;if(B&&B.renderTarget===A&&G(B),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let ot=0;ot<b.__webglFramebuffer[J].length;ot++)n.deleteFramebuffer(b.__webglFramebuffer[J][ot]);else n.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)n.deleteFramebuffer(b.__webglFramebuffer[J]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let et=A.textures;for(let J=0,ot=et.length;J<ot;J++){let dt=i.get(et[J]);dt.__webglTexture&&(n.deleteTexture(dt.__webglTexture),a.memory.textures--),i.remove(et[J])}i.remove(A)}let W=0;function j(){W=0}function Q(){return W}function Et(A){W=A}function Dt(){let A=W;return A>=s.maxTextures&&Bt("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),W+=1,A}function X(A){let b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.mipmapsAutoUpdate),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function yt(A,b){let B=i.get(A);if(A.isVideoTexture&&Ye(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){let et=A.image;if(et===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{qe(B,A,b);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+b)}function wt(A,b){let B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){qe(B,A,b);return}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+b)}function Nt(A,b){let B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){qe(B,A,b);return}e.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+b)}function gt(A,b){let B=i.get(A);if(A.version>0&&B.__version!==A.version){Mi(B,A,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+b)}let Ht={[dn]:n.REPEAT,[un]:n.CLAMP_TO_EDGE,[Ho]:n.MIRRORED_REPEAT},xt={[We]:n.NEAREST,[Jd]:n.NEAREST_MIPMAP_NEAREST,[Ea]:n.NEAREST_MIPMAP_LINEAR,[yi]:n.LINEAR,[ml]:n.LINEAR_MIPMAP_NEAREST,[Wn]:n.LINEAR_MIPMAP_LINEAR},pt={[ef]:n.NEVER,[Lh]:n.ALWAYS,[nf]:n.LESS,[Ph]:n.LEQUAL,[sf]:n.EQUAL,[Ih]:n.GEQUAL,[rf]:n.GREATER,[af]:n.NOTEQUAL};function Jt(A,b){if(b.type===nn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===yi||b.magFilter===ml||b.magFilter===Ea||b.magFilter===Wn||b.minFilter===yi||b.minFilter===ml||b.minFilter===Ea||b.minFilter===Wn)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Ht[b.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Ht[b.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Ht[b.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,xt[b.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,xt[b.minFilter]),b.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,pt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===We||b.minFilter!==Ea&&b.minFilter!==Wn||b.type===nn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function ne(A,b){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",D),C(b));let et=b.source,J=f.get(et);J===void 0&&(J={},f.set(et,J));let ot=X(b);if(ot!==A.__cacheKey){J[ot]===void 0&&(J[ot]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),J[ot].usedTimes++;let dt=J[A.__cacheKey];dt!==void 0&&(J[A.__cacheKey].usedTimes--,dt.usedTimes===0&&V(b)),A.__cacheKey=ot,A.__webglTexture=J[ot].texture}return B}function Wt(A,b,B){return Math.floor(Math.floor(A/B)/b)}function Fe(A,b,B,et){let ot=A.updateRanges;if(ot.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,B,et,b.data);else{ot.sort((P,$)=>P.start-$.start);let dt=0;for(let P=1;P<ot.length;P++){let $=ot[dt],q=ot[P],ht=$.start+$.count,rt=Wt(q.start,b.width,4),lt=Wt($.start,b.width,4);q.start<=ht+1&&rt===lt&&Wt(q.start+q.count-1,b.width,4)===rt?$.count=Math.max($.count,q.start+q.count-$.start):(++dt,ot[dt]=q)}ot.length=dt+1;let K=e.getParameter(n.UNPACK_ROW_LENGTH),Z=e.getParameter(n.UNPACK_SKIP_PIXELS),ct=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let P=0,$=ot.length;P<$;P++){let q=ot[P],ht=Math.floor(q.start/4),rt=Math.ceil(q.count/4),lt=ht%b.width,Lt=Math.floor(ht/b.width),jt=rt,nt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,lt),e.pixelStorei(n.UNPACK_SKIP_ROWS,Lt),e.texSubImage2D(n.TEXTURE_2D,0,lt,Lt,jt,nt,B,et,b.data)}A.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,K),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(n.UNPACK_SKIP_ROWS,ct)}}function qe(A,b,B){let et=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(et=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(et=n.TEXTURE_3D);let J=ne(A,b),ot=b.source;e.bindTexture(et,A.__webglTexture,n.TEXTURE0+B);let dt=i.get(ot);if(ot.version!==dt.__version||J===!0){if(e.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let nt=ae.getPrimaries(ae.workingColorSpace),Ut=b.colorSpace===qn?null:ae.getPrimaries(b.colorSpace),Zt=b.colorSpace===qn||nt===Ut?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt)}e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let Z=x(b.image,!1,s.maxTextureSize);Z=Ft(b,Z);let ct=r.convert(b.format,b.colorSpace),P=r.convert(b.type),$=S(b.internalFormat,ct,P,b.normalized,b.colorSpace,b.isVideoTexture);Jt(et,b);let q,ht=b.mipmaps,rt=b.isVideoTexture!==!0,lt=dt.__version===void 0||J===!0,Lt=ot.dataReady,jt=w(b,Z);if(b.isDepthTexture)$=y(b.format===Xn,b.type),lt&&(rt?e.texStorage2D(n.TEXTURE_2D,1,$,Z.width,Z.height):e.texImage2D(n.TEXTURE_2D,0,$,Z.width,Z.height,0,ct,P,null));else if(b.isDataTexture)if(ht.length>0){rt&&lt&&e.texStorage2D(n.TEXTURE_2D,jt,$,ht[0].width,ht[0].height);for(let nt=0,Ut=ht.length;nt<Ut;nt++)q=ht[nt],rt?Lt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,q.width,q.height,ct,P,q.data):e.texImage2D(n.TEXTURE_2D,nt,$,q.width,q.height,0,ct,P,q.data);b.generateMipmaps=!1}else rt?(lt&&e.texStorage2D(n.TEXTURE_2D,jt,$,Z.width,Z.height),Lt&&Fe(b,Z,ct,P)):e.texImage2D(n.TEXTURE_2D,0,$,Z.width,Z.height,0,ct,P,Z.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){rt&&lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,jt,$,ht[0].width,ht[0].height,Z.depth);for(let nt=0,Ut=ht.length;nt<Ut;nt++)if(q=ht[nt],b.format!==sn)if(ct!==null)if(rt){if(Lt)if(b.layerUpdates.size>0){let Zt=Bh(q.width,q.height,b.format,b.type);for(let vt of b.layerUpdates){let ge=q.data.subarray(vt*Zt/q.data.BYTES_PER_ELEMENT,(vt+1)*Zt/q.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,vt,q.width,q.height,1,ct,ge)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,q.width,q.height,Z.depth,ct,q.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,nt,$,q.width,q.height,Z.depth,0,q.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?Lt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,q.width,q.height,Z.depth,ct,P,q.data):e.texImage3D(n.TEXTURE_2D_ARRAY,nt,$,q.width,q.height,Z.depth,0,ct,P,q.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{rt&&lt&&e.texStorage2D(n.TEXTURE_2D,jt,$,ht[0].width,ht[0].height);for(let nt=0,Ut=ht.length;nt<Ut;nt++)q=ht[nt],b.format!==sn?ct!==null?rt?Lt&&e.compressedTexSubImage2D(n.TEXTURE_2D,nt,0,0,q.width,q.height,ct,q.data):e.compressedTexImage2D(n.TEXTURE_2D,nt,$,q.width,q.height,0,q.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?Lt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,q.width,q.height,ct,P,q.data):e.texImage2D(n.TEXTURE_2D,nt,$,q.width,q.height,0,ct,P,q.data)}else if(b.isDataArrayTexture)if(rt){if(lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,jt,$,Z.width,Z.height,Z.depth),Lt)if(b.layerUpdates.size>0){let nt=Bh(Z.width,Z.height,b.format,b.type);for(let Ut of b.layerUpdates){let Zt=Z.data.subarray(Ut*nt/Z.data.BYTES_PER_ELEMENT,(Ut+1)*nt/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ut,Z.width,Z.height,1,ct,P,Zt)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ct,P,Z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,$,Z.width,Z.height,Z.depth,0,ct,P,Z.data);else if(b.isData3DTexture)rt?(lt&&e.texStorage3D(n.TEXTURE_3D,jt,$,Z.width,Z.height,Z.depth),Lt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ct,P,Z.data)):e.texImage3D(n.TEXTURE_3D,0,$,Z.width,Z.height,Z.depth,0,ct,P,Z.data);else if(b.isFramebufferTexture){if(lt)if(rt)e.texStorage2D(n.TEXTURE_2D,jt,$,Z.width,Z.height);else{let nt=Z.width,Ut=Z.height;for(let Zt=0;Zt<jt;Zt++)e.texImage2D(n.TEXTURE_2D,Zt,$,nt,Ut,0,ct,P,null),nt>>=1,Ut>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){let nt=n.canvas;if(nt.hasAttribute("layoutsubtree")||nt.setAttribute("layoutsubtree","true"),Z.parentNode!==nt){nt.appendChild(Z),u.add(b),nt.onpaint=Ut=>{let Zt=Ut.changedElements;for(let vt of u)Zt.includes(vt.image)&&(vt.needsUpdate=!0)},nt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{let Zt=n.RGBA,vt=n.RGBA,ge=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Zt,vt,ge,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ht.length>0){if(rt&&lt){let nt=Xt(ht[0]);e.texStorage2D(n.TEXTURE_2D,jt,$,nt.width,nt.height)}for(let nt=0,Ut=ht.length;nt<Ut;nt++)q=ht[nt],rt?Lt&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,ct,P,q):e.texImage2D(n.TEXTURE_2D,nt,$,ct,P,q);b.generateMipmaps=!1}else if(rt){if(lt){let nt=Xt(Z);e.texStorage2D(n.TEXTURE_2D,jt,$,nt.width,nt.height)}Lt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,P,Z)}else e.texImage2D(n.TEXTURE_2D,0,$,ct,P,Z);M(b)&&b.mipmapsAutoUpdate===!0&&_(et),dt.__version=ot.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Mi(A,b,B){if(b.image.length!==6)return;let et=ne(A,b),J=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+B);let ot=i.get(J);if(J.version!==ot.__version||et===!0){e.activeTexture(n.TEXTURE0+B);let dt=ae.getPrimaries(ae.workingColorSpace),K=b.colorSpace===qn?null:ae.getPrimaries(b.colorSpace),Z=b.colorSpace===qn||dt===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let ct=b.isCompressedTexture||b.image[0].isCompressedTexture,P=b.image[0]&&b.image[0].isDataTexture,$=[];for(let vt=0;vt<6;vt++)!ct&&!P?$[vt]=x(b.image[vt],!0,s.maxCubemapSize):$[vt]=P?b.image[vt].image:b.image[vt],$[vt]=Ft(b,$[vt]);let q=$[0],ht=r.convert(b.format,b.colorSpace),rt=r.convert(b.type),lt=S(b.internalFormat,ht,rt,b.normalized,b.colorSpace),Lt=b.isVideoTexture!==!0,jt=ot.__version===void 0||et===!0,nt=J.dataReady,Ut=w(b,q);Jt(n.TEXTURE_CUBE_MAP,b);let Zt;if(b.isDepthTexture){if(lt=y(b.format===Xn,b.type),jt)if(Lt)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,lt,q.width,q.height);else for(let vt=0;vt<6;vt++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,lt,q.width,q.height,0,ht,rt,null)}else if(ct){Lt&&jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ut,lt,q.width,q.height);for(let vt=0;vt<6;vt++){Zt=$[vt].mipmaps;for(let ge=0;ge<Zt.length;ge++){let ti=Zt[ge];b.format!==sn?ht!==null?Lt?nt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge,0,0,ti.width,ti.height,ht,ti.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge,lt,ti.width,ti.height,0,ti.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge,0,0,ti.width,ti.height,ht,rt,ti.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge,lt,ti.width,ti.height,0,ht,rt,ti.data)}}}else{if(Zt=b.mipmaps,Lt&&jt){Zt.length>0&&Ut++;let vt=Xt($[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ut,lt,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(P){Lt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,$[vt].width,$[vt].height,ht,rt,$[vt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,lt,$[vt].width,$[vt].height,0,ht,rt,$[vt].data);for(let ge=0;ge<Zt.length;ge++){let $n=Zt[ge].image[vt].image;Lt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge+1,0,0,$n.width,$n.height,ht,rt,$n.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge+1,lt,$n.width,$n.height,0,ht,rt,$n.data)}}else{Lt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,ht,rt,$[vt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,lt,ht,rt,$[vt]);for(let ge=0;ge<Zt.length;ge++){let ti=Zt[ge];Lt?nt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge+1,0,0,ht,rt,ti.image[vt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,ge+1,lt,ht,rt,ti.image[vt])}}}M(b)&&b.mipmapsAutoUpdate===!0&&_(n.TEXTURE_CUBE_MAP),ot.__version=J.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Ne(A,b,B,et,J,ot){let dt=r.convert(B.format,B.colorSpace),K=r.convert(B.type),Z=S(B.internalFormat,dt,K,B.normalized,B.colorSpace),ct=i.get(b),P=i.get(B);if(P.__renderTarget=b,!ct.__hasExternalTextures){let $=Math.max(1,b.width>>ot),q=Math.max(1,b.height>>ot);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,ot,Z,$,q,b.depth,0,dt,K,null):e.texImage2D(J,ot,Z,$,q,0,dt,K,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),mt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,et,J,P.__webglTexture,0,Pe(b)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,et,J,P.__webglTexture,ot),e.bindFramebuffer(n.FRAMEBUFFER,null)}function an(A,b,B){if(n.bindRenderbuffer(n.RENDERBUFFER,A),b.depthBuffer){let et=b.depthTexture,J=et&&et.isDepthTexture?et.type:null,ot=y(b.stencilBuffer,J),dt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;mt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe(b),ot,b.width,b.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe(b),ot,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ot,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,dt,n.RENDERBUFFER,A)}else{let et=b.textures;for(let J=0;J<et.length;J++){let ot=et[J],dt=r.convert(ot.format,ot.colorSpace),K=r.convert(ot.type),Z=S(ot.internalFormat,dt,K,ot.normalized,ot.colorSpace);mt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe(b),Z,b.width,b.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe(b),Z,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Z,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qe(A,b,B){let et=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=i.get(b.depthTexture);J.__renderTarget=b;let ot=et?b.depthTexture.image[0]:b.depthTexture.image;(!J.__webglTexture||ot.width!==b.width||ot.height!==b.height)&&(ot.width=b.width,ot.height=b.height,b.depthTexture.needsUpdate=!0),et?gt(b.depthTexture,0):yt(b.depthTexture,0);let dt=J.__webglTexture,K=Pe(b),Z=et?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,ct=b.depthTexture.format===Xn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===zn)mt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,Z,dt,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,ct,Z,dt,0);else if(b.depthTexture.format===Xn)mt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,Z,dt,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,ct,Z,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Li(A){let b=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){let et=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),et){let J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,et.removeEventListener("dispose",J)};et.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=et}if(A.depthTexture&&!b.__autoAllocateDepthBuffer)if(B)for(let et=0;et<6;et++)Qe(b.__webglFramebuffer[et],A,et);else A.texture.mipmaps.length>0?Qe(b.__webglFramebuffer[0],A,0):Qe(b.__webglFramebuffer,A,0);else if(B){b.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[et]),b.__webglDepthbuffer[et]===void 0)b.__webglDepthbuffer[et]=n.createRenderbuffer(),an(b.__webglDepthbuffer[et],A,!1);else{let J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=b.__webglDepthbuffer[et];n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,ot)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),an(b.__webglDepthbuffer,A,!1);else{let J=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,ot)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Di(A,b,B){let et=i.get(A);b!==void 0&&Ne(et.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Li(A)}function Ni(A){let b=A.texture,B=i.get(A),et=i.get(b);A.addEventListener("dispose",F),C(A);let J=A.textures,ot=A.isWebGLCubeRenderTarget===!0,dt=J.length>1;if(dt||(et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture()),et.__version=b.version,a.memory.textures++),ot){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(b.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let Z=0;Z<b.mipmaps.length;Z++)B.__webglFramebuffer[K][Z]=n.createFramebuffer()}else B.__webglFramebuffer[K]=n.createFramebuffer()}else{if(b.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<b.mipmaps.length;K++)B.__webglFramebuffer[K]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(dt)for(let K=0,Z=J.length;K<Z;K++){let ct=i.get(J[K]);ct.__webglTexture===void 0&&(ct.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&mt(A)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<J.length;K++){let Z=J[K];B.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[K]);let ct=r.convert(Z.format,Z.colorSpace),P=r.convert(Z.type),$=S(Z.internalFormat,ct,P,Z.normalized,Z.colorSpace,A.isXRRenderTarget===!0),q=Pe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,q,$,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,B.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),an(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ot){e.bindTexture(n.TEXTURE_CUBE_MAP,et.__webglTexture),Jt(n.TEXTURE_CUBE_MAP,b);for(let K=0;K<6;K++)if(b.mipmaps.length>0)for(let Z=0;Z<b.mipmaps.length;Z++)Ne(B.__webglFramebuffer[K][Z],A,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Z);else Ne(B.__webglFramebuffer[K],A,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);M(b)?_(n.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}else if(dt){for(let K=0,Z=J.length;K<Z;K++){let ct=J[K],P=i.get(ct),$=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture($,P.__webglTexture),Jt($,ct),Ne(B.__webglFramebuffer,A,ct,n.COLOR_ATTACHMENT0+K,$,0),M(ct)&&_($)}e.unbindTexture()}else{let K=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(K=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(K,et.__webglTexture),Jt(K,b),b.mipmaps.length>0)for(let Z=0;Z<b.mipmaps.length;Z++)Ne(B.__webglFramebuffer[Z],A,b,n.COLOR_ATTACHMENT0,K,Z);else Ne(B.__webglFramebuffer,A,b,n.COLOR_ATTACHMENT0,K,0);M(b)?_(K):b.mipmaps.length>0&&n.texParameteri(K,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&Li(A)}function U(A){let b=A.textures;for(let B=0,et=b.length;B<et;B++){let J=b[B];if(M(J)&&J.mipmapsAutoUpdate===!0){let ot=T(A),dt=i.get(J).__webglTexture;e.bindTexture(ot,dt),_(ot),e.unbindTexture()}}}let Ui=[];function Ce(A){if(A.samples>0){if(mt(A)===!1){let b=A.textures,B=A.width,et=A.height,J=n.COLOR_BUFFER_BIT,ot=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=i.get(A),K=b.length>1;if(K)for(let ct=0;ct<b.length;ct++)e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let ct=0;ct<b.length;ct++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,dt.__webglColorRenderbuffer[ct]);let P=i.get(b[ct]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,P,0)}n.blitFramebuffer(0,0,B,et,0,0,B,et,J,n.NEAREST),l===!0&&(Ui.length=0,Ui.push(n.COLOR_ATTACHMENT0+ct),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&Ui.push(ot),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ui))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let ct=0;ct<b.length;ct++){e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,dt.__webglColorRenderbuffer[ct]);let P=i.get(b[ct]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,P,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let b=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Pe(A){return Math.min(s.maxSamples,A.samples)}function mt(A){let b=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ye(A){let b=a.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function Ft(A,b){let B=A.colorSpace,et=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==sa&&B!==qn&&(ae.getTransfer(B)===fe?(et!==sn||J!==Si)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",B)),b}function Xt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Dt,this.resetTextureUnits=j,this.getTextureUnits=Q,this.setTextureUnits=Et,this.setTexture2D=yt,this.setTexture2DArray=wt,this.setTexture3D=Nt,this.setTextureCube=gt,this.rebindTextures=Di,this.setupRenderTarget=Ni,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Li,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=mt,this.dispose=z}function Ev(n,t){function e(i,s=qn){let r,a=ae.getTransfer(s);if(i===Si)return n.UNSIGNED_BYTE;if(i===xl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===yl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Eh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Th)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Sh)return n.BYTE;if(i===wh)return n.SHORT;if(i===Pr)return n.UNSIGNED_SHORT;if(i===gl)return n.INT;if(i===en)return n.UNSIGNED_INT;if(i===nn)return n.FLOAT;if(i===Xe)return n.HALF_FLOAT;if(i===Ah)return n.ALPHA;if(i===Rh)return n.RGB;if(i===sn)return n.RGBA;if(i===zn)return n.DEPTH_COMPONENT;if(i===Xn)return n.DEPTH_STENCIL;if(i===Ch)return n.RED;if(i===vl)return n.RED_INTEGER;if(i===xs)return n.RG;if(i===_l)return n.RG_INTEGER;if(i===Ml)return n.RGBA_INTEGER;if(i===Ta||i===Aa||i===Ra||i===Ca)if(a===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bl||i===Sl||i===wl||i===El)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===bl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===El)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Tl||i===Al||i===Rl||i===Cl||i===Pl||i===Pa||i===Il)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Tl||i===Al)return a===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Rl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Cl)return r.COMPRESSED_R11_EAC;if(i===Pl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Pa)return r.COMPRESSED_RG11_EAC;if(i===Il)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ll||i===Dl||i===Nl||i===Ul||i===Fl||i===Ol||i===Bl||i===kl||i===zl||i===Hl||i===Gl||i===Vl||i===Wl||i===Xl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ll)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Nl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ul)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ol)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===kl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Vl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xl)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ql||i===Yl||i===Kl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ql)return a===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zl||i===$l||i===Ia||i===Jl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Zl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===$l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ia)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Jl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ks?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Tv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Av=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,jh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new xa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new pe({vertexShader:Tv,fragmentShader:Av,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ct(new bi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Qh=class extends fn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,v=typeof XRWebGLBinding<"u",g=new jh,m={},x=e.getContextAttributes(),M=null,_=null,T=[],S=[],y=new bt,w=null,C=null,R=new Ke;R.viewport=new Ie;let D=new Ke;D.viewport=new Ie;let F=[R,D],G=new cl,I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let yt=T[X];return yt===void 0&&(yt=new wr,T[X]=yt),yt.getTargetRaySpace()},this.getControllerGrip=function(X){let yt=T[X];return yt===void 0&&(yt=new wr,T[X]=yt),yt.getGripSpace()},this.getHand=function(X){let yt=T[X];return yt===void 0&&(yt=new wr,T[X]=yt),yt.getHandSpace()};function Y(X){let yt=S.indexOf(X.inputSource);if(yt===-1)return;let wt=T[yt];wt!==void 0&&(wt.update(X.inputSource,X.frame,c||a),wt.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",tt);for(let X=0;X<T.length;X++){let yt=S[X];yt!==null&&(S[X]=null,T[X].disconnect(yt))}I=null,z=null,g.reset();for(let X in m)delete m[X];if(t.setRenderTarget(M),f=null,d=null,u=null,s=null,_=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(y.width,y.height,!1),C!==null){let X=C.camera;X.fov=C.fov,X.zoom=C.zoom,X.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",V),s.addEventListener("inputsourceschange",tt),x.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(y),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,Nt=null,gt=null;x.depth&&(gt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=x.stencil?Xn:zn,Nt=x.stencil?ks:en);let Ht={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ht),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Oe(d.textureWidth,d.textureHeight,{format:sn,type:Si,depthTexture:new Gn(d.textureWidth,d.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let wt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Oe(f.framebufferWidth,f.framebufferHeight,{format:sn,type:Si,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function tt(X){for(let yt=0;yt<X.removed.length;yt++){let wt=X.removed[yt],Nt=S.indexOf(wt);Nt>=0&&(S[Nt]=null,T[Nt].disconnect(wt))}for(let yt=0;yt<X.added.length;yt++){let wt=X.added[yt],Nt=S.indexOf(wt);if(Nt===-1){for(let Ht=0;Ht<T.length;Ht++)if(Ht>=S.length){S.push(wt),Nt=Ht;break}else if(S[Ht]===null){S[Ht]=wt,Nt=Ht;break}if(Nt===-1)break}let gt=T[Nt];gt&&gt.connect(wt)}}function W(X,yt){yt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(yt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let yt=X.near,wt=X.far;g.texture!==null&&(g.depthNear>0&&(yt=g.depthNear),g.depthFar>0&&(wt=g.depthFar)),G.near=D.near=R.near=yt,G.far=D.far=R.far=wt,(I!==G.near||z!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),I=G.near,z=G.far),G.layers.mask=X.layers.mask|6,R.layers.mask=G.layers.mask&-5,D.layers.mask=G.layers.mask&-3;let Nt=X.parent,gt=G.cameras;W(G,Nt);for(let Ht=0;Ht<gt.length;Ht++)W(gt[Ht],Nt);G.projectionMatrix.copy(R.projectionMatrix),G.projectionMatrixInverse.copy(R.projectionMatrixInverse),C===null&&X.isPerspectiveCamera&&(C={camera:X,fov:X.fov,zoom:X.zoom}),j(X,G,Nt)};function j(X,yt,wt){wt===null?X.matrix.copy(yt.matrixWorld):(X.matrix.copy(wt.matrixWorld),X.matrix.invert(),X.matrix.multiply(yt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(yt.projectionMatrix),X.projectionMatrixInverse.copy(yt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Vo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(G)},this.getCameraTexture=function(X){return m[X]};let Q=null;function Et(X,yt){if(h=yt.getViewerPose(c||a),p=yt,h!==null){let wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Nt=!1;wt.length!==G.cameras.length&&(G.cameras.length=0,Nt=!0);for(let pt=0;pt<wt.length;pt++){let Jt=wt[pt],ne=null;if(f!==null)ne=f.getViewport(Jt);else{let Fe=u.getViewSubImage(d,Jt);ne=Fe.viewport,pt===0&&(t.setRenderTargetTextures(_,Fe.colorTexture,Fe.depthStencilTexture),t.setRenderTarget(_))}let Wt=F[pt];Wt===void 0&&(Wt=new Ke,Wt.layers.enable(pt),Wt.viewport=new Ie,F[pt]=Wt),Wt.matrix.fromArray(Jt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Jt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(ne.x,ne.y,ne.width,ne.height),pt===0&&(G.matrix.copy(Wt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Nt===!0&&G.cameras.push(Wt)}let gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=i.getBinding();let pt=u.getDepthInformation(wt[0]);pt&&pt.isValid&&pt.texture&&g.init(pt,s.renderState)}if(gt&&gt.includes("camera-access")&&v){t.state.unbindTexture(),u=i.getBinding();for(let pt=0;pt<wt.length;pt++){let Jt=wt[pt].camera;if(Jt){let ne=m[Jt];ne||(ne=new xa,m[Jt]=ne);let Wt=u.getCameraImage(Jt);ne.sourceTexture=Wt}}}}for(let wt=0;wt<T.length;wt++){let Nt=S[wt],gt=T[wt];Nt!==null&&gt!==void 0&&gt.update(Nt,yt,c||a)}Q&&Q(X,yt),yt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:yt}),p=null}let Dt=new kf;Dt.setAnimationLoop(Et),this.setAnimationLoop=function(X){Q=X},this.dispose=function(){}}},Rv=new Se,Zf=new Gt;Zf.set(-1,0,0,0,1,0,0,0,1);function Cv(n,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Uh(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,x,M,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,x,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ze&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ze&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let x=t.get(m),M=x.envMap,_=x.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(Rv.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Zf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=M*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ze&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Pv(n,t,e,i){let s={},r={};function a(x,M){let _=M.program;i.uniformBlockBinding(x,_,s[x.id])}function o(x,M){let _=s[x.id];_===void 0&&(p(x),_=l(x),s[x.id]=_,x.addEventListener("dispose",g));let T=M.program;i.updateUBOMapping(x,T);let S=t.render.frame;r[x.id]!==S&&(c(x),r[x.id]=S)}function l(x){let M=n.createBuffer(),_=x.__size,T=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,_,T),n.bindBuffer(n.UNIFORM_BUFFER,null),M}function c(x){let M=s[x.id],_=x.uniforms,T=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let S=0,y=_.length;S<y;S++){let w=_[S];if(Array.isArray(w))for(let C=0,R=w.length;C<R;C++)h(w[C],S,C,T);else h(w,S,0,T)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(x,M,_,T){if(d(x,M,_,T)===!0){let S=x.__offset,y=x.value;if(Array.isArray(y)){let w=0;for(let C=0;C<y.length;C++){let R=y[C],D=v(R,!0);u(R,x.__data,w),w+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else u(y,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,x.__data)}}function u(x,M,_){typeof x=="number"||typeof x=="boolean"?M[_]=x:x.isMatrix3?(M[_]=x.elements[0],M[_+1]=x.elements[1],M[_+2]=x.elements[2],M[_+3]=0,M[_+4]=x.elements[3],M[_+5]=x.elements[4],M[_+6]=x.elements[5],M[_+7]=0,M[_+8]=x.elements[6],M[_+9]=x.elements[7],M[_+10]=x.elements[8],M[_+11]=0):ArrayBuffer.isView(x)?M.set(x.subarray(0,M.length-_),_):x.toArray(M,_)}function d(x,M,_,T){let S=x.value,y=M+"_"+_;if(Array.isArray(S)){T[y]===void 0&&(T[y]=[]);let w=T[y],C=!1;for(let R=0;R<S.length;R++)f(S[R],w,R)===!0&&(C=!0);return C}return f(S,T,y)}function f(x,M,_){if(M[_]===void 0)return typeof x=="number"||typeof x=="boolean"?M[_]=x:ArrayBuffer.isView(x)?M[_]=x.slice():M[_]=x.clone(),!0;{let T=M[_];if(typeof x=="number"||typeof x=="boolean"){if(T!==x)return M[_]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(T.equals(x)===!1)return T.copy(x),!0}}return!1}function p(x){let M=x.uniforms,_=0,T=16;for(let y=0,w=M.length;y<w;y++){let C=Array.isArray(M[y])?M[y]:[M[y]];for(let R=0,D=C.length;R<D;R++){let F=C[R],G=Array.isArray(F.value)?F.value:[F.value],I=Array.isArray(M[y])||Array.isArray(F.value),z=_;for(let V=0,tt=G.length;V<tt;V++){let W=G[V],j=v(W,I),Q=_%T,Et=Q%j.boundary,Dt=Q+Et;_+=Et,Dt!==0&&T-Dt<j.storage&&(_+=T-Dt),V===0&&(z=_),_+=j.storage}let Y=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new Y((_-z)/Float32Array.BYTES_PER_ELEMENT),F.__offset=z}}let S=_%T;return S>0&&(_+=T-S),x.__size=_,x.__cache={},this}function v(x,M){let _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=16,_.storage=48):x.isMatrix4?(_.boundary=16,_.storage=64):x.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(_.boundary=16,_.storage=x.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",x),M===!0&&(_.boundary=16,_.storage=Math.ceil(_.storage/16)*16),_}function g(x){let M=x.target;M.removeEventListener("dispose",g),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(let x in s)n.deleteBuffer(s[x]);s={},r={}}return{bind:a,update:o,dispose:m}}var Iv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xn=null;function Lv(){return xn===null&&(xn=new Er(Iv,16,16,xs,Xe),xn.name="DFG_LUT",xn.minFilter=yi,xn.magFilter=yi,xn.wrapS=un,xn.wrapT=un,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}var Lr=class{constructor(t={}){let{canvas:e=of(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Si}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let v=f,g=new Set([Ml,_l,vl]),m=new Set([Si,en,Pr,ks,xl,yl]),x=new Uint32Array(4),M=new Int32Array(4),_={textures:[],min:[],max:[],resolution:[]},T=null,S=null,y=[],w=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,D=!1,F=null,G=null,I=null,z=null;this._outputColorSpace=be;let Y=0,V=0,tt=null,W=-1,j=null,Q=new Ie,Et=new Ie,Dt=null,X=new at(0),yt=0,wt=e.width,Nt=e.height,gt=1,Ht=null,xt=null,pt=new Ie(0,0,wt,Nt),Jt=new Ie(0,0,wt,Nt),ne=!1,Wt=new ls,Fe=new Ko,qe=!1,Mi=!1,Ne=new Se,an=new N,Qe=new Ie,Li={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Di=!1;function Ni(){return tt===null?gt:1}let U=i;function Ui(E,L){return e.getContext(E,L)}let Ce,Pe,mt,Ye,Ft,Xt,A,b,B,et,J,ot,dt,K,Z,ct,P,$,q,ht,rt,lt,Lt;try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ut,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),U===null){let L="webgl2";if(U=Ui(L,E),U===null)throw Ui(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}jt()}catch(E){throw e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),zt("WebGLRenderer: "+E.message),E}function jt(){Ce=new Vx(U),Ce.init(),rt=new Ev(U,Ce),Pe=new Lx(U,Ce,t,rt),mt=new Sv(U,Ce),Pe.reversedDepthBuffer&&d&&mt.buffers.depth.setReversed(!0),G=U.createFramebuffer(),I=U.createFramebuffer(),z=U.createFramebuffer(),Ye=new qx(U),Ft=new cv,Xt=new wv(U,Ce,mt,Ft,Pe,rt,Ye),A=new Gx(R),b=new Km(U),lt=new Px(U,b),B=new Wx(U,b,Ye,lt),et=new Kx(U,B,b,lt,Ye),$=new Yx(U,Pe,Xt),Z=new Dx(Ft),J=new lv(R,A,Ce,Pe,lt,Z),ot=new Cv(R,Ft),dt=new uv,K=new xv(Ce),P=new Cx(R,A,mt,et,p,l),ct=new bv(R,et,Pe),Lt=new Pv(U,Ye,Pe,mt),q=new Ix(U,Ce,Ye),ht=new Xx(U,Ce,Ye),Ye.programs=J.programs,R.capabilities=Pe,R.extensions=Ce,R.properties=Ft,R.renderLists=dt,R.shadowMap=ct,R.state=mt,R.info=Ye}v!==Si&&(C=new $x(v,e.width,e.height,o,s,r));let nt=new Qh(R,U);this.xr=nt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let E=Ce.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Ce.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return gt},this.setPixelRatio=function(E){E!==void 0&&(gt=E,this.setSize(wt,Nt,!1))},this.getSize=function(E){return E.set(wt,Nt)},this.setSize=function(E,L,H=!0){if(nt.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}wt=E,Nt=L,e.width=Math.floor(E*gt),e.height=Math.floor(L*gt),H===!0&&(e.style.width=E+"px",e.style.height=L+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,E,L)},this.getDrawingBufferSize=function(E){return E.set(wt*gt,Nt*gt).floor()},this.setDrawingBufferSize=function(E,L,H){wt=E,Nt=L,gt=H,e.width=Math.floor(E*H),e.height=Math.floor(L*H),this.setViewport(0,0,E,L)},this.setEffects=function(E){if(v===Si){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let L=0;L<E.length;L++)if(E[L].isOutputPass===!0){Bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Q)},this.getViewport=function(E){return E.copy(pt)},this.setViewport=function(E,L,H,O){E.isVector4?pt.set(E.x,E.y,E.z,E.w):pt.set(E,L,H,O),mt.viewport(Q.copy(pt).multiplyScalar(Ni()).round())},this.getScissor=function(E){return E.copy(Jt)},this.setScissor=function(E,L,H,O){E.isVector4?Jt.set(E.x,E.y,E.z,E.w):Jt.set(E,L,H,O),mt.scissor(Et.copy(Jt).multiplyScalar(Ni()).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(E){mt.setScissorTest(ne=E)},this.setOpaqueSort=function(E){Ht=E},this.setTransparentSort=function(E){xt=E},this.getClearColor=function(E){return E.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(E=!0,L=!0,H=!0){let O=0;if(E){let k=!1;if(tt!==null){let ft=tt.texture.format;k=g.has(ft)}if(k){let ft=tt.texture.type,Tt=m.has(ft),ut=P.getClearColor(),Mt=P.getClearAlpha(),Pt=ut.r,Yt=ut.g,se=ut.b;Tt?(x[0]=Pt,x[1]=Yt,x[2]=se,x[3]=Mt,U.clearBufferuiv(U.COLOR,0,x)):(M[0]=Pt,M[1]=Yt,M[2]=se,M[3]=Mt,U.clearBufferiv(U.COLOR,0,M))}else O|=U.COLOR_BUFFER_BIT}L&&(O|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),F=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),P.dispose(),dt.dispose(),K.dispose(),Xt.dispose(),Ft.dispose(),A.dispose(),et.dispose(),B.dispose(),lt.dispose(),Lt.dispose(),J.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Lu),nt.removeEventListener("sessionend",Du),Ss.stop()};function Ut(E){E.preventDefault(),oa("WebGLRenderer: Context Lost."),D=!0}function Zt(){oa("WebGLRenderer: Context Restored."),D=!1;let E=Ye.autoReset,L=ct.enabled,H=ct.autoUpdate,O=ct.needsUpdate,k=ct.type;jt(),Ye.autoReset=E,ct.enabled=L,ct.autoUpdate=H,ct.needsUpdate=O,ct.type=k}function vt(E){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ge(E){let L=E.target;L.removeEventListener("dispose",ge),ti(L)}function ti(E){$n(E),Ft.remove(E)}function $n(E){let L=Ft.get(E).programs;L!==void 0&&(L.forEach(function(H){J.releaseProgram(H)}),E.isShaderMaterial&&J.releaseShaderCache(E))}this.renderBufferDirect=function(E,L,H,O,k,ft){L===null&&(L=Li);let Tt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ut=qp(E,L,H,O,k);mt.setMaterial(O,Tt);let Mt=H.index,Pt=1;if(O.wireframe===!0){if(Mt=B.getWireframeAttribute(H),Mt===void 0)return;Pt=2}let Yt=H.drawRange,se=H.attributes.position,At=Yt.start*Pt,re=(Yt.start+Yt.count)*Pt;ft!==null&&(At=Math.max(At,ft.start*Pt),re=Math.min(re,(ft.start+ft.count)*Pt)),Mt!==null?(At=Math.max(At,0),re=Math.min(re,Mt.count)):se!=null&&(At=Math.max(At,0),re=Math.min(re,se.count));let ze=re-At;if(ze<0||ze===1/0)return;lt.setup(k,O,ut,H,Mt);let Me,ve=q;if(Mt!==null&&(Me=b.get(Mt),ve=ht,ve.setIndex(Me)),k.isMesh)O.wireframe===!0?(mt.setLineWidth(O.wireframeLinewidth*Ni()),ve.setMode(U.LINES)):ve.setMode(U.TRIANGLES);else if(k.isLine){let li=O.linewidth;li===void 0&&(li=1),mt.setLineWidth(li*Ni()),k.isLineSegments?ve.setMode(U.LINES):k.isLineLoop?ve.setMode(U.LINE_LOOP):ve.setMode(U.LINE_STRIP)}else k.isPoints?ve.setMode(U.POINTS):k.isSprite&&ve.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(Ce.get("WEBGL_multi_draw"))ve.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let li=k._multiDrawStarts,Rt=k._multiDrawCounts,mi=k._multiDrawCount,ue=Mt?b.get(Mt).bytesPerElement:1,ws=Ft.get(O).currentProgram.getUniforms();for(let ci=0;ci<mi;ci++)ws.setValue(U,"_gl_DrawID",ci),ve.render(li[ci]/ue,Rt[ci])}else if(k.isInstancedMesh)ve.renderInstances(At,ze,k.count);else if(H.isInstancedBufferGeometry){let li=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Rt=Math.min(H.instanceCount,li);ve.renderInstances(At,ze,Rt)}else ve.render(At,ze)};function Iu(E,L,H,O){F!==null&&E.isNodeMaterial&&F.setObject(O,E),qe===!0&&Z.setState(E,H,!1),E.transparent===!0&&E.side===De&&E.forceSinglePass===!1?(E.side=Ze,E.needsUpdate=!0,Hr(E,L,O),E.side=gn,E.needsUpdate=!0,Hr(E,L,O),E.side=De):Hr(E,L,O)}this.compile=function(E,L,H=null){H===null&&(H=E),F!==null&&F.renderStart(E,L,H),S=K.get(H),S.init(L),w.push(S),H.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(S.pushLight(k),k.castShadow&&S.pushShadow(k))}),E!==H&&E.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(S.pushLight(k),k.castShadow&&S.pushShadow(k))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),Mi=this.localClippingEnabled,qe=Z.init(this.clippingPlanes,Mi),qe===!0&&Z.setGlobalState(this.clippingPlanes,L),F!==null&&ct.render(S.state.shadowsArray,H,L);let O=new Set;return E.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let Tt=0;Tt<ft.length;Tt++){let ut=ft[Tt];Iu(ut,H,L,k),O.add(ut)}else Iu(ft,H,L,k),O.add(ft)}),S=w.pop(),F!==null&&F.renderEnd(),O},this.compileAsync=function(E,L,H=null){let O=this.compile(E,L,H);return new Promise(k=>{function ft(){if(O.forEach(function(Tt){let Mt=Ft.get(Tt).currentProgram;(Mt===void 0||Mt.isReady())&&O.delete(Tt)}),O.size===0){k(E);return}setTimeout(ft,10)}Ce.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Ac=null;function Wp(E){Ac&&Ac(E)}function Lu(){Ss.stop()}function Du(){Ss.start()}let Ss=new kf;Ss.setAnimationLoop(Wp),typeof self<"u"&&Ss.setContext(self),this.setAnimationLoop=function(E){Ac=E,nt.setAnimationLoop(E),E===null?Ss.stop():Ss.start()},nt.addEventListener("sessionstart",Lu),nt.addEventListener("sessionend",Du),this.render=function(E,L){if(L!==void 0&&L.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(E,L);let H=nt.enabled===!0&&nt.isPresenting===!0,O=C!==null&&(tt===null||H)&&C.begin(R,tt);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(L),L=nt.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,L,tt),S=K.get(E,w.length),S.init(L),S.state.textureUnits=Xt.getTextureUnits(),w.push(S),Ne.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?Fe.setFromArrayCamera(L):Wt.setFromProjectionMatrix(Ne,zi,L.reversedDepth),Mi=this.localClippingEnabled,qe=Z.init(this.clippingPlanes,Mi),T=dt.get(E,y.length),T.init(),y.push(T),this.info.render.frame++,nt.enabled===!0&&nt.isPresenting===!0){let Tt=R.xr.getDepthSensingMesh();Tt!==null&&Rc(Tt,L,-1/0,R.sortObjects)}Rc(E,L,0,R.sortObjects),T.finish(),F!==null&&F.updateLights(S.state.lightsArray),R.sortObjects===!0&&T.sort(Ht,xt),Di=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Di&&P.addToRenderList(T,E),this.info.autoReset===!0&&this.info.reset(),qe===!0&&Z.beginShadows();let k=S.state.shadowsArray;if(ct.render(k,E,L),qe===!0&&Z.endShadows(),(O&&C.hasRenderPass())===!1){let Tt=T.opaque,ut=T.transmissive;if(S.setupLights(),L.isArrayCamera){let Mt=L.cameras;if(ut.length>0)for(let Pt=0,Yt=Mt.length;Pt<Yt;Pt++){let se=Mt[Pt];Uu(Tt,ut,E,se)}Di&&P.render(E);for(let Pt=0,Yt=Mt.length;Pt<Yt;Pt++){let se=Mt[Pt];Nu(T,E,se,se.viewport)}}else ut.length>0&&Uu(Tt,ut,E,L),Di&&P.render(E),Nu(T,E,L)}tt!==null&&V===0&&(Xt.updateMultisampleRenderTarget(tt),Xt.updateRenderTargetMipmap(tt)),O&&C.end(R),E.isScene===!0&&E.onAfterRender(R,E,L),lt.resetDefaultState(),W=-1,j=null,w.pop(),w.length>0?(S=w[w.length-1],Xt.setTextureUnits(S.state.textureUnits),qe===!0&&Z.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,y.pop(),y.length>0?T=y[y.length-1]:T=null,F!==null&&F.renderEnd()};function Rc(E,L,H,O){if(E.visible===!1)return;if(E.layers.test(L.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(L);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){let Tt=L.isArrayCamera?Fe:Wt;if(!E.frustumCulled||E.intersectsFrustum(Tt)){O&&Qe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ne);let ut=et.update(E),Mt=E.material;Mt.visible&&T.push(E,ut,Mt,H,Qe.z,null,L)}}else if(E.isMesh||E.isLine||E.isPoints){let Tt=L.isArrayCamera?Fe:Wt;if(!E.frustumCulled||E.intersectsFrustum(Tt)){let ut=et.update(E),Mt=E.material;if(O&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Qe.copy(E.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Qe.copy(ut.boundingSphere.center)),Qe.applyMatrix4(E.matrixWorld).applyMatrix4(Ne)),Array.isArray(Mt)){let Pt=ut.groups;for(let Yt=0,se=Pt.length;Yt<se;Yt++){let At=Pt[Yt],re=Mt[At.materialIndex];re&&re.visible&&T.push(E,ut,re,H,Qe.z,At,L)}}else Mt.visible&&T.push(E,ut,Mt,H,Qe.z,null,L)}}}let ft=E.children;for(let Tt=0,ut=ft.length;Tt<ut;Tt++)Rc(ft[Tt],L,H,O)}function Nu(E,L,H,O){let{opaque:k,transmissive:ft,transparent:Tt}=E;S.setupLightsView(H),qe===!0&&Z.setGlobalState(R.clippingPlanes,H),O&&mt.viewport(Q.copy(O)),k.length>0&&Ja(k,L,H),ft.length>0&&Ja(ft,L,H),Tt.length>0&&Ja(Tt,L,H),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Uu(E,L,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[O.id]===void 0){let At=Ce.has("EXT_color_buffer_half_float")||Ce.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[O.id]=new Oe(1,1,{generateMipmaps:!0,type:At?Xe:Si,minFilter:Wn,samples:Math.max(4,Pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ae.workingColorSpace})}let ft=S.state.transmissionRenderTarget[O.id],Tt=O.viewport||Q;ft.setSize(Tt.z*R.transmissionResolutionScale,Tt.w*R.transmissionResolutionScale);let ut=R.getRenderTarget(),Mt=R.getActiveCubeFace(),Pt=R.getActiveMipmapLevel();R.setRenderTarget(ft),R.getClearColor(X),yt=R.getClearAlpha(),yt<1&&R.setClearColor(16777215,.5),R.clear(),Di&&P.render(H);let Yt=R.toneMapping;R.toneMapping=Hi;let se=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),S.setupLightsView(O),qe===!0&&Z.setGlobalState(R.clippingPlanes,O),Ja(E,H,O),Xt.updateMultisampleRenderTarget(ft),Xt.updateRenderTargetMipmap(ft),Ce.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let re=0,ze=L.length;re<ze;re++){let Me=L[re],{object:ve,geometry:li,material:Rt,group:mi}=Me;if(Rt.side===De&&ve.layers.test(O.layers)){let ue=Rt.side;Rt.side=Ze,Rt.needsUpdate=!0,Fu(ve,H,O,li,Rt,mi),Rt.side=ue,Rt.needsUpdate=!0,At=!0}}At===!0&&(Xt.updateMultisampleRenderTarget(ft),Xt.updateRenderTargetMipmap(ft))}R.setRenderTarget(ut,Mt,Pt),R.setClearColor(X,yt),se!==void 0&&(O.viewport=se),R.toneMapping=Yt}function Ja(E,L,H){let O=L.isScene===!0?L.overrideMaterial:null;for(let k=0,ft=E.length;k<ft;k++){let Tt=E[k],{object:ut,geometry:Mt,group:Pt}=Tt,Yt=Tt.material;Yt.allowOverride===!0&&O!==null&&(Yt=O),ut.layers.test(H.layers)&&Fu(ut,L,H,Mt,Yt,Pt)}}function Fu(E,L,H,O,k,ft){F!==null&&k.isNodeMaterial&&F.setObject(E,k),E.onBeforeRender(R,L,H,O,k,ft),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(R,L,H,O,E,ft),k.transparent===!0&&k.side===De&&k.forceSinglePass===!1?(k.side=Ze,k.needsUpdate=!0,R.renderBufferDirect(H,L,O,k,E,ft),k.side=gn,k.needsUpdate=!0,R.renderBufferDirect(H,L,O,k,E,ft),k.side=De):R.renderBufferDirect(H,L,O,k,E,ft),E.onAfterRender(R,L,H,O,k,ft)}function Ou(E){let L=0;for(let H of E)H.texture!==null&&L++;return L}function Hr(E,L,H){L.isScene!==!0&&(L=Li);let O=Ft.get(E),k=S.state.lights,ft=S.state.shadowsArray,Tt=k.state.version,ut=J.getParameters(E,k.state,ft,L,H,S.state.lightProbeGridArray),Mt=J.getProgramCacheKey(ut),Pt=O.programs;O.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?L.environment:null,O.fog=L.fog;let Yt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;O.envMap=A.get(E.envMap||O.environment,Yt),O.envMapRotation=O.environment!==null&&E.envMap===null?L.environmentRotation:E.envMapRotation,Pt===void 0&&(E.addEventListener("dispose",ge),Pt=new Map,O.programs=Pt,O.programVariants=new Map);let se=Pt.get(Mt);if(se!==void 0){if(O.currentProgram===se&&O.lightsStateVersion===Tt)return ku(E,ut),se}else ut.uniforms=J.getUniforms(E),F!==null&&E.isNodeMaterial&&F.build(E,H,ut),E.onBeforeCompile(ut,R),se=J.acquireProgram(ut,Mt),Pt.set(Mt,se),O.uniforms=ut.uniforms;let At=O.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(At.clippingPlanes=Z.uniform),ku(E,ut),O.needsLights=Kp(E),O.lightsStateVersion=Tt,O.needsLights&&(At.ambientLightColor.value=k.state.ambient,At.lightProbe.value=k.state.probe,At.sunLights.value=k.state.sun,At.sunLightShadows.value=k.state.sunShadow,At.directionalLights.value=k.state.directional,At.directionalLightShadows.value=k.state.directionalShadow,At.spotLights.value=k.state.spot,At.spotLightShadows.value=k.state.spotShadow,At.rectAreaLights.value=k.state.rectArea,At.ltc_1.value=k.state.rectAreaLTC1,At.ltc_2.value=k.state.rectAreaLTC2,At.pointLights.value=k.state.point,At.pointLightShadows.value=k.state.pointShadow,At.hemisphereLights.value=k.state.hemi,At.sunShadowMatrix.value=k.state.sunShadowMatrix,At.sunShadowCascade.value=k.state.sunShadowCascade,At.directionalShadowMatrix.value=k.state.directionalShadowMatrix,At.spotLightMatrix.value=k.state.spotLightMatrix,At.spotLightMap.value=k.state.spotLightMap,At.pointShadowMatrix.value=k.state.pointShadowMatrix),O.numLightProbeGrids=Ou(S.state.lightProbeGridArray),O.currentProgram=se,O.uniformsList=null,se}function Xp(E,L,H,O,k){let ft=Ft.get(E),Tt=ft.currentProgram.id+","+O+","+k,ut=ft.programVariants.get(Tt);return ut===void 0?(ut=Hr(E,L,H),ft.programVariants.set(Tt,ut)):(ft.currentProgram=ut,ft.uniformsList=null,ft.outputColorSpace=O,ft.toneMapping=k),ut}function Bu(E){if(E.uniformsList===null){let L=E.currentProgram.getUniforms();E.uniformsList=Ir.seqWithValue(L.seq,E.uniforms)}return E.uniformsList}function ku(E,L){let H=Ft.get(E);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function qp(E,L,H,O,k){L.isScene!==!0&&(L=Li),Xt.resetTextureUnits();let ft=L.fog,Tt=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?L.environment:null,ut=tt===null?R.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:ae.workingColorSpace,Mt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Pt=A.get(O.envMap||Tt,Mt),Yt=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,se=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),At=!!H.morphAttributes.position,re=!!H.morphAttributes.normal,ze=!!H.morphAttributes.color,Me=Hi;O.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Me=R.toneMapping);let ve=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,li=ve!==void 0?ve.length:0,Rt=Ft.get(O),mi=S.state.lights;if(qe===!0&&(Mi===!0||E!==j)){let Ue=E===j&&O.id===W;Z.setState(O,E,Ue)}let ue=!1,ws=!1;O.version===Rt.__version?Rt.needsLights&&Rt.lightsStateVersion!==mi.state.version||k.isBatchedMesh&&Rt.batching===!1||!k.isBatchedMesh&&Rt.batching===!0||k.isBatchedMesh&&Rt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Rt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Rt.instancing===!1||!k.isInstancedMesh&&Rt.instancing===!0||k.isSkinnedMesh&&Rt.skinning===!1||!k.isSkinnedMesh&&Rt.skinning===!0||k.isInstancedMesh&&Rt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Rt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Rt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Rt.instancingMorph===!1&&k.morphTexture!==null||Rt.envMap!==Pt||O.fog===!0&&Rt.fog!==ft||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==Z.numPlanes||Rt.numIntersection!==Z.numIntersection)||Rt.vertexAlphas!==Yt||Rt.vertexTangents!==se||Rt.morphTargets!==At||Rt.morphNormals!==re||Rt.morphColors!==ze||Rt.morphTargetsCount!==li||Rt.numLightProbeGrids!==Ou(S.state.lightProbeGridArray)?ue=!0:(Rt.outputColorSpace!==ut||Rt.toneMapping!==Me)&&(ws=!0):(ue=!0,Rt.__version=O.version);let ci=Rt.currentProgram;(ue===!0||ws===!0)&&(ci=ws===!0?Xp(O,L,k,ut,Me):Hr(O,L,k),F&&O.isNodeMaterial&&F.onUpdateProgram(O,ci,Rt));let ja=!1,Jn=!1,Es=!1,ce=ci.getUniforms(),ri=Rt.uniforms;if(mt.useProgram(ci.program)&&(ja=!0,Jn=!0,Es=!0),O.id!==W&&(W=O.id,Jn=!0),ja||j!==E){mt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ce.setValue(U,"projectionMatrix",E.projectionMatrix),ce.setValue(U,"viewMatrix",E.matrixWorldInverse);let ei=ce.map.cameraPosition;ei!==void 0&&ei.setValue(U,an.setFromMatrixPosition(E.matrixWorld)),Pe.logarithmicDepthBuffer&&ce.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ce.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),j!==E&&(j=E,Jn=!0,Es=!0)}if(Rt.needsLights&&(mi.state.sunShadowMap.length>0&&ce.setValue(U,"sunShadowMap",mi.state.sunShadowMap,Xt),mi.state.directionalShadowMap.length>0&&ce.setValue(U,"directionalShadowMap",mi.state.directionalShadowMap,Xt),mi.state.spotShadowMap.length>0&&ce.setValue(U,"spotShadowMap",mi.state.spotShadowMap,Xt),mi.state.pointShadowMap.length>0&&ce.setValue(U,"pointShadowMap",mi.state.pointShadowMap,Xt)),k.isSkinnedMesh){ce.setOptional(U,k,"bindMatrix"),ce.setOptional(U,k,"bindMatrixInverse");let Ue=k.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),ce.setValue(U,"boneTexture",Ue.boneTexture,Xt))}k.isBatchedMesh&&(ce.setOptional(U,k,"batchingTexture"),ce.setValue(U,"batchingTexture",k._matricesTexture,Xt),ce.setOptional(U,k,"batchingIdTexture"),ce.setValue(U,"batchingIdTexture",k._indirectTexture,Xt),ce.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&ce.setValue(U,"batchingColorTexture",k._colorsTexture,Xt));let Wi=H.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&$.update(k,H,ci),(Jn||Rt.receiveShadow!==k.receiveShadow)&&(Rt.receiveShadow=k.receiveShadow,ce.setValue(U,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&L.environment!==null&&(ri.envMapIntensity.value=L.environmentIntensity),ri.dfgLUT!==void 0&&(ri.dfgLUT.value=Lv()),Jn){if(ce.setValue(U,"toneMappingExposure",R.toneMappingExposure),Rt.needsLights&&Yp(ri,Es),ft&&O.fog===!0&&ot.refreshFogUniforms(ri,ft),ot.refreshMaterialUniforms(ri,O,gt,Nt,S.state.transmissionRenderTarget[E.id]),Rt.needsLights&&Rt.numLightProbeGrids>0){let Ue=_,ei=0;for(let wn of S.state.lightProbeGridArray)wn.texture!==null&&(Ue.textures[ei]=wn.texture,Ue.min[ei]=wn.boundingBox.min,Ue.max[ei]=wn.boundingBox.max,Ue.resolution[ei]=wn.resolution,ei++);for(let wn in Ue)Ue[wn].length=ei;ri.probesSH.value=Ue.textures,ri.probesMin.value=Ue.min,ri.probesMax.value=Ue.max,ri.probesResolution.value=Ue.resolution}Ir.upload(U,Bu(Rt),ri,Xt)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ir.upload(U,Bu(Rt),ri,Xt),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ce.setValue(U,"center",k.center),ce.setValue(U,"modelViewMatrix",k.modelViewMatrix),ce.setValue(U,"normalMatrix",k.normalMatrix),ce.setValue(U,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){let Ue=O.uniformsGroups;for(let ei=0,wn=Ue.length;ei<wn;ei++){let Hu=Ue[ei];Lt.update(Hu,ci),Lt.bind(Hu,ci)}}return ci}function Yp(E,L){E.ambientLightColor.needsUpdate=L,E.lightProbe.needsUpdate=L,E.sunLights.needsUpdate=L,E.sunLightShadows.needsUpdate=L,E.directionalLights.needsUpdate=L,E.directionalLightShadows.needsUpdate=L,E.pointLights.needsUpdate=L,E.pointLightShadows.needsUpdate=L,E.spotLights.needsUpdate=L,E.spotLightShadows.needsUpdate=L,E.rectAreaLights.needsUpdate=L,E.hemisphereLights.needsUpdate=L}function Kp(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return tt},this.setRenderTargetTextures=function(E,L,H){let O=Ft.get(E);O.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),Ft.get(E.texture).__webglTexture=L,Ft.get(E.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,L){let H=Ft.get(E);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(E,L=0,H=0){tt=E,Y=L,V=H;let O=null,k=!1,ft=!1;if(E){let ut=Ft.get(E);if(ut.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(U.FRAMEBUFFER,ut.__webglFramebuffer),Q.copy(E.viewport),Et.copy(E.scissor),Dt=E.scissorTest,mt.viewport(Q),mt.scissor(Et),mt.setScissorTest(Dt),W=-1;return}else if(ut.__webglFramebuffer===void 0)Xt.setupRenderTarget(E);else if(ut.__hasExternalTextures)Xt.rebindTextures(E,Ft.get(E.texture).__webglTexture,Ft.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Yt=E.depthTexture;if(ut.__boundDepthTexture!==Yt){if(Yt!==null&&Ft.has(Yt)&&(E.width!==Yt.image.width||E.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Xt.setupDepthRenderbuffer(E)}}let Mt=E.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(ft=!0);let Pt=Ft.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pt[L])?O=Pt[L][H]:O=Pt[L],k=!0):E.samples>0&&Xt.useMultisampledRTT(E)===!1?O=Ft.get(E).__webglMultisampledFramebuffer:Array.isArray(Pt)?O=Pt[H]:O=Pt,Q.copy(E.viewport),Et.copy(E.scissor),Dt=E.scissorTest}else Q.copy(pt).multiplyScalar(gt).floor(),Et.copy(Jt).multiplyScalar(gt).floor(),Dt=ne;if(H!==0&&(O=G),mt.bindFramebuffer(U.FRAMEBUFFER,O)&&mt.drawBuffers(E,O),mt.viewport(Q),mt.scissor(Et),mt.setScissorTest(Dt),k){let ut=Ft.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,ut.__webglTexture,H)}else if(ft){let ut=L;for(let Mt=0;Mt<E.textures.length;Mt++){let Pt=Ft.get(E.textures[Mt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Mt,Pt.__webglTexture,H,ut)}}else if(E!==null&&H!==0){let ut=Ft.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ut.__webglTexture,H)}W=-1};function zu(E){let L=Ft.get(E);return(L.__readFormat!==E.format||L.__readType!==E.type)&&(L.__readFormat=E.format,L.__readType=E.type,L.__formatReadable=Pe.textureFormatReadable(E.format),L.__typeReadable=Pe.textureTypeReadable(E.type)),L}this.readRenderTargetPixels=function(E,L,H,O,k,ft,Tt,ut=0){if(!(E&&E.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Ft.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Tt!==void 0&&(Mt=Mt[Tt],Array.isArray(Mt)&&(Mt=Mt[0])),Mt){mt.bindFramebuffer(U.FRAMEBUFFER,Mt);try{let Pt=E.textures[ut],Yt=Pt.format,se=Pt.type;E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ut);let At=zu(Pt);if(At.__formatReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=E.width-O&&H>=0&&H<=E.height-k&&U.readPixels(L,H,O,k,rt.convert(Yt),rt.convert(se),ft)}finally{let Pt=tt!==null?Ft.get(tt).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(E,L,H,O,k,ft,Tt,ut=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=Ft.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Tt!==void 0&&(Mt=Mt[Tt],Array.isArray(Mt)&&(Mt=Mt[0])),Mt)if(L>=0&&L<=E.width-O&&H>=0&&H<=E.height-k){mt.bindFramebuffer(U.FRAMEBUFFER,Mt);let Pt=E.textures[ut],Yt=Pt.format,se=Pt.type;E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ut);let At=zu(Pt);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,re),U.bufferData(U.PIXEL_PACK_BUFFER,ft.byteLength,U.STREAM_READ),U.readPixels(L,H,O,k,rt.convert(Yt),rt.convert(se),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let ze=tt!==null?Ft.get(tt).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,ze);let Me=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await cf(U,Me,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ft),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(re),U.deleteSync(Me),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,L=null,H=0){let O=Math.pow(2,-H),k=Math.floor(E.image.width*O),ft=Math.floor(E.image.height*O),Tt=L!==null?L.x:0,ut=L!==null?L.y:0;Xt.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,Tt,ut,k,ft),mt.unbindTexture()},this.copyTextureToTexture=function(E,L,H=null,O=null,k=0,ft=0){let Tt,ut,Mt,Pt,Yt,se,At,re,ze,Me=E.isCompressedTexture?E.mipmaps[ft]:E.image;if(H!==null)Tt=H.max.x-H.min.x,ut=H.max.y-H.min.y,Mt=H.isBox3?H.max.z-H.min.z:1,Pt=H.min.x,Yt=H.min.y,se=H.isBox3?H.min.z:0;else{let ce=Math.pow(2,-k);Tt=Math.floor(Me.width*ce),ut=Math.floor(Me.height*ce),E.isDataArrayTexture?Mt=Me.depth:E.isData3DTexture?Mt=Math.floor(Me.depth*ce):Mt=1,Pt=0,Yt=0,se=0}O!==null?(At=O.x,re=O.y,ze=O.z):(At=0,re=0,ze=0);let ve=rt.convert(L.format),li=rt.convert(L.type),Rt;L.isData3DTexture?(Xt.setTexture3D(L,0),Rt=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Xt.setTexture2DArray(L,0),Rt=U.TEXTURE_2D_ARRAY):(Xt.setTexture2D(L,0),Rt=U.TEXTURE_2D),mt.activeTexture(U.TEXTURE0),mt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),mt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),mt.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);let mi=mt.getParameter(U.UNPACK_ROW_LENGTH),ue=mt.getParameter(U.UNPACK_IMAGE_HEIGHT),ws=mt.getParameter(U.UNPACK_SKIP_PIXELS),ci=mt.getParameter(U.UNPACK_SKIP_ROWS),ja=mt.getParameter(U.UNPACK_SKIP_IMAGES);mt.pixelStorei(U.UNPACK_ROW_LENGTH,Me.width),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Me.height),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,Pt),mt.pixelStorei(U.UNPACK_SKIP_ROWS,Yt),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,se);let Jn=E.isDataArrayTexture||E.isData3DTexture,Es=L.isDataArrayTexture||L.isData3DTexture;if(E.isDepthTexture){let ce=Ft.get(E),ri=Ft.get(L),Wi=Ft.get(ce.__renderTarget),Ue=Ft.get(ri.__renderTarget);mt.bindFramebuffer(U.READ_FRAMEBUFFER,Wi.__webglFramebuffer),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let ei=0;ei<Mt;ei++)Jn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ft.get(E).__webglTexture,k,se+ei),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ft.get(L).__webglTexture,ft,ze+ei)),U.blitFramebuffer(Pt,Yt,Pt+Tt,Yt+ut,At,re,At+Tt,re+ut,U.DEPTH_BUFFER_BIT,U.NEAREST);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||E.isRenderTargetTexture||Ft.has(E)){let ce=Ft.get(E),ri=Ft.get(L);mt.bindFramebuffer(U.READ_FRAMEBUFFER,I),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let Wi=0;Wi<Mt;Wi++)Jn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ce.__webglTexture,k,se+Wi):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ce.__webglTexture,k),Es?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ri.__webglTexture,ft,ze+Wi):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ri.__webglTexture,ft),k!==0?U.blitFramebuffer(Pt,Yt,Pt+Tt,Yt+ut,At,re,At+Tt,re+ut,U.COLOR_BUFFER_BIT,U.NEAREST):Es?U.copyTexSubImage3D(Rt,ft,At,re,ze+Wi,Pt,Yt,Tt,ut):U.copyTexSubImage2D(Rt,ft,At,re,Pt,Yt,Tt,ut);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Es?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Rt,ft,At,re,ze,Tt,ut,Mt,ve,li,Me.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(Rt,ft,At,re,ze,Tt,ut,Mt,ve,Me.data):U.texSubImage3D(Rt,ft,At,re,ze,Tt,ut,Mt,ve,li,Me):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ft,At,re,Tt,ut,ve,li,Me.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ft,At,re,Me.width,Me.height,ve,Me.data):U.texSubImage2D(U.TEXTURE_2D,ft,At,re,Tt,ut,ve,li,Me);mt.pixelStorei(U.UNPACK_ROW_LENGTH,mi),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ue),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,ws),mt.pixelStorei(U.UNPACK_SKIP_ROWS,ci),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,ja),ft===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&U.generateMipmap(Rt),mt.unbindTexture()},this.initRenderTarget=function(E){Ft.get(E).__webglFramebuffer===void 0&&Xt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Xt.setTextureCube(E,0):E.isData3DTexture?Xt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Xt.setTexture2DArray(E,0):Xt.setTexture2D(E,0),mt.unbindTexture()},this.resetState=function(){Y=0,V=0,tt=null,mt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};Ki();Ki();Ts();var tu=(()=>{let n=new Er(new Uint8Array([120,120,120,255,190,190,190,255,255,255,255,255]),3,1);return n.minFilter=n.magFilter=We,n.needsUpdate=!0,n})(),Jf={value:new at(6706551)};function jf(n,t=1){Jf.value.setHex(n).multiplyScalar(t)}function Qf(n){return n.onBeforeCompile=t=>{t.uniforms.uRim=Jf,t.fragmentShader=`uniform vec3 uRim;
${t.fragmentShader}`.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
       totalEmissiveRadiance += uRim * pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), 2.6);`)},n.customProgramCacheKey=()=>"rim",n}var Pi=(n,t={})=>Qf(new Ns({color:n,gradientMap:tu,...t})),ye=Pi,Gi=(n,t={})=>new Vt({color:n,...t}),wi=(n,t=2.4,e={})=>{let i=Gi(n,e);return i.color.multiplyScalar(t),i},ac=new Vt({color:1707810,side:Ze});ac.onBeforeCompile=n=>{n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normalize(normal) * 0.018;")};function tp(n){ac.visible=n}function st(n,t,e=0,i=0,s=0){let r=new Ct(n,t);return r.position.set(e,i,s),r}var he=n=>(n.userData.noOutline=!0,n),Oa=null;function oc(){if(Oa)return Oa;let n=document.createElement("canvas");n.width=n.height=128;let t=n.getContext("2d"),e=t.createRadialGradient(64,64,4,64,64,64);return e.addColorStop(0,"rgba(255,240,160,1)"),e.addColorStop(.35,"rgba(255,200,50,.55)"),e.addColorStop(1,"rgba(255,170,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Oa=new ke(n),Oa.colorSpace=be,Oa}var sc=null;function Vi(){if(sc)return sc;let n=document.createElement("canvas");n.width=n.height=128;let t=n.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.5,"rgba(255,255,255,.45)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),sc=new ke(n),sc}var rc=null;function ka(){if(rc)return rc;let n=document.createElement("canvas");n.width=n.height=128;let t=n.getContext("2d");t.translate(64,64),t.globalCompositeOperation="lighter";for(let i=0;i<7;i++){t.rotate(Math.PI*2/7);let s=t.createLinearGradient(0,0,60,0);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.beginPath(),t.moveTo(0,-9),t.lineTo(i%2?42:62,0),t.lineTo(0,9),t.fill()}let e=t.createRadialGradient(0,0,0,0,0,30);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(-32,-32,64,64),rc=new ke(n),rc}function Ba(n,t=.36,e="#fff"){let i=document.createElement("canvas");i.width=i.height=128;let s=i.getContext("2d");s.fillStyle=e,s.font='900 104px Impact, "Segoe UI Emoji", sans-serif',s.textAlign="center",s.textBaseline="middle",s.fillText(n,64,70);let r=new ke(i);r.colorSpace=be;let a=new Ct(new bi(t,t),new Vt({map:r,transparent:!0,depthWrite:!1}));return a.userData.noOutline=!0,a}function Dv(n){let t=document.createElement("canvas");t.width=512,t.height=96;let e=t.getContext("2d");e.font='900 56px "Malgun Gothic", sans-serif';let i=Math.min(1,480/e.measureText(n).width);e.font=`900 ${Math.floor(56*i)}px "Malgun Gothic", sans-serif`,e.textAlign="center",e.textBaseline="middle",e.lineWidth=12*i,e.strokeStyle="#000",e.strokeText(n,256,50),e.fillStyle="#fff",e.fillText(n,256,50);let s=new ke(t);s.colorSpace=be;let r=new Le(new Re({map:s,transparent:!0}));return r.scale.set(2.4,.45,1),r}var Ws=null;function Nv(){if(Ws)return Ws;let n=document.createElement("canvas");n.width=128,n.height=256;let t=n.getContext("2d");t.fillStyle="#b07c44",t.fillRect(0,0,128,256);for(let e=0;e<26;e++){t.strokeStyle=e%3?"rgba(92,52,20,.45)":"rgba(226,176,112,.4)",t.lineWidth=1+Math.random()*3;let i=Math.random()*128;t.beginPath(),t.moveTo(i,0),t.bezierCurveTo(i+9,80,i-9,170,i+3,256),t.stroke()}return Ws=new ke(n),Ws.colorSpace=be,Ws.wrapS=Ws.wrapT=dn,Ws}var je={head:new kt(.52,28,20),eye:new kt(.2,20,16),lid:new kt(.212,16,8,0,Math.PI*2,0,Math.PI/2),iris:new kt(.115,14,10),pupil:new kt(.07,12,8),shine:new kt(.03,8,6),stalk:new ee(.05,.075,1,10).rotateX(Math.PI/2).translate(0,0,-.5),upperArm:new _i(.098,.2,4,10).translate(0,-.14,0),foreArm:new _i(.08,.2,4,10).translate(0,-.13,0),hand:new kt(.108,12,10),thigh:new _i(.115,.2,4,10).translate(0,-.14,0),shin:new _i(.098,.18,4,10).translate(0,-.11,0),shoe:new kt(.13,12,8).scale(.95,.62,1.45),sole:new qt(.2,.035,.34),torso:new _i(.31,.34,6,16).scale(1,1,.82),hips:new kt(.3,14,10).scale(1.02,.62,.8),nose:new kt(.07,10,8),ear:new kt(.11,10,8).scale(.6,1,.8),brow:new _i(.034,.2,3,6).rotateZ(Math.PI/2)},$f={minsu:{pants:2764618,shoe:15921906,iris:2845951,brow:3810322},sigma:{pants:1513244,shoe:657930,iris:6715272,brow:1118481,lid:.35,browTilt:.32},cat:{pants:15263976,shoe:16751164,iris:7197696,brow:null,lid:.22},cone:{pants:4202624,shoe:16738816,iris:16724016,brow:null},toilet:{pants:16777215,shoe:16777215,iris:2858239,brow:4860434},streamer:{pants:1579036,shoe:16053492,iris:2759180,brow:1182728},tung:{pants:9396016,shoe:6044188,iris:1118481,brow:6044188,browTilt:.2},hero:{pants:1842210,shoe:15217708,iris:2236962,brow:null},rizz:{pants:2365486,shoe:16448250,iris:13639818,brow:1710628,browTilt:-.15},chill:{pants:4156072,shoe:14275784,iris:2759180,brow:null,lid:.04}},Ci=class Ci{constructor(t,e){this.skinId=t,this.nameText=e,this.root=new xe,this.visual=new xe,this.root.add(this.visual),this.build(t),e&&(this.tag=Dv(e),this.tag.position.y=2.65,this.tag.renderOrder=5,this.root.add(this.tag)),this.eyePop=0,this.eyeVel=0,this.walkT=0,this.deadT=-1,this.flash=0,this.time=Math.random()*10,this.lastPos=new N,this.lastYaw=0,this.speed=0,this.pitch=0,this.emote=0,this.ultra=!1,this.ultraKind=null,this.bigHead=!1,this.headScale=1,this.vy=0,this.air=0,this.leanF=0,this.leanS=0,this.twist=0,this.squash=0,this.squashV=0,this.kick=0,this.slapT=0,this.flashT=0,this.spawnT=1,this.blinkT=2+Math.random()*3,this.blink=0,this.mouthOpen=0,this.deadSpin=1,this.lobby=!1,this.foreZ=[0,0],this.tapPrev=0,this.poseIdx=0,this.xray=!1,this.outlineFar=!1,this.setWeapon("fart")}build(t){let e=Qs[t]??Qs.minsu,i=this.outfit=$f[t]??$f.minsu,s=ye(e.skin),r=ye(e.shirt),a=ye(i.pants),o=ye(i.shoe);this.mats=[s,r,a,o];let l=this.visual;this.torso=st(je.torso,r,0,1,0),l.add(this.torso),this.hips=st(je.hips,a,0,.66,0),l.add(this.hips);let c=x=>{let M=st(je.thigh,a,x*.16,.64,0),_=st(je.shin,a,0,-.3,0),T=st(je.shoe,o,0,-.26,-.06),S=he(st(je.sole,Gi(1118488),0,-.07,0));return T.add(S),_.add(T),M.add(_),M.userData.shin=_,M.userData.foot=T,l.add(M),M};this.legL=c(-1),this.legR=c(1);let h=x=>{let M=st(je.upperArm,r,x*.41,1.26,0),_=st(je.foreArm,s,0,-.29,0),T=st(je.hand,s,0,-.27,0);return _.add(T),M.add(_),M.userData.fore=_,M.userData.hand=T,l.add(M),M};this.armL=h(-1),this.armR=h(1),this.gun=new xe,this.gun.position.set(0,-.3,.02),this.gun.rotation.x=-Math.PI/2,this.armR.userData.fore.add(this.gun),this.muzzle=new Le(new Re({map:ka(),transparent:!0,depthWrite:!1,blending:_e,opacity:0,fog:!1})),this.muzzle.material.color.setRGB(2.6,2.2,1.2),this.muzzle.position.set(0,0,-.6),this.muzzle.scale.setScalar(.9),this.gun.parent.add(this.muzzle),this.muzzle.position.set(0,-1,.02),this.head=new xe,this.head.position.y=1.66,l.add(this.head),this.head.add(st(je.head,s));let u=ye(e.skin);if(this.mats.push(u),this.eyes=[-.21,.21].map(x=>{let M=new xe,_=new N(x,.12,-.42);M.position.copy(_);let T=he(st(je.eye,Gi(16777215))),S=he(st(je.iris,Gi(i.iris),0,0,-.105));S.scale.z=.7;let y=he(st(je.pupil,Gi(0),0,0,-.17));y.scale.z=.6;let w=he(st(je.shine,Gi(16777215),.045,.05,-.2)),C=st(je.lid,u);C.rotation.x=.9,M.add(T,S,y,w,C);let R=he(st(je.stalk,ye(16731501),x,.12,-.3));return R.scale.z=.01,this.head.add(M,R),{group:M,pupil:y,iris:S,shine:w,stalk:R,base:_,white:T,lid:C}}),this.brows=[],i.brow!==null&&i.brow!==void 0){let x=ye(i.brow);for(let M of[-1,1]){let _=st(je.brow,x,M*.22,.36,-.42);_.rotation.z=M*(i.browTilt??0),_.userData={y:.36,side:M},this.head.add(_),this.brows.push(_)}}this.mouth=he(st(new kt(.17,14,10),Gi(3801104),0,-.2,-.44)),this.mouthBase=[1.3,.35,.5],this.mouth.scale.set(...this.mouthBase);let d=he(st(new qt(.22,.05,.05),Gi(16777215),0,.09,-.14)),f=he(st(new kt(.09,10,8),Gi(16738954),0,-.09,-.11));if(f.scale.set(1.2,.5,1),this.mouth.add(d,f),this.head.add(this.mouth),!["cat","hero","chill","cone","tung"].includes(t)){this.head.add(st(je.nose,s,0,-.03,-.53));for(let x of[-1,1])t!=="streamer"&&this.head.add(st(je.ear,s,x*.52,.02,0))}this.shades=new xe;let p=new Vt({color:328965}),v=new qt(.32,.17,.04),g=wi(16777215,1.5);this.shades.add(he(st(v,p,-.2,.14,-.6)),he(st(v,p,.2,.14,-.6)),he(st(new qt(.74,.035,.04),p,0,.21,-.6)),he(st(new qt(.11,.022,.01),g,-.25,.18,-.625)),he(st(new qt(.11,.022,.01),g,.15,.18,-.625))),this.shades.visible=!1,this.head.add(this.shades),this.buildSkin(t,e,s,r,a,o),this.glow=he(new Le(new Re({map:oc(),transparent:!0,depthWrite:!1,blending:_e,opacity:0}))),this.glow.scale.set(5,5,1),this.glow.position.y=1.2,l.add(this.glow),this.crown=new xe;let m=wi(16762880,1.25);if(t==="sigma"){for(let x=0;x<5;x++){let M=x/5*Math.PI*2;this.crown.add(st(new oi(.1,.32,5),m,Math.cos(M)*.3,.14,Math.sin(M)*.3)),this.crown.add(he(st(new kt(.035,6,5),wi(x%2?16719968:3186943,2),Math.cos(M)*.3,.32,Math.sin(M)*.3)))}this.crown.add(st(new ee(.34,.34,.1,18),m))}if(this.crown.position.y=.62,this.crown.visible=!1,this.head.add(this.crown),t==="toilet"){let x=document.createElement("canvas");x.width=x.height=256;let M=x.getContext("2d");M.translate(128,128);for(let T=0;T<3;T++){M.rotate(Math.PI*2/3),M.beginPath();for(let S=0;S<60;S++){let y=S/60,w=y*6,C=14+y*112,R=Math.cos(w)*C,D=Math.sin(w)*C;S?M.lineTo(R,D):M.moveTo(R,D)}M.strokeStyle="rgba(140,225,255,.9)",M.lineWidth=15,M.lineCap="round",M.stroke()}let _=new ke(x);this.whirl=he(st(new fi(4.2,40).rotateX(-Math.PI/2),new Vt({map:_,color:new at(.7,1.05,1.5),transparent:!0,opacity:.55,depthWrite:!1,blending:_e,side:De}),0,.14,0)),this.whirl2=he(st(new Be(4.4,.08,6,44).rotateX(Math.PI/2),wi(9428223,2,{transparent:!0,opacity:.6,depthWrite:!1}),0,.2,0)),this.whirl.visible=this.whirl2.visible=!1,this.root.add(this.whirl,this.whirl2)}if(t==="chill"){let x=new pe({transparent:!0,depthWrite:!1,side:gn,blending:_e,uniforms:{t:{value:0}},vertexShader:"varying vec3 vN, vV; void main(){ vec4 p = modelViewMatrix * vec4(position, 1.0); vN = normalMatrix * normal; vV = -p.xyz; gl_Position = projectionMatrix * p; }",fragmentShader:"uniform float t; varying vec3 vN, vV; void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4); gl_FragColor = vec4(vec3(0.35, 0.75, 1.5) * (f * 1.3 + 0.02), 1.0); }"});this.bubble=he(st(new kt(1.7,28,20),x,0,1.2,0)),this.bubble.visible=!1,this.root.add(this.bubble)}this.blob=he(st(new fi(.72,20).rotateX(-Math.PI/2),new Vt({map:Vi(),color:0,transparent:!0,opacity:.55,depthWrite:!1}),0,.03,0)),this.root.add(this.blob),this.outlines=[],this.root.traverse(x=>{if(!x.isMesh||x.userData.noOutline||!x.geometry||x===this.blob)return;x.castShadow=!0;let M=new Ct(x.geometry,ac);M.userData.noOutline=!0,x.add(M),this.outlines.push(M)}),this.mark=new Le(new Re({map:Vi(),color:new at(3,.25,.25),transparent:!0,depthTest:!1,depthWrite:!1,blending:_e,fog:!1})),this.mark.scale.set(2.2,3.2,1),this.mark.position.y=1.2,this.mark.renderOrder=20,this.mark.visible=!1,this.root.add(this.mark)}buildSkin(t,e,i,s,r,a){let o=this.visual,l=(c=s)=>o.add(st(new Be(.2,.05,8,18).rotateX(Math.PI/2),c,0,1.36,0));if(t==="minsu"){let c=ye(2824720);this.head.add(st(new kt(.535,18,10,0,Math.PI*2,0,.95),c,0,.03,.02));for(let u=0;u<7;u++){let d=u/7*Math.PI*2,f=st(new oi(.1,.26,6),c,Math.cos(d)*.25,.52,Math.sin(d)*.25);f.rotation.set(Math.sin(d)*.5,0,-Math.cos(d)*.5),this.head.add(f)}l();let h=Ba("67",.34,"#ffe600");h.position.set(0,1.04,-.255),h.rotation.y=Math.PI,o.add(h)}else if(t==="sigma"){let c=st(new kt(.34,14,10),i,0,-.4,-.12);c.scale.set(1,.7,1),this.head.add(c);let h=ye(855312);this.head.add(st(new kt(.54,18,10,0,Math.PI*2,0,1.15),h,0,.04,.02));let u=st(new kt(.28,12,8),h,.14,.44,-.26);u.scale.set(1.5,.5,.9),this.head.add(u);let d=st(new oi(.16,.55,3).rotateX(Math.PI),ye(15921906),0,1.15,-.235);d.scale.z=.14,o.add(d);let f=st(new qt(.075,.36,.02),ye(12587040),0,1.13,-.27);o.add(f)}else if(t==="cat"){let c=new oi(.18,.36,4),h=new oi(.1,.22,4),u=ye(16754112);for(let m of[-1,1]){let x=st(c,i,m*.32,.5,0);x.rotation.z=-m*.18,this.head.add(x),this.head.add(he(st(h,u,m*.32,.47,-.09)));for(let M of[-.02,.04]){let _=he(st(new qt(.3,.012,.012),Gi(2236962),m*.48,-.14+M,-.36));_.rotation.z=m*M*3,this.head.add(_)}}let d=ye(13134106);for(let m of[-.12,0,.12])this.head.add(he(st(new qt(.05,.18,.05),d,m,.42+(m===0?.03:0),-.27)));this.head.add(st(new kt(.055,8,6),u,0,-.08,-.52)),this.mouth.position.y=-.24,this.tail=[];let f=o,p=0,v=.78,g=.28;for(let m=0;m<4;m++){let x=st(new _i(.075-m*.008,.16,3,8).rotateX(Math.PI/2).translate(0,0,.1),m===3?d:i,p,v,g);f.add(x),this.tail.push(x),f=x,p=0,v=0,g=.22}}else if(t==="cone"){let c=ye(16738816),h=ye(16777215);this.head.add(st(new oi(.42,.88,20),c,0,.77,0)),this.head.add(he(st(new ee(.255,.325,.14,20),h,0,.74,0))),this.head.add(he(st(new ee(.145,.2,.11,20),h,0,.98,0))),this.head.add(st(new qt(.98,.07,.98),c,0,.48,0));let u=Ba("\u2622",.42,"#ffe600");u.position.set(0,1.04,-.255),u.rotation.y=Math.PI,o.add(u);let d=st(new Be(.28,.09,8,20).rotateX(Math.PI/2),s,0,1.36,.02);o.add(d)}else if(t==="toilet"){let c=ye(16317439);for(let u of[this.torso,this.hips,this.legL,this.legR])u.visible=!1;let h=[[.26,0],[.34,.02],[.3,.16],[.4,.4],[.56,.66],[.58,.8]].map(([u,d])=>new bt(u,d));o.add(st(new ya(h,20),new Ns({color:16317439,gradientMap:tu,side:De}),0,0,0)),o.add(st(new Be(.5,.09,10,26).rotateX(Math.PI/2),c,0,.84,0)),o.add(he(st(new fi(.48,22).rotateX(-Math.PI/2),wi(4306687,1),0,.72,0))),o.add(st(new qt(.9,1,.3),c,0,1.08,.55)),o.add(st(new qt(.98,.09,.38),c,0,1.62,.55)),o.add(st(new ee(.03,.03,.2,8).rotateZ(Math.PI/2),ye(12109008),.36,1.4,.38)),this.head.position.y=1.32,this.armL.position.y=1.02,this.armR.position.y=1.02}else if(t==="streamer"){let c=ye(1380364);this.head.add(st(new kt(.538,18,10,0,Math.PI*2,0,1),c,0,.02,.02));let h=ye(1579036);this.head.add(st(new Be(.54,.05,8,26,Math.PI).rotateY(Math.PI/2),h,0,.1,0));for(let f of[-1,1])this.head.add(st(new ee(.18,.18,.12,18).rotateZ(Math.PI/2),ye(14163500),f*.53,.08,0)),this.head.add(he(st(new Be(.12,.018,6,18).rotateY(Math.PI/2),wi(16720435,2.4),f*.6,.08,0)));this.head.add(st(new qt(.03,.03,.36),h,-.5,-.1,-.2)),this.head.add(st(new kt(.06,8,6),h,-.46,-.13,-.38)),this.head.add(he(st(new kt(.02,6,5),wi(16719904,4),-.45,-.09,-.42))),this.mouthBase=[1.5,.9,.55],this.mouth.scale.set(...this.mouthBase);let u=Ba("7");u.position.set(0,1.04,-.255),u.rotation.y=Math.PI,o.add(u);let d=Ba("7",.44);d.position.set(0,1.04,.255),o.add(d),l(ye(16777215))}else if(t==="hero"){let c=ye(1842210);this.mats.push(c),this.head.add(st(new kt(.538,20,12,0,Math.PI*2,0,1.75),ye(15217708),0,.01,0));let h=new Vt({color:1052692});for(let d of[-1,1]){let f=st(new kt(.235,16,10),h,d*.21,.13,-.33);f.scale.set(1.15,.85,.55),this.head.add(f),this.head.add(he(st(new qt(.1,.03,.01),wi(16777215,1.5),d*.21-.05,.22,-.455)))}this.armL.material=c,this.armR.material=c;for(let d of[this.armL,this.armR])d.userData.fore.material=c,d.userData.hand.material=c;let u=Ba("M",.44,"#1c1c22");u.position.set(0,1.08,-.255),u.rotation.y=Math.PI,o.add(u);for(let d of[-1,1]){let f=st(new qt(.17,.5,.05),c,d*.25,1.02,-.2);f.rotation.z=d*-.1,o.add(f)}}else if(t==="tung"){let c=new Ns({map:Nv(),gradientMap:tu});Qf(c),this.mats.push(c),this.torso.geometry=new ee(.42,.44,.92,16),this.torso.material=c,this.head.children[0].material=c;let h=ye(6044188);o.add(st(new ee(.455,.455,.05,16),h,0,.76,0)),o.add(st(new ee(.44,.44,.05,16),h,0,1.2,0)),this.head.add(st(new ee(.42,.53,.14,16),h,0,.47,0)),this.head.add(st(new fi(.42,16).rotateX(-Math.PI/2),c,0,.541,0));for(let d of[this.armL,this.armR])d.material=c,d.userData.fore.material=c,d.userData.hand.material=c;let u=new xe;u.add(st(new ee(.13,.05,1.15,12),c,0,-.5,0)),u.add(st(new ee(.135,.135,.05,12),h,0,-.84,0)),u.add(st(new kt(.05,8,6),h,0,.09,0)),u.rotation.x=.2,this.bat=u,this.armL.userData.fore.add(u),u.position.set(0,-.3,-.06)}else if(t==="rizz"){let c=ye(1710628);this.head.add(st(new kt(.538,18,10,0,Math.PI*2,0,.95),c,0,.03,.02));let h=st(new kt(.3,14,10),c,0,.46,-.24);h.scale.set(1.25,.8,1.25),this.head.add(h);let u=ye(16448250),d=st(new oi(.17,.5,3).rotateX(Math.PI),u,0,1.18,-.235);d.scale.z=.14,o.add(d),o.add(he(st(new Be(.27,.03,8,24).rotateX(1.25),wi(16762880,1.3),0,1.22,-.08))),o.add(he(st(new Ds(.06),wi(16769152,2.2),0,.97,-.25))),this.mouth.children[0].material=wi(16777215,1.5)}else if(t==="chill"){let c=ye(8215100);for(let d of[-1,1]){let f=st(new kt(.2,12,10),c,d*.56,-.08,.02);f.scale.set(.55,1.55,.9),f.rotation.z=d*.14,this.head.add(f)}let h=st(new kt(.27,16,10),ye(15127216),0,-.14,-.42);h.scale.set(1.1,.75,.85),this.head.add(h),this.head.add(he(st(new kt(.07,10,8),Gi(1576970),0,-.05,-.65))),this.mouth.position.set(.05,-.27,-.6),this.mouthBase=[.8,.15,.4],this.mouth.scale.set(...this.mouthBase);let u=ye(7633023);o.add(st(new Be(.22,.075,8,20).rotateX(Math.PI/2),u,0,1.36,0)),o.add(st(new ee(.34,.33,.1,18),u,0,.72,0))}if(t!=="toilet"&&t!=="tung")for(let c of[this.legL,this.legR]){let h=he(st(new kt(.075,8,6),Gi(16777215),0,.01,-.13));h.scale.set(1.1,.8,1),c.userData.foot.add(h)}}setWeapon(t){if(this.weaponId===t)return;this.weaponId=t,this.gun.clear();let e=(i,s,r,a,o)=>{let l=st(i,s,r,a,o);if(l.castShadow=!0,this.gun.add(l),!s.isMeshBasicMaterial){let c=new Ct(i,ac);l.add(c)}return l};t==="fart"?(e(new _i(.1,.32,4,10).rotateX(Math.PI/2),Pi(7128644)),e(new oi(.16,.26,12).rotateX(-Math.PI/2),Pi(3833116),0,0,-.36),e(new kt(.07,10,8),Pi(16737970),0,.11,.05).scale.set(1.3,.7,1.4),e(new Be(.106,.02,6,14),wi(11927338,2),0,0,-.08)):t==="six7"?(e(new qt(.15,.18,.28),Pi(16765503)),e(new ee(.06,.06,.65,10).rotateX(Math.PI/2),Pi(11175936),0,.03,-.42),e(new ee(.09,.09,.14,10).rotateX(Math.PI/2),Pi(7829367),0,.01,-.1),e(new qt(.02,.05,.02),wi(16719968,3),0,.12,-.7)):(e(new qt(.17,.17,.42),Pi(3355456)),e(new oi(.3,.42,16,1,!0).rotateX(Math.PI/2),Pi(16727425,{side:De}),0,0,-.42),e(new Be(.29,.022,6,18),wi(16748736,2),0,0,-.62))}pop(t=1){this.eyeVel+=9*t,this.flash=.16,this.squashV-=2.6*t,this.mouthOpen=1;for(let e of this.mats)e.emissive?.setHex(16719904)}fire(t="fart"){this.kick=Math.min(1.2,this.kick+(t==="fart"?.35:1)),this.flashT=.06,this.muzzle.material.color.setRGB(...t==="fart"?[1.2,2.6,.5]:t==="boom"?[3,.9,1.8]:[2.8,2.2,.8]),this.muzzle.material.rotation=Math.random()*6.28}slap(){this.slapT=.28}die(){this.deadT=0,this.deadSpin=Math.random()<.5?-1:1,this.eyes.forEach(t=>{t.group.visible=!1,t.stalk.visible=!1}),this.tag&&(this.tag.visible=!1),this.muzzle.material.opacity=0,this.whirl&&(this.whirl.visible=this.whirl2.visible=!1),this.mark.visible=!1,this.bubble&&(this.bubble.visible=!1),this.poofed=!1}respawn(){this.deadT=-1,this.visual.rotation.set(0,0,0),this.visual.position.set(0,0,0),this.visual.scale.set(1,1,1),this.visual.visible=!0,this.blob.visible=!0,this.eyePop=0,this.eyeVel=0,this.spawnT=0,this.squash=this.squashV=0,this.eyes.forEach(t=>{t.group.visible=!0,t.stalk.visible=!0}),this.tag&&(this.tag.visible=!0)}eyeWorldPositions(){return this.eyes.map(t=>t.group.getWorldPosition(new N))}setFore(t,e){this.armL.userData.fore.rotation.x=t,this.armR.userData.fore.rotation.x=e,this.armL.userData.fore.rotation.z=this.foreZ[0],this.armR.userData.fore.rotation.z=this.foreZ[1]}lobbyPose(t){let e=this.armL,i=this.armR,s=this.visual,r=this.head;switch(s.rotation.x=0,s.rotation.z=0,r.rotation.y=0,r.rotation.x=0,this.skinId){case"sigma":{let a=Math.floor(t/2.3)%3;if(a!==this.poseIdx&&(this.poseIdx=a,this.squashV-=2.2),r.rotation.x=.16,r.rotation.y=Math.sin(t*.8)*.12,a===0){e.rotation.set(0,0,-1.5),i.rotation.set(0,0,1.5);let o=Math.sin(t*7)*.12;this.foreZ=[-2.05+o,2.05-o]}else a===1?(e.rotation.set(-.95,0,.1),i.rotation.set(-1.15,0,-.1),this.foreZ=[1.7,-1.7]):(e.rotation.set(0,0,-.72),i.rotation.set(0,0,.72),this.foreZ=[1.65,-1.65],r.rotation.y=.5);return[0,0]}case"tung":{let a=Math.abs(Math.sin(t*5.2));if(e.rotation.set(-1.05-a*.75,0,.42),i.rotation.set(-.85,0,-.32),this.foreZ=[0,-.85],r.rotation.x=.12-a*.14,s.position.y=(1-a)*.02,s.rotation.z=Math.sin(t*2.6)*.035,this.tapPrev>.1&&a<=.1){this.squashV-=.9;let o=this.root.position,l=this.root.rotation.y;Ci.fx?.tap?.([o.x-Math.sin(l)*.55,o.y+.98,o.z-Math.cos(l)*.55])}return this.tapPrev=a,[-.25,-.1]}case"cat":{let a=Math.sin(t*9)*.14;return e.rotation.set(.1,0,-.12),i.rotation.set(-2.05,0,-.42),r.rotation.z=.16,r.rotation.y=Math.sin(t*.7)*.2,s.rotation.z=Math.sin(t*1.5)*.05,[-.3,-1.05+a]}case"cone":{let a=Math.sin(t*1.3)>.82;return r.rotation.y=a?Math.PI*(Math.floor(t*11)%2)*.5:Math.sin(t*.9)*.2,r.rotation.z=a?.3:Math.sin(t*2.2)*.1,s.position.y=a?Math.random()*.07:0,e.rotation.set(Math.sin(t*2.1)*.5,0,-.14),i.rotation.set(Math.sin(t*2.1+3)*.5,0,.14),[-.1,-.1]}case"toilet":return r.position.y=1.3+Math.max(0,Math.sin(t*2.4))*.3,r.rotation.y=Math.sin(t*1.2)*.35,s.position.y=Math.abs(Math.sin(t*2.4))*.05,e.rotation.set(0,0,-1.2+Math.sin(t*4.8)*.4),i.rotation.set(0,0,1.2-Math.sin(t*4.8)*.4),[0,0];case"streamer":{let a=Math.abs(Math.sin(t*5.4));return s.position.y=a*.3,r.rotation.x=-.28+Math.sin(t*10.8)*.16,r.rotation.y=Math.sin(t*2.7)*.25,e.rotation.set(-2.8+Math.sin(t*10.8)*.25,0,-.35),i.rotation.set(-2.8-Math.sin(t*10.8)*.25,0,.35),this.mouthOpen=Math.max(this.mouthOpen,.8),[-.4,-.4]}case"hero":return s.position.y=.3+Math.sin(t*1.8)*.07,r.rotation.x=.14,e.rotation.set(0,0,-.72),i.rotation.set(0,0,.72),this.foreZ=[1.65,-1.65],this.legL.rotation.x=.04,this.legR.rotation.x=-.22,this.legR.userData.shin.rotation.x=.38,[0,0];case"rizz":{let a=Math.sin(t*1.7);return e.rotation.set(-2.75,0,-.4-a*.15),i.rotation.set(-1.45+Math.max(0,Math.sin(t*3.4))*-.18,.25,0),r.rotation.z=-.13,r.rotation.y=.25+a*.1,s.rotation.z=Math.sin(t*1.7)*.055,Math.sin(t*.9)>.97&&(this.eyes[1].lid.rotation.x=-1.2),[-1.7,-.02]}case"chill":return e.rotation.set(.42,0,.16),i.rotation.set(.42,0,-.16),r.rotation.x=Math.sin(t*1.5)*.09,r.rotation.y=Math.sin(t*.55)*.2,s.rotation.z=Math.sin(t*1.1)*.03,[-1,-1];default:{let a=Math.sin(t*13)*.14;return e.rotation.set(.05,0,-.1),i.rotation.set(-2.5,0,.34),r.rotation.z=-.1+Math.sin(t*.8)*.05,r.rotation.y=Math.sin(t*.5)*.15,[-.1,-1.55+a]}}}updateBlob(){if(!this.blob.visible||!Ci.map)return;let t=this.root.position,e=Math.max(Ci.map.fallY,In(Ci.map,t.x,t.z,t.y+.6)),i=Math.max(0,t.y-e);this.blob.position.y=e-t.y+.03;let s=Math.max(.35,1-i*.09);this.blob.scale.setScalar(s),this.blob.material.opacity=.55*s}update(t){this.time+=t;let e=this.time,i=this.root.position,s=i.x-this.lastPos.x,r=i.y-this.lastPos.y,a=i.z-this.lastPos.z,o=1/Math.max(t,.001),l=Math.hypot(s,r,a);this.speed+=(l*o-this.speed)*Math.min(1,t*10);let c=this.vy;this.vy+=(r*o-this.vy)*Math.min(1,t*14),this.lastPos.copy(i);let h=this.root.rotation.y,u=Math.sin(h),d=Math.cos(h),f=(-s*u-a*d)*o,p=(s*d-a*u)*o,v=xt=>Math.abs(xt)>40?0:xt;this.leanF+=(v(f)*.022-this.leanF)*Math.min(1,t*9),this.leanS+=(v(p)*-.024-this.leanS)*Math.min(1,t*9);let g=h-this.lastYaw;for(;g>Math.PI;)g-=Math.PI*2;for(;g<-Math.PI;)g+=Math.PI*2;this.lastYaw=h,this.twist+=(Math.max(-.5,Math.min(.5,g*o*.06))-this.twist)*Math.min(1,t*10);let m=Math.abs(this.vy)>1.6;this.air+=((m?1:0)-this.air)*Math.min(1,t*11),c<-6&&this.vy>c+3&&(this.squashV-=Math.min(5,-c*.32),l<3&&Ci.fx?.landDust([i.x,i.y,i.z])),this.squashV+=(-210*this.squash-15*this.squashV)*t,this.squash+=this.squashV*t,this.spawnT<1&&(this.spawnT=Math.min(1,this.spawnT+t*3.2));let x=this.spawnT,M=x>=1?1:1+2.7*(x-1)**3+1.7*(x-1)**2;if(this.deadT>=0){this.deadT+=t;let xt=this.deadT,Jt=1-(1-Math.min(1,xt*2.4))**3;this.visual.rotation.x=Jt*1.57,this.visual.rotation.z=this.deadSpin*Math.sin(Math.min(1,xt*1.8)*Math.PI)*.7,this.visual.position.y=Math.abs(Math.sin(xt*5.5))*Math.max(0,1.05-xt*1.05)+Jt*.18;let ne=Math.max(0,1-xt*1.1),Wt=Math.sin(xt*26)*ne;this.armL.rotation.set(-2.6+Wt*.6,0,.9),this.armR.rotation.set(-2.6-Wt*.6,0,-.9),this.setFore(-.3+Wt,-.3-Wt),this.legL.rotation.set(.5+Wt*.8,0,.35),this.legR.rotation.set(.5-Wt*.8,0,-.35),this.mouth.scale.set(this.mouthBase[0]*1.1,1.1,this.mouthBase[2]);let Fe=xt>1.4?Math.max(.01,1-(xt-1.4)*2):1;this.visual.scale.set(1+(1-Fe)*.6,Fe,1+(1-Fe)*.6),xt>1.72&&!this.poofed&&(this.poofed=!0,Ci.fx?.poof([i.x,i.y+.4,i.z])),Fe<=.02&&(this.visual.visible=!1,this.blob.visible=!1),this.updateBlob();return}if(this.flash>0&&(this.flash-=t,this.flash<=0))for(let xt of this.mats)xt.emissive?.setHex(0);this.blinkT-=t,this.blinkT<=0&&(this.blinkT=2+Math.random()*4,this.blink=1),this.blink=Math.max(0,this.blink-t*9);let _=60,T=6;this.eyeVel+=(-_*this.eyePop-T*this.eyeVel)*t,this.eyePop+=this.eyeVel*t;let S=this.ultra?this.ultraKind:null,y=Math.max(S==="minsu"?.4:0,this.eyePop),w=this.outfit.lid??.9;for(let[xt,pt]of this.eyes.entries()){pt.white.material.color.setHex(S==="minsu"?16722474:16777215);let Jt=y*.15*Math.sin(e*40+xt*2);pt.group.position.set(pt.base.x+Jt,pt.base.y+Jt*.6,pt.base.z-y*1.2),pt.group.scale.setScalar(1+y*1.1),pt.stalk.position.set(pt.base.x*.9,pt.base.y,-.28),pt.stalk.scale.set(1,1,Math.max(.01,y*1.2+.05));let ne=.018*Math.sin(e*(xt?3.1:2.3));pt.iris.position.set(ne,ne*.6,-.105),pt.pupil.position.set(ne*1.2,ne*.7,-.17),pt.shine.position.set(.045+ne,.05+ne*.6,-.2);let Wt=Math.max(0,y)*1.5;pt.lid.rotation.x=w+Wt-this.blink*(w+1.25),pt.lid.rotation.z=(xt?-1:1)*(this.outfit.browTilt??0)*.5}for(let xt of this.brows)xt.position.y=xt.userData.y+Math.max(0,y)*.2,xt.rotation.z=xt.userData.side*((this.outfit.browTilt??0)-Math.max(0,y)*.5);this.mouthOpen=Math.max(0,this.mouthOpen-t*3.5);let C=S==="streamer"?.5+Math.abs(Math.sin(e*12))*.6:S==="cat"||S==="hero"||this.emote===2?.8:this.mouthOpen;this.mouth.scale.set(this.mouthBase[0]*(1+C*.12),this.mouthBase[1]+C*.7,this.mouthBase[2]);let R=this.speed>1&&this.air<.6;R&&(this.walkT+=t*this.speed*1.25);let D=Math.min(1,this.speed/9),F=this.walkT,G=R?Math.sin(F):0,I=.45+D*.5,z=this.air,Y=this.vy>0?1:.55;this.legL.rotation.set(G*I*(1-z)-z*.75*Y,0,0),this.legR.rotation.set(-G*I*(1-z)+z*.35,0,0);let V=R?Math.max(0,Math.sin(F+1.2))*(.5+D*.8):0,tt=R?Math.max(0,Math.sin(F+1.2+Math.PI))*(.5+D*.8):0;this.legL.userData.shin.rotation.x=V*(1-z)+z*1.1*Y,this.legR.userData.shin.rotation.x=tt*(1-z)+z*.6,this.legL.userData.foot.rotation.x=-this.legL.userData.shin.rotation.x*.35,this.legR.userData.foot.rotation.x=-this.legR.userData.shin.rotation.x*.35;let W=this.bigHead?2.15:1;this.headScale+=(W-this.headScale)*Math.min(1,t*6),this.head.scale.setScalar(this.headScale);let j=Math.sin(e*2.1),Q=R?Math.sin(F*2)*.03:j*.012;this.head.position.y=(this.skinId==="toilet"?1.32:1.66)+Q,this.head.rotation.x=-this.pitch*.55,this.head.rotation.z=-this.leanS*.6+Math.max(0,this.eyePop)*Math.sin(e*22)*.12,this.torso.scale.set(1+j*.012,1,1+j*.012),this.visual.rotation.y=0,this.visual.position.y=R?Math.abs(Math.sin(F))*(.05+D*.05):0;let Et=this.emote===1,Dt=-.25,X=-.12;if(this.foreZ[0]=this.foreZ[1]=0,this.lobby)[Dt,X]=this.lobbyPose(e);else if(S==="hero")this.armR.rotation.set(-3.1,0,0),this.armL.rotation.set(.1,0,.1),Dt=-.5,X=0,this.visual.rotation.x=-1.4,this.visual.rotation.z=0,this.head.rotation.y=0,this.head.rotation.x=.9,this.legL.rotation.x=.15,this.legR.rotation.x=.55,this.legL.userData.shin.rotation.x=.1,this.legR.userData.shin.rotation.x=.9;else if(S==="chill")this.armL.rotation.set(.42,0,.16),this.armR.rotation.set(.42,0,-.16),Dt=X=-1,this.visual.rotation.x=0,this.visual.rotation.z=Math.sin(e*2.2)*.05,this.head.rotation.y=Math.sin(e*1.1)*.15;else if(S==="streamer"){let xt=Math.sin(e*8);this.armL.rotation.set(-2.7+xt*.3,0,.5),this.armR.rotation.set(-2.7-xt*.3,0,-.5),Dt=X=-.5+xt*.3,this.visual.rotation.x=0,this.visual.rotation.z=xt*.12,this.head.rotation.y=0,this.head.rotation.x=-.45+xt*.2}else if(S==="tung"){let xt=Math.sin(e*9.4);this.armL.rotation.set(-2.1+xt*1.1,0,.2),this.armR.rotation.set(-1.3,0,0),Dt=-.4+xt*.3,this.visual.rotation.x=0,this.visual.rotation.z=xt*.06,this.head.rotation.y=0}else if(S==="cat"){let xt=Math.sin(e*34);this.armL.rotation.set(-2.5+xt*.8,0,.3),this.armR.rotation.set(-2.5-xt*.8,0,-.3),Dt=-.6+xt*.5,X=-.6-xt*.5,this.visual.rotation.x=-1.05+Math.sin(e*19)*.08,this.visual.rotation.z=Math.sin(e*23)*.18,this.head.rotation.y=0,this.head.rotation.x=.7}else if(S==="toilet")this.armL.rotation.set(0,0,-1.45),this.armR.rotation.set(0,0,1.45),Dt=X=0,this.visual.rotation.x=0,this.visual.rotation.z=0,this.head.rotation.y=0;else if(Et)this.visual.rotation.x=0,this.armR.rotation.set(-2.6+Math.sin(e*4.3)*.25,0,-.4+Math.sin(e*8.6)*.25),this.armL.rotation.set(.25,0,.75+Math.sin(e*4.3)*.15),X=-.25+Math.sin(e*8.6)*.3,Dt=-.9,this.visual.rotation.z=Math.sin(e*4.3)*.08,this.visual.position.y=Math.abs(Math.sin(e*4.3))*.05,this.head.rotation.y=Math.sin(e*2.15)*.25;else if(this.emote===2){let xt=Math.sin(e*11);this.visual.rotation.x=0,this.armL.rotation.set(-1.55+xt*.55,0,.15),this.armR.rotation.set(-1.55-xt*.55,0,-.15),Dt=X=-.3,this.visual.rotation.z=xt*.04,this.head.rotation.y=0}else{this.visual.rotation.x=0;let xt=R?Math.sin(F)*.09*D:j*.012,pt=z*(this.vy<-1?Math.sin(e*16)*.22:0);this.armR.rotation.set(-1.45-this.pitch*.9+this.kick*-.28+xt+pt,0,0),this.armL.rotation.set(-1.15-this.pitch*.9-xt-z*.5+pt,0,.5+z*.3),Dt=-.5-this.pitch*.2,X=-.1-this.kick*.3,this.visual.rotation.z=0,this.head.rotation.y=-this.twist*.8}if(this.setFore(Dt,X),this.slapT>0){this.slapT-=t;let xt=1-Math.max(0,this.slapT)/.28,pt=Math.sin(xt*Math.PI);this.armR.rotation.set(-1.6,-.9+xt*2.3,-.3),this.armR.userData.fore.rotation.x=-.2*pt,this.visual.rotation.y+=-.5+xt*.9}if(this.gun.visible=!this.lobby&&this.emote===0&&!["cat","minsu","hero","chill","streamer","toilet"].includes(S),["hero","cat","toilet"].includes(S)||(this.visual.rotation.x+=this.leanF,this.visual.rotation.z+=this.leanS,this.visual.rotation.y+=this.twist),this.skinId==="toilet"&&S!=="toilet"&&!this.lobby){let xt=R?Math.abs(Math.sin(F*.75))*.24:0;this.visual.position.y=xt,this.visual.rotation.z=R?Math.sin(F*.75)*.08:0}if(this.tail){let xt=S==="cat"?1.6:.5;this.tail.forEach((pt,Jt)=>{pt.rotation.y=Math.sin(e*(S==="cat"?18:4)-Jt*.9)*.42*xt,pt.rotation.x=Jt===0?-.6:-.32+this.air*.2})}S==="toilet"&&(this.visual.rotation.y=e*11),this.whirl&&(this.whirl.visible=this.whirl2.visible=S==="toilet"),S==="toilet"&&(this.whirl.rotation.y=-e*7,this.whirl.scale.setScalar(.92+Math.sin(e*3)*.08),this.whirl2.scale.setScalar(1+e*.9%1*.1)),this.bubble&&(this.bubble.visible=S==="chill",this.bubble.visible&&this.bubble.scale.setScalar(1+Math.sin(e*3)*.035)),this.flashT-=t,this.kick=Math.max(0,this.kick-t*7),this.muzzle.material.opacity=this.flashT>0&&this.gun.visible?1:0;let yt=Et||S==="sigma"||S==="cone"||S==="rizz";this.shades.visible=yt,this.crown.visible=S==="sigma";let wt=this.ultra?.2:Et?.22:0;this.glow.material.opacity+=(wt-this.glow.material.opacity)*Math.min(1,t*6);let Nt=3.2+Math.sin(e*7)*.35;this.glow.scale.set(Nt,Nt*1.25,1);let gt=(S==="sigma"?1.3:S==="cat"?1.15:1)*M,Ht=Math.max(-.35,Math.min(.35,this.squash));if(this.visual.scale.set(gt*(1-Ht*.6),gt*(1+Ht),gt*(1-Ht*.6)),this.mark.visible=this.xray,Ci.cam){let xt=Ci.cam.position,pt=(xt.x-i.x)**2+(xt.z-i.z)**2>900;if(pt!==this.outlineFar){this.outlineFar=pt;for(let Jt of this.outlines)Jt.visible=!pt}}this.updateBlob()}setVisibleBody(t){this.visual.visible=t,this.blob.visible=t,this.tag&&(this.tag.visible=t)}dispose(t){t.remove(this.root)}};Qa(Ci,"map",null),Qa(Ci,"fx",null),Qa(Ci,"cam",null);var vn=Ci;var lc=new Map;function ep(){if(lc.size)return;let n=null;try{n=new Lr({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),n.setSize(160,160),n.toneMapping=Os;let t=new as;t.add(new fs(16777215,6706551,2.2));let e=new ms(16773856,1.6);e.position.set(-2,4,-5),t.add(e);let i=new Ke(30,1,.1,30);for(let s of Oi){let r=new vn(s);r.update(.016),r.gun.visible=!1,r.blob.visible=!1,t.add(r.root);let a=s==="toilet"?1.25:1.62,o=s==="cone"?.3:0;i.position.set(-1.1,a+.3+o,-4.2-o*2),i.lookAt(0,a+o*.7,0),n.render(t,i),lc.set(s,n.domElement.toDataURL("image/png")),t.remove(r.root)}}catch{lc.clear()}finally{n?.dispose(),n?.forceContextLoss()}}function ys(n,t="portrait"){let e=lc.get(n);if(e){let s=document.createElement("img");return s.className=t,s.src=e,s.alt="",s.draggable=!1,s}let i=document.createElement("i");return i.className=`${t} emojiFace`,i.textContent=td[n]??"\u{1F642}",i}var $t=n=>document.getElementById(n),cc=class{constructor(){this.names=new Map,this.el={root:$t("hud"),hpBar:$t("hpBar"),hpText:$t("hpText"),auraBar:$t("auraBar"),auraText:$t("auraText"),chips:$t("scoreChips"),timer:$t("timer"),weapon:$t("weaponName"),ammo:$t("ammo"),reload:$t("reloadText"),cross:$t("crosshair"),hit:$t("hitmarker"),big:$t("bigCount"),feed:$t("killfeed"),shout:$t("shout"),aura:$t("auraPops"),eyes:$t("bigEyes"),vignette:$t("vignette"),lock:$t("lockHint"),cut:$t("killCut"),cutText:$t("killCutText"),death:$t("death"),deathLine:$t("deathLine"),deathBy:$t("deathBy"),deathBar:$t("deathBar"),event:$t("eventBanner"),ultra:$t("ultraFrame"),ultraLabel:$t("ultraLabel"),ultraReady:$t("ultraReady"),claws:$t("claws"),grab:$t("grabFace"),charm:$t("charmFx"),slow:$t("slowFx"),oppen:$t("oppen"),oppenBy:$t("oppenBy"),flash:$t("nukeFlash"),rain:$t("rain"),dir:$t("damageDir"),six:$t("sixSeven")},this.prev={}}show(t){this.el.root.hidden=!t}reset(){this.prev={},this.el.feed.replaceChildren(),this.el.aura.replaceChildren(),this.el.event.hidden=!0,this.el.death.hidden=!0,this.el.cut.hidden=!0,this.el.vignette.className="",document.getElementById("hudGameLayer").hidden=!1,this.setUltra(!1),this.setGrabbed(!1),this.setCharm(0),this.setSlow(0),this.el.oppen.hidden=!0,this.el.chips.replaceChildren(),this.show(!0)}setFace(t){let e=$t("hudFace");e.replaceChildren(),t&&e.append(ys(t,"hudPortrait"))}setLockHint(t){this.el.lock.hidden=!t}setWeapon(t){this.el.weapon.textContent=`${t.emoji} ${it(`weapon.${t.id}`)}`,this.restart(this.el.weapon,"wobble")}restart(t,e){t.classList.remove(e),t.offsetWidth,t.classList.add(e)}setText(t,e,i){this.prev[t]!==i&&(this.prev[t]=i,e.textContent=i)}update(t){let e=this.el,i=Math.max(0,t.hp);if(this.prev.hp!==i&&(this.prev.hp=i,e.hpBar.style.width=`${i}%`,e.hpBar.classList.toggle("low",i<=33.5),e.hpText.textContent=it("hud.sanity",{n:Math.ceil(i*10)/10})),this.prev.aura!==t.aura){this.prev.aura=t.aura,e.auraBar.style.width=`${t.aura/6767*100}%`,e.auraText.textContent=`AURA ${t.aura.toLocaleString()} / ${6767 .toLocaleString()}`;let c=t.aura>=6767;e.ultraReady.hidden=!c,c&&(e.ultraReady.textContent=it("hud.ultraReady",{name:it(`ultra.${t.me?.skinId}`)})),e.auraBar.classList.toggle("full",c)}this.renderScores(t);let s=Math.ceil(t.timeLeft/1e3);this.setText("timer",e.timer,`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`);let r=He[t.weapon];this.setText("ammo",e.ammo,t.infAmmo()?"\u221E / 6767":`${t.ammo[r.id]} / ${r.mag}`);let a=t.reloadT>0;this.prev.rel!==a&&(this.prev.rel=a,e.reload.hidden=!a,a&&(e.reload.textContent=gi(cn("reload"))));let o=!!t.emote||!t.alive||t.forced;this.prev.hideCross!==o&&(this.prev.hideCross=o,e.cross.hidden=o);let l=(t.zoom?4:10)+(Math.hypot(t.body.vx,t.body.vz)>2?6:0)+t.recoil*8;Math.abs((this.prev.spread??0)-l)>.4&&(this.prev.spread=l,e.cross.style.setProperty("--gap",`${l}px`))}renderScores(t){let e=[...t.scores].sort((s,r)=>r.k-s.k),i=e.map(s=>`${s.id}:${s.k}`).join(",");this.prev.scores!==i&&(this.prev.scores=i,this.el.chips.replaceChildren(...e.map(s=>{let r=document.createElement("div");r.className=`chip${s.id===t.myId?" me":""}`;let a=document.createElement("span");a.textContent=this.names.get(s.id)??"???";let o=document.createElement("b");o.textContent=s.k;let l=t.chars.get(s.id)?.skinId;return l&&r.append(ys(l,"chipFace")),r.append(a,o),r})))}hitmarker(t){let e=this.el.hit;e.classList.toggle("head",!!t),this.restart(e,"show")}flashHpLoss(){this.restart(this.el.hpBar.parentElement,"jolt")}eyePop(t){let e=this.el.eyes;e.classList.toggle("big",!!t),this.restart(e,"pop"),this.restart(this.el.vignette,"hurt")}damageDir(t){let e=this.el.dir;e.style.setProperty("--a",`${t}rad`),this.restart(e,"show")}bigCount(t){let e=this.el.big;e.textContent=t,e.hidden=!t,t&&this.restart(e,"stamp")}shout(t,e="gold"){let i=this.el.shout;i.textContent=t,i.dataset.tone=e,this.restart(i,"show")}sixSeven(){let t=this.el.six;t.textContent=(this.sixFlag=!this.sixFlag)?"6":"7",t.style.setProperty("--x",`${Math.random()*60-30}px`),this.restart(t,"show")}auraPop(t,e){let i=document.createElement("div");if(i.className=`aurapop ${t>=0?"up":"down"}`,i.textContent=`${t>=0?"+":""}${t.toLocaleString()} AURA`,e){let s=document.createElement("small");s.textContent=it(`aura.${e}`),i.append(s)}i.style.setProperty("--r",`${Math.random()*14-7}deg`),this.el.aura.append(i),setTimeout(()=>i.remove(),1500)}killFeed(t,e,i){let s=document.createElement("div");s.className="feed";let r=document.createElement("b");r.textContent=e;let a=document.createElement("span");a.textContent=` ${it(`label.${t.weapon}`)}${t.head?" \u{1F3AF}":""} `;let o=document.createElement("b");for(o.textContent=i,s.append(r,a,o),this.el.feed.prepend(s);this.el.feed.children.length>5;)this.el.feed.lastChild.remove();setTimeout(()=>s.remove(),5500)}killCutIn(t,e){let i=this.el.cut;this.el.cutText.textContent=t,i.hidden=!1,i.classList.toggle("head",!!e),this.restart(i,"play"),clearTimeout(this.cutTimer),this.cutTimer=setTimeout(()=>{i.hidden=!0},1050)}deathScreen(t,e,i,s){let r=this.el;r.death.hidden=!1,r.deathLine.textContent=t,r.deathBy.textContent=i==="fall"?it("hud.deathFall"):it("hud.deathBy",{name:e,weapon:it(`label.${i}`)}),r.deathBar.style.transition="none",r.deathBar.style.width="100%",r.deathBar.offsetWidth,r.deathBar.style.transition=`width ${s}ms linear`,r.deathBar.style.width="0%"}hideDeath(){this.el.death.hidden=!0}eventBanner(t,e){let i=this.el.event;if(clearTimeout(this.eventTimer),!t){i.hidden=!0;return}i.textContent=t,i.hidden=!1,this.restart(i,"stamp"),this.eventTimer=setTimeout(()=>{i.hidden=!0},e)}claws(){let t=document.createElement("i");for(t.style.left=`${10+Math.random()*62}%`,t.style.top=`${8+Math.random()*50}%`,t.style.setProperty("--r",`${Math.random()*60-30}deg`),this.el.claws.append(t);this.el.claws.children.length>14;)this.el.claws.firstChild.remove();setTimeout(()=>t.remove(),1100)}setGrabbed(t){this.el.grab.hidden=!t,t||this.el.claws.replaceChildren()}setCharm(t){clearTimeout(this.charmTimer),this.el.charm.hidden=!t,t&&(this.charmTimer=setTimeout(()=>{this.el.charm.hidden=!0},t))}setSlow(t){clearTimeout(this.slowTimer),this.el.slow.hidden=!t,t&&(this.slowTimer=setTimeout(()=>{this.el.slow.hidden=!0},t))}oppenheimer(t,e){let i=this.el;i.oppenBy.textContent=e?it("hud.nukeOther",{name:e}):it("hud.nukeMine"),i.oppen.hidden=!1,clearTimeout(this.oppenTimer),this.oppenTimer=setTimeout(()=>{i.oppen.hidden=!0},t)}nukeFlash(){this.el.oppen.hidden=!0,this.restart(this.el.flash,"show")}setUltra(t,e,i,s){if(this.el.ultra.hidden=!t,i&&(this.el.ultraLabel.textContent=i),s!==void 0&&this.el.ultra.style.setProperty("--u",`#${s.toString(16).padStart(6,"0")}`),clearTimeout(this.ultraTimer),t){this.ultraTimer=setTimeout(()=>{this.el.ultra.hidden=!0},e);let r=$t("ultraTime");r.style.transition="none",r.style.transform="scaleX(1)",r.offsetWidth,r.style.transition=`transform ${e}ms linear`,r.style.transform="scaleX(0)"}}rain(t,e=30){let i=this.el.rain;for(let s=0;s<e;s++){let r=document.createElement("span");r.textContent=gi(t),r.style.left=`${Math.random()*100}%`,r.style.fontSize=`${24+Math.random()*64}px`,r.style.animationDuration=`${1+Math.random()*1.3}s`,r.style.animationDelay=`${Math.random()*.5}s`,i.append(r),setTimeout(()=>r.remove(),3e3)}}};Ki();Ts();nu();Ts();var Ha=new Map;function Xs(n,{color:t="#fff",stroke:e="#000",size:i=96,font:s='Impact, "Malgun Gothic", sans-serif'}={}){let r=`${n}|${t}|${e}|${i}`;if(Ha.has(r))return Ha.get(r);let a=document.createElement("canvas"),o=a.getContext("2d");o.font=`900 ${i}px ${s}`;let l=Math.ceil(o.measureText(n).width)+i;a.width=l,a.height=Math.ceil(i*1.6),o.font=`900 ${i}px ${s}`,o.textAlign="center",o.textBaseline="middle",o.lineJoin="round",e&&(o.lineWidth=i*.18,o.strokeStyle=e,o.strokeText(n,l/2,a.height/2)),o.fillStyle=t,o.fillText(n,l/2,a.height/2);let c=new ke(a);return c.colorSpace=be,c.userData={aspect:l/a.height},Ha.size>200&&Ha.clear(),Ha.set(r,c),c}var Ov=new kt(.22,14,12),Bv=new kt(.13,10,8),kv=new kt(.08,8,6),zv=new Vt({color:16777215}),Hv=new Vt({color:2845951}),Gv=new Vt({color:0}),np=new ee(.4,1,1,6,1).rotateX(-Math.PI/2),sp=n=>1+2.7*(n-1)**3+1.7*(n-1)**2,uc=class{constructor(t,e,i){this.max=e,this.n=0,this.items=[];let s=new we;this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e),s.setAttribute("position",new Ve(this.pos,3).setUsage(zs)),s.setAttribute("pColor",new Ve(this.col,4).setUsage(zs)),s.setAttribute("pSize",new Ve(this.size,1).setUsage(zs)),s.setDrawRange(0,0);let r=new pe({transparent:!0,depthWrite:!1,blending:i?_e:gs,uniforms:{map:{value:Vi()},scale:{value:700}},vertexShader:`attribute vec4 pColor; attribute float pSize; uniform float scale; varying vec4 vC;
        void main(){ vC = pColor; vec4 p = modelViewMatrix * vec4(position, 1.0); gl_PointSize = min(512.0, pSize * scale / max(0.1, -p.z)); gl_Position = projectionMatrix * p; }`,fragmentShader:`uniform sampler2D map; varying vec4 vC;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vC.a; if (a < 0.004) discard; gl_FragColor = vec4(vC.rgb, a); }`});this.points=new cs(s,r),this.points.frustumCulled=!1,this.points.renderOrder=8,t.add(this.points)}add(t){this.items.length>=this.max&&this.items.shift(),this.items.push(t)}clear(){this.items.length=0}update(t){let e=0,i=this.items;for(let r=0;r<i.length;r++){let a=i[r];if(a.t+=t,a.t>=a.life)continue;a.vy-=a.g*t;let o=Math.max(0,1-a.drag*t);a.vx*=o,a.vy*=o,a.vz*=o,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,a.floor!==void 0&&a.y<a.floor&&(a.y=a.floor,a.vy=Math.abs(a.vy)*.4);let l=a.t/a.life,c=a.c0,h=a.c1?l:0,u=(l<.1?l/.1:1)*(1-l)**a.fade*a.a,d=e*3,f=e*4;this.pos[d]=a.x,this.pos[d+1]=a.y,this.pos[d+2]=a.z,a.c1?(this.col[f]=c[0]+(a.c1[0]-c[0])*h,this.col[f+1]=c[1]+(a.c1[1]-c[1])*h,this.col[f+2]=c[2]+(a.c1[2]-c[2])*h):(this.col[f]=c[0],this.col[f+1]=c[1],this.col[f+2]=c[2]),this.col[f+3]=u,this.size[e]=a.s0+(a.s1-a.s0)*l,i[e++]=a}if(i.length=e,e===0&&this.lastW===0)return;this.lastW=e;let s=this.points.geometry;s.setDrawRange(0,e);for(let[r,a]of[[s.attributes.position,3],[s.attributes.pColor,4],[s.attributes.pSize,1]])r.clearUpdateRanges(),r.addUpdateRange(0,e*a),r.needsUpdate=!0}},su=(n,t=1)=>{let e=new at(n);return[e.r*t,e.g*t,e.b*t]};function ru(){return new pe({transparent:!0,depthWrite:!1,fog:!1,uniforms:{t:{value:0},heat:{value:1},fade:{value:1}},vertexShader:`
      uniform float t; varying vec3 vN, vV; varying float vD;
      float n3(vec3 p){ return sin(p.x*3.1+t*1.7)*sin(p.y*3.7-t*2.3)*sin(p.z*3.3+t*1.3); }
      void main(){
        float d = n3(position*1.3) + 0.5*n3(position*3.1+4.0);
        vD = d;
        vec3 q = position + normal * d * 0.13;
        vec4 p = modelViewMatrix * vec4(q, 1.0);
        vN = normalMatrix * normal; vV = -p.xyz;
        gl_Position = projectionMatrix * p;
      }`,fragmentShader:`
      uniform float heat, fade; varying vec3 vN, vV; varying float vD;
      void main(){
        float f = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
        float h = clamp(f * 0.9 + vD * 0.32, 0.0, 1.0) * heat;
        vec3 smoke = vec3(0.12, 0.07, 0.05);
        vec3 fire = vec3(2.6, 0.75, 0.12);
        vec3 core = vec3(4.2, 3.2, 1.7);
        vec3 c = mix(smoke, fire, smoothstep(0.08, 0.5, h));
        c = mix(c, core, smoothstep(0.55, 0.95, h));
        gl_FragColor = vec4(c, fade * smoothstep(0.0, 0.25, f + 0.1));
      }`})}var dc=class{constructor(t){this.scene=t,this.items=[],this.warnings=[],this.bouncers=[],this.planes=[],this.map=null,this.camera=null,this.soft=new uc(t,900,!1),this.glow=new uc(t,1400,!0),this.lights=[];for(let e=0;e<3;e++){let i=new ps(16777215,0,10,1.6);i.userData.t=0,i.userData.max=1,i.userData.peak=0,t.add(i),this.lights.push(i)}}setPointScale(t){this.soft.points.material.uniforms.scale.value=t,this.glow.points.material.uniforms.scale.value=t}add(t,e,i){return this.scene.add(t),this.items.push({obj:t,life:e,max:e,update:i}),t}burst(t,{n:e=8,speed:i=4,up:s=0,color:r=16777215,color2:a=null,size:o=.2,size2:l=null,life:c=.5,g:h=0,drag:u=1,additive:d=!0,spread:f=.1,alpha:p=1,fade:v=1,hdr:g=1,dir:m=null,floor:x}={}){let M=d?this.glow:this.soft,_=su(r,g),T=a!==null?su(a,g):null;for(let S=0;S<e;S++){let y=si(2),w=si(2),C=si(2),R=Math.hypot(y,w,C)||1,D=i*(.35+Math.random()*.65);y=y/R*D,w=w/R*D+s,C=C/R*D,m&&(y=y*.35+m[0]*i,w=w*.35+m[1]*i,C=C*.35+m[2]*i),M.add({x:t[0]+si(f),y:t[1]+si(f),z:t[2]+si(f),vx:y,vy:w,vz:C,g:h,drag:u,t:0,life:c*(.6+Math.random()*.6),c0:_,c1:T,a:p,fade:v,s0:o*(.7+Math.random()*.6),s1:l??o*.3,floor:x})}}flash(t,e=16777215,i=30,s=12,r=.1){let a=this.lights[0];for(let o of this.lights)o.userData.peak*(o.userData.t/o.userData.max)<a.userData.peak*(a.userData.t/a.userData.max)&&(a=o);a.position.set(t[0],t[1],t[2]),a.color.setHex(e),a.distance=s,a.userData.t=r,a.userData.max=r,a.userData.peak=i,a.intensity=i}text(t,e,{color:i="#fff",scale:s=1,life:r=.9,rise:a=1.8,spin:o=0,jitter:l=.4,depthTest:c=!1,stroke:h="#000"}={}){let u=this.camera?.position;if(u&&Math.hypot(u.x-t[0],u.y-t[1],u.z-t[2])<3.2)return null;let d=Xs(e,{color:i,stroke:h}),f=new Re({map:d,transparent:!0,depthTest:c,depthWrite:!1,fog:!1}),p=new Le(f);p.position.set(t[0]+si(l),t[1]+si(l),t[2]+si(l));let v=d.userData.aspect;p.scale.set(v*s,s,1),p.renderOrder=10;let g=Math.random()*.6+.7,m=si(.25);return f.rotation=m,this.add(p,r,(x,M)=>{let _=x.max-x.life,T=x.life/x.max;p.position.y+=a*g*M*(.4+T),f.opacity=Math.min(1,T*2.6),f.rotation+=o*M;let S=_<.14?.3+sp(_/.14)*.85:1.15-Math.min(.15,(_-.14)*.6);p.scale.set(v*s*S,s*S,1)})}tracer(t,e,i=16772710,s=.035,r=.09){let o=new N(e[0]-t[0],e[1]-t[1],e[2]-t[2]).length();if(o<.1)return;let l=new Vt({color:new at(i).multiplyScalar(3.2),transparent:!0,depthWrite:!1,fog:!1}),c=new Ct(np,l);c.scale.set(s,s,o),c.position.set((t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2),c.lookAt(e[0],e[1],e[2]),this.add(c,r,h=>{let u=h.life/h.max;l.opacity=u,c.scale.x=c.scale.y=s*u}).userData.dispose=()=>{l.dispose()}}impact(t,e=16772710,i=7){this.burst(t,{n:i,speed:5.5,color:e,size:.16,life:.3,g:14,drag:2,hdr:2.6}),this.burst(t,{n:1,speed:0,color:e,size:.75,size2:.2,life:.1,hdr:2.2,spread:0})}cloud(t,e=3,i=8965154){this.burst(t,{n:e,speed:1.1,up:.55,color:i,color2:4876820,size:.55,size2:1.5,life:.75,drag:2.2,additive:!1,spread:.45,alpha:.62}),e>1&&this.burst(t,{n:Math.ceil(e/2),speed:.8,up:.5,color:i,size:.2,life:.55,hdr:1.2,spread:.4,alpha:.5})}dust(t,e=6,i=14207160){for(let s=0;s<e;s++){let r=s/e*Math.PI*2+Math.random();this.soft.add({x:t[0]+Math.cos(r)*.3,y:t[1]+.08,z:t[2]+Math.sin(r)*.3,vx:Math.cos(r)*3,vy:.55,vz:Math.sin(r)*3,g:0,drag:4.5,t:0,life:.5,a:.42,fade:1,c0:su(i),c1:null,s0:.3,s1:.95})}}poof(t){this.burst(t,{n:12,speed:3,up:.8,color:16777215,color2:8939178,size:.5,size2:1.3,life:.6,drag:3.5,additive:!1,spread:.5,alpha:.7}),this.burst(t,{n:10,speed:5,color:16765471,size:.13,life:.45,g:7,hdr:2.2})}pillar(t,e=16765471,i=9,s=.6){let r=new ee(.75,.95,i,18,1,!0).translate(0,i/2,0),a=new pe({transparent:!0,depthWrite:!1,side:De,blending:_e,uniforms:{c:{value:new at(e).multiplyScalar(2.2)},f:{value:1}},vertexShader:"varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 c; uniform float f; varying vec2 vU; void main(){ gl_FragColor = vec4(c, (1.0 - vU.y) * (1.0 - vU.y) * f * 0.42); }"}),o=new Ct(r,a);o.position.set(t[0],t[1],t[2]),this.add(o,s,l=>{let c=1-l.life/l.max;a.uniforms.f.value=(1-c)**1.6,o.scale.set(.45+c*1.1,.5+sp(Math.min(1,c*2.2))*.5,.45+c*1.1)}).userData.dispose=()=>{r.dispose(),a.dispose()},this.burst([t[0],t[1]+.2,t[2]],{n:16,speed:2,up:6,color:e,size:.16,life:.9,drag:1.2,spread:1.1,hdr:2.2})}eyeball(t,e){let i=new xe;i.add(new Ct(Ov,zv));let s=new Ct(Bv,Hv);s.position.z=-.12;let r=new Ct(kv,Gv);if(r.position.z=-.17,i.add(s,r),i.position.set(t.x,t.y,t.z),i.scale.setScalar(1.8),i.traverse(a=>{a.isMesh&&(a.castShadow=!0)}),this.scene.add(i),this.bouncers.push({g:i,v:e.clone(),spin:new N(si(14),si(14),si(14)),life:5,floor:Math.max(-24,In(this.map,t.x,t.z,t.y+.5))}),this.bouncers.length>12){let a=this.bouncers.shift();this.scene.remove(a.g)}}warning(t,e,i,s="\u{1F9B4}",r=1){let a=new va(e*.93,e,48).rotateX(-Math.PI/2),o=new Vt({color:new at(2.4,.25,.1),transparent:!0,opacity:.8,depthWrite:!1,side:De,fog:!1}),l=new Ct(a,o);l.position.set(t[0],t[1]+.06,t[2]);let c=new fi(e,40).rotateX(-Math.PI/2),h=new Vt({color:16720384,transparent:!0,opacity:.1,depthWrite:!1,fog:!1}),u=new Ct(c,h);u.position.set(0,-.02,0),l.add(u);let d=i/1e3;this.add(l,d,m=>{let x=1-m.life/m.max;u.scale.setScalar(Math.max(.01,x)),h.opacity=.14+x*.32,o.opacity=.55+Math.sin(x*x*90)*.4}).userData.dispose=()=>{a.dispose(),o.dispose(),c.dispose(),h.dispose()};let f=Xs(s,{stroke:null,size:96,font:'"Segoe UI Emoji", sans-serif'}),p=new Re({map:f,transparent:!0,depthWrite:!1}),v=new Le(p);v.scale.set(1.4*r,r,1);let g=0;this.add(v,d,(m,x)=>{let M=1-m.life/m.max;v.position.set(t[0],t[1]+(1-M*M)*34,t[2]),p.rotation+=x*6,g+=x,g>.05&&(g=0,this.burst([v.position.x,v.position.y+.3,v.position.z],{n:1,speed:.3,color:16777215,color2:7829367,size:.5,size2:1,life:.5,additive:!1,alpha:.4}))})}explosion(t){let e=[t[0],t[1]+1,t[2]];this.text(e,"BOOM",{color:"#ffdd00",scale:2.4,life:.7,stroke:"#ff0000"}),this.flash(e,16751168,180,26,.32);let i=new kt(1,28,20),s=ru(),r=new Ct(i,s);r.position.set(...e),this.add(r,.55,(a,o)=>{let l=1-a.life/a.max;s.uniforms.t.value+=o*3,s.uniforms.heat.value=1.05-l*.8,s.uniforms.fade.value=Math.min(1,(1-l)*2.4),r.scale.setScalar(.6+(1-(1-l)**3)*3.6)}).userData.dispose=()=>{i.dispose(),s.dispose()},this.burst(e,{n:26,speed:15,color:16756800,color2:16723968,size:.2,size2:.05,life:.65,g:15,drag:1.3,hdr:2.8}),this.burst(e,{n:12,speed:3.5,up:1.6,color:4864560,color2:1840658,size:1.3,size2:3.4,life:1.5,drag:2,additive:!1,spread:1.2,alpha:.75}),this.scorch(t,3.6),this.ring(t,11,16752688)}scorch(t,e){let i=new fi(e,24).rotateX(-Math.PI/2),s=new Vt({map:Vi(),color:328450,transparent:!0,opacity:.8,depthWrite:!1}),r=new Ct(i,s);r.position.set(t[0],t[1]+.035,t[2]),this.add(r,7,a=>{s.opacity=Math.min(.8,a.life*.5)}).userData.dispose=()=>{i.dispose(),s.dispose()}}ring(t,e,i=16761395){let s=new Be(1,.075,6,48).rotateX(Math.PI/2),r=new Vt({color:new at(i).multiplyScalar(2.6),transparent:!0,depthWrite:!1,fog:!1}),a=new Ct(s,r);a.position.set(t[0],t[1]+.4,t[2]),this.add(a,.42,o=>{let l=1-o.life/o.max,c=1-(1-l)**2.4;a.scale.set(.5+c*e,1+l*2,.5+c*e),r.opacity=(1-l)**1.4}).userData.dispose=()=>{s.dispose(),r.dispose()}}fallout(t,e,i){let s=new fi(e,40).rotateX(-Math.PI/2),r=new Vt({map:Vi(),color:new at(.5,2.4,.2),transparent:!0,opacity:.6,depthWrite:!1,blending:_e,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),a=new Ct(s,r);a.position.set(t[0],t[1]+.05,t[2]);let o=0;this.add(a,i/1e3,(l,c)=>{if(r.opacity=Math.min(.6,l.life*.6)*(.8+Math.sin(l.life*7)*.2),o+=c,o>.05){o=0;let h=Math.random()*6.283,u=Math.sqrt(Math.random())*e;this.burst([t[0]+Math.cos(h)*u,t[1]+.2,t[2]+Math.sin(h)*u],{n:1,speed:.3,up:2.6,color:8388432,size:.26,life:1.3,hdr:2.2,drag:.5,spread:0})}}).userData.dispose=()=>{s.dispose(),r.dispose()}}geyser(t,e){this.pillar(t,4306687,22,.9),this.ring(t,e,9428223),this.flash([t[0],t[1]+3,t[2]],4306687,60,24,.5),this.burst([t[0],t[1]+.5,t[2]],{n:70,speed:5,up:17,color:9428223,color2:2788607,size:.3,size2:.12,life:1.5,g:21,drag:.2,hdr:2,spread:1.6}),this.burst([t[0],t[1]+.3,t[2]],{n:20,speed:12,up:2,color:16777215,color2:9428223,size:.8,size2:1.8,life:.8,drag:3,additive:!1,spread:1,alpha:.5})}punch(t,e=1){let i=[t[0],t[1]+1.1,t[2]];this.flash(i,16765471,50+e*20,16,.2),this.ring(t,5+e*2.5,e>=3?16728128:16765471),this.burst(i,{n:18+e*8,speed:10+e*2,color:16765471,color2:2777343,size:.24,life:.5,g:8,drag:1.3,hdr:2.5})}tap(t){this.burst(t,{n:5,speed:2.5,up:.8,color:16767392,size:.08,life:.3,g:7,hdr:1.6,spread:.05})}prewarm(t,e){let i=new xe,s=o=>{let l=new Ct(np,o);return i.add(l),o},r=[s(ru()),s(new Vt({transparent:!0,depthWrite:!1,fog:!1})),s(new Vt({transparent:!0,depthWrite:!1,blending:_e,side:De}))],a=new Le(new Re({transparent:!0,depthWrite:!1}));i.add(a),this.scene.add(i),t.compile(this.scene,e),this.scene.remove(i);for(let o of r)o.dispose();a.material.dispose()}slash(t,e=16731501){let i=document.createElement("canvas");i.width=i.height=64;let s=i.getContext("2d");s.strokeStyle="#fff",s.lineCap="round";for(let l=0;l<3;l++)s.lineWidth=5,s.beginPath(),s.moveTo(10+l*17,6),s.quadraticCurveTo(14+l*15,32,4+l*17,58),s.stroke();let r=new ke(i),a=new Re({map:r,color:new at(e).multiplyScalar(2.4),transparent:!0,depthWrite:!1,depthTest:!1,rotation:si(1.6),fog:!1}),o=new Le(a);o.position.set(t[0]+si(.7),t[1]+si(.7),t[2]+si(.7)),this.add(o,.22,l=>{let c=1-l.life/l.max;a.opacity=1-c,o.scale.setScalar(1.1+c*.9)}).userData.dispose=()=>{r.dispose(),a.dispose()}}mushroom(t,e){let[i,s,r]=t,a=new xe;a.position.set(i,s,r);let o=new kt(1,32,22),l=ru(),c=new ee(.55,1,1,22,10,!0).translate(0,.5,0),h=new Ct(c,l);a.add(h);let u=[];for(let m=0;m<13;m++){let x=m/13*Math.PI*2,M=new Ct(o,l);M.userData={a:x,r:.72+m%2*.28,h:m%3*.14},a.add(M),u.push(M)}let d=new Ct(o,l);a.add(d);let f=new Vt({color:new at(2.2,2.2,2.2),transparent:!0,fog:!1,depthWrite:!1}),p=new Ct(new Be(1,.007,6,64).rotateX(Math.PI/2),f);p.position.y=.4,a.add(p);let v=new Ct(o,new Vt({color:new at(6,6,5),transparent:!0,fog:!1,depthWrite:!1}));a.add(v);let g=0;this.flash([i,s+8,r],16773312,900,e*3.5,1.8),this.add(a,8,(m,x)=>{let M=m.max-m.life,_=Math.min(1,M/3.2),T=e*1.7*(1-(1-_)**2),S=e*.62*(.3+.7*_);h.scale.set(S*.42,T,S*.42),d.position.y=T,d.scale.set(S*.8,S*.55,S*.8);for(let y of u){let{a:w,r:C,h:R}=y.userData,D=w+M*.25;y.position.set(Math.cos(D)*S*C,T+S*R,Math.sin(D)*S*C),y.scale.set(S*.5,S*.42,S*.5)}if(l.uniforms.t.value+=x*.9,l.uniforms.heat.value=Math.max(.34,.92-M*.14),l.uniforms.fade.value=Math.min(1,m.life/2),p.scale.setScalar(1+M*e*1.7),f.opacity=Math.max(0,1-M/1.1),v.scale.setScalar(e*Math.min(1,M*7)),v.material.opacity=Math.max(0,1-M/.6),g+=x,g>.05&&m.life>2){g=0;let y=Math.random()*6.28,w=S*(.3+Math.random());this.burst([i+Math.cos(y)*w,s+T*Math.random(),r+Math.sin(y)*w],{n:2,speed:3,up:4,color:16752704,size:.45,life:1.4,hdr:2.6,drag:.6})}}).userData.dispose=()=>{o.dispose(),c.dispose(),p.geometry.dispose();for(let m of[l,f,v.material])m.dispose()},this.burst([i,s+.5,r],{n:44,speed:22,up:1,color:9205344,color2:3484194,size:3,size2:6,life:2,drag:1.6,additive:!1,spread:4,alpha:.4})}dogPlane(t=1,e=26){let i=new xe,s=new mn({color:10134706}),r=new Ct(new ee(.9,.5,8,14).rotateX(Math.PI/2),s),a=new Ct(new qt(11,.2,1.8),s),o=new Ct(new qt(.2,2,1.3),s);o.position.set(0,1.1,3.4);let l=new Ct(new kt(.55,10,8),new Vt({color:new at(3.4,1.7,.5),fog:!1}));l.position.z=4.1,i.add(r,a,o,l);for(let f of[r,a,o])f.castShadow=!0;let c=Xs("\u{1F436}",{stroke:null,size:128,font:'"Segoe UI Emoji", sans-serif'}),h=new Le(new Re({map:c,transparent:!0}));h.scale.set(c.userData.aspect*3.6,3.6,1),h.position.set(0,.8,-4.6),i.add(h);let u=si(20);i.rotation.y=t>0?0:Math.PI;let d=0;this.add(i,3.4,(f,p)=>{let v=1-f.life/f.max;if(i.position.set(u,e+Math.sin(v*15)*.7,t*(70-v*140)),i.rotation.z=Math.sin(v*11)*.3,d+=p,d>.03){d=0;let g=t*4.2;for(let m of[-5,5])this.burst([u+m,i.position.y,i.position.z+g],{n:1,speed:.1,color:16777215,size:.4,size2:1.2,life:.9,additive:!1,alpha:.5})}})}update(t){for(let e=this.items.length-1;e>=0;e--){let i=this.items[e];i.life-=t,i.life<=0?(this.scene.remove(i.obj),i.obj.userData.dispose?.(),i.obj.material&&!i.obj.userData.dispose&&i.obj.material.dispose(),this.items.splice(e,1)):i.update?.(i,t)}for(let e=this.bouncers.length-1;e>=0;e--){let i=this.bouncers[e];i.life-=t,i.v.y-=22*t,i.g.position.addScaledVector(i.v,t),i.g.rotation.x+=i.spin.x*t,i.g.rotation.y+=i.spin.y*t,i.g.position.y<i.floor+.3&&(i.v.y<-3&&this.dust([i.g.position.x,i.floor,i.g.position.z],2),i.g.position.y=i.floor+.3,i.v.y=Math.abs(i.v.y)*.62,i.v.x*=.72,i.v.z*=.72,i.spin.multiplyScalar(.7)),i.life<=0&&(this.scene.remove(i.g),this.bouncers.splice(e,1))}for(let e of this.lights)e.userData.t>0?(e.userData.t-=t,e.intensity=Math.max(0,e.userData.peak*(e.userData.t/e.userData.max))):e.intensity=0;this.soft.update(t),this.glow.update(t)}clear(){for(let t of this.items)this.scene.remove(t.obj),t.obj.userData.dispose?.();for(let t of this.bouncers)this.scene.remove(t.g);this.items=[],this.bouncers=[],this.soft.clear(),this.glow.clear();for(let t of this.lights)t.userData.t=0,t.intensity=0}};function si(n){return(Math.random()-.5)*n}var Ur={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Ii=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Vv=new Us(-1,1,1,-1,0,1),au=class extends we{constructor(){super(),this.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Kt([0,2,0,0,2,0],2))}},Wv=new au,_s=class{constructor(t){this._mesh=new Ct(Wv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Vv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Fr=class extends Ii{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof pe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Vs.clone(t.uniforms),this.material=new pe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new _s(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Ga=class extends Ii{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},fc=class extends Ii{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var pc=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new bt);this._width=i.width,this._height=i.height,e=new Oe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Xe}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fr(Ur),this.copyPass.material.blending=Vn,this.timer=new Sa}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ga!==void 0&&(a instanceof Ga?i=!0:a instanceof fc&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new bt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var mc=class extends Ii{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new at}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var rp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new at(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Or=class n extends Ii{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new bt(t.x,t.y):new bt(256,256),this.clearColor=new at(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Oe(r,a,{type:Xe,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let u=new Oe(r,a,{type:Xe,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);let d=new Oe(r,a,{type:Xe,depthBuffer:!1});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}let o=rp;this.highPassUniforms=Vs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new pe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new bt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Vs.clone(Ur.uniforms),this.blendMaterial=new pe({uniforms:this.copyUniforms,vertexShader:Ur.vertexShader,fragmentShader:Ur.fragmentShader,premultipliedAlpha:!0,blending:_e,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new at,this._oldClearAlpha=1,this._basic=new Vt,this._fsQuad=new _s(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new bt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],l=a+1<t?e[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new pe({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new bt(.5,.5)},direction:{value:new bt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new pe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Or.BlurDirectionX=new bt(1,0);Or.BlurDirectionY=new bt(0,1);var op={uniforms:{tDiffuse:{value:null},ab:{value:0},vig:{value:.32},tint:{value:new at(0,0,0)},exposure:{value:1},time:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float ab, vig, exposure, time; uniform vec3 tint;
    varying vec2 vUv;
    vec3 neutral(vec3 c) {
      const float s = 0.76; const float desat = 0.15;
      float x = min(c.r, min(c.g, c.b));
      float off = x < 0.08 ? x - 6.25 * x * x : 0.04;
      c -= off;
      float peak = max(c.r, max(c.g, c.b));
      if (peak < s) return c;
      float d = 1.0 - s;
      float np = 1.0 - d * d / (peak + d - s);
      c *= np / peak;
      float g = 1.0 - 1.0 / (desat * (peak - np) + 1.0);
      return mix(c, vec3(np), g);
    }
    vec3 srgb(vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(0.41666)) - 0.055, step(0.0031308, c)); }
    void main() {
      vec2 d = vUv - 0.5;
      float r2 = dot(d, d);
      vec3 c;
      if (ab > 0.001) {
        vec2 o = d * r2 * ab * 0.045;
        c = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
      } else c = texture2D(tDiffuse, vUv).rgb;
      c = neutral(c * exposure + tint);
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, 1.12);
      c *= 1.0 - vig * smoothstep(0.12, 0.62, r2 * 1.6);
      c = srgb(clamp(c, 0.0, 1.0));
      float n = fract(sin(dot(gl_FragCoord.xy + time, vec2(12.9898, 78.233))) * 43758.5453);
      gl_FragColor = vec4(c + (n - 0.5) / 255.0, 1.0);
    }`},ou=class extends Ii{constructor(t,e){super(),this.scene=t,this.camera=e,this.needsSwap=!0,this.rt=new Oe(1,1,{type:Xe,samples:4}),this.mat=new pe({uniforms:{tDiffuse:{value:null},tVm:{value:this.rt.texture}},vertexShader:op.vertexShader,fragmentShader:`uniform sampler2D tDiffuse, tVm; varying vec2 vUv;
        void main(){ vec4 v = texture2D(tVm, vUv); gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb * (1.0 - clamp(v.a, 0.0, 1.0)) + v.rgb, 1.0); }`,depthTest:!1,depthWrite:!1}),this.quad=new _s(this.mat)}setSize(t,e){this.rt.setSize(t,e)}render(t,e,i){let s=t.getClearColor(new at),r=t.getClearAlpha();t.setRenderTarget(this.rt),t.setClearColor(0,0),t.clear(),t.render(this.scene,this.camera),t.setClearColor(s,r),this.mat.uniforms.tDiffuse.value=i.texture,t.setRenderTarget(this.renderToScreen?null:e),this.quad.render(t)}},Va=[{pixel:1.5,bloom:!0,shadow:2048,outline:!0},{pixel:1,bloom:!0,shadow:1024,outline:!0},{pixel:1,bloom:!1,shadow:0,outline:!1},{pixel:.75,bloom:!1,shadow:0,outline:!1}],gc=class{constructor(t,e,i,s,r,a){this.renderer=t,this.scene=e,this.camera=i,this.vmScene=s,this.vmCam=r,this.onTier=a,this.hitAb=0,this.tint=new at(0,0,0),this.frameMs=16,this.watchT=0,this.fastT=0,this.dropped=!1;let o=new URLSearchParams(location.search).get("gfx");this.locked=o!==null;let l=0;try{l=Number(localStorage.getItem("aura-gfx"))||0}catch{}this.tier=-1,this.setTier(this.locked?ap(Number(o)):ap(l))}buildComposer(){let t=new Oe(1,1,{type:Xe,samples:4}),e=new pc(this.renderer,t);e.addPass(new mc(this.scene,this.camera)),this.vmPass=new ou(this.vmScene,this.vmCam),e.addPass(this.vmPass),this.bloom=new Or(new bt(256,256),.32,.5,1.12),e.addPass(this.bloom),this.finalPass=new Fr(op),e.addPass(this.finalPass),this.composer=e}setTier(t){if(t===this.tier)return;this.tier=t;let e=Va[t],i=this.renderer;if(i.setPixelRatio(Math.min(window.devicePixelRatio||1,e.pixel)),e.bloom){this.composer||this.buildComposer(),i.toneMapping=Hi;let s=t===0?4:2;for(let r of[this.composer.renderTarget1,this.composer.renderTarget2,this.vmPass.rt])r.samples!==s&&(r.samples=s,r.dispose())}else i.toneMapping=Os;this.onTier?.(e,t),this.resize()}resize(){let t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.composer&&(this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(t,e))}hit(t){this.hitAb=Math.min(1.6,Math.max(this.hitAb,t))}watch(t){if(!(this.locked||document.hidden||t>.25)){if(this.frameMs+=(t*1e3-this.frameMs)*.05,this.watchT+=t,this.watchT>3&&this.frameMs>27&&this.tier<Va.length-1){this.watchT=0,this.frameMs=16,this.fastT=0,this.dropped=!0,this.setTier(this.tier+1);try{localStorage.setItem("aura-gfx",String(this.tier))}catch{}return}if(this.fastT=this.frameMs<12?this.fastT+t:0,this.fastT>20&&!this.dropped&&this.tier>0){this.fastT=0,this.setTier(this.tier-1);try{localStorage.setItem("aura-gfx",String(this.tier))}catch{}}}}prewarm(t){let e=this.renderer;Va[this.tier].bloom&&e.setRenderTarget(this.composer.renderTarget1),t.prewarm(e,this.camera),e.setRenderTarget(null)}render(t,e){if(this.hitAb=Math.max(0,this.hitAb-t*2.6),Va[this.tier].bloom){let s=this.finalPass.uniforms;s.ab.value=this.hitAb,s.time.value=(s.time.value+t*60)%1e3,s.tint.value.copy(this.tint),this.vmPass.enabled=e,this.composer.render(t);return}let i=this.renderer;i.setRenderTarget(null),i.clear(),i.render(this.scene,this.camera),e&&(i.clearDepth(),i.render(this.vmScene,this.vmCam))}};function ap(n){return Number.isFinite(n)?Math.max(0,Math.min(Va.length-1,Math.round(n))):0}var Wa={ohio:{sunDir:[-.55,.42,-.72],sunColor:16756944,hemiMul:.82,sunMul:1.35,rim:16736192,rimK:.55,neon:{wall:16722554,plat:1696744,bridge:5111658,step:10514687},stars:!0,sunDisc:16752736,motes:16748768},roof:{sunDir:[.7,.34,-.62],sunColor:16763024,hemiMul:.8,sunMul:1.5,rim:16751184,rimK:.55,neon:{plat:16752704},sunDisc:16756832,clouds:16758944,motes:16765072},office:{sunDir:[.2,1,.3],sunColor:16774852,hemiMul:.72,sunMul:1,rim:16773280,rimK:.28,noCast:["plat"],lampCones:!0,flicker:!0,motes:15655056},boat:{sunDir:[.5,.62,.6],sunColor:16773328,hemiMul:.8,sunMul:1.45,rim:12577023,rimK:.4,sunDisc:16773296,clouds:16777215,ocean:1933224,motes:16777215},restroom:{sunDir:[-.3,1,.42],sunColor:16777215,hemiMul:.66,sunMul:1.1,rim:10477823,rimK:.4,tubes:!0,bubbles:!0,motes:12577535},arena:{sunDir:[-.55,.62,.5],sunColor:16769712,hemiMul:.78,sunMul:1.55,rim:16760944,rimK:.45,sunDisc:16773312,clouds:16772824,torches:!0,motes:15256720}};function Xv(n,t){let e=new Map;for(let i of n){let s=t[i.kind];if(s===void 0||i.floor)continue;let[r,a,o]=i.min,[l,c,h]=i.max,u=l-r,d=h-o;if(Math.max(u,d)<2.5)continue;let f=.05,p=c+.005,v=e.get(s)??[];v.push([u,f,f,(r+l)/2,p,o],[u,f,f,(r+l)/2,p,h],[f,f,d,r,p,(o+h)/2],[f,f,d,l,p,(o+h)/2]),e.set(s,v)}return e}function Xa(n){let t=[],e=[],i=[],s=[],r=[],a=0;for(let l of n){let c=l.attributes.position,h=l.attributes.normal,u=l.attributes.uv,d=l.attributes.color;for(let p=0;p<c.count;p++)t.push(c.getX(p),c.getY(p),c.getZ(p)),e.push(h.getX(p),h.getY(p),h.getZ(p)),i.push(u.getX(p),u.getY(p)),d?s.push(d.getX(p),d.getY(p),d.getZ(p)):s.push(1,1,1);let f=l.index;for(let p=0;p<f.count;p++)r.push(f.getX(p)+a);a+=c.count,l.dispose()}let o=new we;return o.setAttribute("position",new Kt(t,3)),o.setAttribute("normal",new Kt(e,3)),o.setAttribute("uv",new Kt(i,2)),o.setAttribute("color",new Kt(s,3)),o.setIndex(r),o}function qv(n,t){let e=n.boxes.filter(u=>u.floor&&Math.abs(u.max[1])<.01);if(!e.length)return null;let i=n.bounds+1,s=1024,r=document.createElement("canvas");r.width=r.height=s;let a=r.getContext("2d"),o=s/(i*2),l=u=>(u+i)*o;a.save(),a.beginPath();for(let u of e)a.rect(l(u.min[0]),l(u.min[2]),(u.max[0]-u.min[0])*o,(u.max[2]-u.min[2])*o);a.clip(),a.shadowColor="rgba(0,0,0,1)",a.shadowBlur=34,a.fillStyle="rgba(0,0,0,.72)";for(let u of n.boxes)u.floor||u.min[1]>.6||u.max[1]<.05||a.fillRect(l(u.min[0])-2,l(u.min[2])-2,(u.max[0]-u.min[0])*o+4,(u.max[2]-u.min[2])*o+4);a.restore();let c=t(new ke(r));c.anisotropy=4;let h=new Ct(new bi(i*2,i*2).rotateX(-Math.PI/2),new Vt({map:c,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return h.position.y=.012,h.renderOrder=-1,h}function lp(n,t,e,i,s,r=.5){let a=new Ct(new fi(i,28).rotateX(-Math.PI/2),new Vt({map:Vi(),color:s,transparent:!0,opacity:r,depthWrite:!1,blending:_e,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}));return a.position.set(n,t+.02,e),a}function cp(n,t){return new pe({transparent:!0,depthWrite:!1,side:De,blending:_e,uniforms:{c:{value:new at(n)},o:{value:t}},vertexShader:"varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 c; uniform float o; varying vec2 vU; void main(){ gl_FragColor = vec4(c, vU.y * vU.y * o); }"})}function Yv(n,t,e,i){let s=new Re({map:ka(),color:new at(3.2,1.5,.35),transparent:!0,depthWrite:!1,blending:_e}),r=new Le(s);return r.position.set(t,e,i),r.scale.setScalar(1.3),n.add(r),r}function hp(n,t,e,i){let s=Wa[t.id]??Wa.ohio,r=[],a=n.effects,o=qv(t,i);if(o&&e.add(o),s.neon)for(let[l,c]of Xv(t.boxes,s.neon)){let h=c.map(([d,f,p,v,g,m])=>new qt(d,f,p).translate(v,g,m)),u=new Ct(Xa(h),new Vt({color:new at(l).multiplyScalar(2.7)}));e.add(u)}if(s.sunDisc!==void 0){let l=s.sunDir,c=Math.hypot(...l),h=new Le(new Re({map:Vi(),color:new at(s.sunDisc).multiplyScalar(3.4),transparent:!0,depthWrite:!1,fog:!1,blending:_e}));h.scale.setScalar(150),h.position.set(l[0]/c*280,l[1]/c*280,l[2]/c*280),e.add(h);let u=new Le(new Re({map:Vi(),color:new at(5,4.6,3.8),transparent:!0,depthWrite:!1,fog:!1,blending:_e}));u.scale.setScalar(48),u.position.copy(h.position),e.add(u)}if(s.stars){let c=new Float32Array(1500);for(let d=0;d<500;d++){let f=Math.random()*6.283,p=.12+Math.random()*.88,v=Math.sqrt(1-p*p);c[d*3]=Math.cos(f)*v*280,c[d*3+1]=p*280,c[d*3+2]=Math.sin(f)*v*280}let h=new we;h.setAttribute("position",new Ve(c,3));let u=new cs(h,new Ls({color:new at(1.8,1.7,2),size:1.5,sizeAttenuation:!1,fog:!1,transparent:!0,depthWrite:!1}));e.add(u),r.push(d=>{u.rotation.y=d*.006})}if(s.clouds!==void 0){let l=[];for(let c=0;c<16;c++){let h=new Le(new Re({map:Vi(),color:s.clouds,transparent:!0,opacity:.34+Math.random()*.2,depthWrite:!1,fog:!1})),u=60+Math.random()*90;h.scale.set(u,u*.26,1),h.userData={a:Math.random()*6.283,r:170+Math.random()*90,y:55+Math.random()*70,v:.004+Math.random()*.006},e.add(h),l.push(h)}r.push(c=>{for(let h of l){let u=h.userData,d=u.a+c*u.v;h.position.set(Math.cos(d)*u.r,u.y,Math.sin(d)*u.r)}})}if(s.ocean!==void 0){let l=document.createElement("canvas");l.width=l.height=256;let c=l.getContext("2d");c.fillStyle="#1b6f96",c.fillRect(0,0,256,256);for(let f=0;f<70;f++){c.strokeStyle=f%3?"rgba(120,215,240,.5)":"rgba(255,255,255,.65)",c.lineWidth=1.5+Math.random()*2;let p=Math.random()*256,v=Math.random()*256,g=16+Math.random()*34;c.beginPath(),c.moveTo(p,v),c.quadraticCurveTo(p+g/2,v-5,p+g,v),c.stroke()}let h=i(new ke(l));h.colorSpace=be,h.wrapS=h.wrapT=dn,h.repeat.set(60,60),h.anisotropy=4;let u=new Ct(new bi(900,900).rotateX(-Math.PI/2),new Vt({map:h})),d=t.theme.seaY??-7;u.position.y=d,e.add(u),r.push(f=>{h.offset.set(f*.012,f*.02),u.position.y=d+Math.sin(f*.8)*.2})}if(s.lampCones){let l=t.decor.filter(f=>f.kind==="lamp"),c=cp(new at(1,.96,.62),.16),h=new ee(.95,2.6,4.9,16,1,!0),u=[];for(let f of l){let p=(f.min[0]+f.max[0])/2,v=(f.min[2]+f.max[2])/2,g=new Ct(h,c);g.position.set(p,2.5,v),g.scale.x=1.15,e.add(g),e.add(lp(p,0,v,4.2,16773792,.34)),u.push(g)}let d=n.lampMat;if(d){let f=3;r.push(p=>{p>f&&(f=p+2+Math.random()*5,d.color.setRGB(.3,.3,.26),c.uniforms.o.value=.03,setTimeout(()=>{d.color.setRGB(3,2.9,2.2),c.uniforms.o.value=.16},60+Math.random()*110))}),d.color.setRGB(3,2.9,2.2)}}if(s.tubes){let l=t.bounds-4,c=[];for(let h of[-l*.6,0,l*.6])for(let u of[-l*.55,l*.55])c.push(new qt(5,.1,.22).translate(h,12.4,u));e.add(new Ct(Xa(c),new Vt({color:new at(3.2,3.4,3.6)})))}if(s.torches){let l=t.bounds-1.4,c=[[l,l],[-l,l],[l,-l],[-l,-l],[0,l],[0,-l],[l,0],[-l,0]],h=new mn({color:3811868}),u=[];for(let[f,p]of c){let v=new Ct(new ee(.1,.16,5,8),h);v.position.set(f,2.5,p),v.castShadow=!0,e.add(v),u.push(Yv(e,f,5.5,p)),e.add(lp(f,0,p,5,16748608,.28))}let d=0;r.push((f,p)=>{d+=p;for(let[v,g]of u.entries())g.scale.setScalar(1.4+Math.sin(f*13+v)*.25),g.material.rotation=Math.sin(f*8+v)*.4;if(d>.13){d=0;let v=u[Math.floor(Math.random()*u.length)];a.burst([v.position.x,v.position.y,v.position.z],{n:2,speed:.5,up:2.2,color:16752704,size:.14,life:1,hdr:2.2,drag:.5})}})}if(t.theme.pit){let l=new Ct(new ee(9.2,6.8,15,28,1,!0).translate(0,-8.2,0),cp(new at(1.2,.3,.05),.6));e.add(l);let c=0;r.push((h,u)=>{c+=u,c>.09&&(c=0,a.burst([(Math.random()-.5)*11,-13,(Math.random()-.5)*11],{n:1,speed:.5,up:6,color:16740400,size:.22,life:2.2,hdr:2.4,drag:.2}))})}if(s.motes!==void 0){let h=new Float32Array(270),u=[];for(let v=0;v<90;v++)u.push([Math.random()*22*2,Math.random()*12,Math.random()*22*2,Math.random()*6.28]);let d=new we;d.setAttribute("position",new Ve(h,3).setUsage(zs));let f=new Ls({map:Vi(),color:new at(s.motes).multiplyScalar(1.5),size:.13,transparent:!0,opacity:.55,depthWrite:!1,blending:_e}),p=new cs(d,f);p.frustumCulled=!1,e.add(p),r.push(v=>{let g=n.camera.position;for(let m=0;m<90;m++){let x=u[m],M=(_,T)=>(_%T+T)%T;h[m*3]=g.x-22+M(x[0]+Math.sin(v*.3+x[3])*1.5-g.x,44),h[m*3+1]=g.y-3+M(x[1]+(s.bubbles?v*.8:Math.sin(v*.4+x[3])*.8)-g.y,12),h[m*3+2]=g.z-22+M(x[2]+Math.cos(v*.25+x[3])*1.5-g.z,44)}d.attributes.position.needsUpdate=!0})}return(l,c)=>{for(let h of r)h(l,c)}}var up=()=>Object.fromEntries(Object.values(He).map(n=>[n.id,n.mag])),Ms=(n,t,e)=>Math.max(t,Math.min(e,n)),Kv=(n,t,e)=>{let i=t-n;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return n+i*e};function Zv({base:n,line:t,label:e=null,checker:i=!1,windows:s=!1},r=512){let a=document.createElement("canvas");a.width=a.height=r;let o=a.getContext("2d");if(o.fillStyle=n,o.fillRect(0,0,r,r),s)for(let c=0;c<6;c++)for(let h=0;h<6;h++)o.fillStyle=(c*7+h*13)%5<2?t:"#15172b",o.fillRect(c*r/6+8,h*r/6+8,r/6-16,r/6-16);else if(i)o.fillStyle=t,o.fillRect(0,0,r/2,r/2),o.fillRect(r/2,r/2,r/2,r/2);else{o.strokeStyle=t,o.lineWidth=12,o.strokeRect(0,0,r,r),o.fillStyle=t;for(let c of[26,r-26])for(let h of[26,r-26])o.beginPath(),o.arc(c,h,7,0,7),o.fill()}o.strokeStyle="rgba(255,255,255,.14)",o.lineWidth=3,o.strokeRect(9,9,r-18,r-18);for(let c=0;c<420;c++){o.fillStyle=c%2?"rgba(0,0,0,.018)":"rgba(255,255,255,.014)";let h=1+Math.random()*40;o.beginPath(),o.arc(Math.random()*r,Math.random()*r,h,0,7),o.fill()}e&&(o.fillStyle="rgba(255,255,255,.2)",o.font=`900 ${r*.34}px Impact, sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(e,r*.25,r*.25),o.fillText(e,r*.75,r*.75));let l=new ke(a);return l.wrapS=l.wrapT=dn,l.anisotropy=8,l.colorSpace=be,l}function dp(n,t,e=!0){let i=n.max[0]-n.min[0],s=n.max[1]-n.min[1],r=n.max[2]-n.min[2],a=new qt(i,s,r),o=[[r,s],[r,s],[i,r],[i,r],[i,s],[i,s]],l=a.attributes.uv;for(let u=0;u<6;u++)for(let d=0;d<4;d++){let f=u*4+d;l.setXY(f,l.getX(f)*o[u][0]/t,l.getY(f)*o[u][1]/t)}let c=new Float32Array(l.count*3),h=a.attributes.position;for(let u=0;u<l.count;u++){let d=u<8||u>=16,f=h.getY(u)<0,p=e&&d&&f?Math.max(.5,.86-s*.03):1;c[u*3]=c[u*3+1]=c[u*3+2]=p}return a.setAttribute("color",new Ve(c,3)),a.translate(n.min[0]+i/2,n.min[1]+s/2,n.min[2]+r/2),a}function fp(n,t,e){let i=document.createElement("canvas");i.width=1024,i.height=512;let s=i.getContext("2d");s.fillStyle=t,s.fillRect(0,0,1024,512),s.strokeStyle=e,s.lineWidth=22,s.strokeRect(14,14,996,484),s.fillStyle=e,s.textAlign="center",s.textBaseline="middle";let r=n.length;n.forEach((o,l)=>{let c=300/r;s.font=`900 ${c}px Impact, "Malgun Gothic", "Segoe UI Emoji", sans-serif`;let h=s.measureText(o).width;h>900&&(c*=900/h,s.font=`900 ${c}px Impact, "Malgun Gothic", "Segoe UI Emoji", sans-serif`),s.fillText(o,512,256+(l-(r-1)/2)*(420/r))});let a=new ke(i);return a.colorSpace=be,a}var qs=(n,t,e,{size:i=.14,r:s=.9,up:r=3.2,hdr:a=2.3,life:o=.9}={})=>{let l=Math.random()*6.283,c=s*(.4+Math.random()*.6);n.burst([t.x+Math.cos(l)*c,t.y+.1+Math.random()*1.4,t.z+Math.sin(l)*c],{n:1,speed:.2,up:r,color:e,size:i,life:o,hdr:a,drag:.8,spread:0})},xc={farm:{color:16765471,emit:(n,t)=>qs(n,t,16765471,{size:.15})},sigma:{color:16762880,emit:(n,t)=>{qs(n,t,16762880),qs(n,t,16777215,{size:.08,up:5})}},minsu:{color:16719920,emit:(n,t,e)=>{for(let i of e.eyeWorldPositions())n.burst([i.x,i.y,i.z],{n:1,speed:.6,color:16719920,size:.32,size2:.05,life:.2,hdr:3})}},cat:{color:16740416,emit:(n,t)=>n.burst([t.x,t.y+1,t.z],{n:2,speed:2.6,color:16752736,size:.22,size2:.06,life:.4,additive:!1,alpha:.75,spread:.7})},cone:{color:8379482,emit:(n,t)=>qs(n,t,8388432,{up:2.4})},toilet:{color:4306687,emit:(n,t,e,i)=>{for(let s=0;s<3;s++){let r=i*9+s*6.283/3,a=1.2+(i*3+s)%3;n.burst([t.x+Math.cos(r)*a,t.y+.3,t.z+Math.sin(r)*a],{n:1,speed:.3,up:2.6,color:9428223,size:.18,life:.5,hdr:1.9,g:7,spread:0})}}},streamer:{color:16724804,emit:(n,t)=>qs(n,t,16724804,{size:.12,up:2.5})},tung:{color:16761395,emit:(n,t)=>{Math.random()<.5&&n.dust([t.x,t.y,t.z],2,13211484)}},hero:{color:15217708,emit:(n,t)=>{n.burst([t.x,t.y+1.1,t.z],{n:3,speed:.4,color:16734778,size:.55,size2:.06,life:.42,hdr:2.2,spread:.6}),n.burst([t.x,t.y+1.1,t.z],{n:2,speed:.4,color:16765471,size:.42,size2:.05,life:.5,hdr:2.6,spread:.8})}},rizz:{color:16736192,emit:(n,t)=>qs(n,t,16736192,{size:.18,up:2})},chill:{color:6342911,emit:(n,t)=>qs(n,t,6342911,{size:.12,up:.9,r:1.7,life:1.5})}},yc=class{constructor(t,e,i){this.canvas=t,this.sfx=e,this.hud=i,this.net=null,this.myId=null,this.mode="attract",this.renderer=new Lr({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.autoClear=!1,this.renderer.shadowMap.type=ul,this.scene=new as,this.scene.fog=new ha(4856685,45,150),this.hemi=new fs(16777215,3355443,2),this.sunLight=new ms(16777215,1.5),this.sunLight.position.set(20,40,12),this.sunLight.shadow.bias=-4e-4,this.sunLight.shadow.normalBias=.04,this.sunLight.shadow.radius=2.5,this.sunLight.shadow.autoUpdate=!1,this.shadowN=0,this.scene.add(this.hemi,this.sunLight,this.sunLight.target),this.auraLight=new ps(16765471,0,14,1.5),this.scene.add(this.auraLight),this.camera=new Ke(78,16/9,.08,500),this.camera.rotation.order="YXZ",this.scene.add(this.camera),this.effects=new dc(this.scene),this.effects.camera=this.camera,vn.fx={landDust:s=>this.effects.dust(s,5),poof:s=>this.effects.poof(s),tap:s=>this.effects.tap(s)},vn.cam=this.camera,this.buildViewmodels(),this.pipeline=new gc(this.renderer,this.scene,this.camera,this.vmScene,this.vmCam,s=>this.applyTier(s)),this.loadMap(er),this.chars=new Map,this.body=Yn(),this.yaw=0,this.pitch=0,this.keys=new Set,this.mouseDown=!1,this.zoom=!1,this.locked=!1,this.lastFrame=performance.now(),this.sendAcc=0,this.attractT=0,this.nextAttractPop=1,this.shake=0,this.buffers=new Map,this.resetMatchState(),this.bindInput(),this.resize(),window.addEventListener("resize",()=>this.resize()),this.renderer.setAnimationLoop(()=>this.frame())}applyTier(t){let e=this.renderer;e.shadowMap.enabled=t.shadow>0,this.sunLight.castShadow=t.shadow>0,t.shadow>0&&(this.sunLight.shadow.mapSize.set(t.shadow,t.shadow),this.sunLight.shadow.map?.dispose(),this.sunLight.shadow.map=null),tp(t.outline)}resetMatchState(){this.alive=!0,this.frozen=!0,this.me=null,this.weapon="fart",this.ammo=up(),this.cooldown=0,this.reloadT=0,this.slapCd=0,this.slapT=0,this.recoil=0,this.lastEmote=0,this.emote=0,this.ultra=!1,this.ultraKind=null,this.forced=!1,this.grabbedBy=null,this.musicHold=0,this.cineUntil=0,this.charmUntil=0,this.charmBy=null,this.slowUntil=0,this.cinePos=null,this.aura=0,this.hp=100,this.kills=0,this.scores=[],this.timeLeft=367*1e3,this.eventKind=null,this.stepAcc=0,this.deadCamT=0,this.lastMemeAt=0,this.killerId=null,this.buffers.clear(),this.jumpQueued=!1,this.dashQueued=!1,this.fovKick=0,this.spin=0,this.camRoll=0,this.landDip=0,this.landDipV=0,this.swayX=0,this.swayY=0,this.lastYaw=0,this.lastPitch=0,this.vmSwitch=0,this.vmFlash=0,this.fxAcc=0}reloadWorld(){let t=this.mapId;this.mapId=null,this.loadMap(t)}loadMap(t){if(!(this.mapId===t&&this.world)){if(this.world){this.scene.remove(this.world),this.world.traverse(e=>{e.geometry?.dispose(),e.material?.dispose?.()});for(let e of this.worldTextures)e.dispose()}this.mapId=t,this.map=Zi[t]??Zi[er],this.effects.map=this.map,vn.map=this.map,this.world=new xe,this.worldTextures=[],this.scene.add(this.world),this.buildWorld(this.map)}}buildWorld(t){let e=this.world,i=t.theme,s=M=>(this.worldTextures.push(M),M);this.scene.fog.color.setHex(i.fog[0]),this.scene.fog.near=i.fog[1],this.scene.fog.far=i.fog[2],this.hemi.color.setHex(i.hemi[0]),this.hemi.groundColor.setHex(i.hemi[1]),this.hemi.intensity=i.hemi[2];let r=Wa[t.id]??Wa.ohio;this.hemi.intensity=i.hemi[2]*r.hemiMul,this.sunLight.intensity=i.sun*r.sunMul,this.sunLight.color.setHex(r.sunColor);let a=r.sunDir,o=Math.hypot(...a),l=t.bounds+8;this.sunLight.position.set(a[0]/o*90,a[1]/o*90,a[2]/o*90),this.sunLight.target.position.set(0,0,0);let c=this.sunLight.shadow.camera;c.left=c.bottom=-l*1.15,c.right=c.top=l*1.15,c.near=5,c.far=200,c.updateProjectionMatrix(),jf(r.rim,r.rimK),this.sunLight.shadow.needsUpdate=!0;let h=document.createElement("canvas");h.width=16,h.height=512;let u=h.getContext("2d"),d=u.createLinearGradient(0,0,0,512);for(let[M,_]of i.sky)d.addColorStop(M,_);u.fillStyle=d,u.fillRect(0,0,16,512);let f=s(new ke(h));f.colorSpace=be,e.add(new Ct(new kt(300,24,16),new Vt({map:f,side:Ze,fog:!1})));let p={};for(let[M,_]of Object.entries(i.tex))p[M]=new mn({map:s(Zv(_)),vertexColors:!0});p.lamp=new Vt({color:16777200,vertexColors:!0}),this.lampMat=p.lamp;let v=new Map;for(let M of t.boxes){let _=M.floor?4:M.wall?6:2,T=M.floor?`${M.kind}|floor`:M.kind;v.has(T)||v.set(T,{kind:M.kind,floor:!!M.floor,parts:[]}),v.get(T).parts.push(dp(M,_,!M.floor))}for(let{kind:M,floor:_,parts:T}of v.values()){let S=new Ct(Xa(T),p[M]);S.receiveShadow=!0,S.castShadow=!_&&!(r.noCast??[]).includes(M),e.add(S)}let g=new Map;for(let M of t.decor)g.has(M.kind)||g.set(M.kind,[]),g.get(M.kind).push(dp(M,M.kind==="city"?8:2,M.kind==="city"));for(let[M,_]of g)e.add(new Ct(Xa(_),p[M]));for(let[M,_,T,S,y,w]of i.signs){let C=new Ct(new bi(w,w/2),new Vt({map:s(fp(ju(M),_,T)),color:new at(1.06,1.06,1.06),fog:!1}));C.position.set(...S),C.rotation.y=y,e.add(C)}if(i.pit){let M=new Ct(new bi(i.pit.size,i.pit.size).rotateX(-Math.PI/2),new Vt({map:s(fp(i.pit.lines,i.pit.bg,i.pit.fg)),fog:!1}));M.position.set(...i.pit.pos),e.add(M)}let m=Xs("67",{color:"#ffe600",stroke:"#ff0080",size:200});this.big67=new Le(new Re({map:m,color:new at(1.2,1.2,1.2),transparent:!0,fog:!1})),this.big67.scale.set(m.userData.aspect*9,9,1),this.big67.position.set(...i.big67),this.big67.userData.baseY=i.big67[1],e.add(this.big67),this.padMeshes=[];for(let M of t.pads){let _=new Ct(new ee(M.radius,M.radius*1.1,.14,24),new Vt({color:16772608}));_.position.set(M.pos[0],M.pos[1]+.07,M.pos[2]),e.add(_),_.material.color.multiplyScalar(1.5);let T=new Ct(new oi(M.radius*.5,.8,4),new Vt({color:new at(2.6,0,1.1),transparent:!0,opacity:.9}));T.position.set(M.pos[0],M.pos[1]+.9,M.pos[2]),T.userData.baseY=M.pos[1]+.9,e.add(T),this.padMeshes.push(T);let S=new Ct(new ee(M.radius*.95,M.radius,3.4,20,1,!0).translate(0,1.7,0),new pe({transparent:!0,depthWrite:!1,side:De,blending:_e,vertexShader:"varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vU; void main(){ gl_FragColor = vec4(vec3(1.5, 1.2, 0.2), (1.0 - vU.y) * (1.0 - vU.y) * 0.5); }"}));S.position.set(M.pos[0],M.pos[1]+.1,M.pos[2]),e.add(S)}let x=Xs("\u{1F357}",{stroke:null,size:128,font:'"Segoe UI Emoji", sans-serif'});this.pickupMeshes=t.pickups.map(M=>{let _;if(M.kind==="chicken")_=new Le(new Re({map:x,transparent:!0})),_.scale.set(x.userData.aspect*1.25,1.25,1);else{_=new xe,_.add(new Ct(new Ds(.5),new Vt({color:new at(2.4,1.7,.2)})));let T=new Ct(new Be(.85,.022,6,36).rotateX(1.2),new Vt({color:new at(3,2.4,.8)}));_.add(T);let S=new Le(new Re({map:oc(),transparent:!0,depthWrite:!1,blending:_e}));S.scale.set(3.4,3.4,1),_.add(S)}return _.position.set(...M.pos),_.userData.baseY=M.pos[1],e.add(_),_}),this.worldTick=hp(this,t,e,s)}buildViewmodels(){this.vmScene=new as,this.vmScene.add(new fs(16777215,5588104,1.7));let t=new ms(16773856,1.6);t.position.set(-1,2,1),this.vmScene.add(t),this.vmLight=new ps(16777215,0,3,1.2),this.vmLight.position.set(.3,-.05,-1),this.vmScene.add(this.vmLight),this.vmCam=new Ke(58,16/9,.01,10),this.vmRoot=new xe,this.vmScene.add(this.vmRoot);let e=Pi(16765503),i=Pi(3108342);this.vmSkin=e,this.vmSleeve=i;let s=p=>Pi(p),r=(p,v,g)=>new Vt({color:new at(p,v,g)}),a=(p,v,g,m=0,x=0,M=0)=>{let _=new Ct(v,g);return _.position.set(m,x,M),p.add(_),_},o=(p,v=0,g=-.13,m=.05)=>{a(p,new kt(.078,14,10),e,v,g,m);for(let M=0;M<3;M++)a(p,new kt(.024,8,6),e,v-.055,g+.035-M*.034,m-.05);return a(p,new ee(.052,.06,.3,10).rotateX(1.2),e,v+.015,g-.05,m+.15),a(p,new ee(.075,.09,.75,12).rotateX(1.2),i,v+.05,g-.19,m+.54)},l=new xe;a(l,new _i(.075,.36,6,16).rotateX(Math.PI/2),s(7128644)),a(l,new oi(.115,.22,16).rotateX(-Math.PI/2),s(3111450),0,0,-.34);for(let p of[-.14,.02,.15])a(l,new Be(.078,.008,6,20),s(2902552),0,0,p);this.vmGas=a(l,new _i(.021,.27,4,10).rotateX(Math.PI/2),r(1.4,3,.35),.074,.044,0),a(l,new kt(.04,12,10),s(16737970),0,.092,-.08).scale.set(1.2,.65,1.4),a(l,new ee(.006,.01,.035,8),s(14170762),0,.112,-.03).rotation.x=1.1,a(l,new qt(.08,.17,.07),s(2236962),0,-.13,.07),o(l);let c=new xe;a(c,new qt(.11,.13,.22),s(16765503)),a(c,new ee(.052,.052,.54,12).rotateX(Math.PI/2),s(12096266),0,.03,-.36),a(c,new ee(.085,.085,.13,10).rotateX(Math.PI/2),s(7829367),0,.01,-.09),a(c,new qt(.075,.18,.08),s(5976592),0,-.13,.08),a(c,new qt(.018,.035,.018),r(3.2,.3,1.2),0,.105,-.6),a(c,new qt(.03,.03,.07),s(2236962),0,.085,.06);for(let p of[-.2,-.5])a(c,new Be(.054,.007,6,16),s(8020232),0,.03,p);let h=Xs("67",{color:"#ff0080",stroke:"#fff",size:96}),u=new Ct(new bi(.16,.1),new Vt({map:h,transparent:!0,side:De}));u.position.set(-.058,.03,-.05),u.rotation.y=-Math.PI/2,c.add(u),o(c);let d=new xe;a(d,new qt(.12,.12,.42),s(3355456)),a(d,new oi(.2,.34,18,1,!0).rotateX(Math.PI/2),new mn({color:16727425,side:De}),0,0,-.36),a(d,new fi(.2,18),s(1118481),0,0,-.2),a(d,new qt(.075,.16,.07),s(2236962),0,-.12,.1),a(d,new Be(.2,.012,6,28),r(3,.9,1.8),0,0,-.53),a(d,new qt(.03,.05,.3),s(16727425),0,.08,.02),a(d,new qt(.02,.02,.02),r(.3,3,1),.065,.02,.1),o(d),this.vmGuns={fart:l,six7:c,boom:d};for(let p of Object.values(this.vmGuns))p.visible=!1,this.vmRoot.add(p);this.vmRoot.position.set(.3,-.27,-.62),this.vmMuzzle=new Le(new Re({map:ka(),transparent:!0,depthWrite:!1,blending:_e,opacity:0})),this.vmMuzzle.scale.setScalar(.55),this.vmRoot.add(this.vmMuzzle);let f=new xe;a(f,new qt(.34,.06,.34),e);for(let p=0;p<4;p++)a(f,new qt(.065,.05,.24),e,-.13+p*.087,0,-.27);a(f,new qt(.06,.05,.22),e,.21,0,-.04).rotation.y=-.8,a(f,new ee(.07,.08,.9,8).rotateX(Math.PI/2),e,0,0,.58),f.visible=!1,this.vmScene.add(f),this.vmHand=f,this.setViewWeapon("fart")}setViewWeapon(t){for(let[e,i]of Object.entries(this.vmGuns))i.visible=e===t;this.vmSwitch=1,this.vmMuzzle.position.set(0,t==="six7"?.03:0,t==="fart"?-.48:t==="six7"?-.68:-.58)}resize(){let t=window.innerWidth,e=window.innerHeight;this.pipeline?.resize(),this.effects.setPointScale(e*this.renderer.getPixelRatio()*.72),this.camera.aspect=this.vmCam.aspect=t/e,this.camera.updateProjectionMatrix(),this.vmCam.updateProjectionMatrix()}bindInput(){window.addEventListener("keydown",t=>{this.mode!=="match"||t.target.tagName==="INPUT"||(["Space","Tab","ShiftLeft","ShiftRight"].includes(t.code)&&t.preventDefault(),!t.repeat&&(this.keys.add(t.code),t.code==="Space"&&(this.jumpQueued=!0),(t.code==="ShiftLeft"||t.code==="ShiftRight")&&(this.dashQueued=!0),t.code==="Digit1"&&this.switchWeapon("fart"),t.code==="Digit2"&&this.switchWeapon("six7"),t.code==="Digit3"&&this.switchWeapon("boom"),t.code==="KeyR"&&this.startReload(),t.code==="KeyF"&&this.slap(),t.code==="KeyE"&&this.tryUltra()))}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),window.addEventListener("blur",()=>{this.keys.clear(),this.mouseDown=!1,this.zoom=!1}),document.addEventListener("mousemove",t=>{if(!this.locked||this.mode!=="match")return;let e=(this.zoom?.0011:.0022)*(this.grabbedBy!==null?-1:1);this.yaw-=Ms(t.movementX,-300,300)*e,this.pitch=Ms(this.pitch-Ms(t.movementY,-300,300)*e,-1.5,1.5)}),document.addEventListener("mousedown",t=>{if(this.mode==="match"){if(!this.locked){this.requestLock();return}t.button===0&&(this.mouseDown=!0,this.shotQueued=!0),t.button===2&&(this.zoom=!0)}}),document.addEventListener("mouseup",t=>{t.button===0&&(this.mouseDown=!1),t.button===2&&(this.zoom=!1)}),document.addEventListener("contextmenu",t=>{this.mode==="match"&&t.preventDefault()}),document.addEventListener("wheel",t=>{if(this.mode!=="match"||!this.locked)return;let e=Object.keys(He),i=e.indexOf(this.weapon);this.switchWeapon(e[(i+(t.deltaY>0?1:e.length-1))%e.length])},{passive:!0}),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.canvas,this.locked||(this.mouseDown=!1,this.zoom=!1,this.keys.clear()),this.hud.setLockHint(this.mode==="match"&&!this.locked)})}requestLock(){try{this.canvas.requestPointerLock()?.catch?.(()=>{})}catch{}}switchWeapon(t){this.weapon===t||!this.alive||(this.weapon=t,this.reloadT=0,this.cooldown=Math.max(this.cooldown,.12),this.setViewWeapon(t),this.sfx.click(),this.hud.setWeapon(He[t]),this.me?.setWeapon(t))}startReload(){let t=He[this.weapon];this.reloadT>0||this.ammo[t.id]>=t.mag||!this.alive||this.infAmmo()||this.forced||(this.reloadT=t.reload,this.sfx.reload())}setAttract(t,e){this.mode="attract",e&&this.loadMap(e);let i=t.length===0;i&&(t=[{id:"demo1",skin:"sigma"},{id:"demo2",skin:"tung"},{id:"demo3",skin:"cat"},{id:"demo4",skin:"streamer"}]),this.syncChars(t,!0);let s=[...this.chars.values()],r=this.map.showcase.pos;s.forEach((a,o)=>{a.root.position.set(r[0]+(o-(s.length-1)/2)*(i?2.5:1.75),r[1],r[2]),a.lastPos.copy(a.root.position),a.root.rotation.y=0,a.pitch=0,a.emote=0,a.lobby=!0,a.ultra=!1,a.ultraKind=null,a.bigHead=!1,a.respawn(),a.setVisibleBody(!0)}),this.setHudVisible(!1)}setHudVisible(t){this.vmRoot.visible=t}syncChars(t,e=!1){let i=new Map;for(let s of t)i.set(s.id,s);for(let[s,r]of this.chars){let a=i.get(s);(!a||r.skinId!==a.skin||r.nameText!==a.name)&&(r.dispose(this.scene),this.chars.delete(s))}for(let s of t)if(!this.chars.has(s.id)){let r=new vn(s.skin,s.name);this.scene.add(r.root),this.chars.set(s.id,r)}if(e&&t.length<2){if(!this.chars.has("ghost")){let s=new vn("cone",it("room.ghost"));this.scene.add(s.root),this.chars.set("ghost",s)}}else this.chars.has("ghost")&&(this.chars.get("ghost").dispose(this.scene),this.chars.delete("ghost"))}onMatchStart(t,e){this.effects.clear(),this.resetMatchState(),this.myId=e,this.mode="match",this.loadMap(t.map),this.syncChars(t.players,!1),this.me=this.chars.get(e);let i=Qs[t.players.find(r=>r.id===e)?.skin];i&&(this.vmSkin.color.setHex(i.skin),this.vmSleeve.color.setHex(i.shirt));for(let r of t.players){let a=this.chars.get(r.id);a.respawn(),a.emote=0,a.lobby=!1,a.xray=!1,a.ultra=!1,a.ultraKind=null,a.bigHead=!1,a.root.position.set(...r.pos),a.root.rotation.y=r.yaw,a.lastPos.copy(a.root.position),r.id===e&&(this.body=Yn(...r.pos),this.yaw=r.yaw,this.pitch=0)}this.me?.tag&&(this.me.tag.visible=!1),this.pipeline.prewarm(this.effects),this.sunLight.shadow.needsUpdate=!0,this.hud.setFace(i?t.players.find(r=>r.id===e)?.skin:null),t.pickups.forEach((r,a)=>{this.pickupMeshes[a].visible=r}),this.timeLeft=t.endsIn,this.setHudVisible(!0),this.setViewWeapon("fart"),this.hud.setWeapon(He.fart),this.hud.reset(),this.canvas.classList.remove("dead"),this.requestLock(),this.hud.setLockHint(!this.locked);let s=t.countdownMs/3;this.hud.bigCount("6"),this.sfx.say("six",{rate:.8,pitch:.6}),this.sfx.bong(),this.cdTimers=[setTimeout(()=>{this.hud.bigCount("7"),this.sfx.say("seven",{rate:.8,pitch:.4}),this.sfx.bong()},s),setTimeout(()=>{this.hud.bigCount(it("hud.go")),this.sfx.airhorn()},s*2)],this.sfx.stopMusic()}onRoster(t){if(this.mode==="match"){this.syncChars(t,!1);for(let e of[...this.buffers.keys()])this.chars.has(e)||this.buffers.delete(e)}}onGo(){this.frozen=!1,this.hud.bigCount(""),this.sfx.playMusic("battle")}onMatchEnd(){this.frozen=!0,this.mouseDown=!1,this.zoom=!1,(this.cdTimers??[]).forEach(clearTimeout),this.hud.setLockHint(!1),this.mode="ended",this.keys.clear(),document.pointerLockElement&&document.exitPointerLock(),this.canvas.classList.remove("dead"),this.setHudVisible(!1),this.me?.setVisibleBody(!0);for(let t of this.chars.values())t.tag&&(t.tag.visible=!1),t.xray=!1;this.effects.clear(),this.sfx.stopMusic()}onSnap(t){this.timeLeft=t.left,this.scores=t.players.map(e=>({id:e.id,k:e.k}));for(let e of t.players){let i=e.id===this.myId;if(i)this.hp>e.hp+.01&&this.hud.flashHpLoss(),this.hp=e.hp,this.aura=e.aura,this.kills=e.k,this.invuln=e.inv,this.forced&&(this.body.x=e.p[0],this.body.y=e.p[1],this.body.z=e.p[2],this.body.vx=this.body.vy=this.body.vz=0);else{let r=this.buffers.get(e.id);r||this.buffers.set(e.id,r=[]),r.push({t:t.s,...e}),r.length>40&&r.shift()}let s=this.chars.get(e.id);s&&(s.emote=e.e,s.ultra=e.u,i||s.setWeapon(e.w))}this.me&&(this.me.emote=this.emote,this.me.ultra=this.ultra)}renderOf(t){let e=this.buffers.get(t);if(!e||!e.length)return null;let i=this.net.serverNow()-100,s=e[0],r=e[e.length-1];for(let l=e.length-1;l>0;l--)if(e[l-1].t<=i){s=e[l-1],r=e[l];break}let a=r.t>s.t?Ms((i-s.t)/(r.t-s.t),0,1):1;return{p:Math.hypot(r.p[0]-s.p[0],r.p[1]-s.p[1],r.p[2]-s.p[2])>12?r.p:[s.p[0]+(r.p[0]-s.p[0])*a,s.p[1]+(r.p[1]-s.p[1])*a,s.p[2]+(r.p[2]-s.p[2])*a],y:Kv(s.y,r.y,a),pi:s.pi+(r.pi-s.pi)*a,a:r.a}}onKnock(t){this.alive&&(this.body.vx+=t.v[0],this.body.vy=Math.max(this.body.vy,t.v[1]),this.body.vz+=t.v[2],this.body.onGround=!1)}onShot(t){let e={fart:10215466,six7:16770560,boom:16727425,laser:16716083}[t.w];for(let i of t.ends)this.effects.tracer(t.o,i,e,t.w==="six7"||t.w==="laser"?.08:.04,.12),t.w!=="fart"&&this.effects.impact(i,e,3);this.effects.flash(t.o,e,16,9,.07),t.id!==void 0&&this.chars.get(t.id)?.fire(t.w),this.sfx.shoot(t.w,!0),t.w==="fart"&&this.camera.position.distanceTo(new N(...t.o))>5&&this.effects.cloud(t.o,2),t.w==="six7"&&this.camera.position.distanceTo(new N(...t.ends[0]))>7&&this.effects.text(t.ends[0],"67",{color:"#ffe600",scale:1.1,life:.6}),t.w==="boom"&&this.camera.position.distanceTo(new N(...t.o))>5&&this.effects.text(t.o,"BOOM",{color:"#ff3d81",scale:1.4,life:.4})}onSlapFx(t){t.id!==this.myId&&(this.sfx.whiff(),this.chars.get(t.id)?.slap())}onHit(t){let e=t.to===this.myId,i=t.from===this.myId,s=this.chars.get(t.to),r=t.head?1.6:t.dmg>=20?1.2:.7;if(s){s.pop(r);let a=[t.pos[0],t.pos[1]+(t.head?1.75:1.1),t.pos[2]];this.effects.burst(a,{n:t.head?18:8,speed:t.head?8:5,color:t.head?16765471:16727408,size:.17,life:.42,g:12,drag:1.6,hdr:2.4}),t.head&&this.effects.flash(a,16765471,26,7,.14)}if(t.weapon==="slap"&&this.sfx.slap(),t.weapon==="rizz"&&s&&this.effects.text([t.pos[0],t.pos[1]+2.3,t.pos[2]],gi(["\u{1F618}","\u{1F48B}","\u{1F496}"]),{scale:.9,life:.7,stroke:null}),t.weapon==="reflect"&&s&&(this.effects.text([t.pos[0],t.pos[1]+2.3,t.pos[2]],"nah",{color:"#60c8ff",scale:1,life:.6}),this.effects.burst([t.pos[0],t.pos[1]+1.2,t.pos[2]],{n:8,speed:5,color:6342911,size:.14,life:.35,hdr:2.4})),e&&t.weapon==="bark"&&this.hud.rain(["W","L","\u{1F480}","CHAT","\u{1F436}","L","RATIO"],7),t.weapon==="claw"&&(this.sfx.scratch(),this.effects.slash([t.pos[0],t.pos[1]+1.4,t.pos[2]]),this.effects.burst([t.pos[0],t.pos[1]+1.4,t.pos[2]],{n:4,speed:3,color:16756832,size:.22,size2:.1,life:.5,g:4,additive:!1}),this.effects.text([t.pos[0],t.pos[1]+2.1,t.pos[2]],gi(cn("claw")),{color:"#ff4d6d",scale:.9,life:.45}),Math.random()<.18&&this.sfx.meow()),e&&this.pipeline.hit(t.head?1.3:.5+t.dmg/60),e&&t.weapon==="claw")this.shake=Math.min(1,this.shake+.14),this.hud.claws();else if(e){this.shake=Math.min(1,this.shake+(t.head?.8:.3+t.dmg/120)),this.hud.eyePop(t.head||t.dmg>=30),this.sfx.eyePop(t.head||t.dmg>=30),t.head&&this.sfx.metalPipe();let a=this.buffers.get(t.from)?.at(-1)?.p;if(a&&t.from){let o=Math.atan2(a[0]-this.body.x,a[2]-this.body.z);this.hud.damageDir(o-this.yaw+Math.PI)}}if(i){this.hud.hitmarker(t.head),this.sfx.tick(),t.head&&(this.sfx.metalPipe(),this.hud.shout("HEADSHOT","gold"));let a=[t.pos[0],t.pos[1]+(t.head?2.2:1.4),t.pos[2]];this.effects.text(a,`-${t.dmg}`,{color:t.head?"#ffdd00":"#ffffff",scale:t.head?1.3:.8,life:.8}),t.head&&this.effects.text(a,gi(["\u{1F480}","\u{1F441}\uFE0F","\u{1FAE8}","\u{1F92F}"]),{scale:1.5,life:.8,spin:3,stroke:null}),t.weapon==="slap"&&this.effects.text(a,it("fx.slap"),{color:"#ff4d6d",scale:1.6,life:.8})}else s&&!e&&t.weapon!=="claw"&&this.sfx.bonk()}onKill(t){let e=this.chars.get(t.victim),i=t.victim===this.myId,s=t.killer===this.myId&&t.weapon!=="fall"&&t.weapon!=="bomb",r=t.killer===this.myId;if(e){let o=e.eyeWorldPositions(),l=new N((Math.random()-.5)*6,8+Math.random()*5,(Math.random()-.5)*6);o.forEach((c,h)=>{let u=l.clone();u.x+=h?3.5:-3.5,this.effects.eyeball(c,u)}),e.setVisibleBody(!0),e.die(),this.effects.text([t.pos[0],t.pos[1]+2.6,t.pos[2]],gi(cn("kill")),{color:"#ff2a6d",scale:1.5,life:1.8,rise:1}),this.effects.burst([t.pos[0],t.pos[1]+1.2,t.pos[2]],{n:30,speed:10,up:3,color:16727408,color2:16765471,size:.2,life:.8,g:16,drag:1.2,hdr:2.4}),this.effects.burst([t.pos[0],t.pos[1]+1.2,t.pos[2]],{n:10,speed:2.5,up:.8,color:16737928,color2:5579315,size:.7,size2:1.6,life:.8,drag:3,additive:!1,spread:.7,alpha:.6}),this.effects.flash([t.pos[0],t.pos[1]+1.2,t.pos[2]],16728166,40,11,.24)}let a=t.killer!=null?this.nameOf(t.killer):it(t.weapon==="bomb"?"name.plane":"name.gravity");if(this.hud.killFeed(t,a,this.nameOf(t.victim)),r){if(s){let o=gi(cn("kill"));this.hud.killCutIn(o,t.head),this.sfx.vineBoom(),setTimeout(()=>this.sfx.airhorn(),160),this.meme(o)}else this.hud.shout(it("shout.free"),"gold");this.hud.rain(["67","67","\u{1F5FF}","\u{1F441}\uFE0F"],12),t.killerKills===6&&(this.sfx.say("six",{pitch:.2,rate:.7}),this.hud.shout("SIX...","gold")),t.killerKills===7&&this.sfx.say("seven",{pitch:.2,rate:.7})}if(i){this.alive=!1,this.killerId=t.killer,this.deadCamT=0,this.emote=0,this.reloadT=0,this.canvas.classList.add("dead"),this.setHudVisible(!1),this.me?.setVisibleBody(!0),this.me?.tag&&(this.me.tag.visible=!1),this.ultraOff();let o=gi(cn(t.weapon==="fall"?"fall":"death"));this.setGrabbed(null),this.charmUntil=this.slowUntil=0,this.hud.setCharm(0),this.hud.setSlow(0),this.hud.deathScreen(o,a,t.weapon,t.respawnMs),this.sfx.sadTrombone(),this.sfx.bigFart(),this.meme(o,!0),t.victimKills===6&&t.killerKills===6&&this.hud.shout(it("shout.matchPoint"),"gold")}}nameOf(t){return this.hud.names.get(t)??it("name.left")}meme(t,e=!1){let i=performance.now();!e&&i-this.lastMemeAt<1400||(this.lastMemeAt=i,this.sfx.sayMeme(t))}onSpawn(t){let e=this.chars.get(t.id);e&&(e.respawn(),e.root.position.set(...t.pos),e.lastPos.copy(e.root.position),e.pop(.8),this.effects.pillar(t.pos,6283519)),t.id===this.myId?(this.body=Yn(...t.pos),this.yaw=t.yaw,this.pitch=0,this.alive=!0,this.forced=!1,this.ammo=up(),this.reloadT=0,this.canvas.classList.remove("dead"),this.setHudVisible(!0),this.setViewWeapon(this.weapon),this.hud.hideDeath(),this.sfx.boing(),this.me&&this.me.setVisibleBody(!1)):this.buffers.set(t.id,[])}onAura(t){if(t.id===this.myId)this.hud.auraPop(t.delta,t.reason),t.delta>=600&&this.sfx.sparkle(),t.delta<=-600&&t.reason!=="death"&&t.reason!=="fall"&&this.meme("cringe",!0);else{let e=this.chars.get(t.id)?.root.position;e&&this.effects.text([e.x,e.y+3,e.z],`${t.delta>0?"+":""}${t.delta} AURA`,{color:t.delta>0?"#ffd700":"#ff4d6d",scale:.8,life:1.1})}}tryUltra(){this.alive&&this.aura>=6767&&!this.ultra&&this.net.send({t:"ultra"})}ultraOff(){if(!this.ultra)return;let t=this.ultraKind==="minsu";this.ultra=!1,this.ultraKind=null,this.forced=!1,this.hud.setUltra(!1),t&&this.hud.setWeapon(He[this.weapon]),this.setHudVisible(this.alive)}infAmmo(){return this.ultraKind==="sigma"||this.ultraKind==="minsu"}curWeapon(){return this.ultraKind==="minsu"?Tn:He[this.weapon]}setGrabbed(t){this.grabbedBy=t,this.hud.setGrabbed(t!==null)}onTeleport(t){this.body=Yn(...t.pos),this.forced=!1}onCat(t){t.to===this.myId?(this.setGrabbed(t.id),this.hud.shout(it("shout.flipped"),"red"),this.sfx.meow(),this.sfx.say(it("tts.meow"),{lang:ro(),pitch:2,rate:1.4})):t.to===null&&this.grabbedBy===t.id&&this.setGrabbed(null),t.id===this.myId&&t.to!==null&&this.sfx.meow()}onWave(t){this.effects.ring(t.pos,t.radius),this.effects.dust(t.pos,t.final?34:14,13211484),this.effects.flash([t.pos[0],t.pos[1]+1,t.pos[2]],16761395,t.final?90:30,t.final?28:12,t.final?.4:.2),this.effects.text([t.pos[0],t.pos[1]+3.4,t.pos[2]],t.final?"SAHUR!!!":it("fx.tung"),{color:t.final?"#ff5f1f":"#ffc233",scale:t.final?2.8:1.1+(t.n??1)*.12,life:t.final?.9:.5}),t.final&&this.effects.pillar(t.pos,16761395,12,.4),this.sfx.tungTung(),Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2])<t.radius*1.4&&(this.shake=Math.min(1,this.shake+.35))}onCharm(t){let e=this.chars.get(t.to);e&&(this.effects.text([e.root.position.x,e.root.position.y+2.8,e.root.position.z],"\u{1F496}",{scale:1.2,life:1.2,stroke:null}),this.effects.burst([e.root.position.x,e.root.position.y+1.4,e.root.position.z],{n:14,speed:2.5,up:2,color:16736192,size:.2,life:.9,hdr:2.3,drag:1})),t.to===this.myId&&(this.charmUntil=performance.now()+t.ms,this.charmBy=t.id,this.emote=0,this.mouseDown=!1,this.hud.setCharm(t.ms),this.hud.shout(it("shout.charm",{name:this.nameOf(t.id)}),"red"))}onFallout(t){this.effects.fallout(t.pos,t.radius,t.ms)}onGeyser(t){this.effects.geyser(t.pos,t.radius),this.sfx.flush(900),Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2])<t.radius*1.3&&(this.shake=Math.min(1,this.shake+.7),this.pipeline.hit(.8))}onPunch(t){this.effects.punch(t.pos,t.n),this.sfx.vineBoom(),this.effects.text([t.pos[0],t.pos[1]+2.8,t.pos[2]],["POW!","BAM!","THINK!"][t.n-1]??"POW!",{color:"#ffd21f",scale:1.3+t.n*.35,life:.6}),Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2])<25&&(this.shake=Math.min(1,this.shake+.3+t.n*.12)),t.id===this.myId&&(this.fovKick=10+t.n*5)}onUltraExt(t){let e=this.chars.get(t.id);if(e){let i=e.root.position;this.effects.text([i.x,i.y+3.1,i.z],"+2s",{color:"#ffd21f",scale:1.1,life:.9}),this.effects.pillar([i.x,i.y,i.z],16762880,8,.4)}t.id===this.myId&&(this.hud.setUltra(!0,t.ms,it("ultra.sigma")),this.sfx.sparkle())}onBark(t){let i=[t.pos[0]-Math.sin(t.yaw)*3,t.pos[1]+1.8,t.pos[2]-Math.cos(t.yaw)*3];this.effects.ring([t.pos[0]-Math.sin(t.yaw)*5,t.pos[1],t.pos[2]-Math.cos(t.yaw)*5],t.range*.5,16724804),this.effects.text(i,"WOOF!",{color:"#ff3344",scale:1.7,life:.55}),this.effects.flash(i,16724804,t.final?80:36,t.final?24:14,t.final?.35:.18),t.final&&(this.effects.ring(t.pos,t.range,16724804),this.effects.text([t.pos[0],t.pos[1]+3.2,t.pos[2]],"AAAAAAAA!!",{color:"#ff3344",scale:2.2,life:.9}),this.effects.burst([t.pos[0],t.pos[1]+1.2,t.pos[2]],{n:40,speed:16,color:16724804,size:.2,life:.6,drag:1,hdr:2.6}),this.sfx.airhorn()),this.effects.burst(i,{n:18,speed:13,color:16724804,size:.2,life:.45,drag:1.2,hdr:2.6,dir:[-Math.sin(t.yaw),.05,-Math.cos(t.yaw)]}),this.sfx.bark(),Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2])<t.range&&(this.shake=Math.min(1,this.shake+.25))}onSlow(t){let e=this.chars.get(t.to);e&&(this.effects.text([e.root.position.x,e.root.position.y+2.8,e.root.position.z],"\u{1F60C}",{scale:1.1,life:1.2,stroke:null}),this.effects.burst([e.root.position.x,e.root.position.y+1.2,e.root.position.z],{n:10,speed:1.2,up:.9,color:6342911,size:.2,life:1.2,hdr:2,drag:1})),t.to===this.myId&&(this.slowUntil=performance.now()+t.ms,this.hud.setSlow(t.ms),this.hud.shout(it("shout.slow",{name:this.nameOf(t.id)}),"gold"))}disabled(){return performance.now()<this.charmUntil}onNuke(t){let e=t.id===this.myId;this.effects.warning(t.pos,t.radius,t.in,"\u2622\uFE0F",5),this.sfx.stopMusic(),this.musicHold=performance.now()+t.in+3500,this.sfx.nukeWind(t.in),this.sfx.say("Tactical nuke incoming",{pitch:.1,rate:.72}),this.hud.oppenheimer(t.in,e?null:this.nameOf(t.id))}onNukeBoom(t){this.effects.mushroom(t.pos,t.radius),this.hud.nukeFlash(),this.pipeline.hit(1.6),this.cineUntil=performance.now()+2400,this.cinePos=t.pos,this.mouseDown=!1,this.fovKick=30,"speechSynthesis"in window&&speechSynthesis.cancel();let e=Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2]);setTimeout(()=>{this.sfx.nukeBoom(),this.mode==="match"&&(this.shake=Math.min(1,this.shake+Math.max(.5,1-e/60)))},950)}ultraIntro(t,e){t==="sigma"?(this.sfx.vineBoom(),this.sfx.sparkle(),this.sfx.say("sigma",{pitch:.1,rate:.6})):t==="minsu"?(this.sfx.boing(!0),this.sfx.say(it("tts.laser"),{lang:ro(),pitch:.2,rate:.8})):t==="cat"?(this.sfx.meow(),this.sfx.say(it("tts.cat"),{lang:ro(),pitch:1.9,rate:1.3})):t==="toilet"?(this.sfx.flush(e),this.sfx.say("flush",{pitch:.1,rate:.5})):t==="streamer"?(this.sfx.airhorn(),this.hud.rain(["W","W","L","\u{1F525}","\u{1F480}","CHAT","\u{1F436}"],12)):t==="hero"?(this.sfx.vineBoom(),this.sfx.say("think! think!",{pitch:.2,rate:.75})):t==="chill"?(this.sfx.sparkle(),this.sfx.say("just a chill guy",{pitch:.5,rate:.7})):t==="tung"?this.sfx.say("tung tung tung sahur",{pitch:.2,rate:.9}):t==="rizz"&&(this.sfx.sparkle(),this.sfx.say("rizz",{pitch:.2,rate:.5}))}onUltra(t){let e=this.chars.get(t.id);if(e&&(e.ultra=t.on,e.ultraKind=t.on?t.kind:null,t.on)){let i=e.root.position,s=xc[t.kind]?.color??16765471;this.effects.pillar([i.x,i.y,i.z],s,16,.55),this.effects.ring([i.x,i.y,i.z],12,s),this.effects.flash([i.x,i.y+1.5,i.z],s,28,16,.3)}if(t.id===this.myId)if(t.on){this.ultra=!0,this.ultraKind=t.kind,this.emote=0;let i=it(`ultra.${t.kind}`);this.hud.setUltra(!0,t.ms,i,xc[t.kind]?.color),this.fovKick=22,this.infAmmo()&&(this.reloadT=0),(t.kind==="cat"||t.kind==="hero")&&(this.forced=!0,this.reloadT=0,this.setHudVisible(!1)),t.kind==="minsu"&&(this.setHudVisible(!1),this.hud.setWeapon(Tn)),t.kind!=="cone"&&this.hud.shout(i,"gold"),this.ultraIntro(t.kind,t.ms)}else this.ultraOff();else t.on&&(t.kind!=="cone"&&this.hud.shout(it("shout.flee",{name:this.nameOf(t.id),ultra:it(`ultra.${t.kind}`)}),"red"),this.ultraIntro(t.kind,t.ms),t.kind==="sigma"&&this.sfx.airhorn());!t.on&&this.grabbedBy===t.id&&this.setGrabbed(null)}onEvent(t){let e=this.eventKind;if(this.eventKind=t.kind,!t.kind){this.hud.eventBanner(null);for(let i of this.chars.values())i.bigHead=!1;return}if(this.hud.eventBanner(it(`event.${t.kind}`),t.ms),this.sfx.bong(),this.sfx.sayMeme(it(`eventSay.${t.kind}`)),t.kind==="bighead")for(let i of this.chars.values())i.bigHead=!0;t.kind==="dogfight"&&(this.effects.dogPlane(1,24),setTimeout(()=>this.effects.dogPlane(-1,28),1700),this.sfx.planeFlyby(),this.sfx.bark(),setTimeout(()=>this.sfx.bark(),900)),t.kind==="sixseven"&&this.hud.rain(["67","6","7"],60)}onBomb(t){this.effects.warning(t.pos,Rn.radius,t.in),Math.random()<.3&&this.sfx.bark()}onBoom(t){this.effects.explosion(t.pos),this.sfx.explosion(),Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2])<14&&this.pipeline.hit(.8);let e=Math.hypot(this.body.x-t.pos[0],this.body.z-t.pos[2]);e<16&&(this.shake=Math.min(1,this.shake+(1-e/16)*.6))}onPickup(t){let e=this.pickupMeshes[t.i];e&&this.effects.burst([e.position.x,e.position.y,e.position.z],{n:t.active?10:22,speed:t.active?2:6,up:1.5,color:t.kind==="chicken"?16752704:16765471,size:.14,life:.7,drag:1.5,hdr:2.4}),e.visible=t.active,!t.active&&t.by===this.myId&&t.kind==="chicken"&&(this.sfx.chomp(),this.hud.shout(it("shout.chicken"),"gold"))}fireDirs(t){let e=new N;this.camera.getWorldDirection(e);let i=new N().crossVectors(e,this.camera.up).normalize(),s=new N().crossVectors(i,e).normalize(),r=Math.hypot(this.body.vx,this.body.vz)>2?1.6:1,a=this.body.onGround?1:1.5,o=this.zoom?.45:1,l=t.spread*(t.pellets>1?1:r*a*o),c=[];for(let h=0;h<t.pellets;h++){let u=Math.random()*Math.PI*2,d=Math.sqrt(Math.random())*l;c.push([e.x+i.x*Math.cos(u)*d+s.x*Math.sin(u)*d,e.y+i.y*Math.cos(u)*d+s.y*Math.sin(u)*d,e.z+i.z*Math.cos(u)*d+s.z*Math.sin(u)*d])}return c}tryFire(){let t=this.curWeapon();if(performance.now()<this.cineUntil||this.disabled()||this.forced||this.frozen||!this.alive||this.cooldown>0||this.reloadT>0||this.slapT>.12||this.emote)return;let e=this.infAmmo();if(!e&&this.ammo[t.id]<=0){this.sfx.dry(),this.startReload();return}e||this.ammo[t.id]--,this.cooldown=t.interval*(this.ultraKind==="sigma"?.6:1),this.recoil=Math.min(1.5,this.recoil+(t.id==="fart"?.28:1));let i={fart:.002,six7:.018,boom:.03,laser:0}[t.id];this.pitch=Ms(this.pitch+i,-1.5,1.5);let s=[this.camera.position.x,this.camera.position.y,this.camera.position.z],r=this.fireDirs(t);this.net.send({t:"shoot",w:t.id,o:s,dirs:r}),this.sfx.shoot(t.id,!1,this.ultraKind==="sigma");let a=this.muzzlePos(),o=this.otherPositions(),l=this.eventKind==="bighead";for(let d of r){let f=Math.hypot(...d),p=[d[0]/f,d[1]/f,d[2]/f],v=Bi(this.map,s,p,t.range),g=null;for(let M of o){let _=no(s,p,M,l,v);_&&(g=_,v=_.t)}let m=[s[0]+p[0]*v,s[1]+p[1]*v,s[2]+p[2]*v],x={fart:10215466,six7:16770560,boom:16727425,laser:16716083}[t.id];if(t.id==="laser"){let M=[s[0]+p[0]*t.range,s[1]+p[1]*t.range,s[2]+p[2]*t.range];this.effects.tracer(this.muzzlePos(.2),M,x,.07,.11),this.effects.tracer(this.muzzlePos(-.2),M,x,.07,.11);let _=Bi(this.map,s,p,t.range);_<t.range-.1&&this.effects.impact([s[0]+p[0]*_,s[1]+p[1]*_,s[2]+p[2]*_],x,4);continue}this.effects.tracer(a,m,x,t.id==="six7"?.06:.025,.08),v<t.range-.1&&t.id!=="fart"&&(t.id!=="boom"||Math.random()<.45)&&this.effects.impact(m,x,t.id==="boom"?3:8),!g&&v<t.range-.1&&(t.id!=="boom"||Math.random()<.3)&&(t.id==="fart"&&this.effects.cloud(m,1,11919402),t.id==="six7"&&this.effects.text(m,"67",{color:"#ffe600",scale:.8,life:.55,rise:.8}),t.id==="boom"&&this.effects.text(m,"\u{1F4A5}",{scale:.7,life:.3,stroke:null,rise:0}))}let c={fart:10215466,six7:16765024,boom:16727425,laser:16716083}[t.id];t.id!=="laser"&&(this.vmFlash=.055,this.vmMuzzle.material.color.set(c).multiplyScalar(2.8),this.vmMuzzle.material.rotation=Math.random()*6.28,this.vmLight.color.set(c),this.effects.flash(a,c,t.id==="fart"?8:22,t.id==="fart"?6:12,.07));let h=this.camera.getWorldDirection(new N),u=d=>[s[0]+h.x*d+.4,s[1]+h.y*d-.5,s[2]+h.z*d];t.id==="fart"&&this.effects.cloud(u(3.2),1),t.id==="six7"&&this.hud.sixSeven(),t.id==="boom"&&(this.shake=Math.min(1,this.shake+.22),this.hud.shout("BOOM","red")),!e&&this.ammo[t.id]<=0&&this.startReload()}slap(){if(this.forced||this.disabled()||this.frozen||!this.alive||this.slapCd>0||this.emote)return;this.slapCd=An.cooldown,this.slapT=.26,this.sfx.whiff();let t=new N;this.camera.getWorldDirection(t),this.net.send({t:"slap",d:[t.x,t.y,t.z]})}muzzlePos(t=.24){let e=new N(t,-.2,-.75).applyMatrix4(this.camera.matrixWorld);return[e.x,e.y,e.z]}otherPositions(){let t=[];for(let e of this.buffers.keys()){let i=this.renderOf(e);i&&i.a&&t.push(i.p)}return t}frame(){let t=performance.now();if(this.mode!=="match"&&t-this.lastFrame<30)return;let e=(t-this.lastFrame)/1e3,i=Math.min(.05,e);this.lastFrame=t,this.pipeline.watch(e),this.mode==="match"?this.updateMatch(i):this.updateAttract(i);let s=t/1e3;this.big67.material.rotation=Math.sin(s*1.4)*.14,this.big67.position.y=this.big67.userData.baseY+Math.sin(s*2)*.5;for(let[r,a]of this.padMeshes.entries())a.position.y=a.userData.baseY+Math.sin(s*5+r)*.25,a.rotation.y=s*2;for(let r of this.pickupMeshes)r.position.y=r.userData.baseY+Math.sin(s*3)*.14,r.isGroup&&(r.rotation.y=s*2);for(let r of this.chars.values())r.update(i);this.updateCharFx(i,s),this.worldTick?.(s,i),this.effects.update(i),this.sunLight.castShadow&&++this.shadowN%(this.mode==="match"?2:4)===0&&(this.sunLight.shadow.needsUpdate=!0),this.pipeline.render(i,this.mode==="match"&&this.alive&&!this.emote&&!this.forced&&t>=this.cineUntil&&this.vmRoot.visible)}updateCharFx(t,e){this.fxAcc+=t;let i=this.fxAcc>.045;i&&(this.fxAcc=0);let s=this.effects,r=null;for(let[a,o]of this.chars){if(o.xray=this.ultraKind==="minsu"&&a!==this.myId&&o.deadT<0,o.deadT>=0||!o.visual.visible)continue;let l=o.root.position,c=o.ultra?o.ultraKind:null,h=o.emote===1;if(c||h){let u=c?xc[c]:xc.farm;u&&(!r||a!==this.myId)&&(r={p:l,color:u.color,k:c?1:.6}),i&&u&&u.emit(s,l,o,e,a===this.myId)}}r?(this.auraLight.position.set(r.p.x,r.p.y+1.5,r.p.z),this.auraLight.color.setHex(r.color),this.auraLight.intensity=(9+Math.sin(e*9)*2.5)*r.k):this.auraLight.intensity=0}updateAttract(t){this.attractT+=t;let e=this.attractT*.25;this.camera.fov=58,this.camera.updateProjectionMatrix();let i=this.map.showcase;this.camera.position.set(i.pos[0]+Math.sin(e)*i.r,i.pos[1]+2.5+Math.sin(e*2)*.35,i.pos[2]+Math.cos(e)*i.r),this.camera.lookAt(i.pos[0],i.pos[1]+1.45,i.pos[2]);for(let s of this.chars.values())s.root.rotation.y=Math.atan2(s.root.position.x-this.camera.position.x,s.root.position.z-this.camera.position.z);if(this.nextAttractPop-=t,this.nextAttractPop<=0){this.nextAttractPop=1.4+Math.random()*2.2;let s=[...this.chars.values()];s.length&&s[Math.floor(Math.random()*s.length)].pop(1.5)}}updateMatch(t){this.cooldown=Math.max(0,this.cooldown-t),this.slapCd=Math.max(0,this.slapCd-t),this.slapT=Math.max(0,this.slapT-t),this.recoil=Math.max(0,this.recoil-t*6),this.shake=Math.max(0,this.shake-t*2.4),this.fovKick=Math.max(0,this.fovKick-t*22),this.reloadT>0&&(this.reloadT-=t,this.reloadT<=0&&(this.ammo[this.weapon]=He[this.weapon].mag,this.sfx.click())),this.alive&&this.updateLocal(t);for(let[e,i]of this.chars){if(e===this.myId)continue;let s=this.renderOf(e);s&&(i.root.position.set(s.p[0],s.p[1],s.p[2]),i.root.rotation.y=s.y,i.pitch=s.pi,s.a&&i.deadT<0&&i.speed>3&&Math.hypot(this.body.x-s.p[0],this.body.z-s.p[2])<20&&(i.stepAcc=(i.stepAcc??0)+t,i.stepAcc>.34&&(i.stepAcc=0,this.sfx.squeak())))}!this.frozen&&performance.now()>this.musicHold&&this.sfx.playMusic(this.emote===1||this.ultra?"phonk":"battle"),this.updateCamera(t),this.updateViewmodel(t),this.hud.update(this),this.sendAcc+=t,this.sendAcc>=1/30&&(this.sendAcc=0,this.alive&&this.net.send({t:"state",p:[this.body.x,this.body.y,this.body.z],y:this.yaw,pi:this.pitch,w:this.weapon,e:this.emote}))}updateLocal(t){if(this.forced){this.emote=0,this.jumpQueued=this.dashQueued=this.shotQueued=!1,this.me&&(this.me.root.position.set(this.body.x,this.body.y,this.body.z),this.me.root.rotation.y=this.yaw,this.me.setVisibleBody(!0),this.me.tag&&(this.me.tag.visible=!1));return}let e=this.keys,i=u=>e.has(u),s=0,r=performance.now()<this.charmUntil;!this.frozen&&this.body.onGround&&!this.ultraKind&&!r&&(i("KeyG")?s=1:i("KeyT")&&(s=2)),s&&!this.emote&&(this.sfx.vineBoom(),this.sfx.say(s===1?"aura farming":"six seven",{pitch:.3,rate:.8}),s===1&&this.hud.shout(it("shout.farming"),"gold")),this.emote=s;let a=s||this.frozen?0:(i("KeyW")?1:0)-(i("KeyS")?1:0),o=s||this.frozen?0:(i("KeyD")?1:0)-(i("KeyA")?1:0);if(r){let u=this.renderOf(this.charmBy);if(o=0,a=0,u){let d=u.p[0]-this.body.x,f=u.p[2]-this.body.z;this.yaw=Math.atan2(-d,-f),a=Math.hypot(d,f)>1.6?1:0}}r&&(this.jumpQueued=!1,this.dashQueued=!1,this.shotQueued=!1),this.grabbedBy!==null&&(a=-a,o=-o);let l={map:this.map,gravityMul:this.eventKind==="moon"?.35:1,speedMul:this.ultraKind==="sigma"||this.ultraKind==="streamer"?Xi.ultraSpeedMul:performance.now()<this.slowUntil?js.slowMul:this.grabbedBy!==null?.55:1},c=za(this.body,{fwd:a,right:o,yaw:this.yaw,jump:this.jumpQueued&&!this.frozen,dash:this.dashQueued&&!this.frozen},t,l);this.jumpQueued=!1,this.dashQueued=!1;for(let u of c){if(u==="jump"&&this.sfx.quack(),u==="doubleJump"&&(this.sfx.quack(),this.sfx.boing(),this.spin=Math.PI*2),u==="pad"&&(this.sfx.boing(!0),this.hud.shout(it("shout.pad"),"gold")),u==="dash"){this.sfx.dash(),this.fovKick=12;let d=Math.hypot(this.body.vx,this.body.vz)||1;this.effects.burst([this.body.x,this.body.y+.9,this.body.z],{n:14,speed:9,color:12577535,size:.12,life:.3,hdr:2.2,spread:1.2,dir:[-this.body.vx/d,0,-this.body.vz/d]}),this.effects.dust([this.body.x,this.body.y,this.body.z],6)}u==="land"&&(this.sfx.land(),this.landDipV=-1.3,this.vmRoot.position.y-=.03,this.effects.dust([this.body.x,this.body.y,this.body.z],7)),(u==="jump"||u==="doubleJump")&&this.effects.dust([this.body.x,this.body.y,this.body.z],u==="jump"?4:9,u==="jump"?14207160:16765471),u==="pad"&&this.effects.pillar([this.body.x,this.body.y,this.body.z],16770560,8,.5)}let h=Math.hypot(this.body.vx,this.body.vz);this.body.onGround&&h>3&&(this.stepAcc+=t*h,this.stepAcc>3.1&&(this.stepAcc=0,this.sfx.squeak())),this.body.y<this.map.fallY&&(this.body.vy=0),(this.shotQueued||this.mouseDown&&this.curWeapon().auto)&&this.tryFire(),this.shotQueued=!1,this.me&&(this.me.root.position.set(this.body.x,this.body.y,this.body.z),this.me.root.rotation.y=this.yaw,this.me.pitch=this.pitch,this.me.emote=this.emote,this.me.setVisibleBody(this.emote!==0),this.me.tag&&(this.me.tag.visible=!1))}updateCamera(t){if(this.updateCameraBase(t),performance.now()<this.cineUntil&&this.cinePos){let e=this.cinePos;this.camera.lookAt(e[0],e[1]+15,e[2]),this.camera.updateMatrixWorld()}}updateCameraBase(t){let e=this.camera,i=this.zoom?46:80,s=this.zoom?0:Math.min(1,Math.hypot(this.body.vx,this.body.vz)/14)*3,r=i+s+this.fovKick+(this.ultra?8:0);if(Math.abs(e.fov-r)>.05&&(e.fov+=(r-e.fov)*Math.min(1,t*12),e.updateProjectionMatrix()),!this.alive){this.deadCamT+=t;let l=this.chars.get(this.killerId),c=l&&l.deadT<0?l.root.position:this.me?.root.position;if(c){let h=this.deadCamT*.9,u=Math.max(3.2,7-this.deadCamT*1.2),d=new N(c.x+Math.sin(h)*u,c.y+2.6,c.z+Math.cos(h)*u);e.position.lerp(d,Math.min(1,t*5)),e.lookAt(c.x,c.y+1.3,c.z)}return}if(this.emote||this.forced){let l=performance.now()/1e3*.9,c=this.eventKind==="bighead"?7:5.2,h=this.body.x,u=this.body.y+1.3,d=this.body.z,f=Math.sin(this.yaw+l),p=Math.cos(this.yaw+l),v=[f,.35,p],g=Math.hypot(...v),m=[v[0]/g,v[1]/g,v[2]/g],x=this.forced?c:Math.min(c,Bi(this.map,[h,u,d],m,c)-.25);e.position.set(h+m[0]*x,u+m[1]*x,d+m[2]*x),e.lookAt(h,u,d);return}this.spin>0&&(this.spin=Math.max(0,this.spin-t*13)),this.landDipV+=(-120*this.landDip-16*this.landDipV)*t,this.landDip+=this.landDipV*t;let a=this.body.vx*Math.cos(this.yaw)-this.body.vz*Math.sin(this.yaw);this.camRoll+=(Ms(a*-.0028,-.035,.035)-this.camRoll)*Math.min(1,t*8),e.position.set(this.body.x,this.body.y+Fi.eye+this.landDip,this.body.z);let o=this.shake*this.shake*.05;e.rotation.set(this.pitch+(Math.random()-.5)*o,this.yaw+(Math.random()-.5)*o,(Math.random()-.5)*o+this.spin*.02+this.camRoll),e.updateMatrixWorld()}updateViewmodel(t){let e=Math.hypot(this.body.vx,this.body.vz),i=performance.now()/1e3,s=this.body.onGround?Math.min(1,e/9):.2,r=this.zoom?.02:.3,a=this.zoom?-.2:-.27-Math.min(1,e/14)*.02,o=this.vmRoot;o.position.x+=(r+Math.cos(i*9)*.02*s-o.position.x)*Math.min(1,t*14),o.position.y=a+Math.abs(Math.sin(i*9))*.022*s-this.body.vy*.002,o.position.z=-.62+this.recoil*.12;let l=this.yaw-this.lastYaw;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;let c=this.pitch-this.lastPitch;this.lastYaw=this.yaw,this.lastPitch=this.pitch;let h=1/Math.max(t,.001);this.swayX+=(Ms(l*h*.022,-.16,.16)-this.swayX)*Math.min(1,t*11),this.swayY+=(Ms(c*h*.02,-.12,.12)-this.swayY)*Math.min(1,t*11),o.position.x+=this.swayX*.1,o.position.y+=this.swayY*.1,this.vmSwitch=Math.max(0,this.vmSwitch-t*5.2);let u=this.vmSwitch*this.vmSwitch;o.position.y-=u*.42,o.rotation.x=this.recoil*.28+this.swayY+u*-.9,o.rotation.y=this.swayX,this.vmFlash=Math.max(0,this.vmFlash-t),this.vmMuzzle.material.opacity=this.vmFlash>0?1:0,this.vmLight.intensity=this.vmFlash>0?4:0,this.vmGas&&this.vmGas.material.color.setRGB(1.4,2.4+Math.sin(i*5)*.8,.35);let d=He[this.weapon];if(this.reloadT>0){let p=1-this.reloadT/d.reload;o.rotation.x=Math.sin(p*Math.PI)*.6,o.rotation.z=p*Math.PI*2,o.position.y-=Math.sin(p*Math.PI)*.2}else o.rotation.z=0;o.scale.setScalar(this.ultraKind==="sigma"?1.25:1);let f=this.vmHand;if(f.visible=this.slapT>0,f.visible){let p=1-this.slapT/.26,v=Math.sin(p*Math.PI);f.position.set(.72-p*1.2,-.28+v*.16,-.72),f.rotation.set(.25,.3-p*1.3,-.75+p*1)}}};var Tp="aura6767-";var Mu=new URLSearchParams(location.search),Kn=location.hostname.endsWith("github.io")||Mu.has("p2p")||window.AURA_PORTAL==="crazygames",Sc=Mu.get("room")?.toUpperCase().replace(/[^A-Z0-9]/g,"")||null;try{Kn&&Sc&&sessionStorage.getItem("aura-host-code")===Sc&&(Sc=null)}catch{}var Ys=Sc;function Ap(n){let t=String(n??"").toUpperCase().replace(/[^A-Z0-9]/g,"")||null,e=null;try{e=sessionStorage.getItem("aura-host-code")}catch{}Ys=t&&t!==e?t:null}var yu=null;function Rp(){return yu||(yu=new Promise((n,t)=>{let e=document.createElement("script");e.src=new URL("../vendor/peerjs/peerjs.min.js",import.meta.url).href,e.onload=()=>n(window.peerjs?.Peer??window.Peer),e.onerror=()=>t(new Error("PeerJS \uB85C\uB4DC \uC2E4\uD328")),document.head.append(e)})),yu}function Cp(n){let t=new URL(location.href);return t.search="",t.hash="",Mu.has("p2p")&&t.searchParams.set("p2p","1"),t.searchParams.set("room",n),t.href}var wc=class{constructor(){this.readyState=0,this.onopen=this.onmessage=this.onclose=null}opened(){this.readyState=1,this.onopen?.()}closed(){this.readyState!==3&&(this.readyState=3,this.onclose?.())}deliver(t){this.onmessage?.({data:t})}};function s_(n,t){let e=()=>setInterval(t,n);try{let i=`setInterval(() => postMessage(0), ${n});`,s=new Worker(URL.createObjectURL(new Blob([i],{type:"text/javascript"})));s.onmessage=t,s.onerror=e}catch{e()}}var vu=class extends wc{constructor(){super(),this.isHost=!0,this.code=null,this.hub=null,this.peerFailed=!1,this.start()}async start(){let{createHub:t}=await Promise.resolve().then(()=>(Ep(),wp)),{TICK_MS:e}=await Promise.resolve().then(()=>(mu(),Sp));fetch(new URL("../badwords.txt",import.meta.url)).then(i=>i.ok?i.text():"").then(async i=>{(await Promise.resolve().then(()=>(Mc(),bp))).addWords(i.split(`
`))}).catch(()=>{}),this.hub=t({autoTick:!1}),s_(e,()=>this.hub.tick()),this.client=this.hub.connect(i=>queueMicrotask(()=>this.deliver(i))),this.opened()}send(t){this.client?.message(t)}async openInvites(t){if(!this.inviting){this.inviting=!0,this.assignCode();try{let e=await Rp();this.tryRegister(e,t,0)}catch(e){this.peerFailed=!0,this.code=null,this.onCode?.(),t?.(e)}}}assignCode(){this.code=Array.from(crypto.getRandomValues(new Uint8Array(5)),t=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[t%32]).join("");try{sessionStorage.setItem("aura-host-code",this.code)}catch{}this.onCode?.()}tryRegister(t,e,i){let s=new t(Tp+this.code);this.peer=s,s.on("open",()=>{this.registered=!0,this.onCode?.()}),s.on("connection",r=>this.addGuest(r)),s.on("disconnected",()=>{s.destroyed||s.reconnect()}),s.on("error",r=>{r.type==="unavailable-id"&&i<5?(s.destroy(),this.assignCode(),this.tryRegister(t,e,i+1)):this.registered||(this.peerFailed=!0,this.code=null,this.onCode?.(),e?.(r))})}addGuest(t){t.on("open",()=>{let e=this.hub.connect(a=>{t.open&&t.send(a)}),i=Date.now(),s=()=>{clearInterval(r),e.close()},r=setInterval(()=>{Date.now()-i>1e4&&(s(),t.close())},2e3);t.on("data",a=>{i=Date.now(),e.message(a)}),t.on("close",s),t.on("error",s)})}},_u=class extends wc{constructor(t){super(),this.isGuest=!0,this.code=t,this.start()}async start(){let t=setTimeout(()=>this.closed(),15e3);try{let e=await Rp();this.peer=new e,this.peer.on("error",()=>this.closed()),this.peer.on("open",()=>{let i=this.peer.connect(Tp+this.code,{serialization:"raw",reliable:!0});this.conn=i;let s=Date.now();i.on("open",()=>{clearTimeout(t),s=Date.now();let r=setInterval(()=>{this.readyState===3?clearInterval(r):Date.now()-s>1e4&&this.closed()},2e3);this.opened()}),i.on("data",r=>{s=Date.now(),this.deliver(r)}),i.on("close",()=>this.closed()),i.on("error",()=>this.closed())})}catch{this.closed()}}send(t){this.conn?.open&&this.conn.send(t)}};function Pp(){if(!Kn){let n=location.protocol==="https:"?"wss":"ws";return new WebSocket(`${n}://${location.host}/ws`)}return Ys?new _u(Ys):new vu}var Ip=window.AURA_PORTAL==="crazygames",bn=null,Ei=(n,t=null)=>{if(!bn)return t;try{return n(bn)??t}catch{return t}},Ec="",Tc=0,Te={active:Ip,async init(){let n=window.CrazyGames?.SDK;if(!(!Ip||!n))try{await Promise.race([n.init(),new Promise((t,e)=>setTimeout(e,6e3))]),n.environment!=="disabled"&&(bn=n)}catch{bn=null}},get ready(){return!!bn},loadingStart:()=>Ei(n=>{n.game.loadingStart()}),loadingStop:()=>Ei(n=>{n.game.loadingStop()}),gameplayStart:()=>Ei(n=>{n.game.gameplayStart()}),gameplayStop:()=>Ei(n=>{n.game.gameplayStop()}),happytime:()=>Ei(n=>{n.game.happytime()}),invite:()=>Ei(n=>n.game.inviteParams?.room??n.game.getInviteParam("room")),inviteLink:n=>Ei(t=>t.game.inviteLink({room:n})),locale:()=>Ei(n=>n.user.systemInfo?.locale,""),settings:()=>Ei(n=>n.game.settings,{}),onSettings:n=>Ei(t=>{t.game.addSettingsChangeListener(n)}),onJoin:n=>Ei(t=>{t.game.addJoinRoomListener(n)}),onLogin:n=>Ei(t=>{t.user.addAuthListener(n)}),async user(){if(!bn)return null;try{return bn.user.isUserAccountAvailable?await bn.user.getUser():null}catch{return null}},updateRoom(n){let t=JSON.stringify(n);t!==Ec&&(Ec=t,clearTimeout(Tc),Tc=setTimeout(()=>Ei(e=>{e.game.updateRoom(n)}),300))},leftRoom(){Ec&&(Ec="",clearTimeout(Tc),Tc=setTimeout(()=>Ei(n=>{n.game.leftRoom()}),300))},midgame(n){return new Promise(t=>{if(!bn){t();return}let e=document.getElementById("adBlock");e.hidden=!1;let i=!1,s=!1,r=()=>{s||(s=!0,e.hidden=!0,n.setHold("ad",!1),t())};setTimeout(()=>{i||r()},8e3);try{bn.ad.requestAd("midgame",{adStarted:()=>{i=!0,n.setHold("ad",!0)},adFinished:r,adError:r})}catch{r()}})}};var It=n=>document.getElementById(n),Fp={home:It("home"),room:It("room"),result:It("result")};function $s(n){for(let[t,e]of Object.entries(Fp))e.hidden=t!==n}var me=new so,Sn=new cc,te=new yc(It("view"),me,Sn),Ot={ws:null,id:null,offset:0,rtt:0,handlers:{},send(n){this.ws?.readyState===1&&this.ws.send(JSON.stringify(n))},serverNow(){return Date.now()+this.offset}};te.net=Ot;var le=null,Op=[],de=!1,kr=!1,Lp=0,bu=0;function Bp(){let n=Pp();Ot.ws=n,n.onopen=()=>{It("connStatus").textContent=it(n.isHost?"conn.host":n.isGuest?"conn.guest":"conn.server"),It("connStatus").classList.add("ok"),Zs(),clearInterval(bu),bu=setInterval(()=>Ot.send({t:"ping",c:Date.now(),rtt:Ot.rtt}),1e3),Ot.send({t:"ping",c:Date.now(),rtt:0})},n.onmessage=t=>{let e=JSON.parse(t.data);Ot.handlers[e.t]?.(e)},n.onclose=()=>{if(clearInterval(bu),n.isGuest){Eu(it(Ks?"conn.hostLeft":"conn.badCode"));return}It("connStatus").textContent=it("conn.lost"),It("connStatus").classList.remove("ok"),de&&zp(),le=null,zr(),Sn.show(!1),te.setAttract([]),$s("home"),clearTimeout(Lp),Lp=setTimeout(Bp,1500)}}function Zs(){Ot.send({t:"hello",name:It("nameInput").value.trim()||it("home.nickPh"),skin:bs})}var ie=Ot.handlers,Ks=!1,Dp=!1;function zr(){let{ws:n}=Ot;if(Te.active){r_();return}if(n?.isGuest)return;let t=le?Kn?n?.code:le.id:null,e=new URL(location.href);(e.searchParams.get("room")??null)!==(t??null)&&(t?e.searchParams.set("room",t):e.searchParams.delete("room"),history.replaceState(null,"",e.href),t&&!Dp&&!kp&&(Dp=!0,Zn(it("toast.addressInvite"))))}var kp=!1;function r_(){let{ws:n}=Ot;if(!le){Te.leftRoom();return}let t=n?.code,e=!!t&&(n.isGuest||n.registered),i=le.players.filter(s=>!s.isBot).length;t&&Te.updateRoom({roomId:t,isJoinable:e&&le.state==="lobby"&&i<4,inviteParams:{room:t}})}function Eu(n){Zn(n),It("connStatus").textContent=n;try{sessionStorage.setItem("aura-skip-invite",Ot.ws?.code??"")}catch{}setTimeout(()=>{let t=new URL(location.href);t.searchParams.delete("room"),location.href=t.href},2500)}ie.welcome=n=>{if(Ot.id=n.id,Tu(n.rooms),!Kn&&Ys&&!Ks&&(Ks=!0,kp=!0,Zs(),Ot.send({t:"join",id:Ys})),Kn&&Ot.ws.isHost&&zr(),Te.active&&Ot.ws.isHost&&!Ks){Ks=!0,Gp();for(let t=1;t<4;t++)Ot.send({t:"addBot"})}if(Ot.ws.isGuest&&!Ks){if(!n.rooms.length){Te.active?Eu(it("toast.noRoom")):Zn(it("toast.noRoom"));return}Ks=!0,Zs(),Ot.send({t:"join",id:n.rooms[0].id})}};ie.pong=n=>{let t=Date.now();Ot.rtt=t-n.c,Ot.offset=n.s-(n.c+Ot.rtt/2),It("ping").textContent=`${Ot.rtt}ms`};ie.rooms=n=>Tu(n.rooms);ie.sys=n=>Cu(it("system"),it(n.key,n.mapId?{...n.vars,map:it(n.mapId==="random"?"room.random":`map.${n.mapId}`)}:n.vars));ie.error=n=>{if(Te.active&&Ot.ws?.isGuest){Eu(it(n.key));return}Zn(it(n.key)),zr()};ie.left=()=>{le=null,zr(),$s("home"),te.setAttract([]),me.playMusic("lobby")};ie.room=n=>{let t=!!le;le=n.room,zr();for(let e of le.players)Sn.names.set(e.id,e.name);if(de&&te.onRoster(le.players),!de){if(!Fp.result.hidden)return;$s("room"),$a(),te.setAttract(le.players,le.mapId),t||(me.unlock(),me.playMusic("lobby"))}};ie.chat=n=>{Vp()||Cu(n.from,n.text)};ie.matchStart=n=>{de=!0,me.unlock();for(let t of n.players)Sn.names.set(t.id,t.name);$s(null),Te.gameplayStart(),te.onMatchStart(n,Ot.id),c_()};ie.go=()=>te.onGo();ie.snap=n=>{de&&te.onSnap(n)};ie.shot=n=>de&&te.onShot(n);ie.slapFx=n=>de&&te.onSlapFx(n);ie.hit=n=>de&&te.onHit(n);ie.kill=n=>de&&te.onKill(n);ie.spawn=n=>de&&te.onSpawn(n);ie.aura=n=>de&&te.onAura(n);ie.ultra=n=>de&&te.onUltra(n);ie.event=n=>de&&te.onEvent(n);ie.bomb=n=>de&&te.onBomb(n);ie.boom=n=>de&&te.onBoom(n);ie.pickup=n=>de&&te.onPickup(n);ie.knock=n=>de&&te.onKnock(n);ie.teleport=n=>de&&te.onTeleport(n);ie.cat=n=>de&&te.onCat(n);ie.wave=n=>de&&te.onWave(n);ie.fallout=n=>de&&te.onFallout(n);ie.geyser=n=>de&&te.onGeyser(n);ie.punch=n=>de&&te.onPunch(n);ie.ultraExt=n=>de&&te.onUltraExt(n);ie.charm=n=>de&&te.onCharm(n);ie.bark=n=>de&&te.onBark(n);ie.slow=n=>de&&te.onSlow(n);ie.nuke=n=>de&&te.onNuke(n);ie.nukeBoom=n=>de&&te.onNukeBoom(n);ie.matchEnd=n=>{zp(),l_(n)};ie.backToLobby=()=>{clearInterval(Su),$s("room"),kr=!1,$a(),te.setAttract(le?.players??[],le?.mapId),me.playMusic("lobby"),Cu(it("system"),it("sys.again")),Te.midgame(me)};function zp(){de=!1,Te.gameplayStop(),te.onMatchEnd(),Sn.show(!1),h_(),te.setAttract(le?.players??[],le?.mapId)}var bs="minsu";try{let n=localStorage.getItem("aura-name");n&&(It("nameInput").value=n);let t=localStorage.getItem("aura-skin");Oi.includes(t)&&(bs=t)}catch{}It("nameInput").addEventListener("change",()=>{try{localStorage.setItem("aura-name",It("nameInput").value)}catch{}Zs()});function Hp(){me.unlock(),me.playMusic("lobby")}window.addEventListener("pointerdown",Hp,{once:!0});window.addEventListener("keydown",Hp,{once:!0});function Gp(){Zs(),Ot.ws.isHost&&(Ot.ws.onCode=zr),Ot.ws.openInvites?.(()=>Zn(it("toast.inviteFail"))),Ot.send({t:"create",name:It("roomNameInput").value.trim()||it("roomDefault",{name:It("nameInput").value.trim()||it("home.nickPh")})})}It("createBtn").onclick=()=>{me.unlock(),Gp(),me.boing()};function Tu(n){Op=n;let t=It("roomList");if(t.replaceChildren(),!n.length){let e=document.createElement("p");e.className="empty",e.textContent=it("home.empty"),t.append(e);return}for(let e of n){let i=document.createElement("button");i.className="roomRow";let s=document.createElement("span");s.textContent=e.name;let r=document.createElement("em"),a=(e.humans??e.count)>=4||e.state!=="lobby",o=e.map==="random"?`\u{1F3B2} ${it("room.random")}`:`${Zi[e.map]?.emoji??""} ${it(`map.${e.map}`)}`;r.textContent=e.state!=="lobby"?it("room.fighting"):`${o} \xB7 ${e.count}/${4}`,i.append(s,r),i.disabled=a,i.onclick=()=>{me.unlock(),Zs(),Ot.send({t:"join",id:e.id})},t.append(i)}}function Au(n){n.replaceChildren();for(let t of Oi){let e=document.createElement("button");e.className=`skinBtn${t===bs?" on":""}`,e.title=it(`skin.${t}`);let i=ys(t),s=document.createElement("span");s.textContent=it(`skin.${t}`),e.append(i,s),e.onclick=()=>{bs=t;try{localStorage.setItem("aura-skin",t)}catch{}Ot.send({t:"skin",skin:t}),me.quack(),Au(n),Ru()},n.append(e)}}function a_(n){n.replaceChildren();for(let t of[...qr,"random"]){let e=Zi[t],i=document.createElement("button");i.className=`mapBtn${le.mapChoice===t?" on":""}`,i.title=it(e?`mapDesc.${t}`:"room.randomDesc");let s=document.createElement("i");s.textContent=e?.emoji??"\u{1F3B2}";let r=document.createElement("span");r.textContent=it(e?`map.${t}`:"room.random"),i.append(s,r),i.disabled=le.state!=="lobby",i.onclick=()=>{Ot.send({t:"map",id:t}),me.click()},n.append(i)}}function $a(){if(!le)return;It("roomTitle").textContent=le.name||it("room.title");let n=It("slots");n.replaceChildren();for(let s=0;s<4;s++){let r=le.players[s],a=document.createElement("div");if(a.className=`slot${r?"":" open"}${r?.ready?" ready":""}${r?.id===Ot.id?" me":""}`,r){let o=document.createElement("div");o.className="face",o.append(ys(r.skin));let l=document.createElement("div"),c=document.createElement("strong");c.textContent=r.name+(r.id===Ot.id?it("room.me"):"")+(r.isBot?" \u{1F916}":"");let h=document.createElement("small");h.textContent=`${it("room.wins",{n:r.wins})} \xB7 ${it(r.ready?"room.isReady":"room.notReady")}`,l.append(c,h),a.append(o,l)}else{let o=document.createElement("div");o.className="face",o.textContent="\u2753";let l=document.createElement("div"),c=document.createElement("strong");c.textContent=it("room.empty");let h=document.createElement("small");h.textContent=it("room.emptySub"),l.append(c,h),a.append(o,l)}n.append(a)}let t=le.players.find(s=>s.id===Ot.id);kr=!!t?.ready,t&&document.activeElement!==It("renameInput")&&(It("renameInput").value=t.name);let e=It("readyBtn"),i=le.players.length>1&&le.players.every(s=>s.isBot||s.id===Ot.id);e.textContent=it(kr?"room.unready":le.players.length<2?"room.waiting":i?"room.play":"room.ready"),e.classList.toggle("on",kr),e.disabled=le.state!=="lobby",It("botBtn").disabled=le.state!=="lobby"||le.players.length>=4,It("botOutBtn").disabled=le.state!=="lobby"||!le.players.some(s=>s.isBot),a_(It("mapPick")),Au(It("skinPick")),Ru()}function Ru(){let n=Wr[bs],t=It("skinDesc");if(t.replaceChildren(),n){let e=document.createElement("b");e.textContent=it(`ultra.${bs}`);let i=document.createElement("span");i.textContent=it(`ultraDesc.${bs}`),t.append(ys(bs,"descFace"),e,i)}}It("readyBtn").onclick=()=>{me.unlock(),!kr&&le?.players.length>1&&le.players.every(n=>n.ready||n.id===Ot.id)&&te.requestLock(),Ot.send({t:"ready",ready:!kr}),me.bing()};It("botBtn").onclick=()=>{Ot.send({t:"addBot"}),me.bark()};It("botOutBtn").onclick=()=>Ot.send({t:"removeBot"});It("leaveBtn").onclick=()=>Ot.send({t:"leave"});It("copyBtn").onclick=async()=>{let{ws:n}=Ot;if(Kn&&!n.registered&&!n.isGuest){Zn(it(n.peerFailed?"toast.inviteFail":"toast.inviteWait"));return}let t=Te.active&&Te.inviteLink(n.code)||location.href.split("#")[0];await o_(t)?Zn(Kn?it("toast.copied",{code:n.code}):it("toast.copiedPlain")):Zn(t)};async function o_(n){try{return await navigator.clipboard.writeText(n),!0}catch{let t=document.createElement("textarea");t.value=n,document.body.append(t),t.select();let e=!1;try{e=document.execCommand("copy")}catch{}return t.remove(),e}}It("renameForm").addEventListener("submit",n=>{n.preventDefault();let t=It("renameInput").value.trim();if(It("renameInput").blur(),!t){$a();return}It("nameInput").value=t;try{localStorage.setItem("aura-name",t)}catch{}Ot.send({t:"rename",name:t}),me.quack()});It("chatForm").addEventListener("submit",n=>{n.preventDefault();let t=It("chatInput").value.trim();t&&(Ot.send({t:"chat",text:t}),It("chatInput").value="")});function Cu(n,t){let e=It("chatLog"),i=document.createElement("div"),s=document.createElement("b");for(s.textContent=`${n}: `,i.append(s,document.createTextNode(t)),e.append(i);e.children.length>60;)e.firstChild.remove();e.scrollTop=e.scrollHeight}var Su=0;function l_(n){$s("result");let t=n.winner===Ot.id,e=n.winner===null,i=It("result");i.dataset.outcome=e?"draw":t?"win":"lose";let s={kills:it("reason.kills",{n:7}),time:it("reason.time"),ragequit:it("reason.ragequit")}[n.reason]??"";It("resultTitle").textContent=e?it("result.draw"):gi(cn(t?"win":"lose")),It("resultSub").textContent=`${it(t?"result.win":e?"result.drawSub":"result.lose")} \xB7 ${s}`,It("sixSevenBanner").hidden=!n.sixSeven;let r=It("resultStats");r.replaceChildren();for(let l of n.players){let c=l.stats,h=c.shots?Math.round(c.hitShots/c.shots*100):0,u=document.createElement("div");u.className=`statCol${l.id===n.winner?" winner":""}`;let d=document.createElement("h3");d.append(ys(l.skin,"statFace"),document.createTextNode(l.name)),u.append(d);let f=[[it("stat.kills"),l.kills],[it("stat.deaths"),c.deaths],[it("stat.acc"),`${h}%`],[it("stat.heads"),c.headshots],[it("stat.damage"),Math.round(c.damage)],[it("stat.aura"),Math.round(c.auraEarned).toLocaleString()],[it("stat.wins"),it("room.wins",{n:l.wins})]];for(let[p,v]of f){let g=document.createElement("p"),m=document.createElement("span");m.textContent=p;let x=document.createElement("b");x.textContent=v,g.append(m,x),u.append(g)}r.append(u)}let a=Date.now()+n.resultsMs,o=()=>{It("resultCountdown").textContent=it("result.back",{s:Math.max(0,(a-Date.now())/1e3).toFixed(1)})};o(),clearInterval(Su),Su=setInterval(o,100),Sn.show(!0),document.getElementById("hudGameLayer").hidden=!0,Sn.rain(t?["\u{1F5FF}","67","\u{1F451}","\u2728","\u{1F441}\uFE0F"]:["\u{1F62D}","L","\u{1F480}","\u{1F921}"],70),setTimeout(()=>{de||(Sn.show(!1),document.getElementById("hudGameLayer").hidden=!1)},3200),t&&Te.happytime(),n.sixSeven?(me.vineBoom(),me.say("six seven! six seven!",{pitch:.2,rate:.75})):t?(me.airhorn(),me.say(gi(["sigma","G G easy","skill issue"]),{pitch:.3})):e||(me.sadTrombone(),me.say(gi(["bruh","you are the N P C","skill issue"]),{pitch:.3,lang:"en-US"}))}var wu=0;function c_(){let n=It("ticker"),t=()=>{n.textContent=`\u{1F6A8} ${gi(cn("ticker"))}`};t(),clearInterval(wu),wu=setInterval(t,6700)}function h_(){clearInterval(wu)}var Np=0;function Zn(n){let t=It("toast");t.textContent=n,t.hidden=!1,clearTimeout(Np),Np=setTimeout(()=>{t.hidden=!0},2500)}var Za=It("volume");try{let n=Number(localStorage.getItem("aura-vol"));n>0&&n<=1&&(Za.value=n)}catch{}me.setVolume(Number(Za.value));Za.addEventListener("input",()=>{me.setVolume(Number(Za.value));try{localStorage.setItem("aura-vol",Za.value)}catch{}});window.addEventListener("keydown",n=>{if(n.code==="KeyM"&&n.target.tagName!=="INPUT"){let t=me.toggleMute();Zn(it(t?"toast.muted":"toast.unmuted"))}});Kn&&(It("joinRow").hidden=!1,It("joinRow").addEventListener("submit",n=>{n.preventDefault();let t=It("joinInput").value.trim().toUpperCase();t&&(location.href=Cp(t))}));function Pu(){Qu();for(let n of document.querySelectorAll("#langPick button")){let t=n.dataset.lang===Kr();n.classList.toggle("on",t),n.setAttribute("aria-pressed",t)}Ot.ws?.readyState===1&&(It("connStatus").textContent=it(Ot.ws.isHost?"conn.host":Ot.ws.isGuest?"conn.guest":"conn.server")),Tu(Op),le&&$a()}for(let n of document.querySelectorAll("#langPick button"))n.addEventListener("click",()=>{n.dataset.lang!==Kr()&&(Ju(n.dataset.lang),Pu(),te.reloadWorld(),me.click())});Pu();window.__aura={game:te,net:Ot,sfx:me,hud:Sn,portal:Te,H:ie};function Vp(){return!!Te.settings().disableChat}function Up(){document.body.classList.toggle("noChat",Vp()),me.setHold("portal",!!Te.settings().muteAudio)}function u_(){let n=null,t=null;try{n=sessionStorage.getItem("aura-join-code"),t=sessionStorage.getItem("aura-skip-invite"),sessionStorage.removeItem("aura-join-code")}catch{}let e=n||Te.invite()||Ys;Ap(e&&e===t?null:e),Te.onJoin(i=>{if(!(!i?.room||i.room===Ot.ws?.code)){try{sessionStorage.setItem("aura-join-code",i.room),sessionStorage.removeItem("aura-skip-invite")}catch{}location.reload()}})}async function d_(){let n=t=>{t?.username&&(It("nameInput").value=t.username,It("nameInput").closest("label").hidden=!0,It("renameForm").hidden=!0,le?Ot.send({t:"rename",name:t.username}):Zs())};n(await Te.user()),Te.onLogin(n)}async function f_(){Te.active?(await Te.init(),Te.loadingStart(),$u(Te.locale()),Pu(),Up(),Te.onSettings(Up),u_(),await d_()):$s("home"),Sn.show(!1),te.setAttract([]),Bp(),setTimeout(()=>{ep(),le&&($a(),Au(It("skinPick")),Ru()),Te.loadingStop()},60)}f_();
