import{a as r,j as e,F as me}from"./jsx-runtime-c9381026.js";import{r as de}from"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const l=({number:t,hasNotes:s=!1,visible:y=!0})=>y?r("div",{className:"paragraph-numbering",children:[s&&e("div",{className:"paragraph-note-indicator",title:"This paragraph has notes",children:"●"}),e("div",{className:"paragraph-number",children:t})]}):null,S=({visible:t=!0,children:s})=>t?r("div",{className:"paragraph-numbering-container",children:[e("div",{className:"paragraph-numbering-column"}),e("div",{className:"paragraph-content",children:s})]}):e(me,{children:s});try{l.displayName="ParagraphNumbering",l.__docgenInfo={description:"Component for displaying paragraph numbers in a vertical column",displayName:"ParagraphNumbering",props:{number:{defaultValue:null,description:"Paragraph number to display",name:"number",required:!0,type:{name:"number"}},hasNotes:{defaultValue:{value:"false"},description:"Whether the paragraph has notes",name:"hasNotes",required:!1,type:{name:"boolean"}},visible:{defaultValue:{value:"true"},description:"Whether the numbering is visible",name:"visible",required:!1,type:{name:"boolean"}}}}}catch{}try{S.displayName="ParagraphNumberingContainer",S.__docgenInfo={description:"Container component for paragraph numbering",displayName:"ParagraphNumberingContainer",props:{visible:{defaultValue:{value:"true"},description:"Whether the numbering is visible",name:"visible",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"Children elements",name:"children",required:!0,type:{name:"ReactNode"}}}}}catch{}const q=de.forwardRef(function({paragraph:s,formatType:y,showNumber:a=!0,useVerticalNumbering:n=!1,isHighlighted:ne=!1,onVisible:he,className:ie="",onClick:I},T){const{id:p,number:o,text:v,hasNotes:x=!1,metadata:se={}}=s,{isIndented:oe,isList:V,listType:_,isTable:le,isTopicChange:pe}=se,H=["paragraph",`paragraph-format-${y}`,ne?"paragraph-highlighted":"",oe?"paragraph-indented":"",V?`paragraph-list paragraph-list-${_}`:"",le?"paragraph-table":"",pe?"paragraph-topic-change":"",n?"paragraph-vertical-numbering":"",ie].filter(Boolean).join(" "),w=ue=>{I&&I(p,ue)},i=typeof o=="string"&&o.includes(".")?o.split(".").pop():o,P=typeof i=="string"?parseInt(i,10)||0:typeof i=="number"?i:0;return V&&_==="numbered"?r("div",{className:H,"data-paragraph-id":p,ref:T,onClick:w,children:[a&&!n&&e("span",{className:"paragraph-number",children:i}),a&&n&&e(l,{number:P,hasNotes:x,visible:a}),r("div",{className:"paragraph-text",children:[r("span",{className:"list-number",children:[o,"."]})," ",e("span",{dangerouslySetInnerHTML:{__html:v}})]})]}):V&&_==="bulleted"?r("div",{className:H,"data-paragraph-id":p,ref:T,onClick:w,children:[a&&!n&&e("span",{className:"paragraph-number",children:i}),a&&n&&e(l,{number:P,hasNotes:x,visible:a}),r("div",{className:"paragraph-text",children:[e("span",{className:"list-bullet",children:"•"})," ",e("span",{dangerouslySetInnerHTML:{__html:v}})]})]}):r("div",{className:H,"data-paragraph-id":p,ref:T,onClick:w,children:[a&&!n&&e("span",{className:"paragraph-number",children:i}),a&&n&&e(l,{number:P,hasNotes:x,visible:a}),e("div",{className:"paragraph-text",dangerouslySetInnerHTML:{__html:v}})]})});try{q.displayName="ParagraphRenderer",q.__docgenInfo={description:`ParagraphRenderer Component

A component that renders a single paragraph with support for:
- Traditional and Modern formatting
- Paragraph numbering
- Highlighting
- Special formatting (indentation, lists, tables, topic changes)`,displayName:"ParagraphRenderer",props:{paragraph:{defaultValue:null,description:"The paragraph to render",name:"paragraph",required:!0,type:{name:"Paragraph"}},formatType:{defaultValue:null,description:"The formatting type to use",name:"formatType",required:!0,type:{name:"enum",value:[{value:'"traditional"'},{value:'"modern"'}]}},showNumber:{defaultValue:{value:"true"},description:"Whether to show paragraph numbers",name:"showNumber",required:!1,type:{name:"boolean"}},useVerticalNumbering:{defaultValue:{value:"false"},description:"Whether to use the new vertical numbering column",name:"useVerticalNumbering",required:!1,type:{name:"boolean"}},isHighlighted:{defaultValue:{value:"false"},description:"Whether this paragraph is highlighted",name:"isHighlighted",required:!1,type:{name:"boolean"}},onVisible:{defaultValue:null,description:"Function called when the paragraph becomes visible",name:"onVisible",required:!1,type:{name:"((paragraphId: string) => void)"}},className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"Function called when the paragraph is clicked",name:"onClick",required:!1,type:{name:"((paragraphId: string, event: MouseEvent<Element, MouseEvent>) => void)"}}}}}catch{}const fe={title:"Content/ParagraphRenderer",component:q,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{paragraph:{control:"object"},formatType:{control:"select",options:["traditional","modern"],description:"The formatting type to use"},showNumber:{control:"boolean",description:"Whether to show paragraph numbers"},useVerticalNumbering:{control:"boolean",description:"Whether to use vertical numbering"},isHighlighted:{control:"boolean",description:"Whether the paragraph is highlighted"}}},u={args:{paragraph:{id:"p1",number:1,text:"This is a sample paragraph with some text content."},formatType:"modern",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!1}},m={args:{paragraph:{id:"p2",number:2,text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},formatType:"modern",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!1}},d={args:{paragraph:{id:"p3",number:3,text:"This paragraph does not display a paragraph number."},formatType:"modern",showNumber:!1,useVerticalNumbering:!1,isHighlighted:!1}},h={args:{paragraph:{id:"p4",number:4,text:"This paragraph uses the traditional formatting style."},formatType:"traditional",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!1}},g={args:{paragraph:{id:"p5",number:5,text:"This paragraph is highlighted to draw attention to it."},formatType:"modern",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!0}},c={args:{paragraph:{id:"p6",number:6,text:"This paragraph uses vertical numbering in the margin.",hasNotes:!0},formatType:"modern",showNumber:!0,useVerticalNumbering:!0,isHighlighted:!1}},b={args:{paragraph:{id:"p7",number:7,text:"This paragraph is indented to show a hierarchical relationship.",metadata:{isIndented:!0}},formatType:"modern",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!1}},f={args:{paragraph:{id:"p8",number:8,text:"This is a numbered list item in a sequence.",metadata:{isList:!0,listType:"numbered"}},formatType:"modern",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!1}},N={args:{paragraph:{id:"p9",number:9,text:"This is a bulleted list item in a collection.",metadata:{isList:!0,listType:"bulleted"}},formatType:"modern",showNumber:!0,useVerticalNumbering:!1,isHighlighted:!1}};var C,L,W;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p1',
      number: 1,
      text: 'This is a sample paragraph with some text content.'
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(W=(L=u.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var R,E,k;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p2',
      number: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(k=(E=m.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var F,M,j;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p3',
      number: 3,
      text: 'This paragraph does not display a paragraph number.'
    },
    formatType: 'modern',
    showNumber: false,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(j=(M=d.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var D,$,B;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p4',
      number: 4,
      text: 'This paragraph uses the traditional formatting style.'
    },
    formatType: 'traditional',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(B=($=h.parameters)==null?void 0:$.docs)==null?void 0:B.source}}};var A,O,U;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p5',
      number: 5,
      text: 'This paragraph is highlighted to draw attention to it.'
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: true
  }
}`,...(U=(O=g.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var z,G,J;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p6',
      number: 6,
      text: 'This paragraph uses vertical numbering in the margin.',
      hasNotes: true
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: true,
    isHighlighted: false
  }
}`,...(J=(G=c.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p7',
      number: 7,
      text: 'This paragraph is indented to show a hierarchical relationship.',
      metadata: {
        isIndented: true
      }
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(X=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p8',
      number: 8,
      text: 'This is a numbered list item in a sequence.',
      metadata: {
        isList: true,
        listType: 'numbered'
      }
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(ee=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ae,re,te;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    paragraph: {
      id: 'p9',
      number: 9,
      text: 'This is a bulleted list item in a collection.',
      metadata: {
        isList: true,
        listType: 'bulleted'
      }
    },
    formatType: 'modern',
    showNumber: true,
    useVerticalNumbering: false,
    isHighlighted: false
  }
}`,...(te=(re=N.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};const Ne=["Default","LongParagraph","WithoutParagraphNumber","TraditionalFormat","HighlightedParagraph","VerticalNumbering","IndentedParagraph","NumberedListItem","BulletedListItem"];export{N as BulletedListItem,u as Default,g as HighlightedParagraph,b as IndentedParagraph,m as LongParagraph,f as NumberedListItem,h as TraditionalFormat,c as VerticalNumbering,d as WithoutParagraphNumber,Ne as __namedExportsOrder,fe as default};
