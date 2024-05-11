import Navbar from "../components/Navbar";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import TeamSection from "../components/TeamSection/TeamSection";

import '../components/About/about.css'
import '../components/Home/home.css'
// import '../components/navbar.css'
import '../components/TeamSection/teamSection.css'


function Website() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <TeamSection /> 


    </div>
  );
}

export default Website;
