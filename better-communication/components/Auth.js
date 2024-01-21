import {provider, auth} from '../firebase.js';
import {signInWithPopup} from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Auth = (props) => {
    const {setAuth} = props;

    const signIn = async() =>{
        try{
            const info = await signInWithPopup(auth, provider);
            cookies.set("auth-token", info.user.refreshToken);
            setAuth(true);
        }
        catch(err){
            console.error(err);
        }
        
    }

    return(
        <div className='authPage'>
          <div className='authHeading'>
            <h1 className='authH1'>Welcome to better communication</h1><br/>
            <h5 className='authH5'>Adding friends and App customisation coming soon..probably</h5>
          </div>
          <br/>
          <div className='authSignIn'>
            <button className='signInButton' onClick={signIn}><h3>Sign in the google</h3></button>
          </div>
        </div>
        
    )
}

export default Auth;