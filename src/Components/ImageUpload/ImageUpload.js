import { Button, LinearProgress, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { firestore, storage, firebase } from '../../firebase.utils';
import './ImageUpload.css'

const useStyles = makeStyles({
    progress: {
        marginBottom: '10px',

    }
})

const ImageUpload = ({username}) => {
    const [caption , setCaption] = useState('');
    const [progress , setProgress] = useState(0);
    const [image , setImage] = useState(null);

    const classes = useStyles();

    const handleChange = e => {
        const file = e.target.files[0]
        if(file){
            setImage(file)
        }
    }
    const handleUpload = e => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            'state_changed',

            (snapshot) => {
                //Progress Function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },

            (error) => {
                //Error Function
                alert(error.message)
            },

            ()  => {
                //Coomplete Function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db

                        firestore.collection('posts').add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            caption,
                            imageUrl : url,
                            username
                        });

                        setProgress(0)
                        setCaption('')
                        setImage(null);
                    })
            }
        )
    }
    return (
        <div className='imageUpload'>
        <LinearProgress className={classes.progress}  variant='determinate' value={progress} />
            <input 
            type="text" placeholder='Enter a Caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
