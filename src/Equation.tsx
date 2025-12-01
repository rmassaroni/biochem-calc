import React from 'react';
import {Var, VarList} from "./variable";

interface EquationProps {
    equation: string;
    varlist?: typeof VarList;
}

interface iEquation {
    varlist?: typeof VarList;
    Component: React.FC;
}

export const Equation = (props: EquationProps): iEquation => {
    const [equation, setEquation] = React.useState(props.equation || "");
    const Component: React.FC = () => {
        return (<p>{props.equation}</p>)
    };
    return {Component};
};

export function EquationList() {
    // const equations = [
    //     "&Delta;G = &Delta;H − T&Delta;S",
    //     "&Delta;G = &Delta;G&#176; + RT lnQ",
    //     "&Delta;G&#176;= -RT + lnK",
    //     "K = e^(−&Delta;H / RT)"
    // ];
    const equations = [
        "ΔG = ΔH − TΔS",
        "ΔG = ΔG° + RT lnQ",
        "ΔG°= -RT lnK",
        "K = e^(−ΔH / RT)"
    ];

    return (
        <div style={{border: "2px solid white", borderRadius: "10px"}}>
            {equations.map((eq, index) => {
                const eqObj = Equation({ equation: eq });
        const EqComponent = eqObj.Component;     
        return <EqComponent key={index} />;        
            })}
        </div>
    );
}
