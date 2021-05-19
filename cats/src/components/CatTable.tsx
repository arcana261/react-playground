import './CatTable.css'

import { Row, Col } from 'antd'

import CatTile from './CatTile'

import { Cat } from '../Models'

interface Props {
  cats: Cat[]
  columns: number
  tileWidth?: number
  tileHeight?: number
  onClick?: (cat: Cat) => void
}

function CatTable(props: Props) {
  const rows = props.cats.reduce((prev: Cat[][], current: Cat): Cat[][] => {
    if (prev[prev.length - 1].length >= props.columns) {
      prev.push([])
    }
    prev[prev.length - 1].push(current)
    return prev
  }, [[]])

  return (
    <div className="catTable">
      {
        rows.map((row, index) => (
          <Row key={index}>
            {
              row.map((cat, index) => (
                <Col key={index} span={Math.floor(24 / props.columns)}>
                  <CatTile cat={cat} onClick={props.onClick} width={props.tileWidth} height={props.tileHeight}/>
                </Col>
              ))
            }
          </Row>
        ))
      }
    </div>
  )
}

export default CatTable
