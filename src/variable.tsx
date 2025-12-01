import React, { useState } from "react";
import "./App.css";

interface VarProps {
    name?: string;
    value?: number;
    units?: string;
};
function Var(props: VarProps) {
    const [name, setName] = useState(props.name || "Variable");
    const [value, setValue] = useState(props.value || "");
    const [units, setUnits] = useState(props.units || "");
    const [known, setKnown] = useState(value !== "");
    return (
        <div className="Var-row">
            <p style={{ marginRight: "10px"}}>
                {name}
            </p>
            <input
                type="text"
                placeholder="Value"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    setKnown(e.target.value !== "")
                }}
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
    // const [name, setName] = useState("");
    // const [vars, setVars] = useState<VarProps[]>([]);
    //
    // function containsVar(name: string) {
    //     return vars.some(v => v.name === name);
    // }
    return (
        <div>
            <Var
                name="Temperature (T)"
                value={298}
                units="K"
            />
            <Var />
            <Var />
            <Var />
        </div>
    );
}


export {Var, VarList};
