import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import { updatePostRequest } from '../../store/actions'
// import { getCurrentPost } from '../../store/selectors'
import './EditPostPage.css'

export const EditPostPage = () => {
  // const post = useSelector(getCurrentPost)
  // const [title, setTitle] = useState(post?.title || '')
  // const [text, setText] = useState(post?.text || '')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const empty = post?.imgUrl

  const submitHandler = () => {
    // try {
    // const postId = post?._id
    // const data = new FormData()
    // data.append('title', title)
    // data.append('text', text)
    // empty && data.append('image', image)
    // postId && dispatch(updatePostRequest({ data, postId }))
    // navigate('/')
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const dropImage = useCallback((e: any) => setImage(e.target.files[0]), [])
  const clearFormHandler = () => {
    // setText('')
    // setTitle('')
    // navigate(`/posts/${post?._id}`)
  }

  return (
    <form className="edit-post-form" onSubmit={(e) => e.preventDefault()}>
      {/*{!empty && (*/}
      <label className="edit-post-label-img">
        Add image:
        <input type="file" onChange={dropImage} />
      </label>
      {/*)}*/}
      <div className="edit-post-img">
        {/*{empty ? (*/}
        {/*  <img src={`http://localhost:3002/${post?.imgUrl}`} alt={post?.imgUrl} />*/}
        {/*) : (*/}

        {/*  <img src={URL.createObjectURL(image)} alt={image.name} />*/}
        {/*)}*/}
      </div>

      <label className="edit-post-label">
        Post title:
        <input
          type="text"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="edit-post-input"
        />
      </label>

      <label className="edit-post-label">
        Post text:
        <textarea
          // onChange={(e) => setText(e.target.value)}
          // value={text}
          placeholder="Text"
          className="edit-post-textarea"
        />
      </label>

      <div className="edit-post-actions">
        <button onClick={submitHandler} className="edit-post-button">
          Edit
        </button>

        <button onClick={clearFormHandler} className="edit-post-button">
          Cancel
        </button>
      </div>
    </form>
  )
}
