
import Cats from "./Cats/Cats";
import Dogs from "./Dogs/Dogs";
import FindAdoptions from "./FindAdoptions/FindAdoptions";
import Hero from "./Hero";
import ReadyToAdopt from "./ReadyToAdopt/ReadyToAdopt";

import SearchAdoption from "./SearchAdoption/SearchAdoption";
import WhatYouCanDo from "./WhatYouCanDo/WhatYouCanDo";

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchAdoption />
      <WhatYouCanDo />
      <FindAdoptions></FindAdoptions>
      <ReadyToAdopt></ReadyToAdopt>
      <Dogs></Dogs>
      <Cats></Cats>
      
    </div>
  );
};

export default Home;
