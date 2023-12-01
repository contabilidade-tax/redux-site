async function getTokenData() {
  const home = 'HTTP://192.168.10.57:3004';
  try {
    const response = await fetch(`${home}/api/instaData?key=token`, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Erro HTTP: status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("não encontrado", error);
    return null; // Ou como você deseja tratar o erro
  }
}

// Como usar
let vare;
getTokenData().then(token => {
  vare = token
});
console.log(vare);
