import{_ as u,o as h,c as _,b as t,n as d,a as e,w as n,d as i,r as s,m as y,h as k,v as w}from"./index-BApqB6x0.js";import{a as $,b as L}from"./login-u0PWOpfB.js";import{t as B}from"./token-C3mJysE-.js";import{B as C}from"./BreadCrumb-BkSsZ1F7.js";import{_ as V}from"./leafy_logo-removebg-zq9z6sGz.js";import"./axios-Bo0ATomq.js";const A={data(){return{currentPath:"/dashboard"}},watch:{$route(o){this.currentPath=o.path}},mounted(){this.currentPath=this.$route.path}},N={class:"fixed w-1/6 h-screen p-4 text-black list-none border-r"},R={class:"flex flex-col"},P=t("li",{class:"mb-6"},[t("div",{class:"flex justify-center"},[t("img",{class:"object-cover w-20 h-16",src:V,alt:"logo"})])],-1),j=t("span",{class:"text-2xl material-symbols-outlined me-2"}," category ",-1),E=t("span",{class:"text-2xl material-symbols-outlined me-2"}," list_alt ",-1);function O(o,c,p,m,r,l){const a=s("RouterLink");return h(),_("div",null,[t("nav",N,[t("ul",R,[P,t("li",{class:d(["mb-1 transition rounded hover:text-primary-darker hover:bg-gray-100 during-300",{"bg-gray-100 text-primary-darker":r.currentPath==="/dashboard"}])},[e(a,{class:"flex items-center p-2",to:"/dashboard"},{default:n(()=>[j,i(" 商品表單 ")]),_:1})],2),t("li",{class:d(["transition rounded hover:text-primary-darker hover:bg-gray-100 during-300",{"bg-gray-100 text-primary-darker":r.currentPath==="/dashboard/order"}])},[e(a,{class:"flex items-center p-2",to:"/dashboard/order"},{default:n(()=>[E,i(" 訂單管理 ")]),_:1})],2)])])])}const T=u(A,[["render",O]]),F={components:{BreadCrumb:C,NavBar:T},data(){return{islogoutLoading:!1,isAllow:!1}},methods:{...y(B,["setHeaderToken"]),isloginCheck(){$().then(o=>{o.data.success?this.isAllow=!0:this.$router.push("/login")}).catch(()=>{this.$router.push("/login")})},loginOut(){this.islogoutLoading=!0,L().then(()=>{this.islogoutLoading=!1,this.$router.push("/login")}).catch(()=>{alert("登出失敗")})}},mounted(){this.isAllow=!1,this.setHeaderToken(),this.isloginCheck()}},H={class:"flex flex-col h-screen"},S={class:"flex-1 pt-10 ms-1/6"},Y={class:"bg-dark ms-1/6"},z={class:"container text-center text-secondary"},D=t("h3",{class:"py-2 text-xl"},"LEAFY",-1),I={class:"flex justify-center pb-2 text-xs"},q=t("p",{class:"pb-4 text-xs"},"LEAFY © 2024 copyright",-1);function G(o,c,p,m,r,l){const a=s("VueLoading"),g=s("NavBar"),x=s("BreadCrumb"),f=s("RouterView"),b=s("RouterLink");return k((h(),_("div",H,[e(a,{active:r.islogoutLoading,"can-cancel":!0,"is-full-page":!0},null,8,["active"]),e(g),t("div",S,[e(x,{class:"container"},{default:n(()=>[t("button",{type:"button",class:"px-2 py-1 text-sm transition duration-300 bg-transparent border rounded-sm hover:bg-primary text-primary hover:text-white",onClick:c[0]||(c[0]=(...v)=>l.loginOut&&l.loginOut(...v))},"登出")]),_:1}),e(f,{class:"h-screen"})]),t("footer",Y,[t("div",z,[D,t("div",I,[t("p",null,[i(" 本網站僅供個人作品使用，不提供商業用途 | "),e(b,{to:"/"},{default:n(()=>[i("返回前台")]),_:1})])]),q])])],512)),[[w,r.isAllow]])}const X=u(F,[["render",G]]);export{X as default};
