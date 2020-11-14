import { Button } from '@material-ui/core'
import React from 'react'

const ImageUpload = () => {
    return (
        <div>
            <input type="text"/>
            <input type="file" name="" onChange={handleChange} id=""/>
            <Button onClick={handleUpload}>

            </Button>
        </div>
    )
}

export default ImageUpload
