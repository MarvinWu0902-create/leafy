import{a as o}from"./axios-Bo0ATomq.js";var i={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"marvinapipath",BASE_URL:"/leafy/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:a}=i,p=(s,t)=>o.post(`${a}/admin/signin`,{username:s,password:t}),n=()=>o.post(`${a}/api/user/check`,null),c=()=>o.post(`${a}/logout`);export{n as a,c as b,p as c};
