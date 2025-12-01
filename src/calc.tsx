import React, { useState } from "react";
import {Var, VarList} from "./variable";

export default function Calc() {
  const R = 8.314; // J/mol*K

  const [inputs, setInputs] = useState({
    deltaG: "",
    deltaH: "",
    T: "",
    deltaS: "",
    deltaG0: "",
    Q: "",
    K: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const solveDG_DH_TS = () => {
    const { deltaG, deltaH, T, deltaS } = inputs;
    let result = {} as any;

    const g = parseFloat(deltaG);
    const h = parseFloat(deltaH);
    const t = parseFloat(T);
    const s = parseFloat(deltaS);

    if (!isNaN(g) && !isNaN(h) && !isNaN(t)) {
      result.deltaS = (h - g) / t;
    }

    if (!isNaN(g) && !isNaN(t) && !isNaN(s)) {
      result.deltaH = g + t * s;
    }

    if (!isNaN(h) && !isNaN(t) && !isNaN(s)) {
      result.deltaG = h - t * s;
    }

    if (!isNaN(g) && !isNaN(h) && !isNaN(s)) {
      result.T = (h - g) / s;
    }

    return result;
  };

  const solveDG0_RTQ = () => {
    const { deltaG, deltaG0, T, Q } = inputs;
    let result = {} as any;

    const g = parseFloat(deltaG);
    const g0 = parseFloat(deltaG0);
    const t = parseFloat(T);
    const q = parseFloat(Q);

    if (!isNaN(g) && !isNaN(g0) && !isNaN(t)) {
      result.Q = Math.exp((g - g0) / (R * t));
    }

    if (!isNaN(g) && !isNaN(t) && !isNaN(q)) {
      result.deltaG0 = g - R * t * Math.log(q);
    }

    if (!isNaN(g0) && !isNaN(t) && !isNaN(q)) {
      result.deltaG = g0 + R * t * Math.log(q);
    }

    if (!isNaN(g) && !isNaN(g0) && !isNaN(q)) {
      result.T = (g - g0) / (R * Math.log(q));
    }

    return result;
  };

  const solveDH0_RTlnK = () => {
    const { deltaH, T, K } = inputs;
    let result = {} as any;

    const h = parseFloat(deltaH);
    const t = parseFloat(T);
    const k = parseFloat(K);

    if (!isNaN(h) && !isNaN(t)) {
      result.K = Math.exp(-h / (R * t));
    }

    if (!isNaN(t) && !isNaN(k)) {
      result.deltaH = -R * t * Math.log(k);
    }

    if (!isNaN(h) && !isNaN(k)) {
      result.T = -h / (R * Math.log(k));
    }

    return result;
  };

  const [output, setOutput] = useState<any>({});

  const solveAll = () => {
    setOutput({
      ...solveDG_DH_TS(),
      ...solveDG0_RTQ(),
      ...solveDH0_RTlnK()
    });
  };

  return (
    <div className="p-6 space-y-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold">Biochemistry Free Energy Calculator</h1>
            <p>&Delta;G = &Delta;H − T&Delta;S</p>
            <p>&Delta;G = &Delta;G&#176; + RT lnQ</p>
            <p>&Delta;G&#176;= -RT + lnK</p>
            <p>K = e^(−&Delta;H / RT)</p>

      <div className="grid grid-cols-2 gap-4">
        {Object.keys(inputs).map((key) => (
          <input
            key={key}
            className="p-2 rounded bg-gray-700"
            type="number"
            name={key}
            placeholder={key}
            value={(inputs as any)[key]}
            onChange={handleChange}
          />
        ))}
      </div>

      <button
        onClick={solveAll}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Solve
      </button>

      <div className="mt-4 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-semibold">Results</h2>
        <pre>{JSON.stringify(output, null, 2)}</pre>
      </div>
            <VarList />
    </div>
  );
}

