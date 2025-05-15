import{j as W}from"./jsx-runtime-c9381026.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const c=({variant:o="default",children:x,className:P="",...V})=>{const i="button",j=o!=="default"?`${i}--${o}`:"",q=[i,j,P].filter(Boolean).join(" ");return W("button",{className:q,...V,children:x})};try{c.displayName="Button",c.__docgenInfo={description:"Button component for user interactions",displayName:"Button",props:{variant:{defaultValue:{value:"default"},description:"The visual style variant of the button",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"default"'},{value:'"secondary"'},{value:'"danger"'}]}},children:{defaultValue:null,description:"The content to display inside the button",name:"children",required:!0,type:{name:"ReactNode"}},className:{defaultValue:{value:""},description:"Additional CSS class names",name:"className",required:!1,type:{name:"string"}}}}}catch{}const A={title:"UI/Button",component:c,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","primary","secondary","danger"],description:"The visual style variant of the button",defaultValue:"default"},children:{control:"text",description:"The content to display inside the button"},onClick:{action:"clicked"},disabled:{control:"boolean",description:"Whether the button is disabled"}}},e={args:{children:"Default Button"}},a={args:{variant:"primary",children:"Primary Button"}},r={args:{variant:"secondary",children:"Secondary Button"}},t={args:{variant:"danger",children:"Danger Button"}},n={args:{disabled:!0,children:"Disabled Button"}},s={args:{className:"custom-button",children:"Custom Class Button"}};var d,l,u;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...(u=(l=e.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var m,p,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var h,y,f;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(f=(y=r.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var b,v,B;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}`,...(B=(v=t.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var C,D,S;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...(S=(D=n.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var _,N,T;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    className: 'custom-button',
    children: 'Custom Class Button'
  }
}`,...(T=(N=s.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};const E=["Default","Primary","Secondary","Danger","Disabled","WithCustomClass"];export{t as Danger,e as Default,n as Disabled,a as Primary,r as Secondary,s as WithCustomClass,E as __namedExportsOrder,A as default};
