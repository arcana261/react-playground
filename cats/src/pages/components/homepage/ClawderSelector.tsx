import {
  Spin,
  notification
} from 'antd'
import { useState, useEffect } from 'react'

import CatTable from '../../../components/CatTable'

import { Cat } from '../../../Models'

interface Props {
  onClawderFound?: (cats: Cat[]) => void
}

function ClawderSelector(props: Props) {
  const {onClawderFound} = props

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [cats, setCats] = useState<Cat[]>([])

  const fetchCats = async (): Promise<Cat[]> => {
    const response = await fetch('http://quantcats.herokuapp.com/bag')
    const data = await response.json()

    return data.cats.map((cat: any, id: number) => ({
      id: `${cat[0]}${cat[1]}${cat[2]}${cat[3]}`,
      stripes: cat[0],
      color: cat[1],
      shape: cat[2],
      eyes: cat[3],
      selected: false,
    }))
  }

  const fetchCheckCatsGetAlong = async (cat1: Cat, cat2: Cat, cat3: Cat): Promise<boolean> => {
    const url = `http://quantcats.herokuapp.com/clowder?cat=${cat1.id}&cat=${cat2.id}&cat=${cat3.id}`
    const response = await fetch(url)
    return response.status === 200
  }


  useEffect((): void => {
    const loadCats = async () => {
      const cats: Cat[] = await fetchCats()
      setCats(cats)
      setIsLoading(false)
    }

    loadCats()
  }, [])

  useEffect((): void => {
    const deselectCats = (deselect: Cat[]): void => {
      const newCats = [...cats]

      deselect
        .filter((c: Cat): boolean => c.selected === true)
        .forEach((c: Cat): void => {
          const newCat = {...c, selected: false}
          const index = cats.findIndex((c2: Cat) => c2.id === c.id)
          newCats.splice(index, 1, newCat)
        })

      setCats(newCats)
    }

    const addClawder = async (selectedCats: Cat[]) => {
      if (!(await fetchCheckCatsGetAlong(selectedCats[0], selectedCats[1], selectedCats[2]))) {
        notification['error']({
          message: 'Error',
          description: 'Those cats do not get along'
        })
      } else {
        notification['success']({
          message: 'Hooray',
          description: 'Those cats get along'
        })

        if (onClawderFound) {
          onClawderFound(selectedCats)
        }
      }

      deselectCats(selectedCats)
      setIsLoading(false)
    }

    const selectedCats = cats.filter((c: Cat): boolean => c.selected === true)
    if (selectedCats.length > 3) {
      notification['error']({
        message: 'Error',
        description: 'You can not select more than 3 cats'
      })
      deselectCats(selectedCats)
      return
    }

    if (selectedCats.length === 3) {
      setIsLoading(true)
      addClawder(selectedCats)
    }
  }, [cats, onClawderFound])

  const onCatClick = (cat: Cat): void => {
    if (isLoading) {
      return
    }

    toggleCat(cat)
  }

  const toggleCat = (cat: Cat): void => {
    const newCat = {...cat, selected: !cat.selected}
    const index = cats.findIndex((c: Cat) => c.id === cat.id)
    if (index < 0) {
      throw new Error(`cat not found: ${cat.id}`)
    }

    const newCats = [...cats]
    newCats.splice(index, 1, newCat)
    setCats(newCats)
  }



  return (
    <Spin spinning={isLoading}>
      <CatTable cats={cats} tileWidth={128} tileHeight={256} columns={4} onClick={onCatClick}/>
    </Spin>
  )
}

export default ClawderSelector
