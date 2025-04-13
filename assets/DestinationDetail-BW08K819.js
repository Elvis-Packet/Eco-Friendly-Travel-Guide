import{j as e,d as t,u as z,r as g,a as L,b as N}from"./index-D7o_9O_l.js";import{F as I,c as P,a as $,E as u,b as k,d as G,e as J,f as A}from"./index.esm-DyWyhtwV.js";const O=t.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,V=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`,q=t.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`,H=t.span`
  font-weight: 500;
  color: #2e7d32;
`,M=t.p`
  color: #6c757d;
  margin-bottom: 1rem;
`,Y=t.div`
  display: inline-block;
  background-color: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`,U=({stay:i})=>{const{name:o,description:r,price:l,sustainable:x}=i;return e.jsxs(O,{children:[e.jsxs(V,{children:[e.jsx(q,{children:o}),e.jsx(H,{children:l})]}),e.jsx(M,{children:r}),x&&e.jsxs(Y,{children:[e.jsx("span",{role:"img","aria-label":"eco-friendly",children:"🌿"})," Eco-Friendly"]})]})},W=t.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,_=t.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;

  &::before {
    content: '💡';
    margin-right: 0.5rem;
  }
`,Z=t.p`
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
`,K=({tip:i})=>{const{title:o,content:r}=i;return e.jsxs(W,{children:[e.jsx(_,{children:o}),e.jsx(Z,{children:r})]})},Q=t.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,b=t.div`
  margin-bottom: 1.5rem;
`,j=t.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`,C=t(A)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`,D=t(A)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`,h=t.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`,X=t.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5e20;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`,ee=t.div`
  background-color: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  &::before {
    content: '✓';
    margin-right: 0.5rem;
    font-weight: bold;
  }
`,te=t.div`
  display: flex;
  gap: 0.5rem;
`,ie=t.button`
  background-color: ${i=>i.selected?"#2e7d32":"white"};
  color: ${i=>i.selected?"white":"#333"};
  border: 1px solid ${i=>i.selected?"#2e7d32":"#ced4da"};
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2e7d32;
  }
`,re=P({title:k().required("Title is required").min(5,"Title must be at least 5 characters").max(100,"Title must be less than 100 characters"),content:k().required("Please share your experience").test("not-empty","Please share your experience",i=>{console.log("--- VALIDATION DEBUG ---"),console.log("Input value:",JSON.stringify(i)),console.log("Type:",typeof i);const o=i&&i.trim().length>0;return console.log("Is valid:",o),o}).max(1e3,"Content must be less than 1000 characters"),rating:J().required("Please select a rating").min(1,"Rating must be at least 1").max(5,"Rating must be at most 5"),visitDate:G().required("Visit date is required").max(new Date,"Visit date cannot be in the future"),sustainabilityTips:k().min(10,"Tips must be at least 10 characters").max(500,"Tips must be less than 500 characters")}),E=({destinationId:i,destinationName:o})=>{const{addJournal:r,isAuthenticated:l}=z(),[x,p]=g.useState(!1),T={title:"",content:"",rating:0,visitDate:"",sustainabilityTips:""},B=(n,{resetForm:a})=>{console.log("Form values:",n),console.log("Content length:",n.content.length);const d={...n,destinationId:i,destinationName:o,createdAt:new Date().toISOString()};console.log("Journal entry:",d),r(d),a(),p(!0),setTimeout(()=>{p(!1)},5e3)};return e.jsxs(Q,{children:[x&&e.jsx(ee,{children:"Your journal entry has been successfully submitted!"}),e.jsx(I,{initialValues:T,validationSchema:re,onSubmit:B,children:({values:n,setFieldValue:a,isSubmitting:d,errors:w,touched:S})=>e.jsxs($,{children:[e.jsxs(b,{children:[e.jsx(j,{htmlFor:"title",children:"Title"}),e.jsx(C,{type:"text",id:"title",name:"title",placeholder:"Give your journal entry a title"}),e.jsx(u,{name:"title",component:h})]}),e.jsxs(b,{children:[e.jsx(j,{htmlFor:"content",children:"Your Experience"}),e.jsx(D,{component:"textarea",id:"content",name:"content",placeholder:"Share your experience at this destination..."}),e.jsx(u,{name:"content",component:h})]}),e.jsxs(b,{children:[e.jsx(j,{children:"Rating"}),e.jsx(te,{children:[1,2,3,4,5].map(c=>e.jsx(ie,{type:"button",selected:n.rating>=c,onClick:()=>a("rating",c),children:c},c))}),e.jsx(u,{name:"rating",component:h})]}),e.jsxs(b,{children:[e.jsx(j,{htmlFor:"visitDate",children:"Visit Date"}),e.jsx(C,{type:"date",id:"visitDate",name:"visitDate"}),e.jsx(u,{name:"visitDate",component:h})]}),e.jsxs(b,{children:[e.jsx(j,{htmlFor:"sustainabilityTips",children:"Sustainability Tips (Optional)"}),e.jsx(D,{as:"textarea",id:"sustainabilityTips",name:"sustainabilityTips",placeholder:"Share any eco-friendly tips for future travelers..."}),e.jsx(u,{name:"sustainabilityTips",component:h})]}),e.jsx(X,{type:"submit",disabled:d||!l,children:l?"Submit Journal Entry":"Login to Submit"}),!l&&e.jsx(h,{style:{marginTop:"1rem"},children:"You need to be logged in to submit a journal entry."})]})})]})},F=t.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,R=t.button`
  background: none;
  border: none;
  color: #2e7d32;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '←';
    margin-right: 0.5rem;
  }
`,ne=t.div`
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
`,oe=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,se=t.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
`,ae=t.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,le=t.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`,de=t.div`
  display: inline-flex;
  align-items: center;
  background: rgba(46, 125, 50, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;

  span {
    margin-right: 0.5rem;
  }
`,ce=t.p`
  color: #6c757d;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`,me=t.div`
  margin-top: 2rem;
`,he=t.div`
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
`,f=t.button`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: ${i=>i.active?"#2e7d32":"#6c757d"};
  border-bottom: 2px solid ${i=>i.active?"#2e7d32":"transparent"};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #2e7d32;
  }
`,ge=t.div`
  min-height: 300px;
`,v=t.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;t.div`
  height: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
`;const xe=t.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 3rem;
`,y=t.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2e7d32;

  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #2e7d32;
    margin: 0.5rem auto;
  }
`,be=()=>{var w,S,c;const{id:i}=L(),{getDestination:o}=z(),[r,l]=g.useState(null),[x,p]=g.useState(!0),[T,B]=g.useState(null),[n,a]=g.useState("overview");g.useEffect(()=>{(async()=>{p(!0);try{const m=await o(i);l(m)}catch{B("Failed to load destination details")}finally{p(!1)}})()},[i,o]);const d=()=>{window.history.back()};return x?e.jsx(N,{}):r?e.jsxs(F,{children:[e.jsx(R,{onClick:d,children:"Back to Destinations"}),e.jsxs(ne,{children:[e.jsx(oe,{src:r.image_url||r.image,alt:r.name}),e.jsxs(se,{children:[e.jsx(ae,{children:r.name}),e.jsx(le,{children:r.location}),e.jsxs(de,{children:[e.jsx("span",{children:"🌿"}),"Sustainability Score: ",r.sustainability_score||r.rating,"/10"]})]})]}),e.jsxs(me,{children:[e.jsxs(he,{children:[e.jsx(f,{active:n==="overview",onClick:()=>a("overview"),children:"Overview"}),e.jsx(f,{active:n==="stays",onClick:()=>a("stays"),children:"Stays"}),e.jsx(f,{active:n==="tips",onClick:()=>a("tips"),children:"Tips"}),e.jsx(f,{active:n==="journal",onClick:()=>a("journal"),children:"Journal"})]}),e.jsxs(ge,{children:[n==="overview"&&e.jsxs(e.Fragment,{children:[e.jsx(ce,{children:r.description}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Eco Highlights"}),e.jsx("ul",{style:{listStyle:"none",padding:0},children:((w=r.eco_highlights)==null?void 0:w.map((s,m)=>e.jsxs("li",{style:{marginBottom:"0.5rem"},children:["🌿 ",s]},m)))||["♻️ Zero-waste facilities and recycling programs","🌱 Use of renewable energy sources","💧 Water conservation initiatives","🏡 Eco-friendly accommodation options"].map((s,m)=>e.jsx("li",{style:{marginBottom:"0.5rem"},children:s},m))})]})]}),n==="stays"&&e.jsx("div",{children:((S=r.stays)==null?void 0:S.map(s=>e.jsx(U,{stay:s},s.id)))||e.jsx("p",{children:"No eco-friendly stays available at this time."})}),n==="tips"&&e.jsx("div",{children:((c=r.tips)==null?void 0:c.map(s=>e.jsx(K,{tip:s},s.id)))||e.jsx("p",{children:"No local sustainability tips available at this time."})}),n==="journal"&&e.jsx(E,{destinationId:r.id})]})]}),e.jsx(y,{children:"Eco-Friendly Activities"}),e.jsxs(v,{children:[e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Nature & Adventure"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🥾 Guided eco-trails and nature walks"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🦋 Responsible wildlife observation"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌺 Native plant identification tours"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🚲 Carbon-free cycling expeditions"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🛶 Sustainable water activities"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🏞️ Conservation area visits"})]})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Cultural & Educational"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🏺 Sustainable craft workshops"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌱 Organic farming experiences"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🍳 Local cuisine cooking classes"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🎭 Environmental education programs"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🏘️ Eco-community tours"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌿 Traditional medicine walks"})]})]})]}),e.jsx(y,{children:"Sustainable Accommodations"}),e.jsxs(v,{children:[e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Eco-Lodges"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🏡 Solar-powered cabins"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌿 Green-certified hotels"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🏕️ Sustainable camping sites"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"♻️ Zero-waste facilities"})]})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Local Homestays"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"👥 Community-run accommodations"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌱 Farm stays and eco-retreats"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🏠 Traditional housing experiences"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🤝 Fair-trade certified stays"})]})]})]}),e.jsx(y,{children:"Conservation Initiatives"}),e.jsxs(v,{children:[e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Environmental Projects"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌳 Reforestation programs"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🐢 Wildlife conservation"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌊 Marine protection"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"♻️ Waste management initiatives"})]})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Community Programs"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"📚 Environmental education"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌱 Sustainable agriculture"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"💪 Local empowerment projects"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🤝 Cultural preservation"})]})]})]}),e.jsx(y,{children:"Travel Tips"}),e.jsxs(v,{children:[e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Best Time to Visit"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌞 Peak Season: Spring (March-May)"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🍂 Alternative: Fall (Sept-Nov)"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌡️ Mild temperatures ideal for outdoor activities"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌺 Best time for flora and fauna observation"})]})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{color:"#2e7d32",marginBottom:"1rem"},children:"Eco-friendly Tips"}),e.jsxs("ul",{style:{listStyle:"none",padding:0},children:[e.jsx("li",{style:{marginBottom:"0.75rem"},children:"♻️ Bring reusable water bottles and bags"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🚲 Use eco-friendly transportation options"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:'🗑️ Practice "Leave No Trace" principles'}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"🌱 Support local eco-friendly businesses"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"📸 Respect wildlife photography guidelines"}),e.jsx("li",{style:{marginBottom:"0.75rem"},children:"💚 Follow local conservation rules"})]})]})]}),e.jsxs(xe,{children:[e.jsx(y,{children:"Share Your Experience"}),e.jsx(E,{destinationId:r.id,destinationName:r.name})]})]}):e.jsxs(F,{children:[e.jsx(R,{onClick:d,children:"Back to Destinations"}),e.jsxs("div",{style:{textAlign:"center",padding:"3rem"},children:[e.jsx("h2",{children:"Destination Not Found"}),e.jsx("p",{children:"The destination you're looking for doesn't exist or has been removed."})]})]})};export{be as default};
