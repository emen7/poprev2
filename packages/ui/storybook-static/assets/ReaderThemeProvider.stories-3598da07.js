import{j as e,a as s}from"./jsx-runtime-c9381026.js";import{r as m}from"./index-8b3efc3f.js";import{T as y}from"./ThemeToggle-d4e1568c.js";import"./_commonjsHelpers-de833af9.js";const D=m.createContext(void 0);function o({children:t,initialUITheme:d="light",initialContentTheme:l="modern",persistTheme:i=!0,uiThemeStorageKey:g="ub-reader-ui-theme",contentThemeStorageKey:f="ub-reader-content-theme"}){const[r,E]=m.useState(()=>i&&typeof window<"u"&&localStorage.getItem(g)||d),[h,N]=m.useState(()=>i&&typeof window<"u"&&localStorage.getItem(f)||l),V=n=>{E(n),i&&typeof window<"u"&&localStorage.setItem(g,n)},L=n=>{N(n),i&&typeof window<"u"&&localStorage.setItem(f,n)};m.useEffect(()=>{typeof document<"u"&&(document.documentElement.classList.remove("theme-light","theme-dark","theme-sepia"),document.documentElement.classList.remove("content-modern","content-traditional"),document.documentElement.classList.add(`theme-${r}`),document.documentElement.classList.add(`content-${h}`))},[r,h]);const O={uiTheme:r,contentTheme:h,setUITheme:V,setContentTheme:L};return e(D.Provider,{value:O,children:e("div",{className:`reader-theme-provider theme-${r} content-${h}`,children:t})})}function v(){const t=m.useContext(D);if(t===void 0)throw new Error("useReaderTheme must be used within a ReaderThemeProvider");return t}try{o.displayName="ReaderThemeProvider",o.__docgenInfo={description:`ReaderThemeProvider Component

A context provider for managing UI and content themes in the UB Reader.
Supports light, dark, and sepia UI themes, and modern and traditional content themes.`,displayName:"ReaderThemeProvider",props:{children:{defaultValue:null,description:"The children to render within the theme provider",name:"children",required:!0,type:{name:"ReactNode"}},initialUITheme:{defaultValue:{value:"light"},description:"The initial UI theme",name:"initialUITheme",required:!1,type:{name:"enum",value:[{value:'"dark"'},{value:'"light"'},{value:'"sepia"'}]}},initialContentTheme:{defaultValue:{value:"modern"},description:"The initial content theme",name:"initialContentTheme",required:!1,type:{name:"enum",value:[{value:'"traditional"'},{value:'"modern"'}]}},persistTheme:{defaultValue:{value:"true"},description:"Whether to store theme preferences in localStorage",name:"persistTheme",required:!1,type:{name:"boolean"}},uiThemeStorageKey:{defaultValue:{value:"ub-reader-ui-theme"},description:"The localStorage key for the UI theme",name:"uiThemeStorageKey",required:!1,type:{name:"string"}},contentThemeStorageKey:{defaultValue:{value:"ub-reader-content-theme"},description:"The localStorage key for the content theme",name:"contentThemeStorageKey",required:!1,type:{name:"string"}}}}}catch{}try{v.displayName="useReaderTheme",v.__docgenInfo={description:"Hook to use the theme context",displayName:"useReaderTheme",props:{}}}catch{}const K={title:"Theme/ReaderThemeProvider",component:o,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{initialUITheme:{control:"select",options:["light","dark","sepia"],description:"The initial UI theme"},initialContentTheme:{control:"select",options:["modern","traditional"],description:"The initial content theme"},persistTheme:{control:"boolean",description:"Whether to store theme preferences in localStorage"}}},T=()=>{const{uiTheme:t,contentTheme:d,setUITheme:l,setContentTheme:i}=v();return s("div",{style:{padding:"20px",minHeight:"100vh"},children:[e("h1",{children:"Reader Theme Provider Demo"}),e("p",{children:"This demonstrates the ReaderThemeProvider component. Use the theme toggles below to switch between different UI and content themes."}),s("div",{style:{marginBottom:"2rem"},children:[e("h2",{children:"UI Theme"}),e(y,{themes:[{id:"light",label:"Light",color:"#ffffff"},{id:"dark",label:"Dark",color:"#1a1a1a"},{id:"sepia",label:"Sepia",color:"#f4ecd8"}],currentTheme:t,onChange:r=>l(r)})]}),s("div",{style:{marginBottom:"2rem"},children:[e("h2",{children:"Content Theme"}),e(y,{themes:[{id:"modern",label:"Modern",color:"#0088ff"},{id:"traditional",label:"Traditional",color:"#947a62"}],currentTheme:d,onChange:r=>i(r)})]}),s("div",{style:{marginTop:"2rem",padding:"20px",border:"1px solid var(--border-color)"},children:[e("h2",{children:"Sample Content"}),e("p",{children:"This is sample content to demonstrate how the theme affects the appearance of text and other elements. The UI theme controls the background color, text color, and other UI elements, while the content theme controls the typography and spacing."}),e("h3",{children:"Section Title"}),e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."}),s("p",{children:[e("a",{href:"#",children:"This is a link"})," that demonstrates how links appear in different themes."]})]}),e("div",{style:{marginTop:"1rem",fontSize:"0.8rem",color:"var(--text-color)"},children:s("p",{children:["Current theme: UI: ",e("strong",{children:t}),", Content: ",e("strong",{children:d})]})})]})},a={render:t=>e(o,{...t,children:e(T,{})}),args:{initialUITheme:"light",initialContentTheme:"modern",persistTheme:!1}},c={render:t=>e(o,{...t,children:e(T,{})}),args:{...a.args,initialUITheme:"dark"}},u={render:t=>e(o,{...t,children:e(T,{})}),args:{...a.args,initialUITheme:"sepia"}},p={render:t=>e(o,{...t,children:e(T,{})}),args:{...a.args,initialContentTheme:"traditional"}};var I,S,R;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <ReaderThemeProvider {...args}>\r
      <ThemeDemo />\r
    </ReaderThemeProvider>,
  args: {
    initialUITheme: 'light',
    initialContentTheme: 'modern',
    persistTheme: false
  }
}`,...(R=(S=a.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var U,C,w;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => <ReaderThemeProvider {...args}>\r
      <ThemeDemo />\r
    </ReaderThemeProvider>,
  args: {
    ...Default.args,
    initialUITheme: 'dark'
  }
}`,...(w=(C=c.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var x,P,_;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ReaderThemeProvider {...args}>\r
      <ThemeDemo />\r
    </ReaderThemeProvider>,
  args: {
    ...Default.args,
    initialUITheme: 'sepia'
  }
}`,...(_=(P=u.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var b,k,q;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <ReaderThemeProvider {...args}>\r
      <ThemeDemo />\r
    </ReaderThemeProvider>,
  args: {
    ...Default.args,
    initialContentTheme: 'traditional'
  }
}`,...(q=(k=p.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const W=["Default","DarkTheme","SepiaTheme","TraditionalContentTheme"];export{c as DarkTheme,a as Default,u as SepiaTheme,p as TraditionalContentTheme,W as __namedExportsOrder,K as default};
