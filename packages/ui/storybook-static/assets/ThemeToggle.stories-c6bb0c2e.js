import{j as a,a as d}from"./jsx-runtime-c9381026.js";import{r as O}from"./index-8b3efc3f.js";import{T as _}from"./ThemeToggle-d4e1568c.js";import"./_commonjsHelpers-de833af9.js";const K={title:"Theme/ThemeToggle",component:_,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{currentTheme:{control:"select",options:["light","dark","sepia"],description:"The current theme"},themes:{control:"object",description:"Available themes"},onChange:{action:"changed",description:"Callback when theme is changed"},showLabels:{control:"boolean",description:"Whether to show theme labels"},size:{control:"select",options:["small","medium","large"],description:"Size of the toggle"}}},s=e=>{const[g,A]=O.useState(e.currentTheme||"light");return d("div",{style:{padding:"20px"},children:[a(_,{...e,currentTheme:g,onChange:i=>{var p;A(i),(p=e.onChange)==null||p.call(e,i)}}),a("div",{style:{marginTop:"20px"},children:d("p",{children:["Current theme: ",g]})})]})},q=[{id:"light",label:"Light",color:"#f5f5f5"},{id:"dark",label:"Dark",color:"#1a1a1a"},{id:"sepia",label:"Sepia",color:"#f4ecd8"}],r={render:e=>a(s,{...e}),args:{currentTheme:"light",themes:q,showLabels:!0,size:"medium"}},o={render:e=>a(s,{...e}),args:{...r.args,currentTheme:"dark"}},n={render:e=>a(s,{...e}),args:{...r.args,currentTheme:"sepia"}},t={render:e=>a(s,{...e}),args:{...r.args,showLabels:!1}},l={render:e=>a(s,{...e}),args:{...r.args,size:"small"}},c={render:e=>a(s,{...e}),args:{...r.args,size:"large"}},m={render:e=>a(s,{...e}),args:{...r.args,themes:[{id:"blue",label:"Blue",color:"#e3f2fd"},{id:"green",label:"Green",color:"#e8f5e9"},{id:"purple",label:"Purple",color:"#f3e5f5"}],currentTheme:"blue"}};var u,h,T;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    currentTheme: 'light',
    themes: defaultThemes,
    showLabels: true,
    size: 'medium'
  }
}`,...(T=(h=r.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var f,b,S;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    currentTheme: 'dark'
  }
}`,...(S=(b=o.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var z,D,W;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    currentTheme: 'sepia'
  }
}`,...(W=(D=n.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var L,k,C;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    showLabels: false
  }
}`,...(C=(k=t.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var w,x,j;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'small'
  }
}`,...(j=(x=l.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var y,v,B;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'large'
  }
}`,...(B=(v=c.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var E,G,P;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <ThemeToggleWrapper {...args} />,
  args: {
    ...Default.args,
    themes: [{
      id: 'blue',
      label: 'Blue',
      color: '#e3f2fd'
    }, {
      id: 'green',
      label: 'Green',
      color: '#e8f5e9'
    }, {
      id: 'purple',
      label: 'Purple',
      color: '#f3e5f5'
    }],
    currentTheme: 'blue'
  }
}`,...(P=(G=m.parameters)==null?void 0:G.docs)==null?void 0:P.source}}};const M=["Default","DarkTheme","SepiaTheme","WithoutLabels","SmallSize","LargeSize","CustomThemes"];export{m as CustomThemes,o as DarkTheme,r as Default,c as LargeSize,n as SepiaTheme,l as SmallSize,t as WithoutLabels,M as __namedExportsOrder,K as default};
