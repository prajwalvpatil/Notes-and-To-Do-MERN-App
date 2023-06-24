import img1 from '../img/not.jpeg';
import img2 from '../img/todo.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <div className="home">
          <div className="cards">            
        <article className="card"> 
        <img src={img1} alt="Notes"/>
        <div class="content">
          <Link to='/notes'>Notes</Link>
        </div>            
          </article>
          </div>
          <div className="cards">            
        <article className="card"> 
        <img src={img2} alt="To-Do"/>
        <div class="content">
        <Link to='/todos'>To-Do List</Link>
        </div>            
          </article>
          </div>
        </div>
        
     );
}
 
export default Home;