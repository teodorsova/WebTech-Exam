import './FavouritesList.css'
import { useState } from 'react'

function FavouritesList(props) {
  const { item, onSave, onDelete, onClickRow } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [ListID, setListID] = useState(item.ListID);
  const [Description, setDescription] = useState(item.Description);
  const [Date, setDate] = useState(item.Date);

  function Edit() {
    isEditing === true ? setIsEditing(false) : setIsEditing(true);
    if(isEditing === true) {
        onSave({Description, Date}, ListID);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  function handleTableRowClick(event) {
      //alert(event.target.textContent)
      onClickRow(event);
  }

  function Delete() {
    onDelete(ListID);
  }

  return (
    <>
      {isEditing ? (
        <tr onClick = {handleTableRowClick}>
          <td>
            <p>{ListID}</p>
          </td>
          <td>
            <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} />
          </td>
          <td>
            <input type="text" value={Date} onChange={(e) => setDate(e.target.value)}/>
          </td>
          <td>
            <button className='table-btn' onClick={Edit}>Save</button>
          </td>
          <td>
            <button className='table-btn' onClick={Delete}>Delete</button>
          </td>
        </tr >) : (
        <tr onClick = {handleTableRowClick}>
          <td>
            <p>{ListID}</p>
          </td>
          <td>
            <p className='editableP'>{Description}</p>
          </td>
          <td>
            <p className='editableP'>{Date}</p>
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

export default FavouritesList;