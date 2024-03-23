import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wheel from '../../Assests/wheel.gif';

const Header = () => {
  const navigate = useNavigate();
  const [logincheck, setLogincheck] = useState('Login')

  useEffect(() => {

    
      const user = Cookies.get('_UR');
      if (user) {
        setLogincheck('Logout');
      } else {
        setLogincheck('Login');
      }
    

   
  }, []);

  const handleLogin = () => {

    navigate('/login')
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
        Cookies.remove('_UR');
        toast.success('Logged Out !');
        Cookies.remove('_TK')
        setTimeout(() => {
            navigate('/login');
        }, 500);
    }
};
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow navbar-dark bg-dark">

        <div className="container-fluid">
        {logincheck==='Logout'?(<div style={{ display: 'flex', alignItems: 'center',marginLeft:'3rem' }}>
  <img src={wheel} alt="P O M S Logo" className="me-2" style={{ width: '2rem', height: '2rem' }} />
  <Link className="navbar-brand" to="/dashboard" >P O M S</Link>
</div>):<></>}


          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faBars}/></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {logincheck==='Login'?<Link className="nav-link active" aria-current="page" to="/">Home</Link>:<></>}
              </li>
              <li className="nav-item">
              {logincheck==='Login'? <Link className="nav-link active" aria-current="page" to="/">About Us</Link>:<></>}
              </li>


              <li className="nav-item">
                {logincheck === 'Login' ? (
                  <button className="nav-link active" onClick={handleLogin}>{logincheck}</button>
                ) : (
                  <button className="nav-link active" onClick={handleLogout}>{logincheck}</button>
                )}
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;