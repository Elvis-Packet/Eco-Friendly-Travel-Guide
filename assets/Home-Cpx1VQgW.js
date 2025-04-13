import{u as x,j as e,L as n,d as i}from"./index-D7o_9O_l.js";const h=i.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3') center/cover no-repeat;
  color: white;
  border-radius: 8px;
  margin: 2rem 0;
`,g=i.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,p=i.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,u=i(n)`
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
`,j=i.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`,r=i.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,o=i.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`,s=i.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2e7d32;
`,a=i.p`
  color: #6c757d;
`,f=i.section`
  margin: 3rem 0;
`,b=i.h2`
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
`,v=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`,w=i.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,y=i.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`,D=i.div`
  padding: 1.5rem;
`,k=i.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`,z=i.div`
  display: flex;
  align-items: center;
  color: #f9a825;
  margin-bottom: 1rem;
`,F=i(n)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: #2e7d32;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`,S=()=>{const{destinations:l,loading:m,error:c}=x(),d=l.slice(0,3);return e.jsxs(e.Fragment,{children:[e.jsxs(h,{children:[e.jsx(g,{children:"Discover Sustainable Travel Destinations"}),e.jsx(p,{children:"Explore eco-friendly destinations around the world while minimizing your environmental footprint. Our curated travel guide helps you make responsible choices for a greener planet."}),e.jsx(u,{to:"/destinations",children:"Explore Destinations"})]}),e.jsxs(j,{children:[e.jsxs(r,{children:[e.jsx(o,{children:"🌿"}),e.jsx(s,{children:"Eco-Friendly Destinations"}),e.jsx(a,{children:"Discover destinations committed to sustainability and environmental conservation."})]}),e.jsxs(r,{children:[e.jsx(o,{children:"🏡"}),e.jsx(s,{children:"Sustainable Accommodations"}),e.jsx(a,{children:"Find eco-conscious stays that minimize environmental impact while maximizing comfort."})]}),e.jsxs(r,{children:[e.jsx(o,{children:"📝"}),e.jsx(s,{children:"Travel Journals"}),e.jsx(a,{children:"Share your experiences and tips with other eco-conscious travelers."})]})]}),e.jsxs(f,{children:[e.jsx(b,{children:"Featured Destinations"}),m?e.jsxs("div",{style:{textAlign:"center",padding:"3rem"},children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Loading destinations..."})]}):c?e.jsx("div",{style:{textAlign:"center",padding:"3rem",color:"#d32f2f"},children:e.jsx("p",{children:c})}):d.length>0?e.jsxs(e.Fragment,{children:[e.jsx(v,{children:d.map(t=>e.jsxs(w,{children:[e.jsx(n,{to:`/destinations/${t.id}`,children:e.jsx(y,{src:t.image_url||t.image,alt:t.name})}),e.jsxs(D,{children:[e.jsx(k,{children:t.name}),e.jsxs(z,{children:["★ ",t.rating?t.rating.toFixed(1):"4.5"]}),e.jsx(n,{to:`/destinations/${t.id}`,children:"View Details"})]})]},t.id))}),e.jsx(F,{to:"/destinations",children:"View All Destinations"})]}):e.jsx("div",{style:{textAlign:"center",padding:"3rem"},children:e.jsx("p",{children:"No destinations available at the moment. Please check back later."})})]})]})};export{S as default};
