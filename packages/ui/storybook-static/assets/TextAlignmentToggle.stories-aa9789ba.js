import{j as e,a}from"./jsx-runtime-c9381026.js";import{T as b}from"./TextAlignmentToggle-f2214db1.js";import{T}from"./ThemeContext-4511d8c1.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const S={title:"UI/TextAlignmentToggle",component:b,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{showLabels:{control:"boolean",description:"Whether to show labels next to icons"},options:{control:"array",description:"Which alignment options to show"},className:{control:"text",description:"Additional CSS class name"}},decorators:[s=>e(T,{children:e("div",{style:{padding:"2rem",background:"var(--color-background)",color:"var(--color-text-primary)"},children:e(s,{})})})]},t={args:{showLabels:!0,options:["left","justify","right"]}},n={args:{showLabels:!1,options:["left","justify","right"]}},r={args:{showLabels:!0,options:["left","justify","right","center"]}},o={render:s=>a("div",{style:{width:"500px"},children:[e("h2",{style:{marginBottom:"1rem"},children:"Text Alignment Demo"}),e("p",{style:{marginBottom:"1rem"},children:"This demonstrates how the text alignment toggle affects the appearance of content."}),e(b,{...s}),a("div",{style:{marginTop:"2rem",padding:"1rem",border:"1px solid var(--color-border)",textAlign:"var(--text-align)"},children:[e("h3",{children:"Sample Content"}),e("p",{children:"This text will change alignment based on the selected option. Text alignment is an important aspect of readability and design. Different alignment options serve different purposes and can enhance the reading experience in various contexts."}),e("p",{style:{marginTop:"1rem"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})]}),args:{showLabels:!0,options:["left","justify","right","center"]}};var i,l,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    options: ['left', 'justify', 'right']
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var c,d,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    showLabels: false,
    options: ['left', 'justify', 'right']
  }
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,u,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    options: ['left', 'justify', 'right', 'center']
  }
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,x,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <div style={{
    width: '500px'
  }}>\r
      <h2 style={{
      marginBottom: '1rem'
    }}>Text Alignment Demo</h2>\r
      <p style={{
      marginBottom: '1rem'
    }}>\r
        This demonstrates how the text alignment toggle affects the appearance of content.\r
      </p>\r
      <TextAlignmentToggle {...args} />\r
      <div style={{
      marginTop: '2rem',
      padding: '1rem',
      border: '1px solid var(--color-border)',
      textAlign: 'var(--text-align)'
    }}>\r
        <h3>Sample Content</h3>\r
        <p>\r
          This text will change alignment based on the selected option. Text alignment is an important\r
          aspect of readability and design. Different alignment options serve different purposes and\r
          can enhance the reading experience in various contexts.\r
        </p>\r
        <p style={{
        marginTop: '1rem'
      }}>\r
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt\r
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\r
          laboris nisi ut aliquip ex ea commodo consequat.\r
        </p>\r
      </div>\r
    </div>,
  args: {
    showLabels: true,
    options: ['left', 'justify', 'right', 'center']
  }
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};const q=["Default","IconsOnly","AllOptions","AlignmentDemo"];export{o as AlignmentDemo,r as AllOptions,t as Default,n as IconsOnly,q as __namedExportsOrder,S as default};
