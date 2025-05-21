import{j as V}from"./jsx-runtime-c9381026.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const i=({primary:e=!1,size:a="medium",backgroundColor:_,label:C,disabled:s=!1,...q})=>V("button",{type:"button",style:{fontFamily:"'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",fontWeight:700,border:0,borderRadius:"3em",cursor:s?"not-allowed":"pointer",display:"inline-block",lineHeight:1,opacity:s?.5:1,color:e?"white":"#333",backgroundColor:_||(e?"#1ea7fd":"transparent"),boxShadow:e?"none":"rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset",fontSize:a==="small"?"12px":a==="large"?"16px":"14px",padding:a==="small"?"10px 16px":a==="large"?"12px 24px":"11px 20px"},disabled:s,onClick:q.onClick,children:C});try{i.displayName="SimpleButton",i.__docgenInfo={description:"Primary UI component for user interaction",displayName:"SimpleButton",props:{label:{defaultValue:null,description:"Button contents",name:"label",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"Optional click handler",name:"onClick",required:!1,type:{name:"(() => void)"}},primary:{defaultValue:{value:"false"},description:"Is this the principal call to action on the page?",name:"primary",required:!1,type:{name:"boolean"}},backgroundColor:{defaultValue:null,description:"What background color to use",name:"backgroundColor",required:!1,type:{name:"string"}},size:{defaultValue:{value:"medium"},description:"How large should the button be?",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},disabled:{defaultValue:{value:"false"},description:"Is the button disabled?",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const N={title:"Examples/SimpleButton",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{backgroundColor:{control:"color"}}},r={args:{primary:!0,label:"Button"}},t={args:{label:"Button"}},o={args:{size:"large",label:"Button"}},n={args:{size:"small",label:"Button"}},l={args:{disabled:!0,label:"Button"}};var u,c,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    primary: true,
    label: 'Button'
  }
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var d,m,g;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Button'
  }
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var b,y,f;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    size: 'large',
    label: 'Button'
  }
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var x,S,B;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    size: 'small',
    label: 'Button'
  }
}`,...(B=(S=n.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var h,k,v;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Button'
  }
}`,...(v=(k=l.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};const P=["Primary","Secondary","Large","Small","Disabled"];export{l as Disabled,o as Large,r as Primary,t as Secondary,n as Small,P as __namedExportsOrder,N as default};
