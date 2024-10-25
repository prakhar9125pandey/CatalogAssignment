import data from './data.json' assert { type: 'json' };

function lagrangeConstantTerm(data) {
  const n = data.keys.n;
  const k = data.keys.k;

  const points = Object.keys(data)
    .filter((key) => key !== "keys")
    .map((key) => {
      const x = parseInt(key);
      const yData = data[key];
      const y = parseInt(yData.value, yData.base);
      return { x, y };
    });

  if (points.length < k) {
    throw new Error(
      `Insufficient roots: Need at least ${k} roots, but only ${points.length} provided.`
    );
  }

  let constantTerm = 0;

  points.forEach((pointI, i) => {
    let L_i = 1;

    points.forEach((pointJ, j) => {
      if (i !== j) {
        L_i *= (0 - pointJ.x) / (pointI.x - pointJ.x);
      }
    });

    constantTerm += pointI.y * L_i;
  });

  return constantTerm;
}

try {
  const constant = lagrangeConstantTerm(data);
  console.log("The constant term of the polynomial is:", constant);
} catch (error) {
  console.error(error.message);
}
