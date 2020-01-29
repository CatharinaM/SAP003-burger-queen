
import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import imgFundo from '../img/Fundo.jpg';

function Nav() {
    return (
        <div className={css(styles.color)}>

            <header className={css(styles.logo)}>
                <img className={css(styles.img)} src={require("../img/burgerImport.png")} alt="Logo da imagem"></img>
                <h1>BURGER QUEEN</h1>
            </header>


            <section className={css(styles.links)}>
                <Link to="/Salão">
                    <button className={css(styles.btnInicio)}>Salão</button>
                </Link>
                <Link to="/Cozinha">
                    <button className={css(styles.btnInicio)}>Cozinha</button>
                </Link>
            </section>

        </div>
    )
}

export default Nav;

const styles = StyleSheet.create({
    color: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        backgroundImage: `url(${imgFundo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed'
    },

    logo: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '14rem',
        fontFamily: 'Just Me Again Down Here',
        fontStyle: 'cursive',
        fontSize: '30px',
        color: 'rgb(255, 153, 0)',
        textShadow: '8px 8px black',
        padding:'5%'
    },

    img: {
        width: '14%',
    },

    links: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '50px'
    },

    btnInicio: {
        ':hover': {
            backgroundColor: '#CC9933',
        },
        borderRadius: '10px',
        padding: '60px 100px',
        fontSize: '2rem',
        border: '4px solid',
        borderColor: 'rgb(255, 153, 0)',
        boxShadow: '0-3px 5px #555',
    }
})