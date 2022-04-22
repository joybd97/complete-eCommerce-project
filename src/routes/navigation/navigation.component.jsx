import {Fragment,useContext} from 'react'
import {Outlet,Link} from 'react-router-dom'
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {UserContext} from '../../context/user.context'
import './navigation.style.scss';

const Navigation = () =>{
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser);
    return (
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to="/">
        <CrownLogo className="logo"/>
        </Link>
          
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                    Shop
            </Link>
            <Link className="nav-link" to='/auth'>
                    Sign In
            </Link>
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;