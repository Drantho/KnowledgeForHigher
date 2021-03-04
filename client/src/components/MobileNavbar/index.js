import React, { useState, useEffect } from 'react'; 
import { Box, TextInput, Grid,Button, Main } from 'grommet';
import { Link } from 'react-router-dom';
import Tags from '../Tags'

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const MobileNavbar = (props) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0); 
  const [visible, setVisible] = useState(true);  

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    position: 'fixed',
    top: -40,
    height: '140px',
    width: '100%',
    backgroundColor: 'grey',
    textAlign: 'center',
    transition: 'top 0.6s',
    zIndex: 5
  }

  return (
    <div>
    <Box style={{ ...navbarStyles, top: visible ? '0' : '-125px' }}>  
    <Main>
      <Box margin={{top:"85px"}}  overflow="scroll" style={{whiteSpace:"nowrap", minWidth:"1000px"}} direction="row" >
        {props.tags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} style={{ cursor: "pointer", position: "relative", top: "3px", left: "8px" }} onClick={() => props.handleHideTag(tag.name)} /></Tags>)}
      </Box>
    </Main>
    </Box>
    <div style={{top: visible ? '0': '-60px'}}>
        
    </div>
    </div>
  );
};

export default MobileNavbar;