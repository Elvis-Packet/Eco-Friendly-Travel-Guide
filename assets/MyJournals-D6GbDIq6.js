import{u as V,r as g,j as e,d as t,L}from"./index-D7o_9O_l.js";import{F as N,c as P,a as H,E as o,b,d as Y,e as G,f as C}from"./index.esm-DyWyhtwV.js";const I=t.div`
  padding: 2rem 0;
`,O=t.div`
  margin-bottom: 2rem;
  text-align: center;
`,U=t.h1`
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 1rem;
`,W=t.p`
  font-size: 1.1rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
`,K=t.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,Q=t.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,X=t.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
`,Z=t.h3`
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 0.5rem;
`,_=t.div`
  display: flex;
  justify-content: space-between;
  color: #6c757d;
  font-size: 0.9rem;
`,ee=t.span`
  font-weight: 500;
`,te=t.span`
  font-style: italic;
`,ne=t.div`
  padding: 1.5rem;
`,j=t.p`
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.6;
`,re=t.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  margin-bottom: 1rem;

  span {
    margin-left: 0.5rem;
    color: #6c757d;
  }
`,ie=t.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
`,m=t.button`
  background: none;
  border: none;
  color: ${r=>r.delete?"#dc3545":"#2e7d32"};
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${r=>r.delete?"rgba(220, 53, 69, 0.1)":"rgba(46, 125, 50, 0.1)"};
  }
`,oe=t.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 2rem;

  h3 {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  p {
    color: #adb5bd;
    margin-bottom: 2rem;
  }
`,se=t(L)`
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5e20;
  }
`,y=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,v=t.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,w=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: #333;
  }
`,k=t.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;

  &:hover {
    color: #333;
  }
`,s=t.div`
  margin-bottom: 1.5rem;
`,a=t.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`,J=t(C)`
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
`,T=t(C)`
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
`,d=t.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`,D=t.button`
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
`,ae=t.div`
  display: flex;
  gap: 0.5rem;
`,de=t.button`
  background-color: ${r=>r.selected?"#2e7d32":"white"};
  color: ${r=>r.selected?"white":"#333"};
  border: 1px solid ${r=>r.selected?"#2e7d32":"#ced4da"};
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
`,le=P({title:b().required("Title is required").min(5,"Title must be at least 5 characters").max(100,"Title must be less than 100 characters"),content:b().required("Content is required").min(20,"Please share more details (minimum 20 characters)").max(1e3,"Content must be less than 1000 characters"),rating:G().required("Please select a rating").min(1,"Rating must be at least 1").max(5,"Rating must be at most 5"),visitDate:Y().required("Visit date is required").max(new Date,"Visit date cannot be in the future"),sustainabilityTips:b().min(10,"Tips must be at least 10 characters").max(500,"Tips must be less than 500 characters")}),xe=()=>{const{journals:r,updateJournal:E,deleteJournal:S,addJournal:z}=V(),[i,f]=g.useState(null),[F,x]=g.useState(!1),[u,l]=g.useState(null),M=n=>{const p={year:"numeric",month:"long",day:"numeric"};return new Date(n).toLocaleDateString(void 0,p)},$=n=>{f(n),x(!0)},q=n=>{l(n)},R=()=>{u&&(S(u),l(null))},h=()=>{x(!1),f(null)},A=n=>{i?(E(i.id,n),h()):(z(n),h())};return e.jsxs(I,{children:[e.jsxs(O,{children:[e.jsx(U,{children:"Travel Journals"}),e.jsx(W,{children:"Share and explore eco-friendly travel experiences and sustainability tips from our community."}),e.jsx(D,{style:{marginTop:"1.5rem"},onClick:()=>x(!0),children:"+ New Journal Entry"})]}),r.length>0?e.jsx(K,{children:r.map(n=>e.jsxs(Q,{children:[e.jsxs(X,{children:[e.jsx(Z,{children:n.title}),e.jsxs(_,{children:[e.jsx(ee,{children:n.destinationName}),e.jsxs(te,{children:["Visited: ",M(n.visitDate)]})]})]}),e.jsxs(ne,{children:[e.jsxs(re,{children:["★".repeat(n.rating),"☆".repeat(5-n.rating),e.jsxs("span",{children:[n.rating,"/5"]})]}),e.jsx(j,{children:n.content}),n.sustainabilityTips&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Sustainability Tips:"}),e.jsx(j,{children:n.sustainabilityTips})]})]}),e.jsxs(ie,{children:[e.jsx(m,{onClick:()=>$(n),children:"Edit"}),e.jsx(m,{delete:!0,onClick:()=>q(n.id),children:"Delete"})]})]},n.id))}):e.jsxs(oe,{children:[e.jsx("h3",{children:"No Journal Entries Yet"}),e.jsx("p",{children:"Start by exploring destinations and sharing your experiences"}),e.jsx(se,{to:"/destinations",children:"Explore Destinations"})]}),F&&e.jsx(y,{children:e.jsxs(v,{children:[e.jsxs(w,{children:[e.jsx("h2",{children:i?"Edit Journal Entry":"New Journal Entry"}),e.jsx(k,{onClick:h,children:"×"})]}),e.jsx(N,{initialValues:i||{title:"",content:"",rating:0,visitDate:"",sustainabilityTips:""},validationSchema:le,onSubmit:A,children:({values:n,setFieldValue:p,isSubmitting:B})=>e.jsxs(H,{children:[e.jsxs(s,{children:[e.jsx(a,{htmlFor:"title",children:"Title"}),e.jsx(J,{type:"text",id:"title",name:"title"}),e.jsx(o,{name:"title",component:d})]}),e.jsxs(s,{children:[e.jsx(a,{htmlFor:"content",children:"Your Experience"}),e.jsx(T,{as:"textarea",id:"content",name:"content"}),e.jsx(o,{name:"content",component:d})]}),e.jsxs(s,{children:[e.jsx(a,{children:"Rating"}),e.jsx(ae,{children:[1,2,3,4,5].map(c=>e.jsx(de,{type:"button",selected:n.rating>=c,onClick:()=>p("rating",c),children:c},c))}),e.jsx(o,{name:"rating",component:d})]}),e.jsxs(s,{children:[e.jsx(a,{htmlFor:"visitDate",children:"Visit Date"}),e.jsx(J,{type:"date",id:"visitDate",name:"visitDate"}),e.jsx(o,{name:"visitDate",component:d})]}),e.jsxs(s,{children:[e.jsx(a,{htmlFor:"sustainabilityTips",children:"Sustainability Tips (Optional)"}),e.jsx(T,{as:"textarea",id:"sustainabilityTips",name:"sustainabilityTips"}),e.jsx(o,{name:"sustainabilityTips",component:d})]}),e.jsx(D,{type:"submit",disabled:B,children:i?"Update Journal Entry":"Add Journal Entry"})]})})]})}),u&&e.jsx(y,{children:e.jsxs(v,{style:{maxWidth:"400px"},children:[e.jsxs(w,{children:[e.jsx("h2",{children:"Confirm Delete"}),e.jsx(k,{onClick:()=>l(null),children:"×"})]}),e.jsx("p",{children:"Are you sure you want to delete this journal entry? This action cannot be undone."}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"1rem",marginTop:"2rem"},children:[e.jsx(m,{onClick:()=>l(null),children:"Cancel"}),e.jsx(m,{delete:!0,onClick:R,children:"Delete"})]})]})})]})};export{xe as default};
