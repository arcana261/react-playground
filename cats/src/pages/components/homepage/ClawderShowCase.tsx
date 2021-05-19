import './ClawderShowCase.css'

import CatTable from '../../../components/CatTable'

import { Cat } from '../../../Models'

interface Props {
  cats: Cat[][]
}

function ClawderShowCase(props: Props) {
  return (
    <div className="clawderShowCase">
      <p>
        Clawders Found:
      </p>
      <CatTable
        cats={
          props.cats.reduce((prev: Cat[], current: Cat[]): Cat[] => {
            return prev.concat(current)
          }, [])
        }
        columns={3}
        tileWidth={32}
        tileHeight={64}
      />
    </div>
  )
}

export default ClawderShowCase
