import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Perfil.module.css'
import { Link } from 'react-router-dom';
import { userProfile } from '../../redux/actions';


const Perfil = () => {

    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.user);
    
    
    console.log('Estado Global ' + usuario)
    
    
    const email = window.localStorage.getItem('userEmail')
        
    

    const picture = window.localStorage.getItem('userPicture')
    
    console.log ('este es localstorage antes del use ' + email) 
    const variablePrueba = 'info fuera del use'
    
    console.log(email)

    useEffect(()=>{


            console.log('Porque no haces dispatch')
            console.log(variablePrueba)

            dispatch(userProfile(email))

    
       

    }, [dispatch])
   
    console.log('estado global' + usuario.name)

    




    return (
        

                <div>
                    <div className={styles.container}>
                        <div className={styles.bloque}>
                            <div className={styles.left}>

                                <div>
                                    <img src={picture} className={styles.imagen} alt="imagen de usuario" />
                                </div>

                                <div>
                                    <h3 className={styles.text}>{usuario.name}</h3> 
                                </div>

                            </div>

                            <div className={styles.right}>
                                <div className={styles.info}>

                                    <div>

                                        <h3 className={styles.titulo}>Correo</h3>
                                        <p className={styles.text}>{usuario.email}</p>
                                        
                                    </div>

                                    <div>
                                        <h3 className={styles.titulo}>Tel??fono</h3>
                                         <p className={styles.text}>{usuario.phone}</p>

                                    </div>

                                    <div>
                                        <h3 className={styles.titulo}>Direcci??n</h3>
                                        <p className={styles.text}>{usuario.address}</p>
                                    </div>

                                </div>


                                <div className={styles.botones}>
                                   

                                    <Link to={'/editarperfilusuario'}>
                                        <button className={styles.button}>
                                            <span>Editar Perfil</span>
                                        </button>
                                    </Link>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>

    )
}

export default Perfil;