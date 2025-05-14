import{a as E,j as l}from"./jsx-runtime-c9381026.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";function s({number:h,text:H,showNumber:G=!0,isHighlighted:i=!1,highlightColor:_="#ffeb3b",className:D="",onClick:k,id:q}){const U=["paragraph-component",i?"paragraph-highlighted":"",D].filter(Boolean).join(" ");return E("div",{className:U,onClick:k,id:q,children:[G&&l("span",{className:"paragraph-number",children:h}),l("div",{className:"paragraph-text",style:i?{backgroundColor:_}:{},children:H})]})}try{s.displayName="ParagraphComponent",s.__docgenInfo={description:`ParagraphComponent

A component for displaying paragraphs with optional paragraph numbers and highlighting.
Used for rendering content in the UB Reader.`,displayName:"ParagraphComponent",props:{number:{defaultValue:null,description:'The paragraph number (e.g., "1:0.1")',name:"number",required:!0,type:{name:"string"}},text:{defaultValue:null,description:"The paragraph text content",name:"text",required:!0,type:{name:"string"}},showNumber:{defaultValue:{value:"true"},description:"Whether to show the paragraph number",name:"showNumber",required:!1,type:{name:"boolean"}},isHighlighted:{defaultValue:{value:"false"},description:"Whether the paragraph is highlighted",name:"isHighlighted",required:!1,type:{name:"boolean"}},highlightColor:{defaultValue:{value:"#ffeb3b"},description:"The color of the highlight",name:"highlightColor",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"Click handler for the paragraph",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)"}},id:{defaultValue:null,description:"ID for the paragraph element",name:"id",required:!1,type:{name:"string"}}}}}catch{}const B={title:"Content/ParagraphComponent",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{number:{control:"text",description:"The paragraph number"},text:{control:"text",description:"The paragraph text content"},showNumber:{control:"boolean",description:"Whether to show the paragraph number"},isHighlighted:{control:"boolean",description:"Whether the paragraph is highlighted"},highlightColor:{control:"color",description:"The color of the highlight"}}},e={args:{number:"1:0.1",text:'THE Universal Father is the God of all creation, the First Source and Center of all things and beings. First think of God as a creator, then as a controller, and lastly as an infinite upholder. The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you. You have created the heaven and the heaven of heavens, with all their hosts; you preserve and control them. By the Sons of God were the universes made. The Creator covers himself with light as with a garment and stretches out the heavens as a curtain." Only the concept of the Universal Father—one God in the place of many gods—enabled mortal man to comprehend the Father as divine creator and infinite controller.',showNumber:!0,isHighlighted:!1}},a={args:{...e.args,isHighlighted:!0,highlightColor:"#ffeb3b"}},t={args:{...e.args,showNumber:!1}},r={args:{...e.args,text:"This is a short paragraph to demonstrate how the component handles brief content."}},n={args:{...e.args,text:"This is a very long paragraph to demonstrate how the component handles extensive content. ".repeat(10)}},o={args:{...e.args},parameters:{viewport:{defaultViewport:"mobile1"}}};var p,d,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    number: '1:0.1',
    text: 'THE Universal Father is the God of all creation, the First Source and Center of all things and beings. First think of God as a creator, then as a controller, and lastly as an infinite upholder. The truth about the Universal Father had begun to dawn upon mankind when the prophet said: "You, God, are alone; there is none beside you. You have created the heaven and the heaven of heavens, with all their hosts; you preserve and control them. By the Sons of God were the universes made. The Creator covers himself with light as with a garment and stretches out the heavens as a curtain." Only the concept of the Universal Father—one God in the place of many gods—enabled mortal man to comprehend the Father as divine creator and infinite controller.',
    showNumber: true,
    isHighlighted: false
  }
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var g,u,m;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isHighlighted: true,
    highlightColor: '#ffeb3b'
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var f,b,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showNumber: false
  }
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var w,y,x;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    text: 'This is a short paragraph to demonstrate how the component handles brief content.'
  }
}`,...(x=(y=r.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var C,T,N;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    text: 'This is a very long paragraph to demonstrate how the component handles extensive content. '.repeat(10)
  }
}`,...(N=(T=n.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var S,F,V;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(V=(F=o.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};const Y=["Default","Highlighted","WithoutNumber","ShortText","LongText","MobileView"];export{e as Default,a as Highlighted,n as LongText,o as MobileView,r as ShortText,t as WithoutNumber,Y as __namedExportsOrder,B as default};
