import{a as r,j as t}from"./jsx-runtime-c9381026.js";import{u as d}from"./ThemeContext-4511d8c1.js";const i=({className:a="",showLabels:l=!0,options:o=["left","justify","right"]})=>{const{textAlignment:s,setTextAlignment:m}=d(),c=e=>{m(e)},g={left:"⇤",justify:"⇲",right:"⇥",center:"⇶"},n={left:"Left",justify:"Justify",right:"Right",center:"Center"};return r("div",{className:`text-alignment-toggle ${a}`,children:[t("div",{className:"text-alignment-buttons",children:o.map(e=>r("button",{type:"button",className:`text-alignment-button ${s===e?"active":""}`,onClick:()=>c(e),"aria-label":`${n[e]} alignment`,title:`${n[e]} alignment`,children:[t("span",{className:"text-alignment-icon",children:g[e]}),l&&t("span",{className:"text-alignment-label",children:n[e]})]},e))}),t("style",{jsx:!0,children:`
        .text-alignment-toggle {
          display: inline-flex;
          align-items: center;
        }
        
        .text-alignment-buttons {
          display: flex;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        
        .text-alignment-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.75rem;
          background: var(--color-surface);
          color: var(--color-text-primary);
          border: none;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        
        .text-alignment-button:hover {
          background-color: var(--color-primary-hover);
          color: white;
        }
        
        .text-alignment-button.active {
          background-color: var(--color-primary);
          color: white;
        }
        
        .text-alignment-icon {
          font-size: 1rem;
          margin-right: ${l?"0.5rem":"0"};
        }
        
        .text-alignment-label {
          font-size: 0.875rem;
        }
      `})]})};try{i.displayName="TextAlignmentToggle",i.__docgenInfo={description:`TextAlignmentToggle Component

A component that allows users to toggle between different text alignment options.`,displayName:"TextAlignmentToggle",props:{className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},showLabels:{defaultValue:{value:"true"},description:"Whether to show labels next to icons",name:"showLabels",required:!1,type:{name:"boolean"}},options:{defaultValue:{value:"['left', 'justify', 'right']"},description:"Which alignment options to show",name:"options",required:!1,type:{name:"TextAlignment[]"}}}}}catch{}export{i as T};
