import { useState } from 'react'

function Video(props) {
    const { item, onSave, onDelete } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [VideoID, setVideoID] = useState(item.VideoID);
    const [ListID, setListID] = useState(item.ListID);
    const [Description, setDescription] = useState(item.Description);
    const [Title, setTitle] = useState(item.Title);
    const [URL, setURL] = useState(item.URL)

    function Edit() {
        isEditing === true ? setIsEditing(false) : setIsEditing(true);
        if (isEditing === true) {
            onSave(item.ListID, VideoID, { Description, Title, URL });
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    function handleTableRowClick(event) {

    }

    function Delete() {
        onDelete(item.ListID, VideoID);
    }

    return (
        <>
            {isEditing ? (
                <tr onClick={handleTableRowClick}>
                    <td>
                        <p>{VideoID}</p>
                    </td>
                    <td>
                        <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} />
                    </td>
                    <td>
                        <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} />
                    </td>
                    <td>
                        <input type="text" value={URL} onChange={(e) => setURL(e.target.value)} />
                    </td>
                    <td>
                        <button className='table-btn' onClick={Edit}>Save</button>
                    </td>
                    <td>
                        <button className='table-btn' onClick={Delete}>Delete</button>
                    </td>
                </tr >) : (
                <tr onClick={handleTableRowClick}>
                    <td>
                        <p>{VideoID}</p>
                    </td>
                    <td>
                        <p className='editableP'>{Description}</p>
                    </td>
                    <td>
                        <p className='editableP'>{Title}</p>
                    </td>
                    <td>
                        <p className='editableP'>{URL}</p>
                    </td>
                    <td>
                        <button className='table-btn' onClick={Edit}>Edit</button>
                    </td>
                    <td>
                        <button className='table-btn' onClick={Delete}>Delete</button>
                    </td>
                </tr >
            )}
        </>
    )
}

export default Video;