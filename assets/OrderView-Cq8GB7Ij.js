import{f as x,m as f,_ as C,o as r,c,j as O,e as v,a as u,w as g,b as t,t as n,d as V,n as B,F as T,g as k,h as S,k as j,r as d}from"./index-BApqB6x0.js";import{t as $}from"./token-C3mJysE-.js";import{M as L,_ as M,s as D,o as _,P as H}from"./swal-DyEkD7xw.js";import{m as y}from"./modal-DzMg0S85.js";import{f as P}from"./time-CocRQhox.js";import{T as U}from"./ToastCard-DmYN61V9.js";import"./axios-Bo0ATomq.js";const q={components:{ModalComponent:L,SwalModal:M},mixins:[D,P],data(){return{modalOrder:{},isswalShow:!1,delProducttempID:""}},watch:{tempOrder(e){this.modalOrder={...e}}},computed:{...x(y,["modalStatus"]),...x(_,["tempOrder","tempProductId"]),headerTitle(){let e="";return this.modalStatus==="get"&&(e=`訂單編號 : ${this.modalOrder.id}`),e}},methods:{...f(y,["closeModal"]),...f(_,["adjustOrder"]),deleteClick(e){this.isswalShow=!0,this.delProducttempID=e},delorderProduct(){delete this.modalOrder.products[this.delProducttempID]},swalHandler(e){e==="confirmed"&&(this.delorderProduct(),this.adjustOrder(this.modalOrder)),this.isswalShow=!1,this.delProducttempID=""}},mounted(){this.newOrder={}}},E={class:"p-4 text-white"},F={class:"p-2 bg-gray-400/20"},z={class:"grid grid-cols-2 gap-4"},A={class:"col-span-1"},G=t("h3",{class:"py-2 mt-4 font-bold border-b-2"},"訂購資訊",-1),J={class:"mt-4 space-y-4"},K={class:"flex justify-between"},Q=t("label",{for:"create-time"},"建立時間 : ",-1),R={class:"flex justify-between"},W=t("label",{for:"e-mail"},"Email : ",-1),X={class:"flex justify-between"},Y=t("label",{for:"e-mail"},"收件人姓名 : ",-1),Z={class:"flex justify-between"},tt=t("label",{for:"e-mail"},"電話 : ",-1),et={class:"flex justify-between"},st=t("label",{for:"e-mail"},"地址 : ",-1),ot={class:"flex justify-between"},nt=t("label",{for:"e-mail"},"備註 : ",-1),lt={class:"col-span-1"},rt={class:"flex items-center justify-between py-2 mt-3 border-b-2"},at=t("h3",{class:"font-bold"},"商品內容",-1),it=t("span",{class:"text-sm"},"訂單金額 : ",-1),dt={class:"text-xl font-bold text-red-400"},ct={class:"mt-4 space-y-1"},ut={class:"flex justify-between"},mt={class:"flex w-full"},ht={class:"w-24 h-20"},pt=["src"],ft={class:"flex flex-col items-center justify-center w-24"},_t={class:"flex items-center justify-end w-full"},wt=t("p",{class:"text-sm"},"數量 : ",-1),bt=["onUpdate:modelValue"],gt={type:"button",class:"flex items-center justify-center group"},xt=["onClick"];function yt(e,a,I,N,s,i){const w=d("SwalModal"),b=d("ModalComponent");return r(),c("div",null,[s.isswalShow?(r(),O(w,{key:0,title:e.swalConfig.title,text:e.swalConfig.text,icon:e.swalConfig.icon,showCancelButton:e.swalConfig.showCancelButton,confirmButtonText:e.swalConfig.confirmButtonText,cancelButtonText:e.swalConfig.cancelButtonText,onStatus:i.swalHandler},null,8,["title","text","icon","showCancelButton","confirmButtonText","cancelButtonText","onStatus"])):v("",!0),u(b,null,{header:g(()=>[t("div",E,n(i.headerTitle),1)]),section:g(()=>[t("div",F,[t("p",null,[V("訂單狀態 : "),t("span",{class:B({"text-green-600":s.modalOrder.is_paid,"text-red-600":!s.modalOrder.is_paid})},n(s.modalOrder.is_paid?"已付款":"未付款"),3)])]),t("div",z,[t("div",A,[G,t("ul",J,[t("li",K,[Q,t("p",null,n(e.formatTimestamp(s.modalOrder.create_at*1e3)),1)]),t("li",R,[W,t("p",null,n(s.modalOrder.user.email),1)]),t("li",X,[Y,t("p",null,n(s.modalOrder.user.name),1)]),t("li",Z,[tt,t("p",null,n(s.modalOrder.user.tel),1)]),t("li",et,[st,t("p",null,n(s.modalOrder.user.address),1)]),t("li",ot,[nt,t("p",null,n(s.modalOrder.message),1)])])]),t("div",lt,[t("div",rt,[at,t("p",null,[it,t("span",dt,n(s.modalOrder.total),1)])]),t("ul",ct,[(r(!0),c(T,null,k(s.modalOrder.products,(l,m)=>{var h,o;return r(),c("li",{key:m},[t("div",ut,[t("div",mt,[t("div",ht,[t("img",{class:"object-cover w-full h-full",src:(h=l==null?void 0:l.product)==null?void 0:h.imageUrl,alt:"#"},null,8,pt)]),t("div",ft,[t("p",null,n((o=l==null?void 0:l.product)==null?void 0:o.title),1),t("p",null,"$"+n(l.final_total)+" NTD",1)])]),t("div",_t,[wt,S(t("input",{class:"w-20 h-8 p-1 mx-1 text-center border rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30",type:"number","onUpdate:modelValue":p=>l.qty=p},null,8,bt),[[j,l.qty]]),t("button",gt,[t("span",{class:"text-gray-200 transition duration-300 material-symbols-outlined group-hover:text-red-500",onClick:p=>i.deleteClick(m)}," delete ",8,xt)])])])])}),128))])])])]),footer:g(()=>[t("button",{class:"px-4 py-2 transition duration-200 border rounded hover:text-white hover:bg-gray-700 me-1",type:"button",onClick:a[0]||(a[0]=(...l)=>e.closeModal&&e.closeModal(...l))},"關閉"),t("button",{class:"px-4 py-2 text-white transition duration-200 bg-gray-700 border rounded hover:bg-gray-800",type:"button",onClick:a[1]||(a[1]=l=>e.adjustOrder(s.modalOrder))},"更新訂單")]),_:1})])}const Ct=C(q,[["render",yt]]),Ot={components:{OrderModal:Ct,PaginationBtn:H,ToastCard:U,SwalModal:M},mixins:[D,P],data(){return{orderNumber:"",isswalShow:"",deltempOrderId:""}},computed:{...x(_,["orderData","paginationData","orderLoading","resInfo"]),filterOrderData(){return this.orderData.filter(e=>this.orderNumber===""?!0:e.id.includes(this.orderNumber))}},methods:{...f($,["setHeaderToken"]),...f(_,["getOrder","orderBtnClick","deleteOrder"]),deleteClick(e){this.isswalShow=!0,this.deltempOrderId=e},swalHandler(e){e==="confirmed"&&this.deleteOrder(this.deltempOrderId),this.isswalShow=!1,this.delProducttempID=""}},mounted(){this.setHeaderToken(),this.getOrder(1)}},vt={class:"container"},Bt={class:"flex justify-between my-4"},Tt={class:"w-full mb-10 border"},kt=t("thead",{class:"bg-gray-200/50"},[t("tr",null,[t("th",{class:"p-2 font-normal"},"訂單時間"),t("th",{class:"p-2 font-normal"},"訂單編號"),t("th",{class:"p-2 font-normal"},"品項"),t("th",{class:"p-2 font-normal"},"金額"),t("th",{class:"p-2 font-normal"},"訂單狀態"),t("th",{class:"p-2 font-normal"},"付款日期"),t("th"),t("th")])],-1),St={class:"p-2 text-center"},jt={class:"p-2 text-center"},Mt={class:"p-2 text-center"},Dt={class:"p-2 text-center"},Pt={class:"p-2 text-center"},It={class:"w-20"},Nt=["onClick"],Vt={class:"w-20"},$t=["onClick"];function Lt(e,a,I,N,s,i){const w=d("ToastCard"),b=d("OrderModal"),l=d("SwalModal"),m=d("VueLoading"),h=d("PaginationBtn");return r(),c("div",null,[u(w,{"toast-msg":e.resInfo,"show-time":2e3},null,8,["toast-msg"]),u(b),s.isswalShow?(r(),O(l,{key:0,title:e.swalConfig.title,text:e.swalConfig.text,icon:e.swalConfig.icon,showCancelButton:e.swalConfig.showCancelButton,confirmButtonText:e.swalConfig.confirmButtonText,cancelButtonText:e.swalConfig.cancelButtonText,onStatus:i.swalHandler},null,8,["title","text","icon","showCancelButton","confirmButtonText","cancelButtonText","onStatus"])):v("",!0),t("div",vt,[u(m,{active:e.orderLoading.getOrder||e.orderLoading.adjustOrder||e.orderLoading.deleteOrder,"can-cancel":!0,"is-full-page":!0},null,8,["active"]),t("div",Bt,[S(t("input",{type:"text",class:"w-1/6 p-2 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50",placeholder:"請輸入查詢訂單編號","onUpdate:modelValue":a[0]||(a[0]=o=>s.orderNumber=o)},null,512),[[j,s.orderNumber]])]),t("table",Tt,[kt,t("tbody",null,[(r(!0),c(T,null,k(i.filterOrderData,o=>(r(),c("tr",{class:"border-b",key:o.id},[t("td",St,n(e.formatTimestamp(o.create_at*1e3)),1),t("td",jt,n(o.id),1),t("td",Mt,n(Object.keys(o.products).length),1),t("td",Dt,n(o.total),1),t("td",{class:B(["p-2 text-center",{"text-green-600":o.is_paid,"text-red-600":!o.is_paid}])},n(o.is_paid?"已付款":"未付款"),3),t("td",Pt,n(o.paid_date?e.formatTimestamp(o.paid_date*1e3):""),1),t("td",It,[t("button",{class:"px-2 py-1 text-sm font-bold transition duration-200 bg-transparent border rounded text-stone-400 border-stone-400 hover:text-white hover:bg-stone-500",onClick:p=>e.orderBtnClick("get",o.id)},"查詢訂單",8,Nt)]),t("td",Vt,[t("button",{class:"px-2 py-1 text-sm font-bold text-red-400 transition duration-200 bg-transparent border border-red-400 rounded hover:text-white hover:bg-red-500",onClick:p=>i.deleteClick(o.id)},"刪除",8,$t)])]))),128))])]),u(h,{"pagination-data":e.paginationData},null,8,["pagination-data"])])])}const Gt=C(Ot,[["render",Lt]]);export{Gt as default};