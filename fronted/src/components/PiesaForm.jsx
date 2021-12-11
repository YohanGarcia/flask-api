import { useState, useEffect } from "react"

const API = process.env.REACT_APP_API;


const PiesaForm = () => {

    const [nombre, setNombre] = useState('');


   
    let [piesas, setPiesas] = useState([]);
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (!editing){
            const res = await fetch(`${API}/piesas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre
               
                })
            })
            await res.json();
        } else {
            const res = await fetch(`${API}/piesas/${id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre,
                   
                })
            })
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('')
        }
      
        await getPiesa();
        
        setNombre('');
    
        
    }

    const getPiesa = async () => {
        const res = await fetch(`${API}/piesas`);
        const datos = await res.json();
        setPiesas (datos);
    }

    useEffect(() => {
        getPiesa();
    }, [])
    // elimanar piesa
    const deletepiesa = async (id) => {
        const piesaResponse = window.confirm('Esta seguro de querer eliminarlo ?')
        if (piesaResponse) {
            const res = await fetch(`${API}/piesas/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data)
            await getPiesa();
        }
    } 

    // editar piesa
   
    const editpiesa = async (id) => {
        const res = await fetch(`${API}/piesas/${id}`)
        const data = await res.json();

        setEditing(true)
        setId(id)

        setNombre(data.name)
     



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
                        placeholder="Ingrese el nombre del piesa"
                        autoFocus
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
                   
                              <th>Fecha</th>
                              <th>Hora</th>
                              <th>operaciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          { 
                            
                            piesas.map( (piesa) => (
                              <tr key={piesa.id}>
                                  
                                  <td>{piesa.name}</td>
                          
                                  <td>{piesa.fecha}</td>
                                  <td>{piesa.hora}</td>
                                  <td>
                                      <button 
                                        className="btn btn-secondary btn-sm btn-black"
                                        onClick={() => editpiesa(piesa.id)}>
                                          EDITAR
                                      </button>
                                      <button 
                                        className="btn btn-danger btn-sm btn-black"
                                        onClick={() => deletepiesa(piesa.id)}>
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

export default PiesaForm
