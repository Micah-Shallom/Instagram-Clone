import {  Button, Input, makeStyles, Modal } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import './App.css'
import Post from './Components/Posts/Posts'
import { auth, firestore } from './firebase.utils';
import logo from './assets/Instagram-name-logo-clipart-PNG.png'
import ImageUpload from './Components/ImageUpload/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #ccc',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const App = () => {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle)

    const [posts , setPosts] = useState([ ]);
    const [open , setOpen] = useState(false);
    const [openSignIn , setOpenSignIn] = useState(false);
    const [userName , setUserName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [user , setUser] = useState(null)

    useEffect(() => {
     const unsubscribeFromAuthStream = auth.onAuthStateChanged(userAuth => {
            if(userAuth){

                console.log(userAuth)
                setUser(userAuth)
            }else{
                setUser(null)
            }
        })

        return () => unsubscribeFromAuthStream()
    },[])

    useEffect(() => {
        firestore.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id : doc.id,
                post : doc.data()
            }))
        )})
    },[]);

    const signUp = event => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email,password).then(userAuth => {
           return userAuth.user.updateProfile({
                displayName : userName
            })
        })
        .catch(err => alert(err.message))

        setOpen(false)
    }

    const signIn = event => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(email,password).catch(err => alert(err.message))
        setOpenSignIn(false)
    }

    return (
        <div className='App'>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            >

        <div style={modalStyle} className={classes.paper}>
        <form className='app__signup'>
        <center>
                <img src={logo} className='app__headerImage' alt=""/>
            </center>
                <Input
                    placeholder='UserName'
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={signUp}>Sign Up</Button>
        </form>
          
           
        </div>
            </Modal>

            <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
            >

        <div style={modalStyle} className={classes.paper}>
        <form className='app__signup'>
        <center>
                <img src={logo} className='app__headerImage' alt=""/>
            </center>
                <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={signIn}>Sign In</Button>
        </form>
          
           
        </div>
            </Modal>


         <div className="app__header">
             <img src={logo} alt="logo" className='app__headerImage'/>
             {
                    user ? (
                        <Button onClick={() => auth.signOut()}>Log Out</Button>
                    ) : (
                        <div className="app__loginContainer">
                        <Button onClick={() =>setOpenSignIn(true) }>Sign In</Button>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>

                        </div>
                    )
                }
         </div>

         <div className="app__posts">
                <div className="app__postsLeft">
                    {
                        posts.map(({id,post}) => (
                            <Post postId={id} user={user}  key={id} {...post} />
                        ))
                    }
                </div>
                <div className="app__postsRight">
                        <InstagramEmbed
                    url='https://instagram.com/p/B_uf9dmAGPw/'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
        />
                </div>
         </div>
    
       <div className='loginForm'>
            {user?.displayName ? (
                <ImageUpload username={user.displayName}/>
            ) :
                <h3>Login To Upload</h3>
            }
       </div>
        </div>
    )
}

export default App