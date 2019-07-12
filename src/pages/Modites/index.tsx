import React, { useEffect } from 'react'
import GlobeModiteList from '../../components/GlobeModiteList'
import ModiteList from '../../components/ModiteList'
import NoResults from '../../components/NoResults'
import { ContextArray as DataContextArray, useData } from '../../service/Data'
import { ContextArray as GlobalContextArray, useGlobal } from '../../service/Global'

interface Props {
  listType: 'globe' | 'list'
}

let lastScrollOffset = 0 // used by onScroll

const Modites = ({ listType }: Props) => {
  const [{ modites }]: DataContextArray = useData()
  const [globalState, setGlobalState]: GlobalContextArray = useGlobal()

  useEffect(() => {
    setGlobalState({
      ...globalState,
      headerHidden: false,
      searchBarCollapsed: modites.length === 0,
      searchBarHidden: false,
    })
  }, [modites])

  if (!modites.length) {
    return <NoResults />
  }

  if (listType === 'list') {
    const onListScroll = ({ scrollOffset }: { scrollOffset: number }): void => {
      lastScrollOffset = scrollOffset

      setGlobalState({
        ...globalState,
        searchBarCollapsed: scrollOffset >= Math.min(100, document.body.clientHeight / 6),
      })
    }

    return (
      <ModiteList addSpacerRow={true} records={modites} onScroll={onListScroll} lastScrollOffset={lastScrollOffset} />
    )
  } else {
    return <GlobeModiteList />
  }
}

export default Modites
