
import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import imgFundo from '../img/Fundo.jpg';

function Nav() {
    return (
        <nav className={css(styles.color)}>
            <Link to="/Salão">
                <button className={css(styles.btnInicio)}>Salão</button>
            </Link>
            <Link to="/Cozinha">
                <button className={css(styles.btnInicio)}>Cozinha</button>
            </Link>
        </nav>
    )
}

export default Nav;

const styles = StyleSheet.create({
    color: {
        // display:'flex',
        // background:'white',
        // justifyContent: 'space-around',
        height: '100vh',
        width: '100%',
        // alignItems: 'center'
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundImage: `url(${imgFundo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
    },

    // btnInicio: {
    //     borderRadius: '10px',
    //     padding: '60px 100px',
    //     fontSize: '2rem',
    //     ':hover' : {
    //         color: 'yellow'
    //    },
    // },

    btnInicio: {
        ':hover': {
            backgroundColor: '#CC9933',
        },
        borderRadius: '10px',
        padding: '60px 100px',
        fontSize: '2rem',
    }
})