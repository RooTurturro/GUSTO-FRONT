import React, { useEffect } from 'react'
import { getAllPurchases, userProfile, updatePurchaseState} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



// aca se obtienen las compras hechas por el usuario
// se muestran en el perfil de cada usuario luego de logearse
// se puede hacer un mapeo y devolver la Card del menu pero siendo ya una compra realizada

const UserHistory = () => {

    const dispatch = useDispatch()
    const email = window.localStorage.getItem('userEmail')

  useEffect(() => {
    dispatch(getAllPurchases())
    dispatch(userProfile(email))
  }, [dispatch])

  const purchases = useSelector((state) => state.purchases)
  const user = useSelector(state => state.user);

  const Swal = require('sweetalert2')

  function purchaseState(id) {
    dispatch(updatePurchaseState(id, { state: 'entregado' }));
    dispatch(getAllPurchases())
    Swal.fire({
        title: 'Entrega confirmada'
    }).then(() => {
        window.location.reload()
    })
}
  return (
    <>

    <div class="container">
      
        
          <div class="row">
            <div class="col-lg-12">
              <div class="main-box clearfix">
                <div class="table-responsive">
                  <table class="table user-list">
                    <thead>
                      <tr>
                        <th scope="col" width="10%"><span>Name</span></th>

                        <th scope="col" width="20%" class="text-center"><span>Adress</span></th>
                        <th scope="col" width="20%"><span>Productos</span></th>
                        <th scope="col" width="20%"><span>Especificaciones</span></th>
                        <th scope="col" width="10%"><span>Total</span></th>
                        <th scope="col" width="20%"><span>Envio a domicilio</span></th>
                        <th scope="col" width="20%"><span>state</span></th>
                      </tr>
                    </thead>
                    {purchases?.map((e) => ( e.name === user.name ? 
                    <tbody>
                      <tr>
                        <td class="text-center" >
                          {e.name}
                        </td>

                        <td class="text-center">
                          {e.address}
                        </td>
                        <td class="text-center">
                          {e.products}
                        </td>
                        <td class="text-center">
                          {e.specification}
                        </td>

                        <td class="text-center">
                          {e.total}
                        </td>
                        <td class="text-center">
                          Delivery
                        </td>

                        { e.takeAway === false ?
                          <td class="text-center">
                            {e.state === 'en proceso' ?
                            <button type='button' class='btn btn-success' onClick={() => purchaseState(e.id)}>Entregada!</button>
                            : e.state}
                          </td>
                        : <td class="text-center">
                        {e.state}
                      </td>}

                      </tr>
                    </tbody>
                    :null ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
    </>
  );
};

export default UserHistory;