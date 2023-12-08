// import Search from "./Search"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

const Header = ({ transferValue }) => {
  const [getterValue, setGetterValue] = useState('')

  const setSearchValue = (e) => {
      e.preventDefault();
      const finished = false;
      transferValue({'text':getterValue, finished})
      setGetterValue('')
  }

  return (
    <div className="sub-header">
        <p className="text-dark">New Todo</p>
                
        <form className="d-flex" onSubmit={setSearchValue} >
          <input onChange={(e) => setGetterValue(e.target.value)} value={getterValue}  id="search" type="search"/>
          <button className="addBtn btn btn-danger btn-outline-danger bg-danger text-white">Add</button>
        </form>
        
    </div>
  )
}

export default Header
