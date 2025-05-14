import{j as t,a as s}from"./jsx-runtime-c9381026.js";import{UBParagraph as y}from"./UBParagraph.stories-079ec294.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const v=({section:e={number:0,title:"No section title provided",paragraphs:[]},showParagraphNumbers:g=!0,className:x=""})=>{const n={marginBottom:"3em"},f={fontSize:"1.5em",marginBottom:"1.5em",fontWeight:"bold",color:"#333"},b={position:"relative"};return e?s("div",{style:n,id:`section-${e.number}`,children:[s("h2",{style:f,children:[e.number!==void 0&&`${e.number}. `,e.title||"Untitled Section"]}),t("div",{style:b,children:e.paragraphs&&e.paragraphs.length>0?e.paragraphs.map((i,o)=>t(y,{paragraph:i,isTopicChange:o>0&&o%3===0,showParagraphNumbers:g},i.number||o)):t("div",{children:"No paragraphs available in this section."})})]}):t("div",{style:n,children:"Error: No section data provided"})},F={title:"UB Reader/Content/UBSection",component:v,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{section:{control:"object",description:"The section object containing number, title, and paragraphs"},showParagraphNumbers:{control:"boolean",description:"Whether to show paragraph numbers"},className:{control:"text",description:"Additional CSS class names"}},args:{section:{number:1,title:"Default Section Title",paragraphs:[{number:1,text:"This is a default paragraph for the section component."}]},showParagraphNumbers:!0,className:""},decorators:[e=>t("div",{style:{maxWidth:"700px",margin:"0 auto",fontFamily:"serif"},children:t(e,{})})]},u={number:1,title:"The Father's Name",paragraphs:[{number:1,text:"OF ALL the names by which God the Father is known throughout the universes, those which designate him as the <i>First Source</i> and the <i>Universe Center</i> are most often encountered."},{number:2,text:"The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes."},{number:3,text:"The evolutionary creatures of the inhabited worlds, on first learning of the existence of God, are prone to regard him as an arbitrarily omnipotent creator, a displaced and modified continuation of the primitive tribal fetish concept."},{number:4,text:"The Universal Father is not a transient force, a shifting power, or a fluctuating energy. The power and wisdom of the Father are wholly adequate to cope with any and all universe exigencies."},{number:5,text:"As the emergencies of human experience arise, he has foreseen them all, and therefore he does not react to the affairs of the universe in a detached way but rather in accordance with the dictates of eternal wisdom and in harmony with the mandates of infinite judgment."}]},r={args:{section:u,showParagraphNumbers:!0}},a={args:{section:u,showParagraphNumbers:!1}},w=`
  .ub-section {
    margin-bottom: 3em;
  }

  .ub-section-title {
    font-size: 1.5em;
    margin-bottom: 1.5em;
    font-weight: bold;
    color: #333;
  }

  .ub-section-paragraphs {
    position: relative;
  }

  .ub-paragraph {
    margin-bottom: 1.5em;
    position: relative;
    line-height: 1.6;
  }

  .ub-paragraph-number {
    position: absolute;
    left: -2.5em;
    top: 0;
    color: #666;
    font-size: 0.8em;
    font-weight: bold;
  }

  .ub-paragraph-text {
    text-align: justify;
  }

  .ub-topic-change {
    margin-top: 2em;
  }
`;if(typeof document<"u"){const e=document.createElement("style");e.textContent=w,document.head.appendChild(e)}var h,m,c;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    section: sampleSection,
    showParagraphNumbers: true
  }
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var l,p,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    section: sampleSection,
    showParagraphNumbers: false
  }
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const U=["Default","WithoutParagraphNumbers"];export{r as Default,a as WithoutParagraphNumbers,U as __namedExportsOrder,F as default};
