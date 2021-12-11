import { useState, useEffect } from "react"

const API = process.env.REACT_APP_API;


const ClienteForm = () => {

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

   
    let [clientes, setClientes] = useState([]);
    
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (!editing){
            const res = await fetch(`${API}/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre,
                    telefono: telefono
                })
            })
            await res.json();
        } else {
            const res = await fetch(`${API}/clientes/${id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre,
                    telefono: telefono
                })
            })
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('')
        }
      
        await getCliente();
        
        setNombre('');
        setTelefono('');
        
    }

    const getCliente = async () => {
        const res = await fetch(`${API}/clientes`);
        const datos = await res.json();
        setClientes (datos);
    }

    useEffect(() => {
        getCliente();
    }, [])
    // elimanar cliente
    const deleteCliente = async (id) => {
        const clienteResponse = window.confirm('Esta seguro de querer eliminarlo ?')
        if (clienteResponse) {
            const res = await fetch(`${API}/clientes/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data)
            await getCliente();
        }
    } 

    // editar cliente
   
    const editCliente = async (id) => {
        const res = await fetch(`${API}/clientes/${id}`)
        const data = await res.json();

        setEditing(true)
        setId(id)

        setNombre(data.name)
        setTelefono(data.telefono)



    };

    return (
        <>
          <div className="row">
              <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                        name="nombre"
                        type="text" 
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                        placeholder="Ingrese el nombre del cliente"
                        autoFocus
                        className="form-control" />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setTelefono(e.target.value)}
                        value={telefono}
                        placeholder="telefono"
                        name="telefono"
                        className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {editing ? 'Editar' : 'Crear'}
                    </button>
                </form>
            
              </div>
              <div className="col-md-6 card card-body">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <th>name</th>
                              <th>telefono</th>
                              <th>Fecha</th>
                              <th>Hora</th>
                              <th>operaciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          { 
                            
                            clientes.map( (cliente) => (
                              <tr key={cliente.id}>
                                  
                                  <td>{cliente.name}</td>
                                  <td>{cliente.telefono}</td>
                                  <td>{cliente.fecha}</td>
                                  <td>{cliente.hora}</td>
                                  <td>
                                      <button 
                                        className="btn btn-secondary btn-sm btn-black"
                                        onClick={() => editCliente(cliente.id)}>
                                          EDITAR
                                      </button>
                                      <button 
                                        className="btn btn-danger btn-sm btn-black"
                                        onClick={() => deleteCliente(cliente.id)}>
                                          ELIMINAR
                                      </button>
                                  </td>

                              </tr>
                            ))
                        }
                      </tbody>
                  </table>
              </div>
          </div>
        </>
    )
}

export default ClienteForm
