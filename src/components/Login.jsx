import '../index.css';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase"
import {doc, updateDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {


  const navigate = useNavigate();

  const [data, setData] = useState({
      email: "",
      password: "",
      error: null,
      loading: false,
  })

  const {email, password, error, loading} = data;

  const handleChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setData({...data, error: null, loading: true})
      try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          await updateDoc(doc(db, 'users', result.user.uid), {
              isOnline: true
          });
          setData({email: '', password: '', error: null, loading: false})
          navigate('/');
      } catch (error) {
          setData({...data, error: error.message, loading: false})
      }
  }


  return (
    <div className='loginContainer'>
\      <div className='grid'>
        <h1 className='formHeader'>Erbi<span> Chatapp</span></h1>
        <Form onSubmit={handleSubmit}>
          <br /><br />
          <Form.Group>
              <Form.Control type='email' placeholder='Email *' 
              name='email' value={email} onChange={handleChange}
              required />
          </Form.Group>
          <br />
          <Form.Group>
              <Form.Control type='password' placeholder='Password *' 
              name='password' value={password} onChange={handleChange}
              required />
          </Form.Group>
          <br />
          {error ? <p className='error'>User not found. Please try with correct email or Register </p> : null}
          <div className="d-grid gap-2">
            <Button  variant='success' type='submit' block>  
                {loading? 'Logging in...' : 'Login'} 
            </Button>
          </div>
        </Form>
        <br /> <br />

        <h6>No account? <Link to='/register'>Create one</Link></h6>
      </div>  
    </div>
  )
}

export default Login