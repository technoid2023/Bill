import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';

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
    Cookies.remove('item');
        Cookies.remove('_UR');
        toast.success('Logged Out !');
        Cookies.remove('_TK')
      Cookies.remove('_ST')
        setTimeout(() => {
            navigate('/login');
        }, 500);
    
};
function logOut() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be Logged Out from BillBuddy',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms the deletion, proceed with the deletion logic
      handleLogout();
    }
  });
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow navbar-dark bg-dark">

        <div className="container-fluid">
        {logincheck==='Logout'?(<div style={{ display: 'flex', alignItems: 'center',marginLeft:'3rem' }}>
 
  <Link className="navbar-brand" to="/dashboard" >BillBuddy</Link>
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
                  <button className="nav-link active" onClick={logOut}>{logincheck}</button>
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
