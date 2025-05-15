import{a as n,j as o}from"./jsx-runtime-c9381026.js";import{r as z}from"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const r=({activeTab:e,onTabSelect:t,className:g=""})=>{const s={display:"flex",borderBottom:"1px solid #eaeaea",backgroundColor:"#f9f9f9",paddingLeft:"16px"},a=b=>({padding:"12px 16px",background:"none",border:"none",cursor:"pointer",fontSize:"14px",color:b?"#1890ff":"#666",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s ease",position:"relative",marginRight:"8px",fontWeight:b?500:"normal",borderBottom:b?"2px solid #1890ff":"none"}),p={fontSize:"16px"},d={fontSize:"14px"};return n("div",{style:s,children:[n("button",{style:a(e==="notes"),onClick:()=>t==null?void 0:t("notes"),children:[o("span",{style:p,children:"📝"}),o("span",{style:d,children:"Notes"})]}),n("button",{style:a(e==="quotes"),onClick:()=>t==null?void 0:t("quotes"),children:[o("span",{style:p,children:"💬"}),o("span",{style:d,children:"Quotes"})]}),n("button",{style:a(e==="settings"),onClick:()=>t==null?void 0:t("settings"),children:[o("span",{style:p,children:"⚙️"}),o("span",{style:d,children:"Settings"})]})]})},E={title:"UB Reader/Pullup/PullupTabs",component:r,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{activeTab:{control:"select",options:["notes","quotes","settings"],description:"The currently active tab"},onTabSelect:{action:"tabSelected",description:"Function called when a tab is selected"},className:{control:"text",description:"Additional CSS class name"}}},u=e=>{const[t,g]=z.useState(e.activeTab||"notes");return n("div",{style:{border:"1px solid #ccc",borderRadius:"4px",overflow:"hidden"},children:[o(r,{...e,activeTab:t,onTabSelect:s=>{var a;g(s),(a=e.onTabSelect)==null||a.call(e,s)}}),n("div",{style:{padding:"20px",minHeight:"200px"},children:[n("h2",{style:{margin:"0 0 10px 0"},children:[t.charAt(0).toUpperCase()+t.slice(1)," Tab Content"]}),n("p",{children:["This area would display the content for the ",t," tab."]})]})]})},l={render:e=>o(u,{...e}),args:{activeTab:"notes"}},i={render:e=>o(u,{...e}),args:{activeTab:"quotes"}},c={render:e=>o(u,{...e}),args:{activeTab:"settings"}},P=`
  :root {
    --tabs-bg-color: #f9f9f9;
    --tabs-border-color: #eaeaea;
    --tab-color: #666;
    --tab-hover-color: #333;
    --tab-hover-bg-color: #f0f0f0;
    --tab-active-color: #1890ff;
    --tab-active-bg-color: #fff;
    --tab-active-indicator-color: #1890ff;
  }

  /* Dark theme */
  .dark-theme {
    --tabs-bg-color: #222;
    --tabs-border-color: #333;
    --tab-color: #aaa;
    --tab-hover-color: #fff;
    --tab-hover-bg-color: #333;
    --tab-active-color: #7fc8f5;
    --tab-active-bg-color: #1a1a1a;
    --tab-active-indicator-color: #7fc8f5;
  }

  /* Add the component styles */
  .pullup-tabs {
    display: flex;
    border-bottom: 1px solid var(--tabs-border-color);
    background-color: var(--tabs-bg-color);
    padding-left: 16px;
  }

  .pullup-tab {
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--tab-color);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    position: relative;
    margin-right: 8px;
  }

  .pullup-tab:hover {
    background-color: var(--tab-hover-bg-color);
    color: var(--tab-hover-color);
  }

  .pullup-tab-active {
    color: var(--tab-active-color);
    font-weight: 500;
  }

  .pullup-tab-active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--tab-active-indicator-color);
  }

  .pullup-tab-icon {
    font-size: 16px;
  }

  .pullup-tab-label {
    font-size: 14px;
  }
`;if(typeof document<"u"){const e=document.createElement("style");e.textContent=P,document.head.appendChild(e)}var f,y,m;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`({
  activeTab,
  onTabSelect,
  className = ''
}) => {
  const tabsContainerStyle = {
    display: 'flex',
    borderBottom: '1px solid #eaeaea',
    backgroundColor: '#f9f9f9',
    paddingLeft: '16px'
  };
  const getTabStyle = (isActive: boolean) => ({
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: isActive ? '#1890ff' : '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    marginRight: '8px',
    fontWeight: isActive ? 500 : 'normal',
    borderBottom: isActive ? '2px solid #1890ff' : 'none'
  });
  const iconStyle = {
    fontSize: '16px'
  };
  const labelStyle = {
    fontSize: '14px'
  };
  return <div style={tabsContainerStyle}>\r
      <button style={getTabStyle(activeTab === 'notes')} onClick={() => onTabSelect?.('notes')}>\r
        <span style={iconStyle}>📝</span>\r
        <span style={labelStyle}>Notes</span>\r
      </button>\r
      <button style={getTabStyle(activeTab === 'quotes')} onClick={() => onTabSelect?.('quotes')}>\r
        <span style={iconStyle}>💬</span>\r
        <span style={labelStyle}>Quotes</span>\r
      </button>\r
      <button style={getTabStyle(activeTab === 'settings')} onClick={() => onTabSelect?.('settings')}>\r
        <span style={iconStyle}>⚙️</span>\r
        <span style={labelStyle}>Settings</span>\r
      </button>\r
    </div>;
}`,...(m=(y=r.parameters)==null?void 0:y.docs)==null?void 0:m.source}}};var v,x,h;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <PullupTabsWrapper {...args} />,
  args: {
    activeTab: 'notes'
  }
}`,...(h=(x=l.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var S,T,C;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <PullupTabsWrapper {...args} />,
  args: {
    activeTab: 'quotes'
  }
}`,...(C=(T=i.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var k,A,D;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <PullupTabsWrapper {...args} />,
  args: {
    activeTab: 'settings'
  }
}`,...(D=(A=c.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};const N=["PullupTabs","Default","QuotesActive","SettingsActive"];export{l as Default,r as PullupTabs,i as QuotesActive,c as SettingsActive,N as __namedExportsOrder,E as default};
