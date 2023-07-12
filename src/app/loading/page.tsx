import React, { Fragment } from 'react'

import Loading from '../components/Loading'
import DinoAnimation from '../components/Animation'

export function LoadingAnimation() {
  return (
    <Fragment>
      {/* <Loading /> */}
      <DinoAnimation />
    </Fragment>
  )
}

// // Função getLayout que retorna o próprio conteúdo da página, sem utilizar o layout
// LoadingAnimation.getLayout = function getLayout(page: React.JSX.Element) {
//   return page
// }

LoadingAnimation.getLayout = () => null

export default LoadingAnimation
