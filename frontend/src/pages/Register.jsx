import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/spinner' // Capitalized Spinner
import { register, reset } from "../features/auth/authslice"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '' // Fixed: Added missing state field
  })

  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset()) // Resets auth state on redirect
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      const userData = { name, email, password }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner /> // Fixed: Capitalized custom component
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser style={{ marginRight: '10px', verticalAlign: 'middle', color: '#6366f1' }} />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input 
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <input 
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <input 
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <input 
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm your password'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register