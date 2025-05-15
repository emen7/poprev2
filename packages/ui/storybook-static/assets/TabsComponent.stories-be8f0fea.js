import{j as e,a as t}from"./jsx-runtime-c9381026.js";import{r as Q}from"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";function g({tabs:a,activeTab:s,onTabChange:v,orientation:l="horizontal",size:d="medium",className:o=""}){const c=["tabs-component",`tabs-${l}`,`tabs-${d}`,o].filter(Boolean).join(" ");return e("div",{className:c,children:e("div",{className:"tabs-list",role:"tablist","aria-orientation":l,children:a.map(n=>t("button",{className:`tab-button ${s===n.id?"tab-active":""} ${n.disabled?"tab-disabled":""}`,onClick:()=>!n.disabled&&v(n.id),role:"tab","aria-selected":s===n.id,"aria-disabled":n.disabled,tabIndex:s===n.id?0:-1,id:`tab-${n.id}`,"aria-controls":`tabpanel-${n.id}`,children:[n.icon&&e("span",{className:"tab-icon",children:n.icon}),e("span",{className:"tab-label",children:n.label})]},n.id))})})}try{g.displayName="TabsComponent",g.__docgenInfo={description:`TabsComponent

A component for displaying tabs with content.
Supports horizontal and vertical orientations, and different sizes.`,displayName:"TabsComponent",props:{tabs:{defaultValue:null,description:"Array of tab items",name:"tabs",required:!0,type:{name:"TabItem[]"}},activeTab:{defaultValue:null,description:"ID of the currently active tab",name:"activeTab",required:!0,type:{name:"string"}},onTabChange:{defaultValue:null,description:"Callback when tab is changed",name:"onTabChange",required:!0,type:{name:"(tabId: string) => void"}},orientation:{defaultValue:{value:"horizontal"},description:"Orientation of the tabs",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},size:{defaultValue:{value:"medium"},description:"Size of the tabs",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}}}}}catch{}const F={title:"Navigation/TabsComponent",component:g,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{tabs:{control:"object",description:"Array of tab objects"},activeTab:{control:"text",description:"ID of the active tab"},onTabChange:{action:"tabChanged",description:"Callback when tab is changed"},orientation:{control:"select",options:["horizontal","vertical"],description:"Orientation of the tabs"},size:{control:"select",options:["small","medium","large"],description:"Size of the tabs"}}},i=a=>{var l,d;const[s,v]=Q.useState(a.activeTab||((l=a.tabs[0])==null?void 0:l.id));return t("div",{style:{width:"100%",maxWidth:"600px"},children:[e(g,{...a,activeTab:s,onTabChange:o=>{var c;v(o),(c=a.onTabChange)==null||c.call(a,o)}}),e("div",{style:{padding:"20px",border:"1px solid #ddd",borderTop:"none",minHeight:"200px"},children:(d=a.tabs.find(o=>o.id===s))==null?void 0:d.content})]})},Y=[{id:"notes",label:"Notes",content:t("div",{children:[e("h3",{children:"Notes"}),e("p",{children:"Your notes will appear here."})]})},{id:"quotes",label:"Quotes",content:t("div",{children:[e("h3",{children:"Quotes"}),e("p",{children:"Your saved quotes will appear here."})]})},{id:"settings",label:"Settings",content:t("div",{children:[e("h3",{children:"Settings"}),e("p",{children:"Adjust your reading preferences here."})]})}],r={render:a=>e(i,{...a}),args:{tabs:Y,activeTab:"notes",orientation:"horizontal",size:"medium"}},p={render:a=>e(i,{...a}),args:{...r.args,orientation:"vertical"}},u={render:a=>e(i,{...a}),args:{...r.args,size:"small"}},m={render:a=>e(i,{...a}),args:{...r.args,size:"large"}},b={render:a=>e(i,{...a}),args:{...r.args,tabs:[{id:"notes",label:"Notes",icon:"📝",content:t("div",{children:[e("h3",{children:"Notes"}),e("p",{children:"Your notes will appear here."})]})},{id:"quotes",label:"Quotes",icon:"💬",content:t("div",{children:[e("h3",{children:"Quotes"}),e("p",{children:"Your saved quotes will appear here."})]})},{id:"settings",label:"Settings",icon:"⚙️",content:t("div",{children:[e("h3",{children:"Settings"}),e("p",{children:"Adjust your reading preferences here."})]})}]}},h={render:a=>e(i,{...a}),args:{...r.args},parameters:{viewport:{defaultViewport:"mobile1"}}};var f,T,C;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    tabs: defaultTabs,
    activeTab: 'notes',
    orientation: 'horizontal',
    size: 'medium'
  }
}`,...(C=(T=r.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var y,S,z;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    orientation: 'vertical'
  }
}`,...(z=(S=p.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var D,w,N;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'small'
  }
}`,...(N=(w=u.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var q,x,V;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    size: 'large'
  }
}`,...(V=(x=m.parameters)==null?void 0:x.docs)==null?void 0:V.source}}};var W,_,j;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args,
    tabs: [{
      id: 'notes',
      label: 'Notes',
      icon: '📝',
      content: <div>\r
            <h3>Notes</h3>\r
            <p>Your notes will appear here.</p>\r
          </div>
    }, {
      id: 'quotes',
      label: 'Quotes',
      icon: '💬',
      content: <div>\r
            <h3>Quotes</h3>\r
            <p>Your saved quotes will appear here.</p>\r
          </div>
    }, {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      content: <div>\r
            <h3>Settings</h3>\r
            <p>Adjust your reading preferences here.</p>\r
          </div>
    }]
  }
}`,...(j=(_=b.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};var A,I,$;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <TabsComponentWrapper {...args} />,
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...($=(I=h.parameters)==null?void 0:I.docs)==null?void 0:$.source}}};const L=["Default","VerticalTabs","SmallTabs","LargeTabs","TabsWithIcons","MobileView"];export{r as Default,m as LargeTabs,h as MobileView,u as SmallTabs,b as TabsWithIcons,p as VerticalTabs,L as __namedExportsOrder,F as default};
