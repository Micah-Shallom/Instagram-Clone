import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { firestore,firebase } from '../../firebase.utils';
import './Posts.css'

const Post = ({username,caption,user,imageUrl,postId}) => {
    const [comments , setComments] = useState([]);
    const [comment , setComment] = useState('');

    useEffect(() => {
        let unsubscribe;

        if(postId){
            unsubscribe = firestore
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()))
            })
        }

        return () => unsubscribe();
    },[postId])

    const postComment = e => {
        e.preventDefault()

        try {
            let commentRef = firestore.collection('posts').doc(postId).collection('comments')
            
            commentRef.add({
                text : comment,
                username : user.displayName,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
            })
            setComment('')
            
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='post'>
            <div className="post__header">
                <Avatar 
                    className='post__avatar'
                    alt='Micah Shallom'
                    src='/static/images/avatar/1.jpg'
                />
                <h3>{username}</h3>
            </div>
                {/* Header -> avatar + username */}

            <img src={imageUrl} className='post__image' alt="photo"/>
                {/* Image */}

            <h4 className='post__text'>
                <strong>{username} </strong>
                {caption}
            </h4>
         
                {/* Username + caption */}

                <div className="post__comments">
                    {
                        comments.map(({username,text}) => (
                            <p>
                                <strong>{username} </strong>
                                {text}
                            </p>
                        ))
                    }
                </div>

                    {
                        user && (
                            <form className='form'>
                            <input 
                                className='post__input'
                                type='text'
                                placeholder='Add a comment'
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                            <button
                                className='post__button'
                                disabled={!comment}
                                type='submit'
                                onClick={postComment}
                            >
                                Post
                            </button>
                </form>
                        )
                    }
              
        </div>
    )
}

export default Post
