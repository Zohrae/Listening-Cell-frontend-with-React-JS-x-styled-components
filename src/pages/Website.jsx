import Navbar from "../components/Navbar";
import Home from "../components/Home/Home";
// import About from "../components/About/About";
import TeamSection from "../components/TeamSection/TeamSection";
import StepByStepGuide from "../components/Guide/Guide";
import EventsPage from "../components/Events/EventsPage";
import TestimonialCarousel from "../components/Testimonial/Testimonial";
import FAQPage from "../components/Guide/FAQPage";
import Footer from "../components/Footer/Footer";

function Website() {
  return (
    <div>
      <Navbar />
      <Home />
      <StepByStepGuide />  

      <TeamSection />  
      <EventsPage />  

      <TestimonialCarousel />  
      <FAQPage /> 
      <Footer />  
 

    </div>
  );
}

export default Website;
