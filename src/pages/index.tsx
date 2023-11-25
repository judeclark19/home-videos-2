import TestComponent from '@/components/TestComponent'
import React from 'react'

import styled from 'styled-components'

const StyledDiv = styled.div`
    color: red;`

function index() {
    return (
        <StyledDiv><TestComponent /></StyledDiv>
    )
}

export default index