import{c as h}from"./login-u0PWOpfB.js";import{_ as x,c as l,a as r,b as t,w as c,T as b,r as d,o as u,h as p,k as m,A as y,d as v,e as _}from"./index-BApqB6x0.js";import"./axios-Bo0ATomq.js";const w={data(){return{userName:"",passWord:"",isloginLoading:!1,isShow:!1}},methods:{login(){this.isloginLoading=!0,h(this.userName,this.passWord).then(n=>{const{token:e,expired:i}=n.data;document.cookie=`MyToken=${e};expires=${new Date(i)};path=/;`,this.isloginLoading=!1,this.$router.push("/dashboard")}).catch(()=>{this.isloginLoading=!1,alert("帳號密碼錯誤!")})}},mounted(){setTimeout(()=>{this.isShow=!0},1e3)}},L={class:"container relative"},k={key:0,class:"absolute -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2"},N={class:"flex flex-col w-[500px] border-2 rounded p-4"},V=t("p",{class:"mb-4 text-3xl tracking-widest text-center"},"LOGIN",-1),T=t("label",{class:"mb-2 text-xl",for:"account"},"帳號",-1),C=t("label",{class:"mb-2 text-xl",for:"password"},"密碼",-1);function W(n,e,i,B,s,a){const f=d("VueLoading"),g=d("RouterLink");return u(),l("div",null,[r(f,{active:s.isloginLoading,"can-cancel":!0,"is-full-page":!0},null,8,["active"]),t("div",L,[r(b,{name:"fade","enter-active-class":"transition duration-500","leave-active-class":"transition duration-500","enter-from-class":"opacity-0 translate-y-[300px]","enter-to-class":"translate-y-0 opacity-100","leave-from-class":"translate-y-0 opacity-100","leave-to-class":"opacity-0 translate-y-[300px]"},{default:c(()=>[s.isShow?(u(),l("div",k,[t("div",N,[V,T,p(t("input",{class:"p-2 mb-4 transition duration-300 bg-transparent border focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50",id:"account",type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>s.userName=o),placeholder:"請輸入信箱...",required:""},null,512),[[m,s.userName]]),C,p(t("input",{class:"p-2 mb-4 transition duration-300 bg-transparent border focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50",id:"password",type:"password","onUpdate:modelValue":e[1]||(e[1]=o=>s.passWord=o),onKeyup:e[2]||(e[2]=y((...o)=>a.login&&a.login(...o),["enter"])),placeholder:"請輸入密碼...",required:""},null,544),[[m,s.passWord]]),t("button",{class:"py-2 mb-1 transition duration-300 border hover:bg-primary hover:text-white",type:"button",onClick:e[3]||(e[3]=(...o)=>a.login&&a.login(...o))},"登入"),r(g,{class:"py-2 text-center transition duration-300 border hover:bg-primary hover:text-white",to:"/"},{default:c(()=>[v(" 返回前台")]),_:1})])])):_("",!0)]),_:1})])])}const K=x(w,[["render",W]]);export{K as default};
