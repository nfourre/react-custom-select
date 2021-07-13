import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import Option from './Option'
import './styles.scss'

const Select = ({id, placeholder, options, value, error, errorMessage, disabled}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [focusIndex, setFocusIndex] = useState(null)

  const optionsNodes = useRef(null)
  const wrapper = useRef(null)
  const dropdown = useRef(null)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    setSelected(option)
    setOpen(!open)
  }

  const handleKeyDown = (event, option) => {
    if(event.key !== 'Enter') return null
    setSelected(option)
    setOpen(!open)
  }

  useEffect(() => {
    if(focusIndex !== null) {
      optionsNodes.current.children[focusIndex].focus()
    }
  }, [focusIndex])

  useEffect(() => {
    wrapper.current.style.height = `${dropdown.current.getBoundingClientRect().height}px`

  }, [selected])

  useEffect(() => {
    function handleClickOutside(event) {
      if (!wrapper.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapper])

  const handleUserKeyPress = (event => {
    const { key } = event;
    console.log(key);
    let nextIndex

    if(key === 'ArrowDown' && open && focusIndex < optionsNodes.current.children.length - 1) {
      focusIndex !== null ? nextIndex = focusIndex + 1 : nextIndex = 0;
      setFocusIndex(nextIndex)
    }

    if(key === 'ArrowDown' && !open) {
      setOpen(!open)
    }

    if(key === 'ArrowUp' && open) {
      focusIndex > 0 ? nextIndex = focusIndex - 1 : nextIndex = 0;
      setFocusIndex(nextIndex)
    }

    if(key === 'Escape' && open) {
      document.activeElement.blur()
      setOpen(!open)
    }
  });

  return (
    <div ref={wrapper} onKeyDown={handleUserKeyPress} className="dropdown-wrapper">
      <div ref={dropdown} className={"dropdown " + (open ? 'active' : '')}>
        {selected ? null : <label id="label" className="selected-option">{placeholder}</label>}
        <button
          className={"selected-wrapper " + (selected ? 'selected' : '')}
          aria-haspopup="listbox"
          aria-labelledby="label"
          onClick={handleOpen}>
          {selected ? 
            <div className="selected-value">
              <div className="info">
                <span>{selected.label}</span>
                <a href={selected.link}>En savoir plus</a>
              </div>
              <div className="price">{selected.price.value} {selected.price.currency}</div>
            </div> : <div className="empty-value"></div>}
          <span className="select-icon"></span>
        </button>
      </div>
      <div className={"options-wrapper " + (open ? '' : 'hidden')}>
        <ul
          ref={optionsNodes}
          id={id}
          role="listbox"
          aria-labelledby="label">
            {options.map((opt, index) => 
              <Option
                id={index}
                key={opt.label}
                label={opt.label}
                price={opt.price}
                link={opt.link}
                handleClick={() => handleSelect(opt)}
                handleKeyDown={(e)=> handleKeyDown(e, opt)} />
              )
            }
        </ul>
      </div>
    </div>
  )
}

Select.propTypes = {
	id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.object,

}

export default Select