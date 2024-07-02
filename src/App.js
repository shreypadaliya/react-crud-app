import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EmployeeData from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (item) => {
    setIsUpdate(true);
    setId(item.id);
    setFirstname(item.firstName);
    setLastname(item.lastName);
    setAge(item.age);
  };

  const handleDelete = (id) => {
    if (id > 0 && window.confirm("Are you sure?")) {
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  const handleSave = () => {
    const newEmployee = {
      id: data.length + 1,
      firstName: firstname,
      lastName: lastname,
      age: parseInt(age),
    };
    setData([...data, newEmployee]);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstname("");
    setLastname("");
    setAge("");
    setIsUpdate(false);
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, firstName: firstname, lastName: lastname, age: parseInt(age) }
        : item
    );
    setData(updatedData);
    handleClear();
  };

  return (
    <div className="App container mt-5">
      <div className="form-group">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter Firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter Lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
      </div>
      <div className="button-group">
        {isUpdate ? (
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
      <h1 className="text-center mb-4">Employee Data</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(item)} style={{marginRight:"5px"}}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{marginLeft:"5px"}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
