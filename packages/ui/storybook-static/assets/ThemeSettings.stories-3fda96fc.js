import{j as e,a as t}from"./jsx-runtime-c9381026.js";import{T as S}from"./ThemeSettings-38b94576.js";import{T as O}from"./ThemeContext-4511d8c1.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./ThemeToggle-2e81b26e.js";import"./TextAlignmentToggle-f2214db1.js";const k={title:"UI/ThemeSettings",component:S,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{showLabels:{control:"boolean",description:"Whether to show labels next to icons"},showSystemOption:{control:"boolean",description:"Whether to show the system theme option"},alignmentOptions:{control:"array",description:"Which alignment options to show"},showThemeToggle:{control:"boolean",description:"Whether to show the theme toggle"},showAlignmentToggle:{control:"boolean",description:"Whether to show the text alignment toggle"},className:{control:"text",description:"Additional CSS class name"}},decorators:[i=>e(O,{children:e("div",{style:{padding:"2rem",background:"var(--color-background)",color:"var(--color-text-primary)"},children:e(i,{})})})]},r={args:{showLabels:!0,showSystemOption:!0,alignmentOptions:["left","justify","right"],showThemeToggle:!0,showAlignmentToggle:!0}},n={args:{showLabels:!0,showSystemOption:!0,showThemeToggle:!0,showAlignmentToggle:!1}},o={args:{showLabels:!0,alignmentOptions:["left","justify","right","center"],showThemeToggle:!1,showAlignmentToggle:!0}},s={args:{showLabels:!1,showSystemOption:!0,alignmentOptions:["left","justify","right"],showThemeToggle:!0,showAlignmentToggle:!0}},a={render:i=>t("div",{style:{width:"800px",display:"flex",gap:"2rem"},children:[t("div",{style:{flex:"0 0 300px"},children:[e("h2",{style:{marginBottom:"1rem"},children:"Theme Settings"}),e(S,{...i})]}),t("div",{style:{flex:"1 1 auto",padding:"1.5rem",border:"1px solid var(--color-border)",borderRadius:"var(--border-radius-md)",backgroundColor:"var(--color-surface)",textAlign:"var(--text-align)"},children:[e("h3",{style:{marginBottom:"1rem"},children:"Content Preview"}),e("p",{style:{marginBottom:"1rem"},children:"This content will update based on your theme and text alignment settings. Try changing the settings to see how they affect the appearance of this text."}),e("p",{style:{marginBottom:"1rem"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),t("div",{style:{marginTop:"2rem",padding:"1rem",border:"1px solid var(--color-border)",borderRadius:"var(--border-radius-sm)"},children:[e("h4",{style:{marginBottom:"0.5rem"},children:"Sample Card"}),e("p",{children:"This card demonstrates how nested elements inherit the theme styles. The appearance will change based on your selected theme."})]})]})]}),args:{showLabels:!0,showSystemOption:!0,alignmentOptions:["left","justify","right","center"],showThemeToggle:!0,showAlignmentToggle:!0},parameters:{layout:"fullscreen"}};var l,m,g;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    showSystemOption: true,
    alignmentOptions: ['left', 'justify', 'right'],
    showThemeToggle: true,
    showAlignmentToggle: true
  }
}`,...(g=(m=r.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var d,h,c;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    showSystemOption: true,
    showThemeToggle: true,
    showAlignmentToggle: false
  }
}`,...(c=(h=n.parameters)==null?void 0:h.docs)==null?void 0:c.source}}};var u,p,y;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    showLabels: true,
    alignmentOptions: ['left', 'justify', 'right', 'center'],
    showThemeToggle: false,
    showAlignmentToggle: true
  }
}`,...(y=(p=o.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var w,T,b;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    showLabels: false,
    showSystemOption: true,
    alignmentOptions: ['left', 'justify', 'right'],
    showThemeToggle: true,
    showAlignmentToggle: true
  }
}`,...(b=(T=s.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var f,x,v;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <div style={{
    width: '800px',
    display: 'flex',
    gap: '2rem'
  }}>\r
      <div style={{
      flex: '0 0 300px'
    }}>\r
        <h2 style={{
        marginBottom: '1rem'
      }}>Theme Settings</h2>\r
        <ThemeSettings {...args} />\r
      </div>\r
      \r
      <div style={{
      flex: '1 1 auto',
      padding: '1.5rem',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--border-radius-md)',
      backgroundColor: 'var(--color-surface)',
      textAlign: 'var(--text-align)'
    }}>\r
        <h3 style={{
        marginBottom: '1rem'
      }}>Content Preview</h3>\r
        <p style={{
        marginBottom: '1rem'
      }}>\r
          This content will update based on your theme and text alignment settings. Try changing\r
          the settings to see how they affect the appearance of this text.\r
        </p>\r
        <p style={{
        marginBottom: '1rem'
      }}>\r
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt\r
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\r
          laboris nisi ut aliquip ex ea commodo consequat.\r
        </p>\r
        <div style={{
        marginTop: '2rem',
        padding: '1rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-sm)'
      }}>\r
          <h4 style={{
          marginBottom: '0.5rem'
        }}>Sample Card</h4>\r
          <p>\r
            This card demonstrates how nested elements inherit the theme styles. The appearance\r
            will change based on your selected theme.\r
          </p>\r
        </div>\r
      </div>\r
    </div>,
  args: {
    showLabels: true,
    showSystemOption: true,
    alignmentOptions: ['left', 'justify', 'right', 'center'],
    showThemeToggle: true,
    showAlignmentToggle: true
  },
  parameters: {
    layout: 'fullscreen'
  }
}`,...(v=(x=a.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const D=["Default","ThemeOnly","AlignmentOnly","IconsOnly","SettingsDemo"];export{o as AlignmentOnly,r as Default,s as IconsOnly,a as SettingsDemo,n as ThemeOnly,D as __namedExportsOrder,k as default};
