import{j as E}from"./jsx-runtime-c9381026.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";function l({number:o,title:i,showNumber:x=!0,level:c="h3",className:L="",id:U,onClick:V}){const k=["section-title",`section-title-${c}`,L].filter(Boolean).join(" "),H=c,M=x&&o?`${o}. ${i}`:i;return E(H,{className:k,id:U,onClick:V,children:M})}try{l.displayName="SectionTitle",l.__docgenInfo={description:`SectionTitle Component

A component for displaying section titles in the UB Reader.
Supports different heading levels and optional section numbers.`,displayName:"SectionTitle",props:{number:{defaultValue:null,description:'The section number (e.g., "1", "2.3")',name:"number",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"The section title text",name:"title",required:!0,type:{name:"string"}},showNumber:{defaultValue:{value:"true"},description:"Whether to show the section number",name:"showNumber",required:!1,type:{name:"boolean"}},level:{defaultValue:{value:"h3"},description:"The heading level to use (h1-h6)",name:"level",required:!1,type:{name:"enum",value:[{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'}]}},className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"ID for the section element",name:"id",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"Click handler for the section title",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLElement, MouseEvent>) => void)"}}}}}catch{}const j={title:"Content/SectionTitle",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{number:{control:"text",description:"The section number"},title:{control:"text",description:"The section title text"},showNumber:{control:"boolean",description:"Whether to show the section number"},level:{control:"select",options:["h1","h2","h3","h4","h5","h6"],description:"The heading level to use"},onClick:{action:"clicked",description:"Click handler for the section title"}}},e={args:{number:"1",title:"The Universal Father",showNumber:!0,level:"h3"}},t={args:{...e.args,level:"h1"}},r={args:{...e.args,level:"h2"}},n={args:{...e.args,showNumber:!1}},a={args:{number:"5",title:"Personality of the Universal Father and the Nature of Divine Reality in the Material Universe",showNumber:!0,level:"h3"}},s={args:{number:"3.2",title:"The Nature of God",showNumber:!0,level:"h4"}};var u,m,h;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    number: '1',
    title: 'The Universal Father',
    showNumber: true,
    level: 'h3'
  }
}`,...(h=(m=e.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var d,p,g;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    level: 'h1'
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var v,f,b;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    level: 'h2'
  }
}`,...(b=(f=r.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var N,T,y;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showNumber: false
  }
}`,...(y=(T=n.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var S,w,_;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    number: '5',
    title: 'Personality of the Universal Father and the Nature of Divine Reality in the Material Universe',
    showNumber: true,
    level: 'h3'
  }
}`,...(_=(w=a.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};var C,D,q;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    number: '3.2',
    title: 'The Nature of God',
    showNumber: true,
    level: 'h4'
  }
}`,...(q=(D=s.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};const R=["Default","H1Level","H2Level","WithoutNumber","LongTitle","Subsection"];export{e as Default,t as H1Level,r as H2Level,a as LongTitle,s as Subsection,n as WithoutNumber,R as __namedExportsOrder,j as default};
