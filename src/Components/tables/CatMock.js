import React, {useEffect, useState} from 'react';

const API_HOST = "http://localhost:3000";
const CAT_API_URL = `${API_HOST}/cats`;

function CatMock() {
    const [data, setData] = useState([]);

    const fetchCat = () => {
        fetch(`${CAT_API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
    }

    useEffect(() => {
        fetchCat();
    }, []);


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [Temp, setTemp] = useState(null);

    /**
     *
     * @param id - The id of the product
     * @param currentTemp - The current unit price of the product
     */
    const onEdit = ({id, currentTemp}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setTemp(currentTemp);
    }

    /**
     *
     * @param id
     * @param newTemp
     */
    const updateCat = ({id, newTemp}) => {
        fetch(`${CAT_API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                temperament: newTemp
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                fetchCat();
            })
    }

    /**
     *
     * @param id -The id of the product
     * @param newTemp - The new unit price of the product
     */
    const onSave = ({id, newTemp}) => {
        updateCat({id, newTemp});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setTemp(null);
    }

    return (
        <div style={{margin:'200px'}}className="container">
            <h1>Simple Cat Table</h1>
            <table>
                <thead>
                <tr>
                    <th>Cat Name</th>
                    <th>Cat intelligence</th>
                    <th>Cat Temperament</th>
                    <th>images</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.intelligence}</td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={Temp}
                                               onChange={(event) => setTemp(event.target.value)}
                                        />
                                    ) : (
                                        item.temperament
                                    )
                                }
                            
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({id: item.id, newTemp: Temp})}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({id: item.id, currentTemp: item.temperament})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td>
                            <td><img style={{width:'200px'}} src={item.image?.url} /></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}


export default CatMock;