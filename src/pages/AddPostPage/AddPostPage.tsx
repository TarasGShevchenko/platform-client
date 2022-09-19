import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../store/selectors'

import { createPostRequest } from '../../store/actions'
import './AddPost.css'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(getUser)

  const submitHandler = () => {
    if (user && !!image) {
      try {
        const data = new FormData()
        data.append('title', title)
        data.append('content', content)
        data.append('userId', user.id.toString())
        data.append('image', image)
        dispatch(createPostRequest(data))
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
  const dropImage = useCallback((e: any) => setImage(e.target.files[0]), [])
  const clearFormHandler = () => {
    setContent('')
    setTitle('')
  }

  return (
    <form className="add-post-form" onSubmit={(e) => e.preventDefault()}>
      <label className="add-post-label-img">
        Add image:
        <input type="file" onChange={dropImage} />
      </label>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <div className="add-post-img">{image && <img src={URL.createObjectURL(image)} alt={image.name} />}</div>

      <label className="add-post-label">
        Post title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="add-post-input"
        />
      </label>

      <label className="add-post-label">
        Post text:
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Text"
          className="add-post-textarea"
        />
      </label>

      <div className="add-post-actions">
        <button onClick={submitHandler} className="add-post-button">
          Add
        </button>

        <button onClick={clearFormHandler} className="add-post-button">
          Cancel
        </button>
      </div>
    </form>
  )
}
