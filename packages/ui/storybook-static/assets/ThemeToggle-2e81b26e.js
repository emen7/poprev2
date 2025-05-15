import{a as t,j as e}from"./jsx-runtime-c9381026.js";import{u as c}from"./ThemeContext-4511d8c1.js";const n=({className:r="",showLabels:o=!0,showSystemOption:s=!0})=>{const{themeMode:a,setThemeMode:i}=c(),l=m=>{i(m)};return t("div",{className:`theme-toggle ${r}`,children:[t("div",{className:"theme-toggle-buttons",children:[t("button",{type:"button",className:`theme-toggle-button ${a==="dark"?"active":""}`,onClick:()=>l("dark"),"aria-label":"Dark theme",title:"Dark theme",children:[e("span",{className:"theme-toggle-icon",children:"🌙"}),o&&e("span",{className:"theme-toggle-label",children:"Dark"})]}),t("button",{type:"button",className:`theme-toggle-button ${a==="light"?"active":""}`,onClick:()=>l("light"),"aria-label":"Light theme",title:"Light theme",children:[e("span",{className:"theme-toggle-icon",children:"☀️"}),o&&e("span",{className:"theme-toggle-label",children:"Light"})]}),s&&t("button",{type:"button",className:`theme-toggle-button ${a==="system"?"active":""}`,onClick:()=>l("system"),"aria-label":"System theme",title:"System theme",children:[e("span",{className:"theme-toggle-icon",children:"💻"}),o&&e("span",{className:"theme-toggle-label",children:"System"})]})]}),e("style",{jsx:!0,children:`
        .theme-toggle {
          display: inline-flex;
          align-items: center;
        }
        
        .theme-toggle-buttons {
          display: flex;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        
        .theme-toggle-button {
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
        
        .theme-toggle-button:hover {
          background-color: var(--color-primary-hover);
          color: white;
        }
        
        .theme-toggle-button.active {
          background-color: var(--color-primary);
          color: white;
        }
        
        .theme-toggle-icon {
          font-size: 1rem;
          margin-right: ${o?"0.5rem":"0"};
        }
        
        .theme-toggle-label {
          font-size: 0.875rem;
        }
      `})]})};try{n.displayName="ThemeToggle",n.__docgenInfo={description:`ThemeToggle Component

A component that allows users to toggle between dark, light, and system themes.`,displayName:"ThemeToggle",props:{className:{defaultValue:{value:""},description:"Additional CSS class name",name:"className",required:!1,type:{name:"string"}},showLabels:{defaultValue:{value:"true"},description:"Whether to show labels next to icons",name:"showLabels",required:!1,type:{name:"boolean"}},showSystemOption:{defaultValue:{value:"true"},description:"Whether to show the system theme option",name:"showSystemOption",required:!1,type:{name:"boolean"}}}}}catch{}export{n as T};
