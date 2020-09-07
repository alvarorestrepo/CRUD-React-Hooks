import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormularioAdd from "./components/FormularioAdd";
import FormularioEdit from "./components/FormularioEdit";
import Login from "./components/Login";
import Table from "./components/Table";

function App() {
  const baseUrl = "http://127.0.0.1:8000/api/directorios/";

  const [empleado, guardarEmpleado] = useState({});
  const [empleadoeditar, guardarEmpleadoEditar] = useState({});
  const [editar, cambiarEditar] = useState(false);

  const editarUsu = (user) => {
    cambiarEditar(true);
    guardarEmpleadoEditar({ user });
  };

  return (
    <Router>
      <h1 className="text-4xl text-center p-5 shadown-md mb-5 text-white w-full bg-teal-500">
        Crud React con Hooks
      </h1>

      <Route path="/" exact>
        <Login />
      </Route>

      <Route path="/crud">
        <div className="flex flex-wrap">
          {editar ? (
            <FormularioEdit
              cambiarEditar={cambiarEditar}
              baseUrl={baseUrl}
              empleadoeditar={empleadoeditar}
              guardarEmpleado={guardarEmpleado}
            />
          ) : (
            <FormularioAdd
              baseUrl={baseUrl}
              guardarEmpleado={guardarEmpleado}
            />
          )}
          <Table empleado={empleado} baseUrl={baseUrl} editarUsu={editarUsu} />
        </div>
      </Route>

      <Switch></Switch>
    </Router>
  );
}

export default App;
