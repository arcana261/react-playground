import {
  Layout,
  notification
} from 'antd'
import { useState } from 'react'

import ClawderSelector from './components/homepage/ClawderSelector'
import ClawderShowCase from './components/homepage/ClawderShowCase'
import Header from '../components/Header'

import { Cat } from '../Models'

interface Props {
}

function HomePage(props: Props) {
  const [showCaseCats, setShowCaseCats] = useState<Cat[][]>([])
  const onClawderFound = (cats: Cat[]): void => {
    const existing = showCaseCats.some((showcased: Cat[]): boolean => {
      return showcased[0].id === cats[0].id &&
        showcased[1].id === cats[1].id &&
        showcased[2].id === cats[2].id
    })

    if (existing) {
      notification['warning']({
        message: 'Duplicate',
        description: 'whoops! you had already selected that combination!'
      })
    } else {
      setShowCaseCats([...showCaseCats, cats])
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout>
        <Layout>
          <Layout.Content>
            <ClawderSelector onClawderFound={onClawderFound} />
          </Layout.Content>
        </Layout>
        <Layout.Sider width={200}>
          <ClawderShowCase cats={showCaseCats} />
        </Layout.Sider>
      </Layout>
    </Layout>
  )
}

export default HomePage
