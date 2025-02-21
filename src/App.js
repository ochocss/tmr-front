import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080")
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error("Erro:", error));
    }, []);

    console.log(message);
    return <div><h1>{message}</h1></div>;
}

export default App;