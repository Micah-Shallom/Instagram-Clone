import { Avatar } from '@material-ui/core'
import React from 'react'
import './Posts.css'

const Post = ({username,caption,imageUrl}) => {
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
                <strong>Micah Shallom:</strong>
                {caption}
            </h4>
         
                {/* Username + caption */}
        </div>
    )
}

export default Post
