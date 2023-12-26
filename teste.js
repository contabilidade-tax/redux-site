import { createCipheriv, createDecipheriv } from 'crypto';

function criptografar(texto, chave, iv) {
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(chave, 'hex'), Buffer.from(iv, 'hex'));
  let textoCriptografado = cipher.update(texto);
  textoCriptografado = Buffer.concat([textoCriptografado, cipher.final()]);
  return iv.toString('hex') + ':' + textoCriptografado.toString('hex');
}

function descriptografar(textoCriptografado, chave) {
  const partesTexto = textoCriptografado.split(':');
  const iv = Buffer.from(partesTexto.shift(), 'hex');
  const textoEncriptado = Buffer.from(partesTexto.join(':'), 'hex');
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(chave, 'hex'), iv);
  let textoDecifrado = decipher.update(textoEncriptado);
  textoDecifrado = Buffer.concat([textoDecifrado, decipher.final()]);
  return textoDecifrado.toString();
}

const key = process.env.NEXT_PUBLIC_CRYPTO_KEY
const iv = process.env.NEXT_PUBLIC_CRYPTO_IV
const texto = 'olá'

console.log(criptografar(texto, key, iv))
console.log(descriptografar(criptografar(texto, key, iv), key))