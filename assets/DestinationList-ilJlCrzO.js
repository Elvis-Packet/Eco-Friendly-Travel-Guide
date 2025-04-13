import{u as g,r as a,j as e,d as t,L as h}from"./index-D7o_9O_l.js";const u=t.div`
  padding: 2rem 0;
`,b=t.div`
  margin-bottom: 2rem;
  text-align: center;
`,f=t.h1`
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 1rem;
`,j=t.p`
  font-size: 1.1rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
`,v=t.div`
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,w=t.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  flex-grow: 1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`,D=t.select`
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`,y=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 2rem;
  justify-content: center;
`,S=t.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`,k=t.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`,C=t.div`
  padding: 1.5rem;
`,L=t.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`,z=t.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  margin-bottom: 1rem;
  font-weight: 500;
`,F=t.p`
  color: #6c757d;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,R=t(h)`
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1b5e20;
  }
`,A=t.div`
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
  }
`,T=()=>{const{destinations:d,loading:c,error:n}=g(),[o,l]=a.useState(""),[i,m]=a.useState(""),s=d.filter(r=>{const x=r.name.toLowerCase().includes(o.toLowerCase())||r.description.toLowerCase().includes(o.toLowerCase()),p=i===""||r.rating>=parseFloat(i);return x&&p});return e.jsxs(u,{children:[e.jsxs(b,{children:[e.jsx(f,{children:"Eco-Friendly Destinations"}),e.jsx(j,{children:"Discover sustainable travel destinations that prioritize environmental conservation and responsible tourism."})]}),e.jsxs(v,{children:[e.jsx(w,{type:"text",placeholder:"Search destinations...",value:o,onChange:r=>l(r.target.value)}),e.jsxs(D,{value:i,onChange:r=>m(r.target.value),children:[e.jsx("option",{value:"",children:"All Ratings"}),e.jsx("option",{value:"4.5",children:"4.5+ Stars"}),e.jsx("option",{value:"4",children:"4+ Stars"}),e.jsx("option",{value:"3.5",children:"3.5+ Stars"})]})]}),c?e.jsxs("div",{style:{textAlign:"center",padding:"3rem"},children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Loading destinations..."})]}):n?e.jsx("div",{style:{textAlign:"center",padding:"3rem",color:"#d32f2f"},children:e.jsx("p",{children:n})}):s.length>0?e.jsx(y,{children:s.map(r=>e.jsxs(S,{children:[e.jsx(k,{src:r.image_url||r.image,alt:r.name}),e.jsxs(C,{children:[e.jsx(L,{children:r.name}),e.jsxs(z,{children:["★ ",r.rating?r.rating.toFixed(1):"4.5"]}),e.jsx(F,{children:r.description}),e.jsx(R,{to:`/destinations/${r.id}`,children:"View Details"})]})]},r.id))}):e.jsxs(A,{children:[e.jsx("h3",{children:"No destinations found"}),e.jsx("p",{children:"Try adjusting your search criteria"})]})]})};export{T as default};
