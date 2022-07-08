import React ,{useState} from 'react'
import '../index.css';
import { Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase"
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      error: null,
      loading: false,
  })

  const {name, email, password, error, loading} = data;

  const handleChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setData({...data, error: null, loading: true})
      try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'users', result.user.uid), {
              uid: result.user.uid,
              name,
              email,
              createdAt: Timestamp.fromDate(new Date()),
              isOnline: true
          });
          setData({name: '', email: '', password: '', error: null, loading: false})
          navigate('/');
      } catch (error) {
          setData({...data, error: error.message, loading: false})
      }
  }

  return (
    <div className='signupContainer'>
      <div className='grid'>
        <h1 className='formHeader'>Erbi<span> Chatapp</span></h1>
        <Form onSubmit={handleSubmit}>
        
        <br />        <br />
        <Form.Group>
            <Form.Control name='name' value={name} onChange={handleChange} type='username'  placeholder='Name *' 
            required />
        </Form.Group>
        <br />

        <Form.Group>
            <Form.Control name='email' value={email} onChange={handleChange} type='email' placeholder='Email *' 
            required />
        </Form.Group>
        <br />
        <Form.Group>
            <Form.Control name='password' value={password} onChange={handleChange} type='password' placeholder='Password *' 
            required />
        </Form.Group>
        <br />
        {error ? <p className='error'>Email already in use. Please try with different email ;) </p> : null}
        <div className="d-grid gap-2">
        <Button variant='success' type='submit'> {loading? 'Creating...' : 'Create an Account'} </Button>
        </div>
    </Form>
    <br /> <br />

    <h6>Already have an account? <Link to='/'>Sign in</Link></h6>
      </div>      
      
    </div>
  )
}

export default Register;