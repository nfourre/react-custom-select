import './styles.scss'

const Option = ({id, label, link, price, handleClick, handleKeyDown}) => {

  return (
    <li id={`option_`+id} role="option" tabIndex="0" onClick={handleClick} onKeyDown={handleKeyDown}>
      <div className="info">
        <span>{label}</span>
        <a href={link}>En savoir plus</a>
      </div>
      <div className="price">{price.value} {price.currency}</div>
      
    </li>
  )
}

export default Option;