import React from 'react';
import {Var, VarList, iVarList} from "./variable";

interface EquationProps {
    equation: string;
    varlist?: iVarList;
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
    const vl = VarList({vars: [Var({name: "name"})]});
    // const vl = VarList({});
    const defaultEquations = [
        Equation({equation: "ΔG = ΔH − TΔS", varlist: vl}),
         Equation({equation: "ΔG = ΔG° + RT lnQ"}),
         Equation({equation: "ΔG°= -RT lnK"}),
         Equation({equation: "K = e^(−ΔH / RT)"})
    ];

    const [equations, setEquations] = React.useState<string[]>([]);


    return (
        <div style={{border: "2px solid white", borderRadius: "10px"}}>
            {defaultEquations.map((eq, index) => {
                const Comp = eq.Component;
                return <Comp key={index} />;
            })}
        </div>
    );
}
