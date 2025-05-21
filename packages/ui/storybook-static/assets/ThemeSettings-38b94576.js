import{a as t,j as e}from"./jsx-runtime-c9381026.js";import{T as m}from"./ThemeToggle-2e81b26e.js";import{T as h}from"./TextAlignmentToggle-f2214db1.js";const o=({className:n="",showLabels:s=!0,showSystemOption:a=!0,alignmentOptions:i=["left","justify","right"],showThemeToggle:r=!0,showAlignmentToggle:l=!0})=>t("div",{className:`theme-settings ${n}`,children:[r&&t("div",{className:"theme-settings-section",children:[e("h3",{className:"theme-settings-heading",children:"Theme"}),e(m,{showLabels:s,showSystemOption:a})]}),l&&t("div",{className:"theme-settings-section",children:[e("h3",{className:"theme-settings-heading",children:"Text Alignment"}),e(h,{showLabels:s,options:i})]}),e("style",{jsx:!0,children:`
        .theme-settings {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
          background-color: var(--color-surface);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border);
        }
        
        .theme-settings-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .theme-settings-heading {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-text-primary);
        }
      `})]});try{o.displayName="ThemeSettings",o.__docgenInfo={description:`ThemeSettings Component

A component that combines theme and text alignment controls.`,displayName:"ThemeSettings",props:{className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},showLabels:{defaultValue:{value:"true"},description:"Whether to show labels next to icons",name:"showLabels",required:!1,type:{name:"boolean"}},showSystemOption:{defaultValue:{value:"true"},description:"Whether to show the system theme option",name:"showSystemOption",required:!1,type:{name:"boolean"}},alignmentOptions:{defaultValue:{value:"['left', 'justify', 'right']"},description:"Which text alignment options to show",name:"alignmentOptions",required:!1,type:{name:"TextAlignment[]"}},showThemeToggle:{defaultValue:{value:"true"},description:"Whether to show the theme toggle",name:"showThemeToggle",required:!1,type:{name:"boolean"}},showAlignmentToggle:{defaultValue:{value:"true"},description:"Whether to show the text alignment toggle",name:"showAlignmentToggle",required:!1,type:{name:"boolean"}}}}}catch{}export{o as T};
