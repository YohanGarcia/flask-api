import { useState, useEffect } from "react"

const API = process.env.REACT_APP_API;

const CocheCliente = () => {

    const [name, setName] = useState('');
    const [coche, setCoche] = useState('');
    const [placa, setPlaca] = useState('');
    const [año, setAño] = useState('');
    const [color, setColor] = useState('');



    let [coches, setCoches] = useState([]);
    let [clientes, setClientes] = useState([]); 
    let [clienteCoches, setClienteCoche] = useState([])

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const res = await fetch(`${API}/cliente-coche`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    coche: coche,
                    placa: placa,
                    año: año,
                    color: color

                })
            })
            await res.json();
        } else {
            const res = await fetch(`${API}/cliente-coche/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    coche: coche,
                    placa: placa,
                    año: año,
                    color: color

                })
            })
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('')
        }

        await getClienteCoche();
        setName('');
        setCoche('');
        setAño('');
        setPlaca('');
        setColor('');


    }
    const getClienteCoche = async () => {
        const res = await fetch(`${API}/cliente-coche`);
        const datos = await res.json();
        setClienteCoche(datos);
    }

    const getCliente = async () => {
        const res = await fetch(`${API}/clientes`);
        const datos = await res.json();
        setClientes(datos);
    }
    const getCoche = async () => {
        const res = await fetch(`${API}/coches`);
        const datos = await res.json();
        setCoches(datos);
    }
    useEffect(() => {
        getCliente();
        getClienteCoche();
        getCoche();
    }, [])
    // elimanar cliente
    const deleteCliente = async (id) => {
        const clienteResponse = window.confirm('Esta seguro de querer eliminarlo ?')
        if (clienteResponse) {
            const res = await fetch(`${API}/cliente-coche/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data)
            await getCliente();
        }
    }

    // editar cliente

    const editClienteCoche = async (id) => {
        const res = await fetch(`${API}/cliente-coche/${id}`)
        const data = await res.json();
        setClienteCoche(data)
        setEditing(true)
        setId(id)

    };

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="shadow-lg p-3 mb-5 mt-4 bg-body rounded">
                        <form onSubmit={handleSubmit} className="row g-3 needs-validation" >

                            <div className="col-md-6">
                           
                                <select 
                                        onChange={e => setName(e.target.value)}
                                       
                                        className="form-select" 
                                        
                                    >
                                    <option value="">Seleciona un cliente...</option>
                                    {
                                        clientes.map((cliente) => (
                                            <option key={cliente.id}                                            >
                                                {cliente.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <div className="valid-feedback">Campo ok</div>
                                <div className="invalid-feedback">Selecione un cliente</div>
                            </div>

                            <div className="col-md-5">
                               
                                    <select 
                                        onChange={e => setCoche(e.target.value)}
                                        defaultValue={coche}
                                        className="form-select" 
                                        
                                    >   
                                    <option value="">Seleciona un coche...</option>
                                    {
                                        coches.map((piesa) => (
                                            <option key={piesa.id} >
                                                {piesa.name}
                                            </option>
                                        ))
                                    }

                                </select>
                                <div className="valid-feedback">Campo ok</div>
                                <div className="invalid-feedback">Selecione un cliente</div>
                            </div>

                            <div className="col-md-6">
                                <input type="text"
                                    name="placa"
                                    value={placa}
                                    placeholder="numero de placa"
                                    onChange={e => setPlaca(e.target.value)}
                                    className="form-control"
                                     />
                                <div className="valid-feedback">Campo ok</div>
                                <div className="invalid-feedback">Camplete los datos</div>
                            </div>

                            <div className="col-md-6">
                                <input type="number"
                                    name="año"
                                    value={año}
                                    placeholder="ingrese el año del coche"
                                    onChange={e => setAño(e.target.value)}
                                    className="form-control"
                                     />
                                <div className="valid-feedback">Campo ok</div>
                                <div className="invalid-feedback">Camplete los datos</div>
                            </div>

                            <div className="col-md-6">
                                <input type="text"
                                    name="color"
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                    placeholder="Ingre el color"
                                    className="form-control"
                                     />
                                <div className="valid-feedback">Campo ok</div>
                                <div className="invalid-feedback">Camplete los datos</div>
                            </div>

                            <button type="submit" className="btn btn-primary fw-bold">
                                {editing ? 'Editar' : 'Crear'}
                            </button>
                        </form>
                    </div>

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
                                clienteCoches.filter(item => item.cliente_id !== clientes.id)
                                .map(item => (
                                    <tr key={item.id}>

                                        <td>{item.cliente_id}</td>
                                        <td>{item.telefono}</td>
                                        <td>{item.fecha}</td>
                                        <td>{item.hora}</td>
                                        <td>
                                            <button
                                                className="btn btn-secondary btn-sm btn-black"
                                                onClick={() => editClienteCoche(item.id)}>
                                                EDITAR
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm btn-black"
                                                onClick={() => deleteCliente(item.id)}>
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

export default CocheCliente
