
// import Counter from "componenet/counter";

import Counter from "./componenet/counter";
import ContactForm from "./componenet/formHanding";
import UserList from "./componenet/useEffect";

export default function Home() {
  return (
    <div>
     {/* < Counter /> */}
     <UserList/>
      <ContactForm />
     
    </div>
  );
}
