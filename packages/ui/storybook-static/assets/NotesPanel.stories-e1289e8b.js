import{a as s,j as e}from"./jsx-runtime-c9381026.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";const r=({documentId:n,initialNotes:t=[],persistNotes:U=!1,onNotesChange:_,className:F=""})=>{const T={display:"flex",flexDirection:"column",height:"100%",border:"1px solid #e0e0e0",borderRadius:"4px",overflow:"hidden"},k={display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",backgroundColor:"#f5f5f5",borderBottom:"1px solid #e0e0e0"},O={margin:0,fontSize:"16px",fontWeight:600},P={flex:1,overflowY:"auto",padding:"16px"},W={color:"#666",textAlign:"center",margin:"32px 0"},j={display:"flex",flexDirection:"column",gap:"16px"},M={padding:"12px",border:"1px solid #e0e0e0",borderRadius:"4px",backgroundColor:"#fff"},z={marginBottom:"8px",lineHeight:1.5},B={display:"flex",justifyContent:"space-between",fontSize:"12px",color:"#666",marginBottom:"8px"},R={display:"flex",flexWrap:"wrap",gap:"4px"},$={fontSize:"11px",padding:"2px 6px",backgroundColor:"#1976d2",color:"white",borderRadius:"12px"};return s("div",{style:T,children:[s("div",{style:k,children:[e("h2",{style:O,children:"Notes"}),e("button",{children:"Add Note"})]}),e("div",{style:P,children:t.length===0?e("p",{style:W,children:'No notes yet. Click "Add Note" to create one.'}):e("div",{style:j,children:t.map(o=>{var p;return s("div",{style:M,children:[e("div",{style:z,children:o.content}),s("div",{style:B,children:[e("span",{children:o.reference}),e("span",{children:new Date(o.updatedAt).toLocaleDateString()})]}),e("div",{style:R,children:(p=o.tags)==null?void 0:p.map(m=>e("span",{style:$,children:m},m))})]},o.id)})})})]})},G={title:"UB Reader/Panels/NotesPanel",component:r,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{documentId:{control:"text",description:"The document ID the notes are associated with"},initialNotes:{control:"object",description:"Initial notes to display"},persistNotes:{control:"boolean",description:"Whether to persist notes in localStorage"},onNotesChange:{action:"notesChanged",description:"Function to call when notes are updated"},className:{control:"text",description:"Additional CSS class name"}},decorators:[n=>e("div",{style:{height:"500px",maxWidth:"600px",margin:"0 auto",border:"1px solid #ccc"},children:e(n,{})})]},c=[{id:"note-1",content:"This is a note about the Universal Father. The concept of God as a loving parent is central to understanding the Urantia Book.",createdAt:new Date(2023,0,15).toISOString(),updatedAt:new Date(2023,0,15).toISOString(),reference:"Paper 1",tags:["concept","important"]},{id:"note-2",content:"The Thought Adjusters are fascinating. They represent the direct connection between humans and the Universal Father.",createdAt:new Date(2023,1,20).toISOString(),updatedAt:new Date(2023,2,5).toISOString(),reference:"Paper 108",tags:["concept"]},{id:"note-3",content:"The description of the local universe administration provides a clear organizational structure for understanding cosmic hierarchy.",createdAt:new Date(2023,3,10).toISOString(),updatedAt:new Date(2023,3,10).toISOString(),reference:"Paper 32",tags:["organization","universe"]}],a={args:{documentId:"test-document",initialNotes:[],persistNotes:!1}},i={args:{documentId:"test-document",initialNotes:c,persistNotes:!1}},d={args:{documentId:"test-document",initialNotes:[...c,...Array.from({length:10},(n,t)=>({id:`note-${t+4}`,content:`This is note ${t+4} with some content to demonstrate scrolling in the notes panel.`,createdAt:new Date(2023,4,t+1).toISOString(),updatedAt:new Date(2023,4,t+1).toISOString(),reference:`Paper ${Math.floor(Math.random()*196)+1}`,tags:["sample"]}))],persistNotes:!1}},l={args:{documentId:"persistent-document",initialNotes:c,persistNotes:!0}},E=`
  :root {
    --border-color: #e0e0e0;
    --panel-header-bg-color: #f5f5f5;
    --input-border-color: #ccc;
    --input-bg-color: #fff;
    --input-text-color: #333;
    --accent-color: #1976d2;
    --accent-hover-color: #1565c0;
    --text-muted-color: #666;
    --note-bg-color: #fff;
    --danger-color: #f44336;
  }

  /* Dark mode */
  .dark-theme {
    --border-color: #333;
    --panel-header-bg-color: #333;
    --input-border-color: #444;
    --input-bg-color: #222;
    --input-text-color: #fff;
    --accent-color: #08f;
    --accent-hover-color: #09f;
    --text-muted-color: #888;
    --note-bg-color: #2a2a2a;
    --danger-color: #f33;
  }
`;if(typeof document<"u"){const n=document.createElement("style");n.textContent=E,document.head.appendChild(n)}var g,u,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`({
  documentId,
  initialNotes = [],
  persistNotes = false,
  onNotesChange,
  className = ''
}) => {
  const panelStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden'
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0'
  };
  const headerTitleStyle = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600
  };
  const contentStyle = {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '16px'
  };
  const emptyStyle = {
    color: '#666',
    textAlign: 'center' as const,
    margin: '32px 0'
  };
  const listStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  };
  const noteItemStyle = {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff'
  };
  const noteContentStyle = {
    marginBottom: '8px',
    lineHeight: 1.5
  };
  const noteMetaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px'
  };
  const noteTagsStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '4px'
  };
  const noteTagStyle = {
    fontSize: '11px',
    padding: '2px 6px',
    backgroundColor: '#1976d2',
    color: 'white',
    borderRadius: '12px'
  };
  return <div style={panelStyle}>\r
      <div style={headerStyle}>\r
        <h2 style={headerTitleStyle}>Notes</h2>\r
        <button>Add Note</button>\r
      </div>\r
      <div style={contentStyle}>\r
        {initialNotes.length === 0 ? <p style={emptyStyle}>No notes yet. Click "Add Note" to create one.</p> : <div style={listStyle}>\r
            {initialNotes.map(note => <div key={note.id} style={noteItemStyle}>\r
                <div style={noteContentStyle}>{note.content}</div>\r
                <div style={noteMetaStyle}>\r
                  <span>{note.reference}</span>\r
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>\r
                </div>\r
                <div style={noteTagsStyle}>\r
                  {note.tags?.map(tag => <span key={tag} style={noteTagStyle}>\r
                      {tag}\r
                    </span>)}\r
                </div>\r
              </div>)}\r
          </div>}\r
      </div>\r
    </div>;
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var h,f,x;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    documentId: 'test-document',
    initialNotes: [],
    persistNotes: false
  }
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var S,N,b;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    documentId: 'test-document',
    initialNotes: sampleNotes,
    persistNotes: false
  }
}`,...(b=(N=i.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var v,w,I;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    documentId: 'test-document',
    initialNotes: [...sampleNotes, ...Array.from({
      length: 10
    }, (_, i) => ({
      id: \`note-\${i + 4}\`,
      content: \`This is note \${i + 4} with some content to demonstrate scrolling in the notes panel.\`,
      createdAt: new Date(2023, 4, i + 1).toISOString(),
      updatedAt: new Date(2023, 4, i + 1).toISOString(),
      reference: \`Paper \${Math.floor(Math.random() * 196) + 1}\`,
      tags: ['sample']
    }))],
    persistNotes: false
  }
}`,...(I=(w=d.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var A,C,D;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    documentId: 'persistent-document',
    initialNotes: sampleNotes,
    persistNotes: true
  }
}`,...(D=(C=l.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const q=["NotesPanel","Empty","WithNotes","ManyNotes","WithPersistence"];export{a as Empty,d as ManyNotes,r as NotesPanel,i as WithNotes,l as WithPersistence,q as __namedExportsOrder,G as default};
