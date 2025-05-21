import{j as a,a as W}from"./jsx-runtime-c9381026.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const r=({paragraph:e={number:0,text:"No paragraph content provided"},isTopicChange:C=!1,showParagraphNumbers:U=!0,className:A=""})=>{const h={marginBottom:"1.5em",position:"relative",lineHeight:1.6,marginTop:C?"2em":0},j={position:"absolute",left:"-2.5em",top:0,color:"#666",fontSize:"0.8em",fontWeight:"bold"},L={textAlign:"justify"};return e?W("div",{style:h,children:[U&&e.number!==void 0&&a("span",{style:j,children:e.number}),e.text&&a("div",{style:L,dangerouslySetInnerHTML:{__html:e.text}})]}):a("div",{style:h,children:"Error: No paragraph data provided"})},E={title:"UB Reader/Content/UBParagraph",component:r,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{paragraph:{control:"object",description:"The paragraph object containing number and text"},isTopicChange:{control:"boolean",description:"Whether this paragraph represents a topic change"},showParagraphNumbers:{control:"boolean",description:"Whether to show paragraph numbers"},className:{control:"text",description:"Additional CSS class names"}},args:{paragraph:{number:1,text:"Default paragraph text for UB Reader component."},showParagraphNumbers:!0,isTopicChange:!1,className:""},decorators:[e=>a("div",{style:{maxWidth:"700px",margin:"0 auto",fontFamily:"serif"},children:a(e,{})})]},t={args:{paragraph:{number:1,text:"The Universal Father is the God of all creation, the First Source and Center of all things and beings."},showParagraphNumbers:!0}},n={args:{paragraph:{number:2,text:"OF ALL the names by which God the Father is known throughout the universes, those which designate him as the <i>First Source</i> and the <i>Universe Center</i> are most often encountered."},showParagraphNumbers:!0}},o={args:{paragraph:{number:3,text:"The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes."},showParagraphNumbers:!1}},s={args:{paragraph:{number:4,text:"The evolutionary creatures of the inhabited worlds, on first learning of the existence of God, are prone to regard him as an arbitrarily omnipotent creator, a displaced and modified continuation of the primitive tribal fetish concept."},isTopicChange:!0,showParagraphNumbers:!0}},i={args:{paragraph:{number:5,text:"The Universal Father is not a transient force, a shifting power, or a fluctuating energy. The power and wisdom of the Father are wholly adequate to cope with any and all universe exigencies. As the emergencies of human experience arise, he has foreseen them all, and therefore he does not react to the affairs of the universe in a detached way but rather in accordance with the dictates of eternal wisdom and in harmony with the mandates of infinite judgment. Regardless of appearances, the power of God is not functioning in the universe as a blind force."},showParagraphNumbers:!0}},G=`
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
`;if(typeof document<"u"){const e=document.createElement("style");e.textContent=G,document.head.appendChild(e)}var p,c,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`({
  paragraph = {
    number: 0,
    text: 'No paragraph content provided'
  },
  isTopicChange = false,
  showParagraphNumbers = true,
  className = ''
}) => {
  const paragraphStyle = {
    marginBottom: '1.5em',
    position: 'relative',
    lineHeight: 1.6,
    marginTop: isTopicChange ? '2em' : 0
  };
  const numberStyle = {
    position: 'absolute',
    left: '-2.5em',
    top: 0,
    color: '#666',
    fontSize: '0.8em',
    fontWeight: 'bold'
  };
  const textStyle = {
    textAlign: 'justify' as const
  };

  // Safety check for paragraph object
  if (!paragraph) {
    return <div style={paragraphStyle}>Error: No paragraph data provided</div>;
  }
  return <div style={paragraphStyle}>\r
      {showParagraphNumbers && paragraph.number !== undefined && <span style={numberStyle}>{paragraph.number}</span>}\r
      {paragraph.text && <div style={textStyle} dangerouslySetInnerHTML={{
      __html: paragraph.text
    }} />}\r
    </div>;
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,l,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    paragraph: {
      number: 1,
      text: 'The Universal Father is the God of all creation, the First Source and Center of all things and beings.'
    },
    showParagraphNumbers: true
  }
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var g,f,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    paragraph: {
      number: 2,
      text: 'OF ALL the names by which God the Father is known throughout the universes, those which designate him as the <i>First Source</i> and the <i>Universe Center</i> are most often encountered.'
    },
    showParagraphNumbers: true
  }
}`,...(b=(f=n.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var y,w,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    paragraph: {
      number: 3,
      text: 'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.'
    },
    showParagraphNumbers: false
  }
}`,...(v=(w=o.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var x,S,T;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    paragraph: {
      number: 4,
      text: 'The evolutionary creatures of the inhabited worlds, on first learning of the existence of God, are prone to regard him as an arbitrarily omnipotent creator, a displaced and modified continuation of the primitive tribal fetish concept.'
    },
    isTopicChange: true,
    showParagraphNumbers: true
  }
}`,...(T=(S=s.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var N,F,P;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    paragraph: {
      number: 5,
      text: 'The Universal Father is not a transient force, a shifting power, or a fluctuating energy. The power and wisdom of the Father are wholly adequate to cope with any and all universe exigencies. As the emergencies of human experience arise, he has foreseen them all, and therefore he does not react to the affairs of the universe in a detached way but rather in accordance with the dictates of eternal wisdom and in harmony with the mandates of infinite judgment. Regardless of appearances, the power of God is not functioning in the universe as a blind force.'
    },
    showParagraphNumbers: true
  }
}`,...(P=(F=i.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};const M=["UBParagraph","Default","WithHTMLFormatting","WithoutNumbers","TopicChange","LongParagraph"];export{t as Default,i as LongParagraph,s as TopicChange,r as UBParagraph,n as WithHTMLFormatting,o as WithoutNumbers,M as __namedExportsOrder,E as default};
