import './CatTile.css'

import { Cat } from '../Models'

interface Props {
  cat: Cat
  width?: number
  height?: number
  onClick?: (cat: Cat) => void
}

function CatTile(props: Props) {
  const image = `http://quantcats.herokuapp.com/static/cats/${props.cat.id}.png`

  const onClick = () => {
    if (props.onClick) {
      props.onClick(props.cat)
    }
  }

  return (
    <img
      src={image}
      width={props.width || 128}
      height={props.height || 256}
      className={props.cat.selected ? 'catTile catTileSelected' : 'catTile'}
      onClick={onClick}
      alt='cat'/>
  )
}

export default CatTile
