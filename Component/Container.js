import PropTypes from "prop-types";
import React from 'react';
import { Container } from 'native-base';
const Container=(props)=>{

return(
    <Container 
        {...props}
    >
        {props.children}
    </Container>
)

}

Container.propTypes = {
  children: PropTypes.any
}

export default Container;