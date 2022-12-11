import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'

import { getMeSelector } from '../../store/selectors'
import { createPostRequest } from '../../store/actions'
import { Link } from '../../enums'

const AddPostContainer = styled('form')(() => ({
  margin: 'auto',
  padding: 20,
  width: 400,
  minWidth: 350,
  minHeight: 400,
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 10,
  zIndex: 10,
  backdropFilter: 'blur(25px)',
}))

const AddPostLabelImg = styled('label')(() => ({
  color: 'lightgray',
  padding: '8px 0',
  background: 'dimgray',
  marginTop: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderStyle: 'dotted',
}))

const InputImage = styled('input')(() => ({
  display: 'none',
}))

const AddPostLabel = styled('label')(() => ({
  color: 'white',
  opacity: 70,
}))

const AddPostImg = styled('div')(() => ({
  width: '100%',
  padding: '8px 0',
  ['& img']: {
    display: 'flex',
    width: 'inherit',
  },
}))
const AddPostInput = styled('input')(() => ({
  marginTop: 4,
  color: 'black',
  width: '100%',
  borderRadius: 8,
  background: 'gray',
  borderWidth: 1,
  padding: '4px 8px',
  outline: 'none',
  ['&::placeholder']: {
    color: 'dimgray',
  },
}))
const AddPostTextarea = styled('textarea')(() => ({
  marginTop: 4,
  color: 'black',
  width: '100%',
  borderRadius: 8,
  background: 'gray',
  borderWidth: 1,
  padding: '4px 8px',
  outline: 'none',
  resize: 'none',
  height: 160,
  ['&::placeholder']: {
    color: 'dimgray',
  },
}))
const AddPostActions = styled('div')(() => ({
  display: 'flex',
  gap: 32,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 16,
}))
const AddPostButton = styled('button')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: 'gray',
  color: 'white',
  border: 'none',
  borderRadius: 2,
  padding: '8px 16px',
}))

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const me = useSelector(getMeSelector)

  const submitHandler = () => {
    if (me && !!image) {
      try {
        const data = new FormData()
        data.append('title', title)
        data.append('content', content)
        data.append('userId', me.id.toString())
        data.append('image', image)
        dispatch(createPostRequest(data))
        navigate(Link.home)
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
    <AddPostContainer onSubmit={(e) => e.preventDefault()}>
      <AddPostLabelImg>
        Add image:
        <InputImage type="file" onChange={dropImage} />
      </AddPostLabelImg>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <AddPostImg>{image && <img src={URL.createObjectURL(image)} alt={image.name} />}</AddPostImg>

      <AddPostLabel>
        Post title:
        <AddPostInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          maxLength={50}
        />
      </AddPostLabel>

      <AddPostLabel>
        Post text:
        <AddPostTextarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Text"
          maxLength={255}
        />
      </AddPostLabel>

      <AddPostActions>
        <AddPostButton onClick={submitHandler}>Add</AddPostButton>
        <AddPostButton onClick={clearFormHandler}>Cancel</AddPostButton>
      </AddPostActions>
    </AddPostContainer>
  )
}
