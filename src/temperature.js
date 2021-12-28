function kevintoC(Ktemp) {
  return Ktemp - 273.15;
}
function kevintoF(Ktemp) {
  return (Ktemp - 273.15) * 1.8 + 32;
}

export { kevintoC, kevintoF };
