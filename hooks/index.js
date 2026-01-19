import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for debouncing values
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Custom hook for handling async operations
 * @param {Function} asyncFunction - Async function to execute
 * @returns {Object} State and execution function
 */
export function useAsync(asyncFunction) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  })

  const execute = async (...args) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await asyncFunction(...args)
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error) {
      setState({ data: null, loading: false, error })
      throw error
    }
  }

  return {
    ...state,
    execute
  }
}

/**
 * Custom hook for local storage with SSR safety
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {Array} [value, setValue] tuple
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Custom hook for intersection observer (lazy loading)
 * @param {Object} options - Observer options
 * @returns {Array} [setTargetRef, isIntersecting] tuple
 */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        ...options
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [options])

  return [targetRef, isIntersecting]
}

/**
 * Custom hook for handling click outside
 * @param {Function} callback - Function to call when clicking outside
 * @returns {Object} Ref to attach to element
 */
export function useClickOutside(callback) {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [callback])

  return ref
}

/**
 * Custom hook for media queries
 * @param {string} query - Media query string
 * @returns {boolean} Whether query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event) => setMatches(event.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Custom hook for form handling
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @returns {Object} Form state and handlers
 */
export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setValues(prev => ({ ...prev, [name]: fieldValue }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    if (validate) {
      const fieldErrors = validate({ ...values, [name]: values[name] })
      if (fieldErrors[name]) {
        setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }))
      }
    }
  }

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)
    
    // Mark all fields as touched
    const touchedFields = {}
    Object.keys(values).forEach(key => {
      touchedFields[key] = true
    })
    setTouched(touchedFields)

    // Validate all fields
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      
      if (Object.keys(validationErrors).length > 0) {
        setIsSubmitting(false)
        return
      }
    }

    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors
  }
}

/**
 * Custom hook for API calls with caching
 * @param {string} key - Cache key
 * @param {Function} fetcher - Function that returns a promise
 * @param {Object} options - Options
 * @returns {Object} Data, loading state, error, and mutate function
 */
export function useSWR(key, fetcher, options = {}) {
  const { 
    revalidateOnFocus = true, 
    revalidateOnReconnect = true,
    refreshInterval = 0,
    dedupingInterval = 2000
  } = options

  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true,
    isValidating: false
  })

  const cacheRef = useRef(new Map())
  const lastFetchRef = useRef(0)

  const mutate = async (data, shouldRevalidate = true) => {
    if (data !== undefined) {
      setState(prev => ({ ...prev, data, error: null }))
      cacheRef.current.set(key, data)
    }
    
    if (shouldRevalidate) {
      return fetchData()
    }
  }

  const fetchData = async () => {
    const now = Date.now()
    
    // Deduping
    if (now - lastFetchRef.current < dedupingInterval && cacheRef.current.has(key)) {
      setState(prev => ({ 
        ...prev, 
        data: cacheRef.current.get(key), 
        isLoading: false 
      }))
      return cacheRef.current.get(key)
    }

    lastFetchRef.current = now
    setState(prev => ({ ...prev, isValidating: true }))

    try {
      const result = await fetcher(key)
      cacheRef.current.set(key, result)
      setState({
        data: result,
        error: null,
        isLoading: false,
        isValidating: false
      })
      return result
    } catch (error) {
      setState({
        data: null,
        error,
        isLoading: false,
        isValidating: false
      })
      throw error
    }
  }

  useEffect(() => {
    if (key) {
      fetchData()
    }
  }, [key])

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus) return

    const handleFocus = () => {
      if (!state.isValidating) {
        fetchData()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [revalidateOnFocus, state.isValidating])

  // Refresh interval
  useEffect(() => {
    if (refreshInterval <= 0) return

    const interval = setInterval(() => {
      if (!state.isValidating) {
        fetchData()
      }
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval, state.isValidating])

  return {
    ...state,
    mutate
  }
}