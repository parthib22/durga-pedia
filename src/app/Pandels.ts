export async function autoCompleteData() {
  const db = await fetch("https://cdn.jsdelivr.net/gh/THUNDERSAMA/durga-pedia@a85947898471f77358f792a840e2e9028c31b86c/output.json").then((response) => response.json());
  return db;
}