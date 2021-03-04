import React, { useState, useEffect } from 'react';
import { Box, TextInput, Grid, Button, Main, Text } from 'grommet';
import { Link } from 'react-router-dom';
import Tags from '../Tags'

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
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
        height: '150px',
        width: '100%',
        backgroundColor: '#51617E',
        textAlign: 'center',
        transition: 'top 0.6s',
        zIndex: 5
    }

    const [toggleTags, setToggleTags] = useState(false);

    const tagButton = () => {
        toggleTags ? setToggleTags(false) : setToggleTags(true);
    }

    return (
        <div>
            <Box style={{ ...navbarStyles, top: visible ? '0' : '-125px' }}>
                <Main>
                    <Box margin={{ top: "70px" }} overflow="scroll" style={{ whiteSpace: "nowrap", minWidth: "1000px" }} direction="row" >
                        {toggleTags ?
                            props.tags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} style={{ cursor: "pointer", position: "relative", top: "3px", left: "8px" }} onClick={() => props.handleHideTag(tag.name)} /></Tags>)
                            :
                            props.popularTags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} style={{ cursor: "pointer", position: "relative", top: "3px", left: "8px" }} onClick={() => props.handleHideTag(tag.name)} /></Tags>)
                        }

                    </Box>
                </Main>
                <Box margin={{ top: "-10px" }} >
                    <Box direction="row">
                        <Box margin={{ left: "18px" }}>
                            <Button onClick={props.toggleQuestion} style={{ background: "#51617E", borderBottomLeftRadius: "25px", width: "125px" }} ><Text color="#FCE181">Questions</Text></Button>
                        </Box>
                        {toggleTags ?
                        <Box margin={{ left: "1px" }}>
                            <Button onClick={tagButton} style={{ background: "#51617E", width: "125px" }}><Text color="#FCE181">My Tags</Text></Button>
                        </Box>
                        :
                        <Box margin={{ left: "1px" }}>
                        <Button onClick={tagButton} style={{ background: "#51617E", width: "125px" }}><Text color="#FCE181">Popular Tags</Text></Button>
                        </Box>
                        }
                        <Box margin={{ left: "1px" }}>
                            <Button onClick={props.toggleQuestion} style={{ background: "#51617E", borderBottomRightRadius: "25px", width: "125px" }}><Text color="#FCE181">Services</Text></Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default MobileNavbar;