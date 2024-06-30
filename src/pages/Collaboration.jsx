
import Collaborators from "../components/Collaboration/OurCollaborators";
import Collaborate from "../components/Collaboration/Collaborate";
import CollabForm from "../components/Collaboration/CollabForm";
import Footer from "../components/Footer/Footer";

function Collaboration() {
  return (
    <div>
       <Collaborate />
       <CollabForm />
       <Collaborators />
       <Footer />

    </div>
  );
}

export default Collaboration;
