import React, {useState, useEffect} from 'react'
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import {auth, db, storage} from '../firebase';
import {signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Img from '../images/profile_avatar.png';
import {CameraSvg} from '../images/CameraSvg'
import {ref, getDownloadURL, uploadBytes } from 'firebase/storage';



export const Navbar = ({toggleIt}) => {

  const navigate = useNavigate();
  const [img, setImg] = useState('');
  const [user, setUser] = useState();
  

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if(docSnap.exists){
        setUser(docSnap.data());
      }
    })
    if (img) {
      const uploadImg = async() => {
        const imgRef = ref(
          storage,  `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          });
          console.log(url);
          setImg('');
        } catch (err) {
          console.log(err.messsage);
        }
      };
      uploadImg();
    }
  },[img])
  

    
  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false
    });
    await signOut(auth);
    navigate('/');
  };

  

  return (
    <nav id='nav'>
        <h1 className='navHeader'>Erbi <span>ChatApp</span></h1>
        {user ? (
            <div className='img_container' onClick={toggleIt} id="123">
                <img src={user.avatar || Img} alt='.' />
                <div className='overlay'>
                    <div>
                    <label htmlFor='photo'>
                        <CameraSvg />
                    </label>
                    <input type='file' accept='image/*' style={{display: 'none'}} id='photo'
                        onChange={(e) => setImg(e.target.files[0]) } />
                    </div>
                </div>
            </div>
        ): null
        }
        <div className='logoutBut'>
                <button className='btn' onClick={handleSignout}>Logout</button>
        </div>
    </nav>
  )
}
