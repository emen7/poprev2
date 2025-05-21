import{a as f,j as n}from"./jsx-runtime-c9381026.js";import{r}from"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const P=({isOpen:e,height:t,isPersistent:l,onClose:b,onHeightChange:s,minHeight:i=100,maxHeight:x=600,className:L="",children:Y})=>{const v=r.useRef(null),B=r.useRef(null),[p,y]=r.useState(!1),[u,C]=r.useState(t);r.useEffect(()=>{C(t)},[t]);const I=d=>{d.preventDefault(),y(!0)},$=()=>{y(!1),s&&u!==t&&s(u)};r.useEffect(()=>{const d=U=>{if(p&&v.current){v.current.getBoundingClientRect();const z=window.innerHeight-U.clientY,G=Math.max(i,Math.min(x,z));C(G)}},H=()=>{$()};return p&&(document.addEventListener("mousemove",d),document.addEventListener("mouseup",H)),()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",H)}},[p,i,x,s,t]);const A=["pullup-panel",e?"pullup-panel-open":"",l?"pullup-panel-persistent":"",p?"pullup-panel-dragging":"",L].filter(Boolean).join(" "),F={height:`${u}px`,transform:e?"translateY(0)":`translateY(${u}px)`};return f("div",{className:A,style:F,ref:v,children:[n("div",{className:"pullup-panel-handle",ref:B,onMouseDown:I,children:n("div",{className:"pullup-panel-handle-icon"})}),!l&&n("button",{className:"pullup-panel-close",onClick:b,"aria-label":"Close panel",children:"×"}),n("div",{className:"pullup-panel-content",children:Y})]})};try{P.displayName="PullupPanel",P.__docgenInfo={description:`PullupPanel Component

A panel that slides up from the bottom of the screen.`,displayName:"PullupPanel",props:{isOpen:{defaultValue:null,description:"Whether the pullup panel is open",name:"isOpen",required:!0,type:{name:"boolean"}},height:{defaultValue:null,description:"The height of the pullup panel",name:"height",required:!0,type:{name:"number"}},isPersistent:{defaultValue:null,description:"Whether the pullup panel is in persistent mode (for large screens)",name:"isPersistent",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"Function called when the pullup panel is closed",name:"onClose",required:!1,type:{name:"(() => void)"}},onHeightChange:{defaultValue:null,description:"Function called when the height of the pullup panel changes",name:"onHeightChange",required:!1,type:{name:"((height: number) => void)"}},minHeight:{defaultValue:{value:"100"},description:"The minimum height of the pullup panel",name:"minHeight",required:!1,type:{name:"number"}},maxHeight:{defaultValue:{value:"600"},description:"The maximum height of the pullup panel",name:"maxHeight",required:!1,type:{name:"number"}},className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Children to render inside the pullup panel",name:"children",required:!0,type:{name:"ReactNode"}}}}}catch{}const X={title:"UB Reader/Pullup/PullupPanel",component:P,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Whether the panel is open"},height:{control:"number",description:"Height of the panel in pixels"},isPersistent:{control:"boolean",description:"Whether the panel stays open when clicking outside"},minHeight:{control:"number",description:"Minimum height of the panel in pixels"},maxHeight:{control:"number",description:"Maximum height of the panel in pixels"}}},o=e=>{const[t,l]=r.useState(e.isOpen),[b,s]=r.useState(e.height||300);return f("div",{style:{position:"relative",height:"100vh",overflow:"hidden"},children:[f("div",{style:{padding:"20px"},children:[n("h1",{children:"PullupPanel Demo"}),n("p",{children:"This demonstrates the PullupPanel component. Click the button below to toggle the panel."}),n("button",{onClick:()=>l(!t),style:{padding:"10px 20px",background:"#0088ff",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:t?"Close Panel":"Open Panel"})]}),n(P,{...e,isOpen:t,height:b,onClose:()=>l(!1),onHeightChange:i=>s(i),children:f("div",{style:{padding:"20px"},children:[n("h2",{children:"Pullup Panel Content"}),n("p",{children:"This is the content of the pullup panel. You can drag the handle at the top to resize the panel."}),n("div",{style:{marginTop:"20px"},children:n("button",{onClick:()=>l(!1),style:{padding:"10px 20px",background:"#666",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Close Panel"})})]})})]})},a={render:e=>n(o,{...e}),args:{isOpen:!0,height:300,isPersistent:!1,minHeight:100,maxHeight:600}},c={render:e=>n(o,{...e}),args:{...a.args,isOpen:!1}},h={render:e=>n(o,{...e}),args:{...a.args,isPersistent:!0}},m={render:e=>n(o,{...e}),args:{...a.args,height:400}},g={render:e=>n(o,{...e}),args:{...a.args},parameters:{viewport:{defaultViewport:"mobile1"}}};var w,D,S;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    isOpen: true,
    height: 300,
    isPersistent: false,
    minHeight: 100,
    maxHeight: 600
  }
}`,...(S=(D=a.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var V,O,M;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    isOpen: false
  }
}`,...(M=(O=c.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var N,W,_;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    isPersistent: true
  }
}`,...(_=(W=h.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var q,E,R;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args,
    height: 400
  }
}`,...(R=(E=m.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var k,T,j;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <PullupPanelWrapper {...args} />,
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(j=(T=g.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};const Z=["Default","Closed","Persistent","CustomHeight","MobileView"];export{c as Closed,m as CustomHeight,a as Default,g as MobileView,h as Persistent,Z as __namedExportsOrder,X as default};
