import React, { useState } from "react";
import "./App.css";

interface VarProps {
    name?: string;
    value?: number;
    units?: string;
};

interface iVar {
    name: string;
    VarComponent: React.FC;
}

const Var = (props: VarProps): iVar => {
    const [name, setName] = useState(props.name || "Variable");
    const [value, setValue] = useState(props.value || "");
    const [units, setUnits] = useState(props.units || "");
    const [known, setKnown] = useState(value !== "");
        const Component: React.FC = () => {
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
        )
    };

    return {
        name: name,
        VarComponent: Component
    };


}

interface VarListProps {
    // Component: React.FC;
    vars?: iVar[];
}

export interface iVarList {
    Component: React.FC;
}
const VarList = (props: VarListProps): iVarList => {
    // const [name, setName] = useState("");
    const [vars, setVars] = useState<iVar[]>([Var({}), Var({}), Var({})]);
    //
    // function containsVar(name: string) {
    //     return vars.some(v => v.name === name);
    // }

    // const Varcomp: React.FC = vars[0].VarComponent;


    const VarListComponent: React.FC = () => (
        <div>
            {vars.length > 0 &&
                vars.map((v, i) => {
                    const V = v.VarComponent;
                    return <V key={i} />;
                })
            }
        </div>
    );


    return {Component: VarListComponent};
}


export {Var, VarList};


// name="Temperature (T)"
                // value={298}
                // units="K"
