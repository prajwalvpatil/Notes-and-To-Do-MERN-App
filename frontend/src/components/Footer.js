import '@fortawesome/fontawesome-free/css/all.css';
import 'mdbreact/dist/css/mdb.css';


const Footer = () => {
    return ( 
        
  <footer className="text-center text-white" style={{ backgroundColor: "#fff" }}>
    <div className="container pt-4">
      <section className="mb-4">
        <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <i className="fab fa-twitter"></i>
        </a>
        <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <i className="fab fa-instagram"></i>
        </a>
        <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <i className="fab fa-linkedin"></i>
        </a>
        <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#!" role="button" data-mdb-ripple-color="dark">
          <i className="fab fa-github"></i>
        </a>
      </section>
    </div>
    <div className="text-center text-dark p-3">
      © 2023 Copyright: Notes_&_To-Do
    </div>
  </footer>


    );
}
 
export default Footer;