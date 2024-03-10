import{_ as S,f as w,m as _,c as p,a as g,h as r,v as n,b as t,F as h,g as v,t as i,n as y,d as f,k as B,i as V,r as d,o as c,j,w as I}from"./index-BApqB6x0.js";import{p as x}from"./ProductItem-DAlmY-su.js";import{c as D}from"./cart-DhDnEP8p.js";import{P as N}from"./ProductSwiper-BlSAwsJ9.js";import{B as U}from"./BreadCrumb-BkSsZ1F7.js";import"./axios-Bo0ATomq.js";const E={components:{ProductSwiper:N,BreadCrumb:U},data(){return{productCount:1,tempMainImage:""}},computed:{...w(x,["productData","singleData","productLoading"]),...w(D,["cartLoading"]),relatedData(){return this.productData.filter(e=>e.category===this.singleData.category&&e.title!==this.singleData.title)},arrowData(){const e=this.productData.filter(u=>u.category===this.singleData.category),a=e.findIndex(u=>u.id===this.singleData.id);return a===-1?[]:a===0?[e.slice(-1)[0],e[1]]:a===e.length-1?[e[a-1],e[0]]:[e[a-1],e[a+1]]}},methods:{..._(x,["getProduct","getsingleProduct"]),..._(D,["addCart"]),handleMouseEnter(e){this.tempMainImage=e},handleMouseLeave(){this.tempMainImage=this.singleData.imageUrl}},watch:{singleData(e){this.tempMainImage=e.imageUrl},$route(e){this.getsingleProduct(e.params.id)}},mounted(){this.getsingleProduct(this.$route.params.id)}},F={class:"container flex flex-col my-10 md:flex-row"},T={class:"w-full mx-0 mb-4 img-area md:me-4 md:mb-0"},A={class:"flex flex-col"},R=["src"],z={class:"flex justify-between w-full mt-2"},Y=["onMouseenter"],q=["src"],G=t("div",{class:"absolute top-0 left-0 w-full h-[100px] bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"},null,-1),H={class:"flex flex-col w-full mx-0 info-area md:ms-4"},J={class:"flex items-center mb-4"},K={class:"text-2xl tracking-widest"},O={class:"px-1 leading-6 text-white rounded bg-primary-darker ms-2"},Q={class:"mb-4 leading-8 tracking-wider text-secondary"},W={class:"mb-4 text-secondary"},X={class:"text-sm text-primary"},Z={class:"flex w-full"},$=["disabled"],ee={class:"container flex justify-between"},te={class:"material-symbols-outlined text-primary-darker group-hover:text-white me-2"},ae={class:"material-symbols-outlined text-primary-darker group-hover:text-white ms-2"},se=V('<div class="my-20 bg-main"><div class="container flex flex-col md:flex-row"><div class="flex flex-col justify-center w-full px-10 my-20 note text-secondary"><h3 class="mb-4 text-2xl tracking-widest">注意事項</h3><p class="mb-4 tracking-wider">LEAFY 嚴選天然茶葉，致力於為您提供一場純粹的茶香之旅。</p><p class="mb-4 tracking-wider">為了讓每一葉茶葉都能在您的杯中綻放其最佳風味</p><p class="mb-4 tracking-wider">請您按照以下指南妥善保存茶葉：</p><p class="tracking-wider">開封後請確保茶葉包裝袋緊密封存，避免茶葉受潮或變質。若選擇冷藏或冷凍，請使用密封罐或食品級保鮮袋，以維持茶葉的新鮮度和獨特香氣。</p></div><div class="hidden w-full img md:block"><div class="w-full h-full bg-center bg-cover bg-note"></div></div></div></div>',1),re={class:"my-10 text-2xl text-center md:my-20"};function ie(e,a,u,oe,m,o){const k=d("VueLoading"),L=d("BreadCrumb"),C=d("font-awesome-icon"),M=d("RouterLink"),P=d("ProductSwiper");return c(),p(h,null,[g(k,{active:e.productLoading.getSingle||e.productLoading.getProduct,"can-cancel":!0,"is-full-page":!0},null,8,["active"]),r(t("div",null,[t("div",F,[t("div",T,[t("div",A,[t("img",{class:"w-full object-cover h-[300px] md:h-[400px]",src:m.tempMainImage,alt:"#"},null,8,R),t("div",z,[(c(!0),p(h,null,v(e.singleData.imagesUrl,(s,l)=>(c(),p("div",{class:y(["relative w-full cursor-pointer group",{"mx-4":l!==0&&l!==e.singleData.imagesUrl.length-1}]),onMouseenter:b=>o.handleMouseEnter(s),onMouseleave:a[0]||(a[0]=(...b)=>o.handleMouseLeave&&o.handleMouseLeave(...b)),key:s},[t("img",{class:"w-full object-cover h-[100px]",src:s,alt:"#"},null,8,q),G],42,Y))),128))])])]),t("div",H,[g(L,{class:"mb-4"}),t("div",J,[t("h3",K,i(e.singleData.title),1),t("p",O,i(e.singleData.category),1)]),t("p",Q,i(e.singleData.description),1),t("p",W,"每份重量 : "+i(e.singleData.content)+"g",1),t("p",{class:y(["mb-10 text-4xl text-primary",{"text-red-400":e.singleData.price!==e.singleData.origin_price}])},[f(" NT$"+i(e.singleData.price)+" ",1),r(t("del",{class:"text-sm text-primary"},i(e.singleData.origin_price),513),[[n,e.singleData.price!==e.singleData.origin_price]]),t("span",X,"/"+i(e.singleData.unit),1)],2),t("div",Z,[r(t("input",{type:"number",class:"w-1/2 px-4 py-2 border border-primary focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50 me-2","onUpdate:modelValue":a[1]||(a[1]=s=>m.productCount=s)},null,512),[[B,m.productCount]]),t("button",{type:"button",class:"w-1/3 py-4 text-white transition duration-300 group bg-primary hover:bg-primary-darker ms-2",onClick:a[2]||(a[2]=s=>e.addCart(e.singleData.id,m.productCount)),disabled:e.cartLoading.addCart},[f(" 加入購物車 "),r(g(C,{icon:["fas","spinner"],"spin-pulse":"",class:"text-white"},null,512),[[n,e.cartLoading.addCart]])],8,$)])])]),t("div",ee,[(c(!0),p(h,null,v(o.arrowData,(s,l)=>r((c(),j(M,{class:"flex items-center justify-center px-6 py-2 bg-transparent border group text-primary-darker hover:text-white hover:bg-primary border-primary",to:`/product/${s.id}`,key:s.id},{default:I(()=>[r(t("span",te," arrow_left_alt ",512),[[n,l===0]]),f(" "+i(s.title)+" ",1),r(t("span",ae," arrow_right_alt ",512),[[n,l===1]])]),_:2},1032,["to"])),[[n,o.arrowData.length>=2]])),128))]),se,r(t("h3",re,"相關商品",512),[[n,o.relatedData.length>0]]),g(P,{"swiper-data":o.relatedData},null,8,["swiper-data"])],512),[[n,!e.productLoading.getSingle&&!e.productLoading.getProduct]])],64)}const pe=S(E,[["render",ie]]);export{pe as default};