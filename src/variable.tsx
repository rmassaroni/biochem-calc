import React, { useState } from "react";
import "./App.css";

function Var() {
    const [name, setName] = useState("Variable");
    const [value, setValue] = useState("");
    const [units, setUnits] = useState("");
    const [known, setKnown] = useState(false);
    return (
        <div className="Var-row">
            <p style={{ marginRight: "10px"}}>
                {name}
            </p>
            <input
                type="text"
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="Var-inputs"
            />
            <input
                type="text"
                placeholder="Units"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="Var-inputs"
            />
            <label>
                <input
                    type="checkbox"
                    checked={known}
                    onChange={(e) => setKnown(e.target.checked)}
                    style={{ marginRight: "5px" }}
                />
                Known
            </label>
        </div>
    );


}

function VarList() {
    return (
        <div>
            <Var />
            <Var />
            <Var />
        </div>
    );
}


export {Var, VarList};
