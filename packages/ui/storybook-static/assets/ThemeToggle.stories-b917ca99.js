import{j as e,a}from"./jsx-runtime-c9381026.js";import{T as b}from"./ThemeToggle-2e81b26e.js";import{T as f}from"./ThemeContext-4511d8c1.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const k={title:"UI/ThemeToggle",component:b,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{showLabels:{control:"boolean",description:"Whether to show labels next to icons"},showSystemOption:{control:"boolean",description:"Whether to show the system theme option"},className:{control:"text",description:"Additional CSS class name"}},decorators:[n=>e(f,{children:e("div",{style:{padding:"2rem",background:"var(--color-background)",color:"var(--color-text-primary)"},children:e(n,{})})})]},r={args:{showLabels:!0,showSystemOption:!0}},o={args:{showLabels:!1,showSystemOption:!0}},t={args:{showLabels:!0,showSystemOption:!1}},s={render:n=>a("div",{children:[e("h2",{style:{marginBottom:"1rem"},children:"Theme Toggle Demo"}),e("p",{style:{marginBottom:"1rem"},children:"This demonstrates how the theme toggle affects the appearance of content."}),e(b,{...n}),a("div",{style:{marginTop:"2rem",padding:"1rem",border:"1px solid var(--color-border)"},children:[e("h3",{children:"Sample Content"}),e("p",{children:"This text will change appearance based on the selected theme. The theme affects colors, fonts, and other visual elements."}),a("ul",{style:{marginTop:"1rem"},children:[e("li",{children:"Dark theme: High contrast, dark background"}),e("li",{children:"Light theme: Standard light background"}),e("li",{children:"System theme: Follows your system preferences"})]})]})]}),args:{showLabels:!0,showSystemOption:!0}};var l,m,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    showSystemOption: true
  }
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var h,c,d;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    showLabels: false,
    showSystemOption: true
  }
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,g,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    showSystemOption: false
  }
}`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var y,w,T;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <div>\r
      <h2 style={{
      marginBottom: '1rem'
    }}>Theme Toggle Demo</h2>\r
      <p style={{
      marginBottom: '1rem'
    }}>\r
        This demonstrates how the theme toggle affects the appearance of content.\r
      </p>\r
      <ThemeToggle {...args} />\r
      <div style={{
      marginTop: '2rem',
      padding: '1rem',
      border: '1px solid var(--color-border)'
    }}>\r
        <h3>Sample Content</h3>\r
        <p>\r
          This text will change appearance based on the selected theme. The theme affects colors,\r
          fonts, and other visual elements.\r
        </p>\r
        <ul style={{
        marginTop: '1rem'
      }}>\r
          <li>Dark theme: High contrast, dark background</li>\r
          <li>Light theme: Standard light background</li>\r
          <li>System theme: Follows your system preferences</li>\r
        </ul>\r
      </div>\r
    </div>,
  args: {
    showLabels: true,
    showSystemOption: true
  }
}`,...(T=(w=s.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const D=["Default","IconsOnly","WithoutSystemOption","ThemeDemo"];export{r as Default,o as IconsOnly,s as ThemeDemo,t as WithoutSystemOption,D as __namedExportsOrder,k as default};
